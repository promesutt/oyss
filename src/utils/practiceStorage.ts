import { StudentExamSession } from '../types/practice';
import { ExamPaper } from '../types';

const SESSION_PREFIX = 'oyss_session_v1_';
const CUSTOM_EXAM_PREFIX = 'oyss_custom_exam_v1_';
const ACTIVE_CUSTOM_EXAM_KEY = 'oyss_active_custom_exam_v1';

/**
 * Güvenli localStorage okuyucu (Hata durumunda çökmez, null döner)
 */
function safeGetItem(key: string): string | null {
  try {
    if (typeof window === 'undefined' || !window.localStorage) return null;
    return window.localStorage.getItem(key);
  } catch (err) {
    console.warn(`[practiceStorage] localStorage okuma hatası (${key}):`, err);
    return null;
  }
}

/**
 * Güvenli localStorage yazıcı (QuotaExceeded veya engelli durumlarda çökmez, boolean döner)
 */
function safeSetItem(key: string, value: string): boolean {
  try {
    if (typeof window === 'undefined' || !window.localStorage) return false;
    window.localStorage.setItem(key, value);
    return true;
  } catch (err) {
    console.warn(`[practiceStorage] localStorage yazma hatası (${key}):`, err);
    return false;
  }
}

/**
 * Güvenli localStorage silici
 */
function safeRemoveItem(key: string): boolean {
  try {
    if (typeof window === 'undefined' || !window.localStorage) return false;
    window.localStorage.removeItem(key);
    return true;
  } catch (err) {
    console.warn(`[practiceStorage] localStorage silme hatası (${key}):`, err);
    return false;
  }
}

/**
 * Bir sınavın etkileşimli oturumunu yükler
 */
export function loadPracticeSession(examId: string): StudentExamSession | null {
  if (!examId) return null;
  const raw = safeGetItem(`${SESSION_PREFIX}${examId}`);
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') return null;
    if (parsed.examId !== examId) return null;
    if (!parsed.answers || typeof parsed.answers !== 'object') {
      parsed.answers = {};
    }
    return parsed as StudentExamSession;
  } catch (err) {
    console.warn(`[practiceStorage] Bozuk oturum verisi (${examId}), sıfırlanıyor:`, err);
    return null;
  }
}

/**
 * Bir sınavın etkileşimli oturumunu kaydeder
 */
export function savePracticeSession(session: StudentExamSession): boolean {
  if (!session || !session.examId) return false;
  const payload = {
    ...session,
    updatedAt: Date.now()
  };
  return safeSetItem(`${SESSION_PREFIX}${session.examId}`, JSON.stringify(payload));
}

/**
 * Bir sınavın oturumunu temizler (Yeniden başlama durumunda)
 */
export function clearPracticeSession(examId: string): boolean {
  if (!examId) return false;
  return safeRemoveItem(`${SESSION_PREFIX}${examId}`);
}

/**
 * Yapay zekâ ile üretilen sınavı (customExamPaper) yerel olarak kaydeder
 * Böylece sayfa F5 ile yenilendiğinde RAM'deki yapay zekâ sınavı kaybolmaz.
 */
export function saveCustomExamPaper(exam: ExamPaper): boolean {
  if (!exam || !exam.id) return false;
  const byGradeSubjectKey = `${CUSTOM_EXAM_PREFIX}${exam.grade}_${exam.subjectId}`;
  safeSetItem(byGradeSubjectKey, JSON.stringify(exam));
  return safeSetItem(ACTIVE_CUSTOM_EXAM_KEY, JSON.stringify(exam));
}

/**
 * Belirli bir sınıf ve ders için kaydedilmiş yapay zekâ sınavını getirir
 */
export function loadCustomExamPaper(grade?: number, subjectId?: string): ExamPaper | null {
  // Eğer grade ve subjectId verilmişse öncelikle o bağlamın sınavını ara
  if (grade && subjectId) {
    const rawContext = safeGetItem(`${CUSTOM_EXAM_PREFIX}${grade}_${subjectId}`);
    if (rawContext) {
      try {
        const parsed = JSON.parse(rawContext);
        if (parsed && parsed.id && Array.isArray(parsed.questions)) {
          return parsed as ExamPaper;
        }
      } catch {
        // yoksay
      }
    }
  }

  // Son aktif yapay zekâ sınavını dene
  const rawActive = safeGetItem(ACTIVE_CUSTOM_EXAM_KEY);
  if (!rawActive) return null;

  try {
    const parsed = JSON.parse(rawActive);
    if (!parsed || !parsed.id || !Array.isArray(parsed.questions)) return null;
    if (grade && parsed.grade !== grade) return null;
    if (subjectId && parsed.subjectId !== subjectId) return null;
    return parsed as ExamPaper;
  } catch (err) {
    console.warn('[practiceStorage] Bozuk customExamPaper kaydı:', err);
    return null;
  }
}

/**
 * Kayıtlı yapay zekâ sınavını temizler
 */
export function clearCustomExamPaper(grade?: number, subjectId?: string): boolean {
  if (grade && subjectId) {
    safeRemoveItem(`${CUSTOM_EXAM_PREFIX}${grade}_${subjectId}`);
  }
  return safeRemoveItem(ACTIVE_CUSTOM_EXAM_KEY);
}
