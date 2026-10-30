import {
  getRegisteredPrompt,
  isSubjectPromptRegistered,
  isCustomSubjectPromptRegistered,
  getAllRegisteredPrompts,
  PromptRegistryError,
  isValidMiddleSchoolCombination,
  VALID_MIDDLE_SCHOOL_GRADES,
  VALID_MIDDLE_SCHOOL_SUBJECTS
} from '../src/generators/prompts';
import { SubjectId, GradeLevel } from '../src/types';

console.log('=== OYSS FAZ 2.2.2.1 - PROMPT REGISTRY & GENERIC UYUMLULUK TESTLERİ BAŞLIYOR ===\n');

let passCount = 0;
let failCount = 0;

function assert(condition: boolean, testName: string, detail: string) {
  if (condition) {
    console.log(`[TEST ${String(passCount + failCount + 1).padStart(2, '0')}] ✓ BAŞARILI - ${testName}`);
    console.log(`         Ayrıntı: ${detail}\n`);
    passCount++;
  } else {
    console.error(`[TEST ${String(passCount + failCount + 1).padStart(2, '0')}] ✗ BAŞARISIZ - ${testName}`);
    console.error(`         Ayrıntı: ${detail}\n`);
    failCount++;
  }
}

function runRegistryTests() {
  const activeGrade7Subjects: SubjectId[] = [
    'turkce',
    'matematik',
    'fen_bilimleri',
    'sosyal_bilgiler',
    'din_kulturu'
  ];

  // 1. 7. Sınıf Özel branşların eksiksiz kayıt kontrolü
  console.log('--- BÖLÜM 1: 7. SINIF ÖZEL REGISTRY KAYITLARI ---');
  for (const sub of activeGrade7Subjects) {
    const isRegistered = isSubjectPromptRegistered(7, sub);
    assert(
      isRegistered,
      `Kütük Varlık Kontrolü: 7. Sınıf ${sub}`,
      `Registry içerisinde 7_${sub} kaydı mevcuttur.`
    );

    const isCustom = isCustomSubjectPromptRegistered(7, sub);
    assert(
      isCustom,
      `Özel Kütük Bayrağı: 7. Sınıf ${sub}`,
      `isCustomSubjectPromptRegistered true döndürmektedir.`
    );

    const entry = getRegisteredPrompt(7, sub);
    assert(
      typeof entry.directives === 'string' && entry.directives.trim().length > 100,
      `Direktif Bütünlüğü: 7. Sınıf ${sub}`,
      `Direktif metni dolu (${entry.directives.length} karakter) ve geçerlidir.`
    );

    assert(
      entry.supportsAlternativeAnswers === true,
      `Alternatif Cevap Desteği: 7. Sınıf ${sub}`,
      `supportsAlternativeAnswers bayrağı aktiftir.`
    );
  }

  // 2. Generic Ortaokul kombinasyonlarının destek kontrolü
  console.log('\n--- BÖLÜM 2: GENERIC ORTAOKUL REGISTRY DOĞRULAMASI ---');
  const sampleGenericCombos: { grade: GradeLevel; sub: SubjectId }[] = [
    { grade: 5, sub: 'turkce' },
    { grade: 5, sub: 'matematik' },
    { grade: 6, sub: 'fen_bilimleri' },
    { grade: 7, sub: 'ingilizce' },
    { grade: 8, sub: 'sosyal_bilgiler' },
    { grade: 8, sub: 'din_kulturu' }
  ];

  for (const { grade, sub } of sampleGenericCombos) {
    const isRegistered = isSubjectPromptRegistered(grade, sub);
    assert(
      isRegistered,
      `Generic Tanıma: ${grade}. Sınıf ${sub}`,
      `isSubjectPromptRegistered(${grade}, '${sub}') true döndürdü (resmi müfredat).`
    );

    const entry = getRegisteredPrompt(grade, sub);
    assert(
      entry.isGeneric === true && entry.supportsAlternativeAnswers === false,
      `Generic Girdi Yapısı: ${grade}. Sınıf ${sub}`,
      `isGeneric=true, supportsAlternativeAnswers=false, version='${entry.version}' olarak üretildi.`
    );
  }

  // 3. Gerçekten geçersiz kombinasyonlar için Fail-Fast hata kontrolü
  console.log('\n--- BÖLÜM 3: FAİL-FAST GEÇERSİZ KOMBİNASYON DENETİMİ ---');
  
  // 9. Sınıf Türkçe (Geçersiz kademe)
  let invalidGradeError: any = null;
  try {
    getRegisteredPrompt(9 as any, 'turkce');
  } catch (err: any) {
    invalidGradeError = err;
  }
  assert(
    invalidGradeError instanceof PromptRegistryError,
    'Fail-Fast: 9. Sınıf Türkçe (Geçersiz Kademe)',
    `PromptRegistryError fırlatıldı: "${invalidGradeError?.message}"`
  );

  // 7. Sınıf Felsefe (Geçersiz branş)
  let invalidSubjectError: any = null;
  try {
    getRegisteredPrompt(7, 'felsefe' as any);
  } catch (err: any) {
    invalidSubjectError = err;
  }
  assert(
    invalidSubjectError instanceof PromptRegistryError,
    'Fail-Fast: 7. Sınıf Felsefe (Geçersiz Branş)',
    `PromptRegistryError fırlatıldı: "${invalidSubjectError?.message}"`
  );

  // 10. Sınıf Fizik (Hem kademe hem branş geçersiz)
  let invalidBothError: any = null;
  try {
    getRegisteredPrompt(10 as any, 'fizik' as any);
  } catch (err: any) {
    invalidBothError = err;
  }
  assert(
    invalidBothError instanceof PromptRegistryError,
    'Fail-Fast: 10. Sınıf Fizik (Geçersiz Kombinasyon)',
    `PromptRegistryError fırlatıldı: "${invalidBothError?.message}"`
  );

  // 4. Kütük sözlüğü bütünlüğü
  console.log('\n--- BÖLÜM 4: KÜTÜK SÖZLÜĞÜ BÜTÜNLÜĞÜ ---');
  const allPrompts = getAllRegisteredPrompts();
  const keys = Object.keys(allPrompts);
  assert(
    keys.length === 5,
    'Kütük Toplam Özel Kayıt Sayısı',
    `Tam olarak 5 adet 7. sınıf özel branşı kayıtlıdır: [${keys.join(', ')}]`
  );

  assert(
    VALID_MIDDLE_SCHOOL_GRADES.length === 4 && VALID_MIDDLE_SCHOOL_SUBJECTS.length === 6,
    'Resmi Ortaokul Kapsam Bütünlüğü',
    `4 Kademe (5,6,7,8) ve 6 Branş (toplam 24 resmi kombinasyon) mevcuttur.`
  );

  console.log('--- PROMPT REGISTRY TEST SONUCU ---');
  console.log(`Toplam Test: ${passCount + failCount} | Başarılı: ${passCount} | Başarısız: ${failCount}\n`);

  if (failCount > 0) {
    console.error('Prompt Registry testleri başarısız oldu!');
    process.exit(1);
  }
}

runRegistryTests();
