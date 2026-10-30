export interface GeneratedQuestionItem {
  number: number;
  outcome: string;
  outcomeTitle: string;
  difficulty: 'Kolay' | 'Orta' | 'Zor';
  level: string;
  templateType: string;
  points: number;
  stimulus: string;
  question: string;
  answer: string;
  alternativeAnswers?: string[];
  solutionExplanation?: string;
  rubric: { item: string; pts: number }[];
  sharedSourceId?: string;
  commonStimulus?: string;
  hasMissingSourceError?: boolean;
  sourceValidationError?: string;
}

export interface FallbackPoolContext {
  name1?: string;
  name2?: string;
  pointAllocations?: number[];
}

export * from './grade7/scienceFallbackPool';
export * from './grade7/mathFallbackPool';
export * from './grade7/turkishFallbackPool';
export * from './grade7/socialFallbackPool';
export * from './grade7/dinFallbackPool';

import { getScienceQuestionsSetA, getScienceQuestionsSetB } from './grade7/scienceFallbackPool';
import { getMathQuestionsSetA, getMathQuestionsSetB, getMathQuestionsSetAlgebra } from './grade7/mathFallbackPool';
import { getTurkishQuestionsSetA, getTurkishQuestionsSetB } from './grade7/turkishFallbackPool';
import { getSocialQuestionsSetA, getSocialQuestionsSetB } from './grade7/socialFallbackPool';
import { getDinQuestionsSetA, getDinQuestionsSetB } from './grade7/dinFallbackPool';

export function getTurkish5thQuestionsSetA(context: FallbackPoolContext = {}): GeneratedQuestionItem[] {
  const pointAllocations = context.pointAllocations || [];
  return [
    {
      number: 1,
      outcome: 'T.O.5.6',
      outcomeTitle: 'Metnin yüzey anlamını belirleyebilme',
      difficulty: 'Kolay',
      level: 'Basit Bilişsel Süreçler',
      points: pointAllocations[0] || 15,
      templateType: 'Kurgusal Senaryo & Vaka İncelemesi',
      stimulus: `Karadeniz kıyısındaki sarp kayalıkların üzerinde yükselen fenerin bekçisi Hasan Dede, elli yıldır her akşam gün batarken fenerin dev lambasını yakardı. Fırtınalı gecelerde gözünü bile kırpmaz, dalgaların arasında yolunu bulmaya çalışan balıkçı takalarını emniyetle limana ulaştırmak için ışığı yönlendirirdi. Köyün gençleri ona 'denizin gözü' derdi.`,
      question: `Metne göre fener bekçisi Hasan Dede'nin balıkçıları emniyetle limana ulaştırmak için fırtınalı gecelerde yaptığı fedakârlığı açıklayınız.`,
      answer: `Hasan Dede elli yıl boyunca her akşam gün batımında feneri yakmış; fırtınalı gecelerde gözünü dahi kırpmadan fenerin ışığını yönlendirerek balıkçı teknelerinin kayalıklara çarpmadan emniyetle limana sığınmasını sağlamıştır.`,
      alternativeAnswers: [
        'Fırtınalı havalarda hiç uyumadan fenerin ışığını dalgaların arasındaki balıkçı takalarına doğrultarak onların güvenle karaya varmasını sağlamasıdır.',
        'Denizin ortasındaki teknelerin kayalıklara çarpmaması için uykusuz kalarak fener ışığıyla onlara yol göstermesidir.'
      ],
      rubric: [
        { item: "Hasan Dede'nin uykusuz kalarak feneri yönlendirdiğinin belirtilmesi", pts: Math.round((pointAllocations[0] || 15) * 0.5) },
        { item: 'Balıkçıların güvenle limana ulaşmasını sağlama amacının yazılması', pts: Math.round((pointAllocations[0] || 15) * 0.5) }
      ]
    },
    {
      number: 2,
      outcome: 'T.O.5.7',
      outcomeTitle: 'Görselle iletilen anlamı belirleyebilme',
      difficulty: 'Orta',
      level: 'Basit Bilişsel Süreçler',
      points: pointAllocations[1] || 15,
      templateType: 'Görsel Yorumlama & İleti Çıkarımı',
      stimulus: `[Görsel Açıklaması: Afişin üst tarafında karanlık ve hırçın dalgalar arasında yol alan küçük bir balıkçı teknesi, arka planda ise sarp kayalıklardan gökyüzüne uzanan parlak beyaz bir fener ışığı demeti yer almaktadır. Afişin altında büyük harflerle 'Karanlığa Değil, Umuda Bak!' sloganı yazılıdır.]`,
      question: `Yukarıda betimlenen afişteki 'hırçın dalgalar' ve 'fener ışığı' arasındaki tezatlıktan (karşıtlıktan) hareketle verilmek istenen ana iletiyi açıklayınız.`,
      answer: `Afişteki hırçın dalgalar hayatta karşılaşılan zorlukları, fırtınaları ve tehlikeleri simgelerken fener ışığı ise rehberliği, umudu ve dayanışmayı temsil etmektedir. Verilmek istenen mesaj; en zor anlarda bile karamsarlığa kapılmamak ve doğru yol göstericilere güvenmektir.`,
      alternativeAnswers: [
        'Zorluklar ve engeller karşısında umutsuzluğa kapılmayıp rehberliğin ve umudun aydınlığına tutunmak gerektiği anlatılmaktadır.',
        'Fırtınalı dalgalar hayatın zorluklarını, fener ışığı ise güveni ve kurtuluşu ifade eder.'
      ],
      rubric: [
        { item: 'Dalga ve fener ışığı sembollerinin karşıtlığının doğru yorumlanması', pts: Math.round((pointAllocations[1] || 15) * 0.5) },
        { item: 'Afişin ana iletisinin (umudu kaybetmeme / yol göstericiye güvenme) yazılması', pts: Math.round((pointAllocations[1] || 15) * 0.5) }
      ]
    },
    {
      number: 3,
      outcome: 'T.O.5.20',
      outcomeTitle: 'Metinden hareketle söz varlığını geliştirmeye yönelik çözümleme yapabilme',
      difficulty: 'Orta',
      level: 'Basit Bilişsel Süreçler',
      points: pointAllocations[2] || 15,
      templateType: 'Kelime Anlamı & Bağlamsal Çözümleme',
      stimulus: `Hasan Dede, yeni yetişen genç kaptanlara denizin şakaya gelmeyeceğini, her zaman 'ihtiyatlı' davranmaları gerektiğini öğütlerdi. Yılların tecrübesiyle 'engin' suların huyunu bir kitap gibi okurdu.`,
      question: `a) Metindeki altı çizili 'ihtiyatlı' ve 'engin' sözcüklerinin anlamlarını bağlamdan hareketle yazınız.
b) Bu iki sözcüğü anlamına uygun birer cümlede kullanınız.`,
      answer: `a) İhtiyatlı: Tedbirli, dikkatli, ileriyi düşünerek hareket eden. Engin: Ucu bucağı görünmeyecek kadar geniş, açık deniz.
b) Örnek cümleler: 'Buzlu yollarda ihtiyatlı adım atmak gerekir.' / 'Gemi engin maviliklere doğru yol aldı.'`,
      alternativeAnswers: [
        'İhtiyatlı: Sakıngan ve tedbirli davranan. Engin: Uçsuz bucaksız deniz veya derinlik.',
        'İhtiyatlı: Her türlü tehlikeye karşı önceden önlem alan kimse.'
      ],
      rubric: [
        { item: "'İhtiyatlı' ve 'engin' kelimelerinin bağlama uygun anlamının tespiti", pts: Math.round((pointAllocations[2] || 15) * 0.5) },
        { item: 'Her iki kelimenin doğru birer cümlede kullanılması', pts: Math.round((pointAllocations[2] || 15) * 0.5) }
      ]
    },
    {
      number: 4,
      outcome: 'T.Y.5.13',
      outcomeTitle: 'Yazısını zenginleştirecek biçimde söz varlığını kullanabilme',
      difficulty: 'Zor',
      level: 'Karmaşık Bilişsel Süreçler',
      points: pointAllocations[3] || 15,
      templateType: 'Deyim ve Zengin Söz Varlığıyla Yazma',
      stimulus: `Köy halkı, fener bekçisi Hasan Dede'nin yarım asırlık emeğine teşekkür etmek için bir anma etkinliği düzenlemiştir.`,
      question: `Hasan Dede'nin fedakârlığını ve fenerin önemini anlatan; içinde 'kol kanat germek' ve 'göz nuru dökmek' deyimlerinin geçtiği anlamlı ve kurallı bir paragraf yazınız.`,
      answer: `Hasan Dede, elli yıl boyunca bu fenerde gecesini gündüzüne katarak göz nuru dökmüştür. Her fırtınada limana sığınan balıkçılara kol kanat germiş, onları karanlık sulardan esirgeyerek yuvalarına sağ salim kavuşturmuştur.`,
      alternativeAnswers: [
        'Fenerin ışığı altında yıllarca göz nuru döken Hasan Dede, zor durumda kalan herkese kol kanat gererek köyün en büyük güvencesi olmuştur.'
      ],
      rubric: [
        { item: "'Göz nuru dökmek' ve 'kol kanat germek' deyimlerinin anlamına uygun kullanılması", pts: Math.round((pointAllocations[3] || 15) * 0.5) },
        { item: 'Metin bağlamına uygun kurallı ve akıcı paragraf yazımı', pts: Math.round((pointAllocations[3] || 15) * 0.5) }
      ]
    },
    {
      number: 5,
      outcome: 'T.Y.5.16',
      outcomeTitle: 'Yazım ve noktalama işaretleriyle ilgili kuralları uygulayabilme',
      difficulty: 'Kolay',
      level: 'Basit Bilişsel Süreçler',
      points: pointAllocations[4] || 14,
      templateType: 'Hata Tespiti & Düzeltme',
      stimulus: `Hasan dede, 15 temmuz akşamı karadeniz'in serin sularına bakarak torununa şöyle dedi; Deniz insanı terbiye eder oğlum.`,
      question: `Verilen cümledeki yazım ve noktalama yanlışlarını tespit ederek ifadeyi kurallara uygun biçimde düzeltiniz.`,
      answer: `Hatalar:
1. 'Hasan dede' ifadesindeki 'Dede' lakap/saygı sözü olduğu için 'Dede' şeklinde büyük harfle yazılmalıdır.
2. '15 temmuz' belirli bir tarih bildirdiği için ay adı 'Temmuz' şeklinde büyük harfle yazılmalıdır.
3. Konuşma bildiren 'dedi' sözcüğünden sonra noktalı virgül (;) değil İKİ NOKTA (:) kullanılmalıdır.
Doğrusu: 'Hasan Dede, 15 Temmuz akşamı Karadeniz'in serin sularına bakarak torununa şöyle dedi: Deniz insanı terbiye eder oğlum.'`,
      alternativeAnswers: [
        'Dede kelimesinin büyük yazılması, Temmuz ay adının büyük harfle başlaması ve noktalı virgül yerine iki nokta konulması.'
      ],
      rubric: [
        { item: 'Büyük harf ve noktalama hatalarının doğru tespit edilmesi', pts: Math.round((pointAllocations[4] || 14) * 0.5) },
        { item: 'Cümlenin kurallara uygun hatasız biçimde yeniden yazılması', pts: Math.round((pointAllocations[4] || 14) * 0.5) }
      ]
    },
    {
      number: 6,
      outcome: 'T.O.5.8',
      outcomeTitle: 'Metindeki çıkarımları ve örtük anlamı belirleyebilme',
      difficulty: 'Zor',
      level: 'Karmaşık Bilişsel Süreçler',
      points: pointAllocations[5] || 13,
      templateType: 'Metin İçi Delillendirme & Örtük Anlam',
      stimulus: `Fırtına dindiğinde köylüler limana koştu. Hasan Dede'nin fener lambasını söndürüp kulübesinin önündeki eski tahta sandalyeye oturarak derin bir nefes aldığını ve hafifçe gülümsediğini gördüler.`,
      question: `Hasan Dede'nin fırtına dindikten sonra derin bir nefes alıp gülümsemesindeki duyguyu ve örtük anlamı metinden hareketle açıklayınız.`,
      answer: `Hasan Dede, bütün gece gösterdiği çabanın ve uykusuz nöbetin ardından balıkçıların hiçbir zarar görmeden kıyıya ulaştığını bilmenin getirdiği büyük bir vicdani huzur, rahatlama ve görevini yapmış olmanın mutluluğunu yaşamaktadır.`,
      alternativeAnswers: [
        'Bütün teknelerin sağ salim limana dönmesiyle içindeki endişenin yerini derin bir huzur ve görevini tamamlamış olmanın kıvancına bıraktığı anlaşılmaktadır.'
      ],
      rubric: [
        { item: 'Vicdani huzur ve rahatlama duygusunun doğru tespiti', pts: Math.round((pointAllocations[5] || 13) * 0.5) },
        { item: 'Teknelerin kurtulmuş olmasının gerekçe olarak sunulması', pts: Math.round((pointAllocations[5] || 13) * 0.5) }
      ]
    },
    {
      number: 7,
      outcome: 'T.O.5.21',
      outcomeTitle: 'Deyim ve atasözlerinin metnin anlamına katkısını belirleyebilme',
      difficulty: 'Orta',
      level: 'Basit Bilişsel Süreçler',
      points: pointAllocations[6] || 13,
      templateType: 'Deyim ve Atasözü Analizi',
      stimulus: `Köyün ihtiyar balıkçısı Hasan Dede'ye sarılarak: "Sen bizim fırtınada limanımız, zor günümüzde sığınağımız oldun. 'Dost kara günde belli olur' atasözünü bize her fırtınada yeniden yaşattın." demiştir.`,
      question: `Metinde geçen "Dost kara günde belli olur" atasözünün metne kattığı anlamı Hasan Dede'nin eylemleriyle ilişkilendirerek açıklayınız.`,
      answer: `Gerçek dostluğun ve insan sevgisinin sadece sakin ve güzel günlerde değil; tehlikeli, fırtınalı ve zor zamanlarda yapılan fedakârlıklarla kanıtlandığını ifade eder. Hasan Dede de balıkçılar için bu zor günün gerçek ve sarsılmaz dostu olmuştur.`,
      alternativeAnswers: [
        'Zor ve tehlikeli zamanlarda insanların birbirine sahip çıkması gerektiği, Hasan Dede\'nin de fırtınalı gecelerde köylülere can yoldaşı olduğu vurgulanmaktadır.'
      ],
      rubric: [
        { item: 'Atasözünün anlamının doğru açıklanması', pts: Math.round((pointAllocations[6] || 13) * 0.5) },
        { item: "Hasan Dede'nin fırtınadaki yardımlarıyla bağ kurulması", pts: Math.round((pointAllocations[6] || 13) * 0.5) }
      ]
    }
  ];
}

export function getTurkish5thQuestionsSetB(context: FallbackPoolContext = {}): GeneratedQuestionItem[] {
  const pointAllocations = context.pointAllocations || [];
  return [
    {
      number: 1,
      outcome: 'T.O.5.6',
      outcomeTitle: 'Metnin yüzey anlamını belirleyebilme',
      difficulty: 'Kolay',
      level: 'Basit Bilişsel Süreçler',
      points: pointAllocations[0] || 15,
      templateType: 'Kurgusal Senaryo & Vaka İncelemesi',
      stimulus: `Kızılırmak'ın kırmızı killi toprağını atölyesinde yoğuran Salih Usta, ayakla dönen çarkın başına geçti. Küçük bir kil parçasını ellerinin arasında nazikçe yükseltirken çırağına döndü: 'Toprak sabırsızlığı sevmez evlat, parmaklarının ucuyla dinleyeceksin onu. Acele edersen çatlar, emek verirsen vazo olur.' dedi.`,
      question: `Metne göre Salih Usta'nın toprağı şekillendirirken çırağına sabırlı olmayı öğütlemesinin nedenini metinden hareketle açıklayınız.`,
      answer: `Salih Usta'ya göre killi toprak sabırsızlığı kabul etmez; aceleyle şekillendirilmeye çalışılırsa çatlar ve bozulur. Yalnızca sevgi, dikkat ve sabırla emek verildiğinde sağlam bir vazoya dönüşebilir.`,
      alternativeAnswers: [
        'Acele davranıldığında toprağın çatlayıp bozulacağı, ancak sabır ve emekle parmak uçlarıyla dinlenerek şekil alabileceği için çırağına sabırlı olmasını öğütlemiştir.'
      ],
      rubric: [
        { item: 'Acele edildiğinde toprağın çatlayıp bozulacağı gerekçesinin yazılması', pts: Math.round((pointAllocations[0] || 15) * 0.5) },
        { item: 'Sabır ve emekle sanat eserine dönüşeceği fikrinin açıklanması', pts: Math.round((pointAllocations[0] || 15) * 0.5) }
      ]
    },
    {
      number: 2,
      outcome: 'T.O.5.7',
      outcomeTitle: 'Görselle iletilen anlamı belirleyebilme',
      difficulty: 'Orta',
      level: 'Basit Bilişsel Süreçler',
      points: pointAllocations[1] || 15,
      templateType: 'Görsel Yorumlama & İleti Çıkarımı',
      stimulus: `[Görsel Açıklaması: Bir el sanatları afişinde, sol tarafta çatlamış ve dağılmış kuru bir çamur yığını, sağ tarafta ise üzerinde geleneksel lale motifleri parıldayan zarif bir porselen vazo resmedilmiştir. Ortada bir kum saati ve altında 'Emek ve Zaman, Çamuru Sanata Dönüştürür' sloganı bulunmaktadır.]`,
      question: `Afişteki 'dağılmış çamur' ile 'işlenmiş vazo' arasındaki dönüşümü kum saati sembolüyle ilişkilendirerek afişin vermek istediği mesajı açıklayınız.`,
      answer: `Ham çamurun paha biçilmez bir sanat eserine dönüşmesi için zamana ve sabırla gösterilen emeğe ihtiyaç vardır. Kum saati sabırlı bekleyişi ve zamanı, işlenmiş vazo ise bu sürecin sonunda elde edilen başarıyı simgeler.`,
      alternativeAnswers: [
        'Ham maddelerin değerli bir esere dönüşmesi için sabırla çalışmak ve zamana ihtiyaç duymak gerektiği anlatılmaktadır.'
      ],
      rubric: [
        { item: 'Kum saati ve dönüşüm ilişkisinin doğru açıklanması', pts: Math.round((pointAllocations[1] || 15) * 0.5) },
        { item: 'Emek ve sabrın değeri mesajının eksiksiz yazılması', pts: Math.round((pointAllocations[1] || 15) * 0.5) }
      ]
    },
    {
      number: 3,
      outcome: 'T.O.5.20',
      outcomeTitle: 'Metinden hareketle söz varlığını geliştirmeye yönelik çözümleme yapabilme',
      difficulty: 'Orta',
      level: 'Basit Bilişsel Süreçler',
      points: pointAllocations[2] || 15,
      templateType: 'Kelime Anlamı & Bağlamsal Çözümleme',
      stimulus: `Salih Usta, atölyesinde toprağı 'maharetli' elleriyle yoğurur, fırında pişen kapların 'ahenkli' renklerini hayranlıkla incelerdi.`,
      question: `a) Altı çizili 'maharetli' ve 'ahenkli' kelimelerinin metindeki anlamlarını yazınız.
b) Bu kelimelerin yerine kullanılabilecek birer eş anlamlı sözcük yazınız.`,
      answer: `a) Maharetli: Becerikli, usta, elinden iş gelen. Ahenkli: Uyumlu, birbiriyle dengeli ve güzel görünen.
b) Eş anlamlıları: Maharetli -> Becerikli / Usta; Ahenkli -> Uyumlu.`,
      alternativeAnswers: [
        'Maharetli: İşi ustalıkla yapan, hünerli. Ahenkli: Renkleri ve çizgileri birbiriyle uyum içinde olan.'
      ],
      rubric: [
        { item: "'Maharetli' ve 'ahenkli' sözcüklerinin anlamlarının doğru tespiti", pts: Math.round((pointAllocations[2] || 15) * 0.5) },
        { item: 'Her iki kelime için uygun eş anlamlıların yazılması', pts: Math.round((pointAllocations[2] || 15) * 0.5) }
      ]
    },
    {
      number: 4,
      outcome: 'T.Y.5.13',
      outcomeTitle: 'Yazısını zenginleştirecek biçimde söz varlığını kullanabilme',
      difficulty: 'Zor',
      level: 'Karmaşık Bilişsel Süreçler',
      points: pointAllocations[3] || 15,
      templateType: 'Deyim ve Zengin Söz Varlığıyla Yazma',
      stimulus: `Salih Usta'nın çırağı Kerem, ilk vazosunu tamamladığında ustasının yanına heyecanla gelmiştir.`,
      question: `Kerem'in çömlek yaparken harcadığı çabayı ve başarısını anlatan; içinde 'alın teri dökmek' ve 'canla başla çalışmak' deyimlerinin yer aldığı kısa bir metin yazınız.`,
      answer: `Kerem, günlerdir çarkın başında canla başla çalışarak kili şekillendirmeye gayret etti. Döktüğü her damla alın teri, fırından çıkan pürüzsüz vazonun üzerinde bir gurur madalyası gibi parıldıyordu.`,
      alternativeAnswers: [
        'İlk eserini ortaya koymak için günlerce alın teri döken Kerem, ustasının dediklerini uygulayarak canla başla çalıştı ve vazosunu başarıyla tamamladı.'
      ],
      rubric: [
        { item: "'Alın teri dökmek' ve 'canla başla çalışmak' deyimlerinin bağlama uygun kullanımı", pts: Math.round((pointAllocations[3] || 15) * 0.5) },
        { item: 'Anlamlı ve tutarlı kurgusal metin oluşturma', pts: Math.round((pointAllocations[3] || 15) * 0.5) }
      ]
    },
    {
      number: 5,
      outcome: 'T.Y.5.16',
      outcomeTitle: 'Yazım ve noktalama işaretleriyle ilgili kuralları uygulayabilme',
      difficulty: 'Kolay',
      level: 'Basit Bilişsel Süreçler',
      points: pointAllocations[4] || 14,
      templateType: 'Hata Tespiti & Düzeltme',
      stimulus: `Salih Usta çırağına sordu; Nevşehir'deki atölyemizde üretilen kaplar, ankara ve istanbul'a da gönderilecek mi.`,
      question: `Yukarıdaki cümlede büyük harflerin yazımı ve noktalama işaretleriyle ilgili yapılan 3 hatayı düzeltiniz ve cümlenin doğru şeklini yazınız.`,
      answer: `Hatalar:
1. Konuşma bildiren 'sordu' sözcüğünden sonra noktalı virgül (;) değil İKİ NOKTA (:) konmalıdır.
2. 'ankara ve istanbul' özel isim oldukları için büyük harfle 'Ankara ve İstanbul' şeklinde başlamalı ve gelen ekler kesme işaretiyle ayrılmalıdır (İstanbul'a).
3. Soru anlamı taşıyan cümlenin sonuna nokta (.) değil SORU İŞARETİ (?) konmalıdır.
Doğrusu: Salih Usta çırağına sordu: Nevşehir'deki atölyemizde üretilen kaplar, Ankara ve İstanbul'a da gönderilecek mi?`,
      alternativeAnswers: [
        'Noktalı virgül yerine iki nokta konulmalı, Ankara ve İstanbul büyük harfle yazılmalı, cümlenin sonuna soru işareti getirilmelidir.'
      ],
      rubric: [
        { item: 'İki nokta, büyük harf ve soru işareti hatalarının doğru tespiti', pts: Math.round((pointAllocations[4] || 14) * 0.5) },
        { item: 'Cümlenin imla kurallarına uygun hatasız yazılması', pts: Math.round((pointAllocations[4] || 14) * 0.5) }
      ]
    }
  ];
}

export function getTurkish5thQuestionsSetC(context: FallbackPoolContext = {}): GeneratedQuestionItem[] {
  const pointAllocations = context.pointAllocations || [];
  return [
    {
      number: 1,
      outcome: 'T.O.5.6',
      outcomeTitle: 'Metnin yüzey anlamını belirleyebilme',
      difficulty: 'Kolay',
      level: 'Basit Bilişsel Süreçler',
      points: pointAllocations[0] || 15,
      templateType: 'Kurgusal Senaryo & Vaka İncelemesi',
      stimulus: `Okul bahçesinin atıl köşesini yeşertmek isteyen 5. sınıf öğrencileri, fen öğretmenleriyle birlikte bir botanik serası kurdular. Her öğrenci evinden getirdiği tohumları saksılara ekti, nöbetleşe sulama takvimi hazırladılar. Kurak geçen günlerde damla sulama borularını elleriyle döşeyerek tek bir damla suyun bile boşa gitmesini engellediler.`,
      question: `Metne göre öğrencilerin kurak günlerde fidanları yaşatmak ve suyu korumak için aldıkları somut önlemi yazınız.`,
      answer: `Öğrenciler kurak günlerde tek bir damla suyun bile israf olmasını önlemek için elleriyle damla sulama boruları döşemiş ve nöbetleşe sulama takvimi uygulayarak fidanları korumuşlardır.`,
      alternativeAnswers: [
        'Damla sulama sistemi borularını kendileri döşeyerek su israfını engellemişler ve nöbetleşe sulama yapmışlardır.'
      ],
      rubric: [
        { item: 'Damla sulama sisteminin döşenmesi önleminin yazılması', pts: Math.round((pointAllocations[0] || 15) * 0.5) },
        { item: 'Suyun israfını engelleme ve nöbetleşe bakım bilincinin açıklanması', pts: Math.round((pointAllocations[0] || 15) * 0.5) }
      ]
    },
    {
      number: 2,
      outcome: 'T.O.5.7',
      outcomeTitle: 'Görselle iletilen anlamı belirleyebilme',
      difficulty: 'Orta',
      level: 'Basit Bilişsel Süreçler',
      points: pointAllocations[1] || 15,
      templateType: 'Görsel Yorumlama & İleti Çıkarımı',
      stimulus: `[Görsel Açıklaması: Bir çevre koruma afişinde, bir musluktan damlayan tek bir su damlasının içinde yeşeren küçük bir meşe fidanı resmi bulunmaktadır. Afişin sağ tarafında 'Bir Damla Su, Bir Orman Hayat' sloganı yer almaktadır.]`,
      question: `Afişteki su damlasının içinde filizlenen fidan görselinden hareketle afişin vermek istediği temel düşünceyi açıklayınız.`,
      answer: `Küçük görünen tek bir su damlasının bile bir fidanın büyümesi ve gelecekte büyük bir ormana dönüşmesi için hayati değer taşıdığı, bu yüzden her damla suyun korunması gerektiği vurgulanmaktadır.`,
      alternativeAnswers: [
        'En küçük su tasarrufunun bile canlıların yaşamı ve doğanın yeşermesi için çok kıymetli olduğu anlatılmaktadır.'
      ],
      rubric: [
        { item: 'Su damlası ve fidan ilişkisinin doğru çözümlenmesi', pts: Math.round((pointAllocations[1] || 15) * 0.5) },
        { item: 'Su tasarrufu ve doğayı koruma ana fikrinin yazılması', pts: Math.round((pointAllocations[1] || 15) * 0.5) }
      ]
    },
    {
      number: 3,
      outcome: 'T.O.5.20',
      outcomeTitle: 'Metinden hareketle söz varlığını geliştirmeye yönelik çözümleme yapabilme',
      difficulty: 'Orta',
      level: 'Basit Bilişsel Süreçler',
      points: pointAllocations[2] || 15,
      templateType: 'Kelime Anlamı & Bağlamsal Çözümleme',
      stimulus: `Fidanların toprağa tutunabilmesi için gereken 'can suyu' verildiğinde bahçe adeta 'şenlik' havasına büründü.`,
      question: `a) Metinde geçen 'can suyu' teriminin anlamını açıklayınız.
b) 'Şenlik' kelimesinin metindeki bağlamsal anlamını yazıp bir cümlede kullanınız.`,
      answer: `a) Can suyu: Yeni dikilen fidanın köklerinin toprakla kaynaşması için dikilir dikilmez verilen ilk su.
b) Şenlik: Neşeli, coşkulu ve sevinç dolu ortam. Örnek cümle: 'Bahçedeki kuş cıvıltıları mahalleye şenlik getirdi.'`,
      alternativeAnswers: [
        'Can suyu: Fidan dikildikten hemen sonra verilen ilk hayat suyu. Şenlik: Büyük neşe ve sevinç kaynağı.'
      ],
      rubric: [
        { item: "'Can suyu' kavramının doğru açıklanması", pts: Math.round((pointAllocations[2] || 15) * 0.5) },
        { item: "'Şenlik' kelimesinin bağlamsal anlamı ve örnek cümlesi", pts: Math.round((pointAllocations[2] || 15) * 0.5) }
      ]
    },
    {
      number: 4,
      outcome: 'T.Y.5.13',
      outcomeTitle: 'Yazısını zenginleştirecek biçimde söz varlığını kullanabilme',
      difficulty: 'Zor',
      level: 'Karmaşık Bilişsel Süreçler',
      points: pointAllocations[3] || 15,
      templateType: 'Deyim ve Zengin Söz Varlığıyla Yazma',
      stimulus: `Öğrenciler seranın ilk hasadında yetiştirdikleri taze çilekleri okulun diğer sınıflarıyla paylaşmıştır.`,
      question: `Öğrencilerin bahçedeki dayanışmasını ve emeğini anlatan; içinde 'el birliği yapmak' ve 'yüreğini koymak' deyimlerinin geçtiği bir paragraf yazınız.`,
      answer: `Öğrenciler atıl bahçeyi bir cennete dönüştürmek için el birliği yaptılar. Her biri bu projeye yüreğini koyarak tohumları sevgiyle suladı ve sonunda bereketli bir hasada ulaştılar.`,
      alternativeAnswers: [
        'Tüm sınıf el birliği yaparak serayı kurdu; herkes yüreğini koyarak çalıştığı için ortaya harika bir bahçe çıktı.'
      ],
      rubric: [
        { item: "'El birliği yapmak' ve 'yüreğini koymak' deyimlerinin yerinde kullanımı", pts: Math.round((pointAllocations[3] || 15) * 0.5) },
        { item: 'Dayanışmayı anlatan anlamlı paragraf oluşturma', pts: Math.round((pointAllocations[3] || 15) * 0.5) }
      ]
    },
    {
      number: 5,
      outcome: 'T.Y.5.16',
      outcomeTitle: 'Yazım ve noktalama işaretleriyle ilgili kuralları uygulayabilme',
      difficulty: 'Kolay',
      level: 'Basit Bilişsel Süreçler',
      points: pointAllocations[4] || 14,
      templateType: 'Hata Tespiti & Düzeltme',
      stimulus: `Öğretmenimiz şöyle dedi; 23 nisan günü seramızdaki çiçekleri van'dan gelen misafirlerimize hediye edeceğiz.`,
      question: `Yukarıdaki cümlede büyük harf ve noktalama kurallarına aykırı 3 hatayı düzeltip cümlenin doğrusunu yazınız.`,
      answer: `Hatalar:
1. 'dedi' kelimesinden sonra noktalı virgül (;) değil İKİ NOKTA (:) konmalıdır.
2. '23 nisan' belirli bir tarihi belirttiği için ay adı büyük harfle '23 Nisan' yazılmalıdır.
3. 'van'dan' özel isim olduğu için büyük harfle 'Van'dan' şeklinde yazılmalıdır.
Doğrusu: Öğretmenimiz şöyle dedi: 23 Nisan günü seramızdaki çiçekleri Van'dan gelen misafirlerimize hediye edeceğiz.`,
      alternativeAnswers: [
        'Noktalı virgül yerine iki nokta gelmeli, Nisan ve Van kelimeleri büyük harfle başlamalıdır.'
      ],
      rubric: [
        { item: 'İki nokta, Nisan ve Van yazım hatalarının tespiti', pts: Math.round((pointAllocations[4] || 14) * 0.5) },
        { item: 'Cümlenin hatasız yazılması', pts: Math.round((pointAllocations[4] || 14) * 0.5) }
      ]
    }
  ];
}

export function getEnglishQuestions(context: FallbackPoolContext = {}): GeneratedQuestionItem[] {
  const pointAllocations = context.pointAllocations || [];
  return [
    {
      number: 1,
      outcome: 'E7.1.R1',
      outcomeTitle: 'Students will be able to understand short and simple texts about biographies',
      difficulty: 'Orta',
      level: 'Karmaşık Bilişsel Süreçler',
      points: pointAllocations[0] || 15,
      templateType: 'Hata Tespiti & Adım Analizi',
      stimulus: `"Marie Curie was borned in 1867 in Poland. She was more hardworking that other students. She discover radium and won two Nobel Prizes."`,
      question: `Find two grammatical errors in the text and rewrite the corrected phrases.`,
      answer: `Corrections:
1. "was borned" -> Correct: "was born" (Irregular verb).
2. "more hardworking that" -> Correct: "more hardworking THAN" (Comparative rule).`,
      rubric: [
        { item: '"was born" düzeltmesi', pts: Math.round((pointAllocations[0] || 15) * 0.5) },
        { item: '"more hardworking than" düzeltmesi', pts: Math.round((pointAllocations[0] || 15) * 0.5) }
      ]
    },
    {
      number: 2,
      outcome: 'E7.2.W1',
      outcomeTitle: 'Students will be able to write pieces comparing sports and extreme activities',
      difficulty: 'Zor',
      level: 'Karmaşık Bilişsel Süreçler',
      points: pointAllocations[1] || 15,
      templateType: 'Durum / Özellik Matrisi',
      stimulus: `Comparison: Hiking vs Bungee Jumping
• Hiking: Danger: Low | Equipment: Boots | Adrenaline: Moderate
• Bungee Jumping: Danger: High | Equipment: Elastic rope | Adrenaline: Extreme`,
      question: `Write two comparative sentences using "dangerous" and "exciting".`,
      answer: `1. "Bungee jumping is more dangerous than hiking."
2. "Bungee jumping is more exciting than hiking."`,
      rubric: [
        { item: '"more dangerous than" cümlesinin doğru yazımı', pts: Math.round((pointAllocations[1] || 15) * 0.5) },
        { item: '"more exciting than" cümlesinin doğru yazımı', pts: Math.round((pointAllocations[1] || 15) * 0.5) }
      ]
    },
    {
      number: 3,
      outcome: 'E7.3.R1',
      outcomeTitle: 'Students will be able to recognize specific information in texts about wild animals',
      difficulty: 'Kolay',
      level: 'Basit Bilişsel Süreçler',
      points: pointAllocations[2] || 15,
      templateType: 'Metin İçi Delillendirme',
      stimulus: `"Pandas live in bamboo forests of China. They are herbivores because they eat only bamboo. They are in danger of extinction due to deforestation."`,
      question: `a) Why are pandas categorized as herbivores?
b) Why are pandas in danger of extinction?`,
      answer: `a) Because they eat only bamboo (plants).
b) Because of deforestation (loss of natural habitats).`,
      rubric: [
        { item: 'a şıkkında bamboo yeme tespiti', pts: Math.round((pointAllocations[2] || 15) * 0.5) },
        { item: 'b şıkkında habitat kaybı/deforestation tespiti', pts: Math.round((pointAllocations[2] || 15) * 0.5) }
      ]
    },
    {
      number: 4,
      outcome: 'E7.4.W1',
      outcomeTitle: 'Students will be able to write simple suggestions for protecting the environment',
      difficulty: 'Orta',
      level: 'Karmaşık Bilişsel Süreçler',
      points: pointAllocations[3] || 15,
      templateType: 'Dilemma (İkilem) & Çözüm',
      stimulus: `Our city faces heavy air pollution and waste problems.`,
      question: `Write two suggestion sentences using "should" or "must":
1. About transport/cars.
2. About recycling/plastic.`,
      answer: `1. "People should walk or ride bicycles instead of driving cars."
2. "We must recycle plastic bottles and paper."`,
      rubric: [
        { item: 'Ulaşım hakkında kuralına uygun should cümlesi', pts: Math.round((pointAllocations[3] || 15) * 0.5) },
        { item: 'Geri dönüşüm hakkında must cümlesi', pts: Math.round((pointAllocations[3] || 15) * 0.5) }
      ]
    },
    {
      number: 5,
      outcome: 'E7.2.R1',
      outcomeTitle: 'Students will be able to understand frequency adverbs in daily routines',
      difficulty: 'Kolay',
      level: 'Basit Bilişsel Süreçler',
      points: pointAllocations[4] || 14,
      templateType: 'Durum & Özellik Matrisi',
      stimulus: `Mark's routine: Swimming (everyday: 7 days), Basketball (Monday, Friday: 2 days), Tennis (never: 0 days).`,
      question: `Complete with always, sometimes, never:
a) Mark ................... goes swimming.
b) Mark ................... plays tennis.`,
      answer: `a) Mark ALWAYS goes swimming.
b) Mark NEVER plays tennis.`,
      rubric: [
        { item: 'a şıkkında "always" doğru yazımı', pts: Math.round((pointAllocations[4] || 14) * 0.5) },
        { item: 'b şıkkında "never" doğru yazımı', pts: Math.round((pointAllocations[4] || 14) * 0.5) }
      ]
    },
    {
      number: 6,
      outcome: 'E7.5.R1',
      outcomeTitle: 'Students will be able to make simple predictions about future life',
      difficulty: 'Zor',
      level: 'Karmaşık Bilişsel Süreçler',
      points: pointAllocations[5] || 14,
      templateType: 'Öğrenci Diyaloğu & Fikir Savunma',
      stimulus: `Discussion about year 2050.`,
      question: `Write two future prediction sentences using "will" or "won't" about schools and technology.`,
      answer: `1. "In 2050, students won't carry heavy books because lessons will be digital."
2. "Artificial intelligence tutors will help students learn faster."`,
      rubric: [
        { item: '"will / won\'t" yapısının hatasız kullanımı', pts: Math.round((pointAllocations[5] || 14) * 0.5) },
        { item: 'Anlamlı ve tutarlı gelecek tahmini', pts: Math.round((pointAllocations[5] || 14) * 0.5) }
      ]
    }
  ];
}

export const turkceQuestions_5th_SetA: GeneratedQuestionItem[] = getTurkish5thQuestionsSetA();
export const turkceQuestions_5th_SetB: GeneratedQuestionItem[] = getTurkish5thQuestionsSetB();
export const turkceQuestions_5th_SetC: GeneratedQuestionItem[] = getTurkish5thQuestionsSetC();
export const ingilizceQuestions: GeneratedQuestionItem[] = getEnglishQuestions();

/**
 * Mevcut OYSS motorunun internalAllQuestions havuzundaki soru diziliş sırasını %100 birebir koruyarak
 * tüm soru havuzlarını bağlamsal değişkenlerle (öğrenci isimleri, puan dağılımı) döndürür.
 */
export function getAllFallbackQuestions(context: FallbackPoolContext = {}): GeneratedQuestionItem[] {
  return [
    ...getScienceQuestionsSetA(context),
    ...getScienceQuestionsSetB(context),
    ...getMathQuestionsSetA(context),
    ...getMathQuestionsSetB(context),
    ...getMathQuestionsSetAlgebra(),
    ...getTurkish5thQuestionsSetA(context),
    ...getTurkish5thQuestionsSetB(context),
    ...getTurkish5thQuestionsSetC(context),
    ...getTurkishQuestionsSetB(context),
    ...getTurkishQuestionsSetA(context),
    ...getSocialQuestionsSetB(context),
    ...getSocialQuestionsSetA(context),
    ...getDinQuestionsSetB(context),
    ...getDinQuestionsSetA(context),
    ...getEnglishQuestions(context)
  ];
}
