// ══════════════════════════════════════════════════════════
// FIREBASE ENTEGRASYONU
// ══════════════════════════════════════════════════════════
import { initializeApp, deleteApp } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-app.js";
import { getAuth, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-auth.js";
import { getDatabase, ref, get, set, remove } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-database.js";
import { initTimer, stBasla, stDuraklat, stDevam, stSonrakiAdim, stDurdur, timerdenCik } from "./timer.js";
import { istSayfaYukle, istHedefKaydet, istAyDeg } from "./stats.js";

const firebaseConfig = {
    apiKey: "AIzaSyAhRWk_w4IvdG3G4qUfKeW5MNCbLVVJby0",
    authDomain: "fitnesssalonu.firebaseapp.com",
    databaseURL: "https://fitnesssalonu-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "fitnesssalonu",
    storageBucket: "fitnesssalonu.firebasestorage.app",
    messagingSenderId: "217081542142",
    appId: "1:217081542142:web:c998d8acbc877abbbb7caf"
};

const ADMIN_EMAIL = 'gymfitnesssalonu@gmail.com';
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);
const googleProvider = new GoogleAuthProvider();

// ══════════════════════════════════════════════════════════
// FIREBASE DB YARDIMCILARI
// ══════════════════════════════════════════════════════════
export function emailKey(email){ return (email||'').toLowerCase().replace(/\./g, ','); }
export function keyToEmail(key){ return (key||'').replace(/,/g, '.'); }

export async function fbOku(path){
    try{ var snap = await get(ref(db, path)); return snap.exists() ? snap.val() : null; }
    catch(e){ console.error('FB okuma:', path, e); return null; }
}
export async function fbYaz(path, data){
    try{ await set(ref(db, path), data); return true; }
    catch(e){ console.error('FB yazma:', path, e); throw e; }
}
// Üye verisini kaydederken atananRutinler/atananDiyetler'i korur (üye değiştiremez)
export async function fbYazUye(eKey, userData){
    if(!G.isAdmin){
        // Üye kaydediyorsa, atanan verileri DB'den al (üyenin local değişikliklerini ezme)
        try{
            var dbAtananRut = await fbOku('users/'+eKey+'/atananRutinler');
            var dbAtananDiyet = await fbOku('users/'+eKey+'/atananDiyetler');
            if(dbAtananRut !== null) userData.atananRutinler = dbAtananRut;
            if(dbAtananDiyet !== null) userData.atananDiyetler = dbAtananDiyet;
        }catch(e){ console.error('Atanan koruma hatası:', e); }
    }
    return await fbYaz('users/'+eKey, userData);
}
export async function fbSil(path){
    try{ await remove(ref(db, path)); return true; }
    catch(e){ console.error('FB silme:', path, e); throw e; }
}

async function loadAdminData(){
    var data = await fbOku('admin');
    if(!data) data = { uyeler:{}, sabitRutinler:[], sabitDiyetler:[], arsiv:{} };
    if(!data.uyeler) data.uyeler = {};
    if(!data.sabitRutinler) data.sabitRutinler = [];
    if(!data.sabitDiyetler) data.sabitDiyetler = [];
    if(!data.arsiv) data.arsiv = {};
    return data;
}
export async function loadUserData(eKey){
    var data = await fbOku('users/' + eKey);
    if(!data) data = {};
    if(!data.sporRutinleri) data.sporRutinleri = [];
    if(!data.diyetProgramlari) data.diyetProgramlari = [];
    if(!data.sporOturumlari) data.sporOturumlari = [];
    if(!data.kiloKayitlari) data.kiloKayitlari = [];
    if(!data.diyetKayitlari) data.diyetKayitlari = [];
    if(!data.hedefler) data.hedefler = {gunlukDk:0,haftalikDk:0,kiloHedef:0};
    if(!data.atananRutinler) data.atananRutinler = [];
    if(!data.atananDiyetler) data.atananDiyetler = [];
    return data;
}

// ══════════════════════════════════════════════════════════
// GLOBAL DEĞİŞKENLER (export)
// ══════════════════════════════════════════════════════════
export var G = {
    currentUser: null,
    userData: null,
    adminData: null,
    isAdmin: false,
    aktifEkran: 'ekran-giris',
    readonlyMode: false,
    readonlyEmail: null,
    readonlyUserData: null
};

export function getAktifData(){ return G.readonlyMode ? G.readonlyUserData : G.userData; }
export function getAtananRutinler(){
    var d = getAktifData(); if(!d || !d.atananRutinler) return [];
    var sabitler = (G.adminData && G.adminData.sabitRutinler) ? G.adminData.sabitRutinler : [];
    return d.atananRutinler.map(function(r){
        // Kişiselleştirilmemiş ise sabitten güncel halini al
        if(!r.kisisellestirildi && r.sabitId){
            var sabit = sabitler.find(function(s){ return s.id === r.sabitId; });
            if(sabit){
                // Sabitin güncel verilerini al, ama atananın id/sabitId/atayanAdmin/kisisellestirildi alanlarını koru
                var guncel = JSON.parse(JSON.stringify(sabit));
                guncel.id = r.id;
                guncel.sabitId = r.sabitId;
                guncel.atayanAdmin = r.atayanAdmin;
                guncel.kisisellestirildi = false;
                return guncel;
            }
        }
        return r;
    });
}
export function getAtananDiyetler(){
    var d = getAktifData(); if(!d || !d.atananDiyetler) return [];
    var sabitler = (G.adminData && G.adminData.sabitDiyetler) ? G.adminData.sabitDiyetler : [];
    return d.atananDiyetler.map(function(dd){
        if(!dd.kisisellestirildi && dd.sabitId){
            var sabit = sabitler.find(function(s){ return s.id === dd.sabitId; });
            if(sabit){
                var guncel = JSON.parse(JSON.stringify(sabit));
                guncel.id = dd.id;
                guncel.sabitId = dd.sabitId;
                guncel.atayanAdmin = dd.atayanAdmin;
                guncel.kisisellestirildi = false;
                return guncel;
            }
        }
        return dd;
    });
}

// ══════════════════════════════════════════════════════════
// SABİTLER
// ══════════════════════════════════════════════════════════
export var GUN_ADI = ['Pz','Pt','Sa','Ça','Pe','Cu','Ct'];
export var GUN_UZUN = ['Pazar','Pazartesi','Salı','Çarşamba','Perşembe','Cuma','Cumartesi'];
export var AY_ADI = ['Ocak','Şubat','Mart','Nisan','Mayıs','Haziran','Temmuz','Ağustos','Eylül','Ekim','Kasım','Aralık'];
export var DONUT_RENKLER = ['#10b981','#f43f5e','#a78bfa','#f59e0b','#22d3ee','#06b6d4','#8b5cf6','#ec4899','#14b8a6','#f97316'];
var OGUN_TIPLERI=['Kahvaltı','Ara Öğün 1','Öğle','Ara Öğün 2','Akşam','Gece'];

export var SPOR_KATEGORILERI = [
    {id:'kardiyo',ad:'🏃 Kardiyo',egzersizler:[
        {id:'yuruyus',ad:'Yürüyüş (Walking)',met:4.3,params:['sure','mesafe_km','hiz_kmsa'],tipiZaman:true},
        {id:'kosu',ad:'Koşu (Running)',met:9.8,params:['sure','mesafe_km','hiz_kmsa'],tipiZaman:true},
        {id:'kosu_bandi',ad:'Koşu Bandı (Treadmill)',met:8.0,params:['sure','hiz_kmsa','egim_yuzde'],tipiZaman:true},
        {id:'bisiklet_dis',ad:'Bisiklet - Dış Mekan',met:7.5,params:['sure','mesafe_km','hiz_kmsa'],tipiZaman:true},
        {id:'bisiklet_sabit',ad:'Sabit Bisiklet',met:6.8,params:['sure','direnc_seviye'],tipiZaman:true},
        {id:'eliptik',ad:'Eliptik Bisiklet',met:5.0,params:['sure','direnc_seviye'],tipiZaman:true},
        {id:'kurek',ad:'Kürek Makinesi',met:7.0,params:['sure','mesafe_m','direnc_seviye'],tipiZaman:true},
        {id:'merdiven',ad:'Merdiven Makinesi',met:9.0,params:['sure','direnc_seviye'],tipiZaman:true},
        {id:'ip_atlama',ad:'İp Atlama',met:11.0,params:['sure'],tipiZaman:true},
        {id:'yuzme',ad:'Yüzme',met:7.0,params:['sure','mesafe_m'],tipiZaman:true}
    ]},
    {id:'gogus',ad:'🏋️ Göğüs',egzersizler:[
        {id:'bench_press',ad:'Bench Press',met:5.0,params:['set','tekrar','agirlik_kg','dinlenme_sn'],tipiZaman:false},
        {id:'incline_bench',ad:'Eğimli Bench Press',met:5.0,params:['set','tekrar','agirlik_kg','dinlenme_sn'],tipiZaman:false},
        {id:'decline_bench',ad:'Düşük Bench Press',met:5.0,params:['set','tekrar','agirlik_kg','dinlenme_sn'],tipiZaman:false},
        {id:'gogus_press_makine',ad:'Göğüs Press Makinesi',met:5.0,params:['set','tekrar','agirlik_kg','dinlenme_sn'],tipiZaman:false},
        {id:'dumbbell_fly',ad:'Dumbbell Fly',met:4.5,params:['set','tekrar','agirlik_kg','dinlenme_sn'],tipiZaman:false},
        {id:'cable_crossover',ad:'Kablo Çapraz',met:4.5,params:['set','tekrar','agirlik_kg','dinlenme_sn'],tipiZaman:false},
        {id:'pec_deck',ad:'Pec Deck Makinesi',met:4.5,params:['set','tekrar','agirlik_kg','dinlenme_sn'],tipiZaman:false},
        {id:'sinav',ad:'Şınav',met:3.8,params:['set','tekrar','dinlenme_sn'],tipiZaman:false}
    ]},
    {id:'sirt',ad:'💪 Sırt',egzersizler:[
        {id:'lat_pulldown',ad:'Lat Pulldown',met:5.0,params:['set','tekrar','agirlik_kg','dinlenme_sn'],tipiZaman:false},
        {id:'barbell_row',ad:'Barbell Sıra Çekiş',met:5.5,params:['set','tekrar','agirlik_kg','dinlenme_sn'],tipiZaman:false},
        {id:'seated_row',ad:'Oturarak Çekiş',met:5.0,params:['set','tekrar','agirlik_kg','dinlenme_sn'],tipiZaman:false},
        {id:'cable_row',ad:'Kablo Çekiş',met:5.0,params:['set','tekrar','agirlik_kg','dinlenme_sn'],tipiZaman:false},
        {id:'deadlift',ad:'Deadlift',met:6.0,params:['set','tekrar','agirlik_kg','dinlenme_sn'],tipiZaman:false},
        {id:'tbar_row',ad:'T-Bar Çekiş',met:5.5,params:['set','tekrar','agirlik_kg','dinlenme_sn'],tipiZaman:false},
        {id:'barfiks',ad:'Barfiks',met:8.0,params:['set','tekrar','dinlenme_sn'],tipiZaman:false},
        {id:'hyperextension',ad:'Sırt Ekstansiyonu',met:3.5,params:['set','tekrar','agirlik_kg','dinlenme_sn'],tipiZaman:false}
    ]},
    {id:'bacak',ad:'🦵 Bacak',egzersizler:[
        {id:'squat',ad:'Squat',met:6.0,params:['set','tekrar','agirlik_kg','dinlenme_sn'],tipiZaman:false},
        {id:'leg_press',ad:'Bacak Pres',met:5.5,params:['set','tekrar','agirlik_kg','dinlenme_sn'],tipiZaman:false},
        {id:'hack_squat',ad:'Hack Squat',met:5.5,params:['set','tekrar','agirlik_kg','dinlenme_sn'],tipiZaman:false},
        {id:'leg_extension',ad:'Bacak Açma',met:4.0,params:['set','tekrar','agirlik_kg','dinlenme_sn'],tipiZaman:false},
        {id:'leg_curl',ad:'Bacak Bükme',met:4.0,params:['set','tekrar','agirlik_kg','dinlenme_sn'],tipiZaman:false},
        {id:'calf_raise',ad:'Baldır Kaldırma',met:3.5,params:['set','tekrar','agirlik_kg','dinlenme_sn'],tipiZaman:false},
        {id:'lunges',ad:'Lunge',met:5.0,params:['set','tekrar','agirlik_kg','dinlenme_sn'],tipiZaman:false},
        {id:'hip_thrust',ad:'Kalça İtme',met:5.0,params:['set','tekrar','agirlik_kg','dinlenme_sn'],tipiZaman:false},
        {id:'smith_squat',ad:'Smith Squat',met:5.5,params:['set','tekrar','agirlik_kg','dinlenme_sn'],tipiZaman:false},
        {id:'adductor',ad:'İç Bacak Makinesi',met:3.5,params:['set','tekrar','agirlik_kg','dinlenme_sn'],tipiZaman:false},
        {id:'abductor',ad:'Dış Bacak Makinesi',met:3.5,params:['set','tekrar','agirlik_kg','dinlenme_sn'],tipiZaman:false}
    ]},
    {id:'omuz',ad:'🤸 Omuz',egzersizler:[
        {id:'shoulder_press',ad:'Omuz Press',met:5.0,params:['set','tekrar','agirlik_kg','dinlenme_sn'],tipiZaman:false},
        {id:'lateral_raise',ad:'Yan Kaldırma',met:4.0,params:['set','tekrar','agirlik_kg','dinlenme_sn'],tipiZaman:false},
        {id:'front_raise',ad:'Ön Kaldırma',met:4.0,params:['set','tekrar','agirlik_kg','dinlenme_sn'],tipiZaman:false},
        {id:'rear_delt',ad:'Arka Omuz',met:4.0,params:['set','tekrar','agirlik_kg','dinlenme_sn'],tipiZaman:false},
        {id:'face_pull',ad:'Yüz Çekişi',met:4.0,params:['set','tekrar','agirlik_kg','dinlenme_sn'],tipiZaman:false},
        {id:'arnold_press',ad:'Arnold Press',met:5.0,params:['set','tekrar','agirlik_kg','dinlenme_sn'],tipiZaman:false},
        {id:'shrug',ad:'Omuz Silkme',met:4.0,params:['set','tekrar','agirlik_kg','dinlenme_sn'],tipiZaman:false}
    ]},
    {id:'kol',ad:'💪 Kol',egzersizler:[
        {id:'bicep_curl',ad:'Bicep Curl',met:4.0,params:['set','tekrar','agirlik_kg','dinlenme_sn'],tipiZaman:false},
        {id:'hammer_curl',ad:'Hammer Curl',met:4.0,params:['set','tekrar','agirlik_kg','dinlenme_sn'],tipiZaman:false},
        {id:'tricep_pushdown',ad:'Tricep İtme',met:4.0,params:['set','tekrar','agirlik_kg','dinlenme_sn'],tipiZaman:false},
        {id:'tricep_extension',ad:'Tricep Açma',met:4.0,params:['set','tekrar','agirlik_kg','dinlenme_sn'],tipiZaman:false},
        {id:'skull_crusher',ad:'Skull Crusher',met:4.5,params:['set','tekrar','agirlik_kg','dinlenme_sn'],tipiZaman:false},
        {id:'bicep_makine',ad:'Bicep Makinesi',met:4.0,params:['set','tekrar','agirlik_kg','dinlenme_sn'],tipiZaman:false},
        {id:'tricep_makine',ad:'Tricep Makinesi',met:4.0,params:['set','tekrar','agirlik_kg','dinlenme_sn'],tipiZaman:false},
        {id:'preacher_curl',ad:'Preacher Curl',met:4.0,params:['set','tekrar','agirlik_kg','dinlenme_sn'],tipiZaman:false},
        {id:'wrist_curl',ad:'Bilek Curl',met:3.0,params:['set','tekrar','agirlik_kg','dinlenme_sn'],tipiZaman:false}
    ]},
    {id:'karin',ad:'🧱 Karın',egzersizler:[
        {id:'crunch',ad:'Crunch',met:2.8,params:['set','tekrar','dinlenme_sn'],tipiZaman:false},
        {id:'plank',ad:'Plank',met:4.0,params:['sure'],tipiZaman:true},
        {id:'russian_twist',ad:'Rus Döndürmesi',met:3.8,params:['set','tekrar','agirlik_kg','dinlenme_sn'],tipiZaman:false},
        {id:'leg_raise',ad:'Bacak Kaldırma',met:3.5,params:['set','tekrar','dinlenme_sn'],tipiZaman:false},
        {id:'cable_crunch',ad:'Kablo Crunch',met:4.0,params:['set','tekrar','agirlik_kg','dinlenme_sn'],tipiZaman:false},
        {id:'ab_wheel',ad:'Karın Tekerleği',met:5.0,params:['set','tekrar','dinlenme_sn'],tipiZaman:false},
        {id:'ab_makine',ad:'Karın Makinesi',met:3.5,params:['set','tekrar','agirlik_kg','dinlenme_sn'],tipiZaman:false}
    ]},
    {id:'fonksiyonel',ad:'⚡ Fonksiyonel',egzersizler:[
        {id:'kettlebell_swing',ad:'Kettlebell Salınım',met:6.0,params:['set','tekrar','agirlik_kg','dinlenme_sn'],tipiZaman:false},
        {id:'battle_rope',ad:'Savaş İpi',met:10.3,params:['sure'],tipiZaman:true},
        {id:'box_jump',ad:'Kutu Atlama',met:8.0,params:['set','tekrar','dinlenme_sn'],tipiZaman:false},
        {id:'burpee',ad:'Burpee',met:8.0,params:['set','tekrar','dinlenme_sn'],tipiZaman:false},
        {id:'trx',ad:'TRX Askı',met:5.0,params:['set','tekrar','dinlenme_sn'],tipiZaman:false},
        {id:'medicine_ball',ad:'Sağlık Topu',met:5.0,params:['set','tekrar','agirlik_kg','dinlenme_sn'],tipiZaman:false}
    ]},
    {id:'esneklik',ad:'🧘 Esneklik & Denge',egzersizler:[
        {id:'yoga',ad:'Yoga',met:2.5,params:['sure'],tipiZaman:true},
        {id:'pilates',ad:'Pilates',met:3.0,params:['sure'],tipiZaman:true},
        {id:'germe',ad:'Germe/Stretching',met:2.3,params:['sure'],tipiZaman:true},
        {id:'foam_roller',ad:'Foam Roller',met:2.0,params:['sure'],tipiZaman:true}
    ]},
    {id:'diger_kat',ad:'📝 Diğer',egzersizler:[
        {id:'diger',ad:'Diğer (Kendi Adını Yaz)',met:5.0,params:['sure','set','tekrar','agirlik_kg','mesafe_km','dinlenme_sn'],tipiZaman:true}
    ]}
];
export var PARAM_LABELS={sure:'Süre (dk)',set:'Set',tekrar:'Tekrar',agirlik_kg:'Ağırlık',mesafe_km:'Mesafe',mesafe_m:'Mesafe',hiz_kmsa:'Hız',egim_yuzde:'Eğim',direnc_seviye:'Direnç',dinlenme_sn:'Dinlenme'};
export var PARAM_UNITS={sure:'dk',set:'×',tekrar:'rep',agirlik_kg:'kg',mesafe_km:'km',mesafe_m:'m',hiz_kmsa:'km/sa',egim_yuzde:'%',direnc_seviye:'',dinlenme_sn:'sn'};
export var PARAM_DEFAULTS={sure:5,set:4,tekrar:12,agirlik_kg:20,mesafe_km:1,mesafe_m:500,hiz_kmsa:5,egim_yuzde:0,direnc_seviye:5,dinlenme_sn:60};
export var PARAM_STEPS={sure:1,set:1,tekrar:1,agirlik_kg:2.5,mesafe_km:0.1,mesafe_m:50,hiz_kmsa:0.5,egim_yuzde:0.5,direnc_seviye:1,dinlenme_sn:5};

// ══════════════════════════════════════════════════════════
// YARDIMCI FONKSİYONLAR (export)
// ══════════════════════════════════════════════════════════
export function esc(s){if(!s)return '';var d=document.createElement('div');d.textContent=s;return d.innerHTML;}
export function bildirim(msg,tip){var el=document.getElementById('bildirim');el.textContent=msg;el.className=tip+' goster';setTimeout(function(){el.classList.remove('goster');},3000);}
export function yuklemeGoster(){document.getElementById('yukleme-overlay').classList.remove('gizli');}
export function yuklemeGizle(){document.getElementById('yukleme-overlay').classList.add('gizli');}
export function modalAc(html){document.getElementById('modal-body').innerHTML=html;document.getElementById('modal-overlay').classList.remove('gizli');}
export function modalKapat(){document.getElementById('modal-overlay').classList.add('gizli');}
export function msToStr(ms){var t=Math.floor(ms/1000);var sa=Math.floor(t/3600);var dk=Math.floor((t%3600)/60);var sn=t%60;if(sa>0)return String(sa).padStart(2,'0')+':'+String(dk).padStart(2,'0')+':'+String(sn).padStart(2,'0');return String(dk).padStart(2,'0')+':'+String(sn).padStart(2,'0');}
export function msToDkStr(ms){var dk=Math.floor(ms/60000);if(dk<60)return dk+'dk';var sa=Math.floor(dk/60);var kal=dk%60;return sa+'sa'+(kal>0?' '+kal+'dk':'');}
export function bugunStr(){var n=new Date();return n.getFullYear()+'-'+String(n.getMonth()+1).padStart(2,'0')+'-'+String(n.getDate()).padStart(2,'0');}
export function vkiHesapla(boy,kilo){if(!boy||!kilo)return 0;var m=boy/100;return parseFloat((kilo/(m*m)).toFixed(1));}

export function egzersizBul(egzId){for(var k=0;k<SPOR_KATEGORILERI.length;k++){for(var e=0;e<SPOR_KATEGORILERI[k].egzersizler.length;e++){if(SPOR_KATEGORILERI[k].egzersizler[e].id===egzId)return SPOR_KATEGORILERI[k].egzersizler[e];}}return null;}
export function egzersizMET(egzId,met){var egz=egzersizBul(egzId);return met||((egz?egz.met:5.0));}
export function hesaplaKaloriAdim(adim,kiloKg){
    var met=egzersizMET(adim.egzersizId,adim.met);var sureDk=0;
    if(adim.tipiZaman){sureDk=adim.paramValues&&adim.paramValues.sure?adim.paramValues.sure:(adim.sure||5);}
    else{var setS=adim.paramValues&&adim.paramValues.set?adim.paramValues.set:4;var tekS=adim.paramValues&&adim.paramValues.tekrar?adim.paramValues.tekrar:12;var dinS=adim.paramValues&&adim.paramValues.dinlenme_sn?adim.paramValues.dinlenme_sn:60;sureDk=((setS*tekS*3.5)+(setS*dinS))/60;}
    return Math.round(met*3.5*kiloKg/200*sureDk);
}
export function hesaplaKaloriMs(adim,kiloKg,sporMs){var met=egzersizMET(adim.egzersizId,adim.met);var sureDk=sporMs/60000;return Math.round(met*3.5*kiloKg/200*sureDk);}

export function toplamSureDk(rutin){var t=0;(rutin.adimlar||[]).forEach(function(a){t+=(a.sure||0)+(a.mola||0);});return t;}
export function toplamKaloriRutin(rutin){var d=getAktifData();var kiloKg=(d&&d.profil)?d.profil.kilo||70:70;var t=0;(rutin.adimlar||[]).forEach(function(a){t+=hesaplaKaloriAdim(a,kiloKg);});return t;}
export function sporOturumuBul(tarih,rutinId){var d=getAktifData();return((d.sporOturumlari||[]).find(function(o){return o.tarih===tarih&&o.rutinId===rutinId&&o.tamamlandi;}));}
export function diyetKayitBul(tarih,diyetId){var d=getAktifData();return((d.diyetKayitlari||[]).find(function(k){return k.tarih===tarih&&k.diyetId===diyetId;}));}

// ══════════════════════════════════════════════════════════
// SES
// ══════════════════════════════════════════════════════════
var audioCtx=null;
export function acInit(){if(!audioCtx)audioCtx=new(window.AudioContext||window.webkitAudioContext)();if(audioCtx.state==='suspended')audioCtx.resume();}
function nota(f,b,s,v,t){acInit();var tt=audioCtx.currentTime+b;var o=audioCtx.createOscillator();var g=audioCtx.createGain();o.connect(g);g.connect(audioCtx.destination);o.frequency.value=f;o.type=t||'sine';g.gain.setValueAtTime(0.001,tt);g.gain.linearRampToValueAtTime(v||0.5,tt+0.02);g.gain.setValueAtTime(v||0.5,tt+s*0.7);g.gain.exponentialRampToValueAtTime(0.001,tt+s);o.start(tt);o.stop(tt+s);}
export function sesGucluAlarm(){acInit();nota(880,0,0.15,0.8,'square');nota(880,0.2,0.15,0.8,'square');nota(880,0.4,0.15,0.8,'square');nota(1760,0.65,0.3,0.7,'square');nota(1320,0.95,0.2,0.6,'sawtooth');nota(1760,1.2,0.5,0.8,'square');}
export function sesAdimBitti(){acInit();nota(784,0,0.2,0.7,'square');nota(988,0.2,0.2,0.7,'square');nota(1175,0.4,0.3,0.7,'square');nota(1568,0.7,0.5,0.8,'sine');}
export function sesSporBitti(){acInit();nota(523,0,0.2,0.6,'square');nota(659,0.15,0.2,0.6,'square');nota(784,0.3,0.25,0.6,'square');nota(1047,0.55,0.5,0.7,'square');nota(1047,1.1,0.15,0.5,'sine');nota(1319,1.25,0.15,0.5,'sine');nota(1568,1.4,0.15,0.5,'sine');nota(2093,1.55,0.8,0.6,'sine');}

// ══════════════════════════════════════════════════════════
// EKRAN YÖNETİMİ
// ══════════════════════════════════════════════════════════
export function ekranGoster(id){
    document.querySelectorAll('.ekran').forEach(function(e){e.classList.remove('aktif');});
    document.getElementById(id).classList.add('aktif');G.aktifEkran=id;
    var menuGizle=['ekran-giris','ekran-profil-olustur','ekran-timer'];
    if(menuGizle.indexOf(id)!==-1)document.getElementById('alt-menu').classList.add('gizli');
    else document.getElementById('alt-menu').classList.remove('gizli');
    if(id==='ekran-ana')anaSayfaRender();
    if(id==='ekran-takvim'){window._takYil=new Date().getFullYear();window._takAy=new Date().getMonth();takTakvimRender();}
    if(id==='ekran-istatistik')istSayfaYukle();
    if(id==='ekran-profil')profilRender();
}

// ══════════════════════════════════════════════════════════
// GİRİŞ SİSTEMİ
// ══════════════════════════════════════════════════════════
function sekmeDegistir(sekme){
    if(sekme==='giris'){document.getElementById('sekme-giris-btn').classList.add('aktif');document.getElementById('sekme-kayit-btn').classList.remove('aktif');document.getElementById('form-giris').classList.remove('gizli');document.getElementById('form-kayit').classList.add('gizli');}
    else{document.getElementById('sekme-kayit-btn').classList.add('aktif');document.getElementById('sekme-giris-btn').classList.remove('aktif');document.getElementById('form-kayit').classList.remove('gizli');document.getElementById('form-giris').classList.add('gizli');}
}
window.sekmeDegistir = sekmeDegistir;

async function uyeGirisYap(){
    var email=document.getElementById('g-email').value.trim().toLowerCase();
    var sifre=document.getElementById('g-sifre').value;
    if(!email||!sifre){bildirim('⚠️ E-posta ve şifre gerekli!','uyari');return;}
    if(email===ADMIN_EMAIL){bildirim('❌ Yönetici girişi için Yönetici sekmesini kullanın.','hata');return;}
    yuklemeGoster();
    try{
        await signInWithEmailAndPassword(auth, email, sifre);
        G.adminData = await loadAdminData();
        var eKey = emailKey(email);
        if(!G.adminData.uyeler[eKey]){
            await signOut(auth);
            bildirim('❌ Bu hesap kayıtlı üye değil. Yöneticiye başvurun.','hata');yuklemeGizle();return;
        }
        G.currentUser=email; G.isAdmin=false;
        G.userData = await loadUserData(eKey);
        bildirim('👋 Hoş geldin '+(G.adminData.uyeler[eKey].ad||email)+'!','basari');
        if(!G.userData.profil) ekranGoster('ekran-profil-olustur');
        else girisBasarili();
    }catch(e){
        console.error(e);
        if(e.code==='auth/invalid-credential'||e.code==='auth/wrong-password'||e.code==='auth/user-not-found')
            bildirim('❌ E-posta veya şifre hatalı!','hata');
        else bildirim('⚠️ Giriş hatası: '+e.message,'hata');
    }
    yuklemeGizle();
}
window.uyeGirisYap = uyeGirisYap;

async function adminGoogleGiris(){
    yuklemeGoster();
    try{
        var result = await signInWithPopup(auth, googleProvider);
        if(result.user.email!==ADMIN_EMAIL){
            await signOut(auth);
            bildirim('❌ Bu Google hesabı yönetici değil!','hata');yuklemeGizle();return;
        }
        G.currentUser=ADMIN_EMAIL; G.isAdmin=true;
        G.adminData = await loadAdminData();
        if(!G.adminData.profil) G.adminData.profil={avatar:'🔐',nick:'Yönetici'};
        G.userData = G.adminData;
        bildirim('🔐 Yönetici girişi başarılı!','basari');
        girisBasarili();
    }catch(e){
        console.error(e);
        if(e.code!=='auth/popup-closed-by-user') bildirim('⚠️ Google giriş hatası!','hata');
    }
    yuklemeGizle();
}
window.adminGoogleGiris = adminGoogleGiris;

function avatarSec(el){document.querySelectorAll('.avatar-item').forEach(function(a){a.classList.remove('aktif');});el.classList.add('aktif');}
window.avatarSec = avatarSec;

async function profilOlustur(){
    var avatar=document.querySelector('.avatar-item.aktif');var nick=document.getElementById('po-nick').value.trim();
    if(!nick){bildirim('⚠️ İsim gerekli!','uyari');return;}
    var boy=parseFloat(document.getElementById('po-boy').value)||0;
    var kilo=parseFloat(document.getElementById('po-kilo').value)||0;
    if(!boy||!kilo){bildirim('⚠️ Boy ve kilo gerekli!','uyari');return;}
    yuklemeGoster();
    G.userData.profil={avatar:avatar?avatar.dataset.avatar:'💪',nick:nick,boy:boy,kilo:kilo,dogumTarihi:document.getElementById('po-dogum').value,cinsiyet:document.getElementById('po-cinsiyet').value,createdDate:bugunStr()};
    G.userData.hedefler.kiloHedef=parseFloat(document.getElementById('po-kilo-hedef').value)||kilo;
    G.userData.kiloKayitlari.push({tarih:bugunStr(),kilo:kilo,timestamp:Date.now()});
    try{await fbYazUye(emailKey(G.currentUser),G.userData);bildirim('🚀 Profil oluşturuldu!','basari');girisBasarili();}
    catch(e){bildirim('⚠️ Kayıt hatası!','hata');}
    yuklemeGizle();
}
window.profilOlustur = profilOlustur;

function girisBasarili(){
    if(G.isAdmin){
        document.getElementById('admin-menu-items').classList.remove('gizli');
        document.getElementById('pm-profil-duzenle').classList.add('gizli');
        document.getElementById('pm-spor-yonet').classList.add('gizli');
        document.getElementById('pm-diyet-yonet').classList.add('gizli');
        document.getElementById('pr-vki-area').classList.add('gizli');
    } else {
        document.getElementById('admin-menu-items').classList.add('gizli');
        document.getElementById('pm-profil-duzenle').classList.remove('gizli');
        document.getElementById('pm-spor-yonet').classList.remove('gizli');
        document.getElementById('pm-diyet-yonet').classList.remove('gizli');
        document.getElementById('pr-vki-area').classList.remove('gizli');
    }
    ekranGoster('ekran-ana');
}

async function cikisYap(){
    try{await signOut(auth);}catch(e){}
    G.currentUser=null;G.userData=null;G.adminData=null;G.isAdmin=false;G.readonlyMode=false;G.readonlyEmail=null;G.readonlyUserData=null;
    document.getElementById('admin-menu-items').classList.add('gizli');
    document.getElementById('readonly-banner').classList.add('gizli');
    ekranGoster('ekran-giris');bildirim('👋 Çıkış yapıldı!','bilgi');
}
window.cikisYap = cikisYap;

// ══════════════════════════════════════════════════════════
// READONLY MOD
// ══════════════════════════════════════════════════════════
async function readonlyBaslat(email, tabHedef){
    G.readonlyMode=true; G.readonlyEmail=email;
    G.readonlyUserData = await loadUserData(emailKey(email));
    var u=(G.adminData.uyeler||{})[emailKey(email)]||{};
    document.getElementById('readonly-ad').textContent=(u.ad||'')+' '+(u.soyad||'')+' ('+email+')';
    document.getElementById('readonly-banner').classList.remove('gizli');
    document.getElementById('ekle-alan').classList.add('gizli');
    document.getElementById('ist-hedef-bar-wrap').classList.add('gizli');
    modalKapat();
    if(tabHedef==='istatistik'){
        document.querySelectorAll('#alt-menu button').forEach(function(b){b.classList.remove('aktif');});
        document.getElementById('mn-ist').classList.add('aktif');
        ekranGoster('ekran-istatistik');
    } else {
        document.querySelectorAll('#alt-menu button').forEach(function(b){b.classList.remove('aktif');});
        document.getElementById('mn-ana').classList.add('aktif');
        ekranGoster('ekran-ana');
    }
}
window.readonlyBaslat = readonlyBaslat;

function readonlyKapat(){
    G.readonlyMode=false;G.readonlyEmail=null;G.readonlyUserData=null;
    document.getElementById('readonly-banner').classList.add('gizli');
    document.getElementById('ekle-alan').classList.remove('gizli');
    document.getElementById('ist-hedef-bar-wrap').classList.remove('gizli');
    document.querySelectorAll('#alt-menu button').forEach(function(b){b.classList.remove('aktif');});
    document.getElementById('mn-profil').classList.add('aktif');
    ekranGoster('ekran-profil');
}
window.readonlyKapat = readonlyKapat;

// ══════════════════════════════════════════════════════════
// ADMİN: ÜYE YÖNETİMİ
// ══════════════════════════════════════════════════════════
function uyeKalanGun(u){
    if(!u.uyelikBitis)return 9999;
    var bugun=new Date(bugunStr());var bitis=new Date(u.uyelikBitis);
    return Math.ceil((bitis-bugun)/(1000*60*60*24));
}

function adminUyeListeModal(){
    if(!G.isAdmin)return;
    var uyeler=G.adminData.uyeler;var keys=Object.keys(uyeler);
    var html='<h3 style="color:var(--accent);margin-bottom:14px;">👥 Üye Yönetimi <span style="font-size:12px;color:var(--text3);">('+keys.length+')</span></h3>';
    if(keys.length===0) html+='<p style="color:var(--text3);font-size:13px;">Henüz üye yok.</p>';
    else keys.forEach(function(eKey){
        var u=uyeler[eKey];var gun=uyeKalanGun(u);
        var badge='';
        if(!u.uyelikBitis)badge='<span class="uye-uyelik aktif">♾️ Süresiz</span>';
        else if(gun<0)badge='<span class="uye-uyelik bitmis">❌ '+Math.abs(gun)+' gün önce bitti</span>';
        else if(gun<=7)badge='<span class="uye-uyelik yakin">⚠️ '+gun+' gün</span>';
        else badge='<span class="uye-uyelik aktif">✅ '+gun+' gün</span>';
        html+='<div class="uye-item" onclick="adminUyeDetay(\''+esc(eKey)+'\')">';
        html+='<div class="uye-avatar">'+(u.avatar||'👤')+'</div>';
        html+='<div class="uye-bilgi"><div class="uye-ad">'+esc(u.ad||'')+' '+esc(u.soyad||'')+'</div><div class="uye-email">'+esc(keyToEmail(eKey))+(u.sifre?' • 🔑 '+esc(u.sifre):'')+'</div></div>';
        html+=badge+'</div>';
    });
    html+='<button class="btn btn-primary btn-block" style="margin-top:12px;" onclick="adminUyeEkleModal()">+ Yeni Üye Ekle</button>';
    var arsivKeys=Object.keys(G.adminData.arsiv||{});
    html+='<button class="btn btn-ghost btn-block" style="margin-top:8px;" onclick="adminArsivModal()">📦 Arşiv'+(arsivKeys.length>0?' ('+arsivKeys.length+')':'')+'</button>';
    modalAc(html);
}
window.adminUyeListeModal = adminUyeListeModal;

function adminUyeDetay(eKey){
    var u=(G.adminData.uyeler||{})[eKey];if(!u)return;
    var gun=uyeKalanGun(u);var email=keyToEmail(eKey);
    var html='<h3 style="color:var(--accent);margin-bottom:14px;">👤 '+esc(u.ad)+' '+esc(u.soyad)+'</h3>';
    html+='<div style="font-size:13px;color:var(--text2);line-height:1.8;">';
    html+='📧 '+esc(email)+'<br>';
    if(u.sifre) html+='🔑 Şifre: <strong style="color:var(--yellow);user-select:all;">'+esc(u.sifre)+'</strong><br>';
    if(u.tel)html+='📱 '+esc(u.tel)+'<br>';
    if(u.adres)html+='📍 '+esc(u.adres)+'<br>';
    html+='📅 Kayıt: '+esc(u.kayitTarihi||'-')+'<br>';
    html+='🏷️ Üyelik: '+esc(u.uyelikBaslangic||'-')+' → '+esc(u.uyelikBitis||'Süresiz')+'<br>';
    if(u.uyelikBitis) html+='⏳ Kalan: <strong style="color:'+(gun<=7?(gun<0?'var(--red)':'var(--yellow)'):'var(--green)')+'">'+gun+' gün</strong><br>';
    html+='</div>';
    html+='<div style="display:flex;gap:6px;margin-top:14px;flex-wrap:wrap;">';
    html+='<button class="btn btn-primary btn-sm" onclick="adminUyeUzatModal(\''+esc(eKey)+'\')">📅 Uzat</button>';
    html+='<button class="btn btn-ghost btn-sm" onclick="adminUyeSifreDegModal(\''+esc(eKey)+'\')">🔑 Şifre</button>';
    html+='<button class="btn btn-ghost btn-sm" onclick="readonlyBaslat(\''+esc(email)+'\',\'istatistik\')">📊 İstatistik</button>';
    html+='<button class="btn btn-sport btn-sm" onclick="adminUyeRutinAtaModal(\''+esc(eKey)+'\')">💪 Spor</button>';
    html+='<button class="btn btn-diet btn-sm" onclick="adminUyeDiyetAtaModal(\''+esc(eKey)+'\')">🥗 Diyet</button>';
    html+='<button class="btn btn-danger btn-sm" onclick="adminUyeSil(\''+esc(eKey)+'\')">🗑️ Sil</button>';
    html+='</div>';
    modalAc(html);
}
window.adminUyeDetay = adminUyeDetay;

function adminUyeSifreDegModal(eKey){
    var u=(G.adminData.uyeler||{})[eKey];if(!u)return;
    var html='<h3 style="color:var(--accent);margin-bottom:14px;">🔑 Şifre Güncelle - '+esc(u.ad)+'</h3>';
    html+='<div class="form-group"><label class="form-label">Yeni Şifre (min 6 karakter)</label><input type="text" id="ue-yeni-sifre" class="input" placeholder="Yeni şifre" value="'+(u.sifre?esc(u.sifre):'')+'"></div>';
    html+='<p style="font-size:11px;color:var(--text3);margin-bottom:12px;">⚠️ Firebase Auth şifresi de güncellenecektir. Üyeye yeni şifreyi söylemeyi unutmayın.</p>';
    html+='<button class="btn btn-primary btn-block" onclick="adminUyeSifreKaydet(\''+esc(eKey)+'\')">💾 Şifreyi Güncelle</button>';
    modalAc(html);
}
window.adminUyeSifreDegModal = adminUyeSifreDegModal;

async function adminUyeSifreKaydet(eKey){
    var yeniSifre=document.getElementById('ue-yeni-sifre').value;
    if(!yeniSifre||yeniSifre.length<6){bildirim('⚠️ Şifre en az 6 karakter!','uyari');return;}
    var email=keyToEmail(eKey);
    yuklemeGoster();
    try{
        // Firebase Auth'da şifreyi güncellemek için: üyeyi sil+yeniden oluştur (client SDK'da updatePassword sadece kendi oturumunda çalışır)
        // Alternatif: ikinci app ile giriş yap, şifre güncelle
        var secondApp=initializeApp(firebaseConfig,'tempSifre_'+Date.now());
        var secondAuth=getAuth(secondApp);
        try{
            // Eski şifre ile giriş yap
            var eskiSifre=(G.adminData.uyeler[eKey]||{}).sifre;
            if(eskiSifre){
                var cred=await signInWithEmailAndPassword(secondAuth,email,eskiSifre);
                // Şifre güncelle (import gerekiyor)
                var updatePassword=(await import("https://www.gstatic.com/firebasejs/11.8.1/firebase-auth.js")).updatePassword;
                await updatePassword(cred.user,yeniSifre);
            } else {
                // Eski şifre bilinmiyor, yeniden oluştur
                await createUserWithEmailAndPassword(secondAuth,email,yeniSifre);
            }
        }catch(ae){
            // email-already-in-use ise eski şifre bilinmeden güncellenemez, sadece admin verisine kaydet
            if(ae.code!=='auth/email-already-in-use') console.warn('Auth şifre güncelleme:',ae.code);
        }
        await deleteApp(secondApp);
        // Admin verisinde şifreyi güncelle
        G.adminData.uyeler[eKey].sifre=yeniSifre;
        await fbYaz('admin',G.adminData);
        bildirim('✅ Şifre güncellendi!','basari');
        adminUyeDetay(eKey);
    }catch(e){console.error(e);bildirim('⚠️ Hata: '+e.message,'hata');}
    yuklemeGizle();
}
window.adminUyeSifreKaydet = adminUyeSifreKaydet;

function adminUyeEkleModal(prefill){
    var p=prefill||{};
    var html='<h3 style="color:var(--accent);margin-bottom:14px;">➕ Yeni Üye Ekle</h3>';
    html+='<div class="row2"><div class="form-group"><label class="form-label">Ad *</label><input type="text" id="ue-ad" class="input" placeholder="Ad" value="'+esc(p.ad||'')+'"></div>';
    html+='<div class="form-group"><label class="form-label">Soyad *</label><input type="text" id="ue-soyad" class="input" placeholder="Soyad" value="'+esc(p.soyad||'')+'"></div></div>';
    html+='<div class="form-group"><label class="form-label">E-posta *</label><input type="email" id="ue-email" class="input" placeholder="ornek@email.com" value="'+esc(p.email||'')+'"></div>';
    html+='<div class="form-group"><label class="form-label">Giriş Şifresi * (üyeye söylenecek)</label><input type="text" id="ue-sifre" class="input" placeholder="Min 6 karakter"></div>';
    html+='<div class="form-group"><label class="form-label">Telefon</label><input type="tel" id="ue-tel" class="input" placeholder="05xx xxx xxxx" value="'+esc(p.tel||'')+'"></div>';
    html+='<div class="form-group"><label class="form-label">Adres</label><input type="text" id="ue-adres" class="input" placeholder="Adres" value="'+esc(p.adres||'')+'"></div>';
    html+='<div class="row2"><div class="form-group"><label class="form-label">Üyelik Süresi (ay)</label><input type="number" id="ue-sure" class="input" value="1" min="1" max="60"></div>';
    html+='<div class="form-group"><label class="form-label">Başlangıç</label><input type="date" id="ue-baslangic" class="input" value="'+bugunStr()+'"></div></div>';
    html+='<button class="btn btn-primary btn-block" style="margin-top:14px;" onclick="adminUyeKaydet()">💾 Üye Ekle</button>';
    modalAc(html);
}
window.adminUyeEkleModal = adminUyeEkleModal;

async function adminUyeKaydet(){
    var ad=document.getElementById('ue-ad').value.trim();
    var soyad=document.getElementById('ue-soyad').value.trim();
    var email=document.getElementById('ue-email').value.trim().toLowerCase();
    var sifre=document.getElementById('ue-sifre').value;
    if(!ad||!soyad||!email){bildirim('⚠️ Ad, soyad ve e-posta zorunlu!','uyari');return;}
    if(!sifre||sifre.length<6){bildirim('⚠️ Şifre en az 6 karakter!','uyari');return;}
    var tel=document.getElementById('ue-tel').value.trim();
    var adres=document.getElementById('ue-adres').value.trim();
    var surAy=parseInt(document.getElementById('ue-sure').value)||1;
    var baslangic=document.getElementById('ue-baslangic').value||bugunStr();
    var bitis=new Date(baslangic);bitis.setMonth(bitis.getMonth()+surAy);
    var bitisStr=bitis.toISOString().split('T')[0];
    var eKey=emailKey(email);
    yuklemeGoster();
    try{
        // İkinci Firebase app ile kullanıcı oluştur (admin oturumunu bozmadan)
        var secondApp=initializeApp(firebaseConfig,'tempApp_'+Date.now());
        var secondAuth=getAuth(secondApp);
        var authBasarili=false;
        try{
            await createUserWithEmailAndPassword(secondAuth,email,sifre);
            authBasarili=true;
        }catch(ae){
            if(ae.code==='auth/email-already-in-use'){
                authBasarili=true; // zaten var, sorun yok
            } else {
                console.error('Auth hesap oluşturma hatası:',ae.code,ae.message);
                bildirim('⚠️ Auth hatası: '+ae.code+' - Firebase Console\'da Email/Password etkin mi?','hata');
            }
        }
        try{ await signOut(secondAuth); }catch(e){}
        try{ await deleteApp(secondApp); }catch(e){}

        if(!authBasarili){
            yuklemeGizle();return;
        }
        // Admin verisine ekle
        G.adminData.uyeler[eKey]={ad:ad,soyad:soyad,tel:tel,adres:adres,sifre:sifre,uyelikBaslangic:baslangic,uyelikBitis:bitisStr,uyelikAy:surAy,kayitTarihi:bugunStr(),avatar:'👤'};
        await fbYaz('admin',G.adminData);
        // Kullanıcı DB verisi yoksa oluştur
        var mevcut=await loadUserData(eKey);
        if(!mevcut.profil) await fbYaz('users/'+eKey,mevcut);
        bildirim('✅ Üye eklendi: '+ad+' '+soyad+' (Şifre: '+sifre+')','basari');
        adminUyeListeModal();
    }catch(e){console.error(e);bildirim('⚠️ Hata: '+e.message,'hata');}
    yuklemeGizle();
}
window.adminUyeKaydet = adminUyeKaydet;

function adminUyeUzatModal(eKey){
    var u=(G.adminData.uyeler||{})[eKey];if(!u)return;
    var html='<h3 style="color:var(--accent);margin-bottom:14px;">📅 Üyelik Uzat - '+esc(u.ad)+'</h3>';
    html+='<div class="form-group"><label class="form-label">Ek Süre (ay)</label><input type="number" id="uzat-ay" class="input" value="1" min="1" max="60"></div>';
    html+='<button class="btn btn-primary btn-block" onclick="adminUyeUzat(\''+esc(eKey)+'\')">✅ Uzat</button>';
    modalAc(html);
}
window.adminUyeUzatModal = adminUyeUzatModal;

async function adminUyeUzat(eKey){
    var ekAy=parseInt(document.getElementById('uzat-ay').value)||1;
    var u=G.adminData.uyeler[eKey];if(!u)return;
    var mevcut=u.uyelikBitis?new Date(u.uyelikBitis):new Date();
    if(mevcut<new Date())mevcut=new Date();
    mevcut.setMonth(mevcut.getMonth()+ekAy);
    u.uyelikBitis=mevcut.toISOString().split('T')[0];
    u.uyelikAy=(u.uyelikAy||0)+ekAy;
    yuklemeGoster();
    try{await fbYaz('admin',G.adminData);bildirim('✅ Üyelik uzatıldı!','basari');adminUyeDetay(eKey);}
    catch(e){bildirim('⚠️ Hata!','hata');}
    yuklemeGizle();
}
window.adminUyeUzat = adminUyeUzat;

async function adminUyeSil(eKey){
    if(!confirm('Üyeyi silmek istediğinize emin misiniz?\n'+keyToEmail(eKey)+'\nBilgileri arşivlenecektir.'))return;
    yuklemeGoster();
    try{
        var uyeData=await loadUserData(eKey);
        var uyeBilgi=(G.adminData.uyeler||{})[eKey]||{};
        G.adminData.arsiv[eKey]={uyeBilgi:uyeBilgi,userData:uyeData,arsivTarihi:bugunStr()};
        delete G.adminData.uyeler[eKey];
        await fbYaz('admin',G.adminData);
        await fbSil('users/'+eKey);
        bildirim('📦 Üye arşivlendi!','basari');adminUyeListeModal();
    }catch(e){bildirim('⚠️ Hata!','hata');}
    yuklemeGizle();
}
window.adminUyeSil = adminUyeSil;

function adminArsivModal(){
    var arsiv=G.adminData.arsiv||{};var keys=Object.keys(arsiv);
    var html='<h3 style="color:var(--purple);margin-bottom:14px;">📦 Arşiv ('+keys.length+')</h3>';
    if(keys.length===0) html+='<p style="color:var(--text3);font-size:13px;">Arşiv boş.</p>';
    else keys.forEach(function(eKey){
        var a=arsiv[eKey];var u=a.uyeBilgi||{};
        html+='<div class="uye-item" style="cursor:default;">';
        html+='<div class="uye-avatar">'+(u.avatar||'👤')+'</div>';
        html+='<div class="uye-bilgi"><div class="uye-ad">'+esc(u.ad||'')+' '+esc(u.soyad||'')+'</div><div class="uye-email">'+esc(keyToEmail(eKey))+' • '+esc(a.arsivTarihi||'-')+'</div></div>';
        html+='<button class="btn btn-primary btn-sm" onclick="adminArsivdenEkle(\''+esc(eKey)+'\')">♻️</button>';
        html+='</div>';
    });
    html+='<button class="btn btn-ghost btn-block" style="margin-top:12px;" onclick="adminUyeListeModal()">← Geri</button>';
    modalAc(html);
}
window.adminArsivModal = adminArsivModal;

function adminArsivdenEkle(eKey){
    var a=(G.adminData.arsiv||{})[eKey];if(!a)return;
    var u=a.uyeBilgi||{};
    adminUyeEkleModal({ad:u.ad,soyad:u.soyad,email:keyToEmail(eKey),tel:u.tel,adres:u.adres});
}
window.adminArsivdenEkle = adminArsivdenEkle;

// ══════════════════════════════════════════════════════════
// ADMİN: ATANAN RUTİN/DİYET
// ══════════════════════════════════════════════════════════
async function adminUyeRutinAtaModal(eKey){
    var uyeData=await loadUserData(eKey);
    var sabitler=G.adminData.sabitRutinler||[];
    var atananlar=uyeData.atananRutinler||[];
    var u=(G.adminData.uyeler||{})[eKey]||{};
    var html='<h3 style="color:var(--sport);margin-bottom:14px;">💪 '+esc(u.ad)+' - Spor Rutinleri</h3>';
    if(atananlar.length>0){
        html+='<div style="font-size:12px;color:var(--accent);font-weight:700;margin-bottom:6px;">Atanan Rutinler</div>';
        atananlar.forEach(function(r,i){
            var kisiselBadge = r.kisisellestirildi ? '<span style="font-size:9px;color:var(--cyan);background:rgba(34,211,238,0.12);padding:2px 6px;border-radius:8px;font-weight:700;">✨ Kişiye Özel</span>' : '';
            html+='<div style="background:var(--bg2);border:1px solid var(--border);border-radius:8px;margin-bottom:4px;padding:8px;">';
            html+='<div style="display:flex;align-items:center;gap:6px;">';
            html+='<span style="flex:1;font-size:13px;font-weight:600;">'+esc(r.ad)+'</span>';
            html+=kisiselBadge;
            html+='<span style="font-size:10px;color:var(--text3);">'+r.adimlar.length+' adım</span></div>';
            html+='<div style="display:flex;gap:4px;margin-top:6px;">';
            html+='<button class="btn btn-ghost btn-sm" style="flex:1;padding:4px 8px;font-size:10px;" onclick="adminAtananRutinDuzenle(\''+esc(eKey)+'\','+i+')">✏️ Düzenle</button>';
            html+='<button class="btn btn-danger btn-sm" style="padding:4px 8px;font-size:10px;" onclick="adminAtananRutinSil(\''+esc(eKey)+'\','+i+')">🗑️ Sil</button>';
            html+='</div></div>';
        });
    }
    if(sabitler.length>0){
        html+='<div style="font-size:12px;color:var(--purple);font-weight:700;margin:12px 0 6px;">Sabitlerden Ata</div>';
        sabitler.forEach(function(r,i){
            html+='<div style="display:flex;align-items:center;gap:6px;padding:8px;background:var(--bg2);border:1px solid var(--border);border-radius:8px;margin-bottom:4px;cursor:pointer;" onclick="adminRutinAta(\''+esc(eKey)+'\','+i+')">';
            html+='<span style="font-size:14px;">🔒</span><span style="flex:1;font-size:13px;font-weight:600;">'+esc(r.ad)+'</span>';
            html+='<span style="color:var(--accent);font-size:16px;">+</span></div>';
        });
    } else html+='<p style="color:var(--text3);font-size:12px;margin-top:8px;">Sabit rutin yok. Profil → Sabit Spor Rutinleri\'nden ekleyin.</p>';
    modalAc(html);
}
window.adminUyeRutinAtaModal = adminUyeRutinAtaModal;

// Atanan rutini kişiye özel düzenle
async function adminAtananRutinDuzenle(eKey, idx){
    var uyeData=await loadUserData(eKey);
    var rutin=JSON.parse(JSON.stringify(uyeData.atananRutinler[idx]));
    if(!rutin) return;
    // Düzenleme formu aç (sabit rutinlerle aynı form ama üyeye kaydeder)
    window._atananDuzenleEKey = eKey;
    window._atananDuzenleIdx = idx;
    var html='<h3 style="color:var(--sport);margin-bottom:14px;">✏️ Atanan Rutini Düzenle <span style="font-size:11px;color:var(--text3);">(kişiye özel)</span></h3>';
    html+='<div class="form-group"><label class="form-label">Rutin Adı</label><input type="text" id="sr-ad" class="input" value="'+esc(rutin.ad)+'" maxlength="40"></div>';
    html+='<div class="form-group"><label class="form-label">Hangi Günler?</label><div class="gun-toggle" id="sr-gunler">';
    ['Pz','Pt','Sa','Ça','Pe','Cu','Ct'].forEach(function(g,i){html+='<label><input type="checkbox" value="'+i+'"'+(rutin.gunler.indexOf(i)!==-1?' checked':'')+'><span style="display:flex;align-items:center;justify-content:center;width:100%;height:100%;">'+g+'</span></label>';});
    html+='</div></div>';
    html+='<div class="form-group"><label class="form-label">Adımlar</label><div id="sr-adimlar">';
    rutin.adimlar.forEach(function(a,i){html+=sporAdimHtml(i,a);});
    html+='</div><button class="btn btn-ghost btn-sm btn-block" style="margin-top:8px;" onclick="srAdimEkle()">+ Adım Ekle</button></div>';
    html+='<div style="display:flex;gap:8px;margin-top:14px;">';
    html+='<button class="btn btn-sport btn-block" onclick="adminAtananRutinKaydet()">💾 Kaydet</button></div>';
    modalAc(html);
}
window.adminAtananRutinDuzenle = adminAtananRutinDuzenle;

async function adminAtananRutinKaydet(){
    var eKey=window._atananDuzenleEKey;
    var idx=window._atananDuzenleIdx;
    var ad=document.getElementById('sr-ad').value.trim();
    if(!ad){bildirim('⚠️ Rutin adı gerekli!','uyari');return;}
    var gunler=[];document.querySelectorAll('#sr-gunler input:checked').forEach(function(c){gunler.push(parseInt(c.value));});
    var adimlar=toplaAdimlar();
    if(adimlar.length===0){bildirim('⚠️ En az bir adım!','uyari');return;}
    yuklemeGoster();
    try{
        var uyeData=await loadUserData(eKey);
        uyeData.atananRutinler[idx].ad=ad;
        uyeData.atananRutinler[idx].gunler=gunler;
        uyeData.atananRutinler[idx].adimlar=adimlar;
        uyeData.atananRutinler[idx].kisisellestirildi=true;
        await fbYaz('users/'+eKey,uyeData);
        bildirim('✅ Güncellendi!','basari');
        adminUyeRutinAtaModal(eKey);
    }catch(e){bildirim('⚠️ Hata!','hata');}
    yuklemeGizle();
}
window.adminAtananRutinKaydet = adminAtananRutinKaydet;

async function adminRutinAta(eKey,sabitIdx){
    var sabit=G.adminData.sabitRutinler[sabitIdx];if(!sabit)return;
    yuklemeGoster();
    try{
        var uyeData=await loadUserData(eKey);
        var kopya=JSON.parse(JSON.stringify(sabit));
        kopya.id='ar_'+Date.now();
        kopya.atayanAdmin=true;
        kopya.sabitId=sabit.id; // sabit rutinin id'si (güncelleme takibi için)
        kopya.kisisellestirildi=false;
        uyeData.atananRutinler.push(kopya);
        await fbYaz('users/'+eKey,uyeData);
        bildirim('✅ Rutin atandı!','basari');adminUyeRutinAtaModal(eKey);
    }catch(e){bildirim('⚠️ Hata!','hata');}
    yuklemeGizle();
}
window.adminRutinAta = adminRutinAta;

async function adminAtananRutinSil(eKey,idx){
    if(!confirm('Atanan rutini silmek istediğinize emin misiniz?'))return;
    yuklemeGoster();
    try{
        var uyeData=await loadUserData(eKey);
        uyeData.atananRutinler.splice(idx,1);
        await fbYaz('users/'+eKey,uyeData);
        bildirim('🗑️ Silindi!','basari');adminUyeRutinAtaModal(eKey);
    }catch(e){bildirim('⚠️ Hata!','hata');}
    yuklemeGizle();
}
window.adminAtananRutinSil = adminAtananRutinSil;

async function adminUyeDiyetAtaModal(eKey){
    var uyeData=await loadUserData(eKey);
    var sabitler=G.adminData.sabitDiyetler||[];
    var atananlar=uyeData.atananDiyetler||[];
    var u=(G.adminData.uyeler||{})[eKey]||{};
    var html='<h3 style="color:var(--diet);margin-bottom:14px;">🥗 '+esc(u.ad)+' - Diyet Programları</h3>';
    if(atananlar.length>0){
        html+='<div style="font-size:12px;color:var(--accent);font-weight:700;margin-bottom:6px;">Atanan Diyetler</div>';
        atananlar.forEach(function(d,i){
            var kisiselBadge = d.kisisellestirildi ? '<span style="font-size:9px;color:var(--cyan);background:rgba(34,211,238,0.12);padding:2px 6px;border-radius:8px;font-weight:700;">✨ Kişiye Özel</span>' : '';
            html+='<div style="background:var(--bg2);border:1px solid var(--border);border-radius:8px;margin-bottom:4px;padding:8px;">';
            html+='<div style="display:flex;align-items:center;gap:6px;">';
            html+='<span style="flex:1;font-size:13px;font-weight:600;">'+esc(d.ad)+'</span>';
            html+=kisiselBadge;
            html+='<span style="font-size:10px;color:var(--text3);">'+(d.ogunler||[]).length+' öğün</span></div>';
            html+='<div style="display:flex;gap:4px;margin-top:6px;">';
            html+='<button class="btn btn-ghost btn-sm" style="flex:1;padding:4px 8px;font-size:10px;" onclick="adminAtananDiyetDuzenle(\''+esc(eKey)+'\','+i+')">✏️ Düzenle</button>';
            html+='<button class="btn btn-danger btn-sm" style="padding:4px 8px;font-size:10px;" onclick="adminAtananDiyetSil(\''+esc(eKey)+'\','+i+')">🗑️ Sil</button>';
            html+='</div></div>';
        });
    }
    if(sabitler.length>0){
        html+='<div style="font-size:12px;color:var(--purple);font-weight:700;margin:12px 0 6px;">Sabitlerden Ata</div>';
        sabitler.forEach(function(d,i){
            html+='<div style="display:flex;align-items:center;gap:6px;padding:8px;background:var(--bg2);border:1px solid var(--border);border-radius:8px;margin-bottom:4px;cursor:pointer;" onclick="adminDiyetAta(\''+esc(eKey)+'\','+i+')">';
            html+='<span style="font-size:14px;">🔒</span><span style="flex:1;font-size:13px;font-weight:600;">'+esc(d.ad)+'</span>';
            html+='<span style="color:var(--accent);font-size:16px;">+</span></div>';
        });
    } else html+='<p style="color:var(--text3);font-size:12px;margin-top:8px;">Sabit diyet yok.</p>';
    modalAc(html);
}
window.adminUyeDiyetAtaModal = adminUyeDiyetAtaModal;

// Atanan diyeti kişiye özel düzenle
async function adminAtananDiyetDuzenle(eKey, idx){
    var uyeData=await loadUserData(eKey);
    var prog=JSON.parse(JSON.stringify(uyeData.atananDiyetler[idx]));
    if(!prog) return;
    window._atananDiyetDuzenleEKey = eKey;
    window._atananDiyetDuzenleIdx = idx;
    var html='<h3 style="color:var(--diet);margin-bottom:14px;">✏️ Atanan Diyeti Düzenle <span style="font-size:11px;color:var(--text3);">(kişiye özel)</span></h3>';
    html+=diyetFormHtml(prog);
    html+='<div style="display:flex;gap:8px;margin-top:14px;">';
    html+='<button class="btn btn-diet btn-block" onclick="adminAtananDiyetKaydet()">💾 Kaydet</button></div>';
    modalAc(html);
    window._dpOgunler=JSON.parse(JSON.stringify(prog.ogunler||[]));
}
window.adminAtananDiyetDuzenle = adminAtananDiyetDuzenle;

async function adminAtananDiyetKaydet(){
    var eKey=window._atananDiyetDuzenleEKey;
    var idx=window._atananDiyetDuzenleIdx;
    var ad=document.getElementById('dp-ad').value.trim();
    if(!ad){bildirim('⚠️ Program adı gerekli!','uyari');return;}
    var gunler=[];document.querySelectorAll('#dp-gunler input:checked').forEach(function(c){gunler.push(parseInt(c.value));});
    yuklemeGoster();
    try{
        var uyeData=await loadUserData(eKey);
        uyeData.atananDiyetler[idx].ad=ad;
        uyeData.atananDiyetler[idx].gunler=gunler;
        uyeData.atananDiyetler[idx].ogunler=window._dpOgunler;
        uyeData.atananDiyetler[idx].kisisellestirildi=true;
        await fbYaz('users/'+eKey,uyeData);
        bildirim('✅ Güncellendi!','basari');
        adminUyeDiyetAtaModal(eKey);
    }catch(e){bildirim('⚠️ Hata!','hata');}
    yuklemeGizle();
}
window.adminAtananDiyetKaydet = adminAtananDiyetKaydet;

async function adminDiyetAta(eKey,sabitIdx){
    var sabit=G.adminData.sabitDiyetler[sabitIdx];if(!sabit)return;
    yuklemeGoster();
    try{
        var uyeData=await loadUserData(eKey);
        var kopya=JSON.parse(JSON.stringify(sabit));
        kopya.id='ad_'+Date.now();
        kopya.atayanAdmin=true;
        kopya.sabitId=sabit.id;
        kopya.kisisellestirildi=false;
        uyeData.atananDiyetler.push(kopya);
        await fbYaz('users/'+eKey,uyeData);
        bildirim('✅ Diyet atandı!','basari');adminUyeDiyetAtaModal(eKey);
    }catch(e){bildirim('⚠️ Hata!','hata');}
    yuklemeGizle();
}
window.adminDiyetAta = adminDiyetAta;

async function adminAtananDiyetSil(eKey,idx){
    if(!confirm('Atanan diyeti silmek istediğinize emin misiniz?'))return;
    yuklemeGoster();
    try{
        var uyeData=await loadUserData(eKey);
        uyeData.atananDiyetler.splice(idx,1);
        await fbYaz('users/'+eKey,uyeData);
        bildirim('🗑️ Silindi!','basari');adminUyeDiyetAtaModal(eKey);
    }catch(e){bildirim('⚠️ Hata!','hata');}
    yuklemeGizle();
}
window.adminAtananDiyetSil = adminAtananDiyetSil;

// ══════════════════════════════════════════════════════════
// ADMİN: SABİT RUTİN/DİYET YÖNETİMİ
// ══════════════════════════════════════════════════════════
function adminRutinYonetModal(){
    if(!G.isAdmin)return;
    var rutinler=G.adminData.sabitRutinler;
    var html='<h3 style="color:var(--sport);margin-bottom:14px;">📋 Sabit Spor Rutinleri</h3>';
    if(rutinler.length===0) html+='<p style="color:var(--text3);font-size:13px;">Henüz sabit rutin yok.</p>';
    else rutinler.forEach(function(r,i){
        html+='<div style="background:var(--bg2);border:1px solid var(--border);border-radius:8px;margin-bottom:6px;padding:10px;">';
        html+='<div style="display:flex;align-items:center;gap:8px;">';
        html+='<span>🔒</span><span style="flex:1;font-weight:600;font-size:14px;">'+esc(r.ad)+'</span>';
        html+='<span style="font-size:11px;color:var(--text3);">'+r.adimlar.length+' adım</span></div>';
        html+='<div style="display:flex;gap:6px;margin-top:8px;">';
        html+='<button class="btn btn-ghost btn-sm" style="flex:1;" onclick="modalKapat();setTimeout(function(){adminRutinDuzenle('+i+');},200);">✏️ Düzenle</button>';
        html+='<button class="btn btn-ghost btn-sm" style="flex:1;" onclick="adminSabitRutinKopyala('+i+')">📋 Kopyala</button>';
        html+='<button class="btn btn-danger btn-sm" style="padding:8px 10px;" onclick="adminSabitRutinSil('+i+')">🗑️</button>';
        html+='</div></div>';
    });
    html+='<button class="btn btn-sport btn-block" style="margin-top:12px;" onclick="modalKapat();setTimeout(function(){adminRutinDuzenle();},200);">+ Yeni Sabit Rutin</button>';
    modalAc(html);
}
window.adminRutinYonetModal = adminRutinYonetModal;

function adminRutinDuzenle(editIdx){
    var rutin=editIdx!==undefined?JSON.parse(JSON.stringify(G.adminData.sabitRutinler[editIdx])):{id:'ar_'+Date.now(),ad:'',gunler:[],adimlar:[{egzersizId:'yuruyus',kategoriId:'kardiyo',ad:'Yürüyüş',sure:5,mola:2,met:4.3,tipiZaman:true,paramValues:{sure:5},digerAd:'',notlar:''}]};
    var baslik=editIdx!==undefined?'Sabit Rutini Düzenle':'Yeni Sabit Rutin';
    var html='<h3 style="color:var(--sport);margin-bottom:14px;">🔒 '+baslik+'</h3>';
    html+='<div class="form-group"><label class="form-label">Rutin Adı</label><input type="text" id="sr-ad" class="input" value="'+esc(rutin.ad)+'" placeholder="Örn: Başlangıç" maxlength="40"></div>';
    html+='<div class="form-group"><label class="form-label">Hangi Günler?</label><div class="gun-toggle" id="sr-gunler">';
    ['Pz','Pt','Sa','Ça','Pe','Cu','Ct'].forEach(function(g,i){html+='<label><input type="checkbox" value="'+i+'"'+(rutin.gunler.indexOf(i)!==-1?' checked':'')+'><span style="display:flex;align-items:center;justify-content:center;width:100%;height:100%;">'+g+'</span></label>';});
    html+='</div></div>';
    html+='<div class="form-group"><label class="form-label">Adımlar</label><div id="sr-adimlar">';
    rutin.adimlar.forEach(function(a,i){html+=sporAdimHtml(i,a);});
    html+='</div><button class="btn btn-ghost btn-sm btn-block" style="margin-top:8px;" onclick="srAdimEkle()">+ Adım Ekle</button></div>';
    html+='<div style="display:flex;gap:8px;margin-top:14px;">';
    if(editIdx!==undefined) html+='<button class="btn btn-danger btn-sm" onclick="adminSabitRutinSil('+editIdx+')">🗑️ Sil</button>';
    html+='<button class="btn btn-sport btn-block" onclick="adminSabitRutinKaydet('+(editIdx!==undefined?editIdx:-1)+')">💾 Kaydet</button></div>';
    modalAc(html);
}
window.adminRutinDuzenle = adminRutinDuzenle;

async function adminSabitRutinKaydet(editIdx){
    var ad=document.getElementById('sr-ad').value.trim();
    if(!ad){bildirim('⚠️ Rutin adı gerekli!','uyari');return;}
    var gunler=[];document.querySelectorAll('#sr-gunler input:checked').forEach(function(c){gunler.push(parseInt(c.value));});
    var adimlar=toplaAdimlar();
    if(adimlar.length===0){bildirim('⚠️ En az bir adım gerekli!','uyari');return;}
    if(editIdx>=0){G.adminData.sabitRutinler[editIdx].ad=ad;G.adminData.sabitRutinler[editIdx].gunler=gunler;G.adminData.sabitRutinler[editIdx].adimlar=adimlar;}
    else G.adminData.sabitRutinler.push({id:'ar_'+Date.now(),ad:ad,gunler:gunler,adimlar:adimlar});
    yuklemeGoster();
    try{await fbYaz('admin',G.adminData);bildirim('✅ Kaydedildi!','basari');adminRutinYonetModal();}
    catch(e){bildirim('⚠️ Hata!','hata');}
    yuklemeGizle();
}
window.adminSabitRutinKaydet = adminSabitRutinKaydet;

function adminSabitRutinKopyala(idx){
    var orijinal = G.adminData.sabitRutinler[idx];
    if(!orijinal) return;
    // Kopyasını oluştur, yeni id ve isimle düzenleme modunda aç
    var kopya = JSON.parse(JSON.stringify(orijinal));
    kopya.id = 'ar_' + Date.now();
    kopya.ad = kopya.ad + ' (Kopya)';
    // adminRutinDuzenle'yi -1 (yeni) modunda aç ama kopya verisiyle
    modalKapat();
    setTimeout(function(){ adminRutinDuzenleKopya(kopya); }, 200);
}
window.adminSabitRutinKopyala = adminSabitRutinKopyala;

function adminRutinDuzenleKopya(rutin){
    var html='<h3 style="color:var(--sport);margin-bottom:14px;">🔒 Kopyadan Yeni Rutin</h3>';
    html+='<div class="form-group"><label class="form-label">Rutin Adı</label><input type="text" id="sr-ad" class="input" value="'+esc(rutin.ad)+'" placeholder="Örn: Başlangıç" maxlength="40"></div>';
    html+='<div class="form-group"><label class="form-label">Hangi Günler?</label><div class="gun-toggle" id="sr-gunler">';
    ['Pz','Pt','Sa','Ça','Pe','Cu','Ct'].forEach(function(g,i){html+='<label><input type="checkbox" value="'+i+'"'+(rutin.gunler.indexOf(i)!==-1?' checked':'')+'><span style="display:flex;align-items:center;justify-content:center;width:100%;height:100%;">'+g+'</span></label>';});
    html+='</div></div>';
    html+='<div class="form-group"><label class="form-label">Adımlar</label><div id="sr-adimlar">';
    rutin.adimlar.forEach(function(a,i){html+=sporAdimHtml(i,a);});
    html+='</div><button class="btn btn-ghost btn-sm btn-block" style="margin-top:8px;" onclick="srAdimEkle()">+ Adım Ekle</button></div>';
    html+='<div style="display:flex;gap:8px;margin-top:14px;">';
    html+='<button class="btn btn-sport btn-block" onclick="adminSabitRutinKaydet(-1)">💾 Yeni Olarak Kaydet</button></div>';
    modalAc(html);
}
window.adminRutinDuzenleKopya = adminRutinDuzenleKopya;

async function adminSabitRutinSil(idx){
    if(!confirm('Silmek istediğinize emin misiniz?'))return;
    G.adminData.sabitRutinler.splice(idx,1);yuklemeGoster();
    try{await fbYaz('admin',G.adminData);bildirim('🗑️ Silindi!','basari');adminRutinYonetModal();}catch(e){bildirim('⚠️ Hata!','hata');}
    yuklemeGizle();
}
window.adminSabitRutinSil = adminSabitRutinSil;

function adminDiyetYonetModal(){
    if(!G.isAdmin)return;
    var diyetler=G.adminData.sabitDiyetler;
    var html='<h3 style="color:var(--diet);margin-bottom:14px;">🥗 Sabit Diyet Programları</h3>';
    if(diyetler.length===0) html+='<p style="color:var(--text3);font-size:13px;">Henüz sabit diyet yok.</p>';
    else diyetler.forEach(function(d,i){
        html+='<div style="background:var(--bg2);border:1px solid var(--border);border-radius:8px;margin-bottom:6px;padding:10px;">';
        html+='<div style="display:flex;align-items:center;gap:8px;">';
        html+='<span>🔒</span><span style="flex:1;font-weight:600;font-size:14px;">'+esc(d.ad)+'</span>';
        html+='<span style="font-size:11px;color:var(--text3);">'+(d.ogunler||[]).length+' öğün</span></div>';
        html+='<div style="display:flex;gap:6px;margin-top:8px;">';
        html+='<button class="btn btn-ghost btn-sm" style="flex:1;" onclick="modalKapat();setTimeout(function(){adminSabitDiyetDuzenle('+i+');},200);">✏️ Düzenle</button>';
        html+='<button class="btn btn-ghost btn-sm" style="flex:1;" onclick="adminSabitDiyetKopyala('+i+')">📋 Kopyala</button>';
        html+='<button class="btn btn-danger btn-sm" style="padding:8px 10px;" onclick="adminSabitDiyetSil('+i+')">🗑️</button>';
        html+='</div></div>';
    });
    html+='<button class="btn btn-diet btn-block" style="margin-top:12px;" onclick="modalKapat();setTimeout(function(){adminSabitDiyetDuzenle();},200);">+ Yeni Sabit Diyet</button>';
    modalAc(html);
}
window.adminDiyetYonetModal = adminDiyetYonetModal;

function adminSabitDiyetKopyala(idx){
    var orijinal = G.adminData.sabitDiyetler[idx];
    if(!orijinal) return;
    var kopya = JSON.parse(JSON.stringify(orijinal));
    kopya.id = 'ad_' + Date.now();
    kopya.ad = kopya.ad + ' (Kopya)';
    modalKapat();
    setTimeout(function(){ adminSabitDiyetDuzenleKopya(kopya); }, 200);
}
window.adminSabitDiyetKopyala = adminSabitDiyetKopyala;

function adminSabitDiyetDuzenleKopya(prog){
    var html='<h3 style="color:var(--diet);margin-bottom:14px;">🔒 Kopyadan Yeni Diyet</h3>';
    html+=diyetFormHtml(prog);
    html+='<div style="display:flex;gap:8px;margin-top:14px;">';
    html+='<button class="btn btn-diet btn-block" onclick="adminSabitDiyetKaydet(-1)">💾 Yeni Olarak Kaydet</button></div>';
    modalAc(html);
    window._dpOgunler=JSON.parse(JSON.stringify(prog.ogunler||[]));
}
window.adminSabitDiyetDuzenleKopya = adminSabitDiyetDuzenleKopya;

function adminSabitDiyetDuzenle(editIdx){
    var prog=editIdx!==undefined?JSON.parse(JSON.stringify(G.adminData.sabitDiyetler[editIdx])):{id:'ad_'+Date.now(),ad:'',gunler:[],ogunler:OGUN_TIPLERI.map(function(t){return{tip:t,yiyecekler:[]};})};
    var baslik=editIdx!==undefined?'Sabit Diyeti Düzenle':'Yeni Sabit Diyet';
    var html='<h3 style="color:var(--diet);margin-bottom:14px;">🔒 '+baslik+'</h3>';
    html+=diyetFormHtml(prog);
    html+='<div style="display:flex;gap:8px;margin-top:14px;">';
    if(editIdx!==undefined) html+='<button class="btn btn-danger btn-sm" onclick="adminSabitDiyetSil('+editIdx+')">🗑️ Sil</button>';
    html+='<button class="btn btn-diet btn-block" onclick="adminSabitDiyetKaydet('+(editIdx!==undefined?editIdx:-1)+')">💾 Kaydet</button></div>';
    modalAc(html);
    window._dpOgunler=JSON.parse(JSON.stringify(prog.ogunler||[]));
}
window.adminSabitDiyetDuzenle = adminSabitDiyetDuzenle;

async function adminSabitDiyetKaydet(editIdx){
    var ad=document.getElementById('dp-ad').value.trim();
    if(!ad){bildirim('⚠️ Program adı gerekli!','uyari');return;}
    var gunler=[];document.querySelectorAll('#dp-gunler input:checked').forEach(function(c){gunler.push(parseInt(c.value));});
    if(editIdx>=0){G.adminData.sabitDiyetler[editIdx].ad=ad;G.adminData.sabitDiyetler[editIdx].gunler=gunler;G.adminData.sabitDiyetler[editIdx].ogunler=window._dpOgunler;}
    else G.adminData.sabitDiyetler.push({id:'ad_'+Date.now(),ad:ad,gunler:gunler,ogunler:window._dpOgunler});
    yuklemeGoster();
    try{await fbYaz('admin',G.adminData);bildirim('✅ Kaydedildi!','basari');adminDiyetYonetModal();}
    catch(e){bildirim('⚠️ Hata!','hata');}
    yuklemeGizle();
}
window.adminSabitDiyetKaydet = adminSabitDiyetKaydet;

async function adminSabitDiyetSil(idx){
    if(!confirm('Silmek istediğinize emin misiniz?'))return;
    G.adminData.sabitDiyetler.splice(idx,1);yuklemeGoster();
    try{await fbYaz('admin',G.adminData);bildirim('🗑️ Silindi!','basari');adminDiyetYonetModal();}catch(e){bildirim('⚠️ Hata!','hata');}
    yuklemeGizle();
}
window.adminSabitDiyetSil = adminSabitDiyetSil;

// ══════════════════════════════════════════════════════════
// ANA SAYFA
// ══════════════════════════════════════════════════════════
export function anaSayfaRender(){
    var d=getAktifData();if(!d)return;
    var now=new Date();
    document.getElementById('ana-tarih').textContent=String(now.getDate()).padStart(2,'0')+' '+AY_ADI[now.getMonth()]+' '+now.getFullYear()+' - '+GUN_UZUN[now.getDay()];
    haftaSeritRender(bugunStr());
    bugunKartRender(bugunStr());
}

function haftaSeritRender(seciliTarih){
    var html='';var now=new Date();
    for(var i=-3;i<=10;i++){
        var d=new Date(now);d.setDate(now.getDate()+i);
        var ds=d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');
        var cls='hafta-gun';
        if(ds===seciliTarih)cls+=' secili';
        if(ds===bugunStr())cls+=' bugun';
        if(d<new Date(bugunStr()))cls+=' gecmis';
        var gunIdx=d.getDay();
        var dotHtml=gunDotHtml(ds);
        html+='<div class="'+cls+'" onclick="gunSec(\''+ds+'\')">';
        html+='<div class="hg-gun">'+GUN_ADI[gunIdx]+'</div><div class="hg-num">'+d.getDate()+'</div><div class="hg-dot">'+dotHtml+'</div></div>';
    }
    document.getElementById('hafta-serit').innerHTML=html;
}

function gunDotHtml(tarih){
    var dots='';var gunIdx=new Date(tarih).getDay();var sporVar=false,diyetVar=false;
    var d=getAktifData();
    (d.sporRutinleri||[]).forEach(function(r){if(r.gunler&&r.gunler.indexOf(gunIdx)!==-1)sporVar=true;});
    getAtananRutinler().forEach(function(r){if(r.gunler&&r.gunler.indexOf(gunIdx)!==-1)sporVar=true;});
    (d.diyetProgramlari||[]).forEach(function(dd){if(dd.gunler&&dd.gunler.indexOf(gunIdx)!==-1)diyetVar=true;});
    getAtananDiyetler().forEach(function(dd){if(dd.gunler&&dd.gunler.indexOf(gunIdx)!==-1)diyetVar=true;});
    if(sporVar)dots+='<span style="background:var(--sport);"></span>';
    if(diyetVar)dots+='<span style="background:var(--diet);"></span>';
    return dots;
}

function gunSec(tarih){haftaSeritRender(tarih);bugunKartRender(tarih);}
window.gunSec = gunSec;

function bugunKartRender(tarih){
    var d=getAktifData();if(!d)return;
    var html='';var gunIdx=new Date(tarih).getDay();
    // Atanan rutinler
    getAtananRutinler().forEach(function(r,ri){
        if(r.gunler&&r.gunler.indexOf(gunIdx)!==-1){
            var oturum=sporOturumuBul(tarih,r.id);var ok=oturum&&oturum.tamamlandi;
            var oc=G.readonlyMode?'':'onclick="sporRutiniSecAtanan('+ri+',\''+tarih+'\')"';
            html+='<div class="bugun-kart" '+oc+'><div class="bk-header"><span class="bk-icon">💪</span><span class="bk-title">'+esc(r.ad)+'</span><span class="bk-badge bk-badge-lock">🔒</span><span class="bk-badge bk-badge-sport">'+(ok?'✅':'⏳')+'</span></div>';
            html+='<div class="bk-steps">'+r.adimlar.length+' adım • '+toplamSureDk(r)+' dk • 🔥 ~'+toplamKaloriRutin(r)+' kcal</div>';
            if(ok) html+='<div class="bk-progress"><div class="bk-progress-fill" style="width:100%;background:var(--green);"></div></div>';
            html+='</div>';
        }
    });
    // Kendi rutinleri
    (d.sporRutinleri||[]).forEach(function(r,ri){
        if(r.gunler&&r.gunler.indexOf(gunIdx)!==-1){
            var oturum=sporOturumuBul(tarih,r.id);var ok=oturum&&oturum.tamamlandi;
            var oc=G.readonlyMode?'':'onclick="sporRutiniSec('+ri+',\''+tarih+'\')"';
            html+='<div class="bugun-kart" '+oc+'><div class="bk-header"><span class="bk-icon">💪</span><span class="bk-title">'+esc(r.ad)+'</span><span class="bk-badge bk-badge-sport">'+(ok?'✅':'⏳')+'</span></div>';
            html+='<div class="bk-steps">'+r.adimlar.length+' adım • '+toplamSureDk(r)+' dk • 🔥 ~'+toplamKaloriRutin(r)+' kcal</div>';
            if(ok) html+='<div class="bk-progress"><div class="bk-progress-fill" style="width:100%;background:var(--green);"></div></div>';
            html+='</div>';
        }
    });
    // Atanan diyetler
    getAtananDiyetler().forEach(function(dd,di){
        if(dd.gunler&&dd.gunler.indexOf(gunIdx)!==-1){
            var kayit=diyetKayitBul(tarih,dd.id);var toplam=(dd.ogunler||[]).length;
            var tamam=kayit?Object.keys(kayit.tamamlanan||{}).filter(function(k){return kayit.tamamlanan[k];}).length:0;
            var oc=G.readonlyMode?'':'onclick="diyetDetayModalAtanan('+di+',\''+tarih+'\')"';
            html+='<div class="bugun-kart" '+oc+'><div class="bk-header"><span class="bk-icon">🥗</span><span class="bk-title">'+esc(dd.ad)+'</span><span class="bk-badge bk-badge-lock">🔒</span><span class="bk-badge bk-badge-diet">'+(tamam>=toplam&&toplam>0?'✅':tamam+'/'+toplam)+'</span></div>';
            if(toplam>0) html+='<div class="bk-progress"><div class="bk-progress-fill" style="width:'+Math.round((tamam/toplam)*100)+'%;background:var(--diet);"></div></div>';
            html+='</div>';
        }
    });
    // Kendi diyetleri
    (d.diyetProgramlari||[]).forEach(function(dd,di){
        if(dd.gunler&&dd.gunler.indexOf(gunIdx)!==-1){
            var kayit=diyetKayitBul(tarih,dd.id);var toplam=(dd.ogunler||[]).length;
            var tamam=kayit?Object.keys(kayit.tamamlanan||{}).filter(function(k){return kayit.tamamlanan[k];}).length:0;
            var oc=G.readonlyMode?'':'onclick="diyetDetayModal('+di+',\''+tarih+'\')"';
            html+='<div class="bugun-kart" '+oc+'><div class="bk-header"><span class="bk-icon">🥗</span><span class="bk-title">'+esc(dd.ad)+'</span><span class="bk-badge bk-badge-diet">'+(tamam>=toplam&&toplam>0?'✅':tamam+'/'+toplam)+'</span></div>';
            if(toplam>0) html+='<div class="bk-progress"><div class="bk-progress-fill" style="width:'+Math.round((tamam/toplam)*100)+'%;background:var(--diet);"></div></div>';
            html+='</div>';
        }
    });
    if(!html) html='<div style="text-align:center;color:var(--text3);padding:30px;font-size:13px;">Bu gün için plan yok.</div>';
    document.getElementById('bugun-kartlar').innerHTML=html;
}

// ══════════════════════════════════════════════════════════
// SPOR RUTİNİ OLUŞTUR/DÜZENLE (Kullanıcı)
// ══════════════════════════════════════════════════════════
export function sporAdimHtml(idx,a){
    var selKatId=a.kategoriId||'kardiyo';var selEgzId=a.egzersizId||'yuruyus';
    var egz=egzersizBul(selEgzId);var d=getAktifData();
    var kiloKg=(d&&d.profil)?d.profil.kilo||70:70;
    var tahminiKcal=hesaplaKaloriAdim(a,kiloKg);
    var h='<div class="adim-item" data-idx="'+idx+'">';
    h+='<button class="adim-sil" onclick="this.parentElement.remove()">✕</button>';
    h+='<div class="adim-row1"><select class="adim-kategori-sel" onchange="srKategoriDeg(this,'+idx+')">';
    SPOR_KATEGORILERI.forEach(function(kat){h+='<option value="'+kat.id+'"'+(kat.id===selKatId?' selected':'')+'>'+kat.ad+'</option>';});
    h+='</select><select class="adim-egz-sel" onchange="srEgzDeg(this,'+idx+')">';
    var kat=SPOR_KATEGORILERI.find(function(k){return k.id===selKatId;});
    if(kat) kat.egzersizler.forEach(function(e){h+='<option value="'+e.id+'"'+(e.id===selEgzId?' selected':'')+'>'+e.ad+'</option>';});
    h+='</select></div>';
    if(selEgzId==='diger') h+='<div class="adim-row1"><input class="adim-diger-ad input" placeholder="Egzersiz adı..." value="'+esc(a.digerAd||'')+'"></div>';
    var params=egz?egz.params:['sure'];var pv=a.paramValues||{};
    // Mesafe otomatik hesapla (süre × hız)
    var otomatikMesafe = false;
    if(params.indexOf('mesafe_km')!==-1 && params.indexOf('hiz_kmsa')!==-1) otomatikMesafe = 'km';
    if(params.indexOf('mesafe_m')!==-1 && params.indexOf('sure')!==-1 && !otomatikMesafe) otomatikMesafe = 'm';
    h+='<div class="adim-params">';
    params.forEach(function(p){
        var val=pv[p]!==undefined?pv[p]:(PARAM_DEFAULTS[p]||0);
        // mesafe_km: süre ve hız varsa otomatik hesapla, readonly göster
        if(p==='mesafe_km' && otomatikMesafe==='km'){
            var sureDk=pv['sure']||PARAM_DEFAULTS['sure']||5;
            var hiz=pv['hiz_kmsa']||PARAM_DEFAULTS['hiz_kmsa']||5;
            var hesap=((hiz*sureDk)/60).toFixed(2);
            h+='<div class="adim-param-group" style="background:rgba(16,185,129,0.1);border-color:var(--accent-d);"><label style="color:var(--accent);">Mesafe</label><input type="text" data-param="'+p+'" value="'+hesap+'" readonly style="color:var(--accent);font-weight:700;opacity:1;"><span>km</span></div>';
        } else {
            h+='<div class="adim-param-group"><label>'+PARAM_LABELS[p]+'</label><input type="number" data-param="'+p+'" value="'+val+'" step="'+(PARAM_STEPS[p]||1)+'" min="0" onchange="srParamDeg('+idx+')"><span>'+PARAM_UNITS[p]+'</span></div>';
        }
    });
    var molaVal=a.mola!==undefined?a.mola:1;
    h+='<div class="adim-param-group"><label>Mola</label><input type="number" data-param="mola" value="'+molaVal+'" step="1" min="0"><span>dk</span></div>';
    h+='<div class="adim-kalori-badge" id="adim-kcal-'+idx+'">🔥 ~'+tahminiKcal+' kcal</div></div>';
    h+='<input class="adim-not-input" placeholder="📝 Not ekle (opsiyonel)" value="'+esc(a.notlar||'')+'">';
    h+='</div>';
    return h;
}

function srAdimEkle(){
    var c=document.getElementById('sr-adimlar');
    c.insertAdjacentHTML('beforeend',sporAdimHtml(c.children.length,{egzersizId:'yuruyus',kategoriId:'kardiyo',ad:'Yürüyüş',sure:5,mola:1,met:4.3,tipiZaman:true,paramValues:{sure:5},digerAd:''}));
}
window.srAdimEkle = srAdimEkle;

function srKategoriDeg(sel,idx){
    var kat=SPOR_KATEGORILERI.find(function(k){return k.id===sel.value;});if(!kat)return;
    var egzSel=sel.parentElement.querySelector('.adim-egz-sel');
    var h='';kat.egzersizler.forEach(function(e,i){h+='<option value="'+e.id+'"'+(i===0?' selected':'')+'>'+e.ad+'</option>';});
    egzSel.innerHTML=h;srEgzDeg(egzSel,idx);
}
window.srKategoriDeg = srKategoriDeg;

function srEgzDeg(sel,idx){
    var egz=egzersizBul(sel.value);if(!egz)return;
    var el=sel.closest('.adim-item');var katSel=el.querySelector('.adim-kategori-sel');
    var molaInput=el.querySelector('[data-param="mola"]');var molaVal=molaInput?parseInt(molaInput.value)||1:1;
    var pv={};egz.params.forEach(function(p){pv[p]=PARAM_DEFAULTS[p]||0;});
    el.outerHTML=sporAdimHtml(idx,{egzersizId:sel.value,kategoriId:katSel.value,ad:egz.ad,met:egz.met,tipiZaman:egz.tipiZaman,paramValues:pv,mola:molaVal,digerAd:''});
}
window.srEgzDeg = srEgzDeg;

function srParamDeg(idx){
    var el=document.querySelectorAll('#sr-adimlar .adim-item')[idx];if(!el)return;
    var egz=egzersizBul(el.querySelector('.adim-egz-sel').value);if(!egz)return;
    var d=getAktifData();var kiloKg=(d&&d.profil)?d.profil.kilo||70:70;
    var pv={};el.querySelectorAll('[data-param]').forEach(function(inp){if(inp.dataset.param!=='mola'){var v=parseFloat(inp.value)||0;pv[inp.dataset.param]=v;}});
    // Mesafe otomatik hesapla
    if(egz.params.indexOf('mesafe_km')!==-1 && egz.params.indexOf('hiz_kmsa')!==-1){
        var sureDk=pv.sure||5; var hiz=pv.hiz_kmsa||5;
        var mesafeKm=((hiz*sureDk)/60).toFixed(2);
        var mesafeInput=el.querySelector('[data-param="mesafe_km"]');
        if(mesafeInput) mesafeInput.value=mesafeKm;
        pv.mesafe_km=parseFloat(mesafeKm);
    }
    // Kalori hesapla
    var sureDk=egz.tipiZaman?(pv.sure||5):((pv.set||4)*(pv.tekrar||12)*3.5+(pv.set||4)*(pv.dinlenme_sn||60))/60;
    var badge=el.querySelector('.adim-kalori-badge');
    if(badge) badge.textContent='🔥 ~'+Math.round(egz.met*3.5*kiloKg/200*sureDk)+' kcal';
}
window.srParamDeg = srParamDeg;

export function toplaAdimlar(){
    var adimlar=[];
    document.querySelectorAll('#sr-adimlar .adim-item').forEach(function(el){
        var egzId=el.querySelector('.adim-egz-sel').value;var katId=el.querySelector('.adim-kategori-sel').value;
        var egz=egzersizBul(egzId);var digerAdInput=el.querySelector('.adim-diger-ad');
        var digerAd=digerAdInput?digerAdInput.value.trim():'';
        var notInput=el.querySelector('.adim-not-input');var notlar=notInput?notInput.value.trim():'';
        var adimAd=egz?egz.ad:(digerAd||'Diğer');if(egzId==='diger'&&digerAd)adimAd=digerAd;
        var pv={};var sureDk=5;var molaVal=1;
        el.querySelectorAll('[data-param]').forEach(function(inp){var p=inp.dataset.param;var v=parseFloat(inp.value)||0;if(p==='mola')molaVal=v;else pv[p]=v;});
        if(egz&&egz.tipiZaman) sureDk=pv.sure||5;
        else{var s=pv.set||4;var t=pv.tekrar||12;var d=pv.dinlenme_sn||60;sureDk=Math.ceil(((s*t*3.5)+(s*d))/60);}
        adimlar.push({ad:adimAd,egzersizId:egzId,kategoriId:katId,met:egz?egz.met:5.0,tipiZaman:egz?egz.tipiZaman:true,sure:sureDk,mola:molaVal,paramValues:pv,digerAd:digerAd,notlar:notlar});
    });
    return adimlar;
}

function sporRutiniModal(editIdx){
    if(G.readonlyMode)return;
    var rutin=editIdx!==undefined?JSON.parse(JSON.stringify(G.userData.sporRutinleri[editIdx])):{id:'sr_'+Date.now(),ad:'',gunler:[],adimlar:[{egzersizId:'yuruyus',kategoriId:'kardiyo',ad:'Yürüyüş',sure:5,mola:2,met:4.3,tipiZaman:true,paramValues:{sure:5},digerAd:''}]};
    var baslik=editIdx!==undefined?'Rutini Düzenle':'Yeni Spor Rutini';
    var html='<h3 style="color:var(--sport);margin-bottom:14px;">💪 '+baslik+'</h3>';
    html+='<div class="form-group"><label class="form-label">Rutin Adı</label><input type="text" id="sr-ad" class="input" value="'+esc(rutin.ad)+'" placeholder="Örn: Full Body" maxlength="40"></div>';
    html+='<div class="form-group"><label class="form-label">Hangi Günler?</label><div class="gun-toggle" id="sr-gunler">';
    ['Pz','Pt','Sa','Ça','Pe','Cu','Ct'].forEach(function(g,i){html+='<label><input type="checkbox" value="'+i+'"'+(rutin.gunler.indexOf(i)!==-1?' checked':'')+'><span style="display:flex;align-items:center;justify-content:center;width:100%;height:100%;">'+g+'</span></label>';});
    html+='</div></div>';
    html+='<div class="form-group"><label class="form-label">Adımlar</label><div id="sr-adimlar">';
    rutin.adimlar.forEach(function(a,i){html+=sporAdimHtml(i,a);});
    html+='</div><button class="btn btn-ghost btn-sm btn-block" style="margin-top:8px;" onclick="srAdimEkle()">+ Adım Ekle</button></div>';
    html+='<div style="display:flex;gap:8px;margin-top:14px;">';
    if(editIdx!==undefined) html+='<button class="btn btn-danger btn-sm" onclick="sporRutiniSil('+editIdx+')">🗑️ Sil</button>';
    html+='<button class="btn btn-sport btn-block" onclick="sporRutiniKaydet('+(editIdx!==undefined?editIdx:-1)+')">💾 Kaydet</button></div>';
    modalAc(html);
}
window.sporRutiniModal = sporRutiniModal;

async function sporRutiniKaydet(editIdx){
    var ad=document.getElementById('sr-ad').value.trim();if(!ad){bildirim('⚠️ Rutin adı gerekli!','uyari');return;}
    var gunler=[];document.querySelectorAll('#sr-gunler input:checked').forEach(function(c){gunler.push(parseInt(c.value));});
    var adimlar=toplaAdimlar();if(adimlar.length===0){bildirim('⚠️ En az bir adım!','uyari');return;}
    if(editIdx>=0){G.userData.sporRutinleri[editIdx].ad=ad;G.userData.sporRutinleri[editIdx].gunler=gunler;G.userData.sporRutinleri[editIdx].adimlar=adimlar;}
    else G.userData.sporRutinleri.push({id:'sr_'+Date.now(),ad:ad,gunler:gunler,adimlar:adimlar});
    yuklemeGoster();
    try{await fbYazUye(emailKey(G.currentUser),G.userData);bildirim('✅ Kaydedildi!','basari');modalKapat();anaSayfaRender();}
    catch(e){bildirim('⚠️ Hata!','hata');}yuklemeGizle();
}
window.sporRutiniKaydet = sporRutiniKaydet;

async function sporRutiniSil(idx){
    if(!confirm('Silmek istediğinize emin misiniz?'))return;
    G.userData.sporRutinleri.splice(idx,1);yuklemeGoster();
    try{await fbYazUye(emailKey(G.currentUser),G.userData);bildirim('🗑️ Silindi!','basari');modalKapat();anaSayfaRender();}
    catch(e){bildirim('⚠️ Hata!','hata');}yuklemeGizle();
}
window.sporRutiniSil = sporRutiniSil;

function sporYonetModal(){
    var html='<h3 style="color:var(--sport);margin-bottom:14px;">💪 Spor Rutinleri</h3>';
    if(!G.userData.sporRutinleri||G.userData.sporRutinleri.length===0) html+='<p style="color:var(--text3);font-size:13px;">Henüz rutin yok.</p>';
    else G.userData.sporRutinleri.forEach(function(r,i){
        html+='<div style="display:flex;align-items:center;gap:8px;padding:10px;background:var(--bg2);border:1px solid var(--border);border-radius:8px;margin-bottom:6px;cursor:pointer;" onclick="modalKapat();setTimeout(function(){sporRutiniModal('+i+');},200);">';
        html+='<span>💪</span><span style="flex:1;font-weight:600;font-size:14px;">'+esc(r.ad)+'</span>';
        html+='<span style="font-size:11px;color:var(--text3);">'+r.adimlar.length+' adım</span><span style="color:var(--text3);">›</span></div>';
    });
    html+='<button class="btn btn-sport btn-block" style="margin-top:12px;" onclick="modalKapat();setTimeout(sporRutiniModal,200);">+ Yeni Rutin</button>';
    modalAc(html);
}
window.sporYonetModal = sporYonetModal;

// ══════════════════════════════════════════════════════════
// DİYET PROGRAMI (Kullanıcı)
// ══════════════════════════════════════════════════════════
function diyetFormHtml(prog){
    var html='<div class="form-group"><label class="form-label">Program Adı</label><input type="text" id="dp-ad" class="input" value="'+esc(prog.ad)+'" placeholder="Örn: Keto Diyet" maxlength="40"></div>';
    html+='<div class="form-group"><label class="form-label">Hangi Günler?</label><div class="gun-toggle" id="dp-gunler">';
    ['Pz','Pt','Sa','Ça','Pe','Cu','Ct'].forEach(function(g,i){html+='<label><input type="checkbox" value="'+i+'"'+(prog.gunler.indexOf(i)!==-1?' checked':'')+'><span style="display:flex;align-items:center;justify-content:center;width:100%;height:100%;">'+g+'</span></label>';});
    html+='</div></div>';
    html+='<div class="form-group"><label class="form-label">Öğünler</label><div id="dp-ogunler">';
    (prog.ogunler||[]).forEach(function(o,i){
        html+='<div class="ogun-item" id="ogun-'+i+'"><div class="ogun-baslik">'+esc(o.tip)+'</div>';
        html+='<div class="ogun-yiyecek" id="oy-'+i+'">';
        (o.yiyecekler||[]).forEach(function(y,yi){html+='<span class="ogun-chip">'+esc(y)+' <button onclick="dpYiyecekSil('+i+','+yi+')">✕</button></span>';});
        html+='</div>';
        html+='<div class="ogun-input-row"><input class="input" id="oy-input-'+i+'" placeholder="Yiyecek ekle..." onkeydown="if(event.key===\'Enter\')dpYiyecekEkle('+i+')"><button class="btn btn-diet btn-sm" onclick="dpYiyecekEkle('+i+')">+</button></div></div>';
    });
    html+='</div></div>';
    return html;
}

function diyetProgramiModal(editIdx){
    if(G.readonlyMode)return;
    var prog=editIdx!==undefined?JSON.parse(JSON.stringify(G.userData.diyetProgramlari[editIdx])):{id:'dp_'+Date.now(),ad:'',gunler:[],ogunler:OGUN_TIPLERI.map(function(t){return{tip:t,yiyecekler:[]};})};
    var baslik=editIdx!==undefined?'Düzenle':'Yeni Diyet Programı';
    var html='<h3 style="color:var(--diet);margin-bottom:14px;">🥗 '+baslik+'</h3>';
    html+=diyetFormHtml(prog);
    html+='<div style="display:flex;gap:8px;margin-top:14px;">';
    if(editIdx!==undefined) html+='<button class="btn btn-danger btn-sm" onclick="diyetProgramiSil('+editIdx+')">🗑️ Sil</button>';
    html+='<button class="btn btn-diet btn-block" onclick="diyetProgramiKaydet('+(editIdx!==undefined?editIdx:-1)+')">💾 Kaydet</button></div>';
    modalAc(html);
    window._dpOgunler=JSON.parse(JSON.stringify(prog.ogunler||[]));
}
window.diyetProgramiModal = diyetProgramiModal;

window._dpOgunler=[];
function dpYiyecekEkle(i){var inp=document.getElementById('oy-input-'+i);var v=inp.value.trim();if(!v)return;window._dpOgunler[i].yiyecekler.push(v);inp.value='';document.getElementById('oy-'+i).insertAdjacentHTML('beforeend','<span class="ogun-chip">'+esc(v)+' <button onclick="dpYiyecekSil('+i+','+(window._dpOgunler[i].yiyecekler.length-1)+')">✕</button></span>');}
window.dpYiyecekEkle = dpYiyecekEkle;
function dpYiyecekSil(i,yi){window._dpOgunler[i].yiyecekler.splice(yi,1);dpOgunlerYenidenCiz();}
window.dpYiyecekSil = dpYiyecekSil;
function dpOgunlerYenidenCiz(){window._dpOgunler.forEach(function(o,i){var c=document.getElementById('oy-'+i);if(!c)return;var h='';(o.yiyecekler||[]).forEach(function(y,yi){h+='<span class="ogun-chip">'+esc(y)+' <button onclick="dpYiyecekSil('+i+','+yi+')">✕</button></span>';});c.innerHTML=h;});}

async function diyetProgramiKaydet(editIdx){
    var ad=document.getElementById('dp-ad').value.trim();if(!ad){bildirim('⚠️ Program adı gerekli!','uyari');return;}
    var gunler=[];document.querySelectorAll('#dp-gunler input:checked').forEach(function(c){gunler.push(parseInt(c.value));});
    if(editIdx>=0){G.userData.diyetProgramlari[editIdx].ad=ad;G.userData.diyetProgramlari[editIdx].gunler=gunler;G.userData.diyetProgramlari[editIdx].ogunler=window._dpOgunler;}
    else G.userData.diyetProgramlari.push({id:'dp_'+Date.now(),ad:ad,gunler:gunler,ogunler:window._dpOgunler});
    yuklemeGoster();
    try{await fbYazUye(emailKey(G.currentUser),G.userData);bildirim('✅ Kaydedildi!','basari');modalKapat();anaSayfaRender();}
    catch(e){bildirim('⚠️ Hata!','hata');}yuklemeGizle();
}
window.diyetProgramiKaydet = diyetProgramiKaydet;

async function diyetProgramiSil(idx){
    if(!confirm('Silmek istediğinize emin misiniz?'))return;
    G.userData.diyetProgramlari.splice(idx,1);yuklemeGoster();
    try{await fbYazUye(emailKey(G.currentUser),G.userData);bildirim('🗑️ Silindi!','basari');modalKapat();anaSayfaRender();}
    catch(e){bildirim('⚠️ Hata!','hata');}yuklemeGizle();
}
window.diyetProgramiSil = diyetProgramiSil;

function diyetYonetModal(){
    var html='<h3 style="color:var(--diet);margin-bottom:14px;">🥗 Diyet Programları</h3>';
    if(!G.userData.diyetProgramlari||G.userData.diyetProgramlari.length===0) html+='<p style="color:var(--text3);font-size:13px;">Henüz program yok.</p>';
    else G.userData.diyetProgramlari.forEach(function(d,i){
        html+='<div style="display:flex;align-items:center;gap:8px;padding:10px;background:var(--bg2);border:1px solid var(--border);border-radius:8px;margin-bottom:6px;cursor:pointer;" onclick="modalKapat();setTimeout(function(){diyetProgramiModal('+i+');},200);">';
        html+='<span>🥗</span><span style="flex:1;font-weight:600;font-size:14px;">'+esc(d.ad)+'</span>';
        html+='<span style="font-size:11px;color:var(--text3);">'+(d.ogunler||[]).length+' öğün</span><span style="color:var(--text3);">›</span></div>';
    });
    html+='<button class="btn btn-diet btn-block" style="margin-top:12px;" onclick="modalKapat();setTimeout(diyetProgramiModal,200);">+ Yeni Program</button>';
    modalAc(html);
}
window.diyetYonetModal = diyetYonetModal;

function diyetDetayModal(progIdx,tarih){
    var d=getAktifData();var prog=d.diyetProgramlari[progIdx];if(!prog)return;
    if(!d.diyetKayitlari)d.diyetKayitlari=[];
    var kayit=d.diyetKayitlari.find(function(k){return k.tarih===tarih&&k.diyetId===prog.id;});
    if(!kayit){kayit={tarih:tarih,diyetId:prog.id,tamamlanan:{},timestamp:Date.now()};d.diyetKayitlari.push(kayit);}
    renderDiyetDetay(prog,kayit,tarih,false);
}
window.diyetDetayModal = diyetDetayModal;

function diyetDetayModalAtanan(progIdx,tarih){
    var d=getAktifData();var prog=(d.atananDiyetler||[])[progIdx];if(!prog)return;
    if(!d.diyetKayitlari)d.diyetKayitlari=[];
    var kayit=d.diyetKayitlari.find(function(k){return k.tarih===tarih&&k.diyetId===prog.id;});
    if(!kayit){kayit={tarih:tarih,diyetId:prog.id,tamamlanan:{},timestamp:Date.now()};d.diyetKayitlari.push(kayit);}
    renderDiyetDetay(prog,kayit,tarih,true);
}
window.diyetDetayModalAtanan = diyetDetayModalAtanan;

function renderDiyetDetay(prog,kayit,tarih,isAtanan){
    var html='<h3 style="color:var(--diet);margin-bottom:14px;">🥗 '+esc(prog.ad)+(isAtanan?' 🔒':'')+' <span style="font-size:12px;color:var(--text3);">'+tarih+'</span></h3>';
    (prog.ogunler||[]).forEach(function(o,i){
        var tamam=kayit.tamamlanan&&kayit.tamamlanan[i];
        var dis=G.readonlyMode?'disabled':'';
        html+='<div class="ogun-item"><div class="ogun-tik"><input type="checkbox" '+(tamam?'checked':'')+' '+dis+' onchange="diyetTikDeg(\''+prog.id+'\',\''+tarih+'\','+i+',this.checked)"><span class="ogun-baslik" style="margin-bottom:0;">'+esc(o.tip)+'</span></div>';
        if(o.yiyecekler&&o.yiyecekler.length>0){html+='<div class="ogun-yiyecek" style="margin-top:4px;">';o.yiyecekler.forEach(function(y){html+='<span class="ogun-chip">'+esc(y)+'</span>';});html+='</div>';}
        html+='</div>';
    });
    modalAc(html);
}

async function diyetTikDeg(diyetId,tarih,ogunIdx,checked){
    if(G.readonlyMode)return;
    var kayit=G.userData.diyetKayitlari.find(function(k){return k.tarih===tarih&&k.diyetId===diyetId;});
    if(!kayit)return;if(!kayit.tamamlanan)kayit.tamamlanan={};
    kayit.tamamlanan[ogunIdx]=checked;
    try{await fbYazUye(emailKey(G.currentUser),G.userData);}catch(e){console.error(e);}
}
window.diyetTikDeg = diyetTikDeg;

// ══════════════════════════════════════════════════════════
// SPOR TIMER BAĞLANTILARI (timer.js'den import)
// ══════════════════════════════════════════════════════════
function sporRutiniSec(rutinIdx,tarih){
    if(G.readonlyMode)return;
    initTimer(rutinIdx,tarih,false);
}
window.sporRutiniSec = sporRutiniSec;

function sporRutiniSecAtanan(rutinIdx,tarih){
    if(G.readonlyMode)return;
    initTimer(rutinIdx,tarih,true);
}
window.sporRutiniSecAtanan = sporRutiniSecAtanan;

window.stBasla = stBasla;
window.stDuraklat = stDuraklat;
window.stDevam = stDevam;
window.stSonrakiAdim = stSonrakiAdim;
window.stDurdur = stDurdur;
window.timerdenCik = timerdenCik;

// ══════════════════════════════════════════════════════════
// TAKVİM
// ══════════════════════════════════════════════════════════
window._takYil = new Date().getFullYear();
window._takAy = new Date().getMonth();

function takAyDeg(dir){
    window._takAy+=dir;
    if(window._takAy<0){window._takAy=11;window._takYil--;}
    if(window._takAy>11){window._takAy=0;window._takYil++;}
    takTakvimRender();
}
window.takAyDeg = takAyDeg;

export function takTakvimRender(){
    var d=getAktifData();if(!d)return;
    document.getElementById('tak-baslik').textContent=AY_ADI[window._takAy]+' '+window._takYil;
    var bugunS=bugunStr();
    var gunAdlari=['Pt','Sa','Ça','Pe','Cu','Ct','Pz'];var html='';
    gunAdlari.forEach(function(g){html+='<div class="tak-gun-adi">'+g+'</div>';});
    var ilkGun=new Date(window._takYil,window._takAy,1).getDay();ilkGun=ilkGun===0?6:ilkGun-1;
    var topGun=new Date(window._takYil,window._takAy+1,0).getDate();
    for(var i=0;i<ilkGun;i++)html+='<div class="tak-gun bos"></div>';
    for(var g=1;g<=topGun;g++){
        var ds=window._takYil+'-'+String(window._takAy+1).padStart(2,'0')+'-'+String(g).padStart(2,'0');
        var cls='tak-gun';if(ds===bugunS)cls+=' bugun';if(ds<bugunS)cls+=' gecmis';
        var sporMs=0;(d.sporOturumlari||[]).forEach(function(o){if(o.tarih===ds&&o.tamamlandi)sporMs+=o.toplamSporMs||0;});
        var kiloK=(d.kiloKayitlari||[]).find(function(k){return k.tarih===ds;});
        var hedefDk=(d.hedefler&&d.hedefler.gunlukDk)||0;
        if(sporMs>0&&hedefDk>0)cls+=sporMs>=(hedefDk*60000)?' hedef-ok':' hedef-fail';
        var miniHtml='';
        if(sporMs>0)miniHtml='<div class="tak-gun-mini">'+msToDkStr(sporMs)+'</div>';
        if(kiloK)miniHtml+='<div class="tak-gun-kilo" style="color:'+(kiloK.kilo>((d.hedefler||{}).kiloHedef||999)?'var(--red)':'var(--green)')+'">'+kiloK.kilo+'kg</div>';
        html+='<div class="'+cls+'" onclick="takGunTikla(\''+ds+'\')"><div class="tak-gun-num">'+g+'</div>'+miniHtml+'</div>';
    }
    document.getElementById('tak-grid').innerHTML=html;
}

function takGunTikla(tarih){
    // Takvimde güne tıklayınca o günün planlarını modal olarak göster
    var d=getAktifData();if(!d)return;
    var gunIdx=new Date(tarih).getDay();
    var html='<h3 style="color:var(--accent);margin-bottom:14px;">📅 '+tarih+'</h3>';
    var icerikVar=false;
    // Atanan rutinler
    getAtananRutinler().forEach(function(r,ri){
        if(r.gunler&&r.gunler.indexOf(gunIdx)!==-1){
            icerikVar=true;
            var oc=G.readonlyMode?'':'onclick="modalKapat();sporRutiniSecAtanan('+ri+',\''+tarih+'\')"';
            html+='<div class="bugun-kart" '+oc+'><div class="bk-header"><span class="bk-icon">💪</span><span class="bk-title">'+esc(r.ad)+'</span><span class="bk-badge bk-badge-lock">🔒</span></div></div>';
        }
    });
    (d.sporRutinleri||[]).forEach(function(r,ri){
        if(r.gunler&&r.gunler.indexOf(gunIdx)!==-1){
            icerikVar=true;
            var oc=G.readonlyMode?'':'onclick="modalKapat();sporRutiniSec('+ri+',\''+tarih+'\')"';
            html+='<div class="bugun-kart" '+oc+'><div class="bk-header"><span class="bk-icon">💪</span><span class="bk-title">'+esc(r.ad)+'</span></div></div>';
        }
    });
    getAtananDiyetler().forEach(function(dd,di){
        if(dd.gunler&&dd.gunler.indexOf(gunIdx)!==-1){
            icerikVar=true;
            var oc=G.readonlyMode?'':'onclick="modalKapat();diyetDetayModalAtanan('+di+',\''+tarih+'\')"';
            html+='<div class="bugun-kart" '+oc+'><div class="bk-header"><span class="bk-icon">🥗</span><span class="bk-title">'+esc(dd.ad)+'</span><span class="bk-badge bk-badge-lock">🔒</span></div></div>';
        }
    });
    (d.diyetProgramlari||[]).forEach(function(dd,di){
        if(dd.gunler&&dd.gunler.indexOf(gunIdx)!==-1){
            icerikVar=true;
            var oc=G.readonlyMode?'':'onclick="modalKapat();diyetDetayModal('+di+',\''+tarih+'\')"';
            html+='<div class="bugun-kart" '+oc+'><div class="bk-header"><span class="bk-icon">🥗</span><span class="bk-title">'+esc(dd.ad)+'</span></div></div>';
        }
    });
    if(!icerikVar) html+='<p style="color:var(--text3);font-size:13px;">Bu gün için plan yok.</p>';
    modalAc(html);
}
window.takGunTikla = takGunTikla;

// İstatistik bağlantıları
window.istHedefKaydet = istHedefKaydet;
window.istAyDeg = istAyDeg;

// ══════════════════════════════════════════════════════════
// PROFİL
// ══════════════════════════════════════════════════════════
function profilRender(){
    if(G.isAdmin&&!G.readonlyMode){
        document.getElementById('pr-avatar').textContent='🔐';
        document.getElementById('pr-ad').textContent='Yönetici Paneli';
        document.getElementById('pr-hedef').textContent=ADMIN_EMAIL;
        return;
    }
    var d=getAktifData();if(!d||!d.profil)return;
    document.getElementById('pr-avatar').textContent=d.profil.avatar||'🏋️';
    document.getElementById('pr-ad').textContent=d.profil.nick||G.currentUser;
    document.getElementById('pr-hedef').textContent='Kilo Hedefi: '+((d.hedefler||{}).kiloHedef||'-')+' kg';
    document.getElementById('pr-boy').textContent=d.profil.boy||'-';
    document.getElementById('pr-kilo').textContent=d.profil.kilo||'-';
    document.getElementById('pr-vki').textContent=vkiHesapla(d.profil.boy,d.profil.kilo)||'-';
}

function profilDuzenleModal(){
    if(G.readonlyMode||G.isAdmin)return;
    var p=G.userData.profil||{};
    var html='<h3 style="color:var(--accent);margin-bottom:14px;">✏️ Profili Düzenle</h3>';
    html+='<div class="form-group"><label class="form-label">İsim</label><input type="text" id="pd-nick" class="input" value="'+esc(p.nick||'')+'" maxlength="20"></div>';
    html+='<div class="row2"><div class="form-group"><label class="form-label">Boy (cm)</label><input type="number" id="pd-boy" class="input" value="'+(p.boy||'')+'"></div>';
    html+='<div class="form-group"><label class="form-label">Kilo (kg)</label><input type="number" id="pd-kilo" class="input" value="'+(p.kilo||'')+'" step="0.1"></div></div>';
    html+='<div class="form-group"><label class="form-label">Kilo Hedefi (kg)</label><input type="number" id="pd-kilo-hedef" class="input" value="'+((G.userData.hedefler||{}).kiloHedef||'')+'" step="0.1"></div>';
    html+='<button class="btn btn-primary btn-block" onclick="profilKaydet()">💾 Kaydet</button>';
    modalAc(html);
}
window.profilDuzenleModal = profilDuzenleModal;

async function profilKaydet(){
    var nick=document.getElementById('pd-nick').value.trim();if(!nick){bildirim('⚠️ İsim gerekli!','uyari');return;}
    G.userData.profil.nick=nick;
    G.userData.profil.boy=parseFloat(document.getElementById('pd-boy').value)||G.userData.profil.boy;
    G.userData.profil.kilo=parseFloat(document.getElementById('pd-kilo').value)||G.userData.profil.kilo;
    G.userData.hedefler.kiloHedef=parseFloat(document.getElementById('pd-kilo-hedef').value)||G.userData.hedefler.kiloHedef;
    yuklemeGoster();
    try{await fbYazUye(emailKey(G.currentUser),G.userData);bildirim('✅ Güncellendi!','basari');profilRender();modalKapat();}
    catch(e){bildirim('⚠️ Hata!','hata');}yuklemeGizle();
}
window.profilKaydet = profilKaydet;

// menuTikla artık altta wrapped olarak tanımlı

// ══════════════════════════════════════════════════════════
// PWA
// ══════════════════════════════════════════════════════════
var deferredPrompt=null;
if('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js').catch(function(e){console.log('SW:',e);});
window.addEventListener('beforeinstallprompt',function(e){e.preventDefault();deferredPrompt=e;var el=document.getElementById('pwa-yukle-item');if(el)el.classList.remove('gizli');});
window.addEventListener('appinstalled',function(){deferredPrompt=null;var el=document.getElementById('pwa-yukle-item');if(el)el.classList.add('gizli');bildirim('✅ Uygulama yüklendi!','basari');});

function pwaYukle(){
    if(deferredPrompt){deferredPrompt.prompt();deferredPrompt.userChoice.then(function(r){deferredPrompt=null;var el=document.getElementById('pwa-yukle-item');if(el)el.classList.add('gizli');});}
    else{
        var isIOS=/iPad|iPhone|iPod/.test(navigator.userAgent);
        if(window.matchMedia('(display-mode: standalone)').matches||window.navigator.standalone){bildirim('✅ Zaten yüklü!','basari');return;}
        if(isIOS) modalAc('<h3 style="color:var(--accent);margin-bottom:14px;">📲 iPhone\'a Yükle</h3><div style="font-size:14px;color:var(--text2);line-height:2;"><p>1️⃣ Safari\'de ⬆ (Paylaş) butonuna bas</p><p>2️⃣ "Ana Ekrana Ekle" seç</p><p>3️⃣ "Ekle" bas</p></div>');
        else modalAc('<h3 style="color:var(--accent);margin-bottom:14px;">📲 Yükle</h3><div style="font-size:14px;color:var(--text2);line-height:2;"><p>1️⃣ Chrome menüsünü aç ⋮</p><p>2️⃣ "Uygulamayı yükle" seç</p></div>');
    }
}
window.pwaYukle = pwaYukle;

if(window.matchMedia('(display-mode: standalone)').matches||window.navigator.standalone){var el=document.getElementById('pwa-yukle-item');if(el)el.classList.add('gizli');}

// ══════════════════════════════════════════════════════════
// EKSİK WINDOW ATAMALARI (HTML onclick handler'ları için)
// ══════════════════════════════════════════════════════════
window.modalKapat = modalKapat;
window.modalAc = modalAc;
window.bildirim = bildirim;
window.ekranGoster = ekranGoster;
window.esc = esc;
window.bugunStr = bugunStr;

// ══════════════════════════════════════════════════════════
// GERİ BUTONU YÖNETİMİ
// ══════════════════════════════════════════════════════════
var ekranGecmisi = [];
var _orijinalEkranGoster = ekranGoster;

// ekranGoster'i sarmalayarak history yönetimi ekle
function ekranGosterWrapped(id){
    // Modal açıksa kapat
    if(!document.getElementById('modal-overlay').classList.contains('gizli')){
        modalKapat();
        return;
    }
    var onceki = G.aktifEkran;
    if(onceki && onceki !== id && onceki !== 'ekran-giris' && onceki !== 'ekran-profil-olustur'){
        ekranGecmisi.push(onceki);
        if(ekranGecmisi.length > 20) ekranGecmisi.shift();
    }
    _orijinalEkranGoster(id);
    // pushState sadece kullanıcı etkileşiminde
    try { history.pushState({ekran:id}, '', ''); } catch(e){}
}

window.addEventListener('popstate', function(e){
    // Modal açıksa önce onu kapat
    if(!document.getElementById('modal-overlay').classList.contains('gizli')){
        modalKapat();
        history.pushState({}, '', '');
        return;
    }
    if(ekranGecmisi.length > 0){
        var oncekiEkran = ekranGecmisi.pop();
        _orijinalEkranGoster(oncekiEkran);
        // Alt menü butonunu güncelle
        var menuMap = {'ekran-ana':'mn-ana','ekran-takvim':'mn-tak','ekran-istatistik':'mn-ist','ekran-profil':'mn-profil'};
        document.querySelectorAll('#alt-menu button').forEach(function(b){b.classList.remove('aktif');});
        if(menuMap[oncekiEkran]) document.getElementById(menuMap[oncekiEkran]).classList.add('aktif');
        history.pushState({}, '', '');
    } else {
        // Geçmiş boş, ana sayfadaysa tarayıcı geri gitsin
        if(G.aktifEkran === 'ekran-ana'){
            // izin ver - hiçbir şey yapma
        } else {
            _orijinalEkranGoster('ekran-ana');
            document.querySelectorAll('#alt-menu button').forEach(function(b){b.classList.remove('aktif');});
            document.getElementById('mn-ana').classList.add('aktif');
            history.pushState({}, '', '');
        }
    }
});

// menuTikla'yı da sarmalayalım
function menuTiklaWrapped(ekranId, btn){
    document.querySelectorAll('#alt-menu button').forEach(function(b){b.classList.remove('aktif');});
    btn.classList.add('aktif');
    ekranGosterWrapped(ekranId);
}
window.menuTikla = menuTiklaWrapped;

// ══════════════════════════════════════════════════════════
// OTURUM KALICILIĞI (onAuthStateChanged)
// ══════════════════════════════════════════════════════════
async function basla(){
    yuklemeGoster();
    try {
        // Firebase Auth durumunu kontrol et
        var user = await new Promise(function(resolve){
            var unsub = onAuthStateChanged(auth, function(u){
                unsub();
                resolve(u);
            });
        });

        if(user){
            // Kullanıcı oturum açmış
            if(user.email === ADMIN_EMAIL){
                // Admin
                G.currentUser = ADMIN_EMAIL; G.isAdmin = true;
                G.adminData = await loadAdminData();
                if(!G.adminData.profil) G.adminData.profil = {avatar:'🔐', nick:'Yönetici'};
                G.userData = G.adminData;
                girisBasarili();
            } else {
                // Üye
                G.adminData = await loadAdminData();
                var eKey = emailKey(user.email);
                if(G.adminData.uyeler && G.adminData.uyeler[eKey]){
                    G.currentUser = user.email; G.isAdmin = false;
                    G.userData = await loadUserData(eKey);
                    if(!G.userData.profil) ekranGoster('ekran-profil-olustur');
                    else girisBasarili();
                } else {
                    // Üye listesinde yok, çıkış yap
                    await signOut(auth);
                    ekranGoster('ekran-giris');
                }
            }
        } else {
            ekranGoster('ekran-giris');
        }
    } catch(e){
        console.error('Başlangıç hatası:', e);
        ekranGoster('ekran-giris');
    }
    yuklemeGizle();
    // İlk history state
    try { history.replaceState({ekran:G.aktifEkran}, '', ''); } catch(e){}
}

basla();
