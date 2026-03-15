// ══════════════════════════════════════════════════════════
// İSTATİSTİKLER - stats.js
// ══════════════════════════════════════════════════════════
import { G, getAktifData, fbYaz, fbYazUye, emailKey, bugunStr, esc, bildirim, msToDkStr, msToStr, GUN_ADI, AY_ADI, DONUT_RENKLER } from './app.js';

// İstatistik takvim değişkenleri
var istTakYil = new Date().getFullYear();
var istTakAy = new Date().getMonth();

// ══════════════════════════════════════════════════════════
// ANA YÜKLEME
// ══════════════════════════════════════════════════════════
export function istSayfaYukle(){
    var d = getAktifData();
    if(!d) return;
    var h = d.hedefler || {};
    document.getElementById('ist-hedef-dk').value = h.gunlukDk || 0;
    document.getElementById('ist-hedef-hafta').value = h.haftalikDk || 0;
    istOzetRender();
    istDonutRender();
    istBarRender();
    istTakRender();
    istSaatRender();
    istOrtRender();
    istEnCokRender();
    istKarsRender();
    istKiloRender();
    istArsivRender();
}

// ══════════════════════════════════════════════════════════
// HEDEF KAYDET
// ══════════════════════════════════════════════════════════
export async function istHedefKaydet(){
    if(G.readonlyMode) return;
    if(!G.userData.hedefler) G.userData.hedefler = {};
    G.userData.hedefler.gunlukDk = parseInt(document.getElementById('ist-hedef-dk').value) || 0;
    G.userData.hedefler.haftalikDk = parseInt(document.getElementById('ist-hedef-hafta').value) || 0;
    try{
        await fbYazUye(emailKey(G.currentUser), G.userData);
        bildirim('🎯 Hedef kaydedildi!', 'basari');
        istOzetRender();
    } catch(e){ bildirim('⚠️ Hata!', 'hata'); }
}

// ══════════════════════════════════════════════════════════
// İSTATİSTİK TAKVİMİ AY DEĞİŞTİRME
// ══════════════════════════════════════════════════════════
export function istAyDeg(dir){
    istTakAy += dir;
    if(istTakAy < 0){ istTakAy = 11; istTakYil--; }
    if(istTakAy > 11){ istTakAy = 0; istTakYil++; }
    istTakRender();
}

// ══════════════════════════════════════════════════════════
// ÖZET KARTLARI
// ══════════════════════════════════════════════════════════
function istOzetRender(){
    var d = getAktifData();
    var bugunS = bugunStr();
    var now = new Date();
    var haftaBas = new Date(now);
    haftaBas.setDate(now.getDate() - now.getDay() + (now.getDay()===0 ? -6 : 1));
    var haftaBasStr = haftaBas.toISOString().split('T')[0];
    var ayStr = bugunS.substring(0, 7);

    var topBugun=0, topHafta=0, topAy=0, topToplam=0, oturumBugun=0;
    var gunler = {};
    var kaloriBugun=0, kaloriHafta=0;

    (d.sporOturumlari||[]).forEach(function(o){
        if(!o.tamamlandi) return;
        var ms = o.toplamSporMs || 0;
        var kcal = o.toplamKalori || 0;
        topToplam += ms;
        if(o.tarih===bugunS){ topBugun += ms; oturumBugun++; kaloriBugun += kcal; }
        if(o.tarih>=haftaBasStr){ topHafta += ms; kaloriHafta += kcal; }
        if(o.tarih && o.tarih.substring(0,7)===ayStr) topAy += ms;
        if(ms>0) gunler[o.tarih] = true;
    });

    // Streak hesapla
    var streak = 0;
    var dd = new Date();
    var bs = dd.toISOString().split('T')[0];
    if(!gunler[bs]) dd.setDate(dd.getDate()-1);
    while(true){
        var ds = dd.toISOString().split('T')[0];
        if(gunler[ds]){ streak++; dd.setDate(dd.getDate()-1); }
        else break;
    }

    var html = '';
    html += '<div class="ist-ozet-kart"><span class="oz-val oz-green">'+msToDkStr(topBugun)+'</span><span class="oz-lbl">Bugün Spor</span></div>';
    html += '<div class="ist-ozet-kart"><span class="oz-val oz-accent">'+msToDkStr(topHafta)+'</span><span class="oz-lbl">Bu Hafta</span></div>';
    html += '<div class="ist-ozet-kart"><span class="oz-val oz-yellow">'+msToDkStr(topAy)+'</span><span class="oz-lbl">Bu Ay</span></div>';
    html += '<div class="ist-ozet-kart"><span class="oz-val oz-green">'+oturumBugun+'</span><span class="oz-lbl">Bugün Oturum</span></div>';
    html += '<div class="ist-ozet-kart"><span class="oz-val" style="color:var(--red);">🔥 '+streak+'</span><span class="oz-lbl">Gün Streak</span></div>';
    html += '<div class="ist-ozet-kart"><span class="oz-val oz-orange">'+(d.profil?d.profil.kilo||'-':'-')+'</span><span class="oz-lbl">Kilo (kg)</span></div>';
    html += '<div class="ist-ozet-kart"><span class="oz-val" style="color:var(--orange);">🔥 '+kaloriBugun+'</span><span class="oz-lbl">Bugün kcal</span></div>';
    html += '<div class="ist-ozet-kart"><span class="oz-val" style="color:var(--orange);">🔥 '+kaloriHafta+'</span><span class="oz-lbl">Hafta kcal</span></div>';
    document.getElementById('ist-ozet').innerHTML = html;

    // Günlük hedef progress
    var hedefDk = (d.hedefler && d.hedefler.gunlukDk) || 0;
    if(hedefDk > 0){
        var oran = Math.min(100, Math.round((topBugun/(hedefDk*60000))*100));
        document.getElementById('ist-progress-wrap').style.display = '';
        document.getElementById('ist-progress-fill').style.width = oran+'%';
        document.getElementById('ist-progress-txt').textContent = 'Günlük hedefe %'+oran+(oran>=100?' 🎉':'');
    } else {
        document.getElementById('ist-progress-wrap').style.display = 'none';
        document.getElementById('ist-progress-txt').textContent = '';
    }
}

// ══════════════════════════════════════════════════════════
// DONUT GRAFİK (Spor Dağılımı)
// ══════════════════════════════════════════════════════════
function istDonutRender(){
    var d = getAktifData();
    var sporSure = {};
    (d.sporOturumlari||[]).forEach(function(o){
        if(!o.tamamlandi) return;
        var key = o.rutinAd || 'Diğer';
        if(o.toplamSporMs>0) sporSure[key] = (sporSure[key]||0) + o.toplamSporMs;
    });
    var keys = Object.keys(sporSure);
    if(keys.length===0){ document.getElementById('ist-donut-panel').style.display='none'; return; }
    document.getElementById('ist-donut-panel').style.display = '';
    var toplam = 0;
    keys.forEach(function(k){ toplam += sporSure[k]; });
    if(toplam===0){ document.getElementById('ist-donut-panel').style.display='none'; return; }

    var r=70, cx=90, cy=90, circ=2*Math.PI*r;
    var svg = '<svg class="donut-svg" viewBox="0 0 180 180"><circle cx="'+cx+'" cy="'+cy+'" r="'+r+'" fill="none" stroke="var(--border)" stroke-width="18"/>';
    var offset = 0;
    var legend = '<div class="donut-legend">';
    keys.sort(function(a,b){ return sporSure[b]-sporSure[a]; });

    keys.forEach(function(k,i){
        var yuzde = sporSure[k]/toplam;
        var dash = yuzde*circ;
        var renk = DONUT_RENKLER[i%DONUT_RENKLER.length];
        svg += '<circle cx="'+cx+'" cy="'+cy+'" r="'+r+'" fill="none" stroke="'+renk+'" stroke-width="18" stroke-dasharray="'+dash.toFixed(2)+' '+(circ-dash).toFixed(2)+'" stroke-dashoffset="'+(-offset).toFixed(2)+'" transform="rotate(-90 '+cx+' '+cy+')"/>';
        offset += dash;
        legend += '<div class="donut-legend-item"><div class="donut-legend-renk" style="background:'+renk+'"></div><span class="donut-legend-metin">'+esc(k)+'</span><span class="donut-legend-sure">'+msToDkStr(sporSure[k])+'</span></div>';
    });
    svg += '</svg>';
    legend += '</div>';
    document.getElementById('ist-donut').innerHTML = svg + legend;
}

// ══════════════════════════════════════════════════════════
// BAR GRAFİK (Son 7 Gün)
// ══════════════════════════════════════════════════════════
function istBarRender(){
    var d = getAktifData();
    var gunlerMs = {};
    (d.sporOturumlari||[]).forEach(function(o){
        if(!o.tamamlandi) return;
        gunlerMs[o.tarih] = (gunlerMs[o.tarih]||0) + (o.toplamSporMs||0);
    });
    var hedefMs = ((d.hedefler&&d.hedefler.gunlukDk)||0) * 60000;
    var bugun = new Date();
    var bars = [];
    var maxMs = hedefMs || 1;

    for(var i=6; i>=0; i--){
        var dd = new Date(bugun);
        dd.setDate(bugun.getDate()-i);
        var ds = dd.toISOString().split('T')[0];
        var ms = gunlerMs[ds] || 0;
        if(ms > maxMs) maxMs = ms;
        bars.push({gun:GUN_ADI[dd.getDay()], ms:ms});
    }

    var html = '';
    bars.forEach(function(b){
        var h = maxMs>0 ? Math.round((b.ms/maxMs)*70) : 0;
        var cls = hedefMs>0 ? (b.ms>=hedefMs?'b-ok':'b-fail') : 'b-none';
        html += '<div class="bar-wrap"><div class="bar-val">'+msToDkStr(b.ms)+'</div><div class="bar-col '+cls+'" style="height:'+Math.max(2,h)+'px;"></div><div class="bar-lbl">'+b.gun+'</div></div>';
    });
    document.getElementById('ist-bar').innerHTML = html;
}

// ══════════════════════════════════════════════════════════
// İSTATİSTİK TAKVİMİ
// ══════════════════════════════════════════════════════════
function istTakRender(){
    var d = getAktifData();
    document.getElementById('ist-tak-baslik').textContent = AY_ADI[istTakAy]+' '+istTakYil;
    var ayStr = istTakYil+'-'+String(istTakAy+1).padStart(2,'0');
    var bugunS = bugunStr();
    var hedefMs = ((d.hedefler&&d.hedefler.gunlukDk)||0) * 60000;

    var gunVerileri = {};
    (d.sporOturumlari||[]).forEach(function(o){
        if(!o.tamamlandi) return;
        var t = o.tarih || '';
        if(t.substring(0,7)!==ayStr) return;
        if(!gunVerileri[t]) gunVerileri[t] = {sporMs:0, oturum:0};
        gunVerileri[t].sporMs += (o.toplamSporMs||0);
        gunVerileri[t].oturum++;
    });

    var gunAdlari = ['Pt','Sa','Ça','Pe','Cu','Ct','Pz'];
    var html = '';
    gunAdlari.forEach(function(g){ html += '<div class="tak-gun-adi">'+g+'</div>'; });

    var ilkGun = new Date(istTakYil, istTakAy, 1).getDay();
    ilkGun = ilkGun===0 ? 6 : ilkGun-1;
    var topGun = new Date(istTakYil, istTakAy+1, 0).getDate();

    for(var i=0; i<ilkGun; i++) html += '<div class="tak-gun bos"></div>';

    for(var g=1; g<=topGun; g++){
        var ds = istTakYil+'-'+String(istTakAy+1).padStart(2,'0')+'-'+String(g).padStart(2,'0');
        var veri = gunVerileri[ds];
        var cls = 'tak-gun';
        if(ds===bugunS) cls += ' bugun';
        if(veri && hedefMs>0) cls += veri.sporMs>=hedefMs ? ' hedef-ok' : ' hedef-fail';

        var miniHtml = '';
        if(veri) miniHtml = '<div class="tak-gun-mini">'+msToDkStr(veri.sporMs)+'</div>';

        var kiloK = (d.kiloKayitlari||[]).find(function(k){ return k.tarih===ds; });
        if(kiloK) miniHtml += '<div class="tak-gun-kilo" style="color:'+(kiloK.kilo>((d.hedefler||{}).kiloHedef||999)?'var(--red)':'var(--green)')+'">'+kiloK.kilo+'</div>';

        // Tooltip
        var tooltipHtml = '';
        if(veri || kiloK){
            tooltipHtml = '<div class="tak-tooltip"><h5>'+String(g).padStart(2,'0')+'.'+(String(istTakAy+1).padStart(2,'0'))+'.'+istTakYil+'</h5>';
            if(veri) tooltipHtml += '<div class="tak-tooltip-row"><span class="tl">Spor</span><span class="tv" style="color:var(--green);">'+msToDkStr(veri.sporMs)+'</span></div><div class="tak-tooltip-row"><span class="tl">Oturum</span><span class="tv">'+veri.oturum+'</span></div>';
            if(kiloK) tooltipHtml += '<div class="tak-tooltip-row"><span class="tl">Kilo</span><span class="tv" style="color:var(--orange);">'+kiloK.kilo+'kg</span></div>';
            tooltipHtml += '</div>';
        }

        html += '<div class="'+cls+'"><div class="tak-gun-num">'+g+'</div>'+miniHtml+tooltipHtml+'</div>';
    }
    document.getElementById('ist-tak-grid').innerHTML = html;
}

// ══════════════════════════════════════════════════════════
// SAAT DİLİMİ GRAFİĞİ
// ══════════════════════════════════════════════════════════
function istSaatRender(){
    var d = getAktifData();
    var saatler = new Array(24).fill(0);
    (d.sporOturumlari||[]).forEach(function(o){
        if(!o.tamamlandi || !o.saat) return;
        var s = parseInt(o.saat.split(':')[0]);
        if(!isNaN(s) && s>=0 && s<24) saatler[s] += (o.toplamSporMs||0);
    });
    var maxMs = Math.max.apply(null, saatler) || 1;
    var topMs = 0;
    saatler.forEach(function(v){ topMs += v; });
    if(topMs===0){ document.getElementById('ist-saat-panel').style.display='none'; return; }
    document.getElementById('ist-saat-panel').style.display = '';

    var enVerimli = 0;
    saatler.forEach(function(v,i){ if(v>saatler[enVerimli]) enVerimli=i; });

    var html = '';
    for(var i=0; i<24; i++){
        var h = saatler[i]>0 ? Math.max(2, Math.round((saatler[i]/maxMs)*55)) : 1;
        var cls = 'saat-bar-col' + (i===enVerimli?' aktif-saat':'');
        html += '<div class="saat-bar-wrap"><div class="'+cls+'" style="height:'+h+'px;"></div>';
        if(i%3===0) html += '<div class="saat-bar-lbl">'+String(i).padStart(2,'0')+'</div>';
        html += '</div>';
    }
    document.getElementById('ist-saat-bar').innerHTML = html;
}

// ══════════════════════════════════════════════════════════
// ORTALAMA OTURUM SÜRESİ
// ══════════════════════════════════════════════════════════
function istOrtRender(){
    var d = getAktifData();
    var oturumlar = (d.sporOturumlari||[]).filter(function(o){ return o.tamamlandi && o.toplamSporMs>0; });
    if(oturumlar.length===0){ document.getElementById('ist-ort').textContent = '--:--'; return; }
    var topMs = 0;
    oturumlar.forEach(function(o){ topMs += o.toplamSporMs; });
    document.getElementById('ist-ort').textContent = msToStr(Math.round(topMs/oturumlar.length));
}

// ══════════════════════════════════════════════════════════
// EN ÇOK YAPILAN EGZERSİZLER
// ══════════════════════════════════════════════════════════
function istEnCokRender(){
    var d = getAktifData();
    var sporSure = {};
    (d.sporOturumlari||[]).forEach(function(o){
        if(!o.tamamlandi) return;
        (o.adimSureleri||[]).forEach(function(a){
            if(a && a.ad) sporSure[a.ad] = (sporSure[a.ad]||0) + (a.sporMs||0);
        });
    });
    var keys = Object.keys(sporSure);
    if(keys.length===0){ document.getElementById('ist-encok').innerHTML = '<div style="color:var(--text3);font-size:11px;">Henüz veri yok</div>'; return; }
    keys.sort(function(a,b){ return sporSure[b]-sporSure[a]; });
    var html = '';
    var emojiler = ['🥇','🥈','🥉','4️⃣','5️⃣'];
    keys.slice(0,5).forEach(function(k,i){
        html += '<div class="ist-konu-item"><span class="ist-konu-sira">'+emojiler[i]+'</span><span class="ist-konu-ad">'+esc(k)+'</span><span class="ist-konu-sure">'+msToDkStr(sporSure[k])+'</span></div>';
    });
    document.getElementById('ist-encok').innerHTML = html;
}

// ══════════════════════════════════════════════════════════
// HAFTALIK KARŞILAŞTIRMA
// ══════════════════════════════════════════════════════════
function istKarsRender(){
    var d = getAktifData();
    var now = new Date();
    var buHaftaBas = new Date(now);
    buHaftaBas.setDate(now.getDate() - now.getDay() + (now.getDay()===0 ? -6 : 1));
    var gecenHaftaBas = new Date(buHaftaBas);
    gecenHaftaBas.setDate(buHaftaBas.getDate()-7);
    var buHaftaBasStr = buHaftaBas.toISOString().split('T')[0];
    var gecenHaftaBasStr = gecenHaftaBas.toISOString().split('T')[0];

    var buHafta=0, gecenHafta=0;
    (d.sporOturumlari||[]).forEach(function(o){
        if(!o.tamamlandi) return;
        var t = o.tarih || '';
        if(t>=buHaftaBasStr) buHafta += (o.toplamSporMs||0);
        else if(t>=gecenHaftaBasStr && t<buHaftaBasStr) gecenHafta += (o.toplamSporMs||0);
    });

    if(buHafta===0 && gecenHafta===0){ document.getElementById('ist-kars-panel').style.display='none'; return; }
    document.getElementById('ist-kars-panel').style.display = '';

    var degisim = gecenHafta>0 ? Math.round(((buHafta-gecenHafta)/gecenHafta)*100) : (buHafta>0?100:0);
    var cls = degisim>0 ? 'kars-up' : (degisim<0?'kars-down':'kars-ayni');
    var isaret = degisim>0 ? '↑ +' : (degisim<0?'↓ ':'→ ');

    var html = '<div class="kars-item"><div class="kars-val" style="color:var(--text3);">'+msToDkStr(gecenHafta)+'</div><div class="kars-lbl">Geçen Hafta</div></div>';
    html += '<div class="kars-ok">→</div>';
    html += '<div class="kars-item"><div class="kars-val" style="color:var(--accent);">'+msToDkStr(buHafta)+'</div><div class="kars-lbl">Bu Hafta</div><div class="kars-yuzde '+cls+'">'+isaret+Math.abs(degisim)+'%</div></div>';
    document.getElementById('ist-kars').innerHTML = html;
}

// ══════════════════════════════════════════════════════════
// KİLO TAKİP GRAFİĞİ
// ══════════════════════════════════════════════════════════
function istKiloRender(){
    var d = getAktifData();
    var kayitlar = (d.kiloKayitlari||[]).slice().sort(function(a,b){ return a.timestamp-b.timestamp; });
    if(kayitlar.length<2){
        document.getElementById('ist-kilo-chart').innerHTML = '<div style="color:var(--text3);font-size:11px;text-align:center;padding:20px;">En az 2 kilo kaydı gerekli.</div>';
        return;
    }

    var son20 = kayitlar.slice(-20);
    var minK=999, maxK=0;
    son20.forEach(function(k){ if(k.kilo<minK) minK=k.kilo; if(k.kilo>maxK) maxK=k.kilo; });
    var hedef = (d.hedefler||{}).kiloHedef || 0;
    if(hedef>0 && hedef<minK) minK = hedef-1;
    if(hedef>0 && hedef>maxK) maxK = hedef+1;
    var range = maxK-minK || 1;
    var w=100, h=120, padding=30, chartW=w-padding, chartH=h-20;

    var svg = '<svg viewBox="0 0 '+w+' '+h+'" style="width:100%;height:100%;" xmlns="http://www.w3.org/2000/svg">';

    // Hedef çizgisi
    if(hedef>0){
        var hy = chartH - ((hedef-minK)/range)*chartH + 10;
        svg += '<line x1="'+padding+'" y1="'+hy+'" x2="'+w+'" y2="'+hy+'" stroke="var(--green)" stroke-width="0.5" stroke-dasharray="2,2"/>';
        svg += '<text x="2" y="'+(hy+3)+'" fill="var(--green)" font-size="3" font-family="JetBrains Mono,monospace">'+hedef+'</text>';
    }

    // Çizgi grafik
    var points = [];
    son20.forEach(function(k,i){
        var x = padding + ((i/(son20.length-1))*chartW);
        var y = chartH - ((k.kilo-minK)/range)*chartH + 10;
        points.push(x+','+y);
    });
    svg += '<polyline fill="none" stroke="var(--orange)" stroke-width="1.5" points="'+points.join(' ')+'"/>';

    // Noktalar ve tarih etiketleri
    son20.forEach(function(k,i){
        var x = padding + ((i/(son20.length-1))*chartW);
        var y = chartH - ((k.kilo-minK)/range)*chartH + 10;
        var renk = hedef>0 ? (k.kilo<=hedef?'var(--green)':'var(--red)') : 'var(--orange)';
        svg += '<circle cx="'+x+'" cy="'+y+'" r="2" fill="'+renk+'"/>';
        if(i===0 || i===son20.length-1){
            svg += '<text x="'+x+'" y="'+(h-2)+'" fill="var(--text3)" font-size="3" font-family="JetBrains Mono,monospace" text-anchor="middle">'+k.tarih.substring(5)+'</text>';
        }
    });

    svg += '</svg>';
    document.getElementById('ist-kilo-chart').innerHTML = svg;
}

// ══════════════════════════════════════════════════════════
// ANTRENMAN ARŞİVİ
// ══════════════════════════════════════════════════════════
function istArsivRender(){
    var d = getAktifData();
    var oturumlar = (d.sporOturumlari||[]).filter(function(o){ return o.tamamlandi; }).sort(function(a,b){ return (b.timestamp||0)-(a.timestamp||0); });

    if(oturumlar.length===0){
        document.getElementById('ist-arsiv').innerHTML = '<div style="color:var(--text3);text-align:center;padding:20px;font-size:13px;">Henüz oturum yok.</div>';
        return;
    }

    // Rutine göre grupla
    var gruplar = {};
    oturumlar.forEach(function(o){
        var key = o.rutinAd || 'Diğer';
        if(!gruplar[key]) gruplar[key] = [];
        gruplar[key].push(o);
    });

    var html = '';
    Object.keys(gruplar).forEach(function(key){
        var liste = gruplar[key];
        var topMs = 0;
        liste.forEach(function(o){ topMs += o.toplamSporMs||0; });

        html += '<div class="klasor-header" onclick="this.classList.toggle(\'acik\');this.nextElementSibling.classList.toggle(\'kapali\')">';
        html += '<span class="klasor-chevron">▶</span><span class="klasor-icon">📁</span>';
        html += '<span class="klasor-ad">'+esc(key)+' ('+liste.length+')</span>';
        html += '<span class="klasor-meta"><span class="km-c">'+msToDkStr(topMs)+'</span></span></div>';
        html += '<div class="klasor-icerik kapali">';

        liste.slice(0,30).forEach(function(o){
            html += '<div class="arsiv-item2"><div class="a2-ust"><span class="a2-tarih">'+o.tarih+' '+o.saat+'</span></div>';
            html += '<div class="a2-sureler"><span class="a2-c">💪'+msToDkStr(o.toplamSporMs||0)+'</span>';
            if(o.toplamMolaMs>0) html += ' <span class="a2-m">☕'+msToDkStr(o.toplamMolaMs)+'</span>';
            if(o.kilo) html += ' <span class="a2-kilo">⚖️'+o.kilo+'kg</span>';
            if(o.toplamKalori) html += ' <span style="color:var(--orange);font-family:\'JetBrains Mono\',monospace;font-size:10px;">🔥'+o.toplamKalori+'kcal</span>';
            html += '</div></div>';
        });

        html += '</div>';
    });
    document.getElementById('ist-arsiv').innerHTML = html;
}
