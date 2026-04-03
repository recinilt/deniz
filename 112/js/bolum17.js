// Bölüm 17: Triaj
window.bolum17_sorular = [
  {
    question: "Triaj kelimesinin anlamı nedir?",
    options: ["Tedavi etmek", "Ayırt etmek, seçmek, sınıflandırmak", "Nakletmek", "İlk yardım"],
    correct: 1,
    explanation: "Fransızca 'Trier' kökünden gelen triaj, ayırt etmek (seçmek, sınıflandırmak) anlamına gelir."
  },
  {
    question: "Triajın temel amacı nedir?",
    options: [
      "Her hastaya eşit süre ayırmak",
      "En kısa zamanda, kısıtlı olanaklarla, en fazla sayıda yaşamı kurtarmak",
      "Ölü sayısını saymak",
      "Sadece ağır hastaları tedavi etmek"
    ],
    correct: 1,
    explanation: "Triajda amaç en kısa zamanda, eldeki kısıtlı olanaklarla, en fazla sayıda yaşamı kurtarmaktır."
  },
  {
    question: "Triaj renk kodlamasında KIRMIZI kod neyi ifade eder?",
    options: [
      "Hafif yaralı",
      "Ölü",
      "Ciddi hastalık/yaralanma, öncelikli acil tedavi veya hızlı transport gerekir",
      "Geciktirilebilir acil"
    ],
    correct: 2,
    explanation: "Kırmızı: acil (unstabil). Sarı: geciktirilebilir acil. Yeşil: hafif yaralı/acil değil. Siyah: ölü veya hayatta kalma şansı düşük."
  },
  {
    question: "Triaj kodlamasında SARI kod neyi ifade eder?",
    options: [
      "Ölü",
      "Acil müdahale gerekli",
      "Henüz yaşamı tehdit etmeyen ama zamanında tedavi edilmezse potansiyel yaşam tehdidi olan",
      "Hafif yaralı"
    ],
    correct: 2,
    explanation: "Sarı kod: henüz yaşamı tehdit eden durumu yok ama zamanında müdahale edilmezse potansiyel yaşam tehdidi var. Kırmızıya göre biraz bekletilebilir."
  },
  {
    question: "START triaj yönteminde bir hastanın değerlendirilmesi en fazla ne kadar sürmeli?",
    options: ["30 saniye", "1 dakika", "2 dakika", "5 dakika"],
    correct: 1,
    explanation: "START yönteminde bir hastanın değerlendirilmesi ve triaj kodunun verilmesi için kullanılan süre 1 dakikayı aşmamalıdır."
  },
  {
    question: "START triaj yönteminin ilk basamağında ne yapılır?",
    options: [
      "Nabız kontrol edilir",
      "Yürüyebilenlerin triaj sorumlusuna gelmesi istenir → yeşil kod",
      "Solunum kontrol edilir",
      "Bilinç kontrol edilir"
    ],
    correct: 1,
    explanation: "İlk basamak: 'Yürüyebilen hastalar bana gelsin!' çağrısı yapılır. Yürüyebilenler YEŞİL kod alır. Geri kalanlar ikinci basamakta değerlendirilir."
  },
  {
    question: "START triaj yönteminin ikinci basamağında değerlendirme sırası nasıldır?",
    options: [
      "Bilinç → Solunum → Dolaşım",
      "Dolaşım → Solunum → Bilinç",
      "Solunum → Dolaşım → Bilinç",
      "Bilinç → Dolaşım → Solunum"
    ],
    correct: 2,
    explanation: "İkinci basamak sırası: Solunum → Dolaşım → Bilinç. TYD'den farklı olarak bilinç en sona bırakılır."
  },
  {
    question: "START triajda solunum sayısı 10'un altında veya 30'un üstünde ise hangi kod verilir?",
    options: ["Yeşil", "Sarı", "Kırmızı", "Siyah"],
    correct: 2,
    explanation: "Solunum sayısı 10 altında veya 30 üstünde ise KIRMIZI kod verilir."
  },
  {
    question: "START triajda spontan solunum yok ve havayolu açma manevrası sonrası da gelmiyorsa hangi kod verilir?",
    options: ["Kırmızı", "Sarı", "Yeşil", "Siyah"],
    correct: 3,
    explanation: "Havayolu açma manevrası sonrası solunum hâlâ yoksa SİYAH kod (ölü/hayatta kalma şansı düşük) verilir. Solunum döndüyse KIRMIZI."
  },
  {
    question: "START triajda dolaşım değerlendirmesinde kapiller geri dolum zamanı kaç saniye üstünde ise kırmızı kod verilir?",
    options: ["1 saniye", "2 saniye", "3 saniye", "5 saniye"],
    correct: 1,
    explanation: "Kapiller geri dolum zamanı 2 saniyenin üzerinde ise veya radial arter nabız hızı 120/dk üzerinde ise KIRMIZI kod verilir."
  },
  {
    question: "START triajda basit komutlara yanıt verebilen hasta hangi kodu alır?",
    options: ["Kırmızı", "Sarı", "Yeşil", "Siyah"],
    correct: 1,
    explanation: "Solunum ve dolaşımı yeterli, basit komutlara uyabilen hasta SARI kod alır. Yanıt veremiyorsa KIRMIZI."
  },
  {
    question: "Jump START triajın START'tan en önemli farkı nedir?",
    options: [
      "Renk kodları farklıdır",
      "Solunumu olmayan çocukta siyah kod vermeden önce dolaşım değerlendirilir ve nabız varsa 5 kurtarıcı soluk verilir",
      "Sadece bilinç değerlendirilir",
      "Triaj süresi 5 dakikadır"
    ],
    correct: 1,
    explanation: "En önemli fark: solunumu olmayan çocukta siyah kod vermeden önce nabız kontrol edilir. Nabız varsa 5 kurtarıcı soluk verilir; solunum dönerse kırmızı, dönmezse siyah."
  },
  {
    question: "Triaj kartında triaj sorumlusu sadece hangi kısmı işaretler?",
    options: [
      "Tüm kartı doldurur",
      "Sadece triaj kodu kısmını",
      "Sadece hasta bilgilerini",
      "Sadece ilaç bilgilerini"
    ],
    correct: 1,
    explanation: "Triaj sorumlusu sadece triaj kodunu işaretler, kartı doldurmakla vakit kaybetmez. Diğer kısımlar tedavi/nakil hizmeti veren personel tarafından doldurulur."
  },
  {
    question: "Yenilenen triajda verilmiş kod hakkında hangi kural geçerlidir?",
    options: [
      "Kod tamamen değiştirilebilir",
      "Daha iyi bir kodla değiştirilemez, ancak daha acil/öncelikli bir kodla değiştirilebilir",
      "Hiçbir şekilde değiştirilemez",
      "Sadece doktor değiştirebilir"
    ],
    correct: 1,
    explanation: "Önceden verilmiş kod daha iyi bir kodla değiştirilemez, ancak daha acil ve öncelikli bir kodla değiştirilebilir."
  },
  {
    question: "Triaj sorumlusunun yapmaması gereken nedir?",
    options: [
      "Triaj kodlamak",
      "Hastaların acil bakımıyla bizzat ilgilenmek",
      "112 KKM ile iletişim kurmak",
      "Ek kaynak talep etmek"
    ],
    correct: 1,
    explanation: "Triaj sorumlusu hastaların acil bakımıyla ilgilenmez. Görevi triaj yapmak, organize etmek ve koordine etmektir."
  },
  {
    question: "Jump START triajda çocuklarda dolaşım değerlendirmesinde ne kullanılır?",
    options: [
      "Kapiller geri dolum zamanı",
      "Periferik arter nabzı (çocukta karotis, bebekte brakiyal)",
      "Kan basıncı ölçümü",
      "EKG"
    ],
    correct: 1,
    explanation: "Erişkinde dolaşım kapiller geri dolum zamanıyla, çocuk/bebekte ise periferik arter nabzı ile değerlendirilir."
  },
  {
    question: "Triaj uygulamasına nereden başlanır?",
    options: [
      "En ağır yaralıdan",
      "En hafif yaralıdan",
      "Triaj sorumlusuna en yakın yaralıdan",
      "En yaşlı hastadan"
    ],
    correct: 2,
    explanation: "Triaj başlama noktası triaj sorumlusunun olay yerine girdiği yerdir. Kendisine en yakın yaralı ile başlanır. Bu zamanın etkin kullanılması açısından önemlidir."
  },
  {
    question: "Afet durumlarında siyah kodlu kişilere ne yapılır?",
    options: [
      "Öncelikli tedavi edilir",
      "Sağlık hizmeti verilmez veya en son sırada bakıma alınır; kaynaklar kurtarılabilir hastalar için kullanılır",
      "Hemen hastaneye nakledilir",
      "KPR uygulanır"
    ],
    correct: 1,
    explanation: "Siyah kodlu kişilere sağlık hizmeti verilmez veya en son sırada bakıma alınır. Mevcut kaynaklar kurtarılabilir hastalar için kullanılmalıdır."
  }
];
