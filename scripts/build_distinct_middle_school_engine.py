# -*- coding: utf-8 -*-
import json
from collections import defaultdict

with open('meb_data/clean_middle_school_matrix.json', 'r', encoding='utf-8') as f:
    matrix = json.load(f)

with open('meb_data/all_middle_school_outcomes.json', 'r', encoding='utf-8') as f:
    outcomes_meta = json.load(f)

# Load already verified 100% distinct Grade 7 exams
with open('meb_data/all_grade7_exams.json', 'r', encoding='utf-8') as f:
    grade7_exams = json.load(f)

# Load already verified 100% distinct Grade 5 Türkçe exams
with open('meb_data/grade5_turkce_distinct.json', 'r', encoding='utf-8') as f:
    grade5_turkce_exams = json.load(f)

def distribute_points(count):
    if count <= 0:
        return []
    base = 100 // count
    rem = 100 % count
    return [base + (1 if i < rem else 0) for i in range(count)]

print("Loaded base matrix and existing distinct exams.")
