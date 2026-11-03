import React, { useId, useMemo } from 'react';
import { QuestionVisual } from '../types';
import { renderQuestionVisual } from '../utils/svgMathEngine';
import { sanitizeSvgInstanceId } from '../utils/fractionMathEngine';

export interface QuestionVisualViewProps {
  visual?: QuestionVisual;
  className?: string;
  instanceId?: string;
}

/**
 * Soru Görsel Sunum Bileşeni (FAZ 2B & FAZ 3.1)
 * 
 * Deterministik SVG Matematik Motorundan geçen doğrulanmış vektörel çizimleri
 * responsive, baskıya uyumlu ve erişilebilir bir kapsayıcı içinde sunar.
 */
export const QuestionVisualView: React.FC<QuestionVisualViewProps> = ({
  visual,
  className = '',
  instanceId: customInstanceId
}) => {
  // React 18 useId kancası ile bileşene özel tekil kimlik
  const rawId = useId();
  const effectiveInstanceId = useMemo(() => {
    try {
      const targetId = customInstanceId !== undefined ? customInstanceId : rawId;
      return sanitizeSvgInstanceId(targetId);
    } catch {
      return '';
    }
  }, [customInstanceId, rawId]);

  // Motor üzerinden iki aşamalı (matematiksel + anlamsal) doğrulama ve SVG üretimi
  // React Hooks kurallarına tam uyum: useMemo koşulsuz en üst düzeyde çağrılır.
  // visual yoksa motor çalıştırılmaz, doğrudan null döndürülür.
  const renderResult = useMemo(() => {
    if (!visual) {
      return null;
    }
    try {
      return renderQuestionVisual(visual, { instanceId: effectiveInstanceId });
    } catch {
      return {
        svg: '',
        isValid: false,
        errorReason: 'Görsel işleme sırasında beklenmeyen bir hata oluştu.'
      };
    }
  }, [visual, effectiveInstanceId]);

  if (!visual || !renderResult || !renderResult.svg) {
    return null;
  }

  return (
    <figure
      className={`question-visual-container w-full max-w-[640px] mx-auto my-3 overflow-hidden rounded-xl bg-slate-50/60 p-2 sm:p-3 border border-slate-200/80 shadow-2xs print:my-1.5 print:p-1 print:border-slate-300 print:bg-transparent print:shadow-none print:max-w-[550px] print:break-inside-avoid ${className}`}
      role="group"
      aria-label={visual.caption || 'Soru matematiksel çizim modeli'}
    >
      {/* SVG Çıktısı - Yalnızca svgMathEngine tarafından üretilmiş ve doğrulanmış güvenli vektör çizimi */}
      {/* Mobil ekranlarda metinlerin aşırı küçülmesini engellemek için min-w-[440px] ile koruma sağlanır */}
      <div className="w-full flex items-center justify-center overflow-x-auto print:overflow-visible">
        <div
          className="min-w-[440px] sm:min-w-0 w-full flex items-center justify-center print:min-w-0"
          dangerouslySetInnerHTML={{ __html: renderResult.svg }}
        />
      </div>

      {/* Görsel Alt Yazısı / Açıklaması (Caption) */}
      {visual.caption && (
        <figcaption className="mt-2 text-center text-xs sm:text-[13px] font-medium text-slate-600 italic print:mt-1 print:text-[10px] print:text-slate-700">
          <span>{visual.caption}</span>
          <span className="sm:hidden block text-[10px] text-slate-400 font-normal not-italic mt-0.5 print:hidden">
            ↔ Sayı doğrusunu incelemek için sağa/sola kaydırabilirsiniz
          </span>
        </figcaption>
      )}
    </figure>
  );
};

export default QuestionVisualView;

