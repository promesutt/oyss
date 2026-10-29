import React, { useState } from 'react';
import { ExamPaper } from '../types';
import { MathRenderer } from './MathRenderer';
import { formatOutcomeBadgeTitle } from '../data/curriculumData';
import { 
  CheckCircle2, 
  Eye, 
  EyeOff, 
  Award,
  Sparkles,
  Printer,
  PenTool
} from 'lucide-react';

interface ExamPaperViewProps {
  examPaper: ExamPaper;
  isCustomAIExam?: boolean;
  onResetToDefaultExam?: () => void;
  onOpenAIGenerator: () => void;
  onOpenInteractivePractice?: () => void;
}

export const ExamPaperView: React.FC<ExamPaperViewProps> = ({ 
  examPaper,
  isCustomAIExam = false,
  onResetToDefaultExam,
  onOpenAIGenerator,
  onOpenInteractivePractice
}) => {
  const [showRubric, setShowRubric] = useState<boolean>(false);
  const [answerLineCount, setAnswerLineCount] = useState<number>(3);
  const [showOutcomeTitleInPrint, setShowOutcomeTitleInPrint] = useState<boolean>(false);

  return (
    <div className="max-w-4xl mx-auto py-6 px-4 sm:px-6 print:max-w-none print:w-full print:p-0 print:m-0">
      {/* Custom AI Exam Active Banner */}
      {isCustomAIExam && (
        <div className="mb-4 bg-gradient-to-r from-indigo-50 via-purple-50 to-indigo-50 border-2 border-indigo-200 rounded-xl p-3.5 flex flex-wrap items-center justify-between gap-2 shadow-xs print:hidden animate-in fade-in duration-200">
          <div className="flex items-center space-x-2.5 text-indigo-950 font-bold text-xs sm:text-sm">
            <span className="w-7 h-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-xs">
              <Sparkles className="w-4 h-4 text-amber-300" />
            </span>
            <div>
              <span>Özgün Çalışma ve Alıştırma Seti (Taslak)</span>
              <p className="text-[11px] font-normal text-indigo-700">
                Aşağıdaki A4 kâğıdında senaryonun öğrenme çıktılarına göre hazırlanan taslak alıştırma soruları yer almaktadır. Resmî MEB sınavı yerine geçmez.
              </p>
            </div>
          </div>
          {onResetToDefaultExam && (
            <button
              onClick={onResetToDefaultExam}
              className="px-3 py-1.5 bg-white hover:bg-slate-50 border border-indigo-300 text-indigo-700 rounded-lg text-xs font-bold transition-all shadow-2xs hover:shadow-xs active:scale-95 cursor-pointer"
            >
              ← Örnek Sınav Arşivine Dön
            </button>
          )}
        </div>
      )}

      {/* Top Banner & Control Bar */}
      <div className="flex flex-col gap-3 mb-6 bg-slate-100 p-3 sm:p-4 rounded-xl border border-slate-200 print:hidden shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-slate-200 pb-2.5">
          <div className="flex items-center space-x-2">
            <Award className="w-5 h-5 text-red-600 shrink-0" />
            <span className="text-xs sm:text-sm text-slate-700 font-medium">
              <strong>MEB ÖDSGM Uyumlu:</strong> Resmi konu-soru dağılımı ve bilişsel süreç düzeylerine göre hazırlanmış örnek ortak yazılı kâğıdı.
            </span>
          </div>
          <div className="flex items-center space-x-1.5 text-xs text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-lg font-semibold shrink-0">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>A4 Baskı Tasarrufu: Aktif (2 Sayfaya Sığdırma)</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2.5">
          {/* Print Layout Options */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="text-slate-500 font-semibold text-[11px]">Cevap Alanı:</span>
            <div className="inline-flex rounded-lg border border-slate-300 bg-white p-0.5 shadow-2xs">
              <button
                type="button"
                onClick={() => setAnswerLineCount(2)}
                className={`px-2 py-1 rounded-md text-[11px] font-medium transition-all ${
                  answerLineCount === 2
                    ? 'bg-indigo-600 text-white font-bold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="2 Satır (Ekstra Sayfa Tasarrufu)"
              >
                2 Satır
              </button>
              <button
                type="button"
                onClick={() => setAnswerLineCount(3)}
                className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all ${
                  answerLineCount === 3
                    ? 'bg-indigo-600 text-white font-bold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="3 Satır (Önerilen MEB Standardı - 2 Sayfa)"
              >
                3 Satır (Standart)
              </button>
              <button
                type="button"
                onClick={() => setAnswerLineCount(4)}
                className={`px-2 py-1 rounded-md text-[11px] font-medium transition-all ${
                  answerLineCount === 4
                    ? 'bg-indigo-600 text-white font-bold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="4 Satır (Geniş Çözüm Alanı)"
              >
                4 Satır
              </button>
            </div>

            <label className="inline-flex items-center gap-1.5 ml-1 text-[11px] font-medium text-slate-600 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={showOutcomeTitleInPrint}
                onChange={(e) => setShowOutcomeTitleInPrint(e.target.checked)}
                className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 w-3.5 h-3.5"
              />
              <span>Kazanım Açıklamasını Baskıda Göster</span>
            </label>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            {onOpenInteractivePractice && (
              <button
                onClick={onOpenInteractivePractice}
                className="inline-flex items-center px-3.5 py-1.5 rounded-lg text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs transition-colors cursor-pointer active:scale-95"
                title="Sınavı ekran üzerinde açık uçlu olarak çöz ve rubrikle öz değerlendirme yap"
              >
                <PenTool className="w-3.5 h-3.5 mr-1.5 text-amber-300" />
                Etkileşimli Çöz
              </button>
            )}

            <button
              onClick={() => setShowRubric(!showRubric)}
              className={`inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                showRubric
                  ? 'bg-amber-600 text-white hover:bg-amber-700'
                  : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-50 shadow-2xs'
              }`}
            >
              {showRubric ? (
                <>
                  <EyeOff className="w-3.5 h-3.5 mr-1" />
                  Rubrik & Çözümleri Gizle
                </>
              ) : (
                <>
                  <Eye className="w-3.5 h-3.5 mr-1 text-amber-600" />
                  Rubrik & Çözümleri Göster
                </>
              )}
            </button>

            <button
              onClick={onOpenAIGenerator}
              className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200 hover:bg-indigo-100 transition-colors cursor-pointer shadow-2xs"
            >
              <Sparkles className="w-3.5 h-3.5 mr-1 text-indigo-600" />
              Yeni Sınav Oluştur
            </button>

            <button
              onClick={() => window.print()}
              className="inline-flex items-center px-3.5 py-1.5 rounded-lg text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white shadow-xs transition-colors cursor-pointer active:scale-95"
            >
              <Printer className="w-3.5 h-3.5 mr-1.5 text-amber-300" />
              {showRubric ? 'Cevap Anahtarını Yazdır / PDF' : 'Sınavı Yazdır / PDF İndir'}
            </button>
          </div>
        </div>
      </div>

      {/* Printable Exam Paper Container (A4 Styled Sheet) */}
      <div className="bg-white rounded-2xl shadow-md border border-slate-200 p-6 sm:p-10 print:shadow-none print:border-none print:p-0 print:m-0 print:w-full">
        
        {/* Official Header */}
        <div className="border-2 border-slate-800 rounded-xl p-4 sm:p-5 mb-8 print:p-2.5 print:mb-2.5 print:border print:border-slate-800 print:rounded-lg">
          <div className="text-center pb-4 border-b-2 border-slate-300 print:pb-1.5 print:border-b print:border-slate-400">
            <h3 className="text-xs sm:text-sm font-bold tracking-widest text-slate-800 uppercase print:text-[10px] print:tracking-wider">
              T.C. MİLLÎ EĞİTİM BAKANLIĞI
            </h3>
            <h1 className="text-base sm:text-lg font-black text-slate-900 mt-0.5 tracking-tight uppercase print:text-xs print:font-extrabold print:mt-0">
              {examPaper.title}
              {showRubric && (
                <span className="text-emerald-700 ml-2 font-bold normal-case print:text-[10px] print:text-emerald-800">
                  (Cevap Anahtarı & Rubrik)
                </span>
              )}
            </h1>
            <p className="text-xs font-semibold text-slate-600 mt-1 print:text-[9px] print:mt-0.5">
              Türkiye Yüzyılı Maarif Modeli Açık Uçlu Ortak Değerlendirme Kağıdı
            </p>
          </div>

          {/* Student Info & Grade Box */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 pt-3 text-xs sm:text-sm print:pt-1.5 print:gap-1.5 print:text-[11px]">
            <div className="sm:col-span-8 space-y-1.5 font-medium text-slate-800 print:space-y-1">
              <div className="flex items-center">
                <span className="w-28 font-bold text-slate-600 print:w-24">Öğrenci Adı Soyadı:</span>
                <span className="border-b border-dashed border-slate-400 flex-1 h-5 print:h-4"></span>
              </div>
              <div className="flex items-center">
                <span className="w-28 font-bold text-slate-600 print:w-24">Sınıfı ve Şubesi:</span>
                <span className="border-b border-dashed border-slate-400 w-24 h-5 mr-4 print:h-4 print:w-16"></span>
                <span className="font-bold text-slate-600 mr-2">Okul No:</span>
                <span className="border-b border-dashed border-slate-400 flex-1 h-5 print:h-4"></span>
              </div>
              <div className="flex items-center text-slate-500 text-[11px] pt-1 print:pt-0.5 print:text-[10px]">
                <span>Sınav Süresi: <strong>{examPaper.durationMinutes} Dakika</strong></span>
                <span className="mx-2">•</span>
                <span>Toplam Puan: <strong>{examPaper.totalPoints} Puan</strong></span>
              </div>
            </div>

            {/* Teacher Grade Scoring Box */}
            <div className="sm:col-span-4 flex sm:justify-end">
              <div className="border-2 border-slate-800 rounded-lg p-2 text-center w-full sm:w-36 bg-slate-50 print:border print:border-slate-800 print:w-28 print:p-1 print:rounded-md">
                <span className="block text-[11px] font-bold uppercase text-slate-600 print:text-[9px]">
                  ALDIĞI NOT
                </span>
                <div className="text-2xl font-black text-slate-900 h-9 flex items-center justify-center print:h-6 print:text-base">
                  / 100
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* General Instructions */}
        <div className="mb-6 p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-600 space-y-1 print:mb-2.5 print:p-1.5 print:text-[10px] print:bg-slate-50/50 print:border-slate-300 print:space-y-0.5">
          <span className="font-bold text-slate-800 block print:inline print:mr-1">Yönerge:</span>
          {examPaper.instructions.map((ins, i) => (
            <span key={i} className="print:inline-block print:mr-2">
              <span className="print:hidden">• </span>
              {ins}
            </span>
          ))}
        </div>

        {/* Question List */}
        <div className="space-y-8 print:space-y-0">
          {examPaper.questions.map((q) => (
            <div 
              key={q.questionNumber} 
              className="exam-question-item border-b border-slate-200 pb-8 last:border-b-0 print:border-b print:border-slate-300 print:pb-3 print:mb-3 print:last:mb-0 print:last:border-b-0"
            >
              {/* Question Header: Number, Outcome, Difficulty, Archetype, Points */}
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3 print:mb-1.5 print:gap-1">
                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 print:gap-1">
                  <span className="w-7 h-7 rounded-lg bg-slate-900 text-white font-extrabold text-sm flex items-center justify-center shrink-0 print:w-5 print:h-5 print:text-xs print:rounded">
                    {q.questionNumber}
                  </span>
                  
                  {/* Öğrenme Çıktısı Rozeti (Kodu + Başlığı) */}
                  <span className="text-xs font-semibold text-indigo-900 bg-indigo-50 px-2.5 py-0.5 rounded-md border border-indigo-200 print:bg-slate-100 print:border-slate-300 print:text-slate-900 print:px-1.5 print:py-0 print:text-[11px]">
                    <strong className="font-mono text-indigo-700 mr-1 print:text-black">[{q.outcomeCode}]</strong>
                    <span className={showOutcomeTitleInPrint ? '' : 'print:hidden'}>
                      {formatOutcomeBadgeTitle(q.outcomeTitle, q.outcomeCode) ? `• ${formatOutcomeBadgeTitle(q.outcomeTitle, q.outcomeCode)}` : ''}
                    </span>
                  </span>

                  {/* Zorluk Derecesi (Öğrenci sınavında yer almaz, baskıda gizlenir) */}
                  <span className={`text-[11px] font-bold px-2 py-0.5 rounded print:hidden ${
                    q.difficulty === 'Zor'
                      ? 'bg-purple-100 text-purple-900 border border-purple-200'
                      : q.difficulty === 'Kolay'
                      ? 'bg-emerald-100 text-emerald-900 border border-emerald-200'
                      : 'bg-blue-100 text-blue-900 border border-blue-200'
                  }`}>
                    Zorluk: {q.difficulty || 'Orta'}
                  </span>

                  {/* MEBİ Pedagojik Şablonu (Öğrenci sınavında yer almaz, baskıda gizlenir) */}
                  {q.archetype && (
                    <span className="text-[10px] font-bold text-amber-900 bg-amber-100 border border-amber-200 px-2 py-0.5 rounded-full print:hidden">
                      ★ {q.archetype}
                    </span>
                  )}
                </div>

                <div className="text-xs font-bold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200 shrink-0 print:bg-transparent print:border-none print:font-extrabold print:text-xs print:text-black print:p-0">
                  {q.points} Puan
                </div>
              </div>

              {/* Context / Stimulus Text (if any) */}
              {q.contextText && (
                <div className="text-xs sm:text-sm text-slate-600 italic mb-2 bg-slate-50 p-2.5 rounded-lg border-l-4 border-slate-400 print:p-1.5 print:mb-1 print:text-[10px] print:bg-slate-50/50 print:border-slate-400">
                  <MathRenderer content={q.contextText} />
                </div>
              )}

              {/* Special Stimulus (Experiment setup, scenario text, data, dialogue) */}
              {q.stimulus && (
                <div className="text-xs sm:text-sm text-slate-800 font-medium mb-3 bg-amber-50/70 p-3.5 rounded-xl border border-amber-200 shadow-2xs whitespace-pre-line leading-relaxed print:bg-slate-50/70 print:border print:border-slate-300 print:p-2.5 print:mb-1.5 print:text-[11px] print:leading-snug print:rounded-lg print:shadow-none">
                  {q.commonStimulus && (
                    <div className="text-[10px] font-bold text-amber-900 uppercase tracking-wider mb-1 flex items-center print:text-[9px] print:text-slate-800">
                      ★ {q.commonStimulus}
                    </div>
                  )}
                  <MathRenderer content={q.stimulus} />
                </div>
              )}

              {/* Missing Source Material Warning Banner */}
              {q.hasMissingSourceError && (
                <div className="p-3 mb-3 bg-rose-50 border border-rose-300 rounded-xl text-xs text-rose-900 font-semibold flex items-start space-x-2 print:border-rose-400 print:text-[10px]">
                  <span>⚠️</span>
                  <div>
                    <strong>Eksik Kaynak Uyarısı:</strong> {q.sourceValidationError || 'Bu soru bir kaynak metne/tabloya dayanmaktadır ancak kaynak materyal sınavda bulunamamıştır.'}
                  </div>
                </div>
              )}

              {/* Main Question Text */}
              <div className="text-sm sm:text-base font-semibold text-slate-900 mb-4 pl-1 print:text-[12px] print:font-bold print:mb-2 print:pl-0 print:leading-snug">
                <MathRenderer content={q.questionText} />
              </div>

              {/* Student Answer Space (Blank lines or boxed area) */}
              <div className="mt-4 pt-3 border-t border-dashed border-slate-300 print:mt-1.5 print:pt-1">
                <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 print:mb-1 print:text-[10px] print:text-slate-600">
                  <span>Öğrenci Çözüm ve Cevap Alanı:</span>
                  <span className="print:inline hidden print:text-[10px] print:font-bold">Puan: [ &nbsp; &nbsp; / {q.points} ]</span>
                </div>
                {/* Lined writing area for real printing - perfectly equal row heights */}
                <div className="w-full rounded-lg bg-slate-50/50 border border-slate-200 print:bg-transparent print:border-slate-300 overflow-hidden divide-y divide-slate-200 print:divide-slate-300">
                  {Array.from({ length: answerLineCount }).map((_, lineIdx) => (
                    <div 
                      key={lineIdx} 
                      className="h-8 print:h-7 w-full"
                    />
                  ))}
                </div>
              </div>

              {/* Optional Scoring Rubric & Model Answer Box (Toggled by user) */}
              {showRubric && (
                <div className="mt-5 p-4 bg-emerald-50/80 rounded-xl border border-emerald-200 text-xs text-slate-800 space-y-3 print:block print:bg-emerald-50/30 print:border print:border-emerald-300 print:p-2.5 print:mt-2.5 print:mb-2 print:space-y-1.5 print:text-[10px] print:leading-snug print:rounded-lg print:break-inside-avoid">
                  <div className="flex flex-wrap items-center justify-between gap-1 text-emerald-900 font-bold border-b border-emerald-200 pb-2 print:pb-1 print:border-emerald-300">
                    <span className="flex items-center print:text-[10.5px]">
                      <CheckCircle2 className="w-4 h-4 mr-1.5 text-emerald-700 print:w-3.5 print:h-3.5" />
                      MEB Model Cevap ve Çözüm Adımları
                    </span>
                    <span className="text-[11px] font-medium text-emerald-900 bg-emerald-100 px-2.5 py-0.5 rounded border border-emerald-300 print:text-[9px] print:px-1.5 print:py-0">
                      ÖDSGM Bilişsel Düzey (Öğretmen Kaydı): <strong>{q.cognitiveLevel}</strong>
                    </span>
                  </div>

                  <div className="bg-white p-3 rounded-lg border border-emerald-100 font-medium whitespace-pre-line text-slate-700 print:p-2 print:text-[10px] print:border-emerald-200 print:bg-white">
                    <MathRenderer content={q.modelAnswer} />
                  </div>

                  {/* Alternatif Kabul Edilebilir Yanıtlar */}
                  {q.alternativeAnswers && q.alternativeAnswers.length > 0 && (
                    <div className="bg-emerald-50/50 p-2.5 rounded-lg border border-emerald-200/70 text-xs text-slate-700 space-y-1 print:p-2 print:text-[10px] print:bg-emerald-50/50 print:border-emerald-300">
                      <span className="font-bold text-emerald-900 block text-[11px] print:text-[9.5px]">
                        Kabul Edilebilir Diğer Örnek Yanıtlar:
                      </span>
                      <ul className="list-disc list-inside space-y-0.5 text-slate-700 pl-1 text-[11px] print:text-[9.5px]">
                        {q.alternativeAnswers.map((alt, aIdx) => (
                          <li key={aIdx}>
                            <MathRenderer content={alt} />
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Rubric Points Breakdown */}
                  <div>
                    <span className="font-bold text-slate-700 block mb-1 print:text-[10px] print:mb-0.5">
                      Analitik Dereceli Puanlama Anahtarı (Rubrik):
                    </span>
                    <div className="bg-white rounded-lg border border-slate-200 overflow-hidden print:border-slate-300">
                      <table className="min-w-full divide-y divide-slate-200 text-[11px] print:text-[9.5px] print:divide-slate-300">
                        <thead className="bg-slate-50 print:bg-slate-100">
                          <tr>
                            <th className="px-3 py-1.5 text-left font-bold text-slate-600 print:px-2 print:py-0.5">Ölçüt / Beklenen Basamak</th>
                            <th className="px-3 py-1.5 text-right font-bold text-slate-600 w-20 print:px-2 print:py-0.5 print:w-16">Puan</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 print:divide-slate-200">
                          {q.rubric.map((r, rIdx) => (
                            <tr key={rIdx}>
                              <td className="px-3 py-1.5 text-slate-700 print:px-2 print:py-0.5">{r.criterion}</td>
                              <td className="px-3 py-1.5 text-right font-bold text-emerald-700 print:px-2 print:py-0.5 print:text-emerald-900">+{r.points} p</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-8 pt-4 border-t-2 border-slate-800 flex items-center justify-between text-[11px] text-slate-500 print:mt-3 print:pt-2 print:border-t print:border-slate-400 print:text-[10px]">
          <span>T.C. MEB Türkiye Yüzyılı Maarif Modeli</span>
          <span>Sınavınız bitmiştir, lütfen cevaplarınızı kontrol ediniz.</span>
          <span className="print:hidden">Sayfa 1 / 1</span>
        </div>
      </div>
    </div>
  );
};
