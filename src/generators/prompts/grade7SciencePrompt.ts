import { resolveOutcomeMetadata } from '../../data/curriculumData';

/**
 * 7. Sınıf Fen Bilimleri MEB Ders Kitabı ve Ölçme Yönergesi Kazanım Sözlüğü
 * Her kazanım için ders kitabı sayfası, temel kavramlar, deneyler ve KaTeX gösterimleri tanımlıdır.
 */
export const GRADE_7_SCIENCE_OUTCOME_DICTIONARY: Record<string, string> = {
  'FB.7.1.1': `FB.7.1.1: Uzay araştırmaları teknolojilerini karşılaştırabilme (Ders Kitabı 1. Kitap, s. 12-30: Palandöken DAG gözlemevi yer seçimi kriterleri - yüksek rakım, az ışık ve hava kirliliği, açık gece sayısı; James Webb origami ayna derin uzay gözlemi; Türksat 6A haberleşme, İMECE yüksek çözünürlüklü gözlem uydumuz; Alper Gezeravcı ISS bilimsel deneyleri).`,
  'FB.7.1.3': `FB.7.1.3: Türkiye'nin aktif yapay uyduları ve uzay kirliliği (Ders Kitabı 1. Kitap, s. 22-35: Türksat 6A ile İMECE görev farkları; 28.000 km/h hızdaki uzay enkazları, Kessler sendromu, atmosferde kontrollü yakma teknolojileri).`,
  'FB.7.1.4': `FB.7.1.4: Yıldızların yaşam döngüsü (Ders Kitabı 1. Kitap, s. 36-45: Bulutsu türleri Orion, Atbaşı; Küçük kütleli döngü: Bulutsu -> Küçük Yıldız/Güneş -> Kırmızı Dev -> Gezegenimsi Bulutsu -> Beyaz Cüce; Büyük kütleli döngü: Bulutsu -> Büyük Yıldız -> Kırmızı Süperdev -> Süpernova Patlaması -> Nötron Yıldızı veya Kara Delik; Güneş'in kütlesi yetersiz olduğundan kara deliğe dönüşemez).`,
  'FB.7.1.5': `FB.7.1.5: Yıldız, galaksi ve evren kavramları (Ders Kitabı 1. Kitap, s. 46-55: Samanyolu ve Andromeda sarmal galaksidir; Güneş Sistemi Samanyolu Avcı kolundadır; Işık yılı zaman değil mesafe birimidir; Evren = Uzay + Dünya ayrımı).`,
  'FB.7.2.1': `FB.7.2.1: Fiziksel anlamda işin bağlı olduğu faktörler (Ders Kitabı 1. Kitap, s. 56-66: İşin şartları: 1) Cisme kuvvet uygulanmalı, 2) Cisim kuvvet doğrultusunda yer değiştirmeli $W = F \\cdot \\Delta x$; Sırtında çantayla yatay yolda sabit hızla yürüyen öğrenci yer çekimine karşı iş yapmaz; çantayı merdivenden yukarı çıkaran iş yapar; hareket etmeyen ağır dolapta iş sıfırdır; kuvvet ile yapılan iş doğru orantılıdır).`,
  'FB.7.2.2': `FB.7.2.2: Enerji çeşitlerinden kinetik ve potansiyel enerjiyi karşılaştırabilme (Ders Kitabı 1. Kitap, s. 67-86: Kinetik enerji kütle ve sürate bağlıdır; çekim potansiyel enerjisi kütle ve yüksekliğe bağlıdır $E_p = m \\cdot g \\cdot h$; kum havuzunda farklı yükseklik ve kütledeki bilyelerin bıraktığı çukur deneyi; sürtünmesiz kaykay pistinde tepe noktasında $E_p$ maksimum, dipte $E_k$ maksimumdur; mekanik enerji korunur).`,
  'FB.7.2.3': `FB.7.2.3: Enerji dönüşümünden hareketle enerjinin korunduğuna tümevarımsal akıl yürütebilme (Ders Kitabı 1. Kitap, s. 87-105: Kinetik ve çekim potansiyel enerjisinin birbirine dönüşümü; sarkaç salınımı, hız treni/lunapark, serbest düşen top; sürtünmesiz ortamda mekanik enerji $E_m = E_k + E_p$ sabittir; sürtünmeli yüzeyde kinetik enerjinin bir kısmı ısı ve ses enerjisine dönüşür, toplam enerji daima korunur. AYNI KAZANIMDAN BİRDEN FAZLA SORU İSTENDİĞİNDE: Biri serbest düşme/sarkaçta kinetik-potansiyel dönüşümünü, diğeri sürtünmeli zemin/fren/ısı deneyini sorgulayarak tamamen farklı iki bağlam kullanılmalıdır).`,
  'FB.7.3.1': `FB.7.3.1: Sindirim sistemini oluşturan yapı ve organların görevlerini model üzerinde gözlemleyebilme (Ders Kitabı 2. Kitap, 3. Ünite: Besin içerikleri; mekanik sindirim (diş, mide kası, safra) ile kimyasal sindirim (tükürük amilazı, mide pepsini, pankreas enzimleri) farkı; sindirim kanalı sırası: ağız -> yutak -> yemek borusu -> mide -> ince bağırsak -> kalın bağırsak -> anüs; yardımcı organlar: karaciğer safra üretir, pankreas sindirim enzimi salgılar; villuslarla kana emilim).`,
  'FB.7.3.3': `FB.7.3.3: Dolaşım sistemini oluşturan yapı ve organların görevlerini model üzerinde gözlemleyebilme (Ders Kitabı 2. Kitap, 3. Ünite: Kalbin 4 odacığı - sağ kirli, sol temiz kan; Küçük kan dolaşımı: Sağ karıncık -> Akciğer atardamarı -> Akciğerler (gaz değişimi) -> Akciğer toplardamarı -> Sol kulakçık; Büyük kan dolaşımı: Sol karıncık -> Aort -> Vücut -> Ana toplardamar -> Sağ kulakçık; Damarlar: Atardamar (kalın, esnek), Toplardamar (kapakçıklı), Kılcal damar (madde alışverişi); Kan hücreleri: Alyuvar ($O_2/CO_2$), Akyuvar (mikroplarla savaş), Kan pulcukları (pıhtılaşma)).`,
  'FB.7.3.4': `FB.7.3.4: Kan bağışının toplumsal dayanışma açısından önemi (Ders Kitabı 2. Kitap, 3. Ünite: Türk Kızılayı kan bağışı faaliyetleri, 18-65 yaş sağlıklı bireylerin düzenli bağışı, kan grubu uyumu A/B/AB/0 ve Rh faktörü, toplumsal yardımlaşma ve hayat kurtarma boyutu).`,
  'FB.7.3.6': `FB.7.3.6: Solunum sistemini oluşturan yapı ve organların görevlerini model üzerinde gözlemleyebilme (Ders Kitabı 2. Kitap, 3. Ünite: Solunum yolu organları (burun, yutak, gırtlak, soluk borusu, bronş, bronşçuk, alveol); Alveollerde gaz değişimi; Soluk alma: Diyafram kasılır düzleşir, göğüs genişler, iç basınç düşer, hava dolar; Soluk verme: Diyafram gevşer kubbeleşir, göğüs daralır, iç basınç artar; Pet şişe, Y borusu ve balonlarla kurulan akciğer modeli deneyi).`
};

const COMMON_SCIENCE_DIRECTIVES = `2. DENEY DÜZENEKLERİ VE DEĞİŞKEN ANALİZİ:
   - Bilimsel deney sorularında bağımsız değişken, bağımlı değişken ve kontrol edilen (sabit) değişkenler açıkça sorgulanmalıdır.
3. BİLİMSEL VE MATEMATİKSEL GÖSTERİM (KaTeX):
   - İş birimi Joule ($150\\text{ J}$), kuvvet ($30\\text{ N}$), yol ($10\\text{ m}$), sürat ($60\\text{ km/h}$), kütle ($m$, $2m$), yükseklik ($h$, $2h$) ve formüllerde standart KaTeX formatı ($W = F \\cdot \\Delta x$, $E_p = m \\cdot g \\cdot h$) kullanılmalıdır.`;

/**
 * TASK174 - Dinamik 7. Sınıf Fen Bilimleri Direktif Üreticisi
 * Yalnızca aktif sınav senaryosunda sorulan kazanımların ayrıntılı ders kitabı bağlamlarını ekler.
 * Senaryo dışı üniteleri prompta taşımayarak ~3.000 karakter tasarruf sağlar.
 */
export function buildGrade7ScienceDirectives(outcomeCodes?: string[]): string {
  if (!outcomeCodes || outcomeCodes.length === 0) {
    return GRADE_7_SCIENCE_DIRECTIVES;
  }

  const uniqueCodes = Array.from(new Set(outcomeCodes));
  const matchedLines: string[] = [];
  const missingCodes: string[] = [];

  for (const code of uniqueCodes) {
    if (GRADE_7_SCIENCE_OUTCOME_DICTIONARY[code]) {
      matchedLines.push(`   - ${GRADE_7_SCIENCE_OUTCOME_DICTIONARY[code]}`);
    } else {
      missingCodes.push(code);
      const meta = resolveOutcomeMetadata(code);
      matchedLines.push(`   - ${code}: ${meta.displayLabel} (Ders Kitabı Ölçme İlkesi: İlgili resmi kazanım sınırında kavramsal anlama ve bilimsel süreç basamakları sorgulanmalıdır).`);
    }
  }

  const missingNote = missingCodes.length > 0
    ? `\n   * Not: [${missingCodes.join(', ')}] kazanımları için genel MEB müfredat sınırlarında kalınmalıdır.\n`
    : '';

  return `MEBİ 7. SINIF FEN BİLİMLERİ DERS KİTABI VE ÖLÇME YÖNERGESİ (SEÇİLİ SENARYO UYUMLU):
1. SEÇİLİ SENARYO KAZANIM EŞLEŞTİRMESİ VE DERS KİTABI BAĞLAMLARI:
${matchedLines.join('\n')}${missingNote}
${COMMON_SCIENCE_DIRECTIVES}`;
}

/**
 * Geriye dönük kütük kaydı ve statik tam yönerge
 */
export const GRADE_7_SCIENCE_DIRECTIVES = `
MEBİ 7. SINIF FEN BİLİMLERİ DERS KİTABI VE ÖLÇME YÖNERGESİ (1. KİTAP 1., 2. VE 3. ÜNİTE UYUMLU):
1. KAZANIM EŞLEŞTİRMESİ VE DERS KİTABI BAĞLAMLARI:
${Object.values(GRADE_7_SCIENCE_OUTCOME_DICTIONARY).map(v => `   - ${v}`).join('\n')}
${COMMON_SCIENCE_DIRECTIVES}
`;
