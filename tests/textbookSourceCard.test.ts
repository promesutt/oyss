import React from 'react';
import { renderToString } from 'react-dom/server';
import { 
  TextbookSourceCard, 
  getStudentEvidenceLabel, 
  getStudentEvidenceDescription 
} from '../src/components/TextbookSourceCard';

console.log('=== OYSS FAZ 3.2.3: ÖĞRENCİ ARAYÜZÜ DERS KİTABI KAYNAK KARTI TESTLERİ BAŞLIYOR ===\n');

let passCount = 0;
let failCount = 0;

function assert(condition: boolean, testName: string, detail: string) {
  if (condition) {
    console.log(`[TEST ${String(passCount + failCount + 1).padStart(2, '0')}] ✓ BAŞARILI - ${testName}`);
    console.log(`         Ayrıntı: ${detail}\n`);
    passCount++;
  } else {
    console.error(`[TEST ${String(passCount + failCount + 1).padStart(2, '0')}] ✗ BAŞARISIZ - ${testName}`);
    console.error(`         Ayrıntı: ${detail}\n`);
    failCount++;
  }
}

async function runTests() {
  // =========================================================================
  // TEST 01: G5 MAT.5.3.1 İçin Kitap Adı, Ünite ve Sayfa Bilgilerinin Doğru Gösterilmesi
  // =========================================================================
  const mat531Html = renderToString(
    React.createElement(TextbookSourceCard, {
      grade: 5,
      outcomeCode: 'MAT.5.3.1',
      defaultExpanded: true
    })
  );

  const hasTitle = mat531Html.includes('Bu soruyu nereden çalışmalıyım?');
  const hasBook = mat531Html.includes('DERS_KITABI_MATEMATIK_1.pdf') || mat531Html.includes('Ders Kitabı (1. Kitap)');
  const hasUnit = mat531Html.includes('GEOMETRİK ŞEKİLLER');
  const hasPages = mat531Html.includes('14-25');
  const hasStudyTip = mat531Html.includes('Konu Tekrarı Önerisi') && mat531Html.includes('Doğru, Doğru Parçası ve Işın');

  assert(
    hasTitle && hasBook && hasUnit && hasPages && hasStudyTip,
    'G5 MAT.5.3.1 için ders kitabı adı, ünite başlığı, sayfa aralığı ve konu tekrarı önerisi eksiksiz gösterilir',
    `Başlık: ${hasTitle}, Kitap: ${hasBook}, Ünite: ${hasUnit}, Sayfalar: ${hasPages}, Öneri: ${hasStudyTip}`
  );

  // =========================================================================
  // TEST 02: G6 FB.6.1.1 İçin Kaynak Bilgilerinin Doğru Gösterilmesi
  // =========================================================================
  const fb611Html = renderToString(
    React.createElement(TextbookSourceCard, {
      grade: 6,
      outcomeCode: 'FB.6.1.1',
      defaultExpanded: true
    })
  );

  const hasFbBook = fb611Html.includes('DERS_KITABI_FEN_BILIMLERI_1.pdf') || fb611Html.includes('Ders Kitabı (1. Kitap)');
  const hasFbUnit = fb611Html.includes('GÜNEŞ SİSTEMİ VE TUTULMALAR');
  const hasFbPages = fb611Html.includes('18-29');
  const hasFbTip = fb611Html.includes('Güneş Sistemi ve Gezegenler');

  assert(
    hasFbBook && hasFbUnit && hasFbPages && hasFbTip,
    'G6 FB.6.1.1 için fen bilimleri ders kitabı, ünite ve sayfa bilgileri doğru render edilir',
    `Kitap: ${hasFbBook}, Ünite: ${hasFbUnit}, Sayfalar: ${hasFbPages}, Öneri: ${hasFbTip}`
  );

  // =========================================================================
  // TEST 03: G5 ENG.5.1.R2 İçin Student Book & Workbook Gösterimi ve Teacher Guide Filtrelenmesi
  // =========================================================================
  const eng51R2Html = renderToString(
    React.createElement(TextbookSourceCard, {
      grade: 5,
      outcomeCode: 'ENG.5.1.R2',
      defaultExpanded: true
    })
  );

  const hasStudentBook = eng51R2Html.includes('Student Book');
  const hasWorkbook = eng51R2Html.includes('Workbook');
  const noTeacherGuide = !eng51R2Html.includes('Teacher Guide') && !eng51R2Html.includes('OGRETMEN');
  const hasStudentPages = eng51R2Html.includes('28-31') && eng51R2Html.includes('9-10');

  assert(
    hasStudentBook && hasWorkbook && noTeacherGuide && hasStudentPages,
    'G5 ENG.5.1.R2 için Student Book ve Workbook listelenir; Teacher Guide öğrenci arayüzünde kesinlikle gösterilmez',
    `Student Book: ${hasStudentBook}, Workbook: ${hasWorkbook}, Teacher Guide Gizlendi: ${noTeacherGuide}, Sayfalar: ${hasStudentPages}`
  );

  // =========================================================================
  // TEST 04: D/B/C/A Kodlarının Ham Gösterilmemesi ve Soru Yerine Kaynak Doğrulaması Vurgusu
  // =========================================================================
  // Öğrenci arayüzünde teknik veritabanı kodları yerine pedagojik ifadeler yer almalıdır
  const hasFriendlyLabelD = mat531Html.includes('Doğrulanmış MEB Kaynağı');
  const noRawEvidenceD = !mat531Html.includes('Seviye D') && !mat531Html.includes('evidenceLevel: D');

  // getStudentEvidenceLabel eşleme denetimi
  const labelD = getStudentEvidenceLabel('D');
  const labelC = getStudentEvidenceLabel('C');
  const labelB = getStudentEvidenceLabel('B');
  const labelA = getStudentEvidenceLabel('A');

  const mappingsCorrect = 
    labelD === 'Doğrulanmış MEB Kaynağı' &&
    labelC === 'Ders Kitabı Konu ve Örnek Kaynağı' &&
    labelB === 'Ders Kitabı Ünite Kaynağı' &&
    labelA === 'Öğretim Programı Temel Kaynağı';

  // Açıklamalar kaynak verisini aşan iddialar ("resmi sınav sorularıyla doğrudan eşleştirilmiştir" vb.) içermemeli,
  // kaynak doğrulamasını soru doğrulamasından ayırmalıdır.
  const descD = getStudentEvidenceDescription('D');
  const descC = getStudentEvidenceDescription('C');
  const noOverclaimInDescD = !descD.includes('resmi sınav sorularıyla');
  const emphasizesSourceInDescD = descD.includes('ders kitabı') && descD.includes('doğrulanmıştır');

  assert(
    hasFriendlyLabelD && noRawEvidenceD && mappingsCorrect && noOverclaimInDescD && emphasizesSourceInDescD,
    'Ham D/C/B/A kodları öğrenciye gösterilmez; soru yerine kaynak doğrulamasını açıklayan abartısız pedagojik ifadeler kullanılır',
    `D Label: "${labelD}", Aşırı İddia İçermiyor: ${noOverclaimInDescD}, Kaynak Doğrulaması Vurgusu: ${emphasizesSourceInDescD}`
  );

  // =========================================================================
  // TEST 05: Kaynak Referansı Olmayan Kazanımda Kartın Gizlenmesi (null dönüş)
  // =========================================================================
  const emptyOutcomeHtml = renderToString(
    React.createElement(TextbookSourceCard, {
      grade: 5,
      outcomeCode: 'GEÇERSİZ_KAZANIM_KODU',
      defaultExpanded: true
    })
  );

  const undefinedOutcomeHtml = renderToString(
    React.createElement(TextbookSourceCard, {
      grade: 5,
      outcomeCode: undefined,
      defaultExpanded: true
    })
  );

  assert(
    emptyOutcomeHtml === '' && undefinedOutcomeHtml === '',
    'Kaynak referansı bulunmayan veya tanımsız kazanımlarda kart render edilmez (null döner)',
    `Geçersiz Kod Render: "${emptyOutcomeHtml}", Tanımsız Kod Render: "${undefinedOutcomeHtml}"`
  );

  // =========================================================================
  // TEST 06: G7 ve G8 İçin Kartın Gizlenmesi (Kapsam İzolasyonu)
  // =========================================================================
  const g7Html = renderToString(
    React.createElement(TextbookSourceCard, {
      grade: 7,
      outcomeCode: 'MAT.7.1.1',
      defaultExpanded: true
    })
  );

  const g8Html = renderToString(
    React.createElement(TextbookSourceCard, {
      grade: 8,
      outcomeCode: 'T.8.3.5',
      defaultExpanded: true
    })
  );

  assert(
    g7Html === '' && g8Html === '',
    'Bileşen grade=7 ve grade=8 verildiğinde kesinlikle hiçbir UI elemanı üretmez (null döner)',
    `G7 Render: "${g7Html}", G8 Render: "${g8Html}"`
  );

  // =========================================================================
  // TEST 07: Basılı ve PDF Sayfa Bilgilerinin Ayrı Gösterilmesi
  // =========================================================================
  // ENG.5.1.R2 kazanımında Student Book için basılı sayfa 28-31, PDF sayfası 29-32'dir
  const hasPrintedBadge = eng51R2Html.includes('Basılı Kitap: s. 28-31');
  const hasPdfBadge = eng51R2Html.includes('EBA / PDF: Sayfa 29-32');

  assert(
    hasPrintedBadge && hasPdfBadge,
    'Basılı kitap sayfası ile EBA/PDF sayfası ayrı etiketlerle ve bağımsız olarak doğru gösterilir',
    `Basılı Rozet: ${hasPrintedBadge}, PDF Rozet: ${hasPdfBadge}`
  );

  // =========================================================================
  // TEST 08: Kartın Varsayılan Olarak Kapalı (Collapsed) Olması
  // =========================================================================
  // defaultExpanded belirtilmediğinde veya false olduğunda detay gövdesi DOM'a aktarılmamalıdır
  const closedCardHtml = renderToString(
    React.createElement(TextbookSourceCard, {
      grade: 5,
      outcomeCode: 'MAT.5.3.1'
      // defaultExpanded verilmedi (varsayılan: false)
    })
  );

  const hasAriaExpandedFalse = closedCardHtml.includes('aria-expanded="false"');
  const bodyIsAbsentWhenClosed = 
    !closedCardHtml.includes('DERS_KITABI_MATEMATIK_1.pdf') &&
    !closedCardHtml.includes('📖 Basılı Kitap:') &&
    !closedCardHtml.includes('Konu Tekrarı Önerisi:');

  assert(
    hasAriaExpandedFalse && bodyIsAbsentWhenClosed,
    'Kart varsayılan olarak kapalıdır; detay içeriği başlangıçta DOM içinde yer almaz',
    `aria-expanded=false: ${hasAriaExpandedFalse}, Gövde Gizli: ${bodyIsAbsentWhenClosed}`
  );

  // =========================================================================
  // TEST 09: Akordiyon Tıklama Etkileşim Testi (Açılma ve Kapanma Döngüsü)
  // =========================================================================
  // React dispatcher üzerinden buton onClick tetiklemesi ve state değişim döngüsü doğrulanır
  let currentAccordionState = false;
  let capturedSetState: ((action: any) => void) | null = null;

  // @ts-ignore
  const dispatcher = (React as any).__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED?.ReactCurrentDispatcher;
  const prevDispatcher = dispatcher?.current;

  let initialClosedVerified = false;
  let click1OpenedVerified = false;
  let click2ClosedVerified = false;

  try {
    if (dispatcher) {
      dispatcher.current = {
        useState(init: any) {
          currentAccordionState = init;
          capturedSetState = (action: any) => {
            currentAccordionState = typeof action === 'function' ? action(currentAccordionState) : action;
          };
          return [currentAccordionState, capturedSetState];
        }
      };
    }

    // 1. Başlangıç oluşturması (kapalı)
    // @ts-ignore
    const vnode = TextbookSourceCard({
      grade: 5,
      outcomeCode: 'MAT.5.3.1',
      defaultExpanded: false
    });

    initialClosedVerified = (currentAccordionState === false);
    const toggleButton = vnode?.props?.children?.[0];
    const onClickHandler = toggleButton?.props?.onClick;

    if (typeof onClickHandler === 'function') {
      // 2. Birinci tıklama: Kart açılmalı (state: true)
      onClickHandler();
      click1OpenedVerified = (currentAccordionState === true);

      // Açık durumdayken render gövdesi detayları içerir
      const openedHtml = renderToString(
        React.createElement(TextbookSourceCard, {
          grade: 5,
          outcomeCode: 'MAT.5.3.1',
          defaultExpanded: true
        })
      );
      const openedHasContent = openedHtml.includes('aria-expanded="true"') && openedHtml.includes('DERS_KITABI_MATEMATIK_1.pdf');

      // 3. İkinci tıklama: Kart tekrar kapanmalı (state: false)
      onClickHandler();
      click2ClosedVerified = (currentAccordionState === false);

      const closedHtml = renderToString(
        React.createElement(TextbookSourceCard, {
          grade: 5,
          outcomeCode: 'MAT.5.3.1',
          defaultExpanded: false
        })
      );
      const closedHasNoContent = closedHtml.includes('aria-expanded="false"') && !closedHtml.includes('DERS_KITABI_MATEMATIK_1.pdf');

      assert(
        initialClosedVerified && click1OpenedVerified && openedHasContent && click2ClosedVerified && closedHasNoContent,
        'Akordiyon butonu tıklandığında kart açılır, tekrar tıklandığında kapanır (tam etkileşim döngüsü)',
        `Başlangıç: ${initialClosedVerified}, 1. Tıklama Açıldı: ${click1OpenedVerified && openedHasContent}, 2. Tıklama Kapandı: ${click2ClosedVerified && closedHasNoContent}`
      );
    } else {
      assert(false, 'Akordiyon butonu tıklandığında açılıp kapanmalıdır', 'onClick handler bulunamadı');
    }
  } finally {
    if (dispatcher) {
      dispatcher.current = prevDispatcher;
    }
  }

  // =========================================================================
  // SONUÇ BİLDİRİMİ
  // =========================================================================
  console.log('====================================================');
  console.log(`TOPLAM TEST: ${passCount + failCount}`);
  console.log(`BAŞARILI   : ${passCount}`);
  console.log(`BAŞARISIZ  : ${failCount}`);
  console.log('====================================================\n');

  if (failCount > 0) {
    process.exit(1);
  }
}

runTests().catch(err => {
  console.error('Test yürütme hatası:', err);
  process.exit(1);
});
