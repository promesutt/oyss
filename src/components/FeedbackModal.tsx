import React, { useState, useEffect } from 'react';
import { 
  X, 
  MessageSquarePlus, 
  Send, 
  CheckCircle2, 
  Lock, 
  KeyRound, 
  Trash2, 
  Copy, 
  Check, 
  ArrowLeft,
  Calendar,
  Layers,
  AlertCircle
} from 'lucide-react';

export interface FeedbackItem {
  id: string;
  date: string;
  context: string;
  message: string;
}

const STORAGE_KEY = 'oyss_user_feedbacks';
const ADMIN_PASSWORD = '4725';

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentContext?: string;
}

export const FeedbackModal: React.FC<FeedbackModalProps> = ({
  isOpen,
  onClose,
  currentContext = 'Genel'
}) => {
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [showPasswordPrompt, setShowPasswordPrompt] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [feedbacks, setFeedbacks] = useState<FeedbackItem[]>([]);
  const [copiedAll, setCopiedAll] = useState(false);

  // Load feedbacks from localStorage
  const loadFeedbacks = () => {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (data) {
        setFeedbacks(JSON.parse(data));
      } else {
        setFeedbacks([]);
      }
    } catch {
      setFeedbacks([]);
    }
  };

  useEffect(() => {
    if (isOpen) {
      loadFeedbacks();
      setIsSubmitted(false);
      setMessage('');
      setShowPasswordPrompt(false);
      setPasswordInput('');
      setPasswordError('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = message.trim();
    if (!trimmed) return;

    const newItem: FeedbackItem = {
      id: `fb_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      date: new Date().toLocaleString('tr-TR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      context: currentContext,
      message: trimmed
    };

    const updated = [newItem, ...feedbacks];
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      setFeedbacks(updated);
    } catch (err) {
      console.error('Storage error:', err);
    }

    setMessage('');
    setIsSubmitted(true);
  };

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === ADMIN_PASSWORD) {
      setIsAdminMode(true);
      setShowPasswordPrompt(false);
      setPasswordError('');
      setPasswordInput('');
      loadFeedbacks();
    } else {
      setPasswordError('Hatalı şifre! Lütfen tekrar deneyiniz.');
    }
  };

  const handleDeleteFeedback = (id: string) => {
    const updated = feedbacks.filter(f => f.id !== id);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      setFeedbacks(updated);
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  const handleClearAll = () => {
    if (window.confirm('Tüm geri bildirim kayıtlarını silmek istediğinize emin misiniz?')) {
      try {
        localStorage.removeItem(STORAGE_KEY);
        setFeedbacks([]);
      } catch (err) {
        console.error('Clear error:', err);
      }
    }
  };

  const handleCopyAll = () => {
    if (feedbacks.length === 0) return;
    const text = feedbacks.map((f, i) => 
      `--- Bildirim #${i + 1} (${f.date}) [${f.context}] ---\n${f.message}\n`
    ).join('\n');
    navigator.clipboard.writeText(text);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-xl w-full shadow-2xl border border-slate-200 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-5 text-white flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-amber-300">
              {isAdminMode ? <Lock className="w-5 h-5 text-emerald-400" /> : <MessageSquarePlus className="w-5 h-5" />}
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold flex items-center">
                {isAdminMode ? 'Yönetici Paneli (Geri Bildirimler)' : 'Görüş ve Geri Bildirim'}
                {isAdminMode && (
                  <span className="ml-2 text-[10px] bg-emerald-500/30 text-emerald-300 border border-emerald-400/30 px-2 py-0.5 rounded-full font-normal">
                    {feedbacks.length} Bildirim
                  </span>
                )}
              </h2>
              <p className="text-xs text-slate-300">
                {isAdminMode 
                  ? 'Kullanıcıların ilettiği öneri, eksik ve hata bildirimleri' 
                  : 'Eksik veya hatalı gördüğünüz kısımları doğrudan iletebilirsiniz'}
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Content */}
        <div className="p-5 sm:p-6 space-y-4 max-h-[70vh] overflow-y-auto">
          {isAdminMode ? (
            /* ADMIN VIEW: List feedbacks */
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-200 text-xs">
                <button
                  onClick={() => setIsAdminMode(false)}
                  className="inline-flex items-center text-indigo-600 hover:text-indigo-800 font-semibold cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5 mr-1" />
                  Kullanıcı Formuna Dön
                </button>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={handleCopyAll}
                    disabled={feedbacks.length === 0}
                    className="inline-flex items-center px-2.5 py-1 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-medium text-xs transition-colors cursor-pointer disabled:opacity-40"
                  >
                    {copiedAll ? (
                      <>
                        <Check className="w-3.5 h-3.5 mr-1 text-emerald-600" />
                        Kopyalandı
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 mr-1 text-slate-500" />
                        Tümünü Kopyala
                      </>
                    )}
                  </button>
                  <button
                    onClick={handleClearAll}
                    disabled={feedbacks.length === 0}
                    className="inline-flex items-center px-2.5 py-1 rounded-lg border border-red-200 bg-red-50 hover:bg-red-100 text-red-700 font-medium text-xs transition-colors cursor-pointer disabled:opacity-40"
                  >
                    <Trash2 className="w-3.5 h-3.5 mr-1 text-red-600" />
                    Temizle
                  </button>
                </div>
              </div>

              {feedbacks.length === 0 ? (
                <div className="text-center py-8 text-slate-400 space-y-2 border-2 border-dashed border-slate-200 rounded-xl">
                  <MessageSquarePlus className="w-8 h-8 mx-auto text-slate-300" />
                  <p className="text-sm font-semibold text-slate-600">Henüz geri bildirim bulunmuyor.</p>
                  <p className="text-xs text-slate-400">Kullanıcılar form üzerinden yazdıkça burada listelenecektir.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {feedbacks.map((item) => (
                    <div 
                      key={item.id} 
                      className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 sm:p-4 text-xs space-y-2 relative group hover:border-slate-300 transition-all"
                    >
                      <div className="flex items-center justify-between text-slate-500 text-[11px] pb-1.5 border-b border-slate-200/80">
                        <div className="flex items-center space-x-2">
                          <span className="flex items-center text-slate-600 font-medium">
                            <Calendar className="w-3 h-3 mr-1 text-slate-400" />
                            {item.date}
                          </span>
                          <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 font-medium border border-indigo-200">
                            <Layers className="w-2.5 h-2.5 mr-1 text-indigo-500" />
                            {item.context}
                          </span>
                        </div>
                        <button
                          onClick={() => handleDeleteFeedback(item.id)}
                          title="Bu bildirimi sil"
                          className="text-slate-400 hover:text-red-600 p-1 rounded transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-slate-800 text-xs sm:text-sm whitespace-pre-wrap leading-relaxed font-normal">
                        {item.message}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : showPasswordPrompt ? (
            /* ADMIN LOGIN PROMPT */
            <form onSubmit={handleAdminLogin} className="space-y-4 py-2">
              <div className="text-center space-y-1">
                <div className="w-12 h-12 mx-auto rounded-full bg-slate-100 flex items-center justify-center text-slate-700 mb-2">
                  <KeyRound className="w-6 h-6 text-indigo-600" />
                </div>
                <h3 className="text-sm font-bold text-slate-800">Yönetici Girişi</h3>
                <p className="text-xs text-slate-500">
                  Gelen bildirimleri görüntülemek için lütfen yönetici şifresini giriniz.
                </p>
              </div>

              <div>
                <input
                  type="password"
                  autoFocus
                  placeholder="Yönetici şifresi..."
                  value={passwordInput}
                  onChange={(e) => {
                    setPasswordInput(e.target.value);
                    setPasswordError('');
                  }}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-center text-sm font-bold tracking-widest text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none"
                />
                {passwordError && (
                  <p className="text-xs font-semibold text-red-600 mt-1.5 text-center flex items-center justify-center">
                    <AlertCircle className="w-3.5 h-3.5 mr-1 text-red-500" />
                    {passwordError}
                  </p>
                )}
              </div>

              <div className="flex items-center space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowPasswordPrompt(false)}
                  className="w-1/2 py-2.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md transition-all active:scale-95 cursor-pointer"
                >
                  Giriş Yap
                </button>
              </div>
            </form>
          ) : (
            /* USER FEEDBACK FORM */
            <form onSubmit={handleSubmit} className="space-y-4">
              {isSubmitted ? (
                <div className="p-5 bg-emerald-50 border border-emerald-200 rounded-xl text-center space-y-2 animate-in fade-in">
                  <CheckCircle2 className="w-8 h-8 mx-auto text-emerald-600" />
                  <p className="text-sm font-bold text-emerald-900">Geri Bildiriminiz İletildi!</p>
                  <p className="text-xs text-emerald-700">
                    Görüş ve öneriniz için teşekkür ederiz. Sistem sürekli olarak güncellenmektedir.
                  </p>
                  <button
                    type="button"
                    onClick={() => setIsSubmitted(false)}
                    className="mt-2 text-xs font-bold text-emerald-800 hover:text-emerald-950 underline cursor-pointer"
                  >
                    Yeni bir görüş yazmak istiyorum
                  </button>
                </div>
              ) : (
                <>
                  <div className="text-xs text-slate-600 bg-indigo-50/60 p-3 rounded-xl border border-indigo-100 flex items-start space-x-2">
                    <span className="text-indigo-600 font-bold shrink-0">Bilgi:</span>
                    <span>
                      Herhangi bir kişisel bilgi vermenize gerek yoktur. Sorularda veya içerikte gördüğünüz eksik, hata veya taleplerinizi doğrudan yazabilirsiniz.
                    </span>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Görüş, Hata veya Öneriniz:
                    </label>
                    <textarea
                      rows={5}
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Eksik veya hatalı gördüğünüz kısımları, soru önerilerinizi veya görüşlerinizi buraya yazabilirsiniz..."
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs sm:text-sm text-slate-800 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all placeholder:text-slate-400"
                    />
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[11px] text-slate-400">
                      Aktif Konum: <strong>{currentContext}</strong>
                    </span>
                    <button
                      type="submit"
                      disabled={!message.trim()}
                      className="inline-flex items-center px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-bold shadow-md transition-all active:scale-95 disabled:opacity-40 cursor-pointer"
                    >
                      <Send className="w-4 h-4 mr-1.5 text-amber-300" />
                      Geri Bildirimi Gönder
                    </button>
                  </div>
                </>
              )}
            </form>
          )}
        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-5 py-3 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          {!isAdminMode && (
            <button
              type="button"
              onClick={() => {
                setShowPasswordPrompt(true);
                setPasswordError('');
                setPasswordInput('');
              }}
              className="inline-flex items-center text-[11px] text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
            >
              <Lock className="w-3 h-3 mr-1" />
              Yönetici Girişi
            </button>
          )}
          {isAdminMode && (
            <span className="text-[11px] text-emerald-700 font-semibold">
              ● Yönetici Yetkisi Açık
            </span>
          )}
          <button
            onClick={onClose}
            className="px-3.5 py-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-100 text-slate-700 font-semibold text-xs cursor-pointer"
          >
            Kapat
          </button>
        </div>

      </div>
    </div>
  );
};
