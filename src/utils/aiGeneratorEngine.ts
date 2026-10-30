import { SubjectId, GradeLevel, ExamScenario } from '../types';
import { getOfficialOutcomeTitle } from '../data/curriculumData';
import { SAMPLE_EXAMS } from '../data/sampleExams';
import { formatDifficultyPlanText, calibrateQuestionDifficulties } from './difficultyCalibrator';
import { distributeExamPoints, reconcileRubricPoints } from './examScoring';
import { 
  detectSourceRequirement, 
  checkStimulusQuality, 
  validateAndEnrichExamQuestions 
} from './sourceMaterialValidator';
import { parseExamJsonSafely } from './jsonParser';

const POOL_NAMES_A = [
  'Selin', 'Kerem', 'Zehra', 'Burak', 'Aslı', 'Emre', 'Derya', 'Tarık', 
  'Gamze', 'Umut', 'Defne', 'Mete', 'Bilge', 'Kuzey', 'Aylin', 'Koray'
];

const POOL_NAMES_B = [
  'Kaan', 'İrem', 'Tolga', 'Buse', 'Alper', 'Nilay', 'Ece', 'Oğuz', 
  'Sude', 'Onur', 'Caner', 'Pınar', 'Doruk', 'Damla', 'Barış', 'Seda'
];

import { getAllFallbackQuestions, GeneratedQuestionItem } from '../data/fallbackPools';
export type { GeneratedQuestionItem };

export interface GenerationResult {
  title: string;
  variationNumber: number;
  generationTime: string;
  model: string;
  isFallback?: boolean;
  fallbackReason?: string;
  questionsCount: number;
  generatedQuestions: GeneratedQuestionItem[];
  sourceValidationSummary?: {
    isFullyValid: boolean;
    missingSourceCount: number;
    recoveredCount: number;
  };
}

export interface GeneratorOptions {
  avoidQuestionTexts?: string[];
  avoidStimuli?: string[];
  preferredDifficulty?: 'standard' | 'more_complex' | 'foundational';
  outputType?: 'exam' | 'study_sheet' | 'practice_question';
}

/**
 * Kelime düzeyinde Jaccard ve alt dize benzerliği hesaplayarak mükerrer veya
 * yalnızca birkaç kelimesi değiştirilmiş soruları tespit eder.
 */
export function calculateQuestionSimilarity(textA: string, textB: string): number {
  if (!textA || !textB) return 0;
  const cleanA = textA.toLowerCase().replace(/[^a-z0-9ğüşıöç\s]/gi, ' ').trim();
  const cleanB = textB.toLowerCase().replace(/[^a-z0-9ğüşıöç\s]/gi, ' ').trim();
  if (cleanA === cleanB) return 1.0;
  if (cleanA.includes(cleanB) || cleanB.includes(cleanA)) {
    const minLen = Math.min(cleanA.length, cleanB.length);
    const maxLen = Math.max(cleanA.length, cleanB.length);
    if (minLen / maxLen > 0.6) return 0.85;
  }

  const wordsA = new Set(cleanA.split(/\s+/).filter(w => w.length > 2));
  const wordsB = new Set(cleanB.split(/\s+/).filter(w => w.length > 2));
  if (wordsA.size === 0 || wordsB.size === 0) return 0;

  let intersection = 0;
  for (const w of wordsA) {
    if (wordsB.has(w)) intersection++;
  }
  const union = wordsA.size + wordsB.size - intersection;
  return union > 0 ? intersection / union : 0;
}

export interface AvoidItem {
  questionText: string;
  stimulus?: string;
}

export function extractNumbersFromText(text: string): string[] {
  if (!text) return [];
  const matches = text.match(/\b\d+(?:[.,]\d+)?\b/g);
  return matches ? Array.from(new Set(matches)) : [];
}

export function isDuplicateOrTooSimilar(
  candidateQuestionText: string,
  candidateStimulus: string | undefined,
  avoidQuestionTextsOrItems: (string | AvoidItem)[],
  avoidStimuli: string[] = [],
  threshold = 0.38
): boolean {
  const cQ = (candidateQuestionText || '').trim();
  const cS = (candidateStimulus || '').trim();
  const cFull = (cS ? cS + ' ' : '') + cQ;
  const cNums = extractNumbersFromText(cFull);

  for (let i = 0; i < avoidQuestionTextsOrItems.length; i++) {
    const raw = avoidQuestionTextsOrItems[i];
    let aQ = '';
    let aS = '';

    if (typeof raw === 'object' && raw !== null && 'questionText' in raw) {
      aQ = (raw.questionText || '').trim();
      aS = (raw.stimulus || '').trim();
    } else if (typeof raw === 'string') {
      aQ = raw.trim();
      aS = (avoidStimuli[i] || '').trim();
    }

    if (!aQ && !aS) continue;

    const aFull = (aS ? aS + ' ' : '') + aQ;
    if (cFull === aFull || (cQ && cQ === aQ)) return true;

    const fullSim = calculateQuestionSimilarity(cFull, aFull);
    const qSim = calculateQuestionSimilarity(cQ, aQ);

    // Senaryolu / Zengin Uyarıcılı Sorular (Her ikisinin de uyarıcısı zenginse)
    if (cS.length > 25 && aS.length > 25) {
      const stimSim = calculateQuestionSimilarity(cS, aS);
      if (stimSim >= 0.50) {
        if (qSim >= 0.40 || fullSim >= 0.55) return true;
      }
      if (stimSim < 0.35) {
        // Kurgular ve bağlamlar tamamen farklı; salt yönerge/komut benzerliğinden ötürü mükerrer sayma
        if (fullSim >= 0.65) return true;
        continue;
      }
      if (fullSim >= 0.58) return true;
      continue;
    }

    // Matematik / Fen Sorularında Sayısal / Parametrik Kontrol
    const aNums = extractNumbersFromText(aFull);
    if (cNums.length > 0 && aNums.length > 0) {
      const commonNums = cNums.filter(n => aNums.includes(n));
      // Tamamen farklı sayılar/parametreler içeriyorsa (örn. 542A & 4 ile 7832B & 9, ya da 72 ile 90)
      if (commonNums.length === 0) {
        if (fullSim >= 0.85) return true;
        continue;
      }
      // Sayısal kesişim varsa benzerlik eşiği
      if (fullSim >= 0.60 || qSim >= 0.60) return true;
      continue;
    }

    // Düz Metin / Türkçe Anlama ve Dilbilgisi Soruları
    if (fullSim >= threshold || qSim >= threshold) {
      return true;
    }
  }

  return false;
}

export async function generateMEBIQuestions(
  subjectId: SubjectId,
  grade: GradeLevel,
  scenario: ExamScenario,
  variationIndex: number,
  _ignoredApiKey?: string,
  requestedQuestionCount?: number,
  options?: GeneratorOptions
): Promise<GenerationResult> {
  const startTime = Date.now();
  const expandedDistributions: typeof scenario.distributions = [];
  for (const d of scenario.distributions) {
    const count = d.questionCount || 1;
    for (let c = 0; c < count; c++) {
      expandedDistributions.push(d);
    }
  }

  const effectiveTotal = expandedDistributions.length || scenario.totalQuestions || 6;
  const targetCount = requestedQuestionCount || effectiveTotal;
  const pointAllocations = distributeExamPoints(targetCount);

  // Rotate names for procedural fallback
  const nameIdx1 = (variationIndex * 3 + 1) % POOL_NAMES_A.length;
  const nameIdx2 = (variationIndex * 5 + 4) % POOL_NAMES_B.length;
  const name1 = POOL_NAMES_A[nameIdx1];
  const name2 = POOL_NAMES_B[nameIdx2];

  const questionDistributions = Array.from({ length: targetCount }, (_, i) => {
    return expandedDistributions[i % (expandedDistributions.length || 1)] || scenario.distributions[0];
  });

  const distributionsText = questionDistributions.map((d, i) => {
    const officialTitle = getOfficialOutcomeTitle(d.outcomeCode);
    return `Soru ${i + 1}: [Kazanım Kodu: ${d.outcomeCode}] [Resmi Öğrenme Çıktısı: ${officialTitle || d.notes || 'Kavramsal Uygulama'}] [Bilişsel Düzey: ${d.cognitiveLevel}]`;
  }).join('\n');

  const difficultyPlanText = formatDifficultyPlanText(targetCount);
  const isGrade7Turkish = grade === 7 && subjectId === 'turkce';
  const isGrade7Math = grade === 7 && subjectId === 'matematik';
  const isGrade7Science = grade === 7 && subjectId === 'fen_bilimleri';
  const isGrade7Social = grade === 7 && subjectId === 'sosyal_bilgiler';
  const isGrade7Din = grade === 7 && subjectId === 'din_kulturu';

  // Mevcut senaryoya ait hazır sınav sorularını tespit et ve kaçınılacaklar listesine ekle
  const baseExam = SAMPLE_EXAMS.find(e =>
    e.grade === grade &&
    e.subjectId === subjectId &&
    (e.scenarioId === scenario.id || e.id.endsWith(scenario.id) || e.id.includes(scenario.id))
  );

  const baseAvoidItems: AvoidItem[] = baseExam
    ? baseExam.questions.map(q => ({ questionText: q.questionText, stimulus: q.stimulus || '' }))
    : [];

  const optQuestions = options?.avoidQuestionTexts || [];
  const optStimuli = options?.avoidStimuli || [];
  const optionAvoidItems: AvoidItem[] = optQuestions.map((q, idx) => ({
    questionText: q,
    stimulus: optStimuli[idx] || ''
  }));

  const allAvoidItems: AvoidItem[] = [...baseAvoidItems, ...optionAvoidItems];
  const allAvoidTexts = Array.from(new Set(allAvoidItems.map(item => item.questionText))).filter(
    t => typeof t === 'string' && t.trim().length > 0
  );
  const allAvoidStimuli = Array.from(new Set(allAvoidItems.map(item => item.stimulus || ''))).filter(
    s => typeof s === 'string' && s.trim().length > 0
  );

  const variationToken = `${variationIndex + 1}_${Date.now().toString(36)}`;

  const avoidDirectives = allAvoidTexts.length > 0 ? `
ÖZGÜNLÜK VE MEVCUT SORULARI TEKRARLAMAMA KURALI (EN KATI VE ZORUNLU KURAL):
- Bu sınav ${variationIndex + 1}. FARKLI varyasyon setidir (Varyasyon Belirteci: ${variationToken}).
- Mevcut sınav kâğıdında bulunan aşağıdaki soru konularını, olay örgülerini, metinleri, karakterleri ve durumları KESİNLİKLE TEKRARLAMA:
${allAvoidTexts.slice(0, 7).map((t, i) => `  * Yasaklı/Mevcut Soru ${i + 1}: "${t.slice(0, 95)}..."`).join('\n')}
${allAvoidStimuli.length > 0 ? `- Mevcut kurgu ve uyarım metinlerini (${allAvoidStimuli.slice(0, 3).map(s => `"${s.slice(0, 50)}..."`).join(', ')}) kesinlikle tekrarlama.\n` : ''}- Yukarıdaki metin ve olaylardan TAMAMEN FARKLI, YEPYENİ bir kurgu, yeni karakterler ve taze bir hayat durumu inşa et!
` : `
VARYASYON PLANI: Bu ${variationIndex + 1}. sınav varyasyonudur (Varyasyon Belirteci: ${variationToken}). Standart ve klişe kurguların dışında özgün senaryo oluşturunuz.
`;

  const turkishMebiDirectives = isGrade7Turkish ? `
MEBİ 7. SINIF TÜRKÇE DERS KİTABI ENTEGRASYON VE SORU YAZIM YÖNERGESİ (1. VE 2. KİTAP UYUMLU):
1. DERS KİTABI TEMATİK VE METİN TÜRÜ BAĞLAMLARI:
   Soruların uyarım ve kurgu metinleri, MEB 7. Sınıf Türkçe ders kitaplarının (1. ve 2. Kitap) tematik derinliğine ve tür çeşitliliğine uygun olmalıdır:
   - 1. Kitap Temaları:
     * 1. Tema: Hayat Boyu Gelişim (s. 10-73): Öz güven, azim, bilimsel merak, kişisel gelişim, havacılık ve keşif tutkusu. Metin türleri: Öyküleyici (hikâye, fabl), bilgilendirici (biyografi, otobiyografi, deneme), şiir.
     * 2. Tema: Bir Hilal Uğruna (s. 74-119): Millî mücadele, vatan sevgisi, bayrak bilinci, fedakârlık, kahramanlık. Metin türleri: Tarihî anı, hikâye, tiyatro, epik şiir.
     * 3. Tema: İletişim ve Sosyal İlişkiler (s. 120-171): Empati, nezaket, tatlı dil, güler yüz, sözsüz iletişim, dijital çağda iletişim ve sosyal medya etiği. Metin türleri: Hikâye, sohbet, deneme, bilgilendirici metin.
   - 2. Kitap Temaları:
     * 4. Tema: Türk Sanatı (s. 10-65): Geleneksel el sanatları (ebru, kilim, hat), geleneksel temaşa sanatları (Karagöz, meddah, orta oyunu), mimari ve musiki (türküler, Neşet Ertaş, Süleymaniye). Metin türleri: Bilgilendirici metin, gezi yazısı, deneme, şiir.
     * 5. Tema: Okuma Kültürü (s. 66-115): Kitabın serüveni (kil tabletten matbaaya ve e-kitaba), kütüphaneler, okuma sevgisi, bilgi okuryazarlığı. Metin türleri: Biyografi, deneme, makale, röportaj.
     * 6. Tema: Hak ve Sorumluluklar (s. 116-163): Çocuk hakları, adalet, toplumsal sorumluluk, Kutadgu Bilig'den gelen erdemler, dürüstlük ve vefa. Metin türleri: Hikâye edici (öykü, fabl), didaktik şiir, bilgilendirici metin.
2. ÖZGÜN EDEBİ METİN KURGUSU:
   - Kitaptaki metinleri birebir kopyalama; ders kitabındaki tematik çerçeveye, kelime kadrosuna ve öğrenci yaş düzeyine uygun özgün, kültürel ve edebi Türkçe metinler inşa et.
3. ÖLÇME VE DELİLLENDİRME KURALLARI:
   - Soru kökleri duru, net ve açık emir kipleriyle bitmelidir ("...yazınız", "...açıklayınız", "...tahmin ediniz").
   - Çıkarım ve örtük anlam (T.O.7.8, T.O.7.7) sorularında öğrenciden çıkarımını metindeki somut ipucu ve kanıtla desteklemesi ZORUNLU olarak istenmelidir ("en az iki ipucu ile delillendirerek açıklayınız" veya "metindeki ifadelerden hareketle gerekçelendiriniz").
   - Yüzey anlam (T.O.7.5) sorularında gereksiz yere metin içi delil aranmamalı; konunun veya doğrudan açık bilginin tek bir cümleyle tespiti istenmelidir.
   - Her soruyu alt maddeli (a, b) yapma! Yalnızca söz varlığı (T.O.7.4, T.O.7.21) ve yazım-noktalama (T.Y.7.21) gibi doğal olarak iki işlemli sorularda a) ve b) alt maddeleri kullan; okuma-anlama ve metin yapısı sorularında tekil ve odaklanmış soru kökü kullan.
4. KABUL EDİLEBİLİR ALTERNATİF CEVAPLAR (alternativeAnswers - ZORUNLU):
   - Her soru için JSON çıktısında "alternativeAnswers" dizisi KESİNLİKLE üretilmelidir (en az 2-3 adet kabul edilebilir alternatif ifade).
   - Bu alternatifler tek resmi cevap değil, aynı kavrama veya ana fikre ulaşan öğrencinin farklı sözcüklerle ifade edebileceği örneklerdir.
5. ANALİTİK VE PARÇALI RUBRİK:
   - Çıkarım (T.O.7.8) ve söz varlığı tahmini (T.O.7.4) sorularında rubrik ölçütleri "Doğru tespit/tahmin" ve "Metin içi delil/gerekçe" olarak iki bağımsız kritere bölünmelidir (örn: 8 p tespit + 7 p delillendirme). Böylece kısmi başarı öz değerlendirmede doğru yansıtılır.
   - Yüzey anlam (T.O.7.5) gibi tek odaklı sorularda rubrik tek ölçüt olarak kalmalıdır.
6. Asla hayali ders kitabı sayfa numarası veya MEBİ soru kopyası üretme.
` : '';

  const math7thDirectives = isGrade7Math ? `
MEBİ 7. SINIF MATEMATİK DERS KİTABI VE ÖLÇME YÖNERGESİ (1. KİTAP 1. TEMA UYUMLU):
1. KAZANIM EŞLEŞTİRMESİ VE DERS KİTABI BAĞLAMLARI:
   - MAT.7.1.1: Gerçek yaşam ya da matematiksel durumlarda doğal sayı, tam sayı ve rasyonel sayıları yorumlayabilme (Ders Kitabı 1. Kitap, Sayfa 14-40: ASELSAN Deringöz su altı aracı, Ocak ayı illerin sıcaklık değerleri, Mert'in dijital bütçesi, 0 referans noktası ve mutlak değer).
   - MAT.7.1.2: Gerçek yaşam durumlarında rasyonel sayıların ondalık gösterimlerini yansıtabilme (Ders Kitabı 1. Kitap, Sayfa 41-49: Günlük hayat nesnelerinin hacim/kütle rasyonel temsilleri, payı paydaya bölme, sonlu vs devirli ondalık, paydada 2 ve 5 dışı asal çarpan kuralı, devirliyi rasyonel yapma formülü).
   - MAT.7.1.3: Rasyonel sayıların karşılaştırma ve sıralama ilişkilerini yorumlayabilme (Ders Kitabı 1. Kitap, Sayfa 50-61: Gezegenlerin yüzey sıcaklıkları, negatif rasyonel sayılarda sayı doğrusunda sıfıra yakınlık/uzaklık, futbol ligi averaj tablosu, yarıma/bütüne yakınlık).
   - MAT.7.1.4: Rasyonel sayılar ve işlemler içeren gerçek yaşam problemlerini çözebilme (Ders Kitabı 1. Kitap, Sayfa 62-113: Denizaltının mikroplastik araştırmasında dikey hareketi, Gençtürk ailesi enerji giderleri aylık değişimi, çok adımlı işlemlerde işlem önceliği).
2. MATEMATİKSEL GÖSTERİM VE KaTeX DESTEĞİ:
   - Kesirler, denklemler ve matematiksel semboller için standart KaTeX $...$ formatını kullanınız (Örn: $\\frac{3}{4}$, $\\left(-\\frac{3}{4}\\right) + \\left(+\\frac{1}{8}\\right) = -\\frac{5}{8}$, $|+10| = 10$, $-38\\text{ °C}$).
   - JSON UYUMLULUK KURALI (RFC 8259): JSON dizgileri içinde KaTeX formüllerindeki ters eğik çizgileri (\\frac, \\left, \\right, \\cdot, \\Delta, \\sqrt, \\text vb.) standart JSON kaçışıyla çift ters eğik çizgi (\\\\) olarak yazınız (örneğin: "\\\\frac{3}{4}", "\\\\left(-\\\\frac{3}{4}\\\\right)").
3. KABUL EDİLEBİLİR DENK ALTERNATİF CEVAPLAR (alternativeAnswers):
   - Matematiksel olarak birbirine denk olan doğru ifade biçimlerini (Örn: $-\\frac{5}{8}\\text{ km}$ ile $-0,625\\text{ km}$; $\\frac{26}{11}$ ile $2\\frac{4}{11}$; $+15\\text{ °C}$ ile $15$) "alternativeAnswers" dizisine ekleyiniz.
4. ANALİTİK VE ADIMLI RUBRİK:
   - Puanlama rubriğinde işlem/modelleme basamakları ve nihai doğru sonuç için ayrı puan kriterleri tanımlayınız.
` : '';

  const science7thDirectives = isGrade7Science ? `
MEBİ 7. SINIF FEN BİLİMLERİ DERS KİTABI VE ÖLÇME YÖNERGESİ (1. KİTAP 1. VE 2. ÜNİTE UYUMLU):
1. KAZANIM EŞLEŞTİRMESİ VE DERS KİTABI BAĞLAMLARI:
   - FB.7.1.1: Uzay araştırmaları için geliştirilen teknolojileri karşılaştırabilme (Ders Kitabı 1. Kitap, Sayfa 12-30: Erzurum Palandöken Dağı DAG gözlemevi yer seçimi kriterleri - 3.170 m yüksek rakım, hava kirliliğinin ve yapay ışık kirliliğinin azlığı, nemsiz açık gece sayısı fazlalığı; James Webb Uzay Teleskobu - origami katlanır ayna teknolojisi, atmosferin kırıcı ve soğurucu etkisinden arınmış derin uzay gözlemi; Türkiye'nin uzay filosu - ilk yerli millî haberleşme uydumuz Türksat 6A, yüksek çözünürlüklü ilk yerli gözlem uydumuz İMECE; Alper Gezeravcı'nın ISS'te gerçekleştirdiği 13 bilimsel deney).
   - FB.7.1.3: Türkiye'nin aktif yapay uyduları ve uzay kirliliği çözüm teknolojileri (Ders Kitabı 1. Kitap, Sayfa 22-35: Türksat 6A ile İMECE görev farkları, saatte 28.000 km hızla dönen atıklar, Kessler sendromu, atmosferde kontrollü yakma).
   - FB.7.1.4: Yıldızların yaşam döngüsünü açıklayarak yapılandırabilme (Ders Kitabı 1. Kitap, Sayfa 36-45: Bulutsu / Nebula türleri - Orion, Atbaşı, Tarantula; Küçük kütleli yıldız döngüsü: Bulutsu -> Küçük Kütleli Yıldız / Güneş -> Kırmızı Dev -> Gezegenimsi Bulutsu -> Beyaz Cüce -> Siyah Cüce; Büyük kütleli yıldız döngüsü: Bulutsu -> Büyük Yıldız -> Kırmızı Süperdev -> Süpernova Patlaması -> Nötron Yıldızı / Pulsar veya Kara Delik; Güneş'in kütlesi yetersiz olduğu için süpernova patlaması geçirip kara deliğe dönüşemeyeceği vurgulanmalıdır).
   - FB.7.1.5: Yıldız, galaksi ve evren kavramlarını açıklayarak yapılandırabilme (Ders Kitabı 1. Kitap, Sayfa 46-55: Samanyolu ve komşu Andromeda Sarmal / spiral galaksi türündedir; Güneş Sistemi Samanyolu'nun Avcı / Orion kolundadır; Işık yılı zaman değil mesafe/uzaklık birimidir - Proxima Centauri 4,24 ışık yılı; Evren = Uzay + Dünya ayrımı).
   - FB.7.2.1: Fiziksel anlamda yapılan işin bağlı olduğu faktörlere ilişkin bilimsel çıkarım yapabilme (Ders Kitabı 1. Kitap, Sayfa 56-66: İşin şartları: 1) Cisme kuvvet uygulanmalı, 2) Cisim uygulanan kuvvet doğrultusunda yer değiştirmelidir; W = F · Δx; Sırtında çantayla yatay yolda sabit hızla yürüyen öğrenci yer çekimi kuvvetine karşı iş YAPMAZ çünkü kaldırma kuvveti düşey, hareket yataydır; Aynı çantayı merdivenden yukarı kata çıkaran öğrenci yer çekimine karşı iş YAPAR; Ağır dolabı iten ancak hareket ettiremeyen öğrencinin işi Δx = 0 olduğu için SIFIRDIR; Alınan yol eşitken uygulanan kuvvet arttıkça yapılan iş doğru orantılı artar).
   - FB.7.2.2: Enerji çeşitlerinden kinetik ve potansiyel enerjiyi karşılaştırabilme (Ders Kitabı 1. Kitap, Sayfa 67-86: Kinetik enerji kütle ve sürate bağlıdır - 60 km/h hızdaki kamyonun kinetik enerjisi küçük otomobilden büyüktür; Çekim potansiyel enerjisi kütle ve yüksekliğe bağlıdır - kum havuzunda 2 metre yükseklikten bırakılan bilye 1 metreden bırakılandan daha derin çukur oluşturur; Ep = m · g · h; Sürtünmesiz kaykay pistinde tepe noktasında Ep maksimum, dipte Ek maksimumdur; Mekanik enerji korunur; Sürtünmeli yüzeyde mekanik enerji ısı ve ses enerjisine dönüşür, toplam enerji korunur).
2. DENEY DÜZENEKLERİ VE DEĞİŞKEN ANALİZİ:
   - Bilimsel deney sorularında bağımsız değişken, bağımlı değişken ve kontrol edilen (sabit) değişkenler açıkça sorgulanmalıdır.
3. BİLİMSEL VE MATEMATİKSEL GÖSTERİM (KaTeX):
   - İş birimi Joule ($150\\text{ J}$), kuvvet ($30\\text{ N}$), yol ($10\\text{ m}$), sürat ($60\\text{ km/h}$), kütle ($m$, $2m$), yükseklik ($h$, $2h$) ve formüllerde standart KaTeX formatı ($W = F \\cdot \\Delta x$, $E_p = m \\cdot g \\cdot h$) kullanılmalıdır.
4. KABUL EDİLEBİLİR ALTERNATİF CEVAPLAR (alternativeAnswers):
   - Her soru için kavramsal olarak denk en az 2 alternatif kabul edilebilir yanıt "alternativeAnswers" dizisine eklenmelidir.
5. ANALİTİK VE PARÇALI RUBRİK:
   - İki şıklı (a, b) sorularda puanlama parçalı (örn. 6p tespit + 5p bilimsel gerekçe) dağıtılmalıdır.
` : '';

  const socialMebiDirectives = isGrade7Social ? `
MEBİ 7. SINIF SOSYAL BİLGİLER DERS KİTABI ENTEGRASYON VE ÖLÇME YÖNERGESİ (1. KİTAP 1. VE 2. ÖĞRENME ALANI UYUMLU):
1. KAZANIM EŞLEŞTİRMESİ VE DERS KİTABI BAĞLAMLARI:
   - SB.7.1.1: Dâhil olduğu gruplarda ve sosyal hayatta etkili iletişimin önemini sorgulayabilme (Ders Kitabı 1. Kitap, Sayfa 12-29):
     * Trafikte İletişim Dili (s. 14: Nezaket, sabır ve empati ile çatışmaları önleme).
     * 7/E Sınıfı Mesajlaşma Grubu (s. 13: Dijital iletişimde ses tonu ve yüz ifadesi eksikliğinin yanlış anlaşılmalara yol açması).
     * Ben Dili vs. Sen Dili (s. 19: Suçlayıcı, yargılayıcı sen dili yerine duyguları ve yapıcı çözümü ifade eden ben dili).
     * Etkin Dinleme ve 'İki Dinle Bir Söyle' Atasözü (s. 20: Göz teması, söz kesmeme, sabırla anlama).
     * Jest ve Mimikler / Beden Dili (s. 21: Güleryüz ve tebessümün güven verici etkisi).
     * İletişim Engelleri ve Ön Yargı / Kalıp Yargı (s. 22-26: Etiketleme, alay etme, lakap takma, siber zorbalık).
   - SB.7.1.2: Özel gereksinimli bireyler için fırsat eşitliğini sürdürmeye yönelik fikir üretebilme (Ders Kitabı 1. Kitap, Sayfa 30-39):
     * Engelleri Aşan Paralimpik Şampiyonları (s. 32: Azim ve eşit imkân sunulduğunda elde edilen dünya dereceleri).
     * Kentsel / Mimari Erişilebilirlik Düzenlemeleri (s. 34-36: Engelli araç park yeri, kabartmalı sarı kılavuz çizgiler, standart eğimli rampa, engelli asansörü, alçak tabanlı otobüsler).
     * Engelsiz Eğitim ve Engelsiz Plaj (s. 36: Kamusal ve sosyal alanlarda tam katılım olanakları).
     * Pozitif Ayrımcılık İlkesi (s. 35: Anayasa Madde 10 gereği dezavantajlı gruplara eşit başlangıç fırsatı tanınması).
     * İşitme / Görme Engelliler İçin Kamusal Destek: Türk İşaret Dili (TİD) personeli, görüntülü tercüman terminalleri, Braille alfabeli yönlendirmeler, ekran okuyucu uyumlu web siteleri (alt-text).
   - SB.7.1.3: Türk toplumunun millî meseleler karşısında gösterdiği tutum ve davranışlara ilişkin çıkarım yapabilme (Ders Kitabı 1. Kitap, Sayfa 40-50):
     * Millî Birlik ve Beraberlik Şuurumuz: Arif Bedii'nin 'Atatürk ve Millî Mücadele' tablosu (s. 42), Tekâlif-i Milliye Emirleri ve Sakarya Meydan Muharebesi'nde halkın son ekmeğini ve çorabını ordusuna vermesi (s. 45), Orhun Yazıtları'nda Bilge Kağan hitabı (s. 46), Şerife Bacı ve Kastamonu kağnı kolları, Sütçü İmam ve Maraş direnişi.
     * Topyekûn Dayanışma (İmece Ruhu): Büyük deprem, sel, orman yangını felaketlerinde ve salgın hastalıklarda milletin kan merkezlerine, yardım tırlarına ve fidan seferberliğine akın etmesi; Türk Kızılayı, AFAD ve Mehmetçik Vakfı dayanışması.
     * Bağımsızlık ve Egemenlik Tutkusu: 15 Temmuz'da sivil direniş ve 'Egemenlik kayıtsız şartsız milletindir' ilkesine bağlılık; uluslararası spor zaferlerinde ortak gurur ve bayrak sevgisi; TEKNOFEST ve yerli savunma sanayii (İHA, SİHA, KAAN) desteği.
   - SB.7.2.1: Küreselleşmenin insan ve toplum hayatı üzerindeki etkilerini analiz edebilme (Ders Kitabı 1. Kitap, Sayfa 58-67):
     * Ulaşım ve Lojistik Ağları (s. 61: Hızlı trenler, hava kargo köprüleri, kıtalararası ticaret).
     * Görüntülü İletişim ve Dijitalleşme (s. 62: Anlık bilgiye erişim, küresel köy kavramı).
     * Kahvenin Küresel Yolculuğu (s. 63: Etiyopya'dan Yemen ve Osmanlı'ya, oradan tüm dünyaya uzanan Türk kahvesi ve kültürel etkileşim).
     * Yeşil Vatan ve Çevre Bilinci (s. 64: Sınır tanımayan küresel çevre sorunları ve ortak gezegen sorumluluğu).
     * Popüler Kültür vs. Yerel Kültürler / Kültürel Tek Tipleşme (s. 65: Küresel müzik, moda ve fast-food karşısında ana dili, yerel mutfakları, halk oyunlarını ve geleneksel el sanatlarını koruma bilinci).
     * Kültürel Diplomasi: Türk kahvesi, ebru ve Karagöz'ün UNESCO Somut Olmayan Kültürel Miras listesinde yer alması.
2. ÖLÇME VE DELİLLENDİRME KURALLARI:
   - Soru kökleri duru, net ve açık emir kipleriyle bitmelidir ("...yazınız", "...açıklayınız", "...gerekçelendiriniz").
   - Çıkarım ve analiz sorularında öğrenciden metindeki somut ipuçlarıyla veya tarihsel/hukuki gerekçelerle yanıtını desteklemesi istenmelidir.
   - İki şıklı (a, b) sorularda puanlama parçalı ve analitik yapılmalıdır.
3. KABUL EDİLEBİLİR ALTERNATİF CEVAPLAR (alternativeAnswers - ZORUNLU):
   - Her soru için JSON çıktısında "alternativeAnswers" dizisi KESİNLİKLE üretilmeli ve kavramsal olarak denk en az 2 kabul edilebilir alternatif ifade eklenmelidir.
4. ANALİTİK VE PARÇALI RUBRİK:
   - Rubrik basamakları parçalı ve dengeli kriterlere bölünmeli, her kriterin puanı açıkça belirtilmelidir.
` : '';

  const dinMebiDirectives = isGrade7Din ? `
MEBİ 7. SINIF DİN KÜLTÜRÜ VE AHLAK BİLGİSİ DERS KİTABI ENTEGRASYON VE ÖLÇME YÖNERGESİ (1. KİTAP 1. VE 2. ÜNİTE UYUMLU):
1. KAZANIM EŞLEŞTİRMESİ VE DERS KİTABI BAĞLAMLARI:
   - DKAB.7.1.1: Melekleri sınıflandırabilme (Ders Kitabı 1. Kitap, Sayfa 14-21):
     * Varlıklar Âlemi (s. 14-15: Duyu organları ve mikroskop/teleskop gibi teknolojik araçlarla algılanabilen varlıklar; akıl, sevgi, merhamet gibi soyut kavramlar; vahiy yoluyla bilinen melek, cin, şeytan gibi gayb âlemi).
     * Meleklerin Özellikleri (s. 19: Nurdan yaratılmış olma, yememe-içmeme, uyumama, cinsiyetsizlik, günahsızlık, sürekli ibadet ve itaat, çok hızlı hareket).
     * Dört Büyük Melek ve Görevleri (s. 19-20: Cebrail - vahiy iletmek; Mikail - tabiat olaylarını ve rızıkları yönetmek; İsrafil - Sûr borusuna üflemek, kıyamet ve ba's; Azrail - eceli gelen canlıların ruhunu teslim almak).
     * Diğer Melekler (s. 21: Kirâmen Kâtibîn - sağ ve solda iyi ve kötü amelleri kaydedenler; Münker ve Nekir - kabirde ilk sorguyu yapanlar; Hafaza - insanı koruyan melekler).
   - DKAB.7.1.2: Ahiret hayatının aşamalarını çözümleyebilme (Ders Kitabı 1. Kitap, Sayfa 22-31):
     * Kronolojik Sıra (s. 29): Ölüm -> Berzah (kabir âlemi) -> Kıyamet (1. Sûr) -> Ba's (2. Sûr - yeniden diriliş) -> Haşir ve Mahşer (toplanma ve toplanılan meydan) -> Hesap ve Amel Defteri (organların şahitliği - Yâsîn 65) -> Mizan (ilahi adalet terazisi - Enbiyâ 47) -> Sırat -> Cennet ve Cehennem.
     * Cennetin İsimleri (s. 28: Firdevs, Naim, Adn, Dârüsselâm, Dârülmukâme, Me'vâ).
   - DKAB.7.1.3: Melek ve ahiret inancının insana kazandırdıkları konusunda analitik düşünebilme (Ders Kitabı 1. Kitap, Sayfa 32-36):
     * Öz Denetim / Otokontrol (s. 32-33: Kirâmen Kâtibîn meleklerinin varlığıyla insanın kimse görmediğinde dahi dürüst kalabilmesi).
     * Adalet Duygusu ve Mazlumun Tesellisi (s. 34: Dünyadaki haksızlıkların Mahkeme-i Kübra ve Mizan terazisinde mutlak adaletle görüleceği inancı).
     * Ölüm Korkusunu Yenme ve Hayata Anlam Katma (s. 35: Ölümün bir yok oluş değil, ebedi mutluluk başlangıcı olması; varoluşsal boşluktan kurtulma).
     * Kul Hakkına Riayet ve Sorumluluk Bilinci (s. 36: Ticarette dürüstlük, tartıda hile yapmama, yetimi gözetme, canlılara ve çevreye merhamet gösterme).
   - DKAB.7.1.4: Bir Sure Öğreniyorum: Nâs suresini ve bu surenin anlamını okuyarak yorumlayabilme (Ders Kitabı 1. Kitap, Sayfa 37-41):
     * Nâs Suresi meali, vesvese ve sinsi vesveseci (hannâs) kavramları.
     * Şerrin kaynakları: Cin ve insan şeytanları.
     * Sığınılacak yegane merci: İnsanların Rabbi, Meliki ve İlahı olan Yüce Allah.
   - DKAB.7.2.1: Hac ve umre ibadetlerini çözümleyebilme (Ders Kitabı 1. Kitap, Sayfa 50-60):
     * Haccın Farzları (s. 56: 1. İhrama girmek, 2. Arafat vakfesi yapmak, 3. Kâbe'yi tavaf etmek).
     * Temel Kavramlar ve Mekânlar (s. 52-53: İhram, Mîkât, Telbiye, Tavaf, Şavt, Sa'y, Vakfe, Kâbe, Safa-Merve, Arafat, Müzdelife, Mina).
     * Hac ile Umre Farkları (s. 58-60: Hac farzdır/yılda bir kez/Arafat vakfesi ve kurban var; Umre sünnettir/yıl boyu yapılabilir/Arafat vakfesi ve kurban yok).
     * İhramın Sembolik Anlamı (s. 52: Makam ve zenginlik farklarının silinmesi, mahşerdeki mutlak eşitlik, kefeni hatırlatarak dünyevilikten arınma).
2. AYET VE HADİS GÜVENLİĞİ KURALLARI (EN KATI VE DEĞİŞTİRİLEMEZ KURAL):
   - KESİNLİKLE ders kitabında bulunmayan ayet veya hadis alıntısı üretilemez!
   - Uydurma sure, ayet numarası veya hadis kaynağı yazılamaz!
   - Ayet ve hadisler sadece ders kitabında geçen mealleriyle (Zümer 68, Yâsîn 51 ve 65, Enbiyâ 47, Kaf 17-18, Tekvîr 1-3, Bürûc 11, Zilzâl 7-8, Nâs Suresi vb.) bağlamına sadık kalınarak kullanılabilir.
   - Sorularda öğrenciden metni ezbere yazması değil; verilen meal üzerinden çıkarım yapması, anlamı yorumlaması ve kavramsal analiz yapması istenmelidir.
   - Mezhepsel veya tartışmalı yorumlara girilmeyecektir; MEB'in kuşatıcı ve evrensel ahlak dili esas alınacaktır.
3. KABUL EDİLEBİLİR ALTERNATİF CEVAPLAR (alternativeAnswers - ZORUNLU):
   - Her soru için JSON çıktısında "alternativeAnswers" dizisi KESİNLİKLE üretilmeli ve kavramsal olarak denk en az 2 kabul edilebilir alternatif ifade eklenmelidir.
4. ANALİTİK VE PARÇALI RUBRİK:
   - Rubrik basamakları parçalı ve dengeli kriterlere bölünmeli, her kriterin puanı açıkça belirtilmelidir. Kriter puanları toplamı soru puanına kuruşu kuruşuna eşit olmalıdır.
` : '';

  const livePrompt = `SEN MEB TEMEL EĞİTİM GENEL MÜDÜRLÜĞÜ VE ÖDSGM ORTAK SINAVLAR BAŞUZMANISIN.
Aşağıdaki resmi senaryo kurallarına uygun olarak eksiksiz bir ${grade}. Sınıf ${subjectId} Ortak Yazılı Sınav Kağıdı üret.
TOPLAM SORU SAYISI: KESİNLİKLE VE TAM OLARAK ${targetCount} ADET AÇIK UÇLU SORU (1'den ${targetCount}'e kadar her soru eksiksiz üretilmelidir).

SENARYO RESMİ KAZANIM DAĞILIM PLANI (${targetCount} SORU):
${distributionsText}
${avoidDirectives}

ZORUNLU KAZANIM EŞLEŞMESİ (EN KATI VE DEĞİŞTİRİLEMEZ 1. KURAL):
- Sınavdaki Soru 1'den Soru ${targetCount}'e kadar HER BİR SORU, yukarıdaki dağılım tablosunda kendisine atanan [Kazanım Kodu] ve [Resmi Öğrenme Çıktısı] ile %100 BİRE BİR EŞLEŞMEK ZORUNDADIR!
- Sırayı ASLA bozma! Örneğin Dağılım planında Soru 4 için [Kazanım Kodu: FB.7.1.5] yazıyorsa, Soru 4 KESİNLİKLE FB.7.1.5 kazanımından sorulmalıdır. Asla FB.7.1.4, FB.7.2.2 veya başka bir kazanımdan soru üretilemez!
- Senaryoda yer almayan hiçbir kazanımdan soru üretilemez! Dağılım planındaki sıra ve kazanım kodları ASLA değiştirilemez!
- JSON çıktısında her sorunun 'outcome' alanına mutlaka dağılım planındaki ilgili sorunun resmi kazanım kodu (Örn: 'FB.7.1.5') yazılmalıdır.

ÖĞRENCİ YAŞ DÜZEYİNE UYGUN SADE VE AKICI TÜRKÇE (7. SINIF SEVİYESİ - EN KRİTİK PEDAGOJİK KURAL):
- Sorularda kullanılan dil, 12-13 yaşındaki bir ortaokul 7. sınıf öğrencisinin rahatlıkla, takılmadan anlayabileceği duru, yalın, açık ve anlaşılır bir Türkçe olmalıdır.
- Ağır akademik terminoloji, üniversite düzeyinde fizik/astronomi/biyoloji teorileri (örneğin pulsar, kuantum fiziği, ileri optik kırınım teorileri) KESİNLİKLE YASAKTIR.
- Soru kökleri, öncüller ve diyaloglar günlük hayatın içinden, öğrencinin yabancılık çekmeyeceği durumlar (ev yaşamı, spor, bisiklet sürmek, okul bahçesi, dağ gözlemevi, alışveriş sepeti, bahçe sulama vb.) üzerinden kurgulanmalıdır.
- Metinler gereksiz laf kalabalığından arındırılmalı, öğrencinin neyi çözeceği net ve samimi olmalıdır.

MEB ÖDSGM PEDAGOJİK ZORLUK DAĞILIMI (ÇAN EĞRİSİ - EN KRİTİK KURAL):
- Sınavdaki ${targetCount} sorunun zorluk derecesi MEB Ölçme ve Değerlendirme standartlarına TAM UYGUN olmalıdır:
  * Zorunlu Zorluk Dağılımı: ${difficultyPlanText}
  * ASLA eşit sayıda (örneğin 2 kolay, 2 orta, 2 zor gibi) dağıtım yapma! Sınavın omurgasını daima "Orta" düzey oluşturmalıdır.
  * "Basit Bilişsel Süreçler" etiketli kazanımlar "Kolay" veya "Orta" olmalıdır.
  * "Karmaşık Bilişsel Süreçler" etiketli kazanımlar "Orta" veya "Zor" olmalıdır.
  * Sınavın 1. sorusu öğrenciyi cesaretlendirmek için "Kolay" veya "Orta" olmalı; "Zor" soru sınavın sonuna doğru yerleştirilmelidir.

HER SORU İÇİN ZORUNLU BAĞLAM ÇEŞİTLİLİĞİ KURALI (EN KRİTİK KURAL):
- AYNI SINAV İÇİNDEKİ SORULARDA ASLA AYNI MEKÂN, AYNI ETKİNLİK VEYA AYNI BAĞLAMI TEKRARLAMA!
- Birden fazla sorunun "TÜBİTAK Bilim Fuarı / Şenliği", "Robotik Atölyesi" veya "Bilim Kulübü" gibi tek bir mekânda toplanması KESİNLİKLE YASAKTIR.
- Her sorunun kurgusu, mekânı, karakterleri ve gerçek yaşam olayı birbirinden TAMAMEN FARKLI alanlardan seçilmelidir:
  * Bir soru: Ev ekonomisi, mutfak, yemek tarifi, manav/market alışverişi veya aile bütçesi
  * Bir soru: Marangozluk atölyesi, mimari çizim, park peyzajı, ahşap zanaatı veya mobilya tasarımı
  * Bir soru: Spor sahası, atletizm koşu parkuru, bisiklet turu, dağcılık veya yüzme yarışı
  * Bir soru: Doğa ve çevre, baraj gölü su seviyesi, tarımsal damla sulama veya meteoroloji hava raporu
  * Bir soru: Okul kütüphanesi, arkeoloji müzesi, geleneksel el sanatları (ebru, çini, dokuma)
  * Bir soru: Şehir içi ulaşım ve trafik ışığı zamanlaması, güneş enerjisi santrali veya geri dönüşüm tesisi
- Karakter isimleri de her soruda değişmelidir (Örn: 1. soruda Elif ve Kerem, 2. soruda Marangoz Ahmet Usta, 3. soruda Zeynep ile Can, 4. soruda Çiftçi Hasan Bey...).

ÖNEMLİ MEBİ PEDAGOJİK KURALLARI:
1. DÜZ BİLGİ/TANIM KESİNLİKLE YASAKTIR. ("... nedir?", "... kim bulmuştur?" gibi ezber sorular sorulamaz).
2. Her soru mutlaka MEBİ'nin şu 7 şablonundan birine dayanmalıdır:
   - Durum & Özellik Matrisi (VAR/YOK tablosu)
   - Kurgusal Senaryo & Vaka İncelemesi
   - Öğrenci Tartışması & Yanılgı Tespiti
   - Hata Tespiti & Adım Analizi (İlk hata hangi adımda yapılmıştır?)
   - Dilemma (İkilem) ve Çözüm Değerlendirmesi
   - Empati & Cümle Dönüştürme
   - Metin İçi Delillendirme & Örtük Anlam
3. Toplam ${targetCount} sorunun puanları toplamı 100 olacak şekilde paylaştırılmalıdır.
4. ZORUNLU KAYNAK MATERYAL KURALI (EN KRİTİK KURAL - ASLA İHMAL EDİLEMEZ):
   - Eğer bir soru "metne göre", "metinden hareketle", "parçaya göre", "şiire göre", "tabloya göre", "grafiğe göre", "diyaloğa göre" veya "verilen duruma göre" kurgulanmışsa; O METNİN, TABLONUN VEYA DİYALOĞUN TAMAMI MUTLAKA "stimulus" ALANINA EKSİKSİZ VE DETAYLI YAZILMALIDIR!
   - ASLA "Metinde bir olay anlatılmaktadır", "Metinde zeytinyağı aşamaları anlatılmıştır" gibi 1 cümlelik soyut özetler YAZILAMAZ! Metin, öğrencinin soruda sorulan aşamaları, ana fikri, neden-sonuç ilişkisini bizzat metni okuyarak bulabileceği zenginlikte ve somutlukta (en az 2-4 cümlelik somut hikâye/olay örgüsü) yazılmalıdır.
   - Tablo sorularında veriler (satır ve sütunlar) mutlaka "stimulus" içinde verilmelidir.
   - Diyalog sorularında konuşan karakterlerin replikleri (Örn: Elif: "...", Kerem: "...") mutlaka "stimulus" içinde yer almalıdır.
   - Öğrenci kaynak metni/veriyi görmeden ASLA soruyu cevaplayamaz!
${turkishMebiDirectives}
${math7thDirectives}
${science7thDirectives}
${socialMebiDirectives}
${dinMebiDirectives}
ÇIKTI FORMATI:
SADECE geçerli bir JSON çıktısı ver. JSON şeması:
{
  "questions": [
    {
      "number": 1,
      "outcome": "Kazanım Kodu (Örn: MAT.7.1.1)",
      "outcomeTitle": "Resmi Öğrenme Çıktısı (Örn: Gerçek yaşam ya da matematiksel durumlarda doğal sayı, tam sayı ve rasyonel sayıları yorumlayabilme)",
      "difficulty": "Orta",
      "level": "Karmaşık Bilişsel Süreçler",
      "templateType": "Öğrenci Diyaloğu & Kavram Yanılgısı",
      "points": 15,
      "stimulus": "Diyalog veya vaka metni...",
      "question": "Açık uçlu soru...",
      "answer": "MEBİ model cevabı...",
      ${(isGrade7Turkish || isGrade7Math || isGrade7Science || isGrade7Social || isGrade7Din) ? `"alternativeAnswers": [
        "Kabul edilebilir alternatif örnek ifade 1",
        "Kabul edilebilir alternatif örnek ifade 2"
      ],` : ''}
      "rubric": [
        {"item": "Kriter 1", "pts": 8},
        {"item": "Kriter 2", "pts": 7}
      ]
    }
  ]
}`;

  const normalizeAndCalibrateQuestions = (questions: any[]): GeneratedQuestionItem[] => {
    const safeQuestions = Array.isArray(questions) ? [...questions] : [];

    // Eksik soru gelirse senaryo dağılımına göre eksik soruları tamamla
    if (safeQuestions.length < targetCount) {
      const missingCount = targetCount - safeQuestions.length;
      for (let m = 0; m < missingCount; m++) {
        const missingIdx = safeQuestions.length;
        const distItem = questionDistributions[missingIdx] || scenario.distributions[0];
        const reqOutcome = distItem.outcomeCode;
        const reqTitle = getOfficialOutcomeTitle(reqOutcome) || distItem.notes || 'MEBİ Öğrenme Çıktısı';
        const targetPts = pointAllocations[missingIdx] || 15;
        safeQuestions.push({
          number: missingIdx + 1,
          outcome: reqOutcome,
          outcomeTitle: reqTitle,
          difficulty: 'Orta',
          level: distItem.cognitiveLevel || 'Karmaşık Bilişsel Süreçler',
          templateType: 'Kurgusal Senaryo & Vaka İncelemesi',
          points: targetPts,
          stimulus: `${reqTitle} ile ilgili günlük hayat durumu ve uygulama basamakları incelenmektedir.`,
          question: `${reqOutcome} [${reqTitle}] öğrenme çıktısına uygun olarak verilen durumu analitik olarak açıklayınız.`,
          answer: `Öğrencinin kavramsal ilkeleri doğru tespit etmesi ve mantıksal çözüm basamaklarını gerekçelendirmesi beklenir.`,
          solutionExplanation: `MEBİ analitik çözüm kuralına göre ${reqOutcome} çıktısı gerekçelendirilmelidir.`,
          rubric: [
            { item: 'Kavramsal teşhis ve bilimsel tespit', pts: Math.ceil(targetPts / 2) },
            { item: 'Analitik gerekçelendirme ve çözüm adımı', pts: Math.floor(targetPts / 2) }
          ]
        });
      }
    }

    const withTitles = safeQuestions.slice(0, targetCount).map((q, idx) => {
      const distItem = questionDistributions[idx] || scenario.distributions[0];
      const requiredOutcome = distItem.outcomeCode;
      const officialTitle = getOfficialOutcomeTitle(requiredOutcome) || distItem.notes || q.outcomeTitle || 'MEBİ Öğrenme Çıktısı';
      const targetPts = pointAllocations[idx] || q.points || 15;

      const rawRubric = (q.rubric || []).map((r: any) => ({
        criterion: r.item || r.criterion || 'Değerlendirme Ölçütü',
        points: r.pts ?? r.points
      }));

      const reconciled = reconcileRubricPoints(rawRubric, targetPts);

      const altAnswers = Array.isArray(q.alternativeAnswers)
        ? q.alternativeAnswers
            .filter((a: any) => typeof a === 'string' && a.trim().length > 0)
            .map((a: string) => a.trim())
        : undefined;

      return {
        ...q,
        number: idx + 1,
        outcome: requiredOutcome,
        outcomeTitle: officialTitle,
        cognitiveLevel: distItem.cognitiveLevel || q.level || 'Karmaşık Bilişsel Süreçler',
        points: targetPts,
        alternativeAnswers: altAnswers && altAnswers.length > 0 ? altAnswers : undefined,
        solutionExplanation: q.solutionExplanation || q.explanation || (q.answer ? `Analitik çözüm adımları ve gerekçe: ${q.answer}` : undefined),
        rubric: reconciled.map(r => ({ item: r.criterion, pts: r.points }))
      };
    });
    const calibrated = calibrateQuestionDifficulties(withTitles);
    const { enrichedQuestions } = validateAndEnrichExamQuestions(calibrated);
    return enrichedQuestions as GeneratedQuestionItem[];
  };

  let fallbackReason: string | undefined;

  // 1. TIER 1: Güvenli Sunucu Fonksiyonu Proxy (/api/generate)
  // Tüm yapay zekâ istekleri istemciden gizlenmiş sunucu tarafı Netlify Function üzerinden yürütülür.
  try {
    const proxyRes = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-App-Client': 'oyss-portal-v1'
      },
      body: JSON.stringify({
        prompt: livePrompt,
        variationIndex,
        variationToken
      })
    });

    if (proxyRes.ok) {
      const data = await proxyRes.json();
      let questionsList = data?.questions;

      // İstemci tarafı KaTeX güvenli ayrıştırma (sunucu rawText döndürdüyse veya questions doğrudan parse edilemediyse)
      if (!questionsList || !Array.isArray(questionsList) || questionsList.length === 0) {
        const rawCandidateText = data?.rawText || data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
        if (rawCandidateText) {
          const parsedFallback = parseExamJsonSafely(rawCandidateText);
          if (parsedFallback.success && parsedFallback.data?.questions) {
            questionsList = parsedFallback.data.questions;
          }
        }
      }

      if (questionsList && Array.isArray(questionsList) && questionsList.length > 0) {
        const normalized = normalizeAndCalibrateQuestions(questionsList);

        // Anti-duplication sanity check: Canlı Gemini çıktısının mevcut sınav sorularını birebir tekrarlamadığından emin ol
        const hasDirectDuplicate = normalized.some(nq =>
          isDuplicateOrTooSimilar(nq.question, nq.stimulus, allAvoidItems, undefined, 0.45)
        );

        if (!hasDirectDuplicate) {
          const activeModelName = data?.activeModel || 'Gemini Akıllı Soru Motoru';
          const elapsedSec = Math.max(0.7, (Date.now() - startTime) / 1000).toFixed(1) + ' saniye';
          return {
            title: `${grade}. Sınıf ${scenario.name} (Özgün Sınav Seti - ${normalized.length} Soru)`,
            variationNumber: variationIndex + 1,
            generationTime: elapsedSec,
            model: `${activeModelName}`,
            isFallback: false,
            questionsCount: normalized.length,
            generatedQuestions: normalized,
            sourceValidationSummary: {
              isFullyValid: !normalized.some(q => q.hasMissingSourceError),
              missingSourceCount: normalized.filter(q => q.hasMissingSourceError).length,
              recoveredCount: normalized.filter(q => q.commonStimulus || q.sharedSourceId).length
            }
          };
        } else {
          console.warn('Canlı model çıktısında mevcut sınavla çakışan soru tespit edildi; yerel MEBİ özgünleştirme motoruna aktarılıyor.');
          fallbackReason = 'Canlı yapay zekâ çıktısı mevcut sınavla benzerlik gösterdiğinden yerel MEBİ özgünleştirme motoru devreye alındı.';
        }
      } else {
        console.warn('Canlı model geçerli soru listesi sağlamadı:', data);
        fallbackReason = data?.error || 'Model çıktısı geçerli bir sınav formatına (questions dizisi) uymadığı için yerel motor devreye alındı.';
      }
    } else {
      let errJson: any = null;
      try {
        errJson = await proxyRes.json();
      } catch {}

      if (proxyRes.status === 429) {
        fallbackReason = 'Yapay zekâ servisi kota sınırında (429 - Çok sık istek). Lütfen bir dakika sonra tekrar deneyiniz.';
      } else if (proxyRes.status === 422) {
        fallbackReason = errJson?.error || 'Üretilen sınav yanıtı biçimsel şemaya uymadığı için yerel motor devreye alındı.';
      } else if (proxyRes.status === 502 || proxyRes.status === 503) {
        fallbackReason = errJson?.error || 'Yapay zekâ servisi şu anda meşgul veya geçici olarak yanıt veremiyor (HTTP 502/503).';
      } else {
        fallbackReason = errJson?.error || `Yapay zekâ servisi yanıt veremedi (HTTP ${proxyRes.status}).`;
      }
    }
  } catch (proxyErr: any) {
    console.warn('Sunucu proxy çağrısı başarısız, yerel yedek motora geçiliyor:', proxyErr?.message || proxyErr);
    fallbackReason = 'Canlı yapay zekâ servisiyle bağlantı kurulamadı (Ağ/Çevrimdışı).';
  }

  // 2. TIER 2: Prosedürel MEBİ Müfredat Motoru (Çevrimdışı / Güvenli Yedek)
  // Sunucu API yanıt veremediğinde veya bağlantı olmadığında devreye giren deterministik üretim motoru.
  const _cycle = variationIndex % 2;
  void _cycle;

  // ---------------------------------------------------------------------------
  // KAZANIM ODAKLI VE RESMİ MEBİ DAĞILIMINA %100 UYUMLU PROSEDÜREL SEÇİCİ
  // ---------------------------------------------------------------------------
  // Her ders ve her senaryo için soru seçimi; soru numarasına veya sıralı döngüye göre DEĞİL,
  // Soru i için belirlenen resmi "d.outcomeCode" kazanımına göre TAM EŞLEŞME ile yapılır.
  const occurrenceCount: Record<string, number> = {};

  const internalAllQuestions: GeneratedQuestionItem[] = getAllFallbackQuestions({
    name1,
    name2,
    pointAllocations
  });

  const isCurrentExam = (e: any) => e.scenarioId === scenario.id || e.id.endsWith(scenario.id) || e.id.includes(scenario.id);

  const dynamicQuestions: GeneratedQuestionItem[] = questionDistributions.map((d, idx) => {
    const outcomeCode = d.outcomeCode;
    const occ = occurrenceCount[outcomeCode] || 0;
    occurrenceCount[outcomeCode] = occ + 1;

    const officialOutcome = getOfficialOutcomeTitle(outcomeCode);
    const resolvedTitle = (officialOutcome && officialOutcome !== outcomeCode)
      ? officialOutcome
      : (d.notes || 'MEBİ Öğrenme Çıktısı');

    // 1. Önce SAMPLE_EXAMS içerisinden aynı kademe ve aynı derse ait ilgili kazanımdaki soruları filtrele
    // DİKKAT: Mevcut senaryo (e.scenarioId === scenario.id) KESİNLİKLE HARİÇ TUTULUR!
    const matchingSampleQuestionsWithExam: { q: any; parentExam: any }[] = [];
    SAMPLE_EXAMS
      .filter((e) => e.grade === grade && e.subjectId === subjectId && !isCurrentExam(e))
      .forEach((e) => {
        e.questions.forEach((q) => {
          if (q.outcomeCode === outcomeCode) {
            matchingSampleQuestionsWithExam.push({ q, parentExam: e });
          }
        });
      });

    // 2. Ardından içeride tanımlı zengin MEBİ havuzundaki ilgili kazanım sorularını filtrele
    const internalPool = internalAllQuestions.filter((q) => q.outcome === outcomeCode);

    // 3. Genel SAMPLE_EXAMS havuzunda bu kazanım var mı (farklı sınıf/şube olsa dahi, mevcut senaryo hariç)
    const crossGradeSampleQuestionsWithExam: { q: any; parentExam: any }[] = [];
    if (matchingSampleQuestionsWithExam.length === 0) {
      SAMPLE_EXAMS
        .filter((e) => !isCurrentExam(e))
        .forEach((e) => {
          e.questions.forEach((q) => {
            if (q.outcomeCode === outcomeCode) {
              crossGradeSampleQuestionsWithExam.push({ q, parentExam: e });
            }
          });
        });
    }

    const availablePool = [
      ...internalPool.map((q) => ({
        outcome: q.outcome,
        outcomeTitle: q.outcomeTitle,
        difficulty: q.difficulty,
        level: q.level,
        templateType: q.templateType,
        stimulus: q.stimulus || '',
        question: q.question,
        answer: q.answer,
        alternativeAnswers: q.alternativeAnswers,
        rubric: q.rubric
      })),
      ...matchingSampleQuestionsWithExam.map(({ q, parentExam }) => {
        let stim = q.stimulus || '';
        const req = detectSourceRequirement(q.questionText, q.archetype, q.contextText, stim);
        const quality = checkStimulusQuality(stim, req);
        // Eğer bu soru bir meta-özet veya önceki soruya referans ise, ana sınavdaki tam okuma metnini devral
        if (!quality.isValid && (quality.isCrossReference || quality.isMetaSummary)) {
          const parentSourceQ = parentExam.questions.find((pq: any) => {
            const pqStim = pq.stimulus?.trim() || '';
            return pqStim.length >= 100 && !pqStim.startsWith('Metinde') && !pqStim.startsWith('Yukarıda');
          }) || parentExam.questions[0];

          if (parentSourceQ?.stimulus && parentSourceQ.stimulus.length > 80) {
            stim = parentSourceQ.stimulus;
          }
        }
        return {
          outcome: q.outcomeCode,
          outcomeTitle: q.outcomeTitle,
          difficulty: q.difficulty,
          level: q.cognitiveLevel,
          templateType: q.archetype,
          stimulus: stim,
          question: q.questionText,
          answer: q.modelAnswer,
          alternativeAnswers: q.alternativeAnswers,
          rubric: (q.rubric || []).map((r: any) => ({ item: r.criterion, pts: r.points }))
        };
      }),
      ...crossGradeSampleQuestionsWithExam.map(({ q, parentExam }) => {
        let stim = q.stimulus || '';
        const req = detectSourceRequirement(q.questionText, q.archetype, q.contextText, stim);
        const quality = checkStimulusQuality(stim, req);
        if (!quality.isValid && (quality.isCrossReference || quality.isMetaSummary)) {
          const parentSourceQ = parentExam.questions.find((pq: any) => {
            const pqStim = pq.stimulus?.trim() || '';
            return pqStim.length >= 100 && !pqStim.startsWith('Metinde') && !pqStim.startsWith('Yukarıda');
          }) || parentExam.questions[0];

          if (parentSourceQ?.stimulus && parentSourceQ.stimulus.length > 80) {
            stim = parentSourceQ.stimulus;
          }
        }
        return {
          outcome: q.outcomeCode,
          outcomeTitle: q.outcomeTitle,
          difficulty: q.difficulty,
          level: q.cognitiveLevel,
          templateType: q.archetype,
          stimulus: stim,
          question: q.questionText,
          answer: q.modelAnswer,
          alternativeAnswers: q.alternativeAnswers,
          rubric: (q.rubric || []).map((r: any) => ({ item: r.criterion, pts: r.points }))
        };
      })
    ];

    // Anti-duplication filtreleme: Mevcut sınav soruları veya daha önce üretilen sorularla eşleşenleri ayıkla
    const filteredPool = availablePool.filter((cand) => {
      return !isDuplicateOrTooSimilar(cand.question, cand.stimulus, allAvoidItems, undefined, 0.38);
    });

    if (filteredPool.length > 0) {
      const pickIdx = (variationIndex * 3 + occ) % filteredPool.length;
      const q = filteredPool[pickIdx];
      return {
        number: idx + 1,
        outcome: outcomeCode,
        outcomeTitle: resolvedTitle,
        difficulty: q.difficulty || 'Orta',
        level: d.cognitiveLevel || q.level || 'Karmaşık Bilişsel Süreçler',
        templateType: q.templateType || 'Kurgusal Senaryo & Vaka İncelemesi',
        points: pointAllocations[idx] || 15,
        stimulus: q.stimulus || '',
        question: q.question,
        answer: q.answer,
        alternativeAnswers: q.alternativeAnswers,
        rubric: (q.rubric && q.rubric.length > 0) ? q.rubric : [
          { item: 'Kavramsal teşhis ve bilimsel tespit', pts: Math.round((pointAllocations[idx] || 15) * 0.5) },
          { item: 'Analitik gerekçelendirme ve modelleme basamağı', pts: (pointAllocations[idx] || 15) - Math.round((pointAllocations[idx] || 15) * 0.5) }
        ]
      };
    }

    // 4. Havuzda henüz bulunmayan veya mükerrerlik filtresi sonrası boş kalan kazanımlar için pedagojik dinamik MEBİ sentezi
    const dynSubjectName = subjectId.replace(/_/g, ' ').toUpperCase();

    // Türkçe dersi için özel bağlamsal edebî kurgular
    if (subjectId === 'turkce') {
      const turkishContexts = [
        {
          theme: 'Köy Çeşmesi ve İmece',
          stim: `Köyün asırlık taş çeşmesinin oluğundan akan kaynak suyu, tarladan dönen köylülerin ve yolcuların nefeslendiği ortak duraktı. Muhtar Salih Bey, kuraklık tehlikesine karşı çeşmenin arkasındaki su deposunu imece usulüyle temizletmiş; israfı önlemek için de gençlerle birlikte bir su saati düzeneği kurmuştu.`,
          meaningQ: `Metne göre köylülerin kuraklık tehlikesine karşı suyu korumak ve paylaşmak için aldığı tedbiri açıklayınız.`,
          meaningAns: `Muhtar Salih Bey ve köy halkı imece usulüyle su deposunu temizletmiş ve israfı önlemek amacıyla gençlerle su saati düzeneği kurarak suyu koruma altına almıştır.`,
          vocabWords: ['imece', 'oluk'],
          idioms: ['gönül birliği etmek', 'alın teri dökmek'],
          errSentence: `Muhtar salih bey, 29 ekim günü çeşmenin başında toplanan köylülere şöyle dedi; Suyumuz bizim geleceğimizdir.`
        },
        {
          theme: 'Tarihî Kütüphane ve Antika Saat',
          stim: `Tarihî okul kütüphanesinin başköşesinde duran sarkaçlı pirinç saat, tam doksan yıldır her saat başında tok bir sesle çalardı. Kütüphaneci Emine Hanım, 'Bu saat sadece dakikaları değil, bu salonda sabırla okuyan binlerce gencin hayallerini de saydı.' diyerek saatin tozunu ipek bir mendille özenle alırdı.`,
          meaningQ: `Kütüphaneci Emine Hanım'ın saatin tozunu alırken söylediği sözdeki örtük anlamı ve saate duyduğu vefa duygusunu açıklayınız.`,
          meaningAns: `Pirinç saatin sadece zamanı gösteren bir aygıt olmadığını, o kütüphanede emek veren nesillerin ortak hatırasını ve ilim yolculuğunu simgelediğini ifade etmektedir.`,
          vocabWords: ['sarkaç', 'başköşe'],
          idioms: ['can kulağıyla dinlemek', 'el üstünde tutmak'],
          errSentence: `Emine hanım, kütüphanedeki eski kitapları istanbul ve ankara'dan gelen araştırmacılara gösterdi.`
        },
        {
          theme: 'Tarihî Rüzgâr Değirmeni',
          stim: `Ege kıyılarındaki tepeye kurulu yel değirmeni, sonbahar rüzgârları başladığında dev kanatlarını döndürmeye başlardı. Değirmenci İbrahim Usta, köylülerin getirdiği buğday çuvallarını sırayla tartar, hiçbir çuvalı ayırt etmeden taşların arasında una dönüştürürdü. Değirmenin kapısında 'Hak geçmesin, un tükenmesin' levhası asılıydı.`,
          meaningQ: `Değirmenin kapısında asılı olan 'Hak geçmesin, un tükenmesin' levhasındaki ilkeyi İbrahim Usta'nın dürüstlüğüyle ilişkilendirerek açıklayınız.`,
          meaningAns: `İbrahim Usta köylülerin buğdaylarını ayrım yapmadan sırayla tartıp adaletle öğüterek hiç kimsenin hakkını yememiş, emeğe ve berekete duyduğu saygıyı dürüstlüğüyle somutlaştırmıştır.`,
          vocabWords: ['öğütmek', 'ayrım'],
          idioms: ['hak gözetmek', 'eli açık olmak'],
          errSentence: `İbrahim usta, her sabah gün doğarken izmir'in dağlarına bakar ve fırıncı ahmet'e selam verirdi.`
        }
      ];

      const ctx = turkishContexts[(variationIndex + idx) % turkishContexts.length];

      if (outcomeCode.includes('T.O.5.6') || outcomeCode.includes('T.O.7.5')) {
        return {
          number: idx + 1,
          outcome: outcomeCode,
          outcomeTitle: resolvedTitle,
          difficulty: 'Kolay',
          level: d.cognitiveLevel || 'Basit Bilişsel Süreçler',
          templateType: 'Kurgusal Senaryo & Vaka İncelemesi',
          points: pointAllocations[idx] || 15,
          stimulus: ctx.stim,
          question: ctx.meaningQ,
          answer: ctx.meaningAns,
          alternativeAnswers: [
            `Metinde anlatılan ${ctx.theme} olayında adalet, emek ve paylaşım bilinci vurgulanmaktadır.`,
            `Olay örgüsünde ${ctx.theme} çerçevesinde toplumsal dayanışma, dürüstlük ve ortak sorumluluk değerleri öne çıkarılmıştır.`
          ],
          rubric: [
            { item: 'Metnin ana konusunun ve olay örgüsünün doğru tespiti', pts: Math.round((pointAllocations[idx] || 15) * 0.5) },
            { item: 'Gerekçenin metindeki somut eylemlerle delillendirilmesi', pts: Math.round((pointAllocations[idx] || 15) * 0.5) }
          ]
        };
      } else if (outcomeCode.includes('T.O.5.20') || outcomeCode.includes('T.O.7.4')) {
        return {
          number: idx + 1,
          outcome: outcomeCode,
          outcomeTitle: resolvedTitle,
          difficulty: 'Orta',
          level: d.cognitiveLevel || 'Basit Bilişsel Süreçler',
          templateType: 'Kelime Anlamı & Bağlamsal Çözümleme',
          points: pointAllocations[idx] || 15,
          stimulus: ctx.stim,
          question: `Metinde geçen '${ctx.vocabWords[0]}' ve '${ctx.vocabWords[1]}' kelimelerinin bağlamsal anlamlarını yazınız ve birer cümlede kullanınız.`,
          answer: `'${ctx.vocabWords[0]}' ve '${ctx.vocabWords[1]}' kelimelerinin metindeki bağlama uygun anlamı yazılmış ve kurallı cümleler kurulmuştur.`,
          alternativeAnswers: [
            `Kelimeler metindeki bağlama uygun olarak doğru anlamlandırılmıştır.`,
            `Her iki sözcüğün de metnin ana temasına ve cümle yapısına uygun anlam karşılıkları yazılmıştır.`
          ],
          rubric: [
            { item: 'Kelimelerin bağlama uygun doğru anlamlandırılması', pts: Math.round((pointAllocations[idx] || 15) * 0.5) },
            { item: 'Örnek cümlelerin anlam bütünlüğü ve dilbilgisi kurallarına uygunluğu', pts: Math.round((pointAllocations[idx] || 15) * 0.5) }
          ]
        };
      } else if (outcomeCode.includes('T.Y.5.13') || outcomeCode.includes('T.Y.7.13')) {
        return {
          number: idx + 1,
          outcome: outcomeCode,
          outcomeTitle: resolvedTitle,
          difficulty: 'Zor',
          level: d.cognitiveLevel || 'Karmaşık Bilişsel Süreçler',
          templateType: 'Deyim ve Zengin Söz Varlığıyla Yazma',
          points: pointAllocations[idx] || 15,
          stimulus: ctx.stim,
          question: `İçinde '${ctx.idioms[0]}' ve '${ctx.idioms[1]}' deyimlerinin geçtiği, ${ctx.theme} konusuna uygun akıcı ve kurallı bir paragraf yazınız.`,
          answer: `Her iki deyim anlamına uygun biçimde kullanılarak kurallı ve anlamlı bir paragraf oluşturulmuştur.`,
          alternativeAnswers: [
            `Deyimler yerinde ve doğru anlamda kullanılarak tutarlı bir metin kurgulanmıştır.`,
            `Belirtilen deyimler bağlama ve tema akışına uygun seçilerek dil kurallarına uygun şekilde metne işlenmiştir.`
          ],
          rubric: [
            { item: 'Deyimlerin yerinde ve doğru anlamda kullanılması', pts: Math.round((pointAllocations[idx] || 15) * 0.5) },
            { item: 'Paragrafın kurgusal bütünlüğü ve akıcılığı', pts: Math.round((pointAllocations[idx] || 15) * 0.5) }
          ]
        };
      } else if (outcomeCode.includes('T.Y.5.16') || outcomeCode.includes('T.Y.7.21')) {
        return {
          number: idx + 1,
          outcome: outcomeCode,
          outcomeTitle: resolvedTitle,
          difficulty: 'Kolay',
          level: d.cognitiveLevel || 'Basit Bilişsel Süreçler',
          templateType: 'Hata Tespiti & Düzeltme',
          points: pointAllocations[idx] || 14,
          stimulus: ctx.errSentence,
          question: `Yukarıdaki cümlede büyük harf ve noktalama kurallarına aykırı yapılan 3 hatayı belirleyip cümlenin doğrusunu yazınız.`,
          answer: `Hatalar tespit edilerek büyük harfler ve noktalama işaretleri kurallara uygun biçimde düzeltilmiştir.`,
          alternativeAnswers: [
            `Büyük harf ve noktalama işaretleri eksiksiz düzeltilmiştir.`,
            `Cümledeki özel isim yazımı, iki nokta ve büyük harf kuralları doğru biçimde uygulanarak cümle yeniden yazılmıştır.`
          ],
          rubric: [
            { item: 'Büyük harf ve noktalama hatalarının tespiti', pts: Math.round((pointAllocations[idx] || 15) * 0.5) },
            { item: 'Cümlenin hatasız yeniden yazımı', pts: Math.round((pointAllocations[idx] || 15) * 0.5) }
          ]
        };
      }
    }
    const archetypesList = [
      'Durum & Özellik Matrisi (VAR/YOK Tablosu)',
      'Kurgusal Senaryo & Vaka İncelemesi',
      'Öğrenci Diyaloğu & Kavram Yanılgısı',
      'Hata Tespiti & Adım Analizi',
      'Dilemma (İkilem) & Çözüm Değerlendirme',
      'Metin İçi Delillendirme & Örtük Anlam',
      'Birinci Ağızdan Konuşturma / Rol'
    ];
    const arch = archetypesList[idx % archetypesList.length];
    const sName1 = POOL_NAMES_A[(variationIndex + idx) % POOL_NAMES_A.length];
    const sName2 = POOL_NAMES_B[(variationIndex + idx + 3) % POOL_NAMES_B.length];

    let stim = '';
    let qText = '';
    let ans = '';

    if (arch.includes('Matris')) {
      stim = `Tablo: ${dynSubjectName} Temel Kavramları ve Özellikleri
----------------------------------------------------------------------
| Kavram / Durum | Temel İlke Şartı | Gerçek Yaşam Uygulaması |
| Durum A        | ................ | ....................... |
| Durum B        | ................ | ....................... |`;
      qText = `Tabloda boş bırakılan yerleri ${outcomeCode} [${resolvedTitle}] öğrenme çıktısına göre uygun bilimsel/kavramsal ifadelerle doldurunuz.`;
      ans = `Durum A ve Durum B özellikleri ders ilkeleri doğrultusunda eksiksiz eşleştirilmiştir.`;
    } else if (arch.includes('Diyalog')) {
      stim = `${sName1} ve ${sName2} ders çalışırken ${resolvedTitle} konusunda farklı görüşler belirtmiştir:
${sName1}: "Bu olayda sadece ilk değişken belirleyicidir ve sonuç buna göre şekillenir."
${sName2}: "Hayır, şartlar değiştiğinde doğrudan diğer etkenlerin devreye girdiği ve sonuca etki ettiği görülür."`;
      qText = `${sName1} ve ${sName2}'nin açıklamalarını ${outcomeCode} ilkeleri doğrultusunda değerlendiriniz. Hangisi haklıdır? Gerekçelendiriniz.`;
      ans = `${sName2} haklıdır. Çünkü süreç tek bir değişkene indirgenemez, bağlamsal şartlar belirleyicidir.`;
    } else if (arch.includes('Hata')) {
      stim = `${sName1}, problem çözümünde 3 adım uygulamıştır:
1. Adım: Temel tanımı ve değişkenleri belirlemiştir.
2. Adım: Verilen kuralları işleme koymuştur.
3. Adım: Çıkan sonucu ilk durumla karşılaştırıp sonuca varmıştır.`;
      qText = `${sName1}'in çözüm adımlarını ${outcomeCode} doğrultusunda analiz ediniz. İlk hata hangi adımda yapılmıştır? Doğru adımı yazınız.`;
      ans = `Hata tespiti ve kavramsal gerekçelendirme adım basamaklarıyla sunulmuştur.`;
    } else {
      stim = `Bir araştırma ve uygulama ortamında ${dynSubjectName} kapsamında iki farklı yöntem (Yöntem 1 ve Yöntem 2) karşılaştırılmaktadır.`;
      qText = `Yöntem 1 ve Yöntem 2'yi ${resolvedTitle} bakımından karşılaştırınız. Hangi yöntemin daha verimli olduğunu gerekçelendiriniz.`;
      ans = `Seçilen yöntemin gerekçesi ve diğer yöntemin sınırları bilimsel kanıtlarla açıklanmıştır.`;
    }

    return {
      number: idx + 1,
      outcome: outcomeCode,
      outcomeTitle: resolvedTitle,
      difficulty: 'Orta',
      level: d.cognitiveLevel,
      templateType: arch,
      points: pointAllocations[idx] || 15,
      stimulus: stim,
      question: qText,
      answer: ans,
      rubric: [
        { item: 'Kavramsal teşhis ve doğru tespit', pts: Math.round((pointAllocations[idx] || 15) * 0.5) },
        { item: 'Bilimsel/mantıksal gerekçelendirme basamağı', pts: Math.round((pointAllocations[idx] || 15) * 0.5) }
      ]
    };
  });

  const finalDynamicQuestions = normalizeAndCalibrateQuestions(dynamicQuestions);

  const elapsedFormatted = Math.max(0.6, (Date.now() - startTime) / 1000).toFixed(1) + ' saniye';

  return {
    title: `${grade}. Sınıf ${scenario.name} (Özgün Sınav Seti - ${finalDynamicQuestions.length} Soru)`,
    variationNumber: variationIndex + 1,
    generationTime: elapsedFormatted,
    model: 'MEBİ Kural Tabanlı Standart Motor',
    isFallback: true,
    fallbackReason: fallbackReason || 'Canlı yapay zekâ servisi şu anda meşgul veya çevrimdışı olduğundan sorular yerel MEBİ kural motoruyla hazırlandı.',
    questionsCount: finalDynamicQuestions.length,
    generatedQuestions: finalDynamicQuestions,
    sourceValidationSummary: {
      isFullyValid: !finalDynamicQuestions.some(q => q.hasMissingSourceError),
      missingSourceCount: finalDynamicQuestions.filter(q => q.hasMissingSourceError).length,
      recoveredCount: finalDynamicQuestions.filter(q => q.commonStimulus || q.sharedSourceId).length
    }
  };
}
