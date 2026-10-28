# -*- coding: utf-8 -*-
import json
import sys
from collections import defaultdict

with open('meb_data/clean_middle_school_matrix.json', 'r', encoding='utf-8') as f:
    matrix = json.load(f)

with open('meb_data/all_middle_school_outcomes.json', 'r', encoding='utf-8') as f:
    all_outcomes = json.load(f)

sys.path.append('scripts')
import append_grade6_din_ing_fen
from build_all_g6_distinct_perfect import G6_DEDICATED

def distribute_points(count):
    base = 100 // count
    rem = 100 % count
    return [base + (1 if i < rem else 0) for i in range(count)]

def build_grade6_exams():
    grade = '6'
    grade_exams = []
    seen_questions_by_subject = defaultdict(set)
    duplicates_found = []

    subjects = ['turkce', 'matematik', 'fen_bilimleri', 'sosyal_bilgiler', 'din_kulturu', 'ingilizce']
    subject_titles = {
        'turkce': 'Türkçe',
        'matematik': 'Matematik',
        'fen_bilimleri': 'Fen Bilimleri',
        'sosyal_bilgiler': 'Sosyal Bilgiler',
        'din_kulturu': 'Din Kültürü ve Ahlak Bilgisi',
        'ingilizce': 'İngilizce'
    }

    for subj in subjects:
        subj_matrix = matrix[subj][grade]
        sc_names = subj_matrix['scenarios']

        for sc_idx, sc_name in enumerate(sc_names):
            exam_id = f"g{grade}_{subj}_sc{sc_idx+1}"
            title = f"{grade}. Sınıf {subject_titles[subj]} 1. Dönem 1. Yazılı ({sc_name})"

            target_outcomes = []
            for out in subj_matrix['outcomes']:
                cnt = out['counts'][sc_idx]
                code = out['code']
                for inst in range(cnt):
                    target_outcomes.append((code, inst))

            total_q_count = len(target_outcomes)
            pts_list = distribute_points(total_q_count)

            questions = []
            for q_idx, (code, inst) in enumerate(target_outcomes):
                q_num = q_idx + 1
                target_pts = pts_list[q_idx]

                key = (subj, code, sc_idx, inst)
                q_data = G6_DEDICATED.get(key)
                if not q_data:
                    raise KeyError(f"Missing dedicated question for {key}")

                q_text = q_data["questionText"].strip()
                if q_text in seen_questions_by_subject[subj]:
                    duplicates_found.append((subj, sc_name, q_num, q_text))
                seen_questions_by_subject[subj].add(q_text)

                # Calibrate rubric
                raw_rubric = q_data.get("rubric", [])
                scaled_rubric = []
                if raw_rubric:
                    total_weight = sum(w for _, w in raw_rubric)
                    sub_base = target_pts // len(raw_rubric)
                    sub_rem = target_pts % len(raw_rubric)
                    for r_i, (crit_desc, _) in enumerate(raw_rubric):
                        crit_pts = sub_base + (1 if r_i < sub_rem else 0)
                        scaled_rubric.append({"criteria": crit_desc, "points": crit_pts})
                else:
                    scaled_rubric = [{"criteria": "Tam ve doğru cevap", "points": target_pts}]

                # Verify rubric sum
                assert sum(r["points"] for r in scaled_rubric) == target_pts, f"Rubric sum mismatch in {exam_id} Q{q_num}"

                out_meta = all_outcomes.get(grade, {}).get(subj, {}).get(code, {})
                out_desc = out_meta.get("title", code)

                questions.append({
                    "id": f"{exam_id}_q{q_num}",
                    "questionNumber": q_num,
                    "outcomeCode": code,
                    "outcomeDescription": out_desc,
                    "cognitiveLevel": "Uygulama" if q_idx % 2 == 1 else "Anlama",
                    "points": target_pts,
                    "contextText": q_data.get("contextText", ""),
                    "stimulus": q_data.get("stimulus", ""),
                    "questionText": q_text,
                    "solutionExplanation": q_data.get("solutionExplanation", ""),
                    "modelAnswer": q_data.get("modelAnswer", ""),
                    "rubric": scaled_rubric
                })

            exam_obj = {
                "id": exam_id,
                "grade": int(grade),
                "subject": subj,
                "subjectTitle": subject_titles[subj],
                "term": 1,
                "examNumber": 1,
                "scenario": sc_name,
                "title": title,
                "description": f"MEB 2026-2027 müfredatına tam uyumlu {subject_titles[subj]} {sc_name} yazılı sınav kağıdı.",
                "totalPoints": sum(q["points"] for q in questions),
                "durationMinutes": 40,
                "questionCount": len(questions),
                "questions": questions
            }
            assert exam_obj["totalPoints"] == 100, f"Exam {exam_id} total is {exam_obj['totalPoints']}, not 100!"
            grade_exams.append(exam_obj)

    print(f"Total Grade 6 exams generated: {len(grade_exams)}")
    if duplicates_found:
        print(f"ERROR: Found {len(duplicates_found)} duplicates in Grade 6:")
        for d in duplicates_found:
            print("  DUPLICATE:", d)
        raise AssertionError(f"Found {len(duplicates_found)} duplicates in Grade 6!")
    else:
        print("GRADE 6: 100% PERFECT 0 DUPLICATES ACROSS ALL 6 SUBJECTS!")

    with open('meb_data/all_grade6_exams.json', 'w', encoding='utf-8') as f:
        json.dump(grade_exams, f, ensure_ascii=False, indent=2)
    print("Saved to meb_data/all_grade6_exams.json")

if __name__ == "__main__":
    build_grade6_exams()
