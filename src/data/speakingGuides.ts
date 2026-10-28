import { SpeakingGuide } from '../types';

export const SAMPLE_SPEAKING_GUIDES: SpeakingGuide[] = [
{
    "id": "speaking_5_turkce_1_1",
    "grade": 5,
    "subjectId": "turkce",
    "examTerm": "1_donem_1_yazili",
    "title": "5. Sınıf Türkçe Dinleme ve Konuşma Becerileri Uygulama Kılavuzu",
    "purpose": "MEB Ölçme ve Değerlendirme Yönetmeliği uyarınca 5. sınıf Türkçe dersinde öğrencilerin dinleme-anlama ve kendilerini sözlü ifade etme becerileri süreç odaklı olarak değerlendirilir.",
    "regulationNote": "Türkçe dersi dönem notu: %50 Yazılı Ortak Sınav + %25 Dinleme/İzleme + %25 Konuşma sınavı puanlarının aritmetik ortalamasıdır.",
    "speakingPrompts": [
      {
        "topic": "1. Kart: Aile ve Arkadaşlıkta Yardımlaşma",
        "prepTimeMinutes": 2,
        "speakTimeMinutes": 2,
        "guidingQuestions": [
          "Evde veya okulda arkadaşlarınla yardımlaştığın bir anını anlatır mısın?",
          "İş birliği yapmak bir işi nasıl kolaylaştırır?",
          "İyi bir arkadaşta hangi özellikler olmalıdır?"
        ]
      },
      {
        "topic": "2. Kart: Doğayı ve Sokak Hayvanlarını Korumak",
        "prepTimeMinutes": 2,
        "speakTimeMinutes": 2,
        "guidingQuestions": [
          "Çevremizi temiz tutmak neden hepimizin ortak sorumluluğudur?",
          "Sokak hayvanları için kış aylarında neler yapabiliriz?",
          "Doğadaki bir ağacı korumak insanlığa ne kazandırır?"
        ]
      }
    ],
    "listeningTasks": [
      {
        "scenario": "Örnek Dinleme Metni: \"Küçük Kar Tanesinin Yolculuğu\"",
        "taskDescription": "Öğrencilere 2-3 dakikalık hikâye edici bir ses kaydı veya öğretmen anlatısı iki defa dinletilir. Dinleme sonrasında olay örgüsü ve kahramanların özellikleri sorulur.",
        "targetSkills": [
          "Dinlediği metindeki ana karakterleri ve olay örgüsünü belirleme",
          "Dinlediklerinden hareketle çıkarımda bulunma",
          "Nezaket kurallarına uygun dinleme davranışı sergileme"
        ]
      }
    ],
    "evaluationRubric": [
      {
        "category": "Konuşma: Telaffuz ve Beden Dili",
        "maxPoints": 25,
        "criteria": [
          "Kelimeleri doğru sesletme",
          "Göz teması kurma",
          "Doğal jest ve mimik kullanımı"
        ]
      },
      {
        "category": "Konuşma: İçerik ve Düşünceyi İfade",
        "maxPoints": 25,
        "criteria": [
          "Konuya bağlı kalma",
          "Gereksiz tekrarlardan kaçınma",
          "Düşüncelerini mantıksal sırayla aktarma"
        ]
      },
      {
        "category": "Dinleme: Ana ve Yardımcı Fikir",
        "maxPoints": 25,
        "criteria": [
          "Metnin konusunu doğru kavrama",
          "Dinlediği hikâyenin sonucunu tahmin etme"
        ]
      },
      {
        "category": "Dinleme: Ayrıntıları Yakalama",
        "maxPoints": 25,
        "criteria": [
          "Olayın nerede ve ne zaman geçtiğini belirleme",
          "Yönergeleri eksiksiz uygulama"
        ]
      }
    ]
  },
  {
    "id": "speaking_5_ingilizce_1_1",
    "grade": 5,
    "subjectId": "ingilizce",
    "examTerm": "1_donem_1_yazili",
    "title": "5th Grade English Speaking & Listening Exam Practice Guide",
    "purpose": "In line with the MEB Foreign Language Assessment Framework, 5th grade English evaluation consists of 50% written exam and 50% speaking/listening performance tasks.",
    "regulationNote": "Foreign language marks include speaking and listening performance rubrics conducted during regular class hours.",
    "speakingPrompts": [
      {
        "topic": "Prompt 1: Introduce Yourself and Your Country",
        "prepTimeMinutes": 2,
        "speakTimeMinutes": 2,
        "guidingQuestions": [
          "What is your name and how old are you?",
          "Where are you from and what nationality are you?",
          "What are your favourite school subjects?"
        ]
      },
      {
        "topic": "Prompt 2: Giving Directions in Your Town",
        "prepTimeMinutes": 2,
        "speakTimeMinutes": 2,
        "guidingQuestions": [
          "Imagine a tourist asks you the way to the cinema.",
          "Use phrases: \"Go straight ahead\", \"Turn left/right\", \"It is next to the pharmacy\".",
          "Describe 2 important places in your neighbourhood."
        ]
      }
    ],
    "listeningTasks": [
      {
        "scenario": "Audio Track: \"Welcome to London\"",
        "taskDescription": "Students listen to a short dialogue between two kids talking about their nationalities and favourite places in town.",
        "targetSkills": [
          "Identify country and nationality names correctly",
          "Understand basic location prepositions (opposite, near, behind)",
          "Match speakers with their favourite places"
        ]
      }
    ],
    "evaluationRubric": [
      {
        "category": "Speaking: Pronunciation & Fluency",
        "maxPoints": 25,
        "criteria": [
          "Clear pronunciation of target vocabulary",
          "Smooth speaking without long hesitation"
        ]
      },
      {
        "category": "Speaking: Task Achievement & Vocabulary",
        "maxPoints": 25,
        "criteria": [
          "Accurate use of target phrases (country/directions)",
          "Answering questions appropriately"
        ]
      },
      {
        "category": "Listening: Comprehension",
        "maxPoints": 25,
        "criteria": [
          "Correctly answering wh- questions about the audio track"
        ]
      },
      {
        "category": "Listening: Detail Identification",
        "maxPoints": 25,
        "criteria": [
          "Matching locations and names accurately"
        ]
      }
    ]
  },
  {
    "id": "speaking_6_turkce_1_1",
    "grade": 6,
    "subjectId": "turkce",
    "examTerm": "1_donem_1_yazili",
    "title": "6. Sınıf Türkçe Dinleme ve Konuşma Becerileri Uygulama Kılavuzu",
    "purpose": "MEB Ölçme ve Değerlendirme Yönetmeliği uyarınca 6. sınıf öğrencilerinin sözlü iletişim ve dinlediğini tahlil etme becerilerini ölçer.",
    "regulationNote": "Dönem puanının %50'si ortak yazılı, %50'si dinleme ve konuşma uygulama sınavından oluşur.",
    "speakingPrompts": [
      {
        "topic": "1. Kart: Teknolojinin Günlük Yaşantımıza Etkileri",
        "prepTimeMinutes": 2,
        "speakTimeMinutes": 3,
        "guidingQuestions": [
          "Akıllı telefonlar ve internet hayatımızı nasıl kolaylaştırıyor?",
          "Teknoloji bağımlılığı arkadaşlık ilişkilerimizi nasıl olumsuz etkileyebilir?",
          "Zamanımızı verimli kullanmak için ekran süremizi nasıl sınırlandırmalıyız?"
        ]
      },
      {
        "topic": "2. Kart: Geleneksel Çocuk Oyunları ve Dayanışma",
        "prepTimeMinutes": 2,
        "speakTimeMinutes": 3,
        "guidingQuestions": [
          "Mendil kapmaca, saklambaç gibi sokak oyunlarının çocuk gelişimine faydaları nelerdir?",
          "Birlikte oyun oynamak kurallara saygıyı nasıl öğretir?",
          "En sevdiğin geleneksel oyunu ve kurallarını anlatır mısın?"
        ]
      }
    ],
    "listeningTasks": [
      {
        "scenario": "Örnek Dinleme Metni: \"Bir Bilim İnsanının Çocukluğu: Aziz Sancar\"",
        "taskDescription": "Öğrencilere Prof. Dr. Aziz Sancar'ın Mardin Savur'daki çocukluk yıllarını ve eğitime olan tutkusunu anlatan 3 dakikalık biyografik kayıt dinletilir.",
        "targetSkills": [
          "Metindeki neden-sonuç ve amaç-sonuç cümlelerini tespit etme",
          "Aziz Sancar'ın başarıya ulaşmasındaki azim ve kararlılığı yorumlama",
          "Dinleme sırasında önemli bilgileri not alma"
        ]
      }
    ],
    "evaluationRubric": [
      {
        "category": "Konuşma: Anlatım Akıcılığı ve Söz Varlığı",
        "maxPoints": 25,
        "criteria": [
          "Zengin kelime dağarcığı kullanma",
          "Düşüncelerini tutarlı şekilde bağlama"
        ]
      },
      {
        "category": "Konuşma: Beden Dili ve Ses Tonu",
        "maxPoints": 25,
        "criteria": [
          "Etkili tonlama ve vurgu",
          "Dinleyicilerle göz teması kurma"
        ]
      },
      {
        "category": "Dinleme: Tahlil ve Ana Düşünce",
        "maxPoints": 25,
        "criteria": [
          "Dinlediği metnin ana fikrini saptama",
          "Olaylar arasındaki sebep-sonuç bağını kurma"
        ]
      },
      {
        "category": "Dinleme: Çıkarım Yapma",
        "maxPoints": 25,
        "criteria": [
          "Karakterlerin duygu ve tutumlarını doğru analiz etme"
        ]
      }
    ]
  },
  {
    "id": "speaking_6_ingilizce_1_1",
    "grade": 6,
    "subjectId": "ingilizce",
    "examTerm": "1_donem_1_yazili",
    "title": "6th Grade English Speaking & Listening Exam Practice Guide",
    "purpose": "Assessing communicative competence in daily routines, time expressions, and healthy breakfast preferences.",
    "regulationNote": "Speaking and listening components constitute 50% of the overall English term assessment.",
    "speakingPrompts": [
      {
        "topic": "Prompt 1: Describe Your Daily Routine",
        "prepTimeMinutes": 2,
        "speakTimeMinutes": 3,
        "guidingQuestions": [
          "What time do you wake up on weekdays?",
          "What do you do after school (hobbies, sports, homework)?",
          "What is your favourite part of the day and why?"
        ]
      },
      {
        "topic": "Prompt 2: Healthy vs Unhealthy Breakfast",
        "prepTimeMinutes": 2,
        "speakTimeMinutes": 3,
        "guidingQuestions": [
          "What do you usually eat and drink for breakfast?",
          "Which foods are nutritious and why?",
          "What foods do you dislike or avoid eating?"
        ]
      }
    ],
    "listeningTasks": [
      {
        "scenario": "Audio Track: \"A Day in Mark's Life\"",
        "taskDescription": "Students listen to an interview with an English middle school student discussing his morning routines and breakfast habits.",
        "targetSkills": [
          "Identify exact times mentioned (e.g., quarter past seven, eight o'clock)",
          "Recognize likes and dislikes regarding traditional foods",
          "Complete a missing information timetable"
        ]
      }
    ],
    "evaluationRubric": [
      {
        "category": "Speaking: Grammatical Accuracy",
        "maxPoints": 25,
        "criteria": [
          "Correct Simple Present Tense use (3rd person -s)",
          "Accurate time prepositions (at, on, in)"
        ]
      },
      {
        "category": "Speaking: Fluency & Interaction",
        "maxPoints": 25,
        "criteria": [
          "Spontaneous answers to follow-up prompts",
          "Natural rhythm and pace"
        ]
      },
      {
        "category": "Listening: Information Extraction",
        "maxPoints": 25,
        "criteria": [
          "Extracting specific clock times and activities correctly"
        ]
      },
      {
        "category": "Listening: Preference Identification",
        "maxPoints": 25,
        "criteria": [
          "Identifying speaker attitudes and food choices"
        ]
      }
    ]
  },
  {
    "id": "speaking_8_turkce_1_1",
    "grade": 8,
    "subjectId": "turkce",
    "examTerm": "1_donem_1_yazili",
    "title": "8. Sınıf Türkçe Dinleme ve Konuşma Becerileri Uygulama Kılavuzu (LGS Hazırlık Süreci)",
    "purpose": "MEB Ölçme ve Değerlendirme Yönetmeliği doğrultusunda 8. sınıf öğrencilerinin eleştirel düşünme, ikna kabiliyeti ve argüman geliştirme becerilerini ölçer.",
    "regulationNote": "Yönetmelik gereği Türkçe sınavı çoklu beceri yaklaşımıyla yürütülür (%50 Yazılı + %25 Dinleme + %25 Konuşma).",
    "speakingPrompts": [
      {
        "topic": "1. Kart: Yapay Zekâ ve İnsan Emeği",
        "prepTimeMinutes": 2,
        "speakTimeMinutes": 3,
        "guidingQuestions": [
          "Yapay zekâ teknolojilerinin mesleklerin geleceğine olumlu ve olumsuz etkileri nelerdir?",
          "Bir yapay zekâ bir yazarın ya da ressamın duygularını ve özgünlüğünü taklit edebilir mi?",
          "Gelecekte başarılı olmak için bir gencin hangi insani becerileri geliştirmesi gerekir?"
        ]
      },
      {
        "topic": "2. Kart: Millî Mücadele Ruhu ve Gençliğin Sorumluluğu",
        "prepTimeMinutes": 2,
        "speakTimeMinutes": 3,
        "guidingQuestions": [
          "Gazi Mustafa Kemal Atatürk'ün gençliğe emanet ettiği cumhuriyet değerlerini korumak için neler yapmalıyız?",
          "Tarih bilincine sahip olmak bir milletin bağımsızlığı için neden hayati önem taşır?",
          "Bilim ve sanatta ilerlemek vatanseverliğin bir göstergesi midir?"
        ]
      }
    ],
    "listeningTasks": [
      {
        "scenario": "Örnek Dinleme Metni: \"Çanakkale'de Bir Kahramanlık Destanı: Seyit Onbaşı\"",
        "taskDescription": "Öğrencilere Çanakkale Boğaz Harbi esnasında Seyit Onbaşı'nın gösterdiği insanüstü fedakârlığı ve top mermisini kaldırış anını anlatan 3-4 dakikalık edebi metin dinletilir.",
        "targetSkills": [
          "Metindeki örtük anlamları ve duygu yoğunluğunu tahlil etme",
          "Konuşmacının üslup ve anlatım tekniklerini değerlendirme",
          "Tarihî olay ve şahsiyetlerin manevi değerlerini özümseme"
        ]
      }
    ],
    "evaluationRubric": [
      {
        "category": "Konuşma: Argüman Geliştirme ve İkna",
        "maxPoints": 25,
        "criteria": [
          "Fikirlerini somut örneklerle destekleme",
          "Mantıksal tutarlılık ve savunma gücü"
        ]
      },
      {
        "category": "Konuşma: Dili Doğru Kullanma ve Akıcılık",
        "maxPoints": 25,
        "criteria": [
          "Cümleleri ögelerine ve kurallara uygun kurma",
          "Zengin mecazi ve felsefi söz varlığı"
        ]
      },
      {
        "category": "Dinleme: Derinlemesine Anlama",
        "maxPoints": 25,
        "criteria": [
          "Metnin temasını ve verilmek istenen temel mesajı belirleme"
        ]
      },
      {
        "category": "Dinleme: Eleştirel Değerlendirme",
        "maxPoints": 25,
        "criteria": [
          "Metindeki duygu, düşünce ve olguları birbirinden ayırt etme"
        ]
      }
    ]
  },
  {
    "id": "speaking_8_ingilizce_1_1",
    "grade": 8,
    "subjectId": "ingilizce",
    "examTerm": "1_donem_1_yazili",
    "title": "8th Grade English Speaking & Listening Exam Practice Guide (LGS Integrated)",
    "purpose": "Evaluating advanced oral interaction in social contexts (friendship, making invitations, refusing with excuses, discussing teen lifestyles).",
    "regulationNote": "Evaluation follows MEB national regulations for foreign languages with interactive paired or solo performance tests.",
    "speakingPrompts": [
      {
        "topic": "Prompt 1: What Makes a True Friend?",
        "prepTimeMinutes": 2,
        "speakTimeMinutes": 3,
        "guidingQuestions": [
          "What personal traits are essential in a best friend (honest, supportive, reliable)?",
          "Can you trust someone who shares your secrets with others? Why or why not?",
          "Describe a memorable activity you recently enjoyed with your close friend."
        ]
      },
      {
        "topic": "Prompt 2: Invitations and Excuses Roleplay",
        "prepTimeMinutes": 2,
        "speakTimeMinutes": 3,
        "guidingQuestions": [
          "Invite your partner to a weekend bowling tournament or concert.",
          "Your partner politely refuses by giving a valid excuse (e.g. studying for LGS).",
          "Negotiate an alternative plan that works for both of you."
        ]
      }
    ],
    "listeningTasks": [
      {
        "scenario": "Audio Track: \"Weekend Plans & Invitations\"",
        "taskDescription": "Students listen to 3 telephone conversations where teens invite each other to different social events (cinema, barbecue, study group).",
        "targetSkills": [
          "Identify who accepts and who refuses the invitation",
          "Note down the specific excuses given by the callers",
          "Extract event details (date, time, venue, fee)"
        ]
      }
    ],
    "evaluationRubric": [
      {
        "category": "Speaking: Interaction & Conversational Strategies",
        "maxPoints": 25,
        "criteria": [
          "Using conversational gambits (Would you like to, That sounds awesome, I am sorry but...)"
        ]
      },
      {
        "category": "Speaking: Pronunciation & Intonation",
        "maxPoints": 25,
        "criteria": [
          "Natural stress, rhythm, and clear phonetics"
        ]
      },
      {
        "category": "Listening: Key Information & Detail Extraction",
        "maxPoints": 25,
        "criteria": [
          "Accurately recording times, dates, and locations"
        ]
      },
      {
        "category": "Listening: Tone & Attitude Recognition",
        "maxPoints": 25,
        "criteria": [
          "Discerning politeness, reluctance, and enthusiasm from voice tones"
        ]
      }
    ]
  },
{
    id: 'speaking_7_turkce_1_1',
    grade: 7,
    subjectId: 'turkce',
    examTerm: '1_donem_1_yazili',
    title: '7. Sınıf Türkçe Dersi Dinleme ve Konuşma Sınavı Uygulama Rehberi',
    purpose: 'MEB Ölçme ve Değerlendirme Yönetmeliği uyarınca Türkçe dersinde okuma ve yazma sınavları ortak yazılı sistem üzerinden yapılırken; dinleme ve konuşma becerileri alan zümre öğretmenlerince ders saatleri içinde bağımsız veya entegre olarak değerlendirilir.',
    regulationNote: 'Türkçe sınav puanı: %50 Yazılı (Okuma/Yazma) + %25 Dinleme + %25 Konuşma (veya zümrece belirlenen mevzuat ağırlığı) şeklinde hesaplanır.',
    speakingPrompts: [
      {
        topic: '1. Kart: Dijital Çağda Kitap Okuma Alışkanlığı',
        prepTimeMinutes: 2,
        speakTimeMinutes: 3,
        guidingQuestions: [
          'Günümüzde basılı kitaplar mı yoksa e-kitaplar ve sesli kitaplar mı daha etkilidir?',
          'Sosyal medya kullanımının gençlerin kitap okuma süresine etkileri nelerdir?',
          'Bir arkadaşını kitap okumaya teşvik etmek için hangi argümanları sunarsın?'
        ]
      },
      {
        topic: '2. Kart: Türkçenin Doğru ve Etkili Kullanımı',
        prepTimeMinutes: 2,
        speakTimeMinutes: 3,
        guidingQuestions: [
          'Mesajlaşma uygulamalarında kullanılan yabancı kelimeler ve kısaltmalar dilimizi nasıl etkiliyor?',
          'Bir toplumun kültürel kimliği ile konuştuğu dil arasındaki ilişki nedir?',
          'Dilimizi korumak için gençlere düşen sorumluluklar nelerdir?'
        ]
      },
      {
        topic: '3. Kart: Dayanışma ve Empati Kültürü',
        prepTimeMinutes: 2,
        speakTimeMinutes: 3,
        guidingQuestions: [
          'Zor durumda olan bir insanın duygularını anlamak (empati) neden önemlidir?',
          'Okulunda veya çevrende gördüğün bir yardımlaşma örneğini anlatınız.',
          'Birlikte yaşama kültüründe nezaket ifadelerinin yeri nedir?'
        ]
      }
    ],
    listeningTasks: [
      {
        scenario: 'Örnek Dinleme Metni: "Geleceğin Meslekleri ve Yapay Zekâ"',
        taskDescription: 'Öğrencilere 3-4 dakikalık bilgilendirici bir ses kaydı veya öğretmen tarafından okunan bir metin iki defa dinletilir. Dinleme esnasında not alma tekniği kullandırılır.',
        targetSkills: [
          'Metnin ana fikrini ve yardımcı fikirlerini belirleme',
          'Metinde geçen neden-sonuç ve amaç-sonuç cümlelerini ayırt etme',
          'Konuşmacının bakış açısını ve mesajını yorumlama'
        ]
      }
    ],
    evaluationRubric: [
      {
        category: 'Konuşma Becerisi: Akıcılık ve Telaffuz',
        maxPoints: 25,
        criteria: ['Kelimeleri doğru boğumlama', 'Gereksiz duraklamalardan (ııı, eee) kaçınma', 'İşitilebilir bir ses tonu kullanma']
      },
      {
        category: 'Konuşma Becerisi: İçerik ve Düşünceyi Geliştirme',
        maxPoints: 35,
        criteria: ['Konu dışına çıkmama', 'Fikirlerini örneklerle destekleme', 'Giriş, gelişme ve sonuç bütünlüğü kurma']
      },
      {
        category: 'Konuşma Becerisi: Beden Dili ve İletişim',
        maxPoints: 15,
        criteria: ['Göz teması kurma', 'Duruş ve jest-mimikleri amaca uygun kullanma']
      },
      {
        category: 'Dinleme Becerisi: Anlama ve Not Alma',
        maxPoints: 25,
        criteria: ['Dinlediği metindeki önemli detayları kaçırmadan aktarma', 'Açık uçlu dinleme sorularına tutarlı yanıtlar verme']
      }
    ]
  },
  {
    id: 'speaking_7_ingilizce_1_1',
    grade: 7,
    subjectId: 'ingilizce',
    examTerm: '1_donem_1_yazili',
    title: '7th Grade English Listening & Speaking Assessment Guide',
    purpose: 'In accordance with MoNE regulations, reading and writing competencies are assessed via written exams, while listening and speaking skills are evaluated through interactive rubrics in class by English teachers.',
    regulationNote: 'Sınav Ağırlığı: Written Exam (%50) + Listening (%25) + Speaking (%25). Unit 1: Appearance and Personality & Unit 2: Sports.',
    speakingPrompts: [
      {
        topic: 'Task 1: Describing a Best Friend or Family Member',
        prepTimeMinutes: 1,
        speakTimeMinutes: 2,
        guidingQuestions: [
          'What does he/she look like? (Physical appearance: tall, slim, curly hair)',
          'What is he/she like? (Personality: generous, honest, clumsy, outgoing)',
          'Compare yourself with this person (e.g., "He is more outgoing than me").'
        ]
      },
      {
        topic: 'Task 2: My Favorite Sport and Routine',
        prepTimeMinutes: 1,
        speakTimeMinutes: 2,
        guidingQuestions: [
          'Which sport do you like most and why? (Individual vs team sports)',
          'What equipment do you need for this sport? (racket, helmet, goggles)',
          'How often do you train or play? (once a week, twice a month)'
        ]
      }
    ],
    listeningTasks: [
      {
        scenario: 'Audio Track: "Interviews at the School Sports Club"',
        taskDescription: 'Students listen to two short dialogues between teenagers discussing their sports habits and match speakers with their personality traits.',
        targetSkills: [
          'Identify specific personal traits mentioned in audio',
          'Extract numbers/frequencies (e.g. three times a week)'
        ]
      }
    ],
    evaluationRubric: [
      {
        category: 'Accuracy & Grammar (Unit 1 & 2 Target Structures)',
        maxPoints: 30,
        criteria: ['Correct use of comparatives (more hardworking, taller)', 'Appropriate present simple and frequency adverbs']
      },
      {
        category: 'Fluency & Pronunciation',
        maxPoints: 30,
        criteria: ['Clear pronunciation of target adjectives', 'Natural pacing with minimal hesitation']
      },
      {
        category: 'Vocabulary Range',
        maxPoints: 20,
        criteria: ['Use of appearance, personality, and sports equipment words']
      },
      {
        category: 'Interactive Communication',
        maxPoints: 20,
        criteria: ['Responding directly to teacher prompts without switching to Turkish']
      }
    ]
  }
];
