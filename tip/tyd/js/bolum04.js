// ============================================================
// BÖLÜM 4: Erişkinlerde Havayolu Açıklığı ve
//           Ventilasyonun Sağlanması
// ============================================================

window.bolum04_learn = [
  // --- Genel Prensipler ---
  {q:"Havayolu yönetiminde en önemli prensip nedir?",a:"Önemli olan entübasyon değil, oksijenasyondur. Yeterli ventilasyon ve oksijenizasyonun sağlanması esastır."},
  {q:"Hastane öncesi havayolu girişimine en sık neden olan durumlar nelerdir?",a:"Kardiyak arrest ve travmalardır."},
  {q:"Havayolu yönetimi hangi adımla başlar?",a:"Havayolu açıklığının değerlendirilmesi ve açıklığın sağlanarak oksijenasyon ve ventilasyonun sağlanması ile başlar."},

  // --- Solunum Yolları Anatomisi ---
  {q:"Üst solunum yolları hangi yapılardan oluşur?",a:"Burun, farinks (nazofarinks, orofarinks, laringofarinks) ve larinksten oluşur."},
  {q:"Alt solunum yollarını hangi yapılar oluşturur?",a:"Trakea, bronşlar ve akciğerler oluşturur."},
  {q:"Farinks kaç bölümden oluşur?",a:"3 bölümden: Nazofarinks (burun bölümü), orofarinks (ağız bölümü), laringofarinks (gırtlak bölümü)."},
  {q:"Glottis nedir?",a:"Ses plikalarının (ses telleri) arasındaki boşluktur. Epiglot yutma esnasında glottisi kapatarak besinlerin solunum yoluna kaçmasını engeller."},
  {q:"Trakea kaç adet kıkırdak halkadan oluşur?",a:"15-20 adet U şeklinde, açıklığı arkaya bakan kıkırdak halkalardan oluşur."},
  {q:"Gaz değişimi nerede gerçekleşir?",a:"Alveollerde gerçekleşir. Oksijen-karbondioksit değişimi (respirasyon) burada yapılır."},

  // --- Ventilasyon Kavramları ---
  {q:"Ventilasyon, oksijenasyon ve respirasyon arasındaki fark nedir?",a:"Ventilasyon: Havanın akciğerlere girip çıkması. Oksijenasyon: Hemoglobinin oksijenle yüklenmesi. Respirasyon: Alveol düzeyinde O2-CO2 yer değiştirmesi."},
  {q:"Erişkinde normal tidal volüm yaklaşık kaç ml'dir?",a:"Yaklaşık 500 ml. Dakika volümü = tidal volüm × solunum sayısı (Örn: 500 ml × 14 = 7000 ml/dk)."},
  {q:"Yeterli oksijenasyon için dakikada yaklaşık kaç litre hava akciğerlere geçmelidir?",a:"Yaklaşık 7 litre/dakika."},

  // --- Hipoventilasyon ve Hipoksemi Nedenleri ---
  {q:"Hipoventilasyona hangi nedenler yol açabilir?",a:"1) Solunum kontrolündeki bozulmalar (beyin hasarı), 2) Havayolundaki obstrüksiyon, 3) Akciğer havalanmasını engelleyen patolojiler."},
  {q:"Hipoksemiye hangi nedenler yol açabilir?",a:"1) Alveol düzeyinde gaz değişim patolojisi, 2) Alveollere gelen yetersiz kan akımı, 3) Kapillere ulaşan yetersiz hava (alveollerin sıvıyla dolması)."},

  // --- Havayolu Tıkanıklığı ---
  {q:"Havayolu tıkanıklığı en sık hangi seviyede ve ne nedenle görülür?",a:"En sık farinks seviyesinde görülür. Bilinci kapalı hastada tonusunu kaybetmiş kaslar nedeniyle dil ve epiglot düşerek tıkanıklığa yol açar."},
  {q:"Bilinç kaybında havayolu tıkanıklığının diğer nedenleri nelerdir?",a:"Takma dişler, yiyecek maddeleri, kusmuk, kan, sekresyonlar."},
  {q:"Laringeal tıkanıklık hangi nedenlerle oluşur?",a:"Yanıklara bağlı ödem, inflamasyon, anaflaksi. Üst havayolu uyarılması veya yabancı cisim inhalasyonu laringeal spazma yol açabilir."},
  {q:"Havayolu tıkanıklığını saptamak için en iyi yol nedir?",a:"Bak-dinle-hisset yaklaşımı: BAK (göğüs/karın hareketleri, siyanoz, retraksiyonlar), DİNLE (horlama, stridor, wheezing), HİSSET (ağız-burundaki hava akımı)."},

  // --- Aspirasyon ---
  {q:"Aspiratör kateter tipleri nelerdir?",a:"a) Tonsil tip: Ağız ve orofarinkste büyük partiküller için. b) Whistle tip: Nazofarinkste ve sert kateterlerin kullanılamadığı durumlarda."},
  {q:"Aspiratör basıncı ve sonda numaraları yaşa göre nasıl değişir?",a:"Yenidoğan: 60-80 mmHg, sonda 6 Fr. Çocuk: 80-100 mmHg, sonda 8-10 Fr. Yetişkin: 80-140 mmHg, sonda 12-14 Fr."},
  {q:"Tek seferde aspirasyon süresi sınırları nedir?",a:"Erişkinlerde en fazla 15 saniye, çocuklarda 10 saniye, bebek ve yenidoğanlarda 5 saniye."},
  {q:"Orofaringeal aspirasyonda kateter ne kadar ilerletilir?",a:"Ön kesici dişler ile çene köşesi (angulus mandibula) arasındaki mesafe esas alınır."},
  {q:"Trakeal aspirasyonda steril teknik neden önemlidir?",a:"Enfeksiyon ve doku hasarını önlemek için steril teknik kullanılır. Aspirasyon sondası çapı, tüp çapının 1/3'ü kadar olmalıdır."},
  {q:"İki aspirasyon uygulaması arasında en az ne kadar beklenir?",a:"20-30 saniyeden kısa olmamalıdır."},
  {q:"Aspirasyonun komplikasyonları nelerdir?",a:"Hipoksi (en temel), öğürme-kusma, farinks/yumuşak doku travması-kanama, vagal uyarıya bağlı bradikardi ve laringospazm."},

  // --- Temel Havayolu Açma Yöntemleri ---
  {q:"İki temel havayolu açma manevrası nedir?",a:"1) Baş geri-çene yukarı manevrası (Head Tilt-Chin Lift) — travma yoksa. 2) Çene itme manevrası (Jaw-Thrust) — travma varsa."},

  // --- Orofaringeal Airway ---
  {q:"Orofaringeal airway endikasyonları nelerdir?",a:"Havayolunu koruyamayan hastada havayolu açmak ve entübe hastada tüpü ısırmasını engellemek için kullanılır."},
  {q:"Orofaringeal airway kontrendikasyonu nedir?",a:"Uyanık, yarı uyanık ve öğürme refleksi olan hastalarda kullanılmamalıdır (kusma ve aspirasyon riski)."},
  {q:"Orofaringeal airway boyutu nasıl seçilir?",a:"Ön kesici dişler ile çene köşesi (angulus mandibula) arasındaki mesafe esas alınır."},
  {q:"Orofaringeal airway nasıl yerleştirilir?",a:"Konkav kısmı üst dişlere bakacak şekilde sert-yumuşak damak birleşimine kadar ilerletilir, 180° döndürülür ve orofarinkse itilir. Sonra havayolu açıklığı bak-dinle-hisset ile kontrol edilir."},

  // --- Nazofaringeal Airway ---
  {q:"Nazofaringeal airway endikasyonları nelerdir?",a:"Bilinç kaybı tam olmayan, öğürme refleksi bulunan hastalarda tercih edilir. Trismus veya maksillofasiyal yaralanmada hayat kurtarıcı olabilir."},
  {q:"Nazofaringeal airway kontrendikasyonları nelerdir?",a:"Aktif burun kanaması, nazal kemik kırığı şüphesi, kafa kaidesi kırığı veya şüphesi (kranial kaviteye girme tehlikesi)."},
  {q:"Nazofaringeal airway boyutu nasıl seçilir?",a:"Burun ucu ile kulak tragusu arasındaki mesafeyle belirlenir. Yetişkinler için 6-7 mm çap uygundur."},

  // --- Balon-Valf-Maske (BVM) ---
  {q:"BVM endikasyonları nelerdir?",a:"Solunum yetmezliği, tam apnei, KPR sırasında ventilasyon için kullanılır."},
  {q:"BVM ile verilen oksijen miktarları nedir?",a:"Oda havası: %21. Oksijen kaynağı 6-8 lt: %50-70. Oksijen 10 lt + rezervuar: %85-95."},
  {q:"C-E tekniği nedir?",a:"Tek kişi BVM uygulamasında bir elin baş ve işaret parmağı C şekli ile maskeyi tutar, diğer parmaklar E şekli ile çeneyi kaldırır. Diğer el balonu sıkar."},
  {q:"İki kişi BVM uygulaması neden tercih edilir?",a:"Hastaya daha etkin ve güvenli ventilasyon sağladığı kanıtlanmıştır."},
  {q:"T-E kavraması tekniği nedir?",a:"İki kişi uygulamasında başparmaklar maskeyi yüze bastırır, diğer parmaklar çeneyi kaldırır (jaw-thrust gibi). Daha az yorulma ve daha etkin ventilasyon sağlar."},
  {q:"MOANS kısaltması neyi tanımlar?",a:"Maske ventilasyonundaki zorlukları: M: Mask seal (kaçak), O: Obesity/obstruction, A: Age >55, N: No teeth (dişsizlik), S: Stiff lungs (dirençli akciğerler)."},

  // --- Endotrakeal Entübasyon ---
  {q:"Entübasyon kararını vermek için sorulacak 3 temel soru nedir?",a:"1) Havayolu korunuyor mu? 2) Ventilasyon/oksijenasyon yeterli mi? 3) Klinik gidiş iyiye doğru mu? Herhangi birine 'hayır' ise kalıcı havayolu gerekir."},
  {q:"İleri havayolu açma endikasyonları nelerdir?",a:"Yetersiz oksijenasyon/ventilasyon, ciddi sekresyon, kardiyak arrest, GKS ≤8 (travmada ≤10), derin koma, yabancı cisim, larinks ödemi, ciddi yüz/kafa yaralanması."},
  {q:"Laringoskop neden sol elle tutulur?",a:"Bleydin sağdan entübasyona izin verecek şekilde tasarlanmış olması nedeniyle."},
  {q:"Erişkin kadınlarda hangi tüp boyutları kullanılır?",a:"7.0-8.0 mm kaflı tüpler."},
  {q:"Erişkin erkeklerde hangi tüp boyutları kullanılır?",a:"7.5-8.5 mm kaflı tüpler."},
  {q:"Tüpün toplam ilerleme mesafesi (kesici dişlerden) ne kadardır?",a:"Kadınlarda yaklaşık 21 cm, erkeklerde yaklaşık 23 cm."},
  {q:"Stile (kılavuz tel) nedir ve nasıl yerleştirilir?",a:"Tüpe sertlik kazandıran plastik kaplı, şekil verilebilen teldir. Tüpün distal ucundan 1 cm kısa olacak şekilde yerleştirilir, aksi halde doku hasarı oluşabilir."},
  {q:"Entübasyon öncesi preoksijenasyon nasıl yapılır?",a:"En az 30 saniye, zaman varsa 2-3 dakika BVM ile %100 O2 verilir."},
  {q:"Entübasyon girişimi en fazla kaç saniye sürebilir?",a:"30 saniyeden uzun olmamalıdır."},
  {q:"En fazla kaç kez entübasyon denenebilir?",a:"En fazla 3 kez. Başarısız olursa supraglottik havayolu araçlarına başvurulur."},
  {q:"Entübasyonun doğrulanması nasıl yapılır?",a:"Bilateral göğüs ekspansiyonu, mideden ses gelmemesi, bilateral eşit solunum sesleri, tüpte buğu. Kesin doğrulama kapnograf ile endtidal CO2 ölçümü (6 soluk sonra)."},
  {q:"Havayolu güvenliği sağlandıktan sonra ventilasyon nasıl yapılır?",a:"Ortalama 10 soluk/dk, 6-8 ml/kg tidal volümle ventile edilir."},
  {q:"Spontan dolaşım döndükten sonra oksijen nasıl titre edilir?",a:"SpO2 %94-98 olacak şekilde titre edilir. Hiperoksinin miyokard hasarını artırdığı kanıtlanmıştır."},
  {q:"Sellick manevrası (krikoid bası) nedir?",a:"Krikoid kıkırdağa dışarıdan basınç uygulayarak özefagusu sıkıştırma tekniğidir. Mide şişmesini önleyebilir ancak kardiyak arrestlerde rutin uygulanmamalıdır."},
  {q:"BURP manevrası nedir?",a:"Back-Up-Rightward-Pressure. Tiroid/krikoid kıkırdaklara arkaya, yukarı ve sağa bası uygulayarak vokal kordların daha iyi görülmesini sağlar."},

  // --- Zor Entübasyon ---
  {q:"LEMON skoru neyi değerlendirir?",a:"Zor entübasyon olasılığını: L: Look (dış bakı), E: Evaluate (3-3-2 kuralı), M: Mallampati, O: Obstruction, N: Neck mobility (boyun hareketliliği)."},
  {q:"3-3-2 kuralı nedir?",a:"Kesici dişler arası mesafe <3 parmak, hyoid-mental mesafe <3 parmak, tiroid-hyoid mesafe <2 parmak → entübasyonda zorluk."},
  {q:"Cormack-Lehane sınıflaması nedir?",a:"Laringoskopik görünüm: Derece I: Glottis tam görünür, II: Kısmen görünür, III: Sadece epiglot, IV: Epiglot bile görünmüyor."},
  {q:"Mallampati sınıflamasında III-IV ne anlama gelir?",a:"Entübasyonda zorluk beklenir. III: Yumuşak damak+uvula tabanı görülür. IV: Uvula tamamen dil tarafından kapatılmış, farinks görülmez."},

  // --- Supraglottik Havayolu Araçları ---
  {q:"Supraglottik havayolu araçlarının en önemli avantajı nedir?",a:"Endotrakeal tüpten çok daha kolay yerleştirilebilir ve genellikle KPR esnasında göğüs kompresyonlarına ara verilmeden yerleştirilebilir."},
  {q:"Laringeal maske (LMA) nasıl yerleştirilir?",a:"Kafı sönük, arka yüzeyine jel sürülmüş şekilde, işaret parmağı rehberliğinde sert damağa doğru bastırılarak laringofarinkse itilir. Direnç hissedilince kaf şişirilir."},
  {q:"RODS kısaltması neyi tanımlar?",a:"Supraglottik araçlarda yaşanabilecek zorlukları: R: Restricted mouth (ağız açıklığında kısıtlılık), O: Obstruction, D: Distorted (biçimsiz havayolu), S: Stiff lungs."},
  {q:"I-Gel'in özellikleri nelerdir?",a:"Kafsız, jel benzeri yapıda, vücut ısısında anatomiye uyumlu hale gelir. Kaf şişirme gerekmez. Mide sondası kanalı vardır. İçinden entübasyon tüpü geçirilebilir."},

  // --- Krikotirotomi ---
  {q:"Krikotirotomi ne zaman uygulanır?",a:"BVM, entübasyon ve supraglottik araçlarla ventilasyon sağlanamadığında, şiddetli yüz travması veya larinks tıkanması durumlarında."},
  {q:"Krikotirotomi nereden yapılır?",a:"Krikotiroid membrandan (tiroid ile krikoid kıkırdak arasındaki bölge). Cilt üzerinden krikotiroid membranı geçerek acil havayolu sağlanır."},
  {q:"İğne krikotirotominin sınırlılıkları nelerdir?",a:"Sadece kısa süreli oksijenasyon sağlar, ventilasyon yetersiz kalabilir. Barotravma riski taşır, kanülün kıvrılmasıyla başarısız olabilir, hasta naklinde uygun değildir."}
];

// ============================================================

window.bolum04_sorular = [
  // --- ÇOKTAN SEÇMELİ ---
  {type:"multiple",question:"Havayolu yönetiminde en önemli prensip nedir?",options:["Hızla entübasyon yapmak","Oksijenasyonu sağlamak","Krikotirotomi uygulamak","İV ilaç vermek"],correct:1,explanation:"Önemli olan entübasyon değil oksijenasyondur. Yeterli ventilasyon ve oksijenizasyonun sağlanması esastır."},
  {type:"multiple",question:"Bilinci kapalı hastada havayolu tıkanıklığının en sık görüldüğü seviye neresidir?",options:["Larinks","Trakea","Farinks","Bronşlar"],correct:2,explanation:"Bilinci kapalı hastada tıkanıklık en sık farinkste görülür. Tonusunu kaybetmiş kaslar nedeniyle dil ve epiglot düşerek tıkanıklığa yol açar."},
  {type:"multiple",question:"Erişkinde tek seferde aspirasyon süresi en fazla kaç saniyedir?",options:["5 saniye","10 saniye","15 saniye","20 saniye"],correct:2,explanation:"Erişkinde en fazla 15 saniye, çocuklarda 10 saniye, bebek ve yenidoğanlarda 5 saniye."},
  {type:"multiple",question:"Orofaringeal airway kimlerde kullanılmamalıdır?",options:["Bilinci kapalı hastalarda","Entübe hastalarda","Öğürme refleksi olan hastalarda","Kardiyak arrest hastalarında"],correct:2,explanation:"Uyanık, yarı uyanık ve öğürme refleksi olan hastalarda kullanılmamalıdır. Kusma ve aspirasyon riski oluşturur."},
  {type:"multiple",question:"BVM ile oksijen kaynağı (10 lt) ve rezervuar kullanıldığında verilen oksijen yüzdesi nedir?",options:["%21","%50-70","%85-95","%100"],correct:2,explanation:"Oksijen kaynağına bağlı (10 lt/dk) + rezervuar takıldığında %85-95 oksijen verilebilir."},
  {type:"multiple",question:"Entübasyon girişimi en fazla kaç saniye sürebilir?",options:["15 saniye","20 saniye","30 saniye","45 saniye"],correct:2,explanation:"Entübasyon girişimi 30 saniyeden uzun olmamalıdır."},
  {type:"multiple",question:"Erişkin erkek hastalar için hangi tüp boyutları kullanılır?",options:["6.0-7.0 mm","7.0-8.0 mm","7.5-8.5 mm","8.0-9.0 mm"],correct:2,explanation:"Erişkin erkeklerde 7.5-8.5 mm kaflı tüpler, kadınlarda 7.0-8.0 mm kaflı tüpler kullanılır."},
  {type:"multiple",question:"Entübasyonun kesin doğrulaması nasıl yapılır?",options:["Bilateral solunum sesleri","Göğüs ekspansiyonu izleme","Kapnograf ile endtidal CO2 ölçümü","Tüpte buğu olması"],correct:2,explanation:"Kapnograf ile endtidal CO2 ölçümü tüpün trakeada olduğunun kesin göstergesidir. 6 soluk sonra değerlendirilir."},
  {type:"multiple",question:"Cormack-Lehane Derece III laringoskopik görünümde ne görülür?",options:["Glottis tamamen görünür","Glottis kısmen görünür","Sadece epiglot görünür","Epiglot bile görünmüyor"],correct:2,explanation:"Derece III: Sadece epiglot görünür. Derece IV: Epiglot bile görünmez. III ve IV'te entübasyon zordur."},
  {type:"multiple",question:"Nazofaringeal airway hangi durumda kesinlikle kullanılmamalıdır?",options:["Trismus varlığında","Bilinç bulanıklığında","Kafa kaidesi kırığı şüphesinde","Maksillofasiyal yaralanmada"],correct:2,explanation:"Kafa kaidesi kırığı/şüphesinde kranial kaviteye girme tehlikesi nedeniyle kullanılmamalıdır. Ayrıca aktif burun kanaması ve nazal kırıkta da kontrendikedir."},
  {type:"multiple",question:"En fazla kaç kez entübasyon denenebilir?",options:["1 kez","2 kez","3 kez","5 kez"],correct:2,explanation:"En fazla 3 kez entübasyon denenmelidir. Başarısız olursa supraglottik havayolu araçlarına başvurulur."},
  {type:"multiple",question:"Spontan dolaşım döndükten sonra hedef SpO2 nedir?",options:["%85-90","%90-94","%94-98","%100"],correct:2,explanation:"SpO2 %94-98 olacak şekilde titre edilir. Hiperoksinin miyokard hasarını artırdığı kanıtlanmıştır."},

  // --- DOĞRU-YANLIŞ ---
  {type:"truefalse",question:"Sellick manevrası kardiyak arrestlerde rutin olarak uygulanmalıdır.",correct:false,explanation:"Yanlış. Kardiyak arrestlerde krikoid basının rutin uygulanmasından kaçınılmalıdır. Yüksek havayolu basıncına ve tamamen kapanmaya neden olabilir."},
  {type:"truefalse",question:"İki kişi BVM uygulaması tek kişiye göre daha etkin ve güvenli ventilasyon sağlar.",correct:true,explanation:"Doğru. İki kişi ile BVM uygulamasının hastaya daha etkin ve güvenli ventilasyon sağladığı kanıtlanmıştır."},
  {type:"truefalse",question:"Nazofaringeal airway bilinç kaybı tam olmayan hastalarda orofaringeal airwaye göre daha kolay tolere edilir.",correct:true,explanation:"Doğru. Nazofaringeal airway öğürme refleksini uyarmadığı için spontan solunumu olan veya bilinç kaybı derin olmayan hastalarda tercih edilir."},

  // --- BOŞLUK DOLDURMA ---
  {type:"fillblank",question:"Erişkinde normal tidal volüm yaklaşık ____ ml'dir.",answer:"500",alternatives:["500 ml","beş yüz"],explanation:"Erişkinde normal tidal volüm yaklaşık 500 ml'dir. Dakika volümü = 500 × solunum sayısı."},
  {type:"fillblank",question:"Tüpün trakeada olduğunun kesin doğrulaması ____ ile yapılır.",answer:"kapnograf",alternatives:["kapnografi","kapnometre","endtidal CO2"],explanation:"Kapnograf ile endtidal CO2 ölçümü tüpün trakeada olduğunun kesin göstergesidir."},
  {type:"fillblank",question:"LEMON skorunda E harfi ____-____-____ kuralını ifade eder.",answer:"3-3-2",alternatives:["332"],explanation:"3-3-2 kuralı: Kesici dişler arası <3 parmak, hyoid-mental <3 parmak, tiroid-hyoid <2 parmak → zor entübasyon."},

  // --- EŞLEŞTİRME ---
  {type:"matching",question:"MOANS kısaltmasını eşleştirin:",pairs:[{left:"M",right:"Mask seal (kaçak)"},{left:"O",right:"Obesity/obstruction"},{left:"A",right:"Age >55"},{left:"N",right:"No teeth (dişsizlik)"}],explanation:"MOANS: Mask seal, Obesity/obstruction, Age>55, No teeth, Stiff lungs — maske ventilasyonundaki zorlukları tanımlar."},
  {type:"matching",question:"Havayolu açma basamaklarını eşleştirin:",pairs:[{left:"Adım 1",right:"Havayolu açıklığını değerlendir"},{left:"Adım 3",right:"Temel manevralar (baş geri-çene yukarı)"},{left:"Adım 5",right:"BVM ile ventilasyon"},{left:"Adım 6",right:"İleri havayolu (entübasyon)"}],explanation:"Havayolu yönetimi basamakları: Değerlendirme → Aspirasyon → Temel manevralar → Airway → BVM → İleri havayolu → Supraglottik → Krikotirotomi."}
];
