# -*- coding: utf-8 -*-
import json
import re

with open('meb_data/all_middle_school_exams.json', 'r', encoding='utf-8') as f:
    exams = json.load(f)

with open('src/data/outcomeStudyBank.ts', 'r', encoding='utf-8') as f:
    b_text = f.read()

assign_idx = b_text.find('OUTCOME_STUDY_BANK')
start_brace = b_text.find('{', assign_idx)
cleaned = b_text[start_brace:].strip().rstrip(';')
bank = json.loads(cleaned)

NAME_PAIRS = [
    ('Ahmet', 'Mehmet'),
    ('Zeynep', 'Elif'),
    ('Can', 'Burak'),
    ('Selin', 'Kerem'),
    ('Defne', 'Kaan'),
    ('Umut', 'Emre'),
    ('Aslı', 'İrem'),
    ('Tolga', 'Onur'),
    ('Derya', 'Buse'),
    ('Barış', 'Doruk'),
    ('Ece', 'Damla'),
    ('Alper', 'Kuzey')
]

SOLVER_NAMES = [
    'Sinan', 'Ayşe', 'Murat', 'Gamze', 'Oğuz', 'Pınar', 'Tarık', 'Ceren', 'Mete', 'Sude'
]

ARCHETYPE_ROTATION = [
    'Kurgusal Senaryo & Vaka İncelemesi',
    'Öğrenci Diyaloğu & Kavram Yanılgısı',
    'Durum & Özellik Matrisi (VAR/YOK/Tik)',
    'Hata Tespiti & Adım Analizi',
    'Dilemma (İkilem) & Çözüm Değerlendirme',
    'Kurgusal Senaryo & Vaka İncelemesi',
    'Görsel / Deney / Günlük Hayat Durumu',
    'Öğrenci Diyaloğu & Kavram Yanılgısı'
]

def clean_code(c):
    return c.strip()

def get_bank_item(code, subj_name):
    c = clean_code(code)
    if c in bank:
        return bank[c]
    for k in bank:
        if k.lower() == c.lower():
            return bank[k]
    # Prefix fallback
    prefix = c.split('.')[0]
    for k in bank:
        if k.startswith(prefix):
            return bank[k]
    return {
        'outcomeCode': code,
        'topicTitle': f"{subj_name} Temel Kavram Analizi",
        'quickNotes': [
            f"Kavramlar arasındaki neden-sonuç bağını kurunuz.",
            f"Öncüldeki temel şartları ve ayırt edici özellikleri analiz ediniz."
        ],
        'examTraps': [
            "İşlem sırasına ve kavram yanılgılarına karşı dikkatli olunuz."
        ],
        'solvedExample': {
            'question': f"{code} ile ilgili açık uçlu model soru.",
            'analysis': "Kavram yanılgısını bilimsel gerekçeyle çözme.",
            'solution': "Model çözüm basamakları eksiksiz sunulur."
        },
        'practiceQuestion': {
            'question': "Açık uçlu pekiştirme sorusu.",
            'hint': "Temel kurala odaklanınız."
        }
    }

def enrich_exam(ex):
    subj = ex['subjectId']
    grade = ex['grade']
    is_lang = subj in ['turkce', 'ingilizce']
    
    titles_map = {
        'turkce': 'Türkçe',
        'matematik': 'Matematik',
        'fen_bilimleri': 'Fen Bilimleri',
        'sosyal_bilgiler': 'Sosyal Bilgiler' if grade != 8 else 'T.C. İnkılap Tarihi ve Atatürkçülük',
        'din_kulturu': 'Din Kültürü ve Ahlak Bilgisi',
        'ingilizce': 'İngilizce'
    }
    subj_name = titles_map.get(subj, subj)

    new_questions = []
    pair_seed = ex['grade'] * 13 + len(ex['scenarioId'])
    
    for idx, q in enumerate(ex['questions']):
        target_archetype = ARCHETYPE_ROTATION[idx % len(ARCHETYPE_ROTATION)]
        if idx == 0 and is_lang:
            target_archetype = 'Metin İçi Delillendirme & Örtük Anlam'

        pts = q['points']
        out_code = q['outcomeCode']
        bank_item = get_bank_item(out_code, subj_name)
        topic = bank_item['topicTitle']
        notes = bank_item['quickNotes']
        traps = bank_item['examTraps']
        
        trap_text = traps[0] if traps else "Temel değişkeni göz ardı etme yanılgısı."
        trap_clean = trap_text.replace("TUZAK:", "").replace("PÜF NOKTA:", "").replace("MEB TUZAĞI:", "").strip()
        rule_text = notes[0] if notes else f"{topic} temel kuralı ve şartları."
        
        names = NAME_PAIRS[(pair_seed + idx) % len(NAME_PAIRS)]
        nameA, nameB = names[0], names[1]
        solver_name = SOLVER_NAMES[(pair_seed + idx * 3) % len(SOLVER_NAMES)]

        # Check if the existing question already has a specific dialogue or step structure
        existing_stim = q.get('stimulus', '')
        existing_qt = q.get('questionText', '')
        has_dialogue = ('"' in existing_stim and (':' in existing_stim or 'dedi' in existing_stim))
        has_steps = ('1. Adım' in existing_stim or '1. Basamak' in existing_stim or '1. Durum' in existing_stim)
        has_table = ('|' in existing_stim or 'Tablo' in existing_stim or 'Matris' in existing_stim)

        q_res = dict(q)
        q_res['archetype'] = target_archetype

        if target_archetype == 'Öğrenci Diyaloğu & Kavram Yanılgısı':
            if not has_dialogue:
                # Transform to authentic MEB dialogue
                stim = (
                    f"{topic} konusu üzerine çalışan iki öğrenci arasında şu tartışma geçmektedir:\n"
                    f"{nameA}: \"Bu durumda temel kural şudur: {trap_clean}\"\n"
                    f"{nameB}: \"Hayır {nameA}, yanılıyorsun. Çünkü kural gereği: {rule_text} Bu yüzden senin ileri sürdüğün iddia geçerli değildir.\""
                )
                qt = (
                    f"{nameA} ve {nameB}'nin iddialarını {topic} ilkeleri bakımından değerlendiriniz. "
                    f"Hangi öğrenci haklıdır? Yanılan öğrencinin kavram yanılgısını bilimsel/mantıksal gerekçesiyle açıklayınız."
                )
                ans = (
                    f"{nameB} haklıdır. Çünkü {rule_text}. "
                    f"{nameA} ise '{trap_clean}' varsayımında bulunarak temel kuralı ve şartları göz ardı etmiştir."
                )
                p1 = max(1, round(pts * 0.4))
                p2 = pts - p1
                rub = [
                    {"criterion": f"Haklı olan öğrencinin ({nameB}) doğru tespiti", "points": p1},
                    {"criterion": f"{nameA}'nın kavram yanılgısının kural ve gerekçeyle çürütülmesi", "points": p2}
                ]
                q_res['stimulus'] = stim
                q_res['questionText'] = qt
                q_res['modelAnswer'] = ans
                q_res['rubric'] = rub

        elif target_archetype == 'Hata Tespiti & Adım Analizi':
            if not has_steps:
                stim = (
                    f"{solver_name}, {topic} ile ilgili açık uçlu bir soruyu çözerken çalışma kağıdına şu adımları yazmıştır:\n"
                    f"1. Adım: Verilen öncülleri ve temel kavramları belirledim.\n"
                    f"2. Adım: {trap_clean} kabulünü yaparak işleme başladım.\n"
                    f"3. Adım: Bu adımdaki sonuca göre bağlantılı kuralı uyguladım.\n"
                    f"4. Adım: Nihai sonuca ulaştım."
                )
                qt = (
                    f"{solver_name}'in çözüm adımlarını inceleyiniz. İlk hata kaçıncı adımda yapılmıştır? "
                    f"Yapılan hatanın gerekçesini açıklayarak o adımın ve nihai cevabın doğru halini yazınız."
                )
                ans = (
                    f"İlk hata 2. adımda yapılmıştır. Çünkü {solver_name}, '{trap_clean}' hatasına düşmüştür. "
                    f"Doğrusu: {rule_text} kuralı işletilmeli ve çözüm bu esasa göre tamamlanmalıdır."
                )
                p1 = max(1, round(pts * 0.35))
                p2 = max(1, round(pts * 0.35))
                p3 = pts - (p1 + p2)
                rub = [
                    {"criterion": "İlk hatanın yapıldığı adımın (2. Adım) doğru belirlenmesi", "points": p1},
                    {"criterion": "Yapılan kavramsal/işlemsel hatanın gerekçelendirilmesi", "points": p2},
                    {"criterion": "Adımın ve sonucun doğru kurala göre düzeltilmesi", "points": p3}
                ]
                q_res['stimulus'] = stim
                q_res['questionText'] = qt
                q_res['modelAnswer'] = ans
                q_res['rubric'] = rub

        elif target_archetype == 'Durum & Özellik Matrisi (VAR/YOK/Tik)':
            if not has_table:
                stim = (
                    f"Aşağıdaki matriste {topic} konusuna yönelik üç farklı durum ve özellikleri verilmiştir:\n\n"
                    f"| Durum / Örnek | 1. Temel Kriter | 2. Ayırt Edici Özellik | Karşılar mı? |\n"
                    f"| :--- | :---: | :---: | :---: |\n"
                    f"| 1. Durum (Örnek A) | VAR | YOK | ............ |\n"
                    f"| 2. Durum (Örnek B) | VAR | VAR | ............ |\n"
                    f"| 3. Durum (Örnek C) | YOK | YOK | ............ |"
                )
                qt = (
                    f"Matristeki boşlukları özelliğin doğruluğuna göre \"EVET\" veya \"HAYIR\" yazarak doldurunuz. "
                    f"2. Durum'u diğer durumlardan ayıran en temel şartı gerekçelendirerek yazınız."
                )
                ans = (
                    f"Tablo Tamamlaması: 1. Durum: HAYIR | 2. Durum: EVET | 3. Durum: HAYIR.\n"
                    f"Ayırt Edici Gerekçe: 2. Durum hem temel kriteri hem de ayırt edici özelliği eksiksiz sağladığı için {rule_text} kuralına tam uygundur."
                )
                p1 = max(1, round(pts * 0.5))
                p2 = pts - p1
                rub = [
                    {"criterion": "Tablodaki boşlukların hatasız doldurulması (HAYIR - EVET - HAYIR)", "points": p1},
                    {"criterion": "2. Durum'un ayırt edici şartının ve kuralının açıklanması", "points": p2}
                ]
                q_res['stimulus'] = stim
                q_res['questionText'] = qt
                q_res['modelAnswer'] = ans
                q_res['rubric'] = rub

        elif target_archetype == 'Dilemma (İkilem) & Çözüm Değerlendirme':
            stim = (
                f"{topic} kapsamında karşılaşılan bir durumu çözmek için uzmanlar iki farklı yöntem geliştirmiştir:\n"
                f"1. Yöntem: Kısa vadeli hızlı çözüm sunan ancak '{trap_clean}' riskini barındıran yaklaşım.\n"
                f"2. Yöntem: Başlangıçta daha fazla dikkat ve aşama gerektiren ancak '{rule_text}' ilkesine tam uyan sürdürülebilir yaklaşım."
            )
            qt = (
                f"Verilen iki yaklaşımı {topic} ilkeleri bakımından değerlendiriniz. Hangi yöntem daha uygundur? "
                f"Seçtiğiniz yöntemin güçlü yönlerini ve diğer yöntemin taşıdığı riskleri gerekçelendiriniz."
            )
            ans = (
                f"2. Yöntem uygundur. Çünkü {rule_text} ilkesini tam olarak karşılamaktadır. "
                f"1. Yöntem ise kısa vadeli olsa da '{trap_clean}' sakıncasını doğuracağı için hedeflenen amaca ters düşer."
            )
            p1 = max(1, round(pts * 0.5))
            p2 = pts - p1
            rub = [
                {"criterion": "Doğru yaklaşımın (2. Yöntem) tespiti ve güçlü yönünün gerekçelendirilmesi", "points": p1},
                {"criterion": "1. Yöntemin taşıdığı kavramsal riskin açıklanması", "points": p2}
            ]
            q_res['stimulus'] = stim
            q_res['questionText'] = qt
            q_res['modelAnswer'] = ans
            q_res['rubric'] = rub

        elif target_archetype == 'Metin İçi Delillendirme & Örtük Anlam':
            if not has_dialogue and not has_table:
                # If question had simple prompt, upgrade
                if "tek bir cümleyle" in existing_qt or "anlamını yaz" in existing_qt:
                    qt = (
                        f"Verilen metindeki/durumdaki temel düşünceden hareketle yazarın aktarmak istediği "
                        f"örtük iletiyi açıklayınız. Metinden bu düşüncenizi destekleyen iki somut ifadeyi kanıt gösteriniz."
                    )
                    ans = (
                        f"Örtük İleti: {rule_text}\n"
                        f"Metinden Kanıtlar:\n"
                        f"1. Kanıt: Durumun manevi ve kalıcı yönünün vurgulanması.\n"
                        f"2. Kanıt: Emek verilerek üretilen değerin maddiyatla ölçülemeyeceğinin ifade edilmesi."
                    )
                    p1 = max(1, round(pts * 0.5))
                    p2 = pts - p1
                    rub = [
                        {"criterion": "Metindeki örtük iletinin doğru tespiti", "points": p1},
                        {"criterion": "Metinden iki somut kanıtın gösterilmesi", "points": p2}
                    ]
                    q_res['questionText'] = qt
                    q_res['modelAnswer'] = ans
                    q_res['rubric'] = rub

        # Validate rubric points sum exactly matches question points
        rub_sum = sum(r['points'] for r in q_res['rubric'])
        if rub_sum != pts:
            diff = pts - rub_sum
            q_res['rubric'][0]['points'] += diff

        new_questions.append(q_res)

    # Validate exam total points sum
    total_exam_pts = sum(q['points'] for q in new_questions)
    assert total_exam_pts == 100, f"Total points mismatch: {total_exam_pts}"

    return {
        **ex,
        'questions': new_questions
    }

# Process all 123 exams
enriched_exams = []
for ex in exams:
    enriched_exams.append(enrich_exam(ex))

print(f"Successfully enriched all {len(enriched_exams)} exams with balanced MEBİ archetypes!")

with open('meb_data/all_middle_school_exams.json', 'w', encoding='utf-8') as f:
    json.dump(enriched_exams, f, ensure_ascii=False, indent=2)

print("Saved enriched exams to meb_data/all_middle_school_exams.json")
