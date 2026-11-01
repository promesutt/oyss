import { OUTCOME_STUDY_BANK } from '../../data/outcomeStudyBank';
import { GradeLevel, SubjectId } from '../../types';

/**
 * 5. ve 6. Sınıf Soru Üretimi İçin Ders Kitabı Kaynak ve İçerik Direktifini Üretir (FAZ 3.2.2).
 * 
 * - Yalnızca 5 ve 6. sınıflara uygulanır.
 * - Sınav senaryosunda geçen kazanımları tekilleştirir (deduplicate) ve token tasarrufu sağlar.
 * - Kazanım kartındaki textbookReferences, evidenceLevel, textbookExamples, quickNotes ve examTraps
 *   verilerini pedagojik bağlam olarak prompta aktarır.
 * - Yapay zekâya halüsinasyon, kaynak dışı uydurma ve sayfa uydurma yasaklarını kesin kurallarla bildirir.
 * - Kaynak referansı bulunmayan kazanımlarda mevcut standart akışı bozmaz.
 */
export function buildGrade56TextbookDirectives(
  grade: GradeLevel,
  subjectId: SubjectId,
  outcomeCodes: string[]
): string {
  if (grade !== 5 && grade !== 6) return '';
  if (!outcomeCodes || outcomeCodes.length === 0) return '';

  const uniqueCodes = Array.from(new Set(outcomeCodes));
  const contextBlocks: string[] = [];
  const missingCodes: string[] = [];

  for (const code of uniqueCodes) {
    const card = OUTCOME_STUDY_BANK[code];
    if (!card) {
      missingCodes.push(code);
      continue;
    }

    const refs = card.textbookReferences || [];
    const hasRefs = refs.length > 0;
    const hasUnitOrPage = Boolean(card.textbookUnit || card.textbookPageRange);

    if (!hasRefs && !hasUnitOrPage) {
      missingCodes.push(code);
      continue;
    }

    const lines: string[] = [];
    const titleStr = card.topicTitle ? ` - ${card.topicTitle}` : '';
    lines.push(`- Kazanım: [${code}]${titleStr}`);

    // 1. Ders Kitabı Kaynak ve Sayfa Bilgisi (textbookReferences)
    if (refs.length > 0) {
      const refStrs = refs.map(r => {
        const pages = r.printedPageRange ? `Baskı: s. ${r.printedPageRange}` : '';
        const pdfPages = r.pdfPageRange ? `PDF: s. ${r.pdfPageRange}` : '';
        const pageInfo = [pages, pdfPages].filter(Boolean).join(', ');
        return `${r.bookType || 'Ders Kitabı'} (${r.bookFileName || 'Resmi Kitap'}), Ünite: "${r.unitTitle || card.textbookUnit || '-'}" [${pageInfo}]`;
      });
      lines.push(`  * Ders Kitabı Kaynağı: ${refStrs.join('; ')}`);
    } else if (card.textbookUnit || card.textbookPageRange) {
      lines.push(`  * Ders Kitabı Kaynağı: Ünite: "${card.textbookUnit || '-'}", Sayfa: ${card.textbookPageRange || '-'}`);
    }

    // 2. Kaynak Kanıt Seviyesi (evidenceLevel: A, B, C, D)
    const evLevel = card.evidenceLevel || (refs[0]?.evidenceLevel);
    if (evLevel) {
      const evDesc = evLevel === 'D' ? 'Doğrudan MEBİ Örnek Sorularıyla Teyitli (Seviye D)' :
                     evLevel === 'A' ? 'Temel Kazanım Düzeyi (Seviye A)' :
                     evLevel === 'B' ? 'Ünite ve Sayfa Düzeyi (Seviye B)' :
                     'Konu ve Örnek Düzeyi (Seviye C)';
      lines.push(`  * Kaynak Kanıt Seviyesi: ${evLevel} (${evDesc})`);
    }

    // 3. Ders Kitabı Gerçek Yaşam Örnekleri & Modelleri (textbookExamples - En fazla 3 örnek)
    if (card.textbookExamples && card.textbookExamples.length > 0) {
      const examples = card.textbookExamples.slice(0, 3).map(e => `"${e}"`).join(', ');
      lines.push(`  * Ders Kitabı Gerçek Yaşam Örnekleri & Modelleri: ${examples}`);
    }

    // 4. Ders Kitabı Kavram ve Kural Notları (quickNotes - En fazla 2 temel not)
    if (card.quickNotes && card.quickNotes.length > 0) {
      const notes = card.quickNotes.slice(0, 2).map(n => n.trim().replace(/\s+/g, ' ')).join(' ');
      lines.push(`  * Ders Kitabı Temel Kavram ve Kural Notları: ${notes}`);
    }

    // 5. Varsa Pedagojik Püf Nokta / Sınav Tuzağı (examTraps - En fazla 1 not)
    if (card.examTraps && card.examTraps.length > 0) {
      lines.push(`  * Dikkat Edilecek Pedagojik Sınır / Tuzak: ${card.examTraps[0]}`);
    }

    // 6. Kaynak kanıtı sınırlıysa (D harici veya örneksiz) açık sınırlılık uyarısı
    if (evLevel !== 'D' || !card.textbookExamples || card.textbookExamples.length === 0) {
      lines.push(`  * [UYARI: Bu kazanıma ait ders kitabı detay içeriği sınırlıdır. Yalnızca resmi öğrenme çıktısı sınırlarında kalınmalı, kaynakta olmayan bilgi uydurulmamalıdır.]`);
    }

    contextBlocks.push(lines.join('\n'));
  }

  // Eğer hiçbir kazanımda ders kitabı kaynağı yoksa standart genel davranış korunur
  if (contextBlocks.length === 0) {
    return '';
  }

  const missingBlock = missingCodes.length > 0
    ? `\nKAYNAK BİLGİSİ BULUNMAYAN KAZANIMLAR: [${missingCodes.join(', ')}]. Bu kazanımlar için harici kaynak veya sayfa referansı uydurmayınız; yalnızca resmi kazanım başlığının pedagojik sınırlarında açık uçlu soru kurgulayınız.\n`
    : '';

  return `MEBİ ${grade}. SINIF DERS KİTABI KAYNAK KANITLARI VE YAPAY ZEKÂ SORU ÜRETİM YÖNERGESİ (FAZ 3.2.2):
Aşağıda sınavda sorulacak ${grade}. sınıf ${subjectId} kazanımlarına ait resmi MEB ders kitabı kaynak ve içerik bağlamı verilmiştir:

${contextBlocks.join('\n\n')}${missingBlock}
ZORUNLU DERS KİTABI ENTEGRASYONU VE HALÜSİNASYON ENGELLEME İLKELERİ:
1. SEÇİLEN KAZANIMLA %100 UYUM:
   - Sınavdaki her bir soru, yukarıda listelenen ilgili resmi kazanım ve ders kitabı ünitesinin kavramsal sınırları içinde kalmalıdır.
2. DERS KİTABI İÇERİĞİ TEMEL KAYNAKTIR:
   - Sorularda kurgulanan durumlar, nesneler, modeller ve olay örgüleri ilgili kazanımın ders kitabında geçen gerçek hayat örnekleriyle, kavram notlarıyla ve temalarıyla doğrudan uyumlu olmalıdır.
3. KESİN HALÜSİNASYON VE UYDURMA YASAĞI (EN KATI KURAL):
   - Ders kitabında veya yukarıdaki kaynak bağlamında bulunmayan bilgi, kavram, kural, deney sonucu veya uydurma sayfa referansı KESİNLİKLE YAZILAMAZ.
   - Soru kökünde veya çözüm metninde kaynakta yer almayan sayfa numaraları veya uydurma kaynak referansları kullanılamaz.
4. KAYNAK YETERSİZLİĞİ BİLDİRİMİ:
   - Eğer bir kazanımın kaynak bilgisi veya örnek içeriği sınırlıysa, bu durum soru çözüm açıklamasında (solutionExplanation) veya rubrikte açıkça belirtilmeli; kaynakta yer almayan harici bilgiler uydurularak soru kurgulanmamalıdır.
5. MEB SENARYO, PUANLAMA VE FORMAT BÜTÜNLÜĞÜ:
   - Açık uçlu soru formatı, MEBİ şablonları, senaryodaki soru sayısı, rubrik puan dağılımı ve 100 tam puan dengesi eksiksiz korunmalıdır.`;
}

