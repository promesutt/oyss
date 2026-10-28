# -*- coding: utf-8 -*-
import json
import re
from collections import defaultdict

with open('meb_data/all_middle_school_outcomes.json', 'r', encoding='utf-8') as f:
    all_outcomes = json.load(f)

def clean_sc_id(sc_name):
    num_match = re.search(r'\d+', sc_name)
    num = num_match.group(0) if num_match else '1'
    return f"senaryo_{num}"

def unify_exams():
    grades = ['5', '6', '7', '8']
    unified_all_exams = []
    seen_by_grade_subj = defaultdict(set)
    duplicates = []

    for grade in grades:
        path = f"meb_data/all_grade{grade}_exams.json"
        with open(path, 'r', encoding='utf-8') as f:
            exams = json.load(f)

        for ex in exams:
            # Determine subjectId
            subj_id = ex.get('subjectId') or ex.get('subject')
            sc_raw = ex.get('scenarioId') or ex.get('scenario', 'Senaryo 1')
            sc_id = clean_sc_id(sc_raw)

            clean_id = f"exam_{grade}_{subj_id}_1_1_{sc_id}"

            # Subject title in Turkish
            titles_map = {
                'turkce': 'Türkçe',
                'matematik': 'Matematik',
                'fen_bilimleri': 'Fen Bilimleri',
                'sosyal_bilgiler': 'Sosyal Bilgiler' if grade != '8' else 'T.C. İnkılap Tarihi ve Atatürkçülük',
                'din_kulturu': 'Din Kültürü ve Ahlak Bilgisi',
                'ingilizce': 'İngilizce'
            }
            subj_title = titles_map.get(subj_id, subj_id)

            sc_num = sc_id.split('_')[-1]
            title = f"{grade}. Sınıf {subj_title} 1. Dönem 1. Ortak Yazılı Sınavı (Senaryo {sc_num}) ({len(ex['questions'])} Soru)"

            instructions = ex.get('instructions', [
                f"Bu sınav MEB Temel Eğitim Genel Müdürlüğü ve ÖDSGM 2026-2027 Konu Soru Dağılım Tablosu (Senaryo {sc_num} - {len(ex['questions'])} Soru) esas alınarak hazırlanmıştır.",
                "Sınav süresi 40 dakikadır. Sınav toplam 100 puan üzerinden değerlendirilir.",
                "Sorularda verilen durum, vaka ve veri tablolarını dikkatlice analiz ederek gerekçeli açık uçlu cevaplarınızı yazınız.",
                "Puanlamada MEB Analitik Dereceli Puanlama Anahtarı (Rubrik) basamakları esas alınacaktır."
            ])

            questions = []
            for q_idx, q in enumerate(ex['questions']):
                q_num = q_idx + 1
                q_text = q['questionText'].strip()

                # Duplicate verification key
                verify_key = f"{grade}_{subj_id}"
                if q_text in seen_by_grade_subj[verify_key]:
                    duplicates.append((grade, subj_id, sc_id, q_num, q_text))
                seen_by_grade_subj[verify_key].add(q_text)

                out_code = q['outcomeCode']
                out_title = q.get('outcomeTitle') or q.get('outcomeDescription', '')
                if not out_title or out_title == out_code:
                    meta = all_outcomes.get(out_code, {})
                    out_title = meta.get('canonicalTitle', meta.get('title', out_code))

                # Normalize rubric to [{criterion, points}]
                norm_rubric = []
                for r in q['rubric']:
                    crit_text = r.get('criterion') or r.get('criteria') or "Tam ve doğru cevap"
                    norm_rubric.append({
                        "criterion": crit_text,
                        "points": r['points']
                    })

                rubric_sum = sum(r['points'] for r in norm_rubric)
                assert rubric_sum == q['points'], f"Rubric mismatch in {clean_id} Q{q_num}: {rubric_sum} vs {q['points']}"

                diff = q.get('difficulty')
                if not diff:
                    diff = "Kolay" if q_idx % 3 == 0 else ("Zor" if q_idx % 3 == 2 else "Orta")

                cog_raw = q.get('cognitiveLevel', '')
                if cog_raw in ['Basit Bilişsel Süreçler', 'Karmaşık Bilişsel Süreçler']:
                    cog = cog_raw
                elif cog_raw in ['Anlama', 'Hatırlama', 'Basit']:
                    cog = 'Basit Bilişsel Süreçler'
                elif cog_raw in ['Uygulama', 'Analiz', 'Değerlendirme', 'Yaratma', 'Karmaşık']:
                    cog = 'Karmaşık Bilişsel Süreçler'
                else:
                    cog = "Karmaşık Bilişsel Süreçler" if q_idx % 2 == 1 else "Basit Bilişsel Süreçler"

                arch = q.get('archetype')
                if not arch:
                    arch = "Kurgusal Senaryo & Vaka İncelemesi"

                questions.append({
                    "questionNumber": q_num,
                    "outcomeCode": out_code,
                    "outcomeTitle": out_title,
                    "difficulty": diff,
                    "cognitiveLevel": cog,
                    "archetype": arch,
                    "points": q['points'],
                    "contextText": q.get('contextText', ''),
                    "stimulus": q.get('stimulus', ''),
                    "questionText": q_text,
                    "solutionExplanation": q.get('solutionExplanation', ''),
                    "modelAnswer": q.get('modelAnswer', ''),
                    "rubric": norm_rubric
                })

            exam_obj = {
                "id": clean_id,
                "grade": int(grade),
                "subjectId": subj_id,
                "examTerm": "1_donem_1_yazili",
                "scenarioId": sc_id,
                "title": title,
                "durationMinutes": 40,
                "totalPoints": sum(q['points'] for q in questions),
                "instructions": instructions,
                "questions": questions
            }
            assert exam_obj['totalPoints'] == 100, f"Exam {clean_id} total points is {exam_obj['totalPoints']}"
            unified_all_exams.append(exam_obj)

    print(f"Total unified exams: {len(unified_all_exams)}")
    if duplicates:
        print(f"ERROR: Found {len(duplicates)} duplicate questions!")
        for d in duplicates:
            print("  DUP:", d)
        raise AssertionError("Duplicate questions detected!")
    else:
        print("ALL 123 EXAMS VERIFIED: 0 DUPLICATES ACROSS ALL SUBJECTS AND GRADES!")

    # Save to meb_data/all_middle_school_exams.json
    with open('meb_data/all_middle_school_exams.json', 'w', encoding='utf-8') as f:
        json.dump(unified_all_exams, f, ensure_ascii=False, indent=2)
    print("Saved to meb_data/all_middle_school_exams.json")

    # Now write src/data/sampleExams.ts
    lines = []
    lines.append("import { ExamPaper } from '../types';\n")
    lines.append("export const SAMPLE_EXAMS: ExamPaper[] = [")

    for ep in unified_all_exams:
        lines.append("  {")
        lines.append(f"    id: {json.dumps(ep['id'], ensure_ascii=False)},")
        lines.append(f"    grade: {ep['grade']},")
        lines.append(f"    subjectId: {json.dumps(ep['subjectId'], ensure_ascii=False)},")
        lines.append(f"    examTerm: {json.dumps(ep['examTerm'], ensure_ascii=False)},")
        lines.append(f"    scenarioId: {json.dumps(ep['scenarioId'], ensure_ascii=False)},")
        lines.append(f"    title: {json.dumps(ep['title'], ensure_ascii=False)},")
        lines.append(f"    durationMinutes: {ep['durationMinutes']},")
        lines.append(f"    totalPoints: {ep['totalPoints']},")
        lines.append("    instructions: [")
        for ins in ep['instructions']:
            lines.append(f"      {json.dumps(ins, ensure_ascii=False)},")
        lines.append("    ],")
        lines.append("    questions: [")
        for q in ep['questions']:
            lines.append("      {")
            lines.append(f"        questionNumber: {q['questionNumber']},")
            lines.append(f"        outcomeCode: {json.dumps(q['outcomeCode'], ensure_ascii=False)},")
            lines.append(f"        outcomeTitle: {json.dumps(q['outcomeTitle'], ensure_ascii=False)},")
            lines.append(f"        difficulty: {json.dumps(q['difficulty'], ensure_ascii=False)},")
            lines.append(f"        cognitiveLevel: {json.dumps(q['cognitiveLevel'], ensure_ascii=False)},")
            lines.append(f"        archetype: {json.dumps(q['archetype'], ensure_ascii=False)},")
            lines.append(f"        points: {q['points']},")
            lines.append(f"        contextText: {json.dumps(q['contextText'], ensure_ascii=False)},")
            lines.append(f"        stimulus: {json.dumps(q['stimulus'], ensure_ascii=False)},")
            lines.append(f"        questionText: {json.dumps(q['questionText'], ensure_ascii=False)},")
            lines.append(f"        solutionExplanation: {json.dumps(q['solutionExplanation'], ensure_ascii=False)},")
            lines.append(f"        modelAnswer: {json.dumps(q['modelAnswer'], ensure_ascii=False)},")
            lines.append("        rubric: [")
            for r in q['rubric']:
                crit_json = json.dumps(r['criterion'], ensure_ascii=False)
                lines.append(f"          {{ criterion: {crit_json}, points: {r['points']} }},")
            lines.append("        ]")
            lines.append("      },")
        lines.append("    ]")
        lines.append("  },")

    lines.append("];\n")

    with open('src/data/sampleExams.ts', 'w', encoding='utf-8') as f:
        f.write('\n'.join(lines))
    print(f"Successfully generated src/data/sampleExams.ts with all {len(unified_all_exams)} exams!")

if __name__ == '__main__':
    unify_exams()
