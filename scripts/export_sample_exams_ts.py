import json

with open('meb_data/all_middle_school_exams.json') as f:
    exams = json.load(f)

lines = []
lines.append("import { ExamPaper } from '../types';\n")
lines.append("export const SAMPLE_EXAMS: ExamPaper[] = [")

for ep in exams:
    lines.append("  {")
    lines.append(f"    id: {json.dumps(ep['id'], ensure_ascii=False)},")
    lines.append(f"    grade: {ep['grade']},")
    lines.append(f"    subjectId: {json.dumps(ep['subjectId'], ensure_ascii=False)},")
    lines.append(f"    examTerm: {json.dumps(ep['examTerm'], ensure_ascii=False)},")
    lines.append(f"    scenarioId: {json.dumps(ep['scenarioId'], ensure_ascii=False)},")
    lines.append(f"    title: {json.dumps(ep['title'], ensure_ascii=False)},")
    lines.append(f"    durationMinutes: {ep['durationMinutes']},")
    lines.append(f"    totalPoints: {ep['totalPoints']},")
    instructions = ep.get('instructions', [
        "Sınav süresi 40 dakikadır.",
        "Cevaplarınızı her sorunun altındaki ayrılmış alana okunaklı şekilde yazınız.",
        "Puanlama analitik dereceli puanlama anahtarına (rubrik) göre yapılacaktır."
    ])
    lines.append("    instructions: [")
    for ins in instructions:
        lines.append(f"      {json.dumps(ins, ensure_ascii=False)},")
    lines.append("    ],")
    lines.append("    questions: [")
    for q in ep['questions']:
        lines.append("      {")
        lines.append(f"        questionNumber: {q['questionNumber']},")
        lines.append(f"        outcomeCode: {json.dumps(q['outcomeCode'], ensure_ascii=False)},")
        lines.append(f"        outcomeTitle: {json.dumps(q['outcomeTitle'], ensure_ascii=False)},")
        lines.append(f"        difficulty: {json.dumps(q['difficulty'], ensure_ascii=False)},")
        lines.append(f"        cognitiveLevel: {json.dumps(q['cognitiveLevel'], ensure_ascii=False)},")
        lines.append(f"        archetype: {json.dumps(q['archetype'], ensure_ascii=False)},")
        lines.append(f"        points: {q['points']},")
        lines.append(f"        contextText: {json.dumps(q['contextText'], ensure_ascii=False)},")
        lines.append(f"        stimulus: {json.dumps(q['stimulus'], ensure_ascii=False)},")
        lines.append(f"        questionText: {json.dumps(q['questionText'], ensure_ascii=False)},")
        lines.append(f"        solutionExplanation: {json.dumps(q['solutionExplanation'], ensure_ascii=False)},")
        lines.append(f"        modelAnswer: {json.dumps(q['modelAnswer'], ensure_ascii=False)},")
        lines.append("        rubric: [")
        for r in q['rubric']:
            crit_json = json.dumps(r['criterion'], ensure_ascii=False)
            lines.append(f"          {{ criterion: {crit_json}, points: {r['points']} }},")
        lines.append("        ]")
        lines.append("      },")
    lines.append("    ]")
    lines.append("  },")

lines.append("];\n")

with open('src/data/sampleExams.ts', 'w', encoding='utf-8') as f:
    f.write('\n'.join(lines))

print(f'sampleExams.ts successfully written with all {len(exams)} middle school exams!')
