import { GradeLevel, SubjectId, ExamTerm, ExamScenario, SchoolStage, CognitiveLevel } from '../types';

export interface SubjectMeta {
  id: SubjectId;
  name: string;
  iconName: string;
  stage: SchoolStage[];
  color: string;
  isLanguage: boolean;
  hasListeningSpeaking: boolean;
}

export const ALL_SUBJECTS: SubjectMeta[] = [
  // Ortaokul Dersleri
  { id: 'turkce', name: 'Türkçe', iconName: 'BookOpen', stage: ['ortaokul'], color: 'amber', isLanguage: true, hasListeningSpeaking: true },
  { id: 'matematik', name: 'Matematik', iconName: 'Calculator', stage: ['ortaokul', 'lise'], color: 'blue', isLanguage: false, hasListeningSpeaking: false },
  { id: 'fen_bilimleri', name: 'Fen Bilimleri', iconName: 'Atom', stage: ['ortaokul'], color: 'emerald', isLanguage: false, hasListeningSpeaking: false },
  { id: 'sosyal_bilgiler', name: 'Sosyal Bilgiler', iconName: 'Compass', stage: ['ortaokul'], color: 'rose', isLanguage: false, hasListeningSpeaking: false },
  { id: 'din_kulturu', name: 'Din Kültürü ve Ahlak Bilgisi', iconName: 'Moon', stage: ['ortaokul', 'lise'], color: 'teal', isLanguage: false, hasListeningSpeaking: false },
  { id: 'ingilizce', name: 'İngilizce', iconName: 'Globe', stage: ['ortaokul', 'lise'], color: 'indigo', isLanguage: true, hasListeningSpeaking: true },
  
  // Lise Dersleri
  { id: 'turk_dili_edebiyati', name: 'Türk Dili ve Edebiyatı', iconName: 'BookOpen', stage: ['lise'], color: 'amber', isLanguage: true, hasListeningSpeaking: true },
  { id: 'fizik', name: 'Fizik', iconName: 'Zap', stage: ['lise'], color: 'purple', isLanguage: false, hasListeningSpeaking: false },
  { id: 'kimya', name: 'Kimya', iconName: 'FlaskConical', stage: ['lise'], color: 'emerald', isLanguage: false, hasListeningSpeaking: false },
  { id: 'biyoloji', name: 'Biyoloji', iconName: 'Dna', stage: ['lise'], color: 'green', isLanguage: false, hasListeningSpeaking: false },
  { id: 'tarih', name: 'Tarih', iconName: 'Landmark', stage: ['lise'], color: 'red', isLanguage: false, hasListeningSpeaking: false },
  { id: 'cografya', name: 'Coğrafya', iconName: 'Map', stage: ['lise'], color: 'cyan', isLanguage: false, hasListeningSpeaking: false },
  { id: 'felsefe', name: 'Felsefe', iconName: 'Brain', stage: ['lise'], color: 'violet', isLanguage: false, hasListeningSpeaking: false },
];

export const ALL_GRADES: { level: GradeLevel; name: string; stage: SchoolStage; tymmRollout: string }[] = [
  // Ortaokul (TYMM Kapsamında: 5, 6, 7; LGS: 8)
  { level: 5, name: '5. Sınıf', stage: 'ortaokul', tymmRollout: 'TYMM Kapsamında' },
  { level: 6, name: '6. Sınıf', stage: 'ortaokul', tymmRollout: 'TYMM Kapsamında' },
  { level: 7, name: '7. Sınıf', stage: 'ortaokul', tymmRollout: 'TYMM Kapsamında' },
  { level: 8, name: '8. Sınıf', stage: 'ortaokul', tymmRollout: 'LGS / Ortak Sınav' },
  
  // Lise (TYMM Kapsamında: 9, 10, 11)
  { level: 9, name: '9. Sınıf', stage: 'lise', tymmRollout: 'TYMM Kapsamında' },
  { level: 10, name: '10. Sınıf', stage: 'lise', tymmRollout: 'TYMM Kapsamında' },
  { level: 11, name: '11. Sınıf', stage: 'lise', tymmRollout: 'TYMM Kapsamında' },
  { level: 12, name: '12. Sınıf', stage: 'lise', tymmRollout: 'YKS / Ortak Sınav' },
];

export const EXAM_TERMS: { id: ExamTerm; name: string; timing: string }[] = [
  { id: '1_donem_1_yazili', name: '1. Dönem 1. Yazılı', timing: 'Kasım Ortak Sınavı' },
  { id: '1_donem_2_yazili', name: '1. Dönem 2. Yazılı', timing: 'Ocak Ortak Sınavı' },
  { id: '2_donem_1_yazili', name: '2. Dönem 1. Yazılı', timing: 'Nisan Ortak Sınavı' },
  { id: '2_donem_2_yazili', name: '2. Dönem 2. Yazılı', timing: 'Haziran Ortak Sınavı' },
];

export const SUBJECTS = ALL_SUBJECTS;

export interface OfficialOutcomeMeta {
  code: string;
  unit: string;
  topic: string;
  canonicalTitle: string;
  cognitiveLevel: CognitiveLevel;
}

export const OFFICIAL_OUTCOMES: Record<string, OfficialOutcomeMeta> = {
  "DKAB": {
    code: "DKAB",
    unit: "ZEKÂT VE SADAKA",
    topic: "İslam’ın Paylaşma ve Yardımlaşmaya Verdiği Önem",
    canonicalTitle: "İslam’ın paylaşma ve yardımlaşmaya verdiği önemi ayet ve hadisler ışığında yorumlar.",
    cognitiveLevel: "Karmaşık Bilişsel Süreçler"
  },
  "DKAB.5.1.2": {
    code: "DKAB.5.1.2",
    unit: "Allah’ın Varlığı ve Birliği",
    topic: "Allah’ın Varlığı ve Birliği",
    canonicalTitle: "Evrendeki mükemmel düzenden hareketle Allah’ın (cc) varlığı ve birliğini müşahede edebilme",
    cognitiveLevel: "Basit Bilişsel Süreçler"
  },
  "DKAB.5.1.3": {
    code: "DKAB.5.1.3",
    unit: "Allah’ın Güzel İsimleri",
    topic: "Allah’ın Güzel İsimleri",
    canonicalTitle: "Allah’ın (cc) güzel isimlerini bağlamına uygun kullanabilme",
    cognitiveLevel: "Basit Bilişsel Süreçler"
  },
  "DKAB.5.1.4": {
    code: "DKAB.5.1.4",
    unit: "Bir Sure Öğreniyorum: İhlas Suresi",
    topic: "Bir Sure Öğreniyorum: İhlas Suresi",
    canonicalTitle: "İhlas suresini ve bu surenin anlamını okuyarak yorumlayabilme",
    cognitiveLevel: "Basit Bilişsel Süreçler"
  },
  "DKAB.5.2.1": {
    code: "DKAB.5.2.1",
    unit: "NAMAZ",
    topic: "Allah’ın Huzurunda Olmak: Namaz",
    canonicalTitle: "Namaz ibadetini özetleyebilme",
    cognitiveLevel: "Basit Bilişsel Süreçler"
  },
  "DKAB.6.1.2": {
    code: "DKAB.6.1.2",
    unit: "Peygamberlerin İlettiği Mesaj: Vahiy",
    topic: "Peygamberlerin İlettiği Mesaj: Vahiy",
    canonicalTitle: "Vahyin gönderiliş amacını idrak edebilme",
    cognitiveLevel: "Basit Bilişsel Süreçler"
  },
  "DKAB.6.1.3": {
    code: "DKAB.6.1.3",
    unit: "İlahi Kitaplar",
    topic: "İlahi Kitaplar",
    canonicalTitle: "İlahi kitaplarla ilgili bilgileri çözümleyebilme",
    cognitiveLevel: "Basit Bilişsel Süreçler"
  },
  "DKAB.6.1.4": {
    code: "DKAB.6.1.4",
    unit: "Bir Sure Öğreniyorum: Felak Suresi",
    topic: "Bir Sure Öğreniyorum: Felak Suresi",
    canonicalTitle: "Felak suresini ve bu surenin anlamını okuyarak yorumlayabilme",
    cognitiveLevel: "Basit Bilişsel Süreçler"
  },
  "DKAB.6.2.1": {
    code: "DKAB.6.2.1",
    unit: "RAMAZAN VE ORUÇ",
    topic: "Oruç ve Kur’an Ayı Ramazan",
    canonicalTitle: "Ramazan ayının oruç ve Kur’an ayı olduğunu çözümleyebilme",
    cognitiveLevel: "Basit Bilişsel Süreçler"
  },
  "DKAB.7.1.1": {
    code: "DKAB.7.1.1",
    unit: "MELEK VE AHİRET İNANCI",
    topic: "Varlıklar Âlemi",
    canonicalTitle: "Melekleri sınıflandırabilme",
    cognitiveLevel: "Basit Bilişsel Süreçler"
  },
  "DKAB.7.1.2": {
    code: "DKAB.7.1.2",
    unit: "Dünya ve Ahiret Hayatı",
    topic: "Dünya ve Ahiret Hayatı",
    canonicalTitle: "Ahiret hayatının aşamalarını çözümleyebilme",
    cognitiveLevel: "Basit Bilişsel Süreçler"
  },
  "DKAB.7.1.3": {
    code: "DKAB.7.1.3",
    unit: "Melek ve Ahiret İnancının İnsana Kazandırdıkları",
    topic: "Melek ve Ahiret İnancının İnsana Kazandırdıkları",
    canonicalTitle: "Melek ve ahiret inancının insana kazandırdıkları konusunda analitik düşünebilme",
    cognitiveLevel: "Basit Bilişsel Süreçler"
  },
  "DKAB.7.1.4": {
    code: "DKAB.7.1.4",
    unit: "Bir Sure Öğreniyorum: Nâs Suresi",
    topic: "Bir Sure Öğreniyorum: Nâs Suresi",
    canonicalTitle: "Nâs suresini ve bu surenin anlamını okuyarak yorumlayabilme",
    cognitiveLevel: "Basit Bilişsel Süreçler"
  },
  "DKAB.7.2.1": {
    code: "DKAB.7.2.1",
    unit: "HAC, UMRE VE KURBAN",
    topic: "Hac ve Umre İbadeti",
    canonicalTitle: "Hac ve umre ibadetlerini çözümleyebilme",
    cognitiveLevel: "Basit Bilişsel Süreçler"
  },
  "E7.1.R1": {
    code: "E7.1.R1",
    unit: "Appearance And Personality",
    topic: "Appearance And Personality",
    canonicalTitle: "Students will be able to understand a simple text about appearances, ersonalities, and comparisons including explanations and reasons.",
    cognitiveLevel: "Basit Bilişsel Süreçler"
  },
  "E7.1.W1": {
    code: "E7.1.W1",
    unit: "",
    topic: "",
    canonicalTitle: "Students will be able to write simple pieces to compare people.",
    cognitiveLevel: "Basit Bilişsel Süreçler"
  },
  "E7.2.R1": {
    code: "E7.2.R1",
    unit: "Sports",
    topic: "Sports",
    canonicalTitle: "Students will be able to understand short and simple texts on sports.",
    cognitiveLevel: "Basit Bilişsel Süreçler"
  },
  "E7.2.W1": {
    code: "E7.2.W1",
    unit: "",
    topic: "",
    canonicalTitle: "Students will be able to write pieces about routines/daily activities by using frequency adverbs.",
    cognitiveLevel: "Basit Bilişsel Süreçler"
  },
  "E8.1.R1": {
    code: "E8.1.R1",
    unit: "Friendship",
    topic: "Friendship",
    canonicalTitle: "Students will be able to understand short and simple texts about friendship.",
    cognitiveLevel: "Basit Bilişsel Süreçler"
  },
  "E8.1.R2": {
    code: "E8.1.R2",
    unit: "",
    topic: "",
    canonicalTitle: "Students will be able to understand short and simple invitation letters, cards and e-mails.",
    cognitiveLevel: "Basit Bilişsel Süreçler"
  },
  "E8.1.W1": {
    code: "E8.1.W1",
    unit: "",
    topic: "",
    canonicalTitle: "Students will be able to write a short and simple letter apologizing and giving reasons for not attending a party in response to an invitation.",
    cognitiveLevel: "Basit Bilişsel Süreçler"
  },
  "E8.2.R1": {
    code: "E8.2.R1",
    unit: "Teen Life",
    topic: "Teen Life",
    canonicalTitle: "Students will be able to understand short and simple texts about regular activities of teenagers.",
    cognitiveLevel: "Basit Bilişsel Süreçler"
  },
  "E8.2.W1": {
    code: "E8.2.W1",
    unit: "",
    topic: "",
    canonicalTitle: "Students will be able to write a short and simple paragraph about regular activities of teenagers.",
    cognitiveLevel: "Basit Bilişsel Süreçler"
  },
  "ENG.5.1.G1": {
    code: "ENG.5.1.G1",
    unit: "",
    topic: "",
    canonicalTitle: "Students can select and use the target grammatical elements of the current content about “school life with people, places and rules at school; school clubs; countries; national days and celebrations” accurately, authentically, spontaneously, and naturally and use it appropriately and effectively when communicating with others.",
    cognitiveLevel: "Basit Bilişsel Süreçler"
  },
  "ENG.5.1.R2": {
    code: "ENG.5.1.R2",
    unit: "SCHOOL LIFE",
    topic: "SCHOOL LIFE",
    canonicalTitle: "Students can bring information about the current content on “school life with people, places and rules at school; school clubs; countries; national days and celebrations” through skimming (looking quickly at) the audio-visual elements and reading the content very quickly.",
    cognitiveLevel: "Basit Bilişsel Süreçler"
  },
  "ENG.5.1.R3": {
    code: "ENG.5.1.R3",
    unit: "",
    topic: "",
    canonicalTitle: "Students can make meaning of / derive meaning from the current content about “school life with people, places and rules at school; school clubs; countries; national days and celebrations” by reading it carefully.",
    cognitiveLevel: "Basit Bilişsel Süreçler"
  },
  "ENG.5.1.V1": {
    code: "ENG.5.1.V1",
    unit: "",
    topic: "",
    canonicalTitle: "Students can select and use the target vocabulary of the current content about “school life with people, places and rules at school; school clubs; countries; national days and celebrations” accurately, authentically, spontaneously, and naturally and use it appropriately and effectively when communicating with others.",
    cognitiveLevel: "Basit Bilişsel Süreçler"
  },
  "ENG.5.1.W3": {
    code: "ENG.5.1.W3",
    unit: "",
    topic: "",
    canonicalTitle: "Students can organise a content for the assigned writing task on the current content “school life with people, places and rules at school; school clubs; countries; national days and celebrations” based on the model/example provided.",
    cognitiveLevel: "Basit Bilişsel Süreçler"
  },
  "ENG.5.1.W4": {
    code: "ENG.5.1.W4",
    unit: "",
    topic: "",
    canonicalTitle: "Students can individually construct/form content for the assigned writing task on the current content “school life with people, places and rules at school; school clubs; countries; national days and celebrations”.",
    cognitiveLevel: "Basit Bilişsel Süreçler"
  },
  "ENG.6.1.G1": {
    code: "ENG.6.1.G1",
    unit: "",
    topic: "",
    canonicalTitle: "Students can select and use the target grammatical elements of the current content about “school life with roles, and responsibilities at school; school routines; national days and celebrations” accurately, authentically, spontaneously, and naturally and use it appropriately and effectively when communicating with others.",
    cognitiveLevel: "Basit Bilişsel Süreçler"
  },
  "ENG.6.1.R2": {
    code: "ENG.6.1.R2",
    unit: "SCHOOL LIFE",
    topic: "SCHOOL LIFE",
    canonicalTitle: "Students can bring information about the current content on “school life with roles, and responsibilities at school; school routines; national days and celebrations” through skimming (looking quickly at) the audio-visual elements and reading the content very quickly.",
    cognitiveLevel: "Basit Bilişsel Süreçler"
  },
  "ENG.6.1.R3": {
    code: "ENG.6.1.R3",
    unit: "",
    topic: "",
    canonicalTitle: "Students can make meaning of / derive meaning from the current content about “school life with roles, and responsibilities at school; school routines; national days and celebrations” by reading it carefully.",
    cognitiveLevel: "Basit Bilişsel Süreçler"
  },
  "ENG.6.1.V1": {
    code: "ENG.6.1.V1",
    unit: "",
    topic: "",
    canonicalTitle: "Students can select and use the target vocabulary of the current content about “school life with roles, and responsibilities at school; school routines; national days and celebrations” accurately, authentically, spontaneously, and naturally and use it appropriately and effectively when communicating with others.",
    cognitiveLevel: "Basit Bilişsel Süreçler"
  },
  "ENG.6.1.W3": {
    code: "ENG.6.1.W3",
    unit: "",
    topic: "",
    canonicalTitle: "Students can organise a content for the assigned writing task on the current content “school life with roles, and responsibilities at school; school routines; national days and celebrations” based on the model/example provided.",
    cognitiveLevel: "Basit Bilişsel Süreçler"
  },
  "ENG.6.1.W4": {
    code: "ENG.6.1.W4",
    unit: "",
    topic: "",
    canonicalTitle: "Students can individually construct/form content for the assigned writing task on the current content “school life with roles, and responsibilities at school; school routines; national days and celebrations”.",
    cognitiveLevel: "Basit Bilişsel Süreçler"
  },
  "EVİMİZ": {
    code: "EVİMİZ",
    unit: "EVİMİZ DÜNYA",
    topic: "Küreselleşmenin İnsan ve Toplum Hayatına Etkisi",
    canonicalTitle: "DÜNYA",
    cognitiveLevel: "Basit Bilişsel Süreçler"
  },
  "Evrendeki": {
    code: "Evrendeki",
    unit: "ALLAH İNANCI",
    topic: "Evrendeki Mükemmel Düzen",
    canonicalTitle: "Mükemmel Düzen",
    cognitiveLevel: "Basit Bilişsel Süreçler"
  },
  "F.8.1.1.1": {
    code: "F.8.1.1.1",
    unit: "1.ÜNİTE: MEVSİMLER VE İKLİM",
    topic: "8.1.1. Mevsimlerin Oluşumu",
    canonicalTitle: "Mevsimlerin oluşumuna yönelik tahminlerde bulunur.",
    cognitiveLevel: "Basit Bilişsel Süreçler"
  },
  "F.8.2.1.1": {
    code: "F.8.2.1.1",
    unit: "2.ÜNİTE: DNA VE GENETİK KOD",
    topic: "8.2.1. DNA ve Genetik Kod",
    canonicalTitle: "Nükleotid, gen, DNA ve kromozom kavramlarını açıklayarak bu kavramlar arasında ilişki kurar.",
    cognitiveLevel: "Basit Bilişsel Süreçler"
  },
  "F.8.2.1.2": {
    code: "F.8.2.1.2",
    unit: "",
    topic: "",
    canonicalTitle: "DNA’nın yapısını model üzerinde gösterir.",
    cognitiveLevel: "Basit Bilişsel Süreçler"
  },
  "F.8.2.1.3": {
    code: "F.8.2.1.3",
    unit: "",
    topic: "",
    canonicalTitle: "DNA’nın kendini nasıl eşlediğini ifade eder.",
    cognitiveLevel: "Basit Bilişsel Süreçler"
  },
  "F.8.2.2.1": {
    code: "F.8.2.2.1",
    unit: "8.2.2. Kalıtım",
    topic: "8.2.2. Kalıtım",
    canonicalTitle: "Kalıtım ile ilgili kavramları tanımlar.",
    cognitiveLevel: "Basit Bilişsel Süreçler"
  },
  "F.8.2.2.2": {
    code: "F.8.2.2.2",
    unit: "",
    topic: "",
    canonicalTitle: "Tek karakter çaprazlamaları ile ilgili problemler çözerek sonuçlar hakkında yorum yapar.",
    cognitiveLevel: "Karmaşık Bilişsel Süreçler"
  },
  "FB.5.1.2": {
    code: "FB.5.1.2",
    unit: "Gökyüzündeki Komşumuz: Ay",
    topic: "Gökyüzündeki Komşumuz: Ay",
    canonicalTitle: "Ay’ın özellikleri, dönme ve dolanma hareketleri ile ilgili bilimsel çıkarım yapabilme",
    cognitiveLevel: "Karmaşık Bilişsel Süreçler"
  },
  "FB.5.1.3": {
    code: "FB.5.1.3",
    unit: "",
    topic: "",
    canonicalTitle: "Ay’ın evrelerini temsil eden bilimsel model oluşturabilme",
    cognitiveLevel: "Basit Bilişsel Süreçler"
  },
  "FB.5.1.4": {
    code: "FB.5.1.4",
    unit: "Dünya’mız ve Gökyüzündeki Komşularımız",
    topic: "Dünya’mız ve Gökyüzündeki Komşularımız",
    canonicalTitle: "Güneş, Dünya ve Ay’ın birbirlerine göre hareketlerini ve hacimsel büyüklüklerini temsil eden bilimsel model oluşturabilme",
    cognitiveLevel: "Basit Bilişsel Süreçler"
  },
  "FB.5.2.1": {
    code: "FB.5.2.1",
    unit: "2. ÜNİTE: KUVVETİ TANIYALIM",
    topic: "Kuvvet ve Kuvvetin Ölçülmesi",
    canonicalTitle: "Kuvveti büyüklüğü ile operasyonel tanımlayabilme",
    cognitiveLevel: "Basit Bilişsel Süreçler"
  },
  "FB.6.1.1": {
    code: "FB.6.1.1",
    unit: "1. ÜNİTE: GÜNEŞ SİSTEMİ",
    topic: "Güneş Sistemi",
    canonicalTitle: "Güneş sistemindeki gezegenleri niteliklerine göre sınıflandırabilme",
    cognitiveLevel: "Basit Bilişsel Süreçler"
  },
  "FB.6.1.3": {
    code: "FB.6.1.3",
    unit: "Güneş ve Ay Tutulmaları",
    topic: "Güneş ve Ay Tutulmaları",
    canonicalTitle: "Güneş ve Ay tutulması ile ilgili bilimsel çıkarım yapabilme",
    cognitiveLevel: "Karmaşık Bilişsel Süreçler"
  },
  "FB.6.2.1": {
    code: "FB.6.2.1",
    unit: "2. ÜNİTE: KUVVETİN ETKİSİNDE HAREKET",
    topic: "Bileşke Kuvvet",
    canonicalTitle: "Bir cisme etki eden aynı doğrultudaki kuvvetler arasındaki ilişkileri açıklayarak bileşke kuvveti yapılandırabilme",
    cognitiveLevel: "Basit Bilişsel Süreçler"
  },
  "FB.6.2.2": {
    code: "FB.6.2.2",
    unit: "",
    topic: "",
    canonicalTitle: "Dengelenmiş ve dengelenmemiş kuvvetlerin etkisi altındaki bir cismin hareketine yönelik deney yapabilme",
    cognitiveLevel: "Basit Bilişsel Süreçler"
  },
  "FB.6.2.3": {
    code: "FB.6.2.3",
    unit: "Sabit Süratli ve Sabit Hızlı Hareket",
    topic: "Sabit Süratli ve Sabit Hızlı Hareket",
    canonicalTitle: "Sürat ve hız kavramlarını karşılaştırabilme",
    cognitiveLevel: "Karmaşık Bilişsel Süreçler"
  },
  "FB.6.3.1": {
    code: "FB.6.3.1",
    unit: "3. ÜNİTE: CANLILARDA SİSTEMLER",
    topic: "Bitki ve Hayvanlarda Üreme, Büyüme ve Gelişme",
    canonicalTitle: "Eşeyli ve eşeysiz üremeyi karşılaştırabilme",
    cognitiveLevel: "Karmaşık Bilişsel Süreçler"
  },
  "FB.7.1.1": {
    code: "FB.7.1.1",
    unit: "1. ÜNİTE: UZAY ÇAĞI",
    topic: "Türkiye ve Uzay Araştırmaları",
    canonicalTitle: "Uzay araştırmaları için geliştirilen teknolojileri karşılaştırabilme",
    cognitiveLevel: "Karmaşık Bilişsel Süreçler"
  },
  "FB.7.1.3": {
    code: "FB.7.1.3",
    unit: "",
    topic: "",
    canonicalTitle: "Uzay araştırmalarının yol açabileceği problemleri çözebilme",
    cognitiveLevel: "Karmaşık Bilişsel Süreçler"
  },
  "FB.7.1.4": {
    code: "FB.7.1.4",
    unit: "Uzayda Neler Var?",
    topic: "Uzayda Neler Var?",
    canonicalTitle: "Yıldızların yaşamını açıklayarak yapılandırabilme",
    cognitiveLevel: "Basit Bilişsel Süreçler"
  },
  "FB.7.1.5": {
    code: "FB.7.1.5",
    unit: "",
    topic: "",
    canonicalTitle: "Yıldız, galaksi ve evren kavramlarını açıklayarak yapılandırabilme",
    cognitiveLevel: "Basit Bilişsel Süreçler"
  },
  "FB.7.2.1": {
    code: "FB.7.2.1",
    unit: "2. ÜNİTE: KUVVET VE ENERJİYİ KEŞFEDELİM",
    topic: "Kuvvet, İş ve Enerji İlişkisi",
    canonicalTitle: "Fiziksel anlamda yapılan işin bağlı olduğu faktörlere ilişkin bilimsel çıkarım yapabilme",
    cognitiveLevel: "Karmaşık Bilişsel Süreçler"
  },
  "FB.7.2.2": {
    code: "FB.7.2.2",
    unit: "",
    topic: "",
    canonicalTitle: "Enerji çeşitlerinden kinetik ve potansiyel enerjiyi karşılaştırabilme",
    cognitiveLevel: "Karmaşık Bilişsel Süreçler"
  },
  "M.8.1.1.1": {
    code: "M.8.1.1.1",
    unit: "SAYILAR VE İŞLEMLER",
    topic: "Çarpanlar ve Katlar",
    canonicalTitle: "Verilen pozitif tam sayıların pozitif tam sayı çarpanlarını bulur, pozitif tam sayıların pozitif tam sayı çarpanlarını üslü ifadelerin çarpımı şeklinde yazar.",
    cognitiveLevel: "Basit Bilişsel Süreçler"
  },
  "M.8.1.1.2": {
    code: "M.8.1.1.2",
    unit: "",
    topic: "",
    canonicalTitle: "İki doğal sayının en büyük ortak bölenini (EBOB) ve en küçük ortak katını (EKOK) hesaplar, ilgili problemleri çözer.",
    cognitiveLevel: "Karmaşık Bilişsel Süreçler"
  },
  "M.8.1.1.3": {
    code: "M.8.1.1.3",
    unit: "",
    topic: "",
    canonicalTitle: "Verilen iki doğal sayının aralarında asal olup olmadığını belirler.",
    cognitiveLevel: "Basit Bilişsel Süreçler"
  },
  "M.8.1.2.1": {
    code: "M.8.1.2.1",
    unit: "Üslü İfadeler",
    topic: "Üslü İfadeler",
    canonicalTitle: "Tam sayıların, tam sayı kuvvetlerini hesaplar.",
    cognitiveLevel: "Basit Bilişsel Süreçler"
  },
  "M.8.1.2.2": {
    code: "M.8.1.2.2",
    unit: "",
    topic: "",
    canonicalTitle: "Üslü ifadelerle ilgili temel kuralları anlar, birbirine denk ifadeler oluşturur.",
    cognitiveLevel: "Basit Bilişsel Süreçler"
  },
  "M.8.1.2.3": {
    code: "M.8.1.2.3",
    unit: "",
    topic: "",
    canonicalTitle: "Sayıların ondalık gösterimlerini 10’un tam sayı kuvvetlerini kullanarak çözümler.",
    cognitiveLevel: "Karmaşık Bilişsel Süreçler"
  },
  "M.8.1.2.4": {
    code: "M.8.1.2.4",
    unit: "",
    topic: "",
    canonicalTitle: "Verilen bir sayıyı 10’un farklı tam sayı kuvvetlerini kullanarak ifade eder.",
    cognitiveLevel: "Basit Bilişsel Süreçler"
  },
  "M.8.1.2.5": {
    code: "M.8.1.2.5",
    unit: "",
    topic: "",
    canonicalTitle: "Çok büyük ve çok küçük sayıları bilimsel gösterimle ifade eder ve karşılaştırır.",
    cognitiveLevel: "Karmaşık Bilişsel Süreçler"
  },
  "M.8.1.3.1": {
    code: "M.8.1.3.1",
    unit: "Kareköklü İfadeler",
    topic: "Kareköklü İfadeler",
    canonicalTitle: "Tamkare pozitif tam sayılarla bu sayıların karekökleri arasındaki ilişkiyi belirler.",
    cognitiveLevel: "Basit Bilişsel Süreçler"
  },
  "M.8.1.3.2": {
    code: "M.8.1.3.2",
    unit: "",
    topic: "",
    canonicalTitle: "Tam kare olmayan kareköklü bir sayının hangi iki doğal sayı arasında olduğunu belirler.",
    cognitiveLevel: "Basit Bilişsel Süreçler"
  },
  "M.8.1.3.3": {
    code: "M.8.1.3.3",
    unit: "",
    topic: "",
    canonicalTitle: "Kareköklü bir ifadeyi a√b şeklinde yazar ve a√b şeklindeki ifadede katsayıyı kök içine alır.",
    cognitiveLevel: "Basit Bilişsel Süreçler"
  },
  "MAT.5.3.1": {
    code: "MAT.5.3.1",
    unit: "GEOMETRİK ŞEKİLLER",
    topic: "Temel Geometrik Çizimler ve İnşalar",
    canonicalTitle: "Temel geometrik çizimler için matematiksel araç ve teknolojiden yararlanabilme",
    cognitiveLevel: "Basit Bilişsel Süreçler"
  },
  "MAT.5.3.2": {
    code: "MAT.5.3.2",
    unit: "",
    topic: "",
    canonicalTitle: "Temel geometrik çizimlere dayalı deneyimlerini yansıtabilme",
    cognitiveLevel: "Basit Bilişsel Süreçler"
  },
  "MAT.5.3.3": {
    code: "MAT.5.3.3",
    unit: "Açı Ölçme",
    topic: "Açı Ölçme",
    canonicalTitle: "Açıları ölçmek için matematiksel araç ve teknolojiden yararlanabilme",
    cognitiveLevel: "Basit Bilişsel Süreçler"
  },
  "MAT.5.3.4": {
    code: "MAT.5.3.4",
    unit: "",
    topic: "",
    canonicalTitle: "Düzlemde iki veya üç doğrunun birbirine göre durumuna bağlı olarak oluşabilecek açılara dair çıkarım yapabilme",
    cognitiveLevel: "Karmaşık Bilişsel Süreçler"
  },
  "MAT.5.3.5": {
    code: "MAT.5.3.5",
    unit: "Çokgenler ve Çember",
    topic: "Çokgenler ve Çember",
    canonicalTitle: "Çokgenleri düzlemde ardışık olarak kesişen doğruların oluşturduğu kapalı şekiller olarak yorumlayabilme",
    cognitiveLevel: "Basit Bilişsel Süreçler"
  },
  "MAT.5.3.6": {
    code: "MAT.5.3.6",
    unit: "",
    topic: "",
    canonicalTitle: "Çokgenlerin özellikleri ile ilgili edindiği deneyimleri yansıtabilme",
    cognitiveLevel: "Basit Bilişsel Süreçler"
  },
  "MAT.5.3.7": {
    code: "MAT.5.3.7",
    unit: "",
    topic: "",
    canonicalTitle: "Matematiksel araç ve teknoloji yardımıyla düzlemde iki noktada kesişen çember çiftinin merkezleri ve kesişim noktalarından biri ile inşa edilen üçgenlerin kenar özelliklerine yönelik çıkarım yapabilme",
    cognitiveLevel: "Karmaşık Bilişsel Süreçler"
  },
  "MAT.6.1.1": {
    code: "MAT.6.1.1",
    unit: "SAYILAR VE NİCELİKLER (1)",
    topic: "Bir Doğal Sayının Çarpanları ve Katları",
    canonicalTitle: "Karşılaştığı problem durumlarında bir doğal sayının çarpanlarını ve katlarını belirleyebilme",
    cognitiveLevel: "Karmaşık Bilişsel Süreçler"
  },
  "MAT.6.1.2": {
    code: "MAT.6.1.2",
    unit: "SAYILAR VE NİCELİKLER (1)",
    topic: "Bölünebilme Kriterleri",
    canonicalTitle: "Bir doğal sayının 2, 3, 4, 5, 6, 9 ve 10'a kalansız bölünebilme kurallarını açıklayabilme ve kullanabilme",
    cognitiveLevel: "Basit Bilişsel Süreçler"
  },
  "MAT.6.1.3": {
    code: "MAT.6.1.3",
    unit: "SAYILAR VE NİCELİKLER (1)",
    topic: "Asal Sayılar ve Asal Çarpanlar",
    canonicalTitle: "Bir doğal sayının asal olma durumunu ve asal çarpanlarını belirleyebilme",
    cognitiveLevel: "Basit Bilişsel Süreçler"
  },
  "MAT.6.1.4": {
    code: "MAT.6.1.4",
    unit: "SAYILAR VE NİCELİKLER (1)",
    topic: "Bir Doğal Sayının Çarpanları ve Katları",
    canonicalTitle: "Günlük hayat problemleri ya da matematiksel durumlarda iki doğal sayının ortak bölenleri ve katlarını yorumlayabilme",
    cognitiveLevel: "Karmaşık Bilişsel Süreçler"
  },
  "MAT.7.1.1": {
    code: "MAT.7.1.1",
    unit: "SAYILAR VE NİCELİKLER (1)",
    topic: "Tam Sayılar\nRasyonel Sayılar ve Farklı Temsilleri",
    canonicalTitle: "Gerçek yaşam ya da matematiksel durumlarda doğal sayı, tam sayı ve rasyonel sayıları yorumlayabilme",
    cognitiveLevel: "Basit Bilişsel Süreçler"
  },
  "MAT.7.1.2": {
    code: "MAT.7.1.2",
    unit: "Rasyonel Sayılar ve Farklı Temsilleri",
    topic: "Rasyonel Sayılar ve Farklı Temsilleri",
    canonicalTitle: "Gerçek yaşam durumlarında rasyonel sayıların ondalık gösterimlerini yansıtabilme",
    cognitiveLevel: "Basit Bilişsel Süreçler"
  },
  "MAT.7.1.3": {
    code: "MAT.7.1.3",
    unit: "",
    topic: "",
    canonicalTitle: "Rasyonel sayıların karşılaştırma ve sıralama ilişkilerini yorumlayabilme",
    cognitiveLevel: "Karmaşık Bilişsel Süreçler"
  },
  "MAT.7.1.4": {
    code: "MAT.7.1.4",
    unit: "Rasyonel Sayılarla İşlemler ve Problem Çözme",
    topic: "Rasyonel Sayılarla İşlemler ve Problem Çözme",
    canonicalTitle: "Rasyonel sayılar ve işlemler içeren gerçek yaşam problemlerini çözebilme",
    cognitiveLevel: "Karmaşık Bilişsel Süreçler"
  },
  "SB": {
    code: "SB",
    unit: "BİRLİKTE YAŞAMAK",
    topic: "Gruplarda ve Sosyal Hayatta İletişimin Önemi",
    canonicalTitle: "Dâhil olduğu gruplarda ve sosyal hayatta etkili iletişimin önemini sorgulayabilme",
    cognitiveLevel: "Basit Bilişsel Süreçler"
  },
  "SB.5.1.1": {
    code: "SB.5.1.1",
    unit: "BİRLİKTE YAŞAMAK",
    topic: "Gruplar ve Roller",
    canonicalTitle: "Dâhil olduğu gruplar ve bu gruplardaki rolleri arasındaki ilişkileri çözümleyebilme",
    cognitiveLevel: "Basit Bilişsel Süreçler"
  },
  "SB.5.1.2": {
    code: "SB.5.1.2",
    unit: "Kültürel Özelliklere Saygı ve Birlikte Yaşama Kültürü",
    topic: "Kültürel Özelliklere Saygı ve Birlikte Yaşama Kültürü",
    canonicalTitle: "Kültürel özelliklere saygı duymanın birlikte yaşamaya etkisini yorumlayabilme",
    cognitiveLevel: "Basit Bilişsel Süreçler"
  },
  "SB.5.1.3": {
    code: "SB.5.1.3",
    unit: "Yardımlaşma ve Dayanışma Faaliyetlerinin Toplumsal Birliğe Etkisi",
    topic: "Yardımlaşma ve Dayanışma Faaliyetlerinin Toplumsal Birliğe Etkisi",
    canonicalTitle: "Toplumsal birliği sürdürmeye yönelik yardımlaşma ve dayanışma faaliyetlerine katkı sağlayabilme",
    cognitiveLevel: "Basit Bilişsel Süreçler"
  },
  "SB.6.1.1": {
    code: "SB.6.1.1",
    unit: "BİRLİKTE YAŞAMAK",
    topic: "Zaman İçinde Değişen Gruplar ve Roller",
    canonicalTitle: "Dâhil olduğu grupların ve bu gruplardaki rollerinin zaman içerisinde değişebile ceğine ilişkin çıkarım yapabilme",
    cognitiveLevel: "Karmaşık Bilişsel Süreçler"
  },
  "SB.6.1.2": {
    code: "SB.6.1.2",
    unit: "Kültürel Bağlarımızın ve Millî Değerlerimizin Toplumsal Birlikteliğe Etkisi",
    topic: "Kültürel Bağlarımızın ve Millî Değerlerimizin Toplumsal Birlikteliğe Etkisi",
    canonicalTitle: "Kültürel bağlarımızın ve millî değerlerimizin toplumsal birliğe etkisini yorumlayabilme",
    cognitiveLevel: "Basit Bilişsel Süreçler"
  },
  "SB.6.1.3": {
    code: "SB.6.1.3",
    unit: "Toplumsal Sorunlar ve Çözümler Önerileri",
    topic: "Toplumsal Sorunlar ve Çözümler Önerileri",
    canonicalTitle: "Toplumsal hayatta karşılaşılan sorunlara yönelik çözüm önerilerini müzakere edebilme",
    cognitiveLevel: "Basit Bilişsel Süreçler"
  },
  "SB.7.1.1": {
    code: "SB.7.1.1",
    unit: "BİRLİKTE YAŞAMAK",
    topic: "Gruplarda ve Sosyal Hayatta İletişimin Önemi",
    canonicalTitle: "Dâhil olduğu gruplarda ve sosyal hayatta etkili iletişimin önemini sorgulayabilme",
    cognitiveLevel: "Karmaşık Bilişsel Süreçler"
  },
  "SB.7.2.1": {
    code: "SB.7.2.1",
    unit: "EVİMİZ DÜNYA",
    topic: "Küreselleşmenin İnsan ve Toplum Hayatına Etkisi",
    canonicalTitle: "Küreselleşmenin insan ve toplum hayatı üzerindeki etkilerini analiz edebilme",
    cognitiveLevel: "Karmaşık Bilişsel Süreçler"
  },
  "SB.7.1.2": {
    code: "SB.7.1.2",
    unit: "Özel Gereksinimli Bireyler İçin Fırsat Eşitliği",
    topic: "Özel Gereksinimli Bireyler İçin Fırsat Eşitliği",
    canonicalTitle: "Özel gereksinimli bireyler için fırsat eşitliğini sürdürmeye yönelik fikir üretebilme",
    cognitiveLevel: "Basit Bilişsel Süreçler"
  },
  "SB.7.1.3": {
    code: "SB.7.1.3",
    unit: "Millî Meseleler Karşısında Türk Toplumunun Tutum ve Davranışları",
    topic: "Millî Meseleler Karşısında Türk Toplumunun Tutum ve Davranışları",
    canonicalTitle: "Türk toplumunun millî meseleler karşısında gösterdiği tutum ve davranışlara ilişkin çıkarım yapabilme",
    cognitiveLevel: "Karmaşık Bilişsel Süreçler"
  },
  "T.8.3.11": {
    code: "T.8.3.11",
    unit: "",
    topic: "",
    canonicalTitle: "Metindeki anlatım biçimlerini belirler.",
    cognitiveLevel: "Basit Bilişsel Süreçler"
  },
  "T.8.3.14": {
    code: "T.8.3.14",
    unit: "",
    topic: "",
    canonicalTitle: "Metinle ilgili soruları cevaplar.",
    cognitiveLevel: "Basit Bilişsel Süreçler"
  },
  "T.8.3.15": {
    code: "T.8.3.15",
    unit: "",
    topic: "",
    canonicalTitle: "Metinle ilgili sorular sorar.",
    cognitiveLevel: "Basit Bilişsel Süreçler"
  },
  "T.8.3.16": {
    code: "T.8.3.16",
    unit: "",
    topic: "",
    canonicalTitle: "Metnin konusunu belirler.",
    cognitiveLevel: "Basit Bilişsel Süreçler"
  },
  "T.8.3.17": {
    code: "T.8.3.17",
    unit: "",
    topic: "",
    canonicalTitle: "Metnin ana fikrini/ana duygusunu belirler.",
    cognitiveLevel: "Basit Bilişsel Süreçler"
  },
  "T.8.3.19": {
    code: "T.8.3.19",
    unit: "",
    topic: "",
    canonicalTitle: "Metnin içeriğine uygun başlık/başlıklar belirler.",
    cognitiveLevel: "Basit Bilişsel Süreçler"
  },
  "T.8.3.25": {
    code: "T.8.3.25",
    unit: "",
    topic: "",
    canonicalTitle: "Okudukları ile ilgili çıkarımlarda bulunur.",
    cognitiveLevel: "Karmaşık Bilişsel Süreçler"
  },
  "T.8.3.26": {
    code: "T.8.3.26",
    unit: "",
    topic: "",
    canonicalTitle: "Metin türlerini ayırt eder.",
    cognitiveLevel: "Basit Bilişsel Süreçler"
  },
  "T.8.3.34": {
    code: "T.8.3.34",
    unit: "",
    topic: "",
    canonicalTitle: "Okuduklarında kullanılan düşünceyi geliştirme yollarını belirler.",
    cognitiveLevel: "Basit Bilişsel Süreçler"
  },
  "T.8.3.5": {
    code: "T.8.3.5",
    unit: "",
    topic: "",
    canonicalTitle: "Bağlamdan yararlanarak bilmediği kelime ve kelime gruplarının anlamını tahmin eder.",
    cognitiveLevel: "Basit Bilişsel Süreçler"
  },
  "T.8.3.7": {
    code: "T.8.3.7",
    unit: "",
    topic: "",
    canonicalTitle: "Metindeki söz sanatlarını tespit eder.",
    cognitiveLevel: "Basit Bilişsel Süreçler"
  },
  "T.8.3.9": {
    code: "T.8.3.9",
    unit: "",
    topic: "",
    canonicalTitle: "Fiilimsilerin cümledeki işlevlerini kavrar.",
    cognitiveLevel: "Basit Bilişsel Süreçler"
  },
  "T.8.4.1": {
    code: "T.8.4.1",
    unit: "YAZMA",
    topic: "Alt Öğrenme Alanı Yok",
    canonicalTitle: "Şiir yazar.",
    cognitiveLevel: "Basit Bilişsel Süreçler"
  },
  "T.8.4.15": {
    code: "T.8.4.15",
    unit: "",
    topic: "",
    canonicalTitle: "Yazılarında uygun geçiş ve bağlantı ifadelerini kullanır.",
    cognitiveLevel: "Basit Bilişsel Süreçler"
  },
  "T.8.4.18": {
    code: "T.8.4.18",
    unit: "",
    topic: "",
    canonicalTitle: "Cümlenin ögelerini ayırt eder.",
    cognitiveLevel: "Basit Bilişsel Süreçler"
  },
  "T.8.4.4": {
    code: "T.8.4.4",
    unit: "",
    topic: "",
    canonicalTitle: "Yazma stratejilerini uygular.",
    cognitiveLevel: "Basit Bilişsel Süreçler"
  },
  "T.8.4.9": {
    code: "T.8.4.9",
    unit: "",
    topic: "",
    canonicalTitle: "Yazılarında anlatım biçimlerini kullanır.",
    cognitiveLevel: "Basit Bilişsel Süreçler"
  },
  "T.O.5.15": {
    code: "T.O.5.15",
    unit: "",
    topic: "",
    canonicalTitle: "Metnin anahtar kelimelerini belirlemeye yönelik çözümleme yapabilme",
    cognitiveLevel: "Basit Bilişsel Süreçler"
  },
  "T.O.5.20": {
    code: "T.O.5.20",
    unit: "",
    topic: "",
    canonicalTitle: "Metinden hareketle söz varlığını geliştirmeye yönelik çözümleme yapabilme",
    cognitiveLevel: "Basit Bilişsel Süreçler"
  },
  "T.O.5.5": {
    code: "T.O.5.5",
    unit: "",
    topic: "",
    canonicalTitle: "Metinde geçen anlamını bilmediği söz varlığı unsurlarının anlamını tahmin edebilme",
    cognitiveLevel: "Basit Bilişsel Süreçler"
  },
  "T.O.5.6": {
    code: "T.O.5.6",
    unit: "",
    topic: "",
    canonicalTitle: "Metnin yüzey anlamını belirleyebilme",
    cognitiveLevel: "Basit Bilişsel Süreçler"
  },
  "T.O.5.7": {
    code: "T.O.5.7",
    unit: "",
    topic: "",
    canonicalTitle: "Görselle iletilen anlamı belirleyebilme",
    cognitiveLevel: "Basit Bilişsel Süreçler"
  },
  "T.O.6.16": {
    code: "T.O.6.16",
    unit: "",
    topic: "",
    canonicalTitle: "Bilgilendirici metinde anahtar kelimeleri belirlemeye yönelik çözümleme yapabilme",
    cognitiveLevel: "Basit Bilişsel Süreçler"
  },
  "T.O.6.21": {
    code: "T.O.6.21",
    unit: "",
    topic: "",
    canonicalTitle: "Metinden hareketle söz varlığını geliştirmeye yönelik çözümleme yapabilme",
    cognitiveLevel: "Basit Bilişsel Süreçler"
  },
  "T.O.6.5": {
    code: "T.O.6.5",
    unit: "",
    topic: "",
    canonicalTitle: "Metinde geçen anlamını bilmediği söz varlığı unsurlarının anlamını tahmin edebilme",
    cognitiveLevel: "Basit Bilişsel Süreçler"
  },
  "T.O.6.6": {
    code: "T.O.6.6",
    unit: "",
    topic: "",
    canonicalTitle: "Metnin yüzey anlamını belirleyebilme",
    cognitiveLevel: "Basit Bilişsel Süreçler"
  },
  "T.O.7.14": {
    code: "T.O.7.14",
    unit: "",
    topic: "",
    canonicalTitle: "Bilgilendirici metinlerde metin yapılarından hareketle önemli bilgileri belirlemeye yönelik çözümleme yapabilme",
    cognitiveLevel: "Basit Bilişsel Süreçler"
  },
  "T.O.7.15": {
    code: "T.O.7.15",
    unit: "",
    topic: "",
    canonicalTitle: "Bilgilendirici metinde anahtar kelimeleri belirlemeye yönelik çözümleme yapabilme",
    cognitiveLevel: "Basit Bilişsel Süreçler"
  },
  "T.O.7.21": {
    code: "T.O.7.21",
    unit: "",
    topic: "",
    canonicalTitle: "Metinden hareketle söz varlığını geliştirmeye yönelik çözümleme yapabilme",
    cognitiveLevel: "Basit Bilişsel Süreçler"
  },
  "T.O.7.4": {
    code: "T.O.7.4",
    unit: "",
    topic: "",
    canonicalTitle: "Metinde geçen anlamını bilmediği söz varlığı unsurlarının anlamını tahmin edebilme",
    cognitiveLevel: "Basit Bilişsel Süreçler"
  },
  "T.O.7.5": {
    code: "T.O.7.5",
    unit: "",
    topic: "",
    canonicalTitle: "Metnin yüzey anlamını belirleyebilme",
    cognitiveLevel: "Basit Bilişsel Süreçler"
  },
  "T.O.7.7": {
    code: "T.O.7.7",
    unit: "",
    topic: "",
    canonicalTitle: "Metnin derin anlamını belirlemeye yönelik basit çıkarımlar yapabilme",
    cognitiveLevel: "Karmaşık Bilişsel Süreçler"
  },
  "T.O.7.8": {
    code: "T.O.7.8",
    unit: "",
    topic: "",
    canonicalTitle: "Metnin derin anlamını belirlemeye yönelik üst düzey çıkarımlar yapabilme",
    cognitiveLevel: "Karmaşık Bilişsel Süreçler"
  },
  "T.Y.5.13": {
    code: "T.Y.5.13",
    unit: "",
    topic: "",
    canonicalTitle: "Yazısını zenginleştirecek biçimde söz varlığını kullanabilme",
    cognitiveLevel: "Basit Bilişsel Süreçler"
  },
  "T.Y.5.16": {
    code: "T.Y.5.16",
    unit: "",
    topic: "",
    canonicalTitle: "Yazım ve noktalama işaretleriyle ilgili kuralları uygulayabilme",
    cognitiveLevel: "Basit Bilişsel Süreçler"
  },
  "T.Y.5.3": {
    code: "T.Y.5.3",
    unit: "",
    topic: "",
    canonicalTitle: "Yazısında içerik ve yapıya yönelik seçimlerini yönetebilme",
    cognitiveLevel: "Basit Bilişsel Süreçler"
  },
  "T.Y.6.18": {
    code: "T.Y.6.18",
    unit: "",
    topic: "",
    canonicalTitle: "Yazısını zenginleştirecek biçimde söz varlığını kullanabilme",
    cognitiveLevel: "Basit Bilişsel Süreçler"
  },
  "T.Y.6.21": {
    code: "T.Y.6.21",
    unit: "",
    topic: "",
    canonicalTitle: "Yazım kuralları ve noktalama işaretlerini uygulayabilme",
    cognitiveLevel: "Basit Bilişsel Süreçler"
  },
  "T.Y.6.3": {
    code: "T.Y.6.3",
    unit: "",
    topic: "",
    canonicalTitle: "Yazısında içerik ve yapıya yönelik seçimlerini yönetebilme",
    cognitiveLevel: "Basit Bilişsel Süreçler"
  },
  "T.Y.7.18": {
    code: "T.Y.7.18",
    unit: "",
    topic: "",
    canonicalTitle: "Yazısını zenginleştirecek biçimde söz varlığını kullanabilme",
    cognitiveLevel: "Basit Bilişsel Süreçler"
  },
  "T.Y.7.21": {
    code: "T.Y.7.21",
    unit: "",
    topic: "",
    canonicalTitle: "Yazım kuralları ve noktalama işaretlerini uygulayabilme",
    cognitiveLevel: "Basit Bilişsel Süreçler"
  },
  "T.Y.7.3": {
    code: "T.Y.7.3",
    unit: "",
    topic: "",
    canonicalTitle: "Yazısında içerik ve yapıya yönelik seçimlerini yönetebilme",
    cognitiveLevel: "Basit Bilişsel Süreçler"
  },
  "İTA.8.1.1": {
    code: "İTA.8.1.1",
    unit: "1. ÜNİTE: BİR KAHRAMAN DOĞUYOR",
    topic: "1. ÜNİTE: BİR KAHRAMAN DOĞUYOR",
    canonicalTitle: "Avrupa’daki gelişmelerin yansımaları bağlamında Osmanlı Devleti’nin yirminci yüzyılın başlarındaki siyasi ve sosyal durumunu kavrar.",
    cognitiveLevel: "Basit Bilişsel Süreçler"
  },
  "İTA.8.1.2": {
    code: "İTA.8.1.2",
    unit: "",
    topic: "",
    canonicalTitle: "Mustafa Kemal’in çocukluk ve öğrenim hayatından hareketle onun kişilik özelliklerinin oluşumu hakkında çıkarımlarda bulunur.",
    cognitiveLevel: "Karmaşık Bilişsel Süreçler"
  },
  "İTA.8.1.3": {
    code: "İTA.8.1.3",
    unit: "",
    topic: "",
    canonicalTitle: "Gençlik döneminde Mustafa Kemal’in fikir hayatını etkileyen önemli kişileri ve olayları kavrar.",
    cognitiveLevel: "Basit Bilişsel Süreçler"
  },
  "İTA.8.1.4": {
    code: "İTA.8.1.4",
    unit: "",
    topic: "",
    canonicalTitle: "Mustafa Kemal’in askerlik hayatı ile ilgili olayları ve olguları onun kişilik özellikleri ile ilişkilendirir.",
    cognitiveLevel: "Karmaşık Bilişsel Süreçler"
  },
  "İTA.8.2.1": {
    code: "İTA.8.2.1",
    unit: "2. ÜNİTE: MİLLÎ UYANIŞ: BAĞIMSIZLIK YOLUNDA ATILAN ADIMLAR",
    topic: "2. ÜNİTE: MİLLÎ UYANIŞ: BAĞIMSIZLIK YOLUNDA ATILAN ADIMLAR",
    canonicalTitle: "Birinci Dünya Savaşı’nın sebeplerini ve savaşın başlamasına yol açan gelişmeleri kavrar.",
    cognitiveLevel: "Basit Bilişsel Süreçler"
  },
  "İTA.8.2.2": {
    code: "İTA.8.2.2",
    unit: "",
    topic: "",
    canonicalTitle: "Birinci Dünya Savaşı’nda Osmanlı Devleti’nin durumu hakkında çıkarımlarda bulunur.",
    cognitiveLevel: "Karmaşık Bilişsel Süreçler"
  },
  "İTA.8.2.3": {
    code: "İTA.8.2.3",
    unit: "",
    topic: "",
    canonicalTitle: "Mondros Ateşkes Antlaşması’nın imzalanması ve uygulanması karşısında Osmanlı yönetiminin, Mustafa Kemal’in ve halkın tutumunu analiz eder.",
    cognitiveLevel: "Karmaşık Bilişsel Süreçler"
  },
};

export function getOfficialOutcomeTitle(code: string): string {
  if (!code) return '';
  const normalized = code.trim().replace('SB ', 'SB.');
  if (OFFICIAL_OUTCOMES[normalized]) {
    let title = OFFICIAL_OUTCOMES[normalized].canonicalTitle.trim();
    // Clean redundant leading code or numbers e.g. "MAT.7.1.1." or "8.2.1."
    title = title.replace(/^(?:[A-ZÇĞİÖŞÜa-zçğıöşü]+[.\s]*)?\d+[.]\d+[.]\d+[.]?\s*/i, '').trim();
    return title;
  }
  return code;
}

export function formatOutcomeBadgeTitle(outcomeTitle?: string, outcomeCode?: string): string {
  if (!outcomeTitle) return '';
  let title = outcomeTitle.trim();
  if (outcomeCode) {
    const cleanCode = outcomeCode.trim();
    const escapedCode = cleanCode.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    title = title.replace(new RegExp(`^${escapedCode}[.:\\s-]*`, 'i'), '').trim();
  }
  return title;
}

// Ortaokul 5, 6, 7, 8. Sınıf MEB ÖDSGM Resmi Konu Soru Dağılım Matrisi
export const MIDDLE_SCHOOL_OFFICIAL_SCENARIOS: Record<number, Partial<Record<SubjectId, ExamScenario[]>>> = {
  5: {
    turkce: [
      {
        id: "senaryo_1",
        name: "Senaryo 1 (6 Soru)",
        description: "MEB ÖDSGM 2026-2027 1. Dönem 1. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 1 (6 Soru) formatı (Toplam 100 Puan).",
        totalQuestions: 6,
        distributions: [
        { outcomeCode: "T.O.5.6", questionCount: 2, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Metnin yüzey anlamını belirleyebilme" },
        { outcomeCode: "T.O.5.7", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Görselle iletilen anlamı belirleyebilme" },
        { outcomeCode: "T.O.5.20", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Metinden hareketle söz varlığını geliştirmeye yönelik çözümleme yapabilme" },
        { outcomeCode: "T.Y.5.13", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Yazısını zenginleştirecek biçimde söz varlığını kullanabilme" },
        { outcomeCode: "T.Y.5.16", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Yazım ve noktalama işaretleriyle ilgili kuralları uygulayabilme" },
        ]
      },
      {
        id: "senaryo_2",
        name: "Senaryo 2 (6 Soru)",
        description: "MEB ÖDSGM 2026-2027 1. Dönem 1. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 2 (6 Soru) formatı (Toplam 100 Puan).",
        totalQuestions: 6,
        distributions: [
        { outcomeCode: "T.O.5.5", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Metinde geçen anlamını bilmediği söz varlığı unsurlarının anlamını tahmin edebilme" },
        { outcomeCode: "T.O.5.6", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Metnin yüzey anlamını belirleyebilme" },
        { outcomeCode: "T.O.5.7", questionCount: 2, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Görselle iletilen anlamı belirleyebilme" },
        { outcomeCode: "T.O.5.15", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Metnin anahtar kelimelerini belirlemeye yönelik çözümleme yapabilme" },
        { outcomeCode: "T.Y.5.16", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Yazım ve noktalama işaretleriyle ilgili kuralları uygulayabilme" },
        ]
      },
      {
        id: "senaryo_3",
        name: "Senaryo 3 (7 Soru)",
        description: "MEB ÖDSGM 2026-2027 1. Dönem 1. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 3 (7 Soru) formatı (Toplam 100 Puan).",
        totalQuestions: 7,
        distributions: [
        { outcomeCode: "T.O.5.5", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Metinde geçen anlamını bilmediği söz varlığı unsurlarının anlamını tahmin edebilme" },
        { outcomeCode: "T.O.5.6", questionCount: 2, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Metnin yüzey anlamını belirleyebilme" },
        { outcomeCode: "T.O.5.7", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Görselle iletilen anlamı belirleyebilme" },
        { outcomeCode: "T.O.5.15", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Metnin anahtar kelimelerini belirlemeye yönelik çözümleme yapabilme" },
        { outcomeCode: "T.Y.5.13", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Yazısını zenginleştirecek biçimde söz varlığını kullanabilme" },
        { outcomeCode: "T.Y.5.16", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Yazım ve noktalama işaretleriyle ilgili kuralları uygulayabilme" },
        ]
      },
      {
        id: "senaryo_4",
        name: "Senaryo 4 (7 Soru)",
        description: "MEB ÖDSGM 2026-2027 1. Dönem 1. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 4 (7 Soru) formatı (Toplam 100 Puan).",
        totalQuestions: 7,
        distributions: [
        { outcomeCode: "T.O.5.6", questionCount: 2, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Metnin yüzey anlamını belirleyebilme" },
        { outcomeCode: "T.O.5.7", questionCount: 2, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Görselle iletilen anlamı belirleyebilme" },
        { outcomeCode: "T.O.5.20", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Metinden hareketle söz varlığını geliştirmeye yönelik çözümleme yapabilme" },
        { outcomeCode: "T.Y.5.13", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Yazısını zenginleştirecek biçimde söz varlığını kullanabilme" },
        { outcomeCode: "T.Y.5.16", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Yazım ve noktalama işaretleriyle ilgili kuralları uygulayabilme" },
        ]
      },
      {
        id: "senaryo_5",
        name: "Senaryo 5 (7 Soru)",
        description: "MEB ÖDSGM 2026-2027 1. Dönem 1. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 5 (7 Soru) formatı (Toplam 100 Puan).",
        totalQuestions: 7,
        distributions: [
        { outcomeCode: "T.O.5.5", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Metinde geçen anlamını bilmediği söz varlığı unsurlarının anlamını tahmin edebilme" },
        { outcomeCode: "T.O.5.6", questionCount: 2, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Metnin yüzey anlamını belirleyebilme" },
        { outcomeCode: "T.O.5.7", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Görselle iletilen anlamı belirleyebilme" },
        { outcomeCode: "T.O.5.20", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Metinden hareketle söz varlığını geliştirmeye yönelik çözümleme yapabilme" },
        { outcomeCode: "T.Y.5.3", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Yazısında içerik ve yapıya yönelik seçimlerini yönetebilme" },
        { outcomeCode: "T.Y.5.13", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Yazısını zenginleştirecek biçimde söz varlığını kullanabilme" },
        ]
      },
      {
        id: "senaryo_6",
        name: "Senaryo 6 (8 Soru)",
        description: "MEB ÖDSGM 2026-2027 1. Dönem 1. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 6 (8 Soru) formatı (Toplam 100 Puan).",
        totalQuestions: 8,
        distributions: [
        { outcomeCode: "T.O.5.5", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Metinde geçen anlamını bilmediği söz varlığı unsurlarının anlamını tahmin edebilme" },
        { outcomeCode: "T.O.5.6", questionCount: 2, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Metnin yüzey anlamını belirleyebilme" },
        { outcomeCode: "T.O.5.7", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Görselle iletilen anlamı belirleyebilme" },
        { outcomeCode: "T.O.5.15", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Metnin anahtar kelimelerini belirlemeye yönelik çözümleme yapabilme" },
        { outcomeCode: "T.O.5.20", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Metinden hareketle söz varlığını geliştirmeye yönelik çözümleme yapabilme" },
        { outcomeCode: "T.Y.5.3", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Yazısında içerik ve yapıya yönelik seçimlerini yönetebilme" },
        { outcomeCode: "T.Y.5.16", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Yazım ve noktalama işaretleriyle ilgili kuralları uygulayabilme" },
        ]
      },
    ],
    matematik: [
      {
        id: "senaryo_1",
        name: "Senaryo 1 (7 Soru)",
        description: "MEB ÖDSGM 2026-2027 1. Dönem 1. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 1 (7 Soru) formatı (Toplam 100 Puan).",
        totalQuestions: 7,
        distributions: [
        { outcomeCode: "MAT.5.3.1", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Temel Geometrik Çizimler ve İnşalar" },
        { outcomeCode: "MAT.5.3.2", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Temel geometrik çizimlere dayalı deneyimlerini yansıtabilme" },
        { outcomeCode: "MAT.5.3.3", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Açı Ölçme" },
        { outcomeCode: "MAT.5.3.4", questionCount: 1, cognitiveLevel: "Karmaşık Bilişsel Süreçler", notes: "Düzlemde iki veya üç doğrunun birbirine göre durumuna bağlı olarak oluşabilecek açılara dair çıkarım yapabilme" },
        { outcomeCode: "MAT.5.3.5", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Çokgenler ve Çember" },
        { outcomeCode: "MAT.5.3.6", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Çokgenlerin özellikleri ile ilgili edindiği deneyimleri yansıtabilme" },
        { outcomeCode: "MAT.5.3.7", questionCount: 1, cognitiveLevel: "Karmaşık Bilişsel Süreçler", notes: "Matematiksel araç ve teknoloji yardımıyla düzlemde iki noktada kesişen çember çiftinin merkezleri ve kesişim noktalarından biri ile inşa edilen üçgenlerin kenar özelliklerine yönelik çıkarım yapabilme" },
        ]
      },
      {
        id: "senaryo_2",
        name: "Senaryo 2 (7 Soru)",
        description: "MEB ÖDSGM 2026-2027 1. Dönem 1. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 2 (7 Soru) formatı (Toplam 100 Puan).",
        totalQuestions: 7,
        distributions: [
        { outcomeCode: "MAT.5.3.1", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Temel Geometrik Çizimler ve İnşalar" },
        { outcomeCode: "MAT.5.3.2", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Temel geometrik çizimlere dayalı deneyimlerini yansıtabilme" },
        { outcomeCode: "MAT.5.3.3", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Açı Ölçme" },
        { outcomeCode: "MAT.5.3.4", questionCount: 1, cognitiveLevel: "Karmaşık Bilişsel Süreçler", notes: "Düzlemde iki veya üç doğrunun birbirine göre durumuna bağlı olarak oluşabilecek açılara dair çıkarım yapabilme" },
        { outcomeCode: "MAT.5.3.5", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Çokgenler ve Çember" },
        { outcomeCode: "MAT.5.3.6", questionCount: 2, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Çokgenlerin özellikleri ile ilgili edindiği deneyimleri yansıtabilme" },
        ]
      },
      {
        id: "senaryo_3",
        name: "Senaryo 3 (7 Soru)",
        description: "MEB ÖDSGM 2026-2027 1. Dönem 1. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 3 (7 Soru) formatı (Toplam 100 Puan).",
        totalQuestions: 7,
        distributions: [
        { outcomeCode: "MAT.5.3.1", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Temel Geometrik Çizimler ve İnşalar" },
        { outcomeCode: "MAT.5.3.3", questionCount: 2, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Açı Ölçme" },
        { outcomeCode: "MAT.5.3.4", questionCount: 2, cognitiveLevel: "Karmaşık Bilişsel Süreçler", notes: "Düzlemde iki veya üç doğrunun birbirine göre durumuna bağlı olarak oluşabilecek açılara dair çıkarım yapabilme" },
        { outcomeCode: "MAT.5.3.5", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Çokgenler ve Çember" },
        { outcomeCode: "MAT.5.3.6", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Çokgenlerin özellikleri ile ilgili edindiği deneyimleri yansıtabilme" },
        ]
      },
      {
        id: "senaryo_4",
        name: "Senaryo 4 (6 Soru)",
        description: "MEB ÖDSGM 2026-2027 1. Dönem 1. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 4 (6 Soru) formatı (Toplam 100 Puan).",
        totalQuestions: 6,
        distributions: [
        { outcomeCode: "MAT.5.3.1", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Temel Geometrik Çizimler ve İnşalar" },
        { outcomeCode: "MAT.5.3.2", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Temel geometrik çizimlere dayalı deneyimlerini yansıtabilme" },
        { outcomeCode: "MAT.5.3.3", questionCount: 2, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Açı Ölçme" },
        { outcomeCode: "MAT.5.3.4", questionCount: 1, cognitiveLevel: "Karmaşık Bilişsel Süreçler", notes: "Düzlemde iki veya üç doğrunun birbirine göre durumuna bağlı olarak oluşabilecek açılara dair çıkarım yapabilme" },
        { outcomeCode: "MAT.5.3.5", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Çokgenler ve Çember" },
        ]
      },
      {
        id: "senaryo_5",
        name: "Senaryo 5 (7 Soru)",
        description: "MEB ÖDSGM 2026-2027 1. Dönem 1. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 5 (7 Soru) formatı (Toplam 100 Puan).",
        totalQuestions: 7,
        distributions: [
        { outcomeCode: "MAT.5.3.1", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Temel Geometrik Çizimler ve İnşalar" },
        { outcomeCode: "MAT.5.3.2", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Temel geometrik çizimlere dayalı deneyimlerini yansıtabilme" },
        { outcomeCode: "MAT.5.3.3", questionCount: 2, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Açı Ölçme" },
        { outcomeCode: "MAT.5.3.4", questionCount: 2, cognitiveLevel: "Karmaşık Bilişsel Süreçler", notes: "Düzlemde iki veya üç doğrunun birbirine göre durumuna bağlı olarak oluşabilecek açılara dair çıkarım yapabilme" },
        { outcomeCode: "MAT.5.3.5", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Çokgenler ve Çember" },
        ]
      },
    ],
    fen_bilimleri: [
      {
        id: "senaryo_1",
        name: "Senaryo 1 (7 Soru)",
        description: "MEB ÖDSGM 2026-2027 1. Dönem 1. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 1 (7 Soru) formatı (Toplam 100 Puan).",
        totalQuestions: 7,
        distributions: [
        { outcomeCode: "FB.5.1.2", questionCount: 2, cognitiveLevel: "Karmaşık Bilişsel Süreçler", notes: "Gökyüzündeki Komşumuz: Ay" },
        { outcomeCode: "FB.5.1.3", questionCount: 2, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Ay’ın evrelerini temsil eden bilimsel model oluşturabilme" },
        { outcomeCode: "FB.5.1.4", questionCount: 2, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Dünya’mız ve Gökyüzündeki Komşularımız" },
        { outcomeCode: "FB.5.2.1", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Kuvvet ve Kuvvetin Ölçülmesi" },
        ]
      },
      {
        id: "senaryo_2",
        name: "Senaryo 2 (7 Soru)",
        description: "MEB ÖDSGM 2026-2027 1. Dönem 1. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 2 (7 Soru) formatı (Toplam 100 Puan).",
        totalQuestions: 7,
        distributions: [
        { outcomeCode: "FB.5.1.2", questionCount: 2, cognitiveLevel: "Karmaşık Bilişsel Süreçler", notes: "Gökyüzündeki Komşumuz: Ay" },
        { outcomeCode: "FB.5.1.3", questionCount: 3, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Ay’ın evrelerini temsil eden bilimsel model oluşturabilme" },
        { outcomeCode: "FB.5.1.4", questionCount: 2, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Dünya’mız ve Gökyüzündeki Komşularımız" },
        ]
      },
      {
        id: "senaryo_3",
        name: "Senaryo 3 (6 Soru)",
        description: "MEB ÖDSGM 2026-2027 1. Dönem 1. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 3 (6 Soru) formatı (Toplam 100 Puan).",
        totalQuestions: 6,
        distributions: [
        { outcomeCode: "FB.5.1.2", questionCount: 2, cognitiveLevel: "Karmaşık Bilişsel Süreçler", notes: "Gökyüzündeki Komşumuz: Ay" },
        { outcomeCode: "FB.5.1.3", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Ay’ın evrelerini temsil eden bilimsel model oluşturabilme" },
        { outcomeCode: "FB.5.1.4", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Dünya’mız ve Gökyüzündeki Komşularımız" },
        { outcomeCode: "FB.5.2.1", questionCount: 2, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Kuvvet ve Kuvvetin Ölçülmesi" },
        ]
      },
      {
        id: "senaryo_4",
        name: "Senaryo 4 (6 Soru)",
        description: "MEB ÖDSGM 2026-2027 1. Dönem 1. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 4 (6 Soru) formatı (Toplam 100 Puan).",
        totalQuestions: 6,
        distributions: [
        { outcomeCode: "FB.5.1.2", questionCount: 2, cognitiveLevel: "Karmaşık Bilişsel Süreçler", notes: "Gökyüzündeki Komşumuz: Ay" },
        { outcomeCode: "FB.5.1.4", questionCount: 2, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Dünya’mız ve Gökyüzündeki Komşularımız" },
        { outcomeCode: "FB.5.2.1", questionCount: 2, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Kuvvet ve Kuvvetin Ölçülmesi" },
        ]
      },
    ],
    sosyal_bilgiler: [
      {
        id: "senaryo_1",
        name: "Senaryo 1 (6 Soru)",
        description: "MEB ÖDSGM 2026-2027 1. Dönem 1. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 1 (6 Soru) formatı (Toplam 100 Puan).",
        totalQuestions: 6,
        distributions: [
        { outcomeCode: "SB.5.1.1", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Gruplar ve Roller" },
        { outcomeCode: "SB.5.1.2", questionCount: 2, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Kültürel Özelliklere Saygı ve Birlikte Yaşama Kültürü" },
        { outcomeCode: "SB.5.1.3", questionCount: 2, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Yardımlaşma ve Dayanışma Faaliyetlerinin Toplumsal Birliğe Etkisi" },
        { outcomeCode: "SB.5.2.1", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Küreselleşmenin İnsan ve Toplum Hayatına Etkisi" },
        ]
      },
      {
        id: "senaryo_2",
        name: "Senaryo 2 (7 Soru)",
        description: "MEB ÖDSGM 2026-2027 1. Dönem 1. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 2 (7 Soru) formatı (Toplam 100 Puan).",
        totalQuestions: 7,
        distributions: [
        { outcomeCode: "SB.5.1.1", questionCount: 2, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Gruplar ve Roller" },
        { outcomeCode: "SB.5.1.2", questionCount: 2, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Kültürel Özelliklere Saygı ve Birlikte Yaşama Kültürü" },
        { outcomeCode: "SB.5.1.3", questionCount: 3, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Yardımlaşma ve Dayanışma Faaliyetlerinin Toplumsal Birliğe Etkisi" },
        ]
      },
      {
        id: "senaryo_3",
        name: "Senaryo 3 (7 Soru)",
        description: "MEB ÖDSGM 2026-2027 1. Dönem 1. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 3 (7 Soru) formatı (Toplam 100 Puan).",
        totalQuestions: 7,
        distributions: [
        { outcomeCode: "SB.5.1.1", questionCount: 2, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Gruplar ve Roller" },
        { outcomeCode: "SB.5.1.2", questionCount: 2, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Kültürel Özelliklere Saygı ve Birlikte Yaşama Kültürü" },
        { outcomeCode: "SB.5.1.3", questionCount: 2, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Yardımlaşma ve Dayanışma Faaliyetlerinin Toplumsal Birliğe Etkisi" },
        { outcomeCode: "SB.5.2.1", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Küreselleşmenin İnsan ve Toplum Hayatına Etkisi" },
        ]
      },
      {
        id: "senaryo_4",
        name: "Senaryo 4 (6 Soru)",
        description: "MEB ÖDSGM 2026-2027 1. Dönem 1. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 4 (6 Soru) formatı (Toplam 100 Puan).",
        totalQuestions: 6,
        distributions: [
        { outcomeCode: "SB.5.1.1", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Gruplar ve Roller" },
        { outcomeCode: "SB.5.1.2", questionCount: 2, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Kültürel Özelliklere Saygı ve Birlikte Yaşama Kültürü" },
        { outcomeCode: "SB.5.1.3", questionCount: 3, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Yardımlaşma ve Dayanışma Faaliyetlerinin Toplumsal Birliğe Etkisi" },
        ]
      },
      {
        id: "senaryo_5",
        name: "Senaryo 5 (6 Soru)",
        description: "MEB ÖDSGM 2026-2027 1. Dönem 1. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 5 (6 Soru) formatı (Toplam 100 Puan).",
        totalQuestions: 6,
        distributions: [
        { outcomeCode: "SB.5.1.1", questionCount: 2, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Gruplar ve Roller" },
        { outcomeCode: "SB.5.1.2", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Kültürel Özelliklere Saygı ve Birlikte Yaşama Kültürü" },
        { outcomeCode: "SB.5.1.3", questionCount: 2, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Yardımlaşma ve Dayanışma Faaliyetlerinin Toplumsal Birliğe Etkisi" },
        { outcomeCode: "SB.5.2.1", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Küreselleşmenin İnsan ve Toplum Hayatına Etkisi" },
        ]
      },
    ],
    din_kulturu: [
      {
        id: "senaryo_1",
        name: "Senaryo 1 (8 Soru)",
        description: "MEB ÖDSGM 2026-2027 1. Dönem 1. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 1 (8 Soru) formatı (Toplam 100 Puan).",
        totalQuestions: 8,
        distributions: [
        { outcomeCode: "Evrendeki", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Evrendeki Mükemmel Düzen" },
        { outcomeCode: "DKAB.5.1.2", questionCount: 3, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Allah’ın Varlığı ve Birliği" },
        { outcomeCode: "DKAB.5.1.3", questionCount: 2, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Allah’ın Güzel İsimleri" },
        { outcomeCode: "DKAB.5.1.4", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Bir Sure Öğreniyorum: İhlas Suresi" },
        { outcomeCode: "DKAB.5.2.1", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Allah’ın Huzurunda Olmak: Namaz" },
        ]
      },
      {
        id: "senaryo_2",
        name: "Senaryo 2 (7 Soru)",
        description: "MEB ÖDSGM 2026-2027 1. Dönem 1. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 2 (7 Soru) formatı (Toplam 100 Puan).",
        totalQuestions: 7,
        distributions: [
        { outcomeCode: "Evrendeki", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Evrendeki Mükemmel Düzen" },
        { outcomeCode: "DKAB.5.1.2", questionCount: 3, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Allah’ın Varlığı ve Birliği" },
        { outcomeCode: "DKAB.5.1.3", questionCount: 2, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Allah’ın Güzel İsimleri" },
        { outcomeCode: "DKAB.5.1.4", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Bir Sure Öğreniyorum: İhlas Suresi" },
        ]
      },
      {
        id: "senaryo_3",
        name: "Senaryo 3 (6 Soru)",
        description: "MEB ÖDSGM 2026-2027 1. Dönem 1. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 3 (6 Soru) formatı (Toplam 100 Puan).",
        totalQuestions: 6,
        distributions: [
        { outcomeCode: "DKAB.5.1.2", questionCount: 3, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Allah’ın Varlığı ve Birliği" },
        { outcomeCode: "DKAB.5.1.3", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Allah’ın Güzel İsimleri" },
        { outcomeCode: "DKAB.5.1.4", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Bir Sure Öğreniyorum: İhlas Suresi" },
        { outcomeCode: "DKAB.5.2.1", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Allah’ın Huzurunda Olmak: Namaz" },
        ]
      },
      {
        id: "senaryo_4",
        name: "Senaryo 4 (6 Soru)",
        description: "MEB ÖDSGM 2026-2027 1. Dönem 1. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 4 (6 Soru) formatı (Toplam 100 Puan).",
        totalQuestions: 6,
        distributions: [
        { outcomeCode: "Evrendeki", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Evrendeki Mükemmel Düzen" },
        { outcomeCode: "DKAB.5.1.2", questionCount: 2, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Allah’ın Varlığı ve Birliği" },
        { outcomeCode: "DKAB.5.1.3", questionCount: 2, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Allah’ın Güzel İsimleri" },
        { outcomeCode: "DKAB.5.1.4", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Bir Sure Öğreniyorum: İhlas Suresi" },
        ]
      },
    ],
    ingilizce: [
      {
        id: "senaryo_1",
        name: "Senaryo 1 (5 Soru)",
        description: "MEB ÖDSGM 2026-2027 1. Dönem 1. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 1 (5 Soru) formatı (Toplam 100 Puan).",
        totalQuestions: 5,
        distributions: [
        { outcomeCode: "ENG.5.1.R2", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "SCHOOL LIFE" },
        { outcomeCode: "ENG.5.1.R3", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Students can make meaning of / derive meaning from the current content about “school life with people, places and rules at school; school clubs; countries; national days and celebrations” by reading it carefully." },
        { outcomeCode: "ENG.5.1.V1", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Students can select and use the target vocabulary of the current content about “school life with people, places and rules at school; school clubs; countries; national days and celebrations” accurately, authentically, spontaneously, and naturally and use it appropriately and effectively when communicating with others." },
        { outcomeCode: "ENG.5.1.G1", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Students can select and use the target grammatical elements of the current content about “school life with people, places and rules at school; school clubs; countries; national days and celebrations” accurately, authentically, spontaneously, and naturally and use it appropriately and effectively when communicating with others." },
        { outcomeCode: "ENG.5.1.W3", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Students can organise a content for the assigned writing task on the current content “school life with people, places and rules at school; school clubs; countries; national days and celebrations” based on the model/example provided." },
        ]
      },
      {
        id: "senaryo_2",
        name: "Senaryo 2 (5 Soru)",
        description: "MEB ÖDSGM 2026-2027 1. Dönem 1. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 2 (5 Soru) formatı (Toplam 100 Puan).",
        totalQuestions: 5,
        distributions: [
        { outcomeCode: "ENG.5.1.R2", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "SCHOOL LIFE" },
        { outcomeCode: "ENG.5.1.R3", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Students can make meaning of / derive meaning from the current content about “school life with people, places and rules at school; school clubs; countries; national days and celebrations” by reading it carefully." },
        { outcomeCode: "ENG.5.1.V1", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Students can select and use the target vocabulary of the current content about “school life with people, places and rules at school; school clubs; countries; national days and celebrations” accurately, authentically, spontaneously, and naturally and use it appropriately and effectively when communicating with others." },
        { outcomeCode: "ENG.5.1.G1", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Students can select and use the target grammatical elements of the current content about “school life with people, places and rules at school; school clubs; countries; national days and celebrations” accurately, authentically, spontaneously, and naturally and use it appropriately and effectively when communicating with others." },
        { outcomeCode: "ENG.5.1.W4", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Students can individually construct/form content for the assigned writing task on the current content “school life with people, places and rules at school; school clubs; countries; national days and celebrations”." },
        ]
      },
      {
        id: "senaryo_3",
        name: "Senaryo 3 (6 Soru)",
        description: "MEB ÖDSGM 2026-2027 1. Dönem 1. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 3 (6 Soru) formatı (Toplam 100 Puan).",
        totalQuestions: 6,
        distributions: [
        { outcomeCode: "ENG.5.1.R2", questionCount: 2, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "SCHOOL LIFE" },
        { outcomeCode: "ENG.5.1.R3", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Students can make meaning of / derive meaning from the current content about “school life with people, places and rules at school; school clubs; countries; national days and celebrations” by reading it carefully." },
        { outcomeCode: "ENG.5.1.V1", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Students can select and use the target vocabulary of the current content about “school life with people, places and rules at school; school clubs; countries; national days and celebrations” accurately, authentically, spontaneously, and naturally and use it appropriately and effectively when communicating with others." },
        { outcomeCode: "ENG.5.1.G1", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Students can select and use the target grammatical elements of the current content about “school life with people, places and rules at school; school clubs; countries; national days and celebrations” accurately, authentically, spontaneously, and naturally and use it appropriately and effectively when communicating with others." },
        { outcomeCode: "ENG.5.1.W3", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Students can organise a content for the assigned writing task on the current content “school life with people, places and rules at school; school clubs; countries; national days and celebrations” based on the model/example provided." },
        ]
      },
      {
        id: "senaryo_4",
        name: "Senaryo 4 (7 Soru)",
        description: "MEB ÖDSGM 2026-2027 1. Dönem 1. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 4 (7 Soru) formatı (Toplam 100 Puan).",
        totalQuestions: 7,
        distributions: [
        { outcomeCode: "ENG.5.1.R2", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "SCHOOL LIFE" },
        { outcomeCode: "ENG.5.1.R3", questionCount: 2, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Students can make meaning of / derive meaning from the current content about “school life with people, places and rules at school; school clubs; countries; national days and celebrations” by reading it carefully." },
        { outcomeCode: "ENG.5.1.V1", questionCount: 2, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Students can select and use the target vocabulary of the current content about “school life with people, places and rules at school; school clubs; countries; national days and celebrations” accurately, authentically, spontaneously, and naturally and use it appropriately and effectively when communicating with others." },
        { outcomeCode: "ENG.5.1.G1", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Students can select and use the target grammatical elements of the current content about “school life with people, places and rules at school; school clubs; countries; national days and celebrations” accurately, authentically, spontaneously, and naturally and use it appropriately and effectively when communicating with others." },
        { outcomeCode: "ENG.5.1.W4", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Students can individually construct/form content for the assigned writing task on the current content “school life with people, places and rules at school; school clubs; countries; national days and celebrations”." },
        ]
      },
      {
        id: "senaryo_5",
        name: "Senaryo 5 (8 Soru)",
        description: "MEB ÖDSGM 2026-2027 1. Dönem 1. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 5 (8 Soru) formatı (Toplam 100 Puan).",
        totalQuestions: 8,
        distributions: [
        { outcomeCode: "ENG.5.1.R2", questionCount: 2, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "SCHOOL LIFE" },
        { outcomeCode: "ENG.5.1.R3", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Students can make meaning of / derive meaning from the current content about “school life with people, places and rules at school; school clubs; countries; national days and celebrations” by reading it carefully." },
        { outcomeCode: "ENG.5.1.V1", questionCount: 2, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Students can select and use the target vocabulary of the current content about “school life with people, places and rules at school; school clubs; countries; national days and celebrations” accurately, authentically, spontaneously, and naturally and use it appropriately and effectively when communicating with others." },
        { outcomeCode: "ENG.5.1.G1", questionCount: 2, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Students can select and use the target grammatical elements of the current content about “school life with people, places and rules at school; school clubs; countries; national days and celebrations” accurately, authentically, spontaneously, and naturally and use it appropriately and effectively when communicating with others." },
        { outcomeCode: "ENG.5.1.W4", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Students can individually construct/form content for the assigned writing task on the current content “school life with people, places and rules at school; school clubs; countries; national days and celebrations”." },
        ]
      },
    ],
  },
  6: {
    turkce: [
      {
        id: "senaryo_1",
        name: "Senaryo 1 (6 Soru)",
        description: "MEB ÖDSGM 2026-2027 1. Dönem 1. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 1 (6 Soru) formatı (Toplam 100 Puan).",
        totalQuestions: 6,
        distributions: [
        { outcomeCode: "T.O.6.5", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Metinde geçen anlamını bilmediği söz varlığı unsurlarının anlamını tahmin edebilme" },
        { outcomeCode: "T.O.6.6", questionCount: 2, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Metnin yüzey anlamını belirleyebilme" },
        { outcomeCode: "T.O.6.21", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Metinden hareketle söz varlığını geliştirmeye yönelik çözümleme yapabilme" },
        { outcomeCode: "T.Y.6.18", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Yazısını zenginleştirecek biçimde söz varlığını kullanabilme" },
        { outcomeCode: "T.Y.6.21", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Yazım kuralları ve noktalama işaretlerini uygulayabilme" },
        ]
      },
      {
        id: "senaryo_2",
        name: "Senaryo 2 (6 Soru)",
        description: "MEB ÖDSGM 2026-2027 1. Dönem 1. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 2 (6 Soru) formatı (Toplam 100 Puan).",
        totalQuestions: 6,
        distributions: [
        { outcomeCode: "T.O.6.6", questionCount: 2, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Metnin yüzey anlamını belirleyebilme" },
        { outcomeCode: "T.O.6.16", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Bilgilendirici metinde anahtar kelimeleri belirlemeye yönelik çözümleme yapabilme" },
        { outcomeCode: "T.O.6.21", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Metinden hareketle söz varlığını geliştirmeye yönelik çözümleme yapabilme" },
        { outcomeCode: "T.Y.6.3", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Yazısında içerik ve yapıya yönelik seçimlerini yönetebilme" },
        { outcomeCode: "T.Y.6.21", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Yazım kuralları ve noktalama işaretlerini uygulayabilme" },
        ]
      },
      {
        id: "senaryo_3",
        name: "Senaryo 3 (6 Soru)",
        description: "MEB ÖDSGM 2026-2027 1. Dönem 1. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 3 (6 Soru) formatı (Toplam 100 Puan).",
        totalQuestions: 6,
        distributions: [
        { outcomeCode: "T.O.6.5", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Metinde geçen anlamını bilmediği söz varlığı unsurlarının anlamını tahmin edebilme" },
        { outcomeCode: "T.O.6.6", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Metnin yüzey anlamını belirleyebilme" },
        { outcomeCode: "T.O.6.16", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Bilgilendirici metinde anahtar kelimeleri belirlemeye yönelik çözümleme yapabilme" },
        { outcomeCode: "T.O.6.21", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Metinden hareketle söz varlığını geliştirmeye yönelik çözümleme yapabilme" },
        { outcomeCode: "T.Y.6.18", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Yazısını zenginleştirecek biçimde söz varlığını kullanabilme" },
        { outcomeCode: "T.Y.6.21", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Yazım kuralları ve noktalama işaretlerini uygulayabilme" },
        ]
      },
      {
        id: "senaryo_4",
        name: "Senaryo 4 (6 Soru)",
        description: "MEB ÖDSGM 2026-2027 1. Dönem 1. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 4 (6 Soru) formatı (Toplam 100 Puan).",
        totalQuestions: 6,
        distributions: [
        { outcomeCode: "T.O.6.6", questionCount: 2, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Metnin yüzey anlamını belirleyebilme" },
        { outcomeCode: "T.O.6.21", questionCount: 2, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Metinden hareketle söz varlığını geliştirmeye yönelik çözümleme yapabilme" },
        { outcomeCode: "T.Y.6.3", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Yazısında içerik ve yapıya yönelik seçimlerini yönetebilme" },
        { outcomeCode: "T.Y.6.21", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Yazım kuralları ve noktalama işaretlerini uygulayabilme" },
        ]
      },
      {
        id: "senaryo_5",
        name: "Senaryo 5 (7 Soru)",
        description: "MEB ÖDSGM 2026-2027 1. Dönem 1. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 5 (7 Soru) formatı (Toplam 100 Puan).",
        totalQuestions: 7,
        distributions: [
        { outcomeCode: "T.O.6.6", questionCount: 2, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Metnin yüzey anlamını belirleyebilme" },
        { outcomeCode: "T.O.6.16", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Bilgilendirici metinde anahtar kelimeleri belirlemeye yönelik çözümleme yapabilme" },
        { outcomeCode: "T.O.6.21", questionCount: 2, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Metinden hareketle söz varlığını geliştirmeye yönelik çözümleme yapabilme" },
        { outcomeCode: "T.Y.6.3", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Yazısında içerik ve yapıya yönelik seçimlerini yönetebilme" },
        { outcomeCode: "T.Y.6.21", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Yazım kuralları ve noktalama işaretlerini uygulayabilme" },
        ]
      },
      {
        id: "senaryo_6",
        name: "Senaryo 6 (7 Soru)",
        description: "MEB ÖDSGM 2026-2027 1. Dönem 1. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 6 (7 Soru) formatı (Toplam 100 Puan).",
        totalQuestions: 7,
        distributions: [
        { outcomeCode: "T.O.6.5", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Metinde geçen anlamını bilmediği söz varlığı unsurlarının anlamını tahmin edebilme" },
        { outcomeCode: "T.O.6.6", questionCount: 2, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Metnin yüzey anlamını belirleyebilme" },
        { outcomeCode: "T.O.6.16", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Bilgilendirici metinde anahtar kelimeleri belirlemeye yönelik çözümleme yapabilme" },
        { outcomeCode: "T.O.6.21", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Metinden hareketle söz varlığını geliştirmeye yönelik çözümleme yapabilme" },
        { outcomeCode: "T.Y.6.18", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Yazısını zenginleştirecek biçimde söz varlığını kullanabilme" },
        { outcomeCode: "T.Y.6.21", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Yazım kuralları ve noktalama işaretlerini uygulayabilme" },
        ]
      },
    ],
    matematik: [
      {
        id: "senaryo_1",
        name: "Senaryo 1 (Ülke Geneli Formatı - 6 Soru)",
        description: "MEB ÖDSGM 2026-2027 1. Dönem 1. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 1 (Ülke Geneli Formatı - 6 Soru) formatı (Toplam 100 Puan).",
        totalQuestions: 6,
        distributions: [
        { outcomeCode: "MAT.6.1.1", questionCount: 1, cognitiveLevel: "Karmaşık Bilişsel Süreçler", notes: "Bir Doğal Sayının Çarpanları ve Katları" },
        { outcomeCode: "MAT.6.1.2", questionCount: 2, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Bölünebilme Kriterleri" },
        { outcomeCode: "MAT.6.1.3", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Asal Sayılar ve Asal Çarpanlar" },
        { outcomeCode: "MAT.6.1.4", questionCount: 2, cognitiveLevel: "Karmaşık Bilişsel Süreçler", notes: "Bir Doğal Sayının Çarpanları ve Katları" },
        ]
      },
      {
        id: "senaryo_2",
        name: "Senaryo 2 (Beceri ve Analiz - 5 Soru)",
        description: "MEB ÖDSGM 2026-2027 1. Dönem 1. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 2 (Beceri ve Analiz - 5 Soru) formatı (Toplam 100 Puan).",
        totalQuestions: 5,
        distributions: [
        { outcomeCode: "MAT.6.1.1", questionCount: 1, cognitiveLevel: "Karmaşık Bilişsel Süreçler", notes: "Bir Doğal Sayının Çarpanları ve Katları" },
        { outcomeCode: "MAT.6.1.2", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Bölünebilme Kriterleri" },
        { outcomeCode: "MAT.6.1.3", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Asal Sayılar ve Asal Çarpanlar" },
        { outcomeCode: "MAT.6.1.4", questionCount: 2, cognitiveLevel: "Karmaşık Bilişsel Süreçler", notes: "Bir Doğal Sayının Çarpanları ve Katları" },
        ]
      },
      {
        id: "senaryo_3",
        name: "Senaryo 3 (Kapsamlı Senaryo - 7 Soru)",
        description: "MEB ÖDSGM 2026-2027 1. Dönem 1. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 3 (Kapsamlı Senaryo - 7 Soru) formatı (Toplam 100 Puan).",
        totalQuestions: 7,
        distributions: [
        { outcomeCode: "MAT.6.1.1", questionCount: 2, cognitiveLevel: "Karmaşık Bilişsel Süreçler", notes: "Bir Doğal Sayının Çarpanları ve Katları" },
        { outcomeCode: "MAT.6.1.2", questionCount: 2, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Bölünebilme Kriterleri" },
        { outcomeCode: "MAT.6.1.3", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Asal Sayılar ve Asal Çarpanlar" },
        { outcomeCode: "MAT.6.1.4", questionCount: 2, cognitiveLevel: "Karmaşık Bilişsel Süreçler", notes: "Bir Doğal Sayının Çarpanları ve Katları" },
        ]
      },
    ],
    fen_bilimleri: [
      {
        id: "senaryo_1",
        name: "Senaryo 1 (8 Soru)",
        description: "MEB ÖDSGM 2026-2027 1. Dönem 1. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 1 (8 Soru) formatı (Toplam 100 Puan).",
        totalQuestions: 8,
        distributions: [
        { outcomeCode: "FB.6.1.1", questionCount: 2, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Güneş Sistemi" },
        { outcomeCode: "FB.6.1.3", questionCount: 1, cognitiveLevel: "Karmaşık Bilişsel Süreçler", notes: "Güneş ve Ay Tutulmaları" },
        { outcomeCode: "FB.6.2.1", questionCount: 2, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Bileşke Kuvvet" },
        { outcomeCode: "FB.6.2.2", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Dengelenmiş ve dengelenmemiş kuvvetlerin etkisi altındaki bir cismin hareketine yönelik deney yapabilme" },
        { outcomeCode: "FB.6.2.3", questionCount: 1, cognitiveLevel: "Karmaşık Bilişsel Süreçler", notes: "Sabit Süratli ve Sabit Hızlı Hareket" },
        { outcomeCode: "FB.6.3.1", questionCount: 1, cognitiveLevel: "Karmaşık Bilişsel Süreçler", notes: "Bitki ve Hayvanlarda Üreme, Büyüme ve Gelişme" },
        ]
      },
      {
        id: "senaryo_2",
        name: "Senaryo 2 (8 Soru)",
        description: "MEB ÖDSGM 2026-2027 1. Dönem 1. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 2 (8 Soru) formatı (Toplam 100 Puan).",
        totalQuestions: 8,
        distributions: [
        { outcomeCode: "FB.6.1.1", questionCount: 2, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Güneş Sistemi" },
        { outcomeCode: "FB.6.1.3", questionCount: 2, cognitiveLevel: "Karmaşık Bilişsel Süreçler", notes: "Güneş ve Ay Tutulmaları" },
        { outcomeCode: "FB.6.2.1", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Bileşke Kuvvet" },
        { outcomeCode: "FB.6.2.3", questionCount: 2, cognitiveLevel: "Karmaşık Bilişsel Süreçler", notes: "Sabit Süratli ve Sabit Hızlı Hareket" },
        { outcomeCode: "FB.6.3.1", questionCount: 1, cognitiveLevel: "Karmaşık Bilişsel Süreçler", notes: "Bitki ve Hayvanlarda Üreme, Büyüme ve Gelişme" },
        ]
      },
      {
        id: "senaryo_3",
        name: "Senaryo 3 (7 Soru)",
        description: "MEB ÖDSGM 2026-2027 1. Dönem 1. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 3 (7 Soru) formatı (Toplam 100 Puan).",
        totalQuestions: 7,
        distributions: [
        { outcomeCode: "FB.6.1.1", questionCount: 2, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Güneş Sistemi" },
        { outcomeCode: "FB.6.1.3", questionCount: 1, cognitiveLevel: "Karmaşık Bilişsel Süreçler", notes: "Güneş ve Ay Tutulmaları" },
        { outcomeCode: "FB.6.2.1", questionCount: 2, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Bileşke Kuvvet" },
        { outcomeCode: "FB.6.2.3", questionCount: 2, cognitiveLevel: "Karmaşık Bilişsel Süreçler", notes: "Sabit Süratli ve Sabit Hızlı Hareket" },
        ]
      },
      {
        id: "senaryo_4",
        name: "Senaryo 4 (6 Soru)",
        description: "MEB ÖDSGM 2026-2027 1. Dönem 1. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 4 (6 Soru) formatı (Toplam 100 Puan).",
        totalQuestions: 6,
        distributions: [
        { outcomeCode: "FB.6.1.1", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Güneş Sistemi" },
        { outcomeCode: "FB.6.1.3", questionCount: 1, cognitiveLevel: "Karmaşık Bilişsel Süreçler", notes: "Güneş ve Ay Tutulmaları" },
        { outcomeCode: "FB.6.2.1", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Bileşke Kuvvet" },
        { outcomeCode: "FB.6.2.2", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Dengelenmiş ve dengelenmemiş kuvvetlerin etkisi altındaki bir cismin hareketine yönelik deney yapabilme" },
        { outcomeCode: "FB.6.2.3", questionCount: 2, cognitiveLevel: "Karmaşık Bilişsel Süreçler", notes: "Sabit Süratli ve Sabit Hızlı Hareket" },
        ]
      },
      {
        id: "senaryo_5",
        name: "Senaryo 5 (7 Soru)",
        description: "MEB ÖDSGM 2026-2027 1. Dönem 1. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 5 (7 Soru) formatı (Toplam 100 Puan).",
        totalQuestions: 7,
        distributions: [
        { outcomeCode: "FB.6.1.1", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Güneş Sistemi" },
        { outcomeCode: "FB.6.1.3", questionCount: 2, cognitiveLevel: "Karmaşık Bilişsel Süreçler", notes: "Güneş ve Ay Tutulmaları" },
        { outcomeCode: "FB.6.2.1", questionCount: 2, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Bileşke Kuvvet" },
        { outcomeCode: "FB.6.2.2", questionCount: 2, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Dengelenmiş ve dengelenmemiş kuvvetlerin etkisi altındaki bir cismin hareketine yönelik deney yapabilme" },
        ]
      },
      {
        id: "senaryo_6",
        name: "Senaryo 6 (9 Soru)",
        description: "MEB ÖDSGM 2026-2027 1. Dönem 1. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 6 (9 Soru) formatı (Toplam 100 Puan).",
        totalQuestions: 9,
        distributions: [
        { outcomeCode: "FB.6.1.1", questionCount: 2, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Güneş Sistemi" },
        { outcomeCode: "FB.6.1.3", questionCount: 2, cognitiveLevel: "Karmaşık Bilişsel Süreçler", notes: "Güneş ve Ay Tutulmaları" },
        { outcomeCode: "FB.6.2.1", questionCount: 2, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Bileşke Kuvvet" },
        { outcomeCode: "FB.6.2.2", questionCount: 2, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Dengelenmiş ve dengelenmemiş kuvvetlerin etkisi altındaki bir cismin hareketine yönelik deney yapabilme" },
        { outcomeCode: "FB.6.2.3", questionCount: 1, cognitiveLevel: "Karmaşık Bilişsel Süreçler", notes: "Sabit Süratli ve Sabit Hızlı Hareket" },
        ]
      },
    ],
    sosyal_bilgiler: [
      {
        id: "senaryo_1",
        name: "Senaryo 1 (6 Soru)",
        description: "MEB ÖDSGM 2026-2027 1. Dönem 1. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 1 (6 Soru) formatı (Toplam 100 Puan).",
        totalQuestions: 6,
        distributions: [
        { outcomeCode: "SB.6.1.1", questionCount: 2, cognitiveLevel: "Karmaşık Bilişsel Süreçler", notes: "Zaman İçinde Değişen Gruplar ve Roller" },
        { outcomeCode: "SB.6.1.2", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Kültürel Bağlarımızın ve Millî Değerlerimizin Toplumsal Birlikteliğe Etkisi" },
        { outcomeCode: "SB.6.1.3", questionCount: 2, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Toplumsal Sorunlar ve Çözümler Önerileri" },
        { outcomeCode: "SB.6.2.1", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Küreselleşmenin İnsan ve Toplum Hayatına Etkisi" },
        ]
      },
      {
        id: "senaryo_2",
        name: "Senaryo 2 (8 Soru)",
        description: "MEB ÖDSGM 2026-2027 1. Dönem 1. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 2 (8 Soru) formatı (Toplam 100 Puan).",
        totalQuestions: 8,
        distributions: [
        { outcomeCode: "SB.6.1.1", questionCount: 2, cognitiveLevel: "Karmaşık Bilişsel Süreçler", notes: "Zaman İçinde Değişen Gruplar ve Roller" },
        { outcomeCode: "SB.6.1.2", questionCount: 2, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Kültürel Bağlarımızın ve Millî Değerlerimizin Toplumsal Birlikteliğe Etkisi" },
        { outcomeCode: "SB.6.1.3", questionCount: 3, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Toplumsal Sorunlar ve Çözümler Önerileri" },
        { outcomeCode: "SB.6.2.1", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Küreselleşmenin İnsan ve Toplum Hayatına Etkisi" },
        ]
      },
      {
        id: "senaryo_3",
        name: "Senaryo 3 (6 Soru)",
        description: "MEB ÖDSGM 2026-2027 1. Dönem 1. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 3 (6 Soru) formatı (Toplam 100 Puan).",
        totalQuestions: 6,
        distributions: [
        { outcomeCode: "SB.6.1.1", questionCount: 2, cognitiveLevel: "Karmaşık Bilişsel Süreçler", notes: "Zaman İçinde Değişen Gruplar ve Roller" },
        { outcomeCode: "SB.6.1.2", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Kültürel Bağlarımızın ve Millî Değerlerimizin Toplumsal Birlikteliğe Etkisi" },
        { outcomeCode: "SB.6.1.3", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Toplumsal Sorunlar ve Çözümler Önerileri" },
        { outcomeCode: "SB.6.2.1", questionCount: 2, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Küreselleşmenin İnsan ve Toplum Hayatına Etkisi" },
        ]
      },
      {
        id: "senaryo_4",
        name: "Senaryo 4 (6 Soru)",
        description: "MEB ÖDSGM 2026-2027 1. Dönem 1. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 4 (6 Soru) formatı (Toplam 100 Puan).",
        totalQuestions: 6,
        distributions: [
        { outcomeCode: "SB.6.1.1", questionCount: 1, cognitiveLevel: "Karmaşık Bilişsel Süreçler", notes: "Zaman İçinde Değişen Gruplar ve Roller" },
        { outcomeCode: "SB.6.1.2", questionCount: 2, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Kültürel Bağlarımızın ve Millî Değerlerimizin Toplumsal Birlikteliğe Etkisi" },
        { outcomeCode: "SB.6.1.3", questionCount: 2, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Toplumsal Sorunlar ve Çözümler Önerileri" },
        { outcomeCode: "SB.6.2.1", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Küreselleşmenin İnsan ve Toplum Hayatına Etkisi" },
        ]
      },
      {
        id: "senaryo_5",
        name: "Senaryo 5 (7 Soru)",
        description: "MEB ÖDSGM 2026-2027 1. Dönem 1. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 5 (7 Soru) formatı (Toplam 100 Puan).",
        totalQuestions: 7,
        distributions: [
        { outcomeCode: "SB.6.1.1", questionCount: 2, cognitiveLevel: "Karmaşık Bilişsel Süreçler", notes: "Zaman İçinde Değişen Gruplar ve Roller" },
        { outcomeCode: "SB.6.1.2", questionCount: 2, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Kültürel Bağlarımızın ve Millî Değerlerimizin Toplumsal Birlikteliğe Etkisi" },
        { outcomeCode: "SB.6.1.3", questionCount: 3, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Toplumsal Sorunlar ve Çözümler Önerileri" },
        ]
      },
    ],
    din_kulturu: [
      {
        id: "senaryo_1",
        name: "Senaryo 1 (7 Soru)",
        description: "MEB ÖDSGM 2026-2027 1. Dönem 1. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 1 (7 Soru) formatı (Toplam 100 Puan).",
        totalQuestions: 7,
        distributions: [
        { outcomeCode: "DKAB.6.1.2", questionCount: 3, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Peygamberlerin İlettiği Mesaj: Vahiy" },
        { outcomeCode: "DKAB.6.1.3", questionCount: 2, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "İlahi Kitaplar" },
        { outcomeCode: "DKAB.6.1.4", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Bir Sure Öğreniyorum: Felak Suresi" },
        { outcomeCode: "DKAB.6.2.1", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Oruç ve Kur’an Ayı Ramazan" },
        ]
      },
      {
        id: "senaryo_2",
        name: "Senaryo 2 (6 Soru)",
        description: "MEB ÖDSGM 2026-2027 1. Dönem 1. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 2 (6 Soru) formatı (Toplam 100 Puan).",
        totalQuestions: 6,
        distributions: [
        { outcomeCode: "DKAB.6.1.2", questionCount: 3, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Peygamberlerin İlettiği Mesaj: Vahiy" },
        { outcomeCode: "DKAB.6.1.3", questionCount: 2, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "İlahi Kitaplar" },
        { outcomeCode: "DKAB.6.1.4", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Bir Sure Öğreniyorum: Felak Suresi" },
        ]
      },
      {
        id: "senaryo_3",
        name: "Senaryo 3 (5 Soru)",
        description: "MEB ÖDSGM 2026-2027 1. Dönem 1. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 3 (5 Soru) formatı (Toplam 100 Puan).",
        totalQuestions: 5,
        distributions: [
        { outcomeCode: "DKAB.6.1.2", questionCount: 2, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Peygamberlerin İlettiği Mesaj: Vahiy" },
        { outcomeCode: "DKAB.6.1.3", questionCount: 2, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "İlahi Kitaplar" },
        { outcomeCode: "DKAB.6.1.4", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Bir Sure Öğreniyorum: Felak Suresi" },
        ]
      },
      {
        id: "senaryo_4",
        name: "Senaryo 4 (6 Soru)",
        description: "MEB ÖDSGM 2026-2027 1. Dönem 1. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 4 (6 Soru) formatı (Toplam 100 Puan).",
        totalQuestions: 6,
        distributions: [
        { outcomeCode: "DKAB.6.1.2", questionCount: 3, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Peygamberlerin İlettiği Mesaj: Vahiy" },
        { outcomeCode: "DKAB.6.1.3", questionCount: 2, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "İlahi Kitaplar" },
        { outcomeCode: "DKAB.6.2.1", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Oruç ve Kur’an Ayı Ramazan" },
        ]
      },
      {
        id: "senaryo_5",
        name: "Senaryo 5 (6 Soru)",
        description: "MEB ÖDSGM 2026-2027 1. Dönem 1. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 5 (6 Soru) formatı (Toplam 100 Puan).",
        totalQuestions: 6,
        distributions: [
        { outcomeCode: "DKAB.6.1.2", questionCount: 3, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Peygamberlerin İlettiği Mesaj: Vahiy" },
        { outcomeCode: "DKAB.6.1.3", questionCount: 3, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "İlahi Kitaplar" },
        ]
      },
    ],
    ingilizce: [
      {
        id: "senaryo_1",
        name: "Senaryo 1 (5 Soru)",
        description: "MEB ÖDSGM 2026-2027 1. Dönem 1. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 1 (5 Soru) formatı (Toplam 100 Puan).",
        totalQuestions: 5,
        distributions: [
        { outcomeCode: "ENG.6.1.R2", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "SCHOOL LIFE" },
        { outcomeCode: "ENG.6.1.R3", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Students can make meaning of / derive meaning from the current content about “school life with roles, and responsibilities at school; school routines; national days and celebrations” by reading it carefully." },
        { outcomeCode: "ENG.6.1.V1", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Students can select and use the target vocabulary of the current content about “school life with roles, and responsibilities at school; school routines; national days and celebrations” accurately, authentically, spontaneously, and naturally and use it appropriately and effectively when communicating with others." },
        { outcomeCode: "ENG.6.1.G1", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Students can select and use the target grammatical elements of the current content about “school life with roles, and responsibilities at school; school routines; national days and celebrations” accurately, authentically, spontaneously, and naturally and use it appropriately and effectively when communicating with others." },
        { outcomeCode: "ENG.6.1.W3", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Students can organise a content for the assigned writing task on the current content “school life with roles, and responsibilities at school; school routines; national days and celebrations” based on the model/example provided." },
        ]
      },
      {
        id: "senaryo_2",
        name: "Senaryo 2 (5 Soru)",
        description: "MEB ÖDSGM 2026-2027 1. Dönem 1. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 2 (5 Soru) formatı (Toplam 100 Puan).",
        totalQuestions: 5,
        distributions: [
        { outcomeCode: "ENG.6.1.R2", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "SCHOOL LIFE" },
        { outcomeCode: "ENG.6.1.R3", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Students can make meaning of / derive meaning from the current content about “school life with roles, and responsibilities at school; school routines; national days and celebrations” by reading it carefully." },
        { outcomeCode: "ENG.6.1.V1", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Students can select and use the target vocabulary of the current content about “school life with roles, and responsibilities at school; school routines; national days and celebrations” accurately, authentically, spontaneously, and naturally and use it appropriately and effectively when communicating with others." },
        { outcomeCode: "ENG.6.1.G1", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Students can select and use the target grammatical elements of the current content about “school life with roles, and responsibilities at school; school routines; national days and celebrations” accurately, authentically, spontaneously, and naturally and use it appropriately and effectively when communicating with others." },
        { outcomeCode: "ENG.6.1.W4", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Students can individually construct/form content for the assigned writing task on the current content “school life with roles, and responsibilities at school; school routines; national days and celebrations”." },
        ]
      },
      {
        id: "senaryo_3",
        name: "Senaryo 3 (6 Soru)",
        description: "MEB ÖDSGM 2026-2027 1. Dönem 1. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 3 (6 Soru) formatı (Toplam 100 Puan).",
        totalQuestions: 6,
        distributions: [
        { outcomeCode: "ENG.6.1.R2", questionCount: 2, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "SCHOOL LIFE" },
        { outcomeCode: "ENG.6.1.R3", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Students can make meaning of / derive meaning from the current content about “school life with roles, and responsibilities at school; school routines; national days and celebrations” by reading it carefully." },
        { outcomeCode: "ENG.6.1.V1", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Students can select and use the target vocabulary of the current content about “school life with roles, and responsibilities at school; school routines; national days and celebrations” accurately, authentically, spontaneously, and naturally and use it appropriately and effectively when communicating with others." },
        { outcomeCode: "ENG.6.1.G1", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Students can select and use the target grammatical elements of the current content about “school life with roles, and responsibilities at school; school routines; national days and celebrations” accurately, authentically, spontaneously, and naturally and use it appropriately and effectively when communicating with others." },
        { outcomeCode: "ENG.6.1.W3", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Students can organise a content for the assigned writing task on the current content “school life with roles, and responsibilities at school; school routines; national days and celebrations” based on the model/example provided." },
        ]
      },
      {
        id: "senaryo_4",
        name: "Senaryo 4 (7 Soru)",
        description: "MEB ÖDSGM 2026-2027 1. Dönem 1. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 4 (7 Soru) formatı (Toplam 100 Puan).",
        totalQuestions: 7,
        distributions: [
        { outcomeCode: "ENG.6.1.R2", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "SCHOOL LIFE" },
        { outcomeCode: "ENG.6.1.R3", questionCount: 2, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Students can make meaning of / derive meaning from the current content about “school life with roles, and responsibilities at school; school routines; national days and celebrations” by reading it carefully." },
        { outcomeCode: "ENG.6.1.V1", questionCount: 2, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Students can select and use the target vocabulary of the current content about “school life with roles, and responsibilities at school; school routines; national days and celebrations” accurately, authentically, spontaneously, and naturally and use it appropriately and effectively when communicating with others." },
        { outcomeCode: "ENG.6.1.G1", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Students can select and use the target grammatical elements of the current content about “school life with roles, and responsibilities at school; school routines; national days and celebrations” accurately, authentically, spontaneously, and naturally and use it appropriately and effectively when communicating with others." },
        { outcomeCode: "ENG.6.1.W4", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Students can individually construct/form content for the assigned writing task on the current content “school life with roles, and responsibilities at school; school routines; national days and celebrations”." },
        ]
      },
      {
        id: "senaryo_5",
        name: "Senaryo 5 (8 Soru)",
        description: "MEB ÖDSGM 2026-2027 1. Dönem 1. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 5 (8 Soru) formatı (Toplam 100 Puan).",
        totalQuestions: 8,
        distributions: [
        { outcomeCode: "ENG.6.1.R2", questionCount: 2, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "SCHOOL LIFE" },
        { outcomeCode: "ENG.6.1.R3", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Students can make meaning of / derive meaning from the current content about “school life with roles, and responsibilities at school; school routines; national days and celebrations” by reading it carefully." },
        { outcomeCode: "ENG.6.1.V1", questionCount: 2, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Students can select and use the target vocabulary of the current content about “school life with roles, and responsibilities at school; school routines; national days and celebrations” accurately, authentically, spontaneously, and naturally and use it appropriately and effectively when communicating with others." },
        { outcomeCode: "ENG.6.1.G1", questionCount: 2, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Students can select and use the target grammatical elements of the current content about “school life with roles, and responsibilities at school; school routines; national days and celebrations” accurately, authentically, spontaneously, and naturally and use it appropriately and effectively when communicating with others." },
        { outcomeCode: "ENG.6.1.W4", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Students can individually construct/form content for the assigned writing task on the current content “school life with roles, and responsibilities at school; school routines; national days and celebrations”." },
        ]
      },
    ],
  },
  7: {
    turkce: [
      {
        id: "senaryo_1",
        name: "Senaryo 1 (7 Soru)",
        description: "MEB ÖDSGM 2026-2027 1. Dönem 1. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 1 (7 Soru) formatı (Toplam 100 Puan).",
        totalQuestions: 7,
        distributions: [
        { outcomeCode: "T.O.7.4", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Metinde geçen anlamını bilmediği söz varlığı unsurlarının anlamını tahmin edebilme" },
        { outcomeCode: "T.O.7.5", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Metnin yüzey anlamını belirleyebilme" },
        { outcomeCode: "T.O.7.8", questionCount: 1, cognitiveLevel: "Karmaşık Bilişsel Süreçler", notes: "Metnin derin anlamını belirlemeye yönelik üst düzey çıkarımlar yapabilme" },
        { outcomeCode: "T.O.7.21", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Metinden hareketle söz varlığını geliştirmeye yönelik çözümleme yapabilme" },
        { outcomeCode: "T.Y.7.3", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Yazısında içerik ve yapıya yönelik seçimlerini yönetebilme" },
        { outcomeCode: "T.Y.7.18", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Yazısını zenginleştirecek biçimde söz varlığını kullanabilme" },
        { outcomeCode: "T.Y.7.21", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Yazım kuralları ve noktalama işaretlerini uygulayabilme" },
        ]
      },
      {
        id: "senaryo_2",
        name: "Senaryo 2 (6 Soru)",
        description: "MEB ÖDSGM 2026-2027 1. Dönem 1. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 2 (6 Soru) formatı (Toplam 100 Puan).",
        totalQuestions: 6,
        distributions: [
        { outcomeCode: "T.O.7.5", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Metnin yüzey anlamını belirleyebilme" },
        { outcomeCode: "T.O.7.7", questionCount: 1, cognitiveLevel: "Karmaşık Bilişsel Süreçler", notes: "Metnin derin anlamını belirlemeye yönelik basit çıkarımlar yapabilme" },
        { outcomeCode: "T.O.7.14", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Bilgilendirici metinlerde metin yapılarından hareketle önemli bilgileri belirlemeye yönelik çözümleme yapabilme" },
        { outcomeCode: "T.O.7.15", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Bilgilendirici metinde anahtar kelimeleri belirlemeye yönelik çözümleme yapabilme" },
        { outcomeCode: "T.Y.7.3", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Yazısında içerik ve yapıya yönelik seçimlerini yönetebilme" },
        { outcomeCode: "T.Y.7.21", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Yazım kuralları ve noktalama işaretlerini uygulayabilme" },
        ]
      },
      {
        id: "senaryo_3",
        name: "Senaryo 3 (7 Soru)",
        description: "MEB ÖDSGM 2026-2027 1. Dönem 1. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 3 (7 Soru) formatı (Toplam 100 Puan).",
        totalQuestions: 7,
        distributions: [
        { outcomeCode: "T.O.7.4", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Metinde geçen anlamını bilmediği söz varlığı unsurlarının anlamını tahmin edebilme" },
        { outcomeCode: "T.O.7.5", questionCount: 2, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Metnin yüzey anlamını belirleyebilme" },
        { outcomeCode: "T.O.7.7", questionCount: 1, cognitiveLevel: "Karmaşık Bilişsel Süreçler", notes: "Metnin derin anlamını belirlemeye yönelik basit çıkarımlar yapabilme" },
        { outcomeCode: "T.O.7.21", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Metinden hareketle söz varlığını geliştirmeye yönelik çözümleme yapabilme" },
        { outcomeCode: "T.Y.7.3", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Yazısında içerik ve yapıya yönelik seçimlerini yönetebilme" },
        { outcomeCode: "T.Y.7.21", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Yazım kuralları ve noktalama işaretlerini uygulayabilme" },
        ]
      },
      {
        id: "senaryo_4",
        name: "Senaryo 4 (7 Soru)",
        description: "MEB ÖDSGM 2026-2027 1. Dönem 1. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 4 (7 Soru) formatı (Toplam 100 Puan).",
        totalQuestions: 7,
        distributions: [
        { outcomeCode: "T.O.7.4", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Metinde geçen anlamını bilmediği söz varlığı unsurlarının anlamını tahmin edebilme" },
        { outcomeCode: "T.O.7.5", questionCount: 2, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Metnin yüzey anlamını belirleyebilme" },
        { outcomeCode: "T.O.7.7", questionCount: 1, cognitiveLevel: "Karmaşık Bilişsel Süreçler", notes: "Metnin derin anlamını belirlemeye yönelik basit çıkarımlar yapabilme" },
        { outcomeCode: "T.O.7.21", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Metinden hareketle söz varlığını geliştirmeye yönelik çözümleme yapabilme" },
        { outcomeCode: "T.Y.7.18", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Yazısını zenginleştirecek biçimde söz varlığını kullanabilme" },
        { outcomeCode: "T.Y.7.21", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Yazım kuralları ve noktalama işaretlerini uygulayabilme" },
        ]
      },
      {
        id: "senaryo_5",
        name: "Senaryo 5 (6 Soru)",
        description: "MEB ÖDSGM 2026-2027 1. Dönem 1. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 5 (6 Soru) formatı (Toplam 100 Puan).",
        totalQuestions: 6,
        distributions: [
        { outcomeCode: "T.O.7.4", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Metinde geçen anlamını bilmediği söz varlığı unsurlarının anlamını tahmin edebilme" },
        { outcomeCode: "T.O.7.5", questionCount: 2, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Metnin yüzey anlamını belirleyebilme" },
        { outcomeCode: "T.O.7.21", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Metinden hareketle söz varlığını geliştirmeye yönelik çözümleme yapabilme" },
        { outcomeCode: "T.Y.7.3", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Yazısında içerik ve yapıya yönelik seçimlerini yönetebilme" },
        { outcomeCode: "T.Y.7.21", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Yazım kuralları ve noktalama işaretlerini uygulayabilme" },
        ]
      },
      {
        id: "senaryo_6",
        name: "Senaryo 6 (6 Soru)",
        description: "MEB ÖDSGM 2026-2027 1. Dönem 1. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 6 (6 Soru) formatı (Toplam 100 Puan).",
        totalQuestions: 6,
        distributions: [
        { outcomeCode: "T.O.7.4", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Metinde geçen anlamını bilmediği söz varlığı unsurlarının anlamını tahmin edebilme" },
        { outcomeCode: "T.O.7.5", questionCount: 2, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Metnin yüzey anlamını belirleyebilme" },
        { outcomeCode: "T.O.7.21", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Metinden hareketle söz varlığını geliştirmeye yönelik çözümleme yapabilme" },
        { outcomeCode: "T.Y.7.18", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Yazısını zenginleştirecek biçimde söz varlığını kullanabilme" },
        { outcomeCode: "T.Y.7.21", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Yazım kuralları ve noktalama işaretlerini uygulayabilme" },
        ]
      },
    ],
    matematik: [
      {
        id: "senaryo_1",
        name: "Senaryo 1 (7 Soru)",
        description: "MEB ÖDSGM 2026-2027 1. Dönem 1. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 1 (7 Soru) formatı (Toplam 100 Puan).",
        totalQuestions: 7,
        distributions: [
        { outcomeCode: "MAT.7.1.1", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Tam Sayılar\nRasyonel Sayılar ve Farklı Temsilleri" },
        { outcomeCode: "MAT.7.1.2", questionCount: 2, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Rasyonel Sayılar ve Farklı Temsilleri" },
        { outcomeCode: "MAT.7.1.3", questionCount: 2, cognitiveLevel: "Karmaşık Bilişsel Süreçler", notes: "Rasyonel sayıların karşılaştırma ve sıralama ilişkilerini yorumlayabilme" },
        { outcomeCode: "MAT.7.1.4", questionCount: 2, cognitiveLevel: "Karmaşık Bilişsel Süreçler", notes: "Rasyonel Sayılarla İşlemler ve Problem Çözme" },
        ]
      },
      {
        id: "senaryo_2",
        name: "Senaryo 2 (5 Soru)",
        description: "MEB ÖDSGM 2026-2027 1. Dönem 1. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 2 (5 Soru) formatı (Toplam 100 Puan).",
        totalQuestions: 5,
        distributions: [
        { outcomeCode: "MAT.7.1.1", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Tam Sayılar\nRasyonel Sayılar ve Farklı Temsilleri" },
        { outcomeCode: "MAT.7.1.2", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Rasyonel Sayılar ve Farklı Temsilleri" },
        { outcomeCode: "MAT.7.1.3", questionCount: 1, cognitiveLevel: "Karmaşık Bilişsel Süreçler", notes: "Rasyonel sayıların karşılaştırma ve sıralama ilişkilerini yorumlayabilme" },
        { outcomeCode: "MAT.7.1.4", questionCount: 2, cognitiveLevel: "Karmaşık Bilişsel Süreçler", notes: "Rasyonel Sayılarla İşlemler ve Problem Çözme" },
        ]
      },
      {
        id: "senaryo_3",
        name: "Senaryo 3 (7 Soru)",
        description: "MEB ÖDSGM 2026-2027 1. Dönem 1. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 3 (7 Soru) formatı (Toplam 100 Puan).",
        totalQuestions: 7,
        distributions: [
        { outcomeCode: "MAT.7.1.1", questionCount: 2, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Tam Sayılar\nRasyonel Sayılar ve Farklı Temsilleri" },
        { outcomeCode: "MAT.7.1.2", questionCount: 2, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Rasyonel Sayılar ve Farklı Temsilleri" },
        { outcomeCode: "MAT.7.1.3", questionCount: 2, cognitiveLevel: "Karmaşık Bilişsel Süreçler", notes: "Rasyonel sayıların karşılaştırma ve sıralama ilişkilerini yorumlayabilme" },
        { outcomeCode: "MAT.7.1.4", questionCount: 1, cognitiveLevel: "Karmaşık Bilişsel Süreçler", notes: "Rasyonel Sayılarla İşlemler ve Problem Çözme" },
        ]
      },
      {
        id: "senaryo_4",
        name: "Senaryo 4 (6 Soru)",
        description: "MEB ÖDSGM 2026-2027 1. Dönem 1. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 4 (6 Soru) formatı (Toplam 100 Puan).",
        totalQuestions: 6,
        distributions: [
        { outcomeCode: "MAT.7.1.1", questionCount: 2, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Tam Sayılar\nRasyonel Sayılar ve Farklı Temsilleri" },
        { outcomeCode: "MAT.7.1.2", questionCount: 2, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Rasyonel Sayılar ve Farklı Temsilleri" },
        { outcomeCode: "MAT.7.1.3", questionCount: 2, cognitiveLevel: "Karmaşık Bilişsel Süreçler", notes: "Rasyonel sayıların karşılaştırma ve sıralama ilişkilerini yorumlayabilme" },
        ]
      },
    ],
    fen_bilimleri: [
      {
        id: "senaryo_1",
        name: "Senaryo 1 (9 Soru)",
        description: "MEB ÖDSGM 2026-2027 1. Dönem 1. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 1 (9 Soru) formatı (Toplam 100 Puan).",
        totalQuestions: 9,
        distributions: [
        { outcomeCode: "FB.7.1.1", questionCount: 2, cognitiveLevel: "Karmaşık Bilişsel Süreçler", notes: "Türkiye ve Uzay Araştırmaları" },
        { outcomeCode: "FB.7.1.4", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Uzayda Neler Var?" },
        { outcomeCode: "FB.7.1.5", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Yıldız, galaksi ve evren kavramlarını açıklayarak yapılandırabilme" },
        { outcomeCode: "FB.7.2.1", questionCount: 3, cognitiveLevel: "Karmaşık Bilişsel Süreçler", notes: "Kuvvet, İş ve Enerji İlişkisi" },
        { outcomeCode: "FB.7.2.2", questionCount: 2, cognitiveLevel: "Karmaşık Bilişsel Süreçler", notes: "Enerji çeşitlerinden kinetik ve potansiyel enerjiyi karşılaştırabilme" },
        ]
      },
      {
        id: "senaryo_2",
        name: "Senaryo 2 (7 Soru)",
        description: "MEB ÖDSGM 2026-2027 1. Dönem 1. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 2 (7 Soru) formatı (Toplam 100 Puan).",
        totalQuestions: 7,
        distributions: [
        { outcomeCode: "FB.7.1.1", questionCount: 2, cognitiveLevel: "Karmaşık Bilişsel Süreçler", notes: "Türkiye ve Uzay Araştırmaları" },
        { outcomeCode: "FB.7.1.3", questionCount: 1, cognitiveLevel: "Karmaşık Bilişsel Süreçler", notes: "Uzay araştırmalarının yol açabileceği problemleri çözebilme" },
        { outcomeCode: "FB.7.1.5", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Yıldız, galaksi ve evren kavramlarını açıklayarak yapılandırabilme" },
        { outcomeCode: "FB.7.2.1", questionCount: 3, cognitiveLevel: "Karmaşık Bilişsel Süreçler", notes: "Kuvvet, İş ve Enerji İlişkisi" },
        ]
      },
      {
        id: "senaryo_3",
        name: "Senaryo 3 (8 Soru)",
        description: "MEB ÖDSGM 2026-2027 1. Dönem 1. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 3 (8 Soru) formatı (Toplam 100 Puan).",
        totalQuestions: 8,
        distributions: [
        { outcomeCode: "FB.7.1.1", questionCount: 2, cognitiveLevel: "Karmaşık Bilişsel Süreçler", notes: "Türkiye ve Uzay Araştırmaları" },
        { outcomeCode: "FB.7.1.3", questionCount: 1, cognitiveLevel: "Karmaşık Bilişsel Süreçler", notes: "Uzay araştırmalarının yol açabileceği problemleri çözebilme" },
        { outcomeCode: "FB.7.1.4", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Uzayda Neler Var?" },
        { outcomeCode: "FB.7.2.1", questionCount: 2, cognitiveLevel: "Karmaşık Bilişsel Süreçler", notes: "Kuvvet, İş ve Enerji İlişkisi" },
        { outcomeCode: "FB.7.2.2", questionCount: 2, cognitiveLevel: "Karmaşık Bilişsel Süreçler", notes: "Enerji çeşitlerinden kinetik ve potansiyel enerjiyi karşılaştırabilme" },
        ]
      },
      {
        id: "senaryo_4",
        name: "Senaryo 4 (6 Soru)",
        description: "MEB ÖDSGM 2026-2027 1. Dönem 1. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 4 (6 Soru) formatı (Toplam 100 Puan).",
        totalQuestions: 6,
        distributions: [
        { outcomeCode: "FB.7.1.3", questionCount: 1, cognitiveLevel: "Karmaşık Bilişsel Süreçler", notes: "Uzay araştırmalarının yol açabileceği problemleri çözebilme" },
        { outcomeCode: "FB.7.1.4", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Uzayda Neler Var?" },
        { outcomeCode: "FB.7.1.5", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Yıldız, galaksi ve evren kavramlarını açıklayarak yapılandırabilme" },
        { outcomeCode: "FB.7.2.1", questionCount: 2, cognitiveLevel: "Karmaşık Bilişsel Süreçler", notes: "Kuvvet, İş ve Enerji İlişkisi" },
        { outcomeCode: "FB.7.2.2", questionCount: 1, cognitiveLevel: "Karmaşık Bilişsel Süreçler", notes: "Enerji çeşitlerinden kinetik ve potansiyel enerjiyi karşılaştırabilme" },
        ]
      },
    ],
    sosyal_bilgiler: [
      {
        id: "senaryo_1",
        name: "Senaryo 1 (7 Soru)",
        description: "MEB ÖDSGM 2026-2027 1. Dönem 1. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 1 (7 Soru) formatı (Toplam 100 Puan).",
        totalQuestions: 7,
        distributions: [
        { outcomeCode: "SB.7.1.1", questionCount: 2, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Gruplarda ve Sosyal Hayatta İletişimin Önemi" },
        { outcomeCode: "SB.7.1.2", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Özel Gereksinimli Bireyler İçin Fırsat Eşitliği" },
        { outcomeCode: "SB.7.1.3", questionCount: 2, cognitiveLevel: "Karmaşık Bilişsel Süreçler", notes: "Millî Meseleler Karşısında Türk Toplumunun Tutum ve Davranışları" },
        { outcomeCode: "SB.7.2.1", questionCount: 2, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Küreselleşmenin İnsan ve Toplum Hayatına Etkisi" },
        ]
      },
      {
        id: "senaryo_2",
        name: "Senaryo 2 (7 Soru)",
        description: "MEB ÖDSGM 2026-2027 1. Dönem 1. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 2 (7 Soru) formatı (Toplam 100 Puan).",
        totalQuestions: 7,
        distributions: [
        { outcomeCode: "SB.7.1.1", questionCount: 2, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Gruplarda ve Sosyal Hayatta İletişimin Önemi" },
        { outcomeCode: "SB.7.1.2", questionCount: 2, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Özel Gereksinimli Bireyler İçin Fırsat Eşitliği" },
        { outcomeCode: "SB.7.1.3", questionCount: 2, cognitiveLevel: "Karmaşık Bilişsel Süreçler", notes: "Millî Meseleler Karşısında Türk Toplumunun Tutum ve Davranışları" },
        { outcomeCode: "SB.7.2.1", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Küreselleşmenin İnsan ve Toplum Hayatına Etkisi" },
        ]
      },
      {
        id: "senaryo_3",
        name: "Senaryo 3 (8 Soru)",
        description: "MEB ÖDSGM 2026-2027 1. Dönem 1. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 3 (8 Soru) formatı (Toplam 100 Puan).",
        totalQuestions: 8,
        distributions: [
        { outcomeCode: "SB.7.1.1", questionCount: 2, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Gruplarda ve Sosyal Hayatta İletişimin Önemi" },
        { outcomeCode: "SB.7.1.2", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Özel Gereksinimli Bireyler İçin Fırsat Eşitliği" },
        { outcomeCode: "SB.7.1.3", questionCount: 3, cognitiveLevel: "Karmaşık Bilişsel Süreçler", notes: "Millî Meseleler Karşısında Türk Toplumunun Tutum ve Davranışları" },
        { outcomeCode: "SB.7.2.1", questionCount: 2, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Küreselleşmenin İnsan ve Toplum Hayatına Etkisi" },
        ]
      },
      {
        id: "senaryo_4",
        name: "Senaryo 4 (7 Soru)",
        description: "MEB ÖDSGM 2026-2027 1. Dönem 1. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 4 (7 Soru) formatı (Toplam 100 Puan).",
        totalQuestions: 7,
        distributions: [
        { outcomeCode: "SB.7.1.1", questionCount: 2, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Gruplarda ve Sosyal Hayatta İletişimin Önemi" },
        { outcomeCode: "SB.7.1.2", questionCount: 2, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Özel Gereksinimli Bireyler İçin Fırsat Eşitliği" },
        { outcomeCode: "SB.7.1.3", questionCount: 3, cognitiveLevel: "Karmaşık Bilişsel Süreçler", notes: "Millî Meseleler Karşısında Türk Toplumunun Tutum ve Davranışları" },
        ]
      },
      {
        id: "senaryo_5",
        name: "Senaryo 5 (6 Soru)",
        description: "MEB ÖDSGM 2026-2027 1. Dönem 1. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 5 (6 Soru) formatı (Toplam 100 Puan).",
        totalQuestions: 6,
        distributions: [
        { outcomeCode: "SB.7.1.1", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Gruplarda ve Sosyal Hayatta İletişimin Önemi" },
        { outcomeCode: "SB.7.1.2", questionCount: 2, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Özel Gereksinimli Bireyler İçin Fırsat Eşitliği" },
        { outcomeCode: "SB.7.1.3", questionCount: 2, cognitiveLevel: "Karmaşık Bilişsel Süreçler", notes: "Millî Meseleler Karşısında Türk Toplumunun Tutum ve Davranışları" },
        { outcomeCode: "SB.7.2.1", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Küreselleşmenin İnsan ve Toplum Hayatına Etkisi" },
        ]
      },
    ],
    din_kulturu: [
      {
        id: "senaryo_1",
        name: "Senaryo 1 (8 Soru)",
        description: "MEB ÖDSGM 2026-2027 1. Dönem 1. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 1 (8 Soru) formatı (Toplam 100 Puan).",
        totalQuestions: 8,
        distributions: [
        { outcomeCode: "DKAB.7.1.1", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Varlıklar Âlemi" },
        { outcomeCode: "DKAB.7.1.2", questionCount: 2, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Dünya ve Ahiret Hayatı" },
        { outcomeCode: "DKAB.7.1.3", questionCount: 3, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Melek ve Ahiret İnancının İnsana Kazandırdıkları" },
        { outcomeCode: "DKAB.7.1.4", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Bir Sure Öğreniyorum: Nâs Suresi" },
        { outcomeCode: "DKAB.7.2.1", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Hac ve Umre İbadeti" },
        ]
      },
      {
        id: "senaryo_2",
        name: "Senaryo 2 (7 Soru)",
        description: "MEB ÖDSGM 2026-2027 1. Dönem 1. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 2 (7 Soru) formatı (Toplam 100 Puan).",
        totalQuestions: 7,
        distributions: [
        { outcomeCode: "DKAB.7.1.1", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Varlıklar Âlemi" },
        { outcomeCode: "DKAB.7.1.2", questionCount: 2, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Dünya ve Ahiret Hayatı" },
        { outcomeCode: "DKAB.7.1.3", questionCount: 2, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Melek ve Ahiret İnancının İnsana Kazandırdıkları" },
        { outcomeCode: "DKAB.7.1.4", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Bir Sure Öğreniyorum: Nâs Suresi" },
        { outcomeCode: "DKAB.7.2.1", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Hac ve Umre İbadeti" },
        ]
      },
      {
        id: "senaryo_3",
        name: "Senaryo 3 (6 Soru)",
        description: "MEB ÖDSGM 2026-2027 1. Dönem 1. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 3 (6 Soru) formatı (Toplam 100 Puan).",
        totalQuestions: 6,
        distributions: [
        { outcomeCode: "DKAB.7.1.1", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Varlıklar Âlemi" },
        { outcomeCode: "DKAB.7.1.2", questionCount: 2, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Dünya ve Ahiret Hayatı" },
        { outcomeCode: "DKAB.7.1.3", questionCount: 2, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Melek ve Ahiret İnancının İnsana Kazandırdıkları" },
        { outcomeCode: "DKAB.7.1.4", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Bir Sure Öğreniyorum: Nâs Suresi" },
        ]
      },
      {
        id: "senaryo_4",
        name: "Senaryo 4 (6 Soru)",
        description: "MEB ÖDSGM 2026-2027 1. Dönem 1. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 4 (6 Soru) formatı (Toplam 100 Puan).",
        totalQuestions: 6,
        distributions: [
        { outcomeCode: "DKAB.7.1.2", questionCount: 2, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Dünya ve Ahiret Hayatı" },
        { outcomeCode: "DKAB.7.1.3", questionCount: 3, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Melek ve Ahiret İnancının İnsana Kazandırdıkları" },
        { outcomeCode: "DKAB.7.1.4", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Bir Sure Öğreniyorum: Nâs Suresi" },
        ]
      },
      {
        id: "senaryo_5",
        name: "Senaryo 5 (6 Soru)",
        description: "MEB ÖDSGM 2026-2027 1. Dönem 1. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 5 (6 Soru) formatı (Toplam 100 Puan).",
        totalQuestions: 6,
        distributions: [
        { outcomeCode: "DKAB.7.1.1", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Varlıklar Âlemi" },
        { outcomeCode: "DKAB.7.1.2", questionCount: 2, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Dünya ve Ahiret Hayatı" },
        { outcomeCode: "DKAB.7.1.3", questionCount: 3, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Melek ve Ahiret İnancının İnsana Kazandırdıkları" },
        ]
      },
    ],
    ingilizce: [
      {
        id: "senaryo_1",
        name: "Senaryo 1 (4 Soru)",
        description: "MEB ÖDSGM 2026-2027 1. Dönem 1. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 1 (4 Soru) formatı (Toplam 100 Puan).",
        totalQuestions: 4,
        distributions: [
        { outcomeCode: "E7.1.R1", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Appearance And Personality" },
        { outcomeCode: "E7.1.W1", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Students will be able to write simple pieces to compare people." },
        { outcomeCode: "E7.2.R1", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Sports" },
        { outcomeCode: "E7.2.W1", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Students will be able to write pieces about routines/daily activities by using frequency adverbs." },
        ]
      },
      {
        id: "senaryo_2",
        name: "Senaryo 2 (5 Soru)",
        description: "MEB ÖDSGM 2026-2027 1. Dönem 1. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 2 (5 Soru) formatı (Toplam 100 Puan).",
        totalQuestions: 5,
        distributions: [
        { outcomeCode: "E7.1.R1", questionCount: 2, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Appearance And Personality" },
        { outcomeCode: "E7.1.W1", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Students will be able to write simple pieces to compare people." },
        { outcomeCode: "E7.2.R1", questionCount: 2, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Sports" },
        ]
      },
      {
        id: "senaryo_3",
        name: "Senaryo 3 (6 Soru)",
        description: "MEB ÖDSGM 2026-2027 1. Dönem 1. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 3 (6 Soru) formatı (Toplam 100 Puan).",
        totalQuestions: 6,
        distributions: [
        { outcomeCode: "E7.1.R1", questionCount: 2, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Appearance And Personality" },
        { outcomeCode: "E7.1.W1", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Students will be able to write simple pieces to compare people." },
        { outcomeCode: "E7.2.R1", questionCount: 2, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Sports" },
        { outcomeCode: "E7.2.W1", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Students will be able to write pieces about routines/daily activities by using frequency adverbs." },
        ]
      },
      {
        id: "senaryo_4",
        name: "Senaryo 4 (7 Soru)",
        description: "MEB ÖDSGM 2026-2027 1. Dönem 1. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 4 (7 Soru) formatı (Toplam 100 Puan).",
        totalQuestions: 7,
        distributions: [
        { outcomeCode: "E7.1.R1", questionCount: 2, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Appearance And Personality" },
        { outcomeCode: "E7.1.W1", questionCount: 2, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Students will be able to write simple pieces to compare people." },
        { outcomeCode: "E7.2.R1", questionCount: 2, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Sports" },
        { outcomeCode: "E7.2.W1", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Students will be able to write pieces about routines/daily activities by using frequency adverbs." },
        ]
      },
      {
        id: "senaryo_5",
        name: "Senaryo 5 (8 Soru)",
        description: "MEB ÖDSGM 2026-2027 1. Dönem 1. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 5 (8 Soru) formatı (Toplam 100 Puan).",
        totalQuestions: 8,
        distributions: [
        { outcomeCode: "E7.1.R1", questionCount: 2, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Appearance And Personality" },
        { outcomeCode: "E7.1.W1", questionCount: 2, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Students will be able to write simple pieces to compare people." },
        { outcomeCode: "E7.2.R1", questionCount: 3, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Sports" },
        { outcomeCode: "E7.2.W1", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Students will be able to write pieces about routines/daily activities by using frequency adverbs." },
        ]
      },
    ],
  },
  8: {
    turkce: [
      {
        id: "senaryo_1",
        name: "Senaryo 1 (8 Soru)",
        description: "MEB ÖDSGM 2026-2027 1. Dönem 1. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 1 (8 Soru) formatı (Toplam 100 Puan).",
        totalQuestions: 8,
        distributions: [
        { outcomeCode: "T.8.3.5", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Bağlamdan yararlanarak bilmediği kelime ve kelime gruplarının anlamını tahmin eder." },
        { outcomeCode: "T.8.3.7", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Metindeki söz sanatlarını tespit eder." },
        { outcomeCode: "T.8.3.9", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Fiilimsilerin cümledeki işlevlerini kavrar." },
        { outcomeCode: "T.8.3.14", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Metinle ilgili soruları cevaplar." },
        { outcomeCode: "T.8.3.16", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Metnin konusunu belirler." },
        { outcomeCode: "T.8.3.34", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Okuduklarında kullanılan düşünceyi geliştirme yollarını belirler." },
        { outcomeCode: "T.8.4.1", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Alt Öğrenme Alanı Yok" },
        { outcomeCode: "T.8.4.15", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Yazılarında uygun geçiş ve bağlantı ifadelerini kullanır." },
        ]
      },
      {
        id: "senaryo_2",
        name: "Senaryo 2 (9 Soru)",
        description: "MEB ÖDSGM 2026-2027 1. Dönem 1. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 2 (9 Soru) formatı (Toplam 100 Puan).",
        totalQuestions: 9,
        distributions: [
        { outcomeCode: "T.8.3.5", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Bağlamdan yararlanarak bilmediği kelime ve kelime gruplarının anlamını tahmin eder." },
        { outcomeCode: "T.8.3.9", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Fiilimsilerin cümledeki işlevlerini kavrar." },
        { outcomeCode: "T.8.3.11", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Metindeki anlatım biçimlerini belirler." },
        { outcomeCode: "T.8.3.14", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Metinle ilgili soruları cevaplar." },
        { outcomeCode: "T.8.3.17", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Metnin ana fikrini/ana duygusunu belirler." },
        { outcomeCode: "T.8.3.25", questionCount: 1, cognitiveLevel: "Karmaşık Bilişsel Süreçler", notes: "Okudukları ile ilgili çıkarımlarda bulunur." },
        { outcomeCode: "T.8.3.26", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Metin türlerini ayırt eder." },
        { outcomeCode: "T.8.3.34", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Okuduklarında kullanılan düşünceyi geliştirme yollarını belirler." },
        { outcomeCode: "T.8.4.9", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Yazılarında anlatım biçimlerini kullanır." },
        ]
      },
      {
        id: "senaryo_3",
        name: "Senaryo 3 (7 Soru)",
        description: "MEB ÖDSGM 2026-2027 1. Dönem 1. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 3 (7 Soru) formatı (Toplam 100 Puan).",
        totalQuestions: 7,
        distributions: [
        { outcomeCode: "T.8.3.5", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Bağlamdan yararlanarak bilmediği kelime ve kelime gruplarının anlamını tahmin eder." },
        { outcomeCode: "T.8.3.7", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Metindeki söz sanatlarını tespit eder." },
        { outcomeCode: "T.8.3.14", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Metinle ilgili soruları cevaplar." },
        { outcomeCode: "T.8.3.16", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Metnin konusunu belirler." },
        { outcomeCode: "T.8.3.17", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Metnin ana fikrini/ana duygusunu belirler." },
        { outcomeCode: "T.8.4.1", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Alt Öğrenme Alanı Yok" },
        { outcomeCode: "T.8.4.18", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Cümlenin ögelerini ayırt eder." },
        ]
      },
      {
        id: "senaryo_4",
        name: "Senaryo 4 (7 Soru)",
        description: "MEB ÖDSGM 2026-2027 1. Dönem 1. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 4 (7 Soru) formatı (Toplam 100 Puan).",
        totalQuestions: 7,
        distributions: [
        { outcomeCode: "T.8.3.5", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Bağlamdan yararlanarak bilmediği kelime ve kelime gruplarının anlamını tahmin eder." },
        { outcomeCode: "T.8.3.11", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Metindeki anlatım biçimlerini belirler." },
        { outcomeCode: "T.8.3.16", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Metnin konusunu belirler." },
        { outcomeCode: "T.8.3.17", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Metnin ana fikrini/ana duygusunu belirler." },
        { outcomeCode: "T.8.3.34", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Okuduklarında kullanılan düşünceyi geliştirme yollarını belirler." },
        { outcomeCode: "T.8.4.4", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Yazma stratejilerini uygular." },
        { outcomeCode: "T.8.4.15", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Yazılarında uygun geçiş ve bağlantı ifadelerini kullanır." },
        ]
      },
      {
        id: "senaryo_5",
        name: "Senaryo 5 (9 Soru)",
        description: "MEB ÖDSGM 2026-2027 1. Dönem 1. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 5 (9 Soru) formatı (Toplam 100 Puan).",
        totalQuestions: 9,
        distributions: [
        { outcomeCode: "T.8.3.7", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Metindeki söz sanatlarını tespit eder." },
        { outcomeCode: "T.8.3.9", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Fiilimsilerin cümledeki işlevlerini kavrar." },
        { outcomeCode: "T.8.3.11", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Metindeki anlatım biçimlerini belirler." },
        { outcomeCode: "T.8.3.15", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Metinle ilgili sorular sorar." },
        { outcomeCode: "T.8.3.25", questionCount: 1, cognitiveLevel: "Karmaşık Bilişsel Süreçler", notes: "Okudukları ile ilgili çıkarımlarda bulunur." },
        { outcomeCode: "T.8.3.26", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Metin türlerini ayırt eder." },
        { outcomeCode: "T.8.3.34", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Okuduklarında kullanılan düşünceyi geliştirme yollarını belirler." },
        { outcomeCode: "T.8.4.9", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Yazılarında anlatım biçimlerini kullanır." },
        { outcomeCode: "T.8.4.18", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Cümlenin ögelerini ayırt eder." },
        ]
      },
      {
        id: "senaryo_6",
        name: "Senaryo 6 (10 Soru)",
        description: "MEB ÖDSGM 2026-2027 1. Dönem 1. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 6 (10 Soru) formatı (Toplam 100 Puan).",
        totalQuestions: 10,
        distributions: [
        { outcomeCode: "T.8.3.7", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Metindeki söz sanatlarını tespit eder." },
        { outcomeCode: "T.8.3.11", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Metindeki anlatım biçimlerini belirler." },
        { outcomeCode: "T.8.3.14", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Metinle ilgili soruları cevaplar." },
        { outcomeCode: "T.8.3.15", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Metinle ilgili sorular sorar." },
        { outcomeCode: "T.8.3.17", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Metnin ana fikrini/ana duygusunu belirler." },
        { outcomeCode: "T.8.3.19", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Metnin içeriğine uygun başlık/başlıklar belirler." },
        { outcomeCode: "T.8.3.25", questionCount: 1, cognitiveLevel: "Karmaşık Bilişsel Süreçler", notes: "Okudukları ile ilgili çıkarımlarda bulunur." },
        { outcomeCode: "T.8.3.34", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Okuduklarında kullanılan düşünceyi geliştirme yollarını belirler." },
        { outcomeCode: "T.8.4.1", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Alt Öğrenme Alanı Yok" },
        { outcomeCode: "T.8.4.18", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Cümlenin ögelerini ayırt eder." },
        ]
      },
      {
        id: "senaryo_7",
        name: "Senaryo 7 (7 Soru)",
        description: "MEB ÖDSGM 2026-2027 1. Dönem 1. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 7 (7 Soru) formatı (Toplam 100 Puan).",
        totalQuestions: 7,
        distributions: [
        { outcomeCode: "T.8.3.9", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Fiilimsilerin cümledeki işlevlerini kavrar." },
        { outcomeCode: "T.8.3.14", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Metinle ilgili soruları cevaplar." },
        { outcomeCode: "T.8.3.16", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Metnin konusunu belirler." },
        { outcomeCode: "T.8.3.25", questionCount: 1, cognitiveLevel: "Karmaşık Bilişsel Süreçler", notes: "Okudukları ile ilgili çıkarımlarda bulunur." },
        { outcomeCode: "T.8.4.4", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Yazma stratejilerini uygular." },
        { outcomeCode: "T.8.4.9", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Yazılarında anlatım biçimlerini kullanır." },
        { outcomeCode: "T.8.4.18", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Cümlenin ögelerini ayırt eder." },
        ]
      },
    ],
    matematik: [
      {
        id: "senaryo_1",
        name: "Senaryo 1 (11 Soru)",
        description: "MEB ÖDSGM 2026-2027 1. Dönem 1. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 1 (11 Soru) formatı (Toplam 100 Puan).",
        totalQuestions: 11,
        distributions: [
        { outcomeCode: "M.8.1.1.1", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Çarpanlar ve Katlar" },
        { outcomeCode: "M.8.1.1.2", questionCount: 1, cognitiveLevel: "Karmaşık Bilişsel Süreçler", notes: "İki doğal sayının en büyük ortak bölenini (EBOB) ve en küçük ortak katını (EKOK) hesaplar, ilgili problemleri çözer." },
        { outcomeCode: "M.8.1.1.3", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Verilen iki doğal sayının aralarında asal olup olmadığını belirler." },
        { outcomeCode: "M.8.1.2.1", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Üslü İfadeler" },
        { outcomeCode: "M.8.1.2.2", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Üslü ifadelerle ilgili temel kuralları anlar, birbirine denk ifadeler oluşturur." },
        { outcomeCode: "M.8.1.2.3", questionCount: 1, cognitiveLevel: "Karmaşık Bilişsel Süreçler", notes: "Sayıların ondalık gösterimlerini 10’un tam sayı kuvvetlerini kullanarak çözümler." },
        { outcomeCode: "M.8.1.2.4", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Verilen bir sayıyı 10’un farklı tam sayı kuvvetlerini kullanarak ifade eder." },
        { outcomeCode: "M.8.1.2.5", questionCount: 1, cognitiveLevel: "Karmaşık Bilişsel Süreçler", notes: "Çok büyük ve çok küçük sayıları bilimsel gösterimle ifade eder ve karşılaştırır." },
        { outcomeCode: "M.8.1.3.1", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Kareköklü İfadeler" },
        { outcomeCode: "M.8.1.3.2", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Tam kare olmayan kareköklü bir sayının hangi iki doğal sayı arasında olduğunu belirler." },
        { outcomeCode: "M.8.1.3.3", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Kareköklü bir ifadeyi a√b şeklinde yazar ve a√b şeklindeki ifadede katsayıyı kök içine alır." },
        ]
      },
      {
        id: "senaryo_2",
        name: "Senaryo 2 (8 Soru)",
        description: "MEB ÖDSGM 2026-2027 1. Dönem 1. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 2 (8 Soru) formatı (Toplam 100 Puan).",
        totalQuestions: 8,
        distributions: [
        { outcomeCode: "M.8.1.1.1", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Çarpanlar ve Katlar" },
        { outcomeCode: "M.8.1.1.2", questionCount: 2, cognitiveLevel: "Karmaşık Bilişsel Süreçler", notes: "İki doğal sayının en büyük ortak bölenini (EBOB) ve en küçük ortak katını (EKOK) hesaplar, ilgili problemleri çözer." },
        { outcomeCode: "M.8.1.2.2", questionCount: 2, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Üslü ifadelerle ilgili temel kuralları anlar, birbirine denk ifadeler oluşturur." },
        { outcomeCode: "M.8.1.3.2", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Tam kare olmayan kareköklü bir sayının hangi iki doğal sayı arasında olduğunu belirler." },
        { outcomeCode: "M.8.1.3.3", questionCount: 2, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Kareköklü bir ifadeyi a√b şeklinde yazar ve a√b şeklindeki ifadede katsayıyı kök içine alır." },
        ]
      },
      {
        id: "senaryo_3",
        name: "Senaryo 3 (11 Soru)",
        description: "MEB ÖDSGM 2026-2027 1. Dönem 1. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 3 (11 Soru) formatı (Toplam 100 Puan).",
        totalQuestions: 11,
        distributions: [
        { outcomeCode: "M.8.1.1.1", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Çarpanlar ve Katlar" },
        { outcomeCode: "M.8.1.1.2", questionCount: 2, cognitiveLevel: "Karmaşık Bilişsel Süreçler", notes: "İki doğal sayının en büyük ortak bölenini (EBOB) ve en küçük ortak katını (EKOK) hesaplar, ilgili problemleri çözer." },
        { outcomeCode: "M.8.1.1.3", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Verilen iki doğal sayının aralarında asal olup olmadığını belirler." },
        { outcomeCode: "M.8.1.2.2", questionCount: 2, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Üslü ifadelerle ilgili temel kuralları anlar, birbirine denk ifadeler oluşturur." },
        { outcomeCode: "M.8.1.2.3", questionCount: 1, cognitiveLevel: "Karmaşık Bilişsel Süreçler", notes: "Sayıların ondalık gösterimlerini 10’un tam sayı kuvvetlerini kullanarak çözümler." },
        { outcomeCode: "M.8.1.2.4", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Verilen bir sayıyı 10’un farklı tam sayı kuvvetlerini kullanarak ifade eder." },
        { outcomeCode: "M.8.1.2.5", questionCount: 1, cognitiveLevel: "Karmaşık Bilişsel Süreçler", notes: "Çok büyük ve çok küçük sayıları bilimsel gösterimle ifade eder ve karşılaştırır." },
        { outcomeCode: "M.8.1.3.1", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Kareköklü İfadeler" },
        { outcomeCode: "M.8.1.3.2", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Tam kare olmayan kareköklü bir sayının hangi iki doğal sayı arasında olduğunu belirler." },
        ]
      },
      {
        id: "senaryo_4",
        name: "Senaryo 4 (8 Soru)",
        description: "MEB ÖDSGM 2026-2027 1. Dönem 1. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 4 (8 Soru) formatı (Toplam 100 Puan).",
        totalQuestions: 8,
        distributions: [
        { outcomeCode: "M.8.1.1.2", questionCount: 2, cognitiveLevel: "Karmaşık Bilişsel Süreçler", notes: "İki doğal sayının en büyük ortak bölenini (EBOB) ve en küçük ortak katını (EKOK) hesaplar, ilgili problemleri çözer." },
        { outcomeCode: "M.8.1.2.1", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Üslü İfadeler" },
        { outcomeCode: "M.8.1.2.2", questionCount: 2, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Üslü ifadelerle ilgili temel kuralları anlar, birbirine denk ifadeler oluşturur." },
        { outcomeCode: "M.8.1.2.4", questionCount: 2, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Verilen bir sayıyı 10’un farklı tam sayı kuvvetlerini kullanarak ifade eder." },
        { outcomeCode: "M.8.1.3.2", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Tam kare olmayan kareköklü bir sayının hangi iki doğal sayı arasında olduğunu belirler." },
        ]
      },
      {
        id: "senaryo_5",
        name: "Senaryo 5 (10 Soru)",
        description: "MEB ÖDSGM 2026-2027 1. Dönem 1. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 5 (10 Soru) formatı (Toplam 100 Puan).",
        totalQuestions: 10,
        distributions: [
        { outcomeCode: "M.8.1.1.1", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Çarpanlar ve Katlar" },
        { outcomeCode: "M.8.1.1.2", questionCount: 3, cognitiveLevel: "Karmaşık Bilişsel Süreçler", notes: "İki doğal sayının en büyük ortak bölenini (EBOB) ve en küçük ortak katını (EKOK) hesaplar, ilgili problemleri çözer." },
        { outcomeCode: "M.8.1.2.2", questionCount: 3, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Üslü ifadelerle ilgili temel kuralları anlar, birbirine denk ifadeler oluşturur." },
        { outcomeCode: "M.8.1.2.3", questionCount: 1, cognitiveLevel: "Karmaşık Bilişsel Süreçler", notes: "Sayıların ondalık gösterimlerini 10’un tam sayı kuvvetlerini kullanarak çözümler." },
        { outcomeCode: "M.8.1.2.4", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Verilen bir sayıyı 10’un farklı tam sayı kuvvetlerini kullanarak ifade eder." },
        { outcomeCode: "M.8.1.2.5", questionCount: 1, cognitiveLevel: "Karmaşık Bilişsel Süreçler", notes: "Çok büyük ve çok küçük sayıları bilimsel gösterimle ifade eder ve karşılaştırır." },
        ]
      },
      {
        id: "senaryo_6",
        name: "Senaryo 6 (9 Soru)",
        description: "MEB ÖDSGM 2026-2027 1. Dönem 1. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 6 (9 Soru) formatı (Toplam 100 Puan).",
        totalQuestions: 9,
        distributions: [
        { outcomeCode: "M.8.1.1.1", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Çarpanlar ve Katlar" },
        { outcomeCode: "M.8.1.1.2", questionCount: 2, cognitiveLevel: "Karmaşık Bilişsel Süreçler", notes: "İki doğal sayının en büyük ortak bölenini (EBOB) ve en küçük ortak katını (EKOK) hesaplar, ilgili problemleri çözer." },
        { outcomeCode: "M.8.1.1.3", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Verilen iki doğal sayının aralarında asal olup olmadığını belirler." },
        { outcomeCode: "M.8.1.2.1", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Üslü İfadeler" },
        { outcomeCode: "M.8.1.2.2", questionCount: 2, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Üslü ifadelerle ilgili temel kuralları anlar, birbirine denk ifadeler oluşturur." },
        { outcomeCode: "M.8.1.2.4", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Verilen bir sayıyı 10’un farklı tam sayı kuvvetlerini kullanarak ifade eder." },
        { outcomeCode: "M.8.1.2.5", questionCount: 1, cognitiveLevel: "Karmaşık Bilişsel Süreçler", notes: "Çok büyük ve çok küçük sayıları bilimsel gösterimle ifade eder ve karşılaştırır." },
        ]
      },
    ],
    fen_bilimleri: [
      {
        id: "senaryo_1",
        name: "Senaryo 1 (7 Soru)",
        description: "MEB ÖDSGM 2026-2027 1. Dönem 1. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 1 (7 Soru) formatı (Toplam 100 Puan).",
        totalQuestions: 7,
        distributions: [
        { outcomeCode: "F.8.1.1.1", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "8.1.1. Mevsimlerin Oluşumu" },
        { outcomeCode: "F.8.2.1.1", questionCount: 2, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "8.2.1. DNA ve Genetik Kod" },
        { outcomeCode: "F.8.2.1.2", questionCount: 2, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "DNA’nın yapısını model üzerinde gösterir." },
        { outcomeCode: "F.8.2.1.3", questionCount: 2, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "DNA’nın kendini nasıl eşlediğini ifade eder." },
        ]
      },
      {
        id: "senaryo_2",
        name: "Senaryo 2 (8 Soru)",
        description: "MEB ÖDSGM 2026-2027 1. Dönem 1. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 2 (8 Soru) formatı (Toplam 100 Puan).",
        totalQuestions: 8,
        distributions: [
        { outcomeCode: "F.8.1.1.1", questionCount: 2, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "8.1.1. Mevsimlerin Oluşumu" },
        { outcomeCode: "F.8.2.1.1", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "8.2.1. DNA ve Genetik Kod" },
        { outcomeCode: "F.8.2.1.2", questionCount: 2, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "DNA’nın yapısını model üzerinde gösterir." },
        { outcomeCode: "F.8.2.1.3", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "DNA’nın kendini nasıl eşlediğini ifade eder." },
        { outcomeCode: "F.8.2.2.2", questionCount: 2, cognitiveLevel: "Karmaşık Bilişsel Süreçler", notes: "Tek karakter çaprazlamaları ile ilgili problemler çözerek sonuçlar hakkında yorum yapar." },
        ]
      },
      {
        id: "senaryo_3",
        name: "Senaryo 3 (9 Soru)",
        description: "MEB ÖDSGM 2026-2027 1. Dönem 1. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 3 (9 Soru) formatı (Toplam 100 Puan).",
        totalQuestions: 9,
        distributions: [
        { outcomeCode: "F.8.1.1.1", questionCount: 2, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "8.1.1. Mevsimlerin Oluşumu" },
        { outcomeCode: "F.8.2.1.1", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "8.2.1. DNA ve Genetik Kod" },
        { outcomeCode: "F.8.2.1.2", questionCount: 2, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "DNA’nın yapısını model üzerinde gösterir." },
        { outcomeCode: "F.8.2.2.1", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "8.2.2. Kalıtım" },
        { outcomeCode: "F.8.2.2.2", questionCount: 3, cognitiveLevel: "Karmaşık Bilişsel Süreçler", notes: "Tek karakter çaprazlamaları ile ilgili problemler çözerek sonuçlar hakkında yorum yapar." },
        ]
      },
      {
        id: "senaryo_4",
        name: "Senaryo 4 (7 Soru)",
        description: "MEB ÖDSGM 2026-2027 1. Dönem 1. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 4 (7 Soru) formatı (Toplam 100 Puan).",
        totalQuestions: 7,
        distributions: [
        { outcomeCode: "F.8.1.1.1", questionCount: 2, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "8.1.1. Mevsimlerin Oluşumu" },
        { outcomeCode: "F.8.2.1.1", questionCount: 2, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "8.2.1. DNA ve Genetik Kod" },
        { outcomeCode: "F.8.2.1.3", questionCount: 2, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "DNA’nın kendini nasıl eşlediğini ifade eder." },
        { outcomeCode: "F.8.2.2.1", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "8.2.2. Kalıtım" },
        ]
      },
      {
        id: "senaryo_5",
        name: "Senaryo 5 (8 Soru)",
        description: "MEB ÖDSGM 2026-2027 1. Dönem 1. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 5 (8 Soru) formatı (Toplam 100 Puan).",
        totalQuestions: 8,
        distributions: [
        { outcomeCode: "F.8.1.1.1", questionCount: 2, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "8.1.1. Mevsimlerin Oluşumu" },
        { outcomeCode: "F.8.2.1.2", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "DNA’nın yapısını model üzerinde gösterir." },
        { outcomeCode: "F.8.2.1.3", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "DNA’nın kendini nasıl eşlediğini ifade eder." },
        { outcomeCode: "F.8.2.2.1", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "8.2.2. Kalıtım" },
        { outcomeCode: "F.8.2.2.2", questionCount: 3, cognitiveLevel: "Karmaşık Bilişsel Süreçler", notes: "Tek karakter çaprazlamaları ile ilgili problemler çözerek sonuçlar hakkında yorum yapar." },
        ]
      },
    ],
    sosyal_bilgiler: [
      {
        id: "senaryo_1",
        name: "Senaryo 1 (6 Soru)",
        description: "MEB ÖDSGM 2026-2027 1. Dönem 1. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 1 (6 Soru) formatı (Toplam 100 Puan).",
        totalQuestions: 6,
        distributions: [
        { outcomeCode: "İTA.8.1.1", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "1. ÜNİTE: BİR KAHRAMAN DOĞUYOR" },
        { outcomeCode: "İTA.8.1.2", questionCount: 1, cognitiveLevel: "Karmaşık Bilişsel Süreçler", notes: "Mustafa Kemal’in çocukluk ve öğrenim hayatından hareketle onun kişilik özelliklerinin oluşumu hakkında çıkarımlarda bulunur." },
        { outcomeCode: "İTA.8.1.3", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Gençlik döneminde Mustafa Kemal’in fikir hayatını etkileyen önemli kişileri ve olayları kavrar." },
        { outcomeCode: "İTA.8.1.4", questionCount: 1, cognitiveLevel: "Karmaşık Bilişsel Süreçler", notes: "Mustafa Kemal’in askerlik hayatı ile ilgili olayları ve olguları onun kişilik özellikleri ile ilişkilendirir." },
        { outcomeCode: "İTA.8.2.1", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "2. ÜNİTE: MİLLÎ UYANIŞ: BAĞIMSIZLIK YOLUNDA ATILAN ADIMLAR" },
        { outcomeCode: "İTA.8.2.2", questionCount: 1, cognitiveLevel: "Karmaşık Bilişsel Süreçler", notes: "Birinci Dünya Savaşı’nda Osmanlı Devleti’nin durumu hakkında çıkarımlarda bulunur." },
        ]
      },
      {
        id: "senaryo_2",
        name: "Senaryo 2 (7 Soru)",
        description: "MEB ÖDSGM 2026-2027 1. Dönem 1. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 2 (7 Soru) formatı (Toplam 100 Puan).",
        totalQuestions: 7,
        distributions: [
        { outcomeCode: "İTA.8.1.1", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "1. ÜNİTE: BİR KAHRAMAN DOĞUYOR" },
        { outcomeCode: "İTA.8.1.2", questionCount: 1, cognitiveLevel: "Karmaşık Bilişsel Süreçler", notes: "Mustafa Kemal’in çocukluk ve öğrenim hayatından hareketle onun kişilik özelliklerinin oluşumu hakkında çıkarımlarda bulunur." },
        { outcomeCode: "İTA.8.1.3", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Gençlik döneminde Mustafa Kemal’in fikir hayatını etkileyen önemli kişileri ve olayları kavrar." },
        { outcomeCode: "İTA.8.1.4", questionCount: 1, cognitiveLevel: "Karmaşık Bilişsel Süreçler", notes: "Mustafa Kemal’in askerlik hayatı ile ilgili olayları ve olguları onun kişilik özellikleri ile ilişkilendirir." },
        { outcomeCode: "İTA.8.2.1", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "2. ÜNİTE: MİLLÎ UYANIŞ: BAĞIMSIZLIK YOLUNDA ATILAN ADIMLAR" },
        { outcomeCode: "İTA.8.2.2", questionCount: 1, cognitiveLevel: "Karmaşık Bilişsel Süreçler", notes: "Birinci Dünya Savaşı’nda Osmanlı Devleti’nin durumu hakkında çıkarımlarda bulunur." },
        { outcomeCode: "İTA.8.2.3", questionCount: 1, cognitiveLevel: "Karmaşık Bilişsel Süreçler", notes: "Mondros Ateşkes Antlaşması’nın imzalanması ve uygulanması karşısında Osmanlı yönetiminin, Mustafa Kemal’in ve halkın tutumunu analiz eder." },
        ]
      },
      {
        id: "senaryo_3",
        name: "Senaryo 3 (8 Soru)",
        description: "MEB ÖDSGM 2026-2027 1. Dönem 1. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 3 (8 Soru) formatı (Toplam 100 Puan).",
        totalQuestions: 8,
        distributions: [
        { outcomeCode: "İTA.8.1.1", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "1. ÜNİTE: BİR KAHRAMAN DOĞUYOR" },
        { outcomeCode: "İTA.8.1.2", questionCount: 1, cognitiveLevel: "Karmaşık Bilişsel Süreçler", notes: "Mustafa Kemal’in çocukluk ve öğrenim hayatından hareketle onun kişilik özelliklerinin oluşumu hakkında çıkarımlarda bulunur." },
        { outcomeCode: "İTA.8.1.3", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Gençlik döneminde Mustafa Kemal’in fikir hayatını etkileyen önemli kişileri ve olayları kavrar." },
        { outcomeCode: "İTA.8.1.4", questionCount: 1, cognitiveLevel: "Karmaşık Bilişsel Süreçler", notes: "Mustafa Kemal’in askerlik hayatı ile ilgili olayları ve olguları onun kişilik özellikleri ile ilişkilendirir." },
        { outcomeCode: "İTA.8.2.1", questionCount: 2, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "2. ÜNİTE: MİLLÎ UYANIŞ: BAĞIMSIZLIK YOLUNDA ATILAN ADIMLAR" },
        { outcomeCode: "İTA.8.2.2", questionCount: 1, cognitiveLevel: "Karmaşık Bilişsel Süreçler", notes: "Birinci Dünya Savaşı’nda Osmanlı Devleti’nin durumu hakkında çıkarımlarda bulunur." },
        { outcomeCode: "İTA.8.2.3", questionCount: 1, cognitiveLevel: "Karmaşık Bilişsel Süreçler", notes: "Mondros Ateşkes Antlaşması’nın imzalanması ve uygulanması karşısında Osmanlı yönetiminin, Mustafa Kemal’in ve halkın tutumunu analiz eder." },
        ]
      },
      {
        id: "senaryo_4",
        name: "Senaryo 4 (6 Soru)",
        description: "MEB ÖDSGM 2026-2027 1. Dönem 1. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 4 (6 Soru) formatı (Toplam 100 Puan).",
        totalQuestions: 6,
        distributions: [
        { outcomeCode: "İTA.8.1.2", questionCount: 1, cognitiveLevel: "Karmaşık Bilişsel Süreçler", notes: "Mustafa Kemal’in çocukluk ve öğrenim hayatından hareketle onun kişilik özelliklerinin oluşumu hakkında çıkarımlarda bulunur." },
        { outcomeCode: "İTA.8.1.3", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Gençlik döneminde Mustafa Kemal’in fikir hayatını etkileyen önemli kişileri ve olayları kavrar." },
        { outcomeCode: "İTA.8.1.4", questionCount: 1, cognitiveLevel: "Karmaşık Bilişsel Süreçler", notes: "Mustafa Kemal’in askerlik hayatı ile ilgili olayları ve olguları onun kişilik özellikleri ile ilişkilendirir." },
        { outcomeCode: "İTA.8.2.1", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "2. ÜNİTE: MİLLÎ UYANIŞ: BAĞIMSIZLIK YOLUNDA ATILAN ADIMLAR" },
        { outcomeCode: "İTA.8.2.2", questionCount: 2, cognitiveLevel: "Karmaşık Bilişsel Süreçler", notes: "Birinci Dünya Savaşı’nda Osmanlı Devleti’nin durumu hakkında çıkarımlarda bulunur." },
        ]
      },
      {
        id: "senaryo_5",
        name: "Senaryo 5 (7 Soru)",
        description: "MEB ÖDSGM 2026-2027 1. Dönem 1. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 5 (7 Soru) formatı (Toplam 100 Puan).",
        totalQuestions: 7,
        distributions: [
        { outcomeCode: "İTA.8.1.1", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "1. ÜNİTE: BİR KAHRAMAN DOĞUYOR" },
        { outcomeCode: "İTA.8.1.2", questionCount: 1, cognitiveLevel: "Karmaşık Bilişsel Süreçler", notes: "Mustafa Kemal’in çocukluk ve öğrenim hayatından hareketle onun kişilik özelliklerinin oluşumu hakkında çıkarımlarda bulunur." },
        { outcomeCode: "İTA.8.1.3", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Gençlik döneminde Mustafa Kemal’in fikir hayatını etkileyen önemli kişileri ve olayları kavrar." },
        { outcomeCode: "İTA.8.1.4", questionCount: 2, cognitiveLevel: "Karmaşık Bilişsel Süreçler", notes: "Mustafa Kemal’in askerlik hayatı ile ilgili olayları ve olguları onun kişilik özellikleri ile ilişkilendirir." },
        { outcomeCode: "İTA.8.2.1", questionCount: 2, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "2. ÜNİTE: MİLLÎ UYANIŞ: BAĞIMSIZLIK YOLUNDA ATILAN ADIMLAR" },
        ]
      },
      {
        id: "senaryo_6",
        name: "Senaryo 6 (8 Soru)",
        description: "MEB ÖDSGM 2026-2027 1. Dönem 1. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 6 (8 Soru) formatı (Toplam 100 Puan).",
        totalQuestions: 8,
        distributions: [
        { outcomeCode: "İTA.8.1.1", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "1. ÜNİTE: BİR KAHRAMAN DOĞUYOR" },
        { outcomeCode: "İTA.8.1.2", questionCount: 1, cognitiveLevel: "Karmaşık Bilişsel Süreçler", notes: "Mustafa Kemal’in çocukluk ve öğrenim hayatından hareketle onun kişilik özelliklerinin oluşumu hakkında çıkarımlarda bulunur." },
        { outcomeCode: "İTA.8.1.3", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Gençlik döneminde Mustafa Kemal’in fikir hayatını etkileyen önemli kişileri ve olayları kavrar." },
        { outcomeCode: "İTA.8.1.4", questionCount: 1, cognitiveLevel: "Karmaşık Bilişsel Süreçler", notes: "Mustafa Kemal’in askerlik hayatı ile ilgili olayları ve olguları onun kişilik özellikleri ile ilişkilendirir." },
        { outcomeCode: "İTA.8.2.1", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "2. ÜNİTE: MİLLÎ UYANIŞ: BAĞIMSIZLIK YOLUNDA ATILAN ADIMLAR" },
        { outcomeCode: "İTA.8.2.2", questionCount: 2, cognitiveLevel: "Karmaşık Bilişsel Süreçler", notes: "Birinci Dünya Savaşı’nda Osmanlı Devleti’nin durumu hakkında çıkarımlarda bulunur." },
        { outcomeCode: "İTA.8.2.3", questionCount: 1, cognitiveLevel: "Karmaşık Bilişsel Süreçler", notes: "Mondros Ateşkes Antlaşması’nın imzalanması ve uygulanması karşısında Osmanlı yönetiminin, Mustafa Kemal’in ve halkın tutumunu analiz eder." },
        ]
      },
      {
        id: "senaryo_7",
        name: "Senaryo 7 (8 Soru)",
        description: "MEB ÖDSGM 2026-2027 1. Dönem 1. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 7 (8 Soru) formatı (Toplam 100 Puan).",
        totalQuestions: 8,
        distributions: [
        { outcomeCode: "İTA.8.1.2", questionCount: 2, cognitiveLevel: "Karmaşık Bilişsel Süreçler", notes: "Mustafa Kemal’in çocukluk ve öğrenim hayatından hareketle onun kişilik özelliklerinin oluşumu hakkında çıkarımlarda bulunur." },
        { outcomeCode: "İTA.8.1.3", questionCount: 2, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Gençlik döneminde Mustafa Kemal’in fikir hayatını etkileyen önemli kişileri ve olayları kavrar." },
        { outcomeCode: "İTA.8.1.4", questionCount: 2, cognitiveLevel: "Karmaşık Bilişsel Süreçler", notes: "Mustafa Kemal’in askerlik hayatı ile ilgili olayları ve olguları onun kişilik özellikleri ile ilişkilendirir." },
        { outcomeCode: "İTA.8.2.1", questionCount: 2, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "2. ÜNİTE: MİLLÎ UYANIŞ: BAĞIMSIZLIK YOLUNDA ATILAN ADIMLAR" },
        ]
      },
    ],
    din_kulturu: [
      {
        id: "senaryo_1",
        name: "Senaryo 1 (9 Soru)",
        description: "MEB ÖDSGM 2026-2027 1. Dönem 1. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 1 (9 Soru) formatı (Toplam 100 Puan).",
        totalQuestions: 9,
        distributions: [
        { outcomeCode: "DKAB.8.1.1", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Kader ve kaza inancını ayet ve hadislerle açıklar." },
        { outcomeCode: "DKAB.8.1.2", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "İnsanın ilmi, iradesi, sorumluluğu ile kader arasında ilişki kurar." },
        { outcomeCode: "DKAB.8.1.3", questionCount: 2, cognitiveLevel: "Karmaşık Bilişsel Süreçler", notes: "Kaza ve kader ile ilgili kavramları analiz eder." },
        { outcomeCode: "DKAB.8.1.4", questionCount: 2, cognitiveLevel: "Karmaşık Bilişsel Süreçler", notes: "Toplumda kader ve kaza ile ilgili yaygın olan yanlış anlayışları sorgular." },
        { outcomeCode: "DKAB.8.1.5", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Hz. Musa’nın (a.s.) hayatını ana hatlarıyla tanır." },
        { outcomeCode: "DKAB.8.1.6", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Ayet el-Kürsi’yi okur, anlamını söyler." },
        { outcomeCode: "DKAB.8.2.1", questionCount: 1, cognitiveLevel: "Karmaşık Bilişsel Süreçler", notes: "İslam’ın paylaşma ve yardımlaşmaya verdiği önemi ayet ve hadisler ışığında yorumlar." },
        ]
      },
      {
        id: "senaryo_2",
        name: "Senaryo 2 (8 Soru)",
        description: "MEB ÖDSGM 2026-2027 1. Dönem 1. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 2 (8 Soru) formatı (Toplam 100 Puan).",
        totalQuestions: 8,
        distributions: [
        { outcomeCode: "DKAB.8.1.2", questionCount: 2, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "İnsanın ilmi, iradesi, sorumluluğu ile kader arasında ilişki kurar." },
        { outcomeCode: "DKAB.8.1.3", questionCount: 2, cognitiveLevel: "Karmaşık Bilişsel Süreçler", notes: "Kaza ve kader ile ilgili kavramları analiz eder." },
        { outcomeCode: "DKAB.8.1.4", questionCount: 2, cognitiveLevel: "Karmaşık Bilişsel Süreçler", notes: "Toplumda kader ve kaza ile ilgili yaygın olan yanlış anlayışları sorgular." },
        { outcomeCode: "DKAB.8.1.5", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Hz. Musa’nın (a.s.) hayatını ana hatlarıyla tanır." },
        { outcomeCode: "DKAB.8.2.1", questionCount: 1, cognitiveLevel: "Karmaşık Bilişsel Süreçler", notes: "İslam’ın paylaşma ve yardımlaşmaya verdiği önemi ayet ve hadisler ışığında yorumlar." },
        ]
      },
      {
        id: "senaryo_3",
        name: "Senaryo 3 (6 Soru)",
        description: "MEB ÖDSGM 2026-2027 1. Dönem 1. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 3 (6 Soru) formatı (Toplam 100 Puan).",
        totalQuestions: 6,
        distributions: [
        { outcomeCode: "DKAB.8.1.2", questionCount: 2, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "İnsanın ilmi, iradesi, sorumluluğu ile kader arasında ilişki kurar." },
        { outcomeCode: "DKAB.8.1.3", questionCount: 2, cognitiveLevel: "Karmaşık Bilişsel Süreçler", notes: "Kaza ve kader ile ilgili kavramları analiz eder." },
        { outcomeCode: "DKAB.8.1.4", questionCount: 1, cognitiveLevel: "Karmaşık Bilişsel Süreçler", notes: "Toplumda kader ve kaza ile ilgili yaygın olan yanlış anlayışları sorgular." },
        { outcomeCode: "DKAB.8.1.6", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Ayet el-Kürsi’yi okur, anlamını söyler." },
        ]
      },
      {
        id: "senaryo_4",
        name: "Senaryo 4 (8 Soru)",
        description: "MEB ÖDSGM 2026-2027 1. Dönem 1. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 4 (8 Soru) formatı (Toplam 100 Puan).",
        totalQuestions: 8,
        distributions: [
        { outcomeCode: "DKAB.8.1.1", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Kader ve kaza inancını ayet ve hadislerle açıklar." },
        { outcomeCode: "DKAB.8.1.2", questionCount: 2, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "İnsanın ilmi, iradesi, sorumluluğu ile kader arasında ilişki kurar." },
        { outcomeCode: "DKAB.8.1.3", questionCount: 3, cognitiveLevel: "Karmaşık Bilişsel Süreçler", notes: "Kaza ve kader ile ilgili kavramları analiz eder." },
        { outcomeCode: "DKAB.8.1.4", questionCount: 2, cognitiveLevel: "Karmaşık Bilişsel Süreçler", notes: "Toplumda kader ve kaza ile ilgili yaygın olan yanlış anlayışları sorgular." },
        ]
      },
      {
        id: "senaryo_5",
        name: "Senaryo 5 (7 Soru)",
        description: "MEB ÖDSGM 2026-2027 1. Dönem 1. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 5 (7 Soru) formatı (Toplam 100 Puan).",
        totalQuestions: 7,
        distributions: [
        { outcomeCode: "DKAB.8.1.1", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Kader ve kaza inancını ayet ve hadislerle açıklar." },
        { outcomeCode: "DKAB.8.1.2", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "İnsanın ilmi, iradesi, sorumluluğu ile kader arasında ilişki kurar." },
        { outcomeCode: "DKAB.8.1.3", questionCount: 2, cognitiveLevel: "Karmaşık Bilişsel Süreçler", notes: "Kaza ve kader ile ilgili kavramları analiz eder." },
        { outcomeCode: "DKAB.8.1.4", questionCount: 2, cognitiveLevel: "Karmaşık Bilişsel Süreçler", notes: "Toplumda kader ve kaza ile ilgili yaygın olan yanlış anlayışları sorgular." },
        { outcomeCode: "DKAB.8.1.6", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Ayet el-Kürsi’yi okur, anlamını söyler." },
        ]
      },
    ],
    ingilizce: [
      {
        id: "senaryo_1",
        name: "Senaryo 1 (4 Soru)",
        description: "MEB ÖDSGM 2026-2027 1. Dönem 1. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 1 (4 Soru) formatı (Toplam 100 Puan).",
        totalQuestions: 4,
        distributions: [
        { outcomeCode: "E8.1.R1", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Friendship" },
        { outcomeCode: "E8.1.W1", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Students will be able to write a short and simple letter apologizing and giving reasons for not attending a party in response to an invitation." },
        { outcomeCode: "E8.2.R1", questionCount: 2, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Teen Life" },
        ]
      },
      {
        id: "senaryo_2",
        name: "Senaryo 2 (5 Soru)",
        description: "MEB ÖDSGM 2026-2027 1. Dönem 1. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 2 (5 Soru) formatı (Toplam 100 Puan).",
        totalQuestions: 5,
        distributions: [
        { outcomeCode: "E8.1.R1", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Friendship" },
        { outcomeCode: "E8.1.R2", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Students will be able to understand short and simple invitation letters, cards and e-mails." },
        { outcomeCode: "E8.1.W1", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Students will be able to write a short and simple letter apologizing and giving reasons for not attending a party in response to an invitation." },
        { outcomeCode: "E8.2.R1", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Teen Life" },
        { outcomeCode: "E8.2.W1", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Students will be able to write a short and simple paragraph about regular activities of teenagers." },
        ]
      },
      {
        id: "senaryo_3",
        name: "Senaryo 3 (6 Soru)",
        description: "MEB ÖDSGM 2026-2027 1. Dönem 1. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 3 (6 Soru) formatı (Toplam 100 Puan).",
        totalQuestions: 6,
        distributions: [
        { outcomeCode: "E8.1.R1", questionCount: 2, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Friendship" },
        { outcomeCode: "E8.1.R2", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Students will be able to understand short and simple invitation letters, cards and e-mails." },
        { outcomeCode: "E8.1.W1", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Students will be able to write a short and simple letter apologizing and giving reasons for not attending a party in response to an invitation." },
        { outcomeCode: "E8.2.R1", questionCount: 2, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Teen Life" },
        ]
      },
      {
        id: "senaryo_4",
        name: "Senaryo 4 (6 Soru)",
        description: "MEB ÖDSGM 2026-2027 1. Dönem 1. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 4 (6 Soru) formatı (Toplam 100 Puan).",
        totalQuestions: 6,
        distributions: [
        { outcomeCode: "E8.1.R1", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Friendship" },
        { outcomeCode: "E8.1.R2", questionCount: 2, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Students will be able to understand short and simple invitation letters, cards and e-mails." },
        { outcomeCode: "E8.2.R1", questionCount: 2, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Teen Life" },
        { outcomeCode: "E8.2.W1", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Students will be able to write a short and simple paragraph about regular activities of teenagers." },
        ]
      },
      {
        id: "senaryo_5",
        name: "Senaryo 5 (7 Soru)",
        description: "MEB ÖDSGM 2026-2027 1. Dönem 1. Yazılı Konu Soru Dağılım Tablosu resmi Senaryo 5 (7 Soru) formatı (Toplam 100 Puan).",
        totalQuestions: 7,
        distributions: [
        { outcomeCode: "E8.1.R1", questionCount: 2, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Friendship" },
        { outcomeCode: "E8.1.R2", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Students will be able to understand short and simple invitation letters, cards and e-mails." },
        { outcomeCode: "E8.1.W1", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Students will be able to write a short and simple letter apologizing and giving reasons for not attending a party in response to an invitation." },
        { outcomeCode: "E8.2.R1", questionCount: 2, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Teen Life" },
        { outcomeCode: "E8.2.W1", questionCount: 1, cognitiveLevel: "Basit Bilişsel Süreçler", notes: "Students will be able to write a short and simple paragraph about regular activities of teenagers." },
        ]
      },
    ],
  },
};

export function getScenarios(subjectId: SubjectId, grade: GradeLevel, _examTerm?: ExamTerm): ExamScenario[] {
  const gradeScenarios = MIDDLE_SCHOOL_OFFICIAL_SCENARIOS[grade];
  if (gradeScenarios && gradeScenarios[subjectId] && gradeScenarios[subjectId]!.length > 0) {
    return gradeScenarios[subjectId]!;
  }

  // Fallback for other stages (e.g. lise)
  return [
    {
      id: 'senaryo_1',
      name: '1. Senaryo (Temel MEBİ Formatı)',
      description: 'MEB ÖDSGM standartlarına uygun temel senaryo.',
      totalQuestions: 6,
      distributions: [
        { outcomeCode: `${subjectId.toUpperCase().slice(0, 3)}.${grade}.1.1`, questionCount: 1, cognitiveLevel: 'Basit Bilişsel Süreçler', notes: 'Özellik / Karşılaştırma Matrisi' },
        { outcomeCode: `${subjectId.toUpperCase().slice(0, 3)}.${grade}.1.2`, questionCount: 1, cognitiveLevel: 'Karmaşık Bilişsel Süreçler', notes: 'Kurgusal Vaka & Senaryo İncelemesi' },
        { outcomeCode: `${subjectId.toUpperCase().slice(0, 3)}.${grade}.1.3`, questionCount: 1, cognitiveLevel: 'Karmaşık Bilişsel Süreçler', notes: 'İki Öğrenci Arasındaki Tartışma' },
        { outcomeCode: `${subjectId.toUpperCase().slice(0, 3)}.${grade}.1.4`, questionCount: 1, cognitiveLevel: 'Basit Bilişsel Süreçler', notes: 'Gerçek Yaşam Durumu' },
        { outcomeCode: `${subjectId.toUpperCase().slice(0, 3)}.${grade}.2.1`, questionCount: 1, cognitiveLevel: 'Karmaşık Bilişsel Süreçler', notes: 'Dilemma (İkilem) Çözümü' },
        { outcomeCode: `${subjectId.toUpperCase().slice(0, 3)}.${grade}.2.2`, questionCount: 1, cognitiveLevel: 'Karmaşık Bilişsel Süreçler', notes: 'Görsel / Metin Çıkarımı' },
      ]
    },
    {
      id: 'senaryo_2',
      name: '2. Senaryo (Beceri ve Analiz Ağırlıklı)',
      description: 'Yorumlama ve akıl yürütme odaklı senaryo.',
      totalQuestions: 5,
      distributions: [
        { outcomeCode: `${subjectId.toUpperCase().slice(0, 3)}.${grade}.1.1`, questionCount: 1, cognitiveLevel: 'Basit Bilişsel Süreçler', notes: 'Kavramsal Eşleştirme' },
        { outcomeCode: `${subjectId.toUpperCase().slice(0, 3)}.${grade}.1.2`, questionCount: 2, cognitiveLevel: 'Karmaşık Bilişsel Süreçler', notes: 'Hata Tespiti & Düzeltme' },
        { outcomeCode: `${subjectId.toUpperCase().slice(0, 3)}.${grade}.2.1`, questionCount: 2, cognitiveLevel: 'Karmaşık Bilişsel Süreçler', notes: 'Çok Adımlı Modelleme' },
      ]
    }
  ];
}
