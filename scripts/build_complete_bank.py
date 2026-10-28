import json

with open('meb_data/extracted_question_bank.json') as f:
    bank = json.load(f)

# Add missing/additional questions with MEB standard pedagogy
additional_questions = {
    'T.O.7.14': [
        {
            'outcomeCode': 'T.O.7.14',
            'difficulty': 'Orta',
            'cognitiveLevel': 'Karmaşık Bilişsel Süreçler',
            'archetype': 'Kurgusal Senaryo & Vaka İncelemesi',
            'contextText': 'Aşağıda kutup araştırmaları hakkında bilgilendirici bir metinden alınan bir kesit verilmiştir:',
            'stimulus': 'Antarktika, yeryüzünün en kurak, en soğuk ve en rüzgârlı kıtasıdır. Kıta üzerinde hiçbir ülkeye ait kalıcı yerleşim yeri bulunmamaktadır. Ancak Türkiye dahil 30\'dan fazla ülke, Antarktika Antlaşması çerçevesinde kıtada bilimsel araştırma üsleri kurmuştur. Türk Kutup Araştırmaları ekibi, küresel iklim değişikliğinin buzullar üzerindeki etkilerini, deniz ekosistemindeki mikroplastik kirliliğini ve kıtaya özgü mikroorganizmaların genetik yapısını incelemektedir. Bu araştırmalardan elde edilen veriler, gezegenimizin geleceğine dair kritik tahminlerde bulunulmasını sağlamaktadır.',
            'questionText': 'a) Metnin yapısal bölümlerinden (giriş, gelişme, sonuç) hareketle yazarın temel amacını açıklayınız.\nb) Metinde Türk Kutup Araştırmaları ekibinin incelediği bilimsel araştırma konularından iki tanesini yazınız.',
            'modelAnswer': 'a) Yazarın temel amacı, Antarktika\'nın ekstrem coğrafi şartlarını ve uluslararası bilimsel araştırmaların küresel iklim krizini anlama açısından hayati önemini açıklamaktır.\nb) 1. Küresel iklim değişikliğinin buzullar üzerindeki etkileri, 2. Deniz ekosistemindeki mikroplastik kirliliği (veya kıtaya özgü mikroorganizmaların genetik yapısı).',
            'solutionExplanation': 'Bilgilendirici metinlerde önemli bilgileri saptamak için ana düşünce ve destekleyici bilimsel veriler tespit edilir.',
            'rubric': [
                {'criterion': 'Yazarın temel amacının doğru çözümlenmesi', 'points': 8},
                {'criterion': 'İki bilimsel araştırma konusunun eksiksiz yazılması', 'points': 7}
            ]
        }
    ],
    'T.O.7.15': [
        {
            'outcomeCode': 'T.O.7.15',
            'difficulty': 'Kolay',
            'cognitiveLevel': 'Basit Bilişsel Süreçler',
            'archetype': 'Durum & Özellik Matrisi (VAR/YOK/Tik)',
            'contextText': 'Aşağıdaki paragrafta yapay zekâ teknolojisinin sağlık alanındaki kullanımına değinilmiştir:',
            'stimulus': 'Modern tıpta yapay zekâ algoritmaları, radyoloji görüntülerinin analizinde hekimlere büyük destek sağlamaktadır. Milyonlarca röntgen ve MR filmini saniyeler içinde tarayabilen derin öğrenme modelleri, erken evredeki tümörleri yüksek doğrulukla saptayabilmektedir. Bu durum, hastalıkların erken teşhisini kolaylaştırırken tedavi başarısını da önemli ölçüde artırmaktadır.',
            'questionText': 'a) Bu metnin içeriğini en iyi yansıtan 3 anahtar kelimeyi yazınız.\nb) Belirlediğiniz anahtar kelimeler arasındaki anlamsal ilişkiyi tek bir cümleyle açıklayınız.',
            'modelAnswer': 'a) Anahtar kelimeler: Yapay zekâ, Erken teşhis (veya tanı), Sağlık (veya tıp).\nb) İlişki cümlesi: Sağlık alanında uygulanan yapay zekâ teknolojileri hastalıkların erken teşhisini sağlayarak tedavi başarısını yükseltmektedir.',
            'solutionExplanation': 'Anahtar kelimeler metnin konusunu ve iletmek istediği temel mesajı taşıyan en temel sözcüklerdir.',
            'rubric': [
                {'criterion': '3 anahtar kelimenin doğru belirlenmesi', 'points': 8},
                {'criterion': 'Kelimeler arasındaki ilişkinin anlamlı bir cümleyle kurulması', 'points': 7}
            ]
        }
    ],
    'T.Y.7.3': [
        {
            'outcomeCode': 'T.Y.7.3',
            'difficulty': 'Orta',
            'cognitiveLevel': 'Karmaşık Bilişsel Süreçler',
            'archetype': 'Kurgusal Senaryo & Vaka İncelemesi',
            'contextText': 'Okulunuzda düzenlenecek "Geleceğe Mektup" konulu kompozisyon yarışması için bir metin planı hazırlamanız istenmektedir.',
            'stimulus': 'Konu: Çevre Kirliliği ve Sıfır Atık\nHedef Kitle: Akranlar ve okul topluluğu\nMetin Türü: Bilgilendirici ve ikna edici deneme',
            'questionText': 'Giriş, gelişme ve sonuç bölümlerinde yer vereceğiniz düşünceleri başlıklar halinde yazarak tutarlı ve mantıksal akışa sahip bir yazı taslağı oluşturunuz.',
            'modelAnswer': '• Giriş: Dünyamızın doğal kaynaklarının hızla tükenmesi ve plastik atık krizinin boyutlarına dikkat çekme.\n• Gelişme: Sıfır atık yaklaşımının ilkeleri (azalt, yeniden kullan, geri dönüştür); okullarda kompost ve geri dönüşüm kutularının yaygınlaştırılmasının somut faydaları.\n• Sonuç: Gençlerin çevre bilinciyle hareket etmesinin gezegenimizin geleceğini kurtaracağına dair güçlü bir çağrı ve slogan.',
            'solutionExplanation': 'Yazma sürecinde içerik ve yapı seçimi; konu, ana fikir ve paragraflar arası geçişlerin mantıklı yapılandırılmasıyla sağlanır.',
            'rubric': [
                {'criterion': 'Giriş bölümünün dikkat çekici ve konuyu sunucu kurgulanması', 'points': 5},
                {'criterion': 'Gelişme bölümünde argüman ve somut kanıtların sunulması', 'points': 6},
                {'criterion': 'Sonuç bölümünün toparlayıcı ve mesaj verici olması', 'points': 4}
            ]
        }
    ],
    'SB.7.1.3': [
        {
            'outcomeCode': 'SB.7.1.3',
            'difficulty': 'Orta',
            'cognitiveLevel': 'Karmaşık Bilişsel Süreçler',
            'archetype': 'Kurgusal Senaryo & Vaka İncelemesi',
            'contextText': 'Millî Mücadele Dönemi\'nde ordunun lojistik ihtiyaçlarını karşılamak üzere yayımlanan Tekâlif-i Milliye Emirleri\'ne ilişkin aşağıdaki tarihî durum aktarılmıştır:',
            'stimulus': 'Sakarya Meydan Muharebesi öncesinde Mustafa Kemal Paşa tarafından yayımlanan emirler uyarınca her ilçe ve köyde yardım komisyonları kurulmuştur. Türk halkı; çorabından çarığına, buğdayından kağnısına kadar elindeki imkânların büyük kısmını hiçbir karşılık beklemeden cepheye sevk etmiştir. Kadınlar, çocuklar ve yaşlılar geceleri kağnılarla cepheye mühimmat taşımıştır.',
            'questionText': 'a) Bu tarihî durum, Türk toplumunun millî meseleler karşısındaki hangi ortak değer ve tutumunu ortaya koymaktadır?\nb) Günümüzde yaşanan doğal afetlerde (örneğin büyük deprem felaketlerinde) halkımızın sergilediği dayanışma ile Tekâlif-i Milliye ruhu arasındaki benzerliği açıklayınız.',
            'modelAnswer': 'a) Vatanseverlik, millî birlik ve beraberlik, fedakârlık ve topyekûn dayanışma bilincini ortaya koymaktadır.\nb) Her iki durumda da milletimiz; hiçbir ayrım gözetmeksizin, devlet-millet el ele vererek ortak tehlike veya acı karşısında bütün imkânlarını seferber etmiş, yardımlaşma ve empati refleksi göstermiştir.',
            'solutionExplanation': 'Millî meseleler karşısında Türk milleti tarih boyunca ortak bilinç ve fedakarlıkla kenetlenmiştir.',
            'rubric': [
                {'criterion': 'Ortak değer ve tutumların (vatanseverlik, fedakârlık) tespiti', 'points': 8},
                {'criterion': 'Tarihî dayanışma ile günümüzdeki afet dayanışması arasındaki bağın kurulması', 'points': 7}
            ]
        }
    ],
    'SB.7.2.1': [
        {
            'outcomeCode': 'SB.7.2.1',
            'difficulty': 'Orta',
            'cognitiveLevel': 'Karmaşık Bilişsel Süreçler',
            'archetype': 'Öğrenci Diyaloğu & Kavram Yanılgısı',
            'contextText': 'Küreselleşme ve kültürel etkileşim konusunda iki öğrenci sınıfta bir münazara yapmaktadır:',
            'stimulus': 'Ece: "Küreselleşme sayesinde dünyanın bir ucundaki bir kütüphaneye saniyeler içinde erişebiliyoruz, farklı kültürleri tanıyıp empati kurabiliyoruz. Bu durum insanlık için büyük bir zenginliktir."\nKaan: "Ancak küreselleşme aynı zamanda yerel dilleri, geleneksel el sanatlarını ve özgün kültürel kimlikleri yok ederek tek tip bir tüketim kültürü oluşturma riski taşımaktadır."',
            'questionText': 'Ece ve Kaan\'ın görüşlerini küreselleşmenin insan ve toplum hayatına etkileri bakımından değerlendiriniz. Küreselleşmenin getirdiği fırsatlardan yararlanırken milli ve yerel kültürümüzü korumak için neler yapılmalıdır? İki somut öneri yazınız.',
            'modelAnswer': 'Değerlendirme: Her iki öğrenci de haklıdır; küreselleşme bilgiye erişim ve iş birliği fırsatları sunarken kültürel erozyon riskini de beraberinde getirir.\nSomut Öneriler:\n1. Geleneksel kültür öğelerimizi, masallarımızı ve sanatlarımızı dijital platformlarda ve animasyonlarda modern biçimde tanıtmak.\n2. Yabancı kelimelerin istilasına karşı Türkçemizi koruyup geliştirmek ve yerli üretimi desteklemek.',
            'solutionExplanation': 'Küreselleşme hem fırsatları (kültürel iletişim, bilimsel paylaşım) hem de tehditleri (kültürel yozlaşma) barındırır; dengeli bir yaklaşım gerektirir.',
            'rubric': [
                {'criterion': 'Her iki görüşün (olumlu ve olumsuz yönlerin) analizi', 'points': 8},
                {'criterion': 'Kültürü korumaya yönelik iki somut ve uygulanabilir öneri', 'points': 7}
            ]
        }
    ],
    'DKAB.7.2.1': [
        {
            'outcomeCode': 'DKAB.7.2.1',
            'difficulty': 'Kolay',
            'cognitiveLevel': 'Basit Bilişsel Süreçler',
            'archetype': 'Durum & Özellik Matrisi (VAR/YOK/Tik)',
            'contextText': 'Hac ve umre ibadetleri İslam dininde kutsal mekanların ziyaret edilmesini içeren iki önemli ibadettir.',
            'stimulus': 'Tablo: Hac ve Umre İbadetlerinin Karşılaştırılması\n------------------------------------------------------------------------------------------------\n| Özellik                                    | Hac İbadeti           | Umre İbadeti          |\n| Hükmü (Farz / Sünnet)                     | ..................... | ..................... |\n| Yılın Belirli Zamanında Yapılma Şartı      | ..................... | ..................... |\n| Arafat Vakfesi Bulunma Durumu              | ..................... | ..................... |\n| Kurban Kesme ve Şeytan Taşlama Görevi      | ..................... | ..................... |',
            'questionText': 'Yukarıdaki tabloda yer alan boşlukları ilgili ibadetin özelliklerine göre eksiksiz doldurunuz.',
            'modelAnswer': '• Hükmü: Hac: FARZ | Umre: SÜNNET\n• Yılın Belirli Zamanı: Hac: VAR (Kurban Bayramı günleri) | Umre: YOK (Hac günleri hariç her zaman)\n• Arafat Vakfesi: Hac: VAR (Farzdır) | Umre: YOK\n• Kurban ve Şeytan Taşlama: Hac: VAR | Umre: YOK',
            'solutionExplanation': 'Hac şartları taşıyanlara farz olan ve Arafat vakfesi ile Kurban günlerini içeren bir ibadettir. Umre ise yıl boyu yapılabilen, vakfe ve şeytan taşlama içermeyen sünnet bir ibadettir.',
            'rubric': [
                {'criterion': 'Hüküm satırının doğru doldurulması (Farz - Sünnet)', 'points': 5},
                {'criterion': 'Zamanlama ve Vakfe satırlarının doğru doldurulması', 'points': 6},
                {'criterion': 'Kurban ve şeytan taşlama satırının doğru doldurulması', 'points': 4}
            ]
        },
        {
            'outcomeCode': 'DKAB.7.2.1',
            'difficulty': 'Orta',
            'cognitiveLevel': 'Karmaşık Bilişsel Süreçler',
            'archetype': 'Kurgusal Senaryo & Vaka İncelemesi',
            'contextText': 'Hac ibadeti esnasında yerine getirilen ihram, tavaf ve sa\'y uygulamalarının sembolik anlamlarına ilişkin bir ders işlenmektedir:',
            'stimulus': 'Öğretmen: "Hac ibadetinde giyilen ihram dikişsiz beyaz bir örtüdür. Kişi makamını, zenginliğini, dünyevi unvanlarını geride bırakır. Kâbe etrafındaki tavafta herkes aynı merkez etrafında döner. Safa ile Merve arasındaki sa\'y ise Hz. Hacer\'in oğlu İsmail için su arayışını simgeler."',
            'questionText': 'a) İhrama girmenin ve kefeni andıran beyaz örtülere bürünmenin insan psikolojisi ve eşitlik bilinci üzerindeki etkisini açıklayınız.\nb) Kâbe etrafında yapılan tavafın Allah\'ın birliği (tevhid) ve müminlerin dayanışması açısından sembolik anlamını yazınız.',
            'modelAnswer': 'a) İhram; dünyevi makam, zenginlik ve ırk farklarını ortadan kaldırarak tüm insanların Allah katında eşit olduğunu ve ölüm gerçeğini hatırlatır; tevazu ve kardeşlik bilinci aşılar.\nb) Tavaf; kâinattaki tüm varlıkların Allah\'ın emrine boyun eğip O\'nun etrafında kenetlendiği gibi, müminlerin de tek bir inanç (tevhid) ve birlik ruhuyla hareket ettiğini simgeler.',
            'solutionExplanation': 'Hac ibadetinin her rüknü derin ahlaki ve sembolik mesajlar taşır.',
            'rubric': [
                {'criterion': 'İhramın eşitlik ve tevazu bilinciyle ilişkilendirilmesi', 'points': 8},
                {'criterion': 'Tavafın tevhid ve ümmet birliğiyle ilişkilendirilmesi', 'points': 7}
            ]
        }
    ],
    'E7.2.R1': [
        {
            'outcomeCode': 'E7.2.R1',
            'difficulty': 'Kolay',
            'cognitiveLevel': 'Basit Bilişsel Süreçler',
            'archetype': 'Durum & Özellik Matrisi (VAR/YOK/Tik)',
            'contextText': 'Read the short text about three students and their favorite sports activities:',
            'stimulus': 'Mark loves outdoor sports. Every weekend, he goes hiking in the mountains with a backpack and trekking poles. He hates indoor ball games.\nLisa is an energetic girl. She goes to the Olympic swimming pool four times a week. She needs goggles and a swim cap.\nDavid is a tennis player. He practices on the court on Tuesday and Thursday afternoons. He always uses a professional racket and special balls.',
            'questionText': 'Complete the table according to the text:\n------------------------------------------------------------------------------------------------\n| Student | Sport Branch      | Indoor / Outdoor | Essential Equipment                   |\n| Mark    | ................  | ................ | ..................................... |\n| Lisa    | ................  | ................ | ..................................... |\n| David   | ................  | ................ | ..................................... |',
            'modelAnswer': '• Mark: Sport: Hiking | Indoor/Outdoor: Outdoor | Equipment: Backpack and trekking poles\n• Lisa: Sport: Swimming | Indoor/Outdoor: Indoor | Equipment: Goggles and swim cap\n• David: Sport: Tennis | Indoor/Outdoor: Outdoor / Court | Equipment: Racket and special balls',
            'solutionExplanation': 'Students extract specific details about sports branches, venues, and equipment from a reading text.',
            'rubric': [
                {'criterion': 'Mark row filled correctly', 'points': 5},
                {'criterion': 'Lisa row filled correctly', 'points': 5},
                {'criterion': 'David row filled correctly', 'points': 5}
            ]
        },
        {
            'outcomeCode': 'E7.2.R1',
            'difficulty': 'Orta',
            'cognitiveLevel': 'Basit Bilişsel Süreçler',
            'archetype': 'Kurgusal Senaryo & Vaka İncelemesi',
            'contextText': 'Read the interview with an archery champion and answer the questions:',
            'stimulus': 'Interviewer: "Hello Mete, congratulations on your gold medal! How often do you practice?"\nMete: "Thank you! I practice six days a week. I wake up at 6:30 a.m. every morning, run for 45 minutes, and then shoot more than 200 arrows. Archery requires high concentration and disciplined muscle training. I never eat junk food and I always go to bed early before competitions."',
            'questionText': 'a) How often does Mete practice archery every week?\nb) What are the two key requirements for being a successful archer according to Mete?\nc) What does Mete never do during his sports training?',
            'modelAnswer': 'a) He practices six days a week.\nb) High concentration and disciplined muscle training.\nc) He never eats junk food.',
            'solutionExplanation': 'Reading comprehension of frequency, requirements, and dietary habits in sports routines.',
            'rubric': [
                {'criterion': 'Question a answered correctly with frequency detail', 'points': 5},
                {'criterion': 'Question b answered correctly with concentration/training', 'points': 5},
                {'criterion': 'Question c answered correctly with never eating junk food', 'points': 5}
            ]
        }
    ]
}

for code, qlist in additional_questions.items():
    bank.setdefault(code, []).extend(qlist)

with open('meb_data/complete_question_bank.json', 'w', encoding='utf-8') as f:
    json.dump(bank, f, ensure_ascii=False, indent=2)

print('complete_question_bank.json successfully built!')
for code, qlist in sorted(bank.items()):
    print(f'{code}: {len(qlist)} questions')
