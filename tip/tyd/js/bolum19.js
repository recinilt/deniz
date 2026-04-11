// ============================================================
// BÖLÜM 19: Asepsi, Antisepsi, Sterilizasyon ve Dezenfeksiyon
// ============================================================

window.bolum19_learn = [
  {q:"Antisepsi nedir?",a:"Canlı doku üzerindeki (özellikle patojen) mikroorganizmaların öldürülmesi veya üremelerinin engellenmesidir."},
  {q:"Asepsi nedir?",a:"Mikroorganizmaların korunmuş bir alana ulaşmalarının önlenmesi ve devamlılığının sağlanmasıdır. Yapılan işlemlerin tamamına aseptik teknik denir."},
  {q:"Dezenfeksiyon nedir?",a:"Cansız maddeler ve yüzeyler üzerinde bulunan mikroorganizmaların (bakteri sporları hariç) yok edilmesi veya üremelerinin durdurulmasıdır."},
  {q:"Dezenfeksiyonun 3 düzeyi nedir?",a:"Düşük düzey: Sporlar ve mikobakterilere etkisiz. Orta düzey: Sporlara etkisiz, mikobakterilere etkili. Yüksek düzey: Sporlar dışında tüm mikroorganizmaları inaktive eder."},
  {q:"Sterilizasyon nedir?",a:"Herhangi bir maddenin üzerinde ve içinde bulunan TÜM mikroorganizmaların, sporlar dahil, yok edilmesi işlemidir."},
  {q:"Dekontaminasyon nedir?",a:"Dezenfeksiyon/sterilizasyon öncesi fiziksel/kimyasal yöntemlerle yüzey veya malzemeden organik madde ve patojenleri uzaklaştırarak güvenli hale getirme işlemidir."},
  {q:"El hijyeni neden önemlidir?",a:"Hastane enfeksiyonlarını önlemede en önemli araçtır. Eller dış ortamla en çok temas eden organ olup mikroorganizmaları mukozal yüzeylere taşır."},

  // --- El Yıkama Tipleri ---
  {q:"Sosyal el yıkama nedir?",a:"Antimikrobiyal etkinliği olmayan sabun ile ellerin en az 20 saniye yıkanmasıdır. Geçici flora uzaklaştırılır, kalıcı flora etkilenmez."},
  {q:"Hijyenik el yıkama nedir?",a:"Antibakteriyel ajanlarla (iyodofor, klorheksidin glukonat vb.) en az 15 saniye yıkamadır. Geçici floranın tamamı ve kalıcı floranın bir kısmı ortadan kaldırılır."},
  {q:"Hijyenik el yıkama hangi durumlarda gerekir?",a:"Hasta ile direkt temastan önce/sonra, invaziv/aseptik işlemlerden önce, kan/vücut sıvıları ile temas sonrası, hasta çevresi ile temas sonrası."},
  {q:"Hijyenik el ovalama nasıl yapılır?",a:"Alkol bazlı solüsyon 3-5 ml alınır, 0.5-1 dk eller ovuşturulur, tam kuruluk sağlanana kadar devam edilir. Asla ıslak ele uygulanmaz."},

  // --- Spaulding Sınıflaması ---
  {q:"Spaulding sınıflaması nedir?",a:"Hasta bakımında kullanılan alet/malzemelerin enfeksiyon riskine göre 3 gruba ayrılmasıdır: Kritik, yarı kritik ve kritik olmayan."},
  {q:"Kritik alet/malzemeler nelerdir?",a:"Steril dokulara veya vasküler sisteme giren malzemelerdir. Sterilizasyon gerekir (buhar, plazma, ETO)."},
  {q:"Yarı kritik alet/malzemeler nelerdir?",a:"Mukoza veya bütünlüğü bozulmuş cilt ile temas eden malzemelerdir (laringoskop blade vb.). Yüksek düzey dezenfeksiyon yeterlidir."},
  {q:"Kritik olmayan alet/malzemeler nelerdir?",a:"Bütünlüğü bozulmamış cilt ile temas edenlerdir (tansiyon aleti manşonu, sedye kenarları vb.). Temiz olması yeterli, kirlenme olursa düşük düzey dezenfeksiyon."},

  // --- Çalışma Alanı Temizliği ---
  {q:"Ambulans dezenfeksiyonu hangi sıra ile yapılır?",a:"1) Görünür artıklar uzaklaştır, 2) Su+sabun/deterjan ile temizle, 3) Dezenfektan ile pübantı ve silme, 4) Kan/sıvı varsa önce emdirici materyalle emdir."},
  {q:"Çamaşır suyu ile dezenfeksiyon nasıl yapılır?",a:"%5'lik klor içeren çamaşır suyu: Düşük düzey 1/100, yüksek düzey 1/10 oranında sulandırılarak kullanılır."}
];

window.bolum19_sorular = [
  {type:"multiple",question:"Sterilizasyon ile dezenfeksiyon arasındaki temel fark nedir?",options:["İkisi aynıdır","Sterilizasyon sporları da öldürür","Dezenfeksiyon sporları da öldürür","İkisi de sporları öldürür"],correct:1,explanation:"Sterilizasyon sporlar dahil TÜM mikroorganizmaları yok eder. Dezenfeksiyon ise sporlar hariç olanları yok eder."},
  {type:"multiple",question:"Sosyal el yıkamada eller en az kaç saniye yıkanmalıdır?",options:["10 saniye","15 saniye","20 saniye","30 saniye"],correct:2,explanation:"Sosyal el yıkamada eller en az 20 saniye yıkanmalıdır."},
  {type:"multiple",question:"Spaulding sınıflamasında laringoskop blade hangi kategoridedir?",options:["Kritik","Yarı kritik","Kritik olmayan","Steril"],correct:1,explanation:"Yarı kritik: Mukoza ile temas eden malzemeler (laringoskop blade vb.). Yüksek düzey dezenfeksiyon yeterlidir."},
  {type:"multiple",question:"Hijyenik el ovalamada alkol bazlı solüsyon ne kadar süre uygulanır?",options:["10-15 saniye","20-30 saniye","0.5-1 dakika","2-3 dakika"],correct:2,explanation:"3-5 ml alınır, 0.5-1 dakika ovuşturulur, tam kuruluk sağlanana kadar devam edilir."},
  {type:"multiple",question:"Ambulans dezenfeksiyonunda çamaşır suyu ile yüksek düzey dezenfeksiyon hangi oranda sulandırılır?",options:["1/100","1/50","1/10","1/5"],correct:2,explanation:"Düşük düzey: 1/100, Yüksek düzey: 1/10 oranında %5'lik çamaşır suyu sulandırılır."},

  {type:"truefalse",question:"Alkol bazlı el dezenfektanları ıslak ele uygulanabilir.",correct:false,explanation:"Yanlış. Alkol bazlı el dezenfektanları asla ıslak ele uygulanmamalıdır."},
  {type:"truefalse",question:"Dezenfeksiyon/sterilizasyon öncesi mutlaka dekontaminasyon yapılmalıdır.",correct:true,explanation:"Doğru. Dekontaminasyon, dezenfeksiyon ve sterilizasyon öncesi organik maddelerin uzaklaştırılması işlemidir."},
  {type:"truefalse",question:"Kritik olmayan malzemelerin steril olması gerekir.",correct:false,explanation:"Yanlış. Kritik olmayan malzemelerin (sağlam cilt teması) temiz olması yeterlidir. Kirlenme durumunda düşük düzey dezenfeksiyon yapılır."},

  {type:"fillblank",question:"Hijyenik el yıkamada antibakteriyel ajanlarla eller en az ____ saniye yıkanmalıdır.",answer:"15",alternatives:["on beş"],explanation:"Hijyenik el yıkamada ılık su ile ıslatıldıktan sonra en az 15 saniye uygun teknikle yıkanmalıdır."},
  {type:"fillblank",question:"Sterilizasyon ____ dahil tüm mikroorganizmaları yok eder.",answer:"sporlar",alternatives:["spor","sporları"],explanation:"Sterilizasyon sporlar dahil tüm mikroorganizmaları yok eder. Dezenfeksiyon ise sporlar hariç çalışır."},

  {type:"matching",question:"Spaulding sınıflamasını yöntemlerle eşleştirin:",pairs:[{left:"Kritik malzeme",right:"Sterilizasyon gerekir"},{left:"Yarı kritik malzeme",right:"Yüksek düzey dezenfeksiyon"},{left:"Kritik olmayan malzeme",right:"Temizlik yeterli"},{left:"Dekontaminasyon",right:"Tüm işlemlerden önce yapılır"}],explanation:"Kritik: Sterilizasyon. Yarı kritik: Yüksek düzey dezenfeksiyon. Kritik olmayan: Temizlik. Dekontaminasyon her şeyden önce."},
  {type:"matching",question:"El hijyeni tiplerini eşleştirin:",pairs:[{left:"Sosyal el yıkama",right:"Normal sabun, ≥20 sn"},{left:"Hijyenik el yıkama",right:"Antibakteriyel ajan, ≥15 sn"},{left:"Hijyenik el ovalama",right:"Alkol bazlı, 0.5-1 dk"},{left:"Kalıcı flora",right:"Hijyenik yıkamayla kısmen uzaklaşır"}],explanation:"Sosyal: Normal sabun ≥20sn. Hijyenik: Antibakteriyel ≥15sn. Ovalama: Alkol 0.5-1dk. Kalıcı flora sadece hijyenik yıkama ile kısmen etkilenir."}
];
