import React from 'react';
import katex from 'katex';

interface MathRendererProps {
  content: string;
  className?: string;
}

export const MathRenderer: React.FC<MathRendererProps> = ({ content, className = '' }) => {
  if (!content) return null;

  // Unicode matematik sembollerini standart KaTeX biçimine dönüştür (örn: √25 veya √(x+1) -> \sqrt{...})
  let normalized = content;
  if (normalized.includes('√')) {
    normalized = normalized
      .replace(/√\(([^)]+)\)/g, '$\\sqrt{$1}$')
      .replace(/√([0-9a-zA-Z]+)/g, '$\\sqrt{$1}$');
  }

  // LaTeX inline ($...$) or block ($$...$$) or KaTeX commands like \times, \div, \frac
  // If the content doesn't contain backslashes or $, return clean text with preserved newlines
  if (!normalized.includes('$') && !normalized.includes('\\')) {
    return (
      <span className={className}>
        {normalized.split('\n').map((line, idx) => (
          <React.Fragment key={idx}>
            {line}
            {idx < normalized.split('\n').length - 1 && <br />}
          </React.Fragment>
        ))}
      </span>
    );
  }

  // Parse lines and math expressions
  const parts = normalized.split(/(\$\$[\s\S]*?\$\$|\$[^\$]+?\$)/g);

  return (
    <span className={className}>
      {parts.map((part, index) => {
        if (!part) return null;

        if (part.startsWith('$$') && part.endsWith('$$')) {
          const math = part.slice(2, -2).trim();
          try {
            const html = katex.renderToString(math, { displayMode: true, throwOnError: false });
            return <span key={index} dangerouslySetInnerHTML={{ __html: html }} className="block my-2 overflow-x-auto py-1" />;
          } catch {
            return <code key={index} className="block my-2">{math}</code>;
          }
        } else if (part.startsWith('$') && part.endsWith('$')) {
          const math = part.slice(1, -1).trim();
          try {
            const html = katex.renderToString(math, { displayMode: false, throwOnError: false });
            return <span key={index} dangerouslySetInnerHTML={{ __html: html }} />;
          } catch {
            return <code key={index}>{math}</code>;
          }
        }

        // Check if there are raw LaTeX expressions like \times, \div, \pm, \sqrt, \frac
        if (
          part.includes('\\times') || 
          part.includes('\\div') || 
          part.includes('\\frac') || 
          part.includes('\\sqrt') || 
          part.includes('\\pm') || 
          part.includes('\\le') || 
          part.includes('\\ge') || 
          part.includes('\\ne') ||
          part.includes('\\cdot') ||
          part.includes('\\pi')
        ) {
          try {
            const html = katex.renderToString(part.trim(), { displayMode: false, throwOnError: false });
            return <span key={index} dangerouslySetInnerHTML={{ __html: html }} />;
          } catch {
            // fallback
          }
        }

        return (
          <span key={index}>
            {part.split('\n').map((line, lIdx, arr) => (
              <React.Fragment key={lIdx}>
                {line}
                {lIdx < arr.length - 1 && <br />}
              </React.Fragment>
            ))}
          </span>
        );
      })}
    </span>
  );
};
