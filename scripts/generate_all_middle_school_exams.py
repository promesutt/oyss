import json

with open('meb_data/clean_middle_school_matrix.json') as f:
    matrix = json.load(f)

with open('meb_data/all_middle_school_outcomes.json') as f:
    outcomes_meta = json.load(f)

# Also load existing grade 7 authentic questions so we preserve them 100%
with open('meb_data/complete_question_bank.json') as f:
    grade7_qbank = json.load(f)

print('Loaded matrix and outcomes.')
