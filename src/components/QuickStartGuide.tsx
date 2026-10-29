import React, { useState } from 'react';
import { HelpCircle, X, Sparkles } from 'lucide-react';

const STORAGE_KEY = 'oyss_quick_start_guide_dismissed';

interface QuickStartGuideProps {
  onOpenAIModal?: () => void;
}

export const QuickStartGuide: React.FC<QuickStartGuideProps> = ({ onOpenAIModal }) => {
  // İlk kez gelen kullanıcı rehberi açık görür.
  // Kapatıldıysa localStorage'da saklanır ve kapalı başlar.
  const [isOpen, setIsOpen] = useState<boolean>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored !== 'true';
    } catch {
      return true;
    }
  });

  const handleDismiss = () => {
    setIsOpen(false);
    try {
      localStorage.setItem(STORAGE_KEY, 'true');
    } catch {
      // localStorage erişim hatası durumunda sessizce devam et
    }
  };

  const handleReopen = () => {
    setIsOpen(true);
    try {
      localStorage.setItem(STORAGE_KEY, 'false');
    } catch {
      // localStorage erişim hatası durumunda sessizce devam et
    }
  };

  // Rehber kapatıldığında gösterilen kompakt tek satırlık yönlendirici
  if (!isOpen) {
    return (
      <aside 
        aria-label="Kullanım İpucu ve Rehber"
        className="bg-slate-50/90 border-b border-slate-200/80 py-1.5 px-4 sm:px-6 lg:px-8 print:hidden transition-all"
      >
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center text-slate-600 text-[11px] sm:text-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mr-2 shrink-0" />
            <strong className="text-slate-700 font-semibold mr-1.5">İlk Adım:</strong>
            <span className="text-slate-600 hidden sm:inline">
              Aşağıdan sınıfını ve dersini seçip mevcut sınavı çözebilir veya üstteki
            </span>
            <span className="text-slate-600 sm:hidden">
              Sınav seç veya
            </span>
            {onOpenAIModal ? (
              <button
                onClick={onOpenAIModal}
                className="inline-flex items-center ml-1 text-indigo-600 hover:text-indigo-800 font-bold hover:underline cursor-pointer"
              >
                <Sparkles className="w-3 h-3 mr-0.5 text-amber-500" />
                Özgün Soru Üret
              </button>
            ) : (
              <span className="font-bold text-indigo-700 ml-1">Özgün Soru Üret</span>
            )}
            <span className="text-slate-600 ml-1">ile yeni sınav oluşturabilirsin.</span>
          </div>

          <button
            onClick={handleReopen}
            className="inline-flex items-center space-x-1 text-[11px] font-bold text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50/80 px-2 py-0.5 rounded-md transition-colors cursor-pointer ml-auto"
            title="OYSS kullanım rehberini görüntüle"
          >
            <HelpCircle className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
            <span>Nasıl kullanılır?</span>
          </button>
        </div>
      </aside>
    );
  }

  // Rehber açıkken gösterilen sade, kompakt 3 adımlı rehber
  return (
    <section 
      aria-label="OYSS Kullanım Rehberi"
      className="bg-gradient-to-r from-slate-50 via-indigo-50/30 to-blue-50/20 border-b border-slate-200 py-3 sm:py-3.5 px-4 sm:px-6 lg:px-8 print:hidden transition-all"
    >
      <div className="max-w-7xl mx-auto">
        {/* Üst Başlık ve Kapatma Butonu */}
        <div className="flex items-center justify-between gap-3 mb-2.5">
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            <div className="w-5 h-5 rounded-md bg-indigo-600 text-white flex items-center justify-center text-xs font-black shadow-2xs shrink-0">
              ?
            </div>
            <h2 className="text-xs sm:text-sm font-black text-slate-900 tracking-tight">
              OYSS nasıl kullanılır?
            </h2>
            <span className="text-slate-300 hidden md:inline">•</span>
            <p className="text-xs text-slate-600 font-medium hidden md:inline">
              Sınavını seç, çözmeye başla, kendini değerlendir!
            </p>
          </div>

          <button
            onClick={handleDismiss}
            className="inline-flex items-center space-x-1 text-xs text-slate-400 hover:text-slate-700 font-semibold px-2 py-1 rounded-lg hover:bg-slate-200/60 transition-colors cursor-pointer shrink-0"
            title="Rehberi kapat (İstediğinde 'Nasıl kullanılır?' bağlantısıyla tekrar açabilirsin)"
          >
            <span className="text-[11px]">Kapat</span>
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobilde alt açıklama */}
        <p className="text-[11px] text-slate-600 font-medium mb-2.5 md:hidden">
          Sınavını seç, çözmeye başla, kendini değerlendir!
        </p>

        {/* 3 Adımlı Kompakt Kartlar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 sm:gap-2.5">
          
          {/* Adım 1 */}
          <div className="bg-white/95 border border-slate-200/90 rounded-xl p-2.5 sm:p-3 shadow-2xs hover:border-indigo-200 transition-colors flex items-start space-x-2.5">
            <span className="w-5 h-5 rounded-full bg-indigo-600 text-white font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5">
              1
            </span>
            <div className="space-y-0.5 min-w-0">
              <strong className="block text-xs font-bold text-slate-900">
                Sınavını seç
              </strong>
              <p className="text-[11px] text-slate-600 leading-snug">
                Sınıfını, dönemini, dersini ve çalışmak istediğin senaryoyu belirle.
              </p>
              <span className="inline-block text-[10px] text-indigo-700 font-semibold pt-0.5">
                Mevcut MEBİ sınavı veya yapay zekâ ile özgün sınav
              </span>
            </div>
          </div>

          {/* Adım 2 */}
          <div className="bg-white/95 border border-slate-200/90 rounded-xl p-2.5 sm:p-3 shadow-2xs hover:border-emerald-200 transition-colors flex items-start space-x-2.5">
            <span className="w-5 h-5 rounded-full bg-emerald-600 text-white font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5">
              2
            </span>
            <div className="space-y-0.5 min-w-0">
              <strong className="block text-xs font-bold text-slate-900">
                Nasıl çalışacağına karar ver
              </strong>
              <p className="text-[11px] text-slate-600 leading-snug">
                Sınav kâğıdını incele, etkileşimli sınavı çöz veya konu tekrarı için çalışma materyallerini kullan.
              </p>
              <span className="inline-block text-[10px] text-emerald-700 font-semibold pt-0.5">
                Yazdır / Etkileşimli Çöz / Çalışma Föyü
              </span>
            </div>
          </div>

          {/* Adım 3 */}
          <div className="bg-white/95 border border-slate-200/90 rounded-xl p-2.5 sm:p-3 shadow-2xs hover:border-purple-200 transition-colors flex items-start space-x-2.5">
            <span className="w-5 h-5 rounded-full bg-purple-600 text-white font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5">
              3
            </span>
            <div className="space-y-0.5 min-w-0">
              <strong className="block text-xs font-bold text-slate-900">
                Cevaplarını değerlendir
              </strong>
              <p className="text-[11px] text-slate-600 leading-snug">
                Etkileşimli sınavı bitirince model cevapları incele, kendini değerlendir ve eksiklerini belirle.
              </p>
              <span className="inline-block text-[10px] text-purple-700 font-semibold pt-0.5">
                Model Cevap & İki Kademeli Rubrik
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
