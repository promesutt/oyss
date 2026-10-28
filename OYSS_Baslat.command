#!/bin/bash
cd "$(dirname "$0")"
echo "=========================================================="
echo "  MEB TYMM Ortak Yazılı Sınav Portalı Başlatılıyor...     "
echo "=========================================================="
open http://localhost:5173
npm run dev
