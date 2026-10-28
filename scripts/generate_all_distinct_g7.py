import json

# Load distinct G7 Türkçe and G7 Matematik
with open('meb_data/grade7_turkce_distinct.json') as f:
    g7_turkce = json.load(f)

with open('meb_data/grade7_matematik_distinct.json') as f:
    g7_mat = json.load(f)

print("Loaded G7 Türkçe and Matematik.")
