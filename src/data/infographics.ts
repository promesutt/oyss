import { InfographicItem } from '../types';

export const SAMPLE_INFOGRAPHICS: InfographicItem[] = [
{
    "id": "info_5_fen_gunes_ay",
    "grade": 5,
    "subjectId": "fen_bilimleri",
    "examTerm": "1_donem_1_yazili",
    "title": "Güneş, Dünya ve Ay: Boyutlar & Ay'ın Evreleri",
    "subtitle": "TYMM 5. Sınıf Fen Bilimleri 1. Yazılı Görsel Hafıza Kartı",
    "category": "Güneş, Dünya ve Ay",
    "memoryHook": "Ay düz \"D\" ise İlk Dördün, ters \"D\" ise Son Dördün! Boyut kodlaması: Basketbol Topu > Nohut > Mercimek.",
    "summaryCards": [
      {
        "title": "Güneş (Dev Yıldız)",
        "badge": "Basketbol Topu",
        "points": [
          "Orta büyüklükte sarı bir yıldızdır",
          "Isı ve ışık kaynağımızdır",
          "Kendi ekseni etrafında saat yönünün tersine döner",
          "Güneş lekeleri dönme hareketini ispatlar (Galileo)"
        ],
        "highlight": "Dünya Güneş'in içine yaklaşık 1 milyon 300 bin adet sığabilir."
      },
      {
        "title": "Ay ve Evreleri",
        "badge": "Mercimek Tanesi",
        "points": [
          "Dünya'nın tek doğal uydusudur",
          "Atmosferi yok denecek kadar incedir (Hava olayları görülmez)",
          "Krater adı verilen meteor çukurları vardır",
          "Dönme ve dolanma süresi eşit olduğu için hep aynı yüzü görülür"
        ],
        "highlight": "Ana evreler arası süre tam 1 haftadır (7 gün)."
      }
    ],
    "comparisonTable": {
      "headers": [
        "Gök Cismi",
        "Model Benzetmesi",
        "Işık Kaynağı mı?",
        "Dönme Yönü"
      ],
      "rows": [
        [
          "Güneş",
          "Basketbol Topu",
          "Evet (Doğal Işık Kaynağı)",
          "Saat yönünün tersi (Batıdan Doğuya)"
        ],
        [
          "Dünya",
          "Nohut Tanesi",
          "Hayır (Güneş'ten alır)",
          "Saat yönünün tersi (Batıdan Doğuya)"
        ],
        [
          "Ay",
          "Mercimek Tanesi",
          "Hayır (Güneş ışığını yansıtır)",
          "Saat yönünün tersi (Batıdan Doğuya)"
        ]
      ]
    }
  },
  {
    "id": "info_5_mat_geometri",
    "grade": 5,
    "subjectId": "matematik",
    "examTerm": "1_donem_1_yazili",
    "title": "Temel Geometrik Kavramlar ve Açılar",
    "subtitle": "TYMM 5. Sınıf Matematik Görsel Püf Noktalar Matrisi",
    "category": "Temel Geometri",
    "memoryHook": "Doğrunun iki ucu açık, Işının tek ucu kapalı, Doğru parçasının iki ucu kilitlidir!",
    "summaryCards": [
      {
        "title": "Geometrik Modeller",
        "badge": "Ölçülebilirlik Kuralı",
        "points": [
          "Doğru: İki yöne sonsuz uzar, boyu ÖLÇÜLEMEZ",
          "Işın: Bir yöne sonsuz uzar, boyu ÖLÇÜLEMEZ",
          "Doğru Parçası: İki ucu sınırlıdır, boyu ÖLÇÜLEBİLİR"
        ],
        "highlight": "Sadece doğru parçalarının santimetre cinsinden uzunluğu ölçülebilir."
      },
      {
        "title": "Açı Türleri",
        "badge": "Referans: 90°",
        "points": [
          "Dar Açı: 0° < Açı < 90°",
          "Dik Açı: Tam 90° (∟ işareti)",
          "Geniş Açı: 90° < Açı < 180°",
          "Doğru Açı: Tam 180°"
        ],
        "highlight": "Saat tam 03.00 ve 09.00'da akrep ile yelkovan dik açı (90°) oluşturur."
      }
    ],
    "comparisonTable": {
      "headers": [
        "Açı Çeşidi",
        "Ölçü Aralığı",
        "Örnek Değer",
        "Saat Modeli"
      ],
      "rows": [
        [
          "Dar Açı",
          "0° - 89°",
          "45°, 75°, 89°",
          "Saat 02.00"
        ],
        [
          "Dik Açı",
          "Tam 90°",
          "90°",
          "Saat 03.00"
        ],
        [
          "Geniş Açı",
          "91° - 179°",
          "120°, 150°, 179°",
          "Saat 05.00"
        ],
        [
          "Doğru Açı",
          "Tam 180°",
          "180°",
          "Saat 06.00"
        ]
      ]
    }
  },
  {
    "id": "info_6_mat_bolunebilme",
    "grade": 6,
    "subjectId": "matematik",
    "examTerm": "1_donem_1_yazili",
    "title": "Bölünebilme Kuralları ve Asal Sayılar",
    "subtitle": "6. Sınıf Matematik 1. Yazılı Hızlı Karar Haritası",
    "category": "Çarpanlar ve Katlar",
    "memoryHook": "Rakamları toplamına SADECE 3 ve 9 için bakılır! Çift olan tek asal sayı 2'dir.",
    "summaryCards": [
      {
        "title": "Son Basamak Kuralları",
        "badge": "2, 4, 5, 10",
        "points": [
          "2 ile Bölünme: Son basamağı çift (0, 2, 4, 6, 8)",
          "4 ile Bölünme: Son iki basamağı 00 veya 4'ün katı",
          "5 ile Bölünme: Son basamağı 0 veya 5",
          "10 ile Bölünme: Son basamağı yalnızca 0"
        ],
        "highlight": "Bir sayı hem 2'ye hem 5'e bölünüyorsa kesinlikle 10'a da bölünür."
      },
      {
        "title": "Rakamlar Toplamı Kuralları",
        "badge": "3 ve 9",
        "points": [
          "3 ile Bölünme: Rakamlar toplamı 3 veya katı olmalı",
          "9 ile Bölünme: Rakamlar toplamı 9 veya katı olmalı",
          "6 ile Bölünme: Hem 2'ye hem 3'e aynı anda bölünebilmeli"
        ],
        "highlight": "9'a bölünen her sayı kesinlikle 3'e de bölünür; fakat 3'e bölünen her sayı 9'a bölünmez!"
      }
    ],
    "comparisonTable": {
      "headers": [
        "Sayı",
        "2'ye",
        "3'e",
        "4'e",
        "5'e",
        "6'ya",
        "9'a",
        "10'a"
      ],
      "rows": [
        [
          "120",
          "Evet",
          "Evet",
          "Evet",
          "Evet",
          "Evet",
          "Hayır",
          "Evet"
        ],
        [
          "315",
          "Hayır",
          "Evet",
          "Hayır",
          "Evet",
          "Hayır",
          "Evet",
          "Hayır"
        ],
        [
          "432",
          "Evet",
          "Evet",
          "Evet",
          "Hayır",
          "Evet",
          "Evet",
          "Hayır"
        ],
        [
          "700",
          "Evet",
          "Hayır",
          "Evet",
          "Evet",
          "Hayır",
          "Hayır",
          "Evet"
        ]
      ]
    }
  },
  {
    "id": "info_6_fen_gezegenler",
    "grade": 6,
    "subjectId": "fen_bilimleri",
    "examTerm": "1_donem_1_yazili",
    "title": "Güneş Sistemi: İç vs. Dış Gezegenler & Tutulmalar",
    "subtitle": "6. Sınıf Fen Bilimleri 1. Yazılı Gezegenler Şeması",
    "category": "Güneş Sistemi",
    "memoryHook": "Güneş tutulması: G - A - D (Ay ortada). Ay tutulması: G - D - A (Dünya ortada).",
    "summaryCards": [
      {
        "title": "İç (Karasal) Gezegenler",
        "badge": "Merkür, Venüs, Dünya, Mars",
        "points": [
          "Güneş'e en yakın 4 gezegendir",
          "Yüzeyleri katı kayaç ve metallerden oluşur",
          "Yoğunlukları gazsal gezegenlerden fazladır",
          "Halkaları kesinlikle YOKTUR",
          "Uydu sayıları çok azdır (Merkür ve Venüs'ün hiç yoktur)"
        ],
        "highlight": "En sıcak gezegen Güneş'e en yakın Merkür değil, sera etkisinden dolayı Venüs'tür."
      },
      {
        "title": "Dış (Gazsal) Gezegenler",
        "badge": "Jüpiter, Satürn, Uranüs, Neptün",
        "points": [
          "Devasa kütleli ve kalın gaz atmosferlidir",
          "Yoğunlukları düşüktür",
          "HEPSİNİN halkası ve çok sayıda uydusu vardır",
          "En büyük gezegen Jüpiter'dir (Güneş sisteminin devi)"
        ],
        "highlight": "Uranüs yuvarlanan bir varil gibi yan yatmış şekilde döner."
      }
    ],
    "comparisonTable": {
      "headers": [
        "Özellik",
        "Güneş Tutulması",
        "Ay Tutulması"
      ],
      "rows": [
        [
          "Araya Giren Cisim",
          "Ay (Güneş ile Dünya arasında)",
          "Dünya (Güneş ile Ay arasında)"
        ],
        [
          "Ay'ın Evresi",
          "Yeniay Evresi",
          "Dolunay Evresi"
        ],
        [
          "Gerçekleştiği Zaman",
          "Gündüz",
          "Gece"
        ],
        [
          "Gözlem Alanı",
          "Dünya üzerinde dar bir şerit",
          "Geceyi yaşayan tüm Dünya yüzeyi"
        ],
        [
          "Gözlem Güvenliği",
          "Filtreli özel gözlük şarttır",
          "Çıplak gözle güvenle izlenir"
        ]
      ]
    }
  },
  {
    "id": "info_8_mat_ebob_ekok",
    "grade": 8,
    "subjectId": "matematik",
    "examTerm": "1_donem_1_yazili",
    "title": "LGS Karar Haritası: EBOB mu, EKOK mu?",
    "subtitle": "8. Sınıf Matematik 1. Yazılı & LGS Soru Ayırt Etme Matrisi",
    "category": "Çarpanlar ve Katlar",
    "memoryHook": "Büyükten Küçüğe (Bölme/Parçalama) = EBOB! Küçükten Büyüğe (Birleştirme/Katlama) = EKOK!",
    "summaryCards": [
      {
        "title": "EBOB Problemleri (Bütünden Parçaya)",
        "badge": "BÖLME / PAYLAŞTIRMA",
        "points": [
          "Çuvallardaki pirinç/un poşetlere eşit paylaştırılıyorsa",
          "Tarlanın çevresine eşit aralıklarla fidan/direk dikiliyorsa",
          "Kumaşlar, tahtalar eşit parçalara bölünüyorsa",
          "Dikdörtgen zemin kare fayanslarla kaplanıyorsa"
        ],
        "highlight": "Anahtar Kelime: \"En büyük eşit parçalara ayırma\", \"Eşit poşetleme\"."
      },
      {
        "title": "EKOK Problemleri (Parçadan Bütüne)",
        "badge": "BİRLEŞTİRME / KATLAMA",
        "points": [
          "Farklı saatlerde kalkan otobüslerin birlikte hareket saati",
          "Farklı aralıklarla çalan okul zillerinin birlikte çalması",
          "Kutular üst üste dizilip kule yüksekliği eşitleniyorsa",
          "Cevizler 3'er 3'er ve 5'er 5'er sayıldığında artıyorsa"
        ],
        "highlight": "Anahtar Kelime: \"Birlikte nöbet tutma\", \"Bir sonraki karşılaşma anı\"."
      }
    ],
    "comparisonTable": {
      "headers": [
        "Problem Türü",
        "Kullanılan Yöntem",
        "İşlem Mantığı",
        "Örnek Sonuç"
      ],
      "rows": [
        [
          "Tarla etrafına ağaç dikme",
          "EBOB",
          "Çevre / EBOB = Ağaç Sayısı",
          "Küçük parça aralığı"
        ],
        [
          "Zillerin birlikte çalması",
          "EKOK",
          "EKOK(z1, z2) = Dakika",
          "İleriye dönük ortak zaman"
        ],
        [
          "Çuvalları torbalara bölme",
          "EBOB",
          "Toplam Kütle / EBOB = Torba Sayısı",
          "Minimum poşet adedi"
        ],
        [
          "Kare prizmadan küp yapma",
          "EKOK",
          "Ayrıtların EKOK'u küpün kenarı",
          "Maksimum hacim oluşturma"
        ]
      ]
    }
  },
  {
    "id": "info_8_fen_mevsimler_dna",
    "grade": 8,
    "subjectId": "fen_bilimleri",
    "examTerm": "1_donem_1_yazili",
    "title": "Mevsimlerin Oluşumu ve DNA Hiyerarşisi",
    "subtitle": "8. Sınıf Fen Bilimleri 1. Yazılı / LGS Odaklı Görsel Özet",
    "category": "Mevsimler ve İklim & DNA",
    "memoryHook": "KediGen: Kromozom > DNA > Gen > Nükleotid! Dik açı = Dar alan = Sıcak Yaz!",
    "summaryCards": [
      {
        "title": "Mevsimler ve Gün Dönümleri",
        "badge": "Eksen Eğikliği: 23° 27'",
        "points": [
          "21 Haziran: Güneş Yengeç Dönencesi'ne dik gelir. KYK En uzun gündüz (Yaz), GYK Kış.",
          "21 Aralık: Güneş Oğlak Dönencesi'ne dik gelir. GYK En uzun gündüz (Yaz), KYK Kış.",
          "21 Mart & 23 Eylül: Ekinoks. Ekvator'a dik gelir, tüm dünyada 12 saat gece = 12 saat gündüz.",
          "Işık dik gelirse gölge boyu KISA, eğik gelirse gölge boyu UZUN olur."
        ],
        "highlight": "Dünya'nın Güneş'e uzaklığının mevsimlerin sıcaklığı ile HİÇBİR İLGİSİ YOKTUR!"
      },
      {
        "title": "DNA ve Genetik Kod",
        "badge": "KediGen Sıralaması",
        "points": [
          "Kromozom: DNA + Özel protein kılıfı (İnsanda 46 kromozom).",
          "DNA: Çift zincirli, sarmal yönetici molekül.",
          "Gen: Anlamlı görev birimi (Göz rengi, kan grubu).",
          "Nükleotid: En küçük yapı birimi (Fosfat + Şeker + Organik Baz).",
          "Eşleşme: Adenin (A) = Timin (T) | Guanin (G) = Sitozin (C)."
        ],
        "highlight": "Kromozom sayısının canlının gelişmişliği ile hiçbir ilişkisi yoktur."
      }
    ],
    "comparisonTable": {
      "headers": [
        "Tarih",
        "Güneş Işınlarının Dik Geldiği Yer",
        "Kuzey Yarım Küre (Türkiye)",
        "Güney Yarım Küre"
      ],
      "rows": [
        [
          "21 Haziran",
          "Yengeç Dönencesi",
          "Yaz Başlangıcı (En uzun gündüz)",
          "Kış Başlangıcı (En uzun gece)"
        ],
        [
          "21 Aralık",
          "Oğlak Dönencesi",
          "Kış Başlangıcı (En uzun gece)",
          "Yaz Başlangıcı (En uzun gündüz)"
        ],
        [
          "21 Mart",
          "Ekvator (Ekinoks)",
          "İlkbahar Başlangıcı (12s Gece/Gündüz)",
          "Sonbahar Başlangıcı (12s Gece/Gündüz)"
        ],
        [
          "23 Eylül",
          "Ekvator (Ekinoks)",
          "Sonbahar Başlangıcı (12s Gece/Gündüz)",
          "İlkbahar Başlangıcı (12s Gece/Gündüz)"
        ]
      ]
    }
  },
  {
    "id": "info_8_inkilap_fikir_akimlari",
    "grade": 8,
    "subjectId": "sosyal_bilgiler",
    "examTerm": "1_donem_1_yazili",
    "title": "Osmanlı'yı Kurtarma Fikir Akımları & Mustafa Kemal",
    "subtitle": "8. Sınıf T.C. İnkılap Tarihi ve Atatürkçülük 1. Yazılı Matrisi",
    "category": "Bir Kahraman Doğuyor",
    "memoryHook": "Balkanlar isyan etti: Osmanlıcılık bitti! Araplar İngilizle anlaştı: İslamcılık bitti! Millî Mücadele'yi Türkçülük kazandı!",
    "summaryCards": [
      {
        "title": "Osmanlı Fikir Akımları",
        "badge": "Dağılmayı Önleme Çabaları",
        "points": [
          "Osmanlıcılık: Din, dil, ırk farkı gözetmeksizin herkesi Osmanlı vatandaşı sayma. Balkan Savaşları ile çöktü.",
          "İslamcılık (Ümmetçilik): Bütün Müslümanları halife sancağı altında birleştirme. I. Dünya Savaşı'nda Arapların isyanıyla çöktü.",
          "Türkçülük: Türk millî birliğini ve kültürünü canlandırma. Kurtuluş Savaşı'nın temel fikri oldu.",
          "Batıcılık: Batı'nın bilim, fen ve medeniyet kurumlarını örnek alma."
        ],
        "highlight": "Mustafa Kemal tüm fikirleri sentezlemiş ancak akılcı ve millî olan Türkçülüğü temel almıştır."
      },
      {
        "title": "Mustafa Kemal'in Şehirleri",
        "badge": "Fikir Hayatının Doğuşu",
        "points": [
          "Selanik: Çok uluslu liman ve demir yolu kenti (Hoşgörü ve Batı basınına erişim).",
          "Manastır: Askerî İdadi yılları (Tarih ve edebiyat sevgisi, Namık Kemal, Mehmet Emin Yurdakul).",
          "İstanbul: Harp Okulu ve Akademisi (Memleket meselelerini arkadaşlarıyla tartışma, gazete çıkarma).",
          "Şam: İlk görev yeri (Vatan ve Hürriyet Cemiyeti'ni kurma / Liderlik ve teşkilatçılık)."
        ],
        "highlight": "Trablusgarp Savaşı Mustafa Kemal'in ilk askerî başarısı ve teşkilatçılık tecrübesidir."
      }
    ],
    "comparisonTable": {
      "headers": [
        "Fikir Akımı",
        "Temel Hedefi",
        "Önemli Temsilcileri",
        "Geçerliliğini Yitirme Sebebi"
      ],
      "rows": [
        [
          "Osmanlıcılık",
          "Tüm tebaayı eşit yurttaş yapma",
          "Genç Osmanlılar, Mithat Paşa",
          "Balkan uluslarının isyan edip ayrılması"
        ],
        [
          "İslamcılık",
          "Müslümanları halife etrafında toplama",
          "II. Abdülhamid, Mehmet Akif Ersoy",
          "Arapların I. Dünya Savaşı'nda İngilizlerle iş birliği"
        ],
        [
          "Türkçülük",
          "Türk milletinin birlik ve bilincini sağlama",
          "Ziya Gökalp, Mehmet Emin Yurdakul",
          "Millî Mücadele'nin başarıya ulaşmasını sağladı"
        ],
        [
          "Batıcılık",
          "Batı'nın bilim ve yönetimini uygulama",
          "Tevfik Fikret, Abdullah Cevdet",
          "Taklitçilik düzeyinde kalması, halka inememesi"
        ]
      ]
    }
  },
  {
    "id": "info_8_din_evrensel_yasalar",
    "grade": 8,
    "subjectId": "din_kulturu",
    "examTerm": "1_donem_1_yazili",
    "title": "Kader İnancı ve Evrensel Yasalar (Sünnetullah)",
    "subtitle": "8. Sınıf Din Kültürü 1. Yazılı / LGS Odaklı Bilgi Tablosu",
    "category": "Kader İnancı",
    "memoryHook": "Madde ve Enerji = Fiziksel! Canlı ve Organik = Biyolojik! Toplum ve Ahlak/Adalet = Toplumsal!",
    "summaryCards": [
      {
        "title": "Kader ve Kaza Dengesi",
        "badge": "Plan vs. Uygulama",
        "points": [
          "Kader: Allah'ın her şeyi önceden bir ölçü ve yasaya göre belirlemesidir (Evrenin ilahi yazılımı).",
          "Kaza: Takdir edilen planın zamanı gelince gerçekleşmesidir (Fiili oluş anı).",
          "Tevekkül: Gerekli tüm insani tedbirleri aldıktan sonra sonucu Allah'a havale edip güvenmektir."
        ],
        "highlight": "\"Deveni sağlam kazığa bağla, sonra Allah'a tevekkül et\" hadisi tevekkülün temel şartıdır."
      },
      {
        "title": "Evrenin 3 Temel Yasası",
        "badge": "Sünnetullah / Âdetullah",
        "points": [
          "Fiziksel Yasalar: Suyun kaldırma kuvveti, yer çekimi, gece-gündüz, gezegenlerin yörüngeleri.",
          "Biyolojik Yasalar: Fotosentez, balıkların solungaç yapısı, üreme, etobur ve otobur sindirimi.",
          "Toplumsal Yasalar: Adaletin barışı getirmesi, zulmün çöküşe yol açması, göçler ve dayanışma."
        ],
        "highlight": "Toplumsal yasalar sosyolojik neden-sonuç kurallarıdır ve Kur'an'da sıkça örneklenir."
      }
    ],
    "comparisonTable": {
      "headers": [
        "Yasa Türü",
        "Kapsamı",
        "Özelliği",
        "Ayet / Somut Örnek"
      ],
      "rows": [
        [
          "Fiziksel Yasa",
          "Madde ve Enerji",
          "Evrensel, deney ve gözlemle ispatlanır",
          "\"Güneş ve Ay bir hesaba göre hareket eder.\" (Rahmân, 5)"
        ],
        [
          "Biyolojik Yasa",
          "Canlılar ve Hayat",
          "Canlının yapısı, beslenmesi ve üremesi",
          "\"O, insanı bir kan pıhtısından (embriyo) yarattı.\" (Alak, 2)"
        ],
        [
          "Toplumsal Yasa",
          "İnsan Toplulukları",
          "Huzur, adalet, güven ve ahlaki kurallar",
          "\"Şüphesiz ki bir kavim kendi durumunu değiştirmedikçe Allah onları değiştirmez.\" (Ra'd, 11)"
        ]
      ]
    }
  },
{
    id: 'info_7_fen_hucre',
    grade: 7,
    subjectId: 'fen_bilimleri',
    examTerm: '1_donem_1_yazili',
    title: 'Bitki Hücresi vs. Hayvan Hücresi',
    subtitle: 'TYMM 7. Sınıf Fen Bilimleri 1. Yazılı Püf Noktalar & Ayırt Edici Özellikler',
    category: 'Hücre ve Bölünmeler',
    memoryHook: 'Hatırla: Bitki köşeli ve dayanıklıdır (Duvarı var, yeşildir kloroplastı var, kofulları kiler gibi kocamandır!).',
    summaryCards: [
      {
        title: 'Bitki Hücresi',
        badge: 'Köşeli Yapı',
        points: [
          'Hücre duvarı (çeperi) VAR (selüloz)',
          'Kloroplast organeli VAR (fotosentez)',
          'Kofullar BÜYÜK ve AZ sayıdadır',
          'Sentrozom (sentriyol) YOKTUR (ilkel bitkiler hariç)',
          'Genellikle köşeli ve yeşil renklidir'
        ],
        highlight: 'Hücre duvarı sayesinde turgor basıncına dayanıklıdır ve patlamaz.'
      },
      {
        title: 'Hayvan Hücresi',
        badge: 'Yuvarlak / Esnek',
        points: [
          'Hücre duvarı YOKTUR (sadece hücre zarı var)',
          'Kloroplast organeli YOKTUR',
          'Kofullar KÜÇÜK ve ÇOK sayıdadır',
          'Sentrozom VARDIR (bölünmede iğ iplikleri kurar)',
          'Lizozom organeli aktiftir (hücre içi sindirim)'
        ],
        highlight: 'Yalnızca esnek hücre zarı olduğu için şekli yuvarlak veya değişkendir.'
      }
    ],
    comparisonTable: {
      headers: ['Özellik / Yapı', 'Bitki Hücresi', 'Hayvan Hücresi', 'Sınavda Çıkış Şekli'],
      rows: [
        ['Hücre Şekli', 'Köşeli', 'Yuvarlak / Düzensiz', 'Mikroskop preparat sorusu'],
        ['Hücre Duvarı', 'Var (Cansız, tam geçirgen)', 'Yok', 'Çeper var mı yok mu?'],
        ['Kloroplast', 'Var (Fotosentez)', 'Yok', 'Besin üretimi kimde olur?'],
        ['Sentrozom', 'Yok (Gelişmiş bitkilerde)', 'Var', 'Bölünme iğ ipliği sorusu'],
        ['Koful Boyutu', 'Büyük ve Az sayıda', 'Küçük ve Çok sayıda', 'Depolama alanı karşılaştırması']
      ]
    }
  },
  {
    id: 'info_7_fen_uzay',
    grade: 7,
    subjectId: 'fen_bilimleri',
    examTerm: '1_donem_1_yazili',
    title: 'Yıldızların Yaşam Döngüsü & Uzay Teknolojileri',
    subtitle: 'Bulutsudan Karadeliğe: Kütle Kuralı ve Türkiye Uyduları',
    category: 'Güneş Sistemi ve Ötesi',
    memoryHook: 'Güneş kara delik olmaz! Çünkü küçük kütlelidir, son durağı Beyaz Cüce\'dir.',
    summaryCards: [
      {
        title: 'Küçük Kütleli Yıldız (Örn: Güneş)',
        badge: 'Son: Beyaz Cüce',
        points: [
          '1. Doğum: Bulutsu (Nebula)',
          '2. Orta Yaş: Küçük Yıldız (Sarı/Kırmızı cüce)',
          '3. Genişleme: Kızıl Dev',
          '4. Gaz Püskürmesi: Gezegenimsi Bulutsu',
          '5. Ölüm: Beyaz Cüce -> Siyah Cüce'
        ],
        highlight: 'Güneş\'imiz şu an orta yaşta bir küçük kütleli yıldızdır.'
      },
      {
        title: 'Büyük Kütleli Yıldız',
        badge: 'Son: Karadelik / Nötron',
        points: [
          '1. Doğum: Bulutsu (Nebula)',
          '2. Gençlik: Büyük Kütleli Mavi/Beyaz Dev',
          '3. Genişleme: Süper Kırmızı Dev',
          '4. Şiddetli Patlama: SÜPERNOVA',
          '5. Çöküş: NÖTRON YILDIZI ya da KARA DELİK'
        ],
        highlight: 'Süpernova patlaması evrene ağır elementlerin saçılmasını sağlar.'
      }
    ],
    comparisonTable: {
      headers: ['Uydu Tipi', 'Aktif Türkiye Uyduları', 'Görevi', 'Ortak Sınav İpucu'],
      rows: [
        ['Haberleşme Uyduları', 'Türksat 4A, 4B, 5A, 5B, 6A', 'TV yayıncılığı, genişbant internet, askeri haberleşme', 'Türksat serisi'],
        ['Gözlem Uyduları', 'Göktürk-1, Göktürk-2, İMECE', 'Yüksek çözünürlüklü yer gözlemi, harita, afet takibi', 'İMECE ilk yerli altmetrelik gözlem uydumuzdur'],
        ['Ömrü Bitenler', 'Türksat 1B, 1C, 2A, Bilsat, Rasat', 'Uzay kirliliği/çöpü oluşturma potansiyeli taşır', 'Rasat ilk yerli gözlemdi ama artık pasif']
      ]
    }
  },
  {
    id: 'info_7_mat_isaretler',
    grade: 7,
    subjectId: 'matematik',
    examTerm: '1_donem_1_yazili',
    title: 'Tam Sayılarda İşaret Kuralları & Üs Tuzakları',
    subtitle: 'Matematik 1. Yazılı Öncesi Kesinlikle Bilinmesi Gereken 4 Kural',
    category: 'Tam Sayılarla İşlemler',
    memoryHook: 'Dostumun dostu dostumdur (+ . + = +) | Düşmanımın düşmanı dostumdur (- . - = +)!',
    summaryCards: [
      {
        title: 'Çarpma ve Bölme Kuralı',
        badge: 'Aynı İşaret: +, Zıt: -',
        points: [
          '(+) × (+) = (+) ve (-) × (-) = (+)',
          '(+) × (-) = (-) ve (-) × (+) = (-)',
          'Bölmede de kural birebir aynıdır:',
          '(-24) ÷ (-6) = +4',
          '(-24) ÷ (+6) = -4'
        ]
      },
      {
        title: 'Parantez ve Çift Kuvvet Tuzağı',
        badge: 'Çok Kritik Soru!',
        points: [
          '(-3)² = (-3) × (-3) = +9 (Parantez var, üs 2 işareti de kapsar)',
          '-3² = -(3 × 3) = -9 (Parantez yok, üs 2 sadece 3\'e aittir!)',
          '(-2)³ = -8 (Tek kuvvet her zaman negatiftir)',
          '(-1)¹⁰⁰ = +1 | (-1)⁹⁹ = -1'
        ],
        highlight: 'Sınavda parantezin üssün içinde mi dışında mı olduğuna ÇOK DİKKAT ET!'
      }
    ]
  },

  // 4. TÜRKÇE (7. Sınıf İnfografik)
  {
    id: 'info_7_turkce_metin',
    grade: 7,
    subjectId: 'turkce',
    examTerm: '1_donem_1_yazili',
    title: 'Örtük Anlam, Metin Yapıları ve Noktalama Şifreleri',
    subtitle: '7. Sınıf Türkçe MEBİ Açık Uçlu Sınav Şeması',
    category: 'Okuma, Anlama ve Dil Bilgisi',
    memoryHook: 'Hatırla: İkilemeler asla birleşmez ve kısa çizgi almaz! Örtük anlam metindeki somut ipucundan çıkarılır.',
    summaryCards: [
      {
        title: 'Örtük Anlam & Semboller',
        badge: 'Metin İçi Çıkarım',
        points: [
          'Örtük Anlam: Yazarın doğrudan söylemediği, ipuçlarıyla sezdirdiği derin mesajdır.',
          'Demirci Hasan\'ın sabaha kılıç dövmesi -> Vatan savunması ve teslim olmama kararı.',
          'Mehmet\'in ikinci hafta kendisinin kitap seçmesi -> Öz güven kazanma ve kabullenilme.',
          'Ömer Seyfettin Forsa: "bitap" (yorgun/güçsüz), "iştiyak" (özlem), "teselli" (avuntu).'
        ],
        highlight: 'Cevabınızı yazarken "Metindeki şu ifadeden anlaşıldığı üzere..." kalıbını kullanınız.'
      },
      {
        title: 'Noktalama: Noktalı Virgül (;)',
        badge: 'Sınav Kuralı',
        points: [
          '1. Cümle içinde virgülle ayrılmış tür ve takımları ayırır: (Roman, hikâye; fizik, kimya).',
          '2. Aralarında virgül bulunan sıralı cümleleri ayırır: (At ölür, meydan kalır; yiğit ölür, şan kalır).',
          '3. İkiden fazla eş değer öge arasında virgül varsa özneyi ayırır: (Genç şairimiz; Necip Fazıl, Nâzım Hikmet...).',
          'Üç Nokta (...): Yüklemi olmayan eksiltili cümlelerin sonuna konur.'
        ],
        highlight: 'İkilemelerin arasına kısa çizgi konulmaz: "apar topar", "hızlı hızlı" yazılır!'
      }
    ],
    comparisonTable: {
      headers: ['Noktalama / Yapı', 'Doğru Kullanım', 'Hatalı Yazım (Tuzak)', 'Kullanım Gerekçesi'],
      rows: [
        ['İkileme Yazımı', 'apar topar, hızlı hızlı', 'apar-topar, hızlıhızlı', 'İkilemeler daima ayrı yazılır, çizgi almaz'],
        ['Noktalı Virgül', 'Tarihî eserleri koruyan... aktarır; önem vermeyen...', '...aktarır, önem vermeyen...', 'Ögeleri arasında virgül olan sıralı cümle ayrımı'],
        ['Üç Nokta', 'Taze ot kokuları, rengârenk çiçekler...', '...çiçekler.', 'Yüklemi olmayan eksiltili cümle bitimi']
      ]
    }
  },

  // 5. SOSYAL BİLGİLER (7. Sınıf İnfografik)
  {
    id: 'info_7_sosyal_iletisim',
    grade: 7,
    subjectId: 'sosyal_bilgiler',
    examTerm: '1_donem_1_yazili',
    title: 'Sen Dili vs. Ben Dili & İletişim Becerileri',
    subtitle: '7. Sınıf Sosyal Bilgiler 1. Yazılı MEBİ İletişim ve Tarih Matrisi',
    category: 'Birey ve Toplum & Tarih',
    memoryHook: 'Sen dili suçlar ve kapıyı kapatır; Ben dili duyguyu anlatır ve empati köprüsü kurar!',
    summaryCards: [
      {
        title: 'Sen Dili (İletişimi Tıkar)',
        badge: 'Yargılayıcı & Suçlayıcı',
        points: [
          'Karşı tarafı doğrudan suçlar ve savunmaya iter.',
          'Öfke, kırgınlık ve direnç yaratır.',
          'Örnek: "Sürekli geç kalmandan bıktım!"',
          'Örnek: "Odanı hep dağınık bırakıyorsun!"',
          'Örnek: "Beni hiç dinlemiyorsun!"'
        ],
        highlight: 'Sen diliyle kurulan diyaloglar çatışmayı tırmandırır.'
      },
      {
        title: 'Ben Dili (Çözüm Odaklı)',
        badge: 'Duygu & Empati',
        points: [
          'Durumun kendi üzerimizde yarattığı duyguyu ifade eder.',
          'Suçlamaz, kişinin düşünmesini sağlar.',
          'Örnek: "Geç kaldığında seni merak edip endişeleniyorum."',
          'Örnek: "Oda dağınık olunca aradığımı bulamıyor ve huzursuz oluyorum."',
          'Örnek: "Sözüm kesilince düşüncelerimi toparlamakta zorlanıyorum."'
        ],
        highlight: 'Ben dili empatik iletişimin ve barışçıl problem çözmenin temelidir.'
      }
    ],
    comparisonTable: {
      headers: ['İletişim Durumu', 'Sen Dili İfadesi', 'Dönüştürülmüş Ben Dili', 'Hissedilen Duygu'],
      rows: [
        ['Geç Kalma', 'Yine geciktin, senden bıktım!', 'Geç kaldığında başına bir şey geldiğini düşünüp endişeleniyorum.', 'Merak & Kaygı'],
        ['Ders Çalışmama', 'Çok tembelsin, hiç ders çalışmıyorsun!', 'Derslerine çalışmadığında geleceğin adına üzülüyorum.', 'Üzüntü & Sorumluluk'],
        ['Dağınıklık', 'Evi savaş alanına çevirmişsin!', 'Eşyalar dağınık kalınca dinlenemiyorum ve yoruluyorum.', 'Yorgunluk & Rahatsızlık']
      ]
    }
  },

  // 6. DİN KÜLTÜRÜ VE AHLAK BİLGİSİ (7. Sınıf İnfografik)
  {
    id: 'info_7_din_ahiret',
    grade: 7,
    subjectId: 'din_kulturu',
    examTerm: '1_donem_1_yazili',
    title: 'Ahiret Hayatının 6 İstasyonu & Meleklerin Görevleri',
    subtitle: '7. Sınıf Din Kültürü MEBİ Açık Uçlu Sınav Şeması',
    category: 'Melek ve Ahiret İnancı',
    memoryHook: 'Sıralamayı unutma: Kıyamet kopar -> Baas ile dirilinir -> Mahşerde toplanılır -> Mizanda tartılır!',
    summaryCards: [
      {
        title: 'Ahiretin 6 Temel Aşaması',
        badge: 'Kronolojik Rota',
        points: [
          '1. KIYAMET: İsrafil\'in birinci sûruyla kâinat düzeninin bozulması.',
          '2. BAAS: İsrafil\'in ikinci sûruyla insanların kabirlerinden yeniden dirilmesi.',
          '3. HAŞİR / MAHŞER: İnsanların hesap için toplanması ve toplanılan büyük alan.',
          '4. HESAP & AMEL DEFTERİ: Kiramen Kâtibin kayıtlarının açılması.',
          '5. MİZAN: Sevap ve günahların tartıldığı ilahi adalet terazisi.',
          '6. CENNET / CEHENNEM: Ebedi mükâfat veya ceza yurdu.'
        ],
        highlight: 'Zilzal Suresi: "Kim zerre ağırlığınca hayır işlerse görür, kim de şer işlerse görür."'
      },
      {
        title: 'Meleklerin Sınıflandırılması',
        badge: 'Görev Şeması',
        points: [
          'Dört Büyük Melek: Cebrail (Vahiy), Azrail (Ecel/Ölüm), Mikail (Tabiat/Rızık), İsrafil (Sûr).',
          'Kiramen Kâtibin: Sağ ve sol omuzdaki yazıcı melekler (İç denetim ve otokontrol sağlar).',
          'Münker ve Nekir: Kabirde ilk sorgulamayı yapan melekler.',
          'Meleklerin Doğası: Nurdan yaratılmışlardır, iradeleri ve cinsiyetleri yoktur, emirlere tam itaat ederler.'
        ],
        highlight: 'Melek inancı insanı yalnızlık hissinden kurtarır ve gizlide dahi dürüst yapar.'
      }
    ],
    comparisonTable: {
      headers: ['Ahiret Aşaması', 'Arapça / Terim Adı', 'Anlamı ve İşlevi', 'İlgili Ayet / Sınav İpucu'],
      rows: [
        ['Yeniden Diriliş', 'Baas', 'Kabirlerden ikinci sûr ile çıkış', 'Müminun 16: "Kıyamet gününde diriltileceksiniz"'],
        ['Toplanma Yeri', 'Haşir / Mahşer', 'Bütün insanların hesap için bir araya gelmesi', 'Mülk 24: "O\'nun huzurunda toplanacaksınız"'],
        ['İlahi Adalet Terazisi', 'Mizan', 'Amellerin hassas tartıda tartılması', 'Enbiya 47: "Kıyamet günü için adalet terazileri kuracağız"']
      ]
    }
  },

  // 7. İNGİLİZCE (7. Sınıf İnfografik)
  {
    id: 'info_7_ingilizce_grammar',
    grade: 7,
    subjectId: 'ingilizce',
    examTerm: '1_donem_1_yazili',
    title: 'Comparatives & Frequency Adverbs Visual Ladder',
    subtitle: '7th Grade English Units 1 & 2 MoNE Exam Visual Guide',
    category: 'Appearance, Personality & Sports',
    memoryHook: 'Short adjective -> add -er than | Long adjective -> put more ... than | Frequency: Always (%100) to Never (%0)',
    summaryCards: [
      {
        title: 'Making Comparisons (Comparatives)',
        badge: 'Grammar Rules',
        points: [
          'Short Adjectives: old -> older than, tall -> taller than, fast -> faster than.',
          'Ending in consonant + vowel + consonant: slim -> slimmer than, big -> bigger than.',
          'Ending in -y: funny -> funnier than, easy -> easier than, clumsy -> clumsier than.',
          'Long Adjectives (2+ syllables): more hardworking than, more generous than, more outgoing than.',
          'Irregular Forms: good -> better than | bad -> worse than.'
        ],
        highlight: 'NEVER say "more taller" or "more better"! Use either -er or more.'
      },
      {
        title: 'Frequency Adverbs (% Scale)',
        badge: 'Routines & Sports',
        points: [
          'ALWAYS (%100): "I always do my homework."',
          'USUALLY (%90): "He usually arrives on time."',
          'OFTEN (%70): "We often play basketball after school."',
          'SOMETIMES (%50): "She sometimes goes hiking."',
          'RARELY / SELDOM (%10): "They rarely watch horror movies."',
          'NEVER (%0): "Mike never tells lies."'
        ],
        highlight: 'Position: Put BEFORE main verbs (study, play), but AFTER am/is/are.'
      }
    ],
    comparisonTable: {
      headers: ['Type / Adjective', 'Comparative Form', 'Example Sentence', 'Exam Trap to Avoid'],
      rows: [
        ['Short: tall', 'taller than', 'Sally is taller than Helen.', 'Do NOT write "more tall"'],
        ['Ending in -y: friendly', 'friendlier than', 'Brian is friendlier than Sam.', 'Change -y to -ier'],
        ['Long: outgoing', 'more outgoing than', 'Emma is more outgoing than Amy.', 'Do NOT add "-er" to outgoing'],
        ['Irregular: good', 'better than', 'His performance is better than yesterday.', '"gooder" does not exist!']
      ]
    }
  }
,
{
  "id": "info_5_turkce_anlam",
  "grade": 5,
  "subjectId": "turkce",
  "examTerm": "1_donem_1_yazili",
  "title": "Söz Varlığı & Metin Analizi: Gerçek, Mecaz, Deyimler",
  "subtitle": "TYMM 5. Sınıf Türkçe 1. Yazılı Püf Noktalar & Ayırt Edici Özellikler",
  "category": "Sözcük ve Cümlede Anlam",
  "memoryHook": "Gerçek anlam sözlükteki ilk akla gelen fiziksel anlamdır; Mecaz ise tamamen soyutlaşıp yepyeni bir duygu/durum kazanır!",
  "summaryCards": [
    {
      "title": "Gerçek vs. Mecaz Anlam",
      "badge": "Anlam Dönüşümü",
      "points": [
        "Gerçek Anlam: Akla ilk gelen, somut ve temel anlamdır (ör: \"Sıcak çayı yudumladı\").",
        "Mecaz Anlam: Gerçek anlamdan tamamen uzaklaşarak kazanılan soyut anlamdır (ör: \"Bizi çok sıcak karşıladı\").",
        "Terim Anlam: Bilim, sanat, spor dallarına özgü kavramlardır (ör: \"akustik, nota, kök\")."
      ],
      "highlight": "Soru kökünde mecaz sorulduğunda cümlenin bütününe bakın; soyut bir duyguya dönüşüp dönüşmediğini test edin."
    },
    {
      "title": "Deyimler ve Atasözleri",
      "badge": "Kalıplaşmış Sözler",
      "points": [
        "Deyimler: Anlık durumları etkileyici anlatır, kalıplaşmıştır, sözcükleri değiştirilemez (ör: \"göz boyamak\").",
        "Atasözleri: Deneyimlere dayanan, öğüt ve ders veren genel kurallardır (ör: \"Damlaya damlaya göl olur\").",
        "Örtük Anlam: Cümlede doğrudan söylenmeyen ama çıkarılabilen gizli bilgidir."
      ],
      "highlight": "Deyimler ders vermez durumu bildirir; atasözleri ise mutlaka hayat dersi ve öğüt içerir."
    }
  ],
  "comparisonTable": {
    "headers": [
      "Özellik",
      "Deyim",
      "Atasözü"
    ],
    "rows": [
      [
        "Amaç",
        "Durumu çarpıcı şekilde betimlemek",
        "Öğüt, ders ve nasihat vermek"
      ],
      [
        "Kalıp Durumu",
        "Değiştirilemez, eş anlamlısı konamaz",
        "Değiştirilemez, kelimesi atılamaz"
      ],
      [
        "Zaman/Hüküm",
        "Genellikle mastar ekiyle biter (-mek/-mak)",
        "Tam bir yargı ve cümle bildirir"
      ]
    ]
  }
},
{
  "id": "info_5_sosyal_birey",
  "grade": 5,
  "subjectId": "sosyal_bilgiler",
  "examTerm": "1_donem_1_yazili",
  "title": "Birey, Toplum ve Anadolu'nun İlk Medeniyetleri",
  "subtitle": "TYMM 5. Sınıf Sosyal Bilgiler 1. Yazılı Püf Noktalar & Kavram Haritası",
  "category": "Biz ve Toplum / Tarihe Yolculuk",
  "memoryHook": "Rollerimiz bulunduğumuz gruba göre değişir; Haklarımız doğuştan vardır, Sorumluluklarımız ise yerine getirmemiz gereken görevlerdir!",
  "summaryCards": [
    {
      "title": "Rol, Hak ve Sorumluluk",
      "badge": "Sosyal Yaşam",
      "points": [
        "Rol: Bir grup içinde üstlendiğimiz konumdur (Evde evlat, okulda öğrenci, takımda kaptan).",
        "Hak: Hukukun bize tanıdığı yetkilerdir (Eğitim hakkı, oyun hakkı, sağlık hakkı).",
        "Sorumluluk: Üstlendiğimiz rollerin gerektirdiği ödevleri yerine getirmektir."
      ],
      "highlight": "Bir birey aynı anda birden fazla farklı role sahip olabilir."
    },
    {
      "title": "İlk Çağ Anadolu Uygarlıkları",
      "badge": "Tarihî Miras",
      "points": [
        "Hititler: Başkent Hattuşaş, Pankuş Meclisi, Anal adı verilen tarafsız yıllıklar, Kadeş Antlaşması.",
        "Frigler: Başkent Gordion, Tarım koruma kanunları (öküz kesene ceza), Fibula (çengelli iğne), Tapates (halı).",
        "Lidyalılar: Başkent Sard, Parayı icat ettiler, Kral Yolu'nu geliştirdiler.",
        "Urartular: Başkent Tuşpa (Van), Taş işçiliği ve Şamran su kanalı."
      ],
      "highlight": "Frig kanunlarının sertliği tarım ve hayvancılığa verdikleri hayati önemi kanıtlar."
    }
  ],
  "comparisonTable": {
    "headers": [
      "Uygarlık",
      "Başkent",
      "En Önemli Katkı / İcat"
    ],
    "rows": [
      [
        "Hititler",
        "Hattuşaş (Çorum)",
        "Anal Yıllıkları (Tarafsız Tarih Yazıcılığı) & Pankuş"
      ],
      [
        "Frigler",
        "Gordion (Ankara)",
        "Fibula (Çengelli İğne), Tapates Halısı, Sert Tarım Kanunları"
      ],
      [
        "Lidyalılar",
        "Sard (Manisa)",
        "Madeni Para & Kral Yolu Ticareti"
      ],
      [
        "Urartular",
        "Tuşpa (Van)",
        "Taş İşçiliği, Kale Mimarisi & Şamran Su Kanalı"
      ]
    ]
  }
},
{
  "id": "info_5_din_inanc",
  "grade": 5,
  "subjectId": "din_kulturu",
  "examTerm": "1_donem_1_yazili",
  "title": "Allah İnancı: Evrendeki Düzen ve İsimleri (Esmâ-i Hüsnâ)",
  "subtitle": "TYMM 5. Sınıf Din Kültürü 1. Yazılı Püf Noktalar & Zihin Haritası",
  "category": "Allah İnancı",
  "memoryHook": "İlim: Her şeyi bilmesi; Semî: Her şeyi işitmesi; Basar: Her şeyi görmesi; Kudret: Gücünün her şeye yetmesidir!",
  "summaryCards": [
    {
      "title": "Evrendeki Mükemmel Uyum ve Ölçü",
      "badge": "Tevhid & Nizam",
      "points": [
        "Gece ve gündüzün birbirini izlemesi, mevsimlerin oluşumu evrendeki kusursuz düzeni gösterir.",
        "Güneş ile Dünya arasındaki mesafenin hassas ayarı hayatın devamını sağlar.",
        "Tevhid: Allah'ın bir ve tek olduğuna, eşi ve benzeri olmadığına inanmaktır (İhlas Suresi)."
      ],
      "highlight": "Düzen kendiliğinden oluşamaz; her intizamlı eserin arkasında sonsuz ilim ve kudret sahibi bir yaratıcı vardır."
    },
    {
      "title": "Allah'ın Temel Sıfatları",
      "badge": "Esmâ-i Hüsnâ",
      "points": [
        "İlim: Gizli veya açık her şeyi eksiksiz bilmesi.",
        "Semî: Fısıltıları dahi her türlü sesi işitmesi.",
        "Basar: Zifiri karanlıkta bile her şeyi apaçık görmesi.",
        "Kudret: Sonsuz güç sahibi olması, her şeye gücünün yetmesi.",
        "Tekvin: Yoktan var etmesi, yaratması."
      ],
      "highlight": "İhlas Suresi Tevhid inancını en özlü ve kesin şekilde açıklayan suredir."
    }
  ],
  "comparisonTable": {
    "headers": [
      "Sıfat",
      "Anlamı",
      "Günlük Hayat Örneği"
    ],
    "rows": [
      [
        "İlim",
        "Her şeyi bilmesi",
        "İçimizden geçirdiğimiz iyi veya kötü niyetleri bilmesi"
      ],
      [
        "Semî",
        "Her şeyi işitmesi",
        "Karanlık gecede yapılan sessiz duaları dahi duyması"
      ],
      [
        "Basar",
        "Her şeyi görmesi",
        "Yerin altındaki küçücük bir tohumun çatlamasını görmesi"
      ],
      [
        "Kudret",
        "Her şeye gücü yetmesi",
        "Milyarlarca galaksiyi ve gök cisimlerini dengede tutması"
      ]
    ]
  }
},
{
  "id": "info_5_ing_hello",
  "grade": 5,
  "subjectId": "ingilizce",
  "examTerm": "1_donem_1_yazili",
  "title": "Hello! & My Town: Countries, Nationalities, Directions",
  "subtitle": "TYMM 5. Sınıf İngilizce 1. Yazılı Görsel Hafıza & Konuşma Kartı",
  "category": "Unit 1 & Unit 2",
  "memoryHook": "Where are you from? -> I am from Turkey (Ülke). What nationality are you? -> I am Turkish (Milliyet)!",
  "summaryCards": [
    {
      "title": "Countries & Nationalities",
      "badge": "Identity",
      "points": [
        "Turkey -> Turkish / England -> English / Germany -> German / France -> French",
        "\"Where are you from?\" asks the country: \"I am from Spain.\"",
        "\"What nationality are you?\" asks nationality: \"I am Spanish.\"",
        "\"How many languages do you speak?\" -> \"I speak two languages: Turkish and English.\""
      ],
      "highlight": "\"From\" kelimesi varsa ÜLKE yazılır; tek başına gelirse MİLLİYET yazılır."
    },
    {
      "title": "My Town & Giving Directions",
      "badge": "Prepositions of Place",
      "points": [
        "Next to (bitişiğinde), In front of (önünde), Behind (arkasında), Opposite (karşısında)",
        "Between (arasında - iki nesne arasında kullanılır)",
        "Go straight ahead (düz git), Turn left (sola dön), Turn right (sağa dön)",
        "It is on your right/left (sağında/solunda kalır)"
      ],
      "highlight": "Between kullanılırken mutlaka iki yer \"and\" bağlacı ile birbirine bağlanır."
    }
  ],
  "comparisonTable": {
    "headers": [
      "Soru Kalıbı",
      "Hedef Bilgi",
      "Örnek Cevap"
    ],
    "rows": [
      [
        "Where are you from?",
        "Ülke (Country)",
        "I am from Italy."
      ],
      [
        "What nationality are you?",
        "Milliyet (Nationality)",
        "I am Italian."
      ],
      [
        "Where is the library?",
        "Konum (Preposition of Place)",
        "It is between the bank and the bakery."
      ],
      [
        "How can I get to the pharmacy?",
        "Yol Tarifi (Directions)",
        "Go straight ahead and turn right."
      ]
    ]
  }
},
{
  "id": "info_6_turkce_ekler",
  "grade": 6,
  "subjectId": "turkce",
  "examTerm": "1_donem_1_yazili",
  "title": "Sözcükte Yapı: Kökler, Yapım ve Çekim Ekleri",
  "subtitle": "TYMM 6. Sınıf Türkçe 1. Yazılı Püf Noktalar & Zihin Haritası",
  "category": "Dil Bilgisi / Yapı",
  "memoryHook": "Yapım eki kelimeden yepyeni bir kavram TÜRETİR (anlam değişir); Çekim eki sadece kelimeye görev ve durum kazandırır!",
  "summaryCards": [
    {
      "title": "Kök Türleri (İsim vs. Fiil)",
      "badge": "Temel Yapı Taşı",
      "points": [
        "İsim Kökü: \"-mek / -mak\" mastar eki almayan köklerdir (ör: masa, ev, taş, yol).",
        "Fiil Kökü: İş, oluş, durum bildirir ve \"-mek / -mak\" eki alabilir (ör: koş-, sev-, oku-, yaz-).",
        "Ortak Kök & Sesteş Kök: Yazılışları aynı ama anlamları farklı köklerdir."
      ],
      "highlight": "Kök bulunurken sözcüğün son hali ile kök arasında mutlaka anlam ilişkisi bulunmalıdır (ör: \"balık\" kelimesinin kökü \"bal\" olamaz!)."
    },
    {
      "title": "Yapım vs. Çekim Ekleri",
      "badge": "Ek Türleri",
      "points": [
        "Yapım Eki: Kelimenin anlamını ve bazen türünü değiştirir, yeni kelime yapar (-lik, -ci, -li, -siz, -gi).",
        "Çekim Eki: Kelimenin anlamını değiştirmez; çoğul (-lar), hal (-e, -de, -den, -i), iyelik (-im, -in) ekleridir.",
        "Basit Sözcük: Yapım eki almamış sözcüktür.",
        "Türemiş Sözcük: En az bir yapım eki almış sözcüktür."
      ],
      "highlight": "Göz -> Gözlükçü (Türemiş / 2 Yapım Eki). Göz -> Gözlerimizden (Basit / Çekim Ekleri)."
    }
  ],
  "comparisonTable": {
    "headers": [
      "Özellik",
      "Yapım Eki",
      "Çekim Eki"
    ],
    "rows": [
      [
        "Anlamı Değiştirir mi?",
        "EVET, yepyeni bir sözcük türetir",
        "HAYIR, kelimenin temel anlamı korunur"
      ],
      [
        "Sözcüğün Türünü Değiştirir mi?",
        "Değiştirebilir (Fiilden isim, isimden fiil)",
        "Asla türünü değiştirmez"
      ],
      [
        "Örnek",
        "tuz-luk, sev-gi, su-cu, bil-gi",
        "ev-ler-de, yol-umuz-dan, kalem-i"
      ]
    ]
  }
},
{
  "id": "info_6_sosyal_turk",
  "grade": 6,
  "subjectId": "sosyal_bilgiler",
  "examTerm": "1_donem_1_yazili",
  "title": "İlk Türk Devletleri ve İslamiyet'in Doğuşu",
  "subtitle": "TYMM 6. Sınıf Sosyal Bilgiler 1. Yazılı Püf Noktalar & Ayırt Edici Özellikler",
  "category": "Tarihe Yolculuk",
  "memoryHook": "Asya Hun -> Ordu & Onlu Teşkilat (Mete Han); Kök Türk -> İlk Türk Alfabesi (Orhun Abideleri); Uygur -> Yerleşik Hayat & Tarım!",
  "summaryCards": [
    {
      "title": "İlk Türk Devletleri Karşılaştırması",
      "badge": "Orta Asya Kültürü",
      "points": [
        "Asya Hun Devleti: Bilinen ilk Türk devletidir. Teoman kurdu, Mete Han onlu ordu sistemini kurdu.",
        "I. ve II. Kök Türk Devleti: \"Türk\" adıyla kurulan ilk devlettir. Orhun Yazıtları ilk yazılı belgelerimizdir.",
        "Uygurlar: Maniheizm dinini benimsediler; yerleşik hayata geçen, tapınaklar ve kütüphaneler kuran ilk devlettir."
      ],
      "highlight": "Uygurların yerleşik hayata geçmesiyle çadır kültürü yerini saray ve ev mimarisine bırakmış, savaşçı özellikleri azalmıştır."
    },
    {
      "title": "Kut İnancı & Kurultay",
      "badge": "Yönetim Anlayışı",
      "points": [
        "Kut Anlayışı: Devleti yönetme yetkisinin Gök Tanrı tarafından hükümdara verildiğine inanılmasıdır.",
        "Kan Yoluyla Geçiş: Kut kan bağıyla geçtiği için tüm hanedan üyeleri tahtta hak iddia etmiş, bu da taht kavgalarına yol açmıştır.",
        "Kurultay (Toy): Devlet işlerinin görüşüldüğü danışma meclisidir. Hatun da katılarak kadının önemini göstermiştir."
      ],
      "highlight": "Kut inancı ve veraset sistemi Türk devletlerinin çok hızlı kurulup çok hızlı bölünerek yıkılmasının baş sebebidir."
    }
  ],
  "comparisonTable": {
    "headers": [
      "Devlet",
      "Öne Çıkan Lider",
      "Ayırt Edici Özellik"
    ],
    "rows": [
      [
        "Asya Hun",
        "Mete Han",
        "Dünyaya örnek olan Onlu Ordu Sistemi & İpek Yolu hakimiyeti"
      ],
      [
        "Kök Türkler",
        "Bilge Kağan / Tonyukuk",
        "Orhun Abideleri (İlk Türk Yazılı Belgeleri) & Millî alfabe"
      ],
      [
        "Uygurlar",
        "Bögü Kağan",
        "Yerleşik hayata geçiş, tarım, mimari ve matbaayı kullanma"
      ]
    ]
  }
},
{
  "id": "info_6_din_vahiy",
  "grade": 6,
  "subjectId": "din_kulturu",
  "examTerm": "1_donem_1_yazili",
  "title": "Peygamber ve İlahi Kitap İnancı: Sıfatlar ve Vahiy",
  "subtitle": "TYMM 6. Sınıf Din Kültürü 1. Yazılı Püf Noktalar & Zihin Haritası",
  "category": "Peygamber ve Kitap İnancı",
  "memoryHook": "Sıdık: Doğruluk; Emanet: Güvenilirlik; Fetanet: Akıllı/Zeki olmak; İsmet: Günahtan korunmak; Tebliğ: Mesajı iletmektir!",
  "summaryCards": [
    {
      "title": "Peygamberlerin 5 Ortak Sıfatı",
      "badge": "Nübüvvet Nitelikleri",
      "points": [
        "Sıdk: Asla yalan söylemezler, her zaman dosdoğrudurlar.",
        "Emanet: Son derece güvenilirdirler (Hz. Muhammed'e el-Emin denmesi gibi).",
        "Fetanet: Üstün akıl, derin kavrayış ve keskin zekâya sahiptirler.",
        "İsmet: Gizli ve açık her türlü büyük günahtan korunmuşlardır.",
        "Tebliğ: Allah'tan aldıkları vahyi hiç değiştirmeden insanlara ulaştırırlar."
      ],
      "highlight": "Tebliğ peygamberin görev sıfatıdır; diğer dört sıfat ise ahlaki ve zihinsel kişilik sıfatlarıdır."
    },
    {
      "title": "Dört Büyük İlahi Kitap ve Peygamberler",
      "badge": "İlahi Mesajlar",
      "points": [
        "Tevrat -> Hz. Musa'ya indirildi.",
        "Zebur -> Hz. Davud'a indirildi.",
        "İncil -> Hz. İsa'ya indirildi.",
        "Kur'an-ı Kerim -> Hz. Muhammed'e indirildi (Son ve bozulmamış ilahi kitap)."
      ],
      "highlight": "Suhuf: Bazı peygamberlere gönderilen küçük sayfa şeklindeki vahiylerdir (Hz. Adem, Şit, İdris, İbrahim)."
    }
  ],
  "comparisonTable": {
    "headers": [
      "İlahi Kitap",
      "Gönderildiği Peygamber",
      "Hitap Ettiği Toplum / Özellik"
    ],
    "rows": [
      [
        "Tevrat",
        "Hz. Musa",
        "İsrailoğulları"
      ],
      [
        "Zebur",
        "Hz. Davud",
        "İsrailoğulları (Daha çok dua ve ilahiler içerir)"
      ],
      [
        "İncil",
        "Hz. İsa",
        "İsrailoğulları"
      ],
      [
        "Kur'an-ı Kerim",
        "Hz. Muhammed",
        "Tüm insanlığa (Evrensel, son kitap, kıyamete kadar korunacaktır)"
      ]
    ]
  }
},
{
  "id": "info_6_ing_life",
  "grade": 6,
  "subjectId": "ingilizce",
  "examTerm": "1_donem_1_yazili",
  "title": "Life & Yummy Breakfast: Daily Routines & Food Choices",
  "subtitle": "TYMM 6. Sınıf İngilizce 1. Yazılı Püf Noktalar & Konuşma Kalıpları",
  "category": "Unit 1 & Unit 2",
  "memoryHook": "He / She / It öznelerinde fiile \"-s, -es\" takısı gelir! Likes / Dislikes söylerken \"delicious\" vs \"nutritious\"!",
  "summaryCards": [
    {
      "title": "Daily Routines (Present Simple)",
      "badge": "Routines & Time",
      "points": [
        "Wake up early, have breakfast, take the bus, attend traditional folk dance classes, do homework.",
        "Telling the Time: Quarter past (çeyrek geçe), Quarter to (çeyrek kala), Half past (buçuk).",
        "He/She/It: \"He gets up at 7 o'clock\", \"She finishes school at 3 p.m.\""
      ],
      "highlight": "He/She/It olumsuz cümlelerinde \"doesn't\" gelir ve fiildeki \"-s\" düşer: \"He doesn't like cheese.\""
    },
    {
      "title": "Yummy Breakfast (Food & Preferences)",
      "badge": "Healthy Eating",
      "points": [
        "Nutritious Food (Besleyici): Eggs, milk, cheese, olives, honey, tomatoes, cucumber.",
        "Junk Food (Sağlıksız): Sausages, salami, sugary cereal, chips.",
        "Expressing Likes/Dislikes: \"I prefer pancakes with honey because it is delicious.\"",
        "Offering: \"Do you want some tea?\" -> \"Yes, please. / No, thanks. I don't like it.\""
      ],
      "highlight": "\"Prefer\" yapısında tercih edilen öne gelir: \"I prefer milk to cola\" (Sütü kolaya tercih ederim)."
    }
  ],
  "comparisonTable": {
    "headers": [
      "Zaman / Durum",
      "İngilizce İfade",
      "Örnek Cümle"
    ],
    "rows": [
      [
        "07:15",
        "Quarter past seven",
        "I have breakfast at quarter past seven."
      ],
      [
        "08:30",
        "Half past eight",
        "My classes start at half past eight."
      ],
      [
        "Tercih Bildirme",
        "Prefer X to Y",
        "I prefer cheese and olives to junk food."
      ],
      [
        "İkramı Kabul/Reddetme",
        "Yes, please / No, thanks",
        "\"Do you want some orange juice?\" \"Yes, please.\""
      ]
    ]
  }
},
{
  "id": "info_8_turkce_lgs",
  "grade": 8,
  "subjectId": "turkce",
  "examTerm": "1_donem_1_yazili",
  "title": "Fiilimsiler (Eylemsiler) & Cümlede Anlam Analizi",
  "subtitle": "TYMM / LGS 8. Sınıf Türkçe 1. Yazılı Püf Noktalar & Ayırt Edici Şifreler",
  "category": "Sözcük Türleri & Anlam",
  "memoryHook": "İsim-Fiil: -ma, -ış, -mak (Mayışmak); Sıfat-Fiil: -an, -ası, -mez, -ar, -dik, -ecek, -miş (Anası mezar dikecekmiş); Zarf-Fiil: Kenyalı asiye...",
  "summaryCards": [
    {
      "title": "Fiilimsi Türleri ve Ayırt Etme",
      "badge": "LGS Soru Avcısı",
      "points": [
        "İsim-Fiil (-ma, -ış, -mak): Eylemin adıdır. Olumsuzluk eki (-ma/-me) ile karıştırmayınız!",
        "Sıfat-Fiil (-an, -ası, -mez, -ar, -dik, -ecek, -miş): Genellikle önündeki ismi niteler (ör: \"Koşan çocuk\").",
        "Adlaşmış Sıfat-Fiil: Nitelediği isim düştüğünde sıfat-fiil tek başına kalır (ör: \"Gelen gideni aratır\").",
        "Zarf-Fiil (-ken, -alı, -esiye, -meden, -erek, -dıkça, -ince...): Cümleye ZAMAN veya DURUM anlamı katar."
      ],
      "highlight": "Kalıcı İsim Tuzağı: Eylem özelliğini tamamen yitirip nesne adı olan kelimeler fiilimsi DEĞİLDİR (ör: dolma, dondurma, ekmek, çakmak)."
    },
    {
      "title": "Cümlede Anlam Bağıntıları",
      "badge": "Mantık & Muhakeme",
      "points": [
        "Neden-Sonuç (Sebep-Sonuç): Eylemin gerçekleşme gerekçesidir (-dığı için, amacıyla değil).",
        "Amaç-Sonuç: Hedeflenen gaye vardır (-mek amacıyla, üzere).",
        "Koşul-Sonuç: Bir durumun gerçekleşmesi diğer şarta bağlıdır (-se/-sa, şartıyla)."
      ],
      "highlight": "Cümleye \"Hangi amaçla?\" sorusu sorulabiliyorsa AMAÇ-SONUÇ, \"Hangi gerekçeyle/nedenle?\" sorulabiliyorsa NEDEN-SONUÇ cümlesidir."
    }
  ],
  "comparisonTable": {
    "headers": [
      "Fiilimsi Türü",
      "Kalıp Ekler",
      "Örnek Cümle & Püf Nokta"
    ],
    "rows": [
      [
        "İsim-Fiil",
        "-ma, -ış, -mak",
        "\"Kitap okumak zihni dinlendirir.\" (Kalıcı isimlerle karıştırma)"
      ],
      [
        "Sıfat-Fiil",
        "-an, -ası, -mez, -ar, -dik, -ecek, -miş",
        "\"Tanıdık simalarla karşılaştık.\" (Zaman ekleriyle karıştırma)"
      ],
      [
        "Zarf-Fiil",
        "-ken, -alı, -erek, -ince, -dıkça",
        "\"Gülerek yanıma geldi.\" (Nasıl? -> Gülerek: Durum Zarf-Fiili)"
      ]
    ]
  }
},
{
  "id": "info_8_ing_friendship",
  "grade": 8,
  "subjectId": "ingilizce",
  "examTerm": "1_donem_1_yazili",
  "title": "Friendship & Teen Life: Inviting, Accepting, Refusing",
  "subtitle": "TYMM / LGS 8. Sınıf İngilizce 1. Yazılı Püf Noktalar & Diyalog Şifreleri",
  "category": "Unit 1 & Unit 2",
  "memoryHook": "Count on: Güvenmek; Back up: Desteklemek; Get on well with: İyi geçinmek; Laid-back: Rahat/Gamsız!",
  "summaryCards": [
    {
      "title": "Personal Traits (True Friends)",
      "badge": "Friendship Vocabulary",
      "points": [
        "Reliable (Güvenilir): Never tells lies, keeps secrets.",
        "Generous (Cömert): Shares everything, buys presents.",
        "Supportive (Destekleyici): Backs you up when you have a problem.",
        "Stubborn (İnatçı): Never changes his/her mind.",
        "Arrogant (Kibirli): Thinks he/she is better than others."
      ],
      "highlight": "True friends always back each other up and count on one another."
    },
    {
      "title": "Inviting, Accepting and Refusing with Excuse",
      "badge": "Dialog Strategies",
      "points": [
        "Making an Offer: \"Would you like to come over for a drink?\", \"How about going to the cinema?\"",
        "Accepting: \"Yes, I'd love to.\", \"Sounds great!\", \"Why not?\"",
        "Refusing with Excuse: \"I'd love to, but I have an exam tomorrow.\" (Reddederken mazeret bildirme)."
      ],
      "highlight": "LGS sınavında \"Who refuses the offer without making an excuse?\" sorularında mazereti olmayan doğrudan reddi arayınız."
    }
  ],
  "comparisonTable": {
    "headers": [
      "İletişim Amacı",
      "Kullanılan Kalıp",
      "Örnek Cümle"
    ],
    "rows": [
      [
        "Davet Etme",
        "Would you like to / How about",
        "Would you like to join our slumber party?"
      ],
      [
        "Kabul Etme",
        "Sounds awesome / I'd love to",
        "Yeah, that sounds awesome! What time is it?"
      ],
      [
        "Mazeretli Reddetme",
        "I'd love to, but...",
        "I'd love to, but I must help my father."
      ],
      [
        "Mazeretsiz Reddetme",
        "I can't make it / No, thanks",
        "No, I can't. I have other plans."
      ]
    ]
  }
}
];
