import React, { useState, useEffect } from 'react';
import { 
  GradeLevel, 
  SubjectId, 
  ExamTerm, 
  ExamScenario
} from '../types';
import { ALL_SUBJECTS, getOfficialOutcomeTitle, formatOutcomeBadgeTitle } from '../data/curriculumData';
import { calibrateQuestionDifficulties } from '../utils/difficultyCalibrator';
import { 
  X, 
  Sparkles, 
  Cpu, 
  CheckCircle2,
  MessageSquareQuote,
  FileCheck2,
  RotateCw
} from 'lucide-react';
import { MathRenderer } from './MathRenderer';
import { generateMEBIQuestions, GenerationResult } from '../utils/aiGeneratorEngine';

interface AIGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  grade: GradeLevel;
  subjectId: SubjectId;
  examTerm: ExamTerm;
  scenario: ExamScenario;
  onApplyGeneratedExam?: (customExam: any) => void;
}

export const AIGeneratorModal: React.FC<AIGeneratorModalProps> = ({
  isOpen,
  onClose,
  grade,
  subjectId,
  examTerm,
  scenario,
  onApplyGeneratedExam,
}) => {
  const [outputType, setOutputType] = useState<'exam' | 'study_sheet' | 'practice_question'>('exam');
  const [cognitiveWeight, setCognitiveWeight] = useState<'standard' | 'more_complex' | 'foundational'>('standard');
  const [questionCountChoice, setQuestionCountChoice] = useState<number>(scenario.totalQuestions || 6);

  // Sync question count choice whenever scenario changes
  useEffect(() => {
    if (scenario?.totalQuestions) {
      setQuestionCountChoice(scenario.totalQuestions);
    }
  }, [scenario?.id, scenario?.totalQuestions]);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generatedResult, setGeneratedResult] = useState<GenerationResult | null>(null);
  const [variationCount, setVariationCount] = useState<number>(0);
  const apiKey = 
    (typeof import.meta !== 'undefined' && import.meta.env?.VITE_GEMINI_API_KEY) ||
    (typeof window !== 'undefined' && sessionStorage.getItem('gemini_api_key')) ||
    '';

  if (!isOpen) return null;

  const subjectMeta = ALL_SUBJECTS.find((s) => s.id === subjectId);

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const nextIndex = variationCount;
      const res = await generateMEBIQuestions(
        subjectId,
        grade,
        scenario,
        nextIndex,
        apiKey,
        questionCountChoice
      );
      setVariationCount(nextIndex + 1);
      setGeneratedResult(res);
    } catch (err) {
      console.error('Generation error:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-3xl w-full shadow-2xl border border-slate-200 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-150">
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-indigo-900 via-slate-900 to-purple-950 p-5 text-white flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-amber-300">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold flex items-center">
                TYMM Soru & Materyal Üretim Motoru
                <span className="ml-2 text-[10px] bg-indigo-500/30 text-indigo-200 border border-indigo-400/30 px-2 py-0.5 rounded-full font-normal">
                  Özgün Sınav & MEBİ Standartlı
                </span>
              </h2>
              <p className="text-xs text-indigo-200">
                Seçili: {grade}. Sınıf {subjectMeta?.name} • {scenario.name}
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
          
          {/* Configuration Controls */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs sm:text-sm">
            <div>
              <label className="block font-bold text-slate-700 mb-1.5">
                Üretilecek Materyal:
              </label>
              <select
                value={outputType}
                onChange={(e) => setOutputType(e.target.value as any)}
                className="w-full bg-white border border-slate-300 rounded-lg p-2 text-xs font-semibold text-slate-800 focus:ring-2 focus:ring-indigo-500"
              >
                <option value="exam">Özgün Sınav Kağıdı (MEBİ Standartlı)</option>
                <option value="study_sheet">Hap Bilgili Çalışma Kağıdı & Tuzaklar</option>
                <option value="practice_question">Kazanım Odaklı Soru Seti</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1.5">
                Üretilecek Soru Sayısı:
              </label>
              <select
                value={questionCountChoice}
                onChange={(e) => setQuestionCountChoice(Number(e.target.value))}
                className="w-full bg-white border border-slate-300 rounded-lg p-2 text-xs font-semibold text-indigo-900 bg-indigo-50/50 focus:ring-2 focus:ring-indigo-500"
              >
                <option value={scenario.totalQuestions || 6}>
                  ★ Tam Sınav ({scenario.totalQuestions || 6} Soru - Senaryo Standardı)
                </option>
                <option value={5}>5 Soru (Standart Yazılı)</option>
                <option value={6}>6 Soru (Geniş Yazılı)</option>
                <option value={7}>7 Soru (Kapsamlı MEBİ Seti)</option>
                <option value={3}>3 Soru (Hızlı Alıştırma Seti)</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1.5">
                Bilişsel Süreç & Zorluk:
              </label>
              <select
                value={cognitiveWeight}
                onChange={(e) => setCognitiveWeight(e.target.value as any)}
                className="w-full bg-white border border-slate-300 rounded-lg p-2 text-xs font-semibold text-slate-800 focus:ring-2 focus:ring-indigo-500"
              >
                <option value="standard">MEB Dengeli Dağılım (~%20-25 Kolay, ~%50-60 Orta, ~%15-20 Zor)</option>
                <option value="more_complex">Karmaşık Bilişsel / Üst Düzey Beceri</option>
                <option value="foundational">Temel Kavram ve Uygulama Ağırlıklı</option>
              </select>
            </div>
          </div>

          {/* Action Button: Generate */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-1 border-b border-slate-200 pb-3">
            <div className="text-xs font-semibold text-slate-600">
              MEB ÖDSGM Senaryo Esaslı Açık Uçlu Soru Seti Hazırlama
            </div>

            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="inline-flex items-center px-4 py-2 rounded-xl text-xs sm:text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-md transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
            >
              {isGenerating ? (
                <>
                  <Cpu className="w-4 h-4 mr-2 animate-spin" />
                  Sorular Hazırlanıyor...
                </>
              ) : generatedResult ? (
                <>
                  <RotateCw className="w-4 h-4 mr-2 text-amber-300" />
                  Farklı Sorular Hazırla
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 mr-2 text-amber-300" />
                  Özgün Soru Üret
                </>
              )}
            </button>
          </div>

          {/* Preview or Empty State */}
          <div>
            {generatedResult ? (
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between bg-emerald-50 border border-emerald-200 p-3 rounded-xl text-xs text-emerald-900 font-semibold gap-2">
                  <span className="flex items-center">
                    <CheckCircle2 className="w-4 h-4 mr-1.5 text-emerald-600 shrink-0" />
                    Başarıyla hazırlandı: Soru Seti #{generatedResult.variationNumber} ({generatedResult.questionsCount} açık uçlu soru ve MEB puanlama rubriği).
                  </span>
                  <span className="text-[11px] text-slate-500">
                    MEBİ Uyumlu Akıllı Motor • {generatedResult.generationTime}
                  </span>
                </div>

                  <div className="space-y-4">
                    {generatedResult.generatedQuestions.map((gq, i) => (
                      <div key={i} className="border border-slate-200 rounded-xl p-4 sm:p-5 bg-white shadow-xs">
                        {/* Header Badge Row */}
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                          <div className="flex flex-wrap items-center gap-1.5">
                            <span className="text-xs font-bold text-slate-900 bg-slate-100 px-2.5 py-0.5 rounded-lg border border-slate-200">
                              Soru {gq.number} ({gq.points} Puan)
                            </span>
                            <span className="text-[11px] font-semibold text-indigo-900 bg-indigo-50 px-2.5 py-0.5 rounded border border-indigo-200">
                              <strong className="font-mono text-indigo-700 mr-1">{gq.outcome}</strong>
                              {formatOutcomeBadgeTitle(gq.outcomeTitle, gq.outcome) ? `• ${formatOutcomeBadgeTitle(gq.outcomeTitle, gq.outcome)}` : ''}
                            </span>
                            {gq.difficulty && (
                              <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                                gq.difficulty === 'Zor'
                                  ? 'bg-purple-100 text-purple-900'
                                  : gq.difficulty === 'Kolay'
                                  ? 'bg-emerald-100 text-emerald-900'
                                  : 'bg-blue-100 text-blue-900'
                              }`}>
                                Zorluk: {gq.difficulty}
                              </span>
                            )}
                            {gq.templateType && (
                              <span className="text-[10px] font-bold text-amber-900 bg-amber-100 border border-amber-200 px-2 py-0.5 rounded-full">
                                ★ {gq.templateType}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Stimulus / Dialogue / Scenario Box (Crucial for MEBİ) */}
                        {gq.stimulus && (
                          <div className="bg-amber-50/80 border border-amber-200 rounded-xl p-3.5 mb-3 text-xs sm:text-sm text-slate-800 whitespace-pre-line leading-relaxed shadow-2xs">
                            <div className="flex items-center text-[11px] font-bold text-amber-900 uppercase tracking-wider mb-1.5">
                              <MessageSquareQuote className="w-3.5 h-3.5 mr-1 text-amber-700 shrink-0" />
                              Durum Senaryosu / Öğrenci Diyaloğu:
                            </div>
                            <div className="font-medium text-slate-800 pl-1 border-l-2 border-amber-300">
                              <MathRenderer content={gq.stimulus} />
                            </div>
                          </div>
                        )}

                        {/* Soru Kökü */}
                        <div className="text-xs sm:text-sm font-bold text-slate-900 mb-3 pl-1">
                          <span className="text-indigo-600 mr-1.5">Soru:</span>
                          <MathRenderer content={gq.question} />
                        </div>

                        {/* Model Cevap */}
                        <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-xs text-slate-700 mb-2">
                          <strong className="text-emerald-800 block mb-1">MEBİ Model Cevap & Gerekçe:</strong>
                          <div className="whitespace-pre-line font-medium text-slate-700">
                            <MathRenderer content={gq.answer} />
                          </div>
                        </div>

                        {/* Rubrik */}
                        <div className="text-[11px] text-slate-600 bg-white p-2.5 rounded-lg border border-slate-150">
                          <strong className="block text-slate-700 mb-1 font-bold">Puanlama Rubriği:</strong>
                          <ul className="list-disc list-inside space-y-0.5">
                            {gq.rubric.map((r, rIdx) => (
                              <li key={rIdx} className="text-slate-700">
                                {r.item} <span className="font-bold text-emerald-700">(+{r.pts} p)</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}

                    {/* Apply to Exam Button */}
                    {onApplyGeneratedExam && (
                      <div className="p-3 bg-indigo-50/70 border border-indigo-200 rounded-xl flex flex-wrap items-center justify-between gap-3">
                        <span className="text-xs text-indigo-950 font-medium">
                          Bu üretilen MEBİ sorularını ana sınav kağıdı ekranına aktarıp A4 olarak yazdırmak ister misiniz?
                        </span>
                        <button
                          onClick={() => {
                            const qCount = generatedResult.generatedQuestions.length;
                            const qPoints = qCount > 0 ? Math.round(100 / qCount) : 50;

                            const customExam = {
                              id: `ai_generated_${Date.now()}`,
                              grade: grade,
                              subjectId: subjectId,
                              examTerm: examTerm,
                              scenarioId: scenario.id,
                              title: `${grade}. Sınıf ${subjectMeta?.name} (${scenario.name}) - Özgün MEBİ Sınavı (#${generatedResult.variationNumber})`,
                              durationMinutes: 40,
                              totalPoints: 100,
                              instructions: [
                                'Bu sınav resmi senaryo kurallarına göre özel olarak hazırlanmıştır.',
                                'Soruları analitik düşünme adımlarını ve bilimsel gerekçelerinizi belirterek açık uçlu cevaplayınız.',
                                'Puanlamada MEB Analitik Dereceli Puanlama Anahtarı (Rubrik) basamakları esas alınacaktır.'
                              ],
                              questions: generatedResult.generatedQuestions.map((q) => {
                                const questionPts = q.points || qPoints;
                                const rawRubricSum = (q.rubric || []).reduce((sum, r) => sum + (r.pts || 0), 0);
                                const rubricList = (q.rubric || []).map((r) => {
                                  const pts = rawRubricSum > 0 ? Math.round((r.pts / rawRubricSum) * questionPts) : 10;
                                  return { criterion: r.item, points: pts };
                                });

                                const officialTitle = getOfficialOutcomeTitle(q.outcome);
                                const resolvedOutcomeTitle = (officialTitle && officialTitle !== q.outcome)
                                  ? officialTitle
                                  : formatOutcomeBadgeTitle(q.outcomeTitle, q.outcome) || 'MEBİ Öğrenme Çıktısı';

                                return {
                                  questionNumber: q.number,
                                  outcomeCode: q.outcome,
                                  outcomeTitle: resolvedOutcomeTitle,
                                  difficulty: q.difficulty || 'Orta',
                                  cognitiveLevel: q.level || 'Karmaşık Bilişsel Süreçler',
                                  archetype: q.templateType,
                                  points: questionPts,
                                  stimulus: q.stimulus,
                                  questionText: q.question,
                                  modelAnswer: q.answer,
                                  solutionExplanation: 'MEBİ kuralına uygun analitik çözüm ve dereceli puanlama.',
                                  rubric: rubricList
                                };
                              })
                            };

                            const calibratedQuestions = calibrateQuestionDifficulties(customExam.questions);
                            onApplyGeneratedExam({ ...customExam, questions: calibratedQuestions });
                            onClose();
                          }}
                          className="inline-flex items-center px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md transition-all active:scale-95 shrink-0"
                        >
                          <FileCheck2 className="w-4 h-4 mr-1.5 text-amber-300" />
                          Sınav Kağıdına Aktar
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="border-2 border-dashed border-slate-200 rounded-xl p-8 text-center text-slate-400 space-y-2">
                  <Sparkles className="w-8 h-8 mx-auto text-indigo-300" />
                  <p className="text-xs sm:text-sm font-semibold text-slate-600">
                    Henüz yeni sorular oluşturulmadı.
                  </p>
                  <p className="text-xs text-slate-400 max-w-sm mx-auto">
                    Yukarıdaki <strong>"Özgün Soru Üret"</strong> butonuna basarak her seferinde farklı öğrenci isimleri ve taze vaka kurgularıyla yeni sorular hazırlayabilirsiniz.
                  </p>
                </div>
              )}
            </div>
          </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 p-4 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span>MEB Maarif Modeli Açık Uçlu Soru Standartlarına Göre Denetlenmiştir.</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-100 text-slate-700 font-semibold"
          >
            Kapat
          </button>
        </div>
      </div>
    </div>
  );
};
