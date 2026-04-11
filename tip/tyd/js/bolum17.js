// ============================================================
// BÖLÜM 17: Triaj
// ============================================================

window.bolum17_learn = [
  {q:"Triaj kelimesinin kökeni nedir?",a:"Fransızca 'Trier' (ayırt etmek, seçmek, sınıflandırmak) kelimesinden gelir. İlk kez Napolyon ordularında Baron Larrey tarafından kullanılmıştır."},
  {q:"Tıbbi triaj nedir?",a:"Hastaların yaşamlarını tehdit eden yaralanma derecelerine ve tedaviden görmeleri beklenen yarara göre sıralanmasıdır. Amaç: En kısa zamanda, kısıtlı olanaklarla, en fazla yaşamı kurtarmaktır."},
  {q:"Triaj ne zaman gereklidir?",a:"Yeterli personel/ambulans yoksa, bölgesel hastaneler yetersizse, ek kaynak ulaşımında zorluk varsa. Sayı ne kadar yüksek olursa olsun imkânlar yeterliyse triaja gerek yoktur."},

  // --- Temel Kurallar ---
  {q:"Triajda temel kurallar nelerdir?",a:"Herkese uygulanır, triaj sorumlusu tedavi yapmaz, her yaralı için 1 dk'dan kısa sürede yapılır, tamamlandıktan sonra yenilenebilir, yenilenen triajda kod ancak daha acil kodla değiştirilebilir."},
  {q:"Triaj sorumlusu kimdir?",a:"En yüksek eğitime veya deneyime sahip personeldir. Genellikle olay yeri yöneticisi aynı zamanda triaj sorumlusudur. Hastaların acil bakımıyla ilgilenmez."},
  {q:"Triaj değerlendirmesi hangi sırayı takip eder?",a:"Solunum → Dolaşım → Bilinç."},
  {q:"Triaj kartını kim doldurur?",a:"Triaj sorumlusu sadece triaj kodu kısmını işaretler. Kartın diğer kısımları tedavi/nakil hizmeti veren personel tarafından doldurulur."},

  // --- Triaj Çeşitleri ---
  {q:"Triaj çeşitleri nelerdir?",a:"1) Başvuru triajı (112 KKM tarafından), 2) Olay yeri (saha/alan) triajı (çoklu yaralanmalarda sahada), 3) Nakil triajı (hangi hastanın önce nakledileceği)."},

  // --- Renk Kodlama ---
  {q:"Triaj renk kodları nelerdir?",a:"Kırmızı (acil): Ciddi, öncelikli tedavi/transport. Sarı (geciktirilebilir): Potansiyel tehdit, biraz bekleyebilir. Yeşil (hafif): İvedi müdahale gerektirmez. Siyah (ölü): Hayatta kalma şansı düşük/ölü."},
  {q:"NATO triaj harf skalası nedir?",a:"T1=Kırmızı, T2=Sarı, T3=Yeşil, T4=Siyah."},
  {q:"Siyah kodlu hastaya sağlık hizmeti verilir mi?",a:"Verilmez veya en son sıraya alınır. Mevcut kaynaklar kurtarılabilir hastalar için kullanılmalıdır."},
  {q:"Under triaj ve Over triaj nedir?",a:"Under triaj: Olması gerekenden daha az acil değerlendirme (hasta kötüleşebilir). Over triaj: Olduğundan daha acil değerlendirme (gerçek acil vakaların önüne geçer)."},

  // --- START Triaj ---
  {q:"START triaj nedir?",a:"Simple Triage and Rapid Treatment (Basit Triaj ve Hızlı Tedavi). Erişkinlerde uygulanan hızlı triaj yöntemi. Her hasta için 1 dk'yı aşmamalıdır."},
  {q:"START triajda 1. basamak (yürüyebilenler) nasıl uygulanır?",a:"Triaj sorumlusu yüksek sesle hastaların kendine gelmesini ister. Yürüyebilen ve gelebilen herkes YEŞİL triaj kodu alır."},
  {q:"START triajda solunum değerlendirmesi nasıl yapılır?",a:"10 sn içinde bak-dinle-hisset. Solunum varsa hız sayılır: <10 veya >30/dk ise KIRMIZI. 10-30 arası ise dolaşıma geç. Solunum yoksa baş-çene pozisyonu ver → hâlâ yoksa SİYAH, döndüyse KIRMIZI."},
  {q:"START triajda dolaşım değerlendirmesi nasıl yapılır?",a:"Kapiller geri dolum zamanı kontrol edilir (tırnak yatağına bası). >2 sn ise KIRMIZI. <2 sn ise bilince geç. Alternatif: Radial nabız >120/dk ise KIRMIZI."},
  {q:"START triajda bilinç değerlendirmesi nasıl yapılır?",a:"'Elimi tut', 'gözlerini kapat' gibi basit komutlar verilir. Yanıt veremiyorsa KIRMIZI. Yanıt veriyorsa SARI."},
  {q:"Triajda bilinç kontrolü neden en sonda yapılır?",a:"Sorulara mantıklı yanıt verebilen bir yaralı bile solunum veya dolaşım bozukluğu nedeniyle KIRMIZI kodlanabilir, bu kolayca gözden kaçabilir."},

  // --- JUMP START Triaj ---
  {q:"JUMP START triaj nedir?",a:"START triajın pediatrik yaş grubuna uyarlanmış versiyonudur. Çocuk ve bebeklere uygulanır."},
  {q:"JUMP START'ın START'tan en önemli farkı nedir?",a:"Solunumu olmayan çocukta siyah kod vermeden önce dolaşım kontrol edilir (çocuklarda karotis, bebeklerde brakial nabız). Nabız varsa 5 kurtarıcı soluk verilir → solunum döndüyse KIRMIZI, dönmediyse SİYAH."},
  {q:"JUMP START'ta dolaşım nasıl değerlendirilir?",a:"Erişkinde kapiller geri dolum kullanılırken, çocuk/bebekte periferik arter nabzı kullanılır. Travmasız ekstremite tercih edilir. Nabız alınamazsa KIRMIZI."},
  {q:"JUMP START'ta bilinç nasıl değerlendirilir?",a:"AVPU skalası kullanılır. A, V, P olanlar → SARI. U (yanıt vermeyenler) → KIRMIZI."},

  // --- Triaj Kartı ---
  {q:"Triaj kartı nedir?",a:"Triajı yapılmış hastanın değişik basamaklarda önceliğinin kolayca fark edilmesi için kullanılan, renk kodlu, numaralı işaretleme kartıdır."},
  {q:"Triaj kartının ön yüzünde neler bulunur?",a:"Kart no, il kodu, yaralanmalar (figür üzerinde), triaj kodu, nakil yolu, nakil pozisyonu, 1. ve 2. nakil bölümleri."},
  {q:"Triaj kartının arka yüzünde neler bulunur?",a:"Yapılan uygulamalar ve saatleri, verilen serumlar, verilen ilaçlar, notlar, hekimin kimliği, nakil bilgileri."}
];

window.bolum17_sorular = [
  {type:"multiple",question:"START triajda yürüyebilen hastalar hangi renk kodu alır?",options:["Kırmızı","Sarı","Yeşil","Siyah"],correct:2,explanation:"Yürüyebilen ve triaj sorumlusuna gelebilen herkes YEŞİL triaj kodu alır (hafif yaralı/acil değil)."},
  {type:"multiple",question:"START triajda solunum hızı >30/dk olan hasta hangi kodu alır?",options:["Yeşil","Sarı","Kırmızı","Siyah"],correct:2,explanation:"Solunum hızı <10 veya >30/dk ise KIRMIZI kod verilir. 10-30 arası ise dolaşım değerlendirmesine geçilir."},
  {type:"multiple",question:"START triajda kapiller geri dolum zamanı >2 sn ise hangi kod verilir?",options:["Yeşil","Sarı","Kırmızı","Siyah"],correct:2,explanation:"Kapiller geri dolum >2 sn veya radial nabız >120/dk ise KIRMIZI. <2 sn ise bilinç değerlendirmesine geçilir."},
  {type:"multiple",question:"START triajda basit komutlara yanıt veren hasta hangi kodu alır?",options:["Yeşil","Sarı","Kırmızı","Siyah"],correct:1,explanation:"Basit komutlara yanıt verebilen hasta SARI kod alır. Yanıt veremezse KIRMIZI."},
  {type:"multiple",question:"Triaj sorumlusu her bir yaralı için en fazla ne kadar süre harcamalıdır?",options:["30 saniye","1 dakika","2 dakika","5 dakika"],correct:1,explanation:"Triaj süresi her yaralı için 1 dakikadan kısa olmalıdır."},
  {type:"multiple",question:"JUMP START'ta solunumu olmayan çocukta siyah kod vermeden önce ne kontrol edilir?",options:["Bilinç","Dolaşım (nabız)","Kan basıncı","Pupil"],correct:1,explanation:"START'tan farklı olarak çocukta önce dolaşım (nabız) kontrol edilir. Nabız varsa 5 kurtarıcı soluk verilir."},
  {type:"multiple",question:"Under triaj ne demektir?",options:["Olması gerekenden daha acil değerlendirme","Olması gerekenden daha az acil değerlendirme","Triaj yapılmaması","Triajın tekrarlanması"],correct:1,explanation:"Under triaj: Hasta olması gerekenden daha az acil değerlendirilir → beklerken kötüleşebilir."},
  {type:"multiple",question:"JUMP START'ta AVPU'da 'U' olan çocuk hangi kodu alır?",options:["Yeşil","Sarı","Kırmızı","Siyah"],correct:2,explanation:"A, V, P → SARI. U (yanıtsız) → KIRMIZI."},
  {type:"multiple",question:"Triaj renk kodlamasında 'sarı' ne anlama gelir?",options:["Acil","Geciktirilebilir acil","Hafif yaralı","Ölü"],correct:1,explanation:"Sarı: Geciktirilebilir acil - henüz yaşamı tehdit etmiyor ama tedavi edilmezse potansiyel tehlike."},
  {type:"multiple",question:"Yenilenen triajda verilen kod nasıl değiştirilebilir?",options:["Daha iyi kodla değiştirilebilir","Ancak daha acil kodla değiştirilebilir","Hiç değiştirilemez","Sadece doktor değiştirebilir"],correct:1,explanation:"Yenilenen triajda verilen kod ancak daha acil ve öncelikli bir kodla değiştirilebilir, daha iyi kodla değiştirilemez."},

  {type:"truefalse",question:"Triaj sorumlusu hastaların acil bakımı ile de ilgilenmelidir.",correct:false,explanation:"Yanlış. Triaj sorumlusu hastaların acil bakımıyla ilgilenmez, sadece sınıflandırma yapar."},
  {type:"truefalse",question:"Triaj değerlendirmesi bilinç → solunum → dolaşım sırasını takip eder.",correct:false,explanation:"Yanlış. Triaj değerlendirmesi solunum → dolaşım → bilinç sırasını takip eder. Bilinç en sonda değerlendirilir."},

  {type:"fillblank",question:"START triajda normal solunum hızı aralığı ____-30/dk'dır.",answer:"10",alternatives:["on"],explanation:"Solunum hızı 10-30/dk arası ise normal kabul edilip dolaşım değerlendirmesine geçilir."},
  {type:"fillblank",question:"JUMP START'ta solunumu olmayan ve nabzı olan çocuğa ____ kurtarıcı soluk verilir.",answer:"5",alternatives:["beş"],explanation:"Nabız varsa 5 kurtarıcı soluk verilir. Solunum döndüyse KIRMIZI, dönmediyse SİYAH."},

  {type:"matching",question:"Triaj renk kodlarını eşleştirin:",pairs:[{left:"Kırmızı",right:"Acil - Öncelikli tedavi/transport"},{left:"Sarı",right:"Geciktirilebilir acil"},{left:"Yeşil",right:"Hafif yaralı, acil değil"},{left:"Siyah",right:"Ölü veya hayatta kalma şansı düşük"}],explanation:"Kırmızı: Acil. Sarı: Geciktirilebilir. Yeşil: Hafif. Siyah: Ölü/şansı düşük."},
  {type:"matching",question:"START ve JUMP START farklarını eşleştirin:",pairs:[{left:"START - solunum yok",right:"Pozisyon ver → yoksa SİYAH"},{left:"JUMP START - solunum yok",right:"Önce nabız kontrol → varsa 5 soluk"},{left:"START - dolaşım",right:"Kapiller geri dolum zamanı"},{left:"JUMP START - dolaşım",right:"Periferik arter nabzı"}],explanation:"START: Solunumu yoksa direkt siyah (pozisyon sonrası). JUMP START: Önce nabız kontrol, nabız varsa 5 kurtarıcı soluk. START: Kapiller dolum. JUMP START: Periferik nabız."}
];
