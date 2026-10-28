import json

with open('meb_data/clean_middle_school_matrix.json') as f:
    matrix = json.load(f)

# Cognitive level heuristic
def get_cognitive_level(code, title):
    t_lower = title.lower()
    if any(k in t_lower for k in ['çözümler', 'analiz', 'değerlendir', 'çıkarım', 'yorumlar', 'ilişkilendir', 'farklılaştır', 'karşılaştır', 'sentez', 'problem']):
        return 'Karmaşık Bilişsel Süreçler'
    return 'Basit Bilişsel Süreçler'

all_outcomes_meta = {}

for subj, grades in matrix.items():
    for g, info in grades.items():
        for o in info['outcomes']:
            code = o['code'].strip().replace('SB ', 'SB.')
            all_outcomes_meta[code] = {
                'code': code,
                'unit': o['unit'].strip(),
                'topic': o['topic'].strip(),
                'canonicalTitle': o['title'].strip(),
                'cognitiveLevel': get_cognitive_level(code, o['title'])
            }

print(f'Total unique outcome metadata: {len(all_outcomes_meta)}')

with open('meb_data/all_middle_school_outcomes.json', 'w', encoding='utf-8') as f:
    json.dump(all_outcomes_meta, f, ensure_ascii=False, indent=2)

print('Saved all_middle_school_outcomes.json!')
