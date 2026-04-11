// ============================================================
// BÖLÜM 11: Periarrest Aritmiler
// ============================================================

window.bolum11_learn = [
  // --- Genel Kavramlar ---
  {q:"Periarrest aritmiler nedir?",a:"Kardiyak arrest ile sonuçlanabilecek, hemen tedavi edilmesi veya sistematik takibi gereken ritim bozukluklarıdır."},
  {q:"Aritmi şüphesinde hastaya ilk yaklaşım nasıl olmalıdır?",a:"Hızla ABCDE ile değerlendirilmeli, erken kardiyak monitörizasyon sağlanmalı, oksijen verilmeli, IV damar yolu açılmalı ve vital parametreler kontrol edilmelidir."},
  {q:"Aritmilerde sorulması gereken iki temel soru nedir?",a:"1) Hastanın durumu nasıl (stabil mi anstabil mi)? 2) Aritminin özelliği nedir?"},

  // --- Anstabilite Kriterleri ---
  {q:"Anstabilite kriterleri nedir?",a:"Şok (hipotansiyon, solukluk, terleme, soğuk ekstremite, konfüzyon), Senkop (geçici bilinç kaybı), Kalp yetersizliği (pulmoner ödem, artmış juguler basınç), Miyokard iskemisi (göğüs ağrısı veya EKG bulgusu)."},
  {q:"Kalp hızının hangi değerleri anstabilite açısından yönlendiricidir?",a:">150/dk veya <40/dk. Yüksek hızlarda diyastol kısalarak koroner iskemi, düşük hızlarda düşük kalp debisi gelişir."},

  // --- Tedavi Seçenekleri ---
  {q:"Anstabil taşikardilerde tedavi nedir?",a:"Senkronize kardiyoversiyon uygulanmalıdır."},
  {q:"Stabil taşikardilerde tedavi nasıl seçilir?",a:"QRS genişliği değerlendirilir, sonra ritmin düzenli olup olmadığına bakılarak uygun ilaç seçilir."},
  {q:"Anstabil bradikardilerde tedavi nedir?",a:"Öncelikle ilaç tedavisi (atropin), yanıt alınamazsa pacemaker uygulanması."},

  // --- Taşikardi Sınıflandırması ---
  {q:"Taşikardiler nasıl sınıflandırılır?",a:"QRS genişliğine göre: Geniş QRS'li (>0.12 sn) ve Dar QRS'li (<0.12 sn). Her biri düzenli ve düzensiz olarak ayrılır."},

  // --- Geniş QRS Taşikardiler ---
  {q:"Geniş QRS'li düzenli taşikardiler nelerdir?",a:"Ventriküler taşikardi (VT), dal bloklu SVT, pre-eksitasyonlu SVT."},
  {q:"Geniş QRS'li düzensiz taşikardiler nelerdir?",a:"Dal bloklu AF, pre-eksitasyonlu AF, polimorfik VT."},
  {q:"Geniş QRS'li düzenli taşikardi VT düşünülüyorsa tedavi nedir?",a:"300 mg Amiodaron %5 dekstrozla sulandırılarak 20-60 dk'da IV, ardından 24 saat boyunca 900 mg infüzyon."},
  {q:"Geniş QRS'li düzensiz taşikardide nabız varsa ve polimorfik VT düşünülüyorsa ne verilir?",a:"2 gram magnezyum sülfat 10 dakikada IV."},
  {q:"Anstabil düzensiz VT'de senkronize kardiyoversiyona yanıt alınamazsa ne yapılır?",a:"Defibrilasyon denenir."},

  // --- Dar QRS Taşikardiler ---
  {q:"Dar QRS'li düzenli taşikardilerin en sık nedeni nedir?",a:"AVNRT (atriyoventriküler nodal re-entry taşikardi = SVT). Genelde yapısal kalp hastalığı yoksa iyi huyludur."},
  {q:"Dar QRS'li düzenli taşikardide tedaviye nasıl başlanır?",a:"Önce vagal manevralar denenir. Sonuçsuz kalırsa adenozin 6 mg IV hızlı puşe (1-3 sn'de), yanıt yoksa 12 mg iki defaya kadar tekrarlanır."},
  {q:"Adenozin uygulamasında dikkat edilecek noktalar nelerdir?",a:"Hasta birkaç saniye sonra rahatsızlık hissedeceği konusunda uyarılmalı, monitörize edilmeli, EKG kaydı alınmalı ve sonrasında 10 cc SF puşe yapılmalıdır."},
  {q:"Dar QRS'li düzensiz taşikardide en olası ritim nedir?",a:"Atriyal fibrilasyon (AF) — erişkinde en sık görülen ritim bozukluğudur."},
  {q:"AF'da kalp hızı kontrolü için hangi ilaç tercih edilir?",a:"Beta bloker (metoprolol 5 mg IV yavaş, 5 dk ara ile 3 defaya kadar). Kontrendike ise diltiazem veya verapamil. Beta bloker ve Ca kanal blokeri birlikte kullanılmaz."},
  {q:"AF'da amiodaron neden dikkatle kullanılmalıdır?",a:"Ritim kontrolü (kimyasal kardiyoversiyon) sağlayabilir. AF süresi >48 saat ise emboli riski nedeniyle antikoagülasyon sağlanmadan verilmemelidir."},

  // --- Kardiyoversiyon ---
  {q:"Kardiyoversiyon nedir?",a:"Nabzı alınabilen anstabil taşikardi hastalarına uygulanan, R dalgasıyla senkronize edilmiş elektrik şoku uygulamasıdır."},
  {q:"Kardiyoversiyon ile defibrilasyon arasındaki fark nedir?",a:"Kardiyoversiyon R dalgasıyla senkronize edilir. Defibrilasyon senkronize değildir. Kardiyoversiyonda şoklama düğmesi deşarj gerçekleşene kadar basılı tutulmalıdır."},
  {q:"Kardiyoversiyon enerji dozları nedir?",a:"AF ve düzensiz VT: Monofazik 200 J / Bifazik 120 J. SVT ve atriyal flatter: Mono 100 J / Bi 70 J. Monomorfik VT: Mono 100 J / Bi 100 J. Çocuklarda 1 J/kg, yanıt yoksa 2 J/kg."},
  {q:"Bilinci açık hastada kardiyoversiyon öncesi ne yapılmalıdır?",a:"Sedasyon uygulanmalıdır."},

  // --- Bradiaritmiler ---
  {q:"Bradiaritmi tedavisinde altın kural nedir?",a:"Anstabil bulguların (şok, senkop, iskemi, kalp yetersizliği) varlığını değerlendirmektir."},
  {q:"Hangi bradikardiler genellikle tedavi gerektirmez?",a:"Sinüs bradikardisi (>40/dk), sinüs duraklaması, kavşak ritim, 1. derece AV blok, Mobitz 1 AV blok."},
  {q:"Hangi bradikardiler tehlikelidir ve tedavi gerektirebilir?",a:"Sinüs bradikardisi (<40/dk), sinüzal duraklama >3 sn, Mobitz tip 2 ve 3. derece tam AV blok."},
  {q:"Bradikardi tedavisinde ilk ilaç nedir?",a:"Atropin 0.5 mg IV puşe. 3-5 dk'da bir tekrar, toplam max 3 mg. Her uygulamadan önce nabız ve kan basıncı kontrol edilir."},
  {q:"Atropine rağmen anstabil bulgular devam ederse ne yapılır?",a:"Nabız <60 ve sistolik <90 ise adrenalin 2-10 mcg/dk infüzyonu. Hâlâ devam ederse transkütan pacemaker düşünülür."},
  {q:"Transkütan pacemaker ayarları nedir?",a:"Hız: 60-90/dk. Akım: 50-100 mA (en düşükten başlanarak artırılır). Elektriksel yakalama ve nabız oluşumu doğrulanmalıdır."},
  {q:"Transkütan pacemaker'ın en önemli dezavantajı nedir?",a:"Göğüs kaslarında ağrı oluşturmasıdır. Bilinci açık hastada sedasyon uygulanmalıdır."},

  // --- Vagal Manevralar ---
  {q:"Vagal manevralar nelerdir?",a:"Karotis sinüs masajı, valsalva manevrası, zorlu solunum, öksürtme, öğürtme, göz kapağına bası, yüze buzlu su. AV iletimi geciktirmek için uygulanır."},
  {q:"Karotis sinüs masajı nasıl yapılır?",a:"Tek taraflı, monitörizasyon eşliğinde. Baş ekstansiyonda, 2-3-4. parmaklar karotis üzerine, dairesel hareketlerle 5-10 sn bası. Başarısız olursa diğer taraf denenir."},
  {q:"Valsalva manevrası nasıl yapılır?",a:"2-3 derin nefes sonrası hasta ıkınır (10 sn). Burun kapatılması etkinliği artırır. Alternatif: 20 cc boş enjektörün pistonunu üfleterek geri ittirmek."}
];

// ============================================================

window.bolum11_sorular = [
  {type:"multiple",question:"Anstabilite kriterlerinden hangisi değildir?",options:["Şok","Senkop","Taşikardi","Miyokard iskemisi"],correct:2,explanation:"Dört anstabilite kriteri: Şok, Senkop, Kalp yetersizliği, Miyokard iskemisi. Taşikardi kriter değil, ritim bozukluğudur."},
  {type:"multiple",question:"Dar QRS'li düzenli taşikardide ilk tedavi ne olmalıdır?",options:["Amiodaron","Adenozin","Vagal manevralar","Kardiyoversiyon"],correct:2,explanation:"Önce vagal manevralar denenir. Başarısız olursa adenozin 6 mg IV hızlı puşe uygulanır."},
  {type:"multiple",question:"Adenozin ilk dozu ne kadardır?",options:["3 mg","6 mg","12 mg","18 mg"],correct:1,explanation:"Adenozin 6 mg IV hızlı puşe. Yanıt yoksa 12 mg iki defaya kadar tekrar."},
  {type:"multiple",question:"Bradikardi tedavisinde atropin dozu ve maksimumu nedir?",options:["0.25 mg, max 1.5 mg","0.5 mg, max 3 mg","1 mg, max 5 mg","2 mg, max 6 mg"],correct:1,explanation:"Atropin 0.5 mg IV puşe, 3-5 dk'da bir tekrar, toplam maksimum 3 mg."},
  {type:"multiple",question:"Kardiyoversiyonda şok hangi dalga ile senkronize edilir?",options:["P dalgası","T dalgası","R dalgası","U dalgası"],correct:2,explanation:"Kardiyoversiyonda şok R dalgası ile senkronize edilir. T dalgasıyla senkronize edilmesi tehlikelidir."},
  {type:"multiple",question:"AF'da kalp hızı kontrolü için ilk tercih edilen ilaç nedir?",options:["Amiodaron","Adenozin","Metoprolol (beta bloker)","Atropin"],correct:2,explanation:"AF'da hız kontrolü için genellikle beta bloker (metoprolol 5 mg IV yavaş) tercih edilir."},
  {type:"multiple",question:"Transkütan pacemaker hız ayarı ne olmalıdır?",options:["40-50/dk","60-90/dk","100-120/dk","120-150/dk"],correct:1,explanation:"Pacemaker hızı 60-90/dk, akımı 50-100 mA olmalıdır."},
  {type:"multiple",question:"Çocuklarda kardiyoversiyon başlangıç enerjisi ne kadardır?",options:["0.5 J/kg","1 J/kg","2 J/kg","4 J/kg"],correct:1,explanation:"Çocuklarda 1 J/kg başlanır, yanıt yoksa 2 J/kg ile devam edilir."},
  {type:"multiple",question:"Hangi AV bloklar her zaman tehlikelidir?",options:["1. derece ve Mobitz 1","Mobitz 2 ve 3. derece tam blok","Sadece 3. derece","Sinüs arresti"],correct:1,explanation:"Mobitz tip 2 ve 3. derece tam AV bloklar her zaman tehlikelidir ve tedavi gerektirebilir."},
  {type:"multiple",question:"Beta bloker ve kalsiyum kanal blokeri birlikte kullanılabilir mi?",options:["Evet, güvenlidir","Hayır, birlikte kullanılmamalıdır","Sadece düşük dozlarda","Sadece bradikardide"],correct:1,explanation:"Beta blokerler ve kalsiyum kanal blokerleri birlikte kullanılmamalıdır."},

  // --- DOĞRU-YANLIŞ ---
  {type:"truefalse",question:"Sinüs bradikardisi her zaman tedavi gerektirir.",correct:false,explanation:"Yanlış. Sinüs bradikardisi genellikle klinik göstermez. Ancak kalp hızı <40/dk olduğunda ve anstabil bulgular varsa tedavi gerekir."},
  {type:"truefalse",question:"AF süresi 48 saatten uzunsa amiodaron emboli riski nedeniyle dikkatle kullanılmalıdır.",correct:true,explanation:"Doğru. AF >48 saat ise antikoagülasyon sağlanmadan kimyasal kardiyoversiyon riski nedeniyle amiodaron tercih edilmemelidir."},
  {type:"truefalse",question:"Karotis sinüs masajı her iki tarafta aynı anda yapılabilir.",correct:false,explanation:"Yanlış. Karotis masajı daima tek taraflı ve monitörizasyon takibi ile yapılmalıdır."},

  // --- BOŞLUK DOLDURMA ---
  {type:"fillblank",question:"AF'da metoprolol ____ mg IV yavaş, 5 dk ara ile 3 defaya kadar verilir.",answer:"5",alternatives:["beş"],explanation:"Metoprolol 5 mg IV yavaş, yeterli etki sağlanana kadar 5 dk ara ile 3 defaya kadar tekrarlanır."},
  {type:"fillblank",question:"Anstabil taşikardilerde uygulanan tedavi senkronize ____'dir.",answer:"kardiyoversiyon",alternatives:["Kardiyoversiyon"],explanation:"Anstabil taşikardilerde (olumsuz bulgu varsa) senkronize kardiyoversiyon uygulanır."},

  // --- EŞLEŞTİRME ---
  {type:"matching",question:"Taşikardi tiplerini tedavileriyle eşleştirin:",pairs:[{left:"Dar QRS düzenli (SVT)",right:"Vagal manevralar + Adenozin"},{left:"Geniş QRS düzenli (VT)",right:"Amiodaron 300 mg"},{left:"Dar QRS düzensiz (AF)",right:"Beta bloker (Metoprolol)"},{left:"Anstabil taşikardi",right:"Senkronize kardiyoversiyon"}],explanation:"SVT: Vagal+Adenozin. VT: Amiodaron. AF: Beta bloker. Anstabil: Kardiyoversiyon."},
  {type:"matching",question:"Kardiyoversiyon enerji dozlarını eşleştirin (bifazik):",pairs:[{left:"AF / Düzensiz VT",right:"120 J"},{left:"SVT / Atriyal flatter",right:"70 J"},{left:"Monomorfik VT",right:"100 J"},{left:"Çocuklarda başlangıç",right:"1 J/kg"}],explanation:"Bifazik: AF 120J, SVT/flatter 70J, VT 100J. Çocuk: 1 J/kg başlangıç, yanıt yoksa 2 J/kg."}
];
