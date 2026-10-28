import React from 'react';
import { Sparkles, Printer, GraduationCap, ShieldCheck, Globe } from 'lucide-react';

interface NavbarProps {
  onOpenAIModal: () => void;
  onOpenSourcesModal: () => void;
  onPrint: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenAIModal,
  onOpenSourcesModal,
  onPrint,
}) => {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm print:hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-600 to-red-700 flex items-center justify-center text-white shadow-md shadow-red-200">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-lg text-slate-900 tracking-tight">
                  OYSS <span className="text-red-600">Portal</span>
                </span>
                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-red-50 text-red-700 border border-red-200">
                  TYMM Uyumlu
                </span>
                <span className="hidden sm:inline-flex items-center text-xs text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  <ShieldCheck className="w-3.5 h-3.5 mr-1" />
                  ÖDSGM Senaryo Esaslı
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                Türkiye Yüzyılı Maarif Modeli Ortak Yazılı Sınav Hazırlık ve Materyal Üretim Sistemi
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <button
              onClick={onOpenAIModal}
              className="inline-flex items-center px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-lg text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-sm transition-all hover:shadow active:scale-95"
              title="Yapay zeka ile seçtiğin senaryoya uygun yeni açık uçlu soru ve çalışma kağıdı üret"
            >
              <Sparkles className="w-4 h-4 mr-1.5" />
              <span className="hidden md:inline">Yapay Zekâ ile</span> Soru Üret
            </button>

            <button
              onClick={onOpenSourcesModal}
              className="inline-flex items-center px-3 py-2 text-xs sm:text-sm font-semibold rounded-lg text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 transition-colors shadow-2xs"
              title="Bakanlığın resmi sitelerinden çekilen müfredat ve senaryoların eşzamanlama durumu"
            >
              <Globe className="w-4 h-4 mr-1.5 text-emerald-600" />
              <span className="hidden sm:inline">Resmi MEB</span> Kaynakları
            </button>

            <button
              onClick={onPrint}
              className="inline-flex items-center px-3 py-2 text-xs sm:text-sm font-medium rounded-lg text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 shadow-sm transition-colors"
              title="A4 formatında yazdır veya PDF olarak kaydet"
            >
              <Printer className="w-4 h-4 mr-1.5 text-slate-600" />
              <span>Yazdır / PDF</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
