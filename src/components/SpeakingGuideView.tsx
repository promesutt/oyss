import React from 'react';
import { SpeakingGuide } from '../types';
import { 
  Mic, 
  Headphones, 
  CheckSquare, 
  Clock, 
  FileCheck2,
  Info,
  Printer,
  FileDown
} from 'lucide-react';

interface SpeakingGuideViewProps {
  guide: SpeakingGuide;
}

export const SpeakingGuideView: React.FC<SpeakingGuideViewProps> = ({ guide }) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto py-6 px-4 sm:px-6 space-y-6">
      {/* Top Action Bar (Print / PDF) */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3.5 sm:p-4 rounded-xl border border-slate-200 shadow-xs print:hidden">
        <div className="flex items-center space-x-2 text-xs sm:text-sm text-slate-700 font-medium">
          <span className="w-2 h-2 rounded-full bg-amber-600"></span>
          <span><strong>Resmi Dinleme ve Konuşma Kılavuzu:</strong> MEB 4 Becerili Dil Değerlendirme Çerçevesi.</span>
        </div>
        <button
          onClick={handlePrint}
          className="inline-flex items-center px-4 py-2 rounded-lg text-xs font-bold bg-amber-700 hover:bg-amber-800 text-white shadow-xs transition-colors cursor-pointer"
        >
          <Printer className="w-4 h-4 mr-1.5" />
          Kılavuzu Yazdır / PDF İndir
        </button>
      </div>

      {/* Official MEB Regulation Banner */}
      <div className="bg-gradient-to-r from-amber-700 to-orange-800 rounded-2xl p-6 text-white shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-xs font-semibold text-amber-200 uppercase tracking-wider mb-2">
              <Info className="w-4 h-4 text-amber-300" />
              <span>MEB Ölçme ve Değerlendirme Yönetmeliği Esasları</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black tracking-tight">
              {guide.title}
            </h1>
            <p className="text-xs sm:text-sm text-amber-100 mt-2 leading-relaxed">
              {guide.purpose}
            </p>
          </div>
          <button
            onClick={handlePrint}
            className="self-start sm:self-center px-3.5 py-2 rounded-xl text-xs font-bold bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all shrink-0 flex items-center print:hidden cursor-pointer"
          >
            <FileDown className="w-4 h-4 mr-1.5 text-amber-300" />
            PDF / Yazdır
          </button>
        </div>
        <div className="mt-4 p-3 bg-white/10 backdrop-blur-xs rounded-xl border border-white/20 text-xs text-amber-100 font-medium">
          ⚖️ <strong>Not Dağılımı ve Ağırlık:</strong> {guide.regulationNote}
        </div>
      </div>

      {/* Speaking Cards Section */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
        <div className="flex items-center space-x-2 border-b border-slate-200 pb-3">
          <Mic className="w-5 h-5 text-amber-600" />
          <h2 className="text-base sm:text-lg font-extrabold text-slate-900">
            Konuşma Sınavı Konu Kartları & Yönergeleri
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {guide.speakingPrompts.map((prompt, pIdx) => (
            <div 
              key={pIdx}
              className="bg-amber-50/50 rounded-xl p-5 border border-amber-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-sm sm:text-base text-slate-900">
                    {prompt.topic}
                  </h3>
                  <div className="flex items-center text-[11px] font-semibold text-amber-800 bg-amber-100 px-2 py-0.5 rounded">
                    <Clock className="w-3 h-3 mr-1" />
                    {prompt.speakTimeMinutes} dk
                  </div>
                </div>

                <div className="text-xs text-slate-500 mb-3">
                  Hazırlık Süresi: {prompt.prepTimeMinutes} dakika | Konuşma Süresi: {prompt.speakTimeMinutes} dakika
                </div>

                <div className="space-y-1.5">
                  <span className="text-xs font-bold text-slate-700 block">
                    Yönlendirici Sorular & Odak Noktaları:
                  </span>
                  <ul className="space-y-1 text-xs text-slate-700">
                    {prompt.guidingQuestions.map((q, qIdx) => (
                      <li key={qIdx} className="flex items-start">
                        <span className="text-amber-600 font-bold mr-1.5">•</span>
                        <span>{q}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-amber-200/80 text-[11px] text-amber-900 font-medium italic">
                Öğretmen Notu: Öğrencinin ezberden ziyade kendi cümleleriyle düşüncesini aktarması teşvik edilir.
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Listening Tasks Section */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
        <div className="flex items-center space-x-2 border-b border-slate-200 pb-3">
          <Headphones className="w-5 h-5 text-indigo-600" />
          <h2 className="text-base sm:text-lg font-extrabold text-slate-900">
            Dinleme Sınavı Görev ve Hedef Becerileri
          </h2>
        </div>

        <div className="space-y-4">
          {guide.listeningTasks.map((task, tIdx) => (
            <div key={tIdx} className="bg-indigo-50/50 rounded-xl p-5 border border-indigo-200">
              <h3 className="font-extrabold text-sm sm:text-base text-indigo-950 mb-1">
                {task.scenario}
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 mb-3">
                {task.taskDescription}
              </p>

              <div>
                <span className="text-xs font-bold text-slate-700 block mb-1.5">
                  Ölçülen Temel Beceriler:
                </span>
                <div className="flex flex-wrap gap-2">
                  {task.targetSkills.map((skill, sIdx) => (
                    <span 
                      key={sIdx}
                      className="inline-flex items-center text-xs font-medium bg-white text-indigo-900 px-2.5 py-1 rounded-lg border border-indigo-200 shadow-2xs"
                    >
                      <CheckSquare className="w-3.5 h-3.5 mr-1.5 text-indigo-600" />
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Assessment Rubric for Teachers */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
        <div className="flex items-center space-x-2 border-b border-slate-200 pb-3">
          <FileCheck2 className="w-5 h-5 text-emerald-600" />
          <h2 className="text-base sm:text-lg font-extrabold text-slate-900">
            MEB Uyumlu Analitik Dereceli Puanlama Ölçeği (Rubrik)
          </h2>
        </div>

        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="min-w-full divide-y divide-slate-200 text-xs sm:text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-4 py-3 text-left font-bold text-slate-700">Değerlendirme Kriteri / Alan</th>
                <th className="px-4 py-3 text-left font-bold text-slate-700">Gözlenecek Göstergeler</th>
                <th className="px-4 py-3 text-right font-bold text-slate-700 w-24">Max Puan</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-100">
              {guide.evaluationRubric.map((rub, rIdx) => (
                <tr key={rIdx} className="hover:bg-slate-50/80">
                  <td className="px-4 py-3 font-bold text-slate-900">
                    {rub.category}
                  </td>
                  <td className="px-4 py-3 text-slate-600">
                    <ul className="list-disc list-inside space-y-0.5">
                      {rub.criteria.map((c, cIdx) => (
                        <li key={cIdx}>{c}</li>
                      ))}
                    </ul>
                  </td>
                  <td className="px-4 py-3 text-right font-black text-emerald-700">
                    {rub.maxPoints} Puan
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
