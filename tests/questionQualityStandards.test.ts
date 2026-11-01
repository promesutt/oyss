import {
  buildLiveExamPrompt,
  getGradeAgeDirectives,
  getQualityPedagogicalRules,
  QUESTION_DIRECTIVE_CLARITY_RULE,
  RUBRIC_DESIGN_RULE
} from '../src/generators/prompts';
import { getJsonOutputSchema } from '../src/generators/prompts/outputSchema';

console.log('=== OYSS FAZ 3.3.2: SORU KALİTESİ VE DİL STANDARDI PROMPT TESTLERİ BAŞLIYOR ===\n');

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

// 1. 5. Sınıf Canlı Prompt Doğrulaması
const promptG5 = buildLiveExamPrompt({
  grade: 5,
  subjectId: 'matematik',
  targetCount: 6,
  distributionsText: '[1. Soru] Kazanım: MAT.5.3.1 (Temel geometrik kavramlar)',
  avoidDirectives: 'Tekrar yok.',
  difficultyPlanText: '2 Kolay, 3 Orta, 1 Zor',
  outcomeCodes: ['MAT.5.3.1']
});

assert(
  promptG5.includes('5. SINIF SEVİYESİ') &&
  promptG5.includes('10-11 yaşındaki bir ilkokuldan yeni geçmiş ortaokul 5. sınıf öğrencisinin') &&
  promptG5.includes('günlük hayatın somut modelleri') &&
  !promptG5.includes('maksimum 10-15 kelime'),
  '5. Sınıf Canlı Prompt: Yaş Düzeyi ve Doğal Dil Direktifi',
  '5. sınıf promptu 10-11 yaş grubuna özgü somut model ve duru Türkçe kuralını içerir; katı kelime sınırı yerine doğallık esastır.'
);

assert(
  promptG5.includes('alternativeAnswers') &&
  promptG5.includes('Kabul edilebilir alternatif doğru yanıt') &&
  promptG5.includes('tek kesin cevabı olan sorularda boş [] bırakınız'),
  '5. Sınıf Canlı Prompt: Koşullu ve Esnek alternativeAnswers Desteği',
  '5. sınıf şemasında alternatif cevaplar zorunlu değil; duruma bağlı (1-3 alternatif veya boş []) olarak sunulmaktadır.'
);

// 2. 6. Sınıf Canlı Prompt Doğrulaması
const promptG6 = buildLiveExamPrompt({
  grade: 6,
  subjectId: 'fen_bilimleri',
  targetCount: 6,
  distributionsText: '[1. Soru] Kazanım: FB.6.1.1 (Güneş sistemi gezegenleri)',
  avoidDirectives: 'Tekrar yok.',
  difficultyPlanText: '2 Kolay, 3 Orta, 1 Zor',
  outcomeCodes: ['FB.6.1.1']
});

assert(
  promptG6.includes('6. SINIF SEVİYESİ') &&
  promptG6.includes('11-12 yaşındaki bir ortaokul 6. sınıf öğrencisinin') &&
  promptG6.includes('kadim') &&
  promptG6.includes('nakşetmek') &&
  promptG6.includes('Branşa özgü gerekli bilimsel ve kavramsal terimler'),
  '6. Sınıf Canlı Prompt: Arkaik Sözcük Filtresi ve Bilimsel Terim Koruması',
  '6. sınıf promptu "kadim", "nakşetmek" gibi arkaik sözcükleri yasaklar; gezegenler ve çarpanlar gibi bilimsel terimleri korur.'
);

// 3. 7. Sınıf Canlı Prompt Doğrulaması
const promptG7 = buildLiveExamPrompt({
  grade: 7,
  subjectId: 'turkce',
  targetCount: 6,
  distributionsText: '[1. Soru] Kazanım: T.O.7.4 (Metin içi delillendirme)',
  avoidDirectives: 'Tekrar yok.',
  difficultyPlanText: '2 Kolay, 3 Orta, 1 Zor',
  outcomeCodes: ['T.O.7.4']
});

assert(
  promptG7.includes('7. SINIF SEVİYESİ') &&
  promptG7.includes('12-13 yaşındaki bir ortaokul 7. sınıf öğrencisinin') &&
  promptG7.includes('neden-sonuç ve karşılaştırma ilişkilerini çözümleyebileceği') &&
  promptG7.includes('mefkûre'),
  '7. Sınıf Canlı Prompt: Analitik Duru Dil ve Ağdalı Terim Filtresi',
  '7. sınıf promptu analitik düşünmeyi destekleyen duru dili şart koşar; "mefkûre" gibi arkaik terimleri filtreler.'
);

// 4. 8. Sınıf Canlı Prompt Doğrulaması
const promptG8 = buildLiveExamPrompt({
  grade: 8,
  subjectId: 'matematik',
  targetCount: 6,
  distributionsText: '[1. Soru] Kazanım: M.8.1.1.1 (Pozitif tam sayı çarpanları)',
  avoidDirectives: 'Tekrar yok.',
  difficultyPlanText: '2 Kolay, 3 Orta, 1 Zor',
  outcomeCodes: ['M.8.1.1.1']
});

assert(
  promptG8.includes('8. SINIF SEVİYESİ') &&
  promptG8.includes('13-14 yaşındaki bir 8. sınıf öğrencisinin') &&
  promptG8.includes('Düşünme düzeyi yüksek, dil yükü gereksiz karmaşıklıktan arındırılmış sorular esastır') &&
  promptG8.includes('alternativeAnswers'),
  '8. Sınıf Canlı Prompt: LGS Analitik Netliği ve Alternatif Cevap Desteği',
  '8. sınıf promptu düşünme düzeyi yüksek-dil yükü sade ilkesini içerir ve 8. sınıfta da alternativeAnswers şeması aktiftir.'
);

// 5. Yönerge Açıklığı ve Görev Bütünlüğü Kuralı Doğrulaması
assert(
  promptG5.includes('YÖNERGE AÇIKLIĞI VE BİLİŞSEL DÜZEY KORUNUMU KURALI') &&
  promptG5.includes('Tekil / Çoğul beklentisi açıkça belirtilmelidir') &&
  promptG5.includes('Birbirinden bağımsız iki farklı görev tek bir soru cümlesinde iç içe geçirilmemeli') &&
  promptG5.includes('birbiriyle doğrudan ilişkili ve bütünleşik bir beceriyi ölçen aşamalı görevler') &&
  promptG5.includes('sırf "ve" bağlacı var diye yapay olarak bölünmemelidir'),
  'Yönerge Açıklığı ve Görev Bütünlüğü Kuralı',
  'Yönerge kuralı tekil/çoğul netliğini şart koşar; bağımsız görevleri ayırırken ilişkili/bütünleşik görevleri korur.'
);

// 6. Kavramsal Anlama ve Düz Tanım Dengesi Doğrulaması
assert(
  promptG5.includes('KAVRAMSAL ANLAMA VE DÜŞÜNME BECERİSİ ÖLÇÜMÜ') &&
  promptG5.includes('salt ezbere dayalı sözlük tanımları') &&
  promptG5.includes('kavramsal sorular ve yönergeler meşrudur') &&
  promptG5.includes('kavramsal anlama, uygulama veya analiz mi ölçtüğü daima gözetilmelidir'),
  'Kavramsal Anlama ve Düz Tanım Dengesi',
  'Kural tanımı toptan yasaklamaz; salt sözlük ezberi yerine kavramsal anlama ve olay içi rolün ölçülmesini sağlar.'
);

// 7. Analitik Rubrik Teşvik Kuralı Doğrulaması
assert(
  promptG5.includes('ANALİTİK DERECELİ PUANLAMA ANAHTARI (RUBRİK) TEŞVİK KURALI') &&
  promptG5.includes('birden fazla basamak, kavram teşhisi ve analitik gerekçelendirme gerektiriyorsa') &&
  promptG5.includes('tek kriterli rubrik kullanılabilir (zorla bölünmez)'),
  'Analitik Rubrik Teşvik ve Tek Maddeli Rubrik Dengesi',
  'Çok adımlı sorularda analitik rubrik teşvik edilirken, tek olgulu sorularda tek kriterli rubrik korunur.'
);

// 8. enableQualityStandards Flag Doğrulaması
const promptExplicitTrue = buildLiveExamPrompt({
  grade: 6,
  subjectId: 'sosyal_bilgiler',
  targetCount: 6,
  distributionsText: '[1. Soru] Kazanım: SB.6.1.1',
  avoidDirectives: 'Tekrar yok.',
  difficultyPlanText: 'Orta',
  enableQualityStandards: true
});

const promptExplicitFalse = buildLiveExamPrompt({
  grade: 6,
  subjectId: 'sosyal_bilgiler',
  targetCount: 6,
  distributionsText: '[1. Soru] Kazanım: SB.6.1.1',
  avoidDirectives: 'Tekrar yok.',
  difficultyPlanText: 'Orta',
  enableQualityStandards: false
});

assert(
  promptExplicitTrue.includes('YÖNERGE AÇIKLIĞI') &&
  promptExplicitTrue.includes('6. SINIF SEVİYESİ') &&
  !promptExplicitFalse.includes('YÖNERGE AÇIKLIĞI') &&
  promptExplicitFalse.includes('7. SINIF SEVİYESİ'),
  'enableQualityStandards Bayrağı ile Kontrollü Aktivasyon',
  'enableQualityStandards: true verildiğinde yeni direktifler eklenir; false verildiğinde legacy davranış korunur.'
);

console.log('====================================================');
console.log(`TOPLAM TEST: ${passCount + failCount}`);
console.log(`BAŞARILI   : ${passCount}`);
console.log(`BAŞARISIZ  : ${failCount}`);
console.log('====================================================');

if (failCount > 0) {
  process.exit(1);
}

