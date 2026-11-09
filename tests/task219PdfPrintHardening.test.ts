/**
 * TASK219: triggerPdfPrint Hata Yönetimi ve Dayanıklılık Testleri
 * 
 * Test Kapsamı:
 * 1. Normal yazdırma akışı (afterprint ile başlık geri yükleme)
 * 2. Safari matchMedia akışı (matches: false ile başlık geri yükleme)
 * 3. Yazdırma iptal akışı
 * 4. window.print() istisna fırlatması (try...catch, derhal geri yükleme, console.error loglama, çökme engelleme)
 * 5. window.print fonksiyonunun mevcut olmaması (document.title dokunulmadan erken dönüş)
 * 6. SSR ortamı (window undefined, erken dönüş, hata vermeme)
 * 7. Çift tetiklenme güvenliği (afterprint + matchMedia ardışık çalışsa dahi idempotence)
 * 8. Yazdırma anında dinamik dosya adı doğruluğu
 * 9. Orijinal başlık boşsa varsayılan APP_PAGE_TITLE geri yükleme
 */

import { triggerPdfPrint, APP_PAGE_TITLE } from '../src/utils/materialFileNameGenerator';

console.log('=== TASK219 triggerPdfPrint HATA YÖNETİMİ TESTLERİ BAŞLIYOR ===\n');

let passedTests = 0;
let failedTests = 0;

function assert(condition: boolean, testName: string, detail?: string) {
  if (condition) {
    passedTests++;
    console.log(`[TEST ${passedTests < 10 ? '0' + passedTests : passedTests}] ✓ BAŞARILI: ${testName}`);
    if (detail) console.log(`         Detay: ${detail}`);
  } else {
    failedTests++;
    console.error(`[TEST HATA] ✗ BAŞARISIZ: ${testName}`);
    if (detail) console.error(`         Detay: ${detail}`);
  }
}

// Global mock yardımcıları
const originalWindow = (global as any).window;
const originalDocument = (global as any).document;

function setupMockEnvironment(options: {
  printThrows?: boolean;
  hasWindowPrint?: boolean;
  hasMatchMedia?: boolean;
  initialTitle?: string;
}) {
  const listeners: Record<string, Function[]> = {};
  const mediaQueryListeners: Function[] = [];
  let printCalledCount = 0;

  const mockMediaQueryList = {
    matches: true,
    addEventListener: (type: string, fn: any) => {
      if (type === 'change') mediaQueryListeners.push(fn);
    },
    removeEventListener: (type: string, fn: any) => {
      const idx = mediaQueryListeners.indexOf(fn);
      if (idx !== -1) mediaQueryListeners.splice(idx, 1);
    },
    addListener: (fn: any) => mediaQueryListeners.push(fn),
    removeListener: (fn: any) => {
      const idx = mediaQueryListeners.indexOf(fn);
      if (idx !== -1) mediaQueryListeners.splice(idx, 1);
    }
  };

  const mockWindow: any = {
    addEventListener: (type: string, fn: Function) => {
      if (!listeners[type]) listeners[type] = [];
      listeners[type].push(fn);
    },
    removeEventListener: (type: string, fn: Function) => {
      if (listeners[type]) {
        listeners[type] = listeners[type].filter(l => l !== fn);
      }
    },
    print: options.hasWindowPrint !== false ? () => {
      printCalledCount++;
      if (options.printThrows) {
        throw new Error('Printing is not allowed by browser security policy');
      }
    } : undefined,
    matchMedia: options.hasMatchMedia !== false ? (query: string) => {
      return mockMediaQueryList;
    } : undefined
  };

  const mockDocument: any = {
    title: options.initialTitle !== undefined ? options.initialTitle : 'OYSS Rehberi | Ortak Yazılılara Hazırlık'
  };

  (global as any).window = mockWindow;
  (global as any).document = mockDocument;

  return {
    listeners,
    mediaQueryListeners,
    mockMediaQueryList,
    getPrintCalledCount: () => printCalledCount,
    triggerAfterprint: () => {
      if (listeners['afterprint']) {
        listeners['afterprint'].forEach(fn => fn());
      }
    },
    triggerMediaQueryChange: (matches: boolean) => {
      mockMediaQueryList.matches = matches;
      mediaQueryListeners.forEach(fn => fn({ matches }));
    }
  };
}

function teardownEnvironment() {
  (global as any).window = originalWindow;
  (global as any).document = originalDocument;
}

// -------------------------------------------------------------
// TEST 1: Normal Yazdırma Akışı (afterprint tetiklenmesi)
// -------------------------------------------------------------
{
  const env = setupMockEnvironment({ initialTitle: 'Mevcut Sayfa Başlığı' });
  let titleDuringPrint = '';

  const origPrint = (global as any).window.print;
  (global as any).window.print = () => {
    titleDuringPrint = (global as any).document.title;
    origPrint();
  };

  triggerPdfPrint({
    grade: 7,
    subjectId: 'fen_bilimleri',
    examTerm: '1_donem_1_yazili',
    scenarioId: 'senaryo_1',
    materialKind: 'study_sheet'
  });

  assert(
    titleDuringPrint === '7_Sinif_Fen_Bilimleri_1_Donem_1_Yazili_Senaryo_1_Hap_Bilgi',
    'Yazdırma sırasında document.title doğru PDF dosya adına ayarlandı',
    `Başlık: ${titleDuringPrint}`
  );

  // afterprint tetikle
  env.triggerAfterprint();

  assert(
    (global as any).document.title === 'Mevcut Sayfa Başlığı',
    'afterprint sonrasında document.title orijinal değerine geri yüklendi',
    `Son başlık: ${(global as any).document.title}`
  );

  assert(
    (env.listeners['afterprint'] || []).length === 0,
    'afterprint sonrasında event listener temizlendi'
  );
  teardownEnvironment();
}

// -------------------------------------------------------------
// TEST 2: Safari matchMedia Akışı
// -------------------------------------------------------------
{
  const env = setupMockEnvironment({ initialTitle: 'Safari Başlığı' });

  triggerPdfPrint({
    grade: 8,
    subjectId: 'matematik',
    examTerm: '1_donem_1_yazili',
    scenarioId: 'senaryo_2',
    materialKind: 'infographic'
  });

  assert(
    (global as any).document.title === '8_Sinif_Matematik_1_Donem_1_Yazili_Senaryo_2_Infografik',
    'Safari: Yazdırma açılırken başlık PDF adına dönüştürüldü'
  );

  // Safari'de pencere kapandığında matches: false olur
  env.triggerMediaQueryChange(false);

  assert(
    (global as any).document.title === 'Safari Başlığı',
    'Safari: matchMedia change(false) sonrasında başlık başarıyla geri yüklendi'
  );

  assert(
    env.mediaQueryListeners.length === 0,
    'Safari: matchMedia dinleyicisi temizlendi'
  );
  teardownEnvironment();
}

// -------------------------------------------------------------
// TEST 3: window.print() İstisna Fırlatması (try...catch güvencesi)
// -------------------------------------------------------------
{
  const env = setupMockEnvironment({ initialTitle: 'Hata Testi Başlığı', printThrows: true });

  const errorLogs: string[] = [];
  const originalConsoleError = console.error;
  console.error = (...args: any[]) => {
    errorLogs.push(args.join(' '));
  };

  let threwError = false;
  try {
    triggerPdfPrint({
      grade: 6,
      subjectId: 'turkce',
      examTerm: '1_donem_1_yazili',
      scenarioId: 'senaryo_3',
      materialKind: 'study_sheet'
    });
  } catch (e) {
    threwError = true;
  }

  console.error = originalConsoleError;

  assert(
    !threwError,
    'window.print() hata verdiğinde triggerPdfPrint istisnayı yakaladı ve dışarı sızdırmadı'
  );

  assert(
    (global as any).document.title === 'Hata Testi Başlığı',
    'window.print() hata verdiğinde document.title derhal orijinal haline geri getirildi',
    `Mevcut başlık: ${(global as any).document.title}`
  );

  assert(
    (env.listeners['afterprint'] || []).length === 0,
    'Hata sonrasında afterprint dinleyicisi temizlendi'
  );

  assert(
    env.mediaQueryListeners.length === 0,
    'Hata sonrasında matchMedia dinleyicisi temizlendi'
  );

  assert(
    errorLogs.some(log => log.includes('[OYSS Print] Yazdırma işlemi sırasında hata oluştu')),
    '[OYSS Print] hatası console.error ile beklenen formatta loglandı',
    errorLogs[0]
  );
  teardownEnvironment();
}

// -------------------------------------------------------------
// TEST 4: window.print Fonksiyonunun Bulunmaması (undefined)
// -------------------------------------------------------------
{
  const env = setupMockEnvironment({ initialTitle: 'Yazıcı Yok Başlığı', hasWindowPrint: false });

  triggerPdfPrint({
    grade: 5,
    subjectId: 'fen_bilimleri',
    examTerm: '1_donem_1_yazili',
    scenarioId: 'senaryo_1',
    materialKind: 'study_sheet'
  });

  assert(
    (global as any).document.title === 'Yazıcı Yok Başlığı',
    'window.print mevcut olmadığında document.title hiç değiştirilmedi (korundu)',
    `Başlık: ${(global as any).document.title}`
  );

  assert(
    (env.listeners['afterprint'] || []).length === 0,
    'window.print mevcut olmadığında hiçbir dinleyici eklenmedi'
  );
  teardownEnvironment();
}

// -------------------------------------------------------------
// TEST 5: SSR / Sunucu Ortamı (window tamamen undefined)
// -------------------------------------------------------------
{
  (global as any).window = undefined;
  (global as any).document = undefined;

  let ssrThrew = false;
  try {
    triggerPdfPrint({
      grade: 7,
      subjectId: 'matematik',
      examTerm: '1_donem_1_yazili',
      scenarioId: 'senaryo_1',
      materialKind: 'study_sheet'
    });
  } catch (e) {
    ssrThrew = true;
  }

  assert(
    !ssrThrew,
    'SSR ortamında (window ve document undefined iken) fonksiyon hatasız ve sessizce döndü'
  );
  teardownEnvironment();
}

// -------------------------------------------------------------
// TEST 6: Çift Tetiklenme ve Idempotence Testi
// -------------------------------------------------------------
{
  const env = setupMockEnvironment({ initialTitle: 'Idempotent Başlık' });

  triggerPdfPrint({
    grade: 5,
    subjectId: 'matematik',
    examTerm: '1_donem_1_yazili',
    scenarioId: 'senaryo_1',
    materialKind: 'study_sheet'
  });

  // Hem afterprint hem matchMedia ardışık tetiklense dahi:
  env.triggerAfterprint();
  env.triggerMediaQueryChange(false);
  env.triggerAfterprint();

  assert(
    (global as any).document.title === 'Idempotent Başlık',
    'Hem afterprint hem matchMedia art arda tetiklendiğinde restoreTitle tek sefer çalıştı ve başlık korundu'
  );
  teardownEnvironment();
}

// -------------------------------------------------------------
// TEST 7: Orijinal Başlık Boş Olduğunda APP_PAGE_TITLE Kullanımı
// -------------------------------------------------------------
{
  const env = setupMockEnvironment({ initialTitle: '' });

  triggerPdfPrint({
    grade: 5,
    subjectId: 'matematik',
    examTerm: '1_donem_1_yazili',
    scenarioId: 'senaryo_1',
    materialKind: 'study_sheet'
  });

  env.triggerAfterprint();

  assert(
    (global as any).document.title === APP_PAGE_TITLE,
    'Orijinal başlık boş olduğunda geri yükleme APP_PAGE_TITLE varsayılanına yapıldı',
    `Son başlık: ${(global as any).document.title}`
  );
  teardownEnvironment();
}

// -------------------------------------------------------------
// TEST 8: matchMedia Olmayan Eski Tarayıcılar / Kısıtlı Ortamlar
// -------------------------------------------------------------
{
  const env = setupMockEnvironment({ initialTitle: 'Eski Tarayıcı', hasMatchMedia: false });

  triggerPdfPrint({
    grade: 5,
    subjectId: 'matematik',
    examTerm: '1_donem_1_yazili',
    scenarioId: 'senaryo_1',
    materialKind: 'study_sheet'
  });

  env.triggerAfterprint();

  assert(
    (global as any).document.title === 'Eski Tarayıcı',
    'matchMedia API bulunmayan ortamlarda afterprint sorunsuz çalıştı ve başlık geri yüklendi'
  );
  teardownEnvironment();
}

// -------------------------------------------------------------
// TEST 9: Senkron Çağrı / Kullanıcı Etkileşim Zinciri Korunumu
// -------------------------------------------------------------
{
  const env = setupMockEnvironment({ initialTitle: 'Senkron Test' });

  let callOrder: string[] = [];

  const origPrint = (global as any).window.print;
  (global as any).window.print = () => {
    callOrder.push('window.print');
    origPrint();
  };

  callOrder.push('before_triggerPdfPrint');
  triggerPdfPrint({
    grade: 5,
    subjectId: 'matematik',
    examTerm: '1_donem_1_yazili',
    scenarioId: 'senaryo_1',
    materialKind: 'study_sheet'
  });
  callOrder.push('after_triggerPdfPrint');

  assert(
    callOrder.join(' -> ') === 'before_triggerPdfPrint -> window.print -> after_triggerPdfPrint',
    'window.print gecikmesiz ve senkron olarak kullanıcı zincirinde çağrıldı',
    `Sıralama: ${callOrder.join(' -> ')}`
  );
  teardownEnvironment();
}

console.log('\n=============================================================');
console.log(`TEST SONUÇLARI: Toplam ${passedTests + failedTests} testten ${passedTests} tanesi BAŞARILI, ${failedTests} tanesi BAŞARISIZ.`);
console.log('=============================================================');

if (failedTests > 0) {
  process.exit(1);
}

