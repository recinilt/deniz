// ══════════════════════════════════════════════════════════
// SPOR TIMER - timer.js
// ══════════════════════════════════════════════════════════
import { G, getAktifData, getAtananRutinler, fbYaz, fbYazUye, emailKey, bugunStr, esc, bildirim, modalAc, modalKapat, yuklemeGoster, yuklemeGizle, msToStr, msToDkStr, hesaplaKaloriAdim, hesaplaKaloriMs, ekranGoster, acInit, sesGucluAlarm, sesAdimBitti, sesSporBitti } from './app.js';

// Timer değişkenleri
var stState = 'idle'; // idle, running, paused, overtime
var stInterval = null;
var stAktifRutin = null; // {rutin, rutinIdx, tarih, isAtanan}
var stAktifAdim = 0;
var stPhase = 'egzersiz'; // egzersiz, mola
var stTimeLeft = 0;
var stTotalTime = 0;
var stPhaseStartTime = 0;
var stPausedElapsed = 0;
var stOvertimeStart = 0;
var stOvertimeMs = 0;
var stToplamSporMs = 0;
var stToplamMolaMs = 0;
var stBaslangicKilo = 0;
var stAdimSureleri = [];
var stGenelBaslangic = 0;
var stYaridaKalan = null;

// ══════════════════════════════════════════════════════════
// TIMER BAŞLATMA (app.js'den çağrılır)
// ══════════════════════════════════════════════════════════
export function initTimer(rutinIdx, tarih, isAtanan){
    var rutin = isAtanan ? getAtananRutinler()[rutinIdx] : G.userData.sporRutinleri[rutinIdx];
    if(!rutin) return;

    // Yarıda kalan kontrol
    var yaridaKalan = (G.userData.sporOturumlari||[]).find(function(o){ return o.rutinId===rutin.id && !o.tamamlandi; });
    if(yaridaKalan){
        var html='<h3 style="color:var(--sport);margin-bottom:14px;">💪 '+esc(rutin.ad)+(isAtanan?' 🔒':'')+'</h3>';
        html+='<p style="color:var(--text2);font-size:13px;margin-bottom:14px;">Yarıda kalan antrenman var (Adım '+(yaridaKalan.sonAdim+1)+'/'+rutin.adimlar.length+'). Ne yapmak istersin?</p>';
        html+='<div style="display:flex;gap:8px;">';
        html+='<button class="btn btn-sport btn-block" onclick="timerKiloSor('+rutinIdx+',\''+tarih+'\',true,'+isAtanan+')">▶ Kaldığım Yerden</button>';
        html+='<button class="btn btn-ghost btn-block" onclick="timerKiloSor('+rutinIdx+',\''+tarih+'\',false,'+isAtanan+')">🔄 Yeniden Başla</button>';
        html+='</div>';
        modalAc(html);
        return;
    }
    timerKiloSor(rutinIdx, tarih, false, isAtanan);
}

function timerKiloSor(rutinIdx, tarih, devamMi, isAtanan){
    var html='<h3 style="color:var(--sport);margin-bottom:14px;">⚖️ Güncel Kilonuz</h3>';
    html+='<div class="form-group"><input type="number" id="st-kilo-input" class="input" placeholder="Kilonuz (kg)" step="0.1" value="'+(G.userData.profil?G.userData.profil.kilo||'':'')+'" min="30" max="300"></div>';
    html+='<button class="btn btn-sport btn-block" onclick="timerKiloSonrasi('+rutinIdx+',\''+tarih+'\','+devamMi+','+isAtanan+')">💪 Başla</button>';
    modalAc(html);
}
window.timerKiloSor = timerKiloSor;

function timerKiloSonrasi(rutinIdx, tarih, devamMi, isAtanan){
    var kilo = parseFloat(document.getElementById('st-kilo-input').value);
    if(!kilo||kilo<30){ bildirim('⚠️ Geçerli kilo girin!','uyari'); return; }
    stBaslangicKilo = kilo;

    // Kilo kaydet
    if(G.userData.profil) G.userData.profil.kilo = kilo;
    if(!G.userData.kiloKayitlari) G.userData.kiloKayitlari = [];
    var bugunKilo = G.userData.kiloKayitlari.find(function(k){ return k.tarih===bugunStr(); });
    if(bugunKilo) bugunKilo.kilo = kilo;
    else G.userData.kiloKayitlari.push({tarih:bugunStr(), kilo:kilo, timestamp:Date.now()});

    modalKapat();

    // Rutini al
    var rutin = isAtanan ? getAtananRutinler()[rutinIdx] : G.userData.sporRutinleri[rutinIdx];
    stAktifRutin = {rutin:rutin, rutinIdx:rutinIdx, tarih:tarih, isAtanan:isAtanan};
    stToplamSporMs = 0; stToplamMolaMs = 0; stAdimSureleri = []; stGenelBaslangic = Date.now();

    if(devamMi){
        var yaridaKalan = (G.userData.sporOturumlari||[]).find(function(o){ return o.rutinId===stAktifRutin.rutin.id && !o.tamamlandi; });
        if(yaridaKalan){
            stAktifAdim = yaridaKalan.sonAdim;
            stToplamSporMs = yaridaKalan.toplamSporMs || 0;
            stToplamMolaMs = yaridaKalan.toplamMolaMs || 0;
            stAdimSureleri = yaridaKalan.adimSureleri || [];
            stYaridaKalan = yaridaKalan;
        } else {
            stAktifAdim = 0; stYaridaKalan = null;
        }
    } else {
        stAktifAdim = 0; stYaridaKalan = null;
    }

    stState = 'idle'; stPhase = 'egzersiz';
    ekranGoster('ekran-timer');
    timerEkranGuncelle();
}
window.timerKiloSonrasi = timerKiloSonrasi;

// ══════════════════════════════════════════════════════════
// TIMER EKRAN GÜNCELLEME
// ══════════════════════════════════════════════════════════
function timerEkranGuncelle(){
    var rutin = stAktifRutin.rutin;
    document.getElementById('timer-rutin-ad').textContent = rutin.ad;

    // Tüm adımlar bitti mi?
    if(stAktifAdim >= rutin.adimlar.length){
        document.getElementById('timer-adim-no').textContent = 'TAMAMLANDI';
        document.getElementById('timer-adim-ad').textContent = '🎉 Tüm adımlar bitti!';
        document.getElementById('timer-adim-sonraki').textContent = '';
        document.getElementById('timer-adim-not').classList.add('gizli');
        stInfoGuncelle();
        var listHtml = '';
        rutin.adimlar.forEach(function(a,i){
            listHtml += '<div class="timer-adim-item tamamlandi"><div class="tai-no done">✓</div><div class="tai-ad">'+esc(a.ad)+'</div><div class="tai-sure">'+a.sure+'dk</div></div>';
        });
        document.getElementById('st-adimlar-liste').innerHTML = listHtml;
        return;
    }

    var adim = rutin.adimlar[stAktifAdim];
    document.getElementById('timer-adim-no').textContent = 'ADIM '+(stAktifAdim+1)+'/'+rutin.adimlar.length+(stPhase==='mola'?' (MOLA)':'');
    document.getElementById('timer-adim-ad').textContent = stPhase==='mola' ? '☕ Mola' : adim.ad;

    // Sonraki bilgisi
    var sonraki;
    if(stPhase==='mola'){
        sonraki = stAktifAdim<rutin.adimlar.length-1 ? 'Sonraki: '+rutin.adimlar[stAktifAdim+1].ad : 'Son adım tamamlanıyor';
    } else {
        if(adim.mola>0) sonraki = 'Sonraki: Mola ('+adim.mola+' dk)';
        else sonraki = stAktifAdim<rutin.adimlar.length-1 ? 'Sonraki: '+rutin.adimlar[stAktifAdim+1].ad : 'Son adım';
    }
    document.getElementById('timer-adim-sonraki').textContent = sonraki;

    // Not gösterimi
    var notEl = document.getElementById('timer-adim-not');
    if(adim.notlar && stPhase!=='mola'){
        notEl.textContent = '📝 ' + adim.notlar;
        notEl.classList.remove('gizli');
    } else {
        notEl.classList.add('gizli');
        notEl.textContent = '';
    }

    // Idle durumda süreyi göster
    if(stState==='idle'){
        var sure = stPhase==='mola' ? adim.mola : adim.sure;
        stTimeLeft = sure*60; stTotalTime = sure*60;
        document.getElementById('st-time').textContent = String(Math.floor(stTimeLeft/60)).padStart(2,'0')+':'+String(stTimeLeft%60).padStart(2,'0');
        document.getElementById('st-time').className = 'timer-time';
        document.getElementById('st-status').innerHTML = '<span class="status-badge">Hazır</span>';
        document.getElementById('st-progress').style.width = '0%';
    }

    // Adım listesi
    var listHtml = '';
    rutin.adimlar.forEach(function(a,i){
        var cls = 'timer-adim-item';
        if(i===stAktifAdim) cls += ' aktif';
        if(i<stAktifAdim) cls += ' tamamlandi';
        var kcalStr = '';
        var kiloKg = stBaslangicKilo || 70;
        if(i<stAktifAdim && stAdimSureleri[i] && stAdimSureleri[i].sporMs>0){
            kcalStr = ' <span style="color:var(--orange);font-size:9px;">🔥'+hesaplaKaloriMs(a,kiloKg,stAdimSureleri[i].sporMs)+'kcal</span>';
        } else if(i>=stAktifAdim){
            kcalStr = ' <span style="color:var(--text3);font-size:9px;">~'+hesaplaKaloriAdim(a,kiloKg)+'kcal</span>';
        }
        listHtml += '<div class="'+cls+'"><div class="tai-no'+(i<stAktifAdim?' done':'')+'">'+((i<stAktifAdim)?'✓':(i+1))+'</div>';
        listHtml += '<div class="tai-ad">'+esc(a.ad)+kcalStr+'</div><div class="tai-sure">'+a.sure+'dk'+(a.mola>0?' +'+a.mola+'dk mola':'')+'</div></div>';
    });
    document.getElementById('st-adimlar-liste').innerHTML = listHtml;

    stInfoGuncelle();
    stBtnGuncelle();
}

// ══════════════════════════════════════════════════════════
// BİLGİ VE BUTON GÜNCELLEME
// ══════════════════════════════════════════════════════════
function stInfoGuncelle(){
    document.getElementById('st-toplam-spor').textContent = msToStr(stToplamSporMs);
    document.getElementById('st-toplam-mola').textContent = msToStr(stToplamMolaMs);
    document.getElementById('st-toplam-genel').textContent = msToStr(stToplamSporMs+stToplamMolaMs);
    document.getElementById('st-toplam-kalori').textContent = stHesaplaToplamKalori(stToplamSporMs, 0);
}

function stHesaplaToplamKalori(sporMs, extraMs){
    if(!stAktifRutin || !stAktifRutin.rutin) return 0;
    var kiloKg = stBaslangicKilo || 70;
    var topKcal = 0;
    var rutin = stAktifRutin.rutin;
    (stAdimSureleri||[]).forEach(function(a,i){
        if(a && a.sporMs>0){
            var adim = rutin.adimlar[i];
            if(adim) topKcal += hesaplaKaloriMs(adim, kiloKg, a.sporMs);
        }
    });
    if(stAktifAdim<rutin.adimlar.length && stPhase==='egzersiz'){
        var oncekiMs = 0;
        (stAdimSureleri||[]).forEach(function(a){ if(a) oncekiMs += a.sporMs||0; });
        var aktifMs = sporMs - oncekiMs + extraMs;
        if(aktifMs>0) topKcal += hesaplaKaloriMs(rutin.adimlar[stAktifAdim], kiloKg, aktifMs);
    }
    return topKcal;
}

function stInfoGuncelle2(extraSpor, extraMola){
    document.getElementById('st-toplam-spor').textContent = msToStr(stToplamSporMs+extraSpor);
    document.getElementById('st-toplam-mola').textContent = msToStr(stToplamMolaMs+extraMola);
    document.getElementById('st-toplam-genel').textContent = msToStr(stToplamSporMs+stToplamMolaMs+extraSpor+extraMola);
    document.getElementById('st-toplam-kalori').textContent = stHesaplaToplamKalori(stToplamSporMs, extraSpor);
}

function stBtnGuncelle(){
    var btns = ['st-btn-basla','st-btn-duraklat','st-btn-devam','st-btn-sonraki','st-btn-durdur'];
    btns.forEach(function(id){ document.getElementById(id).classList.add('gizli'); });
    if(stState==='idle'){
        document.getElementById('st-btn-basla').classList.remove('gizli');
        document.getElementById('st-btn-durdur').classList.remove('gizli');
    } else if(stState==='running'){
        document.getElementById('st-btn-duraklat').classList.remove('gizli');
        document.getElementById('st-btn-sonraki').classList.remove('gizli');
        document.getElementById('st-btn-durdur').classList.remove('gizli');
    } else if(stState==='paused'){
        document.getElementById('st-btn-devam').classList.remove('gizli');
        document.getElementById('st-btn-sonraki').classList.remove('gizli');
        document.getElementById('st-btn-durdur').classList.remove('gizli');
    } else if(stState==='overtime'){
        document.getElementById('st-btn-sonraki').classList.remove('gizli');
        document.getElementById('st-btn-duraklat').classList.remove('gizli');
        document.getElementById('st-btn-durdur').classList.remove('gizli');
    }
}

// ══════════════════════════════════════════════════════════
// TIMER KONTROL FONKSİYONLARI
// ══════════════════════════════════════════════════════════
export function stBasla(){
    if(stState!=='idle') return;
    acInit();
    var adim = stAktifRutin.rutin.adimlar[stAktifAdim];
    var sure = stPhase==='mola' ? adim.mola : adim.sure;
    stTimeLeft = sure*60; stTotalTime = sure*60;
    stState = 'running'; stPhaseStartTime = Date.now(); stPausedElapsed = 0; stOvertimeMs = 0;
    stInterval = setInterval(stTick, 250);
    stBtnGuncelle();
}

function stTick(){
    // OVERTIME durumu
    if(stState==='overtime'){
        var otElapsed = Date.now() - stOvertimeStart;
        var totalOt = stOvertimeMs + otElapsed;
        var sn = Math.floor(totalOt/1000);
        var dk = Math.floor(sn/60); sn = sn%60;
        document.getElementById('st-time').textContent = '+'+String(dk).padStart(2,'0')+':'+String(sn).padStart(2,'0');
        document.getElementById('st-time').className = 'timer-time overtime';
        document.getElementById('st-status').innerHTML = '<span class="status-badge st-overtime">'+(stPhase==='egzersiz'?'🟠 Çalışma Uzatması':'🟣 Mola Uzatması')+'</span>';
        if(stPhase==='egzersiz') stInfoGuncelle2(totalOt, 0);
        else stInfoGuncelle2(0, totalOt);
        var pEl = document.getElementById('st-progress');
        if(pEl) pEl.style.width = '100%';
        return;
    }

    if(stState!=='running') return;

    var elapsed = (Date.now()-stPhaseStartTime)/1000 + stPausedElapsed;
    var kalan = Math.max(0, stTotalTime-elapsed);
    stTimeLeft = kalan;
    var dk = Math.floor(kalan/60);
    var sn = Math.floor(kalan%60);
    document.getElementById('st-time').textContent = String(dk).padStart(2,'0')+':'+String(sn).padStart(2,'0');
    document.getElementById('st-time').className = 'timer-time '+(stPhase==='egzersiz'?'egzersiz':'mola');
    document.getElementById('st-status').innerHTML = '<span class="status-badge '+(stPhase==='egzersiz'?'st-egzersiz':'st-mola')+'">'+(stPhase==='egzersiz'?'🟢 Egzersiz':'☕ Mola')+'</span>';

    var oran = stTotalTime>0 ? ((stTotalTime-kalan)/stTotalTime)*100 : 0;
    var pFill = document.getElementById('st-progress');
    if(pFill){
        pFill.style.width = oran+'%';
        pFill.style.background = stPhase==='egzersiz' ? 'var(--green)' : 'var(--purple)';
    }

    if(stPhase==='egzersiz') stInfoGuncelle2(elapsed*1000, 0);
    else stInfoGuncelle2(0, elapsed*1000);

    // Süre bitti
    if(kalan<=0){
        clearInterval(stInterval);
        if(stPhase==='egzersiz'){
            stToplamSporMs += stTotalTime*1000;
            sesGucluAlarm();
        } else {
            stToplamMolaMs += stTotalTime*1000;
            sesAdimBitti();
        }
        stState = 'overtime'; stOvertimeStart = Date.now(); stOvertimeMs = 0;
        stBtnGuncelle();
        stInterval = setInterval(stTick, 250);
    }
}

export function stDuraklat(){
    if(stState==='running'){
        var elapsed = (Date.now()-stPhaseStartTime)/1000;
        stPausedElapsed += elapsed;
        stState = 'paused'; clearInterval(stInterval); stBtnGuncelle();
    } else if(stState==='overtime'){
        var otElapsed = Date.now()-stOvertimeStart;
        stOvertimeMs += otElapsed;
        stState = 'paused'; clearInterval(stInterval); stBtnGuncelle();
    }
}

export function stDevam(){
    if(stState!=='paused') return;
    if(stOvertimeMs>0 || stTimeLeft<=0){
        stState = 'overtime'; stOvertimeStart = Date.now();
    } else {
        stState = 'running'; stPhaseStartTime = Date.now();
    }
    stInterval = setInterval(stTick, 250);
    stBtnGuncelle();
}

export async function stSonrakiAdim(){
    clearInterval(stInterval);

    // Mevcut fazın süresini ekle
    if(stState==='overtime'){
        var ot = Date.now()-stOvertimeStart+stOvertimeMs;
        if(stPhase==='egzersiz') stToplamSporMs += ot;
        else stToplamMolaMs += ot;
    } else if(stState==='running'){
        var el = (Date.now()-stPhaseStartTime)/1000 + stPausedElapsed;
        if(stPhase==='egzersiz') stToplamSporMs += el*1000;
        else stToplamMolaMs += el*1000;
    } else if(stState==='paused'){
        if(stOvertimeMs>0){
            if(stPhase==='egzersiz') stToplamSporMs += stOvertimeMs;
            else stToplamMolaMs += stOvertimeMs;
        } else {
            if(stPhase==='egzersiz') stToplamSporMs += stPausedElapsed*1000;
            else stToplamMolaMs += stPausedElapsed*1000;
        }
    }

    stOvertimeMs = 0; stOvertimeStart = 0;
    var rutin = stAktifRutin.rutin;
    var adim = rutin.adimlar[stAktifAdim];

    if(stPhase==='egzersiz'){
        // Adım süresini kaydet
        var oncekiToplam = stAdimSureleri.reduce(function(s,a){ return s+(a?a.sporMs||0:0); }, 0);
        stAdimSureleri[stAktifAdim] = {ad:adim.ad, sporMs:stToplamSporMs-oncekiToplam};
        if(adim.mola>0){
            stPhase = 'mola';
        } else {
            stAktifAdim++; stPhase = 'egzersiz';
        }
    } else {
        // Mola bitti, sonraki adıma
        stAktifAdim++; stPhase = 'egzersiz';
    }

    // Yarıda kaydet
    await stYaridaKaydet();

    // Tüm adımlar bitti mi?
    if(stAktifAdim >= rutin.adimlar.length){
        await stTamamlandi();
        return;
    }

    // Sonraki faz
    stState = 'idle'; stTimeLeft = 0; stTotalTime = 0; stPausedElapsed = 0;
    timerEkranGuncelle();
    stBasla(); // Otomatik başlat
}

// ══════════════════════════════════════════════════════════
// KAYDETME
// ══════════════════════════════════════════════════════════
async function stYaridaKaydet(){
    if(!G.userData.sporOturumlari) G.userData.sporOturumlari = [];
    var mevcutIdx = G.userData.sporOturumlari.findIndex(function(o){ return o.rutinId===stAktifRutin.rutin.id && !o.tamamlandi; });
    var kayit = {
        rutinId: stAktifRutin.rutin.id,
        rutinAd: stAktifRutin.rutin.ad,
        tarih: stAktifRutin.tarih,
        saat: String(new Date().getHours()).padStart(2,'0')+':'+String(new Date().getMinutes()).padStart(2,'0'),
        kilo: stBaslangicKilo,
        toplamSporMs: Math.round(stToplamSporMs),
        toplamMolaMs: Math.round(stToplamMolaMs),
        sonAdim: stAktifAdim,
        adimSureleri: stAdimSureleri,
        tamamlandi: false,
        timestamp: Date.now(),
        toplamKalori: stHesaplaToplamKalori(stToplamSporMs, 0)
    };
    if(mevcutIdx>=0) G.userData.sporOturumlari[mevcutIdx] = kayit;
    else G.userData.sporOturumlari.push(kayit);
    try{ await fbYazUye(emailKey(G.currentUser), G.userData); }
    catch(e){ console.error(e); }
}

async function stTamamlandi(){
    clearInterval(stInterval);
    sesSporBitti();

    var mevcutIdx = G.userData.sporOturumlari.findIndex(function(o){ return o.rutinId===stAktifRutin.rutin.id && !o.tamamlandi; });
    var kayit = {
        rutinId: stAktifRutin.rutin.id,
        rutinAd: stAktifRutin.rutin.ad,
        tarih: stAktifRutin.tarih,
        saat: String(new Date().getHours()).padStart(2,'0')+':'+String(new Date().getMinutes()).padStart(2,'0'),
        kilo: stBaslangicKilo,
        toplamSporMs: Math.round(stToplamSporMs),
        toplamMolaMs: Math.round(stToplamMolaMs),
        adimSureleri: stAdimSureleri,
        tamamlandi: true,
        timestamp: Date.now(),
        toplamKalori: stHesaplaToplamKalori(stToplamSporMs, 0)
    };
    if(mevcutIdx>=0) G.userData.sporOturumlari[mevcutIdx] = kayit;
    else {
        if(!G.userData.sporOturumlari) G.userData.sporOturumlari = [];
        G.userData.sporOturumlari.push(kayit);
    }
    try{
        await fbYazUye(emailKey(G.currentUser), G.userData);
        bildirim('🎉 Antrenman tamamlandı! '+msToDkStr(stToplamSporMs), 'basari');
    } catch(e){
        bildirim('⚠️ Kayıt hatası!', 'hata');
    }

    stState = 'idle'; stInterval = null;
    document.getElementById('st-time').textContent = '00:00';
    document.getElementById('st-time').className = 'timer-time';
    document.getElementById('st-status').innerHTML = '<span class="status-badge" style="background:var(--accent-g);color:var(--accent);">🎉 Tamamlandı!</span>';
    stInfoGuncelle();
    timerEkranGuncelle();
    setTimeout(function(){ ekranGoster('ekran-ana'); }, 3000);
}

export async function stDurdur(){
    if(stState==='idle' && stToplamSporMs===0){
        ekranGoster('ekran-ana');
        return;
    }
    clearInterval(stInterval);

    if(stState==='running'){
        var el = (Date.now()-stPhaseStartTime)/1000 + stPausedElapsed;
        if(stPhase==='egzersiz') stToplamSporMs += el*1000;
        else stToplamMolaMs += el*1000;
    } else if(stState==='overtime'){
        var ot = Date.now()-stOvertimeStart+stOvertimeMs;
        if(stPhase==='egzersiz') stToplamSporMs += ot;
        else stToplamMolaMs += ot;
    }

    if(stToplamSporMs>=1000) await stYaridaKaydet();

    stState = 'idle'; stInterval = null;
    bildirim('⏹ Antrenman durduruldu. Kaldığın yerden devam edebilirsin.', 'bilgi');
    ekranGoster('ekran-ana');
}

export function timerdenCik(){
    stDurdur();
}
