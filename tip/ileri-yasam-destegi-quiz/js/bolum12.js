window.bolum12_sorular = [
{
type: "multiple",
question: "Elektrik çarpması ile ölenlerin 2/3'ü hangi yaş grubundadır?",
options: ["0-15 yaş", "15-40 yaş", "40-65 yaş", "65 yaş üstü"],
correct: 1,
explanation: "Elektrik çarpması ile ölenlerin 2/3'ü 15-40 yaşları arasındaki genç nüfustur."
},
{
type: "multiple",
question: "Alternatif akım (AC) gerilimi evlerde kaç volt'tur?",
options: ["50-60 V", "110-220 V", "380 V", "1000 V"],
correct: 1,
explanation: "Alternatif akım gerilimi evlerde 110-220 V, sanayide 380 V'dur. 1000 V üzeri yüksek voltaj kabul edilir."
},
{
type: "multiple",
question: "Elektrik yaralanmalarında ölümcül yaralanmalar genellikle kaç voltun üzerinde görülür?",
options: ["220 V", "380 V", "600 V", "1000 V"],
correct: 2,
explanation: "Ölümcül yaralanmalar 600 V üzerinde görülebilir. 1000 V üzeri yüksek voltaj olarak sınıflandırılır."
},
{
type: "multiple",
question: "Yüksek voltajlı alternatif akıma maruz kalma durumunda en sık hangi aritmi görülür?",
options: ["Sinüs bradikardisi", "Asistoli", "Ventriküler fibrilasyon", "Atriyal fibrilasyon"],
correct: 2,
explanation: "Yüksek voltajlı alternatif akıma maruz kalma durumlarında VF ile karşılaşılma ihtimali yüksektir. Yıldırım çarpmalarında ve doğru akımda ise daha sıklıkla asistoli görülür."
},
{
type: "multiple",
question: "Yıldırım çarpmasının elektrik çarpmasından farkı nedir?",
options: [
"Daha düşük voltajlıdır",
"Akım vücut içinden değil yüzeyinden akar (Flashover)",
"Sadece yanık oluşturur",
"Alternatif akımdır"
],
correct: 1,
explanation: "Yıldırım doğru akımdır ve yaklaşık 1.000.000 voltluk şok oluşturur. Elektrik akımından farkı akımın vücut içinden değil vücut yüzeyinden akmasıdır (Flashover fenomeni)."
},
{
type: "multiple",
question: "Elektrik yaralanmalarında sıvı resüsitasyonunda potasyum içeren sıvılardan neden kaçınılır?",
options: [
"Hipernatremi riski",
"Doku yıkımına bağlı miyoglobinüri ve hiperpotasemi riski",
"Asidoz riski",
"Hipoglisemi riski"
],
correct: 1,
explanation: "Doku yıkımına bağlı miyoglobinüri ve hiperpotasemi ortaya çıkabileceği düşünülerek potasyum içeren sıvılardan kaçınılır ve sıvı resüsitasyonuna 10 ml/kg %0,9 NaCl ile başlanır."
},
{
type: "multiple",
question: "Devrilmiş güç hatlarından en az kaç metre uzakta durulmalıdır?",
options: ["3 m", "5 m", "10 m", "20 m"],
correct: 2,
explanation: "Devrilmiş güç hatlarından ve destek yapılarından en az 10 m uzakta durulmalıdır."
},
{
type: "multiple",
question: "Yıldırım çarpmasında cilde özgü bulgu hangisidir?",
options: ["Termal yanık", "Alev yanığı", "Lichtenberg bulgusu", "Kompartman sendromu"],
correct: 2,
explanation: "Alanda bulunan bilinci kapalı ve cildinde patognomonik Lichtenberg bulgusu görülen vakalarda yıldırım çarpması düşünülmelidir."
},
{
type: "truefalse",
question: "Alternatif akım aynı büyüklükteki doğru akımdan daha tehlikelidir.",
correct: true,
explanation: "Alternatif akım aynı büyüklükteki doğru akımdan daha tehlikelidir. AC ile temas başladığında vücut akımdan uzaklaşamaz ve kasılır, böylece daha uzun süre maruz kalır. Ayrıca VF'ye neden olma olasılığı daha yüksektir."
},
{
type: "truefalse",
question: "Elektrik yaralanmalarında KPR'ye yanıt alınma ihtimali diğer olgulardan daha yüksektir.",
correct: true,
explanation: "Hipotermide olduğu gibi elektrik yaralanmalarında da KPR'ye yanıt alınma ihtimali diğer olgulardan daha yüksek olduğu unutulmamalıdır."
},
{
type: "truefalse",
question: "Yüksek voltajlı elektrik yaralanmalarında ciltteki yanık görünümü iç organ hasarının ciddiyetini yansıtır.",
correct: false,
explanation: "Yüksek voltajlı elektrik yaralanmaları ciltteki yanık görünümünden BAĞIMSIZ olarak ciddi iç organ yaralanmalarına neden olabilir."
},
{
type: "fillblank",
question: "Elektrik çarpmasına maruz kalan hastada sıvı resüsitasyonuna ____ ml/kg %0,9 NaCl ile başlanır.",
answer: "10",
alternatives: ["10 ml/kg"],
explanation: "Sıvı resüsitasyonuna 10 ml/kg %0,9 NaCl ile başlanır. Potasyum içeren sıvılardan kaçınılmalıdır."
},
{
type: "fillblank",
question: "Yıldırım çarpmasında anlık olarak yaklaşık ____ voltluk bir doğru akım şoku yaşanır.",
answer: "1000000",
alternatives: ["1.000.000", "1000000 V", "bir milyon"],
explanation: "Yıldırım çarpması esnasında aniden yaklaşık 1.000.000 voltluk bir doğru akım şoku yaşanır."
},
{
type: "matching",
question: "Akım türlerini özelliklerle eşleştirin:",
pairs: [
{left: "Alternatif akım (AC)", right: "Evlerde/sanayide kullanılır, kasılma yaparak uzaklaşmayı engeller"},
{left: "Doğru akım (DC)", right: "Kişiyi kaynaktan ileri fırlatır"},
{left: "Yıldırım", right: "Doğru akım, Flashover fenomeni ile yüzeyden akar"},
{left: "Yüksek voltaj", right: "1000 V üzeri"}
],
explanation: "AC ve DC farklı mekanizmalarla zarar verir. AC daha tehlikelidir çünkü kişi akımdan uzaklaşamaz ve VF riski daha yüksektir."
},
{
type: "matching",
question: "Elektrik yaralanması komplikasyonlarını eşleştirin:",
pairs: [
{left: "Kardiyak etki", right: "VF, asistoli, AF, AV bloklar, iskemi"},
{left: "Solunumsal etki", right: "Diyafram tetanik kasılması, solunum arresti"},
{left: "Kas-iskelet", right: "Miyoglobinüri, kemik kırıkları, kompartman"},
{left: "Nörolojik", right: "Paraliziler, bilinç kaybı, beyin ödemi"}
],
explanation: "Elektrik yaralanmaları multisistem hasarına yol açar. Hastalar multitravmalı hasta olarak değerlendirilmelidir."
}
];
