// ══════════════════════════════════════════════════════════
// FIREBASE CONFIG
// ══════════════════════════════════════════════════════════
var firebaseConfig = {
    apiKey: "AIzaSyCug6HbghYWgOl-iwh0c-_TAsgHPndToXg",
    authDomain: "okubirlikte.firebaseapp.com",
    databaseURL: "https://okubirlikte-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "okubirlikte",
    storageBucket: "okubirlikte.firebasestorage.app",
    messagingSenderId: "684134830092",
    appId: "1:684134830092:web:bcb9a9b92df29fa67bde29"
};
firebase.initializeApp(firebaseConfig);
var auth = firebase.auth();
var db = firebase.database();
var googleProvider = new firebase.auth.GoogleAuthProvider();
auth.languageCode = 'tr';

var BOOKS_API_KEY = "AIzaSyCjVe6kDerlXCOUQMQfqf-rvsS_8Ghd81Y";

// ══════════════════════════════════════════════════════════
// GLOBAL DEĞİŞKENLER
// ══════════════════════════════════════════════════════════
var mevcutKullanici = null;
var kullaniciBilgileri = null;
var seciliKitap = null;
var aktifOdaId = null;
var aktifOdaVeri = null;
var mesajDinleyici = null;
var odalarDinleyici = null;
var odalarimDinleyici = null;
var aktifEkranId = 'ekran-giris';
var aktifKategori = 'hepsi';
var kitapAraTimeout = null;
var geciciFotoData = null;
var arsivModuAktif = false;
var odaUyesiMi = false;          // Kullanıcı odaya katılmış mı
var odaOkuduMu = false;          // Kullanıcı okudum tiki açık mı
var odaOkuyanlar = {};           // Odadaki okudum tiki açık olan uid'ler

// ══════════════════════════════════════════════════════════
// ODA DURUM HESAPLAMA
// expiresAt = okuma süresi bitiş
// archiveAt = expiresAt + 7 gün (mesajlaşma bitiş)
//
// Aktif: now < expiresAt (veya başlamamış)
// Mesajlaşma: expiresAt <= now < archiveAt
// Arşiv: now >= archiveAt
// ══════════════════════════════════════════════════════════
function odaDurumHesapla(oda) {
    var now = Date.now();
    var basladiMi = !oda.startsAt || oda.startsAt <= now;
    var okumaBitti = oda.expiresAt && oda.expiresAt < now;
    var arsivOldu = oda.archiveAt && oda.archiveAt < now;

    if (!basladiMi) return 'bekliyor';
    if (!okumaBitti) return 'aktif';
    if (!arsivOldu) return 'mesajlasma';
    return 'arsiv';
}

function mesajlasmaKalanGun(oda) {
    if (!oda.archiveAt) return 0;
    var kalan = oda.archiveAt - Date.now();
    return Math.max(0, Math.ceil(kalan / 86400000));
}

// ══════════════════════════════════════════════════════════
// UI FONKSİYONLARI
// ══════════════════════════════════════════════════════════
function ekranGoster(id) {
    document.querySelectorAll('.ekran').forEach(function(e) { e.classList.add('gizli'); });
    var el = document.getElementById(id);
    if (el) { el.classList.remove('gizli'); aktifEkranId = id; }
    var menuGizle = ['ekran-giris','ekran-profil-olustur','ekran-oda'];
    if (menuGizle.indexOf(id) !== -1) { altMenuGizle(); } else if (mevcutKullanici) { altMenuGoster(); }
    menuAktifGuncelle(id);
    if (id === 'ekran-profil') profilGoster();
    if (id === 'ekran-ana') odalariYukle();
    if (id === 'ekran-odalarim') odalarimYukle();
    var fab = document.querySelector('.fab');
    if (fab) fab.classList.toggle('gizli', id !== 'ekran-ana');
    window.scrollTo(0, 0);
}

function altMenuGoster() { var m = document.getElementById('alt-menu'); if (m) m.classList.remove('gizli'); }
function altMenuGizle() { var m = document.getElementById('alt-menu'); if (m) m.classList.add('gizli'); }
function menuTikla(id, btn) { ekranGoster(id); }
function menuAktifGuncelle(id) {
    document.querySelectorAll('#alt-menu button').forEach(function(b) { b.classList.remove('aktif'); });
    var map = { 'ekran-ana': 'menu-ana', 'ekran-odalarim': 'menu-odalarim', 'ekran-profil': 'menu-profil' };
    var bid = map[id]; if (bid) { var b = document.getElementById(bid); if (b) b.classList.add('aktif'); }
}

var bildirimTO = null;
function bildirimGoster(mesaj, tip) {
    tip = tip || 'bilgi';
    var el = document.getElementById('bildirim');
    if (!el) return;
    if (bildirimTO) clearTimeout(bildirimTO);
    el.classList.remove('basari','hata','uyari','bilgi','goster');
    el.textContent = mesaj;
    el.classList.add(tip);
    requestAnimationFrame(function() { el.classList.add('goster'); });
    bildirimTO = setTimeout(function() { el.classList.remove('goster'); }, 3500);
}

function modalGoster(html) {
    document.getElementById('modal-body').innerHTML = html;
    document.getElementById('modal-overlay').classList.remove('gizli');
}
function modalKapat() { document.getElementById('modal-overlay').classList.add('gizli'); }

function yuklemeGoster(t) {
    var o = document.getElementById('yukleme-overlay');
    if (t) { var m = o.querySelector('.yukleme-metin'); if (m) m.textContent = t; }
    o.classList.remove('gizli');
}
function yuklemeKapat() { document.getElementById('yukleme-overlay').classList.add('gizli'); }

function htmlEscape(s) { if (!s) return ''; return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }
function varsayilanFoto() { return 'data:image/svg+xml;base64,' + btoa('<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><rect width="100" height="100" fill="#2c2419"/><circle cx="50" cy="38" r="18" fill="#5e5244"/><ellipse cx="50" cy="80" rx="30" ry="22" fill="#5e5244"/></svg>'); }
function ilgiSec(el) { el.classList.toggle('aktif'); }
function sureDegerGuncelle() { var v = document.getElementById('oda-sure').value; document.getElementById('oda-sure-deger').textContent = v + ' gün'; baslangicOzetGuncelle(); }
function uyeSiniriGuncelle() {
    var v = document.getElementById('oda-max-uye').value;
    document.getElementById('oda-max-uye-deger').textContent = v + ' kişi';
    document.getElementById('oda-sinirsiz').checked = false;
    document.getElementById('oda-max-uye').disabled = false;
}
function sinirsizDegisti() {
    var cb = document.getElementById('oda-sinirsiz');
    var slider = document.getElementById('oda-max-uye');
    var deger = document.getElementById('oda-max-uye-deger');
    if (cb.checked) { slider.disabled = true; deger.textContent = '♾️ Sınırsız'; }
    else { slider.disabled = false; deger.textContent = slider.value + ' kişi'; }
}
function getMaxMembers() {
    return document.getElementById('oda-sinirsiz').checked ? 0 : parseInt(document.getElementById('oda-max-uye').value);
}

// ══════════════════════════════════════════════════════════
// ŞİFRE SEÇİMİ
// ══════════════════════════════════════════════════════════
function sifreSecimDegisti() {
    var secim = document.querySelector('input[name="sifreSecim"]:checked').value;
    var alan = document.getElementById('sifre-input-alan');
    if (secim === 'var') {
        alan.classList.remove('gizli');
    } else {
        alan.classList.add('gizli');
        document.getElementById('oda-sifre').value = '';
    }
}

function baslangicDegisti() {
    var secim = document.querySelector('input[name="baslangic"]:checked').value;
    var alan = document.getElementById('ileri-tarih-alan');
    if (secim === 'ileri') {
        alan.classList.remove('gizli');
        var yarin = new Date(); yarin.setDate(yarin.getDate() + 1);
        var maxTarih = new Date(); maxTarih.setDate(maxTarih.getDate() + 30);
        var inp = document.getElementById('oda-baslangic-tarih');
        inp.min = yarin.toISOString().split('T')[0];
        inp.max = maxTarih.toISOString().split('T')[0];
        if (!inp.value) inp.value = yarin.toISOString().split('T')[0];
        baslangicOzetGuncelle();
    } else {
        alan.classList.add('gizli');
        document.getElementById('baslangic-ozet').innerHTML = '';
    }
}

function baslangicOzetGuncelle() {
    var secim = document.querySelector('input[name="baslangic"]:checked').value;
    var ozetEl = document.getElementById('baslangic-ozet');
    if (secim !== 'ileri') { if (ozetEl) ozetEl.innerHTML = ''; return; }
    var tarihStr = document.getElementById('oda-baslangic-tarih').value;
    if (!tarihStr) { ozetEl.innerHTML = ''; return; }
    var sure = parseInt(document.getElementById('oda-sure').value) || 14;
    var baslangic = new Date(tarihStr + 'T00:00:00');
    var bitis = new Date(baslangic.getTime() + sure * 86400000);
    var bugun = new Date(); bugun.setHours(0,0,0,0);
    var kalanGunSayi = Math.ceil((baslangic.getTime() - bugun.getTime()) / 86400000);
    var fmt = function(d) { return d.toLocaleDateString('tr-TR', { day:'numeric', month:'long', year:'numeric' }); };
    ozetEl.innerHTML = '📅 <strong>' + kalanGunSayi + ' gün sonra</strong> başlayacak<br>' +
        fmt(baslangic) + ' → ' + fmt(bitis) + ' (' + sure + ' günlük)';
}

function startsAtHesapla() {
    var secim = document.querySelector('input[name="baslangic"]:checked').value;
    if (secim === 'ileri') {
        var tarihStr = document.getElementById('oda-baslangic-tarih').value;
        if (tarihStr) return new Date(tarihStr + 'T00:00:00').getTime();
    }
    return Date.now();
}
function odaBasladiMi(oda) { return !oda.startsAt || oda.startsAt <= Date.now(); }
function odaBaslamayaKalanGun(oda) {
    if (!oda.startsAt || oda.startsAt <= Date.now()) return 0;
    return Math.ceil((oda.startsAt - Date.now()) / 86400000);
}
function formatTarih(ts) {
    if (!ts) return '';
    return new Date(ts).toLocaleDateString('tr-TR', { day:'numeric', month:'long' });
}
function zamanOnce(ts) {
    if (!ts) return '';
    var fark = Date.now() - ts;
    var dk = Math.floor(fark / 60000);
    if (dk < 1) return 'az önce';
    if (dk < 60) return dk + ' dk önce';
    var sa = Math.floor(dk / 60);
    if (sa < 24) return sa + ' saat önce';
    var gun = Math.floor(sa / 24);
    return gun + ' gün önce';
}
function kalanGun(expiresAt) {
    if (!expiresAt) return 0;
    var kalan = expiresAt - Date.now();
    return Math.max(0, Math.ceil(kalan / 86400000));
}
function formatSaat(ts) {
    if (!ts) return '';
    var d = new Date(ts);
    return d.toLocaleTimeString('tr-TR', { hour:'2-digit', minute:'2-digit' });
}

function basitHash(str) {
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
        var char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }
    return 'h_' + Math.abs(hash).toString(36);
}

// ══════════════════════════════════════════════════════════
// AUTH
// ══════════════════════════════════════════════════════════
function googleIleGiris() {
    auth.signInWithPopup(googleProvider).catch(function(err) {
        if (err.code === 'auth/popup-closed-by-user') {
            bildirimGoster("Giriş penceresi kapatıldı", "uyari");
        } else if (err.code === 'auth/popup-blocked') {
            auth.signInWithRedirect(googleProvider);
        } else {
            bildirimGoster("Giriş hatası: " + err.message, "hata");
        }
    });
}

auth.onAuthStateChanged(function(user) {
    if (user) {
        mevcutKullanici = user;
        girisBasarili(user);
    } else {
        mevcutKullanici = null;
        kullaniciBilgileri = null;
        altMenuGizle();
        ekranGoster('ekran-giris');
    }
});

auth.getRedirectResult().catch(function(err) {
    if (err.code !== 'auth/no-auth-event') bildirimGoster("Giriş hatası", "hata");
});

async function girisBasarili(user) {
    try {
        var snap = await db.ref('users/' + user.uid).once('value');
        var profil = snap.val();
        if (profil) {
            kullaniciBilgileri = profil;
            db.ref('users/' + user.uid).update({ lastSeen: Date.now() });
            altMenuGoster();
            ekranGoster('ekran-ana');
            bildirimGoster("Hoş geldin, " + profil.displayName + "! 👋", "basari");
        } else {
            poEkranDoldur(user);
            ekranGoster('ekran-profil-olustur');
        }
    } catch (e) {
        console.error("Profil okuma hatası:", e);
        bildirimGoster("Profil yüklenirken hata oluştu.", "hata");
    }
}

function cikisYap() {
    if (aktifOdaId) odaDinleyicileriKapat();
    auth.signOut().then(function() {
        mevcutKullanici = null; kullaniciBilgileri = null;
        altMenuGizle(); ekranGoster('ekran-giris');
        bildirimGoster("Çıkış yapıldı.", "bilgi");
    });
}

// ══════════════════════════════════════════════════════════
// PROFİL
// ══════════════════════════════════════════════════════════
function poEkranDoldur(user) {
    var f = document.getElementById('po-foto');
    if (f) { f.src = user.photoURL || varsayilanFoto(); f.onerror = function() { this.src = varsayilanFoto(); }; }
    var i = document.getElementById('po-isim');
    if (i) i.value = user.displayName || '';
    geciciFotoData = null;
}

function poFotoSec(event) {
    var dosya = event.target.files[0]; if (!dosya) return;
    if (dosya.size > 5*1024*1024) { bildirimGoster("Fotoğraf 5MB'dan küçük olmalı.", "uyari"); return; }
    fotoKucult(dosya, function(b64) {
        geciciFotoData = b64;
        document.getElementById('po-foto').src = b64;
    });
}

function fotoKucult(dosya, cb) {
    var r = new FileReader();
    r.onload = function(e) {
        var img = new Image();
        img.onload = function() {
            var c = document.createElement('canvas');
            var mx = 200, w = img.width, h = img.height;
            if (w > h) { if (w > mx) { h = Math.round(h * mx / w); w = mx; } }
            else { if (h > mx) { w = Math.round(w * mx / h); h = mx; } }
            c.width = w; c.height = h;
            c.getContext('2d').drawImage(img, 0, 0, w, h);
            cb(c.toDataURL('image/jpeg', 0.8));
        };
        img.src = e.target.result;
    };
    r.readAsDataURL(dosya);
}

async function profilKaydet() {
    if (!mevcutKullanici) return;
    var isim = document.getElementById('po-isim').value.trim();
    if (!isim || isim.length < 2) { bildirimGoster("İsim en az 2 karakter olmalı.", "uyari"); return; }
    var ilgiler = [];
    document.querySelectorAll('#po-ilgi .ilgi-chip.aktif').forEach(function(c) { ilgiler.push(c.getAttribute('data-v')); });
    yuklemeGoster("Profil oluşturuluyor...");
    try {
        var foto = geciciFotoData || mevcutKullanici.photoURL || varsayilanFoto();
        var veri = {
            displayName: isim, email: mevcutKullanici.email, photoURL: foto,
            interests: ilgiler, roomsJoined: 0, booksRead: 0, messagesSent: 0,
            createdAt: Date.now(), lastSeen: Date.now()
        };
        await db.ref('users/' + mevcutKullanici.uid).set(veri);
        kullaniciBilgileri = veri;
        yuklemeKapat();
        altMenuGoster();
        ekranGoster('ekran-ana');
        bildirimGoster("Hoş geldin, " + isim + "! 📚", "basari");
    } catch (e) {
        yuklemeKapat();
        bildirimGoster("Profil kaydedilemedi.", "hata");
    }
}

function profilGoster() {
    if (!kullaniciBilgileri || !mevcutKullanici) return;
    var k = kullaniciBilgileri;
    document.getElementById('profil-foto').src = k.photoURL || varsayilanFoto();
    document.getElementById('profil-foto').onerror = function() { this.src = varsayilanFoto(); };
    document.getElementById('profil-ad').textContent = k.displayName || '';
    document.getElementById('profil-email').textContent = mevcutKullanici.email || '';
    document.getElementById('profil-oda-sayi').textContent = k.roomsJoined || 0;
    document.getElementById('profil-kitap-sayi').textContent = k.booksRead || 0;
    document.getElementById('profil-mesaj-sayi').textContent = k.messagesSent || 0;
}

function profilFotoDegistir(event) {
    var dosya = event.target.files[0]; if (!dosya) return;
    if (dosya.size > 5*1024*1024) { bildirimGoster("5MB limit", "uyari"); return; }
    fotoKucult(dosya, function(b64) {
        db.ref('users/' + mevcutKullanici.uid).update({ photoURL: b64 }).then(function() {
            kullaniciBilgileri.photoURL = b64;
            document.getElementById('profil-foto').src = b64;
            bildirimGoster("Fotoğraf güncellendi! 📷", "basari");
        });
    });
}

function profilDuzenleModal() {
    if (!kullaniciBilgileri) return;
    var k = kullaniciBilgileri;
    var ilgiHTML = '';
    var turler = [['edebiyat','📖'],['tarih','🏛️'],['bilimkurgu','🚀'],['felsefe','🧠'],['bilim','🔬'],['psikoloji','💭'],['roman','📕'],['kisiselgelisim','🌱'],['polisiye','🔍'],['fantastik','🐉']];
    turler.forEach(function(t) {
        var a = (k.interests || []).indexOf(t[0]) !== -1;
        ilgiHTML += '<div class="ilgi-chip' + (a ? ' aktif' : '') + '" data-v="' + t[0] + '" onclick="ilgiSec(this)">' + t[1] + ' ' + t[0].charAt(0).toUpperCase() + t[0].slice(1) + '</div>';
    });
    modalGoster(
        '<h3 style="margin-bottom:16px;">✏️ Profili Düzenle</h3>' +
        '<div class="form-group"><label class="form-label">İsim</label><input type="text" id="pd-isim" class="input" value="' + htmlEscape(k.displayName) + '" maxlength="30"></div>' +
        '<div class="form-group"><label class="form-label">Favori Türler</label><div id="pd-ilgi" class="ilgi-grid">' + ilgiHTML + '</div></div>' +
        '<button class="btn btn-amber btn-block" onclick="profilDuzenleKaydet()">💾 Kaydet</button>'
    );
}

async function profilDuzenleKaydet() {
    var isim = document.getElementById('pd-isim').value.trim();
    if (!isim || isim.length < 2) { bildirimGoster("İsim en az 2 karakter.", "uyari"); return; }
    var ilgiler = [];
    document.querySelectorAll('#pd-ilgi .ilgi-chip.aktif').forEach(function(c) { ilgiler.push(c.getAttribute('data-v')); });
    await db.ref('users/' + mevcutKullanici.uid).update({ displayName: isim, interests: ilgiler, lastSeen: Date.now() });
    kullaniciBilgileri.displayName = isim;
    kullaniciBilgileri.interests = ilgiler;
    modalKapat(); profilGoster();
    bildirimGoster("Profil güncellendi! ✅", "basari");
}

function hesabiSilOnay() {
    modalGoster(
        '<div style="text-align:center;"><h3 style="margin-bottom:12px;">🗑️ Hesabı Sil</h3>' +
        '<p style="color:var(--text-secondary);margin-bottom:20px;">Tüm verilerin kalıcı olarak silinecek. Bu işlem geri alınamaz!</p>' +
        '<div style="display:flex;gap:10px;"><button class="btn btn-outline" style="flex:1;" onclick="modalKapat()">İptal</button>' +
        '<button class="btn btn-red" style="flex:1;" onclick="hesabiSil()">Sil</button></div></div>'
    );
}

async function hesabiSil() {
    if (!mevcutKullanici) return;
    yuklemeGoster("Hesap siliniyor...");
    try {
        var uid = mevcutKullanici.uid;
        await db.ref('users/' + uid).remove();
        await mevcutKullanici.delete();
        yuklemeKapat(); modalKapat();
        mevcutKullanici = null; kullaniciBilgileri = null;
        altMenuGizle(); ekranGoster('ekran-giris');
        bildirimGoster("Hesabın silindi.", "bilgi");
    } catch (e) {
        yuklemeKapat();
        if (e.code === 'auth/requires-recent-login') {
            modalKapat();
            bildirimGoster("Güvenlik: Tekrar giriş yap, sonra tekrar dene.", "uyari");
        } else {
            bildirimGoster("Hata: " + e.message, "hata");
        }
    }
}

// ══════════════════════════════════════════════════════════
// OKUNAN KİTAPLAR — PROFİL
// ══════════════════════════════════════════════════════════
async function okunanKitaplariGoster() {
    if (!mevcutKullanici) return;
    yuklemeGoster("Kitaplar yükleniyor...");
    try {
        var snap = await db.ref('users/' + mevcutKullanici.uid + '/readBooks').once('value');
        var data = snap.val();
        yuklemeKapat();
        if (!data) {
            modalGoster('<h3 style="margin-bottom:16px;">📚 Okuduğum Kitaplar</h3><div class="bos-durum"><div class="bos-durum-ikon">📭</div><div class="bos-durum-metin">Henüz okudum olarak işaretlediğin kitap yok.</div></div>');
            return;
        }
        var html = '<h3 style="margin-bottom:16px;">📚 Okuduğum Kitaplar</h3>';
        var kitaplar = Object.values(data);
        kitaplar.forEach(function(k) {
            var kapakHTML = k.cover ? '<img src="' + htmlEscape(k.cover) + '" style="width:40px;height:58px;border-radius:4px;object-fit:cover;flex-shrink:0;" onerror="this.style.display=\'none\'">' : '<div style="width:40px;height:58px;background:var(--bg-input);border-radius:4px;display:flex;align-items:center;justify-content:center;flex-shrink:0;">📖</div>';
            html += '<div style="display:flex;gap:12px;align-items:center;padding:10px 0;border-bottom:1px solid var(--border);">' +
                kapakHTML +
                '<div style="min-width:0;flex:1;">' +
                '<div style="font-weight:600;font-size:0.9rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">' + htmlEscape(k.title) + '</div>' +
                '<div style="font-size:0.8rem;color:var(--text-dim);">' + htmlEscape(k.author) + '</div>' +
                '<div style="font-size:0.72rem;color:var(--text-muted);margin-top:2px;">' + htmlEscape(k.roomName || '') + '</div>' +
                '</div></div>';
        });
        modalGoster(html);
    } catch (e) {
        yuklemeKapat();
        bildirimGoster("Kitaplar yüklenemedi.", "hata");
    }
}

// ══════════════════════════════════════════════════════════
// KİTAP ARAMA — Google Books API
// ══════════════════════════════════════════════════════════
function kitapAraDebounce() {
    if (kitapAraTimeout) clearTimeout(kitapAraTimeout);
    kitapAraTimeout = setTimeout(kitapAra, 400);
}

async function kitapAra() {
    var q = document.getElementById('kitap-arama-input').value.trim();
    var sonucDiv = document.getElementById('kitap-arama-sonuc');
    if (q.length < 2) { sonucDiv.innerHTML = '<div class="bos-durum"><div class="bos-durum-ikon">🔍</div><div class="bos-durum-metin">En az 2 karakter yaz...</div></div>'; return; }
    sonucDiv.innerHTML = '<div style="text-align:center;padding:24px;color:var(--text-dim);">Aranıyor...</div>';
    try {
        var url = 'https://www.googleapis.com/books/v1/volumes?q=' + encodeURIComponent(q) + '&langRestrict=tr&maxResults=10&key=' + BOOKS_API_KEY;
        var resp = await fetch(url);
        var data = await resp.json();
        if (!data.items || data.items.length === 0) {
            sonucDiv.innerHTML = '<div class="bos-durum"><div class="bos-durum-ikon">📭</div><div class="bos-durum-metin">Sonuç bulunamadı.</div></div>';
            return;
        }
        var html = '';
        data.items.forEach(function(item) {
            var vi = item.volumeInfo || {};
            var baslik = vi.title || 'Bilinmeyen';
            var yazar = (vi.authors || []).join(', ') || 'Bilinmeyen yazar';
            var kapak = (vi.imageLinks && vi.imageLinks.thumbnail) ? vi.imageLinks.thumbnail.replace('http:', 'https:') : '';
            var kat = (vi.categories || []).join(', ') || '';
            var isbn = '';
            if (vi.industryIdentifiers) {
                var i13 = vi.industryIdentifiers.find(function(x) { return x.type === 'ISBN_13'; });
                isbn = i13 ? i13.identifier : (vi.industryIdentifiers[0] || {}).identifier || '';
            }
            var kitapObj = JSON.stringify({ title: baslik, author: yazar, cover: kapak, isbn: isbn, categories: kat, googleId: item.id }).replace(/'/g, "\\'").replace(/"/g, '&quot;');
            var onerrorKapak = isbn ?
                'this.onerror=function(){this.style.display=&quot;none&quot;};this.src=&quot;https://covers.openlibrary.org/b/isbn/' + isbn + '-M.jpg&quot;' :
                'this.style.display=&quot;none&quot;';
            html += '<div class="kart kitap-sonuc" onclick=\'kitapSec(' + kitapObj + ')\'>' +
                (kapak ? '<img class="kitap-sonuc-kapak" src="' + kapak + '" onerror="' + onerrorKapak + '">' : '<div class="kitap-sonuc-kapak" style="display:flex;align-items:center;justify-content:center;font-size:1.5rem;">📖</div>') +
                '<div class="kitap-sonuc-bilgi"><div class="kitap-sonuc-adi">' + htmlEscape(baslik) + '</div>' +
                '<div class="kitap-sonuc-yazar">' + htmlEscape(yazar) + '</div>' +
                (kat ? '<div class="kitap-sonuc-kat">' + htmlEscape(kat) + '</div>' : '') +
                '</div></div>';
        });
        sonucDiv.innerHTML = html;
    } catch (e) {
        console.error("Kitap arama hatası:", e);
        sonucDiv.innerHTML = '<div class="bos-durum"><div class="bos-durum-metin" style="color:var(--red);">Arama hatası oluştu.</div></div>';
    }
}

function kitapSec(kitap) {
    seciliKitap = kitap;
    var alan = document.getElementById('secili-kitap-alan');
    var kapakOnerror = kitap.isbn ? 'this.onerror=function(){this.outerHTML=\'<div style=&quot;width:44px;height:64px;background:var(--bg-input);border-radius:6px;display:flex;align-items:center;justify-content:center;font-size:1.5rem;&quot;>📖</div>\'};this.src=\'https://covers.openlibrary.org/b/isbn/' + kitap.isbn + '-M.jpg\'' : 'this.outerHTML=\'<div style=&quot;width:44px;height:64px;background:var(--bg-input);border-radius:6px;display:flex;align-items:center;justify-content:center;font-size:1.5rem;&quot;>📖</div>\'';
    alan.innerHTML = '<div style="display:flex;gap:12px;align-items:center;">' +
        (kitap.cover ? '<img src="' + kitap.cover + '" style="width:44px;height:64px;border-radius:6px;object-fit:cover;" onerror="' + kapakOnerror + '">' : '<div style="width:44px;height:64px;background:var(--bg-input);border-radius:6px;display:flex;align-items:center;justify-content:center;font-size:1.5rem;">📖</div>') +
        '<div><div style="font-weight:600;font-size:0.95rem;">' + htmlEscape(kitap.title) + '</div>' +
        '<div style="font-size:0.8rem;color:var(--text-dim);">' + htmlEscape(kitap.author) + '</div>' +
        (kitap.bookUrl ? '<div style="font-size:0.75rem;color:var(--blue);margin-top:2px;">🔗 Kitap linki eklendi</div>' : '') +
        '</div></div>';
    alan.onclick = function() { ekranGoster('ekran-kitap-ara'); };
    ekranGoster('ekran-oda-olustur');
}

function manuelKitapModal() {
    modalGoster(
        '<h3 style="margin-bottom:16px;">📝 Manuel Kitap Ekle</h3>' +
        '<div class="form-group"><label class="form-label">Kitap Adı *</label><input type="text" id="mk-baslik" class="input" placeholder="Kitap adı"></div>' +
        '<div class="form-group"><label class="form-label">Yazar</label><input type="text" id="mk-yazar" class="input" placeholder="Yazar adı"></div>' +
        '<div class="form-group"><label class="form-label">Kapak URL (opsiyonel)</label><input type="text" id="mk-kapak" class="input" placeholder="https://... kapak resmi linki"></div>' +
        '<div class="form-group"><label class="form-label">📎 Kitap / PDF Linki (opsiyonel)</label><input type="text" id="mk-bookurl" class="input" placeholder="https://... kitap veya PDF linki"><div style="font-size:0.75rem;color:var(--text-dim);margin-top:4px;">Oda üyelerinin okuyabileceği online kitap veya PDF linki</div></div>' +
        '<button class="btn btn-amber btn-block" onclick="manuelKitapKaydet()">✓ Kitabı Seç</button>'
    );
}

function manuelKitapKaydet() {
    var baslik = document.getElementById('mk-baslik').value.trim();
    if (!baslik) { bildirimGoster("Kitap adı zorunlu.", "uyari"); return; }
    var yazar = document.getElementById('mk-yazar').value.trim() || 'Bilinmeyen';
    var kapak = document.getElementById('mk-kapak').value.trim() || '';
    var bookUrl = document.getElementById('mk-bookurl').value.trim() || '';
    kitapSec({ title: baslik, author: yazar, cover: kapak, isbn: '', categories: '', googleId: '', manual: true, bookUrl: bookUrl });
    modalKapat();
}

// ══════════════════════════════════════════════════════════
// ODA OLUŞTUR
// ══════════════════════════════════════════════════════════
async function odaOlustur() {
    if (!mevcutKullanici || !kullaniciBilgileri) return;
    if (!seciliKitap) { bildirimGoster("Lütfen bir kitap seç.", "uyari"); return; }
    var odaIsmi = document.getElementById('oda-ismi').value.trim();
    if (!odaIsmi || odaIsmi.length < 2) { bildirimGoster("Oda ismi en az 2 karakter olmalı.", "uyari"); return; }
    var secim = document.querySelector('input[name="baslangic"]:checked').value;
    if (secim === 'ileri') {
        var tarihStr = document.getElementById('oda-baslangic-tarih').value;
        if (!tarihStr) { bildirimGoster("Lütfen başlangıç tarihi seç.", "uyari"); return; }
        var secilen = new Date(tarihStr + 'T00:00:00').getTime();
        if (secilen <= Date.now()) { bildirimGoster("Başlangıç tarihi bugünden sonra olmalı.", "uyari"); return; }
    }
    var sifreSecim = document.querySelector('input[name="sifreSecim"]:checked').value;
    var sifreHash = '';
    if (sifreSecim === 'var') {
        var sifre = document.getElementById('oda-sifre').value.trim();
        if (!sifre || sifre.length < 3) { bildirimGoster("Şifre en az 3 karakter olmalı.", "uyari"); return; }
        sifreHash = basitHash(sifre);
    }
    var aciklama = document.getElementById('oda-aciklama').value.trim();
    var sure = parseInt(document.getElementById('oda-sure').value);
    var kategori = document.getElementById('oda-kategori').value;
    var baslangicTs = startsAtHesapla();
    var maxMembers = getMaxMembers();
    yuklemeGoster("Oda oluşturuluyor...");
    try {
        var now = Date.now();
        var odaVeri = {
            roomName: odaIsmi,
            book: seciliKitap,
            description: aciklama,
            category: kategori,
            durationDays: sure,
            createdAt: now,
            startsAt: baslangicTs,
            expiresAt: baslangicTs + (sure * 86400000),
            archiveAt: baslangicTs + (sure * 86400000) + (7 * 86400000),
            ownerId: mevcutKullanici.uid,
            ownerName: kullaniciBilgileri.displayName,
            memberCount: 1,
            maxMembers: maxMembers,
            messageCount: 0,
            status: 'active',
            hasPassword: sifreSecim === 'var',
            passwordHash: sifreHash
        };
        var ref = await db.ref('rooms').push(odaVeri);
        await db.ref('rooms/' + ref.key + '/members/' + mevcutKullanici.uid).set({
            displayName: kullaniciBilgileri.displayName,
            photoURL: kullaniciBilgileri.photoURL || '',
            joinedAt: now
        });
        var mevcut = kullaniciBilgileri.roomsJoined || 0;
        await db.ref('users/' + mevcutKullanici.uid).update({ roomsJoined: mevcut + 1 });
        kullaniciBilgileri.roomsJoined = mevcut + 1;

        yuklemeKapat();
        seciliKitap = null;
        document.getElementById('secili-kitap-alan').innerHTML = '<div style="display:flex;align-items:center;gap:12px;color:var(--text-dim);"><span style="font-size:2rem;">📖</span><span>Kitap seçmek için tıkla...</span></div>';
        document.getElementById('oda-ismi').value = '';
        document.getElementById('oda-aciklama').value = '';
        document.getElementById('oda-sure').value = 14; sureDegerGuncelle();
        document.getElementById('oda-max-uye').value = 50; document.getElementById('oda-max-uye-deger').textContent = '50 kişi';
        document.getElementById('oda-sinirsiz').checked = false; document.getElementById('oda-max-uye').disabled = false;
        document.querySelector('input[name="baslangic"][value="hemen"]').checked = true;
        document.getElementById('ileri-tarih-alan').classList.add('gizli');
        document.querySelector('input[name="sifreSecim"][value="yok"]').checked = true;
        document.getElementById('sifre-input-alan').classList.add('gizli');
        document.getElementById('oda-sifre').value = '';

        bildirimGoster("Oda oluşturuldu! 🎉", "basari");
        odayaGir(ref.key);
    } catch (e) {
        yuklemeKapat();
        console.error("Oda oluşturma hatası:", e);
        bildirimGoster("Oda oluşturulamadı.", "hata");
    }
}

// ══════════════════════════════════════════════════════════
// ODA LİSTESİ — ANA SAYFA (3 BÖLÜM)
// ══════════════════════════════════════════════════════════
function odalariYukle() {
    var aktifListe = document.getElementById('aktif-odalar-liste');
    var mesajlasmaListe = document.getElementById('mesajlasma-odalar-liste');
    var arsivListe = document.getElementById('arsiv-odalar-liste');
    var mesajlasmaBolum = document.getElementById('mesajlasma-bolum');
    var arsivBolum = document.getElementById('arsiv-bolum');

    if (odalarDinleyici) { db.ref('rooms').off('value', odalarDinleyici); }
    odalarDinleyici = db.ref('rooms').orderByChild('createdAt').on('value', function(snap) {
        var data = snap.val();
        if (!data) {
            aktifListe.innerHTML = '<div class="bos-durum"><div class="bos-durum-ikon">📚</div><div class="bos-durum-metin">Henüz oda yok.<br>İlk odayı sen oluştur!</div></div>';
            mesajlasmaBolum.classList.add('gizli');
            arsivBolum.classList.add('gizli');
            return;
        }

        var aktifOdalar = [];
        var mesajlasmaOdalar = [];
        var arsivOdalar = [];

        Object.keys(data).forEach(function(key) {
            var oda = data[key]; oda._id = key;
            var durum = odaDurumHesapla(oda);
            if (durum === 'aktif' || durum === 'bekliyor') {
                aktifOdalar.push(oda);
            } else if (durum === 'mesajlasma') {
                mesajlasmaOdalar.push(oda);
            } else {
                arsivOdalar.push(oda);
            }
        });

        aktifOdalar.sort(function(a, b) { return (b.createdAt || 0) - (a.createdAt || 0); });
        mesajlasmaOdalar.sort(function(a, b) { return (a.archiveAt || 0) - (b.archiveAt || 0); });
        arsivOdalar.sort(function(a, b) { return (b.archiveAt || 0) - (a.archiveAt || 0); });

        var aranan = (document.getElementById('ana-arama').value || '').toLowerCase().trim();
        var filtrele = function(odalar) {
            return odalar.filter(function(o) {
                if (aktifKategori !== 'hepsi' && o.category !== aktifKategori) return false;
                if (aranan) {
                    var kitapAdi = (o.book && o.book.title || '').toLowerCase();
                    var yazar = (o.book && o.book.author || '').toLowerCase();
                    var aciklama = (o.description || '').toLowerCase();
                    var odaIsmi = (o.roomName || '').toLowerCase();
                    if (kitapAdi.indexOf(aranan) === -1 && yazar.indexOf(aranan) === -1 && aciklama.indexOf(aranan) === -1 && odaIsmi.indexOf(aranan) === -1) return false;
                }
                return true;
            });
        };

        var fAktif = filtrele(aktifOdalar);
        var fMesajlasma = filtrele(mesajlasmaOdalar);
        var fArsiv = filtrele(arsivOdalar);

        if (fAktif.length === 0) {
            aktifListe.innerHTML = '<div class="bos-durum" style="padding:24px;"><div class="bos-durum-metin" style="font-size:0.85rem;">Aktif oda bulunamadı.</div></div>';
        } else {
            aktifListe.innerHTML = odaKartlariOlustur(fAktif, 'aktif');
        }

        if (fMesajlasma.length > 0) {
            mesajlasmaBolum.classList.remove('gizli');
            mesajlasmaListe.innerHTML = odaKartlariOlustur(fMesajlasma, 'mesajlasma');
        } else {
            mesajlasmaBolum.classList.add('gizli');
        }

        if (fArsiv.length > 0) {
            arsivBolum.classList.remove('gizli');
            arsivListe.innerHTML = odaKartlariOlustur(fArsiv, 'arsiv');
        } else {
            arsivBolum.classList.add('gizli');
        }
    });
}

function odaKartlariOlustur(odalar, bolumTipi) {
    var html = '';
    odalar.forEach(function(oda) {
        var durum = odaDurumHesapla(oda);
        var kalan = kalanGun(oda.expiresAt);
        var durumHTML;

        if (durum === 'bekliyor') {
            var bGun = odaBaslamayaKalanGun(oda);
            durumHTML = '<span class="badge badge-bekliyor">📅 ' + bGun + ' gün sonra • ' + oda.durationDays + ' günlük</span>';
        } else if (durum === 'aktif') {
            durumHTML = '<span class="badge badge-green">' + kalan + ' gün kaldı</span>';
        } else if (durum === 'mesajlasma') {
            var mKalan = mesajlasmaKalanGun(oda);
            durumHTML = '<span class="badge badge-mesajlasma">💬 ' + mKalan + ' gün mesajlaşma</span>';
        } else {
            durumHTML = '<span class="badge badge-arsiv">📦 Arşiv</span>';
        }

        var sifreIkon = oda.hasPassword ? ' 🔒' : '';
        var kapak = (oda.book && oda.book.cover) || '';
        var kapakIsbn = (oda.book && oda.book.isbn) || '';
        var odaOnerror = kapakIsbn ?
            'this.onerror=function(){this.outerHTML=\'<div class=&quot;oda-kapak&quot; style=&quot;display:flex;align-items:center;justify-content:center;font-size:1.8rem;background:var(--bg-input);&quot;>📖</div>\'};this.src=\'https://covers.openlibrary.org/b/isbn/' + kapakIsbn + '-M.jpg\'' :
            'this.outerHTML=\'<div class=&quot;oda-kapak&quot; style=&quot;display:flex;align-items:center;justify-content:center;font-size:1.8rem;background:var(--bg-input);&quot;>📖</div>\'';

        var onclickFn = 'odayaGir(\'' + oda._id + '\')';

        var kartClass = 'kart oda-kart';
        if (bolumTipi === 'mesajlasma') kartClass += ' mesajlasma-kart';
        if (bolumTipi === 'arsiv') kartClass += ' arsiv-kart';

        var odaIsmiGoster = oda.roomName ? '<div class="oda-ismi-goster">' + htmlEscape(oda.roomName) + sifreIkon + '</div>' : '';

        html += '<div class="' + kartClass + '" onclick="' + onclickFn + '">' +
            (kapak ? '<img class="oda-kapak" src="' + kapak + '" onerror="' + odaOnerror + '">' : '<div class="oda-kapak" style="display:flex;align-items:center;justify-content:center;font-size:1.8rem;background:var(--bg-input);">📖</div>') +
            '<div class="oda-bilgi">' +
            odaIsmiGoster +
            '<div class="oda-kitap-adi">' + htmlEscape(oda.book ? oda.book.title : '?') + '</div>' +
            '<div class="oda-yazar">' + htmlEscape(oda.book ? oda.book.author : '') + '</div>' +
            '<div class="oda-meta">' + durumHTML +
            '<span>👥 ' + (oda.memberCount || 1) + (oda.maxMembers ? '/' + oda.maxMembers : '') + '</span>' +
            '<span>💬 ' + (oda.messageCount || 0) + '</span>' +
            '</div></div></div>';
    });
    return html;
}

function kategoriSec(el) {
    document.querySelectorAll('#ana-kategori-bar .kat-chip').forEach(function(c) { c.classList.remove('aktif'); });
    el.classList.add('aktif');
    aktifKategori = el.getAttribute('data-k');
    odalariYukle();
}
function anaAramaFiltrele() { odalariYukle(); }

// ══════════════════════════════════════════════════════════
// ODALARIM — KULLANICININ KATILDIĞI ODALAR
// ══════════════════════════════════════════════════════════
function odalarimYukle() {
    if (!mevcutKullanici) return;
    var liste = document.getElementById('odalarim-liste');
    if (odalarimDinleyici) { db.ref('rooms').off('value', odalarimDinleyici); }

    odalarimDinleyici = db.ref('rooms').on('value', function(snap) {
        var data = snap.val();
        if (!data) {
            liste.innerHTML = '<div class="bos-durum"><div class="bos-durum-ikon">📖</div><div class="bos-durum-metin">Henüz bir odaya katılmadın.</div></div>';
            return;
        }

        var benimOdalarim = [];
        Object.keys(data).forEach(function(key) {
            var oda = data[key]; oda._id = key;
            if (oda.members && oda.members[mevcutKullanici.uid]) {
                benimOdalarim.push(oda);
            }
        });

        if (benimOdalarim.length === 0) {
            liste.innerHTML = '<div class="bos-durum"><div class="bos-durum-ikon">📖</div><div class="bos-durum-metin">Henüz bir odaya katılmadın.</div></div>';
            return;
        }

        // Aktif > Mesajlaşma > Arşiv sıralama
        var aktifler = [], mesajlasmalar = [], arsivler = [];
        benimOdalarim.forEach(function(oda) {
            var durum = odaDurumHesapla(oda);
            if (durum === 'aktif' || durum === 'bekliyor') aktifler.push(oda);
            else if (durum === 'mesajlasma') mesajlasmalar.push(oda);
            else arsivler.push(oda);
        });

        aktifler.sort(function(a, b) { return (b.createdAt || 0) - (a.createdAt || 0); });
        mesajlasmalar.sort(function(a, b) { return (a.archiveAt || 0) - (b.archiveAt || 0); });
        arsivler.sort(function(a, b) { return (b.archiveAt || 0) - (a.archiveAt || 0); });

        var html = '';
        if (aktifler.length > 0) {
            html += '<div class="bolum-baslik" style="margin-bottom:8px;">🔥 Aktif</div>';
            html += odaKartlariOlustur(aktifler, 'aktif');
        }
        if (mesajlasmalar.length > 0) {
            html += '<div class="bolum-baslik mesajlasma-bolum-baslik" style="margin-top:20px;margin-bottom:8px;">💬 Mesajlaşma</div>';
            html += odaKartlariOlustur(mesajlasmalar, 'mesajlasma');
        }
        if (arsivler.length > 0) {
            html += '<div class="bolum-baslik arsiv-bolum-baslik" style="margin-top:20px;margin-bottom:8px;">📦 Arşiv</div>';
            html += odaKartlariOlustur(arsivler, 'arsiv');
        }
        liste.innerHTML = html;
    });
}

// ══════════════════════════════════════════════════════════
// ŞİFRE MODALI
// ══════════════════════════════════════════════════════════
function sifreModalGoster(odaId, oda) {
    var odaAdi = oda.roomName || (oda.book ? oda.book.title : 'Bu oda');
    modalGoster(
        '<div style="text-align:center;">' +
        '<div style="font-size:2.5rem;margin-bottom:12px;">🔒</div>' +
        '<h3 style="margin-bottom:8px;">' + htmlEscape(odaAdi) + '</h3>' +
        '<p style="color:var(--text-secondary);margin-bottom:16px;font-size:0.9rem;">Bu oda şifre korumalı. Giriş için şifreyi girin.</p>' +
        '<div class="form-group"><input type="password" id="sifre-giris-input" class="input" placeholder="Oda şifresi..." maxlength="32" onkeydown="if(event.key===\'Enter\')sifreDogrula(\'' + odaId + '\')"></div>' +
        '<button class="btn btn-amber btn-block" onclick="sifreDogrula(\'' + odaId + '\')">🔓 Giriş Yap</button>' +
        '</div>'
    );
    setTimeout(function() {
        var inp = document.getElementById('sifre-giris-input');
        if (inp) inp.focus();
    }, 200);
}

async function sifreDogrula(odaId) {
    var inp = document.getElementById('sifre-giris-input');
    if (!inp) return;
    var sifre = inp.value.trim();
    if (!sifre) { bildirimGoster("Şifre boş olamaz.", "uyari"); return; }

    var hash = basitHash(sifre);
    try {
        var snap = await db.ref('rooms/' + odaId + '/passwordHash').once('value');
        var dogruHash = snap.val();
        if (hash === dogruHash) {
            modalKapat();
            odaIciniAc(odaId);
        } else {
            bildirimGoster("Şifre yanlış!", "hata");
            inp.value = '';
            inp.focus();
        }
    } catch (e) {
        bildirimGoster("Şifre doğrulama hatası.", "hata");
    }
}

// ══════════════════════════════════════════════════════════
// ODA İÇİ — GİRİŞ (YENİ AKIŞ)
// Odaya tıkla → şifreli ise şifre sor → mesajları read-only göster
// → üye değilse "Odaya Katıl" butonu → katılınca mesaj yazabilir
// ══════════════════════════════════════════════════════════
async function odayaGir(odaId) {
    yuklemeGoster("Oda yükleniyor...");
    try {
        var snap = await db.ref('rooms/' + odaId).once('value');
        var oda = snap.val();
        if (!oda) { yuklemeKapat(); bildirimGoster("Oda bulunamadı.", "hata"); return; }

        // Şifreli oda kontrolü — üye veya sahip değilse şifre sor
        if (oda.hasPassword && oda.passwordHash) {
            if (oda.ownerId === mevcutKullanici.uid) {
                yuklemeKapat(); odaIciniAc(odaId); return;
            }
            var uyeSnap = await db.ref('rooms/' + odaId + '/members/' + mevcutKullanici.uid).once('value');
            if (uyeSnap.val()) {
                yuklemeKapat(); odaIciniAc(odaId); return;
            }
            yuklemeKapat();
            sifreModalGoster(odaId, oda);
            return;
        }

        yuklemeKapat();
        odaIciniAc(odaId);
    } catch (e) {
        yuklemeKapat();
        console.error("Odaya giriş hatası:", e);
        bildirimGoster("Odaya girilemedi.", "hata");
    }
}

async function odaIciniAc(odaId) {
    yuklemeGoster("Oda yükleniyor...");
    try {
        var snap = await db.ref('rooms/' + odaId).once('value');
        var oda = snap.val();
        if (!oda) { yuklemeKapat(); bildirimGoster("Oda bulunamadı.", "hata"); return; }

        aktifOdaId = odaId;
        aktifOdaVeri = oda;

        var durum = odaDurumHesapla(oda);
        arsivModuAktif = (durum === 'arsiv');

        // Üye mi kontrol et
        var uyeSnap = await db.ref('rooms/' + odaId + '/members/' + mevcutKullanici.uid).once('value');
        odaUyesiMi = !!uyeSnap.val();

        // Okudum durumunu kontrol et
        odaOkuduMu = false;
        if (odaUyesiMi) {
            var okudumSnap = await db.ref('rooms/' + odaId + '/readers/' + mevcutKullanici.uid).once('value');
            odaOkuduMu = !!okudumSnap.val();
        }

        // Okuyanlar listesini yükle
        var readersSnap = await db.ref('rooms/' + odaId + '/readers').once('value');
        odaOkuyanlar = readersSnap.val() || {};

        var mcSnap = await db.ref('rooms/' + odaId + '/memberCount').once('value');
        var guncelmcVal = mcSnap.val() || 1;
        oda.memberCount = guncelmcVal;

        // Header
        document.getElementById('oda-h-kitap').textContent = oda.roomName || (oda.book ? oda.book.title : '?');
        var kalan = kalanGun(oda.expiresAt);

        if (durum === 'bekliyor') {
            var bGun = odaBaslamayaKalanGun(oda);
            document.getElementById('oda-h-durum').textContent = bGun + ' gün sonra başlayacak • ' + oda.durationDays + ' günlük';
        } else if (durum === 'mesajlasma') {
            var mKalan = mesajlasmaKalanGun(oda);
            document.getElementById('oda-h-durum').textContent = '💬 Mesajlaşma: ' + mKalan + ' gün kaldı';
        } else if (durum === 'arsiv') {
            document.getElementById('oda-h-durum').textContent = '📦 Arşiv • ' + (oda.memberCount || 1) + ' üye';
        } else {
            document.getElementById('oda-h-durum').textContent = kalan + ' gün kaldı • ' + (oda.memberCount || 1) + ' üye';
        }
        document.getElementById('oda-h-uye-sayi').textContent = oda.memberCount || 1;

        // Okudum toggle
        okudumToggleGuncelle();

        // Bannerlar
        var bannerDoldu = document.getElementById('oda-sure-doldu-banner');
        var bannerArsiv = document.getElementById('oda-arsiv-banner');
        var bannerBaslamamis = document.getElementById('oda-baslamamis-banner');
        var girdi = document.getElementById('mesaj-girdi');
        var katilAlan = document.getElementById('oda-katil-alan');

        bannerDoldu.classList.add('gizli');
        bannerArsiv.classList.add('gizli');
        bannerBaslamamis.classList.add('gizli');
        katilAlan.classList.add('gizli');
        girdi.style.display = 'none';

        if (durum === 'arsiv') {
            bannerArsiv.classList.remove('gizli');
            // Arşivde katıl butonu yok, mesaj girişi yok
        } else if (durum === 'bekliyor') {
            var bGun2 = odaBaslamayaKalanGun(oda);
            bannerBaslamamis.innerHTML = '📅 Bu oda <strong>' + formatTarih(oda.startsAt) + '</strong> tarihinde başlayacak (' + bGun2 + ' gün sonra)<br>📖 ' + oda.durationDays + ' günlük okuma süresi • Mesajlaşma açık!';
            bannerBaslamamis.classList.remove('gizli');
            if (odaUyesiMi) {
                girdi.style.display = '';
            } else {
                katilAlan.classList.remove('gizli');
            }
        } else if (durum === 'mesajlasma') {
            var mKalan2 = mesajlasmaKalanGun(oda);
            bannerDoldu.innerHTML = '⏰ Okuma süresi doldu — <strong>💬 ' + mKalan2 + ' gün mesajlaşma hakkı</strong> kaldı';
            bannerDoldu.classList.remove('gizli');
            if (odaUyesiMi) {
                girdi.style.display = '';
            } else {
                katilAlan.classList.remove('gizli');
            }
        } else {
            // Aktif
            if (odaUyesiMi) {
                girdi.style.display = '';
            } else {
                katilAlan.classList.remove('gizli');
            }
        }

        document.getElementById('mesaj-alani').innerHTML = '';
        document.getElementById('mesaj-input').value = '';

        ekranGoster('ekran-oda');
        yuklemeKapat();

        mesajDinle(odaId);
        uyeSayisiDinle(odaId);

    } catch (e) {
        yuklemeKapat();
        console.error("Odaya giriş hatası:", e);
        bildirimGoster("Odaya girilemedi.", "hata");
    }
}

// ══════════════════════════════════════════════════════════
// ODAYA KATIL
// ══════════════════════════════════════════════════════════
async function odayaKatil() {
    if (!aktifOdaId || !mevcutKullanici || !aktifOdaVeri) return;
    var oda = aktifOdaVeri;
    var durum = odaDurumHesapla(oda);

    // Arşivde katılma yok
    if (durum === 'arsiv') {
        bildirimGoster("Bu oda arşivde. Katılım yapılamaz.", "uyari");
        return;
    }

    // Üye sayısı kontrolü
    if (oda.maxMembers && oda.maxMembers > 0) {
        var membersSnap = await db.ref('rooms/' + aktifOdaId + '/members').once('value');
        var mevcutUyeSayi = membersSnap.numChildren();
        if (mevcutUyeSayi >= oda.maxMembers) {
            bildirimGoster("Bu oda dolu! (Maks " + oda.maxMembers + " üye)", "uyari");
            return;
        }
    }

    yuklemeGoster("Odaya katılınıyor...");
    try {
        await db.ref('rooms/' + aktifOdaId + '/members/' + mevcutKullanici.uid).set({
            displayName: kullaniciBilgileri.displayName,
            photoURL: kullaniciBilgileri.photoURL || '',
            joinedAt: Date.now()
        });
        await db.ref('rooms/' + aktifOdaId + '/memberCount').transaction(function(c) { return (c || 0) + 1; });
        var mevcut = kullaniciBilgileri.roomsJoined || 0;
        await db.ref('users/' + mevcutKullanici.uid).update({ roomsJoined: mevcut + 1 });
        kullaniciBilgileri.roomsJoined = mevcut + 1;

        odaUyesiMi = true;
        yuklemeKapat();

        // UI güncelle: katıl alanı gizle, mesaj girişi göster
        document.getElementById('oda-katil-alan').classList.add('gizli');
        document.getElementById('mesaj-girdi').style.display = '';

        // Okudum toggle göster
        okudumToggleGuncelle();

        bildirimGoster("Odaya katıldın! 🎉", "basari");
    } catch (e) {
        yuklemeKapat();
        console.error("Odaya katılma hatası:", e);
        bildirimGoster("Odaya katılınamadı.", "hata");
    }
}

// ══════════════════════════════════════════════════════════
// OKUDUM TİKİ
// ══════════════════════════════════════════════════════════
function okudumToggleGuncelle() {
    var toggle = document.getElementById('oda-okudum-toggle');
    var ikon = document.getElementById('oda-okudum-ikon');
    var metin = document.getElementById('oda-okudum-metin');

    if (!odaUyesiMi || !aktifOdaVeri) {
        toggle.classList.add('gizli');
        return;
    }

    toggle.classList.remove('gizli');

    if (odaOkuduMu) {
        ikon.textContent = '✅';
        metin.textContent = 'Okudum';
        toggle.classList.add('okudum-aktif');
    } else {
        ikon.textContent = '☐';
        metin.textContent = 'Okudum';
        toggle.classList.remove('okudum-aktif');
    }

    // Arşivdeyse tıklanamaz
    var durum = odaDurumHesapla(aktifOdaVeri);
    if (durum === 'arsiv') {
        toggle.style.opacity = '0.5';
        toggle.style.pointerEvents = 'none';
    } else {
        toggle.style.opacity = '';
        toggle.style.pointerEvents = '';
    }
}

async function okudumToggle() {
    if (!aktifOdaId || !mevcutKullanici || !odaUyesiMi || !aktifOdaVeri) return;

    var durum = odaDurumHesapla(aktifOdaVeri);
    if (durum === 'arsiv') {
        bildirimGoster("Bu oda arşivde. Okudum durumu değiştirilemez.", "uyari");
        return;
    }

    var yeniDurum = !odaOkuduMu;

    try {
        if (yeniDurum) {
            // Okudum olarak işaretle
            await db.ref('rooms/' + aktifOdaId + '/readers/' + mevcutKullanici.uid).set({
                displayName: kullaniciBilgileri.displayName,
                markedAt: Date.now()
            });
            // Profildeki booksRead artır
            var booksRead = (kullaniciBilgileri.booksRead || 0) + 1;
            await db.ref('users/' + mevcutKullanici.uid).update({ booksRead: booksRead });
            kullaniciBilgileri.booksRead = booksRead;
            // Okunan kitap kaydı
            var book = aktifOdaVeri.book || {};
            await db.ref('users/' + mevcutKullanici.uid + '/readBooks/' + aktifOdaId).set({
                title: book.title || '?',
                author: book.author || '',
                cover: book.cover || '',
                roomName: aktifOdaVeri.roomName || '',
                readAt: Date.now()
            });
            odaOkuyanlar[mevcutKullanici.uid] = true;
            bildirimGoster("Kitap okudum olarak işaretlendi! 📗", "basari");
        } else {
            // Okumadım olarak işaretle
            await db.ref('rooms/' + aktifOdaId + '/readers/' + mevcutKullanici.uid).remove();
            var booksRead2 = Math.max(0, (kullaniciBilgileri.booksRead || 0) - 1);
            await db.ref('users/' + mevcutKullanici.uid).update({ booksRead: booksRead2 });
            kullaniciBilgileri.booksRead = booksRead2;
            await db.ref('users/' + mevcutKullanici.uid + '/readBooks/' + aktifOdaId).remove();
            delete odaOkuyanlar[mevcutKullanici.uid];
            bildirimGoster("Okudum işareti kaldırıldı.", "bilgi");
        }

        odaOkuduMu = yeniDurum;
        okudumToggleGuncelle();
    } catch (e) {
        console.error("Okudum toggle hatası:", e);
        bildirimGoster("İşlem başarısız.", "hata");
    }
}

// ══════════════════════════════════════════════════════════
// MESAJLAŞMA
// ══════════════════════════════════════════════════════════
function mesajDinle(odaId) {
    if (mesajDinleyici) { db.ref('rooms/' + mesajDinleyici + '/messages').off('child_added'); }
    mesajDinleyici = odaId;
    db.ref('rooms/' + odaId + '/messages').orderByChild('ts').on('child_added', function(snap) {
        var m = snap.val();
        var alan = document.getElementById('mesaj-alani');
        var benMi = m.uid === mevcutKullanici.uid;
        var okuyanMi = odaOkuyanlar[m.uid] ? true : false;

        if (m.type === 'system') {
            alan.innerHTML += '<div class="mesaj mesaj-sistem">' + htmlEscape(m.text) + '</div>';
        } else {
            var mesajClass = 'mesaj ' + (benMi ? 'mesaj-giden' : 'mesaj-gelen');
            if (okuyanMi && !benMi) mesajClass += ' mesaj-okuyan';
            if (okuyanMi && benMi) mesajClass += ' mesaj-giden-okuyan';

            alan.innerHTML += '<div class="' + mesajClass + '">' +
                (!benMi ? '<div class="mesaj-gonderen">' + htmlEscape(m.name || '?') + (okuyanMi ? ' 📗' : '') + '</div>' : '') +
                '<div>' + linkifyText(htmlEscape(m.text)) + '</div>' +
                '<div class="mesaj-saat">' + formatSaat(m.ts) + '</div></div>';
        }
        alan.scrollTop = alan.scrollHeight;
    });
}

function linkifyText(text) {
    return text.replace(/(https?:\/\/[^\s<]+)/g, '<a href="$1" target="_blank" rel="noopener" style="color:inherit;text-decoration:underline;">$1</a>');
}

async function mesajGonder() {
    var input = document.getElementById('mesaj-input');
    var text = input.value.trim();
    if (!text || !aktifOdaId || !mevcutKullanici) return;
    if (!odaUyesiMi) {
        bildirimGoster("Mesaj göndermek için odaya katılmalısın.", "uyari"); return;
    }
    if (arsivModuAktif) {
        bildirimGoster("Bu oda arşivde. Mesaj yazılamaz.", "uyari"); return;
    }
    if (aktifOdaVeri && aktifOdaVeri.archiveAt && aktifOdaVeri.archiveAt < Date.now()) {
        bildirimGoster("Bu odanın mesajlaşma süresi dolmuş.", "uyari"); return;
    }
    input.value = '';
    try {
        await db.ref('rooms/' + aktifOdaId + '/messages').push({
            uid: mevcutKullanici.uid,
            name: kullaniciBilgileri.displayName,
            text: text,
            ts: Date.now()
        });
        db.ref('rooms/' + aktifOdaId + '/messageCount').transaction(function(c) { return (c || 0) + 1; });
        var ms = (kullaniciBilgileri.messagesSent || 0) + 1;
        db.ref('users/' + mevcutKullanici.uid).update({ messagesSent: ms });
        kullaniciBilgileri.messagesSent = ms;
    } catch (e) {
        console.error("Mesaj gönderme hatası:", e);
        bildirimGoster("Mesaj gönderilemedi.", "hata");
    }
}

function odadanCik() {
    odaDinleyicileriKapat();
    aktifOdaId = null; aktifOdaVeri = null;
    arsivModuAktif = false;
    odaUyesiMi = false;
    odaOkuduMu = false;
    odaOkuyanlar = {};
    ekranGoster('ekran-ana');
}

function odaDinleyicileriKapat() {
    if (mesajDinleyici) {
        db.ref('rooms/' + mesajDinleyici + '/messages').off('child_added');
        db.ref('rooms/' + mesajDinleyici + '/memberCount').off('value');
        mesajDinleyici = null;
    }
}

function uyeSayisiDinle(odaId) {
    db.ref('rooms/' + odaId + '/memberCount').on('value', function(snap) {
        var mc = snap.val() || 0;
        document.getElementById('oda-h-uye-sayi').textContent = mc;
        if (aktifOdaVeri) aktifOdaVeri.memberCount = mc;
    });
}

function odaBilgiModal() {
    if (!aktifOdaVeri || !aktifOdaId) return;
    var oda = aktifOdaVeri;
    var durum = odaDurumHesapla(oda);
    var durumRenk, durumMetin;

    if (arsivModuAktif || durum === 'arsiv') {
        durumRenk = 'var(--text-muted)'; durumMetin = '📦 Arşiv';
    } else if (durum === 'bekliyor') {
        durumRenk = 'var(--blue)'; durumMetin = formatTarih(oda.startsAt) + ' başlayacak';
    } else if (durum === 'mesajlasma') {
        durumRenk = 'var(--purple, #b388ff)'; durumMetin = '💬 ' + mesajlasmaKalanGun(oda) + ' gün';
    } else {
        durumRenk = 'var(--green)'; durumMetin = kalanGun(oda.expiresAt) + ' gün';
    }

    var sifreDurum = oda.hasPassword ? '<div style="font-size:0.82rem;color:var(--amber);margin-bottom:8px;">🔒 Şifreli Oda</div>' : '<div style="font-size:0.82rem;color:var(--green);margin-bottom:8px;">🔓 Şifresiz Oda</div>';
    var odaIsmiHTML = oda.roomName ? '<div style="font-size:0.9rem;color:var(--text-secondary);margin-bottom:4px;">' + htmlEscape(oda.roomName) + '</div>' : '';
    var kalanLabel = (arsivModuAktif || durum === 'arsiv') ? 'Durum' : (durum === 'bekliyor' ? 'Başlangıç' : (durum === 'mesajlasma' ? 'Mesajlaşma' : 'Kalan'));

    var html = '<div style="text-align:center;">' +
        (oda.book && oda.book.cover ? '<img src="' + oda.book.cover + '" style="width:80px;height:120px;border-radius:8px;object-fit:cover;margin-bottom:12px;">' : '') +
        odaIsmiHTML +
        '<h3 style="margin-bottom:4px;">' + htmlEscape(oda.book ? oda.book.title : '?') + '</h3>' +
        '<div style="font-size:0.85rem;color:var(--text-dim);margin-bottom:8px;">' + htmlEscape(oda.book ? oda.book.author : '') + '</div>' +
        sifreDurum +
        (oda.description ? '<p style="font-size:0.9rem;color:var(--text-secondary);margin-bottom:16px;">' + htmlEscape(oda.description) + '</p>' : '') +
        (oda.book && oda.book.bookUrl ? '<a href="' + htmlEscape(oda.book.bookUrl) + '" target="_blank" rel="noopener" class="btn btn-outline btn-sm btn-block" style="margin-bottom:16px;">📎 Kitabı Oku / PDF Aç</a>' : '') +
        '<div style="display:flex;gap:0;background:var(--bg-input);border-radius:var(--radius-sm);overflow:hidden;margin-bottom:12px;">' +
        '<div style="flex:1;padding:10px;text-align:center;border-right:1px solid var(--border);"><div style="font-weight:700;color:var(--amber);">' + (oda.memberCount || 1) + (oda.maxMembers ? '<span style="font-size:0.7rem;color:var(--text-dim);">/' + oda.maxMembers + '</span>' : '') + '</div><div style="font-size:0.75rem;color:var(--text-dim);">Üye</div></div>' +
        '<div style="flex:1;padding:10px;text-align:center;border-right:1px solid var(--border);"><div style="font-weight:700;color:var(--amber);">' + (oda.messageCount || 0) + '</div><div style="font-size:0.75rem;color:var(--text-dim);">Mesaj</div></div>' +
        '<div style="flex:1;padding:10px;text-align:center;"><div style="font-weight:700;color:' + durumRenk + ';">' + durumMetin + '</div><div style="font-size:0.75rem;color:var(--text-dim);">' + kalanLabel + '</div></div>' +
        '</div>' +
        '<div style="background:var(--bg-input);border-radius:var(--radius-sm);padding:10px;margin-bottom:12px;font-size:0.82rem;color:var(--text-secondary);line-height:1.6;">' +
        '📅 Başlangıç: <strong>' + formatTarih(oda.startsAt || oda.createdAt) + '</strong><br>' +
        '⏰ Okuma bitiş: <strong>' + formatTarih(oda.expiresAt) + '</strong><br>' +
        '💬 Mesajlaşma bitiş: <strong>' + formatTarih(oda.archiveAt) + '</strong><br>' +
        '📖 Okuma süresi: <strong>' + (oda.durationDays || '?') + ' gün</strong> + 7 gün mesajlaşma' +
        '</div>' +
        '<div style="font-size:0.8rem;color:var(--text-muted);">Oluşturan: ' + htmlEscape(oda.ownerName || '?') + '</div>' +
        '</div>';
    if (oda.ownerId === mevcutKullanici.uid) {
        html += '<button class="btn btn-red btn-block btn-sm" style="margin-top:12px;" onclick="odaSil()">🗑️ Odayı Sil</button>';
    }
    modalGoster(html);
}

async function odaSil() {
    if (!aktifOdaId) return;
    try {
        await db.ref('rooms/' + aktifOdaId).remove();
        modalKapat();
        odadanCik();
        bildirimGoster("Oda silindi.", "bilgi");
    } catch (e) {
        bildirimGoster("Oda silinemedi.", "hata");
    }
}

// ══════════════════════════════════════════════════════════
// BAŞLATMA
// ══════════════════════════════════════════════════════════
window.addEventListener('DOMContentLoaded', function() {
    console.log("📚 OkuBirlikte yükleniyor...");
    yuklemeGoster("OkuBirlikte yükleniyor...");
    setTimeout(yuklemeKapat, 1500);
});