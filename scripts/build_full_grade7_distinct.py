import json

with open('meb_data/grade7_turkce_distinct.json', 'r', encoding='utf-8') as f:
    g7_turkce = json.load(f)

with open('meb_data/grade7_matematik_distinct.json', 'r', encoding='utf-8') as f:
    g7_mat = json.load(f)

print(f"Loaded {len(g7_turkce)} Türkçe and {len(g7_mat)} Matematik exams.")
