import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Printer, 
  GraduationCap, 
  ShieldCheck, 
  Globe, 
  MessageSquarePlus,
  Menu,
  X
} from 'lucide-react';

interface NavbarProps {
  onOpenAIModal: () => void;
  onOpenSourcesModal: () => void;
  onOpenFeedbackModal?: () => void;
  onPrint: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenAIModal,
  onOpenSourcesModal,
  onOpenFeedbackModal,
  onPrint,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Ekran genişliği 768px (md) üzerine çıktığında mobil menüyü otomatik kapat
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <>
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs print:hidden">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-2">
            
            {/* Logo & Brand */}
            <div className="flex items-center space-x-2.5 sm:space-x-3 min-w-0">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-red-600 to-red-700 flex items-center justify-center text-white shadow-md shadow-red-200 shrink-0">
                <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center space-x-1.5 sm:space-x-2">
                  <span className="font-extrabold text-base sm:text-lg text-slate-900 tracking-tight whitespace-nowrap">
                    OYSS <span className="text-red-600">Rehberi</span>
                  </span>
                  <span className="inline-flex items-center px-1.5 sm:px-2 py-0.5 rounded text-[10px] sm:text-xs font-semibold bg-red-50 text-red-700 border border-red-200 shrink-0">
                    TYMM Esaslı
                  </span>
                  <span className="hidden lg:inline-flex items-center text-xs text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 shrink-0">
                    <ShieldCheck className="w-3.5 h-3.5 mr-1" />
                    ÖDSGM Senaryo Esaslı
                  </span>
                </div>
                {/* Alt açıklama: Mobilde (< md) kısa ve tek satır, masaüstünde (>= md) tam metin */}
                <p className="text-[11px] sm:text-xs text-slate-500 font-medium truncate leading-tight pt-0.5">
                  <span className="inline md:hidden">Ortak Yazılılara Hazırlık</span>
                  <span className="hidden md:inline">Türkiye Yüzyılı Maarif Modeli • Ortak Yazılı Sınavlara Öğrenci Hazırlık Rehberi</span>
                </p>
              </div>
            </div>

            {/* Desktop / Tablet Quick Actions (>= 768px) */}
            <div className="hidden md:flex items-center space-x-1.5 lg:space-x-2.5 shrink-0">
              <button
                onClick={onOpenAIModal}
                className="inline-flex items-center px-3 py-1.5 lg:px-3.5 lg:py-2 text-xs lg:text-sm font-semibold rounded-lg text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-xs transition-all hover:shadow active:scale-95 cursor-pointer shrink-0"
                title="Seçili senaryoya uygun yapay zekâ destekli özgün soru ve alıştırma seti hazırla"
              >
                <Sparkles className="w-4 h-4 mr-1.5 text-amber-300" />
                <span>Yapay Zekâ ile Soru Üret</span>
              </button>

              {onOpenFeedbackModal && (
                <button
                  onClick={onOpenFeedbackModal}
                  className="inline-flex items-center px-2.5 py-1.5 lg:px-3 lg:py-2 text-xs lg:text-sm font-semibold rounded-lg text-amber-900 bg-amber-50 hover:bg-amber-100 border border-amber-300 transition-colors shadow-2xs cursor-pointer shrink-0"
                  title="Görüş, öneri veya eksiklik bildir"
                >
                  <MessageSquarePlus className="w-4 h-4 mr-1 lg:mr-1.5 text-amber-700" />
                  <span className="hidden lg:inline">Görüş /</span> Bildir
                </button>
              )}

              <button
                onClick={onOpenSourcesModal}
                className="inline-flex items-center px-2.5 py-1.5 lg:px-3 lg:py-2 text-xs lg:text-sm font-semibold rounded-lg text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 transition-colors shadow-2xs shrink-0 cursor-pointer"
                title="Bakanlığın resmî sitelerinden derlenen öğretim programları ve senaryoların eşzamanlama durumu"
              >
                <Globe className="w-4 h-4 mr-1 lg:mr-1.5 text-emerald-600" />
                <span className="hidden lg:inline">MEB Resmî</span> Kaynakları
              </button>

              <button
                onClick={onPrint}
                className="inline-flex items-center px-2.5 py-1.5 lg:px-3 lg:py-2 text-xs lg:text-sm font-medium rounded-lg text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 shadow-xs transition-colors cursor-pointer shrink-0"
                title="Ortak yazılı hazırlık kâğıdını A4 formatında yazdır veya PDF olarak kaydet"
              >
                <Printer className="w-4 h-4 mr-1 text-slate-600" />
                <span className="hidden lg:inline">Yazdır /</span> PDF
              </button>
            </div>

            {/* Mobile Hamburger Toggle Button (< 768px) */}
            <div className="flex md:hidden items-center shrink-0">
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="w-10 h-10 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 active:bg-slate-200 flex items-center justify-center text-slate-700 transition-colors cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-indigo-500/30"
                aria-label={isMobileMenuOpen ? 'Menüyü Kapat' : 'Menüyü Aç'}
                aria-expanded={isMobileMenuOpen}
                title={isMobileMenuOpen ? 'Menüyü Kapat' : 'Menüyü Aç'}
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5 text-slate-800" />
                ) : (
                  <Menu className="w-5 h-5 text-slate-800" />
                )}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Dropdown Panel (< 768px) */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-slate-200 bg-white shadow-xl animate-in fade-in slide-in-from-top-1 duration-150 max-h-[calc(100vh-4.5rem)] overflow-y-auto">
            <div className="px-4 py-3 space-y-2 max-w-7xl mx-auto">
              
              {/* 1. Yapay Zekâ ile Soru Üret */}
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenAIModal();
                }}
                className="w-full flex items-center justify-between p-3 rounded-xl text-white bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-md font-semibold text-sm transition-all cursor-pointer active:scale-[0.99]"
              >
                <div className="flex items-center space-x-2.5">
                  <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center text-amber-300 shrink-0">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <div className="leading-tight font-bold">Yapay Zekâ ile Soru Üret</div>
                    <div className="text-[11px] text-indigo-100 font-normal">Özgün senaryo ve alıştırma seti</div>
                  </div>
                </div>
                <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full font-bold">
                  Özgün
                </span>
              </button>

              {/* 2. MEB Resmî Kaynakları */}
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenSourcesModal();
                }}
                className="w-full flex items-center justify-between p-2.5 rounded-xl border border-emerald-200 bg-emerald-50/70 hover:bg-emerald-100/70 text-emerald-900 font-semibold text-xs sm:text-sm transition-colors cursor-pointer"
              >
                <div className="flex items-center space-x-2.5">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-700 shrink-0">
                    <Globe className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <div className="leading-tight font-bold">MEB Resmî Kaynakları</div>
                    <div className="text-[11px] text-emerald-700/80 font-normal">TYMM ve ÖDSGM veri senkronu</div>
                  </div>
                </div>
                <span className="text-[10px] bg-emerald-200/80 text-emerald-800 px-2 py-0.5 rounded-full font-medium">
                  Doğrulanmış
                </span>
              </button>

              {/* 3. Yazdır / PDF Kaydet */}
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onPrint();
                }}
                className="w-full flex items-center justify-between p-2.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-800 font-semibold text-xs sm:text-sm transition-colors cursor-pointer"
              >
                <div className="flex items-center space-x-2.5">
                  <div className="w-8 h-8 rounded-lg bg-slate-200 flex items-center justify-center text-slate-700 shrink-0">
                    <Printer className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <div className="leading-tight font-bold">Yazdır / PDF Kaydet</div>
                    <div className="text-[11px] text-slate-500 font-normal">A4 sınav ve çalışma materyali</div>
                  </div>
                </div>
                <span className="text-[10px] bg-slate-200 text-slate-700 px-2 py-0.5 rounded-full font-medium">
                  A4 PDF
                </span>
              </button>

              {/* 4. Görüş / Eksiklik Bildir */}
              {onOpenFeedbackModal && (
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenFeedbackModal();
                  }}
                  className="w-full flex items-center justify-between p-2.5 rounded-xl border border-amber-200 bg-amber-50/70 hover:bg-amber-100/70 text-amber-900 font-semibold text-xs sm:text-sm transition-colors cursor-pointer"
                >
                  <div className="flex items-center space-x-2.5">
                    <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center text-amber-800 shrink-0">
                      <MessageSquarePlus className="w-4 h-4" />
                    </div>
                    <div className="text-left">
                      <div className="leading-tight font-bold">Görüş / Eksiklik Bildir</div>
                      <div className="text-[11px] text-amber-700/80 font-normal">Öneri ve hata bildirimleri</div>
                    </div>
                  </div>
                  <span className="text-[10px] bg-amber-200/80 text-amber-800 px-2 py-0.5 rounded-full font-medium">
                    Geri Bildirim
                  </span>
                </button>
              )}

              {/* Ek Bilgilendirme */}
              <div className="pt-1.5 pb-0.5 text-center border-t border-slate-100">
                <p className="text-[10px] text-slate-400">
                  Türkiye Yüzyılı Maarif Modeli • Öğrenci Hazırlık Portalı
                </p>
              </div>

            </div>
          </div>
        )}
      </header>

      {/* Mobile Backdrop Overlay (< 768px) */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 top-16 bg-slate-900/30 backdrop-blur-2xs z-20 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
};
