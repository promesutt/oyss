import json, math

with open('meb_data/grade7_term1_exam1_clean.json') as f:
    sc_data = json.load(f)

with open('meb_data/complete_question_bank.json') as f:
    qbank = json.load(f)

# Subject names mapping
subj_names = {
    'fen_bilimleri': 'Fen Bilimleri',
    'matematik': 'Matematik',
    'turkce': 'Türkçe',
    'sosyal_bilgiler': 'Sosyal Bilgiler',
    'din_kulturu': 'Din Kültürü ve Ahlak Bilgisi',
    'ingilizce': 'İngilizce'
}

# Canonical outcome title mapping
official_titles = {
    'FB.7.1.1': 'Uzay araştırmaları için geliştirilen teknolojileri karşılaştırabilme',
    'FB.7.1.3': 'Uzay araştırmalarının yol açabileceği problemleri çözebilme',
    'FB.7.1.4': 'Yıldızların yaşamını açıklayarak yapılandırabilme',
    'FB.7.1.5': 'Yıldız, galaksi ve evren kavramlarını açıklayarak yapılandırabilme',
    'FB.7.2.1': 'Fiziksel anlamda yapılan işin bağlı olduğu faktörlere ilişkin bilimsel çıkarım yapabilme',
    'FB.7.2.2': 'Enerji çeşitlerinden kinetik ve potansiyel enerjiyi karşılaştırabilme',

    'MAT.7.1.1': 'Gerçek yaşam ya da matematiksel durumlarda doğal sayı, tam sayı ve rasyonel sayıları yorumlayabilme (a: Tam sayıları inceler, b: Tam sayıları rasyonel sayılara genişletir ve mutlak değerle sayı doğrusunda açıklar, c: Sayı doğrusu üzerinde her rasyonel sayının bir noktaya karşılık geldiğini açıklar)',
    'MAT.7.1.2': 'Gerçek yaşam durumlarında rasyonel sayıların ondalık gösterimlerini yansıtabilme (a: Bölme işlemini kullanarak her rasyonel sayının bir ondalık gösterimi olduğunu inceler)',
    'MAT.7.1.3': 'Rasyonel sayıların karşılaştırma ve sıralama ilişkilerini yorumlayabilme',
    'MAT.7.1.4': 'Rasyonel sayılar ve işlemler içeren gerçek yaşam problemlerini çözebilme',

    'T.O.7.4': 'Metinde geçen anlamını bilmediği söz varlığı unsurlarının anlamını tahmin edebilme',
    'T.O.7.5': 'Metnin yüzey anlamını belirleyebilme',
    'T.O.7.7': 'Metnin derin anlamını belirlemeye yönelik basit çıkarımlar yapabilme',
    'T.O.7.8': 'Metnin derin anlamını belirlemeye yönelik üst düzey çıkarımlar yapabilme',
    'T.O.7.14': 'Bilgilendirici metinlerde metin yapılarından hareketle önemli bilgileri belirlemeye yönelik çözümleme yapabilme',
    'T.O.7.15': 'Bilgilendirici metinde anahtar kelimeleri belirlemeye yönelik çözümleme yapabilme',
    'T.O.7.21': 'Metinden hareketle söz varlığını geliştirmeye yönelik çözümleme yapabilme',
    'T.Y.7.3': 'Yazısında içerik ve yapıya yönelik seçimlerini yönetebilme',
    'T.Y.7.18': 'Yazısını zenginleştirecek biçimde söz varlığını kullanabilme',
    'T.Y.7.21': 'Yazım kuralları ve noktalama işaretlerini uygulayabilme',

    'SB.7.1.1': 'Dâhil olduğu gruplarda ve sosyal hayatta etkili iletişimin önemini sorgulayabilme',
    'SB.7.1.2': 'Özel gereksinimli bireyler için fırsat eşitliğini sürdürmeye yönelik fikir üretebilme',
    'SB.7.1.3': 'Türk toplumunun millî meseleler karşısında gösterdiği tutum ve davranışlara ilişkin çıkarım yapabilme',
    'SB.7.2.1': 'Küreselleşmenin insan ve toplum hayatında meydana getirdiği değişimi yorumlayabilme',

    'DKAB.7.1.1': 'Melekleri sınıflandırabilme',
    'DKAB.7.1.2': 'Ahiret hayatının aşamalarını çözümleyebilme',
    'DKAB.7.1.3': 'Melek ve ahiret inancının insana kazandırdıkları konusunda analitik düşünebilme',
    'DKAB.7.1.4': 'Nâs suresini ve bu surenin anlamını okuyarak yorumlayabilme',
    'DKAB.7.2.1': 'Hac ve umre ibadetlerini çözümleyebilme',

    'E7.1.R1': 'Students will be able to understand a simple text about appearances, personalities, and comparisons including explanations and reasons.',
    'E7.1.W1': 'Students will be able to write simple pieces to compare people.',
    'E7.2.R1': 'Students will be able to understand short and simple texts on sports.',
    'E7.2.W1': 'Students will be able to write pieces about routines/daily activities by using frequency adverbs.',
}

def distribute_points(count):
    base = 100 // count
    rem = 100 % count
    return [base + (1 if i < rem else 0) for i in range(count)]

def scale_rubric(rubric, target_pts):
    if not rubric:
        return [{'criterion': 'Doğru ve eksiksiz çözüm', 'points': target_pts}]
    if len(rubric) == 1:
        return [{'criterion': rubric[0]['criterion'], 'points': target_pts}]
    
    total_orig = sum(r['points'] for r in rubric) or 1
    scaled = []
    current_sum = 0
    for idx, r in enumerate(rubric):
        if idx == len(rubric) - 1:
            pts = target_pts - current_sum
        else:
            pts = max(1, round((r['points'] / total_orig) * target_pts))
            current_sum += pts
        scaled.append({
            'criterion': r['criterion'],
            'points': pts
        })
    return scaled

exam_papers = []

for subj_id, info in sc_data.items():
    scenarios = info['scenarios']
    subj_name = subj_names.get(subj_id, subj_id)
    
    for sc_idx, sc_name in enumerate(scenarios):
        sc_num = sc_idx + 1
        sc_id = f'senaryo_{sc_num}'
        exam_id = f'exam_7_{subj_id}_1_1_{sc_id}'
        
        # Build question list based on outcome counts in this scenario
        scenario_questions = []
        for o in info['outcomes']:
            cnt = o['counts'][sc_idx]
            if cnt > 0:
                raw_code = o['outcome_raw'].split()[0].rstrip('.')
                if raw_code == 'SB':
                    raw_code = 'SB.7.1.1'
                
                # Retrieve questions from qbank for this code
                available = qbank.get(raw_code, [])
                if not available:
                    print(f'Warning: no questions for {raw_code}')
                    continue
                
                # Pick cnt questions from available (with scenario offset for variation)
                for q_i in range(cnt):
                    q_idx = (sc_idx + q_i) % len(available)
                    source_q = available[q_idx]
                    scenario_questions.append({
                        'outcomeCode': raw_code,
                        'source': source_q
                    })
        
        tot_q = len(scenario_questions)
        point_allocations = distribute_points(tot_q)
        
        final_questions = []
        for q_num, item in enumerate(scenario_questions, 1):
            q_src = item['source']
            code = item['outcomeCode']
            pts = point_allocations[q_num - 1]
            title = official_titles.get(code, code)
            scaled_rub = scale_rubric(q_src.get('rubric', []), pts)
            
            final_questions.append({
                'questionNumber': q_num,
                'outcomeCode': code,
                'outcomeTitle': f'{code}. {title}',
                'difficulty': q_src.get('difficulty', 'Orta'),
                'cognitiveLevel': q_src.get('cognitiveLevel', 'Karmaşık Bilişsel Süreçler'),
                'archetype': q_src.get('archetype', 'Kurgusal Senaryo & Vaka İncelemesi'),
                'points': pts,
                'contextText': q_src.get('contextText', ''),
                'stimulus': q_src.get('stimulus', ''),
                'questionText': q_src.get('questionText', ''),
                'solutionExplanation': q_src.get('solutionExplanation', ''),
                'modelAnswer': q_src.get('modelAnswer', ''),
                'rubric': scaled_rub
            })
            
        exam_papers.append({
            'id': exam_id,
            'grade': 7,
            'subjectId': subj_id,
            'examTerm': '1_donem_1_yazili',
            'scenarioId': sc_id,
            'title': f'7. Sınıf {subj_name} 1. Dönem 1. Ortak Yazılı Sınavı ({sc_name})',
            'durationMinutes': 40,
            'totalPoints': 100,
            'instructions': [
                f'Bu sınav MEB Temel Eğitim Genel Müdürlüğü ve ÖDSGM 2026-2027 Konu Soru Dağılım Tablosu ({sc_name} - {tot_q} Soru) esas alınarak hazırlanmıştır.',
                'Sınav süresi 40 dakikadır. Sınav toplam 100 puan üzerinden değerlendirilir.',
                'Sorularda verilen durum, vaka ve veri tablolarını dikkatlice analiz ederek gerekçeli açık uçlu cevaplarınızı yazınız.',
                'Puanlamada MEB Analitik Dereceli Puanlama Anahtarı (Rubrik) basamakları esas alınacaktır.'
            ],
            'questions': final_questions
        })

print(f'Total exam papers built: {len(exam_papers)}')
for ep in exam_papers:
    q_sum = sum(q['points'] for q in ep['questions'])
    print(f"{ep['id']}: {len(ep['questions'])} questions, total points = {q_sum}")

# Now serialize to TypeScript
with open('meb_data/all_grade7_exams.json', 'w', encoding='utf-8') as f:
    json.dump(exam_papers, f, ensure_ascii=False, indent=2)
print('Saved all_grade7_exams.json')
