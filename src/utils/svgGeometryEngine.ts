/**
 * OYSS Rehberi | Ortak Geometri Görselleştirme Motoru (FAZ 3.4 / TASK157)
 * svgGeometryEngine.ts
 * 
 * Sorumluluk:
 * - 5 Temel Geometri Alt Modelini (line_system, angle_model, polygon_2d, grid_coordinate, area_perimeter)
 *   deterministik SVG vektörleriyle, tam matematiksel koordinat hesaplamalarıyla çizmek.
 * - İki aşamalı doğrulama (saf parametrik + anlamsal doğrulama).
 * - XSS koruması (escapeXml), renk sözlüğü (resolveSvgColor), baskı/mobil uyumluluğu.
 * - Cevabı ele vermeme (anti-leak) ve temsililik notu standartları.
 */

import type {
  GeometryShapeVisual,
  GeometryShapeVisualParams,
  GeometrySubType,
  MathematicalValidationResult
} from '../types';
import { resolveSvgColor, escapeXml, generateFallbackSvg } from './svgMathEngine';

export interface GeometryRenderOptions {
  instanceId?: string;
}

// Standart Geometri Tuval Ölçüleri
export const GEOMETRY_CANVAS = {
  DEFAULT_WIDTH: 600,
  DEFAULT_HEIGHT: 340,
  PADDING: 30,
  STROKE_WIDTH: 2.5,
  TEXT_COLOR: '#1e293b',
  LINE_COLOR: '#0f172a',
  FILL_COLOR: '#f1f5f9',
  ACCENT_COLOR: '#4f46e5'
} as const;

// =============================================================================
// 1. DOĞRULAMA FONKSİYONLARI (PARAMETRİK & MATEMATİKSEL)
// =============================================================================

export function validateGeometryParams(params: unknown): MathematicalValidationResult {
  if (!params || typeof params !== 'object') {
    return { isValid: false, reason: 'Geometri görsel parametreleri eksik veya geçersiz nesne.' };
  }

  const p = params as Partial<GeometryShapeVisualParams>;
  const validSubTypes: GeometrySubType[] = [
    'line_system',
    'angle_model',
    'polygon_2d',
    'grid_coordinate',
    'area_perimeter'
  ];

  if (!p.subType || !validSubTypes.includes(p.subType)) {
    return {
      isValid: false,
      reason: `Geçersiz geometri alt türü: "${String(p.subType)}". Desteklenenler: ${validSubTypes.join(', ')}.`
    };
  }

  switch (p.subType) {
    case 'line_system': {
      if (!p.lines || !Array.isArray(p.lines) || p.lines.length === 0) {
        return { isValid: false, reason: 'Doğru sistemi (line_system) için en az bir doğru/doğru parçası (lines) tanımlanmalıdır.' };
      }
      for (let i = 0; i < p.lines.length; i++) {
        const line = p.lines[i] as any;
        const from = line.from || line.start;
        const to = line.to || line.end;
        if (!from || typeof from.x !== 'number' || typeof from.y !== 'number' ||
            !to || typeof to.x !== 'number' || typeof to.y !== 'number') {
          return { isValid: false, reason: `Doğru ${i + 1} için geçerli from/to (veya start/end) koordinatları (x, y) bulunmalıdır.` };
        }
      }
      break;
    }

    case 'angle_model': {
      const hasAngles = p.angles && Array.isArray(p.angles) && p.angles.length > 0;
      const hasClocks = p.clocks && Array.isArray(p.clocks) && p.clocks.length > 0;
      if (!hasAngles && !hasClocks) {
        return { isValid: false, reason: 'Açı modeli (angle_model) için en az bir açı (angles) veya saat kadranı (clocks) tanımlanmalıdır.' };
      }
      if (hasAngles && p.angles) {
        for (let i = 0; i < p.angles.length; i++) {
          const a = p.angles[i];
          if (!a.vertex || typeof a.vertex.x !== 'number' || typeof a.vertex.y !== 'number') {
            return { isValid: false, reason: `Açı ${i + 1} için geçerli tepe noktası (vertex) bulunmalıdır.` };
          }
        }
      }
      if (hasClocks && p.clocks) {
        for (let i = 0; i < p.clocks.length; i++) {
          const c = p.clocks[i];
          if (typeof c.hour !== 'number' || c.hour < 1 || c.hour > 12) {
            return { isValid: false, reason: `Saat ${i + 1} için geçerli bir saat değeri (1-12) girilmelidir.` };
          }
        }
      }
      break;
    }

    case 'polygon_2d': {
      if (!p.polygons || !Array.isArray(p.polygons) || p.polygons.length === 0) {
        return { isValid: false, reason: 'Çokgen modeli (polygon_2d) için en az bir çokgen (polygons) tanımlanmalıdır.' };
      }
      for (let i = 0; i < p.polygons.length; i++) {
        const poly = p.polygons[i] as any;
        const pts = poly.vertices || poly.points;
        if (!pts || !Array.isArray(pts) || pts.length < 3) {
          return { isValid: false, reason: `Çokgen ${i + 1} için en az 3 köşe noktası (vertices/points) tanımlanmalıdır.` };
        }
      }
      break;
    }

    case 'grid_coordinate': {
      if (!p.grid || typeof p.grid.cols !== 'number' || typeof p.grid.rows !== 'number' || p.grid.cols <= 0 || p.grid.rows <= 0) {
        return { isValid: false, reason: 'Kareli zemin (grid_coordinate) için geçerli sütun (cols) ve satır (rows) sayıları tanımlanmalıdır.' };
      }
      break;
    }

    case 'area_perimeter': {
      const hasTessellation = Boolean(p.tessellation);
      const hasPolygons = Boolean(p.polygons && p.polygons.length > 0);
      if (!hasTessellation && !hasPolygons) {
        return { isValid: false, reason: 'Alan/Çevre modeli (area_perimeter) için en az bir çokgen veya zemin kaplama (tessellation) parametresi tanımlanmalıdır.' };
      }
      break;
    }
  }

  return { isValid: true };
}

// =============================================================================
// 2. YARDIMCI GEOMETRİK VE TRIGONOMETRİK HESAPLAMALAR
// =============================================================================

/**
 * Derece cinsinden açıyı radyana dönüştürür.
 */
function degToRad(deg: number): number {
  return (deg * Math.PI) / 180;
}

/**
 * Noktadan verilen açı ve yarıçap mesafesindeki koordinatı hesaplar.
 */
function polarToCartesian(centerX: number, centerY: number, radius: number, angleDeg: number): { x: number; y: number } {
  const rad = degToRad(angleDeg);
  return {
    x: centerX + radius * Math.cos(rad),
    y: centerY + radius * Math.sin(rad)
  };
}

/**
 * Açı yayı için SVG path 'd' dizesi üretir.
 */
function describeArc(x: number, y: number, radius: number, startAngle: number, endAngle: number): string {
  const start = polarToCartesian(x, y, radius, endAngle);
  const end = polarToCartesian(x, y, radius, startAngle);
  const diff = endAngle - startAngle;
  const largeArcFlag = diff <= 180 ? '0' : '1';

  return `M ${start.x.toFixed(2)} ${start.y.toFixed(2)} A ${radius} ${radius} 0 ${largeArcFlag} 0 ${end.x.toFixed(2)} ${end.y.toFixed(2)}`;
}

// =============================================================================
// 3. ALT MODEL RENDER EDİCİLERİ
// =============================================================================

/**
 * 1. Doğru Sistemleri Çizici (line_system)
 */
function renderLineSystem(params: GeometryShapeVisualParams): string[] {
  const elements: string[] = [];
  const lines = params.lines || [];

  lines.forEach((rawLine) => {
    const line = rawLine as any;
    const from = line.from || line.start;
    const to = line.to || line.end;
    const lineType = line.type || line.kind || 'line';
    const stroke = resolveSvgColor(line.color, GEOMETRY_CANVAS.LINE_COLOR);
    const strokeWidth = line.strokeWidth || GEOMETRY_CANVAS.STROKE_WIDTH;
    const isDashed = line.isDashed ?? line.dashed;
    const dashAttr = isDashed ? 'stroke-dasharray="6,4"' : '';
    const markerStart = line.hasArrowStart || lineType === 'line' ? 'marker-start="url(#arrow-start)"' : '';
    const markerEnd = line.hasArrowEnd || lineType === 'line' || lineType === 'ray' ? 'marker-end="url(#arrow-end)"' : '';

    elements.push(
      `<line x1="${from.x}" y1="${from.y}" x2="${to.x}" y2="${to.y}" stroke="${stroke}" stroke-width="${strokeWidth}" stroke-linecap="round" ${dashAttr} ${markerStart} ${markerEnd} />`
    );

    // Başlangıç ve bitiş sınır noktaları (doğru parçası için)
    if (lineType === 'segment' || from.isClosed) {
      elements.push(`<circle cx="${from.x}" cy="${from.y}" r="4.5" fill="${stroke}" />`);
    }
    if (lineType === 'segment' || to.isClosed) {
      elements.push(`<circle cx="${to.x}" cy="${to.y}" r="4.5" fill="${stroke}" />`);
    }

    // Nokta Etiketleri
    if (from.label) {
      elements.push(
        `<text x="${from.x}" y="${from.y - 10}" font-family="system-ui, sans-serif" font-size="13" font-weight="700" fill="${GEOMETRY_CANVAS.TEXT_COLOR}" text-anchor="middle">${escapeXml(from.label)}</text>`
      );
    }
    if (to.label) {
      elements.push(
        `<text x="${to.x}" y="${to.y - 10}" font-family="system-ui, sans-serif" font-size="13" font-weight="700" fill="${GEOMETRY_CANVAS.TEXT_COLOR}" text-anchor="middle">${escapeXml(to.label)}</text>`
      );
    }

    // Doğru adı veya uzunluk etiketi
    if (line.label || line.lengthLabel) {
      const text = line.label || line.lengthLabel || '';
      let lx = (from.x + to.x) / 2;
      let ly = (from.y + to.y) / 2 - 12;
      if (line.labelPos) {
        lx = line.labelPos.x;
        ly = line.labelPos.y;
      }
      elements.push(
        `<text x="${lx}" y="${ly}" font-family="system-ui, sans-serif" font-size="13" font-weight="600" fill="${resolveSvgColor('indigo-700', '#4338ca')}" text-anchor="middle">${escapeXml(text)}</text>`
      );
    }
  });

  // Varsa kesişim / durum noktaları (points)
  if (params.points) {
    params.points.forEach((p: any) => {
      const color = resolveSvgColor(p.color, '#dc2626');
      elements.push(`<circle cx="${p.x}" cy="${p.y}" r="5" fill="${color}" stroke="#ffffff" stroke-width="1.5" />`);
      if (p.label) {
        elements.push(
          `<text x="${p.x + 10}" y="${p.y - 8}" font-family="system-ui, sans-serif" font-size="14" font-weight="700" fill="${color}">${escapeXml(p.label)}</text>`
        );
      }
    });
  }

  return elements;
}

/**
 * 2. Açı Modelleri Çizici (angle_model - Açılar ve Saat Kadranı)
 */
function renderAngleModel(params: GeometryShapeVisualParams): string[] {
  const elements: string[] = [];

  // A. Açı Yayları ve Kolları
  if (params.angles && params.angles.length > 0) {
    params.angles.forEach((rawAngle) => {
      const angle = rawAngle as any;
      const vx = angle.vertex.x;
      const vy = angle.vertex.y;
      const color = resolveSvgColor(angle.color, '#4f46e5');
      const radius = angle.radius || 35;
      const label = angle.degreeLabel || angle.label;

      // Açının kolları (arm1, arm2) varsa çiz
      if (angle.arm1) {
        elements.push(
          `<line x1="${vx}" y1="${vy}" x2="${angle.arm1.x}" y2="${angle.arm1.y}" stroke="${GEOMETRY_CANVAS.LINE_COLOR}" stroke-width="2.5" stroke-linecap="round" marker-end="url(#arrow-end)" />`
        );
      }
      if (angle.arm2) {
        elements.push(
          `<line x1="${vx}" y1="${vy}" x2="${angle.arm2.x}" y2="${angle.arm2.y}" stroke="${GEOMETRY_CANVAS.LINE_COLOR}" stroke-width="2.5" stroke-linecap="round" marker-end="url(#arrow-end)" />`
        );
      }

      // 90° Diklik Karesi
      if (angle.isRightAngle) {
        const d = 16;
        elements.push(
          `<path d="M ${vx} ${vy - d} L ${vx + d} ${vy - d} L ${vx + d} ${vy}" fill="none" stroke="${color}" stroke-width="2" />`
        );
        elements.push(
          `<circle cx="${vx + d / 2}" cy="${vy - d / 2}" r="2" fill="${color}" />`
        );
      } else {
        // Açı Yayı (startAngleDeg/endAngleDeg veya arm açılarından hesaplanır)
        let sDeg = angle.startAngleDeg ?? 0;
        let eDeg = angle.endAngleDeg ?? (angle.degrees ? sDeg + angle.degrees : 60);
        const arcPath = describeArc(vx, vy, radius, sDeg, eDeg);
        elements.push(
          `<path d="${arcPath}" fill="none" stroke="${color}" stroke-width="2.5" stroke-linecap="round" />`
        );
      }

      // Açı Etiketi (örn: 35°, 90°, ?)
      if (label) {
        const sDeg = angle.startAngleDeg ?? 0;
        const eDeg = angle.endAngleDeg ?? (angle.degrees ? sDeg + angle.degrees : 60);
        const midDeg = (sDeg + eDeg) / 2;
        const textPos = polarToCartesian(vx, vy, radius + 18, midDeg);
        const isQuestion = label === '?' || label.includes('?');
        const textColor = isQuestion ? '#dc2626' : GEOMETRY_CANVAS.TEXT_COLOR;
        elements.push(
          `<text x="${textPos.x.toFixed(2)}" y="${textPos.y.toFixed(2)}" font-family="system-ui, sans-serif" font-size="14" font-weight="700" fill="${textColor}" text-anchor="middle" dominant-baseline="middle">${escapeXml(label)}</text>`
        );
      }

      // Tepe Noktası
      elements.push(`<circle cx="${vx}" cy="${vy}" r="4" fill="${GEOMETRY_CANVAS.LINE_COLOR}" />`);
      if (angle.vertex.label) {
        elements.push(
          `<text x="${vx}" y="${vy + 18}" font-family="system-ui, sans-serif" font-size="13" font-weight="700" fill="${GEOMETRY_CANVAS.TEXT_COLOR}" text-anchor="middle">${escapeXml(angle.vertex.label)}</text>`
        );
      }
    });
  }

  // B. Analog Saat Kadranları
  if (params.clocks && params.clocks.length > 0) {
    const clockCount = params.clocks.length;
    const spacing = 600 / (clockCount + 1);

    params.clocks.forEach((clk, idx) => {
      const cx = spacing * (idx + 1);
      const cy = 170;
      const r = 70;

      // Saat dairesi
      elements.push(
        `<circle cx="${cx}" cy="${cy}" r="${r}" fill="#ffffff" stroke="${GEOMETRY_CANVAS.LINE_COLOR}" stroke-width="3" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.06))" />`
      );
      elements.push(`<circle cx="${cx}" cy="${cy}" r="4" fill="${GEOMETRY_CANVAS.LINE_COLOR}" />`);

      // Çentikler (12, 3, 6, 9)
      for (let h = 1; h <= 12; h++) {
        const p = polarToCartesian(cx, cy, r - 8, h * 30 - 90);
        if (h % 3 === 0) {
          elements.push(
            `<text x="${p.x.toFixed(2)}" y="${(p.y + 4).toFixed(2)}" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#64748b" text-anchor="middle">${h}</text>`
          );
        } else {
          elements.push(`<circle cx="${p.x.toFixed(2)}" cy="${p.y.toFixed(2)}" r="1.5" fill="#cbd5e1" />`);
        }
      }

      // Yelkovan (Dakika)
      const minDeg = clk.minute * 6 - 90;
      const minPos = polarToCartesian(cx, cy, r - 16, minDeg);
      elements.push(
        `<line x1="${cx}" y1="${cy}" x2="${minPos.x.toFixed(2)}" y2="${minPos.y.toFixed(2)}" stroke="${GEOMETRY_CANVAS.LINE_COLOR}" stroke-width="3" stroke-linecap="round" />`
      );

      // Akrep (Saat)
      const hourDeg = (clk.hour % 12) * 30 + clk.minute * 0.5 - 90;
      const hourPos = polarToCartesian(cx, cy, r - 32, hourDeg);
      elements.push(
        `<line x1="${cx}" y1="${cy}" x2="${hourPos.x.toFixed(2)}" y2="${hourPos.y.toFixed(2)}" stroke="#4f46e5" stroke-width="4.5" stroke-linecap="round" />`
      );

      // Açı ve Zaman Etiketi
      const timeStr = `${String(clk.hour).padStart(2, '0')}:${String(clk.minute).padStart(2, '0')}`;
      elements.push(
        `<text x="${cx}" y="${cy + r + 24}" font-family="system-ui, sans-serif" font-size="13" font-weight="700" fill="${GEOMETRY_CANVAS.TEXT_COLOR}" text-anchor="middle">Saat ${timeStr}</text>`
      );
      if (clk.angleLabel) {
        elements.push(
          `<text x="${cx}" y="${cy + r + 42}" font-family="system-ui, sans-serif" font-size="12" font-weight="600" fill="#4f46e5" text-anchor="middle">${escapeXml(clk.angleLabel)}</text>`
        );
      }
    });
  }

  return elements;
}

/**
 * 3. Çokgenler, Üçgen ve Dörtgenler Çizici (polygon_2d)
 */
function renderPolygon2D(params: GeometryShapeVisualParams): string[] {
  const elements: string[] = [];
  const polygons = params.polygons || [];

  polygons.forEach((rawPoly) => {
    const poly = rawPoly as any;
    const pts = poly.vertices || poly.points || [];
    const isClosed = poly.isClosed !== undefined ? poly.isClosed : poly.closed !== false;
    const hasCurveEdge = Boolean(poly.hasCurveEdge ?? poly.hasCurve);
    const ptStr = pts.map((p: any) => `${p.x},${p.y}`).join(' ');
    const stroke = resolveSvgColor(poly.strokeColor, GEOMETRY_CANVAS.LINE_COLOR);
    const fill = resolveSvgColor(poly.fill, '#f8fafc');

    if (isClosed === false) {
      // Açık çokgen (çokgen olma şartını sağlamayan şekil testi)
      elements.push(
        `<polyline points="${ptStr}" fill="none" stroke="${stroke}" stroke-width="${GEOMETRY_CANVAS.STROKE_WIDTH}" stroke-linecap="round" stroke-linejoin="round" />`
      );
    } else if (hasCurveEdge) {
      // Bir kenarı eğri olan şekil (çokgen olmama testi)
      const last = pts[pts.length - 1];
      const first = pts[0];
      const curveMidX = (last.x + first.x) / 2 + 25;
      const curveMidY = (last.y + first.y) / 2 - 25;
      const d = `M ${first.x} ${first.y} ` + pts.slice(1).map((p: any) => `L ${p.x} ${p.y}`).join(' ') + ` Q ${curveMidX} ${curveMidY} ${first.x} ${first.y}`;
      elements.push(
        `<path d="${d}" fill="${fill}" stroke="${stroke}" stroke-width="${GEOMETRY_CANVAS.STROKE_WIDTH}" stroke-linejoin="round" />`
      );
    } else {
      // Standart Kapalı Çokgen
      elements.push(
        `<polygon points="${ptStr}" fill="${fill}" stroke="${stroke}" stroke-width="${GEOMETRY_CANVAS.STROKE_WIDTH}" stroke-linejoin="round" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.04))" />`
      );
    }

    // Köşegenler (diagonals)
    if (poly.diagonals && poly.diagonals.length > 0) {
      poly.diagonals.forEach((diag: any) => {
        const p1 = pts[diag.fromIdx];
        const p2 = pts[diag.toIdx];
        if (p1 && p2) {
          elements.push(
            `<line x1="${p1.x}" y1="${p1.y}" x2="${p2.x}" y2="${p2.y}" stroke="#e11d48" stroke-width="2" stroke-dasharray="6,4" stroke-linecap="round" />`
          );
        }
      });
    }

    // Köşe Noktaları ve Harf Etiketleri
    pts.forEach((p: any) => {
      elements.push(`<circle cx="${p.x}" cy="${p.y}" r="4" fill="${stroke}" />`);
      if (p.label) {
        const offset = 14;
        let lx = p.x;
        let ly = p.y - offset;
        if (p.labelPosition === 'bottom') ly = p.y + offset + 4;
        else if (p.labelPosition === 'left') { lx = p.x - offset; ly = p.y + 4; }
        else if (p.labelPosition === 'right') { lx = p.x + offset; ly = p.y + 4; }

        elements.push(
          `<text x="${lx}" y="${ly}" font-family="system-ui, sans-serif" font-size="14" font-weight="700" fill="${GEOMETRY_CANVAS.TEXT_COLOR}" text-anchor="middle">${escapeXml(p.label)}</text>`
        );
      }
    });

    // Kenar Uzunluk Etiketleri
    if (poly.edgeLabels && poly.edgeLabels.length > 0) {
      for (let i = 0; i < pts.length; i++) {
        const lbl = poly.edgeLabels[i];
        if (lbl) {
          const next = pts[(i + 1) % pts.length];
          const mx = (pts[i].x + next.x) / 2;
          const my = (pts[i].y + next.y) / 2;
          elements.push(
            `<text x="${mx}" y="${my - 8}" font-family="system-ui, sans-serif" font-size="12" font-weight="600" fill="#4338ca" text-anchor="middle">${escapeXml(lbl)}</text>`
          );
        }
      }
    }

    // Çokgenin genel başlığı / etiketi (örn: Şekil 1 (Kapalı Üçgen))
    if (poly.label) {
      const maxY = Math.max(...pts.map((p: any) => p.y));
      const minX = Math.min(...pts.map((p: any) => p.x));
      const maxX = Math.max(...pts.map((p: any) => p.x));
      elements.push(
        `<text x="${(minX + maxX) / 2}" y="${maxY + 24}" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="${GEOMETRY_CANVAS.TEXT_COLOR}" text-anchor="middle">${escapeXml(poly.label)}</text>`
      );
    }
  });

  return elements;
}

/**
 * 4. Kareli Zemin ve Geometrik Konum Çizici (grid_coordinate)
 */
function renderGridCoordinate(params: GeometryShapeVisualParams): string[] {
  const elements: string[] = [];
  const grid = params.grid || { cols: 8, rows: 6, cellSize: 45 };
  const originX = 70;
  const originY = 40;
  const width = grid.cols * grid.cellSize;
  const height = grid.rows * grid.cellSize;

  // Izgara Arka Planı
  elements.push(
    `<rect x="${originX}" y="${originY}" width="${width}" height="${height}" fill="#ffffff" stroke="#94a3b8" stroke-width="2" />`
  );

  // Yatay ve Dikey Izgara Çizgileri
  for (let c = 1; c < grid.cols; c++) {
    const x = originX + c * grid.cellSize;
    elements.push(`<line x1="${x}" y1="${originY}" x2="${x}" y2="${originY + height}" stroke="#e2e8f0" stroke-width="1.5" />`);
  }
  for (let r = 1; r < grid.rows; r++) {
    const y = originY + r * grid.cellSize;
    elements.push(`<line x1="${originX}" y1="${y}" x2="${originX + width}" y2="${y}" stroke="#e2e8f0" stroke-width="1.5" />`);
  }

  // Bağıl Konum Vektörleri (vectors)
  if ((params as any).vectors) {
    ((params as any).vectors as any[]).forEach(v => {
      const x1 = originX + v.fromCol * grid.cellSize;
      const y1 = originY + v.fromRow * grid.cellSize;
      const x2 = originX + v.toCol * grid.cellSize;
      const y2 = originY + v.toRow * grid.cellSize;
      const stroke = resolveSvgColor(v.color, '#64748b');
      const dash = v.dashed ? 'stroke-dasharray="5,4"' : '';
      elements.push(
        `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${stroke}" stroke-width="2.5" ${dash} stroke-linecap="round" marker-end="url(#arrow-end)" />`
      );
      if (v.label) {
        const mx = (x1 + x2) / 2;
        const my = (y1 + y2) / 2;
        const isVertical = x1 === x2;
        const offsetX = isVertical ? 14 : 0;
        const offsetY = isVertical ? 0 : -8;
        elements.push(
          `<text x="${mx + offsetX}" y="${my + offsetY}" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="${stroke}" text-anchor="${isVertical ? 'start' : 'middle'}">${escapeXml(v.label)}</text>`
        );
      }
    });
  }

  // Çizgiler (Lines)
  if (params.lines) {
    params.lines.forEach(rawL => {
      const l = rawL as any;
      const from = l.from || l.start;
      const to = l.to || l.end;
      const stroke = resolveSvgColor(l.color, '#2563eb');
      const dash = l.isDashed ? 'stroke-dasharray="5,4"' : '';
      elements.push(
        `<line x1="${from.x}" y1="${from.y}" x2="${to.x}" y2="${to.y}" stroke="${stroke}" stroke-width="2.5" ${dash} stroke-linecap="round" />`
      );
      if (l.label) {
        const mx = (from.x + to.x) / 2;
        const my = (from.y + to.y) / 2;
        elements.push(
          `<text x="${mx}" y="${my - 6}" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="${stroke}" text-anchor="middle">${escapeXml(l.label)}</text>`
        );
      }
    });
  }

  // Noktalar (Points)
  if (params.points) {
    params.points.forEach((p: any) => {
      const px = p.x !== undefined ? p.x : originX + (p.col ?? 0) * grid.cellSize;
      const py = p.y !== undefined ? p.y : originY + (p.row ?? 0) * grid.cellSize;
      const color = resolveSvgColor(p.color, '#e11d48');
      elements.push(`<circle cx="${px}" cy="${py}" r="6" fill="${color}" stroke="#ffffff" stroke-width="2" />`);
      if (p.label) {
        elements.push(
          `<text x="${px}" y="${py - 12}" font-family="system-ui, sans-serif" font-size="13" font-weight="700" fill="${GEOMETRY_CANVAS.TEXT_COLOR}" text-anchor="middle">${escapeXml(p.label)}</text>`
        );
      }
    });
  }

  return elements;
}

/**
 * 5. Geometrik Çevre, Alan ve Mozaik Çizici (area_perimeter - Bahçe/Tarla Fidan EBOB, Fayans Döşeme)
 */
function renderAreaPerimeter(params: GeometryShapeVisualParams): string[] {
  const elements: string[] = [];

  // A. Fayans / Mozaik Izgara Modeli (Tessellation)
  if (params.tessellation) {
    const t = params.tessellation;
    const startX = 80;
    const startY = 60;
    const totalW = 440;
    const totalH = 220;

    const cols = Math.round(t.totalWidth / t.tileWidth) || 3;
    const rows = Math.round(t.totalHeight / t.tileHeight) || 2;
    const cellW = totalW / cols;
    const cellH = totalH / rows;

    // Tüm fayans karelerini çiz
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const tx = startX + c * cellW;
        const ty = startY + r * cellH;
        const isFirst = r === 0 && c === 0;
        const fill = isFirst ? '#e0e7ff' : '#f8fafc';
        const stroke = isFirst ? '#4f46e5' : '#cbd5e1';
        const sw = isFirst ? '2' : '1.5';
        elements.push(
          `<rect x="${tx}" y="${ty}" width="${cellW}" height="${cellH}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}" rx="2" />`
        );
      }
    }

    // Ölçü Okları ve Etiketler
    elements.push(
      `<text x="${startX + totalW / 2}" y="${startY - 14}" font-family="system-ui, sans-serif" font-size="14" font-weight="700" fill="${GEOMETRY_CANVAS.TEXT_COLOR}" text-anchor="middle">${escapeXml(t.widthLabel)}</text>`
    );
    elements.push(
      `<text x="${startX - 18}" y="${startY + totalH / 2}" font-family="system-ui, sans-serif" font-size="14" font-weight="700" fill="${GEOMETRY_CANVAS.TEXT_COLOR}" text-anchor="middle" transform="rotate(-90 ${startX - 18} ${startY + totalH / 2})">${escapeXml(t.heightLabel)}</text>`
    );

    // Tek Fayans Örnek Ölçü Etiketi
    if (t.tileLabel) {
      elements.push(
        `<text x="${startX + cellW / 2}" y="${startY + cellH / 2 + 5}" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#4338ca" text-anchor="middle">${escapeXml(t.tileLabel)}</text>`
      );
    }
  } else if (params.polygons && params.polygons.length > 0) {
    // B. Bahçe Çevresi / Fidan Dikim Modeli (Dikdörtgen + Köşe/Kenar Noktaları)
    elements.push(...renderPolygon2D(params));

    if (params.points && params.points.length > 0) {
      params.points.forEach((p, idx) => {
        const px = p.x ?? 0;
        const py = p.y ?? 0;
        const isCorner = p.id?.includes('corner') || idx < 4;
        const color = isCorner ? '#059669' : '#0284c7';
        const r = isCorner ? 6 : 4.5;
        elements.push(`<circle cx="${px}" cy="${py}" r="${r}" fill="${color}" stroke="#ffffff" stroke-width="1.8" />`);
        if (p.label) {
          elements.push(
            `<text x="${px}" y="${py + 14}" font-family="system-ui, sans-serif" font-size="10" font-weight="600" fill="#334155" text-anchor="middle">${escapeXml(p.label)}</text>`
          );
        }
      });
    }
  }

  return elements;
}

// =============================================================================
// 4. ANA GEOMETRİ SVG MOTORU (generateGeometrySvg)
// =============================================================================

export function generateGeometrySvg(
  params: GeometryShapeVisualParams,
  options?: GeometryRenderOptions
): string {
  const vbWidth = params.viewBoxWidth || GEOMETRY_CANVAS.DEFAULT_WIDTH;
  const vbHeight = params.viewBoxHeight || GEOMETRY_CANVAS.DEFAULT_HEIGHT;
  const instId = options?.instanceId || 'geom';

  const bodyElements: string[] = [];

  // Alt türe göre özel çizim elemanlarını üret
  switch (params.subType) {
    case 'line_system':
      bodyElements.push(...renderLineSystem(params));
      break;
    case 'angle_model':
      bodyElements.push(...renderAngleModel(params));
      break;
    case 'polygon_2d':
      bodyElements.push(...renderPolygon2D(params));
      break;
    case 'grid_coordinate':
      bodyElements.push(...renderGridCoordinate(params));
      break;
    case 'area_perimeter':
      bodyElements.push(...renderAreaPerimeter(params));
      break;
  }

  // Başlık (Title)
  if (params.title) {
    bodyElements.unshift(
      `<text x="${vbWidth / 2}" y="24" font-family="system-ui, sans-serif" font-size="15" font-weight="700" fill="${GEOMETRY_CANVAS.TEXT_COLOR}" text-anchor="middle">${escapeXml(params.title)}</text>`
    );
  }

  // Temsili Çizim / Dipnot Uyarısı
  const noteText = params.note || (params.isProportional === false ? 'Not: Şekil temsilidir, ölçeksizdir.' : undefined);
  if (noteText) {
    bodyElements.push(
      `<text x="${vbWidth / 2}" y="${vbHeight - 8}" font-family="system-ui, sans-serif" font-size="11" font-style="italic" fill="#64748b" text-anchor="middle">${escapeXml(noteText)}</text>`
    );
  }

  // Standart SVG Kapsayıcısı ve Ok İmleri (Markers)
  const svg = [
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${vbWidth} ${vbHeight}" width="100%" height="100%" class="oyss-geometry-svg block max-w-full select-none" data-instance-id="${escapeXml(instId)}" role="img" aria-label="${escapeXml(params.title || 'Geometrik Çizim')}">`,
    `  <defs>`,
    `    <marker id="arrow-end" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">`,
    `      <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="${GEOMETRY_CANVAS.LINE_COLOR}" />`,
    `    </marker>`,
    `    <marker id="arrow-start" viewBox="0 0 10 10" refX="2" refY="5" markerWidth="6" markerHeight="6" orient="auto">`,
    `      <path d="M 8 1.5 L 0 5 L 8 8.5 z" fill="${GEOMETRY_CANVAS.LINE_COLOR}" />`,
    `    </marker>`,
    `    <marker id="geo-arrow-end" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">`,
    `      <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="${GEOMETRY_CANVAS.LINE_COLOR}" />`,
    `    </marker>`,
    `    <marker id="geo-arrow-start" viewBox="0 0 10 10" refX="2" refY="5" markerWidth="6" markerHeight="6" orient="auto">`,
    `      <path d="M 8 1.5 L 0 5 L 8 8.5 z" fill="${GEOMETRY_CANVAS.LINE_COLOR}" />`,
    `    </marker>`,
    `  </defs>`,
    bodyElements.map(el => `  ${el}`).join('\n'),
    `</svg>`
  ].join('\n');

  return svg;
}

// =============================================================================
// 5. İKİ KADEMELİ GEOMETRİ BORU HATTI DAĞITICISI (renderGeometryShape)
// =============================================================================

export function renderGeometryShape(
  visual: GeometryShapeVisual,
  options?: GeometryRenderOptions
): { svg: string; isValid: boolean; errorReason?: string } {
  if (!visual || typeof visual !== 'object') {
    return {
      svg: generateFallbackSvg('Geometri görsel nesnesi tanımsız.'),
      isValid: false,
      errorReason: 'Geometri görsel nesnesi tanımsız.'
    };
  }

  // 1. Aşama: Parametrik ve Matematiksel Doğrulama
  const validation = validateGeometryParams(visual.params);
  if (!validation.isValid) {
    return {
      svg: generateFallbackSvg(validation.reason),
      isValid: false,
      errorReason: validation.reason
    };
  }

  // 2. Aşama: Deterministik SVG Üretimi
  try {
    const svg = generateGeometrySvg(visual.params, options);
    return { svg, isValid: true };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Geometri SVG çizimi sırasında beklenmeyen hata.';
    return {
      svg: generateFallbackSvg(msg),
      isValid: false,
      errorReason: msg
    };
  }
}
