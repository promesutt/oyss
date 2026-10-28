import openpyxl, json

files = {
    'matematik': ('meb_data/matematik.xlsx', ['5.sınıf', '6.sınıf', '7.sınıf', '8.sınıf']),
    'fen_bilimleri': ('meb_data/fen_bilimleri.xlsx', ['5. sınıf', '6. sınıf', '7. sınıf', '8. sınıf']),
    'turkce': ('meb_data/turkce.xlsx', ['5. Sınıf', '6. SINIF', '7. SINIF', '8. SINIF']),
    'sosyal_bilgiler': ('meb_data/sosyal_bilgiler.xlsx', ['5. sınıf ', '6. sınıf ', '7. sınıf ', '8. sınıf T.C. inkılap tarihi ']),
    'din_kulturu': ('meb_data/din_kulturu.xlsx', ['5. Sınıf', '6. Sınıf', '7. Sınıf', '8. Sınıf']),
    'ingilizce': ('meb_data/ingilizce.xlsx', ['5. sınıf', '6. sınıf', '7. sınıf', '8. sınıf']),
}

for subj, (path, sheets) in files.items():
    print(f'=== {subj} ===')
    wb = openpyxl.load_workbook(path, data_only=True)
    for sh_name in sheets:
        sheet = wb[sh_name]
        grade = sh_name[0]
        # find where "1. Dönem 1." starts and ends
        # row 5 and 6
        scenarios = []
        term1_exam1_cols = []
        
        # Look for headers
        in_t1_e1 = False
        for c in range(1, 25):
            val5 = sheet.cell(5, c).value
            val6 = sheet.cell(6, c).value
            
            # Check if row 5 marks 1. Dönem 1. Ortak Yazılı
            if val5 and '1. Dönem 1.' in str(val5):
                in_t1_e1 = True
            elif val5 and '1. Dönem 2.' in str(val5):
                in_t1_e1 = False
                
            # Or if row 6 has Senaryo
            if val6 and 'Senaryo' in str(val6):
                # if row 5 didn't tell us, check if we encountered 1. Dönem 2.
                scenarios.append((c, str(val6).strip()))
                
        print(f'  Grade {grade} ({sh_name}): {len(scenarios)} total scenario columns found')
