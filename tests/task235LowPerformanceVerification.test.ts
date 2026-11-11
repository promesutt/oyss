import { describe, it } from 'node:test';
import * as assert from 'node:assert';
import generateHandler from '../netlify/functions/generate';
import { calculateExamCostUSD, runTask235Runner } from '../scripts/run_task235_low_test';

describe('TASK235: Gemini 3.8 Flash LOW Yapılandırması ve Maliyet Doğrulaması', () => {

  it('1. generateHandler gemini-3.8-flash için thinkingLevel: low iletildiğinde thinkingConfig: { thinkingLevel: "LOW" } oluşturmalıdır', async () => {
    const originalFetch = globalThis.fetch;
    process.env.GEMINI_API_KEY = 'mock_api_key_task235';

    let capturedUrl = '';
    let capturedBody: any = null;

    globalThis.fetch = (async (url: string, init: any) => {
      capturedUrl = url;
      capturedBody = JSON.parse(init.body);

      return new Response(JSON.stringify({
        candidates: [{
          content: {
            parts: [{
              text: JSON.stringify({
                title: '3.8 Flash LOW Test',
                questions: [
                  { number: 1, question: 'LOW Test Soru?', answer: 'Cevap', rubric: [{ item: 'Puan', pts: 10 }] }
                ]
              })
            }]
          }
        }],
        usageMetadata: {
          promptTokenCount: 1200,
          candidatesTokenCount: 650,
          thoughtsTokenCount: 150,
          totalTokenCount: 1850
        }
      }), { status: 200, headers: { 'Content-Type': 'application/json' } });
    }) as any;

    try {
      const req = new Request('http://localhost/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: '7. sınıf MEB matematik açık uçlu yazılı sınavı kazanım testi',
          model: 'gemini-3.8-flash',
          thinkingLevel: 'low'
        })
      });

      const res = await generateHandler(req);
      assert.strictEqual(res.status, 200);
      const resJson: any = await res.json();

      assert.ok(capturedUrl.includes('models/gemini-3.8-flash:generateContent'), 'gemini-3.8-flash URL çağrılmalıdır.');
      assert.strictEqual(
        capturedBody?.generationConfig?.thinkingConfig?.thinkingLevel,
        'LOW',
        'thinkingConfig.thinkingLevel kesinlikle LOW olmalıdır.'
      );
      assert.strictEqual(resJson.activeModel, 'gemini-3.8-flash');
      assert.strictEqual(resJson.usageMetrics?.thinkingTokens, 150);
      assert.strictEqual(resJson.usageMetrics?.totalTokens, 1850);
    } finally {
      globalThis.fetch = originalFetch;
      delete process.env.GEMINI_API_KEY;
    }
  });

  it('2. calculateExamCostUSD resmi fiyatları doğru hesaplamalı ve thinking tokenlerini iki kez saymamalıdır', () => {
    // 3.5 Flash-Lite: $0.30 / 1M prompt, $2.50 / 1M candidate
    const cost35 = calculateExamCostUSD('gemini-3.5-flash-lite', 5000, 3000);
    const expected35 = (5000 / 1_000_000) * 0.30 + (3000 / 1_000_000) * 2.50;
    assert.strictEqual(cost35, Number(expected35.toFixed(7)));
    assert.strictEqual(cost35, 0.0090);

    // 3.8 Flash (Tanıtım tarifesi - 31 Aralık 2026'ya kadar): $0.75 / 1M prompt, $3.75 / 1M candidate (thinking dahil)
    const cost38 = calculateExamCostUSD('gemini-3.8-flash', 5000, 3000);
    const expected38 = (5000 / 1_000_000) * 0.75 + (3000 / 1_000_000) * 3.75;
    assert.strictEqual(cost38, Number(expected38.toFixed(7)));
    assert.strictEqual(cost38, 0.0150);

    // Eksik veri durumunda null dönmeli
    assert.strictEqual(calculateExamCostUSD('gemini-3.5-flash-lite', null, 3000), null);
    assert.strictEqual(calculateExamCostUSD('gemini-3.8-flash', 5000, null), null);
  });

  it('3. runTask235Runner dryRun modunda sıfır hata ile çalışmalıdır', async () => {
    const res = await runTask235Runner({ dryRun: true });
    assert.ok(Array.isArray(res));
    assert.strictEqual(res.length, 0);
  });

});
