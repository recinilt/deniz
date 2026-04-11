// ============================================================
// BÖLÜM 18: Haberleşme
// ============================================================

window.bolum18_learn = [
  {q:"Haberleşme nedir?",a:"Gönderici tarafından başlatılan, istenilen anlamı alıcıya ileten ve onun cevap davranışına yol açan herhangi bir davranıştır. Taraflar arasında ortak bir anlayışın yaratılmasıdır."},
  {q:"112 acil sağlık sisteminde haberleşmenin en üst birimi neresidir?",a:"112 KKM (Komuta Kontrol Merkezi). Telsiz anonslarında '112 Merkez' koduyla anons edilir."},

  // --- Telsiz Sistemleri ---
  {q:"Telsiz nedir?",a:"Tel(kablo) bağlantısı olmaksızın manyetik radyo dalgaları ile haberleşmeyi sağlayan cihazdır. Acil durum ve afetlerde kullanımı önemlidir."},
  {q:"Çevrim nedir?",a:"Tüm birimlerin ve telsiz kullanıcılarının katılımı ile oluşan telsiz haberleşme ağıdır. Her çevrimin bir lideri vardır (112 acil çevrim lideri: KKM)."},
  {q:"Telsiz haberleşmesinde mesaj öncelik sıralaması nedir?",a:"Acil (olay yerine giden ambulans), Öncelikli (hasta taşıyan ambulans), Rutin (dönen ambulans), İdari (ikmale giden ambulans)."},

  // --- Telsiz Çalışma Şekilleri ---
  {q:"Simpleks (yakın kanal) görüşme nedir?",a:"İki telsizin doğrudan aynı frekans üzerinden haberleşmesidir. Menzil cihazın gücüyle sınırlıdır. Sabit telsiz en uzak, araç telsizi orta, el telsizi kısa menzillidir."},
  {q:"Röle (tekrarlayıcı) görüşme nedir?",a:"Aktarma istasyonu aracılığıyla yapılan haberleşmedir. El cihazları ile uzun mesafe görüşme için tek yoldur. Röleler yüksek tepelere konuşlandırılır."},
  {q:"Simpleks ve röle ne zaman tercih edilir?",a:"Birbiriyle menzil içinde olan birimler simpleks kullanmalı. Röle frekansı mecbur kalınmadıkça haberleşme için değil buluşma noktası olarak kullanılmalıdır."},

  // --- Frekans Bantları ---
  {q:"Frekans bantları nelerdir?",a:"HF (3-30 MHz): Uzak mesafe. VHF (30-300 MHz): Orta-kısa mesafe. UHF (300 MHz-3 GHz): Kısa mesafe, bina içi etkili. SHF (3-30 GHz): Dijital/uydu haberleşmesi."},
  {q:"Türkiye'de Sağlık Bakanlığı'na tahsis edilen frekans bandı hangisidir?",a:"VHF (Very High Frequency) bandıdır."},
  {q:"HF telsizler ne için kullanılır?",a:"Uzak mesafe görüşmeler ve afet haberleşmesinde erken dönemde tercih edilen en uygun frekans türüdür."},
  {q:"UHF'nin avantajı nedir?",a:"Etki mesafesi kısa olmasına rağmen bina gibi engellerin bulunduğu ortamlarda daha etkili haberleşme sağlar."},

  // --- Telsiz Cihazları ---
  {q:"Telsiz cihaz türleri nelerdir?",a:"1) Sabit merkez telsizi (KKM ve istasyonlarda, en uzun menzil), 2) Araç telsizi (ambulanslarda, orta menzil), 3) El telsizi (sahada, kısa menzil)."},
  {q:"Telsiz cihazı kullanım öncelik sırası nedir?",a:"Sabit merkez telsizi > Araç telsizi > El telsizi. Aynı yerde birden fazla cihaz varsa önce sabit, sonra araç, en son el telsizi tercih edilir."},

  // --- Telsiz Kullanım Kuralları ---
  {q:"Telsiz açıldıktan sonra ne kadar süre dinlenmeli?",a:"En az 15 saniye dinlenmelidir. Kanal meşgulse mandala basılmaz, acil konuşma varsa araya girilmez."},
  {q:"Mandala bastıktan sonra ne kadar beklenmeli?",a:"Yaklaşık 2 saniye beklenmeli, sonra konuşmaya başlanmalıdır. Anons bitiminden de 2 sn sonra mandal bırakılır."},
  {q:"Telsiz ile maksimum konuşma süresi ne kadardır?",a:"Maksimum 30 saniye. Mesaj bitmemişse aynı süreç yeniden başlatılır."},
  {q:"Konuşma bittiğinde hangi ifade kullanılır?",a:"'Tamam' ifadesi kullanılır. Her konuşmanın sonunda 'tamam' denilmesi sağlıklı haberleşme kuralıdır."},
  {q:"5N+1K kuralı nedir?",a:"Ne, Nerede, Ne zaman, Nasıl, Ne kadar, Kim. Mesaj aktarılırken doğru ve eksiksiz bilgi verilmesi için bu sorular cevaplanmalıdır."},
  {q:"Telsiz ile konuşurken mikrofon mesafesi ne olmalıdır?",a:"Bir karış mesafeden (10-15 cm). Asla bağırılmamalı, tane tane konuşulmalıdır."},
  {q:"Telsiz ile kişisel, siyasi ve ticari konuların konuşulması yasak mıdır?",a:"Evet, suçtur. Telsiz aynı frekansa ayarlı herkes tarafından dinlenebilir."},
  {q:"'Bas konuş, bırak dinle' kuralı ne anlama gelir?",a:"Mandala basılarak konuşulur, bırakılarak dinlenir. Biri göndermedeyken diğeri alma konumunda beklemelidir."},

  // --- Fonetik Alfabe ---
  {q:"Fonetik alfabe neden kullanılır?",a:"Çağrı adı, işaretleri ve mevki bilgilerini net iletmek için kullanılır. Türkçe: Ankara-A, Bursa-B vb. Uluslararası: Alfa-A, Bravo-B, Charlie-C vb."},

  // --- Kısa Haberleşme Kodları ---
  {q:"Önemli kısa haberleşme kodları nelerdir?",a:"07: Telsiz kontrol, 08: Açık ve net, 10: Trafik kazası, 11: KBRN vakası, 12: Yaralı, 13: Ağır yaralı, 14: Ölü, 15: Yardım gönderin, 16: Acil yardım gönderin, 17: Ambulans gönderin."},

  // --- Telsiz Bakımı ---
  {q:"Telsiz koruma ve bakım kuralları nelerdir?",a:"Antensiz çalıştırılmaz, anteninden tutulmaz, düşürülmez, ıslanmamalı, kirletilmemeli, aşırı sıcak/soğuktan korunmalı, 2 günde bir resetlenmelidir."},
  {q:"El telsizi şarj kuralları nelerdir?",a:"Tam boşalmadan şarj edilmemeli, dolu olduğunda şarjdan çıkarılmalı. 'Akıllı pil' teknolojisi: Li-Ion bataryaların 500-600 şarj/deşarj ömrü vardır."},

  // --- HF Çevrim ---
  {q:"HF telsiz çevrimi lideri kimdir?",a:"Sağlık Bakanlığı SAKOM (Sağlık Afet Koordinasyon Merkezi)."},
  {q:"HF çevrimde çağrı nasıl yapılır?",a:"Karşı istasyonun adı 2 kez söylenir, sonra 'Burası [kendi istasyon adı], Tamam'. Örnek: 'Adana, Adana - Burası SAKOM Merkez, Telsiz Kontrol Tamam'."},
  {q:"HF çevrimde cevap vermeyen istasyona ne yapılır?",a:"Üç kez çağrı yapılır, sonra bir sonrakine geçilir. Tüm istasyonlara yapıldıktan sonra başa dönülüp kalan istasyonlara tekrar çağrı yapılır."}
];

window.bolum18_sorular = [
  {type:"multiple",question:"112 acil sağlık sisteminde telsiz haberleşmenin en üst birimi neresidir?",options:["İl Sağlık Müdürlüğü","İstasyon","112 KKM","SAKOM"],correct:2,explanation:"112 KKM telsiz kanallarında en üst birimdir. HF çevrimde ise SAKOM çevrim lideridir."},
  {type:"multiple",question:"Türkiye'de Sağlık Bakanlığı'na tahsis edilen frekans bandı hangisidir?",options:["HF","VHF","UHF","SHF"],correct:1,explanation:"VHF (30-300 MHz) bandı Sağlık Bakanlığı'na acil sağlık ve afetlerde kullanılmak üzere tahsis edilmiştir."},
  {type:"multiple",question:"Telsiz açıldıktan sonra en az kaç saniye dinlenmelidir?",options:["5 sn","10 sn","15 sn","30 sn"],correct:2,explanation:"En az 15 saniye dinlenmelidir. Kanal meşgulse mandala basılmaz."},
  {type:"multiple",question:"Telsiz ile maksimum konuşma süresi ne kadardır?",options:["15 sn","30 sn","45 sn","60 sn"],correct:1,explanation:"Maksimum 30 saniye içinde mesaj iletilmeli ve 'tamam' diyerek bitirilmelidir."},
  {type:"multiple",question:"Telsiz cihazları kullanım öncelik sırası nedir?",options:["El > Araç > Sabit","Sabit > Araç > El","Araç > El > Sabit","Hepsi eşit"],correct:1,explanation:"Sabit merkez telsizi > Araç telsizi > El telsizi. En güçlü menzilli cihaz önceliklidir."},
  {type:"multiple",question:"Afet haberleşmesinde erken dönemde tercih edilen frekans türü hangisidir?",options:["VHF","UHF","HF","SHF"],correct:2,explanation:"HF (High Frequency) uzak mesafe için kullanılır ve afet haberleşmesinde erken dönemde en uygun türdür."},
  {type:"multiple",question:"5N+1K kuralındaki 'K' neyi ifade eder?",options:["Kaç","Konu","Kim","Kayıt"],correct:2,explanation:"5N+1K: Ne, Nerede, Ne zaman, Nasıl, Ne kadar + Kim."},
  {type:"multiple",question:"Kısa haberleşme kodu '10' ne anlama gelir?",options:["Trafik kazası","KBRN vakası","Yaralı","Telsiz kontrol"],correct:0,explanation:"10: Trafik kazası. 07: Telsiz kontrol. 11: KBRN vakası. 12: Yaralı."},
  {type:"multiple",question:"Mandala basıldıktan sonra konuşmaya başlamadan önce kaç saniye beklenmelidir?",options:["1 sn","2 sn","5 sn","10 sn"],correct:1,explanation:"Yaklaşık 2 saniye beklenmeli, sonra konuşmaya başlanmalıdır. Aksi halde ilk kelimeler anlaşılmaz."},

  {type:"truefalse",question:"Telsiz ile kişisel konuların konuşulması suçtur.",correct:true,explanation:"Doğru. Telsiz aynı frekansa ayarlı herkes tarafından dinlenebilir. Kişisel, siyasi ve ticari konuların konuşulması suçtur."},
  {type:"truefalse",question:"İstasyonlar 112 KKM izni olmadan kendi aralarında haberleşme yapabilir.",correct:false,explanation:"Yanlış. 112 KKM tarafından aksi istenmedikçe istasyonlar arası haberleşme yapılmaz."},
  {type:"truefalse",question:"El telsizi bataryası tam boşalmadan şarj edilmelidir.",correct:false,explanation:"Yanlış. Akıllı pil teknolojisi gereği tam boşalmadan şarj edilmemeli, tam dolunca şarjdan çıkarılmalıdır."},

  {type:"fillblank",question:"VHF frekans bandı ____ MHz - 300 MHz aralığındadır.",answer:"30",alternatives:["otuz"],explanation:"VHF: 30-300 MHz. HF: 3-30 MHz. UHF: 300 MHz-3 GHz. SHF: 3-30 GHz."},
  {type:"fillblank",question:"Telsiz konuşması bittiğinde '____' ifadesi kullanılır.",answer:"tamam",alternatives:["Tamam"],explanation:"Her konuşmanın sonunda 'tamam' denmesi sağlıklı haberleşme için temel kuraldır."},

  {type:"matching",question:"Frekans bantlarını mesafe özelliklerine göre eşleştirin:",pairs:[{left:"HF (3-30 MHz)",right:"Uzak mesafe, afet haberleşmesi"},{left:"VHF (30-300 MHz)",right:"Orta-kısa mesafe, 112 sistemi"},{left:"UHF (300 MHz-3 GHz)",right:"Kısa mesafe, bina içi etkili"},{left:"SHF (3-30 GHz)",right:"Dijital/uydu haberleşmesi"}],explanation:"HF: Uzak. VHF: Orta-kısa (112'ye tahsisli). UHF: Kısa/bina içi. SHF: Dijital/uydu."},
  {type:"matching",question:"Kısa haberleşme kodlarını eşleştirin:",pairs:[{left:"Kod 07",right:"Telsiz kontrol"},{left:"Kod 10",right:"Trafik kazası"},{left:"Kod 13",right:"Ağır yaralı"},{left:"Kod 17",right:"Ambulans gönderin"}],explanation:"07: Telsiz kontrol. 10: Trafik kazası. 13: Ağır yaralı. 17: Ambulans gönderin."}
];
