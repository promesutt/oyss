import { QualityFinding, QuestionValidationContext } from './types';
import { isSemanticallySelfContainedQuestion, detectSourceRequirement, checkStimulusQuality } from '../sourceMaterialValidator';
import { resolveOutcomeMetadata } from '../../data/curriculumData';

/**
 * Ortak Kalite Denetim Katmanı (Tüm Branşlar ve Tüm Sınıf Seviyeleri İçin)
 */
export function runCommonQualityChecks(
  q: any,
  context: QuestionValidationContext
): QualityFinding[] {
  const findings: QualityFinding[] = [];
  const stem = (q.questionText || q.question || '').trim();
  const stimulus = (q.stimulus || q.contextText || '').trim();
  const answer = (q.modelAnswer || q.answer || '').trim();
  const outcomeCode = (q.outcomeCode || q.outcome || '').trim();
  const points = q.points || context.targetPoints || 10;
  const rubric = Array.isArray(q.rubric) ? q.rubric : [];
  const altAnswers = Array.isArray(q.alternativeAnswers) ? q.alternativeAnswers : [];

  // ==========================================
  // A. KAZANIM UYUMU
  // ==========================================
  if (!outcomeCode) {
    findings.push({
      category: 'outcome_alignment',
      severity: 'critical',
      field: 'outcome',
      message: 'Soruya atanmış resmî bir kazanım kodu bulunmamaktadır.',
      suggestedFix: 'Sorunun ilgili senaryo dağılımındaki kazanım kodunu ekleyiniz.',
      validationMethod: 'outcome_code_presence'
    });
  } else {
    // 1. Resmî MEB Müfredat Doğrulaması
    const outcomeMeta = resolveOutcomeMetadata(outcomeCode);
    if (!outcomeMeta.hasOfficialTitle && !outcomeMeta.topicNote) {
      findings.push({
        category: 'outcome_alignment',
        severity: 'warning',
        field: 'outcome',
        message: `Kazanım kodu ("${outcomeCode}") MEB resmî öğretim programı veritabanında doğrulanamadı.`,
        suggestedFix: 'Kazanım kodunun resmî MEB biçiminde (örn: FB.7.3.1, MAT.6.2.2) olduğunu kontrol ediniz.',
        validationMethod: 'outcome_code_registry_check'
      });
    }

    // 2. Branş Öneki Uyumu (Dersler arası kazanım kayması tespiti)
    const normSub = (context.subjectId || context.subject || '').toLowerCase();
    const codeUpper = outcomeCode.toUpperCase();
    if (normSub.includes('mat') && (codeUpper.startsWith('FB.') || codeUpper.startsWith('T.') || codeUpper.startsWith('SB.') || codeUpper.startsWith('DK.'))) {
      findings.push({
        category: 'outcome_alignment',
        severity: 'critical',
        field: 'outcome',
        message: `Matematik sınavında başka bir derse ait (${outcomeCode}) kazanım kodu tespit edildi.`,
        suggestedFix: 'Kazanım kodunu Matematik dersi kazanımlarıyla (MAT.) güncelleyiniz.',
        validationMethod: 'outcome_subject_prefix_alignment'
      });
    } else if (normSub.includes('fen') && (codeUpper.startsWith('MAT.') || codeUpper.startsWith('T.') || codeUpper.startsWith('SB.') || codeUpper.startsWith('DK.'))) {
      findings.push({
        category: 'outcome_alignment',
        severity: 'critical',
        field: 'outcome',
        message: `Fen Bilimleri sınavında başka bir derse ait (${outcomeCode}) kazanım kodu tespit edildi.`,
        suggestedFix: 'Kazanım kodunu Fen Bilimleri dersi kazanımlarıyla (FB.) güncelleyiniz.',
        validationMethod: 'outcome_subject_prefix_alignment'
      });
    } else if (normSub.includes('turk') && (codeUpper.startsWith('MAT.') || codeUpper.startsWith('FB.') || codeUpper.startsWith('DK.'))) {
      findings.push({
        category: 'outcome_alignment',
        severity: 'critical',
        field: 'outcome',
        message: `Türkçe sınavında başka bir derse ait (${outcomeCode}) kazanım kodu tespit edildi.`,
        suggestedFix: 'Kazanım kodunu Türkçe dersi kazanımlarıyla (T.) güncelleyiniz.',
        validationMethod: 'outcome_subject_prefix_alignment'
      });
    }

    // 3. Kazanım Konu Başlığı ile Soru İçeriği Arasında Anlamsal İpuçları
    if (outcomeMeta.hasOfficialTitle || outcomeMeta.topicNote) {
      const topicText = `${outcomeMeta.officialTitle} ${outcomeMeta.topicNote}`.toLowerCase();
      // Anlamlı anahtar kelimeleri seç (5 harften uzun, genel yüklemler hariç)
      const topicKeywords = topicText
        .split(/[\s,.;:!?()-]+/)
        .filter(w => w.length >= 5 && !['açıklar', 'kullanır', 'belirler', 'ilişkilendirir', 'öğrenme', 'çıktısı', 'kapsamında', 'yapar', 'eder'].includes(w));

      if (topicKeywords.length > 0) {
        const fullContent = `${stem} ${stimulus} ${answer}`.toLowerCase();
        const hasAnyTopicKeyword = topicKeywords.some(kw => fullContent.includes(kw));
        if (!hasAnyTopicKeyword && stem.length > 30) {
          findings.push({
            category: 'outcome_alignment',
            severity: 'warning',
            field: 'outcome',
            message: `Soru içeriğinde kazanım başlığında yer alan temel konu kavramları (${topicKeywords.slice(0, 3).join(', ')}) tespit edilemedi.`,
            suggestedFix: 'Sorunun ilgili kazanımın hedeflenen kavram alanını doğrudan ölçtüğünden emin olunuz.',
            validationMethod: 'outcome_topic_semantic_relevance'
          });
        }
      }
    }

    // 4. Ham şablon metin veya kod sızıntısı denetimi
    const leaksRawCode = stem.includes(outcomeCode);
    const hasBoilerplate = /(?:öğrenme\s+çıktısı\s+kapsamında|kavramsal\s+ilkeleri\s+ve\s+neden-sonuç\s+ilişkilerini\s+gerekçelendirerek\s+açıklayınız|verilen\s+durumu\s+analitik\s+olarak\s+açıklayınız)/i.test(stem);
    if (leaksRawCode) {
      findings.push({
        category: 'outcome_alignment',
        severity: 'critical',
        field: 'stem',
        message: `Soru kökünde ham kazanım kodu (${outcomeCode}) sızıntısı tespit edildi.`,
        suggestedFix: 'Soru kökünü kazanım kodundan arındırarak öğrencinin doğrudan okuyacağı soru cümlesini yazınız.',
        validationMethod: 'raw_code_leak_check'
      });
    }
    if (hasBoilerplate) {
      findings.push({
        category: 'outcome_alignment',
        severity: 'warning',
        field: 'stem',
        message: 'Soru kökünde genel şablon/kalıp metin tespit edildi.',
        suggestedFix: 'Soruyu somut bir olay, deney veya problem bağlamına oturtunuz.',
        validationMethod: 'hollow_boilerplate_check'
      });
    }
  }

  // ==========================================
  // B. CEVAPLANABİLİRLİK VE VERİ BÜTÜNLÜĞÜ
  // ==========================================
  if (!stem || stem.length < 10) {
    findings.push({
      category: 'answerability',
      severity: 'critical',
      field: 'stem',
      message: 'Soru kökü boş veya anlaşılamayacak kadar kısa (<10 karakter).',
      suggestedFix: 'Açık uçlu soru kökünü eksiksiz yazınız.',
      validationMethod: 'stem_presence_check'
    });
  }

  // Görsele, şekle, tabloya veya şemaya açık atıf denetimi
  const referencesVisualOrTable = /(?:şekilde|şekle\s+göre|grafikte|grafiğe\s+göre|tabloda|tabloya\s+göre|görselde|görsele\s+göre|yandaki|aşağıdaki\s+şemada|düzenekte|deney\s+düzeneğinde)/i.test(stem);
  if (referencesVisualOrTable && !q.visual && (!stimulus || stimulus.length < 25)) {
    findings.push({
      category: 'answerability',
      severity: 'critical',
      field: 'visual',
      message: 'Soru kökünde şekil, grafik, tablo veya görsele atıf yapılmasına rağmen ne görsel ne de stimulus metni bulunmaktadır.',
      suggestedFix: 'Sorunun atıfta bulunduğu görseli veya veri tablosunu ekleyiniz.',
      validationMethod: 'visual_stimulus_reference_check'
    });
  }

  // Metin veya uyarıcı gereksinimi kontrolü
  const sourceReq = detectSourceRequirement(stem, q.templateType || q.archetype, undefined, stimulus);
  if (sourceReq.requiresSource) {
    if (!stimulus || stimulus.length < 30) {
      // Görsel yoksa veya görsel olmayan bir metin sorusuysa
      if (!q.visual) {
        findings.push({
          category: 'answerability',
          severity: 'critical',
          field: 'stimulus',
          message: 'Soru kökü metne/grafiğe atıf yapmasına rağmen kaynak veri veya okuma metni eksik.',
          suggestedFix: 'Sorunun ihtiyaç duyduğu okuma metnini, veri tablosunu veya grafiği ekleyiniz.',
          validationMethod: 'source_requirement_check'
        });
      }
    } else {
      const stimQual = checkStimulusQuality(stimulus, sourceReq);
      if (!stimQual.isValid) {
        findings.push({
          category: 'answerability',
          severity: 'warning',
          field: 'stimulus',
          message: 'Kaynak metin/veri kalitesi yetersiz veya çapraz soru referansı içeriyor.',
          suggestedFix: 'Kaynak metni öğrenci düzeyine uygun, zengin ve tutarlı hale getiriniz.',
          validationMethod: 'stimulus_quality_check'
        });
      }
    }
  }

  // Anlamsal olarak tek başına cevaplanabilirlik
  const isSelfContained = isSemanticallySelfContainedQuestion(stem, stimulus, outcomeCode);
  if (!isSelfContained) {
    findings.push({
      category: 'answerability',
      severity: 'critical',
      field: 'answerability' as any,
      message: 'Soru, verilen verilerle tek başına cevaplanamaz; eksik bağlam veya kayıp metin referansı var.',
      suggestedFix: 'Sorunun çözümü için gerekli tüm öncülleri ve verileri soru metnine dahil ediniz.',
      validationMethod: 'semantic_self_contained_check'
    });
  }

  // ==========================================
  // C. SORU VE MODEL CEVAP TUTARLILIĞI
  // ==========================================
  if (!answer || answer.length < 2) {
    findings.push({
      category: 'stem_answer_consistency',
      severity: 'critical',
      field: 'answer',
      message: 'Model cevap boş veya eksik.',
      suggestedFix: 'Ölçme kriterlerine uygun resmî model cevabı ekleyiniz.',
      validationMethod: 'answer_presence_check'
    });
  } else {
    // Model cevap soru kökünü papağan gibi tekrar ediyor mu?
    const cleanStem = stem.replace(/[^\p{L}\p{N}\s]/gu, '').trim().toLowerCase();
    const cleanAns = answer.replace(/[^\p{L}\p{N}\s]/gu, '').trim().toLowerCase();
    if (cleanAns.length > 20 && cleanStem.length > 20 && cleanAns === cleanStem) {
      findings.push({
        category: 'stem_answer_consistency',
        severity: 'critical',
        field: 'answer',
        message: 'Model cevap soru kökünün birebir tekrarından ibarettir; gerçek bir yanıt içermemektedir.',
        suggestedFix: 'Soru kökünü tekrarlamadan beklenen doğru çözümü ve nihai yanıtı yazınız.',
        validationMethod: 'answer_verbatim_repeat_check'
      });
    }

    // Alternatif cevapların tutarlılığı
    for (let i = 0; i < altAnswers.length; i++) {
      const alt = String(altAnswers[i]).trim();
      if (!alt) {
        findings.push({
          category: 'stem_answer_consistency',
          severity: 'info',
          field: 'alternativeAnswers',
          message: `${i + 1}. alternatif cevap boş dize içermektedir.`,
          suggestedFix: 'Boş alternatif cevap maddelerini temizleyiniz.',
          validationMethod: 'empty_alternative_answer_check'
        });
      } else if (cleanStem.length > 15 && alt.toLowerCase() === cleanStem) {
        findings.push({
          category: 'stem_answer_consistency',
          severity: 'warning',
          field: 'alternativeAnswers',
          message: `${i + 1}. alternatif cevap soru kökünün tekrarıdır.`,
          suggestedFix: 'Soru kökünü tekrar etmeyen geçerli bir alternatif yanıt giriniz.',
          validationMethod: 'alternative_answer_stem_repeat_check'
        });
      }
    }
  }

  // ==========================================
  // D. RUBRİK VE PUANLAMA KALİTESİ
  // ==========================================
  const shouldSkipRubric = context.skipRubricCheck || context.materialKind === 'study_sheet';

  if (!shouldSkipRubric) {
    if (!rubric || rubric.length === 0) {
      findings.push({
        category: 'rubric_consistency',
        severity: 'critical',
        field: 'rubric',
        message: 'Sorunun değerlendirme rubriği bulunmamaktadır.',
        suggestedFix: 'Sorunun puan dağılımını belirten analitik rubrik ölçütleri ekleyiniz.',
        validationMethod: 'rubric_presence_check'
      });
    } else {
      let rubricSum = 0;

      for (let rIdx = 0; rIdx < rubric.length; rIdx++) {
        const r = rubric[rIdx];
        const pts = Number(r.pts ?? r.points ?? 0);
        const crit = (r.item || r.criterion || '').trim();

        if (isNaN(pts) || pts <= 0) {
          findings.push({
            category: 'rubric_consistency',
            severity: 'critical',
            field: 'rubric',
            message: `Rubrik ${rIdx + 1}. ölçütünde geçersiz veya sıfır puan (${pts}) tespit edildi.`,
            suggestedFix: 'Her rubrik kriterine sıfırdan büyük tamsayı puan atayınız.',
            validationMethod: 'rubric_criterion_pts_check'
          });
        }
        if (!crit || crit.length < 3) {
          findings.push({
            category: 'rubric_consistency',
            severity: 'warning',
            field: 'rubric',
            message: `Rubrik ${rIdx + 1}. ölçüt açıklaması çok kısa veya anlamsız.`,
            suggestedFix: 'Ölçütün neyi değerlendirdiğini (kavram, işlem, gerekçe) açıkça belirtiniz.',
            validationMethod: 'rubric_criterion_text_check'
          });
        }
        rubricSum += pts;
      }

      // Puan toplamı eşleşmesi
      if (rubricSum !== points) {
        findings.push({
          category: 'rubric_consistency',
          severity: 'critical',
          field: 'rubric',
          message: `Rubrik ölçüt puanları toplamı (${rubricSum} puan), soru toplam puanı (${points} puan) ile uyuşmuyor.`,
          suggestedFix: `Rubrik puanlarını toplamı ${points} olacak şekilde dengeleyiniz.`,
          validationMethod: 'rubric_sum_verification'
        });
      }

      // Yüksek puanlı sorularda tek ölçütlü rubrik uyarısı
      if (points >= 12 && rubric.length === 1) {
        findings.push({
          category: 'rubric_consistency',
          severity: 'warning',
          field: 'rubric',
          message: `Yüksek puanlı (${points} puan) soru tek ölçüte bağlanmış; kısmi puanlama imkânı kısıtlı.`,
          suggestedFix: 'Rubriği en az 2 analitik ölçüte (kavramsal teşhis ve analitik gerekçelendirme) bölünüz.',
          validationMethod: 'rubric_granularity_check'
        });
      }
    }
  }

  // ==========================================
  // E. DİL, ANLATIM VE SEVİYE UYGUNLUĞU
  // ==========================================
  // Soru sonu noktalama kontrolü
  if (stem && !/[?.!:]$/.test(stem)) {
    findings.push({
      category: 'language_clarity',
      severity: 'info',
      field: 'stem',
      message: 'Soru kökü uygun bir noktalama işaretiyle (? veya .) bitmemektedir.',
      suggestedFix: 'Soru kökünün sonuna soru işareti (?) veya yönerge noktası (.) ekleyiniz.',
      validationMethod: 'stem_punctuation_termination_check'
    });
  }

  // Çift noktalama veya bozuk yazım kalıntısı
  if (/[?.,!;]{2,}/.test(stem)) {
    findings.push({
      category: 'language_clarity',
      severity: 'info',
      field: 'stem',
      message: 'Soru kökünde mükerrer veya bozuk noktalama işareti tespit edildi.',
      suggestedFix: 'Gereksiz çift noktalama işaretlerini temizleyiniz.',
      validationMethod: 'redundant_punctuation_check'
    });
  }

  // ==========================================
  // F. ÖLÇME NİTELİĞİ VE SINAV İÇİ ÇEŞİTLİLİK
  // ==========================================
  // Yüksek puanlı sorularda tek kelimelik ezber avcılığı kontrolü
  if (points >= 14 && answer) {
    const cleanWords = answer.split(/\s+/).filter(Boolean);
    const isTrivialQuery = /(hangi\s+(meyve|sebze|renk|şehir|araç|hayvan|nesne|eşya)|kimdir|kaç\s+(liradır|kestane|elma))/i.test(stem);
    if (cleanWords.length <= 2 && isTrivialQuery) {
      findings.push({
        category: 'pedagogical_depth',
        severity: 'warning',
        field: 'answer',
        message: `Yüksek puanlı (${points} puan) soruda yüzeysel tek kelimelik bilgi sorulmaktadır ("${answer}").`,
        suggestedFix: 'Soruyu öğrencinin neden-sonuç kurarak gerekçesini de açıkladığı üst düzey düşünme formatına dönüştürünüz.',
        validationMethod: 'trivial_single_word_check'
      });
    }
  }

  // Kardeş sorularla (sibling questions) mükerrerlik kontrolü
  if (context.siblingQuestions && context.siblingQuestions.length > 0) {
    const cleanStemLower = stem.toLowerCase();
    for (const sib of context.siblingQuestions) {
      const sibStem = (sib.questionText || sib.question || '').trim().toLowerCase();
      if (sibStem && sibStem !== cleanStemLower) {
        // Tam aynı soru kökü kontrolü
        if (cleanStemLower.length > 25 && sibStem.includes(cleanStemLower)) {
          findings.push({
            category: 'pedagogical_depth',
            severity: 'critical',
            field: 'stem',
            message: `Aynı sınavdaki başka bir soruyla (${sib.questionNumber || 'diğer soru'}) birebir veya aşırı benzer soru kökü tespit edildi.`,
            suggestedFix: 'Soru bağlamını ve ölçme yaklaşımını farklılaştırınız.',
            validationMethod: 'intra_exam_duplicate_check'
          });
          break;
        }
      }
    }
  }

  return findings;
}
