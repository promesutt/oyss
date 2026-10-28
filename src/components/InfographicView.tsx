import React from 'react';
import { InfographicItem } from '../types';
import { MathRenderer } from './MathRenderer';
import { 
  Sparkles, 
  Lightbulb, 
  Table, 
  CheckCircle2,
  Zap,
  Printer,
  FileDown
} from 'lucide-react';

interface InfographicViewProps {
  infographics: InfographicItem[];
}

export const InfographicView: React.FC<InfographicViewProps> = ({ infographics }) => {
  const handlePrint = () => {
    window.print();
  };

  if (infographics.length === 0) {
    return (
      <div className="max-w-4xl mx-auto py-12 text-center text-slate-500">
        <Sparkles className="w-8 h-8 mx-auto text-slate-400 mb-2" />
        <p className="font-semibold text-sm">Bu ders ve senaryo için henüz infografik eklenmedi.</p>
        <p className="text-xs text-slate-400 mt-1">Akıllı Soru Motoru ile bu konu için anında infografik kartları üretebilirsiniz.</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-6 px-4 sm:px-6 space-y-6">
      {/* Top Action Bar (Print / PDF) */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3.5 sm:p-4 rounded-xl border border-slate-200 shadow-xs print:hidden">
        <div className="flex items-center space-x-2 text-xs sm:text-sm text-slate-700 font-medium">
          <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
          <span><strong>Görsel Kavram & Şifre Kartları:</strong> Sınav öncesi görsel hafızayı pekiştiren özetler ve tablolar.</span>
        </div>
        <button
          onClick={handlePrint}
          className="inline-flex items-center px-4 py-2 rounded-lg text-xs font-bold bg-emerald-700 hover:bg-emerald-800 text-white shadow-xs transition-colors cursor-pointer"
        >
          <Printer className="w-4 h-4 mr-1.5" />
          İnfografiği Yazdır / PDF İndir
        </button>
      </div>

      {infographics.map((info) => (
        <div 
          key={info.id}
          className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden"
        >
          {/* Header Banner */}
          <div className="bg-gradient-to-r from-emerald-800 to-teal-900 text-white p-6 sm:p-7">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <div className="flex items-center space-x-2 text-xs font-semibold text-emerald-200 uppercase tracking-wider mb-1">
                  <Zap className="w-3.5 h-3.5 text-amber-400" />
                  <span>{info.category}</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">
                  {info.title}
                </h2>
                <p className="text-xs sm:text-sm text-emerald-100 mt-1 font-medium">
                  {info.subtitle}
                </p>
              </div>
              <button
                onClick={handlePrint}
                className="self-start sm:self-center px-3.5 py-2 rounded-xl text-xs font-bold bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all shrink-0 flex items-center print:hidden cursor-pointer"
              >
                <FileDown className="w-4 h-4 mr-1.5 text-emerald-300" />
                PDF / Yazdır
              </button>
            </div>

            {/* Memory Hook / Sınav Şifresi */}
            {info.memoryHook && (
              <div className="mt-4 bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/20 text-xs sm:text-sm text-amber-200 font-semibold flex items-center space-x-2">
                <Lightbulb className="w-4 h-4 text-amber-300 shrink-0" />
                <span>{info.memoryHook}</span>
              </div>
            )}
          </div>

          <div className="p-6 space-y-6">
            {/* Summary Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {info.summaryCards.map((card, cIdx) => (
                <div 
                  key={cIdx}
                  className="bg-slate-50 rounded-xl p-5 border border-slate-200 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-extrabold text-base text-slate-900">
                        {card.title}
                      </h3>
                      <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                        {card.badge}
                      </span>
                    </div>

                    <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                      {card.points.map((pt, pIdx) => (
                        <li key={pIdx} className="flex items-start">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 mr-2 mt-0.5 shrink-0" />
                          <span className="leading-snug">
                            <MathRenderer content={pt} />
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {card.highlight && (
                    <div className="mt-4 pt-3 border-t border-slate-200 text-xs font-semibold text-emerald-800 bg-emerald-50/50 p-2.5 rounded-lg">
                      ⭐ {card.highlight}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Comparison Table (if available) */}
            {info.comparisonTable && (
              <div className="mt-6">
                <h4 className="flex items-center text-xs font-bold uppercase tracking-wider text-slate-600 mb-3">
                  <Table className="w-4 h-4 mr-1.5 text-emerald-600" />
                  Sınav Karşılaştırma Matrisi
                </h4>
                <div className="rounded-xl border border-slate-200 overflow-x-auto shadow-xs">
                  <table className="min-w-full divide-y divide-slate-200 text-xs sm:text-sm">
                    <thead className="bg-slate-100">
                      <tr>
                        {info.comparisonTable.headers.map((h, hIdx) => (
                          <th 
                            key={hIdx}
                            className="px-4 py-3 text-left font-bold text-slate-700 uppercase tracking-wider text-[11px]"
                          >
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-slate-100">
                      {info.comparisonTable.rows.map((row, rIdx) => (
                        <tr key={rIdx} className="hover:bg-slate-50/80 transition-colors">
                          {row.map((cell, cIdx) => (
                            <td 
                              key={cIdx}
                              className={`px-4 py-3 text-slate-800 ${
                                cIdx === 0 ? 'font-bold text-slate-900 bg-slate-50/40' : ''
                              }`}
                            >
                              <MathRenderer content={cell} />
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
