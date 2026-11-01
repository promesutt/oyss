import { GradeLevel } from '../../types';

/**
 * Sınıf seviyesine ve öğrenci yaş düzeyine özgü bilişsel kurallar.
 * - isQualityActive === false: 8f82edf motoruyla %100 byte-for-byte parity eşitliğini korur.
 * - isQualityActive === true: 5, 6, 7 ve 8. sınıflara özgü pedagojik ve dilsel kalite direktifleri üretir (FAZ 3.3.2).
 */
export function getGradeAgeDirectives(grade: GradeLevel, isQualityActive: boolean = false): string {
  // Legacy Parity Koruması (FAZ 2.2.2 / reference_prompts.json uyumluluğu)
  if (!isQualityActive) {
    if (grade === 5 || grade === 6 || grade === 7 || grade === 8) {
      return `ÖĞRENCİ YAŞ DÜZEYİNE UYGUN SADE VE AKICI TÜRKÇE (7. SINIF SEVİYESİ - EN KRİTİK PEDAGOJİK KURAL):
- Sorularda kullanılan dil, 12-13 yaşındaki bir ortaokul 7. sınıf öğrencisinin rahatlıkla, takılmadan anlayabileceği duru, yalın, açık ve anlaşılır bir Türkçe olmalıdır.
- Ağır akademik terminoloji, üniversite düzeyinde fizik/astronomi/biyoloji teorileri (örneğin pulsar, kuantum fiziği, ileri optik kırınım teorileri) KESİNLİKLE YASAKTIR.
- Soru kökleri, öncüller ve diyaloglar günlük hayatın içinden, öğrencinin yabancılık çekmeyeceği durumlar (ev yaşamı, spor, bisiklet sürmek, okul bahçesi, dağ gözlemevi, alışveriş sepeti, bahçe sulama vb.) üzerinden kurgulanmalıdır.
- Metinler gereksiz laf kalabalığından arındırılmalı, öğrencinin neyi çözeceği net ve samimi olmalıdır.`;
    }
    return '';
  }

  // FAZ 3.3.2: 5, 6, 7 ve 8. Sınıflara Özel Pedagojik Dil Direktifleri
  if (grade === 5) {
    return `ÖĞRENCİ YAŞ DÜZEYİNE UYGUN SADE VE AKICI TÜRKÇE (5. SINIF SEVİYESİ - EN KRİTİK PEDAGOJİK KURAL):
- Sorularda kullanılan dil, 10-11 yaşındaki bir ilkokuldan yeni geçmiş ortaokul 5. sınıf öğrencisinin rahatlıkla anlayabileceği açık, duru, yalın ve samimi bir Türkçe olmalıdır.
- Katı kelime sayısı sınırları aranmaz; dilin doğallığı, açıklığı ve gereksiz karmaşıklıktan arındırılmış olması esastır. İhtiyaç duyulduğunda ve bağlam gerektirdiğinde doğal uzunlukta cümleler kullanılabilir; ancak iç içe geçmiş dolaylı yan cümlelerden ve soyut laf kalabalığından kaçınılmalıdır.
- Bilimsel terimler (ışın, doğru parçası, açılar, Ay'ın evreleri, biyoçeşitlilik vb.) günlük hayatın somut modelleri ve gözlemleri üzerinden desteklenmelidir.
- Ağır akademik terminoloji ve henüz öğrenilmemiş soyut teoriler KESİNLİKLE YASAKTIR. Soru kökleri net, yönergeler doğrudan olmalıdır.`;
  }

  if (grade === 6) {
    return `ÖĞRENCİ YAŞ DÜZEYİNE UYGUN SADE VE AKICI TÜRKÇE (6. SINIF SEVİYESİ - EN KRİTİK PEDAGOJİK KURAL):
- Sorularda kullanılan dil, 11-12 yaşındaki bir ortaokul 6. sınıf öğrencisinin takılmadan, akıcı bir şekilde okuyup çıkarım yapabileceği canlı, anlaşılır ve duru bir Türkçe olmalıdır.
- Yaş düzeyini gereksiz yere zorlayan arkaik, ağdalı veya aşırı soyut sözcükler ('kadim', 'nakşetmek', 'müteakip', 'icra etmek' vb.) yerine güncel, doğal ve zengin bir söz varlığı tercih edilmelidir.
- Branşa özgü gerekli bilimsel ve kavramsal terimler (iç/dış karasal-gazsal gezegenler, çarpanlar ve katlar, ortak bölen, veri açıklığı vb.) eksiksiz ve doğru biçimde korunmalıdır.
- Soru bağlamları günlük yaşam, çevre, bilim ve teknoloji, spor ve kültürel etkinlikler üzerinden kurgulanmalıdır.`;
  }

  if (grade === 7) {
    return `ÖĞRENCİ YAŞ DÜZEYİNE UYGUN SADE VE AKICI TÜRKÇE (7. SINIF SEVİYESİ - EN KRİTİK PEDAGOJİK KURAL):
- Sorularda kullanılan dil, 12-13 yaşındaki bir ortaokul 7. sınıf öğrencisinin rahatlıkla anlayabileceği, neden-sonuç ve karşılaştırma ilişkilerini çözümleyebileceği duru, yalın ve analitik bir Türkçe olmalıdır.
- Ağır edebi süslemelerden, yapay akademik karmaşıklıktan ve arkaik kelimelerden ('mefkûre' vb.) arındırılmış samimi bir üslup kullanılmalıdır.
- Okuma metinleri ve senaryolar gereksiz laf kalabalığı içermemeli; öğrencinin metin içi delillendirme ve çıkarım yapabileceği somut ve zengin olay örgüleri sunmalıdır.
- Müfredatın gerektirdiği kavramsal ve bilimsel terminoloji (uzay kirliliği, rasyonel sayılar, kuvvet-iş ilişkisi, iletişimde ben dili/sen dili vb.) tam bir disiplinle korunmalıdır.`;
  }

  if (grade === 8) {
    return `ÖĞRENCİ YAŞ DÜZEYİNE UYGUN SADE VE AKICI TÜRKÇE (8. SINIF SEVİYESİ - EN KRİTİK PEDAGOJİK KURAL):
- Sorularda kullanılan dil, 13-14 yaşındaki bir 8. sınıf öğrencisinin analitik düşünme, hipotez kurma ve problem çözme becerisini harekete geçiren net, disiplinli ve berrak bir Türkçe olmalıdır.
- Sorunun zorluğu gereksiz dil karmaşıklığından veya dolaylı ifadelerden değil; çok adımlı mantıksal ve kavramsal düşünme sürecinden kaynaklanmalıdır. Düşünme düzeyi yüksek, dil yükü gereksiz karmaşıklıktan arındırılmış sorular esastır.
- Branşın bilimsel ve tarihsel kavramları (mevsimler ve iklim, eksen eğikliği, DNA ve genetik kod, periyodik sistem, basınç, çarpanlara ayırma, Sanayi İnkılabı, kapitülasyonlar vb.) eksiksiz ve akademik ciddiyetle korunmalıdır.
- Yönergeler kesin, hedefler net ve ölçme sınırları belirgin olmalıdır.`;
  }

  return '';
}
