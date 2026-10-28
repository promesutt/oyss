import json

new_sheets = [
    # 5. SINIF MATEMATİK
    {
        'id': 'study_5_mat_1_1_senaryo_1',
        'grade': 5,
        'subjectId': 'matematik',
        'examTerm': '1_donem_1_yazili',
        'scenarioId': 'senaryo_1',
        'title': '5. Sınıf Matematik 1. Yazılı MEBİ Hap Bilgili Çalışma Kağıdı (Geometri ve Açılar)',
        'sections': [
            {
                'outcomeCode': 'MAT.5.3.1',
                'topicTitle': 'Temel Geometrik Çizimler, Doğru, Doğru Parçası ve Işın',
                'quickNotes': [
                    'Doğru: Her iki yönden sonsuza kadar giden noktalar kümesidir [AB doğrusu veya d doğrusu]. Başlangıcı ve sonu yoktur, boyu ölçülemez.',
                    'Işın: Başlangıç noktası sabit olup tek bir yönde sonsuza uzanan noktalar kümesidir [AB ışını: [AB].',
                    'Doğru Parçası: İki nokta arasında kalan sınırlı düz çizgi parçasıdır [AB doğru parçası: [AB]]. Uzunluğu ölçülebilir.',
                    'Paralel Doğrular: Aynı düzlemde olan ve hiçbir zaman kesişmeyen doğrulardır (d // k).'
                ],
                'examTraps': [
                    'TUZAK: Işının boyu cetvelle ölçülemez çünkü bir ucu sonsuza kadar uzanır! Yalnızca iki ucu da sınırlı olan doğru parçalarının uzunluğu ölçülebilir.'
                ],
                'solvedExample': {
                    'question': 'Bir el fenerinden çıkan ışık demeti ile gergin bir ip modellerinden hangisi ışın, hangisi doğru parçası modelidir? Açıklayınız.',
                    'analysis': 'Başlangıç ve bitiş noktalarının sınırlı olup olmadığını belirler.',
                    'solution': 'El feneri bir noktadan başlayıp uzaya doğru yayıldığı için IŞIN modelidir. Gergin ip ise iki ucundan tutulduğu ve sınırlı olduğu için DOĞRU PARÇASI modelidir.'
                },
                'practiceQuestion': {
                    'question': 'Bir cetvel üzerindeki 2 cm ile 7 cm arasındaki çizgi hangi geometrik kavrama örnektir ve uzunluğu kaç cm\'dir?',
                    'hint': 'Başlangıcı ve bitişi belirli olduğu için doğru parçasıdır; farkı hesaplayınız.'
                }
            },
            {
                'outcomeCode': 'MAT.5.3.3',
                'topicTitle': 'Açı Çeşitleri ve İletki (Açıölçer) ile Ölçüm',
                'quickNotes': [
                    'Dar Açı: Ölçüsü 0° ile 90° arasında olan açılardır.',
                    'Dik Açı: Ölçüsü tam olarak 90° olan açıdır (∟ sembolü ile gösterilir).',
                    'Geniş Açı: Ölçüsü 90° ile 180° arasında olan açılardır.',
                    'Doğru Açı: Ölçüsü tam olarak 180° olan açıdır.'
                ],
                'examTraps': [
                    'PÜF NOKTA: Saat 03.00\'te akrep ile yelkovan dik açı (90°) oluşturur. Saat 03.10\'da ise açı daralır ve dar açıya dönüşür.'
                ],
                'solvedExample': {
                    'question': 'Ölçüsü 89° olan açı ile ölçüsü 91° olan açının türlerini yazınız.',
                    'analysis': '90° referans değerine göre sınıflandırma yapılır.',
                    'solution': '89° < 90° olduğu için DAR AÇI; 91° > 90° olduğu için GENİŞ AÇI\'dır.'
                },
                'practiceQuestion': {
                    'question': 'Bir doğru açının ölçüsü, dik açının ölçüsünün kaç katıdır?',
                    'hint': 'Doğru açı 180°, dik açı 90°\'dir.'
                }
            }
        ]
    },
    # 5. SINIF FEN BİLİMLERİ
    {
        'id': 'study_5_fen_1_1_senaryo_1',
        'grade': 5,
        'subjectId': 'fen_bilimleri',
        'examTerm': '1_donem_1_yazili',
        'scenarioId': 'senaryo_1',
        'title': '5. Sınıf Fen Bilimleri 1. Yazılı MEBİ Hap Bilgili Çalışma Kağıdı (Güneş, Dünya ve Ay)',
        'sections': [
            {
                'outcomeCode': 'FB.5.1.1',
                'topicTitle': 'Güneş\'in Yapısı ve Dönme Hareketi',
                'quickNotes': [
                    'Güneş küresel şekle sahiptir ve orta büyüklükte sarı bir yıldızdır.',
                    'Güneş\'in yapısında yaklaşık %73 Hidrojen ve %25 Helyum gazı bulunur.',
                    'Güneş de Dünya gibi kendi ekseni etrafında batıdan doğuya (saat yönünün tersine) döner. Bunu üzerindeki "Güneş lekeleri"nin kaymasından anlıyoruz (Galileo keşfetmiştir).',
                    'Büyüklük Karşılaştırması: Güneş dev bir basketbol topu ise, Dünya bir nohut tanesi, Ay ise bir mercimek tanesidir.'
                ],
                'examTraps': [
                    'TUZAK: "Güneş uzayda tamamen sabittir ve hiç hareket etmez" demek YANLIŞTIR. Kendi ekseni etrafında dönme hareketi yapar.'
                ],
                'solvedExample': {
                    'question': 'Galileo Galilei teleskobuyla Güneş\'i incelerken Güneş lekelerinin her gün aynı yöne doğru kaydığını görmüştür. Bu gözlem Güneş hakkında neyi kanıtlar?',
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
                    'Ay\'ın 3 Türlü Hareketi Vardır: 1) Kendi ekseni etrafında döner, 2) Dünya etrafında dolanır, 3) Dünya ile birlikte Güneş etrafında dolanır.',
                    'Neden Ay\'ın Hep Aynı Yüzünü Görürüz? Çünkü Ay\'ın kendi etrafında dönme süresi ile Dünya etrafında dolanma süresi birbirine eşittir (yaklaşık 27.3 gün).',
                    'Ay\'ın 4 Ana Evresi: Yeniay (Karanlık) → İlk Dördün ("D" harfi) → Dolunay (Tam aydınlık) → Son Dördün (Ters "D" harfi). Her ana evre arası yaklaşık 1 haftadır (7 gün).'
                ],
                'examTraps': [
                    'PÜF NOKTA: Yeniay evresinde Ay, Dünya ile Güneş arasındadır ve Dünya\'ya bakan yüzü ışık almadığı için gökyüzünde görünmez.'
                ],
                'solvedExample': {
                    'question': 'Gökyüzüne bakan bir öğrenci Ay\'ı düz "D" harfi şeklinde aydınlık görmüştür. Ay hangi ana evrededir ve 1 hafta sonra hangi evre görülecektir?',
                    'analysis': 'Evrelerin şekilsel özellikleri ve kronolojik ardışıklığı incelenir.',
                    'solution': 'Ay "D" şeklinde göründüğünde İLK DÖRDÜN evresindedir. 1 hafta (7 gün) sonraki ana evre DOLUNAY olacaktır.'
                },
                'practiceQuestion': {
                    'question': 'Dolunay evresinden 2 hafta sonra gökyüzünde hangi ana evre görülür?',
                    'hint': 'Dolunay → (1 hafta) Son Dördün → (1 hafta) ? sıralamasını takip et.'
                }
            }
        ]
    },
    # 6. SINIF MATEMATİK
    {
        'id': 'study_6_mat_1_1_senaryo_1',
        'grade': 6,
        'subjectId': 'matematik',
        'examTerm': '1_donem_1_yazili',
        'scenarioId': 'senaryo_1',
        'title': '6. Sınıf Matematik 1. Yazılı MEBİ Hap Bilgili Çalışma Kağıdı (Çarpanlar ve Bölünebilme)',
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
                    'question': 'Alanı 40 cm² olan bir dikdörtgenin kenar uzunlukları santimetre cinsinden birer doğal sayı ise çevre uzunluğunun alabileceği en küçük değer kaçtır?',
                    'hint': 'Birbirine en yakın çarpanları (5 ve 8) seçerek çevreyi hesaplayınız.'
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
                    '6 ile Bölünme: Hem 2\'ye hem de 3\'e aynı anda bölünebilen sayılar 6\'ya da kalansız bölünür.',
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
                    'hint': 'Hem 2 hem 5\'e bölünmenin ortak şartı son basamağın kaç olması gerektiğidir?'
                }
            }
        ]
    },
    # 8. SINIF MATEMATİK
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
                    'hint': 'Önce EBOB(18, 24)\'ü bularak ağaç aralığını, ardından Çevre / EBOB ile ağaç sayısını bulunuz.'
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
                    'hint': '4 = 2² ve 8 = 2³ yazarak üssün üssü kuralını uygulayınız.'
                }
            }
        ]
    },
    # 8. SINIF FEN BİLİMLERİ
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
                    'hint': 'Mevsimlerin oluşmayacağını ve yıl boyu 12 saat gece - 12 saat gündüz eşitliği olacağını açıklayınız.'
                }
            }
        ]
    },
    # 8. SINIF T.C. İNKILAP TARİHİ VE ATATÜRKÇÜLÜK
    {
        'id': 'study_8_sosyal_bilgiler_1_1_senaryo_1',
        'grade': 8,
        'subjectId': 'sosyal_bilgiler',
        'examTerm': '1_donem_1_yazili',
        'scenarioId': 'senaryo_1',
        'title': '8. Sınıf T.C. İnkılap Tarihi ve Atatürkçülük 1. Yazılı Çalışma Kağıdı (Bir Kahraman Doğuyor)',
        'sections': [
            {
                'outcomeCode': 'İTA.8.1.1',
                'topicTitle': '20. Yüzyıl Başlarında Osmanlı Devleti ve Fikir Akımları',
                'quickNotes': [
                    'Sanayi İnkılabı: Sömürgecilik yarışını ve hammadde arayışını başlattı; I. Dünya Savaşı\'nın temel ekonomik sebebidir.',
                    'Fransız İhtilali: Milliyetçilik akımını yaydı; çok uluslu Osmanlı İmparatorluğu\'nda azınlık isyanlarına ve toprak kayıplarına yol açtı.',
                    'Osmanlı\'yı Dağılmaktan Kurtarma Çabaları (Fikir Akımları):',
                    '• Osmanlıcılık: Din, dil, ırk ayrımı gözetmeksizin tüm tebaayı eşit yurttaş sayma (Tanzimat, Islahat, Meşrutiyet).',
                    '• İslamcılık (Ümmetçilik): Tüm Müslümanları halife etrafında birleştirme (II. Abdülhamid dönemi).',
                    '• Türkçülük (Turancılık): Türk milletinin milli değerlerine dayanarak birliği sağlama (Ziya Gökalp, İttihatçılar).',
                    '• Batıcılık: Batı\'nın bilim, fen ve kurumlarını örnek alma (Tevfik Fikret).'
                ],
                'examTraps': [
                    'PÜF NOKTA: Arapların I. Dünya Savaşı\'nda İngilizlerle iş birliği yapması İSLAMCILIK fikrinin; Balkan Savaşları\'nda Hristiyan tebaanın isyan etmesi ise OSMANLICILIK fikrinin çöktüğünü gösterir.'
                ],
                'solvedExample': {
                    'question': 'Selanik şehrinin çok uluslu yapısı ve zengin demir yolu-liman ağı Mustafa Kemal\'in fikir hayatını nasıl etkilemiştir?',
                    'analysis': 'Selanik\'in jeopolitik ve kültürel ortamının kişilik gelişimine yansıması incelenir.',
                    'solution': 'Farklı kültür ve dinleri bir arada görerek hoşgörü ve zengin bir vizyon kazanmasını sağlamış; Avrupa\'daki gazete ve yayınlara hızlı erişimi ise Batı dünyasındaki fikir akımlarını yakından takip etmesine zemin hazırlamıştır.'
                },
                'practiceQuestion': {
                    'question': 'Mustafa Kemal\'in Şam\'da "Vatan ve Hürriyet Cemiyeti"ni kurması onun hangi kişilik özelliklerini ortaya koyar?',
                    'hint': 'Liderlik, vatanseverlik ve teşkilatçılık özelliklerini belirtiniz.'
                }
            }
        ]
    }
]

with open('meb_data/new_study_sheets.json', 'w', encoding='utf-8') as f:
    json.dump(new_sheets, f, ensure_ascii=False, indent=2)

print('Saved new_study_sheets.json successfully!')
