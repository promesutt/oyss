# -*- coding: utf-8 -*-
"""
Generates src/data/outcomeStudyBank.ts
Maps every outcome code to a rich, educational StudySection.
Also enriches src/data/studySheets.ts, src/data/infographics.ts, and src/data/speakingGuides.ts.
"""
import json
import os
import re

# Load all exams so we have authentic solved questions and answers for each outcome
with open('meb_data/all_middle_school_exams.json', 'r', encoding='utf-8') as f:
    all_exams = json.load(f)

# Index exam questions by (grade, subjectId, outcomeCode)
questions_by_outcome = {}
for ex in all_exams:
    g = str(ex['grade'])
    s = ex['subjectId']
    for q in ex['questions']:
        code = q['outcomeCode']
        key = (g, s, code)
        if key not in questions_by_outcome:
            questions_by_outcome[key] = q

print(f"Indexed {len(questions_by_outcome)} unique outcome-exam questions!")
