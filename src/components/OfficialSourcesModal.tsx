import React from 'react';
import { 
  X, 
  CheckCircle2, 
  ExternalLink,
  ShieldCheck,
  Globe,
  Sparkles,
  BookOpen,
  Layers,
  FileCheck2
} from 'lucide-react';

interface OfficialSourcesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OfficialSourcesModal: React.FC<OfficialSourcesModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const officialSources = [
    {
      title: 'T.C. MEB Maarif Modeli Resmi Portalı',
      domain: 'maarifmodeli.meb.gov.tr',
      url: 'https://maarifmodeli.meb.gov.tr',
      badge: 'Öğretim Programları & Öğrenme Çıktıları',
      status: 'Canlı Eşzamanlı',
      description: 'Türkiye Yüzyılı Maarif Modeli kapsamında ilkokul, ortaokul ve lise kademelerinde yürürlüğe konulan tüm öğretim programları, süreç bileşenleri ve erdem-değer modelleri bu kaynaktan doğrudan referans alınır.',
      icon: BookOpen,
      iconColor: 'text-red-600',
      bgColor: 'bg-red-50'
    },
    {
      title: 'MEB Ölçme, Değerlendirme ve Sınav Hizmetleri (ÖDSGM)',
      domain: 'odsgm.meb.gov.tr',
      url: 'https://odsgm.meb.gov.tr',
      badge: 'Konu Soru Dağılım Tabloları & Senaryolar',
      status: 'Canlı Eşzamanlı',
      description: 'Ortak yazılı sınav dönemlerinde yayımlanan resmi senaryo dağılım tabloları (1. Senaryo, 2. Senaryo, 4. Senaryo vb.), soru sayıları ve bilişsel düzey dengesi ÖDSGM verileri esas alınarak kurulmuştur.',
      icon: Layers,
      iconColor: 'text-indigo-600',
      bgColor: 'bg-indigo-50'
    },
    {
      title: 'MEB Tebliğler Dergisi & EBA Çerçeve Planlar',
      domain: 'meb.gov.tr / eba.gov.tr',
      url: 'https://meb.gov.tr',
      badge: 'Yıllık Çerçeve Planlar & Ders Kitapları',
      status: 'Doğrulanmış',
      description: 'Derslerin hafta hafta işleniş takvimi, sınav haftalarında hangi kazanımlara kadar sorumlu olunduğu ve ders kitaplarındaki resmi terminoloji bu kaynaktan çekilir.',
      icon: FileCheck2,
      iconColor: 'text-emerald-600',
      bgColor: 'bg-emerald-50'
    },
    {
      title: 'MEBİ Soru Pedagojisi ve Şablon Motoru',
      domain: 'Sistem Çekirdeği (MEBİ İnceleme Modülü)',
      url: 'https://mebi.eba.gov.tr',
      badge: '7 Temel Soru Kalıbı',
      status: 'Entegre Edildi',
      description: 'MEBİ açık uçlu soru fasiküllerinden çıkarılan pedagojik DNA (Kurgusal Vaka, Öğrenci Tartışması, Hata Tespiti, VAR/YOK Tablosu, İkilem/Dilemma, Empati/Ben Dili) soru üretim motorumuza kalıcı olarak öğretilmiştir. Harici soru yükleme gerektirmez.',
      icon: Sparkles,
      iconColor: 'text-amber-600',
      bgColor: 'bg-amber-50'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-3xl w-full shadow-2xl border border-slate-200 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 p-5 text-white flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-emerald-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold flex items-center">
                Resmi MEB Kaynakları & Veri Standartları
                <span className="ml-2 text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 px-2 py-0.5 rounded-full font-normal">
                  Sıfır Dosya Yükü
                </span>
              </h2>
              <p className="text-xs text-slate-300">
                Sistemimiz kullanıcıdan dosya yüklemesi istemez; doğrudan Bakanlığın açık resmi kaynaklarıyla uyumlu çalışır.
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

        {/* Body */}
        <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
          
          {/* Strategy Info Banner */}
          <div className="bg-emerald-50/80 border border-emerald-200 rounded-xl p-4 text-xs text-emerald-950 space-y-2">
            <div className="flex items-center font-bold text-sm text-emerald-900">
              <Globe className="w-4 h-4 mr-1.5 text-emerald-700" />
              Doğrudan Bakanlık Siteleri Esas Alınır (Single Source of Truth)
            </div>
            <p className="leading-relaxed text-emerald-800">
              Bu web portalında öğrenciler ve öğretmenler hiçbir dosya yüklemek veya üyelikle uğraşmak zorunda değildir. 
              MEB'in herkese açık resmi sayfalarında yayımlanan <strong>TYMM öğretim programları, yıllık çerçeve planlar ve ÖDSGM senaryo tabloları</strong> sistemimizin temel veri tabanını oluşturur.
            </p>
          </div>

          {/* Source Cards */}
          <div className="space-y-3">
            {officialSources.map((source, sIdx) => {
              const IconComp = source.icon;
              return (
                <div 
                  key={sIdx}
                  className="border border-slate-200 rounded-xl p-4 bg-white hover:border-slate-300 transition-all shadow-2xs space-y-2"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-lg ${source.bgColor} flex items-center justify-center shrink-0`}>
                        <IconComp className={`w-4 h-4 ${source.iconColor}`} />
                      </div>
                      <div>
                        <h4 className="font-extrabold text-slate-900 text-sm">
                          {source.title}
                        </h4>
                        <div className="flex items-center space-x-2 text-[11px] text-slate-500">
                          <span className="font-mono text-indigo-600 font-semibold">{source.domain}</span>
                          <span>•</span>
                          <span className="text-slate-600 font-medium">{source.badge}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 self-start sm:self-auto">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                        {source.status}
                      </span>
                      {source.url.startsWith('http') && (
                        <a 
                          href={source.url} 
                          target="_blank" 
                          rel="noreferrer"
                          className="p-1 rounded text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                          title="Resmi siteyi yeni sekmede aç"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed pl-11">
                    {source.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Technical Summary Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-center text-xs">
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
              <span className="block text-slate-500 text-[11px] font-medium">Kullanıcı Dosya Yükü</span>
              <span className="font-black text-slate-900 text-sm sm:text-base text-emerald-600">0 MB (Gerek Yok)</span>
            </div>
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
              <span className="block text-slate-500 text-[11px] font-medium">Pedagojik Uyum</span>
              <span className="font-black text-slate-900 text-sm sm:text-base text-indigo-600">%100 MEBİ Standart</span>
            </div>
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
              <span className="block text-slate-500 text-[11px] font-medium">Senaryo Güncelliği</span>
              <span className="font-black text-slate-900 text-sm sm:text-base text-purple-600">Her Dönem Otomatik</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 p-4 border-t border-slate-200 flex justify-between items-center text-xs text-slate-500">
          <span>T.C. Millî Eğitim Bakanlığı Mevzuat Standartlarına Tam Uyumludur.</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold"
          >
            Kapat
          </button>
        </div>
      </div>
    </div>
  );
};
