import { QualityFinding, QuestionValidationContext } from '../types';

/**
 * Bağlam içerisindeki bir ifadenin olumsuzluk / yasaklama / imkânsızlık
 * (verilmez, verilemez, alamaz, caiz değildir, düşmez vb.) taşıyıp taşımadığını denetler.
 */
function isStatementNegated(fullText: string, matchIndex: number, matchLength: number): boolean {
  const postSnippet = fullText.slice(matchIndex + matchLength, matchIndex + matchLength + 50).toLowerCase();
  const preSnippet = fullText.slice(Math.max(0, matchIndex - 35), matchIndex).toLowerCase();

  const negationWords = [
    'verilmez', 'verilemez', 'alamaz', 'alamazlar', 'caiz değildir', 'düşmez',
    'değildir', 'olmaz', 'haramdır', 'geçersizdir', 'yanlıştır', 'yasaktır'
  ];

  return negationWords.some(neg => postSnippet.includes(neg) || preSnippet.includes(neg));
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
  const allText = `${stem} ${stimulus} ${answer}`.toLowerCase();

  // 1. Zekât Verilecek ve Verilmeyecek Kişiler Hüküm Doğruluğu
  // MEB 8. Sınıf Müfredatı ve Fıkhi Esaslar:
  // - Usûl (Üst Soy): Anne, baba, dede, nine -> Zekât verilemez.
  // - Fürû (Alt Soy): Çocuk, torun -> Zekât verilemez.
  // - Eş: Nafaka yükümlülüğü nedeniyle koca eşine zekât veremez (Eş usûl veya fürû değildir; nikâh bağıdır).
  // - Yan Soy (Kardeş, amca, dayı, teyze, hala): Usûl veya fürû değildir; yoksul iseler zekât verilebilir.
  if (/zekât/i.test(allText)) {
    // 1A. Usûl veya Fürûa zekât verilebileceği yönündeki hatalı iddialar
    const usulMatch = allText.match(/\b(anne|baba|dede|nine|çocuk|torun)[^\.\?!;]*?\b(veril(?:ir|ebilir|melidir)|verir|vermelidir|alabilir)\b/i);
    if (usulMatch && !/(?:verilmez|verilemez|veremez|alamaz|caiz\s+değil|düşmez|haram)/i.test(usulMatch[0])) {
      findings.push({
        category: 'scientific_correctness',
        severity: 'critical',
        field: 'answer',
        message: 'Fıkhi / öğretim programı bilgi hatası: Kişi bakmakla yükümlü olduğu usûlüne (anne, baba, dede, nine) ve fürûuna (çocuk, torun) zekât veremez.',
        suggestedFix: 'Zekâtın yoksul akrabalara (kardeş, amca, dayı, teyze, hala) veya ihtiyaç sahiplerine verilebileceğini belirtiniz.',
        validationMethod: 'din_zakat_recipients_rules'
      });
    }

    // 1B. Eşe zekât verilmesi (Eş usûl veya fürû değildir; nafaka bağıdır)
    const esMatch = allText.match(/\b(eş|karısı|kocası)[^\.\?!;]*?\b(veril(?:ir|ebilir|melidir)|verir|vermelidir|alabilir)\b/i);
    if (esMatch && !/(?:verilmez|verilemez|veremez|alamaz|caiz\s+değil|düşmez|haram)/i.test(esMatch[0])) {
      findings.push({
        category: 'scientific_correctness',
        severity: 'critical',
        field: 'answer',
        message: 'Fıkhi bilgi hatası: Eş usûl veya fürû olmamakla birlikte, evlilik bağı ve nafaka sorumluluğu nedeniyle zekât verilemez.',
        suggestedFix: 'Eşin usûl-fürû grubunda olmadığını, nafaka yükümlülüğü nedeniyle zekât alamayacağını belirtiniz.',
        validationMethod: 'din_zakat_recipients_rules'
      });
    }

    // 1C. Zekât oranları kontrolü (Altın ve nakitte 1/40 veya %2.5)
    if (/(?:altın|nakit|para|ticaret)/i.test(allText)) {
      const wrongRatioMatch = allText.match(/(?:1\/10|1\/5|%10|%20)\b/i);
      if (wrongRatioMatch && wrongRatioMatch.index !== undefined && !/(?:toprak\s+ürünleri|öşür|maden)/i.test(allText)) {
        if (!isStatementNegated(allText, wrongRatioMatch.index, wrongRatioMatch[0].length)) {
          findings.push({
            category: 'scientific_correctness',
            severity: 'critical',
            field: 'answer',
            message: 'Bilgi hatası: Altın, gümüş, para ve ticaret mallarında zekât nisap oranı 1/40 (%2,5)\'tir (1/10 oranı masrafsız toprak ürünleri içindir).',
            suggestedFix: 'Zekât oranını 1/40 (%2,5) olarak düzeltiniz.',
            validationMethod: 'din_zakat_ratio_rules'
          });
        }
      }
    }
  }

  // 2. Kaza, Kader ve Tevekkül Kavramı Doğruluğu
  // Yanlış tevekkül anlayışı tespiti (Tedbirsizliği kader sanma)
  if (/tevekkül/i.test(allText)) {
    const wrongTawakkulMatch = answer.match(/(?:tedbir\s+almadan\s+beklemek\s+tevekküldür|çalışmadan\s+dua\s+etmek\s+tevekküldür)/i);
    if (wrongTawakkulMatch && wrongTawakkulMatch.index !== undefined) {
      if (!isStatementNegated(answer, wrongTawakkulMatch.index, wrongTawakkulMatch[0].length)) {
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
    const wrongIradeMatch = answer.match(/(?:külli\s+irade\s+insanın\s+seçimleri|cüzi\s+irade\s+allah'ın\s+sınırsız)/i);
    if (wrongIradeMatch && wrongIradeMatch.index !== undefined) {
      if (!isStatementNegated(answer, wrongIradeMatch.index, wrongIradeMatch[0].length)) {
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

  return findings;
}
