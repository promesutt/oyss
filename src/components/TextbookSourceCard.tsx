import React, { useState } from 'react';
import { OUTCOME_STUDY_BANK } from '../data/outcomeStudyBank';
import { GradeLevel, EvidenceLevel, TextbookReference } from '../types';
import { BookOpen, ChevronDown, ChevronUp, CheckCircle2, Lightbulb, BookmarkCheck } from 'lucide-react';

export interface TextbookSourceCardProps {
  outcomeCode?: string;
  grade?: GradeLevel;
  onOpenStudySheet?: () => void;
  defaultExpanded?: boolean;
  className?: string;
}

/**
 * Teknik kanıt kodlarını (D, C, B, A) öğrenci dostu açıklamalara dönüştürür.
 * Kanıt düzeyinin anlamını olduğundan daha güçlü göstermez; mevcut sınıflandırmayla uyumludur.
 */
export function getStudentEvidenceLabel(level?: EvidenceLevel | string): string {
  switch (level) {
    case 'D':
      return 'Doğrulanmış MEB Kaynağı';
    case 'C':
      return 'Ders Kitabı Konu ve Örnek Kaynağı';
    case 'B':
      return 'Ders Kitabı Ünite Kaynağı';
    case 'A':
      return 'Öğretim Programı Temel Kaynağı';
    default:
      return 'Doğrulanmış MEB Kaynağı';
  }
}

export function getStudentEvidenceDescription(level?: EvidenceLevel | string): string {
  switch (level) {
    case 'D':
      return 'Bu konunun MEB ders kitabındaki ilgili ünite, konu anlatımı ve sayfa aralıkları doğrudan doğrulanmıştır.';
    case 'C':
      return 'Bu konunun ders kitabındaki konu anlatımı ve örnek alıştırma bölümleri referans alınmıştır.';
    case 'B':
      return 'Bu konunun MEB ders kitabındaki ilgili ünite ve tema kapsamı referans alınmıştır.';
    case 'A':
      return 'Bu konu, MEB öğretim programındaki temel kazanım çerçevesine dayanmaktadır.';
    default:
      return 'Bu konu, MEB resmi öğretim programı ve ders kitabı kazanım hedeflerine dayanmaktadır.';
  }
}

/**
 * 5. ve 6. Sınıf Öğrencileri İçin Ders Kitabı Kaynak Gösterim Bileşeni (FAZ 3.2.3).
 * 
 * - Yalnızca 5 ve 6. sınıflarda gösterilir; 7 ve 8. sınıflarda UI üretmez (null döner).
 * - Soru çözümü sırasında dikkat dağıtmamak için varsayılan olarak kapalıdır (collapsible).
 * - Basılı sayfa ile PDF sayfasını ayrı rozetlerle sunar.
 * - Birden fazla kitap referansı varsa her birini ayrı bir satırda listeler.
 * - Kaynak verisi yoksa hiçbir arayüz elemanı oluşturmaz.
 */
export const TextbookSourceCard: React.FC<TextbookSourceCardProps> = ({
  outcomeCode,
  grade,
  onOpenStudySheet,
  defaultExpanded = false,
  className = ''
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(defaultExpanded);

  // Kapsam denetimi: Yalnızca 5 ve 6. sınıflara uygulanır
  if (grade !== undefined && grade !== 5 && grade !== 6) {
    return null;
  }

  if (!outcomeCode) {
    return null;
  }

  const studyItem = OUTCOME_STUDY_BANK[outcomeCode];
  if (!studyItem) {
    return null;
  }

  const allRefs: TextbookReference[] = studyItem.textbookReferences || [];

  // Öğrenci arayüzünde yalnızca öğrenciye yönelik kaynaklar (Student Book, Workbook, Ders Kitabı vb.) gösterilir;
  // Öğretmen Kılavuz Kitabı (Teacher Guide) filtrelenir.
  const refs: TextbookReference[] = allRefs.filter(ref => {
    const bookType = (ref.bookType || '').toLowerCase().trim();
    return bookType !== 'teacher guide' && !bookType.includes('öğretmen');
  });

  const hasUnitOrRange = Boolean(studyItem.textbookUnit || studyItem.textbookPageRange);

  // Kaynak verisi bulunmuyorsa hiçbir UI elemanı üretme
  if (refs.length === 0 && !hasUnitOrRange) {
    return null;
  }

  // Öğrenciye gösterilecek kanıt seviyesi açıklaması
  const effectiveEvidence = studyItem.evidenceLevel || refs[0]?.evidenceLevel;
  const evidenceLabel = getStudentEvidenceLabel(effectiveEvidence);
  const evidenceDesc = getStudentEvidenceDescription(effectiveEvidence);

  // Çalışma önerisi metni (quickNotes ve textbookExamples alanlarından türetilir)
  const studyRecommendation = (() => {
    const parts: string[] = [];
    if (studyItem.topicTitle) {
      parts.push(`"${studyItem.topicTitle}" konusunu pekiştirmek için yukarıda belirtilen ders kitabı sayfalarını inceleyebilirsiniz.`);
    }
    if (studyItem.examTraps && studyItem.examTraps.length > 0) {
      parts.push(studyItem.examTraps[0]);
    } else if (studyItem.quickNotes && studyItem.quickNotes.length > 0) {
      parts.push(studyItem.quickNotes[0]);
    }
    return parts.length > 0 ? parts.join(' ') : null;
  })();

  return (
    <div className={`mt-3 rounded-xl border border-indigo-150 bg-indigo-50/40 text-slate-800 transition-all ${className}`}>
      {/* Header Button: Collapsible Toggle */}
      <button
        type="button"
        onClick={() => setIsExpanded(prev => !prev)}
        aria-expanded={isExpanded}
        className="w-full flex items-center justify-between px-3.5 py-2.5 text-left text-xs font-bold text-indigo-950 hover:bg-indigo-100/60 rounded-xl transition-colors cursor-pointer select-none"
      >
        <span className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-indigo-600 shrink-0" />
          <span>Bu soruyu nereden çalışmalıyım?</span>
          <span className="text-[11px] font-semibold text-indigo-700/80 bg-indigo-100/80 px-2 py-0.5 rounded-md hidden sm:inline">
            {evidenceLabel}
          </span>
        </span>
        <span className="text-indigo-600 shrink-0 ml-2">
          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </span>
      </button>

      {/* Expanded Content Body */}
      {isExpanded && (
        <div className="px-3.5 pb-3.5 pt-1 border-t border-indigo-100 space-y-3 text-xs">
          
          {/* Reference List */}
          <div className="space-y-2 pt-1">
            {refs.length > 0 ? (
              refs.map((ref, idx) => (
                <div 
                  key={idx} 
                  className="bg-white p-3 rounded-lg border border-indigo-100 shadow-2xs space-y-1.5"
                >
                  <div className="flex flex-wrap items-center justify-between gap-1">
                    <span className="font-bold text-slate-900 flex items-center gap-1.5">
                      <BookmarkCheck className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                      <span>{ref.bookType || 'Ders Kitabı'}</span>
                      {ref.bookFileName && (
                        <span className="text-[11px] font-normal text-slate-500 font-mono">
                          ({ref.bookFileName})
                        </span>
                      )}
                    </span>
                  </div>

                  {(ref.unitTitle || studyItem.textbookUnit) && (
                    <div className="text-[11.5px] text-slate-700">
                      <span className="font-semibold text-slate-500">Ünite / Tema:</span>{' '}
                      <span className="font-medium text-slate-800">{ref.unitTitle || studyItem.textbookUnit}</span>
                    </div>
                  )}

                  {/* Page badges: Basılı vs PDF */}
                  <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px]">
                    {ref.printedPageRange && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-amber-50 text-amber-900 border border-amber-200 font-semibold">
                        {`📖 Basılı Kitap: s. ${ref.printedPageRange}`}
                      </span>
                    )}
                    {ref.pdfPageRange && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-blue-50 text-blue-900 border border-blue-200 font-semibold">
                        {`💻 EBA / PDF: Sayfa ${ref.pdfPageRange}`}
                      </span>
                    )}
                  </div>
                </div>
              ))
            ) : (
              /* Fallback single range if references array is empty */
              <div className="bg-white p-3 rounded-lg border border-indigo-100 space-y-1">
                {studyItem.textbookUnit && (
                  <div className="text-[11.5px] text-slate-700">
                    <span className="font-semibold text-slate-500">Ünite:</span> {studyItem.textbookUnit}
                  </div>
                )}
                {studyItem.textbookPageRange && (
                  <div className="text-[11px] text-slate-800 font-semibold pt-0.5">
                    {`📖 Sayfa Aralığı: ${studyItem.textbookPageRange}`}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Student-friendly Evidence Explanation */}
          <div className="bg-emerald-50/70 border border-emerald-200 p-2.5 rounded-lg flex items-start gap-2 text-emerald-950">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <strong className="block text-[11px] font-bold text-emerald-900">
                {`Kaynak Güvenilirliği: ${evidenceLabel}`}
              </strong>
              <p className="text-[11px] text-emerald-900/90 leading-relaxed font-medium">
                {evidenceDesc}
              </p>
            </div>
          </div>

          {/* Study Recommendation (if present) */}
          {studyRecommendation && (
            <div className="bg-white/90 p-2.5 rounded-lg border border-indigo-100/90 flex items-start gap-2 text-slate-700">
              <Lightbulb className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
              <div className="space-y-0.5">
                <strong className="block text-[11px] font-bold text-slate-900">
                  Konu Tekrarı Önerisi:
                </strong>
                <p className="text-[11px] text-slate-700 leading-relaxed">
                  {studyRecommendation}
                </p>
              </div>
            </div>
          )}

          {/* Action button if onOpenStudySheet exists */}
          {onOpenStudySheet && (
            <div className="pt-1 flex justify-end">
              <button
                type="button"
                onClick={onOpenStudySheet}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-[11px] shadow-2xs transition-colors cursor-pointer"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Bu Konunun Çalışma Föyünü Aç</span>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
