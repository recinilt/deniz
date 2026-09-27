// Bölüm 01 – Giriş, Kısaltmalar, Yetki ve Sorumluluklar (Kılavuz s. 1–4)

window.bolum01_learn = [
  // --- Belge ve uyarılar (s. 1–2) ---
  {
    q: "Bu kılavuz nedir ve kimin için hazırlanmıştır?",
    a: "Yönergenin EK-2'si olan 'Hastane Öncesi Acil Tıbbi Yardım ve Bakım Akış Şemaları – Yetişkin Uygulama Kılavuzu'dur. Hastane öncesi acil sağlık personelinin (AABT ve ATT) yetişkin hastalarda izleyeceği akış şemalarını içerir."
  },
  {
    q: "Kılavuzun 'Uyarılar' bölümü tıbbı nasıl tanımlar?",
    a: "Tıp sürekli olarak değişen bir bilim dalıdır. Hastalıkların veya yaralanmaların tümünün kesin tedavisi henüz açık değildir ve yeni araştırmalarla her gün ilaçlar ve tedaviler değişmektedir."
  },
  {
    q: "Yönergedeki bilgiler hangi tarih itibarıyla günceldir?",
    a: "Yönergenin onaylandığı tarih itibarıyla en güncel, geçerli ve tıbbi standartlara uygun bilgilerdir."
  },
  {
    q: "Yönergeyi hazırlayan kurul, bilgilerin doğruluğu konusunda ne beyan eder?",
    a: "Tıp sürekli değiştiği için kurul, bilgilerin bütünüyle doğru ve eksiksiz olduğunu beyan edemez. Bu bilgilerin kullanılmasından doğan sonuçlardan, ihmal ve hatalardan da sorumlu değildir."
  },
  {
    q: "Yönergenin güncellenmesine rağmen uygulayıcıların ne yapması gerekir?",
    a: "Yönerge düzenli aralıklarla yenilenip güncellense de uygulayıcılar tıp bilimindeki gelişmeleri, uluslararası kabul gören kılavuzları ve mevzuatı kendileri de takip etmelidir."
  },

  // --- Kısaltmalar (s. 3) ---
  {
    q: "KKM ne anlama gelir?",
    a: "Komuta Kontrol Merkezi. Şemalarda 'KKM' işareti 'Komuta Kontrol Merkeziyle temasa geç' anlamındadır; bu adımlar KKM'ye danışılarak / onay alınarak yapılır."
  },
  {
    q: "BVM ve PBV kısaltmaları neyi ifade eder?",
    a: "BVM: Balon Valf Maske. PBV: Pozitif Basınçlı Ventilasyon. Solunumu olmayan veya yetersiz olan hastada PBV başlanır; bu genellikle BVM ile yapılır."
  },
  {
    q: "NEA nedir?",
    a: "Nabızsız Elektriksel Aktivite: monitörde elektriksel aktivite görüldüğü hâlde nabız alınamaması. Asistoli ile birlikte 'şok uygulanmaz' ritimlerdendir."
  },
  {
    q: "KPR ne anlama gelir?",
    a: "Kardiyopulmoner Resüsitasyon."
  },
  {
    q: "VF ve Nabızsız VT kısaltmaları neyi ifade eder?",
    a: "VF: Ventriküler Fibrilasyon. Nabızsız VT: Nabızsız Ventriküler Taşikardi. İkisi de 'şok uygulanabilir' ritimlerdir. (Belgedeki 'Ventiküler' yazımı bir yazım hatasıdır; doğrusu 'Ventriküler'dir.)"
  },
  {
    q: "SF ve RL hangi sıvılardır?",
    a: "SF: Serum Fizyolojik (%0,9 NaCl). RL: Ringer Laktat."
  },
  {
    q: "OED nedir?",
    a: "Otomatik Eksternal Defibrilatör. Örneğin şahit olunmuş arrestte AABT yoksa defibrilasyon OED ile yapılır."
  },
  {
    q: "DAKŞ kısaltması ne anlama gelir?",
    a: "'Damar yolu açık kalacak şekilde' demektir. Sıvı, tedavi amaçlı hızla verilmeden yalnızca damar yolunu açık tutacak hızda verilir."
  },
  {
    q: "KTA ne anlama gelir?",
    a: "Kalp Tepe Atımı."
  },
  {
    q: "Kısaltma listesinde 'Kapiller Geri Dolum Zamanı' hangi kısaltmayla verilmiştir, şemalarda nasıl geçer?",
    a: "Listede KDZ olarak yazılmıştır, ancak şemalarda (ör. İlk Değerlendirme) aynı kavram KGD olarak kullanılır. İkisi de kapiller geri dolum zamanını ifade eder."
  },
  {
    q: "IV, IO ve IM uygulama yolları nelerdir?",
    a: "IV: İntravenöz (damar içine). IO: İntraosseöz (kemik içine). IM: İntramüsküler (kas içine)."
  },
  {
    q: "ET kısaltması ilaç uygulamasında ne anlama gelir?",
    a: "Entübasyon tüpünden uygulama. Damar yolu açılamadığında bazı ilaçlar (ör. adrenalin) entübasyon tüpünden verilir."
  },
  {
    q: "SL uygulama yolu nedir?",
    a: "Sublingual, yani dil altından uygulama (ör. dil altı isordil)."
  },
  {
    q: "µg ve KŞ kısaltmaları neyi ifade eder?",
    a: "µg: mikrogram. KŞ: Kan Şekeri."
  },
  {
    q: "GKS nedir?",
    a: "Glasgow Koma Skalası. Nörolojik değerlendirmede bilinç düzeyini puanlamak için kullanılır."
  },
  {
    q: "ATT ve AABT kimlerdir?",
    a: "ATT: Acil Tıp Teknisyeni. AABT: Ambulans ve Acil Bakım Teknikeri."
  },
  {
    q: "'H ve T'ler' içindeki H'ler nelerdir?",
    a: "Hipovolemi, Hipoksi, Hipertermi, Hipotermi, Hipo-Hiperkalemi (ve diğer elektrolitler), Heart Block (kalp bloğu) ve H+ iyonu (asidoz)."
  },
  {
    q: "'H ve T'ler' içindeki T'ler nelerdir?",
    a: "Tansiyon pnömotoraks, Toksikasyon/Doz aşımı, Travma, Tamponad (kardiyak) ve Tromboembolizm."
  },
  {
    q: "Akış şemalarının sol tarafındaki sütunlar neyi gösterir?",
    a: "AABT ve ATT'lerin müdahale sınırlarını belirler. Sarı sütun AABT'yi, mavi sütun ATT'yi gösterir; bir basamağın hizasında hangi sütun varsa o personel o basamağı uygulayabilir."
  },

  // --- Yetki ve sorumluluklar (s. 4) ---
  {
    q: "Yetki ve sorumlulukların ilk yasal dayanağı hangi yönetmeliktir?",
    a: "11/5/2000 tarihli ve 24046 sayılı Resmî Gazete'de yayımlanan Acil Sağlık Hizmetleri Yönetmeliği (Madde 28)."
  },
  {
    q: "Yetki ve sorumlulukların ikinci yasal dayanağı nedir?",
    a: "15/3/2007 tarihli ve 26463 sayılı Acil Sağlık Hizmetleri Yönetmeliğinde Değişiklik Yapılmasına Dair Yönetmelik (Madde 10)."
  },
  {
    q: "AABT'ler görevlerini hangi çerçevede yapar?",
    a: "Bakanlıkça yapılacak düzenlemelere uygun olarak yapar."
  },
  {
    q: "AABT'nin ilk dört görevi nedir?",
    a: "1) İntravenöz girişim yapmak. 2) Hastaneye ulaşıncaya kadar kabul edilen acil ilaçları ve sıvıları kullanmak. 3) Oksijen uygulaması yapmak. 4) Endotrakeal entübasyon uygulaması yapmak."
  },
  {
    q: "AABT'nin 5–8. görevleri nelerdir?",
    a: "5) Kardiyopulmoner resüsitasyon ve defibrilasyon yapmak. 6) Travma stabilizasyonu yaparak hastayı nakle hazır hale getirmek. 7) Uygun taşıma tekniklerini bilmek ve uygulamak. 8) Monitörizasyon ve defibrilasyon uygulamak."
  },
  {
    q: "AABT'nin 9–11. görevleri nelerdir?",
    a: "9) Kırık, çıkık ve burkulmalarda stabilizasyonu sağlamak. 10) Yara kapatma ve basit kanama kontrolü yapmak. 11) Acil doğum durumunda doğum eylemine yardımcı olmak."
  },
  {
    q: "ATT'ler görevlerini hangi koşulla yapar?",
    a: "Tıbbi danışman koordinasyonu ve onayı ile, Bakanlıkça yapılacak düzenlemelere uygun olarak yapar."
  },
  {
    q: "ATT'nin ilk beş görevi nedir?",
    a: "1) İntravenöz girişim yapmak. 2) Oksijen uygulaması yapmak. 3) Endotrakeal entübasyon uygulaması yapmak. 4) Uygun taşıma tekniklerini bilmek ve uygulamak. 5) Kırık, çıkık ve burkulmalarda stabilizasyonu sağlamak."
  },
  {
    q: "ATT'nin 6–9. görevleri nelerdir?",
    a: "6) Yara kapatma ve basit kanama kontrolü yapmak. 7) Temel yaşam desteği protokollerini uygulamak. 8) TYD sırasında yarı otomatik ve tam otomatik eksternal defibrilatörleri kullanmak. 9) Travma stabilizasyonu yaparak hastayı nakle hazır hale getirmek."
  },
  {
    q: "AABT ve ATT'nin ortak yetkileri nelerdir?",
    a: "İntravenöz girişim, oksijen uygulaması, endotrakeal entübasyon, uygun taşıma teknikleri, kırık-çıkık-burkulma stabilizasyonu, yara kapatma ve basit kanama kontrolü, travma stabilizasyonu ile nakle hazırlama."
  },
  {
    q: "Yalnızca AABT'nin görev listesinde yer alan yetkiler nelerdir?",
    a: "Kabul edilen acil ilaç ve sıvıları kullanmak, KPR ve defibrilasyon yapmak, monitörizasyon uygulamak ve acil doğumda doğum eylemine yardımcı olmak."
  },
  {
    q: "ATT'nin defibrilasyon yetkisi AABT'ninkinden nasıl ayrılır?",
    a: "ATT yalnızca temel yaşam desteği sırasında yarı otomatik ve tam otomatik eksternal defibrilatör kullanabilir. AABT ise monitörizasyon ve defibrilasyon uygular."
  }
];

window.bolum01_sorular = [
  {
    type: "multiple",
    question: "Akış şemalarında 'KKM' işareti görülen bir adımda ne yapılmalıdır?",
    options: [
      "Komuta Kontrol Merkeziyle temasa geçilmelidir",
      "Kardiyak monitörizasyona başlanmalıdır",
      "Kan kaybı miktarı ölçülmelidir",
      "Hasta en yakın merkeze kendi kararıyla nakledilmelidir"
    ],
    correct: 0,
    explanation: "KKM, Komuta Kontrol Merkezi'dir ve kısaltma listesinde 'Komuta Kontrol Merkeziyle temasa geç' olarak tanımlanır. Diğer seçenekler bu kısaltmanın anlamı değildir."
  },
  {
    type: "multiple",
    question: "NEA kısaltmasının açılımı hangisidir?",
    options: [
      "Nabızsız Elektriksel Aktivite",
      "Nörolojik Değerlendirme Algoritması",
      "Nazal Endotrakeal Aspirasyon",
      "Normal Elektriksel Aks"
    ],
    correct: 0,
    explanation: "NEA, Nabızsız Elektriksel Aktivite'dir: monitörde elektriksel aktivite olduğu hâlde nabız alınamaz. Asistoli ile birlikte şok uygulanmayan ritimlerdendir."
  },
  {
    type: "multiple",
    question: "Kılavuzda 'DAKŞ' ifadesiyle verilen sıvı nasıl uygulanır?",
    options: [
      "Damar yolu açık kalacak şekilde, düşük hızda",
      "20 mL/kg bolus olarak",
      "Dil altından damla şeklinde",
      "Kemik içi yoldan hızlı infüzyonla"
    ],
    correct: 0,
    explanation: "DAKŞ 'Damar yolu açık kalacak şekilde' demektir; amaç sıvı yüklemek değil, damar yolunu açık tutmaktır. Bolus uygulama, dil altı veya kemik içi yol bu kısaltmanın anlamı değildir."
  },
  {
    type: "multiple",
    question: "ATT'nin defibrilasyonla ilgili yetkisi hangisidir?",
    options: [
      "TYD sırasında yarı otomatik ve tam otomatik eksternal defibrilatör kullanmak",
      "Manuel defibrilatörle senkronize kardiyoversiyon yapmak",
      "Monitörizasyon ve manuel defibrilasyon uygulamak",
      "Defibrilasyon yetkisi yoktur"
    ],
    correct: 0,
    explanation: "ATT'nin 8. görevi, temel yaşam desteği uygulaması sırasında yarı otomatik ve tam otomatik eksternal defibrilatörleri kullanmaktır. Monitörizasyon ve defibrilasyon uygulamak AABT'nin görev listesindedir."
  },
  {
    type: "multiple",
    question: "Aşağıdaki görevlerden hangisi yalnızca AABT'nin görev listesinde yer alır?",
    options: [
      "Acil doğum durumunda doğum eylemine yardımcı olmak",
      "Endotrakeal entübasyon uygulaması yapmak",
      "İntravenöz girişim yapmak",
      "Yara kapatma ve basit kanama kontrolü yapmak"
    ],
    correct: 0,
    explanation: "Acil doğuma yardım AABT'nin 11. görevidir ve ATT listesinde yoktur. Entübasyon, IV girişim, yara kapatma ve basit kanama kontrolü her iki listede de bulunur."
  },
  {
    type: "multiple",
    question: "Aşağıdakilerden hangisi geri döndürülebilir nedenlerden 'H'ler' grubunda değildir?",
    options: [
      "Tamponad (kardiyak)",
      "Hipoksi",
      "H+ iyonu (asidoz)",
      "Heart Block (kalp bloğu)"
    ],
    correct: 0,
    explanation: "Kardiyak tamponad 'T'ler' grubundadır (Tansiyon pnömotoraks, Toksikasyon, Travma, Tamponad, Tromboembolizm). Hipoksi, asidoz ve kalp bloğu H'ler arasındadır."
  },
  {
    type: "multiple",
    question: "11/5/2000 tarihli Acil Sağlık Hizmetleri Yönetmeliği'nin kılavuzda dayanak gösterilen maddesi hangisidir?",
    options: ["Madde 28", "Madde 10", "Madde 24", "Madde 46"],
    correct: 0,
    explanation: "2000 tarihli ve 24046 sayılı Resmî Gazete'deki yönetmeliğin 28. maddesi dayanak gösterilir. Madde 10 ise 15/3/2007 tarihli değişiklik yönetmeliğine aittir."
  },
  {
    type: "multiple",
    question: "ATT'ler kılavuza göre görevlerini hangi koşulla yapar?",
    options: [
      "Tıbbi danışman koordinasyonu ve onayı ile",
      "Yalnızca hekim olay yerindeyken",
      "AABT'nin yazılı talimatıyla",
      "Herhangi bir onay gerekmeksizin"
    ],
    correct: 0,
    explanation: "ATT'ler tıbbi danışman koordinasyonu ve onayı ile, Bakanlıkça yapılacak düzenlemelere uygun olarak görev yapar. Hekimin olay yerinde olması veya AABT talimatı şartı yoktur."
  },
  {
    type: "truefalse",
    question: "ATT, endotrakeal entübasyon uygulaması yapabilir.",
    correct: true,
    explanation: "Endotrakeal entübasyon ATT'nin 3. görevidir; AABT listesinde de 4. görev olarak yer alır."
  },
  {
    type: "truefalse",
    question: "Yönergeyi hazırlayan kurul, bilgilerin bütünüyle doğru ve eksiksiz olduğunu garanti eder.",
    correct: false,
    explanation: "Tam tersi: tıp sürekli değiştiği için kurul bilgilerin bütünüyle doğru ve eksiksiz olduğunu beyan edemez. Kullanımdan doğan sonuç, ihmal ve hatalardan da sorumlu değildir."
  },
  {
    type: "truefalse",
    question: "AABT, hastaneye ulaşıncaya kadar kabul edilen acil ilaçları ve sıvıları kullanabilir.",
    correct: true,
    explanation: "Bu, AABT'nin 2. görevidir. ATT'nin görev listesinde ilaç ve sıvı kullanma maddesi yoktur."
  },
  {
    type: "fillblank",
    question: "Akış şemalarının sol tarafındaki sütunlar AABT ve ATT'lerin müdahale ____ belirlemektedir.",
    answer: "sınırlarını",
    alternatives: ["sınırları", "sınırı", "sınır"],
    explanation: "Sol taraftaki sütunlar müdahale sınırlarını belirler: sarı sütun AABT'yi, mavi sütun ATT'yi gösterir. Bir basamağın hizasında hangi sütun varsa o personel o basamağı uygulayabilir."
  },
  {
    type: "fillblank",
    question: "Kısaltma listesine göre IO, ____ (kemik içine) uygulama anlamına gelir.",
    answer: "intraosseöz",
    alternatives: ["intraosseös", "intraosseoz", "intraosseos", "intraosseous"],
    explanation: "IO, intraosseöz yani kemik içi uygulamadır. Damar yolu açılamadığında sıvı ve ilaç için kullanılan alternatif yoldur; IV damar içi, IM kas içi uygulamadır."
  },
  {
    type: "matching",
    question: "Kısaltmaları açılımlarıyla eşleştirin:",
    pairs: [
      { left: "PBV", right: "Pozitif Basınçlı Ventilasyon" },
      { left: "BVM", right: "Balon Valf Maske" },
      { left: "OED", right: "Otomatik Eksternal Defibrilatör" },
      { left: "KTA", right: "Kalp Tepe Atımı" }
    ],
    explanation: "PBV solunumu desteklemek için uygulanan ventilasyon yöntemidir ve genellikle BVM (balon valf maske) ile yapılır. OED otomatik defibrilatördür, KTA ise kalp tepe atımıdır."
  },
  {
    type: "matching",
    question: "İlaç uygulama yollarını anlamlarıyla eşleştirin:",
    pairs: [
      { left: "SL", right: "Dil altından" },
      { left: "IM", right: "Kas içine" },
      { left: "IO", right: "Kemik içine" },
      { left: "ET", right: "Entübasyon tüpünden" }
    ],
    explanation: "SL sublingual (dil altı), IM intramüsküler (kas içi), IO intraosseöz (kemik içi), ET ise entübasyon tüpünden uygulamadır. ET ve IO, damar yolu açılamadığında kullanılan alternatiflerdir."
  }
];
