import re, json

with open('src/data/sampleExams.ts') as f:
    content = f.read()

# Let's extract each question object
# A question object starts with '{' and has questionNumber, outcomeCode, etc.
raw_exams = content.split("id: 'exam_")
print(f'Exams split: {len(raw_exams)}')

questions_by_outcome = {}

# Regex to extract questions from exam text
pattern = re.compile(
    r'outcomeCode:\s*[\'"](?P<code>[^\'"]+)[\'"].*?'
    r'difficulty:\s*[\'"](?P<diff>[^\'"]+)[\'"].*?'
    r'cognitiveLevel:\s*[\'"](?P<level>[^\'"]+)[\'"].*?'
    r'archetype:\s*[\'"](?P<arch>[^\'"]+)[\'"].*?'
    r'points:\s*(?P<pts>\d+).*?'
    r'(?:contextText:\s*[`\'"](?P<context>.*?)[`\'"],.*?)?'
    r'stimulus:\s*[`\'"](?P<stimulus>.*?)[`\'"],.*?'
    r'questionText:\s*[`\'"](?P<qtext>.*?)[`\'"],.*?'
    r'modelAnswer:\s*[`\'"](?P<answer>.*?)[`\'"],.*?'
    r'solutionExplanation:\s*[`\'"](?P<sol>.*?)[`\'"],.*?'
    r'rubric:\s*\[(?P<rubric>.*?)\]',
    re.DOTALL
)

matches = list(pattern.finditer(content))
print(f'Total matches: {len(matches)}')

for m in matches:
    d = m.groupdict()
    code = d['code'].strip().replace('SB ', 'SB.')
    
    # parse rubric
    rubric_items = []
    r_matches = re.finditer(r'criterion:\s*[`\'"](?P<crit>.*?)[`\'"],\s*points:\s*(?P<rpts>\d+)', d['rubric'], re.DOTALL)
    for rm in r_matches:
        rubric_items.append({
            'criterion': rm.group('crit').strip(),
            'points': int(rm.group('rpts'))
        })
        
    q_data = {
        'outcomeCode': code,
        'difficulty': d['diff'].strip(),
        'cognitiveLevel': d['level'].strip(),
        'archetype': d['arch'].strip(),
        'contextText': (d['context'] or '').strip(),
        'stimulus': d['stimulus'].strip(),
        'questionText': d['qtext'].strip(),
        'modelAnswer': d['answer'].strip(),
        'solutionExplanation': d['sol'].strip(),
        'rubric': rubric_items
    }
    questions_by_outcome.setdefault(code, []).append(q_data)

for code, qlist in sorted(questions_by_outcome.items()):
    print(f'{code}: {len(qlist)} questions')

with open('meb_data/extracted_question_bank.json', 'w', encoding='utf-8') as f:
    json.dump(questions_by_outcome, f, ensure_ascii=False, indent=2)

print('Saved extracted_question_bank.json')
