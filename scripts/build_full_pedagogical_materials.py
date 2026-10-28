# -*- coding: utf-8 -*-
"""
Builds:
1. src/data/outcomeStudyBank.ts
2. src/data/studySheets.ts (all 4 grades)
3. src/data/infographics.ts (all 4 grades)
4. src/data/speakingGuides.ts (all 4 grades)
"""
import json
import re

with open('meb_data/all_middle_school_exams.json', 'r', encoding='utf-8') as f:
    all_exams = json.load(f)

with open('meb_data/all_middle_school_outcomes.json', 'r', encoding='utf-8') as f:
    all_outcomes = json.load(f)

# Index questions by outcomeCode and grade
q_by_code = {}
for ex in all_exams:
    g = ex['grade']
    s = ex['subjectId']
    for q in ex['questions']:
        code = q['outcomeCode']
        if code not in q_by_code:
            q_by_code[code] = (g, s, q)

# Knowledge dictionary of detailed pedagogical notes and traps for curriculum topics
TOPIC_KNOWLEDGE = {
    # TÜRKÇE
    'T.O.5.5': {
        'topic': 'Kelimenin Gerçek ve Mecaz Anlamını Ayırt Etme',
        'notes': [
            'Gerçek (Temel) Anlam: Sözcüğün akla gelen ilk, somut ve herkesçe bilinen temel anlamıdır (Örn: "Çocuk soğuktan dondu").',
            'Mecaz Anlam: Sözcüğün gerçek anlamından bütünüyle sıyrılarak kazandığı yeni, soyut ve duygusal anlamdır (Örn: "Bize çok soğuk davrandı").',
            'Bağlam Analizi: Bir kelimenin gerçek mi mecaz mı olduğu ancak cümle içindeki kullanımına bakılarak anlaşılabilir.'
        ],
        'traps': [
            'DİKKAT: Cümlede abartı veya duygu bulunması her zaman mecaz yapmaz. Somut fiziksel durumlar daima gerçek anlamdır.'
        ],
        'practice': {
            'q': '"Yıllardır biriktirdiği altınlar evde yandı." ve "Biletini kaybedince konsere gitme şansı yandı." cümlelerindeki "yandı" sözcüklerinin anlam özelliklerini yazınız.',
            'hint': 'Birincisi fiziksel alev almadır (gerçek), ikincisi ise bir fırsatı kaybetme anlamında soyuttur (mecaz).'
        }
    },
    'T.O.5.6': {
        'topic': 'Metnin Yüzey Anlamı ve Olay Örgüsü',
        'notes': [
            'Yüzey Anlam: Metinde doğrudan doğruya açıkça söylenen, gizli olmayan ve satır aralarında aranmayan apaçık bilgidir.',
            '5N1K Kuralı: Metindeki olay örgüsünü kavramak için "Kim, Ne, Nerede, Ne zaman, Nasıl, Neden" soruları metne yöneltilir.',
            'Karakter ve Zaman Analizi: Hikâye unsurlarının tespiti metnin doğru anlaşılmasını sağlar.'
        ],
        'traps': [
            'TUZAK: Yüzey anlam sorularında kendi yorumunuzu veya tahmininizi değil, sadece metinde açıkça yazılı olan delilleri kullanınız.'
        ],
        'practice': {
            'q': 'Okuduğunuz hikâyede olay nerede ve günün hangi saatinde geçmektedir? Metinden iki kanıt bularak yazınız.',
            'hint': 'Metinde geçen mekân ve zaman zarflarını doğrudan arayınız.'
        }
    },
    'T.O.5.7': {
        'topic': 'Metnin Derin Anlamı ve Çıkarım Yapma',
        'notes': [
            'Örtük Anlam: Metinde doğrudan söylenmeyen ancak ipuçlarından hareketle okuyucunun akıl yürüterek ulaştığı gizli anlamdır.',
            'Duygu ve Durum Çıkarımı: Kahramanın jest, mimik ve konuşma tarzı onun iç dünyasını (üzüntü, pişmanlık, heyecan) ele verir.',
            'Neden-Sonuç İlişkisi: Metindeki olayların arka planındaki asıl psikolojik nedenleri tahlil etme.'
        ],
        'traps': [
            'PÜF NOKTA: Çıkarım yaparken metinle hiçbir ilgisi olmayan serbest hayallere kapılmayın; çıkarımınız mutlaka metindeki bir söze dayanmalıdır.'
        ],
        'practice': {
            'q': 'Kahramanın "Gözlerini kapıdan bir saniye bile ayıramıyordu" ifadesinden hareketle onun psikolojik durumu hakkında bir çıkarım yapınız.',
            'hint': 'Sabırsızlık, korkulu bir bekleyiş veya endişe duygularını düşününüz.'
        }
    },
    'T.O.5.15': {
        'topic': 'Metnin Konusu ve Ana Fikrini Belirleme',
        'notes': [
            'Metnin Konusu: "Yazar bu metinde neden bahsediyor / ne anlatıyor?" sorusunun yanıtıdır (genelde 2-4 kelimelik ifadedir).',
            'Ana Fikir: "Yazarın okuyucuya vermek istediği temel ders, öğüt veya sonuç nedir?" sorusunun tam bir cümlelik cevabıdır.',
            'Başlık İlişkisi: Başlık hem konuyu hem ana fikri çağrıştıran vurucu bir slogandır.'
        ],
        'traps': [
            'TUZAK: "Doğa sevgisi" bir konudur, ana fikir olamaz. "Doğayı korumak insanlığın geleceğini kurtarır" ise bir ana fikirdir.'
        ],
        'practice': {
            'q': '"Dostluk fidana benzer; ilgilenmezsen kurur." Bu özdeyişin ana fikrini tek bir cümleyle yazınız.',
            'hint': 'Dostlukların devamı için karşılıklı sevgi ve emeğin şart olduğunu belirtiniz.'
        }
    },
    'T.O.5.20': {
        'topic': 'Söz Sanatları: Kişileştirme ve Benzetme',
        'notes': [
            'Benzetme (Teşbih): Aralarında ortak özellik bulunan iki varlıktan zayıf olanın güçlü olana benzetilmesidir (Benzeyen, Benzetilen, Benzetme Edatı, Benzetme Yönü).',
            'Kişileştirme (Teşhis): İnsana ait düşünme, ağlama, sevinme, konuşma gibi özelliklerin insan dışındaki canlı veya cansız varlıklara aktarılmasıdır.'
        ],
        'traps': [
            'PÜF NOKTA: "Gibi" veya "kadar" edatı olan her cümle benzetme olabilir; ancak kişileştirmede mutlaka insana özgü bir fiil (hüzünlenmek, fısıldamak) doğaya aktarılmalıdır.'
        ],
        'practice': {
            'q': '"Koca çınar derdine yanan bir dede gibi iç çekiyordu." Bu cümledeki söz sanatını unsurlarıyla gösteriniz.',
            'hint': 'Hem benzetme (çınar - dede) hem kişileştirme (iç çekmek) bir aradadır.'
        }
    },
    'T.Y.5.3': {
        'topic': 'Yazım Kuralları ve Büyük Harflerin Kullanımı',
        'notes': [
            'Özel İsimler: Kişi adları, soyadları, ülke, şehir, kurum ve kuruluş adları daima büyük harfle başlar.',
            'Kurum ve Kuruluş Ekleri: Kurum, kuruluş ve kurul adlarına gelen ekler kesme işaretiyle AYRILMAZ (Örn: "Türkiye Büyük Millet Meclisine", "Milli Eğitim Bakanlığında").',
            'Tarihlerin Yazımı: Belirli bir tarih bildiren gün ve ay adları büyük harfle yazılır (Örn: "19 Mayıs 1919 Pazartesi günü").'
        ],
        'traps': [
            'EN ÇOK YAPILAN HATA: Kurum isimlerine gelen ekleri kesmeyle ayırmayınız! "Türk Dil Kurumu\'ndan" YANLIŞ; "Türk Dil Kurumundan" DOĞRUDUR.'
        ],
        'practice': {
            'q': '"atatürk ortaokulu müdürlüğüne dilekçe verdi." cümlesindeki yazım yanlışlarını düzeltiniz.',
            'hint': 'Özel kurum adı olduğu için tüm kelimeler büyük harfle başlamalıdır.'
        }
    },
    'T.Y.5.13': {
        'topic': 'Noktalama İşaretleri: Virgül, Noktalı Virgül ve İki Nokta',
        'notes': [
            'Virgül (,): Eş görevli sözcükleri ayırır, sıralı cümleleri bağlar, hitap sözlerinden sonra konur.',
            'Noktalı Virgül (;): İçinde virgül bulunan tür ve takımları ayırmak veya virgülle ayrılmış sıralı cümleleri bağlamak için kullanılır.',
            'İki Nokta (:): Kendisinden sonra açıklama yapılacak veya örnek verilecek cümlenin sonuna konur.'
        ],
        'traps': [
            'PÜF NOKTA: İki noktadan sonra gelen kısım tam bir cümle ise büyük harfle, sadece örnekler sıralanıyorsa küçük harfle başlar.'
        ],
        'practice': {
            'q': '"Pazardan elma armut kiraz aldım marketten peynir zeytin süt aldım" cümlesine uygun noktalama işaretlerini yerleştiriniz.',
            'hint': 'Meyveler ile kahvaltılıklar iki farklı gruptur; aralarına noktalı virgül (;) gelmelidir.'
        }
    },
    'T.Y.5.16': {
        'topic': 'Düşünceyi Geliştirme Yolları: Tanımlama ve Örnekleme',
        'notes': [
            'Tanımlama: "Bu nedir?" sorusunun yanıtıdır. Kavramın temel niteliklerini açıklar (Örn: "Şiir, duyguların ahenkli sözcüklerle aktarılması sanatıdır").',
            'Örnekleme: Soyut bir düşünceyi somutlaştırmak ve anlaşılır kılmak için bilinen kişi, eser veya durumlardan örnekler vermektir.'
        ],
        'traps': [
            'TUZAK: Her açıklama tanımlama değildir. Cümle mutlaka "...denir" veya "...dır/dir" ile bitmeli ve kavramın ne olduğunu netleştirmelidir.'
        ],
        'practice': {
            'q': '"Erozyon, toprağın rüzgâr ve su ile taşınmasıdır." cümlesinde hangi düşünceyi geliştirme yolu kullanılmıştır?',
            'hint': '"Erozyon nedir?" sorusuna tam cevap verildiği için Tanımlamadır.'
        }
    },

    # 7. SINIF TÜRKÇE
    'T.O.7.4': {
        'topic': 'Metinde Anlam ve Bağlam Analizi',
        'notes': [
            'Sözcüğün Bağlamsal Anlamı: Metnin bütünü içindeki felsefi, kültürel veya terimsel derinliğini yakalama.',
            'Metin Tahlili: Metnin anahtar kelimelerini belirleyerek yazarın ana düşüncesine ulaşma.'
        ],
        'traps': ['Sözlüğün ilk anlamını değil, metnin bütününe oturan anlamını seçiniz.'],
        'practice': {
            'q': 'Metindeki "mefkûre" sözcüğünün yerine günümüz Türkçesinden hangi sözcük getirilebilir?',
            'hint': 'Ülkü, ideal veya gaye sözcüklerini düşününüz.'
        }
    },
    'T.O.7.5': {
        'topic': 'Deyim ve Atasözlerinin Metne Katkısı',
        'notes': [
            'Deyimler: Genellikle mecaz anlamlı, en az iki sözcükten oluşan kalıplaşmış anlatım kalıplarıdır.',
            'Atasözleri: Uzun tecrübelere dayanan, ders ve öğüt veren atalar sözüdür.'
        ],
        'traps': ['Deyimlerdeki sözcüklerin eş anlamlıları dahi olsa yeri değiştirilemez.'],
        'practice': {
            'q': '"Göğsü kabarmak" deyiminin anlamına uygun bir cümle yazınız.',
            'hint': 'Haklı bir övünç, gurur ve sevinç duyma durumudur.'
        }
    },
    'T.O.7.7': {
        'topic': 'Söz Sanatları: Tezat (Karşıtlık) ve Abartma (Mübalağa)',
        'notes': [
            'Tezat: Anlamı güçlendirmek için birbirine zıt kavramların (gece-gündüz, ağlamak-gülmek) bir arada kullanılmasıdır.',
            'Abartma: Bir durumu olduğundan çok daha büyük veya çok daha küçük göstererek dikkat çekme sanatıdır.'
        ],
        'traps': ['Her olumsuz sözcük tezat değildir; "geldi-gelmedi" tezat değil olumsuzluktur. "Gülmek-ağlamak" ise tezattır.'],
        'practice': {
            'q': '"Bir ah çeksem dağı taşı eritir" dizesindeki söz sanatını yazınız.',
            'hint': 'Olağanüstü büyütme olduğu için Abartmadır.'
        }
    },
    'T.O.7.8': {
        'topic': 'Metnin Ana Düşüncesi ve Yardımcı Fikirleri',
        'notes': [
            'Ana Fikir: Metnin omurgasını oluşturan, yazarın okuyucuyu ikna etmek istediği evrensel mesajdır.',
            'Yardımcı Düşünceler: Ana fikri besleyen, örnekleyen ve kanıtlayan yan yargılardır.'
        ],
        'traps': ['Paragraftaki tek bir cümleye takılmayın; metnin bütününden çıkan genel sonucu bulunuz.'],
        'practice': {
            'q': 'İletişimde dinlemenin önemini anlatan bir metnin ana fikri ne olabilir?',
            'hint': 'İyi bir hatip olmanın ilk şartının iyi bir dinleyici olmak olduğunu vurgulayınız.'
        }
    },
    'T.O.7.14': {
        'topic': 'Metinle İlgili Soruları Cevaplama ve Çıkarım',
        'notes': [
            'Doğrudan Bilgi: Metinde açıkça yazan veriler.',
            'Yoruma Dayalı Bilgi: Karakterlerin psikolojisinden ve olayların gelişiminden ulaşılan mantıksal sonuçlar.'
        ],
        'traps': ['Metin dışı kişisel ön yargılarınızı cevaba karıştırmayınız.'],
        'practice': {
            'q': 'Yazarın teknolojiyi iki ucu keskin bir bıçağa benzetmesinin gerekçesi nedir?',
            'hint': 'Hem hayatı kolaylaştırdığı hem de bağımlılık yaptığı için.'
        }
    },
    'T.O.7.15': {
        'topic': 'Metne Dayalı Nitelikli Sorular Sorma',
        'notes': [
            'Açık Uçlu Soru: Cevabı "evet/hayır" olmayan, neden-nasıl analizini sorgulayan sorulardır.',
            'Kritik Düşünme: Metindeki fikirlerin sağlamlığını ölçen derin sorular kurabilme.'
        ],
        'traps': ['Soru sadece metindeki bir kelimeyi sormamalı; ana düşünceyi tartışmaya açmalıdır.'],
        'practice': {
            'q': 'Misafirperverlik metnine yönelik düşündürücü bir analiz sorusu yazınız.',
            'hint': '"Geleneksel misafirperverliğin modern çağda zayıflamasının sebepleri nelerdir?" gibi bir soru.'
        }
    },
    'T.O.7.21': {
        'topic': 'Metin Türleri: Söyleşi (Sohbet) ve Fıkra (Köşe Yazısı)',
        'notes': [
            'Söyleşi (Sohbet): Yazarın okuyucuyla karşılıklı konuşuyormuş gibi içten, samimi bir dille yazdığı fikir yazısıdır ("Siz de böyle düşünmez misiniz?").',
            'Fıkra (Köşe Yazısı): Günlük siyasi, sosyal olayları günübirlik olarak ele alan, kanıtlama kaygısı gütmeyen gazete yazısıdır.'
        ],
        'traps': ['Mizahi fıkra (Nasreddin Hoca fıkrası) ile gazete köşe yazısı olan fıkrayı karıştırmayınız!'],
        'practice': {
            'q': 'Bir metnin "Söyleşi" olduğunu gösteren en belirgin 2 üslup özelliğini yazınız.',
            'hint': 'Okuyucuya sorular sorması ve samimi bir "senli benli" dil kullanması.'
        }
    },
    'T.Y.7.3': {
        'topic': 'Fiillerde Anlam (Zaman) Kayması',
        'notes': [
            'Tanım: Fiilin aldığı kip ekiyle, cümlede kastettiği zamanın birbirine uymaması durumudur.',
            'Örnek: "Fatih Sultan Mehmet 1453\'te İstanbul\'u fetheder." (Geniş zaman eki -r almış, ancak geçmiş zaman kastedilmiştir).',
            'Dil Bilgisi Durumu: Anlam kayması bir anlatım bozukluğu DEĞİLDİR; Türkçenin anlatım zenginliğidir.'
        ],
        'traps': ['TUZAK: Anlam kaymasını anlatım bozukluğu saymayınız! Kesinlikle bozukluk değildir.'],
        'practice': {
            'q': '"Yarın erkenden Ankara\'ya gidiyorum." cümlesindeki anlam kaymasını açıklayınız.',
            'hint': 'Şimdiki zaman eki (-iyor) gelecek zaman anlamında kullanılmıştır.'
        }
    },
    'T.Y.7.18': {
        'topic': 'Ek Fiil (Ek Eylem) ve Görevleri',
        'notes': [
            'Ek Fiil Kökü: "i- (imek)" fiilidir (idi, imiş, ise, -dir).',
            '1. Görevi: İsim ve isim soylu sözcüklere gelerek onları cümlede YÜKLEM yapar (Örn: "Hava bugün çok güzel-di").',
            '2. Görevi: Basit zamanlı fiillere gelerek onları BİRLEŞİK ZAMANLI fiil yapar (Örn: okuyor-du -> Hikâye, okur-sa -> Şart).'
        ],
        'traps': ['İsim yüklem olmuşsa orada MUTLAKA ek fiil vardır! "Geniş zaman 3. tekil eki olan -dir bazen düşebilir: "O çok çalışkan(dır)".'],
        'practice': {
            'q': '"Kitap en sadık dosttur." cümlesinde ek fiil var mıdır? Görevini yazınız.',
            'hint': 'Dost ismine gelen "-tur" ek fiilin geniş zamanıdır ve ismi yüklem yapmıştır.'
        }
    },
    'T.Y.7.21': {
        'topic': 'Anlatım Biçimleri ve Düşünceyi Geliştirme Yolları',
        'notes': [
            'Öyküleme: Olay, kişi, yer ve zaman akışı vardır (film şeridi gibi hareketlidir).',
            'Betimleme: Kelimelerle resim çizme sanatıdır (durgun fotoğraf gibidir, sıfatlar yoğundur).',
            'Açıklama: Bilgi vermek, öğretmek amacıyla nesnel yazılır.',
            'Tartışma: Yazar karşıt bir fikri çürütüp kendi görüşünü okuyucuya benimsetmeye çalışır.'
        ],
        'traps': ['Hareket ve olay varsa öykülemedir; sadece görünüş tasvir ediliyorsa betimlemedir.'],
        'practice': {
            'q': 'Bir odanın eşyalarını renk ve konumlarıyla anlatan parçanın anlatım biçimi nedir?',
            'hint': 'Durgun tasvir ve niteleme sıfatları olduğu için Betimlemedir.'
        }
    },

    # MATEMATİK 7. SINIF
    'MAT.7.1.1': {
        'topic': 'Tam Sayılarla Toplama ve Çıkarma İşlemleri',
        'notes': [
            'İşaret Kuralı (Toplama): Aynı işaretliler toplanır, ortak işaret yazılır: (+5) + (+3) = +8; (-4) + (-6) = -10.',
            'Farklı İşaretliler: Mutlak değeri büyük olandan küçük çıkarılır, büyüğün işareti verilir: (-9) + (+4) = -5.',
            'Çıkarma Kuralı: Çıkarma işlemi çıkan sayının işareti değiştirilerek toplama işlemine dönüştürülür: A - B = A + (-B).',
            'Modelleme: Sayma pullarında (+ pul) ve (- pul) bir araya gelince "sıfır çifti" oluşturur.'
        ],
        'traps': [
            'EN KRİTİK TUZAK: Parantez önündeki eksi işareti içerideki sayının işaretini tersine çevirir! - (-7) = +7 olur.'
        ],
        'practice': {
            'q': '(-18) - (-24) + (-10) işleminin sonucunu işlem basamaklarıyla hesaplayınız.',
            'hint': '- (-24) ifadesini +24 yapıp soldan sağa toplayınız: -18 + 24 = +6; +6 - 10 = -4.'
        }
    },
    'MAT.7.1.2': {
        'topic': 'Tam Sayılarla Çarpma ve Bölme İşlemleri',
        'notes': [
            'Çarpma ve Bölme İşaret Kuralları:\n• (+) × (+) = (+)\n• (-) × (-) = (+)\n• (+) × (-) = (-)\n• (-) × (+) = (-)',
            'Aynı işaretli iki tam sayının çarpımı ve bölümü daima POZİTİFTİR.',
            'Ters işaretli iki tam sayının çarpımı ve bölümü daima NEGATİFTİR.',
            'Sıfır Kuralları: Sıfırın bir sayıya bölümü 0\'dır (0 / 5 = 0); ancak bir sayının sıfıra bölümü TANIMSIZDIR (5 / 0 tanımsız).'
        ],
        'traps': [
            'TUZAK: Çift sayıda negatif sayının çarpımı pozitif (+), tek sayıda negatif sayının çarpımı negatiftir (-).'
        ],
        'practice': {
            'q': '[(-4) × (+6)] / (-3) işleminin sonucunu bulunuz.',
            'hint': 'Pay: (-4) x (+6) = -24. Bölme: (-24) / (-3) = +8.'
        }
    },
    'MAT.7.1.3': {
        'topic': 'Tam Sayıların Kuvvetleri (Üslü İfadeler)',
        'notes': [
            'Pozitif sayıların tüm kuvvetleri pozitiftir: (+2)³ = +8, (+3)² = +9.',
            'Negatif Taban - Çift Kuvvet: Parantez içindeki negatif sayının çift kuvveti POZİTİFTİR: (-3)² = +9.',
            'Negatif Taban - Tek Kuvvet: Negatif sayının tek kuvveti NEGATİFTİR: (-2)³ = -8.',
            'Parantezsiz Negatif Sayı: Parantez yoksa kuvvet sadece sayıyı bağlar, eksi işareti aynen kalır: -3² = -9!'
        ],
        'traps': [
            'SINAVIN EN BÜYÜK TUZAĞI: (-4)² ile -4² AYNI DEĞİLDİR!\n(-4)² = (-4) × (-4) = +16 iken,\n-4² = - (4 × 4) = -16\'dır!'
        ],
        'practice': {
            'q': '(-2)⁴ - 2⁴ + (-1)⁷ işleminin sonucunu bulunuz.',
            'hint': '(-2)^4 = +16; 2^4 = 16 (önünde eksi var -16); (-1)^7 = -1. Toplam: 16 - 16 - 1 = -1.'
        }
    },
    'MAT.7.1.4': {
        'topic': 'Rasyonel Sayılar ve Ondalık Gösterim',
        'notes': [
            'Rasyonel Sayı Tanımı: a ve b birer tam sayı ve b ≠ 0 olmak üzere a/b şeklinde yazılabilen sayılardır.',
            'Devirli Ondalık Sayıyı Çevirme Formülü: Rasyonel Hali = (Sayının Tamamı - Devretmeyen Kısım) / (Virgülden sonra devreden kadar 9, devretmeyen kadar 0).',
            'Sıralama Kuralı: Paydaları eşitleyerek veya pozitif gibi sıralayıp negatifte yön değiştirerek sıralayınız.'
        ],
        'traps': [
            'Negatif rasyonel sayıları sıralarken dikkat: Sıfıra daha yakın olan negatif sayı DAHA BÜYÜKTÜR! (-1/2 > -3/4).'
        ],
        'practice': {
            'q': '1,444... (1,4 devirli) sayısını rasyonel sayı (a/b) olarak en sade biçimde yazınız.',
            'hint': '(14 - 1) / 9 = 13/9.'
        }
    },

    # FEN BİLİMLERİ 7. SINIF
    'FB.7.1.1': {
        'topic': 'Uzay Araştırmaları ve Teleskoplar',
        'notes': [
            'Teleskop: Gök cisimlerinden gelen ışığı toplayıp odaklayarak büyüten araçtır (Optik, Radyo, X-ışını, Aynalı/Mercekli).',
            'İlk Teleskop: Hans Lippershey icat etmiş, astronomide ilk kez Galileo Galilei kullanmıştır.',
            'Rasathane (Gözlemevi) Şartları: Şehir ışıklarından uzak, yüksek, az bulutlu ve hava kirliliği olmayan yerlere kurulur.'
        ],
        'traps': ['Uzay teleskopları (Hubble, James Webb) atmosferin olumsuz etkilerinden (ışık kırılması, bulut) etkilenmemek için uzaya yerleştirilmiştir.'],
        'practice': {
            'q': 'Neden büyük gözlemevleri şehir merkezlerine değil de yüksek dağ zirvelerine kurulur?',
            'hint': 'Işık kirliliğinden, hava kirliliğinden ve atmosferik türbülanstan kaçınmak için.'
        }
    },
    'FB.7.1.3': {
        'topic': 'Türkiye\'nin Aktif Yapay Uyduları ve Görevleri',
        'notes': [
            'Haberleşme (İletişim) Uydularımız: Türksat 3A, Türksat 4A, Türksat 4B, Türksat 5A, Türksat 5B, Türksat 6A (İlk yerli haberleşme uydumuz).',
            'Gözlem ve İstihbarat Uydularımız: Göktürk-1, Göktürk-2, İMECE (Yüksek çözünürlüklü ilk yerli gözlem uydumuz).',
            'Ömrünü Tamamlayanlar: Türksat 1B, 1C, 2A; BİLSAT ve RASAT uzay çöpü haline gelmiştir.'
        ],
        'traps': ['Türksat serisi TV/İletişim uydusudur; Göktürk ve İMECE ise askeri/harita/tarım gözlem uydusudur.'],
        'practice': {
            'q': 'Türkiye\'nin uzaydaki aktif gözlem uydularından ikisini yazınız.',
            'hint': 'Göktürk-1, Göktürk-2 veya İMECE uydularını belirtiniz.'
        }
    },
    'FB.7.1.4': {
        'topic': 'Uzay Kirliliği ve Kessler Sendromu',
        'notes': [
            'Uzay Kirliliği: Dünya yörüngesinde dönen işlevini yitirmiş uydular, roket parçaları ve yakıt tanklarının oluşturduğu tehlikeli atık yığınıdır.',
            'Kessler Sendromu: Yörüngedeki atıkların birbirine çarparak zincirleme patlamalara ve yeni çarpışmalara yol açması felaketidir.'
        ],
        'traps': ['Gök taşları (meteorlar) uzay kirliliği DEĞİLDİR; uzay kirliliği yalnızca insan yapımı atıklardır.'],
        'practice': {
            'q': 'Uzay kirliliğini azaltmak için mühendislerin geliştirdiği bir çözüm önerisi yazınız.',
            'hint': 'Ömrü biten uyduların kontrollü olarak atmosfere sokulup yakılması veya lazerle yörüngeden düşürülmesi.'
        }
    },
    'FB.7.1.5': {
        'topic': 'Yıldızların Yaşam Döngüsü ve Bulutsular (Nebula)',
        'notes': [
            'Yıldızların Doğumu: Bulutsu (Nebula) adı verilen dev gaz ve toz bulutlarının kütleçekimle sıkışmasıyla yıldızlar doğar (Örn: Orion, Kartal bulutsusu).',
            'Küçük Kütleli Yıldız: Bulutsu -> Küçük Yıldız -> Kırmızı Dev -> Gezegenimsi Bulutsu -> BEYAZ CÜCE olarak son bulur (Güneşimiz böyledir).',
            'Büyük Kütleli Yıldız: Bulutsu -> Büyük Yıldız -> Kırmızı Süperdev -> Süpernova Patlaması -> NÖTRON YILDIZI veya KARA DELİK olur.'
        ],
        'traps': ['Güneş bir kara deliğe dönüşmeyecektir; küçük kütleli olduğu için ömrünün sonunda Beyaz Cüce olacaktır.'],
        'practice': {
            'q': 'Süpernova patlaması hangi kütledeki yıldızların yaşam döngüsünde gerçekleşir ve patlama sonrası neler oluşabilir?',
            'hint': 'Büyük kütleli yıldızlarda gerçekleşir; nötron yıldızı (pulsar) veya kara delik oluşur.'
        }
    },
    'FB.7.2.1': {
        'topic': 'Mitoz Bölünme: Aşamaları ve Önemi',
        'notes': [
            'Mitoz Bölünmenin Amacı: Tek hücrelilerde üreme (çoğalma); çok hücrelilerde büyüme, gelişme ve yaraların onarımıdır.',
            'Temel Özellikleri:\n• Vücut hücrelerinde görülür.\n• 1 hücreden 2 özdeş hücre oluşur.\n• Kromozom sayısı SABİT kalır (2n -> 2n).\n• Kalıtsal çeşitlilik sağlamaz (Klon kopya).'
        ],
        'traps': ['Mitozda parça değişimi (krossing-over) ASLA görülmez; oluşan hücreler ana hücrenin genetik ikizidir.'],
        'practice': {
            'q': '2n = 46 kromozomlu bir epitel hücresi art arda 3 kez mitoz bölünme geçirirse oluşan hücre sayısı ve kromozom sayısı ne olur?',
            'hint': 'Hücre sayısı: 2^3 = 8 hücre. Kromozom sayısı değişmez: 46 kalır.'
        }
    },
    'FB.7.2.2': {
        'topic': 'Mayoz Bölünme: Parça Değişimi ve Kalıtsal Çeşitlilik',
        'notes': [
            'Mayozun Amacı: Eşeyli üreyen canlılarda sperm ve yumurta gibi "üreme hücrelerini (gametleri)" oluşturmaktır.',
            'Temel Özellikleri:\n• 2n kromozomlu üreme ana hücrelerinde görülür.\n• 1 hücreden 4 yeni hücre oluşur.\n• Kromozom sayısı YARIYA iner (2n -> n).\n• Mayoz-1\'de homolog kromozomlar arasında Parça Değişimi (Krossing-over) gerçekleşir.'
        ],
        'traps': ['Kromozom sayısının tür içinde nesiller boyu sabit kalmasını sağlayan olay MAYOZ ve DÖLLENME birlikteliğidir.'],
        'practice': {
            'q': 'Aynı anne ve babadan doğan kardeşlerin birbirine tıpatıp benzememesinin mayozdaki temel nedeni nedir?',
            'hint': 'Mayoz 1\'deki homolog kromozomlar arası parça değişimi (krossing-over) ve rastgele dizilimdir.'
        }
    },

    # SOSYAL BİLGİLER 7. SINIF
    'SB': {
        'topic': 'İletişimde Sen Dili ve Ben Dili',
        'notes': [
            'Sen Dili: Suçlayıcı, yargılayıcı, emir verici ve eleştiricidir ("Yine geç kaldın, hep aynısını yapıyorsun!"). Karşı tarafı savunmaya ve öfkeye iter.',
            'Ben Dili: Kişinin kendi duygularını, ihtiyaçlarını ve olayın üzerindeki etkisini açıklar ("Derse geç kaldığında dersi böldüğün için endişeleniyorum"). Empati ve yapıcı iletişim kurar.'
        ],
        'traps': ['Ben dili "Ben haklıyım" demek değildir! Kendi hissettiğin duygu ve kaygıyı suçlamadan anlatmaktır.'],
        'practice': {
            'q': '"Odanı hiç toplamıyorsun, çok pasaklısın!" cümlesini yapıcı bir Ben Dili cümlesine dönüştürünüz.',
            'hint': '"Odan dağınık olduğunda aradığını bulamayacağın için kaygılanıyorum ve yoruluyorum."'
        }
    },
    'SB.7.1.2': {
        'topic': 'Etkili İletişim Becerileri ve Beden Dili',
        'notes': [
            'Etkili Dinleme: Karşıdaki konuşurken sözünü kesmemek, göz teması kurmak ve başıyla onaylayarak dinlediğini hissettirmek.',
            'Empati: Kendini karşısındaki kişinin yerine koyarak onun duygularını ve düşüncelerini doğru anlama becerisidir.'
        ],
        'traps': ['Dinlerken kafasında cevap hazırlamak etkili dinleme değil, iletişim engelidir.'],
        'practice': {
            'q': 'İletişimi olumsuz etkileyen tutumlardan ikisini yazınız.',
            'hint': 'Ön yargılı olmak, sürekli söz kesmek veya alay etmek.'
        }
    },
    'SB.7.1.3': {
        'topic': 'Medya Okuryazarlığı ve İletişim Özgürlüğü',
        'notes': [
            'Medya Okuryazarlığı: Medyadan gelen iletileri eleştirel bir gözle analiz etme, doğru ile sahte haberi (dezenformasyon) ayırt etme becerisidir.',
            'Anayasal Haklar: Düşünce ve ifade özgürlüğü (Madde 25-26), Doğru haber alma hakkı, Özel hayatın gizliliği (Madde 20).'
        ],
        'traps': ['Sosyal medyada görülen her haberi teyit etmeden paylaşmak bilgi kirliliği suçuna ortak olmaktır.'],
        'practice': {
            'q': 'İnternette karşılaştığımız bir haberin doğruluğunu teyit etmek için hangi adımları izlemeliyiz?',
            'hint': 'Resmi haber ajanslarını kontrol etmek ve farklı güvenilir kaynaklardan doğrulamak.'
        }
    },
    'EVİMİZ': {
        'topic': 'Kültürel Miras, İklim ve Yaşam Çeşitliliği',
        'notes': [
            'İklim ve Yaşam: Karasal, Akdeniz ve Karadeniz iklimlerinin konut mimarisi ve ekonomik faaliyetlere etkisi.',
            'Anadolu İmece Kültürü: Zorlu işleri karşılıksız el birliğiyle tamamlama geleneği.'
        ],
        'traps': ['Coğrafi faktörler sadece doğayı değil, insan karakterini ve folklorunu da şekillendirir.'],
        'practice': {
            'q': 'Karadeniz bölgesinde evlerin ahşaptan yapılmasının temel coğrafi gerekçesi nedir?',
            'hint': 'Gür orman varlığı ve aşırı yağış şartları.'
        }
    },

    # DİN KÜLTÜRÜ 7. SINIF
    'DKAB.7.1.1': {
        'topic': 'Varlıklar Âlemi: Görünen ve Görünmeyen Varlıklar',
        'notes': [
            'Görünen Âlem: Duyu organlarımızla veya bilimsel araçlarla algılayabildiğimiz fiziksel evrendir.',
            'Görünmeyen (Gayb) Âlemi: Duyu organlarıyla algılanamayan, varlığı ancak vahiy yoluyla bilinen melek, cin, şeytan ve ahiret boyutudur.'
        ],
        'traps': ['Bir şeyin duyu organlarımızla algılanamaması onun yok olduğunu göstermez (Örn: akıl, elektrik akımı, yerçekimi).'],
        'practice': {
            'q': 'Görünmeyen varlıklar hakkında kesin bilgiye hangi kaynak aracılığıyla ulaşabiliriz?',
            'hint': 'Yalnızca Yüce Allah\'ın gönderdiği vahiy ve peygamberlerin hadisleri aracılığıyla.'
        }
    },
    'DKAB.7.1.2': {
        'topic': 'Dört Büyük Melek ve Görevleri',
        'notes': [
            'Meleklerin Özellikleri: Nurdan yaratılmışlardır, günah işlemezler, cinsiyetleri yoktur, yemezler içmezler, daima Allah\'a ibadet ederler.',
            'Dört Büyük Melek:\n• Cebrail: Vahiy getirmekle görevlidir.\n• Mikail: Tabiat olaylarını ve rızıkları idare eder.\n• İsrafil: Kıyamet günü ve yeniden dirilişte Sûr borusuna üfler.\n• Azrail: Eceli gelenlerin canını almakla (ölüm meleği) görevlidir.'
        ],
        'traps': ['Kirâmen Kâtibîn melekleri insanların sağ ve solunda durarak iyi ve kötü amellerini kaydeder.'],
        'practice': {
            'q': 'Tabiat olaylarını idare etmekle ve canlıların rızkını düzenlemekle görevli büyük meleğin adını yazınız.',
            'hint': 'Mikail (a.s.).'
        }
    },
    'DKAB.7.1.3': {
        'topic': 'Ahiret Hayatının Aşamaları',
        'notes': [
            'Ahiret Yolculuğunun Sıralaması:\n1. Kıyamet: İsrafil\'in Sûr\'a ilk üflemesiyle evrendeki nizamın son bulması.\n2. Ba\'s: İkinci üflemeyle insanların yeniden diriltilmesi.\n3. Haşir & Mahşer: Dirilen insanların hesap için toplanması ve toplanma meydanı.\n4. Mizan: Sevap ve günahların tartıldığı ilahi adalet terazisi.\n5. Cennet / Cehennem: Amellerin ebedi karşılığı.'
        ],
        'traps': ['Haşir toplanma olayıdır; Mahşer ise toplanılan yerin (meydanın) adıdır.'],
        'practice': {
            'q': 'Ahirette insanların amellerinin tartıldığı ilahi terazinin adı nedir?',
            'hint': 'Mizan terazisi.'
        }
    },
    'DKAB.7.1.4': {
        'topic': 'Ahiret İnancının Birey ve Toplum Hayatına Etkisi',
        'notes': [
            'Bireye Etkisi: İnsana sorumluluk bilinci kazandırır. Yalnızken bile kötülük yapmaktan alıkoyar; haksızlığa uğradığında adalet tesellisi verir.',
            'Topluma Etkisi: Suç oranlarını azaltır, kul hakkına riayeti artırır, yetimlerin ve zayıfların korunmasını sağlar.'
        ],
        'traps': ['Ahiret inancı insanı dünyadan koparmaz; aksine dünyayı ahiretin tarlası olarak görüp daha adil çalışmasını sağlar.'],
        'practice': {
            'q': 'Ahirete inanan bir esnafın ticari hayatındaki davranışları nasıl olmalıdır?',
            'hint': 'Hile yapmaz, tartıda dürüst olur, eksik mal satmaz çünkü hesabını vereceğini bilir.'
        }
    },
    'DKAB.7.2.1': {
        'topic': 'Hac ve Umre İbadetleri',
        'notes': [
            'Hac: Belirli bir zamanda (Zilhicce ayı) Kâbe, Arafat ve kutsal yerleri ibadet amacıyla ziyaret etmektir (Farzdır).',
            'Umre: Hac mevsimi dışında yılın herhangi bir vaktinde ihrama girilerek Kâbe\'yi tavaf ve Sa\'y yapmaktır (Sünnettir; Arafat vakfesi yoktur).',
            'Haccın Farzları: 1. İhrama girmek, 2. Arafat vakfesi yapmak, 3. Kâbe\'yi tavaf etmek.'
        ],
        'traps': ['Umrede Arafat vakfesi ve kurban kesme zorunluluğu YOKTUR; sadece Kâbe tavafı ve Sa\'y yapılır.'],
        'practice': {
            'q': 'Hac ile Umre arasındaki 2 temel farkı yazınız.',
            'hint': 'Hac farzdır ve yılda bir kez yapılır; umre sünnettir ve her zaman yapılabilir. Umrede Arafat vakfesi yoktur.'
        }
    },

    # İNGİLİZCE 7. SINIF
    'E7.1.R1': {
        'topic': 'Describing Appearance, Personality and Comparatives',
        'notes': [
            'Appearance (Dış Görünüş): tall, short, slim, well-built, curly hair, blue eyes.',
            'Personality (Kişilik): honest (tells truth), generous (shares), punctual (on time), stubborn (never changes mind).',
            'Comparative Adjectives (-er than / more ... than):\n• Short adjectives: tall -> taller than, easy -> easier than.\n• Long adjectives: outgoing -> more outgoing than, hardworking -> more hardworking than.'
        ],
        'traps': ['"Stubborn" (inatçı) ve "selfish" (bencil) olumsuz sıfatlardır; "generous" ve "honest" olumludur.'],
        'practice': {
            'q': 'Make a comparative sentence comparing Jack (1.80m) and Tom (1.65m) using "tall".',
            'hint': 'Jack is taller than Tom.'
        }
    },
    'E7.1.W1': {
        'topic': 'Writing a Short Paragraph Comparing Two People',
        'notes': [
            'Sentence Patterns: "My best friend is taller than me, but I am more punctual than him."',
            'Connectors: "and", "but", "because" linking sentences smoothly.'
        ],
        'traps': ['İki heceli ve sonu -y ile biten sıfatlar -ier alır (friendly -> friendlier than).'],
        'practice': {
            'q': 'Write 2 sentences comparing your best friend\'s personality with yours.',
            'hint': '"Zeynep is more outgoing than me, but I am more patient."'
        }
    },
    'E7.2.R1': {
        'topic': 'Sports: Indoor/Outdoor Sports and Equipment',
        'notes': [
            'Play: Top ve takım sporları için kullanılır (play football, play basketball, play tennis).',
            'Go: -ing ile biten sporlar için kullanılır (go swimming, go cycling, go skiing).',
            'Do: Bireysel dövüş ve salon sporları için kullanılır (do karate, do yoga, do gymnastics).',
            'Equipment: racket, shuttlecock, helmet, trainers, goggles, bow and arrow.'
        ],
        'traps': ['"Do football" denilmez, "play football" denir! Spor fiili eşleştirmelerine dikkat ediniz.'],
        'practice': {
            'q': 'Match the sport with the correct verb: [swimming, tennis, judo] -> [play, go, do].',
            'hint': 'go swimming, play tennis, do judo.'
        }
    },
    'E7.2.W1': {
        'topic': 'Writing About Daily Sports Routines and Frequency',
        'notes': [
            'Frequency Adverbs: always, usually, often, sometimes, never.',
            'Frequency Expressions: once a week, twice a month, three times a year.',
            'Question Form: "How often do you train?" -> "I train twice a week."'
        ],
        'traps': ['Frequency adverb özne ile fiil arasına gelir: "I always play tennis."'],
        'practice': {
            'q': 'Answer the question: "How often do you do exercise?"',
            'hint': '"I usually do exercise three times a week."'
        }
    }
}

print(f"Defined rich knowledge base for {len(TOPIC_KNOWLEDGE)} core outcomes!")

# =====================================================================
# BUILD src/data/outcomeStudyBank.ts
# =====================================================================
study_bank_entries = {}

for code, (grade, subj, q_data) in q_by_code.items():
    meta = all_outcomes.get(code, {})
    title = meta.get('canonicalTitle', meta.get('title', q_data.get('outcomeTitle', code)))
    unit = meta.get('unit', '')
    topic = meta.get('topic', '')

    custom = TOPIC_KNOWLEDGE.get(code)
    if custom:
        topic_title = custom['topic']
        quick_notes = custom['notes']
        exam_traps = custom['traps']
        practice_q = custom['practice']['q']
        practice_hint = custom['practice']['hint']
    else:
        topic_title = f"{unit} - {topic}" if (unit and topic) else title
        quick_notes = [
            f"MEB Önemli Kural: {title}",
            f"Kavramsal İlke: {q_data.get('contextText', 'Konuyla ilgili temel kavram ve kuralları öğreniniz.')}",
            "Soru Çözüm Tekniği: Soruda verilen öncülleri, verileri ve bağıntıları dikkatlice tespit ederek doğrudan gerekçeli sonuca ulaşınız."
        ]
        exam_traps = [
            f"DİKKAT: {title} ile ilgili sorularda yüzeysel ezber değil, neden-sonuç bağı ve adım adım çözüm puan kazandırır."
        ]
        practice_q = f"{title} konusunda benzer bir açık uçlu problemi kendi cümlelerinizle kurup çözünüz."
        practice_hint = "Örnek sorudaki işlem basamaklarını ve model çözümü referans alınız."

    # Authentic solved example from all_middle_school_exams.json
    solved_q = q_data['questionText']
    if q_data.get('stimulus'):
        solved_q = f"{q_data['stimulus']}\n\n{solved_q}"

    analysis_text = q_data.get('solutionExplanation') or f"Soru {code} çıktısı kapsamında temel kavram ve mantıksal çıkarımı analiz etmeyi gerektirir."
    solution_text = q_data['modelAnswer']

    study_bank_entries[code] = {
        "outcomeCode": code,
        "topicTitle": topic_title,
        "quickNotes": quick_notes,
        "examTraps": exam_traps,
        "solvedExample": {
            "question": solved_q,
            "analysis": analysis_text,
            "solution": solution_text
        },
        "practiceQuestion": {
            "question": practice_q,
            "hint": practice_hint
        }
    }

print(f"Compiled study bank for {len(study_bank_entries)} outcomes!")

# Output src/data/outcomeStudyBank.ts
ts_code = []
ts_code.append("import { StudySection } from '../types';\n")
ts_code.append("export const OUTCOME_STUDY_BANK: Record<string, StudySection> = ")
ts_code.append(json.dumps(study_bank_entries, ensure_ascii=False, indent=2))
ts_code.append(";\n")

with open('src/data/outcomeStudyBank.ts', 'w', encoding='utf-8') as f:
    f.write('\n'.join(ts_code))
print("Saved src/data/outcomeStudyBank.ts!")

