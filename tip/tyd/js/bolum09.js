// ============================================================
// BÖLÜM 9: Temel EKG (Elektrokardiyografi)
// ============================================================

window.bolum09_learn = [
  // --- Genel Kavramlar ---
  {q:"EKG nedir?",a:"Kalpte oluşan elektriksel aktivitenin vücut yüzeyine konan elektrotlar yardımıyla kaydedilmesidir. Kalbin elektriksel haritasının resmidir."},
  {q:"EKG ile neler belirlenebilir?",a:"1) Kalbin ritim ve ileti bozuklukları, 2) Koroner yetmezlik veya miyokard infarktüsü tanısı, 3) Bazı kalp ilaçlarının etkileri ve elektrolit dengesizliği (özellikle potasyum)."},
  {q:"Hastane öncesi bakımda EKG'nin rolü nedir?",a:"EKG tek başına tanı koymak için yeterli değildir. Klinik değerlendirmeyle birlikte yardımcı yöntem olarak kullanılır. Aritmilerin erken saptanması hayatı tehdit eden durumları önleyebilir."},

  // --- Kalbin İleti Sistemi ---
  {q:"Kalbin uyarı ve iletim sistemi hangi yapılardan oluşur?",a:"Sinoatriyal düğüm (SAD) → internodal yollar → atriyoventriküler düğüm (AVD) → His demeti → sağ/sol dal → Purkinje lifleri."},
  {q:"Sinüs düğümü (SAD) ne işlev görür?",a:"Kalbin doğal pacemaker'ıdır. Dakikada 60-100 uyarı çıkararak normal kalp hızını belirler."},
  {q:"Atriyoventriküler düğüm (AVD) ne işlev görür?",a:"SAD'dan uyarıyı alıp His-Purkinje sistemine iletir. Hızlı ritimlere karşı sigorta görevi yapar. Uyarı çıkarma kapasitesi 40-60/dk'dır."},
  {q:"AVD uyarı başlatırsa EKG'de ne değişir?",a:"Nodal ritim oluşur ve P dalgası görülmez."},
  {q:"His demeti ve Purkinje liflerinin uyarı çıkarma hızları nedir?",a:"His demetinden başlıyorsa 30-40/dk, Purkinje liflerinden başlıyorsa 15-30/dk."},

  // --- Kardiyak Monitörizasyon ---
  {q:"Kardiyak monitörizasyonda 4 elektrot nasıl yerleştirilir?",a:"Kırmızı: Sağ omuz klavikula altı. Sarı: Sol omuz klavikula altı. Yeşil: Sol yan karın 6. interkostal. Siyah: Sağ yan karın 6. interkostal."},
  {q:"Save pad (yapışkan petler) nereye yerleştirilir?",a:"Sağ klavikula altına ve sol orta aksiler çizgide 5-6. interkostal aralığa yerleştirilir. Monitörizasyon ve şok uygulamak için kullanılır."},
  {q:"Monitörizasyonda dikkat edilecek noktalar nelerdir?",a:"Elektrotlar temiz-kuru cilde yapıştırılmalı, jeli kurumuş elektrot kullanılmamalı, parazit yapabilecek takılar çıkarılmalı, kalibrasyon kontrol edilmelidir."},
  {q:"EKG kalibrasyonu nasıl olmalıdır?",a:"1 mV uyarı = 1 cm (2 büyük kare) vertikal defleksiyon. Kağıt ilerleme hızı 25 mm/sn."},

  // --- EKG Derivasyonları ---
  {q:"12 derivasyonlu EKG'de kaç tip derivasyon vardır?",a:"6 ekstremite derivasyonu (frontal plan) + 6 göğüs derivasyonu (horizontal plan)."},
  {q:"Standart ekstremite derivasyonları (bipolar) nelerdir?",a:"DI: Sağ kol-sol kol arası. DII: Sağ kol-sol bacak arası. DIII: Sol kol-sol bacak arası."},
  {q:"Arttırılmış ekstremite derivasyonları (unipolar) nelerdir?",a:"aVR: Sağ omuzdan kalbe, aVL: Sol omuzdan kalbe, aVF: Sol bacaktan kalbe bakar."},
  {q:"Göğüs derivasyonları nerede yerleştirilir?",a:"V1: Sternum sağında 4. interkostal. V2: Sternum solunda 4. interkostal. V3: V2-V4 arası. V4: 5. interkostal-midklaviküler hat. V5: V4-ön aksiler. V6: V4-orta aksiler."},
  {q:"Hastane öncesinde genellikle kaç derivasyonlu EKG kullanılır?",a:"6 ekstremite derivasyonlu EKG özelliği olan defibrilatörler kullanılır."},

  // --- EKG Dalgaları ---
  {q:"EKG'de kaydedilen iki temel olay nedir?",a:"Depolarizasyon (uyarının yayılması) ve repolarizasyon (kalp kasının dinlenme durumuna dönmesi)."},
  {q:"İzoelektrik hat nedir?",a:"İki kalp siklusu arasında elektriksel aktivitenin olmadığını gösteren yatay düz çizgidir (bazal çizgi)."},
  {q:"Pozitif ve negatif defleksiyon ne anlama gelir?",a:"Pozitif: İzoelektrik hattın üzerinde sapma (akım elektroda yaklaşıyor). Negatif: Altında sapma (akım elektrottan uzaklaşıyor)."},
  {q:"aVR derivasyonunda neden her zaman negatif defleksiyon görülür?",a:"Kalpteki uyarı ve iletimin yönü gereği akım aVR elektrodundan uzaklaşır."},

  // --- P, QRS, T Dalgaları ---
  {q:"P dalgası neyi yansıtır?",a:"Atriyumların depolarizasyonunu yansıtır. Küçük, düzgün yuvarlak, QRS'den önce gelen pozitif defleksiyondur. En iyi DII ve V1'de görülür."},
  {q:"P dalgası yoksa ne düşünülmelidir?",a:"P dalgasının varlığından emin olunamıyorsa olmadığı düşünülmelidir (nodal ritim veya diğer aritmiler)."},
  {q:"QRS kompleksi neyi yansıtır?",a:"Ventrikül depolarizasyonunu yansıtır. Süresi 0.12 saniyeden (3 küçük kare) küçük olmalıdır."},
  {q:"Q, R ve S dalgaları nedir?",a:"Q: QRS'in ilk negatif dalgası. R: İlk pozitif dalgası. S: R'yi izleyen ilk negatif dalga."},
  {q:"Patolojik Q dalgası kriterleri nedir?",a:"Derinliği aynı derivasyondaki R'nin 1/4'ünden fazla ve genişliği 0.04 sn'den büyükse patolojik olabilir."},
  {q:"T dalgası neyi gösterir?",a:"Ventriküllerin repolarizasyonunu gösterir. aVR ve V1 dışında pozitiftir. Negatif olması iskemi göstergesi olabilir."},

  // --- PR, ST, QT Aralıkları ---
  {q:"PR aralığı neyi gösterir?",a:"Uyarının atriyumları depolarize edip AV düğümü geçme süresini gösterir. Normal: 0.12-0.20 sn (3-5 küçük kare). Her siklusta eşit olmalıdır."},
  {q:"PR aralığı neden önemlidir?",a:"AV düğümdeki fizyolojik gecikmeyi gösterir. PR uzaması 1. derece AV bloğu düşündürür. Ayrıca izoelektrik hat için belirleyici unsurdur."},
  {q:"ST segmenti nedir ve nasıl değerlendirilir?",a:"QRS bitişinden T başlangıcına kadar olan aralık. Normalde izoelektrik hatta olmalıdır. Elevasyon ve depresyon açısından değerlendirilir."},
  {q:"ST elevasyonu eşik değerleri nedir?",a:"V2-V3'te 2 mm, diğer derivasyonlarda 1 mm yükselme. Birbirini izleyen en az 2 derivasyonda olmalıdır."},
  {q:"QT aralığı neyi gösterir?",a:"Ventriküllerin depolarizasyon ve repolarizasyonunu gösterir. Normal: 0.35-0.45 sn."},

  // --- EKG Kağıdı ---
  {q:"EKG kağıdında 1 küçük kare yatay eksende kaç saniyeye eşittir?",a:"0.04 saniye (25 mm/sn kalibrasyonda)."},
  {q:"EKG kağıdında 1 büyük kare (5 küçük) yatay eksende kaç saniyedir?",a:"0.20 saniye."},
  {q:"EKG kağıdında 1 küçük kare dikey eksende kaç mV'a eşittir?",a:"0.1 mV. 10 mm (2 büyük kare) = 1 mV."},

  // --- Ritim Analizi ---
  {q:"EKG ritim analizi için 6 basamak nedir?",a:"1) Elektriksel aktivite var mı? 2) QRS düzenli mi? 3) Ventriküler hız kaç? 4) Atriyal aktivite (P dalgası) var mı? 5) P-QRS ilişkisi nasıl? 6) QRS genişliği normal mi?"},
  {q:"Elektriksel aktivite yoksa ve nabız alınamıyorsa bu ne anlama gelir?",a:"Asistoli anlamına gelir. Önce elektrot ve kabloların bağlantısı kontrol edilmelidir."},
  {q:"Ventriküler ritmin düzenliliği nasıl kontrol edilir?",a:"R-R dalgaları arasındaki mesafe ölçülür. Tüm R-R mesafeleri eşitse ritim düzenlidir."},
  {q:"Düzenli ritimlerde kalp hızı nasıl hesaplanır?",a:"300 / (iki R-R arası büyük kare sayısı) = kalp hızı (atım/dk)."},
  {q:"Düzensiz ritimlerde kalp hızı nasıl hesaplanır?",a:"15 büyük kare (3 saniye) içindeki R dalgası sayısı × 20 = kalp hızı."},
  {q:"P dalgası QRS ile ilişkili nasıl değerlendirilir?",a:"Her P'yi QRS izliyor mu? (İzlemiyorsa 2-3. derece AV blok). PR mesafesi 0.20 sn'den uzun mu? (Uzunsa 1. derece AV blok)."},
  {q:"QRS genişliği ne kadar olmalıdır?",a:"0.12 saniyeden (3 küçük kare) küçük olmalıdır. Geniş QRS taşikardilerde ventriküler/supraventriküler ayrımda önemlidir."},
  {q:"Normal sinüs ritminin özellikleri nelerdir?",a:"Hız 60-100/dk, düzenli R-R, her QRS'den önce normal P dalgası, sabit PR aralığı (0.12-0.20 sn), QRS <0.12 sn."}
];

// ============================================================

window.bolum09_sorular = [
  {type:"multiple",question:"Sinüs düğümünün (SAD) dakikadaki uyarı çıkarma sayısı nedir?",options:["15-30","30-40","40-60","60-100"],correct:3,explanation:"SAD dakikada 60-100 uyarı çıkararak kalbin doğal pacemaker'ı olarak görev yapar."},
  {type:"multiple",question:"AV düğümün uyarı çıkarma kapasitesi dakikada kaçtır?",options:["15-30","30-40","40-60","60-100"],correct:2,explanation:"AV düğüm dakikada 40-60 uyarı çıkarabilir. SAD çalışmadığında devreye girer."},
  {type:"multiple",question:"EKG'de P dalgası neyi yansıtır?",options:["Ventrikül depolarizasyonu","Ventrikül repolarizasyonu","Atriyal depolarizasyon","AV düğüm gecikmesi"],correct:2,explanation:"P dalgası atriyumların depolarizasyonunu yansıtır. QRS ventrikül depolarizasyonu, T ise repolarizasyonudur."},
  {type:"multiple",question:"QRS süresi en fazla kaç saniye olmalıdır?",options:["0.04 sn","0.08 sn","0.12 sn","0.20 sn"],correct:2,explanation:"QRS süresi 0.12 saniyeden (3 küçük kare) küçük olmalıdır. Geniş QRS dal bloğu veya ventriküler kaynaklı ritimleri düşündürür."},
  {type:"multiple",question:"Normal PR aralığı ne kadardır?",options:["0.04-0.08 sn","0.08-0.12 sn","0.12-0.20 sn","0.20-0.40 sn"],correct:2,explanation:"PR aralığı 0.12-0.20 sn (3-5 küçük kare) olmalıdır. Uzaması 1. derece AV bloğu düşündürür."},
  {type:"multiple",question:"Düzenli ritimlerde kalp hızı nasıl hesaplanır?",options:["R-R büyük kare × 300","300 / R-R büyük kare sayısı","R sayısı × 20","R-R küçük kare × 60"],correct:1,explanation:"300 / (iki R-R arası büyük kare sayısı) = kalp hızı. Örneğin 4 büyük kare ise 300/4 = 75 atım/dk."},
  {type:"multiple",question:"4 elektrotlu monitörizasyonda kırmızı kablo nereye yerleştirilir?",options:["Sol omuz klavikula altı","Sağ omuz klavikula altı","Sol yan karın","Sağ yan karın"],correct:1,explanation:"Kırmızı: Sağ omuz klavikula altı, Sarı: Sol omuz, Yeşil: Sol yan karın, Siyah: Sağ yan karın."},
  {type:"multiple",question:"ST elevasyonu için V2-V3 derivasyonlarında eşik değer nedir?",options:["0.5 mm","1 mm","2 mm","3 mm"],correct:2,explanation:"V2-V3'te 2 mm, diğer derivasyonlarda 1 mm yükselme ST elevasyonu olarak kabul edilir."},
  {type:"multiple",question:"EKG kağıdında 1 küçük kare yatay eksende kaç saniyeyi temsil eder?",options:["0.02 sn","0.04 sn","0.10 sn","0.20 sn"],correct:1,explanation:"25 mm/sn kalibrasyonda 1 küçük kare (1 mm) = 0.04 saniyeyi temsil eder."},
  {type:"multiple",question:"P dalgası en iyi hangi derivasyonlarda görülür?",options:["DI ve aVL","DII ve V1","DIII ve aVF","V5 ve V6"],correct:1,explanation:"P dalgası en iyi DII ve V1 derivasyonlarında görülür."},

  // --- DOĞRU-YANLIŞ ---
  {type:"truefalse",question:"aVR derivasyonunda normal olarak her zaman pozitif defleksiyon izlenir.",correct:false,explanation:"Yanlış. aVR derivasyonunda kalpteki uyarı yönü gereği her zaman negatif defleksiyon izlenir."},
  {type:"truefalse",question:"T dalgasının aVR ve V1 dışındaki derivasyonlarda negatif olması iskemi göstergesi olabilir.",correct:true,explanation:"Doğru. T dalgası normalde aVR ve V1 dışında pozitiftir. Negatif T dalgası iskemiyi düşündürebilir."},
  {type:"truefalse",question:"EKG tek başına tanı koymak için yeterlidir.",correct:false,explanation:"Yanlış. EKG klinik değerlendirmeyle birlikte yardımcı bir yöntem olarak kullanılır, tek başına tanı konulmaz."},

  // --- BOŞLUK DOLDURMA ---
  {type:"fillblank",question:"Kalbin doğal pacemaker'ı ____ düğümüdür.",answer:"sinüs",alternatives:["SAD","sinoatriyal","Sinüs","sinüs düğümü"],explanation:"Sinüs düğümü (sinoatriyal düğüm-SAD) kalbin doğal pacemaker'ıdır ve dakikada 60-100 uyarı çıkarır."},
  {type:"fillblank",question:"Normal QRS süresi 0.12 saniyeden yani ____ küçük kareden küçük olmalıdır.",answer:"3",alternatives:["üç"],explanation:"QRS süresi 0.12 sn = 3 küçük kare'den küçük olmalıdır."},
  {type:"fillblank",question:"EKG kağıdının ilerleme hızı ____ mm/sn olmalıdır.",answer:"25",alternatives:["yirmi beş"],explanation:"EKG cihazının kalibrasyonu 25 mm/sn hızla kayıt yapacak şekilde olmalıdır."},

  // --- EŞLEŞTİRME ---
  {type:"matching",question:"EKG dalgalarını fonksiyonlarıyla eşleştirin:",pairs:[{left:"P dalgası",right:"Atriyal depolarizasyon"},{left:"QRS kompleksi",right:"Ventrikül depolarizasyonu"},{left:"T dalgası",right:"Ventrikül repolarizasyonu"},{left:"PR aralığı",right:"AV düğüm gecikmesi"}],explanation:"P: Atriyal depolarizasyon, QRS: Ventrikül depolarizasyonu, T: Ventrikül repolarizasyonu, PR: AV düğümdeki gecikme süresi."},
  {type:"matching",question:"Kalbin ileti yapılarını uyarı hızlarıyla eşleştirin:",pairs:[{left:"SAD (Sinüs düğümü)",right:"60-100/dk"},{left:"AV düğüm",right:"40-60/dk"},{left:"His demeti",right:"30-40/dk"},{left:"Purkinje lifleri",right:"15-30/dk"}],explanation:"SAD: 60-100, AV düğüm: 40-60, His: 30-40, Purkinje: 15-30 uyarı/dk. Üst yapılar çalışmadığında alt yapılar devreye girer."}
];
