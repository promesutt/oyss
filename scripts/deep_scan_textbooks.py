import pypdf, os, json, re

BASE_DIR = os.path.expanduser('~/Desktop/OYSS_KAYNAKLAR')

def inspect_range(pdf_path, start_page, end_page, keywords):
    if not os.path.exists(pdf_path):
        return f"File not found: {pdf_path}"
    r = pypdf.PdfReader(pdf_path)
    res = {kw: [] for kw in keywords}
    for p in range(start_page, min(end_page + 1, len(r.pages) + 1)):
        try:
            txt = r.pages[p - 1].extract_text() or ''
        except Exception:
            txt = ''
        if not txt:
            continue
        for kw in keywords:
            if re.search(r'\b' + re.escape(kw) + r'\b', txt, re.IGNORECASE):
                res[kw].append(p)
    return res

def get_page_info(pdf_path, page_num):
    r = pypdf.PdfReader(pdf_path)
    if 1 <= page_num <= len(r.pages):
        try:
            txt = r.pages[page_num - 1].extract_text() or ''
        except Exception as e:
            txt = f"Error: {e}"
        lines = [l.strip() for l in txt.splitlines() if l.strip()]
        printed = None
        for l in lines[-3:] + lines[:3]:
            if re.match(r'^\d+$', l):
                printed = int(l)
                break
        return {
            'pdf_page': page_num,
            'printed_page': printed,
            'lines_count': len(lines),
            'header': lines[:4] if lines else [],
            'footer': lines[-4:] if lines else []
        }
    return None
