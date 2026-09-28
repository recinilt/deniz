// Zihin haritası iş aracı (sürüm 1.0). Komutlar: hazirla | baslat | dizin | durum | uygula | dogrula
const HaritaDogrulayici = (() => {
  const DESTEKLENEN = new Set(["$schema", "$id", "title", "description", "type", "required", "properties",
    "additionalProperties", "items", "enum", "const", "pattern", "minimum", "maximum", "minItems",
    "minLength", "maxLength", "$ref", "$defs"]);
  const ALINTI_KELIME_SINIRI = 15;
  const ETIKET_KELIME_UYARI = 6;
  const DERINLIK_UYARI = 5;
  const DUGUM_UYARI = 400;
  const turu = (d) => d === null ? "null" : Array.isArray(d) ? "array"
    : Number.isInteger(d) ? "integer" : typeof d;
  const turUyar = (d, t) => { const g = turu(d); return g === t || (t === "number" && g === "integer"); };
  const norm = (s) => String(s).toLocaleLowerCase("tr").replace(/\s+/g, " ").trim();
  const saniye = (z) => z.split(":").map(Number).reduce((t, x) => t * 60 + x, 0);

  function semaDenetle(sema, kok, yol, hatalar) {
    if (sema === null || typeof sema !== "object") return;
    for (const k of Object.keys(sema)) {
      if (!DESTEKLENEN.has(k)) hatalar.push(`Şemada desteklenmeyen anahtar: ${yol}/${k}`);
    }
    for (const alt of ["properties", "$defs"]) {
      if (sema[alt]) for (const [k, v] of Object.entries(sema[alt])) semaDenetle(v, kok, `${yol}/${alt}/${k}`, hatalar);
    }
    if (sema.items) semaDenetle(sema.items, kok, `${yol}/items`, hatalar);
    if (typeof sema.additionalProperties === "object") semaDenetle(sema.additionalProperties, kok, `${yol}/additionalProperties`, hatalar);
  }

  function semaDogrula(veri, sema, kok, yol, hatalar) {
    if (sema.$ref) {
      const ad = sema.$ref.replace("#/$defs/", "");
      const hedef = kok.$defs && kok.$defs[ad];
      if (!hedef) { hatalar.push(`${yol}: çözülemeyen $ref ${sema.$ref}`); return; }
      return semaDogrula(veri, hedef, kok, yol, hatalar);
    }
    if (sema.type) {
      const turler = Array.isArray(sema.type) ? sema.type : [sema.type];
      if (!turler.some((t) => turUyar(veri, t))) {
        hatalar.push(`${yol}: tür ${turler.join("|")} olmalı, ${turu(veri)} geldi`);
        return;
      }
    }
    if ("const" in sema && veri !== sema.const) hatalar.push(`${yol}: değer ${JSON.stringify(sema.const)} olmalı`);
    if (sema.enum && !sema.enum.includes(veri)) hatalar.push(`${yol}: izinli değerler ${sema.enum.join(", ")}; gelen ${JSON.stringify(veri)}`);
    if (typeof veri === "string") {
      if (sema.minLength !== undefined && veri.length < sema.minLength) hatalar.push(`${yol}: boş olamaz`);
      if (sema.maxLength !== undefined && veri.length > sema.maxLength) hatalar.push(`${yol}: en fazla ${sema.maxLength} karakter`);
      if (sema.pattern && !new RegExp(sema.pattern, "u").test(veri)) hatalar.push(`${yol}: biçim uymuyor (${sema.pattern}): ${JSON.stringify(veri)}`);
    }
    if (typeof veri === "number") {
      if (sema.minimum !== undefined && veri < sema.minimum) hatalar.push(`${yol}: en az ${sema.minimum}`);
      if (sema.maximum !== undefined && veri > sema.maximum) hatalar.push(`${yol}: en fazla ${sema.maximum}`);
    }
    if (Array.isArray(veri)) {
      if (sema.minItems !== undefined && veri.length < sema.minItems) hatalar.push(`${yol}: en az ${sema.minItems} öğe gerekli`);
      if (sema.items) veri.forEach((o, i) => semaDogrula(o, sema.items, kok, `${yol}[${i}]`, hatalar));
    }
    if (turu(veri) === "object") {
      for (const r of sema.required || []) if (!(r in veri)) hatalar.push(`${yol}: zorunlu alan eksik: ${r}`);
      const props = sema.properties || {};
      for (const [k, v] of Object.entries(veri)) {
        if (props[k]) semaDogrula(v, props[k], kok, `${yol}.${k}`, hatalar);
        else if (sema.additionalProperties === false) hatalar.push(`${yol}: tanımsız alan: ${k}`);
      }
    }
  }

  function agac(v) {
    const dugumler = v.dugumler || [];
    const byId = new Map(), cocuk = new Map();
    dugumler.forEach((d) => { byId.set(d.id, d); cocuk.set(d.id, []); });
    const kokler = dugumler.filter((d) => d.ebeveyn === null);
    dugumler.forEach((d) => { if (d.ebeveyn !== null && cocuk.has(d.ebeveyn)) cocuk.get(d.ebeveyn).push(d); });
    for (const l of cocuk.values()) l.sort((a, b) => a.sira - b.sira || a.id.localeCompare(b.id));
    return { byId, cocuk, kokler };
  }

  function butunlukDenetle(v, hatalar, uyarilar, secenek) {
    const tum = new Map();
    const kaydet = (liste, onek, ad) => (liste || []).forEach((x, i) => {
      if (!x || typeof x.id !== "string") return;
      if (!x.id.startsWith(onek)) hatalar.push(`${ad}[${i}]: kimlik "${onek}" ile başlamalı: ${x.id}`);
      if (tum.has(x.id)) hatalar.push(`Yinelenen kimlik: ${x.id}`); else tum.set(x.id, ad);
    });
    kaydet(v.parcalar, "P", "parcalar"); kaydet(v.dugumler, "N", "dugumler");
    kaydet(v.baglantilar, "L", "baglantilar"); kaydet(v.ozetler, "Z", "ozetler");
    const parca = new Map((v.parcalar || []).map((p) => [p.id, p]));
    const { byId, cocuk, kokler } = agac(v);

    const kanitDenetle = (liste, yol) => (liste || []).forEach((k, i) => {
      const p = parca.get(k.parca);
      if (!p) { hatalar.push(`${yol}.kanit[${i}]: bilinmeyen parça ${k.parca}`); return; }
      if (k.sayfa && p.sayfa_baslangic && p.sayfa_bitis && (k.sayfa < p.sayfa_baslangic || k.sayfa > p.sayfa_bitis))
        hatalar.push(`${yol}.kanit[${i}]: sayfa ${k.sayfa}, ${k.parca} aralığında değil (${p.sayfa_baslangic}–${p.sayfa_bitis})`);
      if (k.zaman && p.zaman_baslangic && p.zaman_bitis && (saniye(k.zaman) < saniye(p.zaman_baslangic) || saniye(k.zaman) > saniye(p.zaman_bitis)))
        hatalar.push(`${yol}.kanit[${i}]: zaman ${k.zaman}, ${k.parca} aralığında değil (${p.zaman_baslangic}–${p.zaman_bitis})`);
      if (k.alinti) { const n = k.alinti.trim().split(/\s+/).length; if (n > ALINTI_KELIME_SINIRI) hatalar.push(`${yol}.kanit[${i}]: alıntı ${n} kelime; sınır ${ALINTI_KELIME_SINIRI}`); }
    });

    if (kokler.length !== 1) hatalar.push(`Tam 1 kök düğüm (ebeveyn: null) olmalı, ${kokler.length} var`);
    (v.dugumler || []).forEach((d) => {
      if (d.ebeveyn !== null && !byId.has(d.ebeveyn)) hatalar.push(`${d.id}: ebeveyn ${d.ebeveyn} yok`);
      if (d.ebeveyn === d.id) hatalar.push(`${d.id}: kendi ebeveyni olamaz`);
      if (d.ebeveyn !== null && (!d.kanit || !d.kanit.length)) hatalar.push(`${d.id} (${d.etiket}): kök dışındaki her düğüm en az bir kanıt taşımalı`);
      kanitDenetle(d.kanit, d.id);
      const kelime = String(d.etiket || "").trim().split(/\s+/).length;
      if (kelime > ETIKET_KELIME_UYARI) uyarilar.push(`${d.id}: etiket ${kelime} kelime; zihin haritasında ${ETIKET_KELIME_UYARI} kelimeyi geçmemeli, ayrıntıyı açıklamaya taşı`);
    });
    const gorulen = new Set(), derinlik = new Map();
    if (kokler.length === 1) {
      const yigin = [[kokler[0].id, 0]];
      while (yigin.length) {
        const [id, dz] = yigin.pop();
        if (gorulen.has(id)) { hatalar.push(`Döngü: ${id} birden fazla yoldan ulaşılıyor`); continue; }
        gorulen.add(id); derinlik.set(id, dz);
        for (const c of cocuk.get(id) || []) yigin.push([c.id, dz + 1]);
      }
      (v.dugumler || []).forEach((d) => { if (!gorulen.has(d.id) && byId.has(d.ebeveyn)) hatalar.push(`${d.id}: kökten ulaşılamıyor (döngü içinde)`); });
      const ana = (cocuk.get(kokler[0].id) || []).length;
      if (ana < 3 || ana > 7) uyarilar.push(`Kökten ${ana} ana dal çıkıyor; okunabilirlik için 3-7 önerilir`);
      const enDerin = Math.max(0, ...derinlik.values());
      if (enDerin > DERINLIK_UYARI) uyarilar.push(`Harita derinliği ${enDerin}; ${DERINLIK_UYARI} seviyeyi geçmemesi önerilir`);
    }
    if ((v.dugumler || []).length > DUGUM_UYARI) uyarilar.push(`${v.dugumler.length} düğüm var; ${DUGUM_UYARI} üstünde harita zor okunur, alt dalları açıklamaya taşımayı düşün`);
    for (const [id, l] of cocuk) {
      const s = new Map();
      l.forEach((c) => { const n = norm(c.etiket); if (s.has(n)) uyarilar.push(`${id} altında aynı etiket iki kez: "${c.etiket}" (${s.get(n)}, ${c.id})`); else s.set(n, c.id); });
      const sira = new Set();
      l.forEach((c) => { if (sira.has(c.sira)) uyarilar.push(`${id} altında aynı sıra numarası: ${c.sira}`); sira.add(c.sira); });
      if (l.length === 1 && (cocuk.get(l[0].id) || []).length === 1) uyarilar.push(`${id} → ${l[0].id} → ${cocuk.get(l[0].id)[0].id}: tek çocuklu zincir; birleştirilebilir`);
    }
    (v.baglantilar || []).forEach((b) => {
      if (!byId.has(b.kaynak)) hatalar.push(`${b.id}: kaynak düğüm yok: ${b.kaynak}`);
      if (!byId.has(b.hedef)) hatalar.push(`${b.id}: hedef düğüm yok: ${b.hedef}`);
      if (b.kaynak === b.hedef) hatalar.push(`${b.id}: düğüm kendine bağlanamaz`);
      const k = byId.get(b.kaynak), h = byId.get(b.hedef);
      if (k && h && (k.ebeveyn === h.id || h.ebeveyn === k.id)) uyarilar.push(`${b.id}: zaten ebeveyn-çocuk olan düğümleri bağlıyor; ağaç kenarı yeterli`);
      kanitDenetle(b.kanit, b.id);
    });
    (v.ozetler || []).forEach((z) => {
      const l = cocuk.get(z.ebeveyn);
      if (!l) { hatalar.push(`${z.id}: ebeveyn düğüm yok: ${z.ebeveyn}`); return; }
      if (z.bas > z.son) hatalar.push(`${z.id}: bas (${z.bas}) son'dan (${z.son}) büyük`);
      if (z.son >= l.length) hatalar.push(`${z.id}: son=${z.son}, ${z.ebeveyn} altında yalnız ${l.length} çocuk var (0-tabanlı)`);
      kanitDenetle(z.kanit, z.id);
    });
    (v.belirsizlikler || []).forEach((b, i) => { if (!tum.has(b.kayit)) hatalar.push(`belirsizlikler[${i}]: bilinmeyen kayıt ${b.kayit}`); });

    const ps = v.parcalar || [];
    const g1 = ps.filter((p) => !p.gecis1).map((p) => p.id), g2 = ps.filter((p) => !p.gecis2).map((p) => p.id);
    const kap = (ad, l) => `${ad} işlenmemiş parçalar (${l.length}): ${l.slice(0, 20).join(", ")}${l.length > 20 ? "…" : ""}`;
    if (g1.length) (secenek.ara ? uyarilar : hatalar).push(kap("1. geçişte", g1));
    if (g2.length) (secenek.ara ? uyarilar : hatalar).push(kap("2. geçişte", g2));
    ps.forEach((p) => {
      if (p.sayfa_baslangic && p.sayfa_bitis && p.sayfa_bitis < p.sayfa_baslangic) hatalar.push(`${p.id}: sayfa_bitis < sayfa_baslangic`);
      if (p.zaman_baslangic && p.zaman_bitis && saniye(p.zaman_bitis) < saniye(p.zaman_baslangic)) hatalar.push(`${p.id}: zaman_bitis < zaman_baslangic`);
    });
    const m = v.meta || {};
    if (m.alan === "tip" && !(m.uyari && m.uyari.trim())) hatalar.push("meta.uyari: tıp alanında zorunlu");
    if (m.kaynak_turu === "youtube" && !m.kaynak_url) uyarilar.push("meta.kaynak_url: YouTube kaynağında video bağlantısı önerilir");
    const kal = v.kalite || {};
    if (kal.parca_sayisi !== undefined && kal.parca_sayisi !== ps.length) hatalar.push(`kalite.parca_sayisi (${kal.parca_sayisi}) gerçek parça sayısıyla (${ps.length}) uyuşmuyor`);
    return { istatistik: { parca: ps.length, dugum: (v.dugumler || []).length, ana_dal: kokler.length === 1 ? (cocuk.get(kokler[0].id) || []).length : 0,
      derinlik: Math.max(0, ...derinlik.values()), baglanti: (v.baglantilar || []).length, ozet: (v.ozetler || []).length, belirsizlik: (v.belirsizlikler || []).length } };
  }

  function dogrula(veri, sema, secenek = {}) {
    const hatalar = [], uyarilar = [];
    if (sema) {
      semaDenetle(sema, sema, "#", hatalar);
      if (hatalar.length) return { sonuc: "KALDI", hatalar, uyarilar, istatistik: {} };
      semaDogrula(veri, sema, sema, "$", hatalar);
    } else uyarilar.push("Şema bulunamadı: yalnız bütünlük denetimi yapıldı");
    if (turu(veri) !== "object") return { sonuc: "KALDI", hatalar: [...hatalar, "Kök bir nesne değil"], uyarilar, istatistik: {} };
    let istatistik = {};
    try { ({ istatistik } = butunlukDenetle(veri, hatalar, uyarilar, secenek)); }
    catch (e) { hatalar.push(`Bütünlük denetimi yapılamadı (yapı bozuk): ${e.message}`); }
    const d = veri.kalite && veri.kalite.dogrulama;
    if (d && secenek.beyanDenetle !== false) {
      const gercek = hatalar.length ? "KALDI" : "GECTI";
      if (d.sonuc !== gercek) hatalar.push(`kalite.dogrulama.sonuc "${d.sonuc}" yazıyor, gerçek sonuç "${gercek}"`);
      if (d.uyari_sayisi !== uyarilar.length) uyarilar.push(`kalite.dogrulama.uyari_sayisi (${d.uyari_sayisi}) gerçek uyarı sayısından (${uyarilar.length}) farklı`);
    }
    return { sonuc: hatalar.length ? "KALDI" : "GECTI", hatalar, uyarilar, istatistik };
  }

  return { dogrula, norm, agac, saniye };
})();

import { readFileSync, writeFileSync, renameSync, mkdirSync, existsSync, rmSync, readdirSync } from "node:fs";
import { basename, join, dirname } from "node:path";
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { fileURLToPath } from "node:url";

const IS = "/home/claude/harita";
const B = join(IS, "harita.json");
const HEDEF_KARAKTER = 12000;
const SANAL_SAYFA = 2000;
const ONEK = { dugumler: "N", baglantilar: "L", ozetler: "Z" };
const BOLUM = /^\s*(BÖLÜM|Bölüm|KISIM|Kısım|CHAPTER|Chapter|PART|Part|KİTAP|Kitap)\s+[0-9IVXLCivxlc]+\b[^\n]{0,80}$/gmu;
const ZAMAN_SATIR = /^\s*\[?((?:\d{1,2}:)?\d{1,2}:\d{2})\]?(?:\s|$)/;

const oku = (y) => JSON.parse(readFileSync(y, "utf8").replace(/^\uFEFF/, ""));
const yaz = (y, v) => { writeFileSync(y + ".tmp", JSON.stringify(v, null, 1) + "\n", "utf8"); renameSync(y + ".tmp", y); };
const dur = (m, kod = 1) => { console.error(m); process.exit(kod); };
const zamanBicim = (z) => { const p = z.split(":").map(Number); if (p.length === 2 && p[0] >= 60) return `${Math.floor(p[0] / 60)}:${String(p[0] % 60).padStart(2, "0")}:${String(p[1]).padStart(2, "0")}`; return p.length === 3 ? `${p[0]}:${String(p[1]).padStart(2, "0")}:${String(p[2]).padStart(2, "0")}` : `${p[0]}:${String(p[1]).padStart(2, "0")}`; };

function metinCoz(ham, bilgi) {
  try { const m = new TextDecoder("utf-8", { fatal: true }).decode(ham).replace(/^\uFEFF/, ""); bilgi.kodlama = "utf-8"; return m; }
  catch { bilgi.kodlama = "cp1254"; return new TextDecoder("windows-1254").decode(ham); }
}

function hazirla(kaynak) {
  if (!kaynak || !existsSync(kaynak)) dur(`HATA: belge bulunamadı: ${kaynak}`);
  if (existsSync(IS)) rmSync(IS, { recursive: true });
  mkdirSync(join(IS, "parcalar"), { recursive: true });
  const ham = readFileSync(kaynak);
  const bilgi = { kaynak_dosya: basename(kaynak), sha256: createHash("sha256").update(ham).digest("hex"), kip: "sayfa" };
  let parcalar = [];
  if (kaynak.toLowerCase().endsWith(".pdf")) {
    let metin;
    try { metin = execFileSync("pdftotext", ["-enc", "UTF-8", kaynak, "-"], { maxBuffer: 1 << 30 }).toString("utf8"); }
    catch (e) { dur(`HATA: pdftotext başarısız: ${e.stderr || e.message}`); }
    const sayfalar = metin.split("\f");
    if (sayfalar.length && !sayfalar[sayfalar.length - 1].trim()) sayfalar.pop();
    bilgi.kaynak_turu = "pdf";
    const bos = sayfalar.filter((s) => s.trim().length < 30).length;
    bilgi.bos_sayfa_orani = +(bos / Math.max(sayfalar.length, 1)).toFixed(3);
    if (bilgi.bos_sayfa_orani > 0.5) { console.log(JSON.stringify(bilgi)); dur("DUR: sayfaların yarısından fazlasında metin yok; belge taranmış görünüyor, OCR gerekli."); }
    parcalar = sayfaParcala(sayfalar, bilgi);
  } else {
    let metin = metinCoz(ham, bilgi).replace(/\r\n/g, "\n");
    bilgi.kaynak_turu = /\.md$/i.test(kaynak) ? "markdown" : "txt";
    const satirlar = metin.split("\n");
    const dolu = satirlar.filter((s) => s.trim()).length;
    const zamanli = satirlar.filter((s) => ZAMAN_SATIR.test(s)).length;
    if (dolu >= 10 && zamanli / dolu >= 0.2) { bilgi.kip = "transkript"; bilgi.kaynak_turu = "youtube"; parcalar = transkriptParcala(satirlar, bilgi); }
    else {
      const sayfalar = [];
      for (let i = 0; i < metin.length;) {
        let j = Math.min(i + SANAL_SAYFA, metin.length);
        if (j < metin.length) { const k = metin.lastIndexOf("\n", j); if (k > i + SANAL_SAYFA / 2) j = k + 1; }
        sayfalar.push(metin.slice(i, j)); i = j;
      }
      bilgi.kip = "sanal_sayfa";
      parcalar = sayfaParcala(sayfalar, bilgi);
    }
  }
  yaz(join(IS, "parcalar.json"), parcalar);
  bilgi.parca_sayisi = parcalar.length;
  yaz(join(IS, "kaynak_bilgi.json"), bilgi);
  console.log(JSON.stringify(bilgi));
  parcalar.forEach((p) => console.log(`${p.id}\t${p.zaman_baslangic ? `${p.zaman_baslangic}-${p.zaman_bitis}` : `s.${p.sayfa_baslangic}-${p.sayfa_bitis}`}\t${p.karakter} kr\t${p.baslik}`));
}

function sayfaParcala(sayfalar, bilgi) {
  bilgi.sayfa_sayisi = sayfalar.length;
  bilgi.karakter_sayisi = sayfalar.reduce((t, s) => t + s.length, 0);
  const bolumSayfa = new Map();
  sayfalar.forEach((s, n) => { for (const m of s.matchAll(BOLUM)) if (!bolumSayfa.has(n)) bolumSayfa.set(n, m[0].trim().slice(0, 80)); });
  const bolumModu = bolumSayfa.size >= 3;
  bilgi.bolum_modu = bolumModu;
  const gruplar = []; let simdiki = [], boy = 0, baslik = null;
  sayfalar.forEach((s, n) => {
    if (simdiki.length && ((bolumModu && bolumSayfa.has(n)) || boy + s.length > HEDEF_KARAKTER)) { gruplar.push([simdiki, baslik]); simdiki = []; boy = 0; baslik = null; }
    if (bolumModu && bolumSayfa.has(n) && baslik === null) baslik = bolumSayfa.get(n);
    simdiki.push(n); boy += s.length;
  });
  if (simdiki.length) gruplar.push([simdiki, baslik]);
  return gruplar.map(([ns, b], i) => {
    const id = `P${i + 1}`;
    const govde = ns.map((n) => `\n[[s. ${n + 1}]]\n${sayfalar[n]}`).join("");
    writeFileSync(join(IS, "parcalar", `${id}.txt`), govde, "utf8");
    return { id, baslik: b || `Sayfa ${ns[0] + 1}–${ns[ns.length - 1] + 1}`, sayfa_baslangic: ns[0] + 1, sayfa_bitis: ns[ns.length - 1] + 1, gecis1: false, gecis2: false, karakter: govde.length };
  });
}

function transkriptParcala(satirlar, bilgi) {
  bilgi.karakter_sayisi = satirlar.join("\n").length;
  const parcalar = []; let tampon = [], boy = 0;
  const bitir = () => {
    if (!tampon.length) return;
    const zamanlar = tampon.map((s) => (s.match(ZAMAN_SATIR) || [])[1]).filter(Boolean);
    const id = `P${parcalar.length + 1}`;
    const govde = tampon.join("\n");
    writeFileSync(join(IS, "parcalar", `${id}.txt`), govde, "utf8");
    const zb = zamanlar.length ? zamanBicim(zamanlar[0]) : "0:00", ze = zamanlar.length ? zamanBicim(zamanlar[zamanlar.length - 1]) : zb;
    parcalar.push({ id, baslik: `${zb} – ${ze}`, zaman_baslangic: zb, zaman_bitis: ze, gecis1: false, gecis2: false, karakter: govde.length });
    tampon = []; boy = 0;
  };
  for (const s of satirlar) {
    if (boy + s.length > HEDEF_KARAKTER && ZAMAN_SATIR.test(s)) bitir();
    tampon.push(s); boy += s.length + 1;
  }
  bitir();
  const son = parcalar.length ? parcalar[parcalar.length - 1].zaman_bitis : null;
  bilgi.sure = son;
  return parcalar;
}

function baslat() {
  const bilgi = oku(join(IS, "kaynak_bilgi.json"));
  const parcalar = oku(join(IS, "parcalar.json")).map(({ karakter, ...p }) => (bilgi.kip === "sanal_sayfa" ? { ...p, not: `Sayfalar ${SANAL_SAYFA} karakterlik sanal sayfalardır (kaynak metin dosyası).` } : p));
  const baslik = bilgi.kaynak_dosya.replace(/\.[^.]+$/, "");
  const v = {
    meta: { schema_version: "1.0", baslik, ozet: "(sonda yazılacak)", kaynak_dosya: bilgi.kaynak_dosya, kaynak_turu: bilgi.kaynak_turu, sha256: bilgi.sha256,
      sayfa_sayisi: bilgi.sayfa_sayisi || null, sure: bilgi.sure || null, alan: bilgi.kip === "transkript" ? "sohbet" : "genel", dil: "tr",
      olusturma_tarihi: new Date().toISOString().slice(0, 10), olusturan: "Claude (zihin haritası talimatı 1.0)" },
    parcalar,
    dugumler: [{ id: "N1", ebeveyn: null, sira: 0, etiket: baslik, kanit: [], guven: "yuksek" }],
    baglantilar: [], ozetler: [], belirsizlikler: [],
    kalite: { parca_sayisi: parcalar.length, gecis2_eklenen: 0, gecis2_dusurulen: 0, dogrulama: { sonuc: "KALDI", hata_sayisi: 0, uyari_sayisi: 0, uyarilar: [] } }
  };
  yaz(B, v);
  console.log(`harita.json oluşturuldu: ${parcalar.length} parça, kök N1 "${baslik}" (kök etiketini meta ile birlikte sonda güncelle)`);
}

function dizin() {
  const v = oku(B);
  const { cocuk, kokler } = HaritaDogrulayici.agac(v);
  const yazd = (d, dz) => {
    console.log(`${"  ".repeat(dz)}${d.id} ${d.etiket}${d.tur ? ` [${d.tur}]` : ""} (${(d.kanit || []).length}k)`);
    for (const c of cocuk.get(d.id) || []) yazd(c, dz + 1);
  };
  kokler.forEach((k) => yazd(k, 0));
  for (const b of v.baglantilar) console.log(`${b.id} ${b.kaynak} -${b.etiket}-> ${b.hedef}`);
  for (const z of v.ozetler) console.log(`${z.id} ${z.ebeveyn}[${z.bas}..${z.son}] ${z.etiket}`);
}

function durum() {
  const v = oku(B);
  const g1 = v.parcalar.filter((p) => !p.gecis1).map((p) => p.id), g2 = v.parcalar.filter((p) => !p.gecis2).map((p) => p.id);
  const { cocuk, kokler } = HaritaDogrulayici.agac(v);
  console.log(`Parça: ${v.parcalar.length} | 1. geçişte kalan: ${g1.join(",") || "yok"} | 2. geçişte kalan: ${g2.join(",") || "yok"}`);
  console.log(`düğüm=${v.dugumler.length} | ana dal=${kokler[0] ? (cocuk.get(kokler[0].id) || []).length : 0} | bağlantı=${v.baglantilar.length} | özet=${v.ozetler.length} | belirsizlik=${v.belirsizlikler.length}`);
}

function uygula(yol) {
  if (!yol || !existsSync(yol)) dur(`HATA: yama dosyası yok: ${yol}`);
  const y = oku(yol), v = oku(B);
  const sayac = Object.fromEntries(Object.entries(ONEK).map(([k]) => [k, Math.max(0, ...v[k].map((x) => parseInt(x.id.slice(1), 10)))]));
  const gecici = {};
  let eklenen = 0;
  const ekle = y.ekle || {};
  for (const [k, liste] of Object.entries(ekle)) {
    if (!ONEK[k]) dur(`HATA: bilinmeyen koleksiyon: ${k} (izinli: ${Object.keys(ONEK).join(", ")})`);
    for (const x of liste) { sayac[k]++; const id = `${ONEK[k]}${sayac[k]}`; if ("gecici" in x) { if (gecici[x.gecici]) dur(`HATA: geçici ad iki kez kullanıldı: ${x.gecici}`); gecici[x.gecici] = id; delete x.gecici; } x.id = id; eklenen++; }
  }
  const cevir = (r) => (typeof r === "string" && r in gecici ? gecici[r] : r);
  const siraSon = new Map();
  v.dugumler.forEach((d) => { if (d.ebeveyn) siraSon.set(d.ebeveyn, Math.max(siraSon.get(d.ebeveyn) ?? -1, d.sira)); });
  for (const d of ekle.dugumler || []) {
    d.ebeveyn = cevir(d.ebeveyn);
    if (d.ebeveyn === undefined) dur(`HATA: ${d.id} (${d.etiket}) için ebeveyn verilmedi`);
    if (d.sira === undefined) { const s = (siraSon.get(d.ebeveyn) ?? -1) + 1; d.sira = s; }
    siraSon.set(d.ebeveyn, Math.max(siraSon.get(d.ebeveyn) ?? -1, d.sira));
    if (!d.kanit) d.kanit = [];
    v.dugumler.push(d);
  }
  for (const b of ekle.baglantilar || []) { b.kaynak = cevir(b.kaynak); b.hedef = cevir(b.hedef); v.baglantilar.push(b); }
  for (const z of ekle.ozetler || []) { z.ebeveyn = cevir(z.ebeveyn); v.ozetler.push(z); }
  const indeks = new Map([...v.dugumler, ...v.baglantilar, ...v.ozetler].map((x) => [x.id, x]));
  for (const g of y.guncelle || []) {
    const x = indeks.get(cevir(g.id));
    if (!x) dur(`HATA: güncellenecek kayıt yok: ${g.id}`);
    for (const [a, deger] of Object.entries(g.alan || {})) x[a] = ["ebeveyn", "kaynak", "hedef"].includes(a) ? cevir(deger) : deger;
    for (const yeni of g.kanit_ekle || []) { x.kanit = x.kanit || []; if (!x.kanit.some((e) => JSON.stringify(e) === JSON.stringify(yeni))) x.kanit.push(yeni); }
  }
  const dusen = new Set();
  for (const d of y.dusur || []) {
    if (!indeks.has(d.id)) dur(`HATA: düşürülecek kayıt yok: ${d.id}`);
    if (d.id === (v.dugumler.find((n) => n.ebeveyn === null) || {}).id) dur("HATA: kök düğüm düşürülemez");
    dusen.add(d.id);
  }
  if (dusen.size) {
    let degisti = true;
    while (degisti) { degisti = false; for (const n of v.dugumler) if (n.ebeveyn && dusen.has(n.ebeveyn) && !dusen.has(n.id)) { dusen.add(n.id); degisti = true; console.log(`  alt dal olarak düştü: ${n.id} ${n.etiket}`); } }
    v.dugumler = v.dugumler.filter((n) => !dusen.has(n.id));
    for (const b of [...v.baglantilar]) if (dusen.has(b.id) || dusen.has(b.kaynak) || dusen.has(b.hedef)) { if (!dusen.has(b.id)) console.log(`  bağlantı düştü: ${b.id}`); dusen.add(b.id); }
    v.baglantilar = v.baglantilar.filter((b) => !dusen.has(b.id));
    for (const z of [...v.ozetler]) if (dusen.has(z.id) || dusen.has(z.ebeveyn)) { if (!dusen.has(z.id)) console.log(`  özet düştü: ${z.id}`); dusen.add(z.id); }
    v.ozetler = v.ozetler.filter((z) => !dusen.has(z.id));
    v.belirsizlikler = v.belirsizlikler.filter((b) => !dusen.has(b.kayit));
  }
  for (const b of y.belirsizlik_ekle || []) v.belirsizlikler.push({ ...b, kayit: cevir(b.kayit) });
  Object.assign(v.meta, y.meta || {});
  if (y.gecis === 2) { v.kalite.gecis2_eklenen += eklenen; v.kalite.gecis2_dusurulen += dusen.size; }
  if (y.parca && (y.gecis === 1 || y.gecis === 2)) {
    const p = v.parcalar.find((p) => p.id === y.parca);
    if (!p) dur(`HATA: parça yok: ${y.parca}`);
    p[`gecis${y.gecis}`] = true;
  }
  yaz(B, v);
  console.log(`Uygulandı: +${eklenen} kayıt, ${(y.guncelle || []).length} güncelleme, -${dusen.size} düşürme${y.parca ? `, ${y.parca} ${y.gecis}. geçiş işaretlendi` : ""}; geçici kimlikler: ${JSON.stringify(gecici)}`);
}

const BIRIM = /(\d+(?:[.,]\d+)?)\s*(?:-\s*\d+(?:[.,]\d+)?\s*)?(mg\/kg|mcg\/kg\/dk|mcg\/dk|µg\/dk|mg|mEq|J|L\/dk|mL\/kg|ml\/kg|ml|mL|gr|g|cc|mmHg|IU|ünite)(?![a-zçğıöşü])/g;
const BIRIM_ES = { "L/dk": ["L/dk", "L/dak", "lt/dak", "l/dk", "lt/dk"], "mL/kg": ["mL/kg", "ml/kg"], "ml/kg": ["mL/kg", "ml/kg"], ml: ["ml", "mL", "cc"], mL: ["ml", "mL", "cc"], cc: ["ml", "mL", "cc"], g: ["g", "gr"], gr: ["g", "gr"], "mcg/dk": ["mcg/dak", "mcg/dk", "µg/dk"], "µg/dk": ["µg/dk", "mcg/dak", "mcg/dk"], mmHg: ["mmHg", "mm Hg"] };
const kacis = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
function dozDenetle(v, klasor) {
  const belge = readdirSync(klasor).filter((f) => f.endsWith(".txt")).map((f) => readFileSync(join(klasor, f), "utf8")).join(" ").replace(/,/g, ".").replace(/\s+/g, " ");
  const varMi = (n, b) => (BIRIM_ES[b] || [b]).some((bb) => new RegExp(`(?<![\\d.])${kacis(n)}\\s*(?:-\\s*[\\d.]+\\s*)?${kacis(bb)}`, "i").test(belge) || new RegExp(`(?<![\\d.])[\\d.]+\\s*-\\s*${kacis(n)}\\s*${kacis(bb)}`, "i").test(belge));
  const hatalar = [], uyarilar = [];
  const tara = (t, x) => { const gorsel = (x.kanit || []).some((k) => k.gorsel === true);
    for (const m of String(t || "").matchAll(BIRIM)) { const n = m[1].replace(",", "."); if (varMi(n, m[2])) continue;
      if (gorsel) uyarilar.push(`${x.id}: "${n} ${m[2]}" metin katmanında yok; kanıtta görüntüden doğrulandı beyanı var`);
      else hatalar.push(`${x.id}: "${n} ${m[2]}" belge metninde sayı+birim olarak geçmiyor; görüntüden doğrula (kanıta "gorsel": true ekle) veya düzelt`); } };
  v.dugumler.forEach((d) => { tara(d.etiket, d); tara(d.aciklama, d); });
  v.baglantilar.forEach((b) => { tara(b.etiket, b); tara(b.aciklama, b); });
  v.ozetler.forEach((z) => tara(z.etiket, z));
  return { hatalar, uyarilar };
}
function alintiDenetle(v, klasor) {
  const hatalar = [];
  const sade = (t) => HaritaDogrulayici.norm(t).replace(/[“”„"«»]/g, '"').replace(/[‘’]/g, "'").replace(/\u00AD/g, "").replace(/-\s+/g, "");
  const onb = new Map();
  const metin = (pid) => { if (!onb.has(pid)) { const y = join(klasor, pid + ".txt"); onb.set(pid, existsSync(y) ? sade(readFileSync(y, "utf8")) : null); } return onb.get(pid); };
  const tara = (liste, yol) => (liste || []).forEach((k, i) => {
    if (!k.alinti) return;
    const m = metin(k.parca);
    if (m === null) hatalar.push(`${yol}.kanit[${i}]: ${k.parca}.txt parça metni ${klasor} içinde yok`);
    else if (!m.includes(sade(k.alinti))) hatalar.push(`${yol}.kanit[${i}]: alıntı ${k.parca} metninde birebir bulunamadı: "${k.alinti}"`);
  });
  [...v.dugumler, ...v.baglantilar, ...v.ozetler].forEach((x) => tara(x.kanit, x.id));
  return hatalar;
}
function dogrulaKomut(args) {
  const bayrak = (a) => args.includes(a), deger = (a) => { const i = args.indexOf(a); return i >= 0 ? args[i + 1] : undefined; };
  const dosya = args.find((a, i) => !a.startsWith("--") && !["--sema", "--parcalar"].includes(args[i - 1]));
  if (!dosya) dur("Kullanım: node harita-araci.mjs dogrula <harita.json> [--parcalar klasör] [--ara] [--yaz] [--sema yol]", 2);
  const adaylar = [deger("--sema"), join(dirname(fileURLToPath(import.meta.url)), "harita-semasi.json"), "/mnt/project/harita-semasi.json", join(dirname(dosya), "harita-semasi.json")].filter(Boolean);
  const semaYolu = adaylar.find((y) => existsSync(y));
  if (!semaYolu) dur("HATA: harita-semasi.json bulunamadı. Denenen: " + adaylar.join(", "), 2);
  let veri;
  try { veri = oku(dosya); } catch (e) { dur(`HATA: ${dosya} okunamadı veya geçerli JSON değil: ${e.message}`); }
  const sema = oku(semaYolu), ara = bayrak("--ara"), klasor = deger("--parcalar");
  if (klasor && !existsSync(klasor)) dur(`HATA: parça klasörü yok: ${klasor}`, 2);
  const tam = (beyan) => {
    const s = HaritaDogrulayici.dogrula(veri, sema, { ara, beyanDenetle: false });
    if (klasor && Array.isArray(veri.dugumler)) {
      s.hatalar.push(...alintiDenetle(veri, klasor));
      if (veri.meta && veri.meta.alan === "tip") { const d = dozDenetle(veri, klasor); s.hatalar.push(...d.hatalar); s.uyarilar.push(...d.uyarilar); }
    }
    const d = veri.kalite && veri.kalite.dogrulama;
    if (beyan && d) {
      const gercek = s.hatalar.length ? "KALDI" : "GECTI";
      if (d.sonuc !== gercek) s.hatalar.push(`kalite.dogrulama.sonuc "${d.sonuc}" yazıyor, gerçek sonuç "${gercek}"`);
      if (d.uyari_sayisi !== s.uyarilar.length) s.uyarilar.push(`kalite.dogrulama.uyari_sayisi (${d.uyari_sayisi}) gerçek uyarı sayısından (${s.uyarilar.length}) farklı`);
    }
    s.sonuc = s.hatalar.length ? "KALDI" : "GECTI";
    return s;
  };
  if (bayrak("--yaz")) {
    const on = tam(false);
    veri.kalite = veri.kalite || {};
    veri.kalite.parca_sayisi = (veri.parcalar || []).length;
    veri.kalite.dogrulama = { sonuc: on.sonuc, hata_sayisi: on.hatalar.length, uyari_sayisi: on.uyarilar.length, uyarilar: on.uyarilar.slice(0, 200) };
    yaz(dosya, veri);
  }
  const s = tam(!ara);
  console.log(`Şema: ${semaYolu}\nDosya: ${dosya}${ara ? "  (ara durum kipi)" : ""}${klasor ? `\nAlıntı${veri.meta && veri.meta.alan === "tip" ? " ve doz" : ""} denetimi: ${klasor}` : ""}`);
  console.log("İstatistik: " + Object.entries(s.istatistik).map(([k, x]) => `${k}=${x}`).join(", "));
  if (s.hatalar.length) { console.log(`\nHATALAR (${s.hatalar.length}):`); s.hatalar.forEach((h) => console.log("  ✘ " + h)); }
  if (s.uyarilar.length) { console.log(`\nUYARILAR (${s.uyarilar.length}):`); s.uyarilar.forEach((u) => console.log("  ! " + u)); }
  console.log(`\nSONUÇ: ${s.sonuc}`);
  process.exit(s.sonuc === "GECTI" ? 0 : 1);
}

const [komut, ...args] = process.argv.slice(2);
({ hazirla: () => hazirla(args[0]), baslat, dizin, durum, uygula: () => uygula(args[0]), dogrula: () => dogrulaKomut(args) }[komut]
  || (() => dur("Kullanım: node harita-araci.mjs hazirla <belge> | baslat | dizin | durum | uygula <yama.json> | dogrula <harita.json> [--parcalar klasör] [--ara] [--yaz]", 2)))();
