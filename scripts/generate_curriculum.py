import json

with open('meb_data/grade7_term1_exam1_clean.json') as f:
    data = json.load(f)

official_outcomes = {
    'FB.7.1.1': {'title': 'Uzay araştırmaları için geliştirilen teknolojileri karşılaştırabilme', 'level': 'Basit Bilişsel Süreçler', 'unit': '1. ÜNİTE: UZAY ÇAĞI', 'topic': 'Türkiye ve Uzay Araştırmaları'},
    'FB.7.1.3': {'title': 'Uzay araştırmalarının yol açabileceği problemleri çözebilme', 'level': 'Karmaşık Bilişsel Süreçler', 'unit': '1. ÜNİTE: UZAY ÇAĞI', 'topic': 'Türkiye ve Uzay Araştırmaları'},
    'FB.7.1.4': {'title': 'Yıldızların yaşamını açıklayarak yapılandırabilme', 'level': 'Basit Bilişsel Süreçler', 'unit': '1. ÜNİTE: UZAY ÇAĞI', 'topic': 'Uzayda Neler Var?'},
    'FB.7.1.5': {'title': 'Yıldız, galaksi ve evren kavramlarını açıklayarak yapılandırabilme', 'level': 'Basit Bilişsel Süreçler', 'unit': '1. ÜNİTE: UZAY ÇAĞI', 'topic': 'Uzayda Neler Var?'},
    'FB.7.2.1': {'title': 'Fiziksel anlamda yapılan işin bağlı olduğu faktörlere ilişkin bilimsel çıkarım yapabilme', 'level': 'Karmaşık Bilişsel Süreçler', 'unit': '2. ÜNİTE: KUVVET VE ENERJİYİ KEŞFEDELİM', 'topic': 'Kuvvet, İş ve Enerji İlişkisi'},
    'FB.7.2.2': {'title': 'Enerji çeşitlerinden kinetik ve potansiyel enerjiyi karşılaştırabilme', 'level': 'Karmaşık Bilişsel Süreçler', 'unit': '2. ÜNİTE: KUVVET VE ENERJİYİ KEŞFEDELİM', 'topic': 'Kuvvet, İş ve Enerji İlişkisi'},

    'MAT.7.1.1': {'title': 'Gerçek yaşam ya da matematiksel durumlarda doğal sayı, tam sayı ve rasyonel sayıları yorumlayabilme (a: Tam sayıları inceler, b: Tam sayıları rasyonel sayılara genişletir ve mutlak değerle sayı doğrusunda açıklar, c: Sayı doğrusu üzerinde her rasyonel sayının bir noktaya karşılık geldiğini açıklar)', 'level': 'Basit Bilişsel Süreçler', 'unit': 'SAYILAR VE NİCELİKLER (1)', 'topic': 'Tam Sayılar Rasyonel Sayılar ve Farklı Temsilleri'},
    'MAT.7.1.2': {'title': 'Gerçek yaşam durumlarında rasyonel sayıların ondalık gösterimlerini yansıtabilme (a: Bölme işlemini kullanarak her rasyonel sayının bir ondalık gösterimi olduğunu inceler)', 'level': 'Basit Bilişsel Süreçler', 'unit': 'SAYILAR VE NİCELİKLER (1)', 'topic': 'Rasyonel Sayılar ve Farklı Temsilleri'},
    'MAT.7.1.3': {'title': 'Rasyonel sayıların karşılaştırma ve sıralama ilişkilerini yorumlayabilme', 'level': 'Karmaşık Bilişsel Süreçler', 'unit': 'SAYILAR VE NİCELİKLER (1)', 'topic': 'Rasyonel Sayılar ve Farklı Temsilleri'},
    'MAT.7.1.4': {'title': 'Rasyonel sayılar ve işlemler içeren gerçek yaşam problemlerini çözebilme', 'level': 'Karmaşık Bilişsel Süreçler', 'unit': 'SAYILAR VE NİCELİKLER (1)', 'topic': 'Rasyonel Sayılarla İşlemler ve Problem Çözme'},

    'T.O.7.4': {'title': 'Metinde geçen anlamını bilmediği söz varlığı unsurlarının anlamını tahmin edebilme', 'level': 'Basit Bilişsel Süreçler', 'unit': 'OKUMA', 'topic': 'Söz Varlığı'},
    'T.O.7.5': {'title': 'Metnin yüzey anlamını belirleyebilme', 'level': 'Basit Bilişsel Süreçler', 'unit': 'OKUMA', 'topic': 'Anlama ve Kavrama'},
    'T.O.7.7': {'title': 'Metnin derin anlamını belirlemeye yönelik basit çıkarımlar yapabilme', 'level': 'Karmaşık Bilişsel Süreçler', 'unit': 'OKUMA', 'topic': 'Çıkarım Yapma'},
    'T.O.7.8': {'title': 'Metnin derin anlamını belirlemeye yönelik üst düzey çıkarımlar yapabilme', 'level': 'Karmaşık Bilişsel Süreçler', 'unit': 'OKUMA', 'topic': 'Örtük Anlam ve Yorum'},
    'T.O.7.14': {'title': 'Bilgilendirici metinlerde metin yapılarından hareketle önemli bilgileri belirlemeye yönelik çözümleme yapabilme', 'level': 'Karmaşık Bilişsel Süreçler', 'unit': 'OKUMA', 'topic': 'Metin Yapısı'},
    'T.O.7.15': {'title': 'Bilgilendirici metinde anahtar kelimeleri belirlemeye yönelik çözümleme yapabilme', 'level': 'Basit Bilişsel Süreçler', 'unit': 'OKUMA', 'topic': 'Anahtar Kavramlar'},
    'T.O.7.21': {'title': 'Metinden hareketle söz varlığını geliştirmeye yönelik çözümleme yapabilme', 'level': 'Karmaşık Bilişsel Süreçler', 'unit': 'OKUMA', 'topic': 'Söz Varlığını Zenginleştirme'},
    'T.Y.7.3': {'title': 'Yazısında içerik ve yapıya yönelik seçimlerini yönetebilme', 'level': 'Karmaşık Bilişsel Süreçler', 'unit': 'YAZMA', 'topic': 'Yazma Stratejileri'},
    'T.Y.7.18': {'title': 'Yazısını zenginleştirecek biçimde söz varlığını kullanabilme', 'level': 'Karmaşık Bilişsel Süreçler', 'unit': 'YAZMA', 'topic': 'İfade ve Üslup'},
    'T.Y.7.21': {'title': 'Yazım kuralları ve noktalama işaretlerini uygulayabilme', 'level': 'Basit Bilişsel Süreçler', 'unit': 'YAZMA', 'topic': 'Dil Bilgisi ve Yazım Kuralları'},

    'SB.7.1.1': {'title': 'Dâhil olduğu gruplarda ve sosyal hayatta etkili iletişimin önemini sorgulayabilme', 'level': 'Basit Bilişsel Süreçler', 'unit': 'BİRLİKTE YAŞAMAK', 'topic': 'Gruplarda ve Sosyal Hayatta İletişimin Önemi'},
    'SB.7.1.2': {'title': 'Özel gereksinimli bireyler için fırsat eşitliğini sürdürmeye yönelik fikir üretebilme', 'level': 'Karmaşık Bilişsel Süreçler', 'unit': 'BİRLİKTE YAŞAMAK', 'topic': 'Özel Gereksinimli Bireyler İçin Fırsat Eşitliği'},
    'SB.7.1.3': {'title': 'Türk toplumunun millî meseleler karşısında gösterdiği tutum ve davranışlara ilişkin çıkarım yapabilme', 'level': 'Karmaşık Bilişsel Süreçler', 'unit': 'BİRLİKTE YAŞAMAK', 'topic': 'Millî Meseleler Karşısında Türk Toplumunun Tutum ve Davranışları'},
    'SB.7.2.1': {'title': 'Küreselleşmenin insan ve toplum hayatında meydana getirdiği değişimi yorumlayabilme', 'level': 'Karmaşık Bilişsel Süreçler', 'unit': 'EVİMİZ DÜNYA', 'topic': 'Küreselleşmenin İnsan ve Toplum Hayatına Etkisi'},

    'DKAB.7.1.1': {'title': 'Melekleri sınıflandırabilme', 'level': 'Basit Bilişsel Süreçler', 'unit': 'MELEK VE AHİRET İNANCI', 'topic': 'Varlıklar Âlemi'},
    'DKAB.7.1.2': {'title': 'Ahiret hayatının aşamalarını çözümleyebilme', 'level': 'Karmaşık Bilişsel Süreçler', 'unit': 'MELEK VE AHİRET İNANCI', 'topic': 'Dünya ve Ahiret Hayatı'},
    'DKAB.7.1.3': {'title': 'Melek ve ahiret inancının insana kazandırdıkları konusunda analitik düşünebilme', 'level': 'Karmaşık Bilişsel Süreçler', 'unit': 'MELEK VE AHİRET İNANCI', 'topic': 'Melek ve Ahiret İnancının İnsana Kazandırdıkları'},
    'DKAB.7.1.4': {'title': 'Nâs suresini ve bu surenin anlamını okuyarak yorumlayabilme', 'level': 'Basit Bilişsel Süreçler', 'unit': 'MELEK VE AHİRET İNANCI', 'topic': 'Bir Sure Öğreniyorum: Nâs Suresi'},
    'DKAB.7.2.1': {'title': 'Hac ve umre ibadetlerini çözümleyebilme', 'level': 'Karmaşık Bilişsel Süreçler', 'unit': 'HAC, UMRE VE KURBAN', 'topic': 'Hac ve Umre İbadeti'},

    'E7.1.R1': {'title': 'Students will be able to understand a simple text about appearances, personalities, and comparisons including explanations and reasons.', 'level': 'Basit Bilişsel Süreçler', 'unit': 'Appearance And Personality', 'topic': 'Reading'},
    'E7.1.W1': {'title': 'Students will be able to write simple pieces to compare people.', 'level': 'Karmaşık Bilişsel Süreçler', 'unit': 'Appearance And Personality', 'topic': 'Writing'},
    'E7.2.R1': {'title': 'Students will be able to understand short and simple texts on sports.', 'level': 'Basit Bilişsel Süreçler', 'unit': 'Sports', 'topic': 'Reading'},
    'E7.2.W1': {'title': 'Students will be able to write pieces about routines/daily activities by using frequency adverbs.', 'level': 'Karmaşık Bilişsel Süreçler', 'unit': 'Sports', 'topic': 'Writing'},
}

notes_map = {
    'FB.7.1.1': 'Uzay Teknolojileri ve Gözlemevi Şartları (Tablo/Karşılaştırma)',
    'FB.7.1.3': 'Uzay Kirliliği ve Enkaz Yönetimi (Vaka İncelemesi/İkilem)',
    'FB.7.1.4': 'Yıldızların Yaşam Döngüsü ve Bulutsu Aşamaları',
    'FB.7.1.5': 'Yıldız, Galaksi ve Evren Büyüklük Hiyerarşisi',
    'FB.7.2.1': 'Fiziksel İş Koşulları (Kuvvet x Yol ve Doğrultu Analizi)',
    'FB.7.2.2': 'Kinetik ve Potansiyel Enerji Dönüşümü (Sürtünme ve Yükseklik)',
    'MAT.7.1.1': 'Tam Sayılar ve Rasyonel Sayıları Sayı Doğrusunda Yorumlama (a, b, c)',
    'MAT.7.1.2': 'Rasyonel Sayıların Ondalık ve Devirli Gösterimi (a)',
    'MAT.7.1.3': 'Rasyonel Sayılarda Karşılaştırma ve Sıralama Hatalarını Analiz Etme',
    'MAT.7.1.4': 'Rasyonel Sayılarla Çok Adımlı Gerçek Yaşam Problemleri',
    'T.O.7.4': 'Metin Bağlamından Bilinmeyen Sözcüğün Anlamını Tahmin Etme',
    'T.O.7.5': 'Metnin Yüzey Anlamı, Ana Fikri ve Yardımcı Fikirleri',
    'T.O.7.7': 'Metnin Derin Anlamına Yönelik Basit Çıkarımlar Yapma',
    'T.O.7.8': 'Metnin Derin Anlamına Yönelik Üst Düzey Çıkarımlar ve Örtük Anlam',
    'T.O.7.14': 'Bilgilendirici Metin Yapılarını ve Önemli Bilgileri Çözümleme',
    'T.O.7.15': 'Metindeki Anahtar Kelimeleri ve Kavramsal Ağı Çözümleme',
    'T.O.7.21': 'Söz Varlığı Geliştirme (Deyim, Atasözü ve Mecaz Anlamlar)',
    'T.Y.7.3': 'Yazıda İçerik ve Yapı Seçimlerini Yönetme (Giriş-Gelişme-Sonuç)',
    'T.Y.7.18': 'Yazıyı Zenginleştirecek Benzetme ve Özgün Söz Varlığı Kullanımı',
    'T.Y.7.21': 'Yazım Kuralları ve Noktalama İşaretleri (İkilemeler, Noktalı Virgül, Üç Nokta)',
    'SB.7.1.1': 'Etkili İletişim: Sen Dili - Ben Dili Dönüşümü ve Empati',
    'SB.7.1.2': 'Özel Gereksinimli Bireyler İçin Fırsat Eşitliği ve Çözüm Projeleri',
    'SB.7.1.3': 'Millî Meseleler Karşısında Türk Toplumunun Dayanışma Tutumu',
    'SB.7.2.1': 'Küreselleşmenin İletişim ve Kültürel Etkileşime Etkisi',
    'DKAB.7.1.1': 'Melekleri ve Görünmeyen Varlıkları Sınıflandırma (4 Büyük Melek vb.)',
    'DKAB.7.1.2': 'Ahiret Hayatının Aşamaları (Berzah, Ba\'s, Haşir, Mizan, Cennet/Cehennem)',
    'DKAB.7.1.3': 'Melek ve Ahiret İnancının Birey Vicdanı ve Davranışına Katkısı',
    'DKAB.7.1.4': 'Nâs Suresinin Anlamı ve Kötülüklerden Sığınma Bilinci',
    'DKAB.7.2.1': 'Hac ve Umre İbadetlerinin Mahiyeti ve Sembolik Anlamları',
    'E7.1.R1': 'Reading Comprehension: Physical Appearance & Personality Descriptions',
    'E7.1.W1': 'Written Comparison: Comparative Sentences (-er / more... than)',
    'E7.2.R1': 'Reading Comprehension: Sports, Rules, Equipment and Routine Activities',
    'E7.2.W1': 'Written Production: Daily Sports Routines with Frequency Adverbs'
}

ts_lines = []
ts_lines.append("""import { GradeLevel, SubjectId, ExamTerm, ExamScenario, SchoolStage, CognitiveLevel } from '../types';

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
  // Ortaokul (TYMM Kapsamında: 5, 6, 7)
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

export const OFFICIAL_OUTCOMES_GRADE_7: Record<string, OfficialOutcomeMeta> = {""")

for code, meta in official_outcomes.items():
    title_esc = meta['title'].replace("'", "\\'")
    unit_esc = meta['unit'].replace("'", "\\'")
    topic_esc = meta['topic'].replace("'", "\\'")
    ts_lines.append(f"  '{code}': {{")
    ts_lines.append(f"    code: '{code}',")
    ts_lines.append(f"    unit: '{unit_esc}',")
    ts_lines.append(f"    topic: '{topic_esc}',")
    ts_lines.append(f"    canonicalTitle: '{title_esc}',")
    ts_lines.append(f"    cognitiveLevel: '{meta['level']}'")
    ts_lines.append("  },")

ts_lines.append("""};

export function getOfficialOutcomeTitle(code: string): string {
  const normalized = code.trim().replace('SB ', 'SB.');
  if (OFFICIAL_OUTCOMES_GRADE_7[normalized]) {
    return `${normalized}. ${OFFICIAL_OUTCOMES_GRADE_7[normalized].canonicalTitle}`;
  }
  return code;
}

// 7. Sınıf 1. Dönem 1. Yazılı MEB ÖDSGM Resmi Senaryo Matrisi
export const GRADE_7_OFFICIAL_SCENARIOS: Record<string, ExamScenario[]> = {""")

for subj, info in data.items():
    ts_lines.append(f"  '{subj}': [")
    for sc_idx, sc_name in enumerate(info['scenarios']):
        sc_num = sc_idx + 1
        sc_id = f"senaryo_{sc_num}"
        
        dist_items = []
        tot_q = 0
        for o in info['outcomes']:
            cnt = o['counts'][sc_idx]
            if cnt > 0:
                raw_code = o['outcome_raw'].split()[0].rstrip('.')
                if raw_code == 'SB':
                    raw_code = 'SB.7.1.1'
                meta = official_outcomes.get(raw_code, {'level': 'Karmaşık Bilişsel Süreçler'})
                note = notes_map.get(raw_code, 'Kavramsal Süreçler')
                note_esc = note.replace("'", "\\'")
                dist_items.append(f"      {{ outcomeCode: '{raw_code}', questionCount: {cnt}, cognitiveLevel: '{meta['level']}', notes: '{note_esc}' }},")
                tot_q += cnt
                
        ts_lines.append("    {")
        ts_lines.append(f"      id: '{sc_id}',")
        ts_lines.append(f"      name: '{sc_name} ({tot_q} Soru)',")
        ts_lines.append(f"      description: 'MEB ÖDSGM 2026-2027 1. Dönem 1. Yazılı Konu Soru Dağılım Tablosu resmi {sc_name} formatı ({tot_q} Soru, 100 Puan).',")
        ts_lines.append(f"      totalQuestions: {tot_q},")
        ts_lines.append("      distributions: [")
        for di in dist_items:
            ts_lines.append(di)
        ts_lines.append("      ]")
        ts_lines.append("    },")
    ts_lines.append("  ],")

ts_lines.append("""};

export function getScenarios(subjectId: SubjectId, grade: GradeLevel, _examTerm?: ExamTerm): ExamScenario[] {
  if (grade === 7 && GRADE_7_OFFICIAL_SCENARIOS[subjectId]) {
    return GRADE_7_OFFICIAL_SCENARIOS[subjectId];
  }

  // Fallback for other grades/terms
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
""")

with open('src/data/curriculumData.ts', 'w', encoding='utf-8') as f:
    f.write('\n'.join(ts_lines))

print('curriculumData.ts successfully written!')
