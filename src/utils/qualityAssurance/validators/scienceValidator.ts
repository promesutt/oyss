import { QualityFinding, QuestionValidationContext } from '../types';

/**
 * Bağlam içerisindeki bir ifadenin olumsuzluk (negation) eki veya kelimesi
 * (ölçülmez, değildir, yanlıştır, söylenemez, inmez, içermez vb.) taşıyıp taşımadığını denetler.
 */
function isStatementNegated(fullText: string, matchIndex: number, matchLength: number): boolean {
  // Eşleşmenin sonrasındaki 40 karakteri ve öncesindeki 20 karakteri incele
  const postSnippet = fullText.slice(matchIndex + matchLength, matchIndex + matchLength + 45).toLowerCase();
  const preSnippet = fullText.slice(Math.max(0, matchIndex - 30), matchIndex).toLowerCase();

  const negationWords = [
    'değildir', 'değil', 'ölçülmez', 'yanlıştır', 'söylenemez', 'inmez', 'oluşmaz',
    'bulunmaz', 'sağlamaz', 'taşımaz', 'olamaz', 'içermez', 'hariç', 'dışında', 'farklıdır'
  ];

  return negationWords.some(neg => postSnippet.includes(neg) || preSnippet.includes(neg));
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
  const allText = `${stem} ${stimulus} ${answer}`.toLowerCase();

  // 1. Kütle ve Ağırlık Bilimsel Ayrımı (MEB Temel Fen Kavram Yanılgısı)
  // Hata 1: "Kütle dinamometre ile ölçülür" veya "Kütle yerçekimine göre değişir / Ayda azalır"
  const massMatch = allText.match(/(?:kütle(?:si|nin)?\s+.*(?:dinamometre\s+ile\s+ölçülür|yer\s*çekimine\s+göre\s+değişir|farklı\s+gezegenlerde\s+değişir|ay(?:'da|da|\s+yüzeyinde)?\s+(?:azalır|değişir)))/i);
  if (massMatch && massMatch.index !== undefined) {
    if (!isStatementNegated(allText, massMatch.index, massMatch[0].length)) {
      findings.push({
        category: 'scientific_correctness',
        severity: 'critical',
        field: 'answer',
        message: 'Bilimsel kavram yanılgısı: Kütle madde miktarıdır; yerçekimine göre değişmez ve eşit kollu terazi ile ölçülür. Dinamometre ile ölçülen ve değişen büyüklük ağırlıktır.',
        suggestedFix: 'Model cevaptaki kavramı "ağırlık" olarak düzeltiniz veya kütlenin değişmediğini belirtiniz.',
        validationMethod: 'science_mass_weight_distinction'
      });
    }
  }

  // Hata 2: "Ağırlık eşit kollu terazi ile ölçülür"
  const weightMatch = allText.match(/(?:ağırlık(?:ı|ın)?\s+.*eşit\s+kollu\s+terazi\s+ile\s+ölçülür)/i);
  if (weightMatch && weightMatch.index !== undefined) {
    if (!isStatementNegated(allText, weightMatch.index, weightMatch[0].length)) {
      findings.push({
        category: 'scientific_correctness',
        severity: 'critical',
        field: 'answer',
        message: 'Bilimsel kavram yanılgısı: Ağırlık bir kuvvettir ve dinamometre ile ölçülür.',
        suggestedFix: 'Model cevaptaki ölçme aletini dinamometre olarak düzeltiniz.',
        validationMethod: 'science_mass_weight_distinction'
      });
    }
  }

  // 2. Hücre Bölünmesi: Mitoz ve Mayoz Ayrımı
  // Mitozda 4 hücre oluştuğu iddiası veya kromozom sayısının yarıya indiği iddiası
  if (/mitoz/i.test(allText)) {
    const mitozMatch = allText.match(/(?:mitoz.*(?:4\s*(?:yeni\s*)?hücre|kromozom\s+sayısı\s+yarıya\s+iner))/i);
    if (mitozMatch && mitozMatch.index !== undefined) {
      if (!isStatementNegated(allText, mitozMatch.index, mitozMatch[0].length)) {
        findings.push({
          category: 'scientific_correctness',
          severity: 'critical',
          field: 'answer',
          message: 'Bilimsel hata: Mitoz bölünme sonucunda 2 yavru hücre oluşur ve kromozom sayısı değişmez (sabit kalır).',
          suggestedFix: 'Model cevabı "2 hücre oluşur, kromozom sayısı değişmez" şeklinde düzeltiniz.',
          validationMethod: 'science_mitosis_meiosis_facts'
        });
      }
    }
  }

  // Mayozda kromozom sayısının değişmediği iddiası
  if (/mayoz/i.test(allText)) {
    const mayozMatch = answer.match(/(?:mayoz\s+sonucunda\s+2\s+hücre|mayozda\s+kromozom\s+sayısı\s+değişmez|mayozda\s+kromozom\s+sayısı\s+sabit\s+kalır)/i);
    if (mayozMatch && mayozMatch.index !== undefined) {
      if (!isStatementNegated(answer, mayozMatch.index, mayozMatch[0].length)) {
        findings.push({
          category: 'scientific_correctness',
          severity: 'critical',
          field: 'answer',
          message: 'Bilimsel hata: Mayoz bölünme sonucunda 4 hücre oluşur ve kromozom sayısı yarıya iner (2n -> n).',
          suggestedFix: 'Model cevabı "4 hücre oluşur ve kromozom sayısı yarıya iner" şeklinde düzeltiniz.',
          validationMethod: 'science_mitosis_meiosis_facts'
        });
      }
    }
  }

  // 3. Bitki ve Hayvan Hücresi Organel Uyumu
  if (/bitki\s+hücresi/i.test(allText)) {
    const sentrozomMatch = answer.match(/(?:sentrozom\s+bulunur|sentriyo.*bulunur)/i);
    if (sentrozomMatch && sentrozomMatch.index !== undefined) {
      if (!isStatementNegated(answer, sentrozomMatch.index, sentrozomMatch[0].length)) {
        findings.push({
          category: 'scientific_correctness',
          severity: 'warning',
          field: 'answer',
          message: 'Bilimsel çelişki: Gelişmiş bitki hücrelerinde sentrozom bulunmaz; sentrozom hayvan hücrelerine özgüdür.',
          suggestedFix: 'Bitki hücresi organel listesinden sentrozomu çıkarınız.',
          validationMethod: 'science_cell_organelle_check'
        });
      }
    }
  }
  if (/hayvan\s+hücresi/i.test(allText)) {
    const kloroMatch = answer.match(/(?:kloroplast\s+bulunur|hücre\s+(?:duvarı|çeperi)\s+bulunur)/i);
    if (kloroMatch && kloroMatch.index !== undefined) {
      if (!isStatementNegated(answer, kloroMatch.index, kloroMatch[0].length)) {
        findings.push({
          category: 'scientific_correctness',
          severity: 'critical',
          field: 'answer',
          message: 'Bilimsel hata: Hayvan hücrelerinde kloroplast ve hücre duvarı/çeperi bulunmaz.',
          suggestedFix: 'Kloroplast ve hücre duvarını yalnızca bitki hücresiyle ilişkilendiriniz.',
          validationMethod: 'science_cell_organelle_check'
        });
      }
    }
  }

  // 4. Sindirim Sistemi: Safra Sıvısı ve Pankreas Enzimleri Ayrımı
  // Safra enzim değildir; yağların fiziksel (mekanik) sindirimini (emülsifikasyon) sağlar.
  // Yağların kimyasal sindirimini pankreastan salgılanan lipaz gerçekleştirir.
  if (/safra/i.test(allText)) {
    // Hata 1: "Safra yağların kimyasal sindirimini sağlar"
    const safraKimyasal = allText.match(/(?:safra.*yağ.*kimyasal\s+sindirim|safra.*kimyasal\s+olarak\s+sindir)/i);
    if (safraKimyasal && safraKimyasal.index !== undefined) {
      if (!isStatementNegated(allText, safraKimyasal.index, safraKimyasal[0].length)) {
        findings.push({
          category: 'scientific_correctness',
          severity: 'critical',
          field: 'answer',
          message: 'Bilimsel kavram yanılgısı: Safra bir enzim değildir; yağların fiziksel (mekanik) sindirimini sağlar. Yağların kimyasal sindirimini pankreas özsuyundaki lipaz enzimi gerçekleştirir.',
          suggestedFix: 'Safranın görevini "fiziksel (mekanik) sindirim / emülsiyon" olarak düzeltiniz.',
          validationMethod: 'science_bile_digestive_role'
        });
      }
    }

    // Hata 2: "Safra bir enzimdir"
    const safraEnzim = allText.match(/(?:safra\s+(?:bir\s+)?enzimdir|safra\s+enzimi)/i);
    if (safraEnzim && safraEnzim.index !== undefined) {
      if (!isStatementNegated(allText, safraEnzim.index, safraEnzim[0].length)) {
        findings.push({
          category: 'scientific_correctness',
          severity: 'critical',
          field: 'answer',
          message: 'Bilimsel hata: Safra karaciğer tarafından üretilen bir salgıdır; enzim içermez.',
          suggestedFix: 'Safra için "enzim" nitelemesini kaldırınız.',
          validationMethod: 'science_bile_digestive_role'
        });
      }
    }

    // Hata 3: "Safra pankreastan salgılanır"
    const safraPankreas = allText.match(/(?:safra.*pankreas.*(?:salgılanır|üretilir))/i);
    if (safraPankreas && safraPankreas.index !== undefined) {
      if (!isStatementNegated(allText, safraPankreas.index, safraPankreas[0].length)) {
        findings.push({
          category: 'scientific_correctness',
          severity: 'critical',
          field: 'answer',
          message: 'Biyolojik organ hatası: Safra karaciğer tarafından üretilir ve safra kesesinde depolanır; pankreas tarafından üretilmez.',
          suggestedFix: 'Safrayı karaciğer ile ilişkilendiriniz.',
          validationMethod: 'science_bile_digestive_role'
        });
      }
    }
  }

  // 5. Dolaşım Sistemi: Atardamar ve Toplardamar Tanımları
  // Damarlar kalbe göre kanın akış yönüne göre tanımlanır:
  // Atardamar: Kanı kalpten organlara götürür.
  // Toplardamar: Kanı organlardan kalbe getirir.
  // Yanılgı: "Tüm atardamarlar temiz kan taşır" (Akciğer atardamarı kirli kan taşır!)
  if (/atardamar/i.test(allText)) {
    const atarTemiz = allText.match(/(?:(?:bütün|tüm|her|daima)\s+atardamarlar?\s+temiz\s+kan\s+taşır|atardamarlar?\s+daima\s+temiz\s+kan)/i);
    if (atarTemiz && atarTemiz.index !== undefined) {
      if (!isStatementNegated(allText, atarTemiz.index, atarTemiz[0].length)) {
        findings.push({
          category: 'scientific_correctness',
          severity: 'critical',
          field: 'answer',
          message: 'Kavram yanılgısı: Atardamarlar kanı kalpten organlara götüren damarlardır. Akciğer atardamarı kirli kan taşır; dolayısıyla bütün atardamarlar temiz kan taşımaz.',
          suggestedFix: 'Atardamarların kalbe göre akış yönünü vurgulayınız ve akciğer atardamarı istisnasını gözetiniz.',
          validationMethod: 'science_blood_vessels_definition'
        });
      }
    }
  }
  if (/toplardamar/i.test(allText)) {
    const toplarKirli = allText.match(/(?:(?:bütün|tüm|her|daima)\s+toplardamarlar?\s+kirli\s+kan\s+taşır|toplardamarlar?\s+daima\s+kirli\s+kan)/i);
    if (toplarKirli && toplarKirli.index !== undefined) {
      if (!isStatementNegated(allText, toplarKirli.index, toplarKirli[0].length)) {
        findings.push({
          category: 'scientific_correctness',
          severity: 'critical',
          field: 'answer',
          message: 'Kavram yanılgısı: Toplardamarlar kanı vücuttan kalbe getiren damarlardır. Akciğer toplardamarı temiz kan taşır; dolayısıyla bütün toplardamarlar kirli kan taşımaz.',
          suggestedFix: 'Toplardamarların kalbe göre akış yönünü vurgulayınız ve akciğer toplardamarı istisnasını gözetiniz.',
          validationMethod: 'science_blood_vessels_definition'
        });
      }
    }
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
    const enerjiMatch = answer.match(/(?:mekanik\s+enerji\s+azalır|mekanik\s+enerji\s+artar)/i);
    if (enerjiMatch && enerjiMatch.index !== undefined) {
      if (!isStatementNegated(answer, enerjiMatch.index, enerjiMatch[0].length)) {
        findings.push({
          category: 'scientific_correctness',
          severity: 'critical',
          field: 'answer',
          message: 'Fiziksel yasa ihlali: Sürtünmesiz ortamda mekanik enerji (kinetik + potansiyel) korunur; artmaz veya azalmaz.',
          suggestedFix: 'Mekanik enerjinin korunduğunu, sadece potansiyel ve kinetik enerjinin birbirine dönüştüğünü belirtiniz.',
          validationMethod: 'science_energy_conservation_law'
        });
      }
    }
  }

  return findings;
}
