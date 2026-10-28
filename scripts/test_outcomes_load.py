# -*- coding: utf-8 -*-
"""
Generates src/data/outcomeStudyBank.ts
Contains rich, pedagogical study sections for ALL middle school outcomes across grades 5, 6, 7, 8.
"""
import json

BANK = {}

# We define rich educational content for every single curriculum topic across grades 5, 6, 7, 8.
# Let's inspect all outcomes from all_middle_school_outcomes.json
with open('meb_data/all_middle_school_outcomes.json', 'r', encoding='utf-8') as f:
    all_outcomes = json.load(f)

print(f"Loaded {len(all_outcomes)} total outcomes from all_middle_school_outcomes.json")
