import { ExamScenario, SubjectId } from '../types';

/**
 * 2026-2027 Eğitim Öğretim Yılı 1. Dönem 2. Ortak Yazılı Sınavları
 * MEB ÖDSGM Resmî Konu Soru Dağılım Tablolarından Derlenen Senaryolar
 * (5, 6, 7 ve 8. Sınıf - Türkçe, Matematik, Fen Bilimleri, Sosyal Bilgiler, Din Kültürü, İngilizce)
 * 
 * 131 adet senaryo MEB ÖDSGM Excel tablolarından birebir doğrulanmıştır (sourceOrigin: 'meb_official').
 * 7. Sınıf Türkçe dersi MEB tarafından 'Ülke Geneli' olarak belirlendiğinden 3 senaryosu OYSS Rehberi
 * zümresince 1. dönem kazanımları esas alınarak kurgulanmıştır (sourceOrigin: 'oyss_curated').
 */
export const MIDDLE_SCHOOL_OFFICIAL_SCENARIOS_TERM2: Record<number, Partial<Record<SubjectId, ExamScenario[]>>> = {
  "5": {
    "turkce": [
      {
        "id": "senaryo_1",
        "name": "Senaryo 1 (6 Soru)",
        "description": "MEB ÖDSGM 2026-2027 1. Dönem 2. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 1 (6 Soru) formatı (Toplam 100 Puan).",
        "totalQuestions": 6,
        "distributions": [
          {
            "outcomeCode": "T.O.5.6",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Metnin yüzey anlamını belirleyebilme"
          },
          {
            "outcomeCode": "T.O.5.13",
            "questionCount": 1,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "Öyküleyici metinde hikâye unsurlarını belirlemeye yönelik çözümleme yapabilme"
          },
          {
            "outcomeCode": "T.O.5.15",
            "questionCount": 1,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "Metnin anahtar kelimelerini belirlemeye yönelik çözümleme yapabilme"
          },
          {
            "outcomeCode": "T.O.5.19",
            "questionCount": 1,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "Metindeki söz sanatlarını belirlemeye yönelik çözümleme yapabilme"
          },
          {
            "outcomeCode": "T.O.5.20",
            "questionCount": 1,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "Metinden hareketle söz varlığını geliştirmeye yönelik çözümleme yapabilme"
          },
          {
            "outcomeCode": "T.Y.5.5",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Yaratıcı yazı yazabilme"
          }
        ],
        "sourceOrigin": "meb_official"
      },
      {
        "id": "senaryo_2",
        "name": "Senaryo 2 (7 Soru)",
        "description": "MEB ÖDSGM 2026-2027 1. Dönem 2. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 2 (7 Soru) formatı (Toplam 100 Puan).",
        "totalQuestions": 7,
        "distributions": [
          {
            "outcomeCode": "T.O.5.5",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Metinde geçen anlamını bilmediği söz varlığı unsurlarının anlamını tahmin edebilme"
          },
          {
            "outcomeCode": "T.O.5.6",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Metnin yüzey anlamını belirleyebilme"
          },
          {
            "outcomeCode": "T.O.5.13",
            "questionCount": 1,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "Öyküleyici metinde hikâye unsurlarını belirlemeye yönelik çözümleme yapabilme"
          },
          {
            "outcomeCode": "T.O.5.15",
            "questionCount": 1,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "Metnin anahtar kelimelerini belirlemeye yönelik çözümleme yapabilme"
          },
          {
            "outcomeCode": "T.O.5.19",
            "questionCount": 1,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "Metindeki söz sanatlarını belirlemeye yönelik çözümleme yapabilme"
          },
          {
            "outcomeCode": "T.Y.5.15",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Uygun bağlantı ifadelerini kullanabilme"
          },
          {
            "outcomeCode": "T.Y.5.16",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Yazım ve noktalama işaretleriyle ilgili kuralları uygulayabilme"
          }
        ],
        "sourceOrigin": "meb_official"
      },
      {
        "id": "senaryo_3",
        "name": "Senaryo 3 (7 Soru)",
        "description": "MEB ÖDSGM 2026-2027 1. Dönem 2. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 3 (7 Soru) formatı (Toplam 100 Puan).",
        "totalQuestions": 7,
        "distributions": [
          {
            "outcomeCode": "T.O.5.5",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Metinde geçen anlamını bilmediği söz varlığı unsurlarının anlamını tahmin edebilme"
          },
          {
            "outcomeCode": "T.O.5.6",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Metnin yüzey anlamını belirleyebilme"
          },
          {
            "outcomeCode": "T.O.5.13",
            "questionCount": 1,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "Öyküleyici metinde hikâye unsurlarını belirlemeye yönelik çözümleme yapabilme"
          },
          {
            "outcomeCode": "T.O.5.17",
            "questionCount": 1,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "Şiirin biçim özelliklerini belirlemeye yönelik çözümleme yapabilme"
          },
          {
            "outcomeCode": "T.O.5.18",
            "questionCount": 1,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "Bilgilendirici metinde düşünceyi geliştirme yollarını belirlemeye yönelik çözümleme yapabilme"
          },
          {
            "outcomeCode": "T.O.5.19",
            "questionCount": 1,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "Metindeki söz sanatlarını belirlemeye yönelik çözümleme yapabilme"
          },
          {
            "outcomeCode": "T.Y.5.5",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Yaratıcı yazı yazabilme"
          }
        ],
        "sourceOrigin": "meb_official"
      },
      {
        "id": "senaryo_4",
        "name": "Senaryo 4 (7 Soru)",
        "description": "MEB ÖDSGM 2026-2027 1. Dönem 2. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 4 (7 Soru) formatı (Toplam 100 Puan).",
        "totalQuestions": 7,
        "distributions": [
          {
            "outcomeCode": "T.O.5.7",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Görselle iletilen anlamı belirleyebilme"
          },
          {
            "outcomeCode": "T.O.5.13",
            "questionCount": 1,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "Öyküleyici metinde hikâye unsurlarını belirlemeye yönelik çözümleme yapabilme"
          },
          {
            "outcomeCode": "T.O.5.17",
            "questionCount": 1,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "Şiirin biçim özelliklerini belirlemeye yönelik çözümleme yapabilme"
          },
          {
            "outcomeCode": "T.O.5.18",
            "questionCount": 1,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "Bilgilendirici metinde düşünceyi geliştirme yollarını belirlemeye yönelik çözümleme yapabilme"
          },
          {
            "outcomeCode": "T.O.5.20",
            "questionCount": 1,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "Metinden hareketle söz varlığını geliştirmeye yönelik çözümleme yapabilme"
          },
          {
            "outcomeCode": "T.Y.5.15",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Uygun bağlantı ifadelerini kullanabilme"
          },
          {
            "outcomeCode": "T.Y.5.16",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Yazım ve noktalama işaretleriyle ilgili kuralları uygulayabilme"
          }
        ],
        "sourceOrigin": "meb_official"
      },
      {
        "id": "senaryo_5",
        "name": "Senaryo 5 (8 Soru)",
        "description": "MEB ÖDSGM 2026-2027 1. Dönem 2. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 5 (8 Soru) formatı (Toplam 100 Puan).",
        "totalQuestions": 8,
        "distributions": [
          {
            "outcomeCode": "T.O.5.6",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Metnin yüzey anlamını belirleyebilme"
          },
          {
            "outcomeCode": "T.O.5.11",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Metindeki unsurları sınıflandırabilme"
          },
          {
            "outcomeCode": "T.O.5.13",
            "questionCount": 1,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "Öyküleyici metinde hikâye unsurlarını belirlemeye yönelik çözümleme yapabilme"
          },
          {
            "outcomeCode": "T.O.5.17",
            "questionCount": 1,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "Şiirin biçim özelliklerini belirlemeye yönelik çözümleme yapabilme"
          },
          {
            "outcomeCode": "T.O.5.18",
            "questionCount": 1,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "Bilgilendirici metinde düşünceyi geliştirme yollarını belirlemeye yönelik çözümleme yapabilme"
          },
          {
            "outcomeCode": "T.O.5.19",
            "questionCount": 1,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "Metindeki söz sanatlarını belirlemeye yönelik çözümleme yapabilme"
          },
          {
            "outcomeCode": "T.Y.5.5",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Yaratıcı yazı yazabilme"
          },
          {
            "outcomeCode": "T.Y.5.8",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Yazısında sınıflandırma yapabilme"
          }
        ],
        "sourceOrigin": "meb_official"
      },
      {
        "id": "senaryo_6",
        "name": "Senaryo 6 (8 Soru)",
        "description": "MEB ÖDSGM 2026-2027 1. Dönem 2. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 6 (8 Soru) formatı (Toplam 100 Puan).",
        "totalQuestions": 8,
        "distributions": [
          {
            "outcomeCode": "T.O.5.7",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Görselle iletilen anlamı belirleyebilme"
          },
          {
            "outcomeCode": "T.O.5.11",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Metindeki unsurları sınıflandırabilme"
          },
          {
            "outcomeCode": "T.O.5.13",
            "questionCount": 1,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "Öyküleyici metinde hikâye unsurlarını belirlemeye yönelik çözümleme yapabilme"
          },
          {
            "outcomeCode": "T.O.5.18",
            "questionCount": 1,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "Bilgilendirici metinde düşünceyi geliştirme yollarını belirlemeye yönelik çözümleme yapabilme"
          },
          {
            "outcomeCode": "T.O.5.19",
            "questionCount": 1,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "Metindeki söz sanatlarını belirlemeye yönelik çözümleme yapabilme"
          },
          {
            "outcomeCode": "T.O.5.20",
            "questionCount": 1,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "Metinden hareketle söz varlığını geliştirmeye yönelik çözümleme yapabilme"
          },
          {
            "outcomeCode": "T.Y.5.8",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Yazısında sınıflandırma yapabilme"
          },
          {
            "outcomeCode": "T.Y.5.13",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Yazısını zenginleştirecek biçimde söz varlığını kullanabilme"
          }
        ],
        "sourceOrigin": "meb_official"
      },
      {
        "id": "senaryo_7",
        "name": "Senaryo 7 (9 Soru)",
        "description": "MEB ÖDSGM 2026-2027 1. Dönem 2. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 7 (9 Soru) formatı (Toplam 100 Puan).",
        "totalQuestions": 9,
        "distributions": [
          {
            "outcomeCode": "T.O.5.5",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Metinde geçen anlamını bilmediği söz varlığı unsurlarının anlamını tahmin edebilme"
          },
          {
            "outcomeCode": "T.O.5.6",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Metnin yüzey anlamını belirleyebilme"
          },
          {
            "outcomeCode": "T.O.5.11",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Metindeki unsurları sınıflandırabilme"
          },
          {
            "outcomeCode": "T.O.5.13",
            "questionCount": 1,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "Öyküleyici metinde hikâye unsurlarını belirlemeye yönelik çözümleme yapabilme"
          },
          {
            "outcomeCode": "T.O.5.17",
            "questionCount": 1,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "Şiirin biçim özelliklerini belirlemeye yönelik çözümleme yapabilme"
          },
          {
            "outcomeCode": "T.O.5.18",
            "questionCount": 1,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "Bilgilendirici metinde düşünceyi geliştirme yollarını belirlemeye yönelik çözümleme yapabilme"
          },
          {
            "outcomeCode": "T.O.5.19",
            "questionCount": 1,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "Metindeki söz sanatlarını belirlemeye yönelik çözümleme yapabilme"
          },
          {
            "outcomeCode": "T.Y.5.15",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Uygun bağlantı ifadelerini kullanabilme"
          },
          {
            "outcomeCode": "T.Y.5.16",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Yazım ve noktalama işaretleriyle ilgili kuralları uygulayabilme"
          }
        ],
        "sourceOrigin": "meb_official"
      }
    ],
    "matematik": [
      {
        "id": "senaryo_1",
        "name": "Senaryo 1 (8 Soru)",
        "description": "MEB ÖDSGM 2026-2027 1. Dönem 2. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 1 (8 Soru) formatı (Toplam 100 Puan).",
        "totalQuestions": 8,
        "distributions": [
          {
            "outcomeCode": "MAT.5.3.7",
            "questionCount": 2,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "Matematiksel araç ve teknoloji yardımıyla düzlemde iki noktada kesişen çember çiftinin merkezleri ve kesişim noktalarınd"
          },
          {
            "outcomeCode": "MAT.5.1.1",
            "questionCount": 2,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "Basamak Değerlerini Çözümleme"
          },
          {
            "outcomeCode": "MAT.5.1.2",
            "questionCount": 2,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "Doğal Sayılarla Dört İşlem İçeren Problem Çözme"
          },
          {
            "outcomeCode": "MAT.5.4.1",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Dikdörtgenin Çevre Uzunluğu ve Alanı"
          },
          {
            "outcomeCode": "MAT.5.4.2",
            "questionCount": 1,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "Birim karelerden yola çıkarak dikdörtgenin alanını değerlendirebilme"
          }
        ],
        "sourceOrigin": "meb_official"
      },
      {
        "id": "senaryo_2",
        "name": "Senaryo 2 (8 Soru)",
        "description": "MEB ÖDSGM 2026-2027 1. Dönem 2. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 2 (8 Soru) formatı (Toplam 100 Puan).",
        "totalQuestions": 8,
        "distributions": [
          {
            "outcomeCode": "MAT.5.3.6",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Çokgenlerin özellikleri ile ilgili edindiği deneyimleri yansıtabilme"
          },
          {
            "outcomeCode": "MAT.5.3.7",
            "questionCount": 2,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "Matematiksel araç ve teknoloji yardımıyla düzlemde iki noktada kesişen çember çiftinin merkezleri ve kesişim noktalarınd"
          },
          {
            "outcomeCode": "MAT.5.1.1",
            "questionCount": 2,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "Basamak Değerlerini Çözümleme"
          },
          {
            "outcomeCode": "MAT.5.1.2",
            "questionCount": 2,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "Doğal Sayılarla Dört İşlem İçeren Problem Çözme"
          },
          {
            "outcomeCode": "MAT.5.4.1",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Dikdörtgenin Çevre Uzunluğu ve Alanı"
          }
        ],
        "sourceOrigin": "meb_official"
      },
      {
        "id": "senaryo_3",
        "name": "Senaryo 3 (7 Soru)",
        "description": "MEB ÖDSGM 2026-2027 1. Dönem 2. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 3 (7 Soru) formatı (Toplam 100 Puan).",
        "totalQuestions": 7,
        "distributions": [
          {
            "outcomeCode": "MAT.5.3.5",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Çokgenler ve Çember"
          },
          {
            "outcomeCode": "MAT.5.3.7",
            "questionCount": 1,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "Matematiksel araç ve teknoloji yardımıyla düzlemde iki noktada kesişen çember çiftinin merkezleri ve kesişim noktalarınd"
          },
          {
            "outcomeCode": "MAT.5.1.1",
            "questionCount": 2,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "Basamak Değerlerini Çözümleme"
          },
          {
            "outcomeCode": "MAT.5.1.2",
            "questionCount": 2,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "Doğal Sayılarla Dört İşlem İçeren Problem Çözme"
          },
          {
            "outcomeCode": "MAT.5.4.1",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Dikdörtgenin Çevre Uzunluğu ve Alanı"
          }
        ],
        "sourceOrigin": "meb_official"
      },
      {
        "id": "senaryo_4",
        "name": "Senaryo 4 (6 Soru)",
        "description": "MEB ÖDSGM 2026-2027 1. Dönem 2. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 4 (6 Soru) formatı (Toplam 100 Puan).",
        "totalQuestions": 6,
        "distributions": [
          {
            "outcomeCode": "MAT.5.3.6",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Çokgenlerin özellikleri ile ilgili edindiği deneyimleri yansıtabilme"
          },
          {
            "outcomeCode": "MAT.5.3.7",
            "questionCount": 1,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "Matematiksel araç ve teknoloji yardımıyla düzlemde iki noktada kesişen çember çiftinin merkezleri ve kesişim noktalarınd"
          },
          {
            "outcomeCode": "MAT.5.1.1",
            "questionCount": 2,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "Basamak Değerlerini Çözümleme"
          },
          {
            "outcomeCode": "MAT.5.1.2",
            "questionCount": 2,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "Doğal Sayılarla Dört İşlem İçeren Problem Çözme"
          }
        ],
        "sourceOrigin": "meb_official"
      },
      {
        "id": "senaryo_5",
        "name": "Senaryo 5 (6 Soru)",
        "description": "MEB ÖDSGM 2026-2027 1. Dönem 2. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 5 (6 Soru) formatı (Toplam 100 Puan).",
        "totalQuestions": 6,
        "distributions": [
          {
            "outcomeCode": "MAT.5.3.5",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Çokgenler ve Çember"
          },
          {
            "outcomeCode": "MAT.5.3.6",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Çokgenlerin özellikleri ile ilgili edindiği deneyimleri yansıtabilme"
          },
          {
            "outcomeCode": "MAT.5.3.7",
            "questionCount": 1,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "Matematiksel araç ve teknoloji yardımıyla düzlemde iki noktada kesişen çember çiftinin merkezleri ve kesişim noktalarınd"
          },
          {
            "outcomeCode": "MAT.5.1.1",
            "questionCount": 1,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "Basamak Değerlerini Çözümleme"
          },
          {
            "outcomeCode": "MAT.5.1.2",
            "questionCount": 2,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "Doğal Sayılarla Dört İşlem İçeren Problem Çözme"
          }
        ],
        "sourceOrigin": "meb_official"
      }
    ],
    "fen_bilimleri": [
      {
        "id": "senaryo_1",
        "name": "Senaryo 1 (9 Soru)",
        "description": "MEB ÖDSGM 2026-2027 1. Dönem 2. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 1 (9 Soru) formatı (Toplam 100 Puan).",
        "totalQuestions": 9,
        "distributions": [
          {
            "outcomeCode": "FB.5.1.4",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Dünya’mız ve Gökyüzündeki Komşularımız"
          },
          {
            "outcomeCode": "FB.5.2.1",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Kuvvet ve Kuvvetin Ölçülmesi"
          },
          {
            "outcomeCode": "FB.5.2.3",
            "questionCount": 2,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Kütle ve Ağırlık İlişkisi"
          },
          {
            "outcomeCode": "FB.5.2.4",
            "questionCount": 2,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Sürtünme Kuvveti"
          },
          {
            "outcomeCode": "FB.5.3.1",
            "questionCount": 2,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Hücre ve Organelleri"
          },
          {
            "outcomeCode": "FB.5.3.2",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Hücre-doku-organ-sistem-organizma kavramlarını yapılandırabilme"
          }
        ],
        "sourceOrigin": "meb_official"
      },
      {
        "id": "senaryo_2",
        "name": "Senaryo 2 (7 Soru)",
        "description": "MEB ÖDSGM 2026-2027 1. Dönem 2. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 2 (7 Soru) formatı (Toplam 100 Puan).",
        "totalQuestions": 7,
        "distributions": [
          {
            "outcomeCode": "FB.5.1.3",
            "questionCount": 2,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Ay’ın evrelerini temsil eden bilimsel model oluşturabilme"
          },
          {
            "outcomeCode": "FB.5.2.3",
            "questionCount": 2,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Kütle ve Ağırlık İlişkisi"
          },
          {
            "outcomeCode": "FB.5.2.4",
            "questionCount": 2,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Sürtünme Kuvveti"
          },
          {
            "outcomeCode": "FB.5.3.2",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Hücre-doku-organ-sistem-organizma kavramlarını yapılandırabilme"
          }
        ],
        "sourceOrigin": "meb_official"
      },
      {
        "id": "senaryo_3",
        "name": "Senaryo 3 (8 Soru)",
        "description": "MEB ÖDSGM 2026-2027 1. Dönem 2. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 3 (8 Soru) formatı (Toplam 100 Puan).",
        "totalQuestions": 8,
        "distributions": [
          {
            "outcomeCode": "FB.5.1.3",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Ay’ın evrelerini temsil eden bilimsel model oluşturabilme"
          },
          {
            "outcomeCode": "FB.5.1.4",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Dünya’mız ve Gökyüzündeki Komşularımız"
          },
          {
            "outcomeCode": "FB.5.2.3",
            "questionCount": 2,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Kütle ve Ağırlık İlişkisi"
          },
          {
            "outcomeCode": "FB.5.2.4",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Sürtünme Kuvveti"
          },
          {
            "outcomeCode": "FB.5.3.1",
            "questionCount": 2,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Hücre ve Organelleri"
          },
          {
            "outcomeCode": "FB.5.3.2",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Hücre-doku-organ-sistem-organizma kavramlarını yapılandırabilme"
          }
        ],
        "sourceOrigin": "meb_official"
      },
      {
        "id": "senaryo_4",
        "name": "Senaryo 4 (8 Soru)",
        "description": "MEB ÖDSGM 2026-2027 1. Dönem 2. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 4 (8 Soru) formatı (Toplam 100 Puan).",
        "totalQuestions": 8,
        "distributions": [
          {
            "outcomeCode": "FB.5.1.2",
            "questionCount": 1,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "Gökyüzündeki Komşumuz: Ay"
          },
          {
            "outcomeCode": "FB.5.1.3",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Ay’ın evrelerini temsil eden bilimsel model oluşturabilme"
          },
          {
            "outcomeCode": "FB.5.2.1",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Kuvvet ve Kuvvetin Ölçülmesi"
          },
          {
            "outcomeCode": "FB.5.2.3",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Kütle ve Ağırlık İlişkisi"
          },
          {
            "outcomeCode": "FB.5.2.4",
            "questionCount": 2,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Sürtünme Kuvveti"
          },
          {
            "outcomeCode": "FB.5.3.1",
            "questionCount": 2,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Hücre ve Organelleri"
          }
        ],
        "sourceOrigin": "meb_official"
      },
      {
        "id": "senaryo_5",
        "name": "Senaryo 5 (7 Soru)",
        "description": "MEB ÖDSGM 2026-2027 1. Dönem 2. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 5 (7 Soru) formatı (Toplam 100 Puan).",
        "totalQuestions": 7,
        "distributions": [
          {
            "outcomeCode": "FB.5.1.2",
            "questionCount": 1,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "Gökyüzündeki Komşumuz: Ay"
          },
          {
            "outcomeCode": "FB.5.2.1",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Kuvvet ve Kuvvetin Ölçülmesi"
          },
          {
            "outcomeCode": "FB.5.2.3",
            "questionCount": 2,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Kütle ve Ağırlık İlişkisi"
          },
          {
            "outcomeCode": "FB.5.2.4",
            "questionCount": 3,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Sürtünme Kuvveti"
          }
        ],
        "sourceOrigin": "meb_official"
      }
    ],
    "sosyal_bilgiler": [
      {
        "id": "senaryo_1",
        "name": "Senaryo 1 (6 Soru)",
        "description": "MEB ÖDSGM 2026-2027 1. Dönem 2. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 1 (6 Soru) formatı (Toplam 100 Puan).",
        "totalQuestions": 6,
        "distributions": [
          {
            "outcomeCode": "SB.5.2.1",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Yaşadığı İlin Göreceli Konumu"
          },
          {
            "outcomeCode": "SB.5.2.2",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Yaşadığı İlde Doğal ve Beşerî Çevredeki Değişim"
          },
          {
            "outcomeCode": "SB.5.2.3.Yaşadığı",
            "questionCount": 2,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Yaşadığı İlde Meydana Gelebilecek Afetlerin Etkileri"
          },
          {
            "outcomeCode": "SB.5.2.4",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Ülkemize Komşu Devletler"
          },
          {
            "outcomeCode": "SB.5.3.1",
            "questionCount": 1,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "Ortak Miras Ögeleri"
          }
        ],
        "sourceOrigin": "meb_official"
      },
      {
        "id": "senaryo_2",
        "name": "Senaryo 2 (7 Soru)",
        "description": "MEB ÖDSGM 2026-2027 1. Dönem 2. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 2 (7 Soru) formatı (Toplam 100 Puan).",
        "totalQuestions": 7,
        "distributions": [
          {
            "outcomeCode": "SB.5.1.3",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Yardımlaşma ve Dayanışma Faaliyetlerinin Toplumsal Birliğe Etkisi"
          },
          {
            "outcomeCode": "SB.5.2.2",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Yaşadığı İlde Doğal ve Beşerî Çevredeki Değişim"
          },
          {
            "outcomeCode": "SB.5.2.3.Yaşadığı",
            "questionCount": 2,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Yaşadığı İlde Meydana Gelebilecek Afetlerin Etkileri"
          },
          {
            "outcomeCode": "SB.5.2.4",
            "questionCount": 2,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Ülkemize Komşu Devletler"
          },
          {
            "outcomeCode": "SB.5.3.1",
            "questionCount": 1,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "Ortak Miras Ögeleri"
          }
        ],
        "sourceOrigin": "meb_official"
      },
      {
        "id": "senaryo_3",
        "name": "Senaryo 3 (8 Soru)",
        "description": "MEB ÖDSGM 2026-2027 1. Dönem 2. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 3 (8 Soru) formatı (Toplam 100 Puan).",
        "totalQuestions": 8,
        "distributions": [
          {
            "outcomeCode": "SB.5.1.2",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Kültürel Özelliklere Saygı ve Birlikte Yaşama Kültürü"
          },
          {
            "outcomeCode": "SB.5.1.3",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Yardımlaşma ve Dayanışma Faaliyetlerinin Toplumsal Birliğe Etkisi"
          },
          {
            "outcomeCode": "SB.5.2.2",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Yaşadığı İlde Doğal ve Beşerî Çevredeki Değişim"
          },
          {
            "outcomeCode": "SB.5.2.3.Yaşadığı",
            "questionCount": 2,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Yaşadığı İlde Meydana Gelebilecek Afetlerin Etkileri"
          },
          {
            "outcomeCode": "SB.5.2.4",
            "questionCount": 2,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Ülkemize Komşu Devletler"
          },
          {
            "outcomeCode": "SB.5.3.1",
            "questionCount": 1,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "Ortak Miras Ögeleri"
          }
        ],
        "sourceOrigin": "meb_official"
      },
      {
        "id": "senaryo_4",
        "name": "Senaryo 4 (6 Soru)",
        "description": "MEB ÖDSGM 2026-2027 1. Dönem 2. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 4 (6 Soru) formatı (Toplam 100 Puan).",
        "totalQuestions": 6,
        "distributions": [
          {
            "outcomeCode": "SB.5.2.1",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Yaşadığı İlin Göreceli Konumu"
          },
          {
            "outcomeCode": "SB.5.2.2",
            "questionCount": 2,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Yaşadığı İlde Doğal ve Beşerî Çevredeki Değişim"
          },
          {
            "outcomeCode": "SB.5.2.3.Yaşadığı",
            "questionCount": 2,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Yaşadığı İlde Meydana Gelebilecek Afetlerin Etkileri"
          },
          {
            "outcomeCode": "SB.5.2.4",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Ülkemize Komşu Devletler"
          }
        ],
        "sourceOrigin": "meb_official"
      },
      {
        "id": "senaryo_5",
        "name": "Senaryo 5 (7 Soru)",
        "description": "MEB ÖDSGM 2026-2027 1. Dönem 2. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 5 (7 Soru) formatı (Toplam 100 Puan).",
        "totalQuestions": 7,
        "distributions": [
          {
            "outcomeCode": "SB.5.1.3",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Yardımlaşma ve Dayanışma Faaliyetlerinin Toplumsal Birliğe Etkisi"
          },
          {
            "outcomeCode": "SB.5.2.2",
            "questionCount": 2,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Yaşadığı İlde Doğal ve Beşerî Çevredeki Değişim"
          },
          {
            "outcomeCode": "SB.5.2.3.Yaşadığı",
            "questionCount": 2,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Yaşadığı İlde Meydana Gelebilecek Afetlerin Etkileri"
          },
          {
            "outcomeCode": "SB.5.2.4",
            "questionCount": 2,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Ülkemize Komşu Devletler"
          }
        ],
        "sourceOrigin": "meb_official"
      },
      {
        "id": "senaryo_6",
        "name": "Senaryo 6 (8 Soru)",
        "description": "MEB ÖDSGM 2026-2027 1. Dönem 2. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 6 (8 Soru) formatı (Toplam 100 Puan).",
        "totalQuestions": 8,
        "distributions": [
          {
            "outcomeCode": "SB.5.1.3",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Yardımlaşma ve Dayanışma Faaliyetlerinin Toplumsal Birliğe Etkisi"
          },
          {
            "outcomeCode": "SB.5.2.1",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Yaşadığı İlin Göreceli Konumu"
          },
          {
            "outcomeCode": "SB.5.2.2",
            "questionCount": 2,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Yaşadığı İlde Doğal ve Beşerî Çevredeki Değişim"
          },
          {
            "outcomeCode": "SB.5.2.3.Yaşadığı",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Yaşadığı İlde Meydana Gelebilecek Afetlerin Etkileri"
          },
          {
            "outcomeCode": "SB.5.2.4",
            "questionCount": 2,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Ülkemize Komşu Devletler"
          },
          {
            "outcomeCode": "SB.5.3.1",
            "questionCount": 1,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "Ortak Miras Ögeleri"
          }
        ],
        "sourceOrigin": "meb_official"
      },
      {
        "id": "senaryo_7",
        "name": "Senaryo 7 (8 Soru)",
        "description": "MEB ÖDSGM 2026-2027 1. Dönem 2. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 7 (8 Soru) formatı (Toplam 100 Puan).",
        "totalQuestions": 8,
        "distributions": [
          {
            "outcomeCode": "SB.5.1.1",
            "questionCount": 1,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "Gruplar ve Roller"
          },
          {
            "outcomeCode": "SB.5.2.2",
            "questionCount": 2,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Yaşadığı İlde Doğal ve Beşerî Çevredeki Değişim"
          },
          {
            "outcomeCode": "SB.5.2.3.Yaşadığı",
            "questionCount": 2,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Yaşadığı İlde Meydana Gelebilecek Afetlerin Etkileri"
          },
          {
            "outcomeCode": "SB.5.2.4",
            "questionCount": 2,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Ülkemize Komşu Devletler"
          },
          {
            "outcomeCode": "SB.5.3.1",
            "questionCount": 1,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "Ortak Miras Ögeleri"
          }
        ],
        "sourceOrigin": "meb_official"
      }
    ],
    "din_kulturu": [
      {
        "id": "senaryo_1",
        "name": "Senaryo 1 (8 Soru)",
        "description": "MEB ÖDSGM 2026-2027 1. Dönem 2. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 1 (8 Soru) formatı (Toplam 100 Puan).",
        "totalQuestions": 8,
        "distributions": [
          {
            "outcomeCode": "DKAB.5.1.2",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Allah’ın Varlığı ve Birliği"
          },
          {
            "outcomeCode": "DKAB.5.1.4",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Bir Sure Öğreniyorum: İhlas Suresi"
          },
          {
            "outcomeCode": "DKAB.5.2.1",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Allah’ın Huzurunda Olmak: Namaz"
          },
          {
            "outcomeCode": "DKAB.5.2.2",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Namazın Kılınışı"
          },
          {
            "outcomeCode": "DKAB.5.2.3",
            "questionCount": 2,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Namazın İnsana Kazandırdıkları"
          },
          {
            "outcomeCode": "DKAB.5.2.4",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Bir Dua Öğreniyorum: Tahiyyat Duası"
          },
          {
            "outcomeCode": "DKAB.5.3.1",
            "questionCount": 1,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "Kur’an-ı Kerim’in \nİç Düzeni"
          }
        ],
        "sourceOrigin": "meb_official"
      },
      {
        "id": "senaryo_2",
        "name": "Senaryo 2 (7 Soru)",
        "description": "MEB ÖDSGM 2026-2027 1. Dönem 2. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 2 (7 Soru) formatı (Toplam 100 Puan).",
        "totalQuestions": 7,
        "distributions": [
          {
            "outcomeCode": "DKAB.5.1.2",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Allah’ın Varlığı ve Birliği"
          },
          {
            "outcomeCode": "DKAB.5.2.1",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Allah’ın Huzurunda Olmak: Namaz"
          },
          {
            "outcomeCode": "DKAB.5.2.2",
            "questionCount": 2,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Namazın Kılınışı"
          },
          {
            "outcomeCode": "DKAB.5.2.3",
            "questionCount": 2,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Namazın İnsana Kazandırdıkları"
          },
          {
            "outcomeCode": "DKAB.5.2.4",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Bir Dua Öğreniyorum: Tahiyyat Duası"
          }
        ],
        "sourceOrigin": "meb_official"
      },
      {
        "id": "senaryo_3",
        "name": "Senaryo 3 (7 Soru)",
        "description": "MEB ÖDSGM 2026-2027 1. Dönem 2. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 3 (7 Soru) formatı (Toplam 100 Puan).",
        "totalQuestions": 7,
        "distributions": [
          {
            "outcomeCode": "DKAB.5.1.2",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Allah’ın Varlığı ve Birliği"
          },
          {
            "outcomeCode": "DKAB.5.1.3",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Allah’ın Güzel İsimleri"
          },
          {
            "outcomeCode": "DKAB.5.2.2",
            "questionCount": 2,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Namazın Kılınışı"
          },
          {
            "outcomeCode": "DKAB.5.2.3",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Namazın İnsana Kazandırdıkları"
          },
          {
            "outcomeCode": "DKAB.5.2.4",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Bir Dua Öğreniyorum: Tahiyyat Duası"
          },
          {
            "outcomeCode": "DKAB.5.3.1",
            "questionCount": 1,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "Kur’an-ı Kerim’in \nİç Düzeni"
          }
        ],
        "sourceOrigin": "meb_official"
      },
      {
        "id": "senaryo_4",
        "name": "Senaryo 4 (7 Soru)",
        "description": "MEB ÖDSGM 2026-2027 1. Dönem 2. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 4 (7 Soru) formatı (Toplam 100 Puan).",
        "totalQuestions": 7,
        "distributions": [
          {
            "outcomeCode": "DKAB.5.1.1",
            "questionCount": 1,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "Evrendeki Mükemmel Düzen"
          },
          {
            "outcomeCode": "DKAB.5.1.3",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Allah’ın Güzel İsimleri"
          },
          {
            "outcomeCode": "DKAB.5.2.1",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Allah’ın Huzurunda Olmak: Namaz"
          },
          {
            "outcomeCode": "DKAB.5.2.2",
            "questionCount": 2,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Namazın Kılınışı"
          },
          {
            "outcomeCode": "DKAB.5.2.3",
            "questionCount": 2,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Namazın İnsana Kazandırdıkları"
          }
        ],
        "sourceOrigin": "meb_official"
      },
      {
        "id": "senaryo_5",
        "name": "Senaryo 5 (6 Soru)",
        "description": "MEB ÖDSGM 2026-2027 1. Dönem 2. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 5 (6 Soru) formatı (Toplam 100 Puan).",
        "totalQuestions": 6,
        "distributions": [
          {
            "outcomeCode": "DKAB.5.1.1",
            "questionCount": 1,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "Evrendeki Mükemmel Düzen"
          },
          {
            "outcomeCode": "DKAB.5.1.2",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Allah’ın Varlığı ve Birliği"
          },
          {
            "outcomeCode": "DKAB.5.2.1",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Allah’ın Huzurunda Olmak: Namaz"
          },
          {
            "outcomeCode": "DKAB.5.2.2",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Namazın Kılınışı"
          },
          {
            "outcomeCode": "DKAB.5.2.3",
            "questionCount": 2,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Namazın İnsana Kazandırdıkları"
          }
        ],
        "sourceOrigin": "meb_official"
      }
    ],
    "ingilizce": [
      {
        "id": "senaryo_1",
        "name": "Senaryo 1 (5 Soru)",
        "description": "MEB ÖDSGM 2026-2027 1. Dönem 2. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 1 (5 Soru) formatı (Toplam 100 Puan).",
        "totalQuestions": 5,
        "distributions": [
          {
            "outcomeCode": "ENG.5.1.R3",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Students can make meaning of / derive meaning from the current content about “school life with people, places and rules "
          },
          {
            "outcomeCode": "ENG.5.1.G1",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Students can select and use the target grammatical elements of the current content about “school life with people, place"
          },
          {
            "outcomeCode": "ENG.5.1.W4",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Students can individually construct/form content for the assigned writing task on the current content “school life with "
          },
          {
            "outcomeCode": "ENG.5.2.R3",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Students can make meaning of / derive meaning from the current content about “classroom life with classroom rules and la"
          },
          {
            "outcomeCode": "ENG.5.3.R2",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Students can bring information about the current content on “personal life with basic body parts and physical features; "
          }
        ],
        "sourceOrigin": "meb_official"
      },
      {
        "id": "senaryo_2",
        "name": "Senaryo 2 (6 Soru)",
        "description": "MEB ÖDSGM 2026-2027 1. Dönem 2. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 2 (6 Soru) formatı (Toplam 100 Puan).",
        "totalQuestions": 6,
        "distributions": [
          {
            "outcomeCode": "ENG.5.1.R2",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Students can bring information about the current content on “school life with people, places and rules at school; school"
          },
          {
            "outcomeCode": "ENG.5.1.G1",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Students can select and use the target grammatical elements of the current content about “school life with people, place"
          },
          {
            "outcomeCode": "ENG.5.2.R3",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Students can make meaning of / derive meaning from the current content about “classroom life with classroom rules and la"
          },
          {
            "outcomeCode": "ENG.5.2.V1",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Students can select and use the target vocabulary of the current content about “classroom life with classroom rules and "
          },
          {
            "outcomeCode": "ENG.5.2.W3",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Students can organise a content for the assigned writing task on the current content “classroom life with classroom rule"
          },
          {
            "outcomeCode": "ENG.5.3.V1",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Students can select and use the target vocabulary of the current content about “personal life with basic body parts and "
          }
        ],
        "sourceOrigin": "meb_official"
      },
      {
        "id": "senaryo_3",
        "name": "Senaryo 3 (6 Soru)",
        "description": "MEB ÖDSGM 2026-2027 1. Dönem 2. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 3 (6 Soru) formatı (Toplam 100 Puan).",
        "totalQuestions": 6,
        "distributions": [
          {
            "outcomeCode": "ENG.5.1.R3",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Students can make meaning of / derive meaning from the current content about “school life with people, places and rules "
          },
          {
            "outcomeCode": "ENG.5.1.V1",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Students can select and use the target vocabulary of the current content about “school life with people, places and rule"
          },
          {
            "outcomeCode": "ENG.5.2.R2",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Students can bring information about the current content on “classroom life with classroom rules and language; school su"
          },
          {
            "outcomeCode": "ENG.5.2.W4",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Students can individually construct/form content for the assigned writing task on the current content “classroom life wi"
          },
          {
            "outcomeCode": "ENG.5.3.R2",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Students can bring information about the current content on “personal life with basic body parts and physical features; "
          },
          {
            "outcomeCode": "ENG.5.3.G1",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Students can select and use the target grammatical elements of the current content about “personal life with basic body "
          }
        ],
        "sourceOrigin": "meb_official"
      },
      {
        "id": "senaryo_4",
        "name": "Senaryo 4 (7 Soru)",
        "description": "MEB ÖDSGM 2026-2027 1. Dönem 2. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 4 (7 Soru) formatı (Toplam 100 Puan).",
        "totalQuestions": 7,
        "distributions": [
          {
            "outcomeCode": "ENG.5.1.R2",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Students can bring information about the current content on “school life with people, places and rules at school; school"
          },
          {
            "outcomeCode": "ENG.5.1.W3",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Students can organise a content for the assigned writing task on the current content “school life with people, places an"
          },
          {
            "outcomeCode": "ENG.5.2.R2",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Students can bring information about the current content on “classroom life with classroom rules and language; school su"
          },
          {
            "outcomeCode": "ENG.5.2.V1",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Students can select and use the target vocabulary of the current content about “classroom life with classroom rules and "
          },
          {
            "outcomeCode": "ENG.5.2.G1",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Students can select and use the target grammatical elements of the current content about “classroom life with classroom "
          },
          {
            "outcomeCode": "ENG.5.3.R3",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Students can make meaning of / derive meaning from the current content about “personal life with basic body parts and ph"
          },
          {
            "outcomeCode": "ENG.5.3.V1",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Students can select and use the target vocabulary of the current content about “personal life with basic body parts and "
          }
        ],
        "sourceOrigin": "meb_official"
      },
      {
        "id": "senaryo_5",
        "name": "Senaryo 5 (8 Soru)",
        "description": "MEB ÖDSGM 2026-2027 1. Dönem 2. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 5 (8 Soru) formatı (Toplam 100 Puan).",
        "totalQuestions": 8,
        "distributions": [
          {
            "outcomeCode": "ENG.5.1.R2",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Students can bring information about the current content on “school life with people, places and rules at school; school"
          },
          {
            "outcomeCode": "ENG.5.1.V1",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Students can select and use the target vocabulary of the current content about “school life with people, places and rule"
          },
          {
            "outcomeCode": "ENG.5.2.R2",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Students can bring information about the current content on “classroom life with classroom rules and language; school su"
          },
          {
            "outcomeCode": "ENG.5.2.R3",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Students can make meaning of / derive meaning from the current content about “classroom life with classroom rules and la"
          },
          {
            "outcomeCode": "ENG.5.2.V1",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Students can select and use the target vocabulary of the current content about “classroom life with classroom rules and "
          },
          {
            "outcomeCode": "ENG.5.3.R2",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Students can bring information about the current content on “personal life with basic body parts and physical features; "
          },
          {
            "outcomeCode": "ENG.5.3.G1",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Students can select and use the target grammatical elements of the current content about “personal life with basic body "
          },
          {
            "outcomeCode": "ENG.5.3.W3",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Students can organise a content for the assigned writing task on the current content “personal life with basic body part"
          }
        ],
        "sourceOrigin": "meb_official"
      }
    ]
  },
  "6": {
    "turkce": [
      {
        "id": "senaryo_1",
        "name": "Senaryo 1 (6 Soru)",
        "description": "MEB ÖDSGM 2026-2027 1. Dönem 2. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 1 (6 Soru) formatı (Toplam 100 Puan).",
        "totalQuestions": 6,
        "distributions": [
          {
            "outcomeCode": "T.O.6.5",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Metinde geçen anlamını bilmediği söz varlığı unsurlarının anlamını tahmin edebilme"
          },
          {
            "outcomeCode": "T.O.6.6",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Metnin yüzey anlamını belirleyebilme"
          },
          {
            "outcomeCode": "T.O.6.10",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Metin içi karşılaştırma yapabilme"
          },
          {
            "outcomeCode": "T.O.6.16",
            "questionCount": 1,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "Bilgilendirici metinde anahtar kelimeleri belirlemeye yönelik çözümleme yapabilme"
          },
          {
            "outcomeCode": "T.Y.6.7",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Yaratıcı yazı yazabilme"
          },
          {
            "outcomeCode": "T.Y.6.21",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Yazım kuralları ve noktalama işaretlerini uygulayabilme"
          }
        ],
        "sourceOrigin": "meb_official"
      },
      {
        "id": "senaryo_2",
        "name": "Senaryo 2 (7 Soru)",
        "description": "MEB ÖDSGM 2026-2027 1. Dönem 2. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 2 (7 Soru) formatı (Toplam 100 Puan).",
        "totalQuestions": 7,
        "distributions": [
          {
            "outcomeCode": "T.O.6.5",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Metinde geçen anlamını bilmediği söz varlığı unsurlarının anlamını tahmin edebilme"
          },
          {
            "outcomeCode": "T.O.6.7",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Görselle iletilen anlamı belirleyebilme"
          },
          {
            "outcomeCode": "T.O.6.8",
            "questionCount": 1,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "Metnin derin anlamını belirlemeye yönelik basit çıkarımlar yapabilme"
          },
          {
            "outcomeCode": "T.O.6.11",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Metinler arası karşılaştırma yapabilme"
          },
          {
            "outcomeCode": "T.O.6.18",
            "questionCount": 1,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "Şiirin biçim özelliklerini belirlemeye yönelik çözümleme yapabilme"
          },
          {
            "outcomeCode": "T.Y.6.9",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Yazısında karşılaştırma yapabilme"
          },
          {
            "outcomeCode": "T.Y.6.21",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Yazım kuralları ve noktalama işaretlerini uygulayabilme"
          }
        ],
        "sourceOrigin": "meb_official"
      },
      {
        "id": "senaryo_3",
        "name": "Senaryo 3 (7 Soru)",
        "description": "MEB ÖDSGM 2026-2027 1. Dönem 2. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 3 (7 Soru) formatı (Toplam 100 Puan).",
        "totalQuestions": 7,
        "distributions": [
          {
            "outcomeCode": "T.O.6.6",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Metnin yüzey anlamını belirleyebilme"
          },
          {
            "outcomeCode": "T.O.6.8",
            "questionCount": 1,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "Metnin derin anlamını belirlemeye yönelik basit çıkarımlar yapabilme"
          },
          {
            "outcomeCode": "T.O.6.10",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Metin içi karşılaştırma yapabilme"
          },
          {
            "outcomeCode": "T.O.6.12",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Metindeki unsurları sınıflandırabilme"
          },
          {
            "outcomeCode": "T.O.6.21",
            "questionCount": 1,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "Metinden hareketle söz varlığını geliştirmeye yönelik çözümleme yapabilme"
          },
          {
            "outcomeCode": "T.Y.6.7",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Yaratıcı yazı yazabilme"
          },
          {
            "outcomeCode": "T.Y.6.11",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Yorumunu yazılı olarak ifade edebilme"
          }
        ],
        "sourceOrigin": "meb_official"
      },
      {
        "id": "senaryo_4",
        "name": "Senaryo 4 (7 Soru)",
        "description": "MEB ÖDSGM 2026-2027 1. Dönem 2. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 4 (7 Soru) formatı (Toplam 100 Puan).",
        "totalQuestions": 7,
        "distributions": [
          {
            "outcomeCode": "T.O.6.5",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Metinde geçen anlamını bilmediği söz varlığı unsurlarının anlamını tahmin edebilme"
          },
          {
            "outcomeCode": "T.O.6.7",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Görselle iletilen anlamı belirleyebilme"
          },
          {
            "outcomeCode": "T.O.6.9",
            "questionCount": 1,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "Metnin derin anlamını belirlemeye yönelik üst düzey çıkarımlar yapabilme"
          },
          {
            "outcomeCode": "T.O.6.16",
            "questionCount": 1,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "Bilgilendirici metinde anahtar kelimeleri belirlemeye yönelik çözümleme yapabilme"
          },
          {
            "outcomeCode": "T.O.6.18",
            "questionCount": 1,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "Şiirin biçim özelliklerini belirlemeye yönelik çözümleme yapabilme"
          },
          {
            "outcomeCode": "T.Y.6.9",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Yazısında karşılaştırma yapabilme"
          },
          {
            "outcomeCode": "T.Y.6.10",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Yazısında sınıflandırma yapabilme"
          }
        ],
        "sourceOrigin": "meb_official"
      },
      {
        "id": "senaryo_5",
        "name": "Senaryo 5 (8 Soru)",
        "description": "MEB ÖDSGM 2026-2027 1. Dönem 2. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 5 (8 Soru) formatı (Toplam 100 Puan).",
        "totalQuestions": 8,
        "distributions": [
          {
            "outcomeCode": "T.O.6.6",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Metnin yüzey anlamını belirleyebilme"
          },
          {
            "outcomeCode": "T.O.6.7",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Görselle iletilen anlamı belirleyebilme"
          },
          {
            "outcomeCode": "T.O.6.9",
            "questionCount": 1,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "Metnin derin anlamını belirlemeye yönelik üst düzey çıkarımlar yapabilme"
          },
          {
            "outcomeCode": "T.O.6.11",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Metinler arası karşılaştırma yapabilme"
          },
          {
            "outcomeCode": "T.O.6.18",
            "questionCount": 1,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "Şiirin biçim özelliklerini belirlemeye yönelik çözümleme yapabilme"
          },
          {
            "outcomeCode": "T.O.6.19",
            "questionCount": 1,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "Bilgilendirici metinde düşünceyi geliştirme yollarını belirlemeye yönelik çözümleme yapabilme"
          },
          {
            "outcomeCode": "T.Y.6.7",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Yaratıcı yazı yazabilme"
          },
          {
            "outcomeCode": "T.Y.6.21",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Yazım kuralları ve noktalama işaretlerini uygulayabilme"
          }
        ],
        "sourceOrigin": "meb_official"
      },
      {
        "id": "senaryo_6",
        "name": "Senaryo 6 (8 Soru)",
        "description": "MEB ÖDSGM 2026-2027 1. Dönem 2. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 6 (8 Soru) formatı (Toplam 100 Puan).",
        "totalQuestions": 8,
        "distributions": [
          {
            "outcomeCode": "T.O.6.6",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Metnin yüzey anlamını belirleyebilme"
          },
          {
            "outcomeCode": "T.O.6.7",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Görselle iletilen anlamı belirleyebilme"
          },
          {
            "outcomeCode": "T.O.6.9",
            "questionCount": 1,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "Metnin derin anlamını belirlemeye yönelik üst düzey çıkarımlar yapabilme"
          },
          {
            "outcomeCode": "T.O.6.12",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Metindeki unsurları sınıflandırabilme"
          },
          {
            "outcomeCode": "T.O.6.18",
            "questionCount": 1,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "Şiirin biçim özelliklerini belirlemeye yönelik çözümleme yapabilme"
          },
          {
            "outcomeCode": "T.O.6.21",
            "questionCount": 1,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "Metinden hareketle söz varlığını geliştirmeye yönelik çözümleme yapabilme"
          },
          {
            "outcomeCode": "T.Y.6.11",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Yorumunu yazılı olarak ifade edebilme"
          },
          {
            "outcomeCode": "T.Y.6.17",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Yazısında düşünceyi geliştirme yollarını kullanabilme"
          }
        ],
        "sourceOrigin": "meb_official"
      },
      {
        "id": "senaryo_7",
        "name": "Senaryo 7 (9 Soru)",
        "description": "MEB ÖDSGM 2026-2027 1. Dönem 2. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 7 (9 Soru) formatı (Toplam 100 Puan).",
        "totalQuestions": 9,
        "distributions": [
          {
            "outcomeCode": "T.O.6.5",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Metinde geçen anlamını bilmediği söz varlığı unsurlarının anlamını tahmin edebilme"
          },
          {
            "outcomeCode": "T.O.6.6",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Metnin yüzey anlamını belirleyebilme"
          },
          {
            "outcomeCode": "T.O.6.9",
            "questionCount": 1,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "Metnin derin anlamını belirlemeye yönelik üst düzey çıkarımlar yapabilme"
          },
          {
            "outcomeCode": "T.O.6.10",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Metin içi karşılaştırma yapabilme"
          },
          {
            "outcomeCode": "T.O.6.12",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Metindeki unsurları sınıflandırabilme"
          },
          {
            "outcomeCode": "T.O.6.18",
            "questionCount": 1,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "Şiirin biçim özelliklerini belirlemeye yönelik çözümleme yapabilme"
          },
          {
            "outcomeCode": "T.O.6.19",
            "questionCount": 1,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "Bilgilendirici metinde düşünceyi geliştirme yollarını belirlemeye yönelik çözümleme yapabilme"
          },
          {
            "outcomeCode": "T.Y.6.17",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Yazısında düşünceyi geliştirme yollarını kullanabilme"
          },
          {
            "outcomeCode": "T.Y.6.21",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Yazım kuralları ve noktalama işaretlerini uygulayabilme"
          }
        ],
        "sourceOrigin": "meb_official"
      }
    ],
    "matematik": [
      {
        "id": "senaryo_1",
        "name": "Senaryo 1 (7 Soru)",
        "description": "MEB ÖDSGM 2026-2027 1. Dönem 2. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 1 (7 Soru) formatı (Toplam 100 Puan).",
        "totalQuestions": 7,
        "distributions": [
          {
            "outcomeCode": "MAT.6.1.5",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Gerçek yaşam durumlarında ondalık gösterimlerin basamak değerlerini kesirlerden yararlanarak yorumlayabilme"
          },
          {
            "outcomeCode": "MAT.6.1.6",
            "questionCount": 1,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "Kesir ve bölme işlemi arasındaki ilişkiye yönelik tümevarımsal akıl yürütebilme"
          },
          {
            "outcomeCode": "MAT.6.1.7",
            "questionCount": 2,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "Gerçek yaşam durumlarında karşılaşılan kesir, ondalık ve yüzde gösterimleri ile ilgili dört işlem gerektiren problemleri"
          },
          {
            "outcomeCode": "MAT.6.1.8",
            "questionCount": 1,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "Karşılaştığı günlük hayat ya da matematiksel durumlarda standart uzunluk ölçme birimlerini değerlendirebilme"
          },
          {
            "outcomeCode": "MAT.6.5.1",
            "questionCount": 2,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Kategorik veya nicel (kesikli) veri ile çalışabilme ve veriye dayalı karar verebilme"
          }
        ],
        "sourceOrigin": "meb_official"
      },
      {
        "id": "senaryo_2",
        "name": "Senaryo 2 (7 Soru)",
        "description": "MEB ÖDSGM 2026-2027 1. Dönem 2. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 2 (7 Soru) formatı (Toplam 100 Puan).",
        "totalQuestions": 7,
        "distributions": [
          {
            "outcomeCode": "MAT.6.1.6",
            "questionCount": 1,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "Kesir ve bölme işlemi arasındaki ilişkiye yönelik tümevarımsal akıl yürütebilme"
          },
          {
            "outcomeCode": "MAT.6.1.7",
            "questionCount": 2,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "Gerçek yaşam durumlarında karşılaşılan kesir, ondalık ve yüzde gösterimleri ile ilgili dört işlem gerektiren problemleri"
          },
          {
            "outcomeCode": "MAT.6.1.8",
            "questionCount": 2,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "Karşılaştığı günlük hayat ya da matematiksel durumlarda standart uzunluk ölçme birimlerini değerlendirebilme"
          },
          {
            "outcomeCode": "MAT.6.5.1",
            "questionCount": 2,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Kategorik veya nicel (kesikli) veri ile çalışabilme ve veriye dayalı karar verebilme"
          }
        ],
        "sourceOrigin": "meb_official"
      },
      {
        "id": "senaryo_3",
        "name": "Senaryo 3 (6 Soru)",
        "description": "MEB ÖDSGM 2026-2027 1. Dönem 2. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 3 (6 Soru) formatı (Toplam 100 Puan).",
        "totalQuestions": 6,
        "distributions": [
          {
            "outcomeCode": "MAT.6.1.5",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Gerçek yaşam durumlarında ondalık gösterimlerin basamak değerlerini kesirlerden yararlanarak yorumlayabilme"
          },
          {
            "outcomeCode": "MAT.6.1.6",
            "questionCount": 1,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "Kesir ve bölme işlemi arasındaki ilişkiye yönelik tümevarımsal akıl yürütebilme"
          },
          {
            "outcomeCode": "MAT.6.1.7",
            "questionCount": 2,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "Gerçek yaşam durumlarında karşılaşılan kesir, ondalık ve yüzde gösterimleri ile ilgili dört işlem gerektiren problemleri"
          },
          {
            "outcomeCode": "MAT.6.1.8",
            "questionCount": 1,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "Karşılaştığı günlük hayat ya da matematiksel durumlarda standart uzunluk ölçme birimlerini değerlendirebilme"
          },
          {
            "outcomeCode": "MAT.6.5.1",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Kategorik veya nicel (kesikli) veri ile çalışabilme ve veriye dayalı karar verebilme"
          }
        ],
        "sourceOrigin": "meb_official"
      },
      {
        "id": "senaryo_4",
        "name": "Senaryo 4 (7 Soru)",
        "description": "MEB ÖDSGM 2026-2027 1. Dönem 2. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 4 (7 Soru) formatı (Toplam 100 Puan).",
        "totalQuestions": 7,
        "distributions": [
          {
            "outcomeCode": "MAT.6.6.1",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Bir olayın olasılığını gözleme dayalı tahmin edebilme"
          },
          {
            "outcomeCode": "MAT.6.1.6",
            "questionCount": 1,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "Kesir ve bölme işlemi arasındaki ilişkiye yönelik tümevarımsal akıl yürütebilme"
          },
          {
            "outcomeCode": "MAT.6.1.7",
            "questionCount": 2,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "Gerçek yaşam durumlarında karşılaşılan kesir, ondalık ve yüzde gösterimleri ile ilgili dört işlem gerektiren problemleri"
          },
          {
            "outcomeCode": "MAT.6.1.8",
            "questionCount": 2,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "Karşılaştığı günlük hayat ya da matematiksel durumlarda standart uzunluk ölçme birimlerini değerlendirebilme"
          },
          {
            "outcomeCode": "MAT.6.5.1",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Kategorik veya nicel (kesikli) veri ile çalışabilme ve veriye dayalı karar verebilme"
          }
        ],
        "sourceOrigin": "meb_official"
      },
      {
        "id": "senaryo_5",
        "name": "Senaryo 5 (6 Soru)",
        "description": "MEB ÖDSGM 2026-2027 1. Dönem 2. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 5 (6 Soru) formatı (Toplam 100 Puan).",
        "totalQuestions": 6,
        "distributions": [
          {
            "outcomeCode": "MAT.6.1.5",
            "questionCount": 2,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Gerçek yaşam durumlarında ondalık gösterimlerin basamak değerlerini kesirlerden yararlanarak yorumlayabilme"
          },
          {
            "outcomeCode": "MAT.6.1.6",
            "questionCount": 1,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "Kesir ve bölme işlemi arasındaki ilişkiye yönelik tümevarımsal akıl yürütebilme"
          },
          {
            "outcomeCode": "MAT.6.1.7",
            "questionCount": 2,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "Gerçek yaşam durumlarında karşılaşılan kesir, ondalık ve yüzde gösterimleri ile ilgili dört işlem gerektiren problemleri"
          },
          {
            "outcomeCode": "MAT.6.1.8",
            "questionCount": 1,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "Karşılaştığı günlük hayat ya da matematiksel durumlarda standart uzunluk ölçme birimlerini değerlendirebilme"
          }
        ],
        "sourceOrigin": "meb_official"
      }
    ],
    "fen_bilimleri": [
      {
        "id": "senaryo_1",
        "name": "Senaryo 1 (9 Soru)",
        "description": "MEB ÖDSGM 2026-2027 1. Dönem 2. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 1 (9 Soru) formatı (Toplam 100 Puan).",
        "totalQuestions": 9,
        "distributions": [
          {
            "outcomeCode": "FB.6.1.1",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Güneş Sistemi"
          },
          {
            "outcomeCode": "FB.6.2.3",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Sabit Süratli ve Sabit Hızlı Hareket"
          },
          {
            "outcomeCode": "FB.6.3.2",
            "questionCount": 1,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "Bitkilerde üreme, büyüme ve gelişme hakkında bilimsel çıkarım yapabilme"
          },
          {
            "outcomeCode": "FB.6.3.5",
            "questionCount": 1,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "İnsanda üremeyi sağlayan yapı ve organlar arasındaki ilişkileri çözümleyebilme"
          },
          {
            "outcomeCode": "FB.6.3.6",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Denetleyici ve Düzenleyici Sistemler"
          },
          {
            "outcomeCode": "FB.6.3.7",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "İç salgı bezlerinin vücut için önemini yapılandırabilme"
          },
          {
            "outcomeCode": "FB.6.4.1",
            "questionCount": 1,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "Işığın Yansıması"
          },
          {
            "outcomeCode": "FB.6.4.2",
            "questionCount": 1,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "Işığın yansımasında gelen ışın, yansıyan ışın ve yüzeyin normali arasındaki ilişki ile ilgili kanıt kullanabilme"
          },
          {
            "outcomeCode": "FB.6.4.3",
            "questionCount": 1,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "Aynalar"
          }
        ],
        "sourceOrigin": "meb_official"
      },
      {
        "id": "senaryo_2",
        "name": "Senaryo 2 (9 Soru)",
        "description": "MEB ÖDSGM 2026-2027 1. Dönem 2. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 2 (9 Soru) formatı (Toplam 100 Puan).",
        "totalQuestions": 9,
        "distributions": [
          {
            "outcomeCode": "FB.6.1.3",
            "questionCount": 1,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "Güneş ve Ay Tutulmaları"
          },
          {
            "outcomeCode": "FB.6.3.3",
            "questionCount": 1,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "Tohumun çimlenmesine etki eden faktörlere ilişkin hipotez oluşturabilme"
          },
          {
            "outcomeCode": "FB.6.3.4",
            "questionCount": 1,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "Hayvanlarda üreme, büyüme ve gelişme hakkında bilimsel çıkarım yapabilme"
          },
          {
            "outcomeCode": "FB.6.3.6",
            "questionCount": 2,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Denetleyici ve Düzenleyici Sistemler"
          },
          {
            "outcomeCode": "FB.6.3.8",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Çocukluktan ergenliğe geçişte oluşan bedensel ve ruhsal değişimleri genelleyebilme"
          },
          {
            "outcomeCode": "FB.6.4.2",
            "questionCount": 1,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "Işığın yansımasında gelen ışın, yansıyan ışın ve yüzeyin normali arasındaki ilişki ile ilgili kanıt kullanabilme"
          },
          {
            "outcomeCode": "FB.6.4.3",
            "questionCount": 2,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "Aynalar"
          }
        ],
        "sourceOrigin": "meb_official"
      },
      {
        "id": "senaryo_3",
        "name": "Senaryo 3 (8 Soru)",
        "description": "MEB ÖDSGM 2026-2027 1. Dönem 2. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 3 (8 Soru) formatı (Toplam 100 Puan).",
        "totalQuestions": 8,
        "distributions": [
          {
            "outcomeCode": "FB.6.2.3",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Sabit Süratli ve Sabit Hızlı Hareket"
          },
          {
            "outcomeCode": "FB.6.3.1",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Bitki ve Hayvanlarda Üreme, Büyüme ve Gelişme"
          },
          {
            "outcomeCode": "FB.6.3.2",
            "questionCount": 1,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "Bitkilerde üreme, büyüme ve gelişme hakkında bilimsel çıkarım yapabilme"
          },
          {
            "outcomeCode": "FB.6.3.3",
            "questionCount": 1,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "Tohumun çimlenmesine etki eden faktörlere ilişkin hipotez oluşturabilme"
          },
          {
            "outcomeCode": "FB.6.3.5",
            "questionCount": 1,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "İnsanda üremeyi sağlayan yapı ve organlar arasındaki ilişkileri çözümleyebilme"
          },
          {
            "outcomeCode": "FB.6.3.6",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Denetleyici ve Düzenleyici Sistemler"
          },
          {
            "outcomeCode": "FB.6.3.7",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "İç salgı bezlerinin vücut için önemini yapılandırabilme"
          },
          {
            "outcomeCode": "FB.6.4.2",
            "questionCount": 1,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "Işığın yansımasında gelen ışın, yansıyan ışın ve yüzeyin normali arasındaki ilişki ile ilgili kanıt kullanabilme"
          }
        ],
        "sourceOrigin": "meb_official"
      },
      {
        "id": "senaryo_4",
        "name": "Senaryo 4 (8 Soru)",
        "description": "MEB ÖDSGM 2026-2027 1. Dönem 2. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 4 (8 Soru) formatı (Toplam 100 Puan).",
        "totalQuestions": 8,
        "distributions": [
          {
            "outcomeCode": "FB.6.2.1",
            "questionCount": 1,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "Bileşke Kuvvet"
          },
          {
            "outcomeCode": "FB.6.3.1",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Bitki ve Hayvanlarda Üreme, Büyüme ve Gelişme"
          },
          {
            "outcomeCode": "FB.6.3.2",
            "questionCount": 1,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "Bitkilerde üreme, büyüme ve gelişme hakkında bilimsel çıkarım yapabilme"
          },
          {
            "outcomeCode": "FB.6.3.3",
            "questionCount": 1,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "Tohumun çimlenmesine etki eden faktörlere ilişkin hipotez oluşturabilme"
          },
          {
            "outcomeCode": "FB.6.3.4",
            "questionCount": 1,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "Hayvanlarda üreme, büyüme ve gelişme hakkında bilimsel çıkarım yapabilme"
          },
          {
            "outcomeCode": "FB.6.3.6",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Denetleyici ve Düzenleyici Sistemler"
          },
          {
            "outcomeCode": "FB.6.3.8",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Çocukluktan ergenliğe geçişte oluşan bedensel ve ruhsal değişimleri genelleyebilme"
          },
          {
            "outcomeCode": "FB.6.4.1",
            "questionCount": 1,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "Işığın Yansıması"
          }
        ],
        "sourceOrigin": "meb_official"
      },
      {
        "id": "senaryo_5",
        "name": "Senaryo 5 (7 Soru)",
        "description": "MEB ÖDSGM 2026-2027 1. Dönem 2. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 5 (7 Soru) formatı (Toplam 100 Puan).",
        "totalQuestions": 7,
        "distributions": [
          {
            "outcomeCode": "FB.6.2.3",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Sabit Süratli ve Sabit Hızlı Hareket"
          },
          {
            "outcomeCode": "FB.6.3.1",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Bitki ve Hayvanlarda Üreme, Büyüme ve Gelişme"
          },
          {
            "outcomeCode": "FB.6.3.3",
            "questionCount": 1,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "Tohumun çimlenmesine etki eden faktörlere ilişkin hipotez oluşturabilme"
          },
          {
            "outcomeCode": "FB.6.3.5",
            "questionCount": 1,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "İnsanda üremeyi sağlayan yapı ve organlar arasındaki ilişkileri çözümleyebilme"
          },
          {
            "outcomeCode": "FB.6.3.7",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "İç salgı bezlerinin vücut için önemini yapılandırabilme"
          },
          {
            "outcomeCode": "FB.6.4.1",
            "questionCount": 1,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "Işığın Yansıması"
          },
          {
            "outcomeCode": "FB.6.4.2",
            "questionCount": 1,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "Işığın yansımasında gelen ışın, yansıyan ışın ve yüzeyin normali arasındaki ilişki ile ilgili kanıt kullanabilme"
          }
        ],
        "sourceOrigin": "meb_official"
      }
    ],
    "sosyal_bilgiler": [
      {
        "id": "senaryo_1",
        "name": "Senaryo 1 (6 Soru)",
        "description": "MEB ÖDSGM 2026-2027 1. Dönem 2. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 1 (6 Soru) formatı (Toplam 100 Puan).",
        "totalQuestions": 6,
        "distributions": [
          {
            "outcomeCode": "SB.6.2.1",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Ülkemizin, Kıtaların ve Okyanusların Konum Özellikleri"
          },
          {
            "outcomeCode": "SB.6.2.2",
            "questionCount": 1,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "Doğal ve Beşerî Çevre Özellikleri Arasındaki İlişki"
          },
          {
            "outcomeCode": "SB.6.2.3",
            "questionCount": 2,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Ülkemizin Türk Dünyasıyla Kültürel İş birlikleri"
          },
          {
            "outcomeCode": "SB.6.3.1",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Türkistan’da Kurulan İlk Türk Devletlerinin Medeniyetimize Katkıları"
          },
          {
            "outcomeCode": "SB.6.3.2",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "VII-XIII. Yüzyıllar Arasında İslam Medeniyetinin İnsanlığın Ortak Mirasına Katkıları"
          }
        ],
        "sourceOrigin": "meb_official"
      },
      {
        "id": "senaryo_2",
        "name": "Senaryo 2 (7 Soru)",
        "description": "MEB ÖDSGM 2026-2027 1. Dönem 2. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 2 (7 Soru) formatı (Toplam 100 Puan).",
        "totalQuestions": 7,
        "distributions": [
          {
            "outcomeCode": "SB.6.1.3",
            "questionCount": 1,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "Toplumsal Sorunlar ve Çözümler Önerileri"
          },
          {
            "outcomeCode": "SB.6.2.2",
            "questionCount": 1,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "Doğal ve Beşerî Çevre Özellikleri Arasındaki İlişki"
          },
          {
            "outcomeCode": "SB.6.2.3",
            "questionCount": 2,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Ülkemizin Türk Dünyasıyla Kültürel İş birlikleri"
          },
          {
            "outcomeCode": "SB.6.3.1",
            "questionCount": 2,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Türkistan’da Kurulan İlk Türk Devletlerinin Medeniyetimize Katkıları"
          },
          {
            "outcomeCode": "SB.6.3.2",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "VII-XIII. Yüzyıllar Arasında İslam Medeniyetinin İnsanlığın Ortak Mirasına Katkıları"
          }
        ],
        "sourceOrigin": "meb_official"
      },
      {
        "id": "senaryo_3",
        "name": "Senaryo 3 (8 Soru)",
        "description": "MEB ÖDSGM 2026-2027 1. Dönem 2. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 3 (8 Soru) formatı (Toplam 100 Puan).",
        "totalQuestions": 8,
        "distributions": [
          {
            "outcomeCode": "SB.6.1.2",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Kültürel Bağlarımızın ve Millî Değerlerimizin Toplumsal Birlikteliğe Etkisi"
          },
          {
            "outcomeCode": "SB.6.1.3",
            "questionCount": 1,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "Toplumsal Sorunlar ve Çözümler Önerileri"
          },
          {
            "outcomeCode": "SB.6.2.2",
            "questionCount": 1,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "Doğal ve Beşerî Çevre Özellikleri Arasındaki İlişki"
          },
          {
            "outcomeCode": "SB.6.2.3",
            "questionCount": 2,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Ülkemizin Türk Dünyasıyla Kültürel İş birlikleri"
          },
          {
            "outcomeCode": "SB.6.3.1",
            "questionCount": 2,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Türkistan’da Kurulan İlk Türk Devletlerinin Medeniyetimize Katkıları"
          },
          {
            "outcomeCode": "SB.6.3.2",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "VII-XIII. Yüzyıllar Arasında İslam Medeniyetinin İnsanlığın Ortak Mirasına Katkıları"
          }
        ],
        "sourceOrigin": "meb_official"
      },
      {
        "id": "senaryo_4",
        "name": "Senaryo 4 (6 Soru)",
        "description": "MEB ÖDSGM 2026-2027 1. Dönem 2. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 4 (6 Soru) formatı (Toplam 100 Puan).",
        "totalQuestions": 6,
        "distributions": [
          {
            "outcomeCode": "SB.6.2.1",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Ülkemizin, Kıtaların ve Okyanusların Konum Özellikleri"
          },
          {
            "outcomeCode": "SB.6.2.2",
            "questionCount": 2,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "Doğal ve Beşerî Çevre Özellikleri Arasındaki İlişki"
          },
          {
            "outcomeCode": "SB.6.2.3",
            "questionCount": 2,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Ülkemizin Türk Dünyasıyla Kültürel İş birlikleri"
          },
          {
            "outcomeCode": "SB.6.3.1",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Türkistan’da Kurulan İlk Türk Devletlerinin Medeniyetimize Katkıları"
          }
        ],
        "sourceOrigin": "meb_official"
      },
      {
        "id": "senaryo_5",
        "name": "Senaryo 5 (7 Soru)",
        "description": "MEB ÖDSGM 2026-2027 1. Dönem 2. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 5 (7 Soru) formatı (Toplam 100 Puan).",
        "totalQuestions": 7,
        "distributions": [
          {
            "outcomeCode": "SB.6.1.3",
            "questionCount": 1,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "Toplumsal Sorunlar ve Çözümler Önerileri"
          },
          {
            "outcomeCode": "SB.6.2.2",
            "questionCount": 2,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "Doğal ve Beşerî Çevre Özellikleri Arasındaki İlişki"
          },
          {
            "outcomeCode": "SB.6.2.3",
            "questionCount": 2,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Ülkemizin Türk Dünyasıyla Kültürel İş birlikleri"
          },
          {
            "outcomeCode": "SB.6.3.1",
            "questionCount": 2,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Türkistan’da Kurulan İlk Türk Devletlerinin Medeniyetimize Katkıları"
          }
        ],
        "sourceOrigin": "meb_official"
      },
      {
        "id": "senaryo_6",
        "name": "Senaryo 6 (8 Soru)",
        "description": "MEB ÖDSGM 2026-2027 1. Dönem 2. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 6 (8 Soru) formatı (Toplam 100 Puan).",
        "totalQuestions": 8,
        "distributions": [
          {
            "outcomeCode": "SB.6.1.3",
            "questionCount": 1,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "Toplumsal Sorunlar ve Çözümler Önerileri"
          },
          {
            "outcomeCode": "SB.6.2.1",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Ülkemizin, Kıtaların ve Okyanusların Konum Özellikleri"
          },
          {
            "outcomeCode": "SB.6.2.2",
            "questionCount": 2,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "Doğal ve Beşerî Çevre Özellikleri Arasındaki İlişki"
          },
          {
            "outcomeCode": "SB.6.2.3",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Ülkemizin Türk Dünyasıyla Kültürel İş birlikleri"
          },
          {
            "outcomeCode": "SB.6.3.1",
            "questionCount": 2,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Türkistan’da Kurulan İlk Türk Devletlerinin Medeniyetimize Katkıları"
          },
          {
            "outcomeCode": "SB.6.3.2",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "VII-XIII. Yüzyıllar Arasında İslam Medeniyetinin İnsanlığın Ortak Mirasına Katkıları"
          }
        ],
        "sourceOrigin": "meb_official"
      },
      {
        "id": "senaryo_7",
        "name": "Senaryo 7 (8 Soru)",
        "description": "MEB ÖDSGM 2026-2027 1. Dönem 2. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 7 (8 Soru) formatı (Toplam 100 Puan).",
        "totalQuestions": 8,
        "distributions": [
          {
            "outcomeCode": "SB.6.1.1",
            "questionCount": 1,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "Zaman İçinde Değişen Gruplar ve Roller"
          },
          {
            "outcomeCode": "SB.6.2.2",
            "questionCount": 2,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "Doğal ve Beşerî Çevre Özellikleri Arasındaki İlişki"
          },
          {
            "outcomeCode": "SB.6.2.3",
            "questionCount": 2,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Ülkemizin Türk Dünyasıyla Kültürel İş birlikleri"
          },
          {
            "outcomeCode": "SB.6.3.1",
            "questionCount": 2,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Türkistan’da Kurulan İlk Türk Devletlerinin Medeniyetimize Katkıları"
          },
          {
            "outcomeCode": "SB.6.3.2",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "VII-XIII. Yüzyıllar Arasında İslam Medeniyetinin İnsanlığın Ortak Mirasına Katkıları"
          }
        ],
        "sourceOrigin": "meb_official"
      }
    ],
    "din_kulturu": [
      {
        "id": "senaryo_1",
        "name": "Senaryo 1 (8 Soru)",
        "description": "MEB ÖDSGM 2026-2027 1. Dönem 2. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 1 (8 Soru) formatı (Toplam 100 Puan).",
        "totalQuestions": 8,
        "distributions": [
          {
            "outcomeCode": "DKAB.6.1.2",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Peygamberlerin İlettiği Mesaj: Vahiy"
          },
          {
            "outcomeCode": "DKAB.6.1.4",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Bir Sure Öğreniyorum: Felak Suresi"
          },
          {
            "outcomeCode": "DKAB.6.2.1",
            "questionCount": 1,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "Oruç ve Kur’an Ayı Ramazan"
          },
          {
            "outcomeCode": "DKAB.6.2.3",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Orucun İnsana Kazandırdıkları"
          },
          {
            "outcomeCode": "DKAB.6.2.4",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Bir Dua Öğreniyorum: İftar Duası"
          },
          {
            "outcomeCode": "DKAB.6.3.1",
            "questionCount": 2,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Doğru Sözlü Olmak"
          },
          {
            "outcomeCode": "DKAB.6.3.2",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Merhametli Olmak"
          }
        ],
        "sourceOrigin": "meb_official"
      },
      {
        "id": "senaryo_2",
        "name": "Senaryo 2 (7 Soru)",
        "description": "MEB ÖDSGM 2026-2027 1. Dönem 2. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 2 (7 Soru) formatı (Toplam 100 Puan).",
        "totalQuestions": 7,
        "distributions": [
          {
            "outcomeCode": "DKAB.6.2.1",
            "questionCount": 1,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "Oruç ve Kur’an Ayı Ramazan"
          },
          {
            "outcomeCode": "DKAB.6.2.3",
            "questionCount": 2,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Orucun İnsana Kazandırdıkları"
          },
          {
            "outcomeCode": "DKAB.6.2.4",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Bir Dua Öğreniyorum: İftar Duası"
          },
          {
            "outcomeCode": "DKAB.6.3.1",
            "questionCount": 2,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Doğru Sözlü Olmak"
          },
          {
            "outcomeCode": "DKAB.6.3.2",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Merhametli Olmak"
          }
        ],
        "sourceOrigin": "meb_official"
      },
      {
        "id": "senaryo_3",
        "name": "Senaryo 3 (7 Soru)",
        "description": "MEB ÖDSGM 2026-2027 1. Dönem 2. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 3 (7 Soru) formatı (Toplam 100 Puan).",
        "totalQuestions": 7,
        "distributions": [
          {
            "outcomeCode": "DKAB.6.1.2",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Peygamberlerin İlettiği Mesaj: Vahiy"
          },
          {
            "outcomeCode": "DKAB.6.1.3",
            "questionCount": 1,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "İlahi Kitaplar"
          },
          {
            "outcomeCode": "DKAB.6.2.1",
            "questionCount": 1,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "Oruç ve Kur’an Ayı Ramazan"
          },
          {
            "outcomeCode": "DKAB.6.2.3",
            "questionCount": 2,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Orucun İnsana Kazandırdıkları"
          },
          {
            "outcomeCode": "DKAB.6.2.4",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Bir Dua Öğreniyorum: İftar Duası"
          },
          {
            "outcomeCode": "DKAB.6.3.1",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Doğru Sözlü Olmak"
          }
        ],
        "sourceOrigin": "meb_official"
      },
      {
        "id": "senaryo_4",
        "name": "Senaryo 4 (6 Soru)",
        "description": "MEB ÖDSGM 2026-2027 1. Dönem 2. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 4 (6 Soru) formatı (Toplam 100 Puan).",
        "totalQuestions": 6,
        "distributions": [
          {
            "outcomeCode": "DKAB.6.1.3",
            "questionCount": 1,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "İlahi Kitaplar"
          },
          {
            "outcomeCode": "DKAB.6.1.4",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Bir Sure Öğreniyorum: Felak Suresi"
          },
          {
            "outcomeCode": "DKAB.6.2.3",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Orucun İnsana Kazandırdıkları"
          },
          {
            "outcomeCode": "DKAB.6.3.1",
            "questionCount": 2,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Doğru Sözlü Olmak"
          },
          {
            "outcomeCode": "DKAB.6.3.2",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Merhametli Olmak"
          }
        ],
        "sourceOrigin": "meb_official"
      },
      {
        "id": "senaryo_5",
        "name": "Senaryo 5 (6 Soru)",
        "description": "MEB ÖDSGM 2026-2027 1. Dönem 2. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 5 (6 Soru) formatı (Toplam 100 Puan).",
        "totalQuestions": 6,
        "distributions": [
          {
            "outcomeCode": "DKAB.6.1.2",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Peygamberlerin İlettiği Mesaj: Vahiy"
          },
          {
            "outcomeCode": "DKAB.6.1.4",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Bir Sure Öğreniyorum: Felak Suresi"
          },
          {
            "outcomeCode": "DKAB.6.2.1",
            "questionCount": 1,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "Oruç ve Kur’an Ayı Ramazan"
          },
          {
            "outcomeCode": "DKAB.6.2.3",
            "questionCount": 2,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Orucun İnsana Kazandırdıkları"
          },
          {
            "outcomeCode": "DKAB.6.2.4",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Bir Dua Öğreniyorum: İftar Duası"
          }
        ],
        "sourceOrigin": "meb_official"
      }
    ],
    "ingilizce": [
      {
        "id": "senaryo_1",
        "name": "Senaryo 1 (5 Soru)",
        "description": "MEB ÖDSGM 2026-2027 1. Dönem 2. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 1 (5 Soru) formatı (Toplam 100 Puan).",
        "totalQuestions": 5,
        "distributions": [
          {
            "outcomeCode": "ENG.6.1.R3",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Students can make meaning of / derive meaning from the current content about “school life with roles, and responsibiliti"
          },
          {
            "outcomeCode": "ENG.6.1.G1",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Students can select and use the target grammatical elements of the current content about “school life with roles, and re"
          },
          {
            "outcomeCode": "ENG.6.2.R3",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Students can make meaning of / derive meaning from the current content about “classroom life with daily and study routin"
          },
          {
            "outcomeCode": "ENG.6.2.W3",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Students can organise a content for the assigned writing task on the current content “classroom life with daily and stud"
          },
          {
            "outcomeCode": "ENG.6.3.R2",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Students can bring information about the current content on “personal life with body parts, physical appearance and clot"
          }
        ],
        "sourceOrigin": "meb_official"
      },
      {
        "id": "senaryo_2",
        "name": "Senaryo 2 (5 Soru)",
        "description": "MEB ÖDSGM 2026-2027 1. Dönem 2. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 2 (5 Soru) formatı (Toplam 100 Puan).",
        "totalQuestions": 5,
        "distributions": [
          {
            "outcomeCode": "ENG.6.1.R2",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Students can bring information about the current content on “school life with roles, and responsibilities at school; sch"
          },
          {
            "outcomeCode": "ENG.6.1.G1",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Students can select and use the target grammatical elements of the current content about “school life with roles, and re"
          },
          {
            "outcomeCode": "ENG.6.2.R3",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Students can make meaning of / derive meaning from the current content about “classroom life with daily and study routin"
          },
          {
            "outcomeCode": "ENG.6.3.V1",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Students can select and use the target vocabulary of the current content about “personal life with body parts, physical "
          },
          {
            "outcomeCode": "ENG.6.3.W4",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Students can individually construct/form content for the assigned writing task on the current content “personal life wit"
          }
        ],
        "sourceOrigin": "meb_official"
      },
      {
        "id": "senaryo_3",
        "name": "Senaryo 3 (6 Soru)",
        "description": "MEB ÖDSGM 2026-2027 1. Dönem 2. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 3 (6 Soru) formatı (Toplam 100 Puan).",
        "totalQuestions": 6,
        "distributions": [
          {
            "outcomeCode": "ENG.6.1.R3",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Students can make meaning of / derive meaning from the current content about “school life with roles, and responsibiliti"
          },
          {
            "outcomeCode": "ENG.6.1.V1",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Students can select and use the target vocabulary of the current content about “school life with roles, and responsibili"
          },
          {
            "outcomeCode": "ENG.6.2.R2",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Students can bring information about the current content on “classroom life with daily and study routines; learning acti"
          },
          {
            "outcomeCode": "ENG.6.2.W4",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Students can individually construct/form content for the assigned writing task on the current content “classroom life wi"
          },
          {
            "outcomeCode": "ENG.6.3.R2",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Students can bring information about the current content on “personal life with body parts, physical appearance and clot"
          },
          {
            "outcomeCode": "ENG.6.3.G1",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Students can select and use the target grammatical elements of the current content about “personal life with body parts,"
          }
        ],
        "sourceOrigin": "meb_official"
      },
      {
        "id": "senaryo_4",
        "name": "Senaryo 4 (7 Soru)",
        "description": "MEB ÖDSGM 2026-2027 1. Dönem 2. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 4 (7 Soru) formatı (Toplam 100 Puan).",
        "totalQuestions": 7,
        "distributions": [
          {
            "outcomeCode": "ENG.6.1.R2",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Students can bring information about the current content on “school life with roles, and responsibilities at school; sch"
          },
          {
            "outcomeCode": "ENG.6.1.W3",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Students can organise a content for the assigned writing task on the current content “school life with roles, and respon"
          },
          {
            "outcomeCode": "ENG.6.2.R2",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Students can bring information about the current content on “classroom life with daily and study routines; learning acti"
          },
          {
            "outcomeCode": "ENG.6.2.V1",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Students can select and use the target vocabulary of the current content about “classroom life with daily and study rout"
          },
          {
            "outcomeCode": "ENG.6.2.G1",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Students can select and use the target grammatical elements of the current content about “classroom life with daily and "
          },
          {
            "outcomeCode": "ENG.6.3.R3",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Students can make meaning of / derive meaning from the current content about “personal life with body parts, physical ap"
          },
          {
            "outcomeCode": "ENG.6.3.V1",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Students can select and use the target vocabulary of the current content about “personal life with body parts, physical "
          }
        ],
        "sourceOrigin": "meb_official"
      },
      {
        "id": "senaryo_5",
        "name": "Senaryo 5 (8 Soru)",
        "description": "MEB ÖDSGM 2026-2027 1. Dönem 2. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 5 (8 Soru) formatı (Toplam 100 Puan).",
        "totalQuestions": 8,
        "distributions": [
          {
            "outcomeCode": "ENG.6.1.R2",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Students can bring information about the current content on “school life with roles, and responsibilities at school; sch"
          },
          {
            "outcomeCode": "ENG.6.1.V1",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Students can select and use the target vocabulary of the current content about “school life with roles, and responsibili"
          },
          {
            "outcomeCode": "ENG.6.2.R2",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Students can bring information about the current content on “classroom life with daily and study routines; learning acti"
          },
          {
            "outcomeCode": "ENG.6.2.R3",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Students can make meaning of / derive meaning from the current content about “classroom life with daily and study routin"
          },
          {
            "outcomeCode": "ENG.6.2.V1",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Students can select and use the target vocabulary of the current content about “classroom life with daily and study rout"
          },
          {
            "outcomeCode": "ENG.6.3.R2",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Students can bring information about the current content on “personal life with body parts, physical appearance and clot"
          },
          {
            "outcomeCode": "ENG.6.3.G1",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Students can select and use the target grammatical elements of the current content about “personal life with body parts,"
          },
          {
            "outcomeCode": "ENG.6.3.W3",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Students can organise a content for the assigned writing task on the current content “personal life with body parts, phy"
          }
        ],
        "sourceOrigin": "meb_official"
      }
    ]
  },
  "7": {
    "turkce": [
      {
        "id": "senaryo_1",
        "name": "Senaryo 1 (OYSS Rehberi Uyarlaması - 7 Soru)",
        "description": "MEB ÖDSGM 7. Sınıf Türkçe 1. Dönem 2. Yazılı sınavı 'Ülke Geneli Ortak Yazılı Sınav' olarak planlandığından resmî okul senaryosu yayımlanmamıştır. Bu senaryo, 1. dönem MEB kazanım havuzu esas alınarak OYSS Rehberi zümresince kurgulanmıştır (oyss_curated).",
        "totalQuestions": 7,
        "distributions": [
          {
            "outcomeCode": "T.O.7.4",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Metinde geçen anlamını bilmediği söz varlığı unsurlarının anlamını tahmin edebilme"
          },
          {
            "outcomeCode": "T.O.7.5",
            "questionCount": 2,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Metnin yüzey anlamını belirleyebilme"
          },
          {
            "outcomeCode": "T.O.7.7",
            "questionCount": 1,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "Metnin derin anlamını belirlemeye yönelik basit çıkarımlar yapabilme"
          },
          {
            "outcomeCode": "T.O.7.15",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Bilgilendirici metinde anahtar kelimeleri belirlemeye yönelik çözümleme yapabilme"
          },
          {
            "outcomeCode": "T.O.7.21",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Metinden hareketle söz varlığını geliştirmeye yönelik çözümleme yapabilme"
          },
          {
            "outcomeCode": "T.Y.7.21",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Yazım kuralları ve noktalama işaretlerini uygulayabilme"
          }
        ],
        "sourceOrigin": "oyss_curated"
      },
      {
        "id": "senaryo_2",
        "name": "Senaryo 2 (OYSS Rehberi Uyarlaması - 6 Soru)",
        "description": "MEB ÖDSGM 7. Sınıf Türkçe 1. Dönem 2. Yazılı sınavı 'Ülke Geneli Ortak Yazılı Sınav' olarak planlandığından resmî okul senaryosu yayımlanmamıştır. Bu senaryo, 1. dönem MEB kazanım havuzu esas alınarak OYSS Rehberi zümresince kurgulanmıştır (oyss_curated).",
        "totalQuestions": 6,
        "distributions": [
          {
            "outcomeCode": "T.O.7.5",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Metnin yüzey anlamını belirleyebilme"
          },
          {
            "outcomeCode": "T.O.7.7",
            "questionCount": 1,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "Metnin derin anlamını belirlemeye yönelik basit çıkarımlar yapabilme"
          },
          {
            "outcomeCode": "T.O.7.8",
            "questionCount": 1,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "Metnin derin anlamını belirlemeye yönelik üst düzey çıkarımlar yapabilme"
          },
          {
            "outcomeCode": "T.O.7.14",
            "questionCount": 1,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "Bilgilendirici metinlerde metin yapılarından hareketle önemli bilgileri belirlemeye yönelik çözümleme yapabilme"
          },
          {
            "outcomeCode": "T.Y.7.3",
            "questionCount": 1,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "Yazısında içerik ve yapıya yönelik seçimlerini yönetebilme"
          },
          {
            "outcomeCode": "T.Y.7.21",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Yazım kuralları ve noktalama işaretlerini uygulayabilme"
          }
        ],
        "sourceOrigin": "oyss_curated"
      },
      {
        "id": "senaryo_3",
        "name": "Senaryo 3 (OYSS Rehberi Uyarlaması - 8 Soru)",
        "description": "MEB ÖDSGM 7. Sınıf Türkçe 1. Dönem 2. Yazılı sınavı 'Ülke Geneli Ortak Yazılı Sınav' olarak planlandığından resmî okul senaryosu yayımlanmamıştır. Bu senaryo, 1. dönem MEB kazanım havuzu esas alınarak OYSS Rehberi zümresince kurgulanmıştır (oyss_curated).",
        "totalQuestions": 8,
        "distributions": [
          {
            "outcomeCode": "T.O.7.4",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Metinde geçen anlamını bilmediği söz varlığı unsurlarının anlamını tahmin edebilme"
          },
          {
            "outcomeCode": "T.O.7.5",
            "questionCount": 2,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Metnin yüzey anlamını belirleyebilme"
          },
          {
            "outcomeCode": "T.O.7.7",
            "questionCount": 1,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "Metnin derin anlamını belirlemeye yönelik basit çıkarımlar yapabilme"
          },
          {
            "outcomeCode": "T.O.7.14",
            "questionCount": 1,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "Bilgilendirici metinlerde metin yapılarından hareketle önemli bilgileri belirlemeye yönelik çözümleme yapabilme"
          },
          {
            "outcomeCode": "T.O.7.21",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Metinden hareketle söz varlığını geliştirmeye yönelik çözümleme yapabilme"
          },
          {
            "outcomeCode": "T.Y.7.3",
            "questionCount": 1,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "Yazısında içerik ve yapıya yönelik seçimlerini yönetebilme"
          },
          {
            "outcomeCode": "T.Y.7.21",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Yazım kuralları ve noktalama işaretlerini uygulayabilme"
          }
        ],
        "sourceOrigin": "oyss_curated"
      }
    ],
    "matematik": [
      {
        "id": "senaryo_1",
        "name": "Senaryo 1 (9 Soru)",
        "description": "MEB ÖDSGM 2026-2027 1. Dönem 2. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 1 (9 Soru) formatı (Toplam 100 Puan).",
        "totalQuestions": 9,
        "distributions": [
          {
            "outcomeCode": "MAT.7.4.1",
            "questionCount": 1,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "Cisimlerin Farklı Yönlerden Görünümleri"
          },
          {
            "outcomeCode": "MAT.7.4.2",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Dikdörtgenler Prizmasının Hacmi ve Yüzey Alanı"
          },
          {
            "outcomeCode": "MAT.7.4.4",
            "questionCount": 1,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "Dikdörtgenler prizmasının hacim bağıntısını değerlendirebilme"
          },
          {
            "outcomeCode": "MAT.7.4.5",
            "questionCount": 1,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "Hacim Ölçme Birimleri"
          },
          {
            "outcomeCode": "MAT.7.4.6",
            "questionCount": 2,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "Dikdörtgenler Prizmasının Hacmi ve Yüzey Alanı"
          },
          {
            "outcomeCode": "MAT.7.6.1",
            "questionCount": 2,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Kategorik ve Nicel (Sürekli) Veri Dağılımları"
          },
          {
            "outcomeCode": "MAT.7.6.2",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Başkaları tarafından oluşturulan kategorik veya nicel (sürekli) veriye dayalı istatistiksel sonuç veya yorumları tartışa"
          }
        ],
        "sourceOrigin": "meb_official"
      },
      {
        "id": "senaryo_2",
        "name": "Senaryo 2 (9 Soru)",
        "description": "MEB ÖDSGM 2026-2027 1. Dönem 2. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 2 (9 Soru) formatı (Toplam 100 Puan).",
        "totalQuestions": 9,
        "distributions": [
          {
            "outcomeCode": "MAT.7.1.4",
            "questionCount": 1,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "Rasyonel Sayılarla İşlemler ve Problem Çözme"
          },
          {
            "outcomeCode": "MAT.7.4.2",
            "questionCount": 2,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Dikdörtgenler Prizmasının Hacmi ve Yüzey Alanı"
          },
          {
            "outcomeCode": "MAT.7.4.4",
            "questionCount": 1,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "Dikdörtgenler prizmasının hacim bağıntısını değerlendirebilme"
          },
          {
            "outcomeCode": "MAT.7.4.5",
            "questionCount": 1,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "Hacim Ölçme Birimleri"
          },
          {
            "outcomeCode": "MAT.7.4.6",
            "questionCount": 2,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "Dikdörtgenler Prizmasının Hacmi ve Yüzey Alanı"
          },
          {
            "outcomeCode": "MAT.7.6.1",
            "questionCount": 2,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Kategorik ve Nicel (Sürekli) Veri Dağılımları"
          }
        ],
        "sourceOrigin": "meb_official"
      },
      {
        "id": "senaryo_3",
        "name": "Senaryo 3 (7 Soru)",
        "description": "MEB ÖDSGM 2026-2027 1. Dönem 2. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 3 (7 Soru) formatı (Toplam 100 Puan).",
        "totalQuestions": 7,
        "distributions": [
          {
            "outcomeCode": "MAT.7.4.2",
            "questionCount": 2,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Dikdörtgenler Prizmasının Hacmi ve Yüzey Alanı"
          },
          {
            "outcomeCode": "MAT.7.4.4",
            "questionCount": 1,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "Dikdörtgenler prizmasının hacim bağıntısını değerlendirebilme"
          },
          {
            "outcomeCode": "MAT.7.4.5",
            "questionCount": 1,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "Hacim Ölçme Birimleri"
          },
          {
            "outcomeCode": "MAT.7.4.6",
            "questionCount": 1,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "Dikdörtgenler Prizmasının Hacmi ve Yüzey Alanı"
          },
          {
            "outcomeCode": "MAT.7.6.1",
            "questionCount": 2,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Kategorik ve Nicel (Sürekli) Veri Dağılımları"
          }
        ],
        "sourceOrigin": "meb_official"
      },
      {
        "id": "senaryo_4",
        "name": "Senaryo 4 (7 Soru)",
        "description": "MEB ÖDSGM 2026-2027 1. Dönem 2. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 4 (7 Soru) formatı (Toplam 100 Puan).",
        "totalQuestions": 7,
        "distributions": [
          {
            "outcomeCode": "MAT.7.1.4",
            "questionCount": 1,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "Rasyonel Sayılarla İşlemler ve Problem Çözme"
          },
          {
            "outcomeCode": "MAT.7.4.1",
            "questionCount": 1,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "Cisimlerin Farklı Yönlerden Görünümleri"
          },
          {
            "outcomeCode": "MAT.7.4.3",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Dikdörtgenler prizmasının hacmini eş nesneler aracılığıyla yorumlayabilme"
          },
          {
            "outcomeCode": "MAT.7.4.5",
            "questionCount": 1,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "Hacim Ölçme Birimleri"
          },
          {
            "outcomeCode": "MAT.7.4.6",
            "questionCount": 2,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "Dikdörtgenler Prizmasının Hacmi ve Yüzey Alanı"
          },
          {
            "outcomeCode": "MAT.7.6.1",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Kategorik ve Nicel (Sürekli) Veri Dağılımları"
          }
        ],
        "sourceOrigin": "meb_official"
      },
      {
        "id": "senaryo_5",
        "name": "Senaryo 5 (7 Soru)",
        "description": "MEB ÖDSGM 2026-2027 1. Dönem 2. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 5 (7 Soru) formatı (Toplam 100 Puan).",
        "totalQuestions": 7,
        "distributions": [
          {
            "outcomeCode": "MAT.7.1.4",
            "questionCount": 2,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "Rasyonel Sayılarla İşlemler ve Problem Çözme"
          },
          {
            "outcomeCode": "MAT.7.4.3",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Dikdörtgenler prizmasının hacmini eş nesneler aracılığıyla yorumlayabilme"
          },
          {
            "outcomeCode": "MAT.7.4.4",
            "questionCount": 1,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "Dikdörtgenler prizmasının hacim bağıntısını değerlendirebilme"
          },
          {
            "outcomeCode": "MAT.7.4.5",
            "questionCount": 1,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "Hacim Ölçme Birimleri"
          },
          {
            "outcomeCode": "MAT.7.4.6",
            "questionCount": 2,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "Dikdörtgenler Prizmasının Hacmi ve Yüzey Alanı"
          }
        ],
        "sourceOrigin": "meb_official"
      }
    ],
    "fen_bilimleri": [
      {
        "id": "senaryo_1",
        "name": "Senaryo 1 (7 Soru)",
        "description": "MEB ÖDSGM 2026-2027 1. Dönem 2. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 1 (7 Soru) formatı (Toplam 100 Puan).",
        "totalQuestions": 7,
        "distributions": [
          {
            "outcomeCode": "FB.7.2.2",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Enerji çeşitlerinden kinetik ve potansiyel enerjiyi karşılaştırabilme"
          },
          {
            "outcomeCode": "FB.7.2.3",
            "questionCount": 2,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Enerji Dönüşümleri"
          },
          {
            "outcomeCode": "FB.7.3.1",
            "questionCount": 2,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Sindirim Sistemi"
          },
          {
            "outcomeCode": "FB.7.3.3",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Dolaşım Sistemi"
          },
          {
            "outcomeCode": "FB.7.3.6",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Solunum Sistemi"
          }
        ],
        "sourceOrigin": "meb_official"
      },
      {
        "id": "senaryo_2",
        "name": "Senaryo 2 (9 Soru)",
        "description": "MEB ÖDSGM 2026-2027 1. Dönem 2. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 2 (9 Soru) formatı (Toplam 100 Puan).",
        "totalQuestions": 9,
        "distributions": [
          {
            "outcomeCode": "FB.7.2.1",
            "questionCount": 1,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "Kuvvet, İş ve Enerji İlişkisi"
          },
          {
            "outcomeCode": "FB.7.2.3",
            "questionCount": 2,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Enerji Dönüşümleri"
          },
          {
            "outcomeCode": "FB.7.3.1",
            "questionCount": 2,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Sindirim Sistemi"
          },
          {
            "outcomeCode": "FB.7.3.3",
            "questionCount": 2,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Dolaşım Sistemi"
          },
          {
            "outcomeCode": "FB.7.3.4",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Kan bağışının toplumsal dayanışma açısından önemini tartışabilme"
          },
          {
            "outcomeCode": "FB.7.3.6",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Solunum Sistemi"
          }
        ],
        "sourceOrigin": "meb_official"
      },
      {
        "id": "senaryo_3",
        "name": "Senaryo 3 (7 Soru)",
        "description": "MEB ÖDSGM 2026-2027 1. Dönem 2. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 3 (7 Soru) formatı (Toplam 100 Puan).",
        "totalQuestions": 7,
        "distributions": [
          {
            "outcomeCode": "FB.7.2.2",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Enerji çeşitlerinden kinetik ve potansiyel enerjiyi karşılaştırabilme"
          },
          {
            "outcomeCode": "FB.7.2.3",
            "questionCount": 2,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Enerji Dönüşümleri"
          },
          {
            "outcomeCode": "FB.7.3.1",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Sindirim Sistemi"
          },
          {
            "outcomeCode": "FB.7.3.4",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Kan bağışının toplumsal dayanışma açısından önemini tartışabilme"
          },
          {
            "outcomeCode": "FB.7.3.6",
            "questionCount": 2,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Solunum Sistemi"
          }
        ],
        "sourceOrigin": "meb_official"
      },
      {
        "id": "senaryo_4",
        "name": "Senaryo 4 (8 Soru)",
        "description": "MEB ÖDSGM 2026-2027 1. Dönem 2. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 4 (8 Soru) formatı (Toplam 100 Puan).",
        "totalQuestions": 8,
        "distributions": [
          {
            "outcomeCode": "FB.7.1.3",
            "questionCount": 1,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "Uzay araştırmalarının yol açabileceği problemleri çözebilme"
          },
          {
            "outcomeCode": "FB.7.2.1",
            "questionCount": 1,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "Kuvvet, İş ve Enerji İlişkisi"
          },
          {
            "outcomeCode": "FB.7.2.3",
            "questionCount": 2,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Enerji Dönüşümleri"
          },
          {
            "outcomeCode": "FB.7.3.1",
            "questionCount": 2,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Sindirim Sistemi"
          },
          {
            "outcomeCode": "FB.7.3.3",
            "questionCount": 2,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Dolaşım Sistemi"
          }
        ],
        "sourceOrigin": "meb_official"
      },
      {
        "id": "senaryo_5",
        "name": "Senaryo 5 (7 Soru)",
        "description": "MEB ÖDSGM 2026-2027 1. Dönem 2. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 5 (7 Soru) formatı (Toplam 100 Puan).",
        "totalQuestions": 7,
        "distributions": [
          {
            "outcomeCode": "FB.7.2.2",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Enerji çeşitlerinden kinetik ve potansiyel enerjiyi karşılaştırabilme"
          },
          {
            "outcomeCode": "FB.7.2.3",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Enerji Dönüşümleri"
          },
          {
            "outcomeCode": "FB.7.3.1",
            "questionCount": 2,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Sindirim Sistemi"
          },
          {
            "outcomeCode": "FB.7.3.3",
            "questionCount": 2,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Dolaşım Sistemi"
          },
          {
            "outcomeCode": "FB.7.3.4",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Kan bağışının toplumsal dayanışma açısından önemini tartışabilme"
          }
        ],
        "sourceOrigin": "meb_official"
      }
    ],
    "sosyal_bilgiler": [
      {
        "id": "senaryo_1",
        "name": "Senaryo 1 (6 Soru)",
        "description": "MEB ÖDSGM 2026-2027 1. Dönem 2. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 1 (6 Soru) formatı (Toplam 100 Puan).",
        "totalQuestions": 6,
        "distributions": [
          {
            "outcomeCode": "SB.7.2.1",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Küreselleşmenin İnsan ve Toplum Hayatına Etkisi"
          },
          {
            "outcomeCode": "SB.7.2.2",
            "questionCount": 2,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Bölgesel ve Küresel Sorunların Çözümünde Ülkemizin Rolü"
          },
          {
            "outcomeCode": "SB.7.3.1",
            "questionCount": 2,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Osmanlı Devleti’nin Cihan Devleti Hâline Gelmesini Sağlayan Politikalar"
          },
          {
            "outcomeCode": "SB.7.3.2",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Osmanlı Devleti’nin Uygulamaya Koyduğu Yenilikler"
          }
        ],
        "sourceOrigin": "meb_official"
      },
      {
        "id": "senaryo_2",
        "name": "Senaryo 2 (7 Soru)",
        "description": "MEB ÖDSGM 2026-2027 1. Dönem 2. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 2 (7 Soru) formatı (Toplam 100 Puan).",
        "totalQuestions": 7,
        "distributions": [
          {
            "outcomeCode": "SB.7.1.3",
            "questionCount": 1,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "Millî Meseleler Karşısında Türk Toplumunun Tutum ve Davranışları"
          },
          {
            "outcomeCode": "SB.7.2.2",
            "questionCount": 2,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Bölgesel ve Küresel Sorunların Çözümünde Ülkemizin Rolü"
          },
          {
            "outcomeCode": "SB.7.3.1",
            "questionCount": 2,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Osmanlı Devleti’nin Cihan Devleti Hâline Gelmesini Sağlayan Politikalar"
          },
          {
            "outcomeCode": "SB.7.3.2",
            "questionCount": 2,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Osmanlı Devleti’nin Uygulamaya Koyduğu Yenilikler"
          }
        ],
        "sourceOrigin": "meb_official"
      },
      {
        "id": "senaryo_3",
        "name": "Senaryo 3 (8 Soru)",
        "description": "MEB ÖDSGM 2026-2027 1. Dönem 2. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 3 (8 Soru) formatı (Toplam 100 Puan).",
        "totalQuestions": 8,
        "distributions": [
          {
            "outcomeCode": "SB.7.1.2",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Özel Gereksinimli Bireyler İçin Fırsat Eşitliği"
          },
          {
            "outcomeCode": "SB.7.1.3",
            "questionCount": 1,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "Millî Meseleler Karşısında Türk Toplumunun Tutum ve Davranışları"
          },
          {
            "outcomeCode": "SB.7.2.2",
            "questionCount": 2,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Bölgesel ve Küresel Sorunların Çözümünde Ülkemizin Rolü"
          },
          {
            "outcomeCode": "SB.7.3.1",
            "questionCount": 2,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Osmanlı Devleti’nin Cihan Devleti Hâline Gelmesini Sağlayan Politikalar"
          },
          {
            "outcomeCode": "SB.7.3.2",
            "questionCount": 2,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Osmanlı Devleti’nin Uygulamaya Koyduğu Yenilikler"
          }
        ],
        "sourceOrigin": "meb_official"
      },
      {
        "id": "senaryo_4",
        "name": "Senaryo 4 (6 Soru)",
        "description": "MEB ÖDSGM 2026-2027 1. Dönem 2. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 4 (6 Soru) formatı (Toplam 100 Puan).",
        "totalQuestions": 6,
        "distributions": [
          {
            "outcomeCode": "SB.7.1.3",
            "questionCount": 1,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "Millî Meseleler Karşısında Türk Toplumunun Tutum ve Davranışları"
          },
          {
            "outcomeCode": "SB.7.2.1",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Küreselleşmenin İnsan ve Toplum Hayatına Etkisi"
          },
          {
            "outcomeCode": "SB.7.2.2",
            "questionCount": 2,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Bölgesel ve Küresel Sorunların Çözümünde Ülkemizin Rolü"
          },
          {
            "outcomeCode": "SB.7.3.1",
            "questionCount": 2,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Osmanlı Devleti’nin Cihan Devleti Hâline Gelmesini Sağlayan Politikalar"
          }
        ],
        "sourceOrigin": "meb_official"
      },
      {
        "id": "senaryo_5",
        "name": "Senaryo 5 (6 Soru)",
        "description": "MEB ÖDSGM 2026-2027 1. Dönem 2. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 5 (6 Soru) formatı (Toplam 100 Puan).",
        "totalQuestions": 6,
        "distributions": [
          {
            "outcomeCode": "SB.7.1.2",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Özel Gereksinimli Bireyler İçin Fırsat Eşitliği"
          },
          {
            "outcomeCode": "SB.7.2.1",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Küreselleşmenin İnsan ve Toplum Hayatına Etkisi"
          },
          {
            "outcomeCode": "SB.7.2.2",
            "questionCount": 2,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Bölgesel ve Küresel Sorunların Çözümünde Ülkemizin Rolü"
          },
          {
            "outcomeCode": "SB.7.3.1",
            "questionCount": 2,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Osmanlı Devleti’nin Cihan Devleti Hâline Gelmesini Sağlayan Politikalar"
          }
        ],
        "sourceOrigin": "meb_official"
      },
      {
        "id": "senaryo_6",
        "name": "Senaryo 6 (8 Soru)",
        "description": "MEB ÖDSGM 2026-2027 1. Dönem 2. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 6 (8 Soru) formatı (Toplam 100 Puan).",
        "totalQuestions": 8,
        "distributions": [
          {
            "outcomeCode": "SB.7.1.3",
            "questionCount": 1,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "Millî Meseleler Karşısında Türk Toplumunun Tutum ve Davranışları"
          },
          {
            "outcomeCode": "SB.7.2.1",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Küreselleşmenin İnsan ve Toplum Hayatına Etkisi"
          },
          {
            "outcomeCode": "SB.7.2.2",
            "questionCount": 2,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Bölgesel ve Küresel Sorunların Çözümünde Ülkemizin Rolü"
          },
          {
            "outcomeCode": "SB.7.3.1",
            "questionCount": 2,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Osmanlı Devleti’nin Cihan Devleti Hâline Gelmesini Sağlayan Politikalar"
          },
          {
            "outcomeCode": "SB.7.3.2",
            "questionCount": 2,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Osmanlı Devleti’nin Uygulamaya Koyduğu Yenilikler"
          }
        ],
        "sourceOrigin": "meb_official"
      },
      {
        "id": "senaryo_7",
        "name": "Senaryo 7 (8 Soru)",
        "description": "MEB ÖDSGM 2026-2027 1. Dönem 2. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 7 (8 Soru) formatı (Toplam 100 Puan).",
        "totalQuestions": 8,
        "distributions": [
          {
            "outcomeCode": "SB.7.1.1",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Gruplarda ve Sosyal Hayatta İletişimin Önemi"
          },
          {
            "outcomeCode": "SB.7.2.1",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Küreselleşmenin İnsan ve Toplum Hayatına Etkisi"
          },
          {
            "outcomeCode": "SB.7.2.2",
            "questionCount": 2,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Bölgesel ve Küresel Sorunların Çözümünde Ülkemizin Rolü"
          },
          {
            "outcomeCode": "SB.7.3.1",
            "questionCount": 2,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Osmanlı Devleti’nin Cihan Devleti Hâline Gelmesini Sağlayan Politikalar"
          },
          {
            "outcomeCode": "SB.7.3.2",
            "questionCount": 2,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Osmanlı Devleti’nin Uygulamaya Koyduğu Yenilikler"
          }
        ],
        "sourceOrigin": "meb_official"
      }
    ],
    "din_kulturu": [
      {
        "id": "senaryo_1",
        "name": "Senaryo 1 (7 Soru)",
        "description": "MEB ÖDSGM 2026-2027 1. Dönem 2. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 1 (7 Soru) formatı (Toplam 100 Puan).",
        "totalQuestions": 7,
        "distributions": [
          {
            "outcomeCode": "DKAB.7.1.2",
            "questionCount": 1,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "Dünya ve Ahiret Hayatı"
          },
          {
            "outcomeCode": "DKAB.7.1.3",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Melek ve Ahiret İnancının İnsana Kazandırdıkları"
          },
          {
            "outcomeCode": "DKAB.7.2.2",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Kurban İbadeti"
          },
          {
            "outcomeCode": "DKAB.7.2.3",
            "questionCount": 2,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Hac ve Kurban İbadetinin Kültürümüze Yansımaları"
          },
          {
            "outcomeCode": "DKAB.7.2.4",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Bir Sure Öğreniyorum: Kâfirun Suresi"
          },
          {
            "outcomeCode": "DKAB.7.3.1",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Din Anlayışındaki Yorum Farklılıkları"
          }
        ],
        "sourceOrigin": "meb_official"
      },
      {
        "id": "senaryo_2",
        "name": "Senaryo 2 (8 Soru)",
        "description": "MEB ÖDSGM 2026-2027 1. Dönem 2. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 2 (8 Soru) formatı (Toplam 100 Puan).",
        "totalQuestions": 8,
        "distributions": [
          {
            "outcomeCode": "DKAB.7.1.1",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Varlıklar Âlemi"
          },
          {
            "outcomeCode": "DKAB.7.1.3",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Melek ve Ahiret İnancının İnsana Kazandırdıkları"
          },
          {
            "outcomeCode": "DKAB.7.2.1",
            "questionCount": 1,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "Hac ve Umre İbadeti"
          },
          {
            "outcomeCode": "DKAB.7.2.2",
            "questionCount": 2,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Kurban İbadeti"
          },
          {
            "outcomeCode": "DKAB.7.2.3",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Hac ve Kurban İbadetinin Kültürümüze Yansımaları"
          },
          {
            "outcomeCode": "DKAB.7.2.4",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Bir Sure Öğreniyorum: Kâfirun Suresi"
          },
          {
            "outcomeCode": "DKAB.7.3.1",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Din Anlayışındaki Yorum Farklılıkları"
          }
        ],
        "sourceOrigin": "meb_official"
      },
      {
        "id": "senaryo_3",
        "name": "Senaryo 3 (8 Soru)",
        "description": "MEB ÖDSGM 2026-2027 1. Dönem 2. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 3 (8 Soru) formatı (Toplam 100 Puan).",
        "totalQuestions": 8,
        "distributions": [
          {
            "outcomeCode": "DKAB.7.1.2",
            "questionCount": 1,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "Dünya ve Ahiret Hayatı"
          },
          {
            "outcomeCode": "DKAB.7.1.4",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Bir Sure Öğreniyorum: Nâs Suresi"
          },
          {
            "outcomeCode": "DKAB.7.2.1",
            "questionCount": 2,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "Hac ve Umre İbadeti"
          },
          {
            "outcomeCode": "DKAB.7.2.2",
            "questionCount": 2,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Kurban İbadeti"
          },
          {
            "outcomeCode": "DKAB.7.2.3",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Hac ve Kurban İbadetinin Kültürümüze Yansımaları"
          },
          {
            "outcomeCode": "DKAB.7.2.4",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Bir Sure Öğreniyorum: Kâfirun Suresi"
          }
        ],
        "sourceOrigin": "meb_official"
      },
      {
        "id": "senaryo_4",
        "name": "Senaryo 4 (7 Soru)",
        "description": "MEB ÖDSGM 2026-2027 1. Dönem 2. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 4 (7 Soru) formatı (Toplam 100 Puan).",
        "totalQuestions": 7,
        "distributions": [
          {
            "outcomeCode": "DKAB.7.1.1",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Varlıklar Âlemi"
          },
          {
            "outcomeCode": "DKAB.7.1.4",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Bir Sure Öğreniyorum: Nâs Suresi"
          },
          {
            "outcomeCode": "DKAB.7.2.1",
            "questionCount": 2,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "Hac ve Umre İbadeti"
          },
          {
            "outcomeCode": "DKAB.7.2.2",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Kurban İbadeti"
          },
          {
            "outcomeCode": "DKAB.7.2.3",
            "questionCount": 2,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Hac ve Kurban İbadetinin Kültürümüze Yansımaları"
          }
        ],
        "sourceOrigin": "meb_official"
      },
      {
        "id": "senaryo_5",
        "name": "Senaryo 5 (6 Soru)",
        "description": "MEB ÖDSGM 2026-2027 1. Dönem 2. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 5 (6 Soru) formatı (Toplam 100 Puan).",
        "totalQuestions": 6,
        "distributions": [
          {
            "outcomeCode": "DKAB.7.1.3",
            "questionCount": 2,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Melek ve Ahiret İnancının İnsana Kazandırdıkları"
          },
          {
            "outcomeCode": "DKAB.7.2.1",
            "questionCount": 1,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "Hac ve Umre İbadeti"
          },
          {
            "outcomeCode": "DKAB.7.2.2",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Kurban İbadeti"
          },
          {
            "outcomeCode": "DKAB.7.2.3",
            "questionCount": 2,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Hac ve Kurban İbadetinin Kültürümüze Yansımaları"
          }
        ],
        "sourceOrigin": "meb_official"
      }
    ],
    "ingilizce": [
      {
        "id": "senaryo_1",
        "name": "Senaryo 1 (5 Soru)",
        "description": "MEB ÖDSGM 2026-2027 1. Dönem 2. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 1 (5 Soru) formatı (Toplam 100 Puan).",
        "totalQuestions": 5,
        "distributions": [
          {
            "outcomeCode": "E7.2.R1",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Students will be able to understand  short and simple texts on sports."
          },
          {
            "outcomeCode": "E7.3.R1",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Students will be able to spot specific  information about names and dates in past events in written texts."
          },
          {
            "outcomeCode": "E7.3.W1",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Students will be able to write a short  and simple report about past events."
          },
          {
            "outcomeCode": "E7.4.R1",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Students will be able to understand  past and present events in simple texts including explanations and reasons."
          },
          {
            "outcomeCode": "E7.4.W1",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Students will be able to write pieces describing wildlife."
          }
        ],
        "sourceOrigin": "meb_official"
      },
      {
        "id": "senaryo_2",
        "name": "Senaryo 2 (5 Soru)",
        "description": "MEB ÖDSGM 2026-2027 1. Dönem 2. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 2 (5 Soru) formatı (Toplam 100 Puan).",
        "totalQuestions": 5,
        "distributions": [
          {
            "outcomeCode": "E7.1.R1",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Students will be able to understand a simple text about appearances,  ersonalities, and comparisons including explanatio"
          },
          {
            "outcomeCode": "E7.2.W1",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Students will be able to write pieces  about routines/daily activities by using frequency adverbs."
          },
          {
            "outcomeCode": "E7.3.R1",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Students will be able to spot specific  information about names and dates in past events in written texts."
          },
          {
            "outcomeCode": "E7.3.W1",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Students will be able to write a short  and simple report about past events."
          },
          {
            "outcomeCode": "E7.4.R2",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Students will be able to spot the names of wild animals in simple texts."
          }
        ],
        "sourceOrigin": "meb_official"
      },
      {
        "id": "senaryo_3",
        "name": "Senaryo 3 (6 Soru)",
        "description": "MEB ÖDSGM 2026-2027 1. Dönem 2. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 3 (6 Soru) formatı (Toplam 100 Puan).",
        "totalQuestions": 6,
        "distributions": [
          {
            "outcomeCode": "E7.1.W1",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Students will be able to write simple pieces to compare people."
          },
          {
            "outcomeCode": "E7.2.R1",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Students will be able to understand  short and simple texts on sports."
          },
          {
            "outcomeCode": "E7.3.R1",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Students will be able to spot specific  information about names and dates in past events in written texts."
          },
          {
            "outcomeCode": "E7.3.W1",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Students will be able to write a short  and simple report about past events."
          },
          {
            "outcomeCode": "E7.4.R1",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Students will be able to understand  past and present events in simple texts including explanations and reasons."
          },
          {
            "outcomeCode": "E7.4.W1",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Students will be able to write pieces describing wildlife."
          }
        ],
        "sourceOrigin": "meb_official"
      },
      {
        "id": "senaryo_4",
        "name": "Senaryo 4 (7 Soru)",
        "description": "MEB ÖDSGM 2026-2027 1. Dönem 2. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 4 (7 Soru) formatı (Toplam 100 Puan).",
        "totalQuestions": 7,
        "distributions": [
          {
            "outcomeCode": "E7.1.R1",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Students will be able to understand a simple text about appearances,  ersonalities, and comparisons including explanatio"
          },
          {
            "outcomeCode": "E7.3.R1",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Students will be able to spot specific  information about names and dates in past events in written texts."
          },
          {
            "outcomeCode": "E7.3.W1",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Students will be able to write a short  and simple report about past events."
          },
          {
            "outcomeCode": "E7.4.R1",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Students will be able to understand  past and present events in simple texts including explanations and reasons."
          },
          {
            "outcomeCode": "E7.4.R2",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Students will be able to spot the names of wild animals in simple texts."
          },
          {
            "outcomeCode": "E7.4.W1",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Students will be able to write pieces describing wildlife."
          },
          {
            "outcomeCode": "E7.5.R1",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Students will be able to understand simple texts about daily routines and preferences."
          }
        ],
        "sourceOrigin": "meb_official"
      },
      {
        "id": "senaryo_5",
        "name": "Senaryo 5 (8 Soru)",
        "description": "MEB ÖDSGM 2026-2027 1. Dönem 2. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 5 (8 Soru) formatı (Toplam 100 Puan).",
        "totalQuestions": 8,
        "distributions": [
          {
            "outcomeCode": "E7.1.R1",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Students will be able to understand a simple text about appearances,  ersonalities, and comparisons including explanatio"
          },
          {
            "outcomeCode": "E7.2.W1",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Students will be able to write pieces  about routines/daily activities by using frequency adverbs."
          },
          {
            "outcomeCode": "E7.3.R1",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Students will be able to spot specific  information about names and dates in past events in written texts."
          },
          {
            "outcomeCode": "E7.3.W1",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Students will be able to write a short  and simple report about past events."
          },
          {
            "outcomeCode": "E7.4.R1",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Students will be able to understand  past and present events in simple texts including explanations and reasons."
          },
          {
            "outcomeCode": "E7.4.R2",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Students will be able to spot the names of wild animals in simple texts."
          },
          {
            "outcomeCode": "E7.4.W1",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Students will be able to write pieces describing wildlife."
          },
          {
            "outcomeCode": "E7.5.R2",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Students will be able to understand simple texts about past events."
          }
        ],
        "sourceOrigin": "meb_official"
      }
    ]
  },
  "8": {
    "turkce": [
      {
        "id": "senaryo_1",
        "name": "Senaryo 1 (8 Soru)",
        "description": "MEB ÖDSGM 2026-2027 1. Dönem 2. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 1 (8 Soru) formatı (Toplam 100 Puan).",
        "totalQuestions": 8,
        "distributions": [
          {
            "outcomeCode": "T.8.3.5",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Bağlamdan yararlanarak bilmediği kelime ve kelime gruplarının anlamını tahmin eder."
          },
          {
            "outcomeCode": "T.8.3.7",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Metindeki söz sanatlarını tespit eder."
          },
          {
            "outcomeCode": "T.8.3.14",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Metinle ilgili soruları cevaplar."
          },
          {
            "outcomeCode": "T.8.3.16",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Metnin konusunu belirler."
          },
          {
            "outcomeCode": "T.8.3.17",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Metnin ana fikrini/ana duygusunu belirler."
          },
          {
            "outcomeCode": "T.8.3.19",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Metnin içeriğine uygun başlık/başlıklar belirler."
          },
          {
            "outcomeCode": "T.8.4.4",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Yazma stratejilerini uygular."
          },
          {
            "outcomeCode": "T.8.4.18",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Cümlenin ögelerini ayırt eder."
          }
        ],
        "sourceOrigin": "meb_official"
      },
      {
        "id": "senaryo_2",
        "name": "Senaryo 2 (9 Soru)",
        "description": "MEB ÖDSGM 2026-2027 1. Dönem 2. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 2 (9 Soru) formatı (Toplam 100 Puan).",
        "totalQuestions": 9,
        "distributions": [
          {
            "outcomeCode": "T.8.3.5",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Bağlamdan yararlanarak bilmediği kelime ve kelime gruplarının anlamını tahmin eder."
          },
          {
            "outcomeCode": "T.8.3.7",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Metindeki söz sanatlarını tespit eder."
          },
          {
            "outcomeCode": "T.8.3.15",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Metinle ilgili sorular sorar."
          },
          {
            "outcomeCode": "T.8.3.17",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Metnin ana fikrini/ana duygusunu belirler."
          },
          {
            "outcomeCode": "T.8.3.18",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Metindeki yardımcı fikirleri belirler."
          },
          {
            "outcomeCode": "T.8.3.19",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Metnin içeriğine uygun başlık/başlıklar belirler."
          },
          {
            "outcomeCode": "T.8.3.20",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Okuduğu metinlerdeki hikâye unsurlarını belirler."
          },
          {
            "outcomeCode": "T.8.4.1",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Alt Öğrenme Alanı Yok"
          },
          {
            "outcomeCode": "T.8.4.18",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Cümlenin ögelerini ayırt eder."
          }
        ],
        "sourceOrigin": "meb_official"
      },
      {
        "id": "senaryo_3",
        "name": "Senaryo 3 (8 Soru)",
        "description": "MEB ÖDSGM 2026-2027 1. Dönem 2. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 3 (8 Soru) formatı (Toplam 100 Puan).",
        "totalQuestions": 8,
        "distributions": [
          {
            "outcomeCode": "T.8.3.5",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Bağlamdan yararlanarak bilmediği kelime ve kelime gruplarının anlamını tahmin eder."
          },
          {
            "outcomeCode": "T.8.3.7",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Metindeki söz sanatlarını tespit eder."
          },
          {
            "outcomeCode": "T.8.3.14",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Metinle ilgili soruları cevaplar."
          },
          {
            "outcomeCode": "T.8.3.17",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Metnin ana fikrini/ana duygusunu belirler."
          },
          {
            "outcomeCode": "T.8.3.20",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Okuduğu metinlerdeki hikâye unsurlarını belirler."
          },
          {
            "outcomeCode": "T.8.3.24",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Metindeki gerçek ve kurgusal unsurları ayırt eder."
          },
          {
            "outcomeCode": "T.8.4.3",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Hikâye edici metin yazar."
          },
          {
            "outcomeCode": "T.8.4.9",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Yazılarında anlatım biçimlerini kullanır."
          }
        ],
        "sourceOrigin": "meb_official"
      },
      {
        "id": "senaryo_4",
        "name": "Senaryo 4 (10 Soru)",
        "description": "MEB ÖDSGM 2026-2027 1. Dönem 2. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 4 (10 Soru) formatı (Toplam 100 Puan).",
        "totalQuestions": 10,
        "distributions": [
          {
            "outcomeCode": "T.8.3.5",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Bağlamdan yararlanarak bilmediği kelime ve kelime gruplarının anlamını tahmin eder."
          },
          {
            "outcomeCode": "T.8.3.6",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Deyim, atasözü ve özdeyişlerin metne katkısını belirler."
          },
          {
            "outcomeCode": "T.8.3.9",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Fiilimsilerin cümledeki işlevlerini kavrar."
          },
          {
            "outcomeCode": "T.8.3.11",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Metindeki anlatım biçimlerini belirler."
          },
          {
            "outcomeCode": "T.8.3.16",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Metnin konusunu belirler."
          },
          {
            "outcomeCode": "T.8.3.22",
            "questionCount": 1,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "Metinde ele alınan sorunlara farklı çözümler üretir."
          },
          {
            "outcomeCode": "T.8.3.25",
            "questionCount": 1,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "Okudukları ile ilgili çıkarımlarda bulunur."
          },
          {
            "outcomeCode": "T.8.4.6",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Bir işi işlem basamaklarına göre yazar."
          },
          {
            "outcomeCode": "T.8.4.18",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Cümlenin ögelerini ayırt eder."
          },
          {
            "outcomeCode": "T.8.4.19",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Cümle türlerini tanır."
          }
        ],
        "sourceOrigin": "meb_official"
      },
      {
        "id": "senaryo_5",
        "name": "Senaryo 5 (9 Soru)",
        "description": "MEB ÖDSGM 2026-2027 1. Dönem 2. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 5 (9 Soru) formatı (Toplam 100 Puan).",
        "totalQuestions": 9,
        "distributions": [
          {
            "outcomeCode": "T.8.3.5",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Bağlamdan yararlanarak bilmediği kelime ve kelime gruplarının anlamını tahmin eder."
          },
          {
            "outcomeCode": "T.8.3.6",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Deyim, atasözü ve özdeyişlerin metne katkısını belirler."
          },
          {
            "outcomeCode": "T.8.3.7",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Metindeki söz sanatlarını tespit eder."
          },
          {
            "outcomeCode": "T.8.3.14",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Metinle ilgili soruları cevaplar."
          },
          {
            "outcomeCode": "T.8.3.20",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Okuduğu metinlerdeki hikâye unsurlarını belirler."
          },
          {
            "outcomeCode": "T.8.3.24",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Metindeki gerçek ve kurgusal unsurları ayırt eder."
          },
          {
            "outcomeCode": "T.8.3.26",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Metin türlerini ayırt eder."
          },
          {
            "outcomeCode": "T.8.4.4",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Yazma stratejilerini uygular."
          },
          {
            "outcomeCode": "T.8.4.18",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Cümlenin ögelerini ayırt eder."
          }
        ],
        "sourceOrigin": "meb_official"
      },
      {
        "id": "senaryo_6",
        "name": "Senaryo 6 (8 Soru)",
        "description": "MEB ÖDSGM 2026-2027 1. Dönem 2. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 6 (8 Soru) formatı (Toplam 100 Puan).",
        "totalQuestions": 8,
        "distributions": [
          {
            "outcomeCode": "T.8.3.5",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Bağlamdan yararlanarak bilmediği kelime ve kelime gruplarının anlamını tahmin eder."
          },
          {
            "outcomeCode": "T.8.3.14",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Metinle ilgili soruları cevaplar."
          },
          {
            "outcomeCode": "T.8.3.22",
            "questionCount": 1,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "Metinde ele alınan sorunlara farklı çözümler üretir."
          },
          {
            "outcomeCode": "T.8.3.25",
            "questionCount": 1,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "Okudukları ile ilgili çıkarımlarda bulunur."
          },
          {
            "outcomeCode": "T.8.3.26",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Metin türlerini ayırt eder."
          },
          {
            "outcomeCode": "T.8.3.35",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Metindeki iş ve işlem basamaklarını kavrar."
          },
          {
            "outcomeCode": "T.8.4.2",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Bilgilendirici metin yazar."
          },
          {
            "outcomeCode": "T.8.4.19",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Cümle türlerini tanır."
          }
        ],
        "sourceOrigin": "meb_official"
      },
      {
        "id": "senaryo_7",
        "name": "Senaryo 7 (7 Soru)",
        "description": "MEB ÖDSGM 2026-2027 1. Dönem 2. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 7 (7 Soru) formatı (Toplam 100 Puan).",
        "totalQuestions": 7,
        "distributions": [
          {
            "outcomeCode": "T.8.3.7",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Metindeki söz sanatlarını tespit eder."
          },
          {
            "outcomeCode": "T.8.3.14",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Metinle ilgili soruları cevaplar."
          },
          {
            "outcomeCode": "T.8.3.25",
            "questionCount": 1,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "Okudukları ile ilgili çıkarımlarda bulunur."
          },
          {
            "outcomeCode": "T.8.3.26",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Metin türlerini ayırt eder."
          },
          {
            "outcomeCode": "T.8.4.9",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Yazılarında anlatım biçimlerini kullanır."
          },
          {
            "outcomeCode": "T.8.4.12",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Kısa metinler yazar."
          },
          {
            "outcomeCode": "T.8.4.19",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Cümle türlerini tanır."
          }
        ],
        "sourceOrigin": "meb_official"
      }
    ],
    "matematik": [
      {
        "id": "senaryo_1",
        "name": "Senaryo 1 (11 Soru)",
        "description": "MEB ÖDSGM 2026-2027 1. Dönem 2. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 1 (11 Soru) formatı (Toplam 100 Puan).",
        "totalQuestions": 11,
        "distributions": [
          {
            "outcomeCode": "M.8.1.3.4",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Kareköklü ifadelerde çarpma ve bölme işlemlerini yapar."
          },
          {
            "outcomeCode": "M.8.1.3.5",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Kareköklü ifadelerde toplama ve çıkarma işlemlerini yapar."
          },
          {
            "outcomeCode": "M.8.1.3.7",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Ondalık ifadelerin kareköklerini belirler."
          },
          {
            "outcomeCode": "M.8.4.1.1",
            "questionCount": 1,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "Veri Analizi"
          },
          {
            "outcomeCode": "M.8.4.1.2",
            "questionCount": 2,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Verileri sütun, daire veya çizgi grafiği ile gösterir ve bu gösterimler arasında uygun olan dönüşümleri yapar."
          },
          {
            "outcomeCode": "M.8.5.1.1",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Basit Olayların Olma Olasılığı"
          },
          {
            "outcomeCode": "M.8.5.1.2",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "“Daha fazla”, “eşit”, “daha az” olasılıklı olayları ayırt eder, örnek verir."
          },
          {
            "outcomeCode": "M.8.5.1.5",
            "questionCount": 2,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Basit bir olayın olma olasılığını hesaplar."
          },
          {
            "outcomeCode": "M.8.2.1.1",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Cebirsel İfadeler ve Özdeşlikler"
          }
        ],
        "sourceOrigin": "meb_official"
      },
      {
        "id": "senaryo_2",
        "name": "Senaryo 2 (9 Soru)",
        "description": "MEB ÖDSGM 2026-2027 1. Dönem 2. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 2 (9 Soru) formatı (Toplam 100 Puan).",
        "totalQuestions": 9,
        "distributions": [
          {
            "outcomeCode": "M.8.1.3.4",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Kareköklü ifadelerde çarpma ve bölme işlemlerini yapar."
          },
          {
            "outcomeCode": "M.8.1.3.5",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Kareköklü ifadelerde toplama ve çıkarma işlemlerini yapar."
          },
          {
            "outcomeCode": "M.8.1.3.6",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Kareköklü bir ifade ile çarpıldığında, sonucu bir doğal sayı yapan çarpanlara örnek verir."
          },
          {
            "outcomeCode": "M.8.1.3.8",
            "questionCount": 1,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "Gerçek sayıları tanır, rasyonel ve irrasyonel sayılarla ilişkilendirir."
          },
          {
            "outcomeCode": "M.8.4.1.2",
            "questionCount": 2,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Verileri sütun, daire veya çizgi grafiği ile gösterir ve bu gösterimler arasında uygun olan dönüşümleri yapar."
          },
          {
            "outcomeCode": "M.8.5.1.3",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Eşit şansa sahip olan olaylarda her bir çıktının olasılık değerinin eşit olduğunu ve bu değerin 1/n olduğunu açıklar."
          },
          {
            "outcomeCode": "M.8.5.1.5",
            "questionCount": 2,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Basit bir olayın olma olasılığını hesaplar."
          }
        ],
        "sourceOrigin": "meb_official"
      },
      {
        "id": "senaryo_3",
        "name": "Senaryo 3 (8 Soru)",
        "description": "MEB ÖDSGM 2026-2027 1. Dönem 2. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 3 (8 Soru) formatı (Toplam 100 Puan).",
        "totalQuestions": 8,
        "distributions": [
          {
            "outcomeCode": "M.8.1.3.2",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Tam kare olmayan kareköklü bir sayının hangi iki doğal sayı arasında olduğunu belirler."
          },
          {
            "outcomeCode": "M.8.1.3.4",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Kareköklü ifadelerde çarpma ve bölme işlemlerini yapar."
          },
          {
            "outcomeCode": "M.8.1.3.5",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Kareköklü ifadelerde toplama ve çıkarma işlemlerini yapar."
          },
          {
            "outcomeCode": "M.8.1.3.7",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Ondalık ifadelerin kareköklerini belirler."
          },
          {
            "outcomeCode": "M.8.4.1.2",
            "questionCount": 2,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Verileri sütun, daire veya çizgi grafiği ile gösterir ve bu gösterimler arasında uygun olan dönüşümleri yapar."
          },
          {
            "outcomeCode": "M.8.5.1.1",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Basit Olayların Olma Olasılığı"
          },
          {
            "outcomeCode": "M.8.5.1.3",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Eşit şansa sahip olan olaylarda her bir çıktının olasılık değerinin eşit olduğunu ve bu değerin 1/n olduğunu açıklar."
          }
        ],
        "sourceOrigin": "meb_official"
      },
      {
        "id": "senaryo_4",
        "name": "Senaryo 4 (9 Soru)",
        "description": "MEB ÖDSGM 2026-2027 1. Dönem 2. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 4 (9 Soru) formatı (Toplam 100 Puan).",
        "totalQuestions": 9,
        "distributions": [
          {
            "outcomeCode": "M.8.1.3.4",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Kareköklü ifadelerde çarpma ve bölme işlemlerini yapar."
          },
          {
            "outcomeCode": "M.8.1.3.5",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Kareköklü ifadelerde toplama ve çıkarma işlemlerini yapar."
          },
          {
            "outcomeCode": "M.8.1.3.6",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Kareköklü bir ifade ile çarpıldığında, sonucu bir doğal sayı yapan çarpanlara örnek verir."
          },
          {
            "outcomeCode": "M.8.1.3.7",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Ondalık ifadelerin kareköklerini belirler."
          },
          {
            "outcomeCode": "M.8.4.1.1",
            "questionCount": 1,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "Veri Analizi"
          },
          {
            "outcomeCode": "M.8.4.1.2",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Verileri sütun, daire veya çizgi grafiği ile gösterir ve bu gösterimler arasında uygun olan dönüşümleri yapar."
          },
          {
            "outcomeCode": "M.8.5.1.1",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Basit Olayların Olma Olasılığı"
          },
          {
            "outcomeCode": "M.8.5.1.2",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "“Daha fazla”, “eşit”, “daha az” olasılıklı olayları ayırt eder, örnek verir."
          },
          {
            "outcomeCode": "M.8.5.1.3",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Eşit şansa sahip olan olaylarda her bir çıktının olasılık değerinin eşit olduğunu ve bu değerin 1/n olduğunu açıklar."
          }
        ],
        "sourceOrigin": "meb_official"
      },
      {
        "id": "senaryo_5",
        "name": "Senaryo 5 (9 Soru)",
        "description": "MEB ÖDSGM 2026-2027 1. Dönem 2. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 5 (9 Soru) formatı (Toplam 100 Puan).",
        "totalQuestions": 9,
        "distributions": [
          {
            "outcomeCode": "M.8.1.3.4",
            "questionCount": 2,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Kareköklü ifadelerde çarpma ve bölme işlemlerini yapar."
          },
          {
            "outcomeCode": "M.8.1.3.5",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Kareköklü ifadelerde toplama ve çıkarma işlemlerini yapar."
          },
          {
            "outcomeCode": "M.8.1.3.6",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Kareköklü bir ifade ile çarpıldığında, sonucu bir doğal sayı yapan çarpanlara örnek verir."
          },
          {
            "outcomeCode": "M.8.1.3.7",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Ondalık ifadelerin kareköklerini belirler."
          },
          {
            "outcomeCode": "M.8.4.1.2",
            "questionCount": 2,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Verileri sütun, daire veya çizgi grafiği ile gösterir ve bu gösterimler arasında uygun olan dönüşümleri yapar."
          },
          {
            "outcomeCode": "M.8.5.1.1",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Basit Olayların Olma Olasılığı"
          },
          {
            "outcomeCode": "M.8.5.1.2",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "“Daha fazla”, “eşit”, “daha az” olasılıklı olayları ayırt eder, örnek verir."
          }
        ],
        "sourceOrigin": "meb_official"
      },
      {
        "id": "senaryo_6",
        "name": "Senaryo 6 (7 Soru)",
        "description": "MEB ÖDSGM 2026-2027 1. Dönem 2. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 6 (7 Soru) formatı (Toplam 100 Puan).",
        "totalQuestions": 7,
        "distributions": [
          {
            "outcomeCode": "M.8.1.3.4",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Kareköklü ifadelerde çarpma ve bölme işlemlerini yapar."
          },
          {
            "outcomeCode": "M.8.1.3.5",
            "questionCount": 2,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Kareköklü ifadelerde toplama ve çıkarma işlemlerini yapar."
          },
          {
            "outcomeCode": "M.8.4.1.1",
            "questionCount": 1,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "Veri Analizi"
          },
          {
            "outcomeCode": "M.8.4.1.2",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Verileri sütun, daire veya çizgi grafiği ile gösterir ve bu gösterimler arasında uygun olan dönüşümleri yapar."
          },
          {
            "outcomeCode": "M.8.5.1.1",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Basit Olayların Olma Olasılığı"
          },
          {
            "outcomeCode": "M.8.5.1.2",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "“Daha fazla”, “eşit”, “daha az” olasılıklı olayları ayırt eder, örnek verir."
          }
        ],
        "sourceOrigin": "meb_official"
      }
    ],
    "fen_bilimleri": [
      {
        "id": "senaryo_1",
        "name": "Senaryo 1 (9 Soru)",
        "description": "MEB ÖDSGM 2026-2027 1. Dönem 2. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 1 (9 Soru) formatı (Toplam 100 Puan).",
        "totalQuestions": 9,
        "distributions": [
          {
            "outcomeCode": "F.8.2.1.3",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "DNA’nın kendini nasıl eşlediğini ifade eder."
          },
          {
            "outcomeCode": "F.8.2.2.2",
            "questionCount": 1,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "Tek karakter çaprazlamaları ile ilgili problemler çözerek sonuçlar hakkında yorum yapar."
          },
          {
            "outcomeCode": "F.8.2.3.1",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "8.2.3. Mutasyon ve Modifikasyon"
          },
          {
            "outcomeCode": "F.8.2.3.3",
            "questionCount": 1,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "Mutasyonla modifikasyon arasındaki farklar ile ilgili çıkarımda bulunur."
          },
          {
            "outcomeCode": "F.8.3.1.1",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "8.3.1. Basınç"
          },
          {
            "outcomeCode": "F.8.3.1.3",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Katı, sıvı ve gazların basınç özelliklerinin günlük yaşam ve teknolojideki uygulamalarına örnekler verir."
          },
          {
            "outcomeCode": "F.8.4.1.2",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Elementleri periyodik tablo üzerinde metal, yarımetal ve ametal olarak sınıflandırır."
          },
          {
            "outcomeCode": "F.8.4.2.1",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "8.4.2. Fiziksel ve Kimyasal Değişimler"
          },
          {
            "outcomeCode": "F.8.4.4.2",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Asit ve bazlara günlük yaşamdan örnekler verir."
          }
        ],
        "sourceOrigin": "meb_official"
      },
      {
        "id": "senaryo_2",
        "name": "Senaryo 2 (8 Soru)",
        "description": "MEB ÖDSGM 2026-2027 1. Dönem 2. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 2 (8 Soru) formatı (Toplam 100 Puan).",
        "totalQuestions": 8,
        "distributions": [
          {
            "outcomeCode": "F.8.1.1.1",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "8.1.1. Mevsimlerin Oluşumu"
          },
          {
            "outcomeCode": "F.8.2.3.1",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "8.2.3. Mutasyon ve Modifikasyon"
          },
          {
            "outcomeCode": "F.8.2.4.1",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "8.2.4. Adaptasyon (Çevreye Uyum)"
          },
          {
            "outcomeCode": "F.8.3.1.1",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "8.3.1. Basınç"
          },
          {
            "outcomeCode": "F.8.3.1.2",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Sıvı basıncını etkileyen değişkenleri tahmin eder ve tahminlerini test eder."
          },
          {
            "outcomeCode": "F.8.4.1.1",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "8.4.1. Periyodik Sistem"
          },
          {
            "outcomeCode": "F.8.4.2.1",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "8.4.2. Fiziksel ve Kimyasal Değişimler"
          },
          {
            "outcomeCode": "F.8.4.4.1",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "8.4.4. Asitler ve Bazlar"
          }
        ],
        "sourceOrigin": "meb_official"
      },
      {
        "id": "senaryo_3",
        "name": "Senaryo 3 (9 Soru)",
        "description": "MEB ÖDSGM 2026-2027 1. Dönem 2. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 3 (9 Soru) formatı (Toplam 100 Puan).",
        "totalQuestions": 9,
        "distributions": [
          {
            "outcomeCode": "F.8.2.1.3",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "DNA’nın kendini nasıl eşlediğini ifade eder."
          },
          {
            "outcomeCode": "F.8.2.2.2",
            "questionCount": 1,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "Tek karakter çaprazlamaları ile ilgili problemler çözerek sonuçlar hakkında yorum yapar."
          },
          {
            "outcomeCode": "F.8.2.3.3",
            "questionCount": 1,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "Mutasyonla modifikasyon arasındaki farklar ile ilgili çıkarımda bulunur."
          },
          {
            "outcomeCode": "F.8.2.4.1",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "8.2.4. Adaptasyon (Çevreye Uyum)"
          },
          {
            "outcomeCode": "F.8.3.1.1",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "8.3.1. Basınç"
          },
          {
            "outcomeCode": "F.8.3.1.2",
            "questionCount": 2,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Sıvı basıncını etkileyen değişkenleri tahmin eder ve tahminlerini test eder."
          },
          {
            "outcomeCode": "F.8.4.1.2",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Elementleri periyodik tablo üzerinde metal, yarımetal ve ametal olarak sınıflandırır."
          },
          {
            "outcomeCode": "F.8.4.4.2",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Asit ve bazlara günlük yaşamdan örnekler verir."
          }
        ],
        "sourceOrigin": "meb_official"
      },
      {
        "id": "senaryo_4",
        "name": "Senaryo 4 (7 Soru)",
        "description": "MEB ÖDSGM 2026-2027 1. Dönem 2. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 4 (7 Soru) formatı (Toplam 100 Puan).",
        "totalQuestions": 7,
        "distributions": [
          {
            "outcomeCode": "F.8.1.1.1",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "8.1.1. Mevsimlerin Oluşumu"
          },
          {
            "outcomeCode": "F.8.2.3.2",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Örneklerden yola çıkarak modifikasyonu açıklar."
          },
          {
            "outcomeCode": "F.8.2.4.1",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "8.2.4. Adaptasyon (Çevreye Uyum)"
          },
          {
            "outcomeCode": "F.8.3.1.2",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Sıvı basıncını etkileyen değişkenleri tahmin eder ve tahminlerini test eder."
          },
          {
            "outcomeCode": "F.8.3.1.3",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Katı, sıvı ve gazların basınç özelliklerinin günlük yaşam ve teknolojideki uygulamalarına örnekler verir."
          },
          {
            "outcomeCode": "F.8.4.1.1",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "8.4.1. Periyodik Sistem"
          },
          {
            "outcomeCode": "F.8.4.2.1",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "8.4.2. Fiziksel ve Kimyasal Değişimler"
          }
        ],
        "sourceOrigin": "meb_official"
      },
      {
        "id": "senaryo_5",
        "name": "Senaryo 5 (8 Soru)",
        "description": "MEB ÖDSGM 2026-2027 1. Dönem 2. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 5 (8 Soru) formatı (Toplam 100 Puan).",
        "totalQuestions": 8,
        "distributions": [
          {
            "outcomeCode": "F.8.2.2.2",
            "questionCount": 1,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "Tek karakter çaprazlamaları ile ilgili problemler çözerek sonuçlar hakkında yorum yapar."
          },
          {
            "outcomeCode": "F.8.2.3.1",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "8.2.3. Mutasyon ve Modifikasyon"
          },
          {
            "outcomeCode": "F.8.2.3.3",
            "questionCount": 1,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "Mutasyonla modifikasyon arasındaki farklar ile ilgili çıkarımda bulunur."
          },
          {
            "outcomeCode": "F.8.3.1.1",
            "questionCount": 2,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "8.3.1. Basınç"
          },
          {
            "outcomeCode": "F.8.3.1.2",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Sıvı basıncını etkileyen değişkenleri tahmin eder ve tahminlerini test eder."
          },
          {
            "outcomeCode": "F.8.4.1.1",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "8.4.1. Periyodik Sistem"
          },
          {
            "outcomeCode": "F.8.4.4.1",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "8.4.4. Asitler ve Bazlar"
          }
        ],
        "sourceOrigin": "meb_official"
      },
      {
        "id": "senaryo_6",
        "name": "Senaryo 6 (8 Soru)",
        "description": "MEB ÖDSGM 2026-2027 1. Dönem 2. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 6 (8 Soru) formatı (Toplam 100 Puan).",
        "totalQuestions": 8,
        "distributions": [
          {
            "outcomeCode": "F.8.2.3.3",
            "questionCount": 1,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "Mutasyonla modifikasyon arasındaki farklar ile ilgili çıkarımda bulunur."
          },
          {
            "outcomeCode": "F.8.2.4.1",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "8.2.4. Adaptasyon (Çevreye Uyum)"
          },
          {
            "outcomeCode": "F.8.3.1.1",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "8.3.1. Basınç"
          },
          {
            "outcomeCode": "F.8.3.1.2",
            "questionCount": 2,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Sıvı basıncını etkileyen değişkenleri tahmin eder ve tahminlerini test eder."
          },
          {
            "outcomeCode": "F.8.3.1.3",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Katı, sıvı ve gazların basınç özelliklerinin günlük yaşam ve teknolojideki uygulamalarına örnekler verir."
          },
          {
            "outcomeCode": "F.8.4.1.2",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Elementleri periyodik tablo üzerinde metal, yarımetal ve ametal olarak sınıflandırır."
          },
          {
            "outcomeCode": "F.8.4.4.1",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "8.4.4. Asitler ve Bazlar"
          }
        ],
        "sourceOrigin": "meb_official"
      }
    ],
    "sosyal_bilgiler": [
      {
        "id": "senaryo_1",
        "name": "Senaryo 1 (6 Soru)",
        "description": "MEB ÖDSGM 2026-2027 1. Dönem 2. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 1 (6 Soru) formatı (Toplam 100 Puan).",
        "totalQuestions": 6,
        "distributions": [
          {
            "outcomeCode": "İTA.8.2.4",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Kuvâ-yı Millîye’nin oluşum sürecini ve sonrasında meydana gelen gelişmeleri kavrar."
          },
          {
            "outcomeCode": "İTA.8.2.5",
            "questionCount": 2,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "Millî Mücadele’nin hazırlık döneminde Mustafa Kemal’in yaptığı çalışmaları analiz eder."
          },
          {
            "outcomeCode": "İTA.8.2.6",
            "questionCount": 1,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "Misakımilli’nin kabulünü ve Büyük Millet Meclisinin açılışını vatanın bütünlüğü esası ile “ulusal egemenlik” ve “tam bağ"
          },
          {
            "outcomeCode": "İTA.8.2.7",
            "questionCount": 1,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "Büyük Millet Meclisine karşı ayaklanmalar ile ayaklanmaların bastırılması için alınan tedbirleri analiz eder."
          },
          {
            "outcomeCode": "İTA.8.2.8",
            "questionCount": 1,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "Mustafa Kemal’in ve Türk milletinin Sevr Antlaşması’na karşı tepkilerini değerlendirir."
          }
        ],
        "sourceOrigin": "meb_official"
      },
      {
        "id": "senaryo_2",
        "name": "Senaryo 2 (7 Soru)",
        "description": "MEB ÖDSGM 2026-2027 1. Dönem 2. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 2 (7 Soru) formatı (Toplam 100 Puan).",
        "totalQuestions": 7,
        "distributions": [
          {
            "outcomeCode": "İTA.8.2.3",
            "questionCount": 1,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "Mondros Ateşkes Antlaşması’nın imzalanması ve uygulanması karşısında Osmanlı yönetiminin, Mustafa Kemal’in ve halkın tut"
          },
          {
            "outcomeCode": "İTA.8.2.4",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Kuvâ-yı Millîye’nin oluşum sürecini ve sonrasında meydana gelen gelişmeleri kavrar."
          },
          {
            "outcomeCode": "İTA.8.2.5",
            "questionCount": 1,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "Millî Mücadele’nin hazırlık döneminde Mustafa Kemal’in yaptığı çalışmaları analiz eder."
          },
          {
            "outcomeCode": "İTA.8.2.6",
            "questionCount": 1,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "Misakımilli’nin kabulünü ve Büyük Millet Meclisinin açılışını vatanın bütünlüğü esası ile “ulusal egemenlik” ve “tam bağ"
          },
          {
            "outcomeCode": "İTA.8.2.7",
            "questionCount": 1,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "Büyük Millet Meclisine karşı ayaklanmalar ile ayaklanmaların bastırılması için alınan tedbirleri analiz eder."
          },
          {
            "outcomeCode": "İTA.8.2.8",
            "questionCount": 1,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "Mustafa Kemal’in ve Türk milletinin Sevr Antlaşması’na karşı tepkilerini değerlendirir."
          },
          {
            "outcomeCode": "İTA.8.3.1",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Millî Mücadele Dönemi’nde Doğu Cephesi ve Güney Cephesi’nde meydana gelen gelişmeleri kavrar."
          }
        ],
        "sourceOrigin": "meb_official"
      },
      {
        "id": "senaryo_3",
        "name": "Senaryo 3 (8 Soru)",
        "description": "MEB ÖDSGM 2026-2027 1. Dönem 2. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 3 (8 Soru) formatı (Toplam 100 Puan).",
        "totalQuestions": 8,
        "distributions": [
          {
            "outcomeCode": "İTA.8.2.4",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Kuvâ-yı Millîye’nin oluşum sürecini ve sonrasında meydana gelen gelişmeleri kavrar."
          },
          {
            "outcomeCode": "İTA.8.2.5",
            "questionCount": 1,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "Millî Mücadele’nin hazırlık döneminde Mustafa Kemal’in yaptığı çalışmaları analiz eder."
          },
          {
            "outcomeCode": "İTA.8.2.6",
            "questionCount": 1,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "Misakımilli’nin kabulünü ve Büyük Millet Meclisinin açılışını vatanın bütünlüğü esası ile “ulusal egemenlik” ve “tam bağ"
          },
          {
            "outcomeCode": "İTA.8.2.7",
            "questionCount": 1,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "Büyük Millet Meclisine karşı ayaklanmalar ile ayaklanmaların bastırılması için alınan tedbirleri analiz eder."
          },
          {
            "outcomeCode": "İTA.8.2.8",
            "questionCount": 1,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "Mustafa Kemal’in ve Türk milletinin Sevr Antlaşması’na karşı tepkilerini değerlendirir."
          },
          {
            "outcomeCode": "İTA.8.3.1",
            "questionCount": 2,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Millî Mücadele Dönemi’nde Doğu Cephesi ve Güney Cephesi’nde meydana gelen gelişmeleri kavrar."
          },
          {
            "outcomeCode": "İTA.8.3.2",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Millî Mücadele Dönemi’nde Batı Cephesi’nde meydana gelen gelişmeleri kavrar."
          }
        ],
        "sourceOrigin": "meb_official"
      },
      {
        "id": "senaryo_4",
        "name": "Senaryo 4 (6 Soru)",
        "description": "MEB ÖDSGM 2026-2027 1. Dönem 2. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 4 (6 Soru) formatı (Toplam 100 Puan).",
        "totalQuestions": 6,
        "distributions": [
          {
            "outcomeCode": "İTA.8.2.4",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Kuvâ-yı Millîye’nin oluşum sürecini ve sonrasında meydana gelen gelişmeleri kavrar."
          },
          {
            "outcomeCode": "İTA.8.2.5",
            "questionCount": 1,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "Millî Mücadele’nin hazırlık döneminde Mustafa Kemal’in yaptığı çalışmaları analiz eder."
          },
          {
            "outcomeCode": "İTA.8.2.6",
            "questionCount": 2,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "Misakımilli’nin kabulünü ve Büyük Millet Meclisinin açılışını vatanın bütünlüğü esası ile “ulusal egemenlik” ve “tam bağ"
          },
          {
            "outcomeCode": "İTA.8.2.7",
            "questionCount": 1,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "Büyük Millet Meclisine karşı ayaklanmalar ile ayaklanmaların bastırılması için alınan tedbirleri analiz eder."
          },
          {
            "outcomeCode": "İTA.8.2.8",
            "questionCount": 1,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "Mustafa Kemal’in ve Türk milletinin Sevr Antlaşması’na karşı tepkilerini değerlendirir."
          }
        ],
        "sourceOrigin": "meb_official"
      },
      {
        "id": "senaryo_5",
        "name": "Senaryo 5 (7 Soru)",
        "description": "MEB ÖDSGM 2026-2027 1. Dönem 2. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 5 (7 Soru) formatı (Toplam 100 Puan).",
        "totalQuestions": 7,
        "distributions": [
          {
            "outcomeCode": "İTA.8.2.3",
            "questionCount": 1,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "Mondros Ateşkes Antlaşması’nın imzalanması ve uygulanması karşısında Osmanlı yönetiminin, Mustafa Kemal’in ve halkın tut"
          },
          {
            "outcomeCode": "İTA.8.2.4",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Kuvâ-yı Millîye’nin oluşum sürecini ve sonrasında meydana gelen gelişmeleri kavrar."
          },
          {
            "outcomeCode": "İTA.8.2.5",
            "questionCount": 1,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "Millî Mücadele’nin hazırlık döneminde Mustafa Kemal’in yaptığı çalışmaları analiz eder."
          },
          {
            "outcomeCode": "İTA.8.2.6",
            "questionCount": 2,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "Misakımilli’nin kabulünü ve Büyük Millet Meclisinin açılışını vatanın bütünlüğü esası ile “ulusal egemenlik” ve “tam bağ"
          },
          {
            "outcomeCode": "İTA.8.2.7",
            "questionCount": 1,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "Büyük Millet Meclisine karşı ayaklanmalar ile ayaklanmaların bastırılması için alınan tedbirleri analiz eder."
          },
          {
            "outcomeCode": "İTA.8.2.8",
            "questionCount": 1,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "Mustafa Kemal’in ve Türk milletinin Sevr Antlaşması’na karşı tepkilerini değerlendirir."
          }
        ],
        "sourceOrigin": "meb_official"
      },
      {
        "id": "senaryo_6",
        "name": "Senaryo 6 (8 Soru)",
        "description": "MEB ÖDSGM 2026-2027 1. Dönem 2. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 6 (8 Soru) formatı (Toplam 100 Puan).",
        "totalQuestions": 8,
        "distributions": [
          {
            "outcomeCode": "İTA.8.2.4",
            "questionCount": 2,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Kuvâ-yı Millîye’nin oluşum sürecini ve sonrasında meydana gelen gelişmeleri kavrar."
          },
          {
            "outcomeCode": "İTA.8.2.5",
            "questionCount": 1,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "Millî Mücadele’nin hazırlık döneminde Mustafa Kemal’in yaptığı çalışmaları analiz eder."
          },
          {
            "outcomeCode": "İTA.8.2.6",
            "questionCount": 1,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "Misakımilli’nin kabulünü ve Büyük Millet Meclisinin açılışını vatanın bütünlüğü esası ile “ulusal egemenlik” ve “tam bağ"
          },
          {
            "outcomeCode": "İTA.8.2.7",
            "questionCount": 1,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "Büyük Millet Meclisine karşı ayaklanmalar ile ayaklanmaların bastırılması için alınan tedbirleri analiz eder."
          },
          {
            "outcomeCode": "İTA.8.2.8",
            "questionCount": 1,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "Mustafa Kemal’in ve Türk milletinin Sevr Antlaşması’na karşı tepkilerini değerlendirir."
          },
          {
            "outcomeCode": "İTA.8.3.1",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Millî Mücadele Dönemi’nde Doğu Cephesi ve Güney Cephesi’nde meydana gelen gelişmeleri kavrar."
          },
          {
            "outcomeCode": "İTA.8.3.2",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Millî Mücadele Dönemi’nde Batı Cephesi’nde meydana gelen gelişmeleri kavrar."
          }
        ],
        "sourceOrigin": "meb_official"
      },
      {
        "id": "senaryo_7",
        "name": "Senaryo 7 (8 Soru)",
        "description": "MEB ÖDSGM 2026-2027 1. Dönem 2. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 7 (8 Soru) formatı (Toplam 100 Puan).",
        "totalQuestions": 8,
        "distributions": [
          {
            "outcomeCode": "İTA.8.2.2",
            "questionCount": 1,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "Birinci Dünya Savaşı’nda Osmanlı Devleti’nin durumu hakkında çıkarımlarda bulunur."
          },
          {
            "outcomeCode": "İTA.8.2.3",
            "questionCount": 1,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "Mondros Ateşkes Antlaşması’nın imzalanması ve uygulanması karşısında Osmanlı yönetiminin, Mustafa Kemal’in ve halkın tut"
          },
          {
            "outcomeCode": "İTA.8.2.4",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Kuvâ-yı Millîye’nin oluşum sürecini ve sonrasında meydana gelen gelişmeleri kavrar."
          },
          {
            "outcomeCode": "İTA.8.2.5",
            "questionCount": 1,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "Millî Mücadele’nin hazırlık döneminde Mustafa Kemal’in yaptığı çalışmaları analiz eder."
          },
          {
            "outcomeCode": "İTA.8.2.6",
            "questionCount": 1,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "Misakımilli’nin kabulünü ve Büyük Millet Meclisinin açılışını vatanın bütünlüğü esası ile “ulusal egemenlik” ve “tam bağ"
          },
          {
            "outcomeCode": "İTA.8.2.8",
            "questionCount": 1,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "Mustafa Kemal’in ve Türk milletinin Sevr Antlaşması’na karşı tepkilerini değerlendirir."
          },
          {
            "outcomeCode": "İTA.8.3.1",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Millî Mücadele Dönemi’nde Doğu Cephesi ve Güney Cephesi’nde meydana gelen gelişmeleri kavrar."
          },
          {
            "outcomeCode": "İTA.8.3.2",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Millî Mücadele Dönemi’nde Batı Cephesi’nde meydana gelen gelişmeleri kavrar."
          }
        ],
        "sourceOrigin": "meb_official"
      }
    ],
    "din_kulturu": [
      {
        "id": "senaryo_1",
        "name": "Senaryo 1 (7 Soru)",
        "description": "MEB ÖDSGM 2026-2027 1. Dönem 2. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 1 (7 Soru) formatı (Toplam 100 Puan).",
        "totalQuestions": 7,
        "distributions": [
          {
            "outcomeCode": "DKAB.8.1.2",
            "questionCount": 1,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "İnsanın İradesi ve Kader"
          },
          {
            "outcomeCode": "DKAB.8.1.5",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Bir Peygamber Tanıyorum: Hz. Musa (a.s.)"
          },
          {
            "outcomeCode": "DKAB.8.2.1",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "İslam’ın Paylaşma ve Yardımlaşmaya Verdiği Önem"
          },
          {
            "outcomeCode": "DKAB.8.2.2",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Zekât ve Sadaka İbadeti"
          },
          {
            "outcomeCode": "DKAB.8.2.3",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Zekât ve Sadakanın Bireysel ve Toplumsal Faydaları"
          },
          {
            "outcomeCode": "DKAB.8.2.5",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Bir Sure Tanıyorum: Maun Suresi ve Anlamı"
          },
          {
            "outcomeCode": "DKAB.8.3.1",
            "questionCount": 1,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "Din, Birey ve Toplum"
          }
        ],
        "sourceOrigin": "meb_official"
      },
      {
        "id": "senaryo_2",
        "name": "Senaryo 2 (9 Soru)",
        "description": "MEB ÖDSGM 2026-2027 1. Dönem 2. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 2 (9 Soru) formatı (Toplam 100 Puan).",
        "totalQuestions": 9,
        "distributions": [
          {
            "outcomeCode": "DKAB.8.1.1",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Kader ve Kaza İnancı"
          },
          {
            "outcomeCode": "DKAB.8.1.3",
            "questionCount": 1,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "Kaderle İlgili Kavramlar"
          },
          {
            "outcomeCode": "DKAB.8.2.2",
            "questionCount": 2,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Zekât ve Sadaka İbadeti"
          },
          {
            "outcomeCode": "DKAB.8.2.3",
            "questionCount": 2,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Zekât ve Sadakanın Bireysel ve Toplumsal Faydaları"
          },
          {
            "outcomeCode": "DKAB.8.2.4",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Bir Peygamber Tanıyorum: Hz. Şuayb (as)"
          },
          {
            "outcomeCode": "DKAB.8.2.5",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Bir Sure Tanıyorum: Maun Suresi ve Anlamı"
          },
          {
            "outcomeCode": "DKAB.8.3.1",
            "questionCount": 1,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "Din, Birey ve Toplum"
          }
        ],
        "sourceOrigin": "meb_official"
      },
      {
        "id": "senaryo_3",
        "name": "Senaryo 3 (7 Soru)",
        "description": "MEB ÖDSGM 2026-2027 1. Dönem 2. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 3 (7 Soru) formatı (Toplam 100 Puan).",
        "totalQuestions": 7,
        "distributions": [
          {
            "outcomeCode": "DKAB.8.1.4",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Toplumda kader ve kaza ile ilgili yaygın olan yanlış anlayışları sorgular"
          },
          {
            "outcomeCode": "DKAB.8.1.6",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Bir Ayet Tanıyorum: Ayetelkürsi ve Anlamı"
          },
          {
            "outcomeCode": "DKAB.8.2.1",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "İslam’ın Paylaşma ve Yardımlaşmaya Verdiği Önem"
          },
          {
            "outcomeCode": "DKAB.8.2.2",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Zekât ve Sadaka İbadeti"
          },
          {
            "outcomeCode": "DKAB.8.2.3",
            "questionCount": 2,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Zekât ve Sadakanın Bireysel ve Toplumsal Faydaları"
          },
          {
            "outcomeCode": "DKAB.8.2.5",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Bir Sure Tanıyorum: Maun Suresi ve Anlamı"
          }
        ],
        "sourceOrigin": "meb_official"
      },
      {
        "id": "senaryo_4",
        "name": "Senaryo 4 (7 Soru)",
        "description": "MEB ÖDSGM 2026-2027 1. Dönem 2. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 4 (7 Soru) formatı (Toplam 100 Puan).",
        "totalQuestions": 7,
        "distributions": [
          {
            "outcomeCode": "DKAB.8.1.1",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Kader ve Kaza İnancı"
          },
          {
            "outcomeCode": "DKAB.8.1.2",
            "questionCount": 1,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "İnsanın İradesi ve Kader"
          },
          {
            "outcomeCode": "DKAB.8.2.1",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "İslam’ın Paylaşma ve Yardımlaşmaya Verdiği Önem"
          },
          {
            "outcomeCode": "DKAB.8.2.2",
            "questionCount": 2,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Zekât ve Sadaka İbadeti"
          },
          {
            "outcomeCode": "DKAB.8.2.3",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Zekât ve Sadakanın Bireysel ve Toplumsal Faydaları"
          },
          {
            "outcomeCode": "DKAB.8.2.4",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Bir Peygamber Tanıyorum: Hz. Şuayb (as)"
          }
        ],
        "sourceOrigin": "meb_official"
      },
      {
        "id": "senaryo_5",
        "name": "Senaryo 5 (8 Soru)",
        "description": "MEB ÖDSGM 2026-2027 1. Dönem 2. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 5 (8 Soru) formatı (Toplam 100 Puan).",
        "totalQuestions": 8,
        "distributions": [
          {
            "outcomeCode": "DKAB.8.1.3",
            "questionCount": 1,
            "cognitiveLevel": "Karmaşık Bilişsel Süreçler",
            "notes": "Kaderle İlgili Kavramlar"
          },
          {
            "outcomeCode": "DKAB.8.1.4",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Toplumda kader ve kaza ile ilgili yaygın olan yanlış anlayışları sorgular"
          },
          {
            "outcomeCode": "DKAB.8.1.6",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Bir Ayet Tanıyorum: Ayetelkürsi ve Anlamı"
          },
          {
            "outcomeCode": "DKAB.8.2.2",
            "questionCount": 2,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Zekât ve Sadaka İbadeti"
          },
          {
            "outcomeCode": "DKAB.8.2.3",
            "questionCount": 2,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Zekât ve Sadakanın Bireysel ve Toplumsal Faydaları"
          },
          {
            "outcomeCode": "DKAB.8.2.4",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Bir Peygamber Tanıyorum: Hz. Şuayb (as)"
          }
        ],
        "sourceOrigin": "meb_official"
      }
    ],
    "ingilizce": [
      {
        "id": "senaryo_1",
        "name": "Senaryo 1 (5 Soru)",
        "description": "MEB ÖDSGM 2026-2027 1. Dönem 2. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 1 (5 Soru) formatı (Toplam 100 Puan).",
        "totalQuestions": 5,
        "distributions": [
          {
            "outcomeCode": "E8.2.R1",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Students will be able to understand short and simple texts about regular activities of teenagers."
          },
          {
            "outcomeCode": "E8.3.R1",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Students will be able to understand the overall meaning of short texts about a process."
          },
          {
            "outcomeCode": "E8.3.R2",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Students will be able to guess the meaning of unknown words from the text."
          },
          {
            "outcomeCode": "E8.3.W1",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Students will be able to write a series of simple phrases and sentences by using linkers to describe a process."
          },
          {
            "outcomeCode": "E8.4.R1",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Students will be able to understand  short and simple texts with related vocabulary."
          }
        ],
        "sourceOrigin": "meb_official"
      },
      {
        "id": "senaryo_2",
        "name": "Senaryo 2 (6 Soru)",
        "description": "MEB ÖDSGM 2026-2027 1. Dönem 2. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 2 (6 Soru) formatı (Toplam 100 Puan).",
        "totalQuestions": 6,
        "distributions": [
          {
            "outcomeCode": "E8.2.R1",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Students will be able to understand short and simple texts about regular activities of teenagers."
          },
          {
            "outcomeCode": "E8.3.R2",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Students will be able to guess the meaning of unknown words from the text."
          },
          {
            "outcomeCode": "E8.3.W1",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Students will be able to write a series of simple phrases and sentences by using linkers to describe a process."
          },
          {
            "outcomeCode": "E8.4.R1",
            "questionCount": 2,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Students will be able to understand  short and simple texts with related vocabulary."
          },
          {
            "outcomeCode": "E8.4.W1",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Students will be able to write short and simple conversations."
          }
        ],
        "sourceOrigin": "meb_official"
      },
      {
        "id": "senaryo_3",
        "name": "Senaryo 3 (6 Soru)",
        "description": "MEB ÖDSGM 2026-2027 1. Dönem 2. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 3 (6 Soru) formatı (Toplam 100 Puan).",
        "totalQuestions": 6,
        "distributions": [
          {
            "outcomeCode": "E8.1.R1",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Students will be able to understand short and simple texts about friendship."
          },
          {
            "outcomeCode": "E8.2.W1",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Students will be able to write a short and simple paragraph about regular activities of teenagers."
          },
          {
            "outcomeCode": "E8.3.R1",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Students will be able to understand the overall meaning of short texts about a process."
          },
          {
            "outcomeCode": "E8.3.W1",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Students will be able to write a series of simple phrases and sentences by using linkers to describe a process."
          },
          {
            "outcomeCode": "E8.4.R1",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Students will be able to understand  short and simple texts with related vocabulary."
          },
          {
            "outcomeCode": "E8.4.W1",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Students will be able to write short and simple conversations."
          }
        ],
        "sourceOrigin": "meb_official"
      },
      {
        "id": "senaryo_4",
        "name": "Senaryo 4 (7 Soru)",
        "description": "MEB ÖDSGM 2026-2027 1. Dönem 2. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 4 (7 Soru) formatı (Toplam 100 Puan).",
        "totalQuestions": 7,
        "distributions": [
          {
            "outcomeCode": "E8.1.W1",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Students will be able to write a short and simple letter apologizing and giving reasons for not attending a party in res"
          },
          {
            "outcomeCode": "E8.3.R1",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Students will be able to understand the overall meaning of short texts about a process."
          },
          {
            "outcomeCode": "E8.3.R2",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Students will be able to guess the meaning of unknown words from the text."
          },
          {
            "outcomeCode": "E8.3.W1",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Students will be able to write a series of simple phrases and sentences by using linkers to describe a process."
          },
          {
            "outcomeCode": "E8.4.R1",
            "questionCount": 2,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Students will be able to understand  short and simple texts with related vocabulary."
          },
          {
            "outcomeCode": "E8.5.R1",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Students will be able to identify main ideas in short and simple texts about internet habits."
          }
        ],
        "sourceOrigin": "meb_official"
      },
      {
        "id": "senaryo_5",
        "name": "Senaryo 5 (8 Soru)",
        "description": "MEB ÖDSGM 2026-2027 1. Dönem 2. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 5 (8 Soru) formatı (Toplam 100 Puan).",
        "totalQuestions": 8,
        "distributions": [
          {
            "outcomeCode": "E8.1.R2",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Students will be able to understand short and simple invitation letters, cards and e-mails."
          },
          {
            "outcomeCode": "E8.3.R1",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Students will be able to understand the overall meaning of short texts about a process."
          },
          {
            "outcomeCode": "E8.3.R2",
            "questionCount": 2,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Students will be able to guess the meaning of unknown words from the text."
          },
          {
            "outcomeCode": "E8.3.W1",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Students will be able to write a series of simple phrases and sentences by using linkers to describe a process."
          },
          {
            "outcomeCode": "E8.4.R1",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Students will be able to understand  short and simple texts with related vocabulary."
          },
          {
            "outcomeCode": "E8.4.W1",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Students will be able to write short and simple conversations."
          },
          {
            "outcomeCode": "E8.5.R2",
            "questionCount": 1,
            "cognitiveLevel": "Basit Bilişsel Süreçler",
            "notes": "Students will be able to find specific information about the Internet in various texts."
          }
        ],
        "sourceOrigin": "meb_official"
      }
    ]
  }
};
