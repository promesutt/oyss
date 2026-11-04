import { OUTCOME_STUDY_BANK } from '../../data/outcomeStudyBank';
import { GradeLevel, SubjectId } from '../../types';

/**
 * 5. ve 6. Sınıf Soru Üretimi İçin Ders Kitabı Kaynak ve İçerik Direktifini Üretir (FAZ 3.2.2).
 * 
 * - Yalnızca 5 ve 6. sınıflara uygulanır; 7 ve 8. sınıflara müdahale etmez.
 * - Sınav senaryosundaki kazanımları tekilleştirir (deduplicate) ve token tasarrufu sağlar.
 * - Kazanım kartındaki textbookReferences, evidenceLevel, textbookExamples, quickNotes ve examTraps
 *   verilerini pedagojik bağlam olarak prompta aktarır.
 * - Gereksiz tekrarları ve şişkinlikleri ayıklayarak prompt bütçesini 12.500-14.500 kr bandında tutar.
 * - Yapay zekâya halüsinasyon, kaynak dışı uydurma ve sayfa uydurma yasaklarını kesin kurallarla bildirir.
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

    // 1. Ders Kitabı Kaynak ve Sayfa Bilgisi (Birincil referans odaklı kompakt aktarım)
    const primaryRef = refs[0];
    const evLevel = card.evidenceLevel || primaryRef?.evidenceLevel || 'D';
    if (primaryRef) {
      const pageInfo = primaryRef.printedPageRange ? `s. ${primaryRef.printedPageRange}` : (card.textbookPageRange || '');
      const unit = primaryRef.unitTitle || card.textbookUnit || '';
      lines.push(`  * Ders Kitabı Kaynağı: ${primaryRef.bookType || 'Ders Kitabı'} (${primaryRef.bookFileName || 'Resmi Kitap'}), Ünite: "${unit}" [${pageInfo}] (Seviye ${evLevel})`);
    } else if (card.textbookUnit || card.textbookPageRange) {
      lines.push(`  * Ders Kitabı Kaynağı: Ünite: "${card.textbookUnit || '-'}", Sayfa: ${card.textbookPageRange || '-'} (Seviye ${evLevel})`);
    }

    // 2. Ders Kitabı Gerçek Yaşam Örnekleri & Modelleri (Kazanım sayısına göre dengeli kota)
    const exampleLimit = uniqueCodes.length > 3 ? 1 : 2;
    if (card.textbookExamples && card.textbookExamples.length > 0) {
      const exMax = uniqueCodes.length > 5 ? 40 : (uniqueCodes.length > 3 ? 75 : 115);
      const examples = card.textbookExamples.slice(0, exampleLimit).map(e => {
        const tr = e.trim();
        return `"${tr.length > exMax ? tr.slice(0, exMax - 3) + '...' : tr}"`;
      }).join(', ');
      lines.push(`  * Ders Kitabı Gerçek Yaşam Örnekleri & Modelleri: ${examples}`);
    }

    // 3. Ders Kitabı Kavram ve Kural Notları (En fazla 1 net not)
    if (card.quickNotes && card.quickNotes.length > 0) {
      const note = card.quickNotes[0].trim().replace(/\s+/g, ' ');
      const noteLimit = uniqueCodes.length > 5 ? 45 : (uniqueCodes.length > 3 ? 90 : 140);
      const trNote = note.length > noteLimit ? note.slice(0, noteLimit - 3) + '...' : note;
      lines.push(`  * Ders Kitabı Temel Kavram ve Kural Notları: ${trNote}`);
    }

    // 4. Varsa Pedagojik Püf Nokta / Sınav Tuzağı (examTraps)
    if (card.examTraps && card.examTraps.length > 0) {
      const trap = card.examTraps[0].trim().replace(/\s+/g, ' ');
      const trapLimit = uniqueCodes.length > 5 ? 45 : (uniqueCodes.length > 3 ? 90 : 140);
      const trTrap = trap.length > trapLimit ? trap.slice(0, trapLimit - 3) + '...' : trap;
      lines.push(`  * Dikkat Edilecek Pedagojik Sınır / Tuzak: ${trTrap}`);
    }

    contextBlocks.push(lines.join('\n'));
  }

  // Eğer hiçbir kazanımda ders kitabı kaynağı yoksa standart genel davranış korunur
  if (contextBlocks.length === 0) {
    return '';
  }

  const missingBlock = missingCodes.length > 0
    ? `\nKAYNAK BİLGİSİ BULUNMAYAN KAZANIMLAR: [${missingCodes.join(', ')}]. Bu kazanımlar için harici kaynak/sayfa uydurmayınız; resmi kazanım sınırında açık uçlu soru kurgulayınız.\n`
    : '';

  return `MEBİ ${grade}. SINIF DERS KİTABI KAYNAK KANITLARI VE YAPAY ZEKÂ SORU ÜRETİM YÖNERGESİ (FAZ 3.2.2):
Aşağıda sınavda sorulacak ${grade}. sınıf ${subjectId} kazanımlarına ait resmi MEB ders kitabı bağlamı verilmiştir:

${contextBlocks.join('\n\n')}${missingBlock}
ZORUNLU DERS KİTABI ENTEGRASYONU VE HALÜSİNASYON ENGELLEME İLKELERİ:
1. SEÇİLEN KAZANIMLA %100 UYUM: Sınavdaki her soru, yukarıda listelenen ilgili resmi kazanım ve ders kitabı ünitesinin sınırları içinde kalmalıdır.
2. DERS KİTABI İÇERİĞİ TEMEL KAYNAKTIR: Kurgulanan durumlar ve nesneler ders kitabındaki gerçek hayat örnekleri ve kavram notlarıyla uyumlu olmalıdır.
3. KESİN HALÜSİNASYON VE UYDURMA YASAĞI (EN KATI KURAL): Ders kitabında veya kaynak bağlamında bulunmayan bilgi, kural veya uydurma sayfa referansı KESİNLİKLE YAZILAMAZ.
4. KAYNAK YETERSİZLİĞİ BİLDİRİMİ: Kaynakta yer almayan harici bilgiler uydurularak soru kurgulanmamalı; resmi kazanım sınırlarında kalınmalıdır.
5. MEB SENARYO, PUANLAMA VE FORMAT BÜTÜNLÜĞÜ: Açık uçlu soru formatı, MEBİ şablonları, senaryodaki soru sayısı ve puan dengesi korunmalıdır.`;
}
