import json

with open('meb_data/clean_middle_school_matrix.json') as f:
    matrix = json.load(f)

with open('meb_data/all_middle_school_outcomes.json') as f:
    outcomes_meta = json.load(f)

lines = []
lines.append("import { GradeLevel, SubjectId, ExamTerm, ExamScenario, SchoolStage, CognitiveLevel } from '../types';\n")
lines.append("""export interface SubjectMeta {
  id: SubjectId;
  name: string;
  iconName: string;
  stage: SchoolStage[];
  color: string;
  isLanguage: boolean;
  hasListeningSpeaking: boolean;
}

export const ALL_SUBJECTS: SubjectMeta[] = [
  // Ortaokul Dersleri
  { id: 'turkce', name: 'Türkçe', iconName: 'BookOpen', stage: ['ortaokul'], color: 'amber', isLanguage: true, hasListeningSpeaking: true },
  { id: 'matematik', name: 'Matematik', iconName: 'Calculator', stage: ['ortaokul', 'lise'], color: 'blue', isLanguage: false, hasListeningSpeaking: false },
  { id: 'fen_bilimleri', name: 'Fen Bilimleri', iconName: 'Atom', stage: ['ortaokul'], color: 'emerald', isLanguage: false, hasListeningSpeaking: false },
  { id: 'sosyal_bilgiler', name: 'Sosyal Bilgiler', iconName: 'Compass', stage: ['ortaokul'], color: 'rose', isLanguage: false, hasListeningSpeaking: false },
  { id: 'din_kulturu', name: 'Din Kültürü ve Ahlak Bilgisi', iconName: 'Moon', stage: ['ortaokul', 'lise'], color: 'teal', isLanguage: false, hasListeningSpeaking: false },
  { id: 'ingilizce', name: 'İngilizce', iconName: 'Globe', stage: ['ortaokul', 'lise'], color: 'indigo', isLanguage: true, hasListeningSpeaking: true },
  
  // Lise Dersleri
  { id: 'turk_dili_edebiyati', name: 'Türk Dili ve Edebiyatı', iconName: 'BookOpen', stage: ['lise'], color: 'amber', isLanguage: true, hasListeningSpeaking: true },
  { id: 'fizik', name: 'Fizik', iconName: 'Zap', stage: ['lise'], color: 'purple', isLanguage: false, hasListeningSpeaking: false },
  { id: 'kimya', name: 'Kimya', iconName: 'FlaskConical', stage: ['lise'], color: 'emerald', isLanguage: false, hasListeningSpeaking: false },
  { id: 'biyoloji', name: 'Biyoloji', iconName: 'Dna', stage: ['lise'], color: 'green', isLanguage: false, hasListeningSpeaking: false },
  { id: 'tarih', name: 'Tarih', iconName: 'Landmark', stage: ['lise'], color: 'red', isLanguage: false, hasListeningSpeaking: false },
  { id: 'cografya', name: 'Coğrafya', iconName: 'Map', stage: ['lise'], color: 'cyan', isLanguage: false, hasListeningSpeaking: false },
  { id: 'felsefe', name: 'Felsefe', iconName: 'Brain', stage: ['lise'], color: 'violet', isLanguage: false, hasListeningSpeaking: false },
];

export const ALL_GRADES: { level: GradeLevel; name: string; stage: SchoolStage; tymmRollout: string }[] = [
  // Ortaokul (TYMM Kapsamında: 5, 6, 7; LGS: 8)
  { level: 5, name: '5. Sınıf', stage: 'ortaokul', tymmRollout: 'TYMM Kapsamında' },
  { level: 6, name: '6. Sınıf', stage: 'ortaokul', tymmRollout: 'TYMM Kapsamında' },
  { level: 7, name: '7. Sınıf', stage: 'ortaokul', tymmRollout: 'TYMM Kapsamında' },
  { level: 8, name: '8. Sınıf', stage: 'ortaokul', tymmRollout: 'LGS / Ortak Sınav' },
  
  // Lise (TYMM Kapsamında: 9, 10, 11)
  { level: 9, name: '9. Sınıf', stage: 'lise', tymmRollout: 'TYMM Kapsamında' },
  { level: 10, name: '10. Sınıf', stage: 'lise', tymmRollout: 'TYMM Kapsamında' },
  { level: 11, name: '11. Sınıf', stage: 'lise', tymmRollout: 'TYMM Kapsamında' },
  { level: 12, name: '12. Sınıf', stage: 'lise', tymmRollout: 'YKS / Ortak Sınav' },
];

export const EXAM_TERMS: { id: ExamTerm; name: string; timing: string }[] = [
  { id: '1_donem_1_yazili', name: '1. Dönem 1. Yazılı', timing: 'Kasım Ortak Sınavı' },
  { id: '1_donem_2_yazili', name: '1. Dönem 2. Yazılı', timing: 'Ocak Ortak Sınavı' },
  { id: '2_donem_1_yazili', name: '2. Dönem 1. Yazılı', timing: 'Nisan Ortak Sınavı' },
  { id: '2_donem_2_yazili', name: '2. Dönem 2. Yazılı', timing: 'Haziran Ortak Sınavı' },
];

export const SUBJECTS = ALL_SUBJECTS;

export interface OfficialOutcomeMeta {
  code: string;
  unit: string;
  topic: string;
  canonicalTitle: string;
  cognitiveLevel: CognitiveLevel;
}
""")

lines.append("export const OFFICIAL_OUTCOMES: Record<string, OfficialOutcomeMeta> = {")
for code, meta in sorted(outcomes_meta.items()):
    c_json = json.dumps(code, ensure_ascii=False)
    lines.append(f"  {c_json}: {{")
    lines.append(f"    code: {c_json},")
    lines.append(f"    unit: {json.dumps(meta['unit'], ensure_ascii=False)},")
    lines.append(f"    topic: {json.dumps(meta['topic'], ensure_ascii=False)},")
    lines.append(f"    canonicalTitle: {json.dumps(meta['canonicalTitle'], ensure_ascii=False)},")
    lines.append(f"    cognitiveLevel: {json.dumps(meta['cognitiveLevel'], ensure_ascii=False)}")
    lines.append("  },")
lines.append("};\n")

lines.append("""export function getOfficialOutcomeTitle(code: string): string {
  const normalized = code.trim().replace('SB ', 'SB.');
  if (OFFICIAL_OUTCOMES[normalized]) {
    return `${normalized}. ${OFFICIAL_OUTCOMES[normalized].canonicalTitle}`;
  }
  return code;
}
""")

# Build MIDDLE_SCHOOL_OFFICIAL_SCENARIOS
lines.append("// Ortaokul 5, 6, 7, 8. Sınıf MEB ÖDSGM Resmi Konu Soru Dağılım Matrisi")
lines.append("export const MIDDLE_SCHOOL_OFFICIAL_SCENARIOS: Record<number, Partial<Record<SubjectId, ExamScenario[]>>> = {")

for grade in [5, 6, 7, 8]:
    lines.append(f"  {grade}: {{")
    for subj in ['turkce', 'matematik', 'fen_bilimleri', 'sosyal_bilgiler', 'din_kulturu', 'ingilizce']:
        subj_data = matrix.get(subj, {}).get(str(grade))
        if not subj_data:
            continue
            
        lines.append(f"    {subj}: [")
        scenarios = subj_data['scenarios']
        for sc_idx, sc_name in enumerate(scenarios):
            sc_id = f"senaryo_{sc_idx + 1}"
            
            # calculate distributions
            dist_lines = []
            tot_q = 0
            for o in subj_data['outcomes']:
                cnt = o['counts'][sc_idx]
                if cnt > 0:
                    code = o['code'].strip().replace('SB ', 'SB.')
                    meta = outcomes_meta.get(code, {'cognitiveLevel': 'Karmaşık Bilişsel Süreçler', 'topic': o['topic']})
                    topic_text = meta.get('topic') or o['topic'] or o['title']
                    dist_lines.append(
                        f"        {{ outcomeCode: {json.dumps(code, ensure_ascii=False)}, questionCount: {cnt}, cognitiveLevel: {json.dumps(meta['cognitiveLevel'], ensure_ascii=False)}, notes: {json.dumps(topic_text, ensure_ascii=False)} }},"
                    )
                    tot_q += cnt
                    
            disp_name = f"{sc_name} ({tot_q} Soru)" if "Soru" not in sc_name else sc_name
            lines.append("      {")
            lines.append(f"        id: {json.dumps(sc_id, ensure_ascii=False)},")
            lines.append(f"        name: {json.dumps(disp_name, ensure_ascii=False)},")
            lines.append(f"        description: {json.dumps(f'MEB ÖDSGM 2026-2027 1. Dönem 1. Yazılı Konu Soru Dağılım Tablosu resmi {disp_name} formatı (Toplam 100 Puan).', ensure_ascii=False)},")
            lines.append(f"        totalQuestions: {tot_q},")
            lines.append("        distributions: [")
            for dl in dist_lines:
                lines.append(dl)
            lines.append("        ]")
            lines.append("      },")
        lines.append("    ],")
    lines.append("  },")
lines.append("};\n")

# getScenarios function
lines.append("""export function getScenarios(subjectId: SubjectId, grade: GradeLevel, _examTerm?: ExamTerm): ExamScenario[] {
  const gradeScenarios = MIDDLE_SCHOOL_OFFICIAL_SCENARIOS[grade];
  if (gradeScenarios && gradeScenarios[subjectId] && gradeScenarios[subjectId]!.length > 0) {
    return gradeScenarios[subjectId]!;
  }

  // Fallback for other stages (e.g. lise)
  return [
    {
      id: 'senaryo_1',
      name: '1. Senaryo (Temel MEBİ Formatı)',
      description: 'MEB ÖDSGM standartlarına uygun temel senaryo.',
      totalQuestions: 6,
      distributions: [
        { outcomeCode: `${subjectId.toUpperCase().slice(0, 3)}.${grade}.1.1`, questionCount: 1, cognitiveLevel: 'Basit Bilişsel Süreçler', notes: 'Özellik / Karşılaştırma Matrisi' },
        { outcomeCode: `${subjectId.toUpperCase().slice(0, 3)}.${grade}.1.2`, questionCount: 1, cognitiveLevel: 'Karmaşık Bilişsel Süreçler', notes: 'Kurgusal Vaka & Senaryo İncelemesi' },
        { outcomeCode: `${subjectId.toUpperCase().slice(0, 3)}.${grade}.1.3`, questionCount: 1, cognitiveLevel: 'Karmaşık Bilişsel Süreçler', notes: 'İki Öğrenci Arasındaki Tartışma' },
        { outcomeCode: `${subjectId.toUpperCase().slice(0, 3)}.${grade}.1.4`, questionCount: 1, cognitiveLevel: 'Basit Bilişsel Süreçler', notes: 'Gerçek Yaşam Durumu' },
        { outcomeCode: `${subjectId.toUpperCase().slice(0, 3)}.${grade}.2.1`, questionCount: 1, cognitiveLevel: 'Karmaşık Bilişsel Süreçler', notes: 'Dilemma (İkilem) Çözümü' },
        { outcomeCode: `${subjectId.toUpperCase().slice(0, 3)}.${grade}.2.2`, questionCount: 1, cognitiveLevel: 'Karmaşık Bilişsel Süreçler', notes: 'Görsel / Metin Çıkarımı' },
      ]
    },
    {
      id: 'senaryo_2',
      name: '2. Senaryo (Beceri ve Analiz Ağırlıklı)',
      description: 'Yorumlama ve akıl yürütme odaklı senaryo.',
      totalQuestions: 5,
      distributions: [
        { outcomeCode: `${subjectId.toUpperCase().slice(0, 3)}.${grade}.1.1`, questionCount: 1, cognitiveLevel: 'Basit Bilişsel Süreçler', notes: 'Kavramsal Eşleştirme' },
        { outcomeCode: `${subjectId.toUpperCase().slice(0, 3)}.${grade}.1.2`, questionCount: 2, cognitiveLevel: 'Karmaşık Bilişsel Süreçler', notes: 'Hata Tespiti & Düzeltme' },
        { outcomeCode: `${subjectId.toUpperCase().slice(0, 3)}.${grade}.2.1`, questionCount: 2, cognitiveLevel: 'Karmaşık Bilişsel Süreçler', notes: 'Çok Adımlı Modelleme' },
      ]
    }
  ];
}
""")

with open('src/data/curriculumData.ts', 'w', encoding='utf-8') as f:
    f.write('\n'.join(lines))

print('curriculumData.ts successfully updated with all 4 middle school grades (5, 6, 7, 8)!')
