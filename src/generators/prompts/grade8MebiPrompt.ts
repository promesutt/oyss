/**
 * 8. Sınıf MEBİ Okul Yazılılarına Hazırlık Soru Üretim Direktifleri
 * TASK154 Pedagojik Tasarımı ve MEBİ Ölçme İlkeleri ile %100 Uyumlu.
 * Altı branş: Türkçe, Matematik, Fen Bilimleri, T.C. İnkılap Tarihi ve Atatürkçülük,
 * Din Kültürü ve Ahlak Bilgisi, İngilizce.
 */

export const GRADE_8_TURKISH_DIRECTIVES = `
MEBİ 8. SINIF TÜRKÇE OKUL YAZILILARINA HAZIRLIK VE ÖLÇME YÖNERGESİ:
1. ÖLÇME YAKLAŞIMI VE DÜŞÜNCE DERİNLİĞİ (MEBİ ÖLÇME REFERANSLI):
   - Sorular 8. sınıf okul yazılılarına hazırlık odaklı, açık uçlu ve kısa cevaplı formatta olmalıdır.
   - Metin anlama ve yorumlama kazanımlarında (T.8.3.14, T.8.3.17, T.8.3.21) öğrencinin metindeki örtük anlamı, ana fikri ve yardımcı fikirleri kendi cümleleriyle açıklaması ve metin içi somut delillerle gerekçelendirmesi istenmelidir.
   - Söz sanatları (tezat, teşbih, intak, teşhis, mübalağa) sorularında dizeler verilerek sanatın adı ve dizedeki hangi sözcüklerle yapıldığı gerekçesiyle açıklatılmalıdır.
   - Fiilimsiler (T.8.3.9) tek başına soyut kural ezberi olarak değil; cümledeki görevi, türü (isim-fiil, sıfat-fiil, zarf-fiil) ve cümleye kattığı anlam ilişkisi üzerinden sorulmalıdır.
   - Anlatım biçimleri (açıklama, tartışma, betimleme, öyküleme) ve düşünceyi geliştirme yolları (tanımlama, tanık gösterme, karşılaştırma, örnekleme) metinden hareketle alıntılatılarak tespit ettirilmelidir.
2. ÖZGÜN VE TAM METİN İLKESİ (Task 143/144):
   - Soru kökü metne atıf yapıyorsa ("Bu metne göre...", "Metindeki altı çizili sözcük...") stimulus alanında anlam bütünlüğü olan, tamamlanmış, duru ve yazım hatasız gerçek bir metin yer almalıdır.
   - MEBİ örneklerindeki spesifik metinleri veya kahramanları (kör kuyu eşeği vb.) birebir kopyalama; bilimsel merak, dayanışma, doğa, sanat ve kültürel değerler temalarında tamamen özgün metinler kur.
3. KABUL EDİLEBİLİR ALTERNATİF CEVAPLAR (alternativeAnswers - ZORUNLU):
   - Her soru için JSON çıktısında "alternativeAnswers" dizisi KESİNLİKLE üretilmeli ve kavramsal olarak denk en az 2-3 kabul edilebilir alternatif ifade eklenmelidir.
4. ANALİTİK VE ADIMLI RUBRİK:
   - Rubrik puanları tek bir ölçüte yığılmamalıdır (örn. sanatın adı 5p + gerekçesi 5p; ana fikir tespiti 6p + metin içi delil 4p). Kısmi başarı adil değerlendirilmelidir.
`;

export const GRADE_8_MATH_DIRECTIVES = `
MEBİ 8. SINIF MATEMATİK OKUL YAZILILARINA HAZIRLIK VE ÖLÇME YÖNERGESİ:
1. ÖLÇME YAKLAŞIMI VE İŞLEM BASAMAKLARI:
   - Sorular LGS tarzı sayfalarca süren bulmaca kurguları değil; doğrudan MEB kazanımlarını ölçen, işlem basamakları açıkça gösterilebilen okul yazılısı problemleridir.
   - Çarpanlar ve Katlar (M.8.1.1.1 - M.8.1.1.3): Pozitif tam sayıların çarpanları, asal çarpanlar, EBOB ve EKOK kavramları gerçek yaşam durumları (parselleme, eşit paylaştırma, nöbet/zil ortak zamanı) üzerinden modellenmelidir.
   - Üslü İfadeler (M.8.1.2.1 - M.8.1.2.5): Tam sayıların tam sayı kuvvetleri, üslü ifadelerle çarpma ve bölme, çok büyük/çok küçük sayıların bilimsel gösterimi ve teknoloji/depolama bağlamları işlenmelidir.
   - Kareköklü İfadeler (M.8.1.3.1 - M.8.1.3.3): Tam kare pozitif tam sayılarla karekök ilişkisi, tam kare olmayan köklü sayıların hangi iki ardışık doğal sayı arasında olduğunun belirlenmesi ve a√b gösterimi adım adım sorgulanmalıdır.
2. MATEMATİKSEL GÖSTERİM VE KaTeX DESTEĞİ:
   - Kesirler, üslü/köklü ifadeler ve formüller için standart KaTeX $...$ formatını kullanınız (Örn: $2^3 \\cdot 3^2 = 72$, $\\sqrt{48} = 4\\sqrt{3}$, $1,2 \\times 10^6$, $\\text{EBOB}(24, 36) = 12$).
   - JSON UYUMLULUK KURALI (RFC 8259): JSON dizgileri içindeki KaTeX ters eğik çizgilerini çift ters eğik çizgi (\\\\) olarak kaçırınız (ör. "\\\\sqrt{48}", "\\\\times").
3. KABUL EDİLEBİLİR DENK ALTERNATİF CEVAPLAR (alternativeAnswers):
   - Matematiksel olarak birbirine denk olan doğru ifade biçimlerini (Örn: $4\\sqrt{3}$ ile $\\sqrt{48}$; $1,5 \\times 10^5$ ile $150\\,000$; 12 metre ile 12 m) "alternativeAnswers" dizisine ekleyiniz.
4. ANALİTİK VE ADIMLI RUBRİK:
   - Yalnızca nihai sayısal sonuç puanlanmamalıdır. Yöntem/kural belirleme, ara işlem adımları ve doğru sonuç için ayrı ayrı kriter puanları tanımlanmalıdır (örn. EBOB bulma 4p + bölme işlemi 3p + birimli sonuç 3p).
`;

export const GRADE_8_SCIENCE_DIRECTIVES = `
MEBİ 8. SINIF FEN BİLİMLERİ OKUL YAZILILARINA HAZIRLIK VE ÖLÇME YÖNERGESİ:
1. ÖLÇME YAKLAŞIMI VE BİLİMSEL MODELLEME:
   - Sorular ezbere tanım sormamalı; kavramsal anlama, veri yorumlama, deney düzenekleri ve bilimsel modelleme becerilerini ölçmelidir.
   - Mevsimler ve İklim (F.8.1.1.1): Dünya'nın dönme ekseni eğikliği, dolanma hareketi, ışığın geliş açısı ve birim yüzeye düşen enerji miktarı ilişkisi; gece-gündüz süreleri ve gölge boyu değişimleri analiz ettirilmelidir.
   - DNA ve Genetik Kod (F.8.2.1.1 - F.8.2.1.3): Nükleotid, gen, DNA ve kromozom kavramlarının karmaşıktan basite hiyerarşik ilişkisi; nükleotid yapısı (fosfat, deoksiriboz, organik baz) ve DNA'nın kendini eşleme basamakları (fermuar gibi açılma, sitoplazmadan çekirdeğe serbest nükleotid girişi, eşlenme sırasındaki hata onarımı) sorgulanmalıdır.
   - Kalıtım (F.8.2.2.1 - F.8.2.2.2): Mendel ilkeleri, tek karakter çaprazlamaları, genotip (homozigot, heterozigot) ve fenotip oranları, akraba evliliğinin genetik riskleri açık uçlu problem olarak sorulmalıdır.
2. BİLİMSEL TERMİNOLOJİ VE DENEY DÜZENEKLERİ:
   - Bilimsel terimler (alel, baskın/çekinik gen, fenotip, genotip, saf döl, melez döl) eksiksiz ve doğru kullanılmalıdır.
   - Deney kurgularında bağımsız değişken, bağımlı değişken ve sabit tutulan kontrol değişkenleri açıkça sorgulanmalıdır.
3. KABUL EDİLEBİLİR ALTERNATİF CEVAPLAR (alternativeAnswers):
   - Her soru için kavramsal olarak denk en az 2 alternatif kabul edilebilir yanıt (farklı ifade kalıpları, yüzde veya kesirli olasılık gösterimleri örn. %75 ile 3/4) "alternativeAnswers" dizisine eklenmelidir.
4. ANALİTİK VE PARÇALI RUBRİK:
   - İki şıklı veya iki basamaklı sorularda puanlama parçalı olmalıdır (ör. doğru tespit/oran 5p + bilimsel gerekçe 5p).
`;

export const GRADE_8_INKILAP_DIRECTIVES = `
MEBİ 8. SINIF T.C. İNKILAP TARİHİ VE ATATÜRKÇÜLÜK OKUL YAZILILARINA HAZIRLIK VE ÖLÇME YÖNERGESİ:
1. ÖLÇME YAKLAŞIMI VE TARİHSEL DÜŞÜNME BECERİLERİ:
   - Sorular kuru kronoloji ve tarih ezberi yerine neden-sonuç ilişkilerini, çok boyutluluğu ve tarihsel kanıtlara dayalı akıl yürütmeyi ölçmelidir.
   - Bir Kahraman Doğuyor (İTA.8.1.1 - İTA.8.1.4): 20. yüzyıl başlarında Osmanlı Devleti'nin siyasi ve ekonomik durumu (Sanayi İnkılabı, kapitülasyonlar, Düyun-ı Umumiye, Fransız İhtilali, milliyetçilik akımı, fikir akımları: Osmanlıcılık, İslamcılık, Batıcılık, Türkçülük); Mustafa Kemal'in çocukluk ve öğrenim hayatı (Selanik'in kültürel ortamı, Manastır Askerî İdadisi); askerî görevleri (Şam Vatan ve Hürriyet Cemiyeti, 31 Mart Vakası, Trablusgarp Savaşı ve Çanakkale Zaferi) ile kişilik özellikleri (liderlik, teşkilatçılık, vatanseverlik, ileri görüşlülük) arasındaki ilişki sorgulanmalıdır.
   - Millî Uyanış: Bağımsızlık Yolunda Atılan Adımlar (İTA.8.2.1 - İTA.8.2.3): I. Dünya Savaşı'nın genel ve özel nedenleri, Osmanlı Devleti'nin savaşa girme gerekçeleri, taarruz (Kafkas, Kanal) ve savunma (Çanakkale, Irak, Suriye-Filistin) cepheleri; Mondros Ateşkes Antlaşması'nın hükümleri (özellikle 7. ve 24. maddeler) ve işgallere karşı Türk milletinin cemiyetler ve Kuva-yı Millîye ile başlattığı haklı direniş çözümlenmelidir.
2. ÖZGÜN VE TARİHSEL METİN KURGUSU:
   - Soru öncüllerinde verilen tarihsel pasajlar, anılar veya antlaşma maddeleri tarihsel gerçeklere tam sadık kalmalı, MEB ders kitabı ve MEBİ ölçme yaklaşımına uygun duru bir Türkçe ile hazırlanmalıdır.
3. KABUL EDİLEBİLİR ALTERNATİF CEVAPLAR (alternativeAnswers - ZORUNLU):
   - Her soru için JSON çıktısında "alternativeAnswers" dizisi KESİNLİKLE üretilmeli; öğrencinin aynı tarihsel olguyu farklı kavram veya cümlelerle ifade edebileceği en az 2-3 kabul edilebilir alternatif eklenmelidir.
4. ANALİTİK VE PARÇALI RUBRİK:
   - Çok boyutlu sorularda (ör. siyasi etki 5p + ekonomik etki 5p; kişilik özelliği 4p + tarihsel kanıt 6p) rubrik basamakları açık ve net tanımlanmalıdır.
`;

export const GRADE_8_DIN_DIRECTIVES = `
MEBİ 8. SINIF DİN KÜLTÜRÜ VE AHLAK BİLGİSİ OKUL YAZILILARINA HAZIRLIK VE ÖLÇME YÖNERGESİ:
1. ÖLÇME YAKLAŞIMI VE KAVRAMSAL ÇÖZÜMLEME:
   - Sorular dogmatik ezber yerine kavramsal anlama, ayet meallerinden çıkarım yapma ve ahlaki ilkeleri günlük hayatla ilişkilendirme becerisini ölçmelidir.
   - Kader İnancı (Kader ve Kaza): Kader (Allah'ın her şeyi bir ölçü, düzen ve uyum içinde planlaması) ve kaza (bu planın zamanı gelince gerçekleşmesi) kavram ayrımı; evrendeki yasalar (fiziksel yasalar: suyun kaldırma kuvveti, yer çekimi; biyolojik yasalar: fotosentez, canlıların üremesi; toplumsal yasalar: adalet, kul hakkı, göç, gelir dağılımı adaleti) somut durumlar üzerinden çözümlenmelidir.
   - İnsanın İradesi ve Sorumluluğu: Küllî irade (Allah'ın sınırsız iradesi: doğum yeri, anne-baba, ırk) ile cüz'î irade (insanın seçimine bırakılan alan: inanç, ahlak, dürüstlük, çalışkanlık) sınırları netleştirilmeli; tembelliği kadere yükleyen yanlış kader anlayışı eleştirilmelidir.
   - Zekât ve Sadaka: İslam'ın paylaşma ve yardımlaşmaya verdiği önem, zekât verebilecek nisap miktarı kavramı, infak ve sadaka-i cariye (kalıcı hayır: okul, çeşme, faydalı ilim) türleri sorgulanmalıdır.
2. AYET VE HADİS GÜVENLİĞİ KURALLARI (EN KATI VE DEĞİŞTİRİLEMEZ KURAL):
   - KESİNLİKLE MEB 8. sınıf ders kitabında bulunmayan veya uydurma ayet/hadis metni üretilemez!
   - Ayet ve hadisler yalnızca MEB onaylı ders kitabında geçen mealleriyle (Âyetü'l-Kürsî, Bakara 255; Nisâ 85; Beled suresi vb.) bağlamına sadık kalarak kullanılabilir.
   - Sorularda öğrenciden metni ezbere yazması değil; verilen meal üzerinden ana fikri çıkarması ve kavramsal analiz yapması istenmelidir.
   - Mezhepsel veya tartışmalı konulara girilmez; MEB'in kuşatıcı ve evrensel din öğretimi yaklaşımı esas alınır.
3. KABUL EDİLEBİLİR ALTERNATİF CEVAPLAR (alternativeAnswers - ZORUNLU):
   - Kavramsal olarak aynı doğruya ulaşan farklı öğrenci ifadeleri için "alternativeAnswers" dizisine en az 2-3 alternatif eklenmelidir.
4. ANALİTİK VE PARÇALI RUBRİK:
   - Yasa veya kavram tespiti (kısmi puan) + ayet/metin gerekçelendirmesi (kısmi puan) şeklinde adımlı puanlama yapılmalıdır.
`;

export const GRADE_8_ENGLISH_DIRECTIVES = `
MEBİ 8. SINIF İNGİLİZCE OKUL YAZILILARINA HAZIRLIK VE ÖLÇME YÖNERGESİ:
1. PEDAGOGICAL APPROACH AND COMMUNICATIVE COMPETENCE:
   - Questions must focus on 8th grade classroom written exams, assessing functional language, reading comprehension, and communicative writing (open-ended and short-answer tasks).
   - Unit 1: Friendship (E8.1.R1, E8.1.R2, E8.1.W1): Accepting and refusing invitations politely, apologizing and giving explanations/reasons ("I'd love to, but I have to study", "Thanks for inviting me, I will definitely be there"), personal traits of a good friend (honest, reliable, generous, supportive, amusing, jealous, stubborn), making simple inquiries about events (date, time, place, sender, receiver).
   - Unit 2: Teen Life (E8.2.R1, E8.2.W1): Daily routines and regular activities of teenagers (listening to music, playing sports, studying, reading books), expressing preferences using "prefer ... to ..." (e.g., "I prefer pop music to rock music because it is energetic"), stated reasons and opinions with adjectives (trendy, ridiculous, unbearable, impressive, terrific).
2. AUTHENTIC AND ACCURATE STIMULUS (READING / DIALOGUE / INVITATION):
   - Reading questions must include short, realistic, self-contained stimuli: an invitation card, an email, or a dialogue between friends.
   - Avoid copying specific names and situations from MEBİ samples (e.g., Stella, Rose, Fabian); create fresh, diverse scenarios (sports events, book club meetings, hiking club invitations, concert plans).
3. MODEL ANSWERS AND ALTERNATIVE ACCEPTABLE ANSWERS (alternativeAnswers - MANDATORY):
   - Provide a grammatically correct, natural model answer in English.
   - Always include the "alternativeAnswers" array with at least 2-3 acceptable variations (e.g., short form vs. full sentence, polite alternatives: "I'd love to, but I can't come because I have another plan." / "Sorry, I can't make it because my grandparents are visiting us.").
4. ANALYTIC SCORING RUBRIC:
   - Split scoring criteria constructively: Communicative goal & message clarity (main points) + Grammatical/structural accuracy (partial points) + Spelling & vocabulary (partial points).
`;

