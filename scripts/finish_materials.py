import json

from generate_all_materials import (
    GRADE_5_SHEETS, GRADE_6_SHEETS, GRADE_8_SHEETS,
    GRADE_5_SPEAKING, GRADE_6_SPEAKING, GRADE_8_SPEAKING,
    ADDITIONAL_INFOGRAPHICS
)

# 1. STUDY SHEETS
with open('src/data/studySheets.ts', 'r', encoding='utf-8') as f:
    lines = f.readlines()

# lines 3 to 427 (0-indexed: 3 to -1) is the Grade 7 block
grade7_ts_block = "".join(lines[3:-1]).strip()
if grade7_ts_block.endswith(','):
    grade7_ts_block = grade7_ts_block[:-1]

all_new_sheets = GRADE_5_SHEETS + GRADE_6_SHEETS + GRADE_8_SHEETS
new_sheets_ts = json.dumps(all_new_sheets, ensure_ascii=False, indent=2)
# Remove outer [ and ]
new_sheets_inner = new_sheets_ts.strip()[1:-1].strip()

full_study_ts = f"""import { { 'StudySheet' } } from '../types';

export const SAMPLE_STUDY_SHEETS: StudySheet[] = [
{new_sheets_inner},
{grade7_ts_block}
];
"""

with open('src/data/studySheets.ts', 'w', encoding='utf-8') as f:
    f.write(full_study_ts)

print("Updated studySheets.ts successfully!")

# 2. SPEAKING GUIDES
with open('src/data/speakingGuides.ts', 'r', encoding='utf-8') as f:
    lines_spk = f.readlines()

grade7_spk_block = "".join(lines_spk[3:-1]).strip()
if grade7_spk_block.endswith(','):
    grade7_spk_block = grade7_spk_block[:-1]

all_new_spk = GRADE_5_SPEAKING + GRADE_6_SPEAKING + GRADE_8_SPEAKING
new_spk_ts = json.dumps(all_new_spk, ensure_ascii=False, indent=2)
new_spk_inner = new_spk_ts.strip()[1:-1].strip()

full_speaking_ts = f"""import { { 'SpeakingGuide' } } from '../types';

export const SAMPLE_SPEAKING_GUIDES: SpeakingGuide[] = [
{new_spk_inner},
{grade7_spk_block}
];
"""

with open('src/data/speakingGuides.ts', 'w', encoding='utf-8') as f:
    f.write(full_speaking_ts)

print("Updated speakingGuides.ts successfully!")

# 3. INFOGRAPHICS
with open('src/data/infographics.ts', 'r', encoding='utf-8') as f:
    lines_info = f.readlines()

grade7_info_block = "".join(lines_info[3:-1]).strip()
if grade7_info_block.endswith(','):
    grade7_info_block = grade7_info_block[:-1]

new_info_ts = json.dumps(ADDITIONAL_INFOGRAPHICS, ensure_ascii=False, indent=2)
new_info_inner = new_info_ts.strip()[1:-1].strip()

full_info_ts = f"""import { { 'InfographicItem' } } from '../types';

export const SAMPLE_INFOGRAPHICS: InfographicItem[] = [
{new_info_inner},
{grade7_info_block}
];
"""

with open('src/data/infographics.ts', 'w', encoding='utf-8') as f:
    f.write(full_info_ts)

print("Updated infographics.ts successfully!")
