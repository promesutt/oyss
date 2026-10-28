# -*- coding: utf-8 -*-
import json
from collections import defaultdict

def merge_and_verify():
    files = [
        ('5', 'meb_data/all_grade5_exams.json', 29),
        ('6', 'meb_data/all_grade6_exams.json', 30),
        ('7', 'meb_data/all_grade7_exams.json', 29),
        ('8', 'meb_data/all_grade8_exams.json', 35),
    ]

    all_exams = []
    total_questions = 0

    for grade, path, expected_count in files:
        with open(path, 'r', encoding='utf-8') as f:
            exams = json.load(f)
        assert len(exams) == expected_count, f"Grade {grade} has {len(exams)} exams, expected {expected_count}"
        print(f"Grade {grade}: {len(exams)} exams loaded.")

        # Check for duplicates within grade by subject
        seen_questions = defaultdict(set)
        for ex in exams:
            assert ex['totalPoints'] == 100, f"Exam {ex['id']} total is {ex['totalPoints']}"
            subj = ex['subject']
            for q in ex['questions']:
                total_questions += 1
                q_text = q['questionText'].strip()
                assert q_text not in seen_questions[subj], f"Duplicate found in Grade {grade} {subj}: {q_text}"
                seen_questions[subj].add(q_text)

                # Rubric check
                rubric_sum = sum(r['points'] for r in q['rubric'])
                assert rubric_sum == q['points'], f"Rubric sum mismatch in {q['id']}: {rubric_sum} vs {q['points']}"

        all_exams.extend(exams)

    assert len(all_exams) == 123, f"Total exams is {len(all_exams)}, expected 123"
    print(f"\nSUCCESS: All {len(all_exams)} exams verified across grades 5, 6, 7, 8!")
    print(f"Total authentic questions across middle school: {total_questions}")
    print("Zero duplicates across all subjects and scenarios!")

    with open('meb_data/all_middle_school_exams.json', 'w', encoding='utf-8') as f:
        json.dump(all_exams, f, ensure_ascii=False, indent=2)
    print("Saved combined database to meb_data/all_middle_school_exams.json")

if __name__ == '__main__':
    merge_and_verify()
