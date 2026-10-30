import { GradeLevel } from '../../types';

/**
 * Sınıf seviyesine ve öğrenci yaş düzeyine özgü bilişsel kurallar.
 * NOT: 8f82edf motorunda bu direktif ortaokulun tüm kademeleri (5, 6, 7, 8) için
 * evrensel pedagojik çekirdek olarak yer almaktaydı. Geriye dönük %100 uyumluluk için
 * geçerli ortaokul sınıflarında aynen muhafaza edilmektedir.
 */
export function getGradeAgeDirectives(grade: GradeLevel): string {
  if (grade === 5 || grade === 6 || grade === 7 || grade === 8) {
    return `ÖĞRENCİ YAŞ DÜZEYİNE UYGUN SADE VE AKICI TÜRKÇE (7. SINIF SEVİYESİ - EN KRİTİK PEDAGOJİK KURAL):
- Sorularda kullanılan dil, 12-13 yaşındaki bir ortaokul 7. sınıf öğrencisinin rahatlıkla, takılmadan anlayabileceği duru, yalın, açık ve anlaşılır bir Türkçe olmalıdır.
- Ağır akademik terminoloji, üniversite düzeyinde fizik/astronomi/biyoloji teorileri (örneğin pulsar, kuantum fiziği, ileri optik kırınım teorileri) KESİNLİKLE YASAKTIR.
- Soru kökleri, öncüller ve diyaloglar günlük hayatın içinden, öğrencinin yabancılık çekmeyeceği durumlar (ev yaşamı, spor, bisiklet sürmek, okul bahçesi, dağ gözlemevi, alışveriş sepeti, bahçe sulama vb.) üzerinden kurgulanmalıdır.
- Metinler gereksiz laf kalabalığından arındırılmalı, öğrencinin neyi çözeceği net ve samimi olmalıdır.`;
  }

  return '';
}
