import React from 'react';
import { ExamScenario, GradeLevel, ExamTerm } from '../types';
import { resolveOutcomeMetadata, SubjectMeta } from '../data/curriculumData';
import { 
  Sparkles, 
  FileText, 
  Layers, 
  BookOpen,
  Info,
  Play,
  RotateCcw
} from 'lucide-react';

interface ScenarioOverviewViewProps {
  scenario: ExamScenario;
  grade: GradeLevel;
  subjectMeta?: SubjectMeta;
  examTerm: ExamTerm;
  onOpenAIGenerator: () => void;
  onOpenStudySheet: () => void;
  onOpenInteractivePractice?: () => void;
  onSwitchToTerm1?: () => void;
}

export const ScenarioOverviewView: React.FC<ScenarioOverviewViewProps> = ({
  scenario,
  grade,
  subjectMeta,
  examTerm,
  onOpenAIGenerator,
  onOpenStudySheet,
  onOpenInteractivePractice,
  onSwitchToTerm1
}) => {
  const subjectName = (subjectMeta?.id === 'sosyal_bilgiler' && grade === 8)
    ? 'T.C. İnkılap Tarihi ve Atatürkçülük'
    : (subjectMeta ? subjectMeta.name : 'Ders');

  // Genişletilmiş soru listesi (questionCount > 1 olan kazanımları çoklu satır olarak açar)
  const expandedRows: {
    questionNumber: number;
    outcomeCode: string;
    cognitiveLevel: string;
    notes?: string;
    officialTitle: string;
    displayLabel: string;
    topicNote: string;
  }[] = [];

  let qNum = 1;
  for (const d of scenario.distributions) {
    const count = d.questionCount || 1;
    const resolved = resolveOutcomeMetadata(d.outcomeCode, d.notes, d.cognitiveLevel);
    for (let c = 0; c < count; c++) {
      expandedRows.push({
        questionNumber: qNum++,
        outcomeCode: d.outcomeCode,
        cognitiveLevel: d.cognitiveLevel,
        notes: d.notes,
        officialTitle: resolved.officialTitle,
        displayLabel: resolved.displayLabel,
        topicNote: resolved.topicNote
      });
    }
  }

  const termLabel = examTerm === '1_donem_2_yazili'
    ? '1. Dönem 2. Yazılı (Ocak Ortak Sınavı)'
    : (examTerm === '1_donem_1_yazili' ? '1. Dönem 1. Yazılı (Kasım Ortak Sınavı)' : 'Dönem Yazılısı');

  const sourceLabel = scenario.sourceOrigin === 'oyss_curated'
    ? 'OYSS Rehberi Müfredat Uyarlaması'
    : 'MEB ÖDSGM Resmî Konu-Soru Dağılımı';

  return (
    <div className="max-w-4xl mx-auto py-6 px-4 sm:px-6 space-y-6 animate-in fade-in duration-200">
      
      {/* Üst Bilgi Kartı & Çerçeve Başlığı */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="flex items-center space-x-2">
            <span className="px-3 py-1 bg-indigo-50 border border-indigo-200 text-indigo-900 rounded-full text-xs font-bold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
              {sourceLabel}
            </span>
            <span className="px-2.5 py-1 bg-slate-100 text-slate-700 rounded-lg text-xs font-semibold">
              {termLabel}
            </span>
          </div>

          <div className="flex items-center space-x-1.5 text-xs text-slate-600 bg-slate-50 border border-slate-200 px-3 py-1 rounded-lg">
            <Layers className="w-3.5 h-3.5 text-slate-500" />
            <span>Toplam <strong>{scenario.totalQuestions} Soru</strong></span>
          </div>
        </div>

        <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mb-2">
          {grade}. Sınıf {subjectName} — {scenario.name}
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-3xl mb-5">
          {scenario.description || 'Millî Eğitim Bakanlığı Ölçme, Değerlendirme ve Sınav Hizmetleri Genel Müdürlüğü tarafından yayımlanan resmî senaryo ve konu-soru dağılım tablosu aşağıda listelenmiştir.'}
        </p>

        {/* Bilgilendirme ve Eylem Çağrısı Kutusu */}
        <div className="bg-gradient-to-r from-indigo-50 via-purple-50 to-indigo-50 border border-indigo-200/80 rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-start space-x-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-xs mt-0.5">
              <Sparkles className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900">
                Resmî Senaryo Çerçevesine Göre Sınav Hazırlığı
              </h2>
              <p className="text-xs text-slate-600 mt-0.5 max-w-xl leading-relaxed">
                Bu senaryo için arşivde statik örnek sınav bulunmamaktadır. Bakanlığın konu-soru dağılım tablosunu kullanarak 
                <strong> Yapay Zekâ (Gemini)</strong> ile eksiksiz bir sınav üretebilir ve hemen etkileşimli olarak çözebilirsiniz.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <button
              onClick={onOpenAIGenerator}
              className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs sm:text-sm font-bold shadow-xs hover:shadow-sm transition-all inline-flex items-center gap-2 cursor-pointer active:scale-95"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Yapay Zekâ ile Sınav Hazırla</span>
            </button>
            {onOpenInteractivePractice && (
              <button
                onClick={onOpenAIGenerator}
                className="px-3.5 py-2.5 bg-white hover:bg-slate-50 border border-indigo-300 text-indigo-700 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-2xs hover:shadow-xs inline-flex items-center gap-1.5 cursor-pointer"
                title="Sınav hazırlayıp etkileşimli çözme moduna aktar"
              >
                <Play className="w-3.5 h-3.5 text-indigo-600" />
                <span>Etkileşimli Çöz</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Resmî Konu-Soru Dağılım Tablosu */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="p-4 sm:p-5 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <FileText className="w-4 h-4 text-slate-600" />
            <h2 className="text-xs sm:text-sm font-bold text-slate-800">
              Resmî Konu-Soru Dağılım Çizelgesi
            </h2>
          </div>
          <span className="text-[11px] font-semibold text-slate-500">
            {expandedRows.length} Soru Dağılımı
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm border-collapse">
            <thead>
              <tr className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200 text-[11px] sm:text-xs">
                <th className="py-3 px-3 sm:px-4 w-14 text-center">Soru</th>
                <th className="py-3 px-3 sm:px-4 w-32">Kazanım Kodu</th>
                <th className="py-3 px-3 sm:px-4">Konu ve Öğrenme Çıktısı Açıklaması</th>
                <th className="py-3 px-3 sm:px-4 w-40 text-center">Bilişsel Düzey</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-800">
              {expandedRows.map((row) => (
                <tr key={row.questionNumber} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-3 sm:px-4 text-center font-bold text-slate-600">
                    <span className="w-6 h-6 rounded-full bg-slate-100 inline-flex items-center justify-center text-xs">
                      {row.questionNumber}
                    </span>
                  </td>
                  <td className="py-3 px-3 sm:px-4 font-mono font-bold text-indigo-700 text-xs">
                    <span className="px-2 py-1 bg-indigo-50 border border-indigo-200/70 rounded-md">
                      {row.outcomeCode}
                    </span>
                  </td>
                  <td className="py-3 px-3 sm:px-4">
                    <div className="font-semibold text-slate-900 leading-snug">
                      {row.displayLabel}
                    </div>
                    {row.topicNote && row.topicNote !== row.displayLabel && (
                      <div className="text-[11px] text-slate-500 mt-0.5">
                        Konu: {row.topicNote}
                      </div>
                    )}
                  </td>
                  <td className="py-3 px-3 sm:px-4 text-center">
                    <span className={`inline-block px-2.5 py-1 rounded-md text-[11px] font-semibold border ${
                      row.cognitiveLevel.includes('Basit')
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                        : 'bg-amber-50 text-amber-800 border-amber-200'
                    }`}>
                      {row.cognitiveLevel}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Tablo Alt Çubuğu */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center space-x-2 text-slate-600">
            <Info className="w-4 h-4 text-slate-400 shrink-0" />
            <span>Tablodaki dağılım, MEB ÖDSGM ve Temel Eğitim Genel Müdürlüğü yönergeleriyle birebir uyumludur.</span>
          </div>

          <div className="flex items-center space-x-2">
            {onSwitchToTerm1 && (
              <button
                onClick={onSwitchToTerm1}
                className="px-3 py-1.5 bg-white hover:bg-slate-100 border border-slate-300 text-slate-700 rounded-lg font-bold text-xs transition-colors cursor-pointer inline-flex items-center gap-1.5"
                title="1. Dönem 1. Yazılı örnek sınav arşivine geç"
              >
                <RotateCcw className="w-3.5 h-3.5 text-slate-600" />
                1. Yazılı Arşivi
              </button>
            )}
            <button
              onClick={onOpenStudySheet}
              className="px-3 py-1.5 bg-white hover:bg-slate-100 border border-slate-300 text-slate-700 rounded-lg font-bold text-xs transition-colors cursor-pointer inline-flex items-center gap-1.5"
            >
              <BookOpen className="w-3.5 h-3.5 text-blue-600" />
              Çalışma Kâğıdını Gör
            </button>
            <button
              onClick={onOpenAIGenerator}
              className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-bold text-xs shadow-xs transition-colors cursor-pointer inline-flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              Sınavı Oluştur
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};
