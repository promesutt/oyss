# -*- coding: utf-8 -*-
import json
import re

# ==============================================================================
# 1. STUDY SHEETS FOR 5, 6, 7, 8
# ==============================================================================

GRADE_5_SHEETS = [
    {
        'id': 'study_5_turkce_1_1_senaryo_1',
        'grade': 5,
        'subjectId': 'turkce',
        'examTerm': '1_donem_1_yazili',
        'scenarioId': 'senaryo_1',
        'title': '5. Sınıf Türkçe 1. Yazılı MEBİ Hap Bilgili Çalışma Kağıdı',
        'sections': [
            {
                'outcomeCode': 'T.5.1.1',
                'topicTitle': 'Sözcükte Anlam (Gerçek, Mecaz ve Terim Anlam)',
                'quickNotes': [
                    'Gerçek (Temel) Anlam: Bir kelimenin akla gelen ilk, somut ve genel anlamıdır. (Örn: "Ateş yakında elim yandı.")',
                    'Mecaz Anlam: Sözcüğün gerçek anlamından tamamen uzaklaşarak kazandığı soyut, yeni anlamdır. (Örn: "Sınavı kazanamayınca hayalleri yandı.")',
                    'Terim Anlam: Bilim, sanat, spor veya meslek dalına özgü özel kavramlardır. (Örn: açı, nota, meridyen, perde, taç).'
                ],
                'examTraps': [
                    'TUZAK: Günlük hayatta kullanılan her sözcük mecaz değildir. "Yol" kelimesi yöntem anlamında kullanılırsa ("Bu sorunu çözmenin bir yolu var") mecazdır; ancak "karayolu" gerçek anlamdır.'
                ],
                'solvedExample': {
                    'question': '"O bize her zaman çok sıcak davranırdı." ve "Sıcak çorba içimizi ısıttı." cümlelerindeki "sıcak" sözcüklerinin anlam özelliklerini açıklayınız.',
                    'analysis': 'İlk cümlede samimi ve sevgi dolu (soyut) anlam; ikinci cümlede ise ısısı yüksek (somut) anlam söz konusudur.',
                    'solution': '1. cümledeki "sıcak" sözcüğü MECAZ anlamda (samimi, dostça), 2. cümledeki "sıcak" sözcüğü GERÇEK anlamda (yüksek ısılı) kullanılmıştır.'
                },
                'practiceQuestion': {
                    'question': '"Hakem penaltı noktasını gösterdi." cümlesindeki "penaltı" sözcüğünün anlam özelliğini yazınız.',
                    'hint': 'Futbol sporuna özgü bir kavram olduğunu düşününüz (Terim anlam).'
                }
            },
            {
                'outcomeCode': 'T.5.3.1',
                'topicTitle': 'Paragrafta Ana Fikir ve Başlık İlişkisi',
                'quickNotes': [
                    'Konu: "Metinde ne anlatılıyor?" sorusunun cevabıdır (birkaç kelimeyle özetlenir).',
                    'Ana Fikir (Ana Düşünce): "Yazar bu metni hangi amaçla yazdı? Bize vermek istediği temel mesaj nedir?" sorusunun tek cümlelik cevabıdır.',
                    'Başlık: Metnin konusunu ve ana fikrini en iyi yansıtan, ilgi çekici ve kısa ifadedir.'
                ],
                'examTraps': [
                    'PÜF NOKTA: Ana fikir bir yargı bildirmeli, öğüt veya sonuç içermelidir. "Çevre kirliliği" konudur; "Gelecek nesillere yaşanabilir bir dünya bırakmak için çevremizi korumalıyız" ana fikirdir.'
                ],
                'solvedExample': {
                    'question': '"Dostluk tıpkı narin bir çiçek gibidir; ilgi, sevgi ve sabırla beslenmezse solar gider." Bu cümlenin ana fikrini yazınız.',
                    'analysis': 'Cümledeki benzetmeden yola çıkarak verilmek istenen ders bulunur.',
                    'solution': 'Dostlukların kalıcı ve güçlü olabilmesi için karşılıklı emek, ilgi ve özen gösterilmesi gerekir.'
                },
                'practiceQuestion': {
                    'question': 'Bir paragrafın konusunu bulmak için paragrafa hangi soru sorulmalıdır?',
                    'hint': '"Bu metinde neyden söz ediliyor / ne anlatılıyor?"'
                }
            }
        ]
    },
    {
        'id': 'study_5_mat_1_1_senaryo_1',
        'grade': 5,
        'subjectId': 'matematik',
        'examTerm': '1_donem_1_yazili',
        'scenarioId': 'senaryo_1',
        'title': '5. Sınıf Matematik 1. Yazılı MEBİ Hap Bilgili Çalışma Kağıdı',
        'sections': [
            {
                'outcomeCode': 'MAT.5.3.1',
                'topicTitle': 'Temel Geometrik Çizimler, Doğru, Doğru Parçası ve Işın',
                'quickNotes': [
                    'Doğru: Her iki yönden sonsuza kadar uzayan düz çizgidir [AB doğrusu veya d doğrusu]. Boyu ölçülemez.',
                    'Işın: Başlangıç noktası sabit olup tek bir yönde sonsuza uzanır [AB ışını: [AB]. Boyu ölçülemez.',
                    'Doğru Parçası: İki nokta arasında kalan sınırlı çizgidir [AB doğru parçası: [AB]]. Uzunluğu cetvelle ölçülebilir.',
                    'Paralel Doğrular: Aynı düzlemde kesişmeyen doğrulardır (d // k).'
                ],
                'examTraps': [
                    'TUZAK: Işının uzunluğu cetvelle ölçülemez! Yalnızca iki ucu da sınırlı olan doğru parçasının boyu ölçülebilir.'
                ],
                'solvedExample': {
                    'question': 'Bir el fenerinden çıkan ışık demeti ile gergin bir ip modellerinden hangisi ışın, hangisi doğru parçası modelidir?',
                    'analysis': 'Başlangıç ve bitiş noktalarının sınırlı olup olmadığı kontrol edilir.',
                    'solution': 'El feneri başlangıcı belli ve ucu sonsuza gittiği için IŞIN modelidir. Gergin ip ise iki ucundan sınırlı olduğu için DOĞRU PARÇASI modelidir.'
                },
                'practiceQuestion': {
                    'question': 'Bir cetvel üzerindeki 3 cm ile 9 cm arasındaki çizgi hangi geometrik kavrama örnektir ve uzunluğu kaç cm\'dir?',
                    'hint': 'Başlangıcı ve bitişi belirli olduğu için doğru parçasıdır; farkı hesaplayınız (6 cm).'
                }
            },
            {
                'outcomeCode': 'MAT.5.3.3',
                'topicTitle': 'Açı Çeşitleri ve İletki (Açıölçer) ile Ölçüm',
                'quickNotes': [
                    'Dar Açı: Ölçüsü 0° ile 90° arasında olan açılardır.',
                    'Dik Açı: Ölçüsü tam olarak 90° olan açıdır (∟ sembolü).',
                    'Geniş Açı: Ölçüsü 90° ile 180° arasında olan açılardır.',
                    'Doğru Açı: Ölçüsü tam olarak 180° olan açıdır.'
                ],
                'examTraps': [
                    'PÜF NOKTA: Saat 03.00\'te akrep ile yelkovan dik açı (90°) oluşturur. Saat 03.10\'da ise açı daralır ve dar açıya dönüşür.'
                ],
                'solvedExample': {
                    'question': 'Ölçüsü 89° olan açı ile 91° olan açının türlerini yazınız.',
                    'analysis': '90° referans değerine göre sınıflandırma yapılır.',
                    'solution': '89° < 90° olduğu için DAR AÇI; 91° > 90° olduğu için GENİŞ AÇI\'dır.'
                },
                'practiceQuestion': {
                    'question': 'Bir doğru açının ölçüsü dik açının ölçüsünün kaç katıdır?',
                    'hint': 'Doğru açı 180°, dik açı 90°\'dir (2 katı).'
                }
            }
        ]
    },
    {
        'id': 'study_5_fen_1_1_senaryo_1',
        'grade': 5,
        'subjectId': 'fen_bilimleri',
        'examTerm': '1_donem_1_yazili',
        'scenarioId': 'senaryo_1',
        'title': '5. Sınıf Fen Bilimleri 1. Yazılı MEBİ Hap Bilgili Çalışma Kağıdı',
        'sections': [
            {
                'outcomeCode': 'FB.5.1.1',
                'topicTitle': 'Güneş\'in Yapısı ve Dönme Hareketi',
                'quickNotes': [
                    'Güneş küresel şekle sahiptir ve orta büyüklükte sarı bir yıldızdır.',
                    'Güneş\'in yapısında yaklaşık %73 Hidrojen ve %25 Helyum gazı bulunur.',
                    'Güneş kendi ekseni etrafında batıdan doğuya (saat yönünün tersine) döner. Bunu Güneş lekelerinin kaymasından anlıyoruz (Galileo keşfetti).',
                    'Büyüklük: Güneş basketbol topu ise Dünya nohut, Ay mercimek tanesidir.'
                ],
                'examTraps': [
                    'TUZAK: "Güneş uzayda tamamen sabittir ve hiç dönmez" demek yanlıştır. Kendi ekseni etrafında dönme hareketi yapar.'
                ],
                'solvedExample': {
                    'question': 'Galileo teleskobuyla Güneş lekelerinin her gün aynı yöne doğru kaydığını görmüştür. Bu durum neyi kanıtlar?',
                    'analysis': 'Gözlemsel veriden Güneş\'in hareketine dair çıkarım yapılır.',
                    'solution': 'Güneş\'in kendi ekseni etrafında batıdan doğuya doğru dönme hareketi yaptığını kanıtlar.'
                },
                'practiceQuestion': {
                    'question': 'Güneş, Dünya ve Ay\'ı hacimsel büyüklüklerine göre büyükten küçüğe sıralayınız.',
                    'hint': 'Basketbol topu - nohut - mercimek benzetmesini hatırla.'
                }
            },
            {
                'outcomeCode': 'FB.5.1.3',
                'topicTitle': 'Ay\'ın Hareketleri ve Evreleri',
                'quickNotes': [
                    'Ay\'ın 3 Türlü Hareketi: 1) Kendi ekseni etrafında döner, 2) Dünya etrafında dolanır, 3) Dünya ile birlikte Güneş etrafında dolanır.',
                    'Neden Ay\'ın hep aynı yüzünü görürüz? Çünkü Ay\'ın kendi etrafında dönme süresi ile Dünya etrafında dolanma süresi eşittir (~27.3 gün).',
                    'Ay\'ın 4 Ana Evresi: Yeniay (Karanlık) → İlk Dördün ("D" harfi) → Dolunay (Tam daire) → Son Dördün (Ters "D"). Ana evreler arası 1 haftadır (7 gün).'
                ],
                'examTraps': [
                    'PÜF NOKTA: Yeniay evresinde Ay, Güneş ile Dünya arasındadır ve karanlık yüzü bize baktığı için Dünya\'dan görünmez.'
                ],
                'solvedExample': {
                    'question': 'Gökyüzüne bakan bir öğrenci Ay\'ı düz "D" harfi şeklinde aydınlık görmüştür. Ay hangi evrededir ve 1 hafta sonra hangi evre görülecektir?',
                    'analysis': 'Evrelerin şekilsel özellikleri ve kronolojik ardışıklığı incelenir.',
                    'solution': 'Ay "D" şeklinde göründüğünde İLK DÖRDÜN evresindedir. 1 hafta (7 gün) sonraki ana evre DOLUNAY olacaktır.'
                },
                'practiceQuestion': {
                    'question': 'Dolunay evresinden 2 hafta sonra gökyüzünde hangi ana evre görülür?',
                    'hint': 'Dolunay → (1 hafta) Son Dördün → (1 hafta) Yeniay.'
                }
            }
        ]
    },
    {
        'id': 'study_5_sosyal_bilgiler_1_1_senaryo_1',
        'grade': 5,
        'subjectId': 'sosyal_bilgiler',
        'examTerm': '1_donem_1_yazili',
        'scenarioId': 'senaryo_1',
        'title': '5. Sınıf Sosyal Bilgiler 1. Yazılı MEBİ Hap Bilgili Çalışma Kağıdı',
        'sections': [
            {
                'outcomeCode': 'SB.5.1.1',
                'topicTitle': 'Birlikte Yaşamak: Gruplar, Roller ve Sorumluluklar',
                'quickNotes': [
                    'Grup: Ortak bir amaç için bir araya gelen en az iki kişiden oluşan topluluktur (aile, okul takımı, izci kulübü).',
                    'Rol: Bir grup içinde üstlendiğimiz görev ve sorumluluklardır (evlat, öğrenci, kaleci, kulüp başkanı).',
                    'Aynı anda birden fazla gruba üye olabilir ve birden fazla role sahip olabiliriz.',
                    'Hak: Kanunların ve toplum kurallarının bireye tanıdığı yetkilerdir. Sorumluluk: Bireyin kendi davranışlarının sonuçlarını üstlenmesidir.'
                ],
                'examTraps': [
                    'TUZAK: Kalabalık ile grup aynı şey değildir. Otobüs durağında bekleyen insanlar kalabalıktır (ortak amaç ve iş birliği yoktur); okul korosu ise bir gruptur.'
                ],
                'solvedExample': {
                    'question': 'Ahmet okulda 5-B sınıfı öğrencisi, evde ağabey, futbol takımında ise kaptandır. Bu durum bireylerin rolleri hakkında neyi gösterir?',
                    'analysis': 'Bireyin farklı sosyal ortamlardaki çeşitlenen rolleri incelenir.',
                    'solution': 'Bir bireyin aynı anda farklı gruplar içerisinde birden fazla role sahip olabileceğini ve bu rollerin sorumluluklarının farklı olduğunu gösterir.'
                },
                'practiceQuestion': {
                    'question': 'Okul kütüphanesinden yararlanmak bir "hak" mıdır yoksa "sorumluluk" mudur? Kütüphanede sessiz olmak nedir?',
                    'hint': 'Yararlanmak HAK, sessiz olmak SORUMLULUKTUR.'
                }
            },
            {
                'outcomeCode': 'SB.5.2.1',
                'topicTitle': 'Kültürel Zenginliklerimiz ve Birlikte Yaşama Kültürü',
                'quickNotes': [
                    'Maddi Kültür Ögeleri: Tarihî yapılar, köprüler, camiler, geleneksel kıyafetler, yemekler.',
                    'Manevi Kültür Ögeleri: Dil, din, ahlak kuralları, bayramlar, misafirperverlik, türküler, masallar.',
                    'Kültürel Çeşitlilik: Farklı bölgelerin halk oyunları (Horon, Zeybek, Halay) birer zenginlik kaynağıdır ve birlik duygusunu pekiştirir.'
                ],
                'examTraps': [
                    'PÜF NOKTA: Kültürel farklılıklar bir ayrışma sebebi değil, toplumsal kaynaşmayı ve hoşgörüyü güçlendiren birer zenginliktir.'
                ],
                'solvedExample': {
                    'question': 'Karadeniz\'de Horon, Ege\'de Zeybek, Doğu Anadolu\'da Halay oynanması kültürümüzün hangi özelliğini yansıtır?',
                    'analysis': 'Bölgesel halk oyunlarının zenginliği açıklanır.',
                    'solution': 'Ülkemizin zengin bir kültürel çeşitliliğe sahip olduğunu ve bu çeşitliliğin millî birlik ve beraberliğimizi güçlendirdiğini gösterir.'
                },
                'practiceQuestion': {
                    'question': 'Düğünlerde yardımlaşma geleneği (imece) hangi manevi değerimize örnektir?',
                    'hint': 'Dayanışma ve birliktelik.'
                }
            }
        ]
    },
    {
        'id': 'study_5_din_kulturu_1_1_senaryo_1',
        'grade': 5,
        'subjectId': 'din_kulturu',
        'examTerm': '1_donem_1_yazili',
        'scenarioId': 'senaryo_1',
        'title': '5. Sınıf Din Kültürü ve Ahlak Bilgisi 1. Yazılı MEBİ Hap Bilgili Çalışma Kağıdı',
        'sections': [
            {
                'outcomeCode': 'DKAB.5.1.1',
                'topicTitle': 'Allah İnancı ve Evrendeki Mükemmel Düzen',
                'quickNotes': [
                    'Tevhid İnancı: Allah\'ın bir ve tek olduğuna, eşi ve benzeri bulunmadığına inanmaktır.',
                    'Evrendeki Düzen: Gece ile gündüzün birbirini izlemesi, mevsimlerin oluşumu, su döngüsü ve gezegenlerin yörüngeleri bir Yaratıcı\'nın varlığını ve gücünü gösterir.',
                    'Kur\'an Ayeti: "O, geceyi, gündüzü, güneşi ve ayı yaratandır. Her biri bir yörüngede yüzmektedir." (Enbiyâ, 33).'
                ],
                'examTraps': [
                    'TUZAK: Evrendeki nizamın kendiliğinden veya tesadüfen oluştuğunu düşünmek yanlıştır; her düzenli sistem bir kurucuyu gösterir.'
                ],
                'solvedExample': {
                    'question': 'Kelimelerin rastgele savrulmasıyla anlamlı bir roman yazılamayacağı gibi, evrendeki atomların da tesadüfen bir araya gelerek kusursuz bir düzen oluşturamayacağı argümanı neyi kanıtlar?',
                    'analysis': 'Gaye ve nizam delilinden yola çıkılarak Yaratıcı\'nın varlığı temellendirilir.',
                    'solution': 'Evrendeki her şeyin sonsuz bir ilim, irade ve kudret sahibi olan Allah tarafından yaratıldığını ve düzenlendiğini kanıtlar.'
                },
                'practiceQuestion': {
                    'question': 'Allah\'ın her şeyi işitmesi sıfatına ne ad verilir?',
                    'hint': 'Semi (işitme), Basar (görme), İlim (bilme).'
                }
            },
            {
                'outcomeCode': 'DKAB.5.1.3',
                'topicTitle': 'İhlas Suresi ve Anlamı',
                'quickNotes': [
                    'İhlas Suresi, Tevhid inancını en öz ve en açık biçimde özetleyen suredir.',
                    '"Kul hüvellâhü ehad" (De ki: O Allah tektir).',
                    '"Allâhüs-samed" (Allah sameddir; hiçbir şeye muhtaç değildir, her şey O\'na muhtaçtır).',
                    '"Lem yelid ve lem yûled" (O doğurmamış ve doğmamıştır).',
                    '"Ve lem yekün lehû küfüven ehad" (O\'nun hiçbir dengi ve benzeri yoktur).'
                ],
                'examTraps': [
                    'PÜF NOKTA: "Samed" kavramı MEB sınavlarında çok sık sorulur: Hiçbir varlığa muhtaç olmayan, aksine tüm varlıkların var olmak için muhtaç olduğu yüce zattır.'
                ],
                'solvedExample': {
                    'question': 'İhlas Suresi\'nde geçen "Samed" ne anlama gelir?',
                    'analysis': 'Ayet kavramının terimsel karşılığı açıklanır.',
                    'solution': 'Allah\'ın hiçbir şeye ihtiyacının olmaması, her şeyin ve herkesin O\'na muhtaç olması anlamına gelir.'
                },
                'practiceQuestion': {
                    'question': 'İhlas Suresi\'nin temel konusu nedir?',
                    'hint': 'Tevhid (Allah\'ın birliği).'
                }
            }
        ]
    },
    {
        'id': 'study_5_ingilizce_1_1_senaryo_1',
        'grade': 5,
        'subjectId': 'ingilizce',
        'examTerm': '1_donem_1_yazili',
        'scenarioId': 'senaryo_1',
        'title': '5. Sınıf İngilizce 1. Yazılı MEBİ Hap Bilgili Çalışma Kağıdı',
        'sections': [
            {
                'outcomeCode': 'E5.1.L1',
                'topicTitle': 'Unit 1: Hello! - Countries, Nationalities & Languages',
                'quickNotes': [
                    'Country (Ülke): Turkey, England, Germany, France, Italy, Spain, Japan.',
                    'Nationality (Milliyet): Turkish, English, German, French, Italian, Spanish, Japanese.',
                    'Language (Dil): Turkish, English, German, French, Italian, Spanish, Japanese.',
                    'Soru Kalıpları: "Where are you from?" -> "I am from Turkey." | "What nationality are you?" -> "I am Turkish." | "How many languages do you speak?" -> "I speak two languages."'
                ],
                'examTraps': [
                    'TUZAK: "Where are you from?" sorusuna "I am Turkish" DENMEZ! Ülke adı söylenir: "I am from Turkey." Milliyet sorusu "What nationality are you?"dur.'
                ],
                'solvedExample': {
                    'question': 'A: Where is Pierre from?\nB: He is from France.\nA: What nationality is he?\nB: .......................................\nBoşluğu doldurunuz.',
                    'analysis': 'Fransa ülkesine ait milliyet karşılığı yazılır.',
                    'solution': 'He is French.'
                },
                'practiceQuestion': {
                    'question': 'Match: "Germany" -> Nationality: ?',
                    'hint': 'German.'
                }
            },
            {
                'outcomeCode': 'E5.2.R1',
                'topicTitle': 'Unit 2: My Town - Prepositions & Giving Directions',
                'quickNotes': [
                    'Prepositions of Place (Yer-Yön Edatları):',
                    '• Next to: Yanında | Between: Arasında (iki şeyin) | Opposite: Karşısında | Behind: Arkasında | In front of: Önünde.',
                    'Giving Directions (Yol Tarifi):',
                    '• Go straight ahead: Düz git.',
                    '• Turn left: Sola dön | Turn right: Sağa dön.',
                    '• Take the first/second turning on the right/left: Sağdan/soldan birinci/ikinci yola gir.'
                ],
                'examTraps': [
                    'PÜF NOKTA: "between" edatı daima iki varlık gerektirir: "The bakery is between the bank and the pharmacy."'
                ],
                'solvedExample': {
                    'question': 'The library is ................ the museum and the hospital. (Kütüphane müze ile hastanenin arasındadır)',
                    'analysis': 'İki yerin arasında olma durumu ifade edilir.',
                    'solution': 'between'
                },
                'practiceQuestion': {
                    'question': 'How do you say "Düz git ve sağa dön" in English?',
                    'hint': 'Go straight ahead and turn right.'
                }
            }
        ]
    }
]

# ==============================================================================
# 2. STUDY SHEETS FOR 6TH GRADE
# ==============================================================================

GRADE_6_SHEETS = [
    {
        'id': 'study_6_turkce_1_1_senaryo_1',
        'grade': 6,
        'subjectId': 'turkce',
        'examTerm': '1_donem_1_yazili',
        'scenarioId': 'senaryo_1',
        'title': '6. Sınıf Türkçe 1. Yazılı MEBİ Hap Bilgili Çalışma Kağıdı',
        'sections': [
            {
                'outcomeCode': 'T.6.1.1',
                'topicTitle': 'Cümlede Anlam İlişkileri (Neden-Sonuç, Amaç-Sonuç, Koşul-Sonuç)',
                'quickNotes': [
                    'Neden-Sonuç (Sebep-Sonuç): Eylemin gerçekleşme gerekçesidir. "Hangi nedenle / neden?" sorusuna yanıt verir. (-dığı için, -den dolayı). Olay gerçekleşmiştir.',
                    'Amaç-Sonuç: Eylemin hangi hedef doğrultusunda yapıldığını bildirir. "Hangi amaçla?" sorusuna yanıt verir. (-mek için, -mek amacıyla). Hedef henüz kesinleşmemiştir.',
                    'Koşul-Sonuç (Şart-Sonuç): Bir eylemin gerçekleşmesinin başka bir duruma bağlı olmasıdır (-se / -sa, şartıyla).'
                ],
                'examTraps': [
                    'ALTIN FORMÜL: "-mek amacıyla" ifadesini cümlenin yerine koyduğunuzda anlamlı oluyorsa AMAÇ-SONUÇ, anlam bozuluyor ve "-den dolayı" uyuyorsa NEDEN-SONUÇ cümlesidir!'
                ],
                'solvedExample': {
                    'question': '1. "Yağmur yağdığı için maç iptal edildi."\n2. "Maçı izlemek için stada gitti."\nCümlelerinin anlam ilişkilerini belirleyiniz.',
                    'analysis': 'Altın formül uygulanır: 1. Yağmur yağmasından dolayı (Neden), 2. Maçı izlemek amacıyla (Amaç).',
                    'solution': '1. cümle NEDEN-SONUÇ (Sebep-Sonuç), 2. cümle AMAÇ-SONUÇ cümlesidir.'
                },
                'practiceQuestion': {
                    'question': '"Düzenli kitap okursan kelime dağarcığın gelişir." cümlesinin anlam ilişkisi nedir?',
                    'hint': 'Koşul (Şart) - Sonuç.'
                }
            },
            {
                'outcomeCode': 'T.6.4.2',
                'topicTitle': 'İsim Tamlamaları (Belirtili, Belirtisiz, Zincirleme)',
                'quickNotes': [
                    'Belirtili İsim Tamlaması: Hem tamlayan (-ın, -in, -un, -ün) hem de tamlanan (-ı, -i, -u, -ü, -sı, -si) ek alır. (Örn: kapı-nın kol-u, okul-un bahçe-si).',
                    'Belirtisiz İsim Tamlaması: Tamlayan ek ALMAZ, sadece tamlanan ek alır. (Örn: kapı kol-u, Türkçe defter-i).',
                    'Zincirleme İsim Tamlaması: En az üç ismin birbirine bağlanmasıyla oluşan tamlamadır. (Örn: okul kapısı-nın anahtar-ı).'
                ],
                'examTraps': [
                    'TUZAK: Sıfat tamlamalarıyla isim tamlamalarını karıştırmayın! "Güzel çocuk" sıfat tamlamasıdır ("Nasıl çocuk?"), "Çocuk odası" ise belirtisiz isim tamlamasıdır ("Neyin/ne odası?").'
                ],
                'solvedExample': {
                    'question': '"Evin balkon kapısı rüzgârdan açıldı." cümlesindeki isim tamlamasını bulup türünü yazınız.',
                    'analysis': 'Ev + balkon + kapı olmak üzere 3 isim birbirine bağlanmıştır.',
                    'solution': '"Evin balkon kapısı" bir ZİNCİRLEME İSİM TAMLAMASI\'dır.'
                },
                'practiceQuestion': {
                    'question': '"Güneş gözlüğü" hangi tür tamlamadır?',
                    'hint': 'Tamlayan ek almamış, tamlanan almış: Belirtisiz İsim Tamlaması.'
                }
            }
        ]
    },
    {
        'id': 'study_6_mat_1_1_senaryo_1',
        'grade': 6,
        'subjectId': 'matematik',
        'examTerm': '1_donem_1_yazili',
        'scenarioId': 'senaryo_1',
        'title': '6. Sınıf Matematik 1. Yazılı MEBİ Hap Bilgili Çalışma Kağıdı',
        'sections': [
            {
                'outcomeCode': 'MAT.6.1.1',
                'topicTitle': 'Bir Doğal Sayının Çarpanları ve Katları',
                'quickNotes': [
                    'Bir doğal sayının çarpanı aynı zamanda o sayının kalansız BÖLENİDİR.',
                    'Gökkuşağı Yöntemi: 24\'ün çarpanları: 1×24, 2×12, 3×8, 4×6 -> {1, 2, 3, 4, 6, 8, 12, 24}. Toplam 8 tanedir.',
                    'Asal Sayı: Sadece 1\'e ve kendisine bölünebilen 1\'den büyük doğal sayılardır: 2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31...',
                    'En küçük asal sayı 2\'dir. 2\'den başka ÇİFT asal sayı YOKTUR!'
                ],
                'examTraps': [
                    'TUZAK: "1 asal sayıdır" ifadesi YANLIŞTIR! Asal sayılar 2\'den başlar. Ayrıca tüm tek sayılar asal değildir (örneğin 9, 15, 21 asal değildir çünkü 3\'e bölünür).'
                ],
                'solvedExample': {
                    'question': '36 sayısının tüm pozitif çarpanlarını küçükten büyüğe yazıp kaç tanesinin asal sayı olduğunu bulunuz.',
                    'analysis': 'Çarpan listesi çıkarılır ve asal olanlar ayıklanır.',
                    'solution': '36\'nın çarpanları: 1, 2, 3, 4, 6, 9, 12, 18, 36 (9 tane). Bunlardan asal olanlar yalnızca 2 ve 3\'tür (2 tanesi asaldır).'
                },
                'practiceQuestion': {
                    'question': 'Alanı 40 cm² olan bir dikdörtgenin kenar uzunlukları tam sayı ise çevre uzunluğunun alabileceği en küçük değer kaçtır?',
                    'hint': 'Birbirine en yakın çarpanları (5 ve 8) seçerek çevreyi hesaplayınız: 2 × (5 + 8) = 26 cm.'
                }
            },
            {
                'outcomeCode': 'MAT.6.1.2',
                'topicTitle': 'Bölünebilme Kuralları (2, 3, 4, 5, 6, 9, 10)',
                'quickNotes': [
                    '2 ile Bölünme: Son basamağı çift rakam (0, 2, 4, 6, 8) olan sayılar bölünür.',
                    '3 ile Bölünme: Rakamları toplamı 3 veya 3\'ün katı olan sayılar bölünür.',
                    '4 ile Bölünme: Son iki basamağı 00 veya 4\'ün katı olan sayılar bölünür.',
                    '5 ile Bölünme: Son basamağı 0 veya 5 olan sayılar bölünür.',
                    '6 ile Bölünme: Hem 2\'ye hem de 3\'e aynı anda bölünebilen sayılar bölünür.',
                    '9 ile Bölünme: Rakamları toplamı 9 veya 9\'un katı olan sayılar bölünür.',
                    '10 ile Bölünme: Son basamağı 0 olan sayılar bölünür.'
                ],
                'examTraps': [
                    'PÜF NOKTA: Rakamları toplamı kuralı SADECE 3 ve 9 için geçerlidir! 4 ve 6 için rakamları toplamına bakılmaz.'
                ],
                'solvedExample': {
                    'question': 'Dört basamaklı 5A72 sayısı 9 ile kalansız bölünebildiğine göre A yerine yazılması gereken rakamı bulunuz.',
                    'analysis': 'Rakamlar toplamının 9\'un katı olma şartı uygulanır.',
                    'solution': '5 + A + 7 + 2 = 14 + A. 14\'ten büyük en küçük 9\'un katı 18\'dir. 14 + A = 18 ise A = 4 bulunur.'
                },
                'practiceQuestion': {
                    'question': 'Üç basamaklı 48B sayısı hem 2 hem de 5 ile kalansız bölünebildiğine göre B rakamı kaçtır?',
                    'hint': 'Hem 2 hem 5\'e bölünmenin tek şartı son basamağın 0 olmasıdır.'
                }
            }
        ]
    },
    {
        'id': 'study_6_fen_1_1_senaryo_1',
        'grade': 6,
        'subjectId': 'fen_bilimleri',
        'examTerm': '1_donem_1_yazili',
        'scenarioId': 'senaryo_1',
        'title': '6. Sınıf Fen Bilimleri 1. Yazılı MEBİ Hap Bilgili Çalışma Kağıdı',
        'sections': [
            {
                'outcomeCode': 'FB.6.1.1',
                'topicTitle': 'Güneş Sistemi: Gezegenlerin Sınıflandırılması',
                'quickNotes': [
                    'Güneş\'e Yakınlık Sıralaması: Merkür - Venüs - Dünya - Mars - Jüpiter - Satürn - Uranüs - Neptün (Kodlama: Meraklı Vedat Dünkü Maçta Jale\'ye Sordu: Umut Nerede?).',
                    'İç (Karasal) Gezegenler: Merkür, Venüs, Dünya, Mars. Yüzeyleri katı taş ve kayalardan oluşur. Halkaları yoktur, uyduları azdır veya yoktur.',
                    'Dış (Gazsal) Gezegenler: Jüpiter, Satürn, Uranüs, Neptün. Gaz tabakalarından oluşur, devasa kütlelidirler, hepsinin halkası ve çok sayıda uydusu vardır.',
                    'Asteroit Kuşağı: Mars ile Jüpiter yörüngeleri arasında bulunur; iç ve dış gezegenleri birbirinden ayırır.',
                    'En büyük gezegen Jüpiter, en küçük gezegen Merkür\'dür. En sıcak gezegen sera etkisinden dolayı Venüs\'tür.'
                ],
                'examTraps': [
                    'TUZAK: Güneş\'e en yakın Merkür olmasına rağmen Güneş sisteminin EN SICAK gezegeni VENÜS\'tür! Çünkü Venüs\'ün kalın karbondioksit atmosferi yoğun bir sera etkisi yaratır.'
                ],
                'solvedExample': {
                    'question': 'Karasal (iç) gezegenler ile gazsal (dış) gezegenleri 2 temel özellik açısından karşılaştırınız.',
                    'analysis': 'Yüzey yapıları ve halka/uydu varlıkları kıyaslanır.',
                    'solution': '1) Karasal gezegenlerin yüzeyi katı kayaçlardan oluşurken gazsal gezegenler yoğun gaz tabakalarından oluşur. 2) Gazsal gezegenlerin hepsinin halkası varken, karasal gezegenlerin hiçbirinde halka bulunmaz.'
                },
                'practiceQuestion': {
                    'question': 'Asteroit kuşağı Güneş sisteminde hangi iki gezegenin yörüngeleri arasında yer alır?',
                    'hint': 'İç gezegenlerin sonuncusu ile dış gezegenlerin ilki: Mars ve Jüpiter.'
                }
            },
            {
                'outcomeCode': 'FB.6.1.2',
                'topicTitle': 'Güneş ve Ay Tutulmaları',
                'quickNotes': [
                    'Güneş Tutulması: Ay, Güneş ile Dünya arasına girer (G - A - D). Ay YENİAY evresindedir. Gündüz vakti yaşanır, dar bir alanda gözlenir. Çıplak gözle izlenmesi göze zarar verir.',
                    'Ay Tutulması: Dünya, Güneş ile Ay arasına girer (G - D - A). Ay DOLUNAY evresindedir. Gece vakti yaşanır, Dünya\'nın geceyi yaşayan tüm yüzeyinden çıplak gözle izlenebilir.',
                    'Her ay tutulma neden olmaz? Çünkü Ay\'ın dolanma yörünge düzlemi ile Dünya\'nın yörünge düzlemi arasında yaklaşık 5 derecelik bir açı eğikliği vardır.'
                ],
                'examTraps': [
                    'PÜF NOKTA: Güneş tutulmasında Ay Yeniay, Ay tutulmasında Ay Dolunay evresindedir. Ancak her Yeniay ve Dolunayda tutulma gerçekleşmez.'
                ],
                'solvedExample': {
                    'question': 'Güneş tutulması esnasında gök cisimlerinin sıralamasını çiziniz veya yazınız.',
                    'analysis': 'Tutulmada araya giren gök cismi tespit edilir.',
                    'solution': 'Güneş — Ay — Dünya şeklindedir (Ay ortadadır ve gölgesi Dünya üzerine düşer).'
                },
                'practiceQuestion': {
                    'question': 'Ay tutulmasını izlerken özel filtreli koruyucu gözlük takmak gerekir mi? Neden?',
                    'hint': 'Gerektirmez çünkü yansıyan ışıktır ve göze zarar vermez.'
                }
            }
        ]
    },
    {
        'id': 'study_6_sosyal_bilgiler_1_1_senaryo_1',
        'grade': 6,
        'subjectId': 'sosyal_bilgiler',
        'examTerm': '1_donem_1_yazili',
        'scenarioId': 'senaryo_1',
        'title': '6. Sınıf Sosyal Bilgiler 1. Yazılı MEBİ Hap Bilgili Çalışma Kağıdı',
        'sections': [
            {
                'outcomeCode': 'SB.6.1.1',
                'topicTitle': 'Sosyal Rollerimiz ve Değişim Süreci',
                'quickNotes': [
                    'Doğuştan Sahip Olunan Roller: Çaba harcamadan elde edilen rollerdir (evlat, kardeş, torun).',
                    'Sonradan Kazanılan Roller: Bireyin kendi isteği, emeği ve başarısıyla elde ettiği rollerdir (öğrenci, doktor, takım kaptanı, kulüp başkanı).',
                    'Rollerin Değişimi: Yaşımız ilerledikçe rollerimiz ve bu rollerin gerektirdiği sorumluluklar artar veya değişir.'
                ],
                'examTraps': [
                    'TUZAK: "Öğrenci olmak doğuştan kazanılan bir roldür" ifadesi yanlıştır; eğitim kurumuna kayıt yaptırılarak sonradan kazanılır.'
                ],
                'solvedExample': {
                    'question': 'Bireyin sahip olduğu rollerden iki tanesini doğuştan ve sonradan kazanılan olarak sınıflandırınız.',
                    'analysis': 'Emek ve irade unsuru göz önüne alınır.',
                    'solution': 'Doğuştan kazanılan: Evlat/kardeş rolü. Sonradan kazanılan: Sınıf başkanı/doktor rolü.'
                },
                'practiceQuestion': {
                    'question': 'Bir hakem maç esnasında rolünün gereğini yerine getirmezse hangi toplumsal sorun doğar?',
                    'hint': 'Adaletsizlik ve güven kaybı.'
                }
            },
            {
                'outcomeCode': 'SB.6.1.2',
                'topicTitle': 'Ön Yargılar ve Kalıp Yargılarla Mücadele',
                'quickNotes': [
                    'Ön Yargı: Bir kimse veya bir durum hakkında önceden edinilmiş olumlu veya olumsuz peşin hükümdür.',
                    'Kalıp Yargı: Bir grubun tüm üyelerine genellenen değişmez inanışlardır (örn: "Gözlüklüler çok çalışkandır").',
                    'Ön yargının sonuçları: Toplumsal ayrışma, iletişim çatışması, empati eksikliği ve adaletsizlik.',
                    'Ön yargıyı kırmanın yolları: Empati kurmak, insanları tanımaya çalışmak, farklılıklara saygı duymak.'
                ],
                'examTraps': [
                    'PÜF NOKTA: Kalıp yargılar sadece olumsuz olmaz; "tüm kadınlar şefkatlidir" veya "tüm Japonlar disiplinlidir" gibi genellemeler de birer kalıp yargıdır.'
                ],
                'solvedExample': {
                    'question': '"Gözlüklü insanlar zekidir" ifadesi bir ön yargı mıdır yoksa kalıp yargı mıdır? Neden?',
                    'analysis': 'Belli bir özelliğe sahip grubun tamamına yapılan genelleme incelenir.',
                    'solution': 'Kalıp yargıdır; çünkü bir gruba ait özellik tüm bireylere genellenmiştir.'
                },
                'practiceQuestion': {
                    'question': 'Ön yargıları yıkmak için en etkili iletişim becerisi nedir?',
                    'hint': 'Empati (kendini başkasının yerine koyma).'
                }
            }
        ]
    },
    {
        'id': 'study_6_din_kulturu_1_1_senaryo_1',
        'grade': 6,
        'subjectId': 'din_kulturu',
        'examTerm': '1_donem_1_yazili',
        'scenarioId': 'senaryo_1',
        'title': '6. Sınıf Din Kültürü ve Ahlak Bilgisi 1. Yazılı MEBİ Hap Bilgili Çalışma Kağıdı',
        'sections': [
            {
                'outcomeCode': 'DKAB.6.1.1',
                'topicTitle': 'Peygamber ve İlahi Kitap İnancı',
                'quickNotes': [
                    'Nübüvvet ve Risalet: Peygamberlik makamıdır.',
                    'Resul: Kendisine yeni bir kitap ve yeni bir şeriat (hükümler) gönderilen peygamberlerdir (Hz. Musa, Hz. İsa, Hz. Muhammed).',
                    'Nebi: Kendisine yeni bir kitap verilmeyip kendinden önceki peygamberin tebliğ ettiği dini insanlara anlatan peygamberlerdir (Hz. Harun). Her resul aynı zamanda nebidir, fakat her nebi resul değildir.',
                    'Dört Büyük İlahi Kitap: Tevrat (Hz. Musa), Zebur (Hz. Davud), İncil (Hz. İsa), Kur\'an-ı Kerim (Hz. Muhammed).'
                ],
                'examTraps': [
                    'TUZAK: Resul ile Nebi arasındaki farkı karıştırmayın: Resul\'e yeni bir kitap indirilmiştir, Nebi ise mevcut kitabı tebliğ eder.'
                ],
                'solvedExample': {
                    'question': 'Resul ve Nebi kavramları arasındaki temel farkı tek cümleyle açıklayınız.',
                    'analysis': 'İlahi kitap gönderilme durumu üzerinden ayrım yapılır.',
                    'solution': 'Resul kendisine yeni bir ilahi kitap indirilen peygamber iken; nebi kendisine müstakil bir kitap verilmeyip önceki peygamberin dinini tebliğ eden peygamberdir.'
                },
                'practiceQuestion': {
                    'question': 'Zebur hangi peygambere indirilmiştir?',
                    'hint': 'Hz. Davud.'
                }
            },
            {
                'outcomeCode': 'DKAB.6.1.2',
                'topicTitle': 'Peygamberlerin 5 Temel Niteliği (Sıfatları)',
                'quickNotes': [
                    '1. Sıdk: Doğruluk ve dürüstlük (Asla yalan söylemezler).',
                    '2. Emanet: Güvenilir olmak (Kendilerine verilen her şeye sahip çıkarlar; Muhammedü\'l-Emin).',
                    '3. İsmet: Günah işlememek, masum ve temiz olmak.',
                    '4. Fetanet: Üstün akıl ve zekâ sahibi olmak.',
                    '5. Tebliğ: Allah\'tan aldıkları vahiyleri eksiksiz ve olduğu gibi insanlara ulaştırmak.'
                ],
                'examTraps': [
                    'PÜF NOKTA: MEB sınavlarında sıfatların eşleştirmesi sık sorulur: Güvenilirlik -> Emanet, Zeka -> Fetanet, Doğruluk -> Sıdk.'
                ],
                'solvedExample': {
                    'question': 'Mekkelilerin henüz Müslüman olmadan önce bile Hz. Muhammed\'e "el-Emin" demeleri peygamberimizin hangi sıfatıyla doğrudan ilişkilidir?',
                    'analysis': 'el-Emin güvenilir anlamına gelir.',
                    'solution': 'Peygamberlerin EMANET (güvenilirlik) sıfatıyla doğrudan ilişkilidir.'
                },
                'practiceQuestion': {
                    'question': 'Peygamberlerin üstün zekâ ve akıl sahibi olmaları hangi sıfattır?',
                    'hint': 'Fetanet.'
                }
            }
        ]
    },
    {
        'id': 'study_6_ingilizce_1_1_senaryo_1',
        'grade': 6,
        'subjectId': 'ingilizce',
        'examTerm': '1_donem_1_yazili',
        'scenarioId': 'senaryo_1',
        'title': '6. Sınıf İngilizce 1. Yazılı MEBİ Hap Bilgili Çalışma Kağıdı',
        'sections': [
            {
                'outcomeCode': 'E6.1.R1',
                'topicTitle': 'Unit 1: Life - Daily Routines & Telling the Time',
                'quickNotes': [
                    'Daily Routines (Günlük Aktiviteler): wake up, wash hands and face, have breakfast, brush teeth, attend classes, run errands, do homework, sleep.',
                    'Telling the Time (Saatler):',
                    '• It is 08.00 -> It is eight o\'clock.',
                    '• It is 08.15 -> It is quarter past eight.',
                    '• It is 08.30 -> It is half past eight.',
                    '• It is 08.45 -> It is quarter to nine (DOKUZA ÇEYREK VAR!).',
                    'Simple Present Tense 3rd person singular: He/She/It fiile -s, -es, -ies alır! (He wakes up, She goes).'
                ],
                'examTraps': [
                    'TUZAK: 08.45 saatinde "quarter to eight" DENMEZ! Bir sonraki saate geçildiği için "quarter to NINE" denir.'
                ],
                'solvedExample': {
                    'question': 'Write the time in words: "07.30" and "09.45".',
                    'analysis': 'Half past ve quarter to kuralları uygulanır.',
                    'solution': '07.30: It is half past seven.\n09.45: It is quarter to ten.'
                },
                'practiceQuestion': {
                    'question': 'Correct the sentence: "Tolga play football after school."',
                    'hint': 'Özne tekil (Tolga) olduğu için fiile -s takısı gelir: "plays".'
                }
            },
            {
                'outcomeCode': 'E6.2.W1',
                'topicTitle': 'Unit 2: Yummy Breakfast - Food & Expressing Preferences',
                'quickNotes': [
                    'Breakfast Foods: cheese, olives, honey, butter, egg, bagel (simit), croissant, cereal, sausage, milk, tea, coffee.',
                    'Expressing Likes/Dislikes: like / enjoy / love (+), dislike / hate (-).',
                    'Offering Food: "Do you want some cheese?" -> "Yes, please." / "No, thanks, I don\'t like cheese."',
                    'Nutritious vs. Junk Food: Vegetables and eggs are healthy/nutritious; sausages and chips are junk/unhealthy.'
                ],
                'examTraps': [
                    'PÜF NOKTA: "I like tea, but I hate coffee." Cümlesinde iki zıt fikir "but" bağlacı ile bağlanır.'
                ],
                'solvedExample': {
                    'question': 'A: Do you want some olives?\nB: No, thanks. I ................... (hate) them.',
                    'analysis': 'Olumsuz tercih ve hate fiili.',
                    'solution': 'hate'
                },
                'practiceQuestion': {
                    'question': 'What is the Turkish meaning of "nutritious"?',
                    'hint': 'Besleyici / yararlı.'
                }
            }
        ]
    }
]

# ==============================================================================
# 3. STUDY SHEETS FOR 8TH GRADE (LGS FOCUSED)
# ==============================================================================

GRADE_8_SHEETS = [
    {
        'id': 'study_8_turkce_1_1_senaryo_1',
        'grade': 8,
        'subjectId': 'turkce',
        'examTerm': '1_donem_1_yazili',
        'scenarioId': 'senaryo_1',
        'title': '8. Sınıf Türkçe 1. Yazılı / LGS Odaklı Çalışma Kağıdı (Fiilimsiler & Cümlenin Ögeleri)',
        'sections': [
            {
                'outcomeCode': 'T.8.1.1',
                'topicTitle': 'Fiilimsiler (Eylemsiler): İsim-Fiil, Sıfat-Fiil, Zarf-Fiil',
                'quickNotes': [
                    'Fiilimsiler fiil kök veya gövdelerine gelen özel eklerle türetilir. Kip ve kişi eki ALMAZLAR, cümlede isim, sıfat ve zarf görevi yaparlar. Olumsuzu "-me/-ma" ile yapılabilir.',
                    '1. İsim-Fiil (M-A-Y-I-Ş-M-A-K): -ma, -me, -ış, -iş, -uş, -üş, -mak, -mek. (Örn: "Kitap okumayı çok seviyorum.")',
                    '2. Sıfat-Fiil (A-N-A-S-I-M-E-Z-A-R-D-İ-K-E-C-E-K-M-İ-Ş): -an, -ası, -mez, -ar, -dik, -ecek, -miş. İsmin önüne gelip onu niteler. (Örn: "Kırılan bardakları topladı.")',
                    '3. Zarf-Fiil (Kenyalı Asiye İnce İpini Araklamadan...): -ken, -alı, -asıya, -e...-e, -ince, -ip, -arak, -dıkça, -maden, -meksizin, -r...-mez, -casına. Fiili durum veya zaman bakımından niteler.'
                ],
                'examTraps': [
                    'KALICI İSİM TUZAĞI: Fiilimsi ekini alıp zamanla bir nesnenin/kavramın kalıcı adı olan sözcükler fiilimsi SAYILMAZ! Örnek: dondurma, dolma, sarma, kazma, çakmak, ekmek, danışma, giriş, çıkış.',
                    'KİP EKİ İLE SIFAT-FİİL KARIŞTIRMA TUZAĞI: "Gelecek günleri umutla bekliyor." cümlesindeki "gelecek" sıfat-fiildir. "Yarın bize gelecek." cümlesindeki "gelecek" ise yüklemdir (gelecek zaman kipi).'
                ],
                'solvedExample': {
                    'question': '"Annemin yaptığı sarmayı afiyetle yedik." cümlesindeki "yaptığı" ve "sarmayı" sözcüklerinin türünü açıklayınız.',
                    'analysis': 'Sarma kelimesi yemek adı olarak kalıcı isim olmuştur; yaptığı kelimesi ise ismi niteleyen sıfat-fiildir.',
                    'solution': '"yaptığı" sözcüğü SIFAT-FİİL\'dir (-dık eki almıştır). "sarma" sözcüğü ise bir yemeğin adı olarak kalıplaştığı için KALICI İSİM\'dir (fiilimsi değildir).'
                },
                'practiceQuestion': {
                    'question': '"Koşarak yanımıza geldi." cümlesindeki zarf-fiili ve cümleye kattığı anlamı (zaman mı durum mu) yazınız.',
                    'hint': '"Koşarak" zarf-fiildir; "Nasıl geldi?" sorusuna yanıt verdiği için DURUM anlamı katmıştır.'
                }
            },
            {
                'outcomeCode': 'T.8.3.1',
                'topicTitle': 'Cümlenin Temel Ögeleri: Yüklem ve Özne',
                'quickNotes': [
                    'Cümlenin Ögelerini Bulma Sırası Kuralı: Y-Ö-N-T (Önce Yüklem, sonra Özne, sonra Nesne, sonra Tümleçler bulunur!).',
                    'Yüklem: Cümlenin yargı bildiren ana unsurudur. Çekimli bir fiil veya ek fiil almış bir isim olabilir. Tamlamalar, deyimler ve birleşik fiiller BÖLÜNEMEZ!',
                    'Özne: Yüklemde bildirilen işi yapan veya yargının konusu olan unsurdur. Yükleme sorulan "Kim?" ve "Ne?" (Yapan kim / Olan ne?) sorularıyla bulunur.'
                ],
                'examTraps': [
                    'PÜF NOKTA: Deyimler bir bütün olduğu için öge bulunurken asla bölünmez! "Öğretmenin sözleri gözümü açtı." cümlesinde yüklem "gözünü açmak" deyimidir.'
                ],
                'solvedExample': {
                    'question': '"Yıllardır hayalini kurduğu o kırmızı bisikleti nihayet dün babası aldı." cümlesinin öznesini bulunuz.',
                    'analysis': 'Yüklem: aldı. Alan kim? Babası.',
                    'solution': 'Cümlenin öznesi "babası"dır (Gerçek özne).'
                },
                'practiceQuestion': {
                    'question': '"Sınav soruları beklediğimizden çok daha kolaydı." cümlesinin yüklemi nedir?',
                    'hint': 'İsim soylu tamlama yüklemdir: "beklediğimizden çok daha kolaydı".'
                }
            }
        ]
    },
    {
        'id': 'study_8_mat_1_1_senaryo_1',
        'grade': 8,
        'subjectId': 'matematik',
        'examTerm': '1_donem_1_yazili',
        'scenarioId': 'senaryo_1',
        'title': '8. Sınıf Matematik 1. Yazılı / LGS Odaklı Çalışma Kağıdı (Çarpanlar & Katlar, EBOB-EKOK, Üslü Sayılar)',
        'sections': [
            {
                'outcomeCode': 'M.8.1.1.2',
                'topicTitle': 'EBOB ve EKOK Problemlerinde Ayırt Edici İpuçları',
                'quickNotes': [
                    'EBOB (En Büyük Ortak Bölen): Büyük parçalardan KÜÇÜK parçalar elde ediliyorsa EBOB kullanılır! (Bütünden parçaya). Örnek: Çuvallardaki pirinçleri poşetlere paylaştırma, tarlanın etrafına eşit aralıklarla fidan dikme, kumaşları eşit parçalara bölme.',
                    'EKOK (En Küçük Ortak Kat): Küçük parçalar bir araya gelerek BÜYÜK bir bütün oluşturuyorsa EKOK kullanılır! (Parçadan bütüne). Örnek: Farklı aralıklarla çalan zillerin birlikte çalması, nöbet günleri, kutuları üst üste koyup kule yapma, dairesel pistte karşılaşma turları.',
                    'Aralarında Asal Sayılar: 1\'den başka ortak böleni olmayan sayılardır (örneğin 8 ile 15). Aralarında asal iki sayının EBOB\'u daima 1, EKOK\'u ise bu iki sayının çarpımıdır!'
                ],
                'examTraps': [
                    'LGS TUZAĞI: Tarlanın etrafına ağaç dikilirken köşelere de dikilip dikilmeyeceği sorulur. "Köşelere de dikilmek şartıyla" dendiğinde toplam fidan sayısı: Çevre / EBOB formülüyle bulunur.'
                ],
                'solvedExample': {
                    'question': 'Biri 40 dakikada bir, diğeri 50 dakikada bir kalkan iki vapur ilk kez saat 08.00\'de birlikte hareket etmiştir. İkinci kez saat kaçta birlikte hareket ederler?',
                    'analysis': 'Tekrarlayan zaman periyotları parça-bütün ilişkisidir, EKOK gerektirir.',
                    'solution': 'EKOK(40, 50) = 200 dakika. 200 dakika = 3 saat 20 dakika. Saat 08.00 + 03.20 = 11.20\'de tekrar birlikte hareket ederler.'
                },
                'practiceQuestion': {
                    'question': 'Kenar uzunlukları 18 m ve 24 m olan dikdörtgen şeklindeki bahçenin kenarlarına ve köşelerine eşit aralıklarla ağaç dikilecektir. En az kaç ağaç gerekir?',
                    'hint': 'Önce EBOB(18, 24) = 6 m bulunur. Bahçe çevresi = 2 × (18 + 24) = 84 m. Ağaç sayısı = 84 / 6 = 14 ağaç.'
                }
            },
            {
                'outcomeCode': 'M.8.1.2.2',
                'topicTitle': 'Üslü İfadeler ve Temel İşlem Kuralları',
                'quickNotes': [
                    'Negatif Kuvvet: Sayıyı ters çevirir (çarpmaya göre tersi): a^(-n) = 1 / (a^n). İşareti pozitifse negatif yapmaz!',
                    'Üssün Üssü: Üsler çarpılır: (a^m)^n = a^(m × n).',
                    'Çarpma Kuralı: Tabanlar aynı ise üsler toplanır: a^x × a^y = a^(x+y). Üsler aynı ise tabanlar çarpılır: a^x × b^x = (a×b)^x.',
                    'Bölme Kuralı: Tabanlar aynı ise payın üssünden paydanın üssü çıkarılır: a^x / a^y = a^(x-y).',
                    'Sıfır Hariç Her Sayının Sıfırıncı Kuvveti 1\'dir: a^0 = 1.'
                ],
                'examTraps': [
                    'PARANTEZ TUZAĞI: -3² = -9 iken, (-3)² = +9\'dur! Parantez çift kuvveti kapsamadığında eksi işareti korunur.'
                ],
                'solvedExample': {
                    'question': '2^15 tane cevizin yarısını 4 kardeşe eşit paylaştırırsak her kardeşe kaç ceviz düşer?',
                    'analysis': 'Yarısını almak 2\'ye bölmek, 4 kardeşe paylaştırmak ise tekrar 2²\'ye bölmektir.',
                    'solution': 'Cevizlerin yarısı: 2^15 / 2^1 = 2^14. 4 kardeşe paylaştırma: 2^14 / 2^2 = 2^12 ceviz düşer.'
                },
                'practiceQuestion': {
                    'question': '4^6 × 8^3 işleminin sonucunu 2\'nin kuvveti olarak yazınız.',
                    'hint': '4 = 2² ve 8 = 2³ yazarak üssün üssü kuralını uygulayınız: (2²)^6 × (2³)^3 = 2^12 × 2^9 = 2^21.'
                }
            }
        ]
    },
    {
        'id': 'study_8_fen_1_1_senaryo_1',
        'grade': 8,
        'subjectId': 'fen_bilimleri',
        'examTerm': '1_donem_1_yazili',
        'scenarioId': 'senaryo_1',
        'title': '8. Sınıf Fen Bilimleri 1. Yazılı / LGS Odaklı Çalışma Kağıdı (Mevsimler ve İklim, DNA)',
        'sections': [
            {
                'outcomeCode': 'F.8.1.1.1',
                'topicTitle': 'Mevsimlerin Oluşumu ve Eksen Eğikliği',
                'quickNotes': [
                    'Mevsimlerin oluşumunun 2 temel sebebi vardır: 1) Dünya\'nın eksen eğikliği (23° 27\'), 2) Dünya\'nın Güneş etrafında dolanması.',
                    'Dünya\'nın Güneş\'e olan mesafesinin mevsimlerle hiçbir ilgisi yoktur! Dünya Güneş\'e en yakın olduğu tarih 3 Ocak\'tır fakat Kuzey Yarım Küre kış mevsimini yaşar.',
                    'Işığın Geliş Açısı: Işık ışınları dik veya dike yakın gelirse birim alana düşen ısı enerjisi artar (YAZ). Eğik açıyla gelirse alan genişler, birim alandaki enerji azalır (KIŞ).',
                    'Dönenceler ve Gün Dönümü: 21 Haziran (Yengeç Dönencesi dik / KYK Yaz, GYK Kış), 21 Aralık (Oğlak Dönencesi dik / KYK Kış, GYK Yaz), 21 Mart & 23 Eylül (Ekinoks / Ekvator dik / Gece-Gündüz 12 saat eşit).'
                ],
                'examTraps': [
                    'GÖLGE BOYU KURALI: Güneş ışınları ne kadar DİK gelirse gölge boyu o kadar KISA olur. 21 Haziran\'da öğle vakti Türkiye\'de yılın en kısa gölgesi oluşur.'
                ],
                'solvedExample': {
                    'question': '21 Aralık tarihinde Türkiye\'de bulunan bir çubuğun gölge boyu ile Güney Afrika\'da bulunan özdeş bir çubuğun gölge boyunu karşılaştırınız.',
                    'analysis': '21 Aralık\'ta ışınların geliş açısı KYK ve GYK açısından kıyaslanır.',
                    'solution': '21 Aralık\'ta Güney Yarım Küre (Güney Afrika) yaz mevsimini yaşar ve ışınlar dike yakın gelir, dolayısıyla gölge boyu çok kısadır. Kuzey Yarım Küre (Türkiye) ise kış yaşar ve ışınlar eğik gelir, dolayısıyla gölge boyu uzundur.'
                },
                'practiceQuestion': {
                    'question': 'Dünya\'nın eksen eğikliği olmasaydı mevsimler ve gece-gündüz süreleri hakkında ne söylenebilirdi?',
                    'hint': 'Mevsimler oluşmazdı ve yıl boyu her yerde 12 saat gece - 12 saat gündüz yaşanırdı.'
                }
            },
            {
                'outcomeCode': 'F.8.2.1.1',
                'topicTitle': 'DNA ve Genetik Kod: Yapı ve Hiyerarşi',
                'quickNotes': [
                    'Karmaşıktan Basite Sıralama (KediGen): Kromozom > DNA > Gen > Nükleotid.',
                    'Kromozom: DNA\'nın özel protein kılıfına sarılmış halidir. Sağlıklı bir insanda 46 kromozom (23 çift) vardır. Kromozom sayısının canlının gelişmişliği ile hiçbir ilgisi yoktur (Örn: Eğrelti otu 500 kromozomludur).',
                    'DNA (Deoksiribonükleik Asit): Çift zincirli, sarmal yapılı yönetici moleküldür.',
                    'Gen: DNA\'nın görev ve anlam birimidir. Kalıtsal özellikleri (göz rengi, boy uzunluğu vb.) taşır.',
                    'Nükleotid: DNA\'nın en küçük yapı birimidir. 3 kısımdan oluşur: Fosfat + Deoksiriboz Şekeri + Organik Baz (Adenin, Timin, Guanin, Sitozin).',
                    'Eşleşme Kuralı: Adenin (A) daima Timin (T) ile; Guanin (G) daima Sitozin (C) ile eşleşir. A = T ve G = C.'
                ],
                'examTraps': [
                    'TUZAK: DNA\'nın yapı birimi NÜKLEOTİD iken, görev birimi GEN\'dir! MEB bu ikisini sorularda sıkça yer değiştirir.'
                ],
                'solvedExample': {
                    'question': 'Bir DNA molekülünde toplam 600 nükleotid bulunmaktadır. Bu DNA\'da 100 Guanin nükleotidi olduğuna göre Timin sayısı kaçtır?',
                    'analysis': 'G = C = 100. Toplam G + C = 200. Kalan A + T = 600 - 200 = 400. A = T olduğu için ikiye bölünür.',
                    'solution': 'G = 100 ise C = 100\'dür. Toplam G + C = 200 nükleotid. Geriye kalan nükleotid: 600 - 200 = 400 (Adenin + Timin). A = T olduğundan Timin sayısı: 400 / 2 = 200 bulunur.'
                },
                'practiceQuestion': {
                    'question': 'Nükleotidler ismini yapısındaki hangi maddeden alır?',
                    'hint': 'İçerdiği organik bazdan (Adenin bazı içeriyorsa Adenin Nükleotidi).'
                }
            }
        ]
    },
    {
        'id': 'study_8_sosyal_bilgiler_1_1_senaryo_1',
        'grade': 8,
        'subjectId': 'sosyal_bilgiler',
        'examTerm': '1_donem_1_yazili',
        'scenarioId': 'senaryo_1',
        'title': '8. Sınıf T.C. İnkılap Tarihi ve Atatürkçülük 1. Yazılı / LGS Odaklı Çalışma Kağıdı',
        'sections': [
            {
                'outcomeCode': 'İTA.8.1.1',
                'topicTitle': '20. Yüzyıl Başlarında Osmanlı Devleti ve Fikir Akımları',
                'quickNotes': [
                    'Sanayi İnkılabı: Sömürgecilik yarışını ve hammadde arayışını başlattı; I. Dünya Savaşı\'nın temel ekonomik sebebidir. Osmanlı açık pazar haline geldi ve lonca teşkilatı çöktü.',
                    'Fransız İhtilali: Milliyetçilik akımını yaydı; çok uluslu Osmanlı İmparatorluğu\'nda azınlık isyanlarına ve Balkanlar\'da büyük toprak kayıplarına yol açtı.',
                    'Osmanlı\'yı Dağılmaktan Kurtarma Fikir Akımları:',
                    '• Osmanlıcılık: Din, dil, ırk ayrımı yapmaksızın herkesi eşit kabul etme (Tanzimat, Meşrutiyet). Balkan Savaşları ile çöktü.',
                    '• İslamcılık (Ümmetçilik): Tüm Müslümanları halife etrafında birleştirme (II. Abdülhamid). Arapların İngilizlerle iş birliği yapmasıyla çöktü.',
                    '• Türkçülük (Turancılık): Türk milletinin millî bilincine ve kültürüne dayanma (Ziya Gökalp). Millî Mücadele\'nin temel harcı oldu.',
                    '• Batıcılık: Batı\'nın bilim, fen ve yönetim anlayışını örnek alma (Tevfik Fikret).'
                ],
                'examTraps': [
                    'LGS TUZAĞI: Arapların I. Dünya Savaşı\'nda İngilizlerle birlikte hareket etmesi İSLAMCILIK fikrinin; Balkan Savaşları\'nda Hristiyan milletlerin bağımsızlık ilan etmesi OSMANLICILIK fikrinin çöktüğünü gösterir.'
                ],
                'solvedExample': {
                    'question': 'Selanik şehrinin çok uluslu yapısı ve zengin demir yolu-liman ağı Mustafa Kemal\'in fikir hayatını nasıl etkilemiştir?',
                    'analysis': 'Selanik\'in jeopolitik ve kültürel ortamının kişilik gelişimine yansıması incelenir.',
                    'solution': 'Farklı kültür ve dinleri bir arada görerek hoşgörü ve zengin bir vizyon kazanmasını sağlamış; Avrupa\'daki gazete ve yayınlara hızlı erişimi ise Batı dünyasındaki fikir akımlarını yakından takip etmesine zemin hazırlamıştır.'
                },
                'practiceQuestion': {
                    'question': 'Mustafa Kemal\'in Şam\'da "Vatan ve Hürriyet Cemiyeti"ni kurması onun hangi kişilik özelliklerini yansıtır?',
                    'hint': 'Liderlik, vatanseverlik ve teşkilatçılık.'
                }
            },
            {
                'outcomeCode': 'İTA.8.1.3',
                'topicTitle': 'Mustafa Kemal\'in Askerlik Hayatı ve Millî Mücadele Hazırlığı',
                'quickNotes': [
                    '31 Mart Vakası (1909): Meşrutiyete karşı çıkan isyanı bastıran Hareket Ordusu\'nda Kurmay Başkanı olarak görev aldı. Tarih sahnesine ilk çıkışıdır.',
                    'Trablusgarp Savaşı (1911): İlk askeri başarısıdır. Gönüllü olarak Derne ve Tobruk\'ta yerel halkı teşkilatlandırarak İtalyanlara karşı savaştı (Teşkilatçılık & Vatanseverlik).',
                    'Çanakkale Cephesi (1915): Anafartalar, Conkbayırı ve Arıburnu\'nda kazandığı zaferlerle "Anafartalar Kahramanı" olarak tanındı. Millî Mücadele\'nin lideri olmasını sağladı.',
                    'Kafkas Cephesi: Muş ve Bitlis\'i Rus işgalinden kurtardı. Generalliğe (Paşa) terfi etti.'
                ],
                'examTraps': [
                    'PÜF NOKTA: Mustafa Kemal\'in Trablusgarp\'ta yerel halkı örgütlemesi onun "TEŞKİLATÇILIK / ÖRGÜTLEYİCİLİK" yeteneğini gösterir.'
                ],
                'solvedExample': {
                    'question': 'Mustafa Kemal\'in Çanakkale Cephesi\'ndeki başarısının Kurtuluş Savaşı açısından en önemli sonucu nedir?',
                    'analysis': 'Liderlik algısı ve halkın güveni bağlamında değerlendirilir.',
                    'solution': 'Hem yurt içinde hem de dünyada büyük bir ün kazanarak Türk milletinin gözünde tartışmasız millî bir lider haline gelmesini sağlamıştır.'
                },
                'practiceQuestion': {
                    'question': 'Mustafa Kemal\'in "Ben size taarruzu değil, ölmeyi emrediyorum!" sözü hangi savaş ve cephede söylenmiştir?',
                    'hint': 'Çanakkale Savaşı (Conkbayırı).'
                }
            }
        ]
    },
    {
        'id': 'study_8_din_kulturu_1_1_senaryo_1',
        'grade': 8,
        'subjectId': 'din_kulturu',
        'examTerm': '1_donem_1_yazili',
        'scenarioId': 'senaryo_1',
        'title': '8. Sınıf Din Kültürü ve Ahlak Bilgisi 1. Yazılı / LGS Odaklı Çalışma Kağıdı',
        'sections': [
            {
                'outcomeCode': 'DKAB.8.1.1',
                'topicTitle': 'Kader ve Kaza İnancı',
                'quickNotes': [
                    'Kader: Allah\'ın her şeyi önceden bir ölçü, düzen ve plana göre takdir etmesi, programlamasıdır (Plan aşaması).',
                    'Kaza: Allah\'ın takdir ettiği bu planın zamanı ve yeri gelince gerçekleşmesidir (Uygulama/olay anı).',
                    'Örnek: "Güneş\'in doğuş ve batış saatlerinin hesaplanması" KADER; "Güneş\'in sabah saat 06.30\'da doğması" KAZA\'dır.',
                    'Tevekkül: Bir iş için gereken tüm maddi ve manevi çabayı gösterdikten sonra sonucu Allah\'a bırakıp güvenmektir. Tedbirsiz tevekkül olmaz!'
                ],
                'examTraps': [
                    'TUZAK: "Ben kader mahkumuyum", "Kaderim böyleymiş ne yapsam boş" diyerek sorumluluktan kaçmak İslam kader anlayışına aykırıdır. İnsanın iradesi ve seçme hakkı (cüzi irade) vardır.'
                ],
                'solvedExample': {
                    'question': '1. "Su 100 derecede kaynar kuralı."\n2. "Çaydanlıktaki suyun 100 dereceye ulaşıp kaynaması."\nHangisi kader, hangisi kazadır?',
                    'analysis': 'Ölçü ve kanun boyutu kader, fiili gerçekleşme boyutu kazadır.',
                    'solution': '1. durum KADER (önceden konmuş ölçü/yasa), 2. durum KAZA\'dır (olayın gerçekleşmiş hali).'
                },
                'practiceQuestion': {
                    'question': 'Tarlasını sürüp tohumu eken ve gübreleyen bir çiftçinin bereketli ürün için dua etmesi hangi kavramla açıklanır?',
                    'hint': 'Gereken tüm tedbirleri alıp Allah\'a güvenmek: Tevekkül.'
                }
            },
            {
                'outcomeCode': 'DKAB.8.1.2',
                'topicTitle': 'Evrenin Yasaları (Sünnetullah / Âdetullah)',
                'quickNotes': [
                    '1. Fiziksel Yasalar: Madde ve enerjinin yapısı, hareketi ve değişimini inceler. Evrensel ve deneyle ispatlanabilir yasalardır. (Örn: Yer çekimi, suyun kaldırma kuvveti, ısınan metallerin genleşmesi, mevsimler).',
                    '2. Biyolojik Yasalar: Canlıların yapısı, üremesi, büyümesi, beslenmesi ve gelişimini düzenleyen yasalardır. (Örn: Fotosentez, kuşların kanat yapısı, develerin çöl şartlarına uyumu, DNA).',
                    '3. Toplumsal Yasalar: Toplumların huzur, adalet, güven ve birlikteliğini düzenleyen neden-sonuç kurallarıdır. (Örn: Adaletin olmadığı yerde kargaşa çıkması, göçler, yardımlaşmanın barışı artırması).'
                ],
                'examTraps': [
                    'PÜF NOKTA: Ayette "adalet, dürüstlük, hak, zulüm, toplumların helakı" geçiyorsa Toplumsal; "gece-gündüz, su, gemilerin yüzmesi" geçiyorsa Fiziksel; "insanın yaratılışı, bitki, hayvan" geçiyorsa Biyolojik yasadır.'
                ],
                'solvedExample': {
                    'question': '"Onlar yeryüzünde gezip kendilerinden öncekilerin sonunun nasıl olduğuna bakmazlar mı?" ayeti hangi evrensel yasa ile ilgilidir?',
                    'analysis': 'Geçmiş toplumların başına gelenler ve sosyolojik sonuçlar vurgulanmıştır.',
                    'solution': 'TOPLUMSAL YASA ile ilgilidir.'
                },
                'practiceQuestion': {
                    'question': 'Kutup ayılarının soğuktan korunmak için kalın yağ tabakasına sahip olması hangi yasa türüne girer?',
                    'hint': 'Canlıların biyolojik uyumu: Biyolojik Yasa.'
                }
            }
        ]
    },
    {
        'id': 'study_8_ingilizce_1_1_senaryo_1',
        'grade': 8,
        'subjectId': 'ingilizce',
        'examTerm': '1_donem_1_yazili',
        'scenarioId': 'senaryo_1',
        'title': '8. Sınıf İngilizce 1. Yazılı / LGS Odaklı Çalışma Kağıdı',
        'sections': [
            {
                'outcomeCode': 'E8.1.R1',
                'topicTitle': 'Unit 1: Friendship - Making, Accepting & Refusing Invitations',
                'quickNotes': [
                    'Making Invitations (Davet Etme):',
                    '• Would you like to join us? (Bize katılmak ister misin?)',
                    '• How about / What about going to the cinema? (Sinemaya gitmeye ne dersin?)',
                    '• Why don\'t we have a picnic? (Neden piknik yapmıyoruz?)',
                    'Accepting (Kabul Etme): "Yes, I\'d love to.", "That sounds great / awesome!", "Sure, why not?"',
                    'Refusing with Excuse (Gerekçe ile Reddetme): "I\'d love to, but I can\'t. I have an exam tomorrow.", "I am sorry, but I am busy."',
                    'Personal Traits (Kişilik Özellikleri): Honest (dürüst), Generous (cömert), Supportive / Back up (destekleyici), Reliable / Dependable (güvenilir), Stubborn (inatçı), Tactful (ince fikirli).'
                ],
                'examTraps': [
                    'LGS TUZAĞI: "I\'d love to, but I must study." cümlesi KABUL DEĞİL, REDDETME ifadesidir! Başındaki "I\'d love to"ya kanıp kabul sanmayın; "but" ile reddetmiş ve mazeret bildirmiştir.'
                ],
                'solvedExample': {
                    'question': 'A true friend should always back you up and tell the truth. Which two adjectives describe this friend?',
                    'analysis': 'Back up = support (destekleyici), tell the truth = honest (dürüst).',
                    'solution': 'Supportive and Honest (or Reliable).'
                },
                'practiceQuestion': {
                    'question': 'What does "Count on" mean?',
                    'hint': 'Trust / depend on (Güvenmek).'
                }
            },
            {
                'outcomeCode': 'E8.2.W1',
                'topicTitle': 'Unit 2: Teen Life - Daily Routines & Music Preferences',
                'quickNotes': [
                    'Expressing Preferences: "I prefer pop music to rock music." (Tercih edilen önce gelir, araya TO konur!).',
                    'Opinions about Music/Activities:',
                    '• Terrific: Müthiş / harika (+)',
                    '• Impressive: Etkileyici (+)',
                    '• Ridiculous: Gülünç / saçma (-)',
                    '• Unbearable: Katlanılmaz / çekilmez (-)',
                    '• Boring / Dull: Sıkıcı (-).'
                ],
                'examTraps': [
                    'PÜF NOKTA: "Unbearable" olumsuz bir sıfattır ("katlanılmaz"). Bir kişi caz müziği için "unbearable" diyorsa caz müziğini sevmediği (dislike) anlamına gelir.'
                ],
                'solvedExample': {
                    'question': '"I think heavy metal music is unbearable because it is too loud." What is the speaker\'s opinion about heavy metal?',
                    'analysis': 'Unbearable kelimesinin olumsuz anlamı yorumlanır.',
                    'solution': 'The speaker hates/dislikes heavy metal music and thinks it is noisy and intolerable.'
                },
                'practiceQuestion': {
                    'question': 'Fill in the blank: "I prefer listening to folk music .............. hip-hop."',
                    'hint': 'Prefer A to B kuralı: "to".'
                }
            }
        ]
    }
]

print("Study sheets definitions ready.")

# ==============================================================================
# 4. SPEAKING GUIDES FOR 5, 6, 8 (7th Grade already in codebase)
# ==============================================================================

GRADE_5_SPEAKING = [
    {
        'id': 'speaking_5_turkce_1_1',
        'grade': 5,
        'subjectId': 'turkce',
        'examTerm': '1_donem_1_yazili',
        'title': '5. Sınıf Türkçe Dinleme ve Konuşma Becerileri Uygulama Kılavuzu',
        'purpose': 'MEB Ölçme ve Değerlendirme Yönetmeliği uyarınca 5. sınıf Türkçe dersinde öğrencilerin dinleme-anlama ve kendilerini sözlü ifade etme becerileri süreç odaklı olarak değerlendirilir.',
        'regulationNote': 'Türkçe dersi dönem notu: %50 Yazılı Ortak Sınav + %25 Dinleme/İzleme + %25 Konuşma sınavı puanlarının aritmetik ortalamasıdır.',
        'speakingPrompts': [
            {
                'topic': '1. Kart: Aile ve Arkadaşlıkta Yardımlaşma',
                'prepTimeMinutes': 2,
                'speakTimeMinutes': 2,
                'guidingQuestions': [
                    'Evde veya okulda arkadaşlarınla yardımlaştığın bir anını anlatır mısın?',
                    'İş birliği yapmak bir işi nasıl kolaylaştırır?',
                    'İyi bir arkadaşta hangi özellikler olmalıdır?'
                ]
            },
            {
                'topic': '2. Kart: Doğayı ve Sokak Hayvanlarını Korumak',
                'prepTimeMinutes': 2,
                'speakTimeMinutes': 2,
                'guidingQuestions': [
                    'Çevremizi temiz tutmak neden hepimizin ortak sorumluluğudur?',
                    'Sokak hayvanları için kış aylarında neler yapabiliriz?',
                    'Doğadaki bir ağacı korumak insanlığa ne kazandırır?'
                ]
            }
        ],
        'listeningTasks': [
            {
                'scenario': 'Örnek Dinleme Metni: "Küçük Kar Tanesinin Yolculuğu"',
                'taskDescription': 'Öğrencilere 2-3 dakikalık hikâye edici bir ses kaydı veya öğretmen anlatısı iki defa dinletilir. Dinleme sonrasında olay örgüsü ve kahramanların özellikleri sorulur.',
                'targetSkills': [
                    'Dinlediği metindeki ana karakterleri ve olay örgüsünü belirleme',
                    'Dinlediklerinden hareketle çıkarımda bulunma',
                    'Nezaket kurallarına uygun dinleme davranışı sergileme'
                ]
            }
        ],
        'evaluationRubric': [
            {
                'category': 'Konuşma: Telaffuz ve Beden Dili',
                'maxPoints': 25,
                'criteria': ['Kelimeleri doğru sesletme', 'Göz teması kurma', 'Doğal jest ve mimik kullanımı']
            },
            {
                'category': 'Konuşma: İçerik ve Düşünceyi İfade',
                'maxPoints': 25,
                'criteria': ['Konuya bağlı kalma', 'Gereksiz tekrarlardan kaçınma', 'Düşüncelerini mantıksal sırayla aktarma']
            },
            {
                'category': 'Dinleme: Ana ve Yardımcı Fikir',
                'maxPoints': 25,
                'criteria': ['Metnin konusunu doğru kavrama', 'Dinlediği hikâyenin sonucunu tahmin etme']
            },
            {
                'category': 'Dinleme: Ayrıntıları Yakalama',
                'maxPoints': 25,
                'criteria': ['Olayın nerede ve ne zaman geçtiğini belirleme', 'Yönergeleri eksiksiz uygulama']
            }
        ]
    },
    {
        'id': 'speaking_5_ingilizce_1_1',
        'grade': 5,
        'subjectId': 'ingilizce',
        'examTerm': '1_donem_1_yazili',
        'title': '5th Grade English Speaking & Listening Exam Practice Guide',
        'purpose': 'In line with the MEB Foreign Language Assessment Framework, 5th grade English evaluation consists of 50% written exam and 50% speaking/listening performance tasks.',
        'regulationNote': 'Foreign language marks include speaking and listening performance rubrics conducted during regular class hours.',
        'speakingPrompts': [
            {
                'topic': 'Prompt 1: Introduce Yourself and Your Country',
                'prepTimeMinutes': 2,
                'speakTimeMinutes': 2,
                'guidingQuestions': [
                    'What is your name and how old are you?',
                    'Where are you from and what nationality are you?',
                    'What are your favourite school subjects?'
                ]
            },
            {
                'topic': 'Prompt 2: Giving Directions in Your Town',
                'prepTimeMinutes': 2,
                'speakTimeMinutes': 2,
                'guidingQuestions': [
                    'Imagine a tourist asks you the way to the cinema.',
                    'Use phrases: "Go straight ahead", "Turn left/right", "It is next to the pharmacy".',
                    'Describe 2 important places in your neighbourhood.'
                ]
            }
        ],
        'listeningTasks': [
            {
                'scenario': 'Audio Track: "Welcome to London"',
                'taskDescription': 'Students listen to a short dialogue between two kids talking about their nationalities and favourite places in town.',
                'targetSkills': [
                    'Identify country and nationality names correctly',
                    'Understand basic location prepositions (opposite, near, behind)',
                    'Match speakers with their favourite places'
                ]
            }
        ],
        'evaluationRubric': [
            {
                'category': 'Speaking: Pronunciation & Fluency',
                'maxPoints': 25,
                'criteria': ['Clear pronunciation of target vocabulary', 'Smooth speaking without long hesitation']
            },
            {
                'category': 'Speaking: Task Achievement & Vocabulary',
                'maxPoints': 25,
                'criteria': ['Accurate use of target phrases (country/directions)', 'Answering questions appropriately']
            },
            {
                'category': 'Listening: Comprehension',
                'maxPoints': 25,
                'criteria': ['Correctly answering wh- questions about the audio track']
            },
            {
                'category': 'Listening: Detail Identification',
                'maxPoints': 25,
                'criteria': ['Matching locations and names accurately']
            }
        ]
    }
]

GRADE_6_SPEAKING = [
    {
        'id': 'speaking_6_turkce_1_1',
        'grade': 6,
        'subjectId': 'turkce',
        'examTerm': '1_donem_1_yazili',
        'title': '6. Sınıf Türkçe Dinleme ve Konuşma Becerileri Uygulama Kılavuzu',
        'purpose': 'MEB Ölçme ve Değerlendirme Yönetmeliği uyarınca 6. sınıf öğrencilerinin sözlü iletişim ve dinlediğini tahlil etme becerilerini ölçer.',
        'regulationNote': 'Dönem puanının %50\'si ortak yazılı, %50\'si dinleme ve konuşma uygulama sınavından oluşur.',
        'speakingPrompts': [
            {
                'topic': '1. Kart: Teknolojinin Günlük Yaşantımıza Etkileri',
                'prepTimeMinutes': 2,
                'speakTimeMinutes': 3,
                'guidingQuestions': [
                    'Akıllı telefonlar ve internet hayatımızı nasıl kolaylaştırıyor?',
                    'Teknoloji bağımlılığı arkadaşlık ilişkilerimizi nasıl olumsuz etkileyebilir?',
                    'Zamanımızı verimli kullanmak için ekran süremizi nasıl sınırlandırmalıyız?'
                ]
            },
            {
                'topic': '2. Kart: Geleneksel Çocuk Oyunları ve Dayanışma',
                'prepTimeMinutes': 2,
                'speakTimeMinutes': 3,
                'guidingQuestions': [
                    'Mendil kapmaca, saklambaç gibi sokak oyunlarının çocuk gelişimine faydaları nelerdir?',
                    'Birlikte oyun oynamak kurallara saygıyı nasıl öğretir?',
                    'En sevdiğin geleneksel oyunu ve kurallarını anlatır mısın?'
                ]
            }
        ],
        'listeningTasks': [
            {
                'scenario': 'Örnek Dinleme Metni: "Bir Bilim İnsanının Çocukluğu: Aziz Sancar"',
                'taskDescription': 'Öğrencilere Prof. Dr. Aziz Sancar\'ın Mardin Savur\'daki çocukluk yıllarını ve eğitime olan tutkusunu anlatan 3 dakikalık biyografik kayıt dinletilir.',
                'targetSkills': [
                    'Metindeki neden-sonuç ve amaç-sonuç cümlelerini tespit etme',
                    'Aziz Sancar\'ın başarıya ulaşmasındaki azim ve kararlılığı yorumlama',
                    'Dinleme sırasında önemli bilgileri not alma'
                ]
            }
        ],
        'evaluationRubric': [
            {
                'category': 'Konuşma: Anlatım Akıcılığı ve Söz Varlığı',
                'maxPoints': 25,
                'criteria': ['Zengin kelime dağarcığı kullanma', 'Düşüncelerini tutarlı şekilde bağlama']
            },
            {
                'category': 'Konuşma: Beden Dili ve Ses Tonu',
                'maxPoints': 25,
                'criteria': ['Etkili tonlama ve vurgu', 'Dinleyicilerle göz teması kurma']
            },
            {
                'category': 'Dinleme: Tahlil ve Ana Düşünce',
                'maxPoints': 25,
                'criteria': ['Dinlediği metnin ana fikrini saptama', 'Olaylar arasındaki sebep-sonuç bağını kurma']
            },
            {
                'category': 'Dinleme: Çıkarım Yapma',
                'maxPoints': 25,
                'criteria': ['Karakterlerin duygu ve tutumlarını doğru analiz etme']
            }
        ]
    },
    {
        'id': 'speaking_6_ingilizce_1_1',
        'grade': 6,
        'subjectId': 'ingilizce',
        'examTerm': '1_donem_1_yazili',
        'title': '6th Grade English Speaking & Listening Exam Practice Guide',
        'purpose': 'Assessing communicative competence in daily routines, time expressions, and healthy breakfast preferences.',
        'regulationNote': 'Speaking and listening components constitute 50% of the overall English term assessment.',
        'speakingPrompts': [
            {
                'topic': 'Prompt 1: Describe Your Daily Routine',
                'prepTimeMinutes': 2,
                'speakTimeMinutes': 3,
                'guidingQuestions': [
                    'What time do you wake up on weekdays?',
                    'What do you do after school (hobbies, sports, homework)?',
                    'What is your favourite part of the day and why?'
                ]
            },
            {
                'topic': 'Prompt 2: Healthy vs Unhealthy Breakfast',
                'prepTimeMinutes': 2,
                'speakTimeMinutes': 3,
                'guidingQuestions': [
                    'What do you usually eat and drink for breakfast?',
                    'Which foods are nutritious and why?',
                    'What foods do you dislike or avoid eating?'
                ]
            }
        ],
        'listeningTasks': [
            {
                'scenario': 'Audio Track: "A Day in Mark\'s Life"',
                'taskDescription': 'Students listen to an interview with an English middle school student discussing his morning routines and breakfast habits.',
                'targetSkills': [
                    'Identify exact times mentioned (e.g., quarter past seven, eight o\'clock)',
                    'Recognize likes and dislikes regarding traditional foods',
                    'Complete a missing information timetable'
                ]
            }
        ],
        'evaluationRubric': [
            {
                'category': 'Speaking: Grammatical Accuracy',
                'maxPoints': 25,
                'criteria': ['Correct Simple Present Tense use (3rd person -s)', 'Accurate time prepositions (at, on, in)']
            },
            {
                'category': 'Speaking: Fluency & Interaction',
                'maxPoints': 25,
                'criteria': ['Spontaneous answers to follow-up prompts', 'Natural rhythm and pace']
            },
            {
                'category': 'Listening: Information Extraction',
                'maxPoints': 25,
                'criteria': ['Extracting specific clock times and activities correctly']
            },
            {
                'category': 'Listening: Preference Identification',
                'maxPoints': 25,
                'criteria': ['Identifying speaker attitudes and food choices']
            }
        ]
    }
]

GRADE_8_SPEAKING = [
    {
        'id': 'speaking_8_turkce_1_1',
        'grade': 8,
        'subjectId': 'turkce',
        'examTerm': '1_donem_1_yazili',
        'title': '8. Sınıf Türkçe Dinleme ve Konuşma Becerileri Uygulama Kılavuzu (LGS Hazırlık Süreci)',
        'purpose': 'MEB Ölçme ve Değerlendirme Yönetmeliği doğrultusunda 8. sınıf öğrencilerinin eleştirel düşünme, ikna kabiliyeti ve argüman geliştirme becerilerini ölçer.',
        'regulationNote': 'Yönetmelik gereği Türkçe sınavı çoklu beceri yaklaşımıyla yürütülür (%50 Yazılı + %25 Dinleme + %25 Konuşma).',
        'speakingPrompts': [
            {
                'topic': '1. Kart: Yapay Zekâ ve İnsan Emeği',
                'prepTimeMinutes': 2,
                'speakTimeMinutes': 3,
                'guidingQuestions': [
                    'Yapay zekâ teknolojilerinin mesleklerin geleceğine olumlu ve olumsuz etkileri nelerdir?',
                    'Bir yapay zekâ bir yazarın ya da ressamın duygularını ve özgünlüğünü taklit edebilir mi?',
                    'Gelecekte başarılı olmak için bir gencin hangi insani becerileri geliştirmesi gerekir?'
                ]
            },
            {
                'topic': '2. Kart: Millî Mücadele Ruhu ve Gençliğin Sorumluluğu',
                'prepTimeMinutes': 2,
                'speakTimeMinutes': 3,
                'guidingQuestions': [
                    'Gazi Mustafa Kemal Atatürk\'ün gençliğe emanet ettiği cumhuriyet değerlerini korumak için neler yapmalıyız?',
                    'Tarih bilincine sahip olmak bir milletin bağımsızlığı için neden hayati önem taşır?',
                    'Bilim ve sanatta ilerlemek vatanseverliğin bir göstergesi midir?'
                ]
            }
        ],
        'listeningTasks': [
            {
                'scenario': 'Örnek Dinleme Metni: "Çanakkale\'de Bir Kahramanlık Destanı: Seyit Onbaşı"',
                'taskDescription': 'Öğrencilere Çanakkale Boğaz Harbi esnasında Seyit Onbaşı\'nın gösterdiği insanüstü fedakârlığı ve top mermisini kaldırış anını anlatan 3-4 dakikalık edebi metin dinletilir.',
                'targetSkills': [
                    'Metindeki örtük anlamları ve duygu yoğunluğunu tahlil etme',
                    'Konuşmacının üslup ve anlatım tekniklerini değerlendirme',
                    'Tarihî olay ve şahsiyetlerin manevi değerlerini özümseme'
                ]
            }
        ],
        'evaluationRubric': [
            {
                'category': 'Konuşma: Argüman Geliştirme ve İkna',
                'maxPoints': 25,
                'criteria': ['Fikirlerini somut örneklerle destekleme', 'Mantıksal tutarlılık ve savunma gücü']
            },
            {
                'category': 'Konuşma: Dili Doğru Kullanma ve Akıcılık',
                'maxPoints': 25,
                'criteria': ['Cümleleri ögelerine ve kurallara uygun kurma', 'Zengin mecazi ve felsefi söz varlığı']
            },
            {
                'category': 'Dinleme: Derinlemesine Anlama',
                'maxPoints': 25,
                'criteria': ['Metnin temasını ve verilmek istenen temel mesajı belirleme']
            },
            {
                'category': 'Dinleme: Eleştirel Değerlendirme',
                'maxPoints': 25,
                'criteria': ['Metindeki duygu, düşünce ve olguları birbirinden ayırt etme']
            }
        ]
    },
    {
        'id': 'speaking_8_ingilizce_1_1',
        'grade': 8,
        'subjectId': 'ingilizce',
        'examTerm': '1_donem_1_yazili',
        'title': '8th Grade English Speaking & Listening Exam Practice Guide (LGS Integrated)',
        'purpose': 'Evaluating advanced oral interaction in social contexts (friendship, making invitations, refusing with excuses, discussing teen lifestyles).',
        'regulationNote': 'Evaluation follows MEB national regulations for foreign languages with interactive paired or solo performance tests.',
        'speakingPrompts': [
            {
                'topic': 'Prompt 1: What Makes a True Friend?',
                'prepTimeMinutes': 2,
                'speakTimeMinutes': 3,
                'guidingQuestions': [
                    'What personal traits are essential in a best friend (honest, supportive, reliable)?',
                    'Can you trust someone who shares your secrets with others? Why or why not?',
                    'Describe a memorable activity you recently enjoyed with your close friend.'
                ]
            },
            {
                'topic': 'Prompt 2: Invitations and Excuses Roleplay',
                'prepTimeMinutes': 2,
                'speakTimeMinutes': 3,
                'guidingQuestions': [
                    'Invite your partner to a weekend bowling tournament or concert.',
                    'Your partner politely refuses by giving a valid excuse (e.g. studying for LGS).',
                    'Negotiate an alternative plan that works for both of you.'
                ]
            }
        ],
        'listeningTasks': [
            {
                'scenario': 'Audio Track: "Weekend Plans & Invitations"',
                'taskDescription': 'Students listen to 3 telephone conversations where teens invite each other to different social events (cinema, barbecue, study group).',
                'targetSkills': [
                    'Identify who accepts and who refuses the invitation',
                    'Note down the specific excuses given by the callers',
                    'Extract event details (date, time, venue, fee)'
                ]
            }
        ],
        'evaluationRubric': [
            {
                'category': 'Speaking: Interaction & Conversational Strategies',
                'maxPoints': 25,
                'criteria': ['Using conversational gambits (Would you like to, That sounds awesome, I am sorry but...)']
            },
            {
                'category': 'Speaking: Pronunciation & Intonation',
                'maxPoints': 25,
                'criteria': ['Natural stress, rhythm, and clear phonetics']
            },
            {
                'category': 'Listening: Key Information & Detail Extraction',
                'maxPoints': 25,
                'criteria': ['Accurately recording times, dates, and locations']
            },
            {
                'category': 'Listening: Tone & Attitude Recognition',
                'maxPoints': 25,
                'criteria': ['Discerning politeness, reluctance, and enthusiasm from voice tones']
            }
        ]
    }
]

# ==============================================================================
# 5. INFOGRAPHICS FOR 5, 6, 8
# ==============================================================================

ADDITIONAL_INFOGRAPHICS = [
    # 5. SINIF FEN BİLİMLERİ
    {
        'id': 'info_5_fen_gunes_ay',
        'grade': 5,
        'subjectId': 'fen_bilimleri',
        'examTerm': '1_donem_1_yazili',
        'title': 'Güneş, Dünya ve Ay: Boyutlar & Ay\'ın Evreleri',
        'subtitle': 'TYMM 5. Sınıf Fen Bilimleri 1. Yazılı Görsel Hafıza Kartı',
        'category': 'Güneş, Dünya ve Ay',
        'memoryHook': 'Ay düz "D" ise İlk Dördün, ters "D" ise Son Dördün! Boyut kodlaması: Basketbol Topu > Nohut > Mercimek.',
        'summaryCards': [
            {
                'title': 'Güneş (Dev Yıldız)',
                'badge': 'Basketbol Topu',
                'points': [
                    'Orta büyüklükte sarı bir yıldızdır',
                    'Isı ve ışık kaynağımızdır',
                    'Kendi ekseni etrafında saat yönünün tersine döner',
                    'Güneş lekeleri dönme hareketini ispatlar (Galileo)'
                ],
                'highlight': 'Dünya Güneş\'in içine yaklaşık 1 milyon 300 bin adet sığabilir.'
            },
            {
                'title': 'Ay ve Evreleri',
                'badge': 'Mercimek Tanesi',
                'points': [
                    'Dünya\'nın tek doğal uydusudur',
                    'Atmosferi yok denecek kadar incedir (Hava olayları görülmez)',
                    'Krater adı verilen meteor çukurları vardır',
                    'Dönme ve dolanma süresi eşit olduğu için hep aynı yüzü görülür'
                ],
                'highlight': 'Ana evreler arası süre tam 1 haftadır (7 gün).'
            }
        ],
        'comparisonTable': {
            'headers': ['Gök Cismi', 'Model Benzetmesi', 'Işık Kaynağı mı?', 'Dönme Yönü'],
            'rows': [
                ['Güneş', 'Basketbol Topu', 'Evet (Doğal Işık Kaynağı)', 'Saat yönünün tersi (Batıdan Doğuya)'],
                ['Dünya', 'Nohut Tanesi', 'Hayır (Güneş\'ten alır)', 'Saat yönünün tersi (Batıdan Doğuya)'],
                ['Ay', 'Mercimek Tanesi', 'Hayır (Güneş ışığını yansıtır)', 'Saat yönünün tersi (Batıdan Doğuya)']
            ]
        }
    },
    # 5. SINIF MATEMATİK
    {
        'id': 'info_5_mat_geometri',
        'grade': 5,
        'subjectId': 'matematik',
        'examTerm': '1_donem_1_yazili',
        'title': 'Temel Geometrik Kavramlar ve Açılar',
        'subtitle': 'TYMM 5. Sınıf Matematik Görsel Püf Noktalar Matrisi',
        'category': 'Temel Geometri',
        'memoryHook': 'Doğrunun iki ucu açık, Işının tek ucu kapalı, Doğru parçasının iki ucu kilitlidir!',
        'summaryCards': [
            {
                'title': 'Geometrik Modeller',
                'badge': 'Ölçülebilirlik Kuralı',
                'points': [
                    'Doğru: İki yöne sonsuz uzar, boyu ÖLÇÜLEMEZ',
                    'Işın: Bir yöne sonsuz uzar, boyu ÖLÇÜLEMEZ',
                    'Doğru Parçası: İki ucu sınırlıdır, boyu ÖLÇÜLEBİLİR'
                ],
                'highlight': 'Sadece doğru parçalarının santimetre cinsinden uzunluğu ölçülebilir.'
            },
            {
                'title': 'Açı Türleri',
                'badge': 'Referans: 90°',
                'points': [
                    'Dar Açı: 0° < Açı < 90°',
                    'Dik Açı: Tam 90° (∟ işareti)',
                    'Geniş Açı: 90° < Açı < 180°',
                    'Doğru Açı: Tam 180°'
                ],
                'highlight': 'Saat tam 03.00 ve 09.00\'da akrep ile yelkovan dik açı (90°) oluşturur.'
            }
        ],
        'comparisonTable': {
            'headers': ['Açı Çeşidi', 'Ölçü Aralığı', 'Örnek Değer', 'Saat Modeli'],
            'rows': [
                ['Dar Açı', '0° - 89°', '45°, 75°, 89°', 'Saat 02.00'],
                ['Dik Açı', 'Tam 90°', '90°', 'Saat 03.00'],
                ['Geniş Açı', '91° - 179°', '120°, 150°, 179°', 'Saat 05.00'],
                ['Doğru Açı', 'Tam 180°', '180°', 'Saat 06.00']
            ]
        }
    },
    # 6. SINIF MATEMATİK
    {
        'id': 'info_6_mat_bolunebilme',
        'grade': 6,
        'subjectId': 'matematik',
        'examTerm': '1_donem_1_yazili',
        'title': 'Bölünebilme Kuralları ve Asal Sayılar',
        'subtitle': '6. Sınıf Matematik 1. Yazılı Hızlı Karar Haritası',
        'category': 'Çarpanlar ve Katlar',
        'memoryHook': 'Rakamları toplamına SADECE 3 ve 9 için bakılır! Çift olan tek asal sayı 2\'dir.',
        'summaryCards': [
            {
                'title': 'Son Basamak Kuralları',
                'badge': '2, 4, 5, 10',
                'points': [
                    '2 ile Bölünme: Son basamağı çift (0, 2, 4, 6, 8)',
                    '4 ile Bölünme: Son iki basamağı 00 veya 4\'ün katı',
                    '5 ile Bölünme: Son basamağı 0 veya 5',
                    '10 ile Bölünme: Son basamağı yalnızca 0'
                ],
                'highlight': 'Bir sayı hem 2\'ye hem 5\'e bölünüyorsa kesinlikle 10\'a da bölünür.'
            },
            {
                'title': 'Rakamlar Toplamı Kuralları',
                'badge': '3 ve 9',
                'points': [
                    '3 ile Bölünme: Rakamlar toplamı 3 veya katı olmalı',
                    '9 ile Bölünme: Rakamlar toplamı 9 veya katı olmalı',
                    '6 ile Bölünme: Hem 2\'ye hem 3\'e aynı anda bölünebilmeli'
                ],
                'highlight': '9\'a bölünen her sayı kesinlikle 3\'e de bölünür; fakat 3\'e bölünen her sayı 9\'a bölünmez!'
            }
        ],
        'comparisonTable': {
            'headers': ['Sayı', '2\'ye', '3\'e', '4\'e', '5\'e', '6\'ya', '9\'a', '10\'a'],
            'rows': [
                ['120', 'Evet', 'Evet', 'Evet', 'Evet', 'Evet', 'Hayır', 'Evet'],
                ['315', 'Hayır', 'Evet', 'Hayır', 'Evet', 'Hayır', 'Evet', 'Hayır'],
                ['432', 'Evet', 'Evet', 'Evet', 'Hayır', 'Evet', 'Evet', 'Hayır'],
                ['700', 'Evet', 'Hayır', 'Evet', 'Evet', 'Hayır', 'Hayır', 'Evet']
            ]
        }
    },
    # 6. SINIF FEN BİLİMLERİ
    {
        'id': 'info_6_fen_gezegenler',
        'grade': 6,
        'subjectId': 'fen_bilimleri',
        'examTerm': '1_donem_1_yazili',
        'title': 'Güneş Sistemi: İç vs. Dış Gezegenler & Tutulmalar',
        'subtitle': '6. Sınıf Fen Bilimleri 1. Yazılı Gezegenler Şeması',
        'category': 'Güneş Sistemi',
        'memoryHook': 'Güneş tutulması: G - A - D (Ay ortada). Ay tutulması: G - D - A (Dünya ortada).',
        'summaryCards': [
            {
                'title': 'İç (Karasal) Gezegenler',
                'badge': 'Merkür, Venüs, Dünya, Mars',
                'points': [
                    'Güneş\'e en yakın 4 gezegendir',
                    'Yüzeyleri katı kayaç ve metallerden oluşur',
                    'Yoğunlukları gazsal gezegenlerden fazladır',
                    'Halkaları kesinlikle YOKTUR',
                    'Uydu sayıları çok azdır (Merkür ve Venüs\'ün hiç yoktur)'
                ],
                'highlight': 'En sıcak gezegen Güneş\'e en yakın Merkür değil, sera etkisinden dolayı Venüs\'tür.'
            },
            {
                'title': 'Dış (Gazsal) Gezegenler',
                'badge': 'Jüpiter, Satürn, Uranüs, Neptün',
                'points': [
                    'Devasa kütleli ve kalın gaz atmosferlidir',
                    'Yoğunlukları düşüktür',
                    'HEPSİNİN halkası ve çok sayıda uydusu vardır',
                    'En büyük gezegen Jüpiter\'dir (Güneş sisteminin devi)'
                ],
                'highlight': 'Uranüs yuvarlanan bir varil gibi yan yatmış şekilde döner.'
            }
        ],
        'comparisonTable': {
            'headers': ['Özellik', 'Güneş Tutulması', 'Ay Tutulması'],
            'rows': [
                ['Araya Giren Cisim', 'Ay (Güneş ile Dünya arasında)', 'Dünya (Güneş ile Ay arasında)'],
                ['Ay\'ın Evresi', 'Yeniay Evresi', 'Dolunay Evresi'],
                ['Gerçekleştiği Zaman', 'Gündüz', 'Gece'],
                ['Gözlem Alanı', 'Dünya üzerinde dar bir şerit', 'Geceyi yaşayan tüm Dünya yüzeyi'],
                ['Gözlem Güvenliği', 'Filtreli özel gözlük şarttır', 'Çıplak gözle güvenle izlenir']
            ]
        }
    },
    # 8. SINIF MATEMATİK
    {
        'id': 'info_8_mat_ebob_ekok',
        'grade': 8,
        'subjectId': 'matematik',
        'examTerm': '1_donem_1_yazili',
        'title': 'LGS Karar Haritası: EBOB mu, EKOK mu?',
        'subtitle': '8. Sınıf Matematik 1. Yazılı & LGS Soru Ayırt Etme Matrisi',
        'category': 'Çarpanlar ve Katlar',
        'memoryHook': 'Büyükten Küçüğe (Bölme/Parçalama) = EBOB! Küçükten Büyüğe (Birleştirme/Katlama) = EKOK!',
        'summaryCards': [
            {
                'title': 'EBOB Problemleri (Bütünden Parçaya)',
                'badge': 'BÖLME / PAYLAŞTIRMA',
                'points': [
                    'Çuvallardaki pirinç/un poşetlere eşit paylaştırılıyorsa',
                    'Tarlanın çevresine eşit aralıklarla fidan/direk dikiliyorsa',
                    'Kumaşlar, tahtalar eşit parçalara bölünüyorsa',
                    'Dikdörtgen zemin kare fayanslarla kaplanıyorsa'
                ],
                'highlight': 'Anahtar Kelime: "En büyük eşit parçalara ayırma", "Eşit poşetleme".'
            },
            {
                'title': 'EKOK Problemleri (Parçadan Bütüne)',
                'badge': 'BİRLEŞTİRME / KATLAMA',
                'points': [
                    'Farklı saatlerde kalkan otobüslerin birlikte hareket saati',
                    'Farklı aralıklarla çalan okul zillerinin birlikte çalması',
                    'Kutular üst üste dizilip kule yüksekliği eşitleniyorsa',
                    'Cevizler 3\'er 3\'er ve 5\'er 5\'er sayıldığında artıyorsa'
                ],
                'highlight': 'Anahtar Kelime: "Birlikte nöbet tutma", "Bir sonraki karşılaşma anı".'
            }
        ],
        'comparisonTable': {
            'headers': ['Problem Türü', 'Kullanılan Yöntem', 'İşlem Mantığı', 'Örnek Sonuç'],
            'rows': [
                ['Tarla etrafına ağaç dikme', 'EBOB', 'Çevre / EBOB = Ağaç Sayısı', 'Küçük parça aralığı'],
                ['Zillerin birlikte çalması', 'EKOK', 'EKOK(z1, z2) = Dakika', 'İleriye dönük ortak zaman'],
                ['Çuvalları torbalara bölme', 'EBOB', 'Toplam Kütle / EBOB = Torba Sayısı', 'Minimum poşet adedi'],
                ['Kare prizmadan küp yapma', 'EKOK', 'Ayrıtların EKOK\'u küpün kenarı', 'Maksimum hacim oluşturma']
            ]
        }
    },
    # 8. SINIF FEN BİLİMLERİ
    {
        'id': 'info_8_fen_mevsimler_dna',
        'grade': 8,
        'subjectId': 'fen_bilimleri',
        'examTerm': '1_donem_1_yazili',
        'title': 'Mevsimlerin Oluşumu ve DNA Hiyerarşisi',
        'subtitle': '8. Sınıf Fen Bilimleri 1. Yazılı / LGS Odaklı Görsel Özet',
        'category': 'Mevsimler ve İklim & DNA',
        'memoryHook': 'KediGen: Kromozom > DNA > Gen > Nükleotid! Dik açı = Dar alan = Sıcak Yaz!',
        'summaryCards': [
            {
                'title': 'Mevsimler ve Gün Dönümleri',
                'badge': 'Eksen Eğikliği: 23° 27\'',
                'points': [
                    '21 Haziran: Güneş Yengeç Dönencesi\'ne dik gelir. KYK En uzun gündüz (Yaz), GYK Kış.',
                    '21 Aralık: Güneş Oğlak Dönencesi\'ne dik gelir. GYK En uzun gündüz (Yaz), KYK Kış.',
                    '21 Mart & 23 Eylül: Ekinoks. Ekvator\'a dik gelir, tüm dünyada 12 saat gece = 12 saat gündüz.',
                    'Işık dik gelirse gölge boyu KISA, eğik gelirse gölge boyu UZUN olur.'
                ],
                'highlight': 'Dünya\'nın Güneş\'e uzaklığının mevsimlerin sıcaklığı ile HİÇBİR İLGİSİ YOKTUR!'
            },
            {
                'title': 'DNA ve Genetik Kod',
                'badge': 'KediGen Sıralaması',
                'points': [
                    'Kromozom: DNA + Özel protein kılıfı (İnsanda 46 kromozom).',
                    'DNA: Çift zincirli, sarmal yönetici molekül.',
                    'Gen: Anlamlı görev birimi (Göz rengi, kan grubu).',
                    'Nükleotid: En küçük yapı birimi (Fosfat + Şeker + Organik Baz).',
                    'Eşleşme: Adenin (A) = Timin (T) | Guanin (G) = Sitozin (C).'
                ],
                'highlight': 'Kromozom sayısının canlının gelişmişliği ile hiçbir ilişkisi yoktur.'
            }
        ],
        'comparisonTable': {
            'headers': ['Tarih', 'Güneş Işınlarının Dik Geldiği Yer', 'Kuzey Yarım Küre (Türkiye)', 'Güney Yarım Küre'],
            'rows': [
                ['21 Haziran', 'Yengeç Dönencesi', 'Yaz Başlangıcı (En uzun gündüz)', 'Kış Başlangıcı (En uzun gece)'],
                ['21 Aralık', 'Oğlak Dönencesi', 'Kış Başlangıcı (En uzun gece)', 'Yaz Başlangıcı (En uzun gündüz)'],
                ['21 Mart', 'Ekvator (Ekinoks)', 'İlkbahar Başlangıcı (12s Gece/Gündüz)', 'Sonbahar Başlangıcı (12s Gece/Gündüz)'],
                ['23 Eylül', 'Ekvator (Ekinoks)', 'Sonbahar Başlangıcı (12s Gece/Gündüz)', 'İlkbahar Başlangıcı (12s Gece/Gündüz)']
            ]
        }
    },
    # 8. SINIF T.C. İNKILAP TARİHİ
    {
        'id': 'info_8_inkilap_fikir_akimlari',
        'grade': 8,
        'subjectId': 'sosyal_bilgiler',
        'examTerm': '1_donem_1_yazili',
        'title': 'Osmanlı\'yı Kurtarma Fikir Akımları & Mustafa Kemal',
        'subtitle': '8. Sınıf T.C. İnkılap Tarihi ve Atatürkçülük 1. Yazılı Matrisi',
        'category': 'Bir Kahraman Doğuyor',
        'memoryHook': 'Balkanlar isyan etti: Osmanlıcılık bitti! Araplar İngilizle anlaştı: İslamcılık bitti! Millî Mücadele\'yi Türkçülük kazandı!',
        'summaryCards': [
            {
                'title': 'Osmanlı Fikir Akımları',
                'badge': 'Dağılmayı Önleme Çabaları',
                'points': [
                    'Osmanlıcılık: Din, dil, ırk farkı gözetmeksizin herkesi Osmanlı vatandaşı sayma. Balkan Savaşları ile çöktü.',
                    'İslamcılık (Ümmetçilik): Bütün Müslümanları halife sancağı altında birleştirme. I. Dünya Savaşı\'nda Arapların isyanıyla çöktü.',
                    'Türkçülük: Türk millî birliğini ve kültürünü canlandırma. Kurtuluş Savaşı\'nın temel fikri oldu.',
                    'Batıcılık: Batı\'nın bilim, fen ve medeniyet kurumlarını örnek alma.'
                ],
                'highlight': 'Mustafa Kemal tüm fikirleri sentezlemiş ancak akılcı ve millî olan Türkçülüğü temel almıştır.'
            },
            {
                'title': 'Mustafa Kemal\'in Şehirleri',
                'badge': 'Fikir Hayatının Doğuşu',
                'points': [
                    'Selanik: Çok uluslu liman ve demir yolu kenti (Hoşgörü ve Batı basınına erişim).',
                    'Manastır: Askerî İdadi yılları (Tarih ve edebiyat sevgisi, Namık Kemal, Mehmet Emin Yurdakul).',
                    'İstanbul: Harp Okulu ve Akademisi (Memleket meselelerini arkadaşlarıyla tartışma, gazete çıkarma).',
                    'Şam: İlk görev yeri (Vatan ve Hürriyet Cemiyeti\'ni kurma / Liderlik ve teşkilatçılık).'
                ],
                'highlight': 'Trablusgarp Savaşı Mustafa Kemal\'in ilk askerî başarısı ve teşkilatçılık tecrübesidir.'
            }
        ],
        'comparisonTable': {
            'headers': ['Fikir Akımı', 'Temel Hedefi', 'Önemli Temsilcileri', 'Geçerliliğini Yitirme Sebebi'],
            'rows': [
                ['Osmanlıcılık', 'Tüm tebaayı eşit yurttaş yapma', 'Genç Osmanlılar, Mithat Paşa', 'Balkan uluslarının isyan edip ayrılması'],
                ['İslamcılık', 'Müslümanları halife etrafında toplama', 'II. Abdülhamid, Mehmet Akif Ersoy', 'Arapların I. Dünya Savaşı\'nda İngilizlerle iş birliği'],
                ['Türkçülük', 'Türk milletinin birlik ve bilincini sağlama', 'Ziya Gökalp, Mehmet Emin Yurdakul', 'Millî Mücadele\'nin başarıya ulaşmasını sağladı'],
                ['Batıcılık', 'Batı\'nın bilim ve yönetimini uygulama', 'Tevfik Fikret, Abdullah Cevdet', 'Taklitçilik düzeyinde kalması, halka inememesi']
            ]
        }
    },
    # 8. SINIF DİN KÜLTÜRÜ
    {
        'id': 'info_8_din_evrensel_yasalar',
        'grade': 8,
        'subjectId': 'din_kulturu',
        'examTerm': '1_donem_1_yazili',
        'title': 'Kader İnancı ve Evrensel Yasalar (Sünnetullah)',
        'subtitle': '8. Sınıf Din Kültürü 1. Yazılı / LGS Odaklı Bilgi Tablosu',
        'category': 'Kader İnancı',
        'memoryHook': 'Madde ve Enerji = Fiziksel! Canlı ve Organik = Biyolojik! Toplum ve Ahlak/Adalet = Toplumsal!',
        'summaryCards': [
            {
                'title': 'Kader ve Kaza Dengesi',
                'badge': 'Plan vs. Uygulama',
                'points': [
                    'Kader: Allah\'ın her şeyi önceden bir ölçü ve yasaya göre belirlemesidir (Evrenin ilahi yazılımı).',
                    'Kaza: Takdir edilen planın zamanı gelince gerçekleşmesidir (Fiili oluş anı).',
                    'Tevekkül: Gerekli tüm insani tedbirleri aldıktan sonra sonucu Allah\'a havale edip güvenmektir.'
                ],
                'highlight': '"Deveni sağlam kazığa bağla, sonra Allah\'a tevekkül et" hadisi tevekkülün temel şartıdır.'
            },
            {
                'title': 'Evrenin 3 Temel Yasası',
                'badge': 'Sünnetullah / Âdetullah',
                'points': [
                    'Fiziksel Yasalar: Suyun kaldırma kuvveti, yer çekimi, gece-gündüz, gezegenlerin yörüngeleri.',
                    'Biyolojik Yasalar: Fotosentez, balıkların solungaç yapısı, üreme, etobur ve otobur sindirimi.',
                    'Toplumsal Yasalar: Adaletin barışı getirmesi, zulmün çöküşe yol açması, göçler ve dayanışma.'
                ],
                'highlight': 'Toplumsal yasalar sosyolojik neden-sonuç kurallarıdır ve Kur\'an\'da sıkça örneklenir.'
            }
        ],
        'comparisonTable': {
            'headers': ['Yasa Türü', 'Kapsamı', 'Özelliği', 'Ayet / Somut Örnek'],
            'rows': [
                ['Fiziksel Yasa', 'Madde ve Enerji', 'Evrensel, deney ve gözlemle ispatlanır', '"Güneş ve Ay bir hesaba göre hareket eder." (Rahmân, 5)'],
                ['Biyolojik Yasa', 'Canlılar ve Hayat', 'Canlının yapısı, beslenmesi ve üremesi', '"O, insanı bir kan pıhtısından (embriyo) yarattı." (Alak, 2)'],
                ['Toplumsal Yasa', 'İnsan Toplulukları', 'Huzur, adalet, güven ve ahlaki kurallar', '"Şüphesiz ki bir kavim kendi durumunu değiştirmedikçe Allah onları değiştirmez." (Ra\'d, 11)']
            ]
        }
    }
]

print("Materials definitions ready.")

# ==============================================================================
# 6. EXPORT LOGIC
# ==============================================================================

# 1. STUDY SHEETS
# Read existing 7th grade sheets from src/data/studySheets.ts
with open('src/data/studySheets.ts', 'r', encoding='utf-8') as f:
    orig_ts = f.read()

# We know existing 7th grade sheets are in orig_ts. Let's merge GRADE_5_SHEETS + GRADE_6_SHEETS + existing 7th grade + GRADE_8_SHEETS
# To safely preserve existing 7th grade, let's load them or regex extract them, or parse JSON-like.
# Actually, let's parse the existing 6 objects of Grade 7:
import re
# Let's write a python snippet that extracts the existing items or reads them cleanly:
# Let's inspect how many sheets in orig_ts:
