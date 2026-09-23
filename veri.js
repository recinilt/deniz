/* Uçuşa elverişlilik verisi. Düzenlerken JSON yapısını bozmayın; bu dosya index.html tarafından <script> ile yüklenir. */
window.UCUS_VERI = {
  "surum": "1.0",
  "guncelleme": "2026-09-23",
  "ana_kaynak": "IATA Medical Manual, 12. baskı (Temmuz 2020), Bölüm 6.1.6 Specific Medical Guidelines, kılavuz s. 53–59",
  "gun_sayimi": "IATA: olay (işlem, ameliyat, kanama vb.) günü ve uçuş günü sayıma dahildir. Olay günü 1. gündür; örneğin '≥10 gün' kuralında 1 Ekim'deki ameliyat için en erken gün 10 Ekim'dir.",
  "uyari": "Bu tablo, IATA'nın deneyime dayalı rehber sürelerinin Türkçe özetidir; araştırma verisi sınırlıdır. Karar muayene eden hekimindir ve havayolu, kurallara uyan yolcuyu bile taşımayı reddetme hakkını saklı tutar.",
  "durumlar": {
    "deg": "Değerlendirme gerekli",
    "sartli": "Koşula bağlı",
    "kabul": "Kabul",
    "yok": "Kaynakta süre yok"
  },
  "kategoriler": [
    {"id": "kalp", "ad": "Kalp ve damar"},
    {"id": "kan", "ad": "Kan"},
    {"id": "solunum", "ad": "Solunum"},
    {"id": "noro", "ad": "Nöroloji"},
    {"id": "gis", "ad": "Sindirim ve endoskopi"},
    {"id": "kbb", "ad": "KBB"},
    {"id": "goz", "ad": "Göz"},
    {"id": "psik", "ad": "Psikiyatri"},
    {"id": "gebelik", "ad": "Gebelik ve yenidoğan"},
    {"id": "orto", "ad": "Ortopedi"},
    {"id": "onko", "ad": "Onkoloji ve radyoiyot"},
    {"id": "diger", "ad": "Bulaşıcı ve diğer"}
  ],
  "genel_izin": {
    "baslik": "IATA'ya göre havayolu tıbbi izni (MEDIF) ne zaman gerekir",
    "maddeler": [
      "Aktif bulaşıcı olduğu düşünülen bir hastalık varsa.",
      "Fiziksel durumu veya davranışı nedeniyle diğer yolcular için tehlike ya da rahatsızlık oluşturabilecekse.",
      "Uçuşun güvenliği veya zamanlaması için risk oluşturuyorsa (divert veya planlanmamış iniş olasılığı dahil).",
      "Kendi bakımını yapamıyor ve özel yardıma ihtiyaç duyuyorsa.",
      "Tıbbi durumu uçuş ortamından olumsuz etkilenebilecekse."
    ],
    "not": "IATA, yolcunun kendi hekiminin raporunu havayolunun tıbbi biriminin kararına yönelik bir görüş olarak kabul eder; son kararı havayolu verir. Kronik ve stabil hastalıkta her yolculukta yeni izin yerine FREMEC kullanılabilir.",
    "sayfa": 52
  },
  "thy": {
    "kaynak_tarih": "2026-09-23 tarihinde THY resmi sayfalarından kontrol edildi",
    "linkler": [
      {"ad": "Hasta ve engelli yolcular", "url": "https://www.turkishairlines.com/en-us/any-questions/special-assistance-for-passengers/"},
      {"ad": "Hamile yolcular", "url": "https://www.turkishairlines.com/en-us/any-questions/traveling-while-pregnant/"},
      {"ad": "Bebek ve çocuk yolcular", "url": "https://www.turkishairlines.com/en-us/any-questions/infants-and-children/"}
    ],
    "rapor_gecerlilik_gun": 10,
    "rapor_kosullari": [
      "Türkçe veya İngilizce düzenlenmiş olmalı.",
      "Uçuş tarihinden en fazla 10 gün önce düzenlenmiş olmalı.",
      "Hasta yolcuda: yolcunun uçuşu acil tıbbi yardıma ihtiyaç duymadan tamamlayabileceğini yazılı olarak belirtmeli.",
      "Gebede: uçakla seyahatinde tıbbi sakınca bulunmadığını belirtmeli.",
      "Doktorun adı-soyadı, unvanı, lisans (diploma) numarası bulunmalı.",
      "Islak imza veya elektronik imza ve düzenlenme tarihi bulunmalı."
    ],
    "rapor_istenenler": [
      "Uçuştan önceki 10 gün içinde kalp, damar, göğüs veya beyin hastalığı ya da ameliyatı (bypass, anjiyografi, kalp veya beyin cerrahisi vb.) geçirenler.",
      "Ortopedik veya büyük abdominal cerrahi geçirip durumu hakkında beyan ya da özel istek sunmak isteyenler.",
      "Uçuş güvenliğini riske atabilecek aktif bulgusu olanlar (aktif kusma, ciddi nefes darlığı, aktif kanama, konfüzyon şüphesi, kontrolsüz ajitasyon vb.).",
      "Uçuşta tıbbi cihaz (oksijen, taşınabilir solunum cihazı) kullanacaklar.",
      "Sedyeli yolcular (refakatçi zorunlu; en fazla 10 günlük rapor; en az 48 saat önce talep).",
      "Bulaşıcı dönemdeki hastalıklarda, diğer yolculara bulaş riski olmadığını belirten rapor varsa kabul edilebilir."
    ],
    "kabul_edilmeyenler": [
      "48 saatten küçük bebek.",
      "Tekil gebelikte 36. haftanın başından, çoğul gebelikte 32. haftanın başından itibaren gebe yolcu (raporla da kabul edilmez).",
      "Havayolunun onaylamadığı elektrikli veya basınçlı cihaz kullanması gereken yolcu.",
      "Bulaşıcı dönemdeki kızamıkçık, kızamık, kabakulak, menenjit, el-ayak-ağız hastalığı, boğmaca, uyuz, suçiçeği, maymun çiçeği, tüberküloz (bulaş riski yoktur raporu varsa kabul edilebilir).",
      "Kendine veya başkalarına zarar verme riski olan, saldırgan veya kontrol edilemeyen yolcu (refakatçiyle bile kabul edilmez)."
    ],
    "diger": [
      "Oksijen: kişisel tüp kullanılamaz; THY, raporda yazan dakikalık akışta tüp sağlar; en az 48 saat önce talep edilmeli.",
      "Kişisel solunum cihazı, POC veya CPAP: FAA onaylı olmalı, 48 saat önce bildirilmeli, kabinde kullanım için doktor raporu gerekir.",
      "Tekerlekli sandalye: en az 48 saat önce talep edilmeli."
    ]
  },
  "gebelik": {
    "iata": {
      "tekil_son_gun_hafta": 35, "tekil_son_gun_gun": 6,
      "cogul_son_gun_hafta": 31, "cogul_son_gun_gun": 6,
      "metin": "IATA: komplikasyonsuz tekil gebelikte 36. haftanın sonuna, çoğul gebelikte 32. haftanın sonuna kadar izin gerekmez; sonrası değerlendirme gerektirir. Hesap tahmini doğum tarihine göre yapılır. Komplike gebelik bireysel değerlendirilir.",
      "sayfa": 57
    },
    "thy": {
      "rapor_baslangic_hafta": 28,
      "tekil_kabul_yok_hafta": 36,
      "cogul_kabul_yok_hafta": 32,
      "metin": "THY: 28. haftaya kadar rapor gerekmez. Tekil gebelikte 28–35. haftalarda, çoğul gebelikte 28–31. haftalarda rapor gerekir. Tekilde 36., çoğulda 32. haftanın başından itibaren raporla da kabul edilmez."
    },
    "yorum": "'36. haftanın sonu' ifadesi, Finnair'in açık tanımına uygun olarak 35 hafta 6 gün olarak alındı. THY'nin 'hafta' sayımı tamamlanmış hafta (ör. 36+0) olarak yorumlandı; bu yorumla IATA ve THY'nin tekil gebelikteki son günü (35+6) örtüşür. Sınırdaki günlerde THY ile teyit edin."
  },
  "durumlar_listesi": [
    {
      "id": "anjina", "kategori": "kalp", "ad": "Anjina pektoris", "en": "Angina",
      "esanlam": ["angina", "göğüs ağrısı", "koroner arter hastalığı", "KAH"],
      "iata": {"deg": "Stabil olmayan anjina veya minimal eforla anjina.", "kabul": "İlaçla kontrol altında; istirahatte anjina yok.", "sayfa": 54},
      "thy": "Kalp hastalığında son 10 gün içinde olay veya girişim varsa THY rapor ister."
    },
    {
      "id": "mi", "kategori": "kalp", "ad": "Miyokard enfarktüsü (STEMI, NSTEMI)", "en": "Myocardial infarction",
      "esanlam": ["kalp krizi", "MI", "STEMI", "NSTEMI", "enfarktüs", "AKS", "akut koroner sendrom"],
      "iata": {"deg": "Yüksek risk (EF <%40, kalp yetmezliği belirti ve bulguları, inceleme, revaskülarizasyon veya cihaz tedavisi bekleyen): durum stabil olana kadar ertelenir.", "kabul": "Düşük riskte 3. günden, orta riskte 10. günden itibaren.", "not": "Düşük risk: <65 yaş, ilk olay, başarılı reperfüzyon, EF >%45, komplikasyon yok, planlanmış inceleme veya girişim yok. Orta risk: EF >%40, indüklenebilir iskemi veya aritmi yok, planlanmış inceleme veya girişim yok. Kural British Cardiovascular Society rehberinden alınmıştır.", "sayfa": 54},
      "hesap": {"olay": "MI tarihi", "secenekler": [
        {"etiket": "Düşük risk", "asamalar": [{"kosul": {"gun_lte": 2}, "durum": "deg"}, {"kosul": {}, "durum": "kabul"}]},
        {"etiket": "Orta risk", "asamalar": [{"kosul": {"gun_lte": 9}, "durum": "deg"}, {"kosul": {}, "durum": "kabul"}]},
        {"etiket": "Yüksek risk", "asamalar": [{"kosul": {}, "durum": "deg", "metin": "Durum stabil olana kadar ertelenir; gün sınırı yok."}]}
      ]},
      "ek": [{"kaynak": "BCS 2010", "metin": "Düşük risk 3 gün, orta risk 10 gün; IATA ile aynı."}],
      "thy": "Son 10 gün içindeki kalp hastalığında THY rapor ister."
    },
    {
      "id": "ky", "kategori": "kalp", "ad": "Kalp yetmezliği", "en": "Cardiac failure",
      "esanlam": ["KKY", "konjestif kalp yetmezliği", "kalp yetmezligi", "heart failure"],
      "iata": {"deg": "Akut kalp yetmezliği veya kontrolsüz kronik kalp yetmezliği.", "kabul": "Kalp yetmezliği kontrol altında ve durum stabil.", "not": "Yeterli kontrol: oda havasında normal hızda 50 metre yürüyebilmek veya bir kat merdiven çıkabilmek, nefes darlığı olmadan. Aksi halde uçuşta oksijen düşünülmeli.", "sayfa": 54},
      "ek": [{"kaynak": "BCS 2010", "metin": "Akut kalp yetmezliğinden sonra stabilse 6 hafta; NYHA III'te oksijen gerekebilir, NYHA IV'te oksijen ve tıbbi yardım olmadan uçmaması önerilir."}]
    },
    {
      "id": "ak_odem", "kategori": "kalp", "ad": "Akciğer ödemi", "en": "Pulmonary oedema",
      "esanlam": ["pulmoner ödem", "akciger odemi"],
      "iata": {"deg": "Çözülmemiş akciğer ödemi.", "kabul": "Akciğer ödemi ve tetikleyen durum çözülmüş.", "not": "Ayrıca miyokard enfarktüsü kurallarına uyması gerekebilir.", "sayfa": 54}
    },
    {
      "id": "siyanotik", "kategori": "kalp", "ad": "Siyanotik konjenital kalp hastalığı", "en": "Cyanotic congenital heart disease",
      "esanlam": ["Eisenmenger", "doğumsal kalp hastalığı", "siyanoz"],
      "iata": {"deg": "Tüm vakalar.", "not": "Tüm vakalarda uçuşta oksijen düşünülmeli.", "sayfa": 54}
    },
    {
      "id": "kalp_cer", "kategori": "kalp", "ad": "Kalp cerrahisi (CABG, kapak)", "en": "Cardiac surgery",
      "esanlam": ["bypass", "CABG", "koroner bypass", "kapak ameliyatı", "açık kalp", "valv", "sternotomi"],
      "iata": {"deg": "CABG ve kapak cerrahisinden sonra 9 gün ve altı. Yakın zamanda transpozisyon, ASD, VSD, transplantasyon vb. her zaman değerlendirme gerektirir.", "kabul": "10. günden itibaren.", "sayfa": 54},
      "hesap": {"olay": "Ameliyat tarihi", "asamalar": [{"kosul": {"gun_lte": 9}, "durum": "deg"}, {"kosul": {}, "durum": "kabul"}]},
      "ek": [{"kaynak": "BCS 2010", "metin": "Komplikasyonsuz CABG'de 10 gün; IATA ile aynı."}],
      "thy": "Son 10 gün içindeki kalp ameliyatında THY rapor ister."
    },
    {
      "id": "anjiyo", "kategori": "kalp", "ad": "Koroner anjiyografi", "en": "Angiography",
      "esanlam": ["anjiyo", "anjio", "kateterizasyon", "koroner anjiyo", "KAG"],
      "iata": {"deg": "İşlemden sonra 24 saat ve altı.", "kabul": "24 saatten sonra, altta yatan durum stabilse.", "sayfa": 54},
      "hesap": {"olay": "İşlem zamanı", "saatli": true, "asamalar": [{"kosul": {"saat_lt": 24}, "durum": "deg"}, {"kosul": {}, "durum": "kabul"}]},
      "thy": "Son 10 gün içindeki anjiyografide THY rapor ister."
    },
    {
      "id": "anjiyoplasti", "kategori": "kalp", "ad": "Anjiyoplasti (stentli veya stentsiz)", "en": "Angioplasty with or without stent",
      "esanlam": ["PCI", "PTCA", "stent", "balon", "perkütan koroner girişim"],
      "iata": {"deg": "2 gün ve altı.", "kabul": "3. günden itibaren, asemptomatikse.", "sayfa": 54},
      "hesap": {"olay": "İşlem tarihi", "asamalar": [{"kosul": {"gun_lte": 2}, "durum": "deg"}, {"kosul": {}, "durum": "kabul"}]},
      "ek": [{"kaynak": "BCS 2010", "metin": "Komplikasyonsuz elektif PCI'dan 2 gün sonra."}],
      "thy": "Son 10 gün içindeki damar girişiminde THY rapor ister."
    },
    {
      "id": "pacemaker", "kategori": "kalp", "ad": "Pacemaker veya ICD takılması", "en": "Pacemaker or defibrillator implantation",
      "esanlam": ["kalp pili", "pil", "ICD", "defibrilatör", "CRT"],
      "iata": {"kabul": "2. günden itibaren, pnömotoraks yoksa ve ritim stabilse.", "sayfa": 54},
      "hesap": {"olay": "İşlem tarihi", "asamalar": [{"kosul": {"gun_lte": 1}, "durum": "deg", "metin": "IATA'da ilk gün için ayrı ölçüt yok; kabul 2. günden itibaren."}, {"kosul": {}, "durum": "kabul"}]},
      "ek": [{"kaynak": "BCS 2010", "metin": "Pnömotoraks gelişirse tam rezolüsyondan 2 hafta sonra; ICD şok verdiyse durum stabil olana kadar uçulmaz."}]
    },
    {
      "id": "ablasyon", "kategori": "kalp", "ad": "Ablasyon", "en": "Ablation therapy",
      "esanlam": ["kateter ablasyonu", "RF ablasyon", "EPS"],
      "iata": {"kabul": "2. günden itibaren.", "not": "İşlemden sonraki 1 hafta içinde uçan hasta DVT açısından yüksek risklidir.", "sayfa": 54},
      "hesap": {"olay": "İşlem tarihi", "asamalar": [{"kosul": {"gun_lte": 1}, "durum": "deg", "metin": "IATA'da ilk gün için ayrı ölçüt yok; kabul 2. günden itibaren."}, {"kosul": {"gun_lte": 7}, "durum": "kabul", "metin": "Kabul; ancak ilk hafta içinde DVT açısından yüksek risk."}, {"kosul": {}, "durum": "kabul"}]}
    },
    {
      "id": "dvt", "kategori": "kalp", "ad": "Bacakta derin ven trombozu", "en": "Deep venous thrombosis",
      "esanlam": ["DVT", "tromboz", "pıhtı"],
      "iata": {"deg": "Aktif DVT.", "kabul": "Asemptomatik olduğunda; oral antikoagülanla stabil.", "sayfa": 54}
    },
    {
      "id": "pe", "kategori": "kalp", "ad": "Pulmoner emboli", "en": "Pulmonary embolism",
      "esanlam": ["PE", "PTE", "akciğer embolisi"],
      "iata": {"deg": "Başlangıçtan sonra 4 gün ve altı.", "kabul": "5. günden itibaren; antikoagülasyon stabil ve oda havasında PaO2 normal.", "sayfa": 54},
      "hesap": {"olay": "Başlangıç tarihi", "asamalar": [{"kosul": {"gun_lte": 4}, "durum": "deg"}, {"kosul": {}, "durum": "kabul"}]}
    },
    {
      "id": "anemi", "kategori": "kan", "ad": "Anemi", "en": "Anemia",
      "esanlam": ["kansızlık", "hemoglobin", "Hb düşüklüğü"],
      "iata": {"deg": "Hb 8.5 g/dl (5.3 mmol/L) altında; kronik hastalığa bağlı değilse.", "kabul": "Hb 8.5 g/dl ve üzeri.", "not": "Akut anemide Hb, son kan kaybından 24 saatten fazla sonra ölçülmeli ve kanama durmuş olmalı. Oksijen ihtiyacı düşünülmeli.", "sayfa": 55}
    },
    {
      "id": "orak", "kategori": "kan", "ad": "Orak hücre hastalığı", "en": "Sickle cell disease",
      "esanlam": ["orak hücre", "sickle", "orak hucre krizi"],
      "iata": {"deg": "Son 9 gün içinde orak hücre krizi.", "kabul": "Krizden sonra 10. günden itibaren.", "not": "Her zaman ek oksijen gerekir.", "sayfa": 55},
      "hesap": {"olay": "Kriz tarihi", "asamalar": [{"kosul": {"gun_lte": 9}, "durum": "deg"}, {"kosul": {}, "durum": "kabul", "metin": "Kabul; ek oksijen her zaman gerekir."}]}
    },
    {
      "id": "pnx", "kategori": "solunum", "ad": "Pnömotoraks", "en": "Pneumothorax",
      "esanlam": ["pnomotoraks", "akciğer sönmesi", "PNX"],
      "iata": {"deg": "Tam ekspansiyondan sonra 6 gün ve altı. Genel durum iyiyse Heimlich tipi valfli dren ve doktor ya da hemşire refakatiyle erken nakil kabul edilebilir.", "kabul": "Tam ekspansiyondan sonra 7. günden itibaren; travmatik pnömotoraksta 14. günden itibaren.", "sayfa": 55},
      "hesap": {"olay": "Tam ekspansiyon tarihi (grafide)", "secenekler": [
        {"etiket": "Spontan", "asamalar": [{"kosul": {"gun_lte": 6}, "durum": "deg"}, {"kosul": {}, "durum": "kabul"}]},
        {"etiket": "Travmatik", "asamalar": [{"kosul": {"gun_lte": 13}, "durum": "deg"}, {"kosul": {}, "durum": "kabul"}]}
      ]},
      "ek": [{"kaynak": "BTS 2022", "metin": "Grafide tam rezolüsyondan 7 gün sonra. Travmatik pnömotoraksta dren çekildikten 72 saat sonra uçmanın güvenli olabileceğine dair sınırlı veri var, ancak BTS bunu rehberi değiştirecek kadar güçlü bulmuyor."}]
    },
    {
      "id": "gogus_cer", "kategori": "solunum", "ad": "Göğüs cerrahisi (kalp dışı)", "en": "Chest surgery",
      "esanlam": ["lobektomi", "plörektomi", "akciğer biyopsisi", "torakotomi", "VATS", "torasik cerrahi"],
      "iata": {"deg": "10 gün ve altı.", "kabul": "11. günden itibaren, komplikasyonsuz iyileşme varsa.", "not": "Örnek: lobektomi, plörektomi, açık akciğer biyopsisi.", "sayfa": 55},
      "hesap": {"olay": "Ameliyat tarihi", "asamalar": [{"kosul": {"gun_lte": 10}, "durum": "deg"}, {"kosul": {}, "durum": "kabul"}]},
      "ek": [{"kaynak": "BTS 2022", "celiski": true, "metin": "VATS dahil torasik cerrahide dren çekildikten sonra zorunlu olmayan seyahat için 4 hafta, zorunlu seyahatte en az 2 hafta öneriliyor; cerrahın görüşü alınmalı. IATA bu satırda BTS'nin 2011 önerisine dayanıyor."}],
      "thy": "Son 10 gün içindeki göğüs ameliyatında THY rapor ister."
    },
    {
      "id": "pnomoni", "kategori": "solunum", "ad": "Pnömoni", "en": "Pneumonia",
      "esanlam": ["zatürre", "akciğer enfeksiyonu", "pnömoni"],
      "iata": {"deg": "Semptomatik.", "kabul": "Tam çözülmüş; ya da grafi bulguları sürse de semptomsuz.", "not": "Özellikle yeni atakta, yaşlı yolcuda ve uzun uçuşta ek oksijen düşünülmeli.", "sayfa": 55}
    },
    {
      "id": "tb", "kategori": "solunum", "ad": "Tüberküloz", "en": "Tuberculosis",
      "esanlam": ["verem", "TB", "tüberküloz"],
      "iata": {"deg": "Tedavi edilmemiş veya tedaviye yanıtsız.", "kabul": "En az 2 hafta uygun tedavi ve tedaviye yanıt kanıtı varsa.", "sayfa": 55},
      "hesap": {"olay": "Uygun tedavinin başlangıcı", "asamalar": [{"kosul": {"gun_lte": 13}, "durum": "deg"}, {"kosul": {}, "durum": "sartli", "metin": "2 hafta doldu; tedaviye yanıt kanıtı varsa kabul."}]},
      "thy": "THY, bulaşıcı dönemdeki tüberkülozu kabul etmez; bulaş riski yoktur raporu varsa kabul edebilir."
    },
    {
      "id": "koah", "kategori": "solunum", "ad": "KOAH, amfizem, pulmoner fibrozis, plevral efüzyon, hemotoraks", "en": "COPD, emphysema, pulmonary fibrosis, pleural effusion, hemothorax",
      "esanlam": ["KOAH", "COPD", "amfizem", "fibrozis", "efüzyon", "hemotoraks", "kronik bronşit", "İAH"],
      "iata": {"deg": "Yerde ek oksijen gereksinimi; PO2 <50 mmHg; çözülmemiş yeni alevlenme.", "kabul": "Nefes darlığı olmadan 50 metreden fazla yürüyebiliyor ve genel durum iyi; yeni alevlenmeden tam iyileşmiş; aktif enfeksiyon yok.", "sayfa": 55}
    },
    {
      "id": "pht", "kategori": "solunum", "ad": "Pulmoner hipertansiyon", "en": "Pulmonary hypertension",
      "esanlam": ["PHT", "PAH", "pulmoner arter hipertansiyonu"],
      "iata": {"deg": "NYHA fonksiyonel sınıf II ve III.", "kabul": "NYHA fonksiyonel sınıf I.", "not": "NYHA IV normalde hava ambulansı protokolüyle taşınır. NYHA III'te ek oksijen gerekir.", "sayfa": 55}
    },
    {
      "id": "kf", "kategori": "solunum", "ad": "Kistik fibrozis", "en": "Cystic fibrosis",
      "esanlam": ["KF", "CF", "mukovisidoz"],
      "iata": {"deg": "Yerde FEV1 <%50.", "kabul": "Aktif enfeksiyon yok.", "sayfa": 55}
    },
    {
      "id": "astim", "kategori": "solunum", "ad": "Astım", "en": "Asthma",
      "esanlam": ["astim", "bronşiyal astım", "hırıltı"],
      "iata": {"kabul": "Şu an asemptomatik ve enfeksiyon yok.", "not": "Gerektiğinde kullandığı ilaçlarını kabin bagajında taşıması hatırlatılmalı.", "sayfa": 55}
    },
    {
      "id": "ak_kanser", "kategori": "solunum", "ad": "Akciğer kanseri", "en": "Cancer (respiratory)",
      "esanlam": ["akciğer tümörü", "akciger kanseri", "mezotelyoma"],
      "iata": {"deg": "Aktif tedavi (radyoterapi veya kemoterapi) altında; plevral efüzyon; yerde dispne.", "kabul": "Asemptomatik.", "not": "Majör hemoptizi kontrendikasyondur.", "sayfa": 55}
    },
    {
      "id": "bronsektazi", "kategori": "solunum", "ad": "Bronşektazi", "en": "Bronchiectasis",
      "esanlam": ["bronsektazi"],
      "iata": {"deg": "Yerde hipoksemik.", "kabul": "Aktif enfeksiyon yok.", "sayfa": 55}
    },
    {
      "id": "noromuskuler", "kategori": "solunum", "ad": "Nöromüsküler hastalık", "en": "Neuromuscular disease",
      "esanlam": ["ALS", "kas hastalığı", "SMA", "musküler distrofi"],
      "iata": {"deg": "Ağır ekstrapulmoner restriksiyon; ev tipi ventilasyon gereksinimi.", "sayfa": 55}
    },
    {
      "id": "pavm", "kategori": "solunum", "ad": "Pulmoner arteriyovenöz malformasyon", "en": "Pulmonary arteriovenous malformations",
      "esanlam": ["PAVM", "AVM akciğer"],
      "iata": {"deg": "Yerde ağır hipoksemi (SpO2 <%80).", "sayfa": 55}
    },
    {
      "id": "ventilator", "kategori": "solunum", "ad": "Ventilatöre bağlı yolcu", "en": "Ventilators",
      "esanlam": ["mekanik ventilasyon", "solunum cihazı", "ev ventilatörü"],
      "iata": {"deg": "Ağır hastalar ancak havayolu tıbbi danışmanıyla ayrıntılı görüşmeden sonra kabul edilir.", "kabul": "Yalnız hava ile ventilasyon gereken, uzun süreli stabil vakalar.", "sayfa": 55},
      "thy": "THY: kişisel solunum cihazı FAA onaylı olmalı, 48 saat önce bildirilmeli, kabinde kullanım için rapor gerekir."
    },
    {
      "id": "tia", "kategori": "noro", "ad": "Geçici iskemik atak (TİA)", "en": "TIA",
      "esanlam": ["TIA", "geçici felç", "mini inme"],
      "iata": {"deg": "2 gün ve altı.", "kabul": "2 günden sonra ve uygun inceleme yapılmışsa.", "sayfa": 56},
      "hesap": {"olay": "TİA tarihi", "asamalar": [{"kosul": {"gun_lte": 2}, "durum": "deg"}, {"kosul": {}, "durum": "sartli", "metin": "Uygun inceleme yapılmışsa kabul."}]},
      "thy": "Son 10 gün içindeki beyin hastalığında THY rapor ister."
    },
    {
      "id": "inme", "kategori": "noro", "ad": "İnme (serebrovasküler olay)", "en": "CVA (stroke)",
      "esanlam": ["felç", "SVO", "SVH", "CVA", "inme", "serebral enfarkt", "beyin kanaması"],
      "iata": {"deg": "4 gün ve altı.", "kabul": "5–14. günlerde, stabil veya iyileşiyorsa hemşire refakatiyle. İlk 2 haftada ek oksijen verilmeli.", "not": "Komplikasyonsuz iyileşmede hemşire refakati gerekmez.", "sayfa": 56},
      "hesap": {"olay": "İnme tarihi", "asamalar": [{"kosul": {"gun_lte": 4}, "durum": "deg"}, {"kosul": {"gun_lte": 14}, "durum": "sartli", "metin": "Stabil veya iyileşiyorsa hemşire refakatiyle; ek oksijen. Komplikasyonsuz iyileşmede refakat gerekmez."}, {"kosul": {}, "durum": "kabul", "metin": "14 gün geçti; IATA bu süreden sonrası için ayrı koşul belirtmiyor."}]},
      "thy": "Son 10 gün içindeki beyin hastalığında THY rapor ister."
    },
    {
      "id": "nobet", "kategori": "noro", "ad": "Jeneralize tonik-klonik nöbet", "en": "Grand mal fit",
      "esanlam": ["epilepsi", "sara", "konvülziyon", "grand mal", "nöbet"],
      "iata": {"deg": "Nöbetten sonra 24 saat ve altı.", "kabul": "24 saatten sonra, genel olarak iyi kontrol altındaysa.", "sayfa": 56},
      "hesap": {"olay": "Nöbet zamanı", "saatli": true, "asamalar": [{"kosul": {"saat_lt": 24}, "durum": "deg"}, {"kosul": {}, "durum": "kabul"}]}
    },
    {
      "id": "kraniyal", "kategori": "noro", "ad": "Kraniyal cerrahi", "en": "Cranial surgery",
      "esanlam": ["beyin ameliyatı", "kraniyotomi", "nöroşirürji", "beyin cerrahisi"],
      "iata": {"deg": "9 gün ve altı.", "kabul": "10. günden itibaren; kraniyumda hava yok ve genel durum iyi.", "sayfa": 56},
      "hesap": {"olay": "Ameliyat tarihi", "asamalar": [{"kosul": {"gun_lte": 9}, "durum": "deg"}, {"kosul": {}, "durum": "kabul", "metin": "Kraniyumda hava yoksa ve genel durum iyiyse kabul."}]},
      "ek": [{"kaynak": "UK CAA", "metin": "Nöroşirürji sonrası yaklaşık 7 gün önerir; IATA daha uzun (10. gün)."}],
      "thy": "Son 10 gün içindeki beyin ameliyatında THY rapor ister."
    },
    {
      "id": "demans", "kategori": "noro", "ad": "Bilişsel bozukluk ve demans", "en": "Cognitive impairment / dementias",
      "esanlam": ["Alzheimer", "demans", "bunama", "unutkanlık"],
      "iata": {"deg": "Sanrılı, paranoid, agresif veya disinhibe davranış öyküsü; dezoryantasyon; tanıdık ortamda ajitasyon; amaçsız dolaşma; belirgin anksiyete.", "kabul": "Hafif bozulma, bağımsız işlev, toplum içinde yaşıyor; belirgin paranoya, agresyon, dolaşma veya ajitasyon yok; son uçuştan beri kötüleşme yok.", "not": "Refakatçi desteği düşünülmeli.", "sayfa": 56}
    },
    {
      "id": "gis_kanama", "kategori": "gis", "ad": "Gastrointestinal kanama", "en": "GI bleed",
      "esanlam": ["GİS kanama", "melena", "hematemez", "ülser kanaması", "mide kanaması"],
      "iata": {"deg": "Kanamadan sonra 24 saat ve altı.", "kabul": "10. günden itibaren.", "not": "1–9. günlerde endoskopik veya başka açık iyileşme kanıtı varsa uçabilir (örneğin Hb yükselmeye devam ediyor, yani kanama durmuş). Anemi kurallarına da bakın.", "sayfa": 56},
      "hesap": {"olay": "Kanama zamanı", "saatli": true, "asamalar": [{"kosul": {"saat_lt": 24}, "durum": "deg"}, {"kosul": {"gun_lte": 9}, "durum": "sartli", "metin": "Endoskopik veya başka açık iyileşme kanıtı (Hb yükselmeye devam ediyor) varsa uçabilir."}, {"kosul": {}, "durum": "kabul"}]}
    },
    {
      "id": "abdominal", "kategori": "gis", "ad": "Majör abdominal cerrahi", "en": "Major abdominal surgery",
      "esanlam": ["laparotomi", "barsak rezeksiyonu", "açık histerektomi", "böbrek ameliyatı", "kolektomi", "açık ameliyat", "sezaryen"],
      "iata": {"deg": "9 gün ve altı.", "kabul": "10. günden itibaren, komplikasyonsuz iyileşme varsa.", "not": "Örnek: barsak rezeksiyonu, açık histerektomi, renal cerrahi.", "sayfa": 56},
      "hesap": {"olay": "Ameliyat tarihi", "asamalar": [{"kosul": {"gun_lte": 9}, "durum": "deg"}, {"kosul": {}, "durum": "kabul"}]},
      "ek": [{"kaynak": "UK CAA", "metin": "Abdominal cerrahiden sonra 10 gün."}, {"kaynak": "Qantas 2022", "metin": "Açık abdominal cerrahi listesine sezaryeni de alıyor; yolcu gaz ve dışkı çıkarabilmeli."}],
      "thy": "THY: büyük abdominal cerrahi sonrası yolcu beyan veya özel istek sunacaksa rapor ister."
    },
    {
      "id": "apendektomi", "kategori": "gis", "ad": "Apendektomi", "en": "Appendectomy",
      "esanlam": ["apandisit", "apandisit ameliyatı"],
      "iata": {"deg": "4 gün ve altı.", "kabul": "5. günden itibaren, komplikasyonsuz iyileşme varsa.", "sayfa": 56},
      "hesap": {"olay": "Ameliyat tarihi", "asamalar": [{"kosul": {"gun_lte": 4}, "durum": "deg"}, {"kosul": {}, "durum": "kabul"}]}
    },
    {
      "id": "laparoskopik", "kategori": "gis", "ad": "Laparoskopik cerrahi", "en": "Laparoscopic surgery",
      "esanlam": ["kapalı ameliyat", "laparoskopi", "kolesistektomi", "safra kesesi", "tüp ligasyonu", "fıtık laparoskopik"],
      "iata": {"deg": "4 gün ve altı.", "kabul": "5. günden itibaren, komplikasyonsuz iyileşme varsa.", "not": "Örnek: kolesistektomi, tubal cerrahi.", "sayfa": 56},
      "hesap": {"olay": "Ameliyat tarihi", "asamalar": [{"kosul": {"gun_lte": 4}, "durum": "deg"}, {"kosul": {}, "durum": "kabul"}]}
    },
    {
      "id": "tanisal_lap", "kategori": "gis", "ad": "Tanısal laparoskopi", "en": "Investigative laparoscopy",
      "esanlam": ["diagnostik laparoskopi", "tanı amaçlı laparoskopi"],
      "iata": {"deg": "24 saat ve altı.", "kabul": "24 saatten sonra, gaz emilmişse.", "sayfa": 56},
      "hesap": {"olay": "İşlem zamanı", "saatli": true, "asamalar": [{"kosul": {"saat_lt": 24}, "durum": "deg"}, {"kosul": {}, "durum": "kabul", "metin": "Gaz emilmişse kabul."}]}
    },
    {
      "id": "kolonoskopi", "kategori": "gis", "ad": "Kolonoskopi", "en": "Colonoscopy",
      "esanlam": ["kolonoskopi", "polipektomi", "alt endoskopi"],
      "kaynak_disi": "IATA tablosunda yok",
      "diger_kaynak": {"kaynak": "UK CAA", "metin": "Kolona çok miktarda gaz verildiği için 24 saat uçulmaması önerilir."},
      "hesap": {"olay": "İşlem zamanı", "saatli": true, "kaynak": "UK CAA", "asamalar": [{"kosul": {"saat_lt": 24}, "durum": "deg", "metin": "UK CAA: ilk 24 saat uçulmaması önerilir."}, {"kosul": {}, "durum": "kabul", "metin": "UK CAA önerisine göre 24 saat doldu."}]}
    },
    {
      "id": "gastroskopi", "kategori": "gis", "ad": "Gastroskopi (üst endoskopi)", "en": "Upper endoscopy",
      "esanlam": ["endoskopi", "gastroskopi", "üst GİS endoskopi", "EGD", "mide endoskopisi"],
      "kaynak_disi": "IATA, UK CAA, BTS ve Qantas'ta özel süre yok",
      "diger_kaynak": {"kaynak": "Analoji", "metin": "Resmi bir süre bulunamadı. Kolonoskopi için UK CAA'nın 24 saat önerisi analoji olarak uygulanabilir; biyopsi, polipektomi, dilatasyon veya kanama varsa ilgili kurallar (ör. GİS kanama) esas alınır. Sedasyon aldıysa etkisinin tamamen geçmesi beklenmeli."}
    },
    {
      "id": "otit", "kategori": "kbb", "ad": "Orta kulak iltihabı ve sinüzit", "en": "Otitis media and sinusitis",
      "esanlam": ["otit", "orta kulak", "sinüzit", "kulak tıkanıklığı", "östaki"],
      "iata": {"deg": "Akut hastalık veya östaki borusu fonksiyon kaybı.", "kabul": "Kulaklarını açabiliyorsa (basınç eşitleyebiliyorsa).", "sayfa": 56}
    },
    {
      "id": "orta_kulak_cer", "kategori": "kbb", "ad": "Orta kulak cerrahisi", "en": "Middle ear surgery",
      "esanlam": ["stapedektomi", "timpanoplasti", "kulak ameliyatı", "mastoidektomi"],
      "iata": {"deg": "9 gün ve altı.", "kabul": "10. günden itibaren, tedavi eden KBB uzmanının raporuyla.", "sayfa": 56},
      "hesap": {"olay": "Ameliyat tarihi", "asamalar": [{"kosul": {"gun_lte": 9}, "durum": "deg"}, {"kosul": {}, "durum": "kabul", "metin": "KBB uzmanı raporuyla kabul."}]}
    },
    {
      "id": "tonsillektomi", "kategori": "kbb", "ad": "Tonsillektomi", "en": "Tonsillectomy",
      "esanlam": ["bademcik ameliyatı", "bademcik", "tonsil"],
      "iata": {"deg": "10 gün ve altı.", "not": "3–6. günler arasında uçmak uygun olabilir; ancak 1–2. ve 7–10. günlerde belirgin kanama riski vardır. IATA'nın kabul sütunu bu satırda boş; 10. günden sonrası için ayrıca bir kısıt belirtilmemiş.", "sayfa": 56},
      "hesap": {"olay": "Ameliyat tarihi", "asamalar": [
        {"kosul": {"gun_lte": 2}, "durum": "deg", "metin": "Belirgin kanama riski dönemi (1–2. gün)."},
        {"kosul": {"gun_lte": 6}, "durum": "deg", "metin": "Değerlendirme gerekli; IATA bu dönemde (3–6. gün) uçmanın uygun olabileceğini belirtiyor."},
        {"kosul": {"gun_lte": 10}, "durum": "deg", "metin": "Belirgin kanama riski dönemi (7–10. gün)."},
        {"kosul": {}, "durum": "kabul", "metin": "10 gün geçti; IATA'da ayrıca kısıt belirtilmemiş."}
      ]}
    },
    {
      "id": "cene", "kategori": "kbb", "ad": "Telle sabitlenmiş çene", "en": "Wired jaw",
      "esanlam": ["çene kırığı", "intermaksiller fiksasyon", "çene teli"],
      "iata": {"deg": "Refakatsiz.", "kabul": "Tel kesiciyle refakatli veya hızlı açılabilen tel sistemi varsa.", "sayfa": 56}
    },
    {
      "id": "akut_psikoz", "kategori": "psik", "ad": "Akut psikoz", "en": "Acute psychosis",
      "esanlam": ["psikoz", "mani", "şizofreni", "madde ile ilişkili psikoz", "sanrı", "halüsinasyon"],
      "iata": {"deg": "Son 30 gün içinde epizot (mani, şizofreni, madde kaynaklı vb.).", "not": "Güvenlik nedeniyledir; tıbbi refakat düşünülmeli. 30 günden sonrası için kronik psikiyatrik bozukluk satırına bakın.", "sayfa": 57},
      "hesap": {"olay": "Epizot tarihi", "asamalar": [{"kosul": {"gun_lte": 30}, "durum": "deg"}, {"kosul": {}, "durum": "sartli", "metin": "30 gün geçti; kronik psikiyatrik bozukluk ölçütleri uygulanır."}]},
      "thy": "THY: kendine veya başkalarına zarar verme riski olan, saldırgan veya kontrol edilemeyen yolcuyu refakatçiyle bile kabul etmez."
    },
    {
      "id": "kronik_psik", "kategori": "psik", "ad": "Kronik psikiyatrik bozukluk", "en": "Chronic psychiatric disorders",
      "esanlam": ["psikiyatrik hastalık", "bipolar", "depresyon", "şizofreni kronik"],
      "iata": {"deg": "Uçuşta kötüleşme riski belirgin.", "kabul": "İlaçla uygun şekilde kontrol altında ve stabil (toplum içinde yaşıyor, ilaçları dahil tüm ihtiyaçlarını kendisi karşılıyor).", "sayfa": 57}
    },
    {
      "id": "penetran_goz", "kategori": "goz", "ad": "Penetran göz yaralanması", "en": "Penetrating eye injury",
      "esanlam": ["göz yaralanması", "delici göz travması", "glob perforasyonu"],
      "iata": {"deg": "6 gün ve altı.", "kabul": "7. günden itibaren.", "not": "Globdaki her türlü gaz emilmiş olmalı.", "sayfa": 57},
      "hesap": {"olay": "Yaralanma tarihi", "asamalar": [{"kosul": {"gun_lte": 6}, "durum": "deg"}, {"kosul": {}, "durum": "kabul", "metin": "Globdaki gaz emilmişse kabul."}]}
    },
    {
      "id": "goz_ici", "kategori": "goz", "ad": "Göz içi cerrahi", "en": "Intra-ocular surgery",
      "esanlam": ["vitrektomi", "retina ameliyatı", "retina dekolmanı", "SF6", "C3F8", "C2F6", "göze gaz"],
      "iata": {"deg": "6 gün ve altı.", "kabul": "7. günden itibaren.", "not": "Göze verilen gaz emilmiş olmalı: SF6 için en az 2 hafta, C2F6 ve C3F8 için en az 6 hafta gerekir. Ticari uçuş için uzmanın yazılı uygunluk raporu gerekir.", "sayfa": 57},
      "hesap": {"olay": "Ameliyat tarihi", "secenekler": [
        {"etiket": "Gaz verilmedi", "asamalar": [{"kosul": {"gun_lte": 6}, "durum": "deg"}, {"kosul": {}, "durum": "kabul"}]},
        {"etiket": "SF6", "asamalar": [{"kosul": {"gun_lte": 13}, "durum": "deg"}, {"kosul": {}, "durum": "sartli", "metin": "En az 2 hafta doldu; gaz emilmişse ve uzman yazılı rapor verdiyse kabul."}]},
        {"etiket": "C2F6 veya C3F8", "asamalar": [{"kosul": {"gun_lte": 41}, "durum": "deg"}, {"kosul": {}, "durum": "sartli", "metin": "En az 6 hafta doldu; gaz emilmişse ve uzman yazılı rapor verdiyse kabul."}]}
      ]},
      "ek": [{"kaynak": "UK CAA", "metin": "SF6'da yaklaşık 2 hafta, C3F8'de 6 hafta; diğer göz içi işlemlerde 1 hafta."}]
    },
    {
      "id": "katarakt", "kategori": "goz", "ad": "Katarakt cerrahisi", "en": "Cataract surgery",
      "esanlam": ["katarakt", "fako", "göz merceği"],
      "iata": {"deg": "24 saat ve altı.", "kabul": "24 saatten sonra.", "sayfa": 57},
      "hesap": {"olay": "Ameliyat zamanı", "saatli": true, "asamalar": [{"kosul": {"saat_lt": 24}, "durum": "deg"}, {"kosul": {}, "durum": "kabul"}]}
    },
    {
      "id": "kornea_lazer", "kategori": "goz", "ad": "Korneal lazer cerrahisi", "en": "Corneal laser surgery",
      "esanlam": ["LASIK", "PRK", "lazer göz", "miyop ameliyatı"],
      "iata": {"deg": "24 saat ve altı.", "kabul": "24 saatten sonra.", "sayfa": 57},
      "hesap": {"olay": "Ameliyat zamanı", "saatli": true, "asamalar": [{"kosul": {"saat_lt": 24}, "durum": "deg"}, {"kosul": {}, "durum": "kabul"}]}
    },
    {
      "id": "gebelik_tekil", "kategori": "gebelik", "ad": "Gebelik (tekil, komplikasyonsuz)", "en": "Pregnancy, single",
      "esanlam": ["hamile", "hamilelik", "gebe", "gebelik"],
      "iata": {"deg": "36. haftanın sonundan sonra (tahmini doğum tarihine göre).", "kabul": "36. haftanın sonuna kadar izin gerekmez.", "sayfa": 57},
      "gebelik_hesabi": true,
      "thy": "THY: 28–35. haftalarda rapor gerekir; 36. haftanın başından itibaren raporla da kabul edilmez."
    },
    {
      "id": "gebelik_cogul", "kategori": "gebelik", "ad": "Gebelik (çoğul, komplikasyonsuz)", "en": "Pregnancy, multiple",
      "esanlam": ["ikiz", "üçüz", "çoğul gebelik", "ikiz gebelik"],
      "iata": {"deg": "32. haftanın sonundan sonra (tahmini doğum tarihine göre).", "kabul": "32. haftanın sonuna kadar izin gerekmez.", "sayfa": 57},
      "gebelik_hesabi": true,
      "thy": "THY: 28–31. haftalarda rapor gerekir; 32. haftanın başından itibaren raporla da kabul edilmez."
    },
    {
      "id": "gebelik_komp", "kategori": "gebelik", "ad": "Komplike gebelik", "en": "Complicated pregnancies",
      "esanlam": ["riskli gebelik", "preeklampsi", "plasenta previa", "erken doğum tehdidi"],
      "iata": {"deg": "Bireysel değerlendirme.", "sayfa": 57}
    },
    {
      "id": "dusuk", "kategori": "gebelik", "ad": "Düşük (tehdit veya tam)", "en": "Miscarriage",
      "esanlam": ["abortus", "düşük tehdidi", "gebelik kaybı"],
      "iata": {"deg": "Aktif kanama varsa.", "kabul": "Stabil; en az 24 saattir kanama ve ağrı yok.", "sayfa": 57}
    },
    {
      "id": "yenidogan", "kategori": "gebelik", "ad": "Yenidoğan", "en": "New born",
      "esanlam": ["bebek", "yeni doğan", "neonatal", "yeni doğmuş", "prematüre"],
      "iata": {"deg": "48 saatten küçük; küvöz ± ventilatör gerektiren vakalar.", "kabul": "Sağlıklı bebek 48. saatte uçabilir, tercihen 7. gün.", "sayfa": 57},
      "hesap": {"olay": "Doğum zamanı", "saatli": true, "asamalar": [{"kosul": {"saat_lt": 48}, "durum": "deg"}, {"kosul": {"gun_lte": 6}, "durum": "sartli", "metin": "Sağlıklı bebek kabul; IATA tercihen 7. günü öneriyor. THY 2–7 günlük bebekten rapor ister."}, {"kosul": {}, "durum": "kabul"}]},
      "ek": [{"kaynak": "BTS 2022", "metin": "Term bebekte uçuşu 1 hafta ertelemek mantıklıdır. Beklenen doğum tarihine ulaşmamış preterm bebekte uçuşta oksijen hazır olmalı."}],
      "thy": "THY: 48 saatten küçük bebek kabul edilmez; 2–7 günlük bebek 'uçakla seyahatinde sakınca yoktur' raporuyla kabul edilir."
    },
    {
      "id": "radyoiyot_ca", "kategori": "onko", "ad": "Radyoiyot (I-131) – tiroid kanseri", "en": "Radioiodine I131 for thyroid cancer",
      "esanlam": ["I-131", "radyoaktif iyot", "atom tedavisi", "tiroid kanseri"],
      "iata": {"deg": "Diğer tüm durumlar, 0.5 m'de µSv/saat doz hızı tahmini dahil bireysel risk değerlendirmesi gerektirir.", "kabul": "2 saatten kısa uçuşta tedaviden 4 gün önce değil; 2 saatten uzun uçuşta 7 gün önce değil.", "not": "ICRP ve ulusal taburculuk şartları sağlanmalı; seyahat planı nükleer tıp bölümünce gözden geçirilmeli. Tüm vakalar güvenlik ve radyasyon dedektörleri için belge taşımalı.", "sayfa": 58},
      "hesap": {"olay": "Tedavi tarihi", "secenekler": [
        {"etiket": "Uçuş 2 saatten kısa", "asamalar": [{"kosul": {"gun_lte": 3}, "durum": "deg"}, {"kosul": {}, "durum": "kabul", "metin": "Kabul; nükleer tıp planı ve belge gerekli."}]},
        {"etiket": "Uçuş 2 saatten uzun", "asamalar": [{"kosul": {"gun_lte": 6}, "durum": "deg"}, {"kosul": {}, "durum": "kabul", "metin": "Kabul; nükleer tıp planı ve belge gerekli."}]}
      ]}
    },
    {
      "id": "radyoiyot_benign", "kategori": "onko", "ad": "Radyoiyot (I-131) – benign tiroid hastalığı", "en": "Radioiodine I131 for benign thyroid conditions",
      "esanlam": ["hipertiroidi", "Graves", "toksik nodül", "radyoaktif iyot"],
      "iata": {"deg": "Diğer tüm durumlar bireysel risk değerlendirmesi gerektirir.", "kabul": "2 saatten kısa uçuşta tedaviden 3 gün önce değil; 2 saatten uzun uçuşta 5 gün önce değil.", "not": "Tiroid kanseri satırındaki şartlar burada da geçerli.", "sayfa": 58},
      "hesap": {"olay": "Tedavi tarihi", "secenekler": [
        {"etiket": "Uçuş 2 saatten kısa", "asamalar": [{"kosul": {"gun_lte": 2}, "durum": "deg"}, {"kosul": {}, "durum": "kabul", "metin": "Kabul; nükleer tıp planı ve belge gerekli."}]},
        {"etiket": "Uçuş 2 saatten uzun", "asamalar": [{"kosul": {"gun_lte": 4}, "durum": "deg"}, {"kosul": {}, "durum": "kabul", "metin": "Kabul; nükleer tıp planı ve belge gerekli."}]}
      ]}
    },
    {
      "id": "radyonuklid", "kategori": "onko", "ad": "Diğer radyonüklidler ve kalıcı brakiterapi", "en": "Other radionuclides or permanent brachytherapy",
      "esanlam": ["brakiterapi", "Lutesyum", "radyonüklid tedavi", "seed implant"],
      "iata": {"deg": "Doz hızı tahmini dahil bireysel risk değerlendirmesi.", "kabul": "Yakın yetişkin temasına ilişkin ICRP şartlarının karşılandığı belgelenmişse.", "sayfa": 58}
    },
    {
      "id": "kemoterapi", "kategori": "onko", "ad": "Kemoterapi", "en": "Chemotherapy",
      "esanlam": ["kemo", "sitotoksik", "kanser tedavisi"],
      "iata": {"deg": "Aktif kemoterapi uygulaması sırasında.", "not": "Kemoterapi rejimindeki yolcu uçabilir, ancak sitotoksik ilacın aktif uygulaması sırasında (özellikle damar yolundan yavaş salınımlı uygulamada) uçmamalı.", "sayfa": 58}
    },
    {
      "id": "kalca_diz", "kategori": "orto", "ad": "Majör kalça, diz veya ayak bileği cerrahisi", "en": "Major hip, knee, or ankle surgery",
      "esanlam": ["protez", "kalça protezi", "diz protezi", "artroplasti", "ayak bileği ameliyatı"],
      "iata": {"deg": "Yürüme yardımcısıyla hareket edemiyor veya kalkış ve inişte koltukta tam dik oturamıyorsa.", "not": "DVT profilaksisi çok önemlidir. Profilaksi yoksa ilk 6 hafta içinde 6 saatten uzun yolculuk yalnız zorunluysa yapılmalı.", "sayfa": 59}
    },
    {
      "id": "artroskopi", "kategori": "orto", "ad": "Artroskopik eklem cerrahisi", "en": "Arthroscopic joint surgery",
      "esanlam": ["artroskopi", "menisküs", "kapalı eklem ameliyatı"],
      "iata": {"kabul": "Yürüme yardımcısıyla hareket edebiliyor ve kalkış ile inişte tam dik oturabiliyorsa.", "sayfa": 59}
    },
    {
      "id": "alci", "kategori": "orto", "ad": "Tam alçı (2 saatten uzun uçuş)", "en": "Full plaster cast",
      "esanlam": ["alçı", "kırık", "sirküler alçı", "fraktür"],
      "iata": {"deg": "Yaralanmadan sonra 48 saatten kısa süre geçmişse ve alçı ikiye açılmamışsa (bivalv yapılmamışsa).", "kabul": "48 saatten sonra.", "not": "Femur veya pelvis kırığında anemi kuralına da uyulmalı (Hb 8.5 g/dl).", "sayfa": 59},
      "hesap": {"olay": "Yaralanma zamanı", "saatli": true, "asamalar": [{"kosul": {"saat_lt": 48}, "durum": "deg", "metin": "48 saat dolmadı; alçı bivalv yapıldıysa uçabilir."}, {"kosul": {}, "durum": "kabul"}]},
      "ek": [{"kaynak": "UK CAA", "metin": "Havayollarının çoğu alçıdan sonra 2 saatten kısa uçuşta 24 saat, uzun uçuşta 48 saat kısıtlama uygular; acil durumda alçı bivalv yapılabilir."}]
    },
    {
      "id": "spinal", "kategori": "orto", "ad": "Omurga cerrahisi", "en": "Spinal surgery",
      "esanlam": ["bel ameliyatı", "boyun ameliyatı", "disk hernisi", "mikrodiskektomi", "spinal füzyon"],
      "iata": {"deg": "Cerrahiden sonraki 7 gün içinde.", "kabul": "7 günden sonra.", "not": "Kalkış ve inişte dik oturabilmeli; beklenmedik şiddetli türbülans ve titreşimi tolere edebilmeli. Halo gibi destek korseleri can yeleği giymeyi engelleyebilir.", "sayfa": 59},
      "hesap": {"olay": "Ameliyat tarihi", "asamalar": [{"kosul": {"gun_lte": 7}, "durum": "deg"}, {"kosul": {}, "durum": "kabul"}]}
    },
    {
      "id": "bulasici", "kategori": "diger", "ad": "Bulaşıcı hastalıklar", "en": "Communicable diseases",
      "esanlam": ["suçiçeği", "kızamık", "kabakulak", "boğmaca", "uyuz", "menenjit", "grip", "influenza", "enfeksiyon", "maymun çiçeği", "kızamıkçık"],
      "iata": {"deg": "Hastalığın bulaşıcı döneminde.", "sayfa": 59},
      "thy": "THY: bulaşıcı dönemdeki kızamıkçık, kızamık, kabakulak, menenjit, el-ayak-ağız hastalığı, boğmaca, uyuz, suçiçeği, maymun çiçeği ve tüberkülozu kabul etmez; 'diğer yolculara bulaş riski yoktur' raporu varsa kabul edebilir."
    },
    {
      "id": "yanik", "kategori": "diger", "ad": "Yanık", "en": "Burns",
      "esanlam": ["yanik", "termal yanık"],
      "iata": {"deg": "Hâlâ şokta veya yaygın enfeksiyon varsa.", "kabul": "Tıbben stabil ve diğer yönlerden iyiyse.", "sayfa": 59}
    },
    {
      "id": "plastik", "kategori": "diger", "ad": "Plastik cerrahi", "en": "Plastic surgeries",
      "esanlam": ["estetik", "abdominoplasti", "karın germe", "meme protezi", "liposuction"],
      "iata": {"not": "Abdominoplasti gibi işlemlerde tromboemboli riski ve yeni yerleştirilmiş protez veya ameliyat bölgesine uzun süre vücut ağırlığı baskısı dikkate alınmalı.", "sayfa": 59}
    },
    {
      "id": "terminal", "kategori": "diger", "ad": "Terminal hastalık", "en": "Terminal illness",
      "esanlam": ["palyatif", "son dönem"],
      "iata": {"deg": "Uçuş açısından prognoz kötüyse bireysel değerlendirme.", "sayfa": 59}
    },
    {
      "id": "dekompresyon", "kategori": "diger", "ad": "Dekompresyon hastalığı (vurgun)", "en": "Decompression",
      "esanlam": ["vurgun", "DCS", "dekompresyon", "dalış hastalığı"],
      "iata": {"deg": "Tedavi edilmemiş ve/veya semptomatik.", "kabul": "Son tedaviden 72 saat sonra.", "not": "Sualtı hekimliği uzmanına danışılmalı. Öneri Divers Alert Network (DAN) ile doğrulanmıştır.", "sayfa": 59},
      "hesap": {"olay": "Son tedavi zamanı", "saatli": true, "asamalar": [{"kosul": {"saat_lt": 72}, "durum": "deg"}, {"kosul": {}, "durum": "kabul", "metin": "Kabul; semptom yoksa."}]}
    },
    {
      "id": "dalis", "kategori": "diger", "ad": "Tüplü dalış (sonrasında uçuş)", "en": "Scuba diving",
      "esanlam": ["dalış", "scuba", "tüplü dalış"],
      "kaynak_disi": "IATA tablosunda yok",
      "diger_kaynak": {"kaynak": "Qantas 2022", "metin": "Son dalıştan sonraki 24 saat içinde uygun değil; dekompresyonlu veya çok sayıda dalışta daha uzun süre düşünülmeli."},
      "hesap": {"olay": "Son dalış zamanı", "saatli": true, "kaynak": "Qantas 2022", "asamalar": [{"kosul": {"saat_lt": 24}, "durum": "deg", "metin": "Qantas: son dalıştan sonraki 24 saat içinde uygun değil."}, {"kosul": {}, "durum": "kabul", "metin": "24 saat doldu (Qantas); dekompresyonlu veya çoklu dalışta daha uzun süre düşünülmeli."}]}
    }
  ]
};
