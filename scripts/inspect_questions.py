import re

with open('src/data/sampleExams.ts') as f:
    content = f.read()

# Match questions
q_blocks = re.findall(r'outcomeCode:\s*[\'"]([^\'"]+)[\'"].*?questionText:\s*[`\'"](.*?)[`\'"],.*?modelAnswer:\s*[`\'"](.*?)[`\'"]', content, re.DOTALL)
print(f'Total questions found: {len(q_blocks)}')

by_code = {}
for code, qtext, ans in q_blocks:
    norm = code.strip().replace('SB ', 'SB.')
    by_code.setdefault(norm, []).append((qtext[:60], ans[:60]))

for code, qlist in sorted(by_code.items()):
    print(f'{code}: {len(qlist)} questions')
