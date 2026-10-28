# MEB Ortak Yazılı Sınav Sistemi (OYSS) & TYMM Eğitim Portalı

T.C. Millî Eğitim Bakanlığı (MEB) Ölçme, Değerlendirme ve Sınav Hizmetleri Genel Müdürlüğü (ÖDSGM) konu soru dağılım tabloları ve Türkiye Yüzyılı Maarif Modeli (TYMM) standartlarına uygun olarak geliştirilmiş web tabanlı sınav, çalışma kağıdı, infografik ve beceri değerlendirme portalı.

---

## 🌟 Öne Çıkan Özellikler

- **123 Özgün ve Kalibre Edilmiş Sınav Kâğıdı:** 5, 6, 7 ve 8. sınıfların tüm dersleri (Türkçe, Matematik, Fen Bilimleri, Sosyal Bilgiler / İnkılap Tarihi, Din Kültürü, İngilizce) ve tüm senaryoları için sıfır soru tekrarı ile hazırlanmış, 100 tam puan kalibreli açık uçlu sınav kağıtları.
- **Kapsamlı Sınav Çalışma Kâğıtları:** 152 müfredat öğrenme çıktısının tamamını kapsayan pedagojik içerik bankası:
  - 📌 *Sınav İçin Hap Bilgiler* (Kurallar, formüller, kavram haritaları)
  - ⚠️ *MEB Sınav Tuzakları & Püf Noktalar* (Sık yapılan kavram yanılgıları)
  - 📝 *Adım Adım Çözümlü Açık Uçlu Model Soru* (Soru analizi ve tam puanlık model çözüm)
  - 💡 *Sıra Sende!* (Pekiştirme sorusu ve ipucu sistemi)
- **24/24 Görsel İnfografik ve Şifre Kartı:** Tüm kademe ve dersler için sınav öncesi görsel hafızayı pekiştiren özetler, karşılaştırma matrisleri ve sınav kodlamaları.
- **Dört Becerili Dil Kılavuzları:** 5, 6, 7 ve 8. sınıf Türkçe ve İngilizce dersleri için MEB mevzuatına uygun konuşma kartları, dinleme metni yönergeleri ve analitik puanlama rubrikleri.
- **Akıllı Soru Motoru:** MEBİ açık uçlu soru mimarisine uygun senaryo tabanlı soru türetme kabiliyeti.
- **Doğrudan Yazdır & PDF Al:** Tüm sayfalarda tek tıkla A4 formatında temiz baskı ve PDF indirme desteği.
- **Tek Dosyada Çalışabilme:** Çevrimdışı (offline) kullanım için tüm stilleri ve kodları içeren bağımsız `portal.html` desteği.

---

## 🚀 Hızlı Başlangıç (Yerel Geliştirme)

### Gereksinimler
- Node.js (v18 veya üzeri)
- npm veya yarn

### Kurulum ve Çalıştırma

```bash
# Bağımlılıkları yükleyin
npm install

# Geliştirme sunucusunu başlatın (http://localhost:5173)
npm run dev

# Canlı dağıtım için derleyin (dist/ çıktısı üretir)
npm run build
```

---

## ☁️ Yayına Alma / Dağıtım (Hosting Seçenekleri)

Bu proje istemci tarafında (SPA) çalışan bir React + Vite + Tailwind CSS uygulamasıdır. Herhangi bir statik web barındırma sağlayıcısında saniyeler içinde çalışır.

### 1. Netlify (Önerilen)
Repo içinde hazır `netlify.toml` yapılandırması bulunmaktadır.
- **Build command:** `npm run build`
- **Publish directory:** `dist`
- *(Opsiyonel)* Gemini API ile canlı soru türetmek isterseniz Netlify panelinde **Site settings > Environment variables** alanına `VITE_GEMINI_API_KEY` ekleyebilirsiniz.

### 2. Vercel
- GitHub reponuzu Vercel'e bağlayın.
- Framework: `Vite` otomatik olarak tanınır.
- **Build command:** `npm run build`
- **Output directory:** `dist`

### 3. Render
- Render Dashboard'dan **New + > Static Site** seçeneğini seçin.
- GitHub reponuzu bağlayın.
- **Build Command:** `npm run build`
- **Publish Directory:** `dist`

### 4. GitHub Pages
- GitHub reponuzda **Settings > Pages** sekmesine gidin.
- Source olarak **GitHub Actions** seçip Vite dağıtım şablonunu etkinleştirebilirsiniz.

---

## 📄 Lisans ve Haklar
MEB ve ÖDSGM kamuya açık resmi çerçeve planları ve konu soru dağılım senaryoları esas alınarak eğitim amaçlı hazırlanmıştır.
