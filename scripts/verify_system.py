import json

with open('meb_data/all_grade7_exams.json') as f:
    exams = json.load(f)

expected_scenarios = {
    'fen_bilimleri': [('senaryo_1', 9), ('senaryo_2', 7), ('senaryo_3', 8), ('senaryo_4', 6)],
    'matematik': [('senaryo_1', 7), ('senaryo_2', 5), ('senaryo_3', 7), ('senaryo_4', 6)],
    'turkce': [('senaryo_1', 7), ('senaryo_2', 6), ('senaryo_3', 7), ('senaryo_4', 7), ('senaryo_5', 6), ('senaryo_6', 6)],
    'sosyal_bilgiler': [('senaryo_1', 7), ('senaryo_2', 7), ('senaryo_3', 8), ('senaryo_4', 7), ('senaryo_5', 6)],
    'din_kulturu': [('senaryo_1', 8), ('senaryo_2', 7), ('senaryo_3', 6), ('senaryo_4', 6), ('senaryo_5', 6)],
    'ingilizce': [('senaryo_1', 4), ('senaryo_2', 5), ('senaryo_3', 6), ('senaryo_4', 7), ('senaryo_5', 8)],
}

exams_by_key = {}
for e in exams:
    exams_by_key[(e['subjectId'], e['scenarioId'])] = e

total_checked = 0
for subj, sc_list in expected_scenarios.items():
    print(f'Checking {subj}...')
    for sc_id, q_count in sc_list:
        key = (subj, sc_id)
        assert key in exams_by_key, f'Missing exam for {key}'
        e = exams_by_key[key]
        actual_len = len(e['questions'])
        assert actual_len == q_count, f'Question count mismatch for {key}: expected {q_count}, got {actual_len}'
        
        # Check point sum
        tot_pts = sum(q['points'] for q in e['questions'])
        assert tot_pts == 100, f'Total points mismatch for {key}: expected 100, got {tot_pts}'
        
        # Check rubric sum and outcomeTitle
        for q in e['questions']:
            r_sum = sum(r['points'] for r in q['rubric'])
            q_num = q['questionNumber']
            q_pts = q['points']
            assert r_sum == q_pts, f'Rubric points mismatch in {key} Q{q_num}: rubric={r_sum}, q={q_pts}'
            assert q['outcomeTitle'].startswith(q['outcomeCode']), f'Outcome title does not start with code: {q["outcomeTitle"]}'
            assert '3 farklı durum' not in q['stimulus'], f'Placeholder stimulus found in {key} Q{q_num}'
        total_checked += 1

print(f'SUCCESS! Verified all {total_checked} official MEB scenario exam papers. 0 errors, 0 placeholders, 100% exact point totals.')
