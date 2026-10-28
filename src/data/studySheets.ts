import { StudySheet } from '../types';

export const SAMPLE_STUDY_SHEETS: StudySheet[] = [
{
    "id": "study_5_turkce_1_1_senaryo_1",
    "grade": 5,
    "subjectId": "turkce",
    "examTerm": "1_donem_1_yazili",
    "scenarioId": "senaryo_1",
    "title": "5. Sınıf Türkçe 1. Yazılı MEBİ Hap Bilgili Çalışma Kağıdı",
    "sections": [
      {
        "outcomeCode": "T.5.1.1",
        "topicTitle": "Sözcükte Anlam (Gerçek, Mecaz ve Terim Anlam)",
        "quickNotes": [
          "Gerçek (Temel) Anlam: Bir kelimenin akla gelen ilk, somut ve genel anlamıdır. (Örn: \"Ateş yakında elim yandı.\")",
          "Mecaz Anlam: Sözcüğün gerçek anlamından tamamen uzaklaşarak kazandığı soyut, yeni anlamdır. (Örn: \"Sınavı kazanamayınca hayalleri yandı.\")",
          "Terim Anlam: Bilim, sanat, spor veya meslek dalına özgü özel kavramlardır. (Örn: açı, nota, meridyen, perde, taç)."
        ],
        "examTraps": [
          "TUZAK: Günlük hayatta kullanılan her sözcük mecaz değildir. \"Yol\" kelimesi yöntem anlamında kullanılırsa (\"Bu sorunu çözmenin bir yolu var\") mecazdır; ancak \"karayolu\" gerçek anlamdır."
        ],
        "solvedExample": {
          "question": "\"O bize her zaman çok sıcak davranırdı.\" ve \"Sıcak çorba içimizi ısıttı.\" cümlelerindeki \"sıcak\" sözcüklerinin anlam özelliklerini açıklayınız.",
          "analysis": "İlk cümlede samimi ve sevgi dolu (soyut) anlam; ikinci cümlede ise ısısı yüksek (somut) anlam söz konusudur.",
          "solution": "1. cümledeki \"sıcak\" sözcüğü MECAZ anlamda (samimi, dostça), 2. cümledeki \"sıcak\" sözcüğü GERÇEK anlamda (yüksek ısılı) kullanılmıştır."
        },
        "practiceQuestion": {
          "question": "\"Hakem penaltı noktasını gösterdi.\" cümlesindeki \"penaltı\" sözcüğünün anlam özelliğini yazınız.",
          "hint": "Futbol sporuna özgü bir kavram olduğunu düşününüz (Terim anlam)."
        }
      },
      {
        "outcomeCode": "T.5.3.1",
        "topicTitle": "Paragrafta Ana Fikir ve Başlık İlişkisi",
        "quickNotes": [
          "Konu: \"Metinde ne anlatılıyor?\" sorusunun cevabıdır (birkaç kelimeyle özetlenir).",
          "Ana Fikir (Ana Düşünce): \"Yazar bu metni hangi amaçla yazdı? Bize vermek istediği temel mesaj nedir?\" sorusunun tek cümlelik cevabıdır.",
          "Başlık: Metnin konusunu ve ana fikrini en iyi yansıtan, ilgi çekici ve kısa ifadedir."
        ],
        "examTraps": [
          "PÜF NOKTA: Ana fikir bir yargı bildirmeli, öğüt veya sonuç içermelidir. \"Çevre kirliliği\" konudur; \"Gelecek nesillere yaşanabilir bir dünya bırakmak için çevremizi korumalıyız\" ana fikirdir."
        ],
        "solvedExample": {
          "question": "\"Dostluk tıpkı narin bir çiçek gibidir; ilgi, sevgi ve sabırla beslenmezse solar gider.\" Bu cümlenin ana fikrini yazınız.",
          "analysis": "Cümledeki benzetmeden yola çıkarak verilmek istenen ders bulunur.",
          "solution": "Dostlukların kalıcı ve güçlü olabilmesi için karşılıklı emek, ilgi ve özen gösterilmesi gerekir."
        },
        "practiceQuestion": {
          "question": "Bir paragrafın konusunu bulmak için paragrafa hangi soru sorulmalıdır?",
          "hint": "\"Bu metinde neyden söz ediliyor / ne anlatılıyor?\""
        }
      }
    ]
  },
  {
    "id": "study_5_mat_1_1_senaryo_1",
    "grade": 5,
    "subjectId": "matematik",
    "examTerm": "1_donem_1_yazili",
    "scenarioId": "senaryo_1",
    "title": "5. Sınıf Matematik 1. Yazılı MEBİ Hap Bilgili Çalışma Kağıdı",
    "sections": [
      {
        "outcomeCode": "MAT.5.3.1",
        "topicTitle": "Temel Geometrik Çizimler, Doğru, Doğru Parçası ve Işın",
        "quickNotes": [
          "Doğru: Her iki yönden sonsuza kadar uzayan düz çizgidir [AB doğrusu veya d doğrusu]. Boyu ölçülemez.",
          "Işın: Başlangıç noktası sabit olup tek bir yönde sonsuza uzanır [AB ışını: [AB]. Boyu ölçülemez.",
          "Doğru Parçası: İki nokta arasında kalan sınırlı çizgidir [AB doğru parçası: [AB]]. Uzunluğu cetvelle ölçülebilir.",
          "Paralel Doğrular: Aynı düzlemde kesişmeyen doğrulardır (d // k)."
        ],
        "examTraps": [
          "TUZAK: Işının uzunluğu cetvelle ölçülemez! Yalnızca iki ucu da sınırlı olan doğru parçasının boyu ölçülebilir."
        ],
        "solvedExample": {
          "question": "Bir el fenerinden çıkan ışık demeti ile gergin bir ip modellerinden hangisi ışın, hangisi doğru parçası modelidir?",
          "analysis": "Başlangıç ve bitiş noktalarının sınırlı olup olmadığı kontrol edilir.",
          "solution": "El feneri başlangıcı belli ve ucu sonsuza gittiği için IŞIN modelidir. Gergin ip ise iki ucundan sınırlı olduğu için DOĞRU PARÇASI modelidir."
        },
        "practiceQuestion": {
          "question": "Bir cetvel üzerindeki 3 cm ile 9 cm arasındaki çizgi hangi geometrik kavrama örnektir ve uzunluğu kaç cm'dir?",
          "hint": "Başlangıcı ve bitişi belirli olduğu için doğru parçasıdır; farkı hesaplayınız (6 cm)."
        }
      },
      {
        "outcomeCode": "MAT.5.3.3",
        "topicTitle": "Açı Çeşitleri ve İletki (Açıölçer) ile Ölçüm",
        "quickNotes": [
          "Dar Açı: Ölçüsü 0° ile 90° arasında olan açılardır.",
          "Dik Açı: Ölçüsü tam olarak 90° olan açıdır (∟ sembolü).",
          "Geniş Açı: Ölçüsü 90° ile 180° arasında olan açılardır.",
          "Doğru Açı: Ölçüsü tam olarak 180° olan açıdır."
        ],
        "examTraps": [
          "PÜF NOKTA: Saat 03.00'te akrep ile yelkovan dik açı (90°) oluşturur. Saat 03.10'da ise açı daralır ve dar açıya dönüşür."
        ],
        "solvedExample": {
          "question": "Ölçüsü 89° olan açı ile 91° olan açının türlerini yazınız.",
          "analysis": "90° referans değerine göre sınıflandırma yapılır.",
          "solution": "89° < 90° olduğu için DAR AÇI; 91° > 90° olduğu için GENİŞ AÇI'dır."
        },
        "practiceQuestion": {
          "question": "Bir doğru açının ölçüsü dik açının ölçüsünün kaç katıdır?",
          "hint": "Doğru açı 180°, dik açı 90°'dir (2 katı)."
        }
      }
    ]
  },
  {
    "id": "study_5_fen_1_1_senaryo_1",
    "grade": 5,
    "subjectId": "fen_bilimleri",
    "examTerm": "1_donem_1_yazili",
    "scenarioId": "senaryo_1",
    "title": "5. Sınıf Fen Bilimleri 1. Yazılı MEBİ Hap Bilgili Çalışma Kağıdı",
    "sections": [
      {
        "outcomeCode": "FB.5.1.1",
        "topicTitle": "Güneş'in Yapısı ve Dönme Hareketi",
        "quickNotes": [
          "Güneş küresel şekle sahiptir ve orta büyüklükte sarı bir yıldızdır.",
          "Güneş'in yapısında yaklaşık %73 Hidrojen ve %25 Helyum gazı bulunur.",
          "Güneş kendi ekseni etrafında batıdan doğuya (saat yönünün tersine) döner. Bunu Güneş lekelerinin kaymasından anlıyoruz (Galileo keşfetti).",
          "Büyüklük: Güneş basketbol topu ise Dünya nohut, Ay mercimek tanesidir."
        ],
        "examTraps": [
          "TUZAK: \"Güneş uzayda tamamen sabittir ve hiç dönmez\" demek yanlıştır. Kendi ekseni etrafında dönme hareketi yapar."
        ],
        "solvedExample": {
          "question": "Galileo teleskobuyla Güneş lekelerinin her gün aynı yöne doğru kaydığını görmüştür. Bu durum neyi kanıtlar?",
          "analysis": "Gözlemsel veriden Güneş'in hareketine dair çıkarım yapılır.",
          "solution": "Güneş'in kendi ekseni etrafında batıdan doğuya doğru dönme hareketi yaptığını kanıtlar."
        },
        "practiceQuestion": {
          "question": "Güneş, Dünya ve Ay'ı hacimsel büyüklüklerine göre büyükten küçüğe sıralayınız.",
          "hint": "Basketbol topu - nohut - mercimek benzetmesini hatırla."
        }
      },
      {
        "outcomeCode": "FB.5.1.3",
        "topicTitle": "Ay'ın Hareketleri ve Evreleri",
        "quickNotes": [
          "Ay'ın 3 Türlü Hareketi: 1) Kendi ekseni etrafında döner, 2) Dünya etrafında dolanır, 3) Dünya ile birlikte Güneş etrafında dolanır.",
          "Neden Ay'ın hep aynı yüzünü görürüz? Çünkü Ay'ın kendi etrafında dönme süresi ile Dünya etrafında dolanma süresi eşittir (~27.3 gün).",
          "Ay'ın 4 Ana Evresi: Yeniay (Karanlık) → İlk Dördün (\"D\" harfi) → Dolunay (Tam daire) → Son Dördün (Ters \"D\"). Ana evreler arası 1 haftadır (7 gün)."
        ],
        "examTraps": [
          "PÜF NOKTA: Yeniay evresinde Ay, Güneş ile Dünya arasındadır ve karanlık yüzü bize baktığı için Dünya'dan görünmez."
        ],
        "solvedExample": {
          "question": "Gökyüzüne bakan bir öğrenci Ay'ı düz \"D\" harfi şeklinde aydınlık görmüştür. Ay hangi evrededir ve 1 hafta sonra hangi evre görülecektir?",
          "analysis": "Evrelerin şekilsel özellikleri ve kronolojik ardışıklığı incelenir.",
          "solution": "Ay \"D\" şeklinde göründüğünde İLK DÖRDÜN evresindedir. 1 hafta (7 gün) sonraki ana evre DOLUNAY olacaktır."
        },
        "practiceQuestion": {
          "question": "Dolunay evresinden 2 hafta sonra gökyüzünde hangi ana evre görülür?",
          "hint": "Dolunay → (1 hafta) Son Dördün → (1 hafta) Yeniay."
        }
      }
    ]
  },
  {
    "id": "study_5_sosyal_bilgiler_1_1_senaryo_1",
    "grade": 5,
    "subjectId": "sosyal_bilgiler",
    "examTerm": "1_donem_1_yazili",
    "scenarioId": "senaryo_1",
    "title": "5. Sınıf Sosyal Bilgiler 1. Yazılı MEBİ Hap Bilgili Çalışma Kağıdı",
    "sections": [
      {
        "outcomeCode": "SB.5.1.1",
        "topicTitle": "Birlikte Yaşamak: Gruplar, Roller ve Sorumluluklar",
        "quickNotes": [
          "Grup: Ortak bir amaç için bir araya gelen en az iki kişiden oluşan topluluktur (aile, okul takımı, izci kulübü).",
          "Rol: Bir grup içinde üstlendiğimiz görev ve sorumluluklardır (evlat, öğrenci, kaleci, kulüp başkanı).",
          "Aynı anda birden fazla gruba üye olabilir ve birden fazla role sahip olabiliriz.",
          "Hak: Kanunların ve toplum kurallarının bireye tanıdığı yetkilerdir. Sorumluluk: Bireyin kendi davranışlarının sonuçlarını üstlenmesidir."
        ],
        "examTraps": [
          "TUZAK: Kalabalık ile grup aynı şey değildir. Otobüs durağında bekleyen insanlar kalabalıktır (ortak amaç ve iş birliği yoktur); okul korosu ise bir gruptur."
        ],
        "solvedExample": {
          "question": "Ahmet okulda 5-B sınıfı öğrencisi, evde ağabey, futbol takımında ise kaptandır. Bu durum bireylerin rolleri hakkında neyi gösterir?",
          "analysis": "Bireyin farklı sosyal ortamlardaki çeşitlenen rolleri incelenir.",
          "solution": "Bir bireyin aynı anda farklı gruplar içerisinde birden fazla role sahip olabileceğini ve bu rollerin sorumluluklarının farklı olduğunu gösterir."
        },
        "practiceQuestion": {
          "question": "Okul kütüphanesinden yararlanmak bir \"hak\" mıdır yoksa \"sorumluluk\" mudur? Kütüphanede sessiz olmak nedir?",
          "hint": "Yararlanmak HAK, sessiz olmak SORUMLULUKTUR."
        }
      },
      {
        "outcomeCode": "SB.5.2.1",
        "topicTitle": "Kültürel Zenginliklerimiz ve Birlikte Yaşama Kültürü",
        "quickNotes": [
          "Maddi Kültür Ögeleri: Tarihî yapılar, köprüler, camiler, geleneksel kıyafetler, yemekler.",
          "Manevi Kültür Ögeleri: Dil, din, ahlak kuralları, bayramlar, misafirperverlik, türküler, masallar.",
          "Kültürel Çeşitlilik: Farklı bölgelerin halk oyunları (Horon, Zeybek, Halay) birer zenginlik kaynağıdır ve birlik duygusunu pekiştirir."
        ],
        "examTraps": [
          "PÜF NOKTA: Kültürel farklılıklar bir ayrışma sebebi değil, toplumsal kaynaşmayı ve hoşgörüyü güçlendiren birer zenginliktir."
        ],
        "solvedExample": {
          "question": "Karadeniz'de Horon, Ege'de Zeybek, Doğu Anadolu'da Halay oynanması kültürümüzün hangi özelliğini yansıtır?",
          "analysis": "Bölgesel halk oyunlarının zenginliği açıklanır.",
          "solution": "Ülkemizin zengin bir kültürel çeşitliliğe sahip olduğunu ve bu çeşitliliğin millî birlik ve beraberliğimizi güçlendirdiğini gösterir."
        },
        "practiceQuestion": {
          "question": "Düğünlerde yardımlaşma geleneği (imece) hangi manevi değerimize örnektir?",
          "hint": "Dayanışma ve birliktelik."
        }
      }
    ]
  },
  {
    "id": "study_5_din_kulturu_1_1_senaryo_1",
    "grade": 5,
    "subjectId": "din_kulturu",
    "examTerm": "1_donem_1_yazili",
    "scenarioId": "senaryo_1",
    "title": "5. Sınıf Din Kültürü ve Ahlak Bilgisi 1. Yazılı MEBİ Hap Bilgili Çalışma Kağıdı",
    "sections": [
      {
        "outcomeCode": "DKAB.5.1.1",
        "topicTitle": "Allah İnancı ve Evrendeki Mükemmel Düzen",
        "quickNotes": [
          "Tevhid İnancı: Allah'ın bir ve tek olduğuna, eşi ve benzeri bulunmadığına inanmaktır.",
          "Evrendeki Düzen: Gece ile gündüzün birbirini izlemesi, mevsimlerin oluşumu, su döngüsü ve gezegenlerin yörüngeleri bir Yaratıcı'nın varlığını ve gücünü gösterir.",
          "Kur'an Ayeti: \"O, geceyi, gündüzü, güneşi ve ayı yaratandır. Her biri bir yörüngede yüzmektedir.\" (Enbiyâ, 33)."
        ],
        "examTraps": [
          "TUZAK: Evrendeki nizamın kendiliğinden veya tesadüfen oluştuğunu düşünmek yanlıştır; her düzenli sistem bir kurucuyu gösterir."
        ],
        "solvedExample": {
          "question": "Kelimelerin rastgele savrulmasıyla anlamlı bir roman yazılamayacağı gibi, evrendeki atomların da tesadüfen bir araya gelerek kusursuz bir düzen oluşturamayacağı argümanı neyi kanıtlar?",
          "analysis": "Gaye ve nizam delilinden yola çıkılarak Yaratıcı'nın varlığı temellendirilir.",
          "solution": "Evrendeki her şeyin sonsuz bir ilim, irade ve kudret sahibi olan Allah tarafından yaratıldığını ve düzenlendiğini kanıtlar."
        },
        "practiceQuestion": {
          "question": "Allah'ın her şeyi işitmesi sıfatına ne ad verilir?",
          "hint": "Semi (işitme), Basar (görme), İlim (bilme)."
        }
      },
      {
        "outcomeCode": "DKAB.5.1.3",
        "topicTitle": "İhlas Suresi ve Anlamı",
        "quickNotes": [
          "İhlas Suresi, Tevhid inancını en öz ve en açık biçimde özetleyen suredir.",
          "\"Kul hüvellâhü ehad\" (De ki: O Allah tektir).",
          "\"Allâhüs-samed\" (Allah sameddir; hiçbir şeye muhtaç değildir, her şey O'na muhtaçtır).",
          "\"Lem yelid ve lem yûled\" (O doğurmamış ve doğmamıştır).",
          "\"Ve lem yekün lehû küfüven ehad\" (O'nun hiçbir dengi ve benzeri yoktur)."
        ],
        "examTraps": [
          "PÜF NOKTA: \"Samed\" kavramı MEB sınavlarında çok sık sorulur: Hiçbir varlığa muhtaç olmayan, aksine tüm varlıkların var olmak için muhtaç olduğu yüce zattır."
        ],
        "solvedExample": {
          "question": "İhlas Suresi'nde geçen \"Samed\" ne anlama gelir?",
          "analysis": "Ayet kavramının terimsel karşılığı açıklanır.",
          "solution": "Allah'ın hiçbir şeye ihtiyacının olmaması, her şeyin ve herkesin O'na muhtaç olması anlamına gelir."
        },
        "practiceQuestion": {
          "question": "İhlas Suresi'nin temel konusu nedir?",
          "hint": "Tevhid (Allah'ın birliği)."
        }
      }
    ]
  },
  {
    "id": "study_5_ingilizce_1_1_senaryo_1",
    "grade": 5,
    "subjectId": "ingilizce",
    "examTerm": "1_donem_1_yazili",
    "scenarioId": "senaryo_1",
    "title": "5. Sınıf İngilizce 1. Yazılı MEBİ Hap Bilgili Çalışma Kağıdı",
    "sections": [
      {
        "outcomeCode": "E5.1.L1",
        "topicTitle": "Unit 1: Hello! - Countries, Nationalities & Languages",
        "quickNotes": [
          "Country (Ülke): Turkey, England, Germany, France, Italy, Spain, Japan.",
          "Nationality (Milliyet): Turkish, English, German, French, Italian, Spanish, Japanese.",
          "Language (Dil): Turkish, English, German, French, Italian, Spanish, Japanese.",
          "Soru Kalıpları: \"Where are you from?\" -> \"I am from Turkey.\" | \"What nationality are you?\" -> \"I am Turkish.\" | \"How many languages do you speak?\" -> \"I speak two languages.\""
        ],
        "examTraps": [
          "TUZAK: \"Where are you from?\" sorusuna \"I am Turkish\" DENMEZ! Ülke adı söylenir: \"I am from Turkey.\" Milliyet sorusu \"What nationality are you?\"dur."
        ],
        "solvedExample": {
          "question": "A: Where is Pierre from?\nB: He is from France.\nA: What nationality is he?\nB: .......................................\nBoşluğu doldurunuz.",
          "analysis": "Fransa ülkesine ait milliyet karşılığı yazılır.",
          "solution": "He is French."
        },
        "practiceQuestion": {
          "question": "Match: \"Germany\" -> Nationality: ?",
          "hint": "German."
        }
      },
      {
        "outcomeCode": "E5.2.R1",
        "topicTitle": "Unit 2: My Town - Prepositions & Giving Directions",
        "quickNotes": [
          "Prepositions of Place (Yer-Yön Edatları):",
          "• Next to: Yanında | Between: Arasında (iki şeyin) | Opposite: Karşısında | Behind: Arkasında | In front of: Önünde.",
          "Giving Directions (Yol Tarifi):",
          "• Go straight ahead: Düz git.",
          "• Turn left: Sola dön | Turn right: Sağa dön.",
          "• Take the first/second turning on the right/left: Sağdan/soldan birinci/ikinci yola gir."
        ],
        "examTraps": [
          "PÜF NOKTA: \"between\" edatı daima iki varlık gerektirir: \"The bakery is between the bank and the pharmacy.\""
        ],
        "solvedExample": {
          "question": "The library is ................ the museum and the hospital. (Kütüphane müze ile hastanenin arasındadır)",
          "analysis": "İki yerin arasında olma durumu ifade edilir.",
          "solution": "between"
        },
        "practiceQuestion": {
          "question": "How do you say \"Düz git ve sağa dön\" in English?",
          "hint": "Go straight ahead and turn right."
        }
      }
    ]
  },
  {
    "id": "study_6_turkce_1_1_senaryo_1",
    "grade": 6,
    "subjectId": "turkce",
    "examTerm": "1_donem_1_yazili",
    "scenarioId": "senaryo_1",
    "title": "6. Sınıf Türkçe 1. Yazılı MEBİ Hap Bilgili Çalışma Kağıdı",
    "sections": [
      {
        "outcomeCode": "T.6.1.1",
        "topicTitle": "Cümlede Anlam İlişkileri (Neden-Sonuç, Amaç-Sonuç, Koşul-Sonuç)",
        "quickNotes": [
          "Neden-Sonuç (Sebep-Sonuç): Eylemin gerçekleşme gerekçesidir. \"Hangi nedenle / neden?\" sorusuna yanıt verir. (-dığı için, -den dolayı). Olay gerçekleşmiştir.",
          "Amaç-Sonuç: Eylemin hangi hedef doğrultusunda yapıldığını bildirir. \"Hangi amaçla?\" sorusuna yanıt verir. (-mek için, -mek amacıyla). Hedef henüz kesinleşmemiştir.",
          "Koşul-Sonuç (Şart-Sonuç): Bir eylemin gerçekleşmesinin başka bir duruma bağlı olmasıdır (-se / -sa, şartıyla)."
        ],
        "examTraps": [
          "ALTIN FORMÜL: \"-mek amacıyla\" ifadesini cümlenin yerine koyduğunuzda anlamlı oluyorsa AMAÇ-SONUÇ, anlam bozuluyor ve \"-den dolayı\" uyuyorsa NEDEN-SONUÇ cümlesidir!"
        ],
        "solvedExample": {
          "question": "1. \"Yağmur yağdığı için maç iptal edildi.\"\n2. \"Maçı izlemek için stada gitti.\"\nCümlelerinin anlam ilişkilerini belirleyiniz.",
          "analysis": "Altın formül uygulanır: 1. Yağmur yağmasından dolayı (Neden), 2. Maçı izlemek amacıyla (Amaç).",
          "solution": "1. cümle NEDEN-SONUÇ (Sebep-Sonuç), 2. cümle AMAÇ-SONUÇ cümlesidir."
        },
        "practiceQuestion": {
          "question": "\"Düzenli kitap okursan kelime dağarcığın gelişir.\" cümlesinin anlam ilişkisi nedir?",
          "hint": "Koşul (Şart) - Sonuç."
        }
      },
      {
        "outcomeCode": "T.6.4.2",
        "topicTitle": "İsim Tamlamaları (Belirtili, Belirtisiz, Zincirleme)",
        "quickNotes": [
          "Belirtili İsim Tamlaması: Hem tamlayan (-ın, -in, -un, -ün) hem de tamlanan (-ı, -i, -u, -ü, -sı, -si) ek alır. (Örn: kapı-nın kol-u, okul-un bahçe-si).",
          "Belirtisiz İsim Tamlaması: Tamlayan ek ALMAZ, sadece tamlanan ek alır. (Örn: kapı kol-u, Türkçe defter-i).",
          "Zincirleme İsim Tamlaması: En az üç ismin birbirine bağlanmasıyla oluşan tamlamadır. (Örn: okul kapısı-nın anahtar-ı)."
        ],
        "examTraps": [
          "TUZAK: Sıfat tamlamalarıyla isim tamlamalarını karıştırmayın! \"Güzel çocuk\" sıfat tamlamasıdır (\"Nasıl çocuk?\"), \"Çocuk odası\" ise belirtisiz isim tamlamasıdır (\"Neyin/ne odası?\")."
        ],
        "solvedExample": {
          "question": "\"Evin balkon kapısı rüzgârdan açıldı.\" cümlesindeki isim tamlamasını bulup türünü yazınız.",
          "analysis": "Ev + balkon + kapı olmak üzere 3 isim birbirine bağlanmıştır.",
          "solution": "\"Evin balkon kapısı\" bir ZİNCİRLEME İSİM TAMLAMASI'dır."
        },
        "practiceQuestion": {
          "question": "\"Güneş gözlüğü\" hangi tür tamlamadır?",
          "hint": "Tamlayan ek almamış, tamlanan almış: Belirtisiz İsim Tamlaması."
        }
      }
    ]
  },
  {
    "id": "study_6_mat_1_1_senaryo_1",
    "grade": 6,
    "subjectId": "matematik",
    "examTerm": "1_donem_1_yazili",
    "scenarioId": "senaryo_1",
    "title": "6. Sınıf Matematik 1. Yazılı MEBİ Hap Bilgili Çalışma Kağıdı",
    "sections": [
      {
        "outcomeCode": "MAT.6.1.1",
        "topicTitle": "Bir Doğal Sayının Çarpanları ve Katları",
        "quickNotes": [
          "Bir doğal sayının çarpanı aynı zamanda o sayının kalansız BÖLENİDİR.",
          "Gökkuşağı Yöntemi: 24'ün çarpanları: 1×24, 2×12, 3×8, 4×6 -> {1, 2, 3, 4, 6, 8, 12, 24}. Toplam 8 tanedir.",
          "Asal Sayı: Sadece 1'e ve kendisine bölünebilen 1'den büyük doğal sayılardır: 2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31...",
          "En küçük asal sayı 2'dir. 2'den başka ÇİFT asal sayı YOKTUR!"
        ],
        "examTraps": [
          "TUZAK: \"1 asal sayıdır\" ifadesi YANLIŞTIR! Asal sayılar 2'den başlar. Ayrıca tüm tek sayılar asal değildir (örneğin 9, 15, 21 asal değildir çünkü 3'e bölünür)."
        ],
        "solvedExample": {
          "question": "36 sayısının tüm pozitif çarpanlarını küçükten büyüğe yazıp kaç tanesinin asal sayı olduğunu bulunuz.",
          "analysis": "Çarpan listesi çıkarılır ve asal olanlar ayıklanır.",
          "solution": "36'nın çarpanları: 1, 2, 3, 4, 6, 9, 12, 18, 36 (9 tane). Bunlardan asal olanlar yalnızca 2 ve 3'tür (2 tanesi asaldır)."
        },
        "practiceQuestion": {
          "question": "Alanı 40 cm² olan bir dikdörtgenin kenar uzunlukları tam sayı ise çevre uzunluğunun alabileceği en küçük değer kaçtır?",
          "hint": "Birbirine en yakın çarpanları (5 ve 8) seçerek çevreyi hesaplayınız: 2 × (5 + 8) = 26 cm."
        }
      },
      {
        "outcomeCode": "MAT.6.1.2",
        "topicTitle": "Bölünebilme Kuralları (2, 3, 4, 5, 6, 9, 10)",
        "quickNotes": [
          "2 ile Bölünme: Son basamağı çift rakam (0, 2, 4, 6, 8) olan sayılar bölünür.",
          "3 ile Bölünme: Rakamları toplamı 3 veya 3'ün katı olan sayılar bölünür.",
          "4 ile Bölünme: Son iki basamağı 00 veya 4'ün katı olan sayılar bölünür.",
          "5 ile Bölünme: Son basamağı 0 veya 5 olan sayılar bölünür.",
          "6 ile Bölünme: Hem 2'ye hem de 3'e aynı anda bölünebilen sayılar bölünür.",
          "9 ile Bölünme: Rakamları toplamı 9 veya 9'un katı olan sayılar bölünür.",
          "10 ile Bölünme: Son basamağı 0 olan sayılar bölünür."
        ],
        "examTraps": [
          "PÜF NOKTA: Rakamları toplamı kuralı SADECE 3 ve 9 için geçerlidir! 4 ve 6 için rakamları toplamına bakılmaz."
        ],
        "solvedExample": {
          "question": "Dört basamaklı 5A72 sayısı 9 ile kalansız bölünebildiğine göre A yerine yazılması gereken rakamı bulunuz.",
          "analysis": "Rakamlar toplamının 9'un katı olma şartı uygulanır.",
          "solution": "5 + A + 7 + 2 = 14 + A. 14'ten büyük en küçük 9'un katı 18'dir. 14 + A = 18 ise A = 4 bulunur."
        },
        "practiceQuestion": {
          "question": "Üç basamaklı 48B sayısı hem 2 hem de 5 ile kalansız bölünebildiğine göre B rakamı kaçtır?",
          "hint": "Hem 2 hem 5'e bölünmenin tek şartı son basamağın 0 olmasıdır."
        }
      }
    ]
  },
  {
    "id": "study_6_fen_1_1_senaryo_1",
    "grade": 6,
    "subjectId": "fen_bilimleri",
    "examTerm": "1_donem_1_yazili",
    "scenarioId": "senaryo_1",
    "title": "6. Sınıf Fen Bilimleri 1. Yazılı MEBİ Hap Bilgili Çalışma Kağıdı",
    "sections": [
      {
        "outcomeCode": "FB.6.1.1",
        "topicTitle": "Güneş Sistemi: Gezegenlerin Sınıflandırılması",
        "quickNotes": [
          "Güneş'e Yakınlık Sıralaması: Merkür - Venüs - Dünya - Mars - Jüpiter - Satürn - Uranüs - Neptün (Kodlama: Meraklı Vedat Dünkü Maçta Jale'ye Sordu: Umut Nerede?).",
          "İç (Karasal) Gezegenler: Merkür, Venüs, Dünya, Mars. Yüzeyleri katı taş ve kayalardan oluşur. Halkaları yoktur, uyduları azdır veya yoktur.",
          "Dış (Gazsal) Gezegenler: Jüpiter, Satürn, Uranüs, Neptün. Gaz tabakalarından oluşur, devasa kütlelidirler, hepsinin halkası ve çok sayıda uydusu vardır.",
          "Asteroit Kuşağı: Mars ile Jüpiter yörüngeleri arasında bulunur; iç ve dış gezegenleri birbirinden ayırır.",
          "En büyük gezegen Jüpiter, en küçük gezegen Merkür'dür. En sıcak gezegen sera etkisinden dolayı Venüs'tür."
        ],
        "examTraps": [
          "TUZAK: Güneş'e en yakın Merkür olmasına rağmen Güneş sisteminin EN SICAK gezegeni VENÜS'tür! Çünkü Venüs'ün kalın karbondioksit atmosferi yoğun bir sera etkisi yaratır."
        ],
        "solvedExample": {
          "question": "Karasal (iç) gezegenler ile gazsal (dış) gezegenleri 2 temel özellik açısından karşılaştırınız.",
          "analysis": "Yüzey yapıları ve halka/uydu varlıkları kıyaslanır.",
          "solution": "1) Karasal gezegenlerin yüzeyi katı kayaçlardan oluşurken gazsal gezegenler yoğun gaz tabakalarından oluşur. 2) Gazsal gezegenlerin hepsinin halkası varken, karasal gezegenlerin hiçbirinde halka bulunmaz."
        },
        "practiceQuestion": {
          "question": "Asteroit kuşağı Güneş sisteminde hangi iki gezegenin yörüngeleri arasında yer alır?",
          "hint": "İç gezegenlerin sonuncusu ile dış gezegenlerin ilki: Mars ve Jüpiter."
        }
      },
      {
        "outcomeCode": "FB.6.1.2",
        "topicTitle": "Güneş ve Ay Tutulmaları",
        "quickNotes": [
          "Güneş Tutulması: Ay, Güneş ile Dünya arasına girer (G - A - D). Ay YENİAY evresindedir. Gündüz vakti yaşanır, dar bir alanda gözlenir. Çıplak gözle izlenmesi göze zarar verir.",
          "Ay Tutulması: Dünya, Güneş ile Ay arasına girer (G - D - A). Ay DOLUNAY evresindedir. Gece vakti yaşanır, Dünya'nın geceyi yaşayan tüm yüzeyinden çıplak gözle izlenebilir.",
          "Her ay tutulma neden olmaz? Çünkü Ay'ın dolanma yörünge düzlemi ile Dünya'nın yörünge düzlemi arasında yaklaşık 5 derecelik bir açı eğikliği vardır."
        ],
        "examTraps": [
          "PÜF NOKTA: Güneş tutulmasında Ay Yeniay, Ay tutulmasında Ay Dolunay evresindedir. Ancak her Yeniay ve Dolunayda tutulma gerçekleşmez."
        ],
        "solvedExample": {
          "question": "Güneş tutulması esnasında gök cisimlerinin sıralamasını çiziniz veya yazınız.",
          "analysis": "Tutulmada araya giren gök cismi tespit edilir.",
          "solution": "Güneş — Ay — Dünya şeklindedir (Ay ortadadır ve gölgesi Dünya üzerine düşer)."
        },
        "practiceQuestion": {
          "question": "Ay tutulmasını izlerken özel filtreli koruyucu gözlük takmak gerekir mi? Neden?",
          "hint": "Gerektirmez çünkü yansıyan ışıktır ve göze zarar vermez."
        }
      }
    ]
  },
  {
    "id": "study_6_sosyal_bilgiler_1_1_senaryo_1",
    "grade": 6,
    "subjectId": "sosyal_bilgiler",
    "examTerm": "1_donem_1_yazili",
    "scenarioId": "senaryo_1",
    "title": "6. Sınıf Sosyal Bilgiler 1. Yazılı MEBİ Hap Bilgili Çalışma Kağıdı",
    "sections": [
      {
        "outcomeCode": "SB.6.1.1",
        "topicTitle": "Sosyal Rollerimiz ve Değişim Süreci",
        "quickNotes": [
          "Doğuştan Sahip Olunan Roller: Çaba harcamadan elde edilen rollerdir (evlat, kardeş, torun).",
          "Sonradan Kazanılan Roller: Bireyin kendi isteği, emeği ve başarısıyla elde ettiği rollerdir (öğrenci, doktor, takım kaptanı, kulüp başkanı).",
          "Rollerin Değişimi: Yaşımız ilerledikçe rollerimiz ve bu rollerin gerektirdiği sorumluluklar artar veya değişir."
        ],
        "examTraps": [
          "TUZAK: \"Öğrenci olmak doğuştan kazanılan bir roldür\" ifadesi yanlıştır; eğitim kurumuna kayıt yaptırılarak sonradan kazanılır."
        ],
        "solvedExample": {
          "question": "Bireyin sahip olduğu rollerden iki tanesini doğuştan ve sonradan kazanılan olarak sınıflandırınız.",
          "analysis": "Emek ve irade unsuru göz önüne alınır.",
          "solution": "Doğuştan kazanılan: Evlat/kardeş rolü. Sonradan kazanılan: Sınıf başkanı/doktor rolü."
        },
        "practiceQuestion": {
          "question": "Bir hakem maç esnasında rolünün gereğini yerine getirmezse hangi toplumsal sorun doğar?",
          "hint": "Adaletsizlik ve güven kaybı."
        }
      },
      {
        "outcomeCode": "SB.6.1.2",
        "topicTitle": "Ön Yargılar ve Kalıp Yargılarla Mücadele",
        "quickNotes": [
          "Ön Yargı: Bir kimse veya bir durum hakkında önceden edinilmiş olumlu veya olumsuz peşin hükümdür.",
          "Kalıp Yargı: Bir grubun tüm üyelerine genellenen değişmez inanışlardır (örn: \"Gözlüklüler çok çalışkandır\").",
          "Ön yargının sonuçları: Toplumsal ayrışma, iletişim çatışması, empati eksikliği ve adaletsizlik.",
          "Ön yargıyı kırmanın yolları: Empati kurmak, insanları tanımaya çalışmak, farklılıklara saygı duymak."
        ],
        "examTraps": [
          "PÜF NOKTA: Kalıp yargılar sadece olumsuz olmaz; \"tüm kadınlar şefkatlidir\" veya \"tüm Japonlar disiplinlidir\" gibi genellemeler de birer kalıp yargıdır."
        ],
        "solvedExample": {
          "question": "\"Gözlüklü insanlar zekidir\" ifadesi bir ön yargı mıdır yoksa kalıp yargı mıdır? Neden?",
          "analysis": "Belli bir özelliğe sahip grubun tamamına yapılan genelleme incelenir.",
          "solution": "Kalıp yargıdır; çünkü bir gruba ait özellik tüm bireylere genellenmiştir."
        },
        "practiceQuestion": {
          "question": "Ön yargıları yıkmak için en etkili iletişim becerisi nedir?",
          "hint": "Empati (kendini başkasının yerine koyma)."
        }
      }
    ]
  },
  {
    "id": "study_6_din_kulturu_1_1_senaryo_1",
    "grade": 6,
    "subjectId": "din_kulturu",
    "examTerm": "1_donem_1_yazili",
    "scenarioId": "senaryo_1",
    "title": "6. Sınıf Din Kültürü ve Ahlak Bilgisi 1. Yazılı MEBİ Hap Bilgili Çalışma Kağıdı",
    "sections": [
      {
        "outcomeCode": "DKAB.6.1.1",
        "topicTitle": "Peygamber ve İlahi Kitap İnancı",
        "quickNotes": [
          "Nübüvvet ve Risalet: Peygamberlik makamıdır.",
          "Resul: Kendisine yeni bir kitap ve yeni bir şeriat (hükümler) gönderilen peygamberlerdir (Hz. Musa, Hz. İsa, Hz. Muhammed).",
          "Nebi: Kendisine yeni bir kitap verilmeyip kendinden önceki peygamberin tebliğ ettiği dini insanlara anlatan peygamberlerdir (Hz. Harun). Her resul aynı zamanda nebidir, fakat her nebi resul değildir.",
          "Dört Büyük İlahi Kitap: Tevrat (Hz. Musa), Zebur (Hz. Davud), İncil (Hz. İsa), Kur'an-ı Kerim (Hz. Muhammed)."
        ],
        "examTraps": [
          "TUZAK: Resul ile Nebi arasındaki farkı karıştırmayın: Resul'e yeni bir kitap indirilmiştir, Nebi ise mevcut kitabı tebliğ eder."
        ],
        "solvedExample": {
          "question": "Resul ve Nebi kavramları arasındaki temel farkı tek cümleyle açıklayınız.",
          "analysis": "İlahi kitap gönderilme durumu üzerinden ayrım yapılır.",
          "solution": "Resul kendisine yeni bir ilahi kitap indirilen peygamber iken; nebi kendisine müstakil bir kitap verilmeyip önceki peygamberin dinini tebliğ eden peygamberdir."
        },
        "practiceQuestion": {
          "question": "Zebur hangi peygambere indirilmiştir?",
          "hint": "Hz. Davud."
        }
      },
      {
        "outcomeCode": "DKAB.6.1.2",
        "topicTitle": "Peygamberlerin 5 Temel Niteliği (Sıfatları)",
        "quickNotes": [
          "1. Sıdk: Doğruluk ve dürüstlük (Asla yalan söylemezler).",
          "2. Emanet: Güvenilir olmak (Kendilerine verilen her şeye sahip çıkarlar; Muhammedü'l-Emin).",
          "3. İsmet: Günah işlememek, masum ve temiz olmak.",
          "4. Fetanet: Üstün akıl ve zekâ sahibi olmak.",
          "5. Tebliğ: Allah'tan aldıkları vahiyleri eksiksiz ve olduğu gibi insanlara ulaştırmak."
        ],
        "examTraps": [
          "PÜF NOKTA: MEB sınavlarında sıfatların eşleştirmesi sık sorulur: Güvenilirlik -> Emanet, Zeka -> Fetanet, Doğruluk -> Sıdk."
        ],
        "solvedExample": {
          "question": "Mekkelilerin henüz Müslüman olmadan önce bile Hz. Muhammed'e \"el-Emin\" demeleri peygamberimizin hangi sıfatıyla doğrudan ilişkilidir?",
          "analysis": "el-Emin güvenilir anlamına gelir.",
          "solution": "Peygamberlerin EMANET (güvenilirlik) sıfatıyla doğrudan ilişkilidir."
        },
        "practiceQuestion": {
          "question": "Peygamberlerin üstün zekâ ve akıl sahibi olmaları hangi sıfattır?",
          "hint": "Fetanet."
        }
      }
    ]
  },
  {
    "id": "study_6_ingilizce_1_1_senaryo_1",
    "grade": 6,
    "subjectId": "ingilizce",
    "examTerm": "1_donem_1_yazili",
    "scenarioId": "senaryo_1",
    "title": "6. Sınıf İngilizce 1. Yazılı MEBİ Hap Bilgili Çalışma Kağıdı",
    "sections": [
      {
        "outcomeCode": "E6.1.R1",
        "topicTitle": "Unit 1: Life - Daily Routines & Telling the Time",
        "quickNotes": [
          "Daily Routines (Günlük Aktiviteler): wake up, wash hands and face, have breakfast, brush teeth, attend classes, run errands, do homework, sleep.",
          "Telling the Time (Saatler):",
          "• It is 08.00 -> It is eight o'clock.",
          "• It is 08.15 -> It is quarter past eight.",
          "• It is 08.30 -> It is half past eight.",
          "• It is 08.45 -> It is quarter to nine (DOKUZA ÇEYREK VAR!).",
          "Simple Present Tense 3rd person singular: He/She/It fiile -s, -es, -ies alır! (He wakes up, She goes)."
        ],
        "examTraps": [
          "TUZAK: 08.45 saatinde \"quarter to eight\" DENMEZ! Bir sonraki saate geçildiği için \"quarter to NINE\" denir."
        ],
        "solvedExample": {
          "question": "Write the time in words: \"07.30\" and \"09.45\".",
          "analysis": "Half past ve quarter to kuralları uygulanır.",
          "solution": "07.30: It is half past seven.\n09.45: It is quarter to ten."
        },
        "practiceQuestion": {
          "question": "Correct the sentence: \"Tolga play football after school.\"",
          "hint": "Özne tekil (Tolga) olduğu için fiile -s takısı gelir: \"plays\"."
        }
      },
      {
        "outcomeCode": "E6.2.W1",
        "topicTitle": "Unit 2: Yummy Breakfast - Food & Expressing Preferences",
        "quickNotes": [
          "Breakfast Foods: cheese, olives, honey, butter, egg, bagel (simit), croissant, cereal, sausage, milk, tea, coffee.",
          "Expressing Likes/Dislikes: like / enjoy / love (+), dislike / hate (-).",
          "Offering Food: \"Do you want some cheese?\" -> \"Yes, please.\" / \"No, thanks, I don't like cheese.\"",
          "Nutritious vs. Junk Food: Vegetables and eggs are healthy/nutritious; sausages and chips are junk/unhealthy."
        ],
        "examTraps": [
          "PÜF NOKTA: \"I like tea, but I hate coffee.\" Cümlesinde iki zıt fikir \"but\" bağlacı ile bağlanır."
        ],
        "solvedExample": {
          "question": "A: Do you want some olives?\nB: No, thanks. I ................... (hate) them.",
          "analysis": "Olumsuz tercih ve hate fiili.",
          "solution": "hate"
        },
        "practiceQuestion": {
          "question": "What is the Turkish meaning of \"nutritious\"?",
          "hint": "Besleyici / yararlı."
        }
      }
    ]
  },
  {
    "id": "study_8_turkce_1_1_senaryo_1",
    "grade": 8,
    "subjectId": "turkce",
    "examTerm": "1_donem_1_yazili",
    "scenarioId": "senaryo_1",
    "title": "8. Sınıf Türkçe 1. Yazılı / LGS Odaklı Çalışma Kağıdı (Fiilimsiler & Cümlenin Ögeleri)",
    "sections": [
      {
        "outcomeCode": "T.8.1.1",
        "topicTitle": "Fiilimsiler (Eylemsiler): İsim-Fiil, Sıfat-Fiil, Zarf-Fiil",
        "quickNotes": [
          "Fiilimsiler fiil kök veya gövdelerine gelen özel eklerle türetilir. Kip ve kişi eki ALMAZLAR, cümlede isim, sıfat ve zarf görevi yaparlar. Olumsuzu \"-me/-ma\" ile yapılabilir.",
          "1. İsim-Fiil (M-A-Y-I-Ş-M-A-K): -ma, -me, -ış, -iş, -uş, -üş, -mak, -mek. (Örn: \"Kitap okumayı çok seviyorum.\")",
          "2. Sıfat-Fiil (A-N-A-S-I-M-E-Z-A-R-D-İ-K-E-C-E-K-M-İ-Ş): -an, -ası, -mez, -ar, -dik, -ecek, -miş. İsmin önüne gelip onu niteler. (Örn: \"Kırılan bardakları topladı.\")",
          "3. Zarf-Fiil (Kenyalı Asiye İnce İpini Araklamadan...): -ken, -alı, -asıya, -e...-e, -ince, -ip, -arak, -dıkça, -maden, -meksizin, -r...-mez, -casına. Fiili durum veya zaman bakımından niteler."
        ],
        "examTraps": [
          "KALICI İSİM TUZAĞI: Fiilimsi ekini alıp zamanla bir nesnenin/kavramın kalıcı adı olan sözcükler fiilimsi SAYILMAZ! Örnek: dondurma, dolma, sarma, kazma, çakmak, ekmek, danışma, giriş, çıkış.",
          "KİP EKİ İLE SIFAT-FİİL KARIŞTIRMA TUZAĞI: \"Gelecek günleri umutla bekliyor.\" cümlesindeki \"gelecek\" sıfat-fiildir. \"Yarın bize gelecek.\" cümlesindeki \"gelecek\" ise yüklemdir (gelecek zaman kipi)."
        ],
        "solvedExample": {
          "question": "\"Annemin yaptığı sarmayı afiyetle yedik.\" cümlesindeki \"yaptığı\" ve \"sarmayı\" sözcüklerinin türünü açıklayınız.",
          "analysis": "Sarma kelimesi yemek adı olarak kalıcı isim olmuştur; yaptığı kelimesi ise ismi niteleyen sıfat-fiildir.",
          "solution": "\"yaptığı\" sözcüğü SIFAT-FİİL'dir (-dık eki almıştır). \"sarma\" sözcüğü ise bir yemeğin adı olarak kalıplaştığı için KALICI İSİM'dir (fiilimsi değildir)."
        },
        "practiceQuestion": {
          "question": "\"Koşarak yanımıza geldi.\" cümlesindeki zarf-fiili ve cümleye kattığı anlamı (zaman mı durum mu) yazınız.",
          "hint": "\"Koşarak\" zarf-fiildir; \"Nasıl geldi?\" sorusuna yanıt verdiği için DURUM anlamı katmıştır."
        }
      },
      {
        "outcomeCode": "T.8.3.1",
        "topicTitle": "Cümlenin Temel Ögeleri: Yüklem ve Özne",
        "quickNotes": [
          "Cümlenin Ögelerini Bulma Sırası Kuralı: Y-Ö-N-T (Önce Yüklem, sonra Özne, sonra Nesne, sonra Tümleçler bulunur!).",
          "Yüklem: Cümlenin yargı bildiren ana unsurudur. Çekimli bir fiil veya ek fiil almış bir isim olabilir. Tamlamalar, deyimler ve birleşik fiiller BÖLÜNEMEZ!",
          "Özne: Yüklemde bildirilen işi yapan veya yargının konusu olan unsurdur. Yükleme sorulan \"Kim?\" ve \"Ne?\" (Yapan kim / Olan ne?) sorularıyla bulunur."
        ],
        "examTraps": [
          "PÜF NOKTA: Deyimler bir bütün olduğu için öge bulunurken asla bölünmez! \"Öğretmenin sözleri gözümü açtı.\" cümlesinde yüklem \"gözünü açmak\" deyimidir."
        ],
        "solvedExample": {
          "question": "\"Yıllardır hayalini kurduğu o kırmızı bisikleti nihayet dün babası aldı.\" cümlesinin öznesini bulunuz.",
          "analysis": "Yüklem: aldı. Alan kim? Babası.",
          "solution": "Cümlenin öznesi \"babası\"dır (Gerçek özne)."
        },
        "practiceQuestion": {
          "question": "\"Sınav soruları beklediğimizden çok daha kolaydı.\" cümlesinin yüklemi nedir?",
          "hint": "İsim soylu tamlama yüklemdir: \"beklediğimizden çok daha kolaydı\"."
        }
      }
    ]
  },
  {
    "id": "study_8_mat_1_1_senaryo_1",
    "grade": 8,
    "subjectId": "matematik",
    "examTerm": "1_donem_1_yazili",
    "scenarioId": "senaryo_1",
    "title": "8. Sınıf Matematik 1. Yazılı / LGS Odaklı Çalışma Kağıdı (Çarpanlar & Katlar, EBOB-EKOK, Üslü Sayılar)",
    "sections": [
      {
        "outcomeCode": "M.8.1.1.2",
        "topicTitle": "EBOB ve EKOK Problemlerinde Ayırt Edici İpuçları",
        "quickNotes": [
          "EBOB (En Büyük Ortak Bölen): Büyük parçalardan KÜÇÜK parçalar elde ediliyorsa EBOB kullanılır! (Bütünden parçaya). Örnek: Çuvallardaki pirinçleri poşetlere paylaştırma, tarlanın etrafına eşit aralıklarla fidan dikme, kumaşları eşit parçalara bölme.",
          "EKOK (En Küçük Ortak Kat): Küçük parçalar bir araya gelerek BÜYÜK bir bütün oluşturuyorsa EKOK kullanılır! (Parçadan bütüne). Örnek: Farklı aralıklarla çalan zillerin birlikte çalması, nöbet günleri, kutuları üst üste koyup kule yapma, dairesel pistte karşılaşma turları.",
          "Aralarında Asal Sayılar: 1'den başka ortak böleni olmayan sayılardır (örneğin 8 ile 15). Aralarında asal iki sayının EBOB'u daima 1, EKOK'u ise bu iki sayının çarpımıdır!"
        ],
        "examTraps": [
          "LGS TUZAĞI: Tarlanın etrafına ağaç dikilirken köşelere de dikilip dikilmeyeceği sorulur. \"Köşelere de dikilmek şartıyla\" dendiğinde toplam fidan sayısı: Çevre / EBOB formülüyle bulunur."
        ],
        "solvedExample": {
          "question": "Biri 40 dakikada bir, diğeri 50 dakikada bir kalkan iki vapur ilk kez saat 08.00'de birlikte hareket etmiştir. İkinci kez saat kaçta birlikte hareket ederler?",
          "analysis": "Tekrarlayan zaman periyotları parça-bütün ilişkisidir, EKOK gerektirir.",
          "solution": "EKOK(40, 50) = 200 dakika. 200 dakika = 3 saat 20 dakika. Saat 08.00 + 03.20 = 11.20'de tekrar birlikte hareket ederler."
        },
        "practiceQuestion": {
          "question": "Kenar uzunlukları 18 m ve 24 m olan dikdörtgen şeklindeki bahçenin kenarlarına ve köşelerine eşit aralıklarla ağaç dikilecektir. En az kaç ağaç gerekir?",
          "hint": "Önce EBOB(18, 24) = 6 m bulunur. Bahçe çevresi = 2 × (18 + 24) = 84 m. Ağaç sayısı = 84 / 6 = 14 ağaç."
        }
      },
      {
        "outcomeCode": "M.8.1.2.2",
        "topicTitle": "Üslü İfadeler ve Temel İşlem Kuralları",
        "quickNotes": [
          "Negatif Kuvvet: Sayıyı ters çevirir (çarpmaya göre tersi): a^(-n) = 1 / (a^n). İşareti pozitifse negatif yapmaz!",
          "Üssün Üssü: Üsler çarpılır: (a^m)^n = a^(m × n).",
          "Çarpma Kuralı: Tabanlar aynı ise üsler toplanır: a^x × a^y = a^(x+y). Üsler aynı ise tabanlar çarpılır: a^x × b^x = (a×b)^x.",
          "Bölme Kuralı: Tabanlar aynı ise payın üssünden paydanın üssü çıkarılır: a^x / a^y = a^(x-y).",
          "Sıfır Hariç Her Sayının Sıfırıncı Kuvveti 1'dir: a^0 = 1."
        ],
        "examTraps": [
          "PARANTEZ TUZAĞI: -3² = -9 iken, (-3)² = +9'dur! Parantez çift kuvveti kapsamadığında eksi işareti korunur."
        ],
        "solvedExample": {
          "question": "2^15 tane cevizin yarısını 4 kardeşe eşit paylaştırırsak her kardeşe kaç ceviz düşer?",
          "analysis": "Yarısını almak 2'ye bölmek, 4 kardeşe paylaştırmak ise tekrar 2²'ye bölmektir.",
          "solution": "Cevizlerin yarısı: 2^15 / 2^1 = 2^14. 4 kardeşe paylaştırma: 2^14 / 2^2 = 2^12 ceviz düşer."
        },
        "practiceQuestion": {
          "question": "4^6 × 8^3 işleminin sonucunu 2'nin kuvveti olarak yazınız.",
          "hint": "4 = 2² ve 8 = 2³ yazarak üssün üssü kuralını uygulayınız: (2²)^6 × (2³)^3 = 2^12 × 2^9 = 2^21."
        }
      }
    ]
  },
  {
    "id": "study_8_fen_1_1_senaryo_1",
    "grade": 8,
    "subjectId": "fen_bilimleri",
    "examTerm": "1_donem_1_yazili",
    "scenarioId": "senaryo_1",
    "title": "8. Sınıf Fen Bilimleri 1. Yazılı / LGS Odaklı Çalışma Kağıdı (Mevsimler ve İklim, DNA)",
    "sections": [
      {
        "outcomeCode": "F.8.1.1.1",
        "topicTitle": "Mevsimlerin Oluşumu ve Eksen Eğikliği",
        "quickNotes": [
          "Mevsimlerin oluşumunun 2 temel sebebi vardır: 1) Dünya'nın eksen eğikliği (23° 27'), 2) Dünya'nın Güneş etrafında dolanması.",
          "Dünya'nın Güneş'e olan mesafesinin mevsimlerle hiçbir ilgisi yoktur! Dünya Güneş'e en yakın olduğu tarih 3 Ocak'tır fakat Kuzey Yarım Küre kış mevsimini yaşar.",
          "Işığın Geliş Açısı: Işık ışınları dik veya dike yakın gelirse birim alana düşen ısı enerjisi artar (YAZ). Eğik açıyla gelirse alan genişler, birim alandaki enerji azalır (KIŞ).",
          "Dönenceler ve Gün Dönümü: 21 Haziran (Yengeç Dönencesi dik / KYK Yaz, GYK Kış), 21 Aralık (Oğlak Dönencesi dik / KYK Kış, GYK Yaz), 21 Mart & 23 Eylül (Ekinoks / Ekvator dik / Gece-Gündüz 12 saat eşit)."
        ],
        "examTraps": [
          "GÖLGE BOYU KURALI: Güneş ışınları ne kadar DİK gelirse gölge boyu o kadar KISA olur. 21 Haziran'da öğle vakti Türkiye'de yılın en kısa gölgesi oluşur."
        ],
        "solvedExample": {
          "question": "21 Aralık tarihinde Türkiye'de bulunan bir çubuğun gölge boyu ile Güney Afrika'da bulunan özdeş bir çubuğun gölge boyunu karşılaştırınız.",
          "analysis": "21 Aralık'ta ışınların geliş açısı KYK ve GYK açısından kıyaslanır.",
          "solution": "21 Aralık'ta Güney Yarım Küre (Güney Afrika) yaz mevsimini yaşar ve ışınlar dike yakın gelir, dolayısıyla gölge boyu çok kısadır. Kuzey Yarım Küre (Türkiye) ise kış yaşar ve ışınlar eğik gelir, dolayısıyla gölge boyu uzundur."
        },
        "practiceQuestion": {
          "question": "Dünya'nın eksen eğikliği olmasaydı mevsimler ve gece-gündüz süreleri hakkında ne söylenebilirdi?",
          "hint": "Mevsimler oluşmazdı ve yıl boyu her yerde 12 saat gece - 12 saat gündüz yaşanırdı."
        }
      },
      {
        "outcomeCode": "F.8.2.1.1",
        "topicTitle": "DNA ve Genetik Kod: Yapı ve Hiyerarşi",
        "quickNotes": [
          "Karmaşıktan Basite Sıralama (KediGen): Kromozom > DNA > Gen > Nükleotid.",
          "Kromozom: DNA'nın özel protein kılıfına sarılmış halidir. Sağlıklı bir insanda 46 kromozom (23 çift) vardır. Kromozom sayısının canlının gelişmişliği ile hiçbir ilgisi yoktur (Örn: Eğrelti otu 500 kromozomludur).",
          "DNA (Deoksiribonükleik Asit): Çift zincirli, sarmal yapılı yönetici moleküldür.",
          "Gen: DNA'nın görev ve anlam birimidir. Kalıtsal özellikleri (göz rengi, boy uzunluğu vb.) taşır.",
          "Nükleotid: DNA'nın en küçük yapı birimidir. 3 kısımdan oluşur: Fosfat + Deoksiriboz Şekeri + Organik Baz (Adenin, Timin, Guanin, Sitozin).",
          "Eşleşme Kuralı: Adenin (A) daima Timin (T) ile; Guanin (G) daima Sitozin (C) ile eşleşir. A = T ve G = C."
        ],
        "examTraps": [
          "TUZAK: DNA'nın yapı birimi NÜKLEOTİD iken, görev birimi GEN'dir! MEB bu ikisini sorularda sıkça yer değiştirir."
        ],
        "solvedExample": {
          "question": "Bir DNA molekülünde toplam 600 nükleotid bulunmaktadır. Bu DNA'da 100 Guanin nükleotidi olduğuna göre Timin sayısı kaçtır?",
          "analysis": "G = C = 100. Toplam G + C = 200. Kalan A + T = 600 - 200 = 400. A = T olduğu için ikiye bölünür.",
          "solution": "G = 100 ise C = 100'dür. Toplam G + C = 200 nükleotid. Geriye kalan nükleotid: 600 - 200 = 400 (Adenin + Timin). A = T olduğundan Timin sayısı: 400 / 2 = 200 bulunur."
        },
        "practiceQuestion": {
          "question": "Nükleotidler ismini yapısındaki hangi maddeden alır?",
          "hint": "İçerdiği organik bazdan (Adenin bazı içeriyorsa Adenin Nükleotidi)."
        }
      }
    ]
  },
  {
    "id": "study_8_sosyal_bilgiler_1_1_senaryo_1",
    "grade": 8,
    "subjectId": "sosyal_bilgiler",
    "examTerm": "1_donem_1_yazili",
    "scenarioId": "senaryo_1",
    "title": "8. Sınıf T.C. İnkılap Tarihi ve Atatürkçülük 1. Yazılı / LGS Odaklı Çalışma Kağıdı",
    "sections": [
      {
        "outcomeCode": "İTA.8.1.1",
        "topicTitle": "20. Yüzyıl Başlarında Osmanlı Devleti ve Fikir Akımları",
        "quickNotes": [
          "Sanayi İnkılabı: Sömürgecilik yarışını ve hammadde arayışını başlattı; I. Dünya Savaşı'nın temel ekonomik sebebidir. Osmanlı açık pazar haline geldi ve lonca teşkilatı çöktü.",
          "Fransız İhtilali: Milliyetçilik akımını yaydı; çok uluslu Osmanlı İmparatorluğu'nda azınlık isyanlarına ve Balkanlar'da büyük toprak kayıplarına yol açtı.",
          "Osmanlı'yı Dağılmaktan Kurtarma Fikir Akımları:",
          "• Osmanlıcılık: Din, dil, ırk ayrımı yapmaksızın herkesi eşit kabul etme (Tanzimat, Meşrutiyet). Balkan Savaşları ile çöktü.",
          "• İslamcılık (Ümmetçilik): Tüm Müslümanları halife etrafında birleştirme (II. Abdülhamid). Arapların İngilizlerle iş birliği yapmasıyla çöktü.",
          "• Türkçülük (Turancılık): Türk milletinin millî bilincine ve kültürüne dayanma (Ziya Gökalp). Millî Mücadele'nin temel harcı oldu.",
          "• Batıcılık: Batı'nın bilim, fen ve yönetim anlayışını örnek alma (Tevfik Fikret)."
        ],
        "examTraps": [
          "LGS TUZAĞI: Arapların I. Dünya Savaşı'nda İngilizlerle birlikte hareket etmesi İSLAMCILIK fikrinin; Balkan Savaşları'nda Hristiyan milletlerin bağımsızlık ilan etmesi OSMANLICILIK fikrinin çöktüğünü gösterir."
        ],
        "solvedExample": {
          "question": "Selanik şehrinin çok uluslu yapısı ve zengin demir yolu-liman ağı Mustafa Kemal'in fikir hayatını nasıl etkilemiştir?",
          "analysis": "Selanik'in jeopolitik ve kültürel ortamının kişilik gelişimine yansıması incelenir.",
          "solution": "Farklı kültür ve dinleri bir arada görerek hoşgörü ve zengin bir vizyon kazanmasını sağlamış; Avrupa'daki gazete ve yayınlara hızlı erişimi ise Batı dünyasındaki fikir akımlarını yakından takip etmesine zemin hazırlamıştır."
        },
        "practiceQuestion": {
          "question": "Mustafa Kemal'in Şam'da \"Vatan ve Hürriyet Cemiyeti\"ni kurması onun hangi kişilik özelliklerini yansıtır?",
          "hint": "Liderlik, vatanseverlik ve teşkilatçılık."
        }
      },
      {
        "outcomeCode": "İTA.8.1.3",
        "topicTitle": "Mustafa Kemal'in Askerlik Hayatı ve Millî Mücadele Hazırlığı",
        "quickNotes": [
          "31 Mart Vakası (1909): Meşrutiyete karşı çıkan isyanı bastıran Hareket Ordusu'nda Kurmay Başkanı olarak görev aldı. Tarih sahnesine ilk çıkışıdır.",
          "Trablusgarp Savaşı (1911): İlk askeri başarısıdır. Gönüllü olarak Derne ve Tobruk'ta yerel halkı teşkilatlandırarak İtalyanlara karşı savaştı (Teşkilatçılık & Vatanseverlik).",
          "Çanakkale Cephesi (1915): Anafartalar, Conkbayırı ve Arıburnu'nda kazandığı zaferlerle \"Anafartalar Kahramanı\" olarak tanındı. Millî Mücadele'nin lideri olmasını sağladı.",
          "Kafkas Cephesi: Muş ve Bitlis'i Rus işgalinden kurtardı. Generalliğe (Paşa) terfi etti."
        ],
        "examTraps": [
          "PÜF NOKTA: Mustafa Kemal'in Trablusgarp'ta yerel halkı örgütlemesi onun \"TEŞKİLATÇILIK / ÖRGÜTLEYİCİLİK\" yeteneğini gösterir."
        ],
        "solvedExample": {
          "question": "Mustafa Kemal'in Çanakkale Cephesi'ndeki başarısının Kurtuluş Savaşı açısından en önemli sonucu nedir?",
          "analysis": "Liderlik algısı ve halkın güveni bağlamında değerlendirilir.",
          "solution": "Hem yurt içinde hem de dünyada büyük bir ün kazanarak Türk milletinin gözünde tartışmasız millî bir lider haline gelmesini sağlamıştır."
        },
        "practiceQuestion": {
          "question": "Mustafa Kemal'in \"Ben size taarruzu değil, ölmeyi emrediyorum!\" sözü hangi savaş ve cephede söylenmiştir?",
          "hint": "Çanakkale Savaşı (Conkbayırı)."
        }
      }
    ]
  },
  {
    "id": "study_8_din_kulturu_1_1_senaryo_1",
    "grade": 8,
    "subjectId": "din_kulturu",
    "examTerm": "1_donem_1_yazili",
    "scenarioId": "senaryo_1",
    "title": "8. Sınıf Din Kültürü ve Ahlak Bilgisi 1. Yazılı / LGS Odaklı Çalışma Kağıdı",
    "sections": [
      {
        "outcomeCode": "DKAB.8.1.1",
        "topicTitle": "Kader ve Kaza İnancı",
        "quickNotes": [
          "Kader: Allah'ın her şeyi önceden bir ölçü, düzen ve plana göre takdir etmesi, programlamasıdır (Plan aşaması).",
          "Kaza: Allah'ın takdir ettiği bu planın zamanı ve yeri gelince gerçekleşmesidir (Uygulama/olay anı).",
          "Örnek: \"Güneş'in doğuş ve batış saatlerinin hesaplanması\" KADER; \"Güneş'in sabah saat 06.30'da doğması\" KAZA'dır.",
          "Tevekkül: Bir iş için gereken tüm maddi ve manevi çabayı gösterdikten sonra sonucu Allah'a bırakıp güvenmektir. Tedbirsiz tevekkül olmaz!"
        ],
        "examTraps": [
          "TUZAK: \"Ben kader mahkumuyum\", \"Kaderim böyleymiş ne yapsam boş\" diyerek sorumluluktan kaçmak İslam kader anlayışına aykırıdır. İnsanın iradesi ve seçme hakkı (cüzi irade) vardır."
        ],
        "solvedExample": {
          "question": "1. \"Su 100 derecede kaynar kuralı.\"\n2. \"Çaydanlıktaki suyun 100 dereceye ulaşıp kaynaması.\"\nHangisi kader, hangisi kazadır?",
          "analysis": "Ölçü ve kanun boyutu kader, fiili gerçekleşme boyutu kazadır.",
          "solution": "1. durum KADER (önceden konmuş ölçü/yasa), 2. durum KAZA'dır (olayın gerçekleşmiş hali)."
        },
        "practiceQuestion": {
          "question": "Tarlasını sürüp tohumu eken ve gübreleyen bir çiftçinin bereketli ürün için dua etmesi hangi kavramla açıklanır?",
          "hint": "Gereken tüm tedbirleri alıp Allah'a güvenmek: Tevekkül."
        }
      },
      {
        "outcomeCode": "DKAB.8.1.2",
        "topicTitle": "Evrenin Yasaları (Sünnetullah / Âdetullah)",
        "quickNotes": [
          "1. Fiziksel Yasalar: Madde ve enerjinin yapısı, hareketi ve değişimini inceler. Evrensel ve deneyle ispatlanabilir yasalardır. (Örn: Yer çekimi, suyun kaldırma kuvveti, ısınan metallerin genleşmesi, mevsimler).",
          "2. Biyolojik Yasalar: Canlıların yapısı, üremesi, büyümesi, beslenmesi ve gelişimini düzenleyen yasalardır. (Örn: Fotosentez, kuşların kanat yapısı, develerin çöl şartlarına uyumu, DNA).",
          "3. Toplumsal Yasalar: Toplumların huzur, adalet, güven ve birlikteliğini düzenleyen neden-sonuç kurallarıdır. (Örn: Adaletin olmadığı yerde kargaşa çıkması, göçler, yardımlaşmanın barışı artırması)."
        ],
        "examTraps": [
          "PÜF NOKTA: Ayette \"adalet, dürüstlük, hak, zulüm, toplumların helakı\" geçiyorsa Toplumsal; \"gece-gündüz, su, gemilerin yüzmesi\" geçiyorsa Fiziksel; \"insanın yaratılışı, bitki, hayvan\" geçiyorsa Biyolojik yasadır."
        ],
        "solvedExample": {
          "question": "\"Onlar yeryüzünde gezip kendilerinden öncekilerin sonunun nasıl olduğuna bakmazlar mı?\" ayeti hangi evrensel yasa ile ilgilidir?",
          "analysis": "Geçmiş toplumların başına gelenler ve sosyolojik sonuçlar vurgulanmıştır.",
          "solution": "TOPLUMSAL YASA ile ilgilidir."
        },
        "practiceQuestion": {
          "question": "Kutup ayılarının soğuktan korunmak için kalın yağ tabakasına sahip olması hangi yasa türüne girer?",
          "hint": "Canlıların biyolojik uyumu: Biyolojik Yasa."
        }
      }
    ]
  },
  {
    "id": "study_8_ingilizce_1_1_senaryo_1",
    "grade": 8,
    "subjectId": "ingilizce",
    "examTerm": "1_donem_1_yazili",
    "scenarioId": "senaryo_1",
    "title": "8. Sınıf İngilizce 1. Yazılı / LGS Odaklı Çalışma Kağıdı",
    "sections": [
      {
        "outcomeCode": "E8.1.R1",
        "topicTitle": "Unit 1: Friendship - Making, Accepting & Refusing Invitations",
        "quickNotes": [
          "Making Invitations (Davet Etme):",
          "• Would you like to join us? (Bize katılmak ister misin?)",
          "• How about / What about going to the cinema? (Sinemaya gitmeye ne dersin?)",
          "• Why don't we have a picnic? (Neden piknik yapmıyoruz?)",
          "Accepting (Kabul Etme): \"Yes, I'd love to.\", \"That sounds great / awesome!\", \"Sure, why not?\"",
          "Refusing with Excuse (Gerekçe ile Reddetme): \"I'd love to, but I can't. I have an exam tomorrow.\", \"I am sorry, but I am busy.\"",
          "Personal Traits (Kişilik Özellikleri): Honest (dürüst), Generous (cömert), Supportive / Back up (destekleyici), Reliable / Dependable (güvenilir), Stubborn (inatçı), Tactful (ince fikirli)."
        ],
        "examTraps": [
          "LGS TUZAĞI: \"I'd love to, but I must study.\" cümlesi KABUL DEĞİL, REDDETME ifadesidir! Başındaki \"I'd love to\"ya kanıp kabul sanmayın; \"but\" ile reddetmiş ve mazeret bildirmiştir."
        ],
        "solvedExample": {
          "question": "A true friend should always back you up and tell the truth. Which two adjectives describe this friend?",
          "analysis": "Back up = support (destekleyici), tell the truth = honest (dürüst).",
          "solution": "Supportive and Honest (or Reliable)."
        },
        "practiceQuestion": {
          "question": "What does \"Count on\" mean?",
          "hint": "Trust / depend on (Güvenmek)."
        }
      },
      {
        "outcomeCode": "E8.2.W1",
        "topicTitle": "Unit 2: Teen Life - Daily Routines & Music Preferences",
        "quickNotes": [
          "Expressing Preferences: \"I prefer pop music to rock music.\" (Tercih edilen önce gelir, araya TO konur!).",
          "Opinions about Music/Activities:",
          "• Terrific: Müthiş / harika (+)",
          "• Impressive: Etkileyici (+)",
          "• Ridiculous: Gülünç / saçma (-)",
          "• Unbearable: Katlanılmaz / çekilmez (-)",
          "• Boring / Dull: Sıkıcı (-)."
        ],
        "examTraps": [
          "PÜF NOKTA: \"Unbearable\" olumsuz bir sıfattır (\"katlanılmaz\"). Bir kişi caz müziği için \"unbearable\" diyorsa caz müziğini sevmediği (dislike) anlamına gelir."
        ],
        "solvedExample": {
          "question": "\"I think heavy metal music is unbearable because it is too loud.\" What is the speaker's opinion about heavy metal?",
          "analysis": "Unbearable kelimesinin olumsuz anlamı yorumlanır.",
          "solution": "The speaker hates/dislikes heavy metal music and thinks it is noisy and intolerable."
        },
        "practiceQuestion": {
          "question": "Fill in the blank: \"I prefer listening to folk music .............. hip-hop.\"",
          "hint": "Prefer A to B kuralı: \"to\"."
        }
      }
    ]
  },
{
    id: 'study_7_fen_1_1_senaryo_4',
    grade: 7,
    subjectId: 'fen_bilimleri',
    examTerm: '1_donem_1_yazili',
    scenarioId: 'senaryo_4',
    title: '7. Sınıf Fen Bilimleri 1. Yazılı (4. Senaryo) Hap Bilgili Çalışma Kağıdı',
    sections: [
      {
        outcomeCode: 'FB.7.1.1',
        topicTitle: 'Uzay Araştırmaları ve Teleskoplar',
        quickNotes: [
          'Teleskobu ilk bulan Hollandalı gözlükçü Hans Lippershey\'dir, ancak gök bilimi amacıyla ilk kullanan Galileo Galilei olmuştur.',
          'Aynalı (yansıtmalı) teleskobu geliştiren bilim insanı Isaac Newton\'dur.',
          'Ali Kuşçu (Fatih Sultan Mehmet dönemi) Ay\'ın ilk haritasını çıkaran ve İstanbul\'un enlem-boylamını hesaplayan Türk-İslam bilginidir.',
          'Uzay teleskopları (Hubble, James Webb), atmosferdeki toz, bulut, ışık kirliliği ve gaz dalgalanmalarından etkilenmediği için yeryüzündekilerden çok daha net görüntü çeker.',
          'Türkiye Uyduları: Aktif Haberleşme (Türksat 4A, 4B, 5A, 5B, 6A) | Aktif Gözlem (Göktürk-1, Göktürk-2, İMECE) | Görevini Tamamlayanlar (Bilsat, Rasat, Türksat 1B, 1C, 2A).'
        ],
        examTraps: [
          'TUZAK: "Teleskobu Galileo icat etti" ifadesi yanlıştır! Galileo ilk gök bilimi gözlemini yapmıştır.',
          'PÜF NOKTA: Rasat Türkiye\'nin ilk yerli gözlem uydusudur ancak aktif görevini tamamlamıştır; güncel aktif gözlem için İMECE ve Göktürk uyduları yazılmalıdır.'
        ],
        solvedExample: {
          question: 'James Webb Uzay Teleskobu neden Dünya yüzeyindeki dev bir dağın zirvesine değil de uzaya yerleştirilmiştir? Açıklayınız.',
          analysis: 'Soru yeryüzü teleskopları ile uzay teleskoplarının ortam farkını analiz etmeyi gerektirir.',
          solution: 'Çünkü yeryüzündeki dağların tepesinde bile atmosfer tabakası bulunur. Atmosferdeki gaz molekülleri ışığı saçar ve kırar, ayrıca hava olayları ve az da olsa ışık kirliliği gözlemi bozar. Uzay boşluğunda ise atmosfer bulunmadığı için ışık bozulmadan teleskoba ulaşır.'
        },
        practiceQuestion: {
          question: 'Türkiye\'nin uzayda görev yapan uydularını haberleşme ve gözlem uyduları olarak iki ayrı grupta sınıflandırınız.',
          hint: 'Türksat serisinin TV ve veri aktarımı, Göktürk ve İMECE\'nin yer fotoğraflama görevi olduğunu hatırla.'
        }
      },
      {
        outcomeCode: 'FB.7.1.3',
        topicTitle: 'Uzay Kirliliği',
        quickNotes: [
          'Uzay kirliliği: İnsan yapımı işlevini yitirmiş roket parçaları, patlama artıkları, ömrü bitmiş uydular ve cıvatalardır.',
          'Doğal gök cisimleri (meteorlar, asteroitler, kuyruklu yıldızlar) uzay kirliliği sayılmaz!',
          'Uzay kirliliği Dünya yüzeyine düşme riski taşır veya yörüngede saatte on binlerce kilometre hızla dönerek aktif uydulara çarpabilir.'
        ],
        examTraps: [
          'TUZAK: "Güneş patlamaları veya kayan yıldızlar uzay kirliliğine neden olur" ifadesi yanlıştır. Uzay kirliliği yalnızca yapay (insan kaynaklı) araç artıklarından oluşur.'
        ],
        solvedExample: {
          question: 'Uzay kirliliğinin gelecekte uzay araştırmaları için yaratacağı "Kessler Sendromu" zincirleme tehlikesini özetleyiniz.',
          analysis: 'Kirliliğin geometrik artış riskini ve uzay araştırmalarının durma ihtimalini açıklar.',
          solution: 'Yörüngedeki çöpler aktif uydulara veya birbirine çarptığında binlerce yeni küçük parçaya bölünür. Bu durum zincirleme çarpışmaları tetikleyerek Dünya etrafını aşılamaz bir enkaz kuşağına çevirebilir ve gelecekte uzaya roket fırlatılmasını imkânsız hale getirebilir.'
        },
        practiceQuestion: {
          question: 'Uzay kirliliğini azaltmak için mühendislerin geliştirebileceği 2 farklı teknolojik çözüm yazınız.',
          hint: 'Görevi biten aracın atmosfere sokulup yakılması ya da uzay süpürgesi/ağı fikirlerini düşün.'
        }
      },
      {
        outcomeCode: 'FB.7.1.4',
        topicTitle: 'Yıldızlar ve Yaşam Döngüsü',
        quickNotes: [
          'Yıldızların doğum yeri: BULUTSU (NEBULA) dır. (Örn: Orion Bulutsusu, Kartal Bulutsusu).',
          'Yıldızın sonunu kütlesi belirler:',
          '1) Küçük Kütleli Yıldız: Bulutsu -> Küçük Yıldız -> Kızıl Dev -> Gezegenimsi Bulutsu -> BEYAZ CÜCE (ve Siyah Cüce). (Güneşimiz bu gruptadır).',
          '2) Büyük Kütleli Yıldız: Bulutsu -> Büyük Yıldız -> Süper Kırmızı Dev -> Süpernova Patlaması -> NÖTRON YILDIZI veya KARA DELİK.'
        ],
        examTraps: [
          'PÜF NOKTA: Güneş patlayıp kara delik OLMAZ! Çünkü Güneş küçük kütleli (orta büyüklükte) bir yıldızdır ve ömrünü Beyaz Cüce olarak tamamlayacaktır.',
          'TUZAK: Işık yılı bir zaman birimi DEĞİLDİR; ışığın bir yılda aldığı MESAFE (uzaklık) birimidir.'
        ],
        solvedExample: {
          question: 'Bir öğrenci "Güneşimiz ömrünü tamamladığında bir kara deliğe dönüşerek tüm gezegenleri yutacaktır." demiştir. Bu ifadenin fen bilimleri açısından doğruluğunu değerlendiriniz.',
          analysis: 'Kütle ayrımı kuralı hatırlanmalıdır.',
          solution: 'Öğrencinin ifadesi yanlıştır. Karadelikler yalnızca başlangıç kütlesi Güneş\'ten çok daha büyük olan dev yıldızların süpernova patlaması geçirmesiyle oluşur. Güneş orta/küçük kütleli bir yıldız olduğu için Kızıl Dev aşamasından sonra Beyaz Cüce\'ye dönüşecektir.'
        },
        practiceQuestion: {
          question: 'Süpernova patlaması hangi kütledeki yıldızların yaşam döngüsünde gerçekleşir ve sonrasında hangi iki yapı oluşabilir?',
          hint: 'Büyük kütleli yıldızların son ürünlerini hatırla.'
        }
      },
      {
        outcomeCode: 'FB.7.2.1',
        topicTitle: 'Kuvvet, Fiziksel Anlamda İş ve Enerji İlişkisi',
        quickNotes: [
          'Fiziksel Anlamda İş: Bir cisme uygulanan kuvvetin, cismi KENDİ DOĞRULTUSUNDA hareket ettirmesiyle yapılır (İş = Kuvvet × Yol).',
          'İş Yapılmayan Durumlar: 1) Sırtındaki çantayla düz yolda sabit hızla yürüyen öğrenci (kuvvet yukarı, hareket yatay: doğrultular dik!). 2) Duvarı iten ancak hareket ettiremeyen çocuk (yol = 0).',
          'İş Yapılan Durumlar: 1) Yerden çantayı yukarı kaldıran öğrenci (kuvvet yukarı, hareket yukarı: yerçekimine karşı iş yapılır). 2) Masayı iterek odanın diğer ucuna götüren kişi (kuvvet yatay, hareket yatay).',
          'İş birimi Joule (J)\'dür. 1 Joule = 1 Newton × 1 Metre.'
        ],
        examTraps: [
          'TUZAK: Günlük hayatta "ders çalışmak" veya "çantayı sırtında taşımak" yorucu olduğu için iş sayılır; ancak fen anlamında yer değiştirme kuvvet doğrultusunda değilse iş SIFIRDIR!'
        ],
        solvedExample: {
          question: 'Ali elindeki 20 N ağırlığındaki koliyi yerden 1.5 metre yukarı kaldırıp rafın üzerine koymuştur. Ali yerçekimine karşı iş yapmış mıdır? Hesaplayınız.',
          analysis: 'Kuvvetin yönü (yukarı) ile cismin yer değiştirme yönü (yukarı) aynı doğrultuda olduğu için iş yapılır.',
          solution: 'İş = Kuvvet × Alınan Yol = 20 N × 1.5 m = 30 Joule iş yapılmıştır.'
        },
        practiceQuestion: {
          question: 'Düz bir yolda elindeki poşeti sallamadan yatayda 10 metre taşıyan bir kişi fiziksel anlamda iş yapmış olur mu? Nedenini açıklayınız.',
          hint: 'Kuvvetin doğrultusu ile hareket doğrultusunun birbirine dik olduğunu göz önünde bulundur.'
        }
      }
    ]
  },
  {
    id: 'study_7_mat_1_1_senaryo_1',
    grade: 7,
    subjectId: 'matematik',
    examTerm: '1_donem_1_yazili',
    scenarioId: 'senaryo_1',
    title: '7. Sınıf Matematik 1. Yazılı (1. Senaryo) Hap Bilgili Çalışma Kağıdı',
    sections: [
      {
        outcomeCode: 'MAT.7.1.1',
        topicTitle: 'Tam Sayılar, Rasyonel Sayılar ve Sayı Doğrusu Modeli (MAT.7.1.1)',
        quickNotes: [
          'Aynı işaretliler toplanırken: Sayılar normal toplanır, ortak işaret yazılır. (+5) + (+3) = +8 | (-5) + (-3) = -8.',
          'Zıt işaretliler toplanırken: Büyük sayıdan küçük sayı çıkarılır, mutlak değeri büyük olanın işareti verilir. (-9) + (+4) = -5.',
          'Çıkarma işlemi: Çıkarma kuralında çıkan sayının işareti ters çevrilir ve işlem toplamaya dönüşür: a - b = a + (-b).',
          'Örnek: (-8) - (-12) = (-8) + (+12) = +4.'
        ],
        examTraps: [
          'TUZAK: Çıkarma işleminde ikinci sayının işaretini değiştirmeyi unutmak en yaygın hatadır. İki eksi yan yana gelirse artı olur: - (-5) = +5.'
        ],
        solvedExample: {
          question: '(-15) - (+8) + (-7) işleminin sonucunu adım adım gösteriniz.',
          analysis: 'Çıkarma işlemini toplamaya çevirerek sırayla soldan sağa işlem yapılır.',
          solution: '1. Adım: Çıkarmayı toplamaya çevirelim: (-15) + (-8) + (-7)\n2. Adım: Tüm sayılar negatif olduğundan toplayalım: - (15 + 8 + 7) = -30.'
        },
        practiceQuestion: {
          question: '[(-20) - (-6)] + [(+14) + (-9)] işleminin sonucunu bulunuz.',
          hint: 'Önce köşeli parantez içlerini tek tek hesapla.'
        }
      },
      {
        outcomeCode: 'MAT.7.1.3',
        topicTitle: 'Rasyonel Sayılarda Karşılaştırma, Sıralama ve İşlem Önceliği (MAT.7.1.3)',
        quickNotes: [
          'Pozitif sayıların tüm kuvvetleri POZİTİFTİR: (+2)^3 = +8, (+2)^4 = +16.',
          'Negatif sayıların TEK kuvvetleri NEGATİF, ÇİFT kuvvetleri (parantez dışındaysa) POZİTİFTİR.',
          '(-2)^4 = +16 (Parantez var, çift kuvvet eksiye de etki eder)',
          '-2^4 = -16 (Parantez yok, eksi sayının değil işlemin başındadır!)',
          '(-5)^0 = +1 fakat -5^0 = -1 dir.',
          'Sıfırın tüm pozitif kuvvetleri 0 dır: 0^5 = 0.'
        ],
        examTraps: [
          'EN BÜYÜK SINAV TUZAĞI: (-3)^2 ile -3^2 ASLA EŞİT DEĞİLDİR! (-3)^2 = +9 dur, -3^2 = -9 dur. MEB ortak yazılılarında bu soru neredeyse her yıl sorulur!'
        ],
        solvedExample: {
          question: '(-2)^3 + (-3)^2 - (-1)^50 işleminin sonucunu bulunuz.',
          analysis: 'Her bir üslü ifadenin işaretini ve değerini ayrı ayrı hesaplayalım.',
          solution: '(-2)^3 = -8 (Tek kuvvet negatif)\n(-3)^2 = +9 (Parantezli çift kuvvet pozitif)\n(-1)^50 = +1 (1\'in çift kuvveti pozitif)\nİşlem: (-8) + (+9) - (+1) = (+1) - (+1) = 0.'
        },
        practiceQuestion: {
          question: 'A = (-4)^2 ve B = -4^2 olduğuna göre A - B işleminin sonucunu bulunuz.',
          hint: 'A\'nın +16, B\'nin -16 olduğunu fark et ve çıkarmada işaret değişimini uygula.'
        }
      }
    ]
  },

  // 3. TÜRKÇE (7. Sınıf MEBİ Yazılıya Hazırlık Hap Bilgileri)
  {
    id: 'study_7_turkce_1_1_senaryo_1',
    grade: 7,
    subjectId: 'turkce',
    examTerm: '1_donem_1_yazili',
    scenarioId: 'senaryo_1',
    title: '7. Sınıf Türkçe 1. Yazılı MEBİ Hap Bilgili Çalışma Kağıdı',
    sections: [
      {
        outcomeCode: 'T.O.7.7',
        topicTitle: 'Metnin Derin Anlamı, Örtük Anlam ve Sembolik Çıkarımlar',
        quickNotes: [
          'Örtük Anlam: Metinde açıkça ifade edilmeyen fakat kullanılan kelimelerden, kahramanların tutumlarından veya nesnelerden çıkarılan gizli anlamdır.',
          'Sembolik Eylemler: Demirci Hasan\'ın ocağı hararetli yakıp sabaha kılıç üretmesi, halkın teslim olmayıp vatan savunması için canını ortaya koyduğunu simgeler.',
          'Karakter Gelişimi: Ece\'nin okuma grubunda Mehmet\'e "birlikte okuyabiliriz" demesi ve Mehmet duraksadığında sabırla beklemesi, Mehmet\'e eşit bir birey olarak değer verdiğini ve empati kurduğunu gösterir.',
          'Metin Yapıları: Metinlerde "karşılaştırma/zıtlık", "sebep-sonuç" ve "örnekleme" gibi düşünceyi geliştirme yolları ana fikri güçlendirmek için kullanılır.'
        ],
        examTraps: [
          'TUZAK: Örtük anlam çıkarımı yaparken kendi hayal gücünüze göre cevap yazmayınız. Mutlaka metindeki somut bir cümleye veya eyleme atıfta bulunarak gerekçenizi kanıtlayınız.'
        ],
        solvedExample: {
          question: 'Demirci Hasan\'ın köylülere tarım aletleri yerine kılıç dağıtması neyi simgeler?',
          analysis: 'Tarım aletleri barışçıl üretimi, kılıç ise vatan müdafaasını temsil eder.',
          solution: 'Halkın artık normal tarımsal yaşamı bırakıp vatan savunması ve bağımsızlık için topyekûn silahlı mücadeleye başladığını gösterir.'
        },
        practiceQuestion: {
          question: 'Mehmet\'in ikinci hafta kütüphaneye gelip "Bu kez bölümü ben seçtim" demesi onda hangi duygunun geliştiğini kanıtlar?',
          hint: 'İlk gün göz teması kuramayan çocuğun inisiyatif alması ve öz güven kazanması üzerinde durunuz.'
        }
      },
      {
        outcomeCode: 'T.Y.7.21',
        topicTitle: 'Yazım Kuralları ve Noktalama İşaretleri (İkilemeler, Noktalı Virgül, Üç Nokta)',
        quickNotes: [
          'İkilemelerin Yazımı: İkilemeler DAİMA AYRI yazılır ve aralarına KISA ÇİZGİ KONMAZ! ("apar topar", "hızlı hızlı", "el ele", "art arda").',
          'Noktalı Virgül (;) Kullanımı:',
          '1. Cümle içinde virgüllerle ayrılmış tür veya takımları birbirinden ayırmak için konur (Örn: Erkek çocuklara Doğan, Tuğrul; kız çocuklara İnci, Çiçek adları verilir).',
          '2. Ögeleri arasında virgül bulunan sıralı cümleleri birbirinden ayırmak için konur (Örn: Sevinçten, heyecandan içim içime sığmıyor; bağırmak, kahkahalar atmak istiyorum).',
          '3. İkiden fazla eş değer ögeler arasında virgül bulunan cümlede özneyi belirginleştirmek için özneden sonra konur.',
          'Üç Nokta (...): Anlatımı tamamlanmamış (yüklemi bulunmayan / eksiltili) cümlelerin sonuna konur.'
        ],
        examTraps: [
          'EN BÜYÜK YAZIM TUZAĞI: "apar-topar" veya "hızlıhızlı" yazmak yazım hatasıdır. İkilemeler kesinlikle kısa çizgisiz ve ayrı yazılmalıdır!'
        ],
        solvedExample: {
          question: '“Genç şairimiz ( ) Necip Fazıl, Nâzım Hikmet ve Attilâ İlhan gibi isimlerden ilham alıyordu.” Cümlesindeki yay ayraca hangi noktalama işareti gelmelidir?',
          analysis: 'Cümlede şair isimleri arasında virgül vardır. Özneyi diğer isimlerden ayırmak gerekir.',
          solution: 'Noktalı virgül (;) getirilmelidir. Çünkü ikiden fazla eş değer ögesi arasında virgül bulunan cümlede özneyi (Genç şairimiz) diğer isimlerden ayırt etmek için noktalı virgül kullanılır.'
        },
        practiceQuestion: {
          question: '“Bahçemizde rengârenk çiçekler, taze ot kokuları ( )” cümlesinin sonuna neden üç nokta konur?',
          hint: 'Cümlenin yüklemi yoktur, anlatım tamamlanmamıştır (eksiltilidir).'
        }
      }
    ]
  },

  // 4. SOSYAL BİLGİLER (7. Sınıf MEBİ Yazılıya Hazırlık Hap Bilgileri)
  {
    id: 'study_7_sosyal_bilgiler_1_1_senaryo_1',
    grade: 7,
    subjectId: 'sosyal_bilgiler',
    examTerm: '1_donem_1_yazili',
    scenarioId: 'senaryo_1',
    title: '7. Sınıf Sosyal Bilgiler 1. Yazılı MEBİ Hap Bilgili Çalışma Kağıdı',
    sections: [
      {
        outcomeCode: 'SB.7.1.1',
        topicTitle: 'Etkili İletişim: Sen Dili vs Ben Dili ve Empati Kültürü',
        quickNotes: [
          'Sen Dili: Suçlayıcı, yargılayıcı ve eleştiricidir. Karşıdaki kişiyi savunmaya iter, öfke doğurur ve iletişimi koparır. ("Sen hep geç kalırsın!", "Odanı hiç toplamıyorsun!")',
          'Ben Dili: Yaşanan durumun kendi üzerimizdeki duygusal etkisini ifade eder. Karşı tarafı suçlamadan sorunun farkına varmasını sağlar. ("Geç kaldığında başına bir şey geldiğini düşünüp endişeleniyorum.", "Odan dağınık kaldığında aradığımı bulamıyorum ve huzursuz oluyorum.")',
          'Empati: Kendini karşısındakinin yerine koyarak olaylara onun bakış açısıyla bakabilme, onun hissettiği duyguyu anlayabilme becerisidir.',
          'Özel Gereksinimli Bireyler: Toplumsal yaşamda engelli bireyler için kaldırımların, parkların ve kamu binalarının erişilebilir düzenlenmesi bir lütuf değil "fırsat eşitliği" hakkıdır.'
        ],
        examTraps: [
          'TUZAK: Cümlenin sonunda "hissediyorum" veya "düşünüyorum" demek tek başına ben dili yapmaz. Cümle içinde karşıdakini aşağılayıcı kelimeler varsa sen dili olarak kalır.'
        ],
        solvedExample: {
          question: '“Sürekli geç kalmandan bıktım!” cümlesini ben diline çeviriniz.',
          analysis: 'Suçlamayı kaldırıp yaşanan durumun hissettirdiği kaygıyı belirtiniz.',
          solution: '“Buluşmaya geç kaldığında seni merak ediyorum ve kendimi değersiz hissediyorum.”'
        },
        practiceQuestion: {
          question: 'Mahalledeki oyun parklarının özel gereksinimli çocuklar için düzenlenmesini isteyen bir slogan yazınız.',
          hint: 'Olumsuzluk içermeyen, dayanışmayı ve oyun hakkını öne çıkaran bir ifade seçin (Örn: "Engelleri oyunla aşalım!").'
        }
      },
      {
        outcomeCode: 'SB.7.1.3',
        topicTitle: 'Milli Mücadele Ruhu ve Küreselleşmenin İletişime Etkisi',
        quickNotes: [
          '19 Mayıs 1919 Samsun: Mustafa Kemal Paşa, Mondros Ateşkesi sonrası Anadolu\'nun haksız işgallerine karşı milleti tek bir ülkü etrafında birleştirmek için Samsun\'a çıkmıştır.',
          'Anadolu Halkının Tutumu: Halk elindeki kıt imkânları orduyla paylaşmış, Kuva-yı Milliye ruhuyla topyekûn seferberlik başlatmıştır.',
          'Küreselleşme ve İletişim: Eskiden mektup ve telgrafla günler süren haberleşme; bugün genel ağ (internet), uydu sistemleri ve akıllı telefonlarla saniyeler içine inmiştir.'
        ],
        examTraps: [
          'PÜF NOKTA: Küreselleşmenin getirdiği hızlı iletişim, yüz yüze iletişimi zayıflatma ve sanal yalnızlık gibi olumsuz yönlere de sahiptir.'
        ],
        solvedExample: {
          question: 'Küreselleşmenin iletişim alanındaki değişimine günlük yaşamdan bir örnek veriniz.',
          analysis: 'Geçmişteki yöntem ile günümüz yöntemini karşılaştırınız.',
          solution: 'Eskiden uzaktaki bir akrabadan haber almak için haftalarca mektup beklenirdi; günümüzde ise görüntülü aramayla dünyanın öbür ucuyla anında konuşulabilmektedir.'
        },
        practiceQuestion: {
          question: 'Mustafa Kemal Paşa\'nın Samsun\'a çıkmasında etkili olan en temel tarihsel gelişme nedir?',
          hint: 'Mondros Ateşkes Antlaşması ve yurdun işgal altına girmesini düşününüz.'
        }
      }
    ]
  },

  // 5. DİN KÜLTÜRÜ VE AHLAK BİLGİSİ (7. Sınıf MEBİ Yazılıya Hazırlık Hap Bilgileri)
  {
    id: 'study_7_din_kulturu_1_1_senaryo_1',
    grade: 7,
    subjectId: 'din_kulturu',
    examTerm: '1_donem_1_yazili',
    scenarioId: 'senaryo_1',
    title: '7. Sınıf Din Kültürü ve Ahlak Bilgisi 1. Yazılı MEBİ Hap Bilgili Çalışma Kağıdı',
    sections: [
      {
        outcomeCode: 'DKAB.7.1.1',
        topicTitle: 'Varlıklar Âlemi ve Meleklerin Özellikleri ile Görevleri',
        quickNotes: [
          'Meleklerin Özellikleri: Nurdan yaratılmışlardır. İradeleri ve nefisleri yoktur; Allah\'a asla isyan etmez, emredileni harfiyen yaparlar. Yeme, içme, uyuma ve cinsiyetleri yoktur.',
          'Dört Büyük Melek:',
          '• Cebrail (as): Vahiy getirmekle görevlidir.',
          '• Azrail (as): Eceli gelenlerin canını almakla (ölüm meleği) görevlidir.',
          '• Mikâil (as): Tabiat olaylarını ve rızıkları idare etmekle görevlidir.',
          '• İsrafil (as): Kıyamet günü sûra üflemekle görevlidir.',
          'Kiramen Kâtibin: İnsanın sağında ve solunda durup iyilik ve kötülüklerini kaydeden yazıcı meleklerdir.',
          'Münker ve Nekir: Vefat eden insanları kabirde ilk hesaba çeken sorgu melekleridir.'
        ],
        examTraps: [
          'TUZAK: "Melekler de insanlar gibi sınanır ve günah işleyebilir" ifadesi KESİNLİKLE YANLIŞTIR. Meleklerin günah işleme iradesi yoktur.'
        ],
        solvedExample: {
          question: 'Kabirde insanları sorgulamakla görevli meleklerin adı nedir?',
          analysis: 'Meleklerin görev dağılımı bilgisini doğrudan kontrol eder.',
          solution: 'Münker ve Nekir melekleridir.'
        },
        practiceQuestion: {
          question: 'İnsanın yaptığı her davranışı kaydeden meleklerin varlığını bilmesi onun davranışlarını nasıl etkiler?',
          hint: 'Otokontrol, vicdan gelişimi ve gizlide dahi haksızlık yapmama bilincini açıklayınız.'
        }
      },
      {
        outcomeCode: 'DKAB.7.1.2',
        topicTitle: 'Ahiret Hayatının Aşamaları ve Nâs Suresi',
        quickNotes: [
          'Ahiret Hayatının Kronolojik Sıralaması:',
          '1. Kıyamet: Evren düzeninin yıkılması ve hayatın son bulması (İsrafil birinci kez sûra üfler).',
          '2. Baas: İsrafil\'in ikinci kez sûra üflemesiyle tüm insanların kabirlerinden yeniden diriltilmesi.',
          '3. Haşir ve Mahşer: Diriltilen insanların hesap vermek için toplanması (Haşir) ve toplanılan büyük alan (Mahşer).',
          '4. Hesap ve Amel Defteri: Kiramen Kâtibin meleklerinin kaydettiği kitabın açılması.',
          '5. Mizan: İyilik ve kötülüklerin tartıldığı ilahi adalet terazisi.',
          '6. Cennet veya Cehennem: Hesabın neticesinde varılacak ebedi mükâfat veya ceza yurdu.',
          'Nâs Suresi: İnsanın içindeki sinsi vesveselerden, kötü arkadaşlardan ve şer odaklarından korunmak için insanların Rabbi, Meliki ve İlahı olan Allah\'a sığınması gerektiğini öğütler.'
        ],
        examTraps: [
          'EN ÇOK KARIŞTIRILAN SIRALAMA: Baas (yeniden diriliş) ile Haşir (toplanma) sırasıdır. İnsanlar ÖNCE diriltilir (Baas), SONRA toplanırlar (Haşir).'
        ],
        solvedExample: {
          question: 'Zilzal suresindeki "Kim zerre ağırlığınca hayır işlerse mükafatını, kötülük işlerse cezasını görür" ayeti ahiretin hangi aşamasıyla ilgilidir?',
          analysis: 'Amellerin karşılıksız kalmadığı adalet tartısını ifade eder.',
          solution: 'İlahi adalet terazisi olan "Mizan" ve hesap aşamasıyla doğrudan ilgilidir.'
        },
        practiceQuestion: {
          question: 'Nâs suresinin mesajına uygun iki günlük hayat davranışı yazınız.',
          hint: 'Kötü arkadaşların kışkırtmalarından uzak durmak ve Allah\'a sığınmak.'
        }
      },
      {
        outcomeCode: 'DKAB.7.2.1',
        topicTitle: 'Hac ve Umre İbadetleri (Sembolik Anlamlar ve Mekânlar)',
        quickNotes: [
          'Hac İbadeti: Gücü yeten Müslümanlara ömründe bir kez farzdır. Zilhicce ayında (Kurban Bayramı günleri) Arafat vakfesi ve Kâbe tavafı yapılarak yerine getirilir.',
          'Umre İbadeti: Hac günleri dışında yılın herhangi bir vaktinde yapılabilen sünnet bir ibadettir. Arafat vakfesi, kurban ve şeytan taşlama umrede YOKTUR.',
          'Temel Kavramlar & Sembolik Anlamları:',
          '• İhram: Dünyevi makam, servet ve sınıf farklarını ortadan kaldırıp tüm insanların eşitliğini simgeleyen dikişsiz beyaz örtü.',
          '• Kâbe ve Tavaf: Kâbe\'nin etrafında 7 kez dönerek yapılan ibadettir. Kâinattaki düzen gibi Allah merkezli bir hayatı ve tevhidi simgeler.',
          '• Sa\'y: Safa ve Merve tepeleri arasında 4 gidiş 3 geliş olmak üzere 7 kez gidip gelmektir. Hz. Hacer\'in arayışını ve gayreti simgeler.',
          '• Arafat ve Vakfe: Haccın en temel farzıdır. Mahşer günündeki toplanışı ve büyük hesabı andırır.'
        ],
        examTraps: [
          'TUZAK: "Umrede de Arafat vakfesi ve kurban kesme vardır" ifadesi YANLIŞTIR. Vakfe ve kurban sadece hac ibadetine mahsustur.'
        ],
        solvedExample: {
          question: 'İhram örtüsünün tüm hacılar tarafından eşit şekilde giyilmesi hangi ahlaki ve insani ilkeyi simgeler?',
          analysis: 'İhramın sınıf, ırk ve zenginlik farklarını sıfırlama rolünü açıklar.',
          solution: 'Makam, zenginlik ve etnik ayrımların Allah katında geçersiz olduğunu; tüm insanların eşit ve tarafsız bir konumda olduğunu (tevazu ve kardeşlik) simgeler.'
        },
        practiceQuestion: {
          question: 'Hac ile umre arasındaki en temel iki farkı maddeler halinde yazınız.',
          hint: 'Hükmü (Farz/Sünnet) ve Arafat vakfesinin bulunup bulunmamasını belirtiniz.'
        }
      }
    ]
  },

  // 6. İNGİLİZCE (7. Sınıf MEBİ Yazılıya Hazırlık Hap Bilgileri)
  {
    id: 'study_7_ingilizce_1_1_senaryo_1',
    grade: 7,
    subjectId: 'ingilizce',
    examTerm: '1_donem_1_yazili',
    scenarioId: 'senaryo_1',
    title: '7th Grade English 1st Written Exam MoNE Study Guide',
    sections: [
      {
        outcomeCode: 'E7.1.R1',
        topicTitle: 'Unit 1: Appearance, Personality & Making Comparisons',
        quickNotes: [
          'Physical Appearance (Dış Görünüş): tall, short, slim, plump, blonde hair, dark hair, wavy hair, blue eyes. Soru: "What does he/she look like?"',
          'Personality (Kişilik): hardworking, punctual (dakik), outgoing (sosyal), generous (cömert), selfish (bencil), honest (dürüst), stubborn (inatçı). Soru: "What is he/she like?"',
          'Comparative Adjectives (Karşılaştırma):',
          '• Tek heceli sıfatlar: sıfat + -er than (tall -> taller than, short -> shorter than, old -> older than).',
          '• -y ile bitenler: -ier than (funny -> funnier than, easy -> easier than).',
          '• İki veya daha çok heceli sıfatlar: more + sıfat + than (more generous than, more hardworking than, more outgoing than).',
          '• Düzensizler: good -> better than | bad -> worse than | far -> farther/further than.'
        ],
        examTraps: [
          'COMMON MISTAKE 1: "He is more taller than me" YANLIŞTIR! Hem "more" hem "-er" aynı anda kullanılmaz: "He is taller than me" doğrusudur.',
          'COMMON MISTAKE 2: "more hardworking that" YANLIŞTIR! Karşılaştırma eki "than"dir.',
          'COMMON MISTAKE 3: "What does she look like?" sorusuna "She is friendly" cevabı verilmez; görünüş sorusuna "She has blonde hair" denmelidir.'
        ],
        solvedExample: {
          question: 'Sally (15 years old, 1.71 m) and Helen (17 years old, 1.65 m). Write two comparative sentences using "old" and "tall".',
          analysis: 'Helen yaşça büyük, Sally boyca uzundur.',
          solution: '1. Helen is older than Sally.\n2. Sally is taller than Helen.'
        },
        practiceQuestion: {
          question: 'Correct the mistake: "Emma is more short than Amy."',
          hint: 'Short tek hecelidir, "more" almaz.'
        }
      },
      {
        outcomeCode: 'E7.2.W1',
        topicTitle: 'Unit 2: Sports & Frequency Adverbs',
        quickNotes: [
          'Frequency Adverbs (Sıklık Dereceleri):',
          '• Always: %100 (Her zaman)',
          '• Usually: %90 (Genellikle)',
          '• Often: %70 (Sık sık)',
          '• Sometimes: %50 (Bazen)',
          '• Rarely / Seldom: %10 (Nadiren)',
          '• Never: %0 (Asla / Hiç)',
          'Cümledeki Konumu: Özneden sonra, esas fiilden ÖNCE gelir: "I usually play basketball." Ancak "am/is/are" fiilinden SONRA gelir: "He is always punctual."',
          'Sports Equipment & Rules: Football (ball, goal), Tennis (racket, ball, net), Archery (bow, arrow), Hiking (sneakers, backpack).'
        ],
        examTraps: [
          'TUZAK: "never" zaten cümleye olumsuz anlam kattığı için fiil olumsuz yapılmaz: "I don\'t never eat junk food" YANLIŞ, "I never eat junk food" DOĞRUDUR.'
        ],
        solvedExample: {
          question: '“I ............ (70%) go to the gym on weekdays.” Cümlesini doğru sıklık zarfıyla tamamlayınız.',
          analysis: '%70 sıklık derecesi "often" kelimesine karşılık gelir.',
          solution: '“I often go to the gym on weekdays.”'
        },
        practiceQuestion: {
          question: '“You need a racket and a small ball. You hit the ball over the net.” Which sport is this?',
          hint: 'Tennis.'
        }
      }
    ]
  }
];
