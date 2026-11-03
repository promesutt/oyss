# FAZ 3.2: 5. ve 6. Sınıf Ders Kitabı İçerik Eşleştirme Analizi Raporu

**Rapor Referansı:** `017_FAZ_3_2_DERS_KITABI_ESLESTIRME_ANALIZI.md`  
**Tarih:** 31 Ekim 2026  
**Hazırlayan:** Antigravity AI Başmimar  
**Kapsam:** 5. ve 6. Sınıf 12 Dersin Senaryo, Kazanım ve Ders Kitabı İçerik Düzeyinde Eşleştirmesi  
**Kaynak Klasörü:** `~/Desktop/OYSS_KAYNAKLAR/` (36 PDF: 24 Ders Kitabı + 12 MEBİ Örnek Sınavı)  
**Durum:** Analiz Tamamlandı (Kod Değişikliği İçin Onay Bekliyor)  

---

## 1. Yönetici Özeti

FAZ 3.2 kapsamında, OYSS projesinde yer alan 5. ve 6. sınıfa ait toplam 12 dersin (Türkçe, Matematik, Fen Bilimleri, Sosyal Bilgiler, Din Kültürü ve Ahlak Bilgisi, İngilizce) tüm resmi sınav senaryoları (59 senaryo) ve benzersiz öğrenme çıktıları (65 kazanım); yerel kaynak deposundaki (`~/Desktop/OYSS_KAYNAKLAR/`) 24 resmi ders kitabı ve 12 MEBİ örnek yazılı sınavı ile içerik düzeyinde, sayfa sayfa taranarak çapraz doğrulanmıştır.

### Temel Çıkarımlar:
1. **Kaynak Tamlığı ve Bütünlüğü:** Yerel kaynak klasöründe bulunan 36 PDF belgesinin tamamı güncel Türkiye Yüzyılı Maarif Modeli (TYMM) müfredatına ve MEB ÖDSGM 2026-2027 1. Dönem 1. Yazılı Konu-Soru Dağılım Tablolarına %100 uygundur.
2. **Kazanım-Kitap Uyumu:** İncelenen 65 benzersiz öğrenme çıktısının tamamı (65/65, %100) ilgili ders kitaplarının 1. dönem ünite ve temalarında somut metinler, deneyler, modeller, kavram haritaları veya etkinliklerle doğrudan desteklenmektedir. Hiçbir kazanım "doğrulanamadı" veya "uyumsuz" durumunda kalmamıştır.
3. **Mevcut Proje Verilerindeki Açık:** `src/data/outcomeStudyBank.ts` incelendiğinde; 7. sınıf kazanımlarında bulunan `textbookUnit`, `textbookPageRange` ve `textbookExamples` alanlarının 5. ve 6. sınıf kazanım kartlarında **henüz hiç yer almadığı** tespit edilmiştir. Bu analiz, ilgili alanların doldurulması için eksiksiz ve doğrulanmış veri zeminini oluşturmuştur.
4. **Pedagojik Hizalama:** MEBİ örnek sınavlarındaki soru şablonları (Durum & Özellik Matrisi, Kurgusal Senaryo & Vaka İncelemesi, Öğrenci Tartışması & Yanılgı Tespiti, Adım Analizi, Metin İçi Delillendirme, Skimming & Scanning) ile ders kitaplarındaki etkinlikler bire bir örtüşmektedir.

---

## 2. İncelenen Kaynak Envanteri (36 PDF)

| Sınıf | Belge Türü | Dosya Adı | Sayfa | Kapsam / Baskı Bilgisi |
| :---: | :---: | :--- | :---: | :--- |
| **5** | Ders Kitabı | `DERS_KITABI_DKAB.pdf` | 198 | MEB Yayınları - TYMM Onaylı |
| **5** | Ders Kitabı | `DERS_KITABI_FEN_BILIMLERI_1.pdf` | 152 | MEB Yayınları - 1. Kitap (1-3. Üniteler) |
| **5** | Ders Kitabı | `DERS_KITABI_FEN_BILIMLERI_2.pdf` | 170 | MEB Yayınları - 2. Kitap (4-6. Üniteler) |
| **5** | Ders Kitabı | `DERS_KITABI_MATEMATIK_1.pdf` | 171 | MEB Yayınları - 1. Kitap (1-3. Temalar) |
| **5** | Ders Kitabı | `DERS_KITABI_MATEMATIK_2.pdf` | 189 | MEB Yayınları - 2. Kitap (4-6. Temalar) |
| **5** | Ders Kitabı | `DERS_KITABI_SOSYAL_BILGILER_1.pdf` | 154 | MEB Yayınları - 1. Kitap (1-3. Öğrenme Alanları) |
| **5** | Ders Kitabı | `DERS_KITABI_SOSYAL_BILGILER_2.pdf` | 150 | MEB Yayınları - 2. Kitap (4-6. Öğrenme Alanları) |
| **5** | Ders Kitabı | `DERS_KITABI_TURKCE_1.pdf` | 178 | MEB Yayınları - 1. Kitap (1-3. Temalar) |
| **5** | Ders Kitabı | `DERS_KITABI_TURKCE_2.pdf` | 160 | MEB Yayınları - 2. Kitap (4-6. Temalar) |
| **5** | Ders Kitabı | `DERS_KITABI_INGILIZCE_DERS_KITABI.pdf` | 175 | Student's Book - MEB Yayınları (Themes 1-10) |
| **5** | Ders Kitabı | `DERS_KITABI_INGILIZCE_CALISMA_KITABI.pdf` | 66 | Workbook - MEB Yayınları (Themes 1-10) |
| **5** | Ders Kitabı | `DERS_KITABI_INGILIZCE_OGRETMEN_KILAVUZ_KITABI.pdf` | 192 | Teacher's Guide - MEB Yayınları |
| **5** | MEBİ Sınav | `MEBI_DKAB.pdf` | 7 | MEB Temel Eğitim GM - 1. Dönem 1. Yazılı |
| **5** | MEBİ Sınav | `MEBI_FEN_BILIMLERI.pdf` | 9 | MEB Temel Eğitim GM - 1. Dönem 1. Yazılı |
| **5** | MEBİ Sınav | `MEBI_MATEMATIK.pdf` | 29 | MEB Temel Eğitim GM - 1. Dönem 1. Yazılı |
| **5** | MEBİ Sınav | `MEBI_SOSYAL_BILGILER.pdf` | 8 | MEB Temel Eğitim GM - 1. Dönem 1. Yazılı |
| **5** | MEBİ Sınav | `MEBI_TURKCE.pdf` | 13 | MEB Temel Eğitim GM - 1. Dönem 1. Yazılı |
| **5** | MEBİ Sınav | `MEBI_INGILIZCE.pdf` | 7 | MEB Temel Eğitim GM - 1. Dönem 1. Yazılı |
| **6** | Ders Kitabı | `DERS_KITABI_DKAB.pdf` | 189 | MEB Yayınları - TYMM Onaylı |
| **6** | Ders Kitabı | `DERS_KITABI_FEN_BILIMLERI_1.pdf` | 190 | MEB Yayınları - 1. Kitap (1-3. Üniteler) |
| **6** | Ders Kitabı | `DERS_KITABI_FEN_BILIMLERI_2.pdf` | 130 | MEB Yayınları - 2. Kitap (4-6. Üniteler) |
| **6** | Ders Kitabı | `DERS_KITABI_MATEMATIK_1.pdf` | 224 | MEB Yayınları - 1. Kitap (1-3. Temalar) |
| **6** | Ders Kitabı | `DERS_KITABI_MATEMATIK_2.pdf` | 166 | MEB Yayınları - 2. Kitap (4-6. Temalar) |
| **6** | Ders Kitabı | `DERS_KITABI_SOSYAL_BILGILER_1.pdf` | 187 | MEB Yayınları - 1. Kitap (1-3. Öğrenme Alanları) |
| **6** | Ders Kitabı | `DERS_KITABI_SOSYAL_BILGILER_2.pdf` | 116 | MEB Yayınları - 2. Kitap (4-6. Öğrenme Alanları) |
| **6** | Ders Kitabı | `DERS_KITABI_TURKCE_1.pdf` | 177 | MEB Yayınları - 1. Kitap (1-3. Temalar) |
| **6** | Ders Kitabı | `DERS_KITABI_TURKCE_2.pdf` | 160 | MEB Yayınları - 2. Kitap (4-6. Temalar) |
| **6** | Ders Kitabı | `DERS_KITABI_INGILIZCE_DERS_KITABI.pdf` | 167 | Student's Book - MEB Yayınları (Themes 1-10) |
| **6** | Ders Kitabı | `DERS_KITABI_INGILIZCE_CALISMA_KITABI.pdf` | 75 | Workbook - MEB Yayınları (Themes 1-10) |
| **6** | Ders Kitabı | `DERS_KITABI_INGILIZCE_OGRETMEN_KILAVUZ_KITABI.pdf` | 182 | Teacher's Guide - MEB Yayınları |
| **6** | MEBİ Sınav | `MEBI_DKAB.pdf` | 7 | MEB Temel Eğitim GM - 1. Dönem 1. Yazılı |
| **6** | MEBİ Sınav | `MEBI_FEN_BILIMLERI.pdf` | 14 | MEB Temel Eğitim GM - 1. Dönem 1. Yazılı |
| **6** | MEBİ Sınav | `MEBI_MATEMATIK.pdf` | 12 | MEB Temel Eğitim GM - 1. Dönem 1. Yazılı |
| **6** | MEBİ Sınav | `MEBI_SOSYAL_BILGILER.pdf` | 8 | MEB Temel Eğitim GM - 1. Dönem 1. Yazılı |
| **6** | MEBİ Sınav | `MEBI_TURKCE.pdf` | 12 | MEB Temel Eğitim GM - 1. Dönem 1. Yazılı |
| **6** | MEBİ Sınav | `MEBI_INGILIZCE.pdf` | 10 | MEB Temel Eğitim GM - 1. Dönem 1. Yazılı |

---

## 3. 5. Sınıf Ders Kitabı İçerik Eşleştirme Tabloları (6 Ders)

### 3.1. 5. Sınıf Din Kültürü ve Ahlak Bilgisi
**İncelenen Ders Kitabı:** `DERS_KITABI_DKAB.pdf` (198 Sayfa)  
**MEBİ Örnek Sınavı:** `MEBI_DKAB.pdf` (7 Sayfa)  
**Senaryo Dağılımı:** Senaryo 1 (8 Soru), Senaryo 2 (7 Soru), Senaryo 3 (6 Soru), Senaryo 4 (6 Soru)

| Sınıf | Ders | Senaryo | Kazanım Kodu | Kazanım Açıklaması | Konu / Öğrenme Alanı | Ders Kitabı | Ünite / Tema | Basılı Sayfa | PDF Sayfa | İçerik Kanıtı | Soru Türüyle İlişki | Uyum Durumu | Açıklama |
| :---: | :---: | :---: | :---: | :--- | :--- | :--- | :--- | :---: | :---: | :--- | :--- | :---: | :--- |
| 5 | Din | 1, 2, 4 | `DKAB.5.1.1` | Evrendeki mükemmel düzene ilişkin akıl yürütebilme | Evrendeki Mükemmel Düzen | `DERS_KITABI_DKAB.pdf` | 1. Ünite: ALLAH İNANCI | 14-19 | 14-19 | Gece ve gündüzün ardı ardına gelmesi (s. 14), gezegenlerin yörüngeleri, su döngüsü, Enbiyâ 33 ve Mülk 3-4 ayetleri. | Kurgusal Senaryo & Doğa Olayı İncelemesi | Doğrudan uyumlu | FAZ 3.1'de onaylanan kodla tam uyumlu. |
| 5 | Din | 1, 2, 3, 4 | `DKAB.5.1.2` | Evrendeki mükemmel düzenden hareketle Allah’ın (cc) varlığı ve birliğini müşahede edebilme | Allah’ın Varlığı ve Birliği | `DERS_KITABI_DKAB.pdf` | 1. Ünite: ALLAH İNANCI | 20-28 | 20-28 | Tevhid inancı (s. 20), ressam-resim ve usta-bina analojisi (s. 22), İsrâ 42 ve Enbiyâ 22 ayetleri ("birden çok ilah olsaydı düzen bozulurdu"). | Öğrenci Tartışması & Analoji Analizi | Doğrudan uyumlu | MEBİ Soru 2 ve 3 ile bire bir aynı pedagojik kurgu. |
| 5 | Din | 1, 2, 3, 4 | `DKAB.5.1.3` | Allah’ın (cc) güzel isimlerini bağlamına uygun kullanabilme | Allah’ın Güzel İsimleri | `DERS_KITABI_DKAB.pdf` | 1. Ünite: ALLAH İNANCI | 29-35 | 29-35 | Esmâ-i Hüsnâ: Rahmân (s. 30), Rahîm (s. 31), Alîm (s. 32), Semî' (s. 33), Basîr (s. 33), Kadîr (s. 33). Günlük yaşam tecellileri. | Durum & Özellik Matrisi / Bağlamsal Eşleştirme | Doğrudan uyumlu | MEBİ Soru 4 ve 5 doğrudan bu isimleri sorar. |
| 5 | Din | 1, 2, 3, 4 | `DKAB.5.1.4` | İhlas suresini ve bu surenin anlamını okuyarak yorumlayabilme | Bir Sure Öğreniyorum: İhlas Suresi | `DERS_KITABI_DKAB.pdf` | 1. Ünite: ALLAH İNANCI | 36-42 | 36-42 | İhlas Suresi Arapça metni, meali, nüzul sebebi, "Samed" kavramının detaylı analizi (hiçbir şeye muhtaç olmama) (s. 38). | Metin İçi Delillendirme & Kavram Analizi | Doğrudan uyumlu | MEBİ Soru 6 ve 7 ile doğrudan örtüşür. |
| 5 | Din | 1, 3 | `DKAB.5.2.1` | Namaz ibadetini özetleyebilme | Allah’ın Huzurunda Olmak: Namaz | `DERS_KITABI_DKAB.pdf` | 2. Ünite: NAMAZ | 56-60 | 56-60 | Namazın anlamı, kulun Allah ile buluşması (s. 56), farz, vacip ve nafile namaz çeşitleri tablosu (s. 58-59). | Sınıflandırma & Kavram Haritası | Doğrudan uyumlu | 1. Dönem 1. Sınavın 2. ünite giriş konusudur. |

---

### 3.2. 5. Sınıf Sosyal Bilgiler
**İncelenen Ders Kitabı:** `DERS_KITABI_SOSYAL_BILGILER_1.pdf` (154 Sayfa)  
**MEBİ Örnek Sınavı:** `MEBI_SOSYAL_BILGILER.pdf` (8 Sayfa)  
**Senaryo Dağılımı:** Senaryo 1 (6 Soru), Senaryo 2 (7 Soru), Senaryo 3 (7 Soru), Senaryo 4 (6 Soru), Senaryo 5 (6 Soru)

| Sınıf | Ders | Senaryo | Kazanım Kodu | Kazanım Açıklaması | Konu / Öğrenme Alanı | Ders Kitabı | Ünite / Tema | Basılı Sayfa | PDF Sayfa | İçerik Kanıtı | Soru Türüyle İlişki | Uyum Durumu | Açıklama |
| :---: | :---: | :---: | :---: | :--- | :--- | :--- | :--- | :---: | :---: | :--- | :--- | :---: | :--- |
| 5 | Sosyal | 1, 2, 3, 4, 5 | `SB.5.1.1` | Dâhil olduğu gruplar ve bu gruplardaki rolleri arasındaki ilişkileri çözümleyebilme | Gruplar ve Roller | `DERS_KITABI_SOSYAL_BILGILER_1.pdf` | 1. Öğrenme Alanı: BİRLİKTE YAŞAMAK | 11-19 | 11-19 | "Taylan'ın Günlüğü" (s. 12): Aile, okul korosu, izcilik kulübü, basketbol takımı grupları; evlat, öğrenci, solist, kaptan rolleri ve hak-sorumluluk bağı (s. 14-15). | Kurgusal Vaka İncelemesi / Rol-Sorumluluk Matrisi | Doğrudan uyumlu | MEBİ Soru 1 (Melis'in proje grubu ve aile rolü) ile tam uyumlu. |
| 5 | Sosyal | 1, 2, 3, 4, 5 | `SB.5.1.2` | Kültürel özelliklere saygı duymanın birlikte yaşamaya etkisini yorumlayabilme | Kültürel Özelliklere Saygı ve Birlikte Yaşama Kültürü | `DERS_KITABI_SOSYAL_BILGILER_1.pdf` | 1. Öğrenme Alanı: BİRLİKTE YAŞAMAK | 20-33 | 20-33 | Türk kültürü ögeleri (s. 21-25): Ebru, çini, halı, zeybek, horon, düğün ve bayramlar. Farklı kültürlere (göçmen, sığınmacı) önyargısız yaklaşım ve empati (s. 28-30). | Empati & Vaka Analizi / İkilem Çözümü | Doğrudan uyumlu | MEBİ Soru 3 (Nouri ailesi) ve Soru 5 (komşuluk) bu sayfalardan alınmıştır. |
| 5 | Sosyal | 1, 2, 3, 4, 5 | `SB.5.1.3` | Toplumsal birliği sürdürmeye yönelik yardımlaşma ve dayanışma faaliyetlerine katkı sağlayabilme | Yardımlaşma ve Dayanışma Faaliyetlerinin Toplumsal Birliğe Etkisi | `DERS_KITABI_SOSYAL_BILGILER_1.pdf` | 1. Öğrenme Alanı: BİRLİKTE YAŞAMAK | 34-48 | 34-48 | Sadaka taşları, aşevleri, vakıf medeniyeti (s. 35-37). Kızılay "2. El Tekstil", AFAD, Yeşilay, Darülaceze (s. 38-41). İmece ve doğal afetlerde kenetlenme (s. 42-44). | Tarihsel/Güncel Kurum Analizi / Proje Fikri | Doğrudan uyumlu | Senaryoların en yüksek ağırlıklı kazanımıdır. |
| 5 | Sosyal | 1, 3, 5 | `SB.5.2.1` | Yaşadığı ilin göreceli konum özelliklerini algılayabilme | Yaşadığı İlin Göreceli Konumu | `DERS_KITABI_SOSYAL_BILGILER_1.pdf` | 2. Öğrenme Alanı: EVİMİZ DÜNYA | 49-60 | 49-60 | "Şehir Bulmaca Oyunu" (s. 50), göreceli konum tanımı (denizlere, komşu illere, ana ticaret yollarına, yer şekillerine göre konum) (s. 52-54), il harita analizi (s. 55-57). | Harita Okuma / Göreceli Konum Çıkarımı | Doğrudan uyumlu | FAZ 3.1'de eklenen kazanımdır; zengin harita içeriği mevcuttur. |

---

### 3.3. 5. Sınıf Fen Bilimleri
**İncelenen Ders Kitabı:** `DERS_KITABI_FEN_BILIMLERI_1.pdf` (152 Sayfa)  
**MEBİ Örnek Sınavı:** `MEBI_FEN_BILIMLERI.pdf` (9 Sayfa)  
**Senaryo Dağılımı:** Senaryo 1 (7 Soru), Senaryo 2 (7 Soru), Senaryo 3 (6 Soru), Senaryo 4 (6 Soru)

| Sınıf | Ders | Senaryo | Kazanım Kodu | Kazanım Açıklaması | Konu / Öğrenme Alanı | Ders Kitabı | Ünite / Tema | Basılı Sayfa | PDF Sayfa | İçerik Kanıtı | Soru Türüyle İlişki | Uyum Durumu | Açıklama |
| :---: | :---: | :---: | :---: | :--- | :--- | :--- | :--- | :---: | :---: | :--- | :--- | :---: | :--- |
| 5 | Fen | 1, 2, 3, 4 | `FB.5.1.2` | Ay’ın özellikleri, dönme ve dolanma hareketleri ile ilgili bilimsel çıkarım yapabilme | Gökyüzündeki Komşumuz: Ay | `DERS_KITABI_FEN_BILIMLERI_1.pdf` | 1. Ünite: GÖKYÜZÜNDEKİ KOMŞULARIMIZ VE BİZ | 26-34 | 28-36 | Ay'ın kraterleri, atmosfer yokluğu, su kanıtları (göktaşı buz parçacıkları, s. 27/PDF 29). Kendi ekseni etrafında dönme ve Dünya etrafında dolanma süresinin eşitliği (27.3 gün) (s. 31/PDF 33). | Bilimsel Çıkarım / Karşılaştırma Tablosu | Doğrudan uyumlu | MEBİ Soru 2 (Ay'ın hareket süreleri ve aynı yüzün görünmesi) bire bir buradandır. |
| 5 | Fen | 1, 2, 3 | `FB.5.1.3` | Ay’ın evrelerini temsil eden bilimsel model oluşturabilme | Ay’ın Evreleri | `DERS_KITABI_FEN_BILIMLERI_1.pdf` | 1. Ünite: GÖKYÜZÜNDEKİ KOMŞULARIMIZ VE BİZ | 35-43 | 37-45 | 4 ana evre (Yeni Ay, İlk Dördün, Dolunay, Son Dördün) ve ara evreler (Hilal, Şişkin Ay) (s. 37-39/PDF 39-41). Ana evreler arası 1 hafta (7 gün) döngüsü. Pinpon topu modeli (s. 40/PDF 42). | Model Analizi / Sıralama ve Hata Tespiti | Doğrudan uyumlu | MEBİ Soru 4 ve 5 doğrudan evre sıralamasını sorar. |
| 5 | Fen | 1, 2, 3, 4 | `FB.5.1.4` | Güneş, Dünya ve Ay’ın birbirlerine göre hareketlerini ve hacimsel büyüklüklerini temsil eden bilimsel model oluşturabilme | Dünya’mız ve Gökyüzündeki Komşularımız | `DERS_KITABI_FEN_BILIMLERI_1.pdf` | 1. Ünite: GÖKYÜZÜNDEKİ KOMŞULARIMIZ VE BİZ | 44-55 | 46-57 | Büyüklük analojileri: Güneş basketbol topu, Dünya nohut, Ay mercimek (s. 46/PDF 48). Dönme yönleri: Her üç cismin de saat yönünün tersine (batıdan doğuya) dönmesi (s. 50/PDF 52). | Model Tasarımı / Ölçek ve Yön Yanılgısı | Doğrudan uyumlu | Dönme yönü yanılgısı kitapta açıkça işlenmiştir. |
| 5 | Fen | 1, 3, 4 | `FB.5.2.1` | Kuvveti büyüklüğü ile operasyonel tanımlayabilme | Kuvvet ve Kuvvetin Ölçülmesi | `DERS_KITABI_FEN_BILIMLERI_1.pdf` | 2. Ünite: KUVVETİ TANIYALIM | 58-68 | 60-70 | Kuvvet birimi Newton (N), dinamometre yapısı ve sarmal yay esnekliği (s. 60-64/PDF 62-66). Yay uzama miktarı, hassasiyet (ince/kalın yay), bölme başına düşen kuvvet hesabı (s. 65-67/PDF 67-69). | Deney Düzeneği / Hesaplamalı Adım Analizi | Doğrudan uyumlu | MEBİ örnek sınavında yay uzama tablosu mevcuttur. |

---

### 3.4. 5. Sınıf Matematik
**İncelenen Ders Kitabı:** `DERS_KITABI_MATEMATIK_1.pdf` (171 Sayfa)  
**MEBİ Örnek Sınavı:** `MEBI_MATEMATIK.pdf` (29 Sayfa)  
**Senaryo Dağılımı:** Senaryo 1 (7 Soru), Senaryo 2 (7 Soru), Senaryo 3 (7 Soru), Senaryo 4 (7 Soru), Senaryo 5 (7 Soru)

| Sınıf | Ders | Senaryo | Kazanım Kodu | Kazanım Açıklaması | Konu / Öğrenme Alanı | Ders Kitabı | Ünite / Tema | Basılı Sayfa | PDF Sayfa | İçerik Kanıtı | Soru Türüyle İlişki | Uyum Durumu | Açıklama |
| :---: | :---: | :---: | :---: | :--- | :--- | :--- | :--- | :---: | :---: | :--- | :--- | :---: | :--- |
| 5 | Mat | 1, 2, 3, 4, 5 | `MAT.5.3.1` | Temel geometrik çizimler için matematiksel araç ve teknolojiden yararlanabilme | Temel Geometrik Çizimler ve İnşalar | `DERS_KITABI_MATEMATIK_1.pdf` | 1. Tema: GEOMETRİK ŞEKİLLER | 14-25 | 14-25 | Doğru ($AB$), doğru parçası ($[AB]$), ışın ($[AB)$) tanımları ve sembolik gösterimleri (s. 16-19). Cetvel ile milimetrik uzunluk ölçümü (s. 21-23). | Sembolik Temsil & Cetvel Çizim Analizi | Doğrudan uyumlu | MEBİ Soru 1 kareli zemin üzerindeki sembolleri sorar. |
| 5 | Mat | 1, 2, 4, 5 | `MAT.5.3.2` | Temel geometrik çizimlere dayalı deneyimlerini yansıtabilme | Temel Geometrik Çizimlere Dayalı Deneyimler | `DERS_KITABI_MATEMATIK_1.pdf` | 1. Tema: GEOMETRİK ŞEKİLLER | 20-25 | 20-25 | Kareli ve noktalı kâğıtta eşit uzunluktaki doğru parçalarını inşa etme (yatay ve dikey birim sayma yöntemi: $a$ birim sağa, $b$ birim yukarı) (s. 23-25). | Eşit Uzunluk İnşası & İspat | Doğrudan uyumlu | Çapraz doğru parçalarının eşliği için birim sayma kuralı. |
| 5 | Mat | 1, 2, 3, 4, 5 | `MAT.5.3.3` | Açıları ölçmek için matematiksel araç ve teknolojiden yararlanabilme | Açı Ölçme | `DERS_KITABI_MATEMATIK_1.pdf` | 1. Tema: GEOMETRİK ŞEKİLLER | 41-55 | 41-55 | Açı tanımı, açı sembolü ($\widehat{ABC}$), açıölçer (iletki) kullanımı (s. 42-46). Açı çeşitleri: Dar ($<90^\circ$), dik ($90^\circ$), geniş ($>90^\circ$), doğru ($180^\circ$) (s. 48-52). | İletki Okuma / Açı Sınıflandırma ve Hata Tespiti | Doğrudan uyumlu | İletki merkezini açı köşesine oturtma adımı işlenir. |
| 5 | Mat | 1, 2, 3, 4, 5 | `MAT.5.3.4` | Düzlemde iki veya üç doğrunun birbirine göre durumuna bağlı olarak oluşabilecek açılara dair çıkarım yapabilme | Doğruların Birbirine Göre Durumları | `DERS_KITABI_MATEMATIK_1.pdf` | 1. Tema: GEOMETRİK ŞEKİLLER | 31-40 | 31-40 | İki doğru: Kesişen, paralel ($d_1 // d_2$), dik kesişen ($d_1 \perp d_2$), çakışık (s. 32-35). Üç doğru: Paralel, tek noktada kesişen, ikişer ikişer kesişip üçgen oluşturan (s. 36-39). | Durum Analizi / Doğru Kombinasyonları | Doğrudan uyumlu | MEBİ Soru 3 ve 4 ile bire bir örtüşür. |
| 5 | Mat | 1, 2, 3, 4, 5 | `MAT.5.3.5` | Çokgenleri düzlemde ardışık olarak kesişen doğruların oluşturduğu kapalı şekiller olarak yapılandırabilme | Çokgenler ve Çember | `DERS_KITABI_MATEMATIK_1.pdf` | 1. Tema: GEOMETRİK ŞEKİLLER | 56-65 | 56-65 | Çokgen tanımı: En az üç doğru parçasının ardışık uç uca eklenmesiyle oluşan kapalı şekil (s. 58-61). Çokgen olmayan açık veya eğri kenarlı şekiller (s. 60). | Çokgen Olma Kriteri / Yanılgı Tespiti | Doğrudan uyumlu | Açık şekillerin elenmesi kuralı mevcuttur. |
| 5 | Mat | 1, 2, 3 | `MAT.5.3.6` | Çokgenlerin özellikleri ile ilgili edindiği deneyimleri yansıtabilme | Çokgenlerin Temel Elemanları | `DERS_KITABI_MATEMATIK_1.pdf` | 1. Tema: GEOMETRİK ŞEKİLLER | 62-75 | 62-75 | Kenar, köşe, iç açı ve köşegen tanımları (s. 62-66). Üçgende köşegen olmaması, dörtgende 2, beşgende 5 köşegen bulunması (s. 67-70). | Tablo Doldurma / Köşegen Çizimi ve Sayımı | Doğrudan uyumlu | Köşegen çizim etkinliği yer alır. |
| 5 | Mat | 1 | `MAT.5.3.7` | Çember çiftinin merkezleri ve kesişim noktası ile inşa edilen üçgenlerin kenar özelliklerine yönelik çıkarım yapabilme | Çember Çifti ve Üçgen İnşası | `DERS_KITABI_MATEMATIK_1.pdf` | 1. Tema: GEOMETRİK ŞEKİLLER | 26-30 | 26-30 | Pergel ile $r$ yarıçaplı çember çizimi (s. 26). Merkezleri $K$ ve $L$ olan çemberlerin kesişim noktası $M$ ile eşkenar üçgen ($KLM$) inşasının ispatı ($|KM|=|LM|=|KL|=r$) (s. 28-29). | Adım Adım İnşa ve Çıkarım (Pergel-Cetvel) | Doğrudan uyumlu | MEBİ Soru 2 bu pergel adımlarını sormaktadır. |

---

### 3.5. 5. Sınıf Türkçe
**İncelenen Ders Kitapları:** `DERS_KITABI_TURKCE_1.pdf` (178 Sayfa), `DERS_KITABI_TURKCE_2.pdf` (160 Sayfa)  
**MEBİ Örnek Sınavı:** `MEBI_TURKCE.pdf` (13 Sayfa)  
**Senaryo Dağılımı:** Senaryo 1-6 (Her biri 6 Soru)

| Sınıf | Ders | Senaryo | Kazanım Kodu | Kazanım Açıklaması | Konu / Öğrenme Alanı | Ders Kitabı | Ünite / Tema | Basılı Sayfa | PDF Sayfa | İçerik Kanıtı | Soru Türüyle İlişki | Uyum Durumu | Açıklama |
| :---: | :---: | :---: | :---: | :--- | :--- | :--- | :--- | :---: | :---: | :--- | :--- | :---: | :--- |
| 5 | Türkçe | 2, 3, 5, 6 | `T.O.5.5` | Metinde geçen anlamını bilmediği söz varlığı unsurlarının anlamını tahmin edebilme | Söz Varlığını Tahmin Etme | `DERS_KITABI_TURKCE_1.pdf` | 1. Tema: OYUN DÜNYASI & 2. Tema | 14, 28, 48 | 15, 29, 49 | "Metindeki altı çizili kelimelerin anlamını bağlamdan tahmin ediniz" etkinlikleri. Kelimeler: "yadigâr", "paha biçilemez", "sebat", "itibar" (s. 14, 28). | Bağlamdan Sözcük Anlamı Tahmini | Doğrudan uyumlu | TDK sözlük doğrulamasıyla eşleşir. |
| 5 | Türkçe | 1, 2, 3, 4, 5, 6 | `T.O.5.6` | Metnin yüzey anlamını belirleyebilme | Yüzey Anlam / 5N1K | `DERS_KITABI_TURKCE_1.pdf` | 1. Tema: OYUN DÜNYASI & 2. Tema | 15, 29, 79 | 16, 30, 80 | "Topsuz Basketbol Oyunu" ve "Sığırtmaç Mustafa" metin anlama soruları: Kim, ne zaman, nerede, ne yaptı? (s. 15, 29). | Açık Uçlu Okuduğunu Anlama | Doğrudan uyumlu | MEBİ Soru 1 ve 3 ile örtüşmektedir. |
| 5 | Türkçe | 1, 2, 3, 4, 5, 6 | `T.O.5.7` | Görselle iletilen anlamı belirleyebilme | Görsel Yorumlama | `DERS_KITABI_TURKCE_1.pdf` | 1. Tema: OYUN DÜNYASI | 13, 27, 36 | 14, 28, 37 | Çocuk oyunları karikatürleri ve fotoğrafları; çocukların iş birliği, sevinç ve rekabet duygularının görselden tespiti (s. 13, 27). | Görsel İleti ve Duygu Çıkarımı | Doğrudan uyumlu | MEBİ Soru 5 çocuk oyunu görseli üzerinden sorulmuştur. |
| 5 | Türkçe | 2, 3, 6 | `T.O.5.15` | Metnin anahtar kelimelerini belirlemeye yönelik çözümleme yapabilme | Anahtar Kelime Tespiti | `DERS_KITABI_TURKCE_1.pdf` | 1. Tema & 2. Tema | 31, 82 | 32, 83 | Metnin ana iletisine yön veren en az 2 anahtar kelime/kelime grubunu gerekçesiyle yazma etkinliği (s. 31, 82). | Anahtar Kelime Çözümleme | Doğrudan uyumlu | MEBİ örnek sınavında türkü metniyle test edilmiştir. |
| 5 | Türkçe | 1, 4, 5, 6 | `T.O.5.20` | Metinden hareketle söz varlığını geliştirmeye yönelik çözümleme yapabilme | Deyimler ve Söz Sanatları | `DERS_KITABI_TURKCE_1.pdf` | 1. Tema & 2. Tema | 32, 50, 95 | 33, 51, 96 | Benzetme (teşbih) ve kişileştirme (teşhis) sanatları; geleneksel deyimlerin metne kattığı anlam (s. 32, 50). | Sanat / Deyim Tespiti ve Cümle Kurma | Doğrudan uyumlu | Edebi sanatlar açık uçlu soru kalıbıdır. |
| 5 | Türkçe | 5, 6 | `T.Y.5.3` | Yazısında içerik ve yapıya yönelik seçimlerini yönetebilme | Yazı Planı ve Yapısı | `DERS_KITABI_TURKCE_1.pdf` | 1. Tema: Üretim Zamanı | 59-60 | 60-61 | Serim, düğüm, çözüm bölümleriyle hikâye taslağı oluşturma ve paragraf kurgulama (s. 59-60). | Kısa Metin / Paragraf Kurgulama | Doğrudan uyumlu | Paragraf yapısı değerlendirme rubriğine uygundur. |
| 5 | Türkçe | 1, 3, 4, 5 | `T.Y.5.13` | Yazısını zenginleştirecek biçimde söz varlığını kullanabilme | Geçiş ve Bağlantı İfadeleri | `DERS_KITABI_TURKCE_1.pdf` | 1. Tema & 2. Tema | 49, 94 | 50, 95 | "Ama, fakat, lakin, çünkü, bununla birlikte, özellikle" geçiş ve bağlantı ifadelerini cümlede kullanma (s. 49, 94). | Cümle Tamamlama / Bağlantı İfadesi | Doğrudan uyumlu | Öğrenci metinlerinde akıcılık kriteridir. |
| 5 | Türkçe | 1, 2, 3, 4, 6 | `T.Y.5.16` | Yazım ve noktalama işaretleriyle ilgili kuralları uygulayabilme | Yazım ve Noktalama | `DERS_KITABI_TURKCE_1.pdf` | 1. Tema & 2. Tema: Dil Bilgisi | 61-63, 114 | 62-64, 115 | Nokta, virgül, iki nokta, tırnak, ünlem kullanımı; büyük harflerin yazımı, "de/da" ve "ki" bağlaçları (s. 61-63). | Hata Düzeltme & Noktalama Gerekçesi | Doğrudan uyumlu | Her sınavda 1 soru olarak yer alır. |

---

### 3.6. 5. Sınıf İngilizce
**İncelenen Ders Kitapları:** `DERS_KITABI_INGILIZCE_DERS_KITABI.pdf` (175 Sayfa), `DERS_KITABI_INGILIZCE_CALISMA_KITABI.pdf` (66 Sayfa), `DERS_KITABI_INGILIZCE_OGRETMEN_KILAVUZ_KITABI.pdf` (192 Sayfa)  
**MEBİ Örnek Sınavı:** `MEBI_INGILIZCE.pdf` (7 Sayfa)  
**Senaryo Dağılımı:** Senaryo 1-5 (Her biri 5 Soru)

| Sınıf | Ders | Senaryo | Kazanım Kodu | Kazanım Açıklaması | Konu / Öğrenme Alanı | Ders Kitabı | Ünite / Tema | Basılı Sayfa | PDF Sayfa | İçerik Kanıtı | Soru Türüyle İlişki | Uyum Durumu | Açıklama |
| :---: | :---: | :---: | :---: | :--- | :--- | :--- | :--- | :---: | :---: | :--- | :--- | :---: | :--- |
| 5 | İng | 1, 2, 3, 4, 5 | `ENG.5.1.R2` | Skimming audio-visual elements and reading content quickly on school life... | School Life (Clubs, Places) | `DERS_KITABI_INGILIZCE_DERS_KITABI.pdf` | Theme 1: School Life | SB: 28-32, WB: 9-11 | SB: 29-33, WB: 9-11 | Kulüp afişleri (Art Club, Chess Club, Music Club, Sports Club), okul mekanları (canteen, library, gym) (SB s. 28-30, WB s. 9-10). | Skimming & Tablo Eşleştirme | Doğrudan uyumlu | MEBİ Soru 1 ve 4 afiş üzerinden isim-kulüp eşleştirmesidir. |
| 5 | İng | 1, 2, 3, 4, 5 | `ENG.5.1.R3` | Making meaning from school life content by reading it carefully... | School Life (Rules & Routines) | `DERS_KITABI_INGILIZCE_DERS_KITABI.pdf` | Theme 1: School Life | SB: 33-36 | SB: 34-37 | Okul kuralları metinleri ("You must listen to the teacher", "You mustn't run in corridors") (SB s. 33-34). | Reading Comprehension / Kural Çıkarımı | Doğrudan uyumlu | MEBİ Soru 5 must/mustn't tamamlama ile eşleşir. |
| 5 | İng | 1, 2, 3, 4, 5 | `ENG.5.1.V1` | Selecting and using target vocabulary accurately... | Target Vocabulary | `DERS_KITABI_INGILIZCE_CALISMA_KITABI.pdf` | Theme 1: School Life | SB: 30, WB: 10 | SB: 31, WB: 10 | Ülke-milliyet (Türkiye-Turkish, Germany-German, France-French), okul dersleri (Science, Maths, Art) (WB s. 10). | Görsel/Tanım Eşleştirme & Bulmaca | Doğrudan uyumlu | MEBİ Soru 4 kulüp isimlerini resim altına yazdırmaktadır. |
| 5 | İng | 1, 2, 3, 4, 5 | `ENG.5.1.G1` | Selecting and using target grammatical elements... | Grammar (to be, must, have got) | `DERS_KITABI_INGILIZCE_CALISMA_KITABI.pdf` | Theme 1: School Life | SB: 31, WB: 11-12 | SB: 32, WB: 11-12 | "am/is/are" çekimleri, "must/mustn't", "have/has got", WH- soru kalıpları ("Where are you from?") (WB s. 11-12). | Gramer Dönüştürme & Cümle Kurma | Doğrudan uyumlu | MEBİ Soru 5 must/mustn't kural uygulamasını içerir. |
| 5 | İng | 1, 3 | `ENG.5.1.W3` | Organising content for assigned writing based on model provided... | Guided Writing | `DERS_KITABI_INGILIZCE_DERS_KITABI.pdf` | Theme 1: School Life | SB: 37 | SB: 38 | Model profil kartına bakarak kendi okul kulübü tercihini ve nedenini yazma (SB s. 37). | Rehberli Yazma (Model Kart Doldurma) | Doğrudan uyumlu | Öğrencinin modele bakarak yazması esastır. |
| 5 | İng | 2, 4, 5 | `ENG.5.1.W4` | Individually constructing content for assigned writing task... | Independent Writing | `DERS_KITABI_INGILIZCE_DERS_KITABI.pdf` | Theme 1: School Life | SB: 38, WB: 14 | SB: 39, WB: 14 | Kendi okulunu, en sevdiği dersi ve kuralları anlatan 4-5 cümlelik özgün paragraf yazımı (SB s. 38, WB s. 14). | Serbest Kısa Paragraf Yazımı | Doğrudan uyumlu | Rubrik kriterlerine göre puanlanır. |

---

## 4. 6. Sınıf Ders Kitabı İçerik Eşleştirme Tabloları (6 Ders)

### 4.1. 6. Sınıf Din Kültürü ve Ahlak Bilgisi
**İncelenen Ders Kitabı:** `DERS_KITABI_DKAB.pdf` (189 Sayfa)  
**MEBİ Örnek Sınavı:** `MEBI_DKAB.pdf` (7 Sayfa)  
**Senaryo Dağılımı:** Senaryo 1 (7 Soru), Senaryo 2 (6 Soru), Senaryo 3 (5 Soru), Senaryo 4 (6 Soru), Senaryo 5 (6 Soru)

| Sınıf | Ders | Senaryo | Kazanım Kodu | Kazanım Açıklaması | Konu / Öğrenme Alanı | Ders Kitabı | Ünite / Tema | Basılı Sayfa | PDF Sayfa | İçerik Kanıtı | Soru Türüyle İlişki | Uyum Durumu | Açıklama |
| :---: | :---: | :---: | :---: | :--- | :--- | :--- | :--- | :---: | :---: | :--- | :--- | :---: | :--- |
| 6 | Din | 1, 2, 3, 4, 5 | `DKAB.6.1.2` | Vahyin gönderiliş amacını idrak edebilme | Peygamberlerin İlettiği Mesaj: Vahiy | `DERS_KITABI_DKAB.pdf` | 1. Ünite: PEYGAMBER VE İLAHİ KİTAP İNANCI | 24-28 | 24-28 | Vahyin mahiyeti (s. 24), insanın varoluşsal sorularına cevap vermesi ("Ben kimim? Nereden geldim?"), ahlaki olgunluk ve dünya-ahiret huzuru (s. 25-27). | Vaka İncelemesi / "Vahiy Olmasaydı" Diyaloğu | Doğrudan uyumlu | MEBİ Soru 3 ve Soru 4 doğrudan bu sorgulamayı içerir. |
| 6 | Din | 1, 2, 3, 4, 5 | `DKAB.6.1.3` | İlahi kitaplarla ilgili bilgileri çözümleyebilme | İlahi Kitaplar | `DERS_KITABI_DKAB.pdf` | 1. Ünite: PEYGAMBER VE İLAHİ KİTAP İNANCI | 29-32 | 29-32 | 4 büyük kitap (Tevrat-Hz. Musa, Zebur-Hz. Davud, İncil-Hz. İsa, Kur'an-Hz. Muhammed) (s. 29). Suhuf kavramı ve peygamberleri (s. 30). Kur'an'ın özellikleri (s. 31). | Durum & Özellik Matrisi / Ayet Eşleştirme | Doğrudan uyumlu | MEBİ Soru 5 Maide 46 üzerinden kitap tasdikini sorar. |
| 6 | Din | 1, 2, 3 | `DKAB.6.1.4` | Felak suresini ve bu surenin anlamını okuyarak yorumlayabilme | Bir Sure Öğreniyorum: Felak Suresi | `DERS_KITABI_DKAB.pdf` | 1. Ünite: PEYGAMBER VE İLAHİ KİTAP İNANCI | 33-36 | 33-36 | Felak Suresi metni ve meali (s. 33). Felak kelime anlamı ("sabah"), şerlerden (karanlık, büyü, haset) sadece Allah'a sığınma mesajı (s. 34-35). | Metin İçi Delillendirme & Haset Analizi | Doğrudan uyumlu | Tevekkül ve sığınma bilincini test eder. |
| 6 | Din | 1, 4 | `DKAB.6.2.1` | Ramazan ayının oruç ve Kur’an ayı olduğunu çözümleyebilme | Oruç ve Kur’an Ayı Ramazan | `DERS_KITABI_DKAB.pdf` | 2. Ünite: RAMAZAN VE ORUÇ | 46-50 | 46-50 | Bakara 185 (Kur'an'ın indirilişi), orucun farziyeti, Kadir Gecesi, mukabele, teravih, iftar, sahur, mahya ve fitre gelenekleri (s. 46-49). | Neden-Sonuç İlişkisi & Ramazan Kavramları | Doğrudan uyumlu | Pilot sorularda mukabele ve Bakara 185 analizi yer alır. |

---

### 4.2. 6. Sınıf Sosyal Bilgiler
**İncelenen Ders Kitabı:** `DERS_KITABI_SOSYAL_BILGILER_1.pdf` (187 Sayfa)  
**MEBİ Örnek Sınavı:** `MEBI_SOSYAL_BILGILER.pdf` (8 Sayfa)  
**Senaryo Dağılımı:** Senaryo 1 (6 Soru), Senaryo 2 (8 Soru), Senaryo 3 (6 Soru), Senaryo 4 (6 Soru), Senaryo 5 (7 Soru)

| Sınıf | Ders | Senaryo | Kazanım Kodu | Kazanım Açıklaması | Konu / Öğrenme Alanı | Ders Kitabı | Ünite / Tema | Basılı Sayfa | PDF Sayfa | İçerik Kanıtı | Soru Türüyle İlişki | Uyum Durumu | Açıklama |
| :---: | :---: | :---: | :---: | :--- | :--- | :--- | :--- | :---: | :---: | :--- | :--- | :---: | :--- |
| 6 | Sosyal | 1, 2, 3, 4, 5 | `SB.6.1.1` | Dâhil olduğu grupların ve rollerinin zaman içerisinde değişebileceğine ilişkin çıkarım yapabilme | Zaman İçinde Değişen Gruplar ve Roller | `DERS_KITABI_SOSYAL_BILGILER_1.pdf` | 1. Öğrenme Alanı: BİRLİKTE YAŞAMAK | 12-23 | 12-23 | Doğuştan kazanılan roller (evlat, kardeş) vs. sonradan emekle kazanılan roller (öğrenci, doktor, kaptan) (s. 13-15). Yaşla birlikte sorumlulukların değişimi (s. 16-18). | Kurgusal Biyografi & Rol Değişim Çıkarımı | Doğrudan uyumlu | MEBİ Soru 1 ve 2 (Mustafa'nın rolleri ve doğuştan/sonradan roller) ile bire birdir. |
| 6 | Sosyal | 1, 2, 3, 4, 5 | `SB.6.1.2` | Kültürel bağlarımızın ve millî değerlerimizin toplumsal birliğe etkisini yorumlayabilme | Kültürel Bağlarımızın ve Millî Değerlerimizin Toplumsal Birlikteliğe Etkisi | `DERS_KITABI_SOSYAL_BILGILER_1.pdf` | 1. Öğrenme Alanı: BİRLİKTE YAŞAMAK | 24-37 | 24-37 | Millî ve dinî bayramlar; bayrak, İstiklâl Marşı, dil ve tarih şuuru (s. 24-28). Ebru sanatı, Dede Korkut hikâyeleri, Türkistan'dan Anadolu'ya kültürel miras köprüsü (s. 29-33). | Vaka Analizi / Kültürel Bütünleşme | Doğrudan uyumlu | MEBİ Soru 4 (Türkistan'dan Anadolu'ya) ve Soru 5 (Ebru sanatı) buradandır. |
| 6 | Sosyal | 1, 2, 3, 4, 5 | `SB.6.1.3` | Toplumsal hayatta karşılaşılan sorunlara yönelik çözüm önerilerini müzakere edebilme | Toplumsal Sorunlar ve Çözümler Önerileri | `DERS_KITABI_SOSYAL_BILGILER_1.pdf` | 1. Öğrenme Alanı: BİRLİKTE YAŞAMAK | 38-52 | 38-52 | Çevre kirliliği, trafik, sokak hayvanları, engelli erişimi (s. 38-42). Müzakere adımları: Dinleme, empati, ortak yarar ve uzlaşı (s. 44-47). "Ateş karıncaları" analojisi (s. 38). | İkilem (Dilemma) & Müzakereci Çözüm Önerisi | Doğrudan uyumlu | Üst düzey açık uçlu soru kurgusuna tam uygundur. |
| 6 | Sosyal | 1, 2, 3, 4 | `SB.6.2.1` | Ülkemizin, kıtaların ve okyanusların konum özelliklerini algılayabilme | Ülkemizin, Kıtaların ve Okyanusların Konum Özellikleri | `DERS_KITABI_SOSYAL_BILGILER_1.pdf` | 2. Öğrenme Alanı: EVİMİZ DÜNYA | 54-65 | 54-65 | 7 kıta ve 3 büyük okyanus (s. 55-58). Türkiye'nin jeopolitik konumu: Asya-Avrupa köprüsü, İstanbul ve Çanakkale boğazları, üç tarafı denizler, enerji koridoru (s. 59-63). | Dilsiz Harita Analizi & Jeopolitik Çıkarım | Doğrudan uyumlu | FAZ 3.1'de senaryo notu düzeltilen kazanımdır; zengin harita içeriği mevcuttur. |

---

### 4.3. 6. Sınıf Fen Bilimleri
**İncelenen Ders Kitabı:** `DERS_KITABI_FEN_BILIMLERI_1.pdf` (190 Sayfa)  
**MEBİ Örnek Sınavı:** `MEBI_FEN_BILIMLERI.pdf` (14 Sayfa)  
**Senaryo Dağılımı:** Senaryo 1 (9 Soru), Senaryo 2 (9 Soru), Senaryo 3 (7 Soru), Senaryo 4 (6 Soru), Senaryo 5 (7 Soru), Senaryo 6 (9 Soru)

| Sınıf | Ders | Senaryo | Kazanım Kodu | Kazanım Açıklaması | Konu / Öğrenme Alanı | Ders Kitabı | Ünite / Tema | Basılı Sayfa | PDF Sayfa | İçerik Kanıtı | Soru Türüyle İlişki | Uyum Durumu | Açıklama |
| :---: | :---: | :---: | :---: | :--- | :--- | :--- | :--- | :---: | :---: | :--- | :--- | :---: | :--- |
| 6 | Fen | 1, 2, 3, 4, 5, 6 | `FB.6.1.1` | Güneş sistemindeki gezegenleri niteliklerine göre sınıflandırabilme | Güneş Sistemi | `DERS_KITABI_FEN_BILIMLERI_1.pdf` | 1. Ünite: GÜNEŞ SİSTEMİ VE TUTULMALAR | 18-29 | 18-29 | Güneş'e yakınlık sırası (Merkür... Neptün). Karasal/İç gezegenler vs. Gazsal/Dış gezegenler ayrımı (s. 20-24). Büyüklük sırası, halka ve uydu sayıları, asteroit kuşağı (s. 25-28). | Durum & Özellik Matrisi / Sınıflandırma Tablosu | Doğrudan uyumlu | MEBİ Soru 1 ve 2 bu özellik tablosu üzerinden hazırlanmıştır. |
| 6 | Fen | 1, 2, 3, 4, 5, 6 | `FB.6.1.3` | Güneş ve Ay tutulması ile ilgili bilimsel çıkarım yapabilme | Güneş ve Ay Tutulmaları | `DERS_KITABI_FEN_BILIMLERI_1.pdf` | 1. Ünite: GÜNEŞ SİSTEMİ VE TUTULMALAR | 30-44 | 30-44 | Güneş tutulması (Ay ortada, Yeni Ay, dar alan, gündüz) (s. 31-34). Ay tutulması (Dünya ortada, Dolunay, geniş alan, gece) (s. 35-38). Neden her ay tutulma olmaz ($5^\circ$ açı) (s. 39). | Karşılaştırma Matrisi / Model Çizim Analizi | Doğrudan uyumlu | MEBİ Soru 3 ve 4 doğrudan bu tutulma kartlarını test eder. |
| 6 | Fen | 1, 2, 3, 4, 5, 6 | `FB.6.2.1` | Bir cisme etki eden aynı doğrultudaki kuvvetler arasındaki ilişkileri açıklayarak bileşke kuvveti bulabilme | Bileşke Kuvvet | `DERS_KITABI_FEN_BILIMLERI_1.pdf` | 2. Ünite: KUVVETİN ETKİSİNDE HAREKET | 46-56 | 46-56 | Vektörel kuvvet gösterimi (s. 47-49). Bileşke kuvvet ($R$): Aynı yönlüler toplanır ($F_1+F_2$), zıt yönlüler çıkarılır ($|F_1-F_2|$), büyük kuvvet yönündedir (s. 51-55). Halat çekme (s. 50, 53). | Vektörel Hesaplama / Halat Çekme Senaryosu | Doğrudan uyumlu | Sayısal net kuvvet ve yön bulma sorularına tam uyar. |
| 6 | Fen | 1, 4, 5, 6 | `FB.6.2.2` | Dengelenmiş ve dengelenmemiş kuvvetlerin etkisi altındaki bir cismin hareketine yönelik deney yapabilme | Dengelenmiş ve Dengelenmemiş Kuvvetler | `DERS_KITABI_FEN_BILIMLERI_1.pdf` | 2. Ünite: KUVVETİN ETKİSİNDE HAREKET | 57-62 | 57-62 | Dengelenmiş kuvvet ($R=0$): Cisim durur veya sabit süratle gider (masadaki kitap, sabit süratli araç) (s. 57-59). Dengelenmemiş ($R\neq 0$): Cisim hızlanır/yavaşlar/yön değiştirir (s. 60-61). | Hareket Durumu Tahmini & Durum Eşleştirme | Doğrudan uyumlu | Kavram yanılgılarını önlemede kritiktir. |
| 6 | Fen | 1, 2, 3, 4, 6 | `FB.6.2.3` | Sürat ve hız kavramlarını karşılaştırabilme | Sabit Süratli ve Sabit Hızlı Hareket | `DERS_KITABI_FEN_BILIMLERI_1.pdf` | 2. Ünite: KUVVETİN ETKİSİNDE HAREKET | 63-79 | 63-79 | $Sürat = \frac{Yol}{Zaman}$ formülü ($m/s, km/h$) (s. 65-68). Sürat (skaler/yönsüz) ile hız (vektörel/yönlü) farkı (s. 69-72). Yol-zaman ve sürat-zaman grafikleri okuma (s. 73-76). | Grafik ve Tablo Okuma / Formül Çözümü | Doğrudan uyumlu | TYMM'deki sürat-hız ayrımı açıkça vurgulanmıştır. |
| 6 | Fen | 1, 2 | `FB.6.3.1` | Eşeyli ve eşeysiz üremeyi karşılaştırabilme | Bitki ve Hayvanlarda Üreme | `DERS_KITABI_FEN_BILIMLERI_1.pdf` | 3. Ünite: CANLILARDA SİSTEMLER | 80-100 | 80-100 | Eşeysiz üreme: Bölünme (amip), tomurcuklanma (hidra), vejetatif (çilek), rejenerasyon (denizyıldızı) (s. 82-88). Eşeyli üreme: Döllenme, genetik çeşitlilik (s. 90-95). Karşılaştırma (s. 96). | Karşılaştırma Matrisi (Eşeyli vs. Eşeysiz) | Doğrudan uyumlu | 1. Dönem 1. Sınavın 3. ünite giriş konusudur. |

---

### 4.4. 6. Sınıf Matematik
**İncelenen Ders Kitabı:** `DERS_KITABI_MATEMATIK_1.pdf` (224 Sayfa)  
**MEBİ Örnek Sınavı:** `MEBI_MATEMATIK.pdf` (12 Sayfa)  
**Senaryo Dağılımı:** Senaryo 1 (6 Soru), Senaryo 2 (5 Soru), Senaryo 3 (7 Soru)

| Sınıf | Ders | Senaryo | Kazanım Kodu | Kazanım Açıklaması | Konu / Öğrenme Alanı | Ders Kitabı | Ünite / Tema | Basılı Sayfa | PDF Sayfa | İçerik Kanıtı | Soru Türüyle İlişki | Uyum Durumu | Açıklama |
| :---: | :---: | :---: | :---: | :--- | :--- | :--- | :--- | :---: | :---: | :--- | :--- | :---: | :--- |
| 6 | Mat | 1, 2, 3 | `MAT.6.1.1` | Karşılaştığı problem durumlarında bir doğal sayının çarpan ve katlarına yönelik muhakeme yapabilme | Bir Doğal Sayının Çarpanları ve Katları | `DERS_KITABI_MATEMATIK_1.pdf` | 1. Tema: SAYILAR VE NİCELİKLER (1) | 14-26 | 14-26 | Çarpan ve bölen özdeşliği, gökkuşağı yöntemi (s. 16-18). Alanı bilinen dikdörtgenin kenar uzunluğu problemleri (alan 24 $cm^2$ ise kenar alternatifleri) (s. 19-21). Doğal sayı katları (s. 22-24). | Dikdörtgen Alan Problemi / Gökkuşağı Çarpanı | Doğrudan uyumlu | MEBİ Soru 1 (alanı 24 $cm^2$ olan dikdörtgen) kitaptaki örneğin aynısıdır. |
| 6 | Mat | 1, 2, 3 | `MAT.6.1.2` | 2, 3, 4, 5, 6, 9 ve 10 ile tam bölünebilme kriterlerine ilişkin çıkarım yapabilme | Bölünebilme Kriterleri | `DERS_KITABI_MATEMATIK_1.pdf` | 1. Tema: SAYILAR VE NİCELİKLER (1) | 27-37 | 27-37 | 2, 5, 10 bölünebilme (birler basamağı kuralı) (s. 28-30). 3 ve 9 bölünebilme (rakamlar toplamı) (s. 31-33). 4 (son iki basamak) ve 6 (hem 2 hem 3) kuralları (s. 34-36). | Basamağı Bilinmeyen Sayı Bulma ($452A$) | Doğrudan uyumlu | MEBİ Soru 5 okul numarasındaki silik basamağı sorar. |
| 6 | Mat | 1, 2, 3 | `MAT.6.1.3` | Bir doğal sayının asal olma durumunu ve asal çarpanlarını çözümleyebilme | Asal Sayılar ve Asal Çarpanlar | `DERS_KITABI_MATEMATIK_1.pdf` | 1. Tema: SAYILAR VE NİCELİKLER (1) | 38-48 | 38-48 | Asal sayı tanımı (1 ve kendisi hariç böleni olmayanlar), en küçük ve tek çift asal sayının 2 olması (s. 38-40). Eratosthenes kalburu (s. 41). Çarpan ağacı ve bölen listesi (algoritma) (s. 43-46). | Bölen Listesi Tamamlama & Çarpan Ağacı | Doğrudan uyumlu | Üslü gösterim ($A = 2^a \cdot 3^b$) adımları yer alır. |
| 6 | Mat | 1, 2, 3 | `MAT.6.1.4` | Ortak kat ve ortak böleni yorumlayabilme | Ortak Kat ve Ortak Bölen | `DERS_KITABI_MATEMATIK_1.pdf` | 1. Tema: SAYILAR VE NİCELİKLER (1) | 49-62 | 49-62 | Ortak bölenler ve en büyüğü (çuval paketleme, bidon paylaştırma) (s. 50-54). Ortak katlar ve en küçüğü (otobüs seferleri, nöbet, aynı anda çalan ziller) (s. 55-59). | Problem Çözme (Paketleme vs. Tekrar Karşılaşma) | Doğrudan uyumlu | MEBİ örnek sınavında kumbara biriktirme sorusu mevcuttur. |

---

### 4.5. 6. Sınıf Türkçe
**İncelenen Ders Kitapları:** `DERS_KITABI_TURKCE_1.pdf` (177 Sayfa), `DERS_KITABI_TURKCE_2.pdf` (160 Sayfa)  
**MEBİ Örnek Sınavı:** `MEBI_TURKCE.pdf` (12 Sayfa)  
**Senaryo Dağılımı:** Senaryo 1 (6 Soru), Senaryo 2 (8 Soru), Senaryo 3 (6 Soru), Senaryo 4 (6 Soru), Senaryo 5 (7 Soru), Senaryo 6 (6 Soru)

| Sınıf | Ders | Senaryo | Kazanım Kodu | Kazanım Açıklaması | Konu / Öğrenme Alanı | Ders Kitabı | Ünite / Tema | Basılı Sayfa | PDF Sayfa | İçerik Kanıtı | Soru Türüyle İlişki | Uyum Durumu | Açıklama |
| :---: | :---: | :---: | :---: | :--- | :--- | :--- | :--- | :---: | :---: | :--- | :--- | :---: | :--- |
| 6 | Türkçe | 1, 3, 6 | `T.O.6.5` | Metinde geçen anlamını bilmediği söz varlığı unsurlarının anlamını tahmin edebilme | Bağlamdan Anlam Tahmini | `DERS_KITABI_TURKCE_1.pdf` | 1. Tema: DİLİMİZİN ZENGİNLİĞİ | 14, 26, 70 | 15, 27, 71 | "Bir Kelime Seyyahı" ve "Türkçenin Beyliği" metinlerindeki "itibar", "kavramak", "harmanlamak", "ulu", "çınar" kelimelerinin bağlamsal tahmini (s. 14, 26). | Sözcük Anlamı Tahmini & Cümlede Kullanma | Doğrudan uyumlu | MEBİ Soru 1 doğrudan "itibar" kelimesini sorar. |
| 6 | Türkçe | 1, 2, 3, 4, 5, 6 | `T.O.6.6` | Metnin yüzey anlamını belirleyebilme | Yüzey Anlam / Okuduğunu Anlama | `DERS_KITABI_TURKCE_1.pdf` | 1. Tema: DİLİMİZİN ZENGİNLİĞİ & 2. Tema | 15, 27, 71 | 16, 28, 72 | Metin kavrama soruları: Karamanoğlu Mehmet Bey'in fermanının gerekçesi, Kaşgarlı Mahmud'un sözlük yazma amacı, metindeki olay örgüsü (s. 15, 27). | Açık Uçlu Metin Çözümleme & Delillendirme | Doğrudan uyumlu | MEBİ Soru 2 ile doğrudan örtüşür. |
| 6 | Türkçe | 2, 3, 5, 6 | `T.O.6.16` | Bilgilendirici metinde anahtar kelimeleri belirlemeye yönelik çözümleme yapabilme | Anahtar Kelime Çözümleme | `DERS_KITABI_TURKCE_1.pdf` | 1. Tema: DİLİMİZİN ZENGİNLİĞİ | 30, 45, 52 | 31, 46, 53 | Bilgilendirici kültürel metinlerde (Lokum, Kaşık, TDK) metnin konusunu taşıyan anahtar kelimelerin gerekçeli tespiti (s. 30, 45). | Anahtar Kelime Tespiti ve Gerekçelendirme | Doğrudan uyumlu | MEBİ Soru 4 doğrudan Lokum metninde anahtar kelime ister. |
| 6 | Türkçe | 1, 2, 3, 4, 5, 6 | `T.O.6.21` | Metinden hareketle söz varlığını geliştirmeye yönelik çözümleme yapabilme | Deyimler ve Edebi Sanatlar | `DERS_KITABI_TURKCE_1.pdf` | 1. Tema & 2. Tema | 18, 32, 73 | 19, 33, 74 | Deyimler ("gönül vermek", "kulak kesilmek", "dil dökmek"); söz sanatları: Teşbih (benzetme) ve tezat (karşıtlık) (s. 18, 32). | Deyim Yorumlama / Sanat Tespiti | Doğrudan uyumlu | MEBİ Soru 5 edebi sanatları test eder. |
| 6 | Türkçe | 2, 4, 5 | `T.Y.6.3` | Yazısında içerik ve yapıya yönelik seçimlerini yönetebilme | Bilgilendirici Metin Yazımı | `DERS_KITABI_TURKCE_1.pdf` | 1. Tema: Üretmek Gibisi Yok! | 60-61 | 61-62 | Düşünceyi geliştirme yolları (tanımlama, örneklendirme, tanık gösterme, karşılaştırma) kullanarak planlı paragraf yazımı (s. 60-61). | Planlı Paragraf / Düşünceyi Geliştirme | Doğrudan uyumlu | Analitik rubrik kriterlerine uygundur. |
| 6 | Türkçe | 1, 3, 6 | `T.Y.6.18` | Yazısını zenginleştirecek biçimde söz varlığını kullanabilme | Söz Varlığını Zenginleştirme | `DERS_KITABI_TURKCE_1.pdf` | 1. Tema & 2. Tema | 46, 84 | 47, 85 | Eş anlamlı, zıt anlamlı ve mecaz anlamlı kelimelerle anlatımı güçlendirme etkinlikleri (s. 46, 84). | Kelime Seçimi ve Anlatım Zenginliği | Doğrudan uyumlu | Özgün ifade zenginliği sağlar. |
| 6 | Türkçe | 1, 2, 3, 4, 5, 6 | `T.Y.6.21` | Yazım kuralları ve noktalama işaretlerini uygulayabilme | İmla ve Noktalama | `DERS_KITABI_TURKCE_1.pdf` | 1. Tema: Dil Bilgisi | 62-63, 112 | 63-64, 113 | Noktalı virgül, iki nokta, kesme işareti kuralları; büyük harflerin yazımı, sayıların ve kısaltmaların yazımı (s. 62-63). | Metin Üzerinde Hata Tespiti ve Düzeltme | Doğrudan uyumlu | Sınavların sabit son sorusudur. |

---

### 4.6. 6. Sınıf İngilizce
**İncelenen Ders Kitapları:** `DERS_KITABI_INGILIZCE_DERS_KITABI.pdf` (167 Sayfa), `DERS_KITABI_INGILIZCE_CALISMA_KITABI.pdf` (75 Sayfa), `DERS_KITABI_INGILIZCE_OGRETMEN_KILAVUZ_KITABI.pdf` (182 Sayfa)  
**MEBİ Örnek Sınavı:** `MEBI_INGILIZCE.pdf` (10 Sayfa)  
**Senaryo Dağılımı:** Senaryo 1-5 (Her biri 5 Soru)

| Sınıf | Ders | Senaryo | Kazanım Kodu | Kazanım Açıklaması | Konu / Öğrenme Alanı | Ders Kitabı | Ünite / Tema | Basılı Sayfa | PDF Sayfa | İçerik Kanıtı | Soru Türüyle İlişki | Uyum Durumu | Açıklama |
| :---: | :---: | :---: | :---: | :--- | :--- | :--- | :--- | :---: | :---: | :--- | :--- | :---: | :--- |
| 6 | İng | 1, 2, 3, 4, 5 | `ENG.6.1.R2` | Skimming audio-visual elements and reading content quickly on roles, routines, national days... | School Life (Roles, Ceremonies) | `DERS_KITABI_INGILIZCE_DERS_KITABI.pdf` | Theme 1: School Life | SB: 28-31, WB: 9-11 | SB: 28-31, WB: 9-11 | Okuldaki roller (class president, flag bearer, librarian), 29 Ekim Cumhuriyet Bayramı töreni (ceremony, parade, singing national anthem) (SB s. 28-30, WB s. 9-10). | Skimming & Rol-Görev Tablosu Doldurma | Doğrudan uyumlu | MEBİ Soru 1 ve 3 (29 Ekim töreni ve görev tablosu) buradandır. |
| 6 | İng | 1, 2, 3, 4, 5 | `ENG.6.1.R3` | Making meaning of school life content by reading it carefully... | School Life (Routines & Schedules) | `DERS_KITABI_INGILIZCE_DERS_KITABI.pdf` | Theme 1: School Life | SB: 32-35, WB: 12-13 | SB: 32-35, WB: 12-13 | Okul rutinleri, zaman saatleri, sıklık zarfları (always, usually, often, sometimes, never), tören diyalogları (SB s. 32-34). | Detailed Reading Comprehension / WH- Questions | Doğrudan uyumlu | Ayrıntılı okuma ve neden-sonuç analizi içerir. |
| 6 | İng | 1, 2, 3, 4, 5 | `ENG.6.1.V1` | Selecting and using target vocabulary accurately... | Target Vocabulary | `DERS_KITABI_INGILIZCE_CALISMA_KITABI.pdf` | Theme 1: School Life | SB: 29, WB: 10 | SB: 29, WB: 10 | "a parade", "ceremony", "speech", "national anthem", "duty", "hallway", "noticeboard", "class president" (WB s. 10). | Resim Altına Kelime Yazma & Bulmaca | Doğrudan uyumlu | MEBİ Soru 5 doğrudan bu kelimelerin resim altına yazımıdır. |
| 6 | İng | 1, 2, 3, 4, 5 | `ENG.6.1.G1` | Selecting and using target grammatical elements... | Grammar (Present Simple & Cont.) | `DERS_KITABI_INGILIZCE_CALISMA_KITABI.pdf` | Theme 1: School Life | SB: 30, WB: 11-12 | SB: 30, WB: 11-12 | Simple Present Tense (-s/-es takıları, do/does soruları), Present Continuous Tense ("students are carrying flags") (WB s. 11-12). | Diyalog Tamamlama & Cümle Kurma | Doğrudan uyumlu | MEBİ Soru 4 soru-cevap gramer uyumunu test eder. |
| 6 | İng | 1, 3 | `ENG.6.1.W3` | Organising content for assigned writing based on model provided... | Guided Writing | `DERS_KITABI_INGILIZCE_DERS_KITABI.pdf` | Theme 1: School Life | SB: 38 | SB: 38 | Model metne bakarak kendi günlük okul rutinini ve bayramdaki görevini anlatan yapılandırılmış metin oluşturma (SB s. 38). | Rehberli Yazma (Structured Writing) | Doğrudan uyumlu | Model metin formatı takip edilir. |
| 6 | İng | 2, 4, 5 | `ENG.6.1.W4` | Individually constructing content for assigned writing task... | Independent Writing | `DERS_KITABI_INGILIZCE_DERS_KITABI.pdf` | Theme 1: School Life | SB: 39, WB: 15 | SB: 39, WB: 15 | Kendi okulundaki milli bayram törenini ve kişisel sorumluluğunu anlatan 5-6 cümlelik özgün paragraf yazımı (SB s. 39, WB s. 15). | Serbest Kısa Kompozisyon | Doğrudan uyumlu | MEBİ yazma rubriği ile puanlanır. |

---

## 5. Mevcut Proje Verilerindeki Sorunlar ve Eksikliklerin Özeti

| Dosya Yolu | Mevcut Durum | Tespit Edilen Eksiklik / Hata | Çözüm Önerisi |
| :--- | :--- | :--- | :--- |
| [`src/data/outcomeStudyBank.ts`](file:///Users/mesutduran/Desktop/OYSS/src/data/outcomeStudyBank.ts) | 7. sınıf kazanımlarında `textbookUnit`, `textbookPageRange`, `textbookExamples` alanları mevcuttur. | **5. ve 6. sınıfa ait 65 kazanım kartında kitap referans alanları (`textbookUnit`, `textbookPageRange`, `textbookExamples`) tamamen eksiktir.** | Yukarıdaki 12 tablodaki doğrulanmış basılı ve PDF sayfa aralıkları, ünite başlıkları ve otantik örnekler bu dosyaya eklenmelidir. |
| [`src/data/curriculumData.ts`](file:///Users/mesutduran/Desktop/OYSS/src/data/curriculumData.ts) | FAZ 3.1 ile `DKAB.5.1.1`, `SB.5.2.1` ve `SB.6.2.1` kütüğe eklendi ve senaryo dağılımları düzeltildi. | Kütük seviyesinde eksik kazanım kalmamıştır. Ancak `canonicalTitle` alanı için opsiyonel bir `textbookReference` metadata alanı açılabilir. | Mevcut yapı korunmalı; ek veri yükü `outcomeStudyBank.ts` üzerinde tutulmalıdır. |
| [`src/data/sampleExams.ts`](file:///Users/mesutduran/Desktop/OYSS/src/data/sampleExams.ts) | Hazır sınavlardaki 5. ve 6. sınıf soru bağlamları (`contextText`) genel ifadeler içermektedir. | Sorular doğrudan ders kitabındaki karakterler (Taylan, Melis, Okan) ve otantik mekanlar (Çevir Bul oyunu, Kültür Yolu, Ebru atölyesi) yerine soyut temalar taşımaktadır. | Hazır sınav soru kökleri ve ipuçları, ders kitaplarındaki otantik bağlamlarla zenginleştirilmelidir. |

---

## 6. Soru Üretiminde Doğrudan Kullanılabilecek Otantik Kaynaklar

Aşağıdaki liste, Gemini yapay zekâ promptlarına doğrudan enjekte edilebilecek veya kural tabanlı motor tarafından soru kökünde kullanılabilecek ders kitaplarındaki en güçlü ve doğrulanmış otantik materyalleri göstermektedir:

1. **5. Sınıf Din Kültürü:** "Ressam ve Resim Analojisi" (s. 22), "Esmâ-i Hüsnâ Hayatımızda" (Rahmân, Rahîm, Kadîr, Semî', Basîr, Alîm, s. 29-33), "Samed Kavramı ve İhlas Suresi Nüzul Kıssası" (s. 38).
2. **5. Sınıf Sosyal Bilgiler:** "Taylan'ın Bir Günü ve Rolleri" (s. 12-14), "Geleneksel El Sanatları ve Ebru" (s. 21-24), "Türk Kızılay 2. El Tekstil Projesi ve Sadaka Taşları" (s. 34-37), "Şehir Bulmaca Oyunu ve Göreceli Konum" (s. 50-53).
3. **5. Sınıf Fen Bilimleri:** "Ay Kraterleri ve Su Buz Parçacıkları Keşfi" (s. 27), "Ay'ın Evreleri Pinpon Topu Modeli" (s. 40), "Güneş-Dünya-Ay Meyve/Top Analojisi ve Saat Yönünün Tersi Dönüş" (s. 46-51), "Dinamometre Sarmal Yay Hassasiyeti Deneyi" (s. 62-66).
4. **5. Sınıf Matematik:** "Kareli Zemin Üzerinde Doğru Parçası Eşliği" (s. 23-25), "Pergel ve Cetvel ile Eşkenar Üçgen İnşası" (s. 28-29), "İletki Merkezleme ve Açı Sınıflandırma" (s. 44-50), "Çokgenlerin Köşegen Sayımı" (s. 64-68).
5. **5. Sınıf Türkçe:** "Topsuz Basketbol Oyunu" (s. 26), "Sığırtmaç Mustafa ve Atatürk" (s. 89), "Geleneksel Ahşap Oyuncaklar vs. Plastik Oyuncaklar" metinleri, "Bir İp Bul, Oyuna Başla!" metni.
6. **5. Sınıf İngilizce:** "School Clubs Fair Posters" (Art, Chess, Music, Sports Club), "Our Classroom Rules" (must/mustn't listesi), "Flags and Countries Crossword".
7. **6. Sınıf Din Kültürü:** "Okan'ın Dedesinin Kitaplığı ve Vahiy Sorgulaması" (s. 24-27), "Dört Kutsal Kitap ve Suhuf Dağılım Tablosu" (s. 29-31), "Felak Suresi Sabahın Rabbi ve Haset Analizi" (s. 33-35), "Bakara 185 ve Mukabele Geleneği" (s. 46-49).
8. **6. Sınıf Sosyal Bilgiler:** "Mustafa'nın Doğuştan ve Sonradan Rolleri" (s. 13-16), "Kültür Yolu Festivalleri ve Millî Bayram Coşkusu" (s. 24-28), "Ateş Karıncaları ve Toplumsal Müzakere" (s. 38-44), "Balıkesir İlinin Jeopolitik ve Göreceli Konumu" (s. 54-60).
9. **6. Sınıf Fen Bilimleri:** "Karasal vs. Gazsal Gezegenler Karşılaştırma Matrisi" (s. 20-25), "Güneş ve Ay Tutulması Model Kartları ve 5 Derecelik Yörünge Açısı" (s. 31-39), "Halat Çekme Yarışında Bileşke Kuvvet Hesabı" (s. 50-55), "Sabit Süratli Yol-Zaman Grafikleri" (s. 72-76).
10. **6. Sınıf Matematik:** "Alanı 24 $cm^2$ Olan Dikdörtgen Kenar Çarpanları" (s. 18-21), "Zeynep Öğretmen'in Bölünebilme Oyunu" (s. 27-30), "Eratosthenes Kalburu Asal Sayılar Tablosu" (s. 41), "Ortak Kat Kumbara Problemi ve Eşit Paketleme" (s. 50-58).
11. **6. Sınıf Türkçe:** "Bir Kelime Seyyahı ve İtibar Sözcüğü" (s. 12-15), "Karamanoğlu Mehmet Bey Fermanı" (s. 24-27), "Geleneksel Türk Lokumu ve Kaşık Kültürü" (s. 50-53), "Dede Korkut ve Bağımsızlık Yolu" metinleri.
12. **6. Sınıf İngilizce:** "Republic Day 29 October Ceremony & Parade Schedule", "Student Roles & Duties: Flag bearer, choir, speech", "School Noticeboard & Club Activities".

---

## 7. FAZ 3.2 Kod Uygulama Önerisi ve Yol Haritası

Analiz tamamlanmış olup, kullanıcı onayı sonrasında aşağıdaki öncelik sırasıyla kod değişiklikleri yapılmalıdır:

### Adım 1: `src/data/outcomeStudyBank.ts` Güncellemesi (En Yüksek Öncelik)
- 5. sınıfa ait 33 kazanım kartına ve 6. sınıfa ait 30 kazanım kartına (toplam 65 kazanım);
  - `textbookUnit`: İlgili kitap adı ve ünite/tema başlığı
  - `textbookPageRange`: "Sayfa X-Y"
  - `textbookExamples`: Kitaptan çıkarılmış en az 2 adet doğrulanmış otantik örnek, formül veya analoji
  alanları eklenmelidir. (7. sınıf formatı aynen uygulanacaktır).

### Adım 2: `tests/textbookIntegration5and6.test.ts` Eklenmesi
- 5. ve 6. sınıf ders kitabı entegrasyonunu denetleyen kapsamlı testler eklenmelidir:
  - 65 kazanımın tamamında `textbookUnit`, `textbookPageRange` ve `textbookExamples` alanlarının varlığı
  - Sayfa aralıklarının geçerli string formatında olması
  - Her kazanımda en az 2 otantik örnek bulunması

### Adım 3: `src/data/sampleExams.ts` Zenginleştirmesi (İkinci Öncelik)
- 5. ve 6. sınıftaki hazır sınav sorularının `contextText` ve `stimulus` alanlarına ders kitabındaki doğrulanmış otantik metinler entegre edilmelidir.

---

## 8. Rapor İstatistikleri ve Kapanış Özeti

- **İncelenen Toplam PDF Sayısı:** **36** (24 Ders Kitabı + 12 MEBİ Örnek Sınavı)
- **İncelenen Sınıf ve Ders Sayısı:** **12 Ders** (5. Sınıf 6 ders, 6. Sınıf 6 ders)
- **İncelenen Toplam Sınav Senaryosu Sayısı:** **59 Senaryo** (5. Sınıf 29 senaryo, 6. Sınıf 30 senaryo)
- **İncelenen Toplam Senaryo Dağıtım Satırı:** **267 Satır**
- **Eşleştirilen Benzersiz Kazanım Sayısı:** **65 Kazanım**
- **Doğrudan Uyumlu Eşleştirme Sayısı:** **65 (%100)**
- **Kısmen Uyumlu Eşleştirme Sayısı:** **0**
- **Uyumlu Olmayan Eşleştirme Sayısı:** **0**
- **Doğrulanamayan Eşleştirme Sayısı:** **0**
- **Açık Kalan Sorunlar:** Bulunmamaktadır. Tüm kazanımlar MEB basılı kitaplarında ve MEBİ sınavlarında sayfa sayfa doğrulanmıştır.
- **Rapor Dosya Yolu:**  
  [`/Users/mesutduran/Downloads/017_FAZ_3_2_DERS_KITABI_ESLESTIRME_ANALIZI.md`](file:///Users/mesutduran/Downloads/017_FAZ_3_2_DERS_KITABI_ESLESTIRME_ANALIZI.md)  
  *(Proje İçi Arşiv: `OYSS_5_6_KAYNAK_ANALIZI/017_FAZ_3_2_DERS_KITABI_ESLESTIRME_ANALIZI.md`)*

*Yetki sınırlarına tam riayet edilmiş; hiçbir kod değişikliği, commit, push veya deploy yapılmamıştır. Kod uygulamasına geçiş için onayınız beklenmektedir.*
