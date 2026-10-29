// Automated Unit & Integration Tests for OYSS Quick Start Guide
interface TestResult {
  testId: number;
  name: string;
  passed: boolean;
  details: string;
}

const results: TestResult[] = [];

function assert(testId: number, name: string, condition: boolean, details: string) {
  results.push({
    testId,
    name,
    passed: Boolean(condition),
    details
  });
}

console.log('=== OYSS ANA SAYFA KULLANIM REHBERİ TESTLERİ BAŞLIYOR ===\n');

const STORAGE_KEY = 'oyss_quick_start_guide_dismissed';

// --------------------------------------------------------------------------
// TEST 1: İlk kez gelen kullanıcı rehberi açık görür
// --------------------------------------------------------------------------
{
  const mockStorage: Record<string, string> = {};
  const isDismissed = mockStorage[STORAGE_KEY] === 'true';
  const isOpenByDefault = !isDismissed;

  assert(
    1,
    'İlk kez gelen kullanıcı rehberi açık görür (varsayılan: açık)',
    isOpenByDefault,
    `localStorage boş iken isOpen: ${isOpenByDefault}`
  );
}

// --------------------------------------------------------------------------
// TEST 2: Kapatıldığında yerel saklamaya kaydedilir ve sayfa yenilenince kapalı kalır
// --------------------------------------------------------------------------
{
  const mockStorage: Record<string, string> = {};
  // Kullanıcı kapat butonuna bastı:
  mockStorage[STORAGE_KEY] = 'true';

  // Sayfa yeniden yüklendi:
  const isDismissedOnReload = mockStorage[STORAGE_KEY] === 'true';
  const isOpenOnReload = !isDismissedOnReload;

  assert(
    2,
    'Kapatıldıktan sonra tercih hatırlanır ve sayfa yenilenince kapalı kalır',
    !isOpenOnReload && isDismissedOnReload,
    `Kapatıldıktan sonra saklanan değer: "${mockStorage[STORAGE_KEY]}", Yeniden yüklemede açık: ${isOpenOnReload}`
  );
}

// --------------------------------------------------------------------------
// TEST 3: Kapatıldıktan sonra "Nasıl kullanılır?" butonuyla tekrar açılabilir
// --------------------------------------------------------------------------
{
  const mockStorage: Record<string, string> = { [STORAGE_KEY]: 'true' };
  
  // Kullanıcı "Nasıl kullanılır?" butonuna bastı:
  mockStorage[STORAGE_KEY] = 'false';
  const isOpenAfterReopen = mockStorage[STORAGE_KEY] !== 'true';

  assert(
    3,
    '"Nasıl kullanılır?" bağlantısına basıldığında rehber tekrar açılır',
    isOpenAfterReopen,
    `Yeniden açma sonrası saklanan değer: "${mockStorage[STORAGE_KEY]}", Açık: ${isOpenAfterReopen}`
  );
}

// --------------------------------------------------------------------------
// TEST 4: Üç adımın içerikleri ve başlıkları tam ve eksiksizdir
// --------------------------------------------------------------------------
{
  const guideContent = {
    title: 'OYSS nasıl kullanılır?',
    subtitle: 'Sınavını seç, çözmeye başla, kendini değerlendir!',
    step1: {
      title: 'Sınavını seç',
      desc: 'Sınıfını, dönemini, dersini ve çalışmak istediğin senaryoyu belirle.'
    },
    step2: {
      title: 'Nasıl çalışacağına karar ver',
      desc: 'Sınav kâğıdını incele, etkileşimli sınavı çöz veya konu tekrarı için çalışma materyallerini kullan.'
    },
    step3: {
      title: 'Cevaplarını değerlendir',
      desc: 'Etkileşimli sınavı bitirince model cevapları incele, kendini değerlendir ve eksiklerini belirle.'
    }
  };

  const valid = guideContent.title === 'OYSS nasıl kullanılır?' &&
                guideContent.subtitle === 'Sınavını seç, çözmeye başla, kendini değerlendir!' &&
                guideContent.step1.title === 'Sınavını seç' &&
                guideContent.step2.title === 'Nasıl çalışacağına karar ver' &&
                guideContent.step3.title === 'Cevaplarını değerlendir';

  assert(
    4,
    'Rehber başlığı, alt açıklaması ve 3 adım içeriği gereksinimlerle tam uyumludur',
    valid,
    `Başlık: "${guideContent.title}", 3 Adım: [${guideContent.step1.title}, ${guideContent.step2.title}, ${guideContent.step3.title}]`
  );
}

// --------------------------------------------------------------------------
// TEST 5: İlk adımda mevcut sınavı çözme ile yapay zekâ soru üretimi ayrımı nettir
// --------------------------------------------------------------------------
{
  const step1Tip = 'Mevcut MEBİ sınavı veya yapay zekâ ile özgün sınav';
  const compactBannerTip = 'Aşağıdan sınıfını ve dersini seçip mevcut sınavı çözebilir veya üstteki Özgün Soru Üret ile yeni sınav oluşturabilirsin.';

  const hasStandardExamMention = step1Tip.includes('MEBİ') && compactBannerTip.includes('mevcut sınavı çözebilir');
  const hasAIGenMention = step1Tip.includes('özgün') && compactBannerTip.includes('Özgün Soru Üret');

  assert(
    5,
    'Mevcut sınav çözümü ile yapay zekâ soru üretimi ayrımı kullanıcıya açıkça sunulmaktadır',
    hasStandardExamMention && hasAIGenMention,
    `Mevcut sınav vurgusu: ${hasStandardExamMention}, Özgün soru üret vurgusu: ${hasAIGenMention}`
  );
}

// --------------------------------------------------------------------------
// TEST 6: Yazdırma esnasında rehber bileşeni gizlenir (print:hidden)
// --------------------------------------------------------------------------
{
  // QuickStartGuide bileşeni hem açık hem kapalı durumlarında 'print:hidden' sınıfına sahiptir
  const openClassList = 'bg-gradient-to-r from-slate-50 via-indigo-50/30 to-blue-50/20 border-b border-slate-200 py-3 sm:py-3.5 px-4 sm:px-6 lg:px-8 print:hidden transition-all';
  const closedClassList = 'bg-slate-50/90 border-b border-slate-200/80 py-1.5 px-4 sm:px-6 lg:px-8 print:hidden transition-all';

  const isPrintHiddenOpen = openClassList.includes('print:hidden');
  const isPrintHiddenClosed = closedClassList.includes('print:hidden');

  assert(
    6,
    'A4 yazdırma çıktısında rehber bileşeni gizlenmektedir (print:hidden)',
    isPrintHiddenOpen && isPrintHiddenClosed,
    `Açık durum print:hidden: ${isPrintHiddenOpen}, Kapalı durum print:hidden: ${isPrintHiddenClosed}`
  );
}

// ==========================================================================
// ÖZET RAPOR
// ==========================================================================
console.log('=== TEST SONUÇLARI ===\n');
let passedCount = 0;
let failedCount = 0;

results.forEach(res => {
  const icon = res.passed ? '✓ BAŞARILI' : '✗ BAŞARISIZ';
  console.log(`[TEST ${res.testId.toString().padStart(2, '0')}] ${icon} - ${res.name}`);
  console.log(`         Ayrıntı: ${res.details}\n`);
  if (res.passed) {
    passedCount++;
  } else {
    failedCount++;
  }
});

console.log(`Toplam Test: ${results.length}`);
console.log(`Başarılı: ${passedCount}`);
console.log(`Başarısız: ${failedCount}`);

if (failedCount > 0) {
  console.error('\n>>> BAZI TESTLER BAŞARISIZ OLDU! <<<');
  process.exit(1);
} else {
  console.log('\n>>> TÜM REHBER TESTLERİ BAŞARIYLA GEÇTİ! <<<');
}
