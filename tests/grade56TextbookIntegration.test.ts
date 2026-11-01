import { OUTCOME_STUDY_BANK } from '../src/data/outcomeStudyBank';
import { SAMPLE_EXAMS } from '../src/data/sampleExams';
import { EvidenceLevel, TextbookReference } from '../src/types';

console.log('=== OYSS FAZ 3.2.1: 5. VE 6. SINIF DERS KİTABI VE KANIT ENTEGRASYON TESTLERİ BAŞLIYOR ===\n');

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
  // 5. ve 6. Sınıf Çalışma Bankası Kazanım Kodları (Toplam 65 adet)
  const GRADE_5_OUTCOMES = [
    // Türkçe (8)
    'T.O.5.6', 'T.O.5.7', 'T.O.5.20', 'T.Y.5.13', 'T.Y.5.16', 'T.O.5.5', 'T.O.5.15', 'T.Y.5.3',
    // Matematik (7)
    'MAT.5.3.1', 'MAT.5.3.2', 'MAT.5.3.3', 'MAT.5.3.4', 'MAT.5.3.5', 'MAT.5.3.6', 'MAT.5.3.7',
    // Fen Bilimleri (4)
    'FB.5.1.2', 'FB.5.1.3', 'FB.5.1.4', 'FB.5.2.1',
    // Sosyal Bilgiler (4)
    'SB.5.1.1', 'SB.5.1.2', 'SB.5.1.3', 'SB.5.2.1',
    // Din Kültürü (5)
    'DKAB.5.1.1', 'DKAB.5.1.2', 'DKAB.5.1.3', 'DKAB.5.1.4', 'DKAB.5.2.1',
    // İngilizce (6)
    'ENG.5.1.R2', 'ENG.5.1.R3', 'ENG.5.1.V1', 'ENG.5.1.G1', 'ENG.5.1.W3', 'ENG.5.1.W4'
  ];

  const GRADE_6_OUTCOMES = [
    // Türkçe (7)
    'T.O.6.5', 'T.O.6.6', 'T.O.6.21', 'T.Y.6.18', 'T.Y.6.21', 'T.O.6.16', 'T.Y.6.3',
    // Matematik (4)
    'MAT.6.1.1', 'MAT.6.1.2', 'MAT.6.1.3', 'MAT.6.1.4',
    // Fen Bilimleri (6)
    'FB.6.1.1', 'FB.6.1.3', 'FB.6.2.1', 'FB.6.2.2', 'FB.6.2.3', 'FB.6.3.1',
    // Sosyal Bilgiler (4)
    'SB.6.1.1', 'SB.6.1.2', 'SB.6.1.3', 'SB.6.2.1',
    // Din Kültürü (4)
    'DKAB.6.1.2', 'DKAB.6.1.3', 'DKAB.6.1.4', 'DKAB.6.2.1',
    // İngilizce (6)
    'ENG.6.1.R2', 'ENG.6.1.R3', 'ENG.6.1.V1', 'ENG.6.1.G1', 'ENG.6.1.W3', 'ENG.6.1.W4'
  ];

  const ALL_5_6_OUTCOMES = [...GRADE_5_OUTCOMES, ...GRADE_6_OUTCOMES];

  // =========================================================================
  // TEST 01: 5. ve 6. Sınıf Tüm 65 Kazanımın Eksiksiz Kapsamı
  // =========================================================================
  const missingOutcomes: string[] = [];
  const invalidCards: string[] = [];

  for (const code of ALL_5_6_OUTCOMES) {
    const card = OUTCOME_STUDY_BANK[code];
    if (!card) {
      missingOutcomes.push(code);
      continue;
    }
    const hasUnit = typeof card.textbookUnit === 'string' && card.textbookUnit.length > 2;
    const hasRange = typeof card.textbookPageRange === 'string' && card.textbookPageRange.length > 1;
    const hasExamples = Array.isArray(card.textbookExamples) && card.textbookExamples.length >= 1;
    const hasReferences = Array.isArray(card.textbookReferences) && card.textbookReferences.length >= 1;
    const hasEvidence = ['A', 'B', 'C', 'D'].includes(card.evidenceLevel || '');

    if (!hasUnit || !hasRange || !hasExamples || !hasReferences || !hasEvidence) {
      invalidCards.push(code);
    }
  }

  assert(
    missingOutcomes.length === 0 && invalidCards.length === 0,
    '5. ve 6. sınıf tüm 65 resmi kazanımın (Grade 5: 34, Grade 6: 31) ders kitabı alanları ve referansları eksiksizdir',
    `Toplam Kazanım: ${ALL_5_6_OUTCOMES.length}/65, Eksik Kart: ${missingOutcomes.length}, Geçersiz Alan: ${invalidCards.length}`
  );

  // =========================================================================
  // TEST 02: 018 Raporundaki Üç Sorunlu Kartın Düzeltilmesi ve İki Yönlü Uyumluluğu
  // =========================================================================
  // 1. DKAB.5.1.1 ve Evrendeki alias
  const dkabCard = OUTCOME_STUDY_BANK['DKAB.5.1.1'];
  const evrendekiAlias = OUTCOME_STUDY_BANK['Evrendeki'];
  const dkabValid = !!dkabCard &&
    (dkabCard.textbookUnit?.includes('Allah İnancı') || dkabCard.textbookUnit?.includes('ALLAH İNANCI')) &&
    dkabCard.quickNotes.some(c => c.toLowerCase().includes('düzen') || c.toLowerCase().includes('evren')) &&
    evrendekiAlias === dkabCard; // exact reference identity

  // 2. SB.5.2.1 ve EVİMİZ alias
  const sb521Card = OUTCOME_STUDY_BANK['SB.5.2.1'];
  const evimizAlias = OUTCOME_STUDY_BANK['EVİMİZ'];
  const sb521Valid = !!sb521Card &&
    (sb521Card.textbookUnit?.includes('Kültür ve Miras') || sb521Card.textbookUnit?.includes('EVİMİZ DÜNYA')) &&
    sb521Card.quickNotes.some(c => c.toLowerCase().includes('konum') || c.toLowerCase().includes('şehir') || c.toLowerCase().includes('yerleşim')) &&
    evimizAlias === sb521Card; // exact reference identity

  // 3. SB.6.2.1 yeni kart
  const sb621Card = OUTCOME_STUDY_BANK['SB.6.2.1'];
  const sb621Valid = !!sb621Card &&
    (sb621Card.textbookUnit?.includes('EVİMİZ DÜNYA') || sb621Card.textbookUnit?.includes('Kıtalar')) &&
    sb621Card.quickNotes.length >= 3 &&
    sb621Card.examTraps.length >= 1 &&
    sb621Card.textbookReferences?.some(r => r.bookFileName.includes('SOSYAL_BILGILER') || r.bookFileName.includes('sosyal'));

  assert(
    dkabValid && sb521Valid && sb621Valid,
    '018 numaralı rapordaki üç eksik/hatalı kazanım kartı (DKAB.5.1.1, SB.5.2.1, SB.6.2.1) ve geriye dönük takma adları doğrulanmıştır',
    `DKAB.5.1.1 (Evrendeki alias uyumu): ${dkabValid}, SB.5.2.1 (EVİMİZ alias uyumu): ${sb521Valid}, SB.6.2.1 (yeni otantik kart): ${sb621Valid}`
  );

  // =========================================================================
  // TEST 03: 5. Sınıf Din Kültürü Örnek Sınavlarında DKAB.5.1.1 Kazanım Düzeltmesi
  // =========================================================================
  const din5Scen1 = SAMPLE_EXAMS.find(e => e.id === 'exam_5_din_kulturu_1_1_senaryo_1');
  const din5Scen2 = SAMPLE_EXAMS.find(e => e.id === 'exam_5_din_kulturu_1_1_senaryo_2');
  const din5Scen4 = SAMPLE_EXAMS.find(e => e.id === 'exam_5_din_kulturu_1_1_senaryo_4');

  const s1q1 = din5Scen1?.questions?.[0];
  const s2q1 = din5Scen2?.questions?.[0];
  const s4q1 = din5Scen4?.questions?.[0];

  const q1Correct = s1q1?.outcomeCode === 'DKAB.5.1.1' && s1q1?.outcomeTitle.includes('DKAB.5.1.1');
  const q2Correct = s2q1?.outcomeCode === 'DKAB.5.1.1' && s2q1?.outcomeTitle.includes('DKAB.5.1.1');
  const q4Correct = s4q1?.outcomeCode === 'DKAB.5.1.1' && s4q1?.outcomeTitle.includes('DKAB.5.1.1');

  // Puanların korunduğunu kontrol et:
  const totalScore1 = din5Scen1?.questions.reduce((sum, q) => sum + q.points, 0);
  const totalScore2 = din5Scen2?.questions.reduce((sum, q) => sum + q.points, 0);
  const totalScore4 = din5Scen4?.questions.reduce((sum, q) => sum + q.points, 0);

  const pointsPreserved = s1q1?.points === 13 && s2q1?.points === 15 && s4q1?.points === 17 &&
                          totalScore1 === 100 && totalScore2 === 100 && totalScore4 === 100;

  assert(
    q1Correct && q2Correct && q4Correct && pointsPreserved,
    '5. sınıf Din Kültürü Senaryo 1, 2 ve 4 örnek sınavlarında kazanım kodu DKAB.5.1.1 olarak düzeltilmiş, sınav yapısı ve 100 puan bütünlüğü korunmuştur',
    `Senaryo 1 Q1: ${s1q1?.outcomeCode} (Puan: ${s1q1?.points}), Senaryo 2 Q1: ${s2q1?.outcomeCode} (Puan: ${s2q1?.points}), Senaryo 4 Q1: ${s4q1?.outcomeCode} (Puan: ${s4q1?.points}), 100 Puan Uyumu: true`
  );

  // =========================================================================
  // TEST 04: Ders Kitabı Referans Veri Modeli ve Basılı/PDF Sayfa Numarası Formatı
  // =========================================================================
  let refCount = 0;
  let validModelCount = 0;
  let validPageFormats = 0;

  for (const code of ALL_5_6_OUTCOMES) {
    const card = OUTCOME_STUDY_BANK[code];
    if (!card || !card.textbookReferences) continue;

    for (const ref of card.textbookReferences) {
      refCount++;
      const hasFields = typeof ref.bookType === 'string' && ref.bookType.length > 0 &&
                        typeof ref.bookFileName === 'string' && ref.bookFileName.endsWith('.pdf') &&
                        typeof ref.unitTitle === 'string' && ref.unitTitle.length > 0 &&
                        typeof ref.printedPageRange === 'string' && ref.printedPageRange.length > 0 &&
                        typeof ref.pdfPageRange === 'string' && ref.pdfPageRange.length > 0 &&
                        ['A', 'B', 'C', 'D'].includes(ref.evidenceLevel);

      if (hasFields) validModelCount++;

      // Sayfa formatı kontrolü (örnek: "14-19" veya "28-31")
      if (ref.printedPageRange.match(/\d+/) && ref.pdfPageRange.match(/\d+/)) {
        validPageFormats++;
      }
    }
  }

  assert(
    refCount > 0 && validModelCount === refCount && validPageFormats === refCount,
    'Ders kitabı kaynak referansları TextbookReference veri modeline tam uygundur ve tüm alanlar eksiksizdir',
    `Toplam Referans: ${refCount}, Geçerli Model: ${validModelCount}/${refCount}, Geçerli Sayfa Formatı: ${validPageFormats}/${refCount}`
  );

  // =========================================================================
  // TEST 05: İngilizce Ders Kitap Türlerinin (Student Book, Workbook, Teacher Guide) Net Ayrımı
  // =========================================================================
  const englishOutcomes = [
    'ENG.5.1.R2', 'ENG.5.1.R3', 'ENG.5.1.V1', 'ENG.5.1.G1', 'ENG.5.1.W3', 'ENG.5.1.W4',
    'ENG.6.1.R2', 'ENG.6.1.R3', 'ENG.6.1.V1', 'ENG.6.1.G1', 'ENG.6.1.W3', 'ENG.6.1.W4'
  ];

  const bookTypesFound = new Set<string>();
  let englishRefsValid = true;

  for (const code of englishOutcomes) {
    const card = OUTCOME_STUDY_BANK[code];
    if (!card || !card.textbookReferences) {
      englishRefsValid = false;
      continue;
    }
    for (const ref of card.textbookReferences) {
      bookTypesFound.add(ref.bookType);
      if (!ref.bookFileName.endsWith('.pdf')) englishRefsValid = false;
      // Kitap türü ile dosya adı uyumu
      if (ref.bookType === 'Workbook' && !ref.bookFileName.includes('CALISMA')) {
        englishRefsValid = false;
      }
      if (ref.bookType === 'Student Book' && !ref.bookFileName.includes('DERS_KITABI')) {
        englishRefsValid = false;
      }
      if (ref.bookType === 'Teacher Guide' && !ref.bookFileName.includes('OGRETMEN')) {
        englishRefsValid = false;
      }
    }
  }

  const hasStudentBook = bookTypesFound.has('Student Book');
  const hasWorkbook = bookTypesFound.has('Workbook');
  const hasTeacherGuide = bookTypesFound.has('Teacher Guide');

  assert(
    englishRefsValid && hasStudentBook && hasWorkbook && hasTeacherGuide,
    'İngilizce kaynaklarında Student Book, Workbook ve Teacher Guide kitap türleri açıkça ayrılmıştır',
    `Bulunan Kitap Türleri: ${Array.from(bookTypesFound).join(', ')}, Dosya ve Tür Eşleşme Doğruluğu: ${englishRefsValid}`
  );

  // =========================================================================
  // TEST 06: Kanıt Seviyeleri (A, B, C, D) ve D Kanıtının Doğrulanması
  // =========================================================================
  let dEvidenceCount = 0;
  let otherEvidenceCount = 0;
  const dEvidenceOutcomes: string[] = [];

  for (const code of ALL_5_6_OUTCOMES) {
    const card = OUTCOME_STUDY_BANK[code];
    if (!card) continue;
    if (card.evidenceLevel === 'D') {
      dEvidenceCount++;
      dEvidenceOutcomes.push(code);
    } else {
      otherEvidenceCount++;
    }
  }

  // D seviyesi alan kazanımların MEBİ örnek sınavında doğrudan sorusu olduğunu doğrula
  const dMatchesValid = dEvidenceOutcomes.every(code => {
    // Check if code exists in any sample exam question for grades 5 or 6
    return SAMPLE_EXAMS.some(exam => {
      const isG56 = exam.id.includes('exam_5_') || exam.id.includes('exam_6_');
      return isG56 && exam.questions.some(q => q.outcomeCode === code);
    });
  });

  assert(
    dMatchesValid && dEvidenceCount > 0,
    'Kanıt seviyeleri (A, B, C, D) titizlikle uygulanmış, D seviyesi yalnızca MEBİ örnek sorularıyla doğrudan eşleşen kazanımlara verilmiştir',
    `D Seviyesi Kazanım Sayısı: ${dEvidenceCount} (Doğrudan soru teyidi: ${dMatchesValid}), A/B/C Seviyesi Kazanım Sayısı: ${otherEvidenceCount}`
  );

  // =========================================================================
  // TEST 07: 7. ve 8. Sınıf Verilerinde Sıfır Regresyonun Doğrulanması
  // =========================================================================
  const sampleG78Outcomes = [
    // 7. Sınıf
    'T.O.7.4', 'T.O.7.5', 'MAT.7.1.1', 'FB.7.1.1', 'SB.7.1.1', 'DKAB.7.1.1', 'E7.1.R1',
    // 8. Sınıf
    'T.8.3.5', 'M.8.1.1.1', 'F.8.1.1.1', 'İTA.8.1.1', 'DKAB.8.1.1', 'E8.1.R1'
  ];

  const allG78Present = sampleG78Outcomes.every(code => {
    const card = OUTCOME_STUDY_BANK[code];
    return !!card && Array.isArray(card.quickNotes) && card.quickNotes.length > 0;
  });

  // Check 7th and 8th grade sample exams
  const g7SampleExams = SAMPLE_EXAMS.filter(e => e.id.includes('exam_7_'));
  const g8SampleExams = SAMPLE_EXAMS.filter(e => e.id.includes('exam_8_'));
  const sampleExamsG78Intact = g7SampleExams.length === 29 && g8SampleExams.length === 35;

  assert(
    allG78Present && sampleExamsG78Intact,
    '7. ve 8. sınıf kazanım kartları ve hazır senaryo sınavlarında sıfır regresyon korunmaktadır',
    `Örnek 7-8 Kazanımları: ${sampleG78Outcomes.length}/${sampleG78Outcomes.length} mevcut, 7. Sınıf Sınav Sayısı: ${g7SampleExams.length}, 8. Sınıf Sınav Sayısı: ${g8SampleExams.length}`
  );

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
