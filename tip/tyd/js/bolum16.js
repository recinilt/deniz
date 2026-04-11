// ============================================================
// BÖLÜM 16: Olay Yeri Yönetimi
// ============================================================

window.bolum16_learn = [
  {q:"Olay yeri yönetimi nedir?",a:"Olayı ve şartlarını değerlendirerek olaydan etkilenenlere en kısa sürede ve etkin hizmet vermeye yönelik acil sağlık hizmeti organizasyonudur."},
  {q:"Olay yeri yöneticisi kimdir?",a:"Sağlık ekiplerinin, malzemelerin, araçların etkili ve verimli kullanımını organize eden, diğer kurumların yöneticileri ile birlikte çalışan ve olay yerini sağlık açısından yöneten yetkili kişidir."},
  {q:"Olay yeri yönetiminin 5 aşaması nedir?",a:"1) Alarm ve Reaksiyon, 2) Operasyon, 3) Toplanma ve Terk, 4) Değerlendirme, 5) Eğitim ve Tatbikat."},

  // --- Alarm ve Reaksiyon ---
  {q:"Alarm ve reaksiyon aşamasında 112 KKM ne yapar?",a:"Olayı doğrular, bilgi edinir, gerekli ekip/ambulans sayısını belirler, diğer kurumları bilgilendirir (UMKE, itfaiye, emniyet vb.), ilk ekip ulaşana kadar yönetimi üstlenir."},

  // --- Operasyon ---
  {q:"Operasyon aşamasında ilk ekibin yapması gerekenler nelerdir?",a:"a) Olay yeri güvenliği değerlendirmesi, b) Olaya yol açan mekanizmanın değerlendirmesi, c) Hasta sayısının saptanması, d) Triaj ve tedavi, e) Ek kaynak gereksiniminin saptanması."},
  {q:"Olay yeri yönetiminde temel ilke nedir?",a:"'Olay yerine ilk ulaşanın olay yerinden en son ayrılacağı' ilkesidir."},
  {q:"Olay yeri yöneticisi kim olur?",a:"İlk olay yerine ulaşan ekip lideri yöneticiliği üstlenir. Daha yetkili biri gelene kadar devam eder."},
  {q:"Olay yeri yönetiminde en büyük hata nedir?",a:"Olay yerine ulaşan ilk ambulansın yaralı bir hastayı alıp olay yerinden uzaklaşmasıdır."},

  // --- Adli Vakalara Yaklaşım ---
  {q:"Adli vakalarda sağlık personelinin dikkat etmesi gerekenler nelerdir?",a:"Olay yeri bozulmuşsa bilgi verilmeli, ateşli silah olaylarında el/bilek temizlenmemeli, elbisedeki mermi giriş deliği kesilmemeli, deliller korunmalı, gereksiz hareket edilmemeli."},

  // --- Güvenlik ve Park ---
  {q:"Trafik kazasında ambulans nereye park edilir?",a:"Kaza alanından 2 ambulans boyu geride, kazaya uygun şeritte. Tepe lambaları ve dörtlü flaşörler açık. Koniler hız limitinin yarısı kadar mesafeye yerleştirilir."},
  {q:"Tehlikeli madde taşıyan kaza olduğunda yönetim kimdedir?",a:"AFAD (Afet ve Acil Durum Yönetimi Başkanlığı). Acil sağlık ekipleri AFAD'ın belirlediği soğuk alanda bekler."},

  // --- Toplanma ve Değerlendirme ---
  {q:"Toplanma ve terk aşamasında ne yapılır?",a:"Tüm nakiller tamamlanıp sağlık tehditleri ortadan kalktığında, 112 KKM izni ile ekipler toplanır. Araç-gereç kontrolü yapılır, olay yerinden ayrılınır."},
  {q:"Değerlendirme aşamasında ne yapılır?",a:"Olay sonrası debrifing toplantıları düzenlenir, deneyimler paylaşılır, psikolojik destek sağlanır."},

  // --- Büyük Çaplı Olaylar ---
  {q:"Büyük çaplı olaylarda olay yeri yönetim ekibi kimlerden oluşur?",a:"1) Olay Yeri Yöneticisi, 2) Haberleşme Sorumlusu, 3) Lojistik ve Alan Sorumlusu, 4) Triaj Sorumlusu, 5) Tedavi Sorumlusu, 6) Sevk Sorumlusu."},
  {q:"Olay yeri sağlık hizmet alanları nelerdir?",a:"Olay yeri yönetim merkezi, triaj alanı, tedavi alanı, hasta sevk alanı, ambulans toplanma alanı, lojistik alanı, geçici morg alanı, rehabilitasyon alanı."},
  {q:"Geçici morg alanı nasıl olmalıdır?",a:"Gözden uzak, mümkünse kapalı alan. Uzun süreli olaylarda soğuk hava depoları veya konteynerleri kullanılmalıdır."},
  {q:"Rehabilitasyon alanı ne amaçla kurulur?",a:"Uzun süren olaylarda personelin dinlendirildiği ve rehabilite edildiği alandır. Olayın kötü etkilerinden uzak, güvenli yerde kurulur."},
  {q:"Büyük çaplı olaylarda 3 yönetim düzeyi nedir?",a:"Stratejik düzey (Valilik, İl Sağlık Md, 112 KKM), Taktiksel düzey (olay yeri yönetim merkezi, triaj/tedavi alanları), Operasyonel düzey (arama-kurtarma, sağlık ekipleri)."},
  {q:"Operasyonel düzeye kimler girebilir?",a:"Sadece kişisel güvenlik kıyafetleri olan görevliler girebilir."}
];

window.bolum16_sorular = [
  {type:"multiple",question:"Olay yeri yönetiminin ilk aşaması hangisidir?",options:["Operasyon","Alarm ve Reaksiyon","Triaj","Toplanma"],correct:1,explanation:"5 aşama sırasıyla: 1) Alarm ve Reaksiyon, 2) Operasyon, 3) Toplanma ve Terk, 4) Değerlendirme, 5) Eğitim ve Tatbikat."},
  {type:"multiple",question:"Olay yeri yönetiminde temel ilke nedir?",options:["İlk gelen ilk ayrılır","İlk gelen en son ayrılır","En deneyimli önce ayrılır","Hepsi aynı anda ayrılır"],correct:1,explanation:"'Olay yerine ilk ulaşanın olay yerinden en son ayrılacağı' ilkesi temel kuraldır."},
  {type:"multiple",question:"Büyük çaplı olaylarda olay yeri yönetim ekibi kaç kişiden oluşur?",options:["3","4","6","8"],correct:2,explanation:"6 kişi: Olay Yeri Yöneticisi, Haberleşme, Lojistik/Alan, Triaj, Tedavi ve Sevk Sorumlusu."},
  {type:"multiple",question:"Tehlikeli madde kazasında yönetim kimdedir?",options:["112 KKM","İtfaiye","AFAD","Emniyet"],correct:2,explanation:"AFAD (Afet ve Acil Durum Yönetimi Başkanlığı) yönetimi üstlenir. Sağlık ekipleri soğuk alanda bekler."},
  {type:"multiple",question:"Olay yeri yönetiminde en büyük hata hangisidir?",options:["Triaj yapmamak","İlk ambulansın yaralıyı alıp gitmesi","Güvenlik sağlamamak","Kayıt tutmamak"],correct:1,explanation:"İlk ambulansın yaralı alıp olay yerinden uzaklaşması kaosa ve önlenebilir ölümlere neden olabilir."},
  {type:"multiple",question:"Stratejik düzeyde hangi birimler yer alır?",options:["Arama-kurtarma ekipleri","Triaj ve tedavi alanları","Valilik, İl Sağlık Md, 112 KKM","Saha sağlık ekipleri"],correct:2,explanation:"Stratejik: Valilik, İl Sağlık Md, 112 KKM. Taktiksel: Olay yeri yönetim merkezi. Operasyonel: Saha ekipleri."},
  {type:"multiple",question:"Trafik kazasında ambulans kaza alanından ne kadar geride park edilir?",options:["1 ambulans boyu","2 ambulans boyu","3 ambulans boyu","50 metre"],correct:1,explanation:"Ambulans kaza alanından 2 ambulans boyu geride park edilir ve konilerle işaretleme yapılır."},

  {type:"truefalse",question:"Olay yerine gelen tüm sağlık ekipleri olay yeri yöneticisinin izni olmadan müdahale yapabilir.",correct:false,explanation:"Yanlış. Tüm ekipler olay yeri yöneticisinin direktifleri doğrultusunda hareket eder. İzinsiz müdahale yapılamaz."},
  {type:"truefalse",question:"Adli vakalarda ateşli silah olaylarında şahsın el ve bilekleri temizlenmemelidir.",correct:true,explanation:"Doğru. Tıbbi zorunluluk dışında el/bilek temizlenmemeli, temizlenme zorunluluğu varsa malzemeler poşete konularak saklanmalıdır."},
  {type:"truefalse",question:"Alarm ve reaksiyon aşamasında olay yeri yönetimi 112 KKM'nin sorumluluğundadır.",correct:true,explanation:"Doğru. İlk sağlık ekibi olay yerine ulaşana kadar olay yeri yönetimi 112 KKM'nin sorumluluğundadır."},

  {type:"fillblank",question:"Büyük çaplı olaylarda olay yeri sağlık hizmet alanlarından biri olan ____ alanı, personelin dinlendirildiği yerdir.",answer:"rehabilitasyon",alternatives:["Rehabilitasyon"],explanation:"Rehabilitasyon alanı uzun süren olaylarda personelin rehabilite edildiği ve dinlendirildiği alandır."},
  {type:"fillblank",question:"Operasyonel düzeye sadece kişisel güvenlik ____ olan görevliler girebilir.",answer:"kıyafetleri",alternatives:["kıyafeti","ekipmanları"],explanation:"Operasyonel düzeye (olaya müdahale alanı) sadece kişisel güvenlik kıyafetleri olan görevliler girebilir."},

  {type:"matching",question:"Olay yeri yönetim ekibi görevlerini eşleştirin:",pairs:[{left:"Haberleşme Sorumlusu",right:"Tüm iletişimin sağlanması"},{left:"Triaj Sorumlusu",right:"Hastaların sınıflandırılması"},{left:"Tedavi Sorumlusu",right:"İlk tedavilerin yapılması"},{left:"Sevk Sorumlusu",right:"Ambulansla nakil koordinasyonu"}],explanation:"Her sorumlu kendi alanından sorumludur ve olay yeri yöneticisine bağlı çalışır."},
  {type:"matching",question:"Yönetim düzeylerini eşleştirin:",pairs:[{left:"Stratejik düzey",right:"Valilik, İl Sağlık Md, 112 KKM"},{left:"Taktiksel düzey",right:"Olay yeri yönetim merkezi"},{left:"Operasyonel düzey",right:"Arama-kurtarma, sağlık ekipleri"},{left:"Soğuk alan",right:"Tehlikeli madde kazasında bekleme"}],explanation:"Stratejik: Üst yönetim. Taktiksel: Olay yeri koordinasyon. Operasyonel: Saha müdahale. Soğuk alan: KBRN güvenli bölge."}
];
