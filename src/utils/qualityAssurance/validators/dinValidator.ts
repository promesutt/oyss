import { QualityFinding, QuestionValidationContext } from '../types';
import { isTargetedIntentionalError } from '../commonValidators';

/**
 * Bağlam içerisindeki bir ifadenin olumsuzluk / yasaklama / imkânsızlık
 * (verilmez, verilemez, alamaz, caiz değildir, düşmez vb.) taşıyıp taşımadığını denetler.
 */
function isStatementNegated(fullText: string, matchIndex: number, matchLength: number): boolean {
  const matchSnippet = fullText.slice(matchIndex, matchIndex + matchLength).toLowerCase();
  const postSnippet = fullText.slice(matchIndex + matchLength, matchIndex + matchLength + 50).toLowerCase();
  const preSnippet = fullText.slice(Math.max(0, matchIndex - 35), matchIndex).toLowerCase();

  const negationWords = [
    'verilmez', 'verilemez', 'alamaz', 'alamazlar', 'caiz değildir', 'düşmez',
    'değildir', 'olmaz', 'haramdır', 'geçersizdir', 'yanlıştır', 'yasaktır',
    'hata', 'hatalıdır', 'yanılgıdır', 'yanılgı', 'iddiası', 'iddiasıdır'
  ];

  return negationWords.some(neg => matchSnippet.includes(neg) || postSnippet.includes(neg) || preSnippet.includes(neg));
}

/**
 * Din Kültürü ve Ahlak Bilgisi Dersi Uzman Kalite Kontrolü
 */
export function validateDinQuestion(
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
  const answerOnlyText = `${answer} ${solution} ${rubricText} ${altText}`.toLowerCase();
  const stimulusOnlyText = stimulus.toLowerCase();
  const allText = `${stem} ${stimulus} ${answer}`.toLowerCase();

  // 1. Zekât Verilecek ve Verilmeyecek Kişiler Hüküm Doğruluğu
  // MEB 8. Sınıf Müfredatı ve Fıkhi Esaslar:
  // - Usûl (Üst Soy): Anne, baba, dede, nine -> Zekât verilemez.
  // - Fürû (Alt Soy): Çocuk, torun -> Zekât verilemez.
  // - Eş: Nafaka yükümlülüğü nedeniyle koca eşine zekât veremez (Eş usûl veya fürû değildir; nikâh bağıdır).
  // - Yan Soy (Kardeş, amca, dayı, teyze, hala): Usûl veya fürû değildir; yoksul iseler zekât verilebilir.
  if (/(?:zekât|zekat)/i.test(allText)) {
    // 1A. Usûl veya Fürûa zekât verilebileceği yönündeki hatalı iddialar
    const usulRegex = /\b(anne|baba|dede|nine|çocuk|torun)[^\.\?!;]*?\b(veril(?:ir|ebilir|melidir)|verir|vermelidir|alabilir)\b/i;
    const usulAnsMatch = answerOnlyText.match(usulRegex);
    if (usulAnsMatch && !/(?:verilmez|verilemez|veremez|alamaz|caiz\s+değil|düşmez|haram)/i.test(usulAnsMatch[0])) {
      findings.push({
        category: 'scientific_correctness',
        severity: 'critical',
        field: 'answer',
        message: 'Fıkhi / öğretim programı bilgi hatası: Kişi bakmakla yükümlü olduğu usûlüne (anne, baba, dede, nine) ve fürûuna (çocuk, torun) zekât veremez.',
        suggestedFix: 'Zekâtın yoksul akrabalara (kardeş, amca, dayı, teyze, hala) veya ihtiyaç sahiplerine verilebileceğini belirtiniz.',
        validationMethod: 'din_zakat_recipients_rules'
      });
    } else {
      const isTargetedUsul = isTargetedIntentionalError(q, ['anne', 'baba', 'dede', 'nine', 'çocuk', 'torun', 'usûl', 'usul', 'fürû', 'furu']);
      if (!isTargetedUsul) {
        const usulStimMatch = stimulusOnlyText.match(usulRegex);
        if (usulStimMatch && !/(?:verilmez|verilemez|veremez|alamaz|caiz\s+değil|düşmez|haram)/i.test(usulStimMatch[0])) {
          findings.push({
            category: 'scientific_correctness',
            severity: 'critical',
            field: 'stimulus',
            message: 'Senaryoda fıkhi bilgi hatası: Kişi usûl veya fürûuna zekât veremez.',
            suggestedFix: 'Senaryodaki zekât ilişkisini fıkhi hükümlere uygun hale getiriniz.',
            validationMethod: 'din_zakat_recipients_rules'
          });
        }
      }
    }

    // 1B. Eşe zekât verilmesi (Eş usûl veya fürû değildir; nafaka bağıdır)
    const esRegex = /\b(eş|karısı|kocası)[^\.\?!;]*?\b(veril(?:ir|ebilir|melidir)|verir|vermelidir|alabilir)\b/i;
    const esAnsMatch = answerOnlyText.match(esRegex);
    if (esAnsMatch && !/(?:verilmez|verilemez|veremez|alamaz|caiz\s+değil|düşmez|haram)/i.test(esAnsMatch[0])) {
      findings.push({
        category: 'scientific_correctness',
        severity: 'critical',
        field: 'answer',
        message: 'Fıkhi bilgi hatası: Eş usûl veya fürû olmamakla birlikte, evlilik bağı ve nafaka sorumluluğu nedeniyle zekât verilemez.',
        suggestedFix: 'Eşin usûl-fürû grubunda olmadığını, nafaka yükümlülüğü nedeniyle zekât alamayacağını belirtiniz.',
        validationMethod: 'din_zakat_recipients_rules'
      });
    } else {
      const isTargetedEs = isTargetedIntentionalError(q, ['eş', 'karısı', 'kocası', 'nafaka']);
      if (!isTargetedEs) {
        const esStimMatch = stimulusOnlyText.match(esRegex);
        if (esStimMatch && !/(?:verilmez|verilemez|veremez|alamaz|caiz\s+değil|düşmez|haram)/i.test(esStimMatch[0])) {
          findings.push({
            category: 'scientific_correctness',
            severity: 'critical',
            field: 'stimulus',
            message: 'Senaryoda fıkhi bilgi hatası: Eşe zekât verilemez.',
            suggestedFix: 'Senaryodaki zekât ilişkisini düzeltiniz.',
            validationMethod: 'din_zakat_recipients_rules'
          });
        }
      }
    }

    // 1C. Zekât oranları kontrolü (Altın ve nakitte 1/40 veya %2.5)
    if (/(?:altın|nakit|para|ticaret|mal|zekat|zekât)/i.test(allText)) {
      const wrongRatioMatch = answerOnlyText.match(/(?:1\/10|1\/5|%10|%20|yüzde\s*10|yüzde\s*20)\b/i);
      if (wrongRatioMatch && wrongRatioMatch.index !== undefined && !/(?:toprak\s+ürünleri|öşür|maden)/i.test(allText)) {
        if (!isStatementNegated(answerOnlyText, wrongRatioMatch.index, wrongRatioMatch[0].length)) {
          findings.push({
            category: 'scientific_correctness',
            severity: 'critical',
            field: 'answer',
            message: 'Bilgi hatası: Altın, gümüş, para ve ticaret mallarında zekât nisap oranı 1/40 (%2,5)\'tir (1/10 oranı masrafsız toprak ürünleri içindir).',
            suggestedFix: 'Zekât oranını 1/40 (%2,5) olarak düzeltiniz.',
            validationMethod: 'din_zakat_ratio_rules'
          });
        }
      } else {
        const isTargetedRatio = isTargetedIntentionalError(q, ['1/40', '%2,5', '%2.5', 'kırkta bir', 'nisap oranı']);
        if (!isTargetedRatio) {
          const wrongRatioStim = stimulusOnlyText.match(/(?:1\/10|1\/5|%10|%20|yüzde\s*10|yüzde\s*20)\b/i);
          if (wrongRatioStim && wrongRatioStim.index !== undefined && !/(?:toprak\s+ürünleri|öşür|maden)/i.test(allText)) {
            if (!isStatementNegated(stimulusOnlyText, wrongRatioStim.index, wrongRatioStim[0].length)) {
              findings.push({
                category: 'scientific_correctness',
                severity: 'critical',
                field: 'stimulus',
                message: 'Senaryoda hatalı zekât oranı tespit edildi.',
                suggestedFix: 'Nisap oranını 1/40 (%2,5) olarak düzeltiniz.',
                validationMethod: 'din_zakat_ratio_rules'
              });
            }
          }
        }
      }
    }
  }

  // 2. Kaza, Kader ve Tevekkül Kavramı Doğruluğu
  // Yanlış tevekkül anlayışı tespiti (Tedbirsizliği kader sanma)
  if (/tevekkül/i.test(allText)) {
    const wrongTawakkulMatch = answerOnlyText.match(/(?:tedbir\s+almadan\s+beklemek\s+tevekküldür|çalışmadan\s+dua\s+etmek\s+tevekküldür)/i);
    if (wrongTawakkulMatch && wrongTawakkulMatch.index !== undefined) {
      if (!isStatementNegated(answerOnlyText, wrongTawakkulMatch.index, wrongTawakkulMatch[0].length)) {
        findings.push({
          category: 'scientific_correctness',
          severity: 'critical',
          field: 'answer',
          message: 'Kavramsal hata: Tevekkül, hedefe ulaşmak için gerekli tüm maddi ve fiili tedbirleri aldıktan sonra Allah\'a güvenip dayanmaktır.',
          suggestedFix: 'Tevekkül tanımını "önce gerekli tüm tedbirleri almak, ardından Allah\'a güvenmek" olarak düzenleyiniz.',
          validationMethod: 'din_tawakkul_concept_check'
        });
      }
    }
  }

  // 3. İrade Kavramları: Külli İrade ve Cüzi İrade Ayrımı
  if (/külli\s+irade/i.test(allText) && /cüzi\s+irade/i.test(allText)) {
    const wrongIradeMatch = answerOnlyText.match(/(?:külli\s+irade\s+insanın\s+seçimleri|cüzi\s+irade\s+allah'ın\s+sınırsız)/i);
    if (wrongIradeMatch && wrongIradeMatch.index !== undefined) {
      if (!isStatementNegated(answerOnlyText, wrongIradeMatch.index, wrongIradeMatch[0].length)) {
        findings.push({
          category: 'scientific_correctness',
          severity: 'critical',
          field: 'answer',
          message: 'Kavram yanılgısı: Külli irade Allah\'ın sınırsız ve mutlak iradesidir; cüzi irade ise insanın sınırlı tercih ve sorumluluk alanıdır.',
          suggestedFix: 'Külli ve cüzi irade tanımlarını yerli yerine oturtunuz.',
          validationMethod: 'din_irade_concept_check'
        });
      }
    }
  }

  // 4. Ayet ve Hadis Yorumlama Sorularında Metin Dayanağı
  const isAyetHadisInterpretation = /(?:verilen\s+(?:ayette|hadiste|ayetteki|hadisteki)|bu\s+(?:ayet|hadis)\s+ile\s+anlatılmak\s+istenen)/i.test(stem);
  if (isAyetHadisInterpretation && (!stimulus || stimulus.length < 30)) {
    findings.push({
      category: 'answerability',
      severity: 'critical',
      field: 'stimulus',
      message: 'Ayet/hadis yorumlama sorusu olmasına rağmen ilgili ayet meali veya hadis metni stimulus alanında bulunmamaktadır.',
      suggestedFix: 'İncelenecek ayet mealini veya hadis metnini stimulus alanına ekleyiniz.',
      validationMethod: 'din_verse_hadith_presence_check'
    });
  }

  // 5. Senaryo ve Soru Bağıntısı (Süs Hikâye Tespiti - TASK234)
  // Eğer uzun bir kurgusal senaryo varsa (hikâye/vaka) ama soru kökü senaryodaki durum veya karaktere
  // hiç değinmeden bağımsız bir kavram ezberi soruyorsa, senaryo süs kalmıştır.
  if (stimulus.length > 80 && !/(?:meal|ayet|sure|hadis|rivayet)/i.test(stimulus)) {
    const isNarrative = /(?:bir\s+gün|bekçi|fener|çiftçi|bahçe|tohum|öğrenci|mektup|gezi|yolculuk|ziyaret)/i.test(stimulus);
    const hasContextLink = /(?:bu\s+(?:durum|metin|parça|olay|mektup|örnek|vaka|davranış|hikâye)|metne\s+göre|parçaya\s+göre|karakterin|yaşadığı)/i.test(stem);
    const isIsolatedDirectRecall = /(?:adı\s+nedir|görevli\s+melek|dört\s+büyük\s+melek|kaç\s+tür|hangi\s+melektir|hangisidir|yazınız)[.?!;:\s]*$/i.test(stem);

    if (isNarrative && !hasContextLink && isIsolatedDirectRecall) {
      findings.push({
        category: 'pedagogical_depth',
        severity: 'warning',
        field: 'stimulus',
        message: 'Senaryo (stimulus) soru köküyle organik bir bağ kurmamakta, süs metin olarak kalmaktadır. Senaryo soruyla doğrudan ilişkilendirilmeli veya soru doğrudan sorulmalıdır.',
        suggestedFix: 'Soru kökünü senaryodaki duruma atıf yapacak şekilde bağlayınız veya gereksiz süs hikâyeyi kaldırınız.',
        validationMethod: 'din_disconnected_stimulus'
      });
    }
  }

  // 6. Çoklu Kazanım ve Tema Yığılması Tespiti (Overloading - TASK234)
  // Tek soruda birbirinden bağımsız çok sayıda felsefi/etik temanın (adalet, mazlumun tesellisi, ölüm korkusu, hayata anlam katma) birleştirilmesi
  const disjointThemes = [
    /(?:adalet\s+duygusu|ilahi\s+adalet|mizan)/i,
    /(?:mazlumun\s+tesellisi|haksızlığa\s+uğrayan)/i,
    /(?:ölüm\s+korkusu|ölüm\s+kaygısı)/i,
    /(?:hayata\s+anlam\s+katma|varoluşsal\s+boşluk)/i,
    /(?:otokontrol|öz\s+denetim|kirâmen\s+kâtibîn)/i
  ];
  const matchedThemeCount = disjointThemes.filter(rx => rx.test(stem)).length;
  if (matchedThemeCount >= 3) {
    findings.push({
      category: 'outcome_alignment',
      severity: 'warning',
      field: 'stem',
      message: `Tek bir soru kökünde ${matchedThemeCount} farklı kazanım teması ('adalet duygusu', 'mazlumun tesellisi', 'ölüm korkusu', 'hayata anlam katma') birleştirilmiştir. Ölçme geçerliği için soru tek bir amaca odaklanmalıdır.`,
      suggestedFix: 'Soru kökünü kazanımın tek bir temel boyutuna odaklanacak şekilde sadeleştiriniz.',
      validationMethod: 'din_overloaded_outcome_stem'
    });
  }

  // 7. Soru Kökü ile Model Cevap ve Rubrik Uyumu (TASK234)
  if (stem.includes('adını') && stem.includes('görev')) {
    const hasNameInAnswer = /(?:cebrail|mikail|israfil|azrail|münker|nekir|kirâmen|hafaza)/i.test(answerOnlyText);
    const hasDutyInAnswer = /(?:vahiy|tabiat|rızık|kıyamet|ecel|can|koruma|yazma|sorgu)/i.test(answerOnlyText);
    if (!hasNameInAnswer || !hasDutyInAnswer) {
      findings.push({
        category: 'stem_answer_consistency',
        severity: 'critical',
        field: 'answer',
        message: 'Soru kökü hem melek adını hem görevini sormasına rağmen model cevap her iki unsuru da eksiksiz içermemektedir.',
        suggestedFix: 'Model cevaba hem ilgili meleğin adını hem de görev alanını açıkça ekleyiniz.',
        validationMethod: 'din_rubric_stem_alignment'
      });
    }
  }

  return findings;
}
