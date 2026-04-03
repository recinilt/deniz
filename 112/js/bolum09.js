// Bölüm 9: Temel EKG (Elektrokardiyografi)
window.bolum09_sorular = [
  {
    question: "Kalbin doğal pacemaker'ı (uyarı çıkaran merkez) neresidir?",
    options: [
      "Atriyoventriküler düğüm",
      "Sinoatriyal düğüm (SAD)",
      "His demeti",
      "Purkinje lifleri"
    ],
    correct: 1,
    explanation: "Sinüs düğümü (sinoatriyal düğüm) kalbin doğal pacemaker'ıdır. Dakikada 60-100 arasında uyarı çıkararak normal kalp hızını belirler."
  },
  {
    question: "Atriyoventriküler düğümün (AVD) uyarı çıkarma kapasitesi dakikada kaçtır?",
    options: [
      "60-100 atım/dk",
      "40-60 atım/dk",
      "30-40 atım/dk",
      "15-30 atım/dk"
    ],
    correct: 1,
    explanation: "AVD'nin uyarı çıkarma kapasitesi 40-60 atım/dk'dır. SAD'den uyarı gelmezse veya AVD baskın uyarı merkezi olursa bu hızda çalışır (nodal ritim)."
  },
  {
    question: "His demeti veya Purkinje liflerinden çıkan uyarının hızı dakikada kaçtır?",
    options: [
      "60-100 atım/dk",
      "40-60 atım/dk",
      "His demetinden 30-40, Purkinje'den 15-30 atım/dk",
      "100-120 atım/dk"
    ],
    correct: 2,
    explanation: "His demetinden başlıyorsa 30-40/dk, Purkinje liflerinden çıkıyorsa 15-30/dk uyarı oluşur."
  },
  {
    question: "P dalgası neyi yansıtır?",
    options: [
      "Ventrikül depolarizasyonu",
      "Atriyumların depolarizasyonu",
      "Ventrikül repolarizasyonu",
      "AV düğüm iletisi"
    ],
    correct: 1,
    explanation: "P dalgası atriyumların depolarizasyonunu yansıtır. Küçük, düzgün yuvarlak, QRS'den önce gelen pozitif bir defleksiyondur. En iyi DII ve V1'de izlenir."
  },
  {
    question: "QRS kompleksi neyi yansıtır?",
    options: [
      "Atriyal depolarizasyon",
      "Ventrikül depolarizasyonu",
      "Ventrikül repolarizasyonu",
      "AV düğüm iletisi"
    ],
    correct: 1,
    explanation: "QRS kompleksi ventrikül depolarizasyonunu yansıtır. QRS süresi normalde 0.12 saniyeden (3 küçük kare) küçük olmalıdır."
  },
  {
    question: "T dalgası neyi gösterir?",
    options: [
      "Atriyal depolarizasyon",
      "Ventrikül depolarizasyonu",
      "Ventriküllerin repolarizasyonu",
      "Atriyal repolarizasyon"
    ],
    correct: 2,
    explanation: "T dalgası ventriküllerin repolarizasyonunu gösterir. aVR ve V1 dışındaki derivasyonlarda normalde pozitiftir. Negatif olması iskemi göstergesi olabilir."
  },
  {
    question: "Normal PR aralığı kaç saniye olmalıdır?",
    options: [
      "0.04-0.08 sn",
      "0.08-0.12 sn",
      "0.12-0.20 sn",
      "0.20-0.40 sn"
    ],
    correct: 2,
    explanation: "Normal PR aralığı 0.12-0.20 sn (3-5 küçük kare) arasıdır. Her siklusta birbirine eşit ve sabit olmalıdır."
  },
  {
    question: "Normal QRS genişliği en fazla kaç saniye olmalıdır?",
    options: [
      "0.04 sn",
      "0.08 sn",
      "0.12 sn",
      "0.20 sn"
    ],
    correct: 2,
    explanation: "QRS genişliği 0.12 saniyeyi (3 küçük kare) geçmemelidir. Bu özellikle taşikardilerin ventriküler/supraventriküler ayrımında önemlidir."
  },
  {
    question: "EKG kâğıdında yatay eksende 1 küçük kare kaç saniyeye karşılık gelir?",
    options: [
      "0.02 sn",
      "0.04 sn",
      "0.10 sn",
      "0.20 sn"
    ],
    correct: 1,
    explanation: "25 mm/sn kalibrasyonda yatay eksende 1 mm boyutundaki küçük kare 0.04 sn'lik zamanı, 5 mm'lik büyük kare ise 0.20 sn'lik zamanı gösterir."
  },
  {
    question: "Düzenli bir ritimde kalp hızı nasıl hesaplanır?",
    options: [
      "R-R arası küçük kare sayısı 1500'e bölünür",
      "R-R arası büyük kare sayısı 300'e bölünür (300/büyük kare sayısı)",
      "P-P arası küçük kare sayılır",
      "QRS sayısı 10 ile çarpılır"
    ],
    correct: 1,
    explanation: "Düzenli ritimlerde: iki R-R dalgası arasındaki büyük kare sayısı bulunur, 300 bu sayıya bölünerek kalp hızı hesaplanır."
  },
  {
    question: "Düzensiz ritimlerde kalp hızı nasıl hesaplanır?",
    options: [
      "300/büyük kare formülü",
      "15 büyük kare (3 sn) içindeki QRS sayısı × 20",
      "30 büyük kare içindeki P sayısı × 5",
      "Hesaplanamaz"
    ],
    correct: 1,
    explanation: "Düzensiz ve yüksek hızlı ritimlerde: 15 büyük kare (3 sn) içindeki R dalgası sayısı 20 ile çarpılır."
  },
  {
    question: "4 elektrotlu kardiyak monitörizasyonda kırmızı uçlu kablo nereye yerleştirilir?",
    options: [
      "Sol omuz bölgesi",
      "Sağ omuz bölgesinde klavikulanın alt kısmı",
      "Sol yan karın duvarı",
      "Sağ yan karın duvarı"
    ],
    correct: 1,
    explanation: "Kırmızı: sağ omuz klavikula altı, Sarı: sol omuz klavikula altı, Yeşil: sol yan karın 6. interkostal, Siyah: sağ yan karın 6. interkostal."
  },
  {
    question: "ST elevasyonu için V2-V3 derivasyonlarında eşik değer kaç mm'dir?",
    options: [
      "0.5 mm",
      "1 mm",
      "2 mm",
      "3 mm"
    ],
    correct: 2,
    explanation: "ST elevasyonu eşik değerleri: V2 ve V3 derivasyonlarında 2 mm, diğer tüm derivasyonlarda 1 mm yükselme olarak kabul edilir."
  },
  {
    question: "EKG değerlendirmesinde P dalgası varlığına karar verilemiyorsa ne yapılmalıdır?",
    options: [
      "P dalgası var kabul edilir",
      "P dalgası olmadığı düşünülmeli",
      "Hasta entübe edilmeli",
      "Tekrar EKG çekilmeli"
    ],
    correct: 1,
    explanation: "P dalgası var olup olmadığı konusunda emin olunamıyorsa P dalgasının olmadığı düşünülmelidir."
  },
  {
    question: "PR aralığı 0.20 saniyeden uzunsa ne düşünülmelidir?",
    options: [
      "Normal bulgudur",
      "1. derece AV blok",
      "Ventriküler taşikardi",
      "Atriyal fibrilasyon"
    ],
    correct: 1,
    explanation: "P-R mesafesi bir büyük kare (0.20 sn)'den uzunsa 1. derece AV blok düşünülmelidir."
  },
  {
    question: "Kalp hızı 60/dk'nın altında olan durum ne olarak tanımlanır?",
    options: [
      "Taşikardi",
      "Bradikardi",
      "Normal ritim",
      "Fibrilasyon"
    ],
    correct: 1,
    explanation: "Kalp hızı 60/dk altında ise bradikardi, 100/dk üstünde ise taşikardi olarak tanımlanır. Normal kalp hızı 60-100 atım/dk'dır."
  },
  {
    question: "EKG'de aVR derivasyonunda neden her zaman negatif defleksiyon izlenir?",
    options: [
      "Cihaz hatası nedeniyle",
      "Kalpteki uyarı ve iletimin yönü aVR elektrodundan uzaklaştığı için",
      "Elektrot yanlış yerleştirildiği için",
      "Sadece erkeklerde görülür"
    ],
    correct: 1,
    explanation: "Kalpteki elektrik akımı ilgili pozitif elektrottan uzaklaşıyorsa negatif defleksiyon oluşur. Kalbin uyarı/ileti yönü aVR'den uzaklaştığı için bu derivasyonda her zaman negatif defleksiyon izlenir."
  },
  {
    question: "Göğüs derivasyonu V4 nereye yerleştirilir?",
    options: [
      "Sternumun sağında 4. interkostal aralık",
      "Sternumun solunda 4. interkostal aralık",
      "5. interkostal aralığın midklaviküler hattı kestiği yer",
      "Orta aksiler çizgide 5. interkostal"
    ],
    correct: 2,
    explanation: "V4: 5. interkostal aralığın midklaviküler hattı kestiği yer. V1: sternum sağı 4. interkostal, V2: sternum solu 4. interkostal."
  },
  {
    question: "QRS genişliği hakkında belirsizlik olan durumlarda ne yapılmalıdır?",
    options: [
      "QRS dar kabul edilir",
      "QRS geniş kabul edilir (daha güvenli)",
      "EKG tekrar çekilir",
      "Önemsenmez"
    ],
    correct: 1,
    explanation: "QRS genişliği ile ilgili belirsizlik olan durumlarda QRS'i geniş olarak kabul etmek daha güvenli bir yoldur."
  },
  {
    question: "İzoelektrik hat nedir?",
    options: [
      "P dalgasının tepe noktası",
      "İki kalp siklusu arasında elektriksel aktivitenin olmadığı yatay düz çizgi",
      "QRS'in en yüksek noktası",
      "T dalgasının tepe noktası"
    ],
    correct: 1,
    explanation: "İki kalp siklusu arasında elektriksel aktivitenin olmadığı zamanı gösteren yatay düz çizgiye izoelektrik hat (bazal çizgi) denir."
  }
];
