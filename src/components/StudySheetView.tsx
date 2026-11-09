import React, { useState } from 'react';
import { StudySheet } from '../types';
import { MathRenderer } from './MathRenderer';
import { triggerPdfPrint } from '../utils/materialFileNameGenerator';
import { 
  Lightbulb, 
  AlertTriangle, 
  CheckCircle, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  Sparkles,
  BookOpen,
  Printer,
  FileDown
} from 'lucide-react';

interface StudySheetViewProps {
  studySheet: StudySheet;
  onOpenAIGenerator?: () => void;
}

export const StudySheetView: React.FC<StudySheetViewProps> = ({
  studySheet,
}) => {
  const [revealedHints, setRevealedHints] = useState<{ [key: number]: boolean }>({});

  const toggleHint = (index: number) => {
    setRevealedHints(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const handlePrint = () => {
    const hasUncertifiedSections = (studySheet.qualityAudit?.certifiedForStudents ?? studySheet.qualityAudit?.summary?.certifiedForStudents) === false ||
      studySheet.sections.some(s => s.isCertified === false || s.qaStatus === 'failed' || s.qaStatus === 'needs_review');

    if (hasUncertifiedSections) {
      alert('Çalışma kâğıdında kalite güvence standartlarını karşılamayan veya inceleme bekleyen bölümler bulunmaktadır. Ölçme doğruluğu gereği onaylanmamış materyal yazdırılamaz.');
      return;
    }
    triggerPdfPrint({
      grade: studySheet.grade,
      subjectId: studySheet.subjectId,
      examTerm: studySheet.examTerm,
      scenarioId: studySheet.scenarioId,
      materialKind: 'study_sheet'
    });
  };

  return (
    <div className="max-w-4xl mx-auto py-6 px-4 sm:px-6 space-y-6">
      {/* Top Action Bar (Print / PDF) */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3.5 sm:p-4 rounded-xl border border-slate-200 shadow-xs print:hidden">
        <div className="flex items-center space-x-2 text-xs sm:text-sm text-slate-700 font-medium">
          <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
          <span><strong>Hap Bilgi & Çalışma Kâğıdı:</strong> {studySheet.sections.length} Temel Öğrenme Çıktısı İçin Hazırlanmıştır.</span>
        </div>
        <button
          onClick={handlePrint}
          className="inline-flex items-center px-4 py-2 rounded-lg text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs transition-colors cursor-pointer"
        >
          <Printer className="w-4 h-4 mr-1.5" />
          Çalışma Kâğıdını Yazdır / PDF İndir
        </button>
      </div>

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-indigo-900 to-slate-900 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-200 border border-indigo-400/30 mb-3">
              <Lightbulb className="w-3.5 h-3.5 mr-1 text-amber-400" />
              TYMM Ortak Yazılıya Hazırlık • Konu Tekrarı & Püf Noktalar
            </div>
            <h1 className="text-xl sm:text-2xl font-black tracking-tight">
              {studySheet.title}
            </h1>
            <p className="text-xs sm:text-sm text-indigo-200 mt-2 max-w-2xl leading-relaxed">
              Bu çalışma kâğıdı, ilgili MEB ÖDSGM senaryosunda yer alan tüm öğrenme çıktılarını "Hap Bilgiler", "Sınav Tuzakları", "Çözümlü Model Sorular" ve "Sıra Sende Alıştırmaları" ile adım adım pekiştirmenize yardımcı olur.
            </p>
          </div>
          <button
            onClick={handlePrint}
            className="self-start sm:self-center px-3.5 py-2 rounded-xl text-xs font-bold bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all shrink-0 flex items-center print:hidden cursor-pointer"
          >
            <FileDown className="w-4 h-4 mr-1.5 text-indigo-300" />
            PDF / Yazdır
          </button>
        </div>
      </div>

      {/* Sections List */}
      <div className="space-y-6">
        {studySheet.sections.map((sec, idx) => {
          const isSectionBlocked = sec.isCertified === false || sec.qaStatus === 'failed' || sec.qaStatus === 'needs_review';

          return (
            <div 
              key={idx}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden"
            >
              {/* Section Header */}
              <div className="bg-slate-50 border-b border-slate-200 p-4 sm:p-5 flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center space-x-3">
                  <span className="w-7 h-7 rounded-lg bg-indigo-600 text-white font-bold text-xs flex items-center justify-center">
                    {idx + 1}
                  </span>
                  <div>
                    <h3 className="text-base font-extrabold text-slate-900">
                      {sec.topicTitle}
                    </h3>
                    <span className="text-xs font-mono font-semibold text-indigo-600">
                      Öğrenme Çıktısı: {sec.outcomeCode}
                    </span>
                    {isSectionBlocked && (
                      <span className="ml-2 text-[10px] font-bold bg-rose-100 text-rose-800 border border-rose-300 px-2 py-0.5 rounded-full print:hidden">
                        ⚠️ Kalite Kusuru / İnceleme Bekliyor (Öğrenciye Kapalı)
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="p-4 sm:p-6 space-y-6">
                {/* 1. Hap Bilgiler (Quick Notes) */}
                <div>
                  <h4 className="flex items-center text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                    <BookOpen className="w-4 h-4 mr-1.5 text-indigo-600" />
                    Sınav İçin Hap Bilgiler
                  </h4>
                  <div className="grid grid-cols-1 gap-2">
                    {sec.quickNotes.map((note, nIdx) => (
                      <div 
                        key={nIdx} 
                        className="flex items-start text-xs sm:text-sm text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-200/80"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 mt-2 mr-2.5 shrink-0"></span>
                        <div className="leading-relaxed font-medium">
                          <MathRenderer content={note} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 2. Sınav Tuzakları ve Püf Noktalar */}
                {sec.examTraps.length > 0 && (
                  <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-4">
                    <h4 className="flex items-center text-xs font-bold uppercase tracking-wider text-amber-900 mb-2">
                      <AlertTriangle className="w-4 h-4 mr-1.5 text-amber-600" />
                      Sınavda Dikkat Edilecek Püf Noktalar & Tuzaklar
                    </h4>
                    <div className="space-y-1.5 text-xs sm:text-sm text-amber-900 font-medium">
                      {sec.examTraps.map((trap, tIdx) => (
                        <p key={tIdx} className="leading-relaxed">
                          <MathRenderer content={trap} />
                        </p>
                      ))}
                    </div>
                  </div>
                )}

                {/* Kalite Güvence Kapısı: Sertifikasyon Başarısız veya İnceleme Bekliyor ise Soru ve Çözümü Kullanıcıdan Kesin Engelle */}
                {isSectionBlocked ? (
                  <div className="space-y-3 print:hidden">
                    {/* Bilgilendirme Kartı: Soru ve çözüm içeriği kullanıcıya gösterilmez ve baskıya girmez */}
                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs sm:text-sm text-slate-700 flex items-start space-x-3 shadow-2xs">
                      <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                      <div className="space-y-1.5 w-full">
                        <strong className="block text-slate-900 font-bold text-xs uppercase tracking-wide">
                          Bu Bölüm Kalite Güvence Standartları Kapsamında Güncellenmektedir
                        </strong>
                        <p className="leading-relaxed font-medium">
                          Bu kazanıma ait soru veya çözüm içeriği kalite standartlarını karşılayana kadar geçici olarak kâğıttan ve baskıdan çıkarılmıştır.
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                <>
                  {/* 3. Örnek Çözümlü Model Soru */}
                  <div className="border border-slate-200 rounded-xl overflow-hidden">
                    <div className="bg-slate-100/70 px-4 py-2 border-b border-slate-200 flex items-center justify-between text-xs font-bold text-slate-700">
                      <span className="flex items-center">
                        <CheckCircle className="w-4 h-4 mr-1.5 text-emerald-600" />
                        Örnek Çözümlü Model Soru
                      </span>
                      <span className="text-[11px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-medium">
                        Adım Adım Çözüm
                      </span>
                    </div>
                    <div className="p-4 space-y-3">
                      <div className="text-xs sm:text-sm font-semibold text-slate-900">
                        <MathRenderer content={sec.solvedExample.question} />
                      </div>
                      <div className="text-xs text-slate-500 italic bg-slate-50 p-2.5 rounded border border-slate-150">
                        <strong>Soru Analizi:</strong> {sec.solvedExample.analysis}
                      </div>
                      <div className="bg-emerald-50/60 border border-emerald-200/80 p-3 rounded-lg text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
                        <strong className="text-emerald-800 block mb-1">Model Çözüm:</strong>
                        <MathRenderer content={sec.solvedExample.solution} />
                      </div>
                    </div>
                  </div>

                  {/* 4. Sıra Sende Soru & İpucu */}
                  <div className="bg-indigo-50/50 border border-indigo-200 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-indigo-900 flex items-center">
                        <Sparkles className="w-4 h-4 mr-1.5 text-indigo-600" />
                        Sıra Sende! (Öğren ve Pekiştir)
                      </span>
                      <button
                        onClick={() => toggleHint(idx)}
                        className="inline-flex items-center text-[11px] font-semibold text-indigo-700 hover:text-indigo-900"
                      >
                        <HelpCircle className="w-3.5 h-3.5 mr-1" />
                        {revealedHints[idx] ? 'İpucunu Kapat' : 'İpucu Göster'}
                        {revealedHints[idx] ? (
                          <ChevronUp className="w-3 h-3 ml-0.5" />
                        ) : (
                          <ChevronDown className="w-3 h-3 ml-0.5" />
                        )}
                      </button>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-800 font-semibold mb-2">
                      <MathRenderer content={sec.practiceQuestion.question} />
                    </p>
                    {revealedHints[idx] && (
                      <div className="mt-2 p-2.5 bg-white rounded-lg border border-indigo-200 text-xs text-indigo-900 font-medium animate-fadeIn">
                        <strong>💡 Çözüm İpucu:</strong> {sec.practiceQuestion.hint}
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        );
      })}
      </div>
    </div>
  );
};
