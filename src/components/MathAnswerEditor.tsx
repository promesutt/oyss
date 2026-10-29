import React, { useState, useRef } from 'react';
import { MathRenderer } from './MathRenderer';
import { 
  Calculator, 
  Eye, 
  EyeOff, 
  Sparkles, 
  FileText,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface MathAnswerEditorProps {
  value: string;
  onChange: (newValue: string) => void;
  questionNumber: number;
  subjectId?: string;
  placeholder?: string;
  rows?: number;
}

interface MathSnippet {
  label: string;
  title: string;
  snippet: string;
  cursorOffset?: number; // Cursor position relative to inserted snippet
  wrapSelection?: boolean; // If true and text is selected, wrap selected text
  prefix?: string;
  suffix?: string;
}

export const MathAnswerEditor: React.FC<MathAnswerEditorProps> = ({
  value,
  onChange,
  questionNumber,
  subjectId,
  placeholder = 'Cevabınızı, analitik gerekçelerinizi ve işlem basamaklarınızı buraya yazınız...',
  rows = 5
}) => {
  const isMathOrScience = subjectId === 'matematik' || subjectId === 'fen_bilimleri';
  
  // Araç çubuğu görünürlüğü (Matematik ve Fen'de varsayılan açık, diğerlerinde kapalı)
  const [showToolbar, setShowToolbar] = useState<boolean>(isMathOrScience);
  const [showPreview, setShowPreview] = useState<boolean>(true);
  const [activeCategory, setActiveCategory] = useState<'basics' | 'fractions_roots' | 'symbols' | 'templates'>('basics');

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Sembol veya şablonu imleç konumuna ekleme
  const insertSnippet = (snippetObj: MathSnippet) => {
    const textarea = textareaRef.current;
    if (!textarea) {
      onChange(value + snippetObj.snippet);
      return;
    }

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);

    let insertText = snippetObj.snippet;
    let newCursorPos = start + insertText.length;

    // Eğer metin seçiliyse ve sarmalama destekleniyorsa
    if (snippetObj.wrapSelection && selectedText.length > 0 && snippetObj.prefix && snippetObj.suffix) {
      insertText = `${snippetObj.prefix}${selectedText}${snippetObj.suffix}`;
      newCursorPos = start + insertText.length;
    } else if (snippetObj.cursorOffset !== undefined) {
      newCursorPos = start + snippetObj.cursorOffset;
    }

    const updated = value.substring(0, start) + insertText + value.substring(end);
    onChange(updated);

    // İmleci odakla ve uygun konuma yerleştir
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(newCursorPos, newCursorPos);
    }, 10);
  };

  // Temel İşlem ve Eşitsizlik Sembolleri
  const basicSnippets: MathSnippet[] = [
    { label: '+', title: 'Toplama', snippet: ' + ' },
    { label: '-', title: 'Çıkarma', snippet: ' - ' },
    { label: '×', title: 'Çarpma', snippet: ' \\times ' },
    { label: '÷', title: 'Bölme', snippet: ' \\div ' },
    { label: '=', title: 'Eşittir', snippet: ' = ' },
    { label: '≠', title: 'Eşit Değildir', snippet: ' \\ne ' },
    { label: '≤', title: 'Küçük Eşit', snippet: ' \\le ' },
    { label: '≥', title: 'Büyük Eşit', snippet: ' \\ge ' },
    { label: '<', title: 'Küçüktür', snippet: ' < ' },
    { label: '>', title: 'Büyüktür', snippet: ' > ' },
    { label: '±', title: 'Artı Eksi', snippet: ' \\pm ' },
    { label: '·', title: 'Nokta Çarpım', snippet: ' \\cdot ' }
  ];

  // Kesir, Üs ve Karekök Sembolleri
  const fractionAndRootSnippets: MathSnippet[] = [
    { 
      label: 'a/b Kesir', 
      title: 'Kesir Ekle (\\frac{pay}{payda})', 
      snippet: '$\\frac{a}{b}$',
      cursorOffset: 7, // Imleci 'a' üzerine getirir
      wrapSelection: true,
      prefix: '$\\frac{',
      suffix: '}{b}$'
    },
    { 
      label: 'x²', 
      title: 'Kare (Üs 2)', 
      snippet: '$x^2$',
      cursorOffset: 3,
      wrapSelection: true,
      prefix: '$',
      suffix: '^2$'
    },
    { 
      label: 'xⁿ', 
      title: 'Genel Üs (x^{n})', 
      snippet: '$x^{n}$',
      cursorOffset: 4,
      wrapSelection: true,
      prefix: '$',
      suffix: '^{n}$'
    },
    { 
      label: '√x', 
      title: 'Karekök (\\sqrt{x})', 
      snippet: '$\\sqrt{x}$',
      cursorOffset: 7,
      wrapSelection: true,
      prefix: '$\\sqrt{',
      suffix: '}$'
    },
    { 
      label: '( )', 
      title: 'Parantez İçi', 
      snippet: ' (a + b) ',
      cursorOffset: 2,
      wrapSelection: true,
      prefix: '(',
      suffix: ')'
    },
    { 
      label: 'x₁', 
      title: 'Alt Simge (İndis)', 
      snippet: '$x_1$',
      cursorOffset: 3
    }
  ];

  // Özel Semboller
  const symbolSnippets: MathSnippet[] = [
    { label: 'π', title: 'Pi Sayısı', snippet: ' \\pi ' },
    { label: '°', title: 'Derece', snippet: '^\\circ' },
    { label: '%', title: 'Yüzde', snippet: '%' },
    { label: '∞', title: 'Sonsuz', snippet: ' \\infty ' },
    { label: '≈', title: 'Yaklaşık Eşit', snippet: ' \\approx ' },
    { label: 'Δ', title: 'Delta (Değişim)', snippet: ' \\Delta ' },
    { label: '∈', title: 'Elemanıdır', snippet: ' \\in ' }
  ];

  // Sık Kullanılan Hazır Matematiksel Kalıplar
  const templateSnippets: MathSnippet[] = [
    { 
      label: '3/4 + 2/5 = 23/20', 
      title: 'Kesir Toplama Örneği', 
      snippet: '$\\frac{3}{4} + \\frac{2}{5} = \\frac{23}{20}$' 
    },
    { 
      label: 'x² + 3x - 4 = 0', 
      title: 'İkinci Derece Denklem', 
      snippet: '$x^2 + 3x - 4 = 0$' 
    },
    { 
      label: '√25 = 5', 
      title: 'Karekök Eşitliği', 
      snippet: '$\\sqrt{25} = 5$' 
    },
    { 
      label: '(a+b)/2', 
      title: 'Cebirsel Kesir / Ortalama', 
      snippet: '$\\frac{a+b}{2}$' 
    }
  ];

  return (
    <div className="space-y-2">
      {/* Label and Control Row */}
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-700 font-bold">
        <label htmlFor={`student-answer-${questionNumber}`} className="flex items-center">
          <FileText className="w-4 h-4 mr-1 text-indigo-600" />
          Cevabınız, İşlem Basamaklarınız ve Gerekçeniz:
        </label>

        <div className="flex items-center space-x-2">
          {/* Toolbar Toggle Button */}
          <button
            type="button"
            onClick={() => setShowToolbar(!showToolbar)}
            className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              showToolbar 
                ? 'bg-indigo-100 text-indigo-900 border border-indigo-300' 
                : 'bg-white text-slate-600 border border-slate-300 hover:bg-slate-50'
            }`}
            title="Matematiksel sembol, kesir ve denklem araç çubuğunu aç/kapat"
          >
            <Calculator className="w-3.5 h-3.5 mr-1 text-indigo-600" />
            <span>Matematik Sembolleri</span>
            {showToolbar ? (
              <ChevronUp className="w-3 h-3 ml-1 text-indigo-600" />
            ) : (
              <ChevronDown className="w-3 h-3 ml-1 text-slate-500" />
            )}
          </button>

          {/* Character count */}
          <span className="text-[11px] font-normal text-slate-400 hidden sm:inline">
            {value.length} karakter • Otomatik kaydedilir
          </span>
        </div>
      </div>

      {/* Mathematical Toolbar */}
      {showToolbar && (
        <div className="bg-slate-100 border border-slate-300 rounded-xl p-2.5 space-y-2 animate-in fade-in zoom-in-98 duration-100 shadow-2xs">
          
          {/* Category Tabs */}
          <div className="flex items-center space-x-1 border-b border-slate-200 pb-2 overflow-x-auto text-xs">
            <button
              type="button"
              onClick={() => setActiveCategory('basics')}
              className={`px-2.5 py-1 rounded-lg font-bold transition-colors cursor-pointer shrink-0 ${
                activeCategory === 'basics' 
                  ? 'bg-white text-indigo-700 shadow-2xs border border-slate-200' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Temel İşlemler (± × ÷ ≤)
            </button>
            <button
              type="button"
              onClick={() => setActiveCategory('fractions_roots')}
              className={`px-2.5 py-1 rounded-lg font-bold transition-colors cursor-pointer shrink-0 ${
                activeCategory === 'fractions_roots' 
                  ? 'bg-white text-indigo-700 shadow-2xs border border-slate-200' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Kesir, Üs ve Kök (a/b, x², √x)
            </button>
            <button
              type="button"
              onClick={() => setActiveCategory('symbols')}
              className={`px-2.5 py-1 rounded-lg font-bold transition-colors cursor-pointer shrink-0 ${
                activeCategory === 'symbols' 
                  ? 'bg-white text-indigo-700 shadow-2xs border border-slate-200' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Semboller (π ° %)
            </button>
            <button
              type="button"
              onClick={() => setActiveCategory('templates')}
              className={`px-2.5 py-1 rounded-lg font-bold transition-colors cursor-pointer shrink-0 ${
                activeCategory === 'templates' 
                  ? 'bg-white text-indigo-700 shadow-2xs border border-slate-200' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Hazır Şablonlar
            </button>
          </div>

          {/* Snippet Buttons */}
          <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto py-0.5">
            {activeCategory === 'basics' && basicSnippets.map((snip, i) => (
              <button
                key={i}
                type="button"
                onClick={() => insertSnippet(snip)}
                title={snip.title}
                className="px-2.5 py-1 bg-white hover:bg-indigo-50 border border-slate-300 hover:border-indigo-400 rounded-lg text-xs font-bold text-slate-800 transition-all cursor-pointer shadow-2xs active:scale-95 shrink-0"
              >
                {snip.label}
              </button>
            ))}

            {activeCategory === 'fractions_roots' && fractionAndRootSnippets.map((snip, i) => (
              <button
                key={i}
                type="button"
                onClick={() => insertSnippet(snip)}
                title={snip.title}
                className="px-2.5 py-1 bg-white hover:bg-indigo-50 border border-slate-300 hover:border-indigo-400 rounded-lg text-xs font-bold text-slate-800 transition-all cursor-pointer shadow-2xs active:scale-95 shrink-0"
              >
                {snip.label}
              </button>
            ))}

            {activeCategory === 'symbols' && symbolSnippets.map((snip, i) => (
              <button
                key={i}
                type="button"
                onClick={() => insertSnippet(snip)}
                title={snip.title}
                className="px-2.5 py-1 bg-white hover:bg-indigo-50 border border-slate-300 hover:border-indigo-400 rounded-lg text-xs font-bold text-slate-800 transition-all cursor-pointer shadow-2xs active:scale-95 shrink-0"
              >
                {snip.label}
              </button>
            ))}

            {activeCategory === 'templates' && templateSnippets.map((snip, i) => (
              <button
                key={i}
                type="button"
                onClick={() => insertSnippet(snip)}
                title={snip.title}
                className="px-2.5 py-1 bg-white hover:bg-indigo-50 border border-slate-300 hover:border-indigo-400 rounded-lg text-xs font-mono font-bold text-indigo-900 transition-all cursor-pointer shadow-2xs active:scale-95 shrink-0"
              >
                {snip.label}
              </button>
            ))}
          </div>

          <div className="text-[10px] text-slate-500 italic flex items-center justify-between">
            <span>
              💡 İpucu: Yukarıdaki butonlara tıklayarak kesir, kök veya denklem ekleyebilirsiniz. Formüller <code>$...$</code> arasına yazıldığında otomatik biçimlendirilir.
            </span>
          </div>
        </div>
      )}

      {/* Main Textarea */}
      <textarea
        ref={textareaRef}
        id={`student-answer-${questionNumber}`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className="w-full rounded-xl border border-slate-300 p-3.5 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 font-medium leading-relaxed bg-slate-50/50"
      />

      {/* Real-time Formatted Math Preview Card */}
      {value.trim().length > 0 && (
        <div className="bg-white rounded-xl border border-slate-200 p-3.5 text-xs shadow-2xs space-y-1.5 animate-in fade-in duration-100">
          <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 border-b border-slate-100 pb-1.5">
            <span className="flex items-center text-indigo-700">
              <Sparkles className="w-3.5 h-3.5 mr-1 text-amber-500" />
              Biçimlendirilmiş Matematiksel Ön İzleme:
            </span>
            <button
              type="button"
              onClick={() => setShowPreview(!showPreview)}
              className="text-[10px] text-slate-500 hover:text-slate-800 flex items-center cursor-pointer"
            >
              {showPreview ? (
                <>
                  <EyeOff className="w-3 h-3 mr-1" /> Gizle
                </>
              ) : (
                <>
                  <Eye className="w-3 h-3 mr-1" /> Göster
                </>
              )}
            </button>
          </div>

          {showPreview && (
            <div className="pt-1 text-slate-800 leading-relaxed font-medium">
              <MathRenderer content={value} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};
