import { GradeLevel, SubjectId, ExamTerm, ExamSourceClassification } from '../types';

export type PdfMaterialKind =
  | 'study_sheet'
  | 'infographic'
  | 'exam_paper'
  | 'interactive_exam'
  | 'speaking_guide'
  | 'ai_generator';

export interface MaterialFileNameParams {
  grade?: number | GradeLevel;
  subjectId?: string | SubjectId;
  examTerm?: string | ExamTerm;
  scenarioId?: string;
  scenarioName?: string;
  materialKind: PdfMaterialKind;
  isCustomExam?: boolean;
  isAnswerKey?: boolean;
  isCompletedPractice?: boolean;
  examClassification?: ExamSourceClassification;
}

const SUBJECT_NAME_MAP: Record<string, string> = {
  turkce: 'Turkce',
  matematik: 'Matematik',
  fen_bilimleri: 'Fen_Bilimleri',
  sosyal_bilgiler: 'Sosyal_Bilgiler',
  din_kulturu: 'Din_Kulturu',
  ingilizce: 'Ingilizce',
  turk_dili_edebiyati: 'Turk_Dili_ve_Edebiyati',
  fizik: 'Fizik',
  kimya: 'Kimya',
  biyoloji: 'Biyoloji',
  tarih: 'Tarih',
  cografya: 'Cografya',
  felsefe: 'Felsefe'
};

const TERM_NAME_MAP: Record<string, string> = {
  '1_donem_1_yazili': '1_Donem_1_Yazili',
  '1_donem_2_yazili': '1_Donem_2_Yazili',
  '2_donem_1_yazili': '2_Donem_1_Yazili',
  '2_donem_2_yazili': '2_Donem_2_Yazili'
};

/**
 * Türkçe harfleri dosya adı dostu ASCII karakterlere dönüştürür.
 */
export function sanitizeToAscii(str: string): string {
  if (!str) return '';
  return str
    .replace(/ğ/g, 'g')
    .replace(/Ğ/g, 'G')
    .replace(/ü/g, 'u')
    .replace(/Ü/g, 'U')
    .replace(/ş/g, 's')
    .replace(/Ş/g, 'S')
    .replace(/ı/g, 'i')
    .replace(/İ/g, 'I')
    .replace(/ö/g, 'o')
    .replace(/Ö/g, 'O')
    .replace(/ç/g, 'c')
    .replace(/Ç/g, 'C');
}

/**
 * Sınıf bilgisini biçimlendirir (Örn: 5 -> "5_Sinif").
 */
export function formatGradeSegment(grade?: number | GradeLevel): string {
  if (!grade) return '';
  return `${grade}_Sinif`;
}

/**
 * Ders kodunu standart dosya segmentine çevirir (Örn: "matematik" -> "Matematik").
 */
export function formatSubjectSegment(subjectId?: string | SubjectId): string {
  if (!subjectId) return '';
  const key = String(subjectId).toLowerCase().trim();
  if (SUBJECT_NAME_MAP[key]) {
    return SUBJECT_NAME_MAP[key];
  }
  // Harici veya özel branşlar için temizleme
  const clean = sanitizeToAscii(key).replace(/[^a-zA-Z0-9]/g, '_');
  return clean
    .split('_')
    .filter(Boolean)
    .map(p => p.charAt(0).toUpperCase() + p.slice(1).toLowerCase())
    .join('_');
}

/**
 * Dönem bilgisini biçimlendirir (Örn: "1_donem_1_yazili" -> "1_Donem_1_Yazili").
 */
export function formatTermSegment(examTerm?: string | ExamTerm): string {
  if (!examTerm) return '';
  const key = String(examTerm).toLowerCase().trim();
  if (TERM_NAME_MAP[key]) {
    return TERM_NAME_MAP[key];
  }
  const clean = sanitizeToAscii(key).replace(/[^a-zA-Z0-9]/g, '_');
  return clean
    .split('_')
    .filter(Boolean)
    .map(p => p.charAt(0).toUpperCase() + p.slice(1).toLowerCase())
    .join('_');
}

/**
 * Senaryo bilgisini biçimlendirir (Örn: "senaryo_4" veya "Senaryo 4" -> "Senaryo_4").
 * Eğer materyal senaryo ayrımı desteklemiyorsa (örneğin MEB Dinleme/Konuşma Kılavuzu) boş döner.
 */
export function formatScenarioSegment(scenarioId?: string, scenarioName?: string): string {
  const raw = (scenarioId || scenarioName || '').trim();
  if (!raw) return '';

  const numMatch = raw.match(/\d+/);
  if (numMatch) {
    return `Senaryo_${numMatch[0]}`;
  }

  const clean = sanitizeToAscii(raw).replace(/[^a-zA-Z0-9]/g, '_');
  return clean
    .split('_')
    .filter(Boolean)
    .map(p => p.charAt(0).toUpperCase() + p.slice(1).toLowerCase())
    .join('_');
}

/**
 * Materyal türüne özgü sonek belirler.
 */
export function formatMaterialSuffix(
  materialKind: PdfMaterialKind,
  options: {
    isCustomExam?: boolean;
    isAnswerKey?: boolean;
    isCompletedPractice?: boolean;
    examClassification?: ExamSourceClassification;
  } = {}
): string {
  const { 
    isCustomExam = false, 
    isAnswerKey = false, 
    isCompletedPractice = false,
    examClassification
  } = options;

  switch (materialKind) {
    case 'study_sheet':
      return 'Hap_Bilgi';

    case 'infographic':
      return 'Infografik';

    case 'exam_paper':
      if (isCustomExam) {
        if (examClassification === 'meb_selection') {
          return isAnswerKey ? 'MEB_ODSGM_Soru_Seckisi_Cevap_Anahtari' : 'MEB_ODSGM_Soru_Seckisi';
        }
        if (examClassification === 'oyss_curated_set') {
          return isAnswerKey ? 'OYSS_Standart_Soru_Seti_Cevap_Anahtari' : 'OYSS_Standart_Soru_Seti';
        }
        if (examClassification === 'oyss_mixed_meb') {
          return isAnswerKey ? 'OYSS_Karma_Sinav_MEB_Kaynakli_Cevap_Anahtari' : 'OYSS_Karma_Sinav_MEB_Kaynakli';
        }
        return isAnswerKey ? 'OYSS_Ozgun_Sinav_Cevap_Anahtari' : 'OYSS_Ozgun_Sinav';
      }
      return isAnswerKey ? 'MEB_ODSGM_Ornek_Sinav_Cevap_Anahtari' : 'MEB_ODSGM_Ornek_Sinav';

    case 'interactive_exam':
      if (isCompletedPractice) {
        if (isCustomExam) {
          if (examClassification === 'meb_selection') {
            return 'MEB_ODSGM_Soru_Seckisi_Etkilesimli_Sonuc_Raporu';
          }
          if (examClassification === 'oyss_curated_set') {
            return 'OYSS_Standart_Soru_Seti_Etkilesimli_Sonuc_Raporu';
          }
          if (examClassification === 'oyss_mixed_meb') {
            return 'OYSS_Karma_Sinav_MEB_Kaynakli_Etkilesimli_Sonuc_Raporu';
          }
          return 'OYSS_Ozgun_Sinav_Etkilesimli_Sonuc_Raporu';
        }
        return 'MEB_ODSGM_Etkilesimli_Sonuc_Raporu';
      }
      if (isCustomExam) {
        if (examClassification === 'meb_selection') {
          return 'MEB_ODSGM_Soru_Seckisi_Etkilesimli_Sinav';
        }
        if (examClassification === 'oyss_curated_set') {
          return 'OYSS_Standart_Soru_Seti_Etkilesimli_Sinav';
        }
        if (examClassification === 'oyss_mixed_meb') {
          return 'OYSS_Karma_Sinav_MEB_Kaynakli_Etkilesimli_Sinav';
        }
        return 'OYSS_Ozgun_Sinav_Etkilesimli_Sinav';
      }
      return 'MEB_ODSGM_Etkilesimli_Sinav';

    case 'ai_generator':
      if (examClassification === 'meb_selection') {
        return isAnswerKey ? 'MEB_ODSGM_Soru_Seckisi_Cevap_Anahtari' : 'MEB_ODSGM_Soru_Seckisi';
      }
      if (examClassification === 'oyss_curated_set') {
        return isAnswerKey ? 'OYSS_Standart_Soru_Seti_Cevap_Anahtari' : 'OYSS_Standart_Soru_Seti';
      }
      if (examClassification === 'oyss_mixed_meb') {
        return isAnswerKey ? 'OYSS_Karma_Sinav_MEB_Kaynakli_Cevap_Anahtari' : 'OYSS_Karma_Sinav_MEB_Kaynakli';
      }
      return isAnswerKey ? 'OYSS_Ozgun_Sinav_Cevap_Anahtari' : 'OYSS_Ozgun_Sinav';

    case 'speaking_guide':
      return 'Konusma_ve_Dinleme_Kilavuzu';

    default:
      return 'Calisma_Materyali';
  }
}

/**
 * OYSS Standart Materyal PDF Dosya Adı Üreteci
 * Örnek Çıktılar:
 * - 5_Sinif_Matematik_1_Donem_1_Yazili_Senaryo_4_Hap_Bilgi
 * - 5_Sinif_Matematik_1_Donem_1_Yazili_Senaryo_4_Infografik
 * - 5_Sinif_Matematik_1_Donem_1_Yazili_Senaryo_4_MEB_ODSGM_Ornek_Sinav
 * - 5_Sinif_Matematik_1_Donem_1_Yazili_Senaryo_4_OYSS_Ozgun_Sinav
 * - 5_Sinif_Matematik_1_Donem_1_Yazili_Senaryo_4_OYSS_Ozgun_Sinav_Cevap_Anahtari
 * - 5_Sinif_Matematik_1_Donem_1_Yazili_Senaryo_4_OYSS_Ozgun_Sinav_Etkilesimli_Sonuc_Raporu
 * - 5_Sinif_Turkce_1_Donem_1_Yazili_Konusma_ve_Dinleme_Kilavuzu (Senaryo içermez, uydurma eklenmez)
 */
export function generateMaterialPdfFileName(params: MaterialFileNameParams): string {
  const parts: string[] = [];

  const gradePart = formatGradeSegment(params.grade);
  if (gradePart) parts.push(gradePart);

  const subjectPart = formatSubjectSegment(params.subjectId);
  if (subjectPart) parts.push(subjectPart);

  const termPart = formatTermSegment(params.examTerm);
  if (termPart) parts.push(termPart);

  // Senaryo yalnızca materyal senaryo bazlıysa ve tanımlıysa eklenir (Speaking guide senaryo içermez)
  if (params.materialKind !== 'speaking_guide') {
    const scenarioPart = formatScenarioSegment(params.scenarioId, params.scenarioName);
    if (scenarioPart) parts.push(scenarioPart);
  }

  const suffix = formatMaterialSuffix(params.materialKind, {
    isCustomExam: params.isCustomExam,
    isAnswerKey: params.isAnswerKey,
    isCompletedPractice: params.isCompletedPractice,
    examClassification: params.examClassification
  });
  if (suffix) parts.push(suffix);

  return parts.join('_');
}

/**
 * .pdf uzantısı ile tam dosya adı döner.
 */
export function getMaterialPdfFileNameWithExtension(params: MaterialFileNameParams): string {
  const base = generateMaterialPdfFileName(params);
  return base ? `${base}.pdf` : 'OYSS_Materyal.pdf';
}

export const APP_PAGE_TITLE = 'OYSS Rehberi | Ortak Yazılılara Hazırlık';

/**
 * Tarayıcı PDF indirme/yazdırma tetikleyicisi.
 * document.title değerini yazdırma anında standart dosya adına ayarlar.
 * window.print() tamamlandıktan veya iptal edildikten sonra (afterprint / matchMedia),
 * sekme başlığını yan etki oluşturmadan orijinal haline geri döndürür.
 * Safari ve Chrome uyumluluğu için kör setTimeout mekanizması kaldırılmıştır.
 */
export function triggerPdfPrint(params: MaterialFileNameParams): void {
  // 1. window ve window.print kullanılabilirlik kontrolü (SSR veya kısıtlı ortam)
  if (typeof window === 'undefined' || typeof window.print !== 'function') {
    return;
  }

  const originalTitle = (typeof document !== 'undefined' && document.title)
    ? document.title
    : APP_PAGE_TITLE;

  const pdfTitle = generateMaterialPdfFileName(params);
  if (typeof document !== 'undefined' && pdfTitle) {
    document.title = pdfTitle;
  }

  let hasRestored = false;
  let printMediaQuery: MediaQueryList | null = null;
  let mediaQueryHandler: ((mql: MediaQueryListEvent | MediaQueryList) => void) | null = null;
  let afterprintAdded = false;

  const restoreTitle = () => {
    if (hasRestored) return;
    hasRestored = true;

    if (typeof document !== 'undefined') {
      document.title = originalTitle;
    }

    if (typeof window !== 'undefined') {
      if (afterprintAdded) {
        window.removeEventListener('afterprint', restoreTitle);
        afterprintAdded = false;
      }

      if (printMediaQuery && mediaQueryHandler) {
        try {
          if (typeof printMediaQuery.removeEventListener === 'function') {
            printMediaQuery.removeEventListener('change', mediaQueryHandler);
          } else if (typeof (printMediaQuery as any).removeListener === 'function') {
            (printMediaQuery as any).removeListener(mediaQueryHandler);
          }
        } catch {
          // matchMedia temizliği sessizce atlanır
        }
        mediaQueryHandler = null;
      }
    }
  };

  try {
    // 1. Standart afterprint dinleyicisi (Chrome, Firefox, modern Safari)
    window.addEventListener('afterprint', restoreTitle);
    afterprintAdded = true;

    // 2. Safari / WebKit uyumluluğu için matchMedia('print') dinleyicisi
    if (typeof window.matchMedia === 'function') {
      try {
        printMediaQuery = window.matchMedia('print');
        if (printMediaQuery) {
          mediaQueryHandler = (mql: MediaQueryListEvent | MediaQueryList) => {
            if (!mql.matches) {
              restoreTitle();
            }
          };

          if (typeof printMediaQuery.addEventListener === 'function') {
            printMediaQuery.addEventListener('change', mediaQueryHandler);
          } else if (typeof (printMediaQuery as any).addListener === 'function') {
            (printMediaQuery as any).addListener(mediaQueryHandler);
          }
        }
      } catch {
        // matchMedia kısıtlı ortamlarda sessizce atlanır
      }
    }

    // Kullanıcı etkileşim zinciri (user gesture) korunarak senkron çağrılır
    window.print();
  } catch (printError) {
    // Hata durumunda (örneğin iframe kısıtı, izin reddi veya beklenmeyen istisnalar)
    // başlığı derhal eski haline getir ve dinleyicileri temizle
    restoreTitle();
    console.error('[OYSS Print] Yazdırma işlemi sırasında hata oluştu:', printError);
  }
}
