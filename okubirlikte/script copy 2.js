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
var seciliKitap = null;          // Oda oluştururken seçilen kitap
var aktifOdaId = null;           // Şu an içinde olunan oda
var aktifOdaVeri = null;         // Aktif oda verisi
var mesajDinleyici = null;       // Chat listener ref
var odalarDinleyici = null;      // Rooms listener ref
var aktifEkranId = 'ekran-giris';
var aktifKategori = 'hepsi';
var kitapAraTimeout = null;
var geciciFotoData = null;
var arsivModuAktif = false;      // Arşiv modunda mı

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
    var fab = document.querySelector('.fab');
    if (fab) fab.classList.toggle('gizli', id !== 'ekran-ana');
    window.scrollTo(0, 0);
}

function altMenuGoster() { var m = document.getElementById('alt-menu'); if (m) m.classList.remove('gizli'); }
function altMenuGizle() { var m = document.getElementById('alt-menu'); if (m) m.classList.add('gizli'); }
function menuTikla(id, btn) { ekranGoster(id); }
function menuAktifGuncelle(id) {
    document.querySelectorAll('#alt-menu button').forEach(function(b) { b.classList.remove('aktif'); });
    var map = { 'ekran-ana': 'menu-ana', 'ekran-profil': 'menu-profil' };
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
        // Min tarih: yarın
        var yarin = new Date(); yarin.setDate(yarin.getDate() + 1);
        var maxTarih = new Date(); maxTarih.setDate(maxTarih.getDate() + 90);
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

// Basit şifre hash fonksiyonu (client-side güvenlik için yeterli)
function basitHash(str) {
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
        var char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // 32bit int
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
    // İleri tarih validasyonu
    var secim = document.querySelector('input[name="baslangic"]:checked').value;
    if (secim === 'ileri') {
        var tarihStr = document.getElementById('oda-baslangic-tarih').value;
        if (!tarihStr) { bildirimGoster("Lütfen başlangıç tarihi seç.", "uyari"); return; }
        var secilen = new Date(tarihStr + 'T00:00:00').getTime();
        if (secilen <= Date.now()) { bildirimGoster("Başlangıç tarihi bugünden sonra olmalı.", "uyari"); return; }
    }
    // Şifre kontrolü
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
        // İstatistik güncelle
        var mevcut = kullaniciBilgileri.roomsJoined || 0;
        await db.ref('users/' + mevcutKullanici.uid).update({ roomsJoined: mevcut + 1 });
        kullaniciBilgileri.roomsJoined = mevcut + 1;

        yuklemeKapat();
        // Formu sıfırla
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
// ODA LİSTESİ — ANA SAYFA (AKTİF + ARŞİV)
// ══════════════════════════════════════════════════════════
function odalariYukle() {
    var liste = document.getElementById('aktif-odalar-liste');
    var arsivListe = document.getElementById('arsiv-odalar-liste');
    if (odalarDinleyici) { db.ref('rooms').off('value', odalarDinleyici); }
    odalarDinleyici = db.ref('rooms').orderByChild('createdAt').on('value', function(snap) {
        var data = snap.val();
        if (!data) {
            liste.innerHTML = '<div class="bos-durum"><div class="bos-durum-ikon">📚</div><div class="bos-durum-metin">Henüz oda yok.<br>İlk odayı sen oluştur!</div></div>';
            arsivListe.innerHTML = '';
            return;
        }
        var aktifOdalar = [];
        var arsivOdalar = [];
        Object.keys(data).forEach(function(key) {
            var oda = data[key]; oda._id = key;
            var sureDoldu = oda.expiresAt && oda.expiresAt < Date.now();
            if (sureDoldu) {
                // Süresi dolmuş = arşiv
                arsivOdalar.push(oda);
            } else {
                // Aktif veya henüz başlamamış
                aktifOdalar.push(oda);
            }
        });
        // En yeni en üstte
        aktifOdalar.sort(function(a, b) { return (b.createdAt || 0) - (a.createdAt || 0); });
        arsivOdalar.sort(function(a, b) { return (b.expiresAt || 0) - (a.expiresAt || 0); });

        // Kategori ve arama filtresi
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

        var filtrelenmisAktif = filtrele(aktifOdalar);
        var filtrelenmisArsiv = filtrele(arsivOdalar);

        // Aktif odalar render
        if (filtrelenmisAktif.length === 0) {
            liste.innerHTML = '<div class="bos-durum"><div class="bos-durum-ikon">🔍</div><div class="bos-durum-metin">Aktif oda bulunamadı.</div></div>';
        } else {
            liste.innerHTML = odaKartlariOlustur(filtrelenmisAktif, false);
        }

        // Arşiv odalar render
        if (filtrelenmisArsiv.length === 0) {
            arsivListe.innerHTML = '<div class="bos-durum" style="padding:24px;"><div class="bos-durum-metin" style="font-size:0.85rem;">Arşivde oda yok.</div></div>';
        } else {
            arsivListe.innerHTML = odaKartlariOlustur(filtrelenmisArsiv, true);
        }
    });
}

function odaKartlariOlustur(odalar, arsivMi) {
    var html = '';
    odalar.forEach(function(oda) {
        var sureDoldu = oda.expiresAt && oda.expiresAt < Date.now();
        var basladiMi = odaBasladiMi(oda);
        var kalan = kalanGun(oda.expiresAt);
        var durum;
        if (arsivMi) {
            durum = '<span class="badge badge-arsiv">📦 Arşiv</span>';
        } else if (!basladiMi) {
            var bGun = odaBaslamayaKalanGun(oda);
            durum = '<span class="badge badge-bekliyor">📅 ' + bGun + ' gün sonra • ' + oda.durationDays + ' günlük</span>';
        } else if (sureDoldu) {
            durum = '<span class="badge badge-red">Süresi dolmuş</span>';
        } else {
            durum = '<span class="badge badge-green">' + kalan + ' gün kaldı</span>';
        }
        var sifreIkon = oda.hasPassword ? ' 🔒' : '';
        var kapak = (oda.book && oda.book.cover) || '';
        var kapakIsbn = (oda.book && oda.book.isbn) || '';
        var odaOnerror = kapakIsbn ?
            'this.onerror=function(){this.outerHTML=\'<div class=&quot;oda-kapak&quot; style=&quot;display:flex;align-items:center;justify-content:center;font-size:1.8rem;background:var(--bg-input);&quot;>📖</div>\'};this.src=\'https://covers.openlibrary.org/b/isbn/' + kapakIsbn + '-M.jpg\'' :
            'this.outerHTML=\'<div class=&quot;oda-kapak&quot; style=&quot;display:flex;align-items:center;justify-content:center;font-size:1.8rem;background:var(--bg-input);&quot;>📖</div>\'';
        var onclickFn = arsivMi ? 'arsivOdayaGir(\'' + oda._id + '\')' : 'odayaGir(\'' + oda._id + '\')';
        var odaIsmiGoster = oda.roomName ? '<div class="oda-ismi-goster">' + htmlEscape(oda.roomName) + sifreIkon + '</div>' : '';
        html += '<div class="kart oda-kart' + (arsivMi ? ' arsiv-kart' : '') + '" onclick="' + onclickFn + '">' +
            (kapak ? '<img class="oda-kapak" src="' + kapak + '" onerror="' + odaOnerror + '">' : '<div class="oda-kapak" style="display:flex;align-items:center;justify-content:center;font-size:1.8rem;background:var(--bg-input);">📖</div>') +
            '<div class="oda-bilgi">' +
            odaIsmiGoster +
            '<div class="oda-kitap-adi">' + htmlEscape(oda.book ? oda.book.title : '?') + '</div>' +
            '<div class="oda-yazar">' + htmlEscape(oda.book ? oda.book.author : '') + '</div>' +
            '<div class="oda-meta">' + durum +
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
// ARŞİV ODAYA GİRİŞ (şifre kontrolü dahil)
// ══════════════════════════════════════════════════════════
async function arsivOdayaGir(odaId) {
    yuklemeGoster("Oda yükleniyor...");
    try {
        var snap = await db.ref('rooms/' + odaId).once('value');
        var oda = snap.val();
        if (!oda) { yuklemeKapat(); bildirimGoster("Oda bulunamadı.", "hata"); return; }

        // Şifreli arşiv odası kontrolü
        if (oda.hasPassword && oda.passwordHash) {
            // Oda sahibi kontrolü - sahip şifresiz girebilir
            if (oda.ownerId === mevcutKullanici.uid) {
                yuklemeKapat();
                arsivOdaAc(odaId, oda);
                return;
            }
            // Daha önce üye olmuşsa şifresiz girebilir
            var uyeSnap = await db.ref('rooms/' + odaId + '/members/' + mevcutKullanici.uid).once('value');
            if (uyeSnap.val()) {
                yuklemeKapat();
                arsivOdaAc(odaId, oda);
                return;
            }
            // Şifre sor
            yuklemeKapat();
            sifreModalGoster(odaId, oda, true);
            return;
        }

        yuklemeKapat();
        arsivOdaAc(odaId, oda);
    } catch (e) {
        yuklemeKapat();
        console.error("Arşiv oda hatası:", e);
        bildirimGoster("Oda yüklenemedi.", "hata");
    }
}

function arsivOdaAc(odaId, oda) {
    aktifOdaId = odaId;
    aktifOdaVeri = oda;
    arsivModuAktif = true;

    // Header güncelle
    document.getElementById('oda-h-kitap').textContent = oda.roomName || (oda.book ? oda.book.title : '?');
    document.getElementById('oda-h-durum').textContent = '📦 Arşiv • ' + (oda.memberCount || 1) + ' üye';
    document.getElementById('oda-h-uye-sayi').textContent = oda.memberCount || 1;

    // Bannerlar
    var bannerDoldu = document.getElementById('oda-sure-doldu-banner');
    var bannerArsiv = document.getElementById('oda-arsiv-banner');
    var bannerBaslamamis = document.getElementById('oda-baslamamis-banner');
    var girdi = document.getElementById('mesaj-girdi');

    bannerDoldu.classList.add('gizli');
    bannerBaslamamis.classList.add('gizli');
    bannerArsiv.classList.remove('gizli');
    girdi.style.display = 'none';

    // Mesaj alanını temizle
    document.getElementById('mesaj-alani').innerHTML = '';
    document.getElementById('mesaj-input').value = '';

    ekranGoster('ekran-oda');
    mesajDinle(odaId);
}

// ══════════════════════════════════════════════════════════
// ŞİFRE MODALI
// ══════════════════════════════════════════════════════════
function sifreModalGoster(odaId, oda, arsivMi) {
    var odaAdi = oda.roomName || (oda.book ? oda.book.title : 'Bu oda');
    modalGoster(
        '<div style="text-align:center;">' +
        '<div style="font-size:2.5rem;margin-bottom:12px;">🔒</div>' +
        '<h3 style="margin-bottom:8px;">' + htmlEscape(odaAdi) + '</h3>' +
        '<p style="color:var(--text-secondary);margin-bottom:16px;font-size:0.9rem;">Bu oda şifre korumalı. Giriş için şifreyi girin.</p>' +
        '<div class="form-group"><input type="password" id="sifre-giris-input" class="input" placeholder="Oda şifresi..." maxlength="32" onkeydown="if(event.key===\'Enter\')sifreDogrula(\'' + odaId + '\',' + arsivMi + ')"></div>' +
        '<button class="btn btn-amber btn-block" onclick="sifreDogrula(\'' + odaId + '\',' + arsivMi + ')">🔓 Giriş Yap</button>' +
        '</div>'
    );
    setTimeout(function() {
        var inp = document.getElementById('sifre-giris-input');
        if (inp) inp.focus();
    }, 200);
}

async function sifreDogrula(odaId, arsivMi) {
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
            if (arsivMi) {
                var odaSnap = await db.ref('rooms/' + odaId).once('value');
                arsivOdaAc(odaId, odaSnap.val());
            } else {
                odayaGirDevam(odaId);
            }
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
// ODA İÇİ
// ══════════════════════════════════════════════════════════
async function odayaGir(odaId) {
    yuklemeGoster("Oda yükleniyor...");
    try {
        var snap = await db.ref('rooms/' + odaId).once('value');
        var oda = snap.val();
        if (!oda) { yuklemeKapat(); bildirimGoster("Oda bulunamadı.", "hata"); return; }

        // Süresi dolmuşsa arşive yönlendir
        var sureDoldu = oda.expiresAt && oda.expiresAt < Date.now();
        if (sureDoldu) {
            yuklemeKapat();
            arsivOdayaGir(odaId);
            return;
        }

        // Şifreli oda kontrolü
        if (oda.hasPassword && oda.passwordHash) {
            // Oda sahibi şifresiz girebilir
            if (oda.ownerId === mevcutKullanici.uid) {
                yuklemeKapat();
                odayaGirDevam(odaId);
                return;
            }
            // Zaten üye mi kontrol et
            var uyeSnap = await db.ref('rooms/' + odaId + '/members/' + mevcutKullanici.uid).once('value');
            if (uyeSnap.val()) {
                yuklemeKapat();
                odayaGirDevam(odaId);
                return;
            }
            // Şifre sor
            yuklemeKapat();
            sifreModalGoster(odaId, oda, false);
            return;
        }

        yuklemeKapat();
        odayaGirDevam(odaId);
    } catch (e) {
        yuklemeKapat();
        console.error("Odaya giriş hatası:", e);
        bildirimGoster("Odaya girilemedi.", "hata");
    }
}

async function odayaGirDevam(odaId) {
    yuklemeGoster("Oda yükleniyor...");
    try {
        var snap = await db.ref('rooms/' + odaId).once('value');
        var oda = snap.val();
        if (!oda) { yuklemeKapat(); bildirimGoster("Oda bulunamadı.", "hata"); return; }

        aktifOdaId = odaId;
        aktifOdaVeri = oda;
        arsivModuAktif = false;

        // Üye değilse ekle
        var uyeSnap = await db.ref('rooms/' + odaId + '/members/' + mevcutKullanici.uid).once('value');
        if (!uyeSnap.val()) {
            // Üye limiti kontrolü
            if (oda.maxMembers && oda.maxMembers > 0) {
                var membersSnap = await db.ref('rooms/' + odaId + '/members').once('value');
                var mevcutUyeSayi = membersSnap.numChildren();
                if (mevcutUyeSayi >= oda.maxMembers) {
                    yuklemeKapat();
                    bildirimGoster("Bu oda dolu! (Maks " + oda.maxMembers + " üye)", "uyari");
                    return;
                }
            }
            await db.ref('rooms/' + odaId + '/members/' + mevcutKullanici.uid).set({
                displayName: kullaniciBilgileri.displayName,
                photoURL: kullaniciBilgileri.photoURL || '',
                joinedAt: Date.now()
            });
            // memberCount transaction ile artır
            await db.ref('rooms/' + odaId + '/memberCount').transaction(function(c) { return (c || 0) + 1; });
            // İstatistik
            var mevcut = kullaniciBilgileri.roomsJoined || 0;
            await db.ref('users/' + mevcutKullanici.uid).update({ roomsJoined: mevcut + 1 });
            kullaniciBilgileri.roomsJoined = mevcut + 1;
        }
        // Güncel üye sayısını al
        var mcSnap = await db.ref('rooms/' + odaId + '/memberCount').once('value');
        var guncelmcVal = mcSnap.val() || 1;
        oda.memberCount = guncelmcVal;

        // Header güncelle
        document.getElementById('oda-h-kitap').textContent = oda.roomName || (oda.book ? oda.book.title : '?');
        var sureDoldu = oda.expiresAt && oda.expiresAt < Date.now();
        var basladiMi = odaBasladiMi(oda);
        var kalan = kalanGun(oda.expiresAt);
        if (!basladiMi) {
            var bGun = odaBaslamayaKalanGun(oda);
            document.getElementById('oda-h-durum').textContent = bGun + ' gün sonra başlayacak • ' + oda.durationDays + ' günlük';
        } else if (sureDoldu) {
            document.getElementById('oda-h-durum').textContent = 'Süre dolmuş';
        } else {
            document.getElementById('oda-h-durum').textContent = kalan + ' gün kaldı • ' + (oda.memberCount || 1) + ' üye';
        }
        document.getElementById('oda-h-uye-sayi').textContent = oda.memberCount || 1;

        // Bannerlar
        var bannerDoldu = document.getElementById('oda-sure-doldu-banner');
        var bannerArsiv = document.getElementById('oda-arsiv-banner');
        var bannerBaslamamis = document.getElementById('oda-baslamamis-banner');
        var girdi = document.getElementById('mesaj-girdi');

        bannerDoldu.classList.add('gizli');
        bannerArsiv.classList.add('gizli');
        bannerBaslamamis.classList.add('gizli');
        girdi.style.display = '';

        if (!basladiMi) {
            var bGun2 = odaBaslamayaKalanGun(oda);
            bannerBaslamamis.innerHTML = '📅 Bu oda <strong>' + formatTarih(oda.startsAt) + '</strong> tarihinde başlayacak (' + bGun2 + ' gün sonra)<br>📖 ' + oda.durationDays + ' günlük okuma süresi • Mesajlaşma açık!';
            bannerBaslamamis.classList.remove('gizli');
        } else if (sureDoldu) {
            bannerDoldu.classList.remove('gizli');
            girdi.style.display = 'none';
        }

        // Mesaj alanını temizle
        document.getElementById('mesaj-alani').innerHTML = '';
        document.getElementById('mesaj-input').value = '';

        ekranGoster('ekran-oda');
        yuklemeKapat();

        // Mesajları dinle
        mesajDinle(odaId);
        // Üye sayısını canlı dinle
        uyeSayisiDinle(odaId);

    } catch (e) {
        yuklemeKapat();
        console.error("Odaya giriş hatası:", e);
        bildirimGoster("Odaya girilemedi.", "hata");
    }
}

function mesajDinle(odaId) {
    if (mesajDinleyici) { db.ref('rooms/' + mesajDinleyici + '/messages').off('child_added'); }
    mesajDinleyici = odaId;
    db.ref('rooms/' + odaId + '/messages').orderByChild('ts').on('child_added', function(snap) {
        var m = snap.val();
        var alan = document.getElementById('mesaj-alani');
        var benMi = m.uid === mevcutKullanici.uid;

        if (m.type === 'system') {
            alan.innerHTML += '<div class="mesaj mesaj-sistem">' + htmlEscape(m.text) + '</div>';
        } else {
            alan.innerHTML += '<div class="mesaj ' + (benMi ? 'mesaj-giden' : 'mesaj-gelen') + '">' +
                (!benMi ? '<div class="mesaj-gonderen">' + htmlEscape(m.name || '?') + '</div>' : '') +
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
    // Arşiv modunda yazma engelle
    if (arsivModuAktif) {
        bildirimGoster("Bu oda arşivde. Mesaj yazılamaz.", "uyari"); return;
    }
    // Süre dolmuşsa yazma
    if (aktifOdaVeri && aktifOdaVeri.expiresAt && aktifOdaVeri.expiresAt < Date.now()) {
        bildirimGoster("Bu odanın süresi dolmuş.", "uyari"); return;
    }
    input.value = '';
    try {
        await db.ref('rooms/' + aktifOdaId + '/messages').push({
            uid: mevcutKullanici.uid,
            name: kullaniciBilgileri.displayName,
            text: text,
            ts: Date.now()
        });
        // messageCount artır
        db.ref('rooms/' + aktifOdaId + '/messageCount').transaction(function(c) { return (c || 0) + 1; });
        // İstatistik
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
    var sureDoldu = oda.expiresAt && oda.expiresAt < Date.now();
    var basladiMi = odaBasladiMi(oda);
    // Durum bilgisi
    var durumRenk, durumMetin;
    if (arsivModuAktif) {
        durumRenk = 'var(--text-muted)';
        durumMetin = '📦 Arşiv';
    } else if (!basladiMi) {
        durumRenk = 'var(--blue)';
        durumMetin = formatTarih(oda.startsAt) + ' başlayacak';
    } else if (sureDoldu) {
        durumRenk = 'var(--red)';
        durumMetin = 'Doldu';
    } else {
        durumRenk = 'var(--green)';
        durumMetin = kalanGun(oda.expiresAt) + ' gün';
    }
    var sifreDurum = oda.hasPassword ? '<div style="font-size:0.82rem;color:var(--amber);margin-bottom:8px;">🔒 Şifreli Oda</div>' : '<div style="font-size:0.82rem;color:var(--green);margin-bottom:8px;">🔓 Şifresiz Oda</div>';
    var odaIsmiHTML = oda.roomName ? '<div style="font-size:0.9rem;color:var(--text-secondary);margin-bottom:4px;">' + htmlEscape(oda.roomName) + '</div>' : '';
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
        '<div style="flex:1;padding:10px;text-align:center;"><div style="font-weight:700;color:' + durumRenk + ';">' + durumMetin + '</div><div style="font-size:0.75rem;color:var(--text-dim);">' + (arsivModuAktif ? 'Durum' : (!basladiMi ? 'Başlangıç' : 'Kalan')) + '</div></div>' +
        '</div>' +
        '<div style="background:var(--bg-input);border-radius:var(--radius-sm);padding:10px;margin-bottom:12px;font-size:0.82rem;color:var(--text-secondary);line-height:1.6;">' +
        '📅 Başlangıç: <strong>' + formatTarih(oda.startsAt || oda.createdAt) + '</strong><br>' +
        '⏰ Bitiş: <strong>' + formatTarih(oda.expiresAt) + '</strong><br>' +
        '📖 Süre: <strong>' + (oda.durationDays || '?') + ' gün</strong>' +
        '</div>' +
        '<div style="font-size:0.8rem;color:var(--text-muted);">Oluşturan: ' + htmlEscape(oda.ownerName || '?') + '</div>' +
        '</div>';
    // Oda sahibiyse silme butonu (arşivde de silebilsin)
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