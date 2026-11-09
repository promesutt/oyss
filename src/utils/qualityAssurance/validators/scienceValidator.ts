import { QualityFinding, QuestionValidationContext } from '../types';
import { isTargetedIntentionalError } from '../commonValidators';

/**
 * Bağlam içerisindeki bir ifadenin olumsuzluk (negation) eki, kelimesi
 * veya hata düzeltme/atfetme bağlamı (ölçülmez, değildir, yanlıştır, söylenemez,
 * inmez, içermez, salgılamaz, üretmez, iddiasıdır, yanılgıdır vb.) taşıyıp taşımadığını denetler.
 */
function isStatementNegated(fullText: string, matchIndex: number, matchLength: number): boolean {
  // Cümle sınırlarını belirle: önceki cümlenin sonunu (. ! ? \n) ve sonraki cümlenin sonunu bul.
  // Bir önceki veya sonraki cümleden olumsuzluk miras alınması (yanlış negatif) engellenir.
  const textBefore = fullText.slice(0, matchIndex);
  const lastBoundary = Math.max(
    textBefore.lastIndexOf('.'),
    textBefore.lastIndexOf('!'),
    textBefore.lastIndexOf('?'),
    textBefore.lastIndexOf('\n')
  );
  const sentenceStart = lastBoundary !== -1 ? lastBoundary + 1 : 0;

  const textAfter = fullText.slice(matchIndex + matchLength);
  const nextBoundaryMatch = /[.!?\n]/.exec(textAfter);
  const sentenceEnd = nextBoundaryMatch ? (matchIndex + matchLength + nextBoundaryMatch.index) : fullText.length;

  const preStart = Math.max(sentenceStart, matchIndex - 60);
  const postEnd = Math.min(sentenceEnd, matchIndex + matchLength + 65);

  const windowSnippet = fullText.slice(preStart, postEnd).toLowerCase();

  const negationWords = [
    'değildir', 'değil', 'ölçülmez', 'yanlıştır', 'yanlış', 'söylenemez', 'inmez', 'oluşmaz',
    'bulunmaz', 'sağlamaz', 'taşımaz', 'olamaz', 'içermez', 'hariç', 'dışında', 'farklıdır',
    'salgılamaz', 'salgılanmaz', 'üretmez', 'üretilmez', 'yapmaz', 'etmez', 'hatadır', 'hatalıdır', 'yanılgıdır',
    'yanılgı', 'iddiası', 'iddiasıdır', 'sanması', 'zannetmesi', 'yerine', 'aksine', 'doğru değildir',
    'üretmediği', 'üretmediğini', 'üretmemesi', 'üretmediğinden', 'salgılamadığı', 'salgılamadığını', 'salgılamaması',
    'salgılanmadığı', 'salgılanmadığını', 'üretilmediği', 'üretilmediğini'
  ];

  return negationWords.some(neg => windowSnippet.includes(neg));
}

/**
 * Fen Bilimleri Dersi Uzman Kalite Kontrolü
 */
export function validateScienceQuestion(
  q: any,
  _context: QuestionValidationContext
): QualityFinding[] {
  const findings: QualityFinding[] = [];
  const stem = (q.questionText || q.question || '').trim();
  const stimulus = (q.stimulus || q.contextText || '').trim();
  const answer = (q.modelAnswer || q.answer || '').trim();
  const solution = (q.solutionExplanation || q.solution || '').trim();
  const rubric = Array.isArray(q.rubric) ? q.rubric : [];
  const altAnswers = Array.isArray(q.alternativeAnswers) ? q.alternativeAnswers : [];

  const rubricText = rubric.map((r: any) => `${r.criterion || ''} ${r.item || ''} ${r.description || ''}`).join(' ');
  const altText = altAnswers.join(' ');

  // Kapsam ayrımı (TASK198 & TASK205):
  // Model cevap, çözüm, kabul edilebilir alternatifler ve puanlama rubriği bilimsel açıdan KUSURSUZ olmalıdır.
  // Alanlar arasına noktalı satır sonu eklenerek cümle sınırları korunur.
  const answerOnlyText = `${answer}.\n${solution}.\n${rubricText}.\n${altText}`.toLowerCase();
  const stimulusOnlyText = stimulus.toLowerCase();
  const stemOnlyText = stem.toLowerCase();
  const allText = `${stem}.\n${stimulus}.\n${answer}.\n${solution}.\n${rubricText}.\n${altText}`.toLowerCase();

  /**
   * Bilimsel kural denetimi uygulayıcı (Kural Düzeyinde Hedefli Muafiyet - TASK205)
   * - answerOnlyText kontrolü: Asla taviz verilmez; model cevap veya rubrik bilimsel yanlışı doğru kabul edemez.
   * - stimulusOnlyText kontrolü: Yalnızca ve yalnızca bu kuralın konusu soruda hedeflenen
   *                              kasıtlı yanlış bilgi ise tolere edilir. Bağımsız ikinci hatalar
   *                              kesinlikle engellenir.
   */
  const checkRule = (
    ruleRegex: RegExp,
    ruleInfo: {
      category: 'scientific_correctness';
      severity: 'critical' | 'warning';
      message: string;
      suggestedFix: string;
      validationMethod: string;
      topicKeywords: string[];
    },
    matcherFilter?: (match: RegExpExecArray, fullText: string) => boolean
  ) => {
    const toGlobal = (re: RegExp) => new RegExp(re.source, re.flags.includes('g') ? re.flags : re.flags + 'g');

    // 1. MODEL CEVAP, ÇÖZÜM VE RUBRİK KONTROLÜ (TAVİZSİZ)
    const ansRe = toGlobal(ruleRegex);
    let match: RegExpExecArray | null;
    while ((match = ansRe.exec(answerOnlyText)) !== null) {
      if (matcherFilter && !matcherFilter(match, answerOnlyText)) {
        continue;
      }
      if (!isStatementNegated(answerOnlyText, match.index, match[0].length)) {
        findings.push({
          category: ruleInfo.category,
          severity: ruleInfo.severity,
          field: 'answer',
          message: ruleInfo.message,
          suggestedFix: ruleInfo.suggestedFix,
          validationMethod: ruleInfo.validationMethod
        });
        break;
      }
    }

    // 2. SENARYO (STIMULUS) KONTROLÜ (KURAL DÜZEYİNDE HEDEFLİ MUAFİYET - TASK205)
    const stimRe = toGlobal(ruleRegex);
    while ((match = stimRe.exec(stimulusOnlyText)) !== null) {
      if (matcherFilter && !matcherFilter(match, stimulusOnlyText)) {
        continue;
      }
      if (!isStatementNegated(stimulusOnlyText, match.index, match[0].length)) {
        const isTargeted = isTargetedIntentionalError(q, ruleInfo.topicKeywords);
        if (!isTargeted) {
          findings.push({
            category: ruleInfo.category,
            severity: ruleInfo.severity,
            field: 'stimulus',
            message: `Senaryoda bilimsel hata/kavram yanılgısı tespit edildi: ${ruleInfo.message}`,
            suggestedFix: `Senaryo metnindeki bilimsel hatayı düzeltiniz: ${ruleInfo.suggestedFix}`,
            validationMethod: ruleInfo.validationMethod
          });
          break;
        }
      }
    }

    // 3. SORU KÖKÜ (STEM) KONTROLÜ
    const stemRe = toGlobal(ruleRegex);
    while ((match = stemRe.exec(stemOnlyText)) !== null) {
      if (matcherFilter && !matcherFilter(match, stemOnlyText)) {
        continue;
      }
      if (!isStatementNegated(stemOnlyText, match.index, match[0].length)) {
        const isTargeted = isTargetedIntentionalError(q, ruleInfo.topicKeywords);
        if (!isTargeted) {
          findings.push({
            category: ruleInfo.category,
            severity: ruleInfo.severity,
            field: 'stem',
            message: `Soru kökünde bilimsel hata tespit edildi: ${ruleInfo.message}`,
            suggestedFix: ruleInfo.suggestedFix,
            validationMethod: ruleInfo.validationMethod
          });
          break;
        }
      }
    }
  };

  // 1. Kütle ve Ağırlık Bilimsel Ayrımı (MEB Temel Fen Kavram Yanılgısı)
  // Hata 1: "Kütle dinamometre ile ölçülür" veya "Kütle yerçekimine göre değişir / Ayda azalır"
  checkRule(/(?:kütle(?:si|nin)?[^.!?;\n]*?(?:dinamometre\s+ile\s+ölçülür|yer\s*çekimine\s+göre\s+değişir|farklı\s+gezegenlerde\s+değişir|ay(?:'da|da|\s+yüzeyinde)?\s+(?:azalır|değişir)))/i, {
    category: 'scientific_correctness',
    severity: 'critical',
    message: 'Bilimsel kavram yanılgısı: Kütle madde miktarıdır; yerçekimine göre değişmez ve eşit kollu terazi ile ölçülür. Dinamometre ile ölçülen ve değişen büyüklük ağırlıktır.',
    suggestedFix: 'Model cevaptaki kavramı "ağırlık" olarak düzeltiniz veya kütlenin değişmediğini belirtiniz.',
    validationMethod: 'science_mass_weight_distinction',
    topicKeywords: ['kütle', 'ağırlık', 'dinamometre']
  });

  // Hata 2: "Ağırlık eşit kollu terazi ile ölçülür"
  checkRule(/(?:ağırlık(?:ı|ın)?[^.!?;\n]*?eşit\s+kollu\s+terazi\s+ile\s+ölçülür)/i, {
    category: 'scientific_correctness',
    severity: 'critical',
    message: 'Bilimsel kavram yanılgısı: Ağırlık bir kuvvettir ve dinamometre ile ölçülür.',
    suggestedFix: 'Model cevaptaki ölçme aletini dinamometre olarak düzeltiniz.',
    validationMethod: 'science_mass_weight_distinction',
    topicKeywords: ['ağırlık', 'kütle', 'terazi']
  });

  // 2. Hücre Bölünmesi: Mitoz ve Mayoz Ayrımı
  if (/mitoz/i.test(allText)) {
    checkRule(/(?:mitoz[^.!?;\n]*?(?:(?:4|dört)\s*(?:yeni\s*)?hücre|kromozom\s+sayısı\s+yarıya\s+iner))/i, {
      category: 'scientific_correctness',
      severity: 'critical',
      message: 'Bilimsel hata: Mitoz bölünme sonucunda 2 yavru hücre oluşur ve kromozom sayısı değişmez (sabit kalır).',
      suggestedFix: 'Model cevabı "2 hücre oluşur, kromozom sayısı değişmez" şeklinde düzeltiniz.',
      validationMethod: 'science_mitosis_meiosis_facts',
      topicKeywords: ['mitoz', 'mayoz']
    });
  }

  if (/mayoz/i.test(allText)) {
    checkRule(/(?:mayoz\s+sonucunda\s+(?:2|iki)\s+hücre|mayozda\s+kromozom\s+sayısı\s+değişmez|mayozda\s+kromozom\s+sayısı\s+sabit\s+kalır)/i, {
      category: 'scientific_correctness',
      severity: 'critical',
      message: 'Bilimsel hata: Mayoz bölünme sonucunda 4 hücre oluşur ve kromozom sayısı yarıya iner (2n -> n).',
      suggestedFix: 'Model cevabı "4 hücre oluşur ve kromozom sayısı yarıya iner" şeklinde düzeltiniz.',
      validationMethod: 'science_mitosis_meiosis_facts',
      topicKeywords: ['mayoz', 'mitoz']
    });
  }

  // 3. Bitki ve Hayvan Hücresi Organel Uyumu
  if (/bitki\s+hücresi/i.test(allText)) {
    checkRule(/(?:sentrozom\s+bulunur|sentriyo.*bulunur)/i, {
      category: 'scientific_correctness',
      severity: 'warning',
      message: 'Bilimsel çelişki: Gelişmiş bitki hücrelerinde sentrozom bulunmaz; sentrozom hayvan hücrelerine özgüdür.',
      suggestedFix: 'Bitki hücresi organel listesinden sentrozomu çıkarınız.',
      validationMethod: 'science_cell_organelle_check',
      topicKeywords: ['sentrozom', 'sentriyol', 'bitki hücresi']
    });
  }
  if (/hayvan\s+hücresi/i.test(allText)) {
    checkRule(/(?:kloroplast\s+bulunur|hücre\s+(?:duvarı|çeperi)\s+bulunur)/i, {
      category: 'scientific_correctness',
      severity: 'critical',
      message: 'Bilimsel hata: Hayvan hücrelerinde kloroplast ve hücre duvarı/çeperi bulunmaz.',
      suggestedFix: 'Kloroplast ve hücre duvarını yalnızca bitki hücresiyle ilişkilendiriniz.',
      validationMethod: 'science_cell_organelle_check',
      topicKeywords: ['kloroplast', 'hücre duvarı', 'hücre çeperi', 'hayvan hücresi']
    });
  }

  // 4. Sindirim Sistemi: Safra Sıvısı ve Pankreas Enzimleri Ayrımı
  // Safra enzim değildir; karaciğer tarafından üretilir, safra kesesinde depolanır.
  // Yağların fiziksel (mekanik) sindirimini (emülsifikasyon) sağlar.
  // Yağların kimyasal sindirimini pankreastan salgılanan lipaz gerçekleştirir.
  // Yemek borusu veya yutakta safra salgılanmaz/üretilmez.
  if (/safra/i.test(allText)) {
    // Hata 1: "Safra yağların kimyasal sindirimini sağlar"
    // Eşleşme safraya doğrudan kimyasal sindirim atfedildiğinde tetiklenmeli;
    // Safranın mekanik, pankreasın ise kimyasal sindirim yaptığını açıklayan doğru bilimsel metinler yanlış pozitif olmamalıdır.
    checkRule(
      /(?:safra[^.!?;\n]*?kimyasal\s+(?:olarak\s+)?sindir|safranın\s+kimyasal\s+sindirim)/i,
      {
        category: 'scientific_correctness',
        severity: 'critical',
        message: 'Bilimsel kavram yanılgısı: Safra bir enzim değildir; yağların fiziksel (mekanik) sindirimini sağlar. Yağların kimyasal sindirimini pankreas özsuyundaki lipaz enzimi gerçekleştirir.',
        suggestedFix: 'Safranın görevini "fiziksel (mekanik) sindirim / emülsiyon" olarak düzeltiniz.',
        validationMethod: 'science_bile_digestive_role',
        topicKeywords: ['safra']
      },
      (match) => {
        // Eğer 'safra' ile 'kimyasal sindirim' arasında 'pankreas' veya 'lipaz' geçiyorsa;
        // kimyasal sindirim safraya değil pankreasa/enzime aittir (yanlış pozitif engelleme).
        const matchedSnippet = match[0].toLowerCase();
        const bileIdx = matchedSnippet.indexOf('safra');
        if (bileIdx !== -1) {
          const afterBile = matchedSnippet.slice(bileIdx);
          if (afterBile.includes('pankreas') || afterBile.includes('lipaz')) {
            return false;
          }
        }
        return true;
      }
    );

    // Hata 2: "Safra bir enzimdir"
    checkRule(/(?:safra\s+(?:bir\s+)?enzimdir|safra\s+enzimi)/i, {
      category: 'scientific_correctness',
      severity: 'critical',
      message: 'Bilimsel hata: Safra karaciğer tarafından üretilen bir salgıdır; enzim içermez.',
      suggestedFix: 'Safra için "enzim" nitelemesini kaldırınız.',
      validationMethod: 'science_bile_digestive_role',
      topicKeywords: ['safra']
    });

    // Hata 3: "Safra pankreastan / yemek borusundan / yutaktan / mideden salgılanır/üretilir"
    // Safranın karaciğerde üretildiği ve pankreasın kendi öz suyunu salgıladığı doğru ifadeler korunur.
    checkRule(
      /(?:(?:pankreas|mide|yutak|yemek\s+borusu)(?:'?[a-zçğıöşü]+)?(?:\s+(?:ve|ile)\s+(?:pankreas|mide|yutak|yemek\s+borusu)(?:'?[a-zçğıöşü]+)?)?\s+(?:tarafından\s+)?safra(?:\s+(?:sıvısı|salgısı))?(?:'?[a-zçğıöşü]+)?\s*(?:salgıla|üret)|(?:pankreas(?:tan)?|mide(?:den)?|yutak(?:tan)?|yemek\s+borusu(?:ndan)?)\s*(?:tarafından\s+)?(?:salgılanan|üretilen)\s+safra|safra(?:\s+(?:sıvısı|salgısı))?(?:'?[a-zçğıöşü]+)?(?:\s+(?:ise|da))?\s*(?:tarafından\s+)?(?:pankreas(?:tan|ta)|mide(?:den|de)|yutak(?:tan|ta)|yemek\s+borusu(?:ndan|nda))\s*(?:tarafından\s+)?(?:salgılan|üretil))/i,
      {
        category: 'scientific_correctness',
        severity: 'critical',
        message: 'Biyolojik organ hatası: Safra karaciğer tarafından üretilir ve safra kesesinde depolanır; yemek borusu, yutak, mide veya pankreas tarafından üretilmez/salgılanmaz.',
        suggestedFix: 'Safrayı karaciğer ile ilişkilendiriniz.',
        validationMethod: 'science_bile_digestive_role',
        topicKeywords: ['safra']
      },
      (match) => {
        // Eğer metinde safra açıkça karaciğerle ilişkilendirilmiş ve pankreas kendi öz suyuyla anılmışsa;
        // örneğin "safra sıvısı karaciğerde, pankreas öz suyu ise pankreasta üretilir" gibi
        // ayrıştırılmış doğru cümleler kesinlikle yanlış pozitif olmamalıdır.
        const snippet = match[0].toLowerCase();
        if (snippet.includes('karaciğer') || snippet.includes('öz suyu') || snippet.includes('özsuyu')) {
          return false;
        }
        return true;
      }
    );
  }

  // 5. Dolaşım Sistemi: Atardamar ve Toplardamar Tanımları
  if (/atardamar/i.test(allText)) {
    checkRule(/(?:(?:bütün|tüm|her|daima)\s+atardamarlar?\s+temiz\s+kan\s+taşır|atardamarlar?\s+daima\s+temiz\s+kan)/i, {
      category: 'scientific_correctness',
      severity: 'critical',
      message: 'Kavram yanılgısı: Atardamarlar kanı kalpten organlara götüren damarlardır. Akciğer atardamarı kirli kan taşır; dolayısıyla bütün atardamarlar temiz kan taşımaz.',
      suggestedFix: 'Atardamarların kalbe göre akış yönünü vurgulayınız ve akciğer atardamarı istisnasını gözetiniz.',
      validationMethod: 'science_blood_vessels_definition',
      topicKeywords: ['atardamar', 'toplardamar']
    });
  }
  if (/toplardamar/i.test(allText)) {
    checkRule(/(?:(?:bütün|tüm|her|daima)\s+toplardamarlar?\s+kirli\s+kan\s+taşır|toplardamarlar?\s+daima\s+kirli\s+kan)/i, {
      category: 'scientific_correctness',
      severity: 'critical',
      message: 'Kavram yanılgısı: Toplardamarlar kanı vücuttan kalbe getiren damarlardır. Akciğer toplardamarı temiz kan taşır; dolayısıyla bütün toplardamarlar kirli kan taşımaz.',
      suggestedFix: 'Toplardamarların kalbe göre akış yönünü vurgulayınız ve akciğer toplardamarı istisnasını gözetiniz.',
      validationMethod: 'science_blood_vessels_definition',
      topicKeywords: ['toplardamar', 'atardamar']
    });
  }

  // 6. Deney Değişkenleri: Bağımsız ve Bağımlı Değişken Tanımı
  const asksVariables = /(?:bağımsız\s+değişken|bağımlı\s+değişken|kontrol\s+edilen\s+değişken)/i.test(stem);
  if (asksVariables) {
    if (!stimulus || stimulus.length < 50) {
      if (!q.visual) {
        findings.push({
          category: 'answerability',
          severity: 'critical',
          field: 'stimulus',
          message: 'Deney değişkenlerini belirleme sorusunda deney düzeneğini veya karşılaştırma vaka metnini içeren stimulus bulunmuyor.',
          suggestedFix: 'Deneyin aşamalarını ve değiştirilen faktörü içeren düzenek metnini stimulus alanına ekleyiniz.',
          validationMethod: 'science_experiment_stimulus_check'
        });
      }
    }
  }

  // 7. Enerji Dönüşümü: Kinetik ve Potansiyel Enerji
  if (/sürtünmesiz\s+ortam/i.test(allText)) {
    checkRule(/(?:mekanik\s+enerji\s+azalır|mekanik\s+enerji\s+artar)/i, {
      category: 'scientific_correctness',
      severity: 'critical',
      message: 'Fiziksel yasa ihlali: Sürtünmesiz ortamda mekanik enerji (kinetik + potansiyel) korunur; artmaz veya azalmaz.',
      suggestedFix: 'Mekanik enerjinin korunduğunu, sadece potansiyel ve kinetik enerjinin birbirine dönüştüğünü belirtiniz.',
      validationMethod: 'science_energy_conservation_law',
      topicKeywords: ['mekanik enerji', 'potansiyel enerji', 'kinetik enerji']
    });
  }

  return findings;
}
