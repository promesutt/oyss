import { GeneratedQuestionItem, FallbackPoolContext } from '../index';

export function getMathQuestionsSetA(context: FallbackPoolContext = {}): GeneratedQuestionItem[] {
  const pointAllocations = context.pointAllocations || [];
  return [
    {
      number: 1,
      outcome: 'MAT.7.1.1',
      outcomeTitle: 'Gerçek yaşam ya da matematiksel durumlarda doğal sayı, tam sayı ve rasyonel sayıları yorumlayabilme (Ders Kitabı 1. Kitap, Sayfa 17)',
      difficulty: 'Kolay',
      level: 'Basit Bilişsel Süreçler',
      templateType: 'Görsel / Deney / Günlük Hayat Durumu',
      points: pointAllocations[0] || 15,
      stimulus: `ASELSAN'ın geliştirdiği Türkiye'nin ilk otonom su altı aracı olan Deringöz ile deniz altındaki keşif çalışmalarında deniz seviyesi $0\\text{ metre}$ referans kabul edilmiştir.
Deniz seviyesinin $8\\text{ metre}$ altındaki ($-8\\text{ m}$) Deringöz'ü kullanan bir araştırma ekibi, deniz yüzeyinin $10\\text{ metre}$ üstündeki ($+10\\text{ m}$) keşif gemisinin güvertesinden çalışmayı takip etmektedir.`,
      question: `a) Araştırma ekibinin bulunduğu nokta ile Deringöz arasındaki dikey mesafe farkını tam sayılarda çıkarma işlemi modelleyerek hesaplayınız.
b) Başlangıç noktasına (deniz seviyesine) olan mutlak uzaklıklarını mutlak değer sembolüyle ($|a|$) karşılaştırınız.`,
      answer: `a) Dikey Mesafe Farkı = $(+10) - (-8) = (+10) + (+8) = 18\\text{ metre}$'dir.
b) Mutlak Uzaklıklar: $|+10| = 10\\text{ m}$, $|-8| = 8\\text{ m}$. Araştırma ekibinin deniz seviyesine olan mutlak uzaklığı ($10\\text{ m}$), Deringöz'ün deniz seviyesine olan mutlak uzaklığından ($8\\text{ m}$) daha büyüktür ($10 > 8$).`,
      alternativeAnswers: [
        'a) 18 metre fark vardır [(+10) - (-8) = 18 m]. b) Araştırma ekibi 10 m, Deringöz 8 m uzaktadır; ekibin uzaklığı daha büyüktür.',
        'a) 18 m b) |+10| > |-8| (10 m > 8 m)'
      ],
      rubric: [
        { item: 'a şıkkında dikey fark işleminin [(+10) - (-8) = 18 m] doğru modellenmesi', pts: Math.round((pointAllocations[0] || 15) * 0.5) },
        { item: 'b şıkkında mutlak değer modellerinin (|10|=10, |-8|=8) ve karşılaştırmanın doğru yapılması', pts: (pointAllocations[0] || 15) - Math.round((pointAllocations[0] || 15) * 0.5) }
      ]
    },
    {
      number: 2,
      outcome: 'MAT.7.1.1',
      outcomeTitle: 'Doğal sayı ve tam sayı kavramlarını hava sıcaklığı verileriyle sayı doğrusunda yorumlayabilme (Ders Kitabı 1. Kitap, Sayfa 19)',
      difficulty: 'Orta',
      level: 'Karmaşık Bilişsel Süreçler',
      templateType: 'Durum & Özellik Matrisi (Tik Tablosu)',
      points: pointAllocations[1] || 15,
      stimulus: `Ocak ayının son gününde Türkiye'nin bazı illerinde beklenen en yüksek hava sıcaklıkları şöyledir:
• Antalya: $+12\\text{ °C}$
• Samsun: $+7\\text{ °C}$
• İstanbul: $+4\\text{ °C}$
• Afyon: $0\\text{ °C}$
• Ankara: $-1\\text{ °C}$
• Kars: $-4\\text{ °C}$
• Hakkâri: $-9\\text{ °C}$`,
      question: `a) Verilen sıcaklık değerlerinden doğal sayı olanları ve yalnızca tam sayı olup doğal sayı olmayanları ayrı ayrı belirleyiniz.
b) Ölçülen en yüksek sıcaklık ile en düşük sıcaklık arasındaki fark kaç $\\text{°C}$'dir? İşlemini yazınız.`,
      answer: `a) Doğal Sayı Olanlar: $+12, +7, +4, 0$ (Doğal sayılar kümesi $0$'dan başlayarak pozitif yöndedir).
Yalnızca Tam Sayı Olanlar (Negatifler): $-1, -4, -9$ (Doğal sayı değildir).
b) En yüksek: $+12\\text{ °C}$, En düşük: $-9\\text{ °C}$.
Sıcaklık Farkı = $(+12) - (-9) = (+12) + (+9) = 21\\text{ °C}$'dir.`,
      alternativeAnswers: [
        'a) Doğal sayılar: 0, 4, 7, 12; Yalnızca tam sayılar: -1, -4, -9. b) (+12) - (-9) = 21 °C fark vardır.',
        'a) Doğal: {0, 4, 7, 12}, Negatif tam sayı: {-1, -4, -9}. b) 21 °C'
      ],
      rubric: [
        { item: 'Doğal sayı olan ve olmayan sıcaklıkların eksiksiz sınıflandırılması', pts: Math.round((pointAllocations[1] || 15) * 0.5) },
        { item: 'Sıcaklık farkının [(+12) - (-9) = 21 °C] hatasız hesaplanması', pts: (pointAllocations[1] || 15) - Math.round((pointAllocations[1] || 15) * 0.5) }
      ]
    },
    {
      number: 3,
      outcome: 'MAT.7.1.2',
      outcomeTitle: 'Rasyonel sayıların ondalık ve devirli ondalık gösterimlerini belirleyebilme (Ders Kitabı 1. Kitap, Sayfa 41)',
      difficulty: 'Kolay',
      level: 'Basit Bilişsel Süreçler',
      templateType: 'Kurgusal Senaryo & Vaka İncelemesi',
      points: pointAllocations[2] || 15,
      stimulus: `Bir markette satılan bazı ürünlerin ölçüleri rasyonel sayı biçiminde etiketlenmiştir:
• Kutu sütün hacmi: $\\frac{1}{5}\\text{ L}$
• Küçük boy su şişesinin hacmi: $\\frac{1}{3}\\text{ L}$
• Madenî paranın kalınlığı: $\\frac{1}{4}\\text{ cm}$`,
      question: `a) Kutu süt ($\\frac{1}{5}$) ve küçük boy su şişesinin ($\\frac{1}{3}$) hacimlerini payı paydaya bölme yöntemiyle ondalık gösterim biçiminde yazınız.
b) Bu iki rasyonel sayıdan hangisinin 'sonlu ondalık', hangisinin 'devirli ondalık' olduğunu paydalarındaki asal çarpan kuralını açıklayarak belirtiniz.`,
      answer: `a) Bölme İşlemleri:
• Kutu Süt: $1 \\div 5 = 0,2\\text{ L}$
• Su Şişesi: $1 \\div 3 = 0,333... = 0,\\overline{3}\\text{ L}$
b) Asal Çarpan Kuralı ve Tür Belirleme:
Bir rasyonel sayı en sade halinde yazıldığında paydasında 2 ve 5 dışında başka bir asal çarpan yoksa 'sonlu ondalık', 2 ve 5 dışında en az bir asal çarpan (3, 7 vb.) varsa 'devirli ondalık' açılıma sahiptir.
• $\\frac{1}{5}$ kesrinin paydasında yalnızca 5 olduğu için SONLU ondalıktır ($0,2$).
• $\\frac{1}{3}$ kesrinin paydasında 3 asal çarpanı olduğu için DEVİRLİ ondalıktır ($0,\\overline{3}$).`,
      alternativeAnswers: [
        'a) 1/5 = 0,2 ve 1/3 = 0,333... = 0,\\bar{3}. b) 1/5 sonlu ondalık (paydada 5 var), 1/3 devirli ondalıktır (paydasında 3 asal çarpanı bulunduğu için).',
        'a) 0,2 ve 0,\\bar{3} b) Kutu süt sonlu, su şişesi devirli ondalıktır.'
      ],
      rubric: [
        { item: 'Ondalık gösterimlerin (0,2 ve 0,333... = 0,\\bar{3}) doğru bulunması', pts: Math.round((pointAllocations[2] || 15) * 0.5) },
        { item: 'Paydadaki asal çarpan kuralıyla sonlu ve devirli ondalık türlerinin gerekçelendirilmesi', pts: (pointAllocations[2] || 15) - Math.round((pointAllocations[2] || 15) * 0.5) }
      ]
    },
    {
      number: 4,
      outcome: 'MAT.7.1.2',
      outcomeTitle: 'Devirli ondalık gösterimleri rasyonel sayı biçiminde temsil edebilme (Ders Kitabı 1. Kitap, Sayfa 43)',
      difficulty: 'Orta',
      level: 'Karmaşık Bilişsel Süreçler',
      templateType: 'Hata Tespiti & Adım Analizi',
      points: pointAllocations[3] || 14,
      stimulus: `Bir hassas kuyumcu terazisinde bir gram altının saf kütlesi ekranda $2,\\overline{36}\\text{ g}$ ($2,363636...\\text{ g}$) olarak okunmuştur.`,
      question: `a) Bu devirli ondalık sayıyı rasyonel sayıya çevirme formülünü kullanarak kesir biçiminde yazınız.
b) Elde ettiğiniz rasyonel sayıyı en sade (pay ve paydası aralarında asal) kesir haline getiriniz.`,
      answer: `a) Devirli Ondalık Formülü:
$\\text{Rasyonel Kesir} = \\frac{\\text{Sayının Tamamı} - \\text{Devretmeyen Kısım}}{\\text{Devreden Kadar 9}} = \\frac{236 - 2}{99} = \\frac{234}{99}$
b) Sadeleştirme Basamakları:
234 ve 99 sayıları 9 ile sadeleştirilir:
$234 \\div 9 = 26$
$99 \\div 9 = 11$
En Sade Hali: $\\frac{26}{11}$ (veya $2\\frac{4}{11}$ tam sayılı kesir).`,
      alternativeAnswers: [
        'a) (236 - 2) / 99 = 234 / 99 b) 9 ile sadeleştirilerek 26 / 11 veya 2 tam 4/11.',
        'a) 234/99 b) 26/11'
      ],
      rubric: [
        { item: 'Devirli ondalık çevrim formülünün doğru uygulanarak 234/99 bulunması', pts: Math.round((pointAllocations[3] || 14) * 0.5) },
        { item: 'Kesrin 9 ile sadeleştirilerek en sade hali olan 26/11 (veya 2 tam 4/11) kesrinin elde edilmesi', pts: (pointAllocations[3] || 14) - Math.round((pointAllocations[3] || 14) * 0.5) }
      ]
    },
    {
      number: 5,
      outcome: 'MAT.7.1.3',
      outcomeTitle: 'Rasyonel sayıların karşılaştırma ve sıralama ilişkilerini yorumlayabilme (Ders Kitabı 1. Kitap, Sayfa 50)',
      difficulty: 'Orta',
      level: 'Karmaşık Bilişsel Süreçler',
      templateType: 'Öğrenci Diyaloğu & Kavram Yanılgısı',
      points: pointAllocations[4] || 14,
      stimulus: `Güneş sistemindeki iki gezegenin ortalama yüzey sıcaklıkları rasyonel sayılarla modellenmiştir:
• Mars: $-\\frac{125}{2}\\text{ °C}$
• Neptün: $-\\frac{401}{2}\\text{ °C}$`,
      question: `a) Mars ve Neptün'ün yüzey sıcaklıklarını rasyonel sayılarda karşılaştırma kurallarını kullanarak karşılaştırınız. Hangi gezegen daha sıcaktır?
b) Negatif rasyonel sayılarda sayı doğrusundaki konum ve sıfıra yakınlık ilkesini açıklayarak cevabınızı gerekçelendiriniz.`,
      answer: `a) Karşılaştırma: Paydaları eşit (2) olan negatif rasyonel sayılarda, payı daha büyük olan (sıfıra daha yakın olan) sayı daha büyüktür.
$-125 > -401$ olduğu için $-\\frac{125}{2} > -\\frac{401}{2}$'dir.
Bu nedenle Mars ($-\\frac{125}{2}\\text{ °C}$), Neptün'den daha sıcaktır.
b) Matematiksel Gerekçe: Negatif rasyonel sayılarda sayı doğrusunda sıfıra daha yakın olan sayı daha büyüktür. $-\\frac{125}{2} = -62,5$ sayısı sayı doğrusunda $-\\frac{401}{2} = -200,5$ sayısının daha sağında (sıfıra daha yakın) yer aldığı için daha büyük bir sıcaklık değerini temsil eder.`,
      alternativeAnswers: [
        'a) Mars daha sıcaktır (-125/2 > -401/2). b) Sayı doğrusunda -62,5 °C sıfıra daha yakın olduğu için -200,5 °C\'den daha büyüktür.',
        'a) Mars (-125/2 > -401/2) b) Negatif sayılarda sıfıra yakın olan sayı daha büyüktür.'
      ],
      rubric: [
        { item: 'Mars ve Neptün sıcaklıklarının doğru karşılaştırılarak Marsın daha sıcak olduğunun belirlenmesi', pts: Math.round((pointAllocations[4] || 14) * 0.5) },
        { item: 'Negatif rasyonel sayılarda sıfıra yakınlık kuralının sayı doğrusuyla gerekçelendirilmesi', pts: (pointAllocations[4] || 14) - Math.round((pointAllocations[4] || 14) * 0.5) }
      ]
    },
    {
      number: 6,
      outcome: 'MAT.7.1.3',
      outcomeTitle: 'Yarıma ve bütüne yakınlık stratejisi ile rasyonel sayıları sıralayabilme (Ders Kitabı 1. Kitap, Sayfa 52)',
      difficulty: 'Orta',
      level: 'Karmaşık Bilişsel Süreçler',
      templateType: 'Hata Tespiti & Adım Analizi',
      points: pointAllocations[4] || 14,
      stimulus: `Verilen rasyonel sayılar: $A = \\frac{7}{15}$, $B = \\frac{9}{10}$, $C = \\frac{4}{7}$.`,
      question: `A, B ve C rasyonel sayılarını payda eşitlemeden, 'yarıma ve bütüne yakınlık' stratejisini kullanarak küçükten büyüğe sıralayınız. Sıralamadaki mantığınızı açıklayınız.`,
      answer: `• $A = \\frac{7}{15}$: Yarım $7,5/15$ olduğu için A sayısı yarımdan küçüktür ($A < 1/2$).
• $C = \\frac{4}{7}$: Yarım $3,5/7$ olduğu için C sayısı yarımdan büyüktür ($C > 1/2$).
• $B = \\frac{9}{10}$: Bütüne ($1$ tam) sadece $1/10$ kalmıştır, 1'e çok yakındır.
Bu durumda sıralama: $A < C < B$ ($\\frac{7}{15} < \\frac{4}{7} < \\frac{9}{10}$) şeklindedir.`,
      alternativeAnswers: [
        'A yarımdan küçük (A < 0,5), C yarımdan büyük (C > 0,5), B bütüne yakındır. Sıralama: A < C < B veya 7/15 < 4/7 < 9/10.',
        '7/15 < 4/7 < 9/10 (Yarıma ve bütüne kıyasla: A < 1/2 < C < 1 < B).'
      ],
      rubric: [
        { item: 'A, B ve C kesirlerinin yarıma ve bütüne durumlarının doğru analiz edilmesi', pts: Math.round((pointAllocations[4] || 14) * 0.5) },
        { item: 'A < C < B sıralamasının hatasız yapılması', pts: (pointAllocations[4] || 14) - Math.round((pointAllocations[4] || 14) * 0.5) }
      ]
    },
    {
      number: 7,
      outcome: 'MAT.7.1.4',
      outcomeTitle: 'Rasyonel sayılar ve dikey hareket içeren gerçek yaşam problemlerini çözebilme (Ders Kitabı 1. Kitap, Sayfa 82)',
      difficulty: 'Orta',
      level: 'Karmaşık Bilişsel Süreçler',
      templateType: 'Kurgusal Senaryo & Vaka İncelemesi',
      points: pointAllocations[5] || 14,
      stimulus: `Bir araştırma denizaltısı, denizlerdeki mikroplastik kirliliğini incelemek için deniz seviyesinin $\\frac{3}{4}\\text{ km}$ altına inmiştir. Denizaltı daha sonra bulunduğu bu derinlikten $\\frac{1}{8}\\text{ km}$ yukarı çıkarak su numuneleri toplamıştır.`,
      question: `a) Deniz seviyesi $0$ referans kabul edildiğinde, denizaltının ilk inişini ve ardından yukarı çıkışını yönlü rasyonel sayılarla toplama işlemi olarak modelleyiniz.
b) Denizaltının son durumda deniz seviyesine göre konumunu rasyonel sayı ve ondalık gösterim biçiminde bulunuz.`,
      answer: `a) Matematiksel Modelleme:
• Deniz seviyesinin altına iniş: $-\\frac{3}{4}\\text{ km}$
• Yukarı çıkış: $+\\frac{1}{8}\\text{ km}$
Toplama İşlemi Modeli: $\\left(-\\frac{3}{4}\\right) + \\left(+\\frac{1}{8}\\right)$
b) İşlem Basamakları ve Çözüm:
Paydalar 8'de eşitlenir:
$-\\frac{3 \\times 2}{4 \\times 2} = -\\frac{6}{8}$
$\\left(-\\frac{6}{8}\\right) + \\left(+\\frac{1}{8}\\right) = \\frac{-6 + 1}{8} = -\\frac{5}{8}\\text{ km}$
Ondalık Gösterim: $-\\frac{5}{8} = -\\frac{5 \\times 125}{8 \\times 125} = -\\frac{625}{1000} = -0,625\\text{ km}$ (Deniz seviyesinin $0,625\\text{ km}$ altında).`,
      alternativeAnswers: [
        'a) (-3/4) + (+1/8) b) -5/8 km veya -0,625 km (Deniz seviyesinin 5/8 km altında).',
        'a) -3/4 + 1/8 b) -5/8 km (-0,625 km)'
      ],
      rubric: [
        { item: 'Dikey hareketin yönlü rasyonel sayılarla [(-3/4) + (+1/8)] doğru modellenmesi', pts: Math.round((pointAllocations[5] || 14) * 0.5) },
        { item: 'Payda eşitleme yapılarak sonucun -5/8 km (veya -0,625 km) olarak bulunması', pts: (pointAllocations[5] || 14) - Math.round((pointAllocations[5] || 14) * 0.5) }
      ]
    },
    {
      number: 8,
      outcome: 'MAT.7.1.4',
      outcomeTitle: 'Çok adımlı rasyonel işlemlerde işlem önceliği ve parantez kurallarını uygulayabilme (Ders Kitabı 1. Kitap, Sayfa 108)',
      difficulty: 'Zor',
      level: 'Karmaşık Bilişsel Süreçler',
      templateType: 'Hata Tespiti & Adım Analizi',
      points: pointAllocations[6] || 14,
      stimulus: `Matematik dersinde tahtaya yazılan $3 - \\left(\\frac{2}{5}\\right) \\div \\left(\\frac{4}{15}\\right)$ işlemini defterine çözen öğrenci şu adımları uygulamıştır:
1. Adım: Önce çıkarma işlemini yaparak: $3 - \\frac{2}{5} = \\frac{15}{5} - \\frac{2}{5} = \\frac{13}{5}$ bulmuştur.
2. Adım: Çıkan sonucu $\\frac{4}{15}$ kesrine bölmek için ters çevirip çarpmıştır: $\\left(\\frac{13}{5}\\right) \\times \\left(\\frac{15}{4}\\right)$.
3. Adım: Sadeleştirme yaparak: $\\frac{13 \\times 3}{4} = \\frac{39}{4}$ sonucuna ulaşmıştır.`,
      question: `a) Öğrencinin çözümü doğru mudur? Yanlış ise ilk hatayı hangi adımda yapmıştır? Nedenini işlem önceliği kuralıyla açıklayınız.
b) İşlemin doğru sonucunu işlem basamaklarını eksiksiz göstererek hesaplayınız.`,
      answer: `a) Öğrencinin çözümü YANLIŞTIR. İlk hatasını 1. Adımda yapmıştır.
Gerekçe: Matematikte işlem önceliği kuralına göre bölme işlemi, çıkarma işleminden önce yapılmalıdır. Öğrenci bölme işlemini beklemeden önce çıkarma yapmıştır.
b) Doğru Çözüm Basamakları:
1. Adım (Bölme): $\\left(\\frac{2}{5}\\right) \\div \\left(\\frac{4}{15}\\right) = \\left(\\frac{2}{5}\\right) \\times \\left(\\frac{15}{4}\\right) = \\frac{2 \\times 15}{5 \\times 4} = \\frac{30}{20} = \\frac{3}{2}$
2. Adım (Çıkarma): $3 - \\frac{3}{2} = \\frac{6}{2} - \\frac{3}{2} = \\frac{3}{2}$ (veya $1\\frac{1}{2}$, $1,5$).`,
      alternativeAnswers: [
        'a) Yanlıştır, 1. adımda hata yapılmıştır (işlem önceliği kuralına göre bölme çıkarmadan önce yapılmalıdır). b) Doğru sonuç: 3/2 veya 1 tam 1/2 (1,5).',
        'a) 1. adımda işlem önceliği hatası b) 3/2 (1,5)'
      ],
      rubric: [
        { item: 'İlk hatanın 1. adımda işlem önceliği kuralı ihlalinden kaynaklandığının gerekçelendirilmesi', pts: Math.round((pointAllocations[6] || 14) * 0.5) },
        { item: 'Doğru işlem sırası (önce bölme sonra çıkarma) izlenerek 3/2 (veya 1,5) sonucunun bulunması', pts: (pointAllocations[6] || 14) - Math.round((pointAllocations[6] || 14) * 0.5) }
      ]
    }
  ];
}

export function getMathQuestionsSetB(context: FallbackPoolContext = {}): GeneratedQuestionItem[] {
  const pointAllocations = context.pointAllocations || [];
  return [
    {
      number: 1,
      outcome: 'MAT.7.1.1',
      outcomeTitle: 'Tam sayılarda borç ve harçlık yönetimini yönlü sayılarla modelleyebilme (Ders Kitabı 1. Kitap, Sayfa 18)',
      difficulty: 'Kolay',
      level: 'Basit Bilişsel Süreçler',
      templateType: 'Kurgusal Senaryo & Vaka İncelemesi',
      points: pointAllocations[0] || 15,
      stimulus: `Bir okulda 7. sınıf öğrencisi olan Mert'e ailesi bütçe yönetimini öğrenmesi için dijital bir harçlık kartı vermiştir.
Kartına her hafta başında ailesi tarafından $300\\text{ TL}$ yüklenen Mert, hafta boyunca okul kırtasiyesinden ve kantinden toplam $360\\text{ TL}$ harcama yapmıştır.`,
      question: `a) Mert'in kartındaki bakiye değişimini yönlü tam sayılarla çıkarma veya toplama işlemi olarak modelleyiniz.
b) Hafta sonunda kartın son bakiyesini tam sayıyla ifade edip borç/alacak durumunu açıklayınız.`,
      answer: `a) Matematiksel Modelleme: $(+300) - (+360) = (+300) + (-360) = -60\\text{ TL}$.
b) Hafta sonu kart bakiyesi $-60\\text{ TL}$'dir. Bu durum Mert'in kartının $60\\text{ TL}$ eksi bakiyede (borçta) olduğunu gösterir.`,
      alternativeAnswers: [
        'a) (+300) - 360 = -60 TL b) Bakiye -60 TL\'dir (60 TL borç bulunmaktadır).',
        'a) 300 - 360 = -60 b) -60 TL bakiye'
      ],
      rubric: [
        { item: 'Harcama ve bakiye değişiminin [(+300) - (+360) = -60 TL] doğru modellenmesi', pts: Math.round((pointAllocations[0] || 15) * 0.5) },
        { item: 'Sonucun -60 TL borç olarak gerekçelendirilmesi', pts: (pointAllocations[0] || 15) - Math.round((pointAllocations[0] || 15) * 0.5) }
      ]
    },
    {
      number: 2,
      outcome: 'MAT.7.1.1',
      outcomeTitle: 'Mutlak değer ile hedef sapma miktarı analizi (Ders Kitabı 1. Kitap, Sayfa 114)',
      difficulty: 'Orta',
      level: 'Karmaşık Bilişsel Süreçler',
      templateType: 'Kurgusal Senaryo & Vaka İncelemesi',
      points: pointAllocations[1] || 15,
      stimulus: `Bir doğa fotoğrafçısı, makro lensiyle bir laleyi fotoğraflamak için kamerasını $90\\text{ cm}$ uzaklığa odaklamıştır. Rüzgâr nedeniyle lale sallanmış ve kaydedilen 3 fotoğrafta mesafe şöyle olmuştur:
• 1. Kare: $84\\text{ cm}$
• 2. Kare: $96\\text{ cm}$
• 3. Kare: $92\\text{ cm}$`,
      question: `a) Her üç karenin $90\\text{ cm}$ odak uzaklığına göre sapma miktarlarını mutlak değer matematiksel modeliyle ($|x - 90|$) gösteriniz.
b) Hangi karenin en net fotoğraf olduğunu mutlak sapma değerine göre gerekçelendiriniz.`,
      answer: `a) Mutlak Sapma Modelleri:
• 1. Kare: $|84 - 90| = |-6| = 6\\text{ cm}$ sapma
• 2. Kare: $|96 - 90| = |+6| = 6\\text{ cm}$ sapma
• 3. Kare: $|92 - 90| = |+2| = 2\\text{ cm}$ sapma
b) En Net Fotoğraf: 3. karedir ($92\\text{ cm}$). Çünkü mutlak sapma değeri ($2\\text{ cm}$) diğer karelerin sapmasından ($6\\text{ cm}$) daha küçüktür ($2 < 6$); yani hedeflenen $90\\text{ cm}$ odak uzaklığına en yakındır.`,
      alternativeAnswers: [
        'a) 1. kare: 6 cm, 2. kare: 6 cm, 3. kare: 2 cm. b) 3. kare en nettir çünkü odak noktasına sapması en azdır (2 cm < 6 cm).',
        'a) |-6|=6, |+6|=6, |+2|=2 b) 3. kare (sapma 2 cm)'
      ],
      rubric: [
        { item: 'Üç karenin mutlak değer sapma modellerinin (|84-90|=6, |96-90|=6, |92-90|=2) doğru yazılması', pts: Math.round((pointAllocations[1] || 15) * 0.5) },
        { item: 'En küçük mutlak sapmaya sahip 3. karenin en net fotoğraf olduğunun açıklanması', pts: (pointAllocations[1] || 15) - Math.round((pointAllocations[1] || 15) * 0.5) }
      ]
    },
    {
      number: 3,
      outcome: 'MAT.7.1.2',
      outcomeTitle: 'Su sayacı bölmelerini denk kesir ve ondalık gösterimle ilişkilendirebilme (Ders Kitabı 1. Kitap, Sayfa 26)',
      difficulty: 'Kolay',
      level: 'Basit Bilişsel Süreçler',
      templateType: 'Görsel / Deney / Günlük Hayat Durumu',
      points: pointAllocations[2] || 15,
      stimulus: `Bir okulda düzenlenen 'Su Tasarrufu Etkinliği'nde öğrencilere dijital su sayaçları verilmiştir:
• Beyza'nın su sayacında yer alan 6 eşit bölmeden 3'ü doludur.
• Yağmur'un su sayacında yer alan 8 eşit bölmeden 4'ü doludur.`,
      question: `a) Beyza ve Yağmur'un sayaçlarındaki doluluk oranlarını rasyonel sayı olarak yazıp en sade hallerine getiriniz.
b) Bu iki doluluk oranının ondalık gösterimlerini bulunuz ve denk kesir olup olmadıklarını açıklayınız.`,
      answer: `a) Doluluk Rasyonel Kesirleri:
• Beyza: $\\frac{3}{6} = \\frac{3 \\div 3}{6 \\div 3} = \\frac{1}{2}$
• Yağmur: $\\frac{4}{8} = \\frac{4 \\div 4}{8 \\div 4} = \\frac{1}{2}$
b) Ondalık Gösterim: $\\frac{1}{2} = \\frac{1 \\times 5}{2 \\times 5} = \\frac{5}{10} = 0,5$.
Açıklama: Her iki kesrin de en sade hali $\\frac{1}{2}$ ve ondalık değeri $0,5$ çıktığı için bu iki doluluk oranı birbirine DENK kesirlerdir.`,
      alternativeAnswers: [
        'a) Beyza: 3/6 = 1/2, Yağmur: 4/8 = 1/2. b) 0,5\'tir; en sade halleri eşit olduğu için denk kesirlerdir.',
        'a) 1/2 ve 1/2 b) 0,5 (denk kesirlerdir)'
      ],
      rubric: [
        { item: '3/6 ve 4/8 kesirlerinin sadeleştirilerek 1/2 olarak bulunması', pts: Math.round((pointAllocations[2] || 15) * 0.5) },
        { item: '0,5 ondalık değerinin ve denk kesir olduklarının doğru açıklanması', pts: (pointAllocations[2] || 15) - Math.round((pointAllocations[2] || 15) * 0.5) }
      ]
    },
    {
      number: 4,
      outcome: 'MAT.7.1.2',
      outcomeTitle: 'Devirli ondalık gösterimleri uzun bölme yöntemiyle belirleyebilme (Ders Kitabı 1. Kitap, Sayfa 43)',
      difficulty: 'Orta',
      level: 'Basit Bilişsel Süreçler',
      templateType: 'Hata Tespiti & Adım Analizi',
      points: pointAllocations[3] || 14,
      stimulus: `$\\frac{5}{6}$ rasyonel sayısı ondalık gösterime dönüştürülmek istenmektedir.`,
      question: `$\\frac{5}{6}$ rasyonel sayısını payı paydaya bölme yöntemiyle ondalık açılım biçiminde yazınız. Hangi basamağın devrettiğini devir çizgisiyle gösteriniz.`,
      answer: `Uzun Bölme İşlemi:
$5$'in içinde $6$ yoktur, bölüme $0,$ yazılır.
$50$'de $6$ sekiz defa ($8 \\times 6 = 48$), kalan $2$.
$20$'de $6$ üç defa ($3 \\times 6 = 18$), kalan $2$.
$20$'de $6$ üç defa ($3 \\times 6 = 18$), kalan $2$...
Kalan sürekli $2$ olarak tekrar ettiği için 3 basamağı devreder.
Sonuç: $0,8333... = 0,8\\overline{3}$'tür (Sadece 3'ün üzerinde devir çizgisi bulunur).`,
      alternativeAnswers: [
        '5/6 = 0,8333... = 0,8\\bar{3} (Yalnızca 3 devreder).',
        '0,8\\bar{3}'
      ],
      rubric: [
        { item: 'Uzun bölme işlem basamaklarının doğru kurulması', pts: Math.round((pointAllocations[3] || 14) * 0.5) },
        { item: '0,8\\bar{3} gösteriminin ve devreden basamağın (3) hatasız belirlenmesi', pts: (pointAllocations[3] || 14) - Math.round((pointAllocations[3] || 14) * 0.5) }
      ]
    },
    {
      number: 5,
      outcome: 'MAT.7.1.3',
      outcomeTitle: 'Futbol ligi averaj tablosunda negatif rasyonel sayıları sıralayabilme (Ders Kitabı 1. Kitap, Sayfa 51)',
      difficulty: 'Orta',
      level: 'Karmaşık Bilişsel Süreçler',
      templateType: 'Durum & Özellik Matrisi (Tik Tablosu)',
      points: pointAllocations[4] || 14,
      stimulus: `Bir okul futbol turnuvasında dört takımın averaj değerleri şöyledir:
• A Takımı: $-3$
• B Takımı: $+2$
• C Takımı: $-7$
• D Takımı: $0$`,
      question: `a) Dört takımın averajlarını sayı doğrusundaki yerlerini dikkate alarak küçükten büyüğe sıralayınız.
b) Negatif averajlarda mutlak değerce büyük olan sayının neden daha küçük kabul edildiğini açıklayınız.`,
      answer: `a) Sıralama: $-7 < -3 < 0 < +2$ (Takımlar: C Takımı < A Takımı < D Takımı < B Takımı).
b) Gerekçe: Sayı doğrusunda sıfırın solunda kalan negatif sayılarda sıfırdan uzaklaştıkça sayı küçülür. $-7$ sayısı sayı doğrusunda $-3$'ün daha solunda kaldığı için daha küçük bir averajı ifade eder.`,
      alternativeAnswers: [
        'a) -7 < -3 < 0 < +2 (C < A < D < B) b) Sayı doğrusunda daha solda olan sayı daha küçüktür.',
        'a) C Takımı < A Takımı < D Takımı < B Takımı b) -7 sıfırdan daha uzakta ve soldadır.'
      ],
      rubric: [
        { item: 'Averaj sıralamasının (-7 < -3 < 0 < +2) doğru yapılması', pts: Math.round((pointAllocations[4] || 14) * 0.5) },
        { item: 'Sayı doğrusunda sola gidildikçe negatif sayıların küçüleceğinin açıklanması', pts: (pointAllocations[4] || 14) - Math.round((pointAllocations[4] || 14) * 0.5) }
      ]
    },
    {
      number: 6,
      outcome: 'MAT.7.1.3',
      outcomeTitle: 'Negatif rasyonel sayıların sayı doğrusunda karşılaştırılması (Ders Kitabı 1. Kitap, Sayfa 52)',
      difficulty: 'Zor',
      level: 'Karmaşık Bilişsel Süreçler',
      templateType: 'Öğrenci Diyaloğu & Kavram Yanılgısı',
      points: pointAllocations[4] || 14,
      stimulus: `Tahtadaki $-\\frac{2}{3}$, $-\\frac{5}{6}$ ve $-\\frac{7}{12}$ rasyonel sayılarını küçükten büyüğe sıralamak isteyen iki öğrenci tartışmaktadır:
Öğrenci 1: "Paydaları 12'de eşitlersek $-\\frac{8}{12}$, $-\\frac{10}{12}$ ve $-\\frac{7}{12}$ olur. Payı büyük olan daha büyük olduğu için sıralama $-\\frac{7}{12} < -\\frac{8}{12} < -\\frac{10}{12}$ olmalıdır."
Öğrenci 2: "Negatif sayılarda sayı doğrusunda sıfırdan en uzakta ve en solda olan sayı en küçüktür. $-10$ sayısı $-7$'den küçük olduğu için en küçük kesir $-\\frac{10}{12}$'dir."`,
      question: `Hangi öğrencinin açıklaması doğrudur? Rasyonel sayıların doğru küçükten büyüğe sıralamasını yazınız.`,
      answer: `Öğrenci 2 haklıdır.
Gerekçe: Negatif sayılarda mutlak değeri büyük olan sayı, sayı doğrusunda sıfırın daha solunda kaldığı için daha küçüktür ($-10 < -8 < -7$).
Doğru Sıralama:
$-\\frac{10}{12} < -\\frac{8}{12} < -\\frac{7}{12}$
Orijinal halleriyle: $-\\frac{5}{6} < -\\frac{2}{3} < -\\frac{7}{12}$.`,
      alternativeAnswers: [
        'Öğrenci 2 haklıdır. Doğru sıralama: -5/6 < -2/3 < -7/12 (-10/12 < -8/12 < -7/12).',
        '2. öğrenci haklıdır (-5/6 < -2/3 < -7/12).'
      ],
      rubric: [
        { item: "Öğrenci 2'nin haklı olduğunun tespiti ve gerekçelendirilmesi", pts: Math.round((pointAllocations[4] || 14) * 0.5) },
        { item: 'Doğru sıralamanın (-5/6 < -2/3 < -7/12) eksiksiz yazılması', pts: (pointAllocations[4] || 14) - Math.round((pointAllocations[4] || 14) * 0.5) }
      ]
    },
    {
      number: 7,
      outcome: 'MAT.7.1.4',
      outcomeTitle: 'Enerji giderlerindeki aylık değişimi tam sayı ve rasyonel işlemlerle çözebilme (Ders Kitabı 1. Kitap, Sayfa 62)',
      difficulty: 'Orta',
      level: 'Karmaşık Bilişsel Süreçler',
      templateType: 'Kurgusal Senaryo & Vaka İncelemesi',
      points: pointAllocations[5] || 14,
      stimulus: `Gençtürk ailesi bir ay boyunca enerji tasarrufu tedbirleri uygulamıştır:
• Elektrik tüketiminde tasarruf sağlayarak faturada $+140\\text{ TL}$ tasarruf elde etmişlerdir.
• Ancak aynı ay sert kış koşulları sebebiyle doğalgazda $-260\\text{ TL}$ ek tüketim gideri oluşmuştur.`,
      question: `a) Gençtürk ailesinin aylık toplam enerji bütçesindeki değişimi yönlü tam sayılarla işlem kurarak hesaplayınız.
b) Elde ettiğiniz sonucun ailenin toplam giderini nasıl etkilediğini açıklayınız.`,
      answer: `a) Bütçe Değişim İşlemi:
$(+140) + (-260) = -120\\text{ TL}$
b) Değerlendirme: Sonuç $-120\\text{ TL}$ çıktığı için Gençtürk ailesinin enerji giderlerinde net $120\\text{ TL}$'lik bir artış (ek masraf) meydana gelmiştir.`,
      alternativeAnswers: [
        'a) (+140) + (-260) = -120 TL b) Ailenin gideri net 120 TL artmıştır (120 TL ek masraf).',
        'a) 140 - 260 = -120 TL b) 120 TL ek gider'
      ],
      rubric: [
        { item: 'Toplama işleminin [(+140) + (-260) = -120 TL] doğru kurulması ve hesaplanması', pts: Math.round((pointAllocations[5] || 14) * 0.5) },
        { item: 'Negatif sonucun 120 TL ek masraf olarak doğru yorumlanması', pts: (pointAllocations[5] || 14) - Math.round((pointAllocations[5] || 14) * 0.5) }
      ]
    },
    {
      number: 8,
      outcome: 'MAT.7.1.4',
      outcomeTitle: 'Rasyonel sayılarda bölme ve kesim problemi (Ders Kitabı 1. Kitap, Sayfa 84)',
      difficulty: 'Orta',
      level: 'Karmaşık Bilişsel Süreçler',
      templateType: 'Kurgusal Senaryo & Vaka İncelemesi',
      points: pointAllocations[6] || 14,
      stimulus: `Bir marangoz $180\\text{ cm}$ uzunluğundaki bir ahşap çıtayı, her birinin uzunluğu $7\\frac{1}{2}\\text{ cm}$ olan eşit parçalara ayırmak istemektedir. Her bir kesim işlemi $15\\text{ saniye}$ sürmektedir.`,
      question: `a) Bu çıtadan kaç adet parça elde edilir? İşlemini gösteriniz.
b) Tüm kesim işlemlerinin toplamda kaç saniye süreceğini hesaplayınız. (Parça sayısı ile kesim sayısı arasındaki ilişkiye dikkat ediniz).`,
      answer: `a) Parça Sayısı:
$7\\frac{1}{2} = \\frac{15}{2}\\text{ cm}$
$\\text{Parça Sayısı} = 180 \\div \\frac{15}{2} = 180 \\times \\frac{2}{15} = 12 \\times 2 = 24\\text{ adet parça}$.
b) Toplam Süre:
24 parça elde etmek için $24 - 1 = 23\\text{ kesim}$ yapılır.
$\\text{Toplam Süre} = 23 \\times 15 = 345\\text{ saniye}$ sürer ($5\\text{ dakika } 45\\text{ saniye}$).`,
      alternativeAnswers: [
        'a) 180 / (15/2) = 24 parça. b) 24 parça için 23 kesim yapılır; 23 x 15 = 345 saniye (5 dk 45 sn).',
        'a) 24 parça b) 345 saniye (23 kesim)'
      ],
      rubric: [
        { item: 'a şıkkında rasyonel bölme ile 24 parça sonucunun bulunması', pts: Math.round((pointAllocations[6] || 14) * 0.5) },
        { item: 'b şıkkında kesim sayısının (24 - 1 = 23) alınıp 345 saniyenin hatasız hesaplanması', pts: (pointAllocations[6] || 14) - Math.round((pointAllocations[6] || 14) * 0.5) }
      ]
    }
  ];
}

export function getMathQuestionsSetAlgebra(): GeneratedQuestionItem[] {
  return [
    {
      number: 1,
      outcome: 'MAT.7.2.1',
      outcomeTitle: 'Cebirsel ifadeleri modelleyerek toplama/çıkarma işlemlerini geometrik çevreyle ilişkilendirebilme',
      difficulty: 'Orta',
      level: 'Karmaşık Bilişsel Süreçler',
      templateType: 'Kurgusal Senaryo & Vaka İncelemesi',
      points: 15,
      stimulus: `Bir okul bahçesine yapılacak dikdörtgen şeklindeki basketbol sahasının kenar uzunlukları:
Uzun Kenar: $(5x + 3)\\text{ metre}$
Kısa Kenar: $(2x - 1)\\text{ metre}$ olarak projelendirilmiştir.
Sahanın çevresine güvenlik amacıyla 2 sıra koruyucu şerit çekilecektir.`,
      question: `a) Basketbol sahasının 1 turluk çevresini x cinsinden en sade cebirsel ifade olarak bulunuz.
b) $x = 6\\text{ metre}$ için çekilecek 2 sıra koruyucu şeridin toplam uzunluğunun kaç metre olduğunu hesaplayınız.`,
      answer: `a) Çevre = $2 \\times [(5x + 3) + (2x - 1)] = 2 \\times (7x + 2) = 14x + 4\\text{ metre}$.
b) $x = 6$ için 1 tur = $14(6) + 4 = 88\\text{ m}$. 2 sıra şerit: $88 \\times 2 = 176\\text{ metre}$.`,
      alternativeAnswers: ['a) 14x + 4 b) 176 metre'],
      rubric: [
        { item: '1 turluk çevre cebirsel ifadesinin (14x + 4) doğru bulunması', pts: 8 },
        { item: 'x = 6 konularak 2 sıra için 176 m sonucunun elde edilmesi', pts: 7 }
      ]
    },
    {
      number: 2,
      outcome: 'MAT.7.2.2',
      outcomeTitle: 'Birinci dereceden bir bilinmeyenli denklem kurarak para ve adet problemlerini çözebilme',
      difficulty: 'Zor',
      level: 'Karmaşık Bilişsel Süreçler',
      templateType: 'Dilemma (İkilem) & Denklem Çözümü',
      points: 15,
      stimulus: `Kumbarasında sadece $5\\text{ TL}$ ve $10\\text{ TL}$'lik madenî paralar biriktiren öğrencinin kumbarasında toplam 30 adet madenî para bulunmaktadır.
Kumbaradaki paraların toplam parasal değeri $220\\text{ TL}$'dir.`,
      question: `a) $10\\text{ TL}$'lik madenî paraların sayısına "x" diyerek toplam parasal değeri veren birinci dereceden bir bilinmeyenli denklemi kurunuz.
b) Denklemi çözerek kumbarada kaç adet $5\\text{ TL}$ ve kaç adet $10\\text{ TL}$ olduğunu bulunuz.`,
      answer: `a) $10x + 5(30 - x) = 220$
b) $10x + 150 - 5x = 220 \\Rightarrow 5x = 70 \\Rightarrow x = 14$ adet ($10\\text{ TL}$).
$5\\text{ TL}$ sayısı = $30 - 14 = 16\\text{ adet}$.`,
      alternativeAnswers: ['a) 10x + 5(30-x) = 220 b) 14 adet 10 TL, 16 adet 5 TL'],
      rubric: [
        { item: 'Denklemin [10x + 5(30 - x) = 220] hatasız kurulması', pts: 8 },
        { item: 'x = 14 (10 TL) ve 16 adet 5 TL olduğunun doğru hesaplanması', pts: 7 }
      ]
    }
  ];
}

export const matQuestions_SetA: GeneratedQuestionItem[] = getMathQuestionsSetA();
export const matQuestions_SetB: GeneratedQuestionItem[] = getMathQuestionsSetB();
export const matQuestions_SetAlgebra: GeneratedQuestionItem[] = getMathQuestionsSetAlgebra();
