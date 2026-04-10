// ============================================================
// BÖLÜM 5: ARREST RİTİMLERİN YÖNETİMİ
// ============================================================

window.bolum05_learn = [
  // --- Genel ---
  {
    q: "Kardiyopulmoner arrest belirtileri nelerdir?",
    a: "Ağrılı uyarıya yanıtsızlık (koma), apne veya gasping paterni (iç çekme tarzı solunum), dolaşım yokluğu, solukluk veya derin siyanoz."
  },
  {
    q: "Çocuklarda en sık kardiyopulmoner arrest nedeni nedir?",
    a: "Solunum yetmezliğine bağlı gelişen arresttir. Dolaşım yetmezliği de kalp durmasına neden olabilir. Arrest sonrası hayatta kalma oranı düşük olduğundan, solunum ve dolaşım yetmezliğinin erken tanı ve tedavisi hayat kurtarıcıdır."
  },
  {
    q: "Kardiyopulmoner arrestte dört temel ritim nedir ve nasıl gruplandırılır?",
    a: "Şok uygulanmayan ritimler: Asistoli ve Nabızsız Elektriksel Aktivite (NEA). Şok uygulanan ritimler: Ventriküler Fibrilasyon (VF) ve Nabızsız Ventriküler Taşikardi (VT)."
  },
  // --- Şok Uygulanmayan Ritimler ---
  {
    q: "Asistoli nedir?",
    a: "Bebek ve çocuklarda hastane öncesi kalp durmalarında en sık izlenen ritim bozukluğudur. EKG'de düz çizgi şeklindedir, hiçbir elektriksel aktivite yoktur."
  },
  {
    q: "Nabızsız Elektriksel Aktivite (NEA) nedir?",
    a: "EKG'de elektriksel aktivite (VF veya VT olmayan) olmasına rağmen nabzın palpe edilememesidir. EKG'de genellikle geniş QRS'li yavaş atımlar izlenir."
  },
  {
    q: "Şok uygulanmayan ritimlerin tedavisi neye dayanır?",
    a: "Temel olarak göğüs basısı ve ilaç uygulamalarına dayanır (Adrenalin 0,01 mg/kg IV/Kİ, her 3-5 dakikada bir tekrar). Defibrilasyon etkisizdir. Geri döndürülebilir nedenler (4H-4T) araştırılmalıdır."
  },
  {
    q: "Geri döndürülebilir nedenler (4H-4T) nelerdir?",
    a: "4H: Hipoksi, Hipovolemi, Hiper/hipokalemi (metabolik nedenler), Hipotermi. 4T: Tromboz (koroner/pulmoner), Tansiyon pnömotoraks, Tamponad (kardiyak), Toksin/terapötik bozukluklar."
  },
  // --- Şok Uygulanmayan Ritimlerin Yönetimi ---
  {
    q: "Asistoli/NEA saptandığında adım adım ne yapılır?",
    a: "1) Bilinç ve solunum kontrolü → solunum yoksa 5 kez ventile et → nabız kontrolü (10 sn içinde). 2) Nabız yoksa göğüs basısı başla (15:2). 3) Defibrilatör bağla → ritim kontrolü → asistoli/NEA ise defibrilasyon yapma. 4) 2 dk KPR devam et. 5) Adrenalin 0,01 mg/kg IV/Kİ uygula. 6) Her 2 dk'da ritim-nabız analizi yap."
  },
  {
    q: "Şok uygulanmayan ritimlerde adrenalin ne sıklıkla tekrarlanır?",
    a: "Her 3-5 dakikada bir 0,01 mg/kg dozunda IV veya Kİ yoldan tekrarlanır."
  },
  {
    q: "Entübasyon sonrası ventilasyon ve göğüs basısı nasıl sürdürülür?",
    a: "Entübasyon yapıldıktan sonra ventilasyon 10/dk, göğüs basısı en az 100/dk en fazla 120/dk olacak şekilde birbirinden bağımsız olarak sürdürülür."
  },
  {
    q: "Spontan dolaşım geri dönmüş ancak solunum dönmemişse ne yapılır?",
    a: "Ventilasyona 12-20/dk olacak şekilde devam edilir."
  },
  // --- Şok Uygulanan Ritimler ---
  {
    q: "Ventriküler Fibrilasyon (VF) nedir?",
    a: "Kaotik bir dalga formu izlenir. Fibrilasyon dalgalarından oluşan elektriksel aktivite düzensiz kasılmalara sebep olur, yeterli atım hacmi oluşmaz ve nabız alınamaz."
  },
  {
    q: "Nabızsız Ventriküler Taşikardi (nabızsız VT) nedir?",
    a: "Geniş QRS'li düzenli bir taşikardi izlenir ancak nabız alınamaz. VF ve nabızsız VT yönetiminde defibrilasyon uygulanır."
  },
  // --- Defibrilasyon ---
  {
    q: "Defibrilasyonda hangi kaşıklar kullanılır?",
    a: "10 kg altında: küçük kaşıklar (4-5 cm çapında). 10 kg üzerinde: büyük kaşıklar (8-10 cm çapında). Kaşıklar arasında en az 3 cm mesafe olmalıdır."
  },
  {
    q: "Defibrilatör kaşıklarının yerleşim yeri neresidir?",
    a: "Bir kaşık sternumun sağına, sağ klavikulanın altına 2.-3. interkostal aralığa; diğeri sternumun soluna (apeks) 5.-6. interkostal aralığa aksiller bölgeye yerleştirilir."
  },
  {
    q: "Defibrilasyonda JEL-JOULE-ŞOK sıralaması ne anlama gelir?",
    a: "Kaşıklar göğse yerleştirilmeden önce: 1) Jel sürülmüş olmalı, 2) Uygun akım (joule) seçilmiş olmalı, 3) Şok verilir. Göğsü kaplayacak şekilde jel sürmekten kaçınılmalıdır."
  },
  {
    q: "Çocuklarda defibrilasyon dozu ne kadardır?",
    a: "İlk ve tüm sonraki uygulamalarda 4 J/kg'dır. Bu doz bifazik ve monofazik defibrilatörlerde aynıdır."
  },
  {
    q: "Defibrilasyon güvenliği için nelere dikkat edilmelidir?",
    a: "Ambulans durdurulmalı, hasta ıslaksa kurulanmalı, oksijen kaynağı en az 1 metre uzaklaştırılmalı. 'Ben çekildim, siz çekilin, herkes çekilsin, oksijeni uzaklaştır' uyarısı yapılmalı. Kaşıklar hasta üzerinde şarj edilmeli, iki kaşık tek ele alınmamalıdır."
  },
  // --- VF/Nabızsız VT Yönetimi ---
  {
    q: "VF/nabızsız VT saptandığında adım adım ne yapılır?",
    a: "1) 15:2 KPR başla + defibrilatör hazırla. 2) Ritim analizi → VF/VT ise 1. şok (4 J/kg). 3) Hemen 2 dk KPR. 4) Ritim analizi → VF/VT devam ediyorsa 2. şok (4 J/kg). 5) 2 dk KPR + Adrenalin ve amiadoron hazırla. 6) Ritim analizi → VF/VT ise 3. şok (4 J/kg). 7) 2 dk KPR + Adrenalin 0,01 mg/kg + Amiadoron 5 mg/kg uygula."
  },
  {
    q: "Şok uygulanan ritimlerde adrenalin ne zaman başlanır ve nasıl tekrarlanır?",
    a: "3. şoktan sonraki KPR esnasında başlanır. İki siklusta bir (3.-5.-7. döngüler) tekrar edilir."
  },
  {
    q: "Amiadoron ne zaman ve kaç kez uygulanır?",
    a: "3. şoktan sonra 5 mg/kg dozunda IV bolus verilir (sadece %5 dekstroz ile sulandırılmalı). 5. şoktan sonra 5 mg/kg dozunda son kez uygulanır. Toplam en fazla 2 kez verilir."
  },
  {
    q: "Şok verilirken göğüs basısına ne kadar ara verilmeli?",
    a: "5 saniyeden fazla ara verilmemeli. Kaşıklar hastanın göğsünde şarj edilmeli ve şarj süresi boyunca ara göğüs basısına devam edilmelidir."
  },
  // --- Etkin KPR ---
  {
    q: "Etkin göğüs basısının (kaliteli KPR) özellikleri nelerdir?",
    a: "Göğüs basısı sayısı: 100-120/dk. Derinlik: göğüs ön-arka çapının 1/3'ü (bebeklerde 4 cm, çocuk ve erişkinlerde 5 cm). Bası sonrası göğsün tam geri gevşemesine izin verilmeli. Sert zemin gereklidir."
  },
  {
    q: "Göğüs basısı yapan ekip üyesi ne sıklıkla değişmelidir?",
    a: "İki dakikada bir değişmelidir. Etkin olabilmesi için kesintisiz göğüs basısını sürdürmeye özen gösterilmelidir."
  },
  // --- KPR Sonrası Bakım ---
  {
    q: "Spontan dolaşım sağlandıktan sonra hangi parametreler izlenmelidir?",
    a: "Solunum hızı, kalp hızı, kan basıncı, kapiller geri dolum, kardiyak ritim, SpO2, vücut ısısı, kan şekeri, ETCO2, GKS. Stabil olana kadar 5 dk'da bir, stabil olduktan sonra 15 dk'da bir takip edilmelidir."
  },
  {
    q: "TOPA kısaltması ne anlama gelir?",
    a: "Entübe çocuğun genel durumu birden bozulursa akla getirilecek nedenler: T=Endotrakeal tüpün yerinden çıkması, O=Tüp tıkanması, P=Pnömotoraks, A=Mekanik ventilatör/havayolu sisteminde arıza."
  },
  {
    q: "KPR sonrası SpO2 hedefi ne olmalıdır?",
    a: "%94-98 arasında tutulmalıdır. Hem hipoksemi hem hiperoksemiden korunulmalı, hiperventilasyondan kaçınılmalıdır."
  },
  {
    q: "Postarrest dönemde ateş yönetimi nasıl olmalıdır?",
    a: "Enfeksiyon olmadan da yüksek ateş görülebilir. Metabolik ihtiyacı artıracağından ateş agresif şekilde düşürülmeli, 37,6°C ve üzeri kontrol altına alınmalıdır."
  }
];

// ============================================================
// BÖLÜM 5: QUIZ SORULARI
// ============================================================

window.bolum05_sorular = [
  // --- Çoktan Seçmeli ---
  {
    type: "multiple",
    question: "Çocuklarda hastane öncesi kalp durmalarında en sık izlenen ritim hangisidir?",
    options: ["Ventriküler fibrilasyon", "Nabızsız ventriküler taşikardi", "Asistoli", "Sinüs bradikardisi"],
    correct: 2,
    explanation: "Asistoli, bebek ve çocuklarda hastane öncesi kalp durmalarında en sık izlenen ritim bozukluğudur."
  },
  {
    type: "multiple",
    question: "Çocuklarda defibrilasyon dozu ilk ve sonraki uygulamalarda ne kadardır?",
    options: ["İlk 2 J/kg, sonra 4 J/kg", "Her zaman 4 J/kg", "İlk 1 J/kg, sonra 2 J/kg", "Her zaman 2 J/kg"],
    correct: 1,
    explanation: "Çocuklarda defibrilasyon dozu ilk ve tüm sonraki uygulamalarda 4 J/kg'dır. Kardiyoversiyonda ise 1 J/kg ile başlanıp 2 J/kg'a çıkılır."
  },
  {
    type: "multiple",
    question: "VF/nabızsız VT'de amiadoron hangi şoktan sonra ilk kez uygulanır?",
    options: ["1. şoktan sonra", "2. şoktan sonra", "3. şoktan sonra", "5. şoktan sonra"],
    correct: 2,
    explanation: "Amiadoron 3. şoktan sonraki KPR esnasında 5 mg/kg dozunda ilk kez uygulanır. 5. şoktan sonra aynı dozda son kez verilir. Toplam en fazla 2 kez."
  },
  {
    type: "multiple",
    question: "Etkin göğüs basısında bası hızı dakikada kaç olmalıdır?",
    options: ["60-80", "80-100", "100-120", "120-140"],
    correct: 2,
    explanation: "Etkin göğüs basısı sayısı 100-120/dakika olmalıdır."
  },
  {
    type: "multiple",
    question: "Bebeklerde göğüs basısı derinliği ne kadar olmalıdır?",
    options: ["2 cm", "3 cm", "4 cm", "5 cm"],
    correct: 2,
    explanation: "Bebeklerde göğüs basısı derinliği 4 cm, çocuk ve erişkinlerde 5 cm olmalıdır (göğüs ön-arka çapının 1/3'ü)."
  },
  {
    type: "multiple",
    question: "10 kg altındaki bebeklerde defibrilasyonda hangi kaşık kullanılır?",
    options: ["2-3 cm çapında kaşıklar", "4-5 cm çapında kaşıklar", "8-10 cm çapında kaşıklar", "Yaş farkı gözetilmez"],
    correct: 1,
    explanation: "10 kg altında küçük kaşıklar (4-5 cm çapında), 10 kg üzerinde büyük kaşıklar (8-10 cm çapında) kullanılır."
  },
  {
    type: "multiple",
    question: "Şok uygulanmayan ritimlerde (asistoli/NEA) adrenalin nasıl tekrarlanır?",
    options: ["Tek doz verilir", "Her 1-2 dakikada bir", "Her 3-5 dakikada bir", "Her 10 dakikada bir"],
    correct: 2,
    explanation: "Asistoli/NEA'da adrenalin 0,01 mg/kg dozunda her 3-5 dakikada bir IV veya Kİ yoldan tekrarlanır."
  },
  {
    type: "multiple",
    question: "TOPA kısaltmasında 'O' harfi neyi ifade eder?",
    options: ["Oksijen yetersizliği", "Tüp tıkanması (Obstrüksiyon)", "Organ yetmezliği", "Overdoz"],
    correct: 1,
    explanation: "TOPA: T=Tüpün yerinden çıkması, O=Tüp tıkanması, P=Pnömotoraks, A=Mekanik ventilatör/havayolu arızası."
  },
  {
    type: "multiple",
    question: "Şok verilirken göğüs basısına en fazla kaç saniye ara verilebilir?",
    options: ["3 saniye", "5 saniye", "10 saniye", "15 saniye"],
    correct: 1,
    explanation: "Şok verilirken göğüs basısına 5 saniyeden fazla ara verilmemelidir. Kaşıklar hasta üzerinde şarj edilmeli ve şarj boyunca ara göğüs basısı yapılmalıdır."
  },
  // --- Doğru-Yanlış ---
  {
    type: "truefalse",
    question: "Asistoli ve NEA'da defibrilasyon etkili bir tedavi yöntemidir.",
    correct: false,
    explanation: "Asistoli ve NEA'da defibrilasyon etkisizdir. Tedavi göğüs basısı, adrenalin ve geri döndürülebilir nedenlerin (4H-4T) düzeltilmesine dayanır."
  },
  {
    type: "truefalse",
    question: "Amiadoron ampul sadece %5 dekstroz ile sulandırılmalıdır.",
    correct: true,
    explanation: "Amiadoron ampul sadece %5 dekstroz ile sulandırılmalıdır. SF ile karıştırılmamalıdır."
  },
  {
    type: "truefalse",
    question: "Entübasyon sonrası göğüs basısı ve ventilasyon birbirinden bağımsız sürdürülür.",
    correct: true,
    explanation: "Entübasyon sonrası ventilasyon 10/dk, göğüs basısı 100-120/dk olacak şekilde birbirinden bağımsız sürdürülür."
  },
  {
    type: "truefalse",
    question: "KPR sonrası SpO2 %100'e ulaştırmak hedeflenmelidir.",
    correct: false,
    explanation: "SpO2 %94-98 arasında tutulmalıdır. Hem hipoksemi hem hiperoksemiden korunulmalıdır."
  },
  // --- Boşluk Doldurma ---
  {
    type: "fillblank",
    question: "Geri döndürülebilir nedenlerin kısaltması ____ ve ____ olarak bilinir.",
    answer: "4H-4T",
    alternatives: ["4H 4T", "4h-4t", "4H ve 4T"],
    explanation: "4H: Hipoksi, Hipovolemi, Hiper/hipokalemi, Hipotermi. 4T: Tromboz, Tansiyon pnömotoraks, Tamponad, Toksin."
  },
  {
    type: "fillblank",
    question: "Çocuklarda defibrilasyon dozu tüm uygulamalarda ____ J/kg'dır.",
    answer: "4",
    alternatives: ["dört"],
    explanation: "Çocuklarda defibrilasyon dozu ilk ve tüm sonraki uygulamalarda 4 J/kg'dır."
  },
  // --- Eşleştirme ---
  {
    type: "matching",
    question: "Arrest ritimlerini tedavi yöntemleriyle eşleştirin:",
    pairs: [
      { left: "Asistoli / NEA", right: "Göğüs basısı + Adrenalin (defibrilasyon yok)" },
      { left: "VF / Nabızsız VT", right: "Defibrilasyon 4 J/kg + Adrenalin + Amiadoron" },
      { left: "Amiadoron (1. doz)", right: "3. şoktan sonra verilir" },
      { left: "Amiadoron (2. doz)", right: "5. şoktan sonra verilir" }
    ],
    explanation: "Şok uygulanmayan ritimlerde (asistoli/NEA) defibrilasyon yapılmaz. Şok uygulanan ritimlerde (VF/nabızsız VT) 4 J/kg defibrilasyon uygulanır. Amiadoron 3. ve 5. şoktan sonra verilir."
  },
  {
    type: "matching",
    question: "4H-4T geri döndürülebilir nedenlerini eşleştirin:",
    pairs: [
      { left: "Hipoksi", right: "Oksijen ve ventilasyon ile düzelt" },
      { left: "Hipovolemi", right: "Sıvı yükleme ile düzelt" },
      { left: "Tansiyon pnömotoraks", right: "İğne dekompresyon ile düzelt" },
      { left: "Tamponad (kardiyak)", right: "Perikardiyosentez ile düzelt" }
    ],
    explanation: "Arrest sırasında geri döndürülebilir nedenler araştırılmalı ve her biri spesifik tedavisiyle düzeltilmelidir."
  }
];
