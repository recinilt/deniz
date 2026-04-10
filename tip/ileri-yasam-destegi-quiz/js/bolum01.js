// ============================================================
// BÖLÜM 1: ACİL OLGU YÖNETİMİ
// Learn (Q&A) + Quiz Verileri
// ============================================================

window.bolum01_learn = [
  // --- Tanım ve Genel Kavram ---
  {
    q: "Acil olgu yönetimi nedir?",
    a: "Acil sağlık hizmeti gereksinimi duyan hastanın hayati fonksiyonlarının sürdürülmesi, durumunun kötüye gitmesinin önlenmesi, tedavisinin başlatılması ve uygun sağlık kuruluşuna taşınması amacıyla, bir ekip liderinin yönetiminde, ekip çalışması anlayışıyla yürütülen hizmetlerin bütünüdür."
  },
  {
    q: "Acil olgu yönetimi süreci ne zaman başlar ve ne zaman biter?",
    a: "Olay yeri yönetimi ve gerekli ise triaj işlemlerinden sonra, acil tıbbi bakım gerektiren kişiyle karşılaşıldığı anda başlar. Süreç, hastanın sağlık kuruluşuna devri ile tamamlanır."
  },
  {
    q: "Acil olgu yönetimi hangi 8 aşamadan oluşur?",
    a: "1) İletişim ve onam alma, 2) Ekip ve malzeme yerleşimi, 3) Birincil değerlendirme, 4) İkincil değerlendirme, 5) Tanı, 6) Tedavi, 7) Yeniden değerlendirme, 8) Nakil ve teslim."
  },

  // --- Ön Hazırlık ---
  {
    q: "Acil olgu yönetiminde ön hazırlık neden yapılır?",
    a: "Acil olgunun gerektirdiği sağlık hizmetinin uygun araç, gereç, malzeme ve ilaçlarla etkin ve kaliteli olarak kısa zamanda karşılanabilmesi için yapılır. 112 KKM'den alınan bilgiler doğrultusunda hazırlık gerçekleştirilir."
  },
  {
    q: "Ön hazırlık kaç aşamadan oluşur ve bunlar nelerdir?",
    a: "İki aşamadan oluşur: 1) Olağan hazırlık (olgu özeline bakılmadan yapılan rutin hazırlıklar), 2) Olgu özeline ilişkin hazırlık (bildirilen olgunun özelliğine göre yapılan spesifik hazırlıklar)."
  },
  {
    q: "Olağan hazırlıkta ekibin her olguda yanında bulundurması gereken temel ekipmanlar nelerdir?",
    a: "Tıbbi malzeme çantası, oksijen ekipmanı, defibrilatör, monitör ve aspiratör. Bunlar kullanılabilir durumda her zaman yanında olmalıdır."
  },
  {
    q: "Olgu özeline ilişkin hazırlığa bir örnek verebilir misin?",
    a: "Hipotermi ön tanılı bir hasta için ambulans kabininin ısıtılması, sıvıların ısıtılması, termal battaniyelerin hazırlanması ve ilgili algoritmanın gözden geçirilmesi gibi hazırlıklar yapılır."
  },
  {
    q: "Acil sağlık ekibi nasıl bir zihniyetle hazırlıklı olmalıdır?",
    a: "Ekip, olgu ile ilgili olası en kötü durumu yönetecek şekilde hazırlıklı olmalıdır."
  },

  // --- Olay Yeri ve Güvenlik ---
  {
    q: "Olay yerine ulaşıldığında ilk yapılması gereken şey nedir?",
    a: "Öncelikle olay yeri güvenliği sağlanır. Olay yeri güvenli değilse olay yerine girilmemelidir."
  },
  {
    q: "Olay yerinde triaj gereksinimi varsa ne yapılır?",
    a: "Triaj işlemi gerçekleştirilir, daha sonra acil olgu yönetimine geçilir."
  },

  // --- 1. İletişim ve Onam Alma ---
  {
    q: "Ekip olay yerine hangi ekipmanlarla gelir?",
    a: "Tıbbi malzeme çantası, defibrilatör, monitör, oksijen ekipmanı ve olgunun özelliğine göre gerekli diğer malzemelerle gelir."
  },
  {
    q: "İlk iletişimi kim kurar ve neden?",
    a: "İlk iletişimi ekip lideri kurar. Etkili iletişim ile karşılıklı güven oluşumu sağlanır ve hastanın onamı alınır."
  },
  {
    q: "Kardiyak arrest gibi acil durumlarda onam nasıl alınmış sayılır?",
    a: "Hasta yakınlarının sağlık ekibini karşılamaları ve hastaya müdahale için yönlendirmeleri geçici olarak tıbbi onamın alındığı anlamına gelir. Fırsat bulunduğunda resmi onam alınmalıdır."
  },
  {
    q: "Ekip lideri bilinci kapalı bir hastaya nasıl yaklaşır?",
    a: "Mekansal kısıtlılık yoksa hastanın sağ yanından yaklaşır. Sözlü uyarı (Nasılsınız?) ve fiziksel uyarı (omuzlardan nazikçe vurmak) ile birincil değerlendirmeye başlar."
  },

  // --- 2. Ekip ve Malzeme Yerleşimi ---
  {
    q: "Arrest yönetiminde 1. sağlık personelinin görevi ve konumu nedir?",
    a: "Göğüs kompresyonlarını başlatır. Hastanın sol dirsek ve sol omuzu arasında yerleşir."
  },
  {
    q: "Arrest yönetiminde 2. personelin görevi ve konumu nedir?",
    a: "Monitörizasyon ve defibrilasyondan sorumludur. Hastanın sağ dirsek ve sağ omuz arasında yerleşir."
  },
  {
    q: "Arrest yönetiminde ekip liderinin (3. personel) görevi ve konumu nedir?",
    a: "Havayolu devamlılığını sağlamak ve vakanın yönetiminden sorumludur. Hastanın baş tarafına yerleşir."
  },
  {
    q: "Malzeme yerleşiminde oksijen kaynağı ve acil çantası nereye konulur?",
    a: "Hastanın sol omuz üstü ve dışı hizasına yerleştirilir."
  },
  {
    q: "Defibrilatör ve aspiratör nereye yerleştirilir?",
    a: "Hastanın sağ omuz üstü ve dışı hizasına yerleştirilir. Ekip liderinin kol mesafesinde olması uygundur."
  },
  {
    q: "Malzeme yerleşiminde temel ilke nedir?",
    a: "Tüm cihaz ve malzemeler ekibin gözleyebileceği, ulaşabileceği ve rahat çalışabileceği mesafede yerleştirilmelidir."
  },

  // --- 3. Birincil Değerlendirme: ABCDE ---
  {
    q: "Birincil değerlendirmede hangi yaklaşım kullanılır?",
    a: "ABCDE yaklaşımı: A (Airway - Havayolu), B (Breathing - Solunum), C (Circulation - Dolaşım), D (Disability - Bilinç), E (Exposure - Vücudun kontrolü)."
  },
  {
    q: "ABCDE'de A (Airway) neyi ifade eder?",
    a: "Havayolu kontrolünü ifade eder. Havayolunun açık olup olmadığı değerlendirilir."
  },
  {
    q: "ABCDE'de B (Breathing) neyi ifade eder?",
    a: "Solunumun kontrolünü ifade eder. Solunum varlığı, hızı ve kalitesi değerlendirilir."
  },
  {
    q: "ABCDE'de C (Circulation) neyi ifade eder?",
    a: "Dolaşımın kontrolünü ifade eder. Nabız, kan basıncı, cilt rengi ve perfüzyon değerlendirilir."
  },
  {
    q: "ABCDE'de D (Disability) neyi ifade eder?",
    a: "Bilinç durumunun kontrolünü ifade eder."
  },
  {
    q: "ABCDE'de E (Exposure) neyi ifade eder?",
    a: "Vücudun kontrolünü ifade eder. Hastanın soyularak tam vücut değerlendirmesi yapılır."
  },
  {
    q: "Yanıtsız, solunumu ve dolaşımı olmayan hastada ne yapılır?",
    a: "Hızla göğüs kompresyonuna başlanarak arrest yönetimine geçilir."
  },
  {
    q: "Arrest olmayan hastada birincil değerlendirmede önemli kural nedir?",
    a: "Hayatı tehdit eden sorunlar çözülmedikçe ve ABC aşamalarıyla ilgili yaşamsal girişimler başlanmadan ikincil değerlendirmeye geçilmemelidir."
  },
  {
    q: "Soğuk, soluk, nemli cildi olan bir hastada öncelik nedir?",
    a: "Dolaşımla ilgili bir soruna işaret ettiğinden, erken damar yolu açılması, tansiyon monitörizasyonu ve oksijen desteğine başlanması önceliklidir."
  },

  // --- 4. İkincil Değerlendirme ---
  {
    q: "İkincil değerlendirme hangi bileşenlerden oluşur?",
    a: "Üç bileşenden oluşur: a) Tam vücut muayenesi (fizik muayene), b) Vital parametrelerin izlemi, c) Tıbbi öykü (SAMPLE)."
  },
  {
    q: "İkincil değerlendirme nasıl yapılır?",
    a: "Ekip liderinin yönlendirmesiyle ekip üyelerinin katılımıyla eş zamanlı yapılır. Ekip lideri fizik muayene yaparken, diğer üyeler vital bulguları alır, damar yolu açar ve tıbbi öykü alır."
  },
  {
    q: "Fizik muayenede hangi yaklaşım izlenir?",
    a: "'Baştan aşağı' veya 'tepeden tırnağa' yaklaşımı izlenir. Ancak kritik sorunlara yönelik hızlı fizik muayene zaman yönetimi açısından tercih edilebilir."
  },
  {
    q: "Nörolojik defisit fark edilen hastalarda ne yapılmalıdır?",
    a: "Öncelikle nörolojik muayene yapılmalıdır. Hastane öncesi için Cincinnati İnme Skalası gibi pratik yöntemler kullanılabilir."
  },

  // --- SAMPLE ---
  {
    q: "SAMPLE kısaltması ne anlama gelir?",
    a: "Sistematik tıbbi öykü alma yöntemidir: S (Signs/Symptoms - Belirtiler ve Bulgular), A (Allergies/Abuses - Alerjiler/Kötü Alışkanlıklar), M (Medications - Kullanılan İlaçlar), P (Past Medical History - Tıbbi Özgeçmiş), L (Last Oral Take/Last Menstrual Period - Son İlaç-Gıda Alımı/Son Adet Tarihi), E (Events Preceding Call - Çağrı Gerektiren Durum)."
  },
  {
    q: "SAMPLE'da S neyi ifade eder?",
    a: "Signs and Symptoms: Belirtiler ve bulgular. Hastanın mevcut şikayetleri ve klinik bulguları sorgulanır."
  },
  {
    q: "SAMPLE'da A neyi ifade eder?",
    a: "Allergies / Abuses: Alerjiler ve kötü alışkanlıklar sorgulanır."
  },
  {
    q: "SAMPLE'da M neyi ifade eder?",
    a: "Medications: Hastanın kullandığı ilaçlar sorgulanır."
  },
  {
    q: "SAMPLE'da P neyi ifade eder?",
    a: "Past (Relevant) Medical History: Hastanın tıbbi özgeçmişi sorgulanır."
  },
  {
    q: "SAMPLE'da L neyi ifade eder?",
    a: "Last Oral Take / Last Menstrual Period: Son ilaç veya gıda alım zamanı ve kadın hastalarda son adet tarihi sorgulanır."
  },
  {
    q: "SAMPLE'da E neyi ifade eder?",
    a: "Events Preceding Call: Çağrı gerektiren durumun ne olduğu, ne zaman ve nasıl başladığı sorgulanır."
  },

  // --- Vital Parametreler ---
  {
    q: "Normal solunum hızı kaçtır?",
    a: "Dakikada 10-20 soluk/dk."
  },
  {
    q: "Normal kalp hızı (nabız) aralığı kaçtır?",
    a: "Dakikada 60-100 atım/dk."
  },
  {
    q: "Normal kan basıncı değeri kaçtır?",
    a: "120/80 mmHg."
  },
  {
    q: "Kapiller geri dolum zamanı normali kaçtır?",
    a: "2 saniyenin altında olmalıdır."
  },
  {
    q: "Normal oksijen satürasyonu (SpO2) aralığı kaçtır?",
    a: "%94-98 arasındadır."
  },
  {
    q: "Normal kan şekeri değeri kaçtır?",
    a: "60-100 mg/dl arasındadır."
  },
  {
    q: "Normal vücut sıcaklığı aralığı nedir?",
    a: "36,5°C - 37,2°C arasındadır."
  },
  {
    q: "Normal ETCO2 (end-tidal karbondioksit) değeri kaçtır?",
    a: "35-45 mmHg arasındadır."
  },
  {
    q: "Normal EKG ritmi nedir?",
    a: "Sinüs ritmidir."
  },

  // --- 5. Ön Tanı ---
  {
    q: "Ön tanı hangi verilere dayanarak oluşturulur?",
    a: "Birincil değerlendirme, ikincil değerlendirmede yapılan fizik muayene, tıbbi öykü ve vital bulgulara dayanır."
  },
  {
    q: "Ön tanı oluşturduktan sonra ne yapılmalıdır?",
    a: "Ön tanı 112 KKM tıbbi danışman hekimi ile paylaşılarak tedavi aşamasına geçilmelidir. Tanıyı destekleyen bulgularla birlikte aktarılmalıdır."
  },

  // --- 6. Tedavi ---
  {
    q: "Tedavide hangi rehberler kullanılır?",
    a: "Sağlık Bakanlığı tarafından hazırlanmış ilgili tedavi akış şemaları kullanılır."
  },
  {
    q: "Hangi tedaviler doğrudan uygulanabilir, hangilerine onay gerekir?",
    a: "Akış şemalarında tıbbi danışman iznine bağlı olmayan uygulamalar doğrudan uygulanabilir. Onaya bağlı olan tedaviler için danışman hekim onayı alınmadan başlatılmaz."
  },

  // --- 7. Yeniden Değerlendirme ---
  {
    q: "Yeniden değerlendirmede neler yapılır?",
    a: "Tedavinin sonuçları değerlendirilir, ertelenen veya eksik bırakılan işlemler tamamlanır ve stabilizasyon sağlanır."
  },
  {
    q: "Yeniden değerlendirmede dikkat edilmesi gereken denge nedir?",
    a: "'Uygun koşullarda nakil' ile 'hızlı nakil' arasındaki denge, hasta yarar ve zararı gözetilerek kurulmalıdır."
  },
  {
    q: "Göğüs ağrılı bir hastada yeniden değerlendirmede ne yapılmalıdır?",
    a: "Ertelenmişse 12 derivasyonlu EKG değerlendirmesi bu aşamada yapılmalıdır."
  },

  // --- 8. Nakil ve Teslim ---
  {
    q: "Nakil merkezinin seçiminde yetki kimdedir?",
    a: "112 Komuta Kontrol Merkezi'ne (KKM) aittir. Acil sağlık ekibi talebini gerekçeleriyle iletebilir ama KKM'nin kararına uymak zorundadır."
  },
  {
    q: "Nakil merkezi seçiminde hangi faktörler belirleyicidir?",
    a: "Olgunun tanısına uygun tedavi merkezinin seçimi belirleyicidir. Ayrıca merkezin uzaklığı ve yoğunluğu da önemlidir."
  },
  {
    q: "Resüsitasyon sonrası spontan dolaşımı geri dönen hastanın nakli için neden omurga tahtası tercih edilir?",
    a: "Yeniden resüsitasyon gerekebileceğinden omurga tahtası tercih edilir; bu sayede düz bir zemin üzerinde KPR yapılabilir."
  },

  // --- ATMIST ---
  {
    q: "ATMIST kısaltması ne anlama gelir?",
    a: "Hastanın hastaneye sistematik teslimi için kullanılan bir protokoldür: A (Age - Yaş ve Ad), T (Time of onset - Başlangıç Zamanı), M (Medical complaint/history - Tıbbi şikayet/öykü), I (Investigations - Muayene bulguları), S (Signs vital - Vital bulgular), T (Treatment - Uygulanan Tedavi)."
  },
  {
    q: "ATMIST'te A neyi ifade eder?",
    a: "Age (Name for handover): Hastanın yaşı ve adı."
  },
  {
    q: "ATMIST'te ilk T neyi ifade eder?",
    a: "Time of onset: İlk tıbbi temas ve yakınmaların başlangıç zamanı."
  },
  {
    q: "ATMIST'te M neyi ifade eder?",
    a: "Medical complaint/history: Tıbbi şikayet ve öykü."
  },
  {
    q: "ATMIST'te I neyi ifade eder?",
    a: "Investigations: Muayene bulguları."
  },
  {
    q: "ATMIST'te S neyi ifade eder?",
    a: "Signs vital: Vital bulgular, ilk ölçümler ve önemli değişiklikler."
  },
  {
    q: "ATMIST'te son T neyi ifade eder?",
    a: "Treatment: Uygulanan tedavi."
  },
  {
    q: "Hastanın tesliminde neden sistematik bir yaklaşım önemlidir?",
    a: "Hem hastane ekibini yönlendirerek tedavinin hızla yapılabilmesini sağlar, hem de yaşanabilecek yasal sorunları ortadan kaldırır."
  }
];

// ============================================================
// QUIZ SORULARI
// ============================================================

window.bolum01_sorular = [
  // --- Çoktan Seçmeli (%55) ---
  {
    type: "multiple",
    question: "Acil olgu yönetiminin ilk aşaması hangisidir?",
    options: ["Birincil değerlendirme", "İletişim ve onam alma", "Ekip ve malzeme yerleşimi", "Triaj"],
    correct: 1,
    explanation: "Acil olgu yönetiminin ilk aşaması iletişim ve onam almadır. Ekip lideri kendisini tanıtarak hasta veya yakınından onam alır."
  },
  {
    type: "multiple",
    question: "ABCDE yaklaşımında 'D' harfi neyi temsil eder?",
    options: ["Defibrilation (Defibrilasyon)", "Disability (Bilinç kontrolü)", "Drugs (İlaçlar)", "Diagnostics (Tanı)"],
    correct: 1,
    explanation: "D = Disability yani bilinç durumunun kontrolüdür. Hastanın bilinç düzeyi değerlendirilir."
  },
  {
    type: "multiple",
    question: "SAMPLE kısaltmasında 'L' harfi ne anlama gelir?",
    options: ["Laboratory (Laboratuvar)", "Last Oral Take / Last Menstrual Period", "Level of consciousness (Bilinç düzeyi)", "Laceration (Laserasyon)"],
    correct: 1,
    explanation: "L = Last Oral Take / Last Menstrual Period, yani son ilaç-gıda alım zamanı ve kadın hastalarda son adet tarihi."
  },
  {
    type: "multiple",
    question: "Normal oksijen satürasyonu (SpO2) aralığı nedir?",
    options: ["%90-94", "%94-98", "%85-90", "%98-100"],
    correct: 1,
    explanation: "Normal SpO2 değeri %94-98 arasındadır."
  },
  {
    type: "multiple",
    question: "Arrest yönetiminde göğüs kompresyonlarını yapan 1. personel nereye yerleşir?",
    options: ["Hastanın baş tarafı", "Hastanın sağ dirsek-omuz arası", "Hastanın sol dirsek-omuz arası", "Hastanın ayak tarafı"],
    correct: 2,
    explanation: "1. sağlık personeli göğüs kompresyonlarından sorumludur ve hastanın sol dirsek ile sol omuzu arasında yerleşir."
  },
  {
    type: "multiple",
    question: "Nakil merkezi seçiminde nihai yetki kimdedir?",
    options: ["Ekip lideri", "Tıbbi danışman hekim", "112 Komuta Kontrol Merkezi (KKM)", "Hastane acil servis şefi"],
    correct: 2,
    explanation: "Nakil merkezinin seçiminde yetki 112 KKM'ne aittir. Ekip talebini iletebilir ama KKM kararına uymak zorundadır."
  },
  {
    type: "multiple",
    question: "Olağan hazırlıkta ekibin her zaman yanında bulundurması gereken ekipmanlardan hangisi değildir?",
    options: ["Defibrilatör", "Oksijen ekipmanı", "Termal battaniye", "Aspiratör"],
    correct: 2,
    explanation: "Termal battaniye olgu özeline ilişkin bir hazırlık malzemesidir (örn. hipotermi). Olağan hazırlıkta bulundurulması gerekenler: tıbbi malzeme çantası, oksijen ekipmanı, defibrilatör, monitör ve aspiratör."
  },
  {
    type: "multiple",
    question: "Normal kapiller geri dolum zamanı ne kadardır?",
    options: ["3 saniyenin altı", "2 saniyenin altı", "5 saniyenin altı", "1 saniyenin altı"],
    correct: 1,
    explanation: "Normal kapiller geri dolum zamanı 2 saniyenin altında olmalıdır."
  },
  {
    type: "multiple",
    question: "ATMIST protokolünde 'I' harfi neyi ifade eder?",
    options: ["Intubation (Entübasyon)", "Investigations (Muayene bulguları)", "Infusion (İnfüzyon)", "Injury (Yaralanma)"],
    correct: 1,
    explanation: "I = Investigations, yani kısa muayene bulguları. Hastanın fizik muayene sonuçları aktarılır."
  },
  {
    type: "multiple",
    question: "İkincil değerlendirme hangi bileşenlerden oluşur?",
    options: [
      "Fizik muayene, EKG çekimi, ilaç uygulaması",
      "Fizik muayene, vital parametreler, tıbbi öykü (SAMPLE)",
      "ABCDE değerlendirmesi, triaj, tedavi",
      "Havayolu kontrolü, solunum desteği, dolaşım desteği"
    ],
    correct: 1,
    explanation: "İkincil değerlendirme üç bileşenden oluşur: a) Fizik muayene (tam vücut muayenesi), b) Vital parametrelerin izlemi, c) Tıbbi öykü (SAMPLE)."
  },
  {
    type: "multiple",
    question: "Normal ETCO2 değeri aralığı nedir?",
    options: ["25-35 mmHg", "35-45 mmHg", "45-55 mmHg", "20-30 mmHg"],
    correct: 1,
    explanation: "Normal ETCO2 (end-tidal karbondioksit) değeri 35-45 mmHg arasındadır."
  },

  // --- Doğru/Yanlış (%15) ---
  {
    type: "truefalse",
    question: "Olay yeri güvenli değilse bile acil sağlık ekibi derhal olay yerine girmelidir.",
    correct: false,
    explanation: "Yanlış. Olay yeri güvenli değilse olay yerine girilmemelidir. Öncelikle güvenlik sağlanmalıdır."
  },
  {
    type: "truefalse",
    question: "Bilinci kapalı bir hastaya ekip lideri sağ yanından yaklaşır.",
    correct: true,
    explanation: "Doğru. Mekansal kısıtlılık yoksa ekip lideri hastanın sağ yanından yaklaşır."
  },
  {
    type: "truefalse",
    question: "Tıbbi danışman onayına bağlı tedaviler, onay alınmadan doğrudan uygulanabilir.",
    correct: false,
    explanation: "Yanlış. Onaya bağlı hiçbir tedavi danışman hekim onayı alınmadan başlatılmaz."
  },
  {
    type: "truefalse",
    question: "Normal kalp hızı dakikada 60-100 atım arasındadır.",
    correct: true,
    explanation: "Doğru. Erişkinlerde normal kalp hızı 60-100 atım/dk arasındadır."
  },

  // --- Boşluk Doldurma (%15) ---
  {
    type: "fillblank",
    question: "Birincil değerlendirmede kullanılan ABCDE yaklaşımında C harfi ____ anlamına gelir.",
    answer: "Circulation",
    alternatives: ["circulation", "dolaşım", "Dolaşım"],
    explanation: "C = Circulation yani dolaşımın kontrolüdür. Nabız, kan basıncı ve perfüzyon değerlendirilir."
  },
  {
    type: "fillblank",
    question: "Hastanın hastaneye sistematik teslimi için kullanılan protokolün kısaltması ____ şeklindedir.",
    answer: "ATMIST",
    alternatives: ["atmist", "A-T-M-I-S-T"],
    explanation: "ATMIST: Age, Time of onset, Medical complaint, Investigations, Signs vital, Treatment."
  },
  {
    type: "fillblank",
    question: "Normal kan basıncı değeri ____ mmHg'dır.",
    answer: "120/80",
    alternatives: ["120/80 mmHg"],
    explanation: "Normal kan basıncı 120/80 mmHg olarak kabul edilir."
  },

  // --- Eşleştirme (%15) ---
  {
    type: "matching",
    question: "SAMPLE kısaltmasındaki harfleri Türkçe karşılıklarıyla eşleştirin:",
    pairs: [
      { left: "S - Signs/Symptoms", right: "Belirtiler ve Bulgular" },
      { left: "A - Allergies", right: "Alerjiler / Kötü Alışkanlıklar" },
      { left: "M - Medications", right: "Kullanılan İlaçlar" },
      { left: "P - Past Medical History", right: "Tıbbi Özgeçmiş" }
    ],
    explanation: "SAMPLE tıbbi öykü alma yöntemidir: S=Belirtiler, A=Alerjiler, M=İlaçlar, P=Özgeçmiş, L=Son alım/adet, E=Çağrı nedeni."
  },
  {
    type: "matching",
    question: "Arrest yönetiminde ekip üyelerini görevleriyle eşleştirin:",
    pairs: [
      { left: "1. Personel", right: "Göğüs kompresyonları" },
      { left: "2. Personel", right: "Monitörizasyon ve defibrilasyon" },
      { left: "3. Personel (Ekip Lideri)", right: "Havayolu ve vaka yönetimi" },
      { left: "Oksijen kaynağı + Acil çantası", right: "Sol omuz üstü-dışı hizası" }
    ],
    explanation: "1. personel kompresyon (sol taraf), 2. personel monitör/defibrilasyon (sağ taraf), ekip lideri havayolu (baş taraf). Oksijen ve çanta sol omuz, defibrilatör ve aspiratör sağ omuz hizasına yerleştirilir."
  },
  {
    type: "matching",
    question: "Vital parametreleri normal değerleriyle eşleştirin:",
    pairs: [
      { left: "Solunum Hızı", right: "10-20 soluk/dk" },
      { left: "Kalp Hızı", right: "60-100 atım/dk" },
      { left: "SpO2", right: "%94-98" },
      { left: "Kan Şekeri", right: "60-100 mg/dl" }
    ],
    explanation: "Solunum hızı 10-20/dk, kalp hızı 60-100/dk, SpO2 %94-98, kan şekeri 60-100 mg/dl. Diğer normal değerler: KB 120/80 mmHg, kapiller geri dolum <2 sn, vücut sıcaklığı 36,5-37,2°C, ETCO2 35-45 mmHg."
  }
];
