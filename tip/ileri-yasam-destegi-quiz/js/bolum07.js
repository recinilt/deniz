// ============================================================
// BÖLÜM 7: İNME, HİPO/HİPERGLİSEMİ VE HİPOTERMİ
// Learn (Q&A) + Quiz Verileri
// ============================================================

window.bolum07_learn = [
  // ========== İNME ==========
  {q:"Serebrovasküler olay (SVO/İnme) nedir?",a:"Serebral kan akımının tıkanma (iskemi) veya kanamaya (hemoraji) bağlı bozulması sonucu ani olarak gelişen nörolojik tablodur."},
  {q:"İskemik ve hemorajik inme oranları nedir?",a:"Nörolojik acillerde vakaların yaklaşık %87'si iskemik, %13'ü hemorajik inmedir."},
  {q:"İskemik inmenin üç ana etyolojisi nedir?",a:"Tromboz (en sık), emboli ve hipoperfüzyon. Serebral embolinin en sık nedeni atriyal fibrilasyondur."},
  {q:"Hemorajik inme türleri nelerdir?",a:"İntraserebral kanama ve subaraknoid kanama. Özellikle hipertansiyona bağlı küçük arteriollerin kanaması şeklinde oluşur."},
  {q:"İnme neden kardiyak arreste yol açabilir?",a:"Bilinç kaybı → havayolu obstrüksiyonu → hipoksi → solunum durması → kardiyak arrest. Subaraknoid kanamalar kardiyak aritmilere ve miyokard disfonksiyonuna neden olabilir."},
  {q:"Cincinnati kriterleri nelerdir?",a:"3 basamaklı hızlı inme değerlendirmesi: 1) Fasiyal sarkma testi (gülme/diş gösterme), 2) Kolda güç testi (gözler kapalı kolları havada tutma), 3) Konuşma testi (basit cümle tekrarlama). Birinde anormallik varsa inme olasılığı %72."},
  {q:"FAST kriterleri nelerdir?",a:"F (Face-Yüz): sarkma/kayma var mı? A (Arms-Kollar): biri düşüyor mu? S (Speech-Konuşma): bozuk mu? T (Time-Zaman): hemen 112'yi ara."},
  {q:"Geçici iskemik atak (TIA) nedir?",a:"İnme belirtileri birkaç dakika-saat sonra normale döner. Kısa sürse de mutlaka hastaneye sevk edilmelidir."},
  {q:"İnmede kan basıncı yönetimi nasıl olmalıdır?",a:"Sistolik KB ≤220 mmHg ise düşürülmemelidir. >220 mmHg ise danışman hekim onayıyla Metoprolol 5 mg IV veya Kaptopril 25 mg SL. KB en fazla %20-30 düşürülmelidir."},
  {q:"İnmede hastaya neden Aspirin verilmemelidir?",a:"Hemorajik inme olasılığı ekarte edilmeden aspirin kanama riskini artırabilir. Antitrombotik/trombolitik tedaviler görüntüleme sonrasına ertelenmelidir."},
  {q:"İskemik inmede trombolitik tedavi için zaman penceresi nedir?",a:"Semptomların başlamasından itibaren 4,5 saat içinde trombolitik, 6 saat içinde endovasküler girişim uygun merkeze nakil sağlanmalıdır."},
  {q:"İnmede genel yaklaşım basamakları nelerdir?",a:"ABCDE, SpO2 %94-98, damar yolu (%0,9 NaCl), kan şekeri ölçümü, hipoperfüzyon yoksa baş-gövde 30° yükselt, kardiyak monitörizasyon, FAST/Cincinnati değerlendirmesi, ağızdan hiçbir şey verilmemeli, SAMPLE ile anamnez, son normal görülme saati not edilmeli."},
  {q:"İnmede GKS 8'in altında ise ne yapılır?",a:"Hasta entübe edilir."},

  // ========== HİPOGLİSEMİ ==========
  {q:"Hipoglisemi nedir?",a:"Kan glikoz düzeyinin sempatik sinir sistemi uyarılması ve/veya MSS fonksiyon bozukluğuna yol açacak kadar azalmasıdır. Kan glikozu <60 mg/dl'ye düşünce belirtiler başlar."},
  {q:"Normal açlık kan glikoz seviyesi nedir?",a:"60-110 mg/dl."},
  {q:"Hipogliseminin en sık nedenleri nelerdir?",a:"Fazla insülin/oral antidiyabetik kullanımı, ilaçları yanlış zamanda kullanma, düzensiz öğünler, yetersiz karbonhidrat, aşırı egzersiz, alkol kullanımı."},
  {q:"Hafif hipoglisemi belirtileri nelerdir?",a:"Açlık, titreme, terleme, dudak/dilde karıncalanma, solukluk, çarpıntı, huzursuzluk."},
  {q:"Orta hipoglisemi belirtileri nelerdir?",a:"Baş ağrısı, karın ağrısı, bulanık görme, uyuşukluk, konuşma zorluğu, taşikardi, sinirlilik, solukluk, terleme."},
  {q:"Ağır hipoglisemi belirtileri nelerdir?",a:"Bilinç kaybı (letarji, koma) ve konvülsiyonlar."},
  {q:"Bilinci açık hipoglisemik hastada tedavi nedir?",a:"15-20 gram glikoz tablet oral olarak verilir. 10-15 dakikada kan glikoz düzeyi düzelir."},
  {q:"Bilinci kapalı hipoglisemik hastada tedavi nedir?",a:"25 gr glikoz IV puşe: %10 Dekstroz 250 cc, %20 Dekstroz 125 cc veya %30 Dekstroz 75 cc. Geniş damar yolu gerekir (yoğun dekstroz doku nekrozu yapabilir)."},
  {q:"Damar yolu bulunamayan hipoglisemik hastada ne yapılır?",a:"Glukagon 0,5-2 mg İM olarak verilebilir."},
  {q:"Kardiyak arrestte hipoglisemi ile ilişki nedir?",a:"Hipoglisemi geri döndürülebilir arrest nedenlerinden biridir. Resüsitasyon sırasında kan glikozu kontrol edilmeli, düşükse düzeltilmelidir."},

  // ========== HİPERGLİSEMİ ==========
  {q:"Diyabetik Ketoasidoz (DKA) nedir?",a:"İnsülin eksikliği sonucu kan glikozunun yükselmesi (250-300 mg/dl ve üzeri), kanda keton cisimlerinin varlığı, bilinç bozulması ve sıvı-elektrolit bozuklukları ile karakterize ağır metabolik tablo."},
  {q:"DKA'da neden keton cisimleri oluşur?",a:"İnsülin yetersizliğinde glikoz hücreye giremez → alternatif olarak yağlar enerji için yakılır → atık olarak keton cisimleri açığa çıkar → metabolik asidoz gelişir."},
  {q:"DKA hangi tip diyabette daha sık görülür?",a:"Genellikle Tip I DM'de, enfeksiyonlar veya insülin kullanmamak/kesmek sonucu ortaya çıkar."},
  {q:"DKA'nın belirti ve bulguları nelerdir?",a:"Taşikardi, hipotansiyon, nefeste aseton kokusu, Kussmaul solunum (derin ve hızlı), karın ağrısı, bulantı-kusma, bilinç değişikliği, mukoza kuruluğu, poliüri, polidipsi."},
  {q:"Kussmaul solunum nedir?",a:"Derin ve hızlı solunum. Metabolik asidozun kompansasyonuna yönelik bir solunum paternidir. DKA'nın karakteristik bulgusudur."},
  {q:"Hiperosmolar Hiperglisemik Durum (HHD) nedir?",a:"Anlamlı ketoasidoz olmaksızın hiperglisemi (600-1200 mg/dl), hiperosmolarite ve dehidratasyon. Genellikle Tip II DM'de görülür. Nörolojik bulgular daha sıktır."},
  {q:"HHD'nin DKA'dan en önemli farkı nedir?",a:"HHD'de Kussmaul solunum ve nefeste aseton kokusu yoktur. Bu ikisi ayırıcı tanıda önemli bulgulardır."},
  {q:"DKA ve HHD tedavisinin hastane öncesi yaklaşımı nedir?",a:"ABCDE, SpO2 %94-98, damar yolu açılır, %0,9 NaCl verilir. Kan glikozu >300 mg/dl ise NaCl infüzyonu devam. Şok/dehidratasyon varsa hipovolemik şok tedavisi. GKS <8 ise entübasyon."},

  // ========== HİPOTERMİ ==========
  {q:"Hipotermi nedir?",a:"Vücut sıcaklığının 35°C altına inmesidir. Soğuğa maruz kalma ve ıslanma en sık nedenlerdir."},
  {q:"Hipotermiye en hassas gruplar kimlerdir?",a:"Yaşlılar ve çocuklar (özellikle 6 ay altı bebekler). İlaçlar, alkol, travma, endokrin nedenler ve su kaybı da hipotermi nedeni olabilir."},
  {q:"Hipotermi sınıflandırması nasıldır?",a:"1. Seviye (35-32°C): bilinç açık, titreme var. 2. Seviye (32-28°C): bilinç bozulmaya başlamış, titreme yok. 3. Seviye (28-24°C): bilinçsiz, vital bulgular alınabiliyor. 4. Seviye (<24°C): kardiyak arrest. 5. Seviye (<13,7°C): geri dönüşümsüz ölüm."},
  {q:"Hipotermide kardiyak ritim değişiklikleri sırası nedir?",a:"Sinüs bradikardisi → Osborn (J) dalgası → Atriyal fibrilasyon → Ventriküler fibrilasyon → Asistoli."},
  {q:"Hipotermik hastayı taşırken neden dikkatli olunmalıdır?",a:"Sert hareketler VF'yi tetikleyebilir. Ilımlı veya ciddi hipotermi olguları immobilize edilerek dikkatlice taşınmalıdır."},
  {q:"Hipotermide ısıtma yöntemleri nelerdir?",a:"Pasif (ıslak giysi çıkarma, battaniye), Aktif dış (ısıtma cihazları, sıcak su paketleri, ısıtılmış O2 42-46°C, ısıtılmış IV sıvı 43°C), Aktif iç/invaziv (peritoneal lavaj, ekstrakorporial ısıtma - hastane ortamında)."},
  {q:"Afterdrop fenomeni nedir?",a:"Yeniden ısıtmada vazodilatasyon ile soğuk kanın ekstremitelerden vücut merkezine doğru şant oluşturması. Bu nedenle hasta çok hızlı ısıtılmamalıdır."},
  {q:"Hipotermide <30°C altında ilaç ve defibrilasyon yaklaşımı nedir?",a:"VF/nVT'de en fazla 3 kez şok denenmelidir. Ritim devam ediyorsa vücut ısısı >30°C olana kadar bir sonraki şok beklenmelidir. <30°C'de ilaç uygulanmaması düşünülebilir."},
  {q:"30-35°C arasında ilaç uygulama farkı nedir?",a:"İlaç doz aralıkları iki katına çıkarılır (örn. Adrenalin her 6-10 dk'da bir). ≥35°C'de standart protokollere geçilir."},
  {q:"Hipotermik hasta ne zaman ölü kabul edilir?",a:"Hasta ısıtılana kadar ölü kabul edilmemelidir. Resüsitasyon vücut ısısı ≥35°C olana kadar sonlandırılmamalıdır. Pupil refleksi kaybı, ağrıya yanıtsızlık, vücut sertliği ölüm belirtisi değildir."},
  {q:"Hipoterminin beyin ve kalp için koruyucu etkisi var mıdır?",a:"Evet. Vücut ısısı 18°C'de beyin, 37°C'ye göre 10 kat daha uzun süre kardiyak arresti tolere edebilir. Hipotermi asfiksiden önce gelişmişse uzamış arrestlerde nörolojik sağkalım olabilir."},
  {q:"Hipotermide aralıklı KPR yaklaşımı nedir?",a:"28°C altında 5 dk KPR + <5 dk KPR'sız periyot, 20°C altında 5 dk KPR + <10 dk KPR'sız periyot uygulanabilir."}
];

// ============================================================
window.bolum07_sorular = [
  {type:"multiple",question:"İskemik inme vakalarının yüzde kaçı tromboza bağlıdır?",options:["En sık tromboz görülür","En sık emboli görülür","Eşit oranda","En sık hipoperfüzyon"],correct:0,explanation:"İskemik inmenin en sık nedeni trombozdur. Aterosklerotik damar yapıları üzerinde pıhtılaşma sonucu oluşur."},
  {type:"multiple",question:"Cincinnati kriterlerinden birinde anormallik saptanması durumunda inme olasılığı yüzde kaçtır?",options:["%50","%62","%72","%85"],correct:2,explanation:"Cincinnati kriterlerinden birinde anormallik saptanması inme olasılığının %72 olduğunu gösterir."},
  {type:"multiple",question:"İnmede sistolik KB kaçın altında ise düşürülmemelidir?",options:["180 mmHg","200 mmHg","220 mmHg","240 mmHg"],correct:2,explanation:"Sistolik KB ≤220 mmHg ise düşürülmemelidir. >220 mmHg ise danışman hekim onayıyla tedavi uygulanır."},
  {type:"multiple",question:"İskemik inmede trombolitik tedavi için zaman penceresi kaç saattir?",options:["2 saat","3 saat","4,5 saat","6 saat"],correct:2,explanation:"Trombolitik tedavi kontrendikasyonu yoksa semptomların başlamasından itibaren 4,5 saat içinde uygulanmalıdır. Endovasküler girişim için 6 saat."},
  {type:"multiple",question:"Kan glikoz düzeyi kaçın altına düşünce hipoglisemi belirtileri başlar?",options:["80 mg/dl","70 mg/dl","60 mg/dl","50 mg/dl"],correct:2,explanation:"Kan glikoz düzeyi 60 mg/dl altına düşmeye başlayınca belirtiler ortaya çıkar."},
  {type:"multiple",question:"Bilinci kapalı hipoglisemik hastada IV olarak kaç gram glikoz verilir?",options:["10 gr","15 gr","25 gr","50 gr"],correct:2,explanation:"25 gr glikoz IV puşe: %10 Dekstroz 250 cc, %20 Dekstroz 125 cc veya %30 Dekstroz 75 cc."},
  {type:"multiple",question:"DKA'da kan glikoz düzeyi kaçın üzerindedir?",options:["150-200 mg/dl","200-250 mg/dl","250-300 mg/dl ve üzeri","400-600 mg/dl"],correct:2,explanation:"DKA'da kan glikoz düzeyi 250-300 mg/dl ve üzeridir. 400-700 mg/dl'ye ulaşabilir."},
  {type:"multiple",question:"Hiperosmolar Hiperglisemik Durum (HHD) hangi tip diyabette daha sık görülür?",options:["Tip I DM","Tip II DM","Gestasyonel DM","MODY"],correct:1,explanation:"HHD çoğunlukla Tip II DM'de görülür. DKA ise genellikle Tip I DM'de görülür."},
  {type:"multiple",question:"Hipotermide 2. seviye (orta hipotermi) vücut sıcaklığı aralığı nedir?",options:["35-32°C","32-28°C","28-24°C","<24°C"],correct:1,explanation:"2. Seviye orta hipotermi: 32-28°C. Bilinç bozulmaya başlamış, titreme yok."},
  {type:"multiple",question:"Hipotermik hastada <30°C'de VF/nVT için en fazla kaç kez şok uygulanmalıdır?",options:["1 kez","2 kez","3 kez","Sınırsız"],correct:2,explanation:"<30°C'de en fazla 3 kez şok denenmelidir. Ritim devam ediyorsa vücut ısısı >30°C olana kadar bir sonraki şok beklenir."},
  {type:"multiple",question:"Hipotermide kardiyak ritim değişikliklerinin doğru sırası hangisidir?",options:["AF → VF → Asistoli → Bradikardi","Bradikardi → Osborn dalgası → AF → VF → Asistoli","VF → AF → Asistoli → Bradikardi","Asistoli → VF → AF → Bradikardi"],correct:1,explanation:"Sinüs Bradikardisi → Osborn (J) dalgası → AF → VF → Asistoli sırası izlenir."},
  {type:"multiple",question:"FAST kriterlerinde T neyi ifade eder?",options:["Treatment (Tedavi)","Temperature (Sıcaklık)","Time (Zaman)","Trauma (Travma)"],correct:2,explanation:"T = Time (Zaman). Belirtilerden biri görülüyorsa zaman kaybetmeden 112 aranmalıdır."},

  // Doğru/Yanlış
  {type:"truefalse",question:"İnme hastasına hastane öncesinde Aspirin güvenle verilebilir.",correct:false,explanation:"Yanlış. Hemorajik inme ekarte edilmeden Aspirin verilmemelidir. Antitrombotik tedaviler görüntüleme sonrasına ertelenmelidir."},
  {type:"truefalse",question:"Hipoglisemi kardiyak arrestin geri döndürülebilir nedenlerinden biridir.",correct:true,explanation:"Doğru. Resüsitasyon sırasında kan glikozu kontrol edilmeli ve hipoglisemi varsa düzeltilmelidir."},
  {type:"truefalse",question:"Hipotermik hastada pupil refleksinin kaybı ölüm belirtisidir.",correct:false,explanation:"Yanlış. Ciddi hipotermide pupil refleksi kaybı, ağrıya yanıtsızlık ve vücut sertliği ölüm belirtisi değildir. Hasta ısıtılana kadar ölü kabul edilmemelidir."},
  {type:"truefalse",question:"DKA'da Kussmaul solunum görülür, HHD'de görülmez.",correct:true,explanation:"Doğru. DKA'da metabolik asidoz kompansasyonu için derin ve hızlı Kussmaul solunum ve nefeste aseton kokusu görülür. HHD'de bu bulgular yoktur ve önemli ayırıcı tanı kriteridir."},

  // Boşluk Doldurma
  {type:"fillblank",question:"İnmede trombolitik tedavi için hastanın son olarak normal görüldüğü zamandan itibaren ____ saat içinde uygun merkeze nakil sağlanmalıdır.",answer:"4,5",alternatives:["4.5","4,5 saat"],explanation:"İskemik inmede trombolitik tedavi 4,5 saat, endovasküler girişim 6 saat içinde uygulanmalıdır."},
  {type:"fillblank",question:"Hipotermide vücut sıcaklığı ____ °C altına indiğinde tanımlanır.",answer:"35",alternatives:["35°C","35 derece"],explanation:"Vücut sıcaklığının 35°C altına inmesi hipotermi olarak tanımlanır."},
  {type:"fillblank",question:"DKA'da nefeste duyulan karakteristik koku ____ kokusudur.",answer:"aseton",alternatives:["Aseton","ASETON"],explanation:"DKA'da keton cisimlerinin birikmesi nedeniyle nefeste aseton kokusu duyulur. Bu HHD'den ayırt edici önemli bir bulgudur."},

  // Eşleştirme
  {type:"matching",question:"Hipotermi seviyelerini vücut sıcaklığıyla eşleştirin:",pairs:[{left:"1. Seviye (Ilımlı)",right:"35-32°C, bilinç açık, titreme var"},{left:"2. Seviye (Orta)",right:"32-28°C, bilinç bozuk, titreme yok"},{left:"3. Seviye (Ciddi)",right:"28-24°C, bilinçsiz, vitaller alınıyor"},{left:"4. Seviye",right:"<24°C, kardiyak arrest"}],explanation:"Hipotermi derecesi arttıkça bilinç bozulur, titreme kaybolur ve kardiyak arrest riski artar."},
  {type:"matching",question:"Diyabetik acilleri özelikleriyle eşleştirin:",pairs:[{left:"Hipoglisemi",right:"KŞ <60 mg/dl, titreme, terleme, koma"},{left:"DKA",right:"KŞ >250, aseton kokusu, Kussmaul"},{left:"HHD",right:"KŞ 600-1200, ketoasidoz yok"},{left:"Hipoglisemi tedavisi",right:"25 gr glikoz IV puşe"}],explanation:"Hipoglisemi: düşük KŞ. DKA: ketoasidoz + Kussmaul. HHD: çok yüksek KŞ, ketoasidoz yok. Tedavi farklılıkları kritiktir."},
  {type:"matching",question:"İnme değerlendirme kriterlerini eşleştirin:",pairs:[{left:"Cincinnati - Fasiyal sarkma",right:"Gülme/diş gösterme istenir"},{left:"Cincinnati - Kolda güç",right:"Gözler kapalı kolları havada tutma"},{left:"Cincinnati - Konuşma",right:"Basit cümle tekrarlama"},{left:"FAST - T",right:"Time: zaman kaybetmeden 112 ara"}],explanation:"Cincinnati 3 basamaklı (yüz, kol, konuşma), FAST 4 basamaklı (Face, Arms, Speech, Time) hızlı inme değerlendirme kriterleridir."}
];
