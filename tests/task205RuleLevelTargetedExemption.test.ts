import assert from 'node:assert';
import {
  auditQuestionQuality,
  isIntentionalErrorDetectionQuestion,
  isTargetedIntentionalError
} from '../src/utils/qualityAssurance';

let passedCount = 0;
let totalCount = 0;

function check(condition: boolean, msg: string) {
  totalCount++;
  if (condition) {
    passedCount++;
    console.log(`  ✓ ${msg}`);
  } else {
    console.error(`  ✗ FAIL: ${msg}`);
    throw new Error(`Assertion failed: ${msg}`);
  }
}

console.log('--- TASK205: Kural Düzeyinde Hedefe Bağlı Kasıtlı Hata Muafiyeti Testleri ---\n');

// =========================================================================
// TEST A: Yalnızca hedeflenen kasıtlı hata (FB.7.3.1 Safra) -> GEÇMELİ
// =========================================================================
{
  console.log('1. Test A: Yalnızca hedeflenen kasıtlı hata (FB.7.3.1 Safra)');
  const qA = {
    questionNumber: 1,
    outcomeCode: 'FB.7.3.1',
    archetype: 'Hata Tespiti & Adım Analizi',
    stimulus: "7. sınıf öğrencisi Burak sindirim sistemiyle ilgili hazırladığı posterde şu nota yer vermiştir: 'Besinler ağızdan sonra yutak ve yemek borusuna geçer. Yutak ve yemek borusu safra sıvısı salgılayarak sindirimi gerçekleştirir.'",
    questionText: "Burak'ın posterinde yer alan bilimsel hatayı tespit ediniz. Safra sıvısının gerçekte hangi organda üretildiğini gerekçesiyle açıklayınız.",
    modelAnswer: "Burak'ın posterindeki hata, safra sıvısının yutak ve yemek borusundan salgılandığı iddiasıdır. Doğrusu: Safra karaciğer tarafından üretilir ve safra kesesinde depolanır; yemek borusu ve yutakta safra salgılanmaz.",
    rubric: [
      { criterion: 'Safranın yutak veya yemek borusunda değil karaciğerde üretildiğinin tespiti', points: 10 }
    ]
  };

  const resA = auditQuestionQuality(qA, { subjectId: 'fen_bilimleri', grade: 7 });
  check(resA.status === 'passed', 'Test A status passed olmalı');
  check(resA.isCertified === true, 'Test A isCertified true olmalı');
  const criticalFindings = resA.findings.filter(f => f.severity === 'critical');
  check(criticalFindings.length === 0, 'Test A critical finding içermemeli');
}

// =========================================================================
// TEST B: Hedeflenen hata + bağımsız ikinci hata (Safra + Mitoz 4 hücre) -> ENGELLENMELİ
// =========================================================================
{
  console.log('\n2. Test B: Hedeflenen hata + ilgisiz bağımsız ikinci hata (Safra + Mitoz 4 hücre)');
  const qB = {
    questionNumber: 2,
    outcomeCode: 'FB.7.3.1',
    archetype: 'Hata Tespiti & Adım Analizi',
    stimulus: "7. sınıf öğrencisi Burak sindirim sistemi afişinde yemek borusunun safra sıvısı salgıladığını yazmıştır. Ayrıca posterin altındaki notta mitoz bölünme sonucunda dört yeni hücre oluşur ifadesini eklemiştir.",
    questionText: "Burak'ın sindirim sistemi afişindeki safra salgısıyla ilgili yaptığı bilimsel hatayı tespit edip doğrusunu açıklayınız.",
    modelAnswer: "Afişteki hata: Yemek borusu safra sıvısı salgılamaz. Doğrusu: Safra karaciğer tarafından üretilir ve safra kesesinde depolanır.",
    rubric: [
      { criterion: 'Safranın karaciğerde üretildiğini belirtme', points: 10 }
    ]
  };

  const resB = auditQuestionQuality(qB, { subjectId: 'fen_bilimleri', grade: 7 });
  check(resB.status === 'failed', 'Test B status failed olmalı');
  check(resB.isCertified === false, 'Test B isCertified false olmalı');
  const mitosisFinding = resB.findings.find(f => f.severity === 'critical' && f.field === 'stimulus' && f.message.toLowerCase().includes('mitoz'));
  check(!!mitosisFinding, 'Test B stimulus üzerindeki bağımsız mitoz hatası için critical finding üretmeli');
  const safraFinding = resB.findings.find(f => f.field === 'stimulus' && f.message.toLowerCase().includes('safra'));
  check(!safraFinding, 'Test B hedeflenen safra hatasını stimulus alanında tolere etmeli');
}

// =========================================================================
// TEST C: Model cevapta olumsuzlanmamış bilimsel hata -> ENGELLENMELİ
// =========================================================================
{
  console.log('\n3. Test C: Model cevapta olumsuzlanmamış bilimsel hata (Safra yemek borusundan salgılanır)');
  const qC = {
    questionNumber: 3,
    outcomeCode: 'FB.7.3.1',
    archetype: 'Hata Tespiti & Adım Analizi',
    stimulus: "Afişte yemek borusunun safra salgıladığı yazılmıştır.",
    questionText: "Afişteki sindirim olayını açıklayınız.",
    modelAnswer: "Evet, safra sıvısı yemek borusundan salgılanır ve besinleri kayganlaştırır.",
    rubric: [{ criterion: 'Safra fonksiyonu', points: 10 }]
  };

  const resC = auditQuestionQuality(qC, { subjectId: 'fen_bilimleri', grade: 7 });
  check(resC.status === 'failed', 'Test C status failed olmalı');
  check(resC.isCertified === false, 'Test C isCertified false olmalı');
  const answerFinding = resC.findings.find(f => f.severity === 'critical' && f.field === 'answer');
  check(!!answerFinding, 'Test C modelAnswer üzerinde critical finding üretmeli');
}

// =========================================================================
// TEST D: Rubrikte bilimsel hata -> ENGELLENMELİ
// =========================================================================
{
  console.log('\n4. Test D: Rubrikte bilimsel hata');
  const qD = {
    questionNumber: 4,
    outcomeCode: 'FB.7.3.1',
    archetype: 'Hata Tespiti & Adım Analizi',
    stimulus: "Afişte yemek borusunun safra salgıladığı yazılmıştır.",
    questionText: "Afişteki hatayı açıklayınız.",
    modelAnswer: "Yemek borusu safra salgılamaz, safra karaciğerde üretilir.",
    rubric: [
      { criterion: 'Öğrenci safra sıvısının yemek borusundan salgılandığını açıklarsa tam puan alır.', points: 10 }
    ]
  };

  const resD = auditQuestionQuality(qD, { subjectId: 'fen_bilimleri', grade: 7 });
  check(resD.status === 'failed', 'Test D status failed olmalı');
  check(resD.isCertified === false, 'Test D isCertified false olmalı');
  const rubricFinding = resD.findings.find(f => f.severity === 'critical' && (f.field === 'rubric' || f.field === 'answer'));
  check(!!rubricFinding, 'Test D rubric/answer üzerinde critical finding üretmeli');
}

// =========================================================================
// TEST E: Normal bilgi sorusunda senaryo hatası -> ENGELLENMELİ
// =========================================================================
{
  console.log('\n5. Test E: Normal bilgi sorusunda senaryo hatası');
  const qE = {
    questionNumber: 5,
    outcomeCode: 'FB.7.3.1',
    archetype: 'Kavram Açıklama',
    stimulus: "Yemek borusu ve yutak safra sıvısı salgılayarak besinlerin sindirimini başlatır.",
    questionText: "Sindirim sistemi organlarının görevlerini açıklayınız.",
    modelAnswer: "Sindirim sistemi organları besinleri parçalar.",
    rubric: [{ criterion: 'Görevler', points: 10 }]
  };

  const resE = auditQuestionQuality(qE, { subjectId: 'fen_bilimleri', grade: 7 });
  check(resE.status === 'failed', 'Test E status failed olmalı');
  check(resE.isCertified === false, 'Test E isCertified false olmalı');
  const stimulusFinding = resE.findings.find(f => f.severity === 'critical' && f.field === 'stimulus');
  check(!!stimulusFinding, 'Test E normal soru olduğu için stimulus üzerinde critical finding üretmeli');
}

// =========================================================================
// TEST F: Rastlantısal kavram anımı koruması (Kütle ölçümü hedefleniyor, senaryoda safra hatası var) -> ENGELLENMELİ
// =========================================================================
{
  console.log('\n6. Test F: Soru kökünde rastlantısal anım koruması (Kütle hedefleniyor, senaryoda safra var)');
  const qF = {
    questionNumber: 6,
    outcomeCode: 'FB.7.2.1',
    archetype: 'Hata Tespiti & Adım Analizi',
    stimulus: "Öğrenci kütleyi dinamometre ile 50 N olarak ölçtüğünü not etmiştir. Ayrıca safra sıvısının yemek borusundan salgılandığını da defterine yazmıştır.",
    questionText: "Öğrencinin kütle ölçümü ile ilgili yaptığı bilimsel hatayı tespit edip doğrusunu yazınız. (Öğrenci safra deneyini de hatırlamıştır.)",
    modelAnswer: "Kütle dinamometre ile değil eşit kollu terazi ile ölçülür ve birimi kilogramdır. Dinamometre ile ağırlık ölçülür.",
    rubric: [{ criterion: 'Kütlenin eşit kollu terazi ile ölçüldüğünü belirtme', points: 10 }]
  };

  const resF = auditQuestionQuality(qF, { subjectId: 'fen_bilimleri', grade: 7 });
  check(resF.status === 'failed', 'Test F status failed olmalı');
  check(resF.isCertified === false, 'Test F isCertified false olmalı');
  const safraFindingInF = resF.findings.find(f => f.severity === 'critical' && f.field === 'stimulus' && f.message.toLowerCase().includes('safra'));
  check(!!safraFindingInF, 'Test F hedef kütle olduğu için safra hatasını muaf tutmamalı ve critical finding üretmeli');
}

// =========================================================================
// TEST G: Matematik Hata Tespiti (Hedeflenen toplama muaf, çarpma yakalanmalı)
// =========================================================================
{
  console.log('\n7. Test G: Matematik işlem hata tespiti (Hedeflenen 15+25 muaf, bağımsız 10*10 yakalanmalı)');
  const qG = {
    questionNumber: 7,
    outcomeCode: 'MAT.7.1.1',
    archetype: 'Hata Tespiti & Adım Analizi',
    stimulus: "Ali defterine 15 + 25 = 50 yazmıştır. Yanına da 10 * 10 = 500 yazmıştır.",
    questionText: "Ali'nin 15 + 25 toplama işlemi ile ilgili yaptığı işlem hatasını bulunuz ve doğrusunu yazınız.",
    modelAnswer: "Ali toplama işleminde hata yapmıştır. 15 + 25 işleminin doğru sonucu 40 olmalıdır.",
    rubric: [{ criterion: 'Doğru sonucun 40 olduğunu belirtme', points: 10 }]
  };

  const resG = auditQuestionQuality(qG, { subjectId: 'matematik', grade: 7 });
  check(resG.status === 'failed', 'Test G status failed olmalı (10*10=500 çarpma hatasından dolayı)');
  check(resG.isCertified === false, 'Test G isCertified false olmalı');
  const multFinding = resG.findings.find(f => f.severity === 'critical' && f.field === 'stimulus' && f.message.includes('10 * 10'));
  check(!!multFinding, 'Test G bağımsız 10 * 10 çarpma hatasını yakalamalı');
  const addFinding = resG.findings.find(f => f.field === 'stimulus' && f.message.includes('15 + 25'));
  check(!addFinding, 'Test G hedeflenen 15 + 25 toplama hatasını muaf tutmalı');
}

// =========================================================================
// TEST H: Sosyal Bilgiler & Din Kültürü Kural Düzeyinde Ayrım
// =========================================================================
{
  console.log('\n8. Test H: Sosyal Bilgiler ve Din Kültürü kural düzeyinde muafiyet kontrolü');

  // Sosyal: Lozan hedeflenmiş, senaryoda bağımsız TBMM hatası var
  const qH_Sosyal = {
    questionNumber: 8,
    outcomeCode: 'SB.8.2.1',
    archetype: 'Hata Tespiti & Adım Analizi',
    stimulus: "Tarih metninde Lozan Barış Antlaşması 1915 yılında imzalandı denilmiştir. Ayrıca TBMM 1918 yılında açılmıştır ifadesi yer almaktadır.",
    questionText: "Metindeki Lozan Barış Antlaşması ile ilgili kronolojik hatayı tespit edip doğrusunu açıklayınız.",
    modelAnswer: "Lozan Barış Antlaşması 1915 değil 1923 yılında imzalanmıştır.",
    rubric: [{ criterion: 'Lozan Antlaşmasının 1923 olduğunu belirtme', points: 10 }]
  };

  const resH_Sosyal = auditQuestionQuality(qH_Sosyal, { subjectId: 'sosyal_bilgiler', grade: 8 });
  check(resH_Sosyal.status === 'failed', 'Test H (Sosyal) bağımsız TBMM hatasından dolayı failed olmalı');
  const tbmmFinding = resH_Sosyal.findings.find(f => f.severity === 'critical' && f.field === 'stimulus' && f.message.includes('TBMM'));
  check(!!tbmmFinding, 'Test H (Sosyal) TBMM 1918 hatası için critical finding üretmeli');

  // Din: Usûl (dede) zekat hatası hedeflenmiş, senaryoda bağımsız zekat oranı hatası (%10) var
  const qH_Din = {
    questionNumber: 9,
    outcomeCode: 'DKAB.8.2.1',
    archetype: 'Hata Tespiti & Adım Analizi',
    stimulus: "Ahmet Bey zekatını öz dedesine verebileceğini düşünmektedir. Ayrıca zekat oranının her mal için yüzde 10 olduğunu iddia etmiştir.",
    questionText: "Ahmet Bey'in zekat verebileceği kişiler (usûl) hakkındaki hatasını açıklayınız.",
    modelAnswer: "Kişi anne, baba, dede ve ninelerine (usûl) zekat veremez çünkü onların bakımından sorumludur.",
    rubric: [{ criterion: 'Dedesine zekat verilemeyeceğini belirtme', points: 10 }]
  };

  const resH_Din = auditQuestionQuality(qH_Din, { subjectId: 'din_kulturu', grade: 8 });
  check(resH_Din.status === 'failed', 'Test H (Din) bağımsız %10 zekat oranı hatasından dolayı failed olmalı');
  const dinRatioFinding = resH_Din.findings.find(f => f.severity === 'critical' && f.field === 'stimulus' && f.message.includes('oran'));
  check(!!dinRatioFinding, 'Test H (Din) bağımsız oran hatası için critical finding üretmeli');
}

console.log(`\n==========================================`);
console.log(`TASK205 TÜM TESTLER BAŞARIYLA GEÇTİ: ${passedCount}/${totalCount}`);
console.log(`==========================================\n`);
