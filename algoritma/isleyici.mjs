// Belge Algoritması iş aracı (sürüm 1.0)
// Komutlar: hazirla <belge.pdf|txt> | baslat | dizin | durum | uygula <yama.json>
import { readFileSync, writeFileSync, renameSync, mkdirSync, existsSync, rmSync } from "node:fs";
import { basename, join } from "node:path";
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";

const IS = "/home/claude/is";
const B = join(IS, "birlesik.json");
const HEDEF_KARAKTER = 12000;
const SANAL_SAYFA = 2000;
const KOL = { varliklar: "V", iliskiler: "I", olaylar: "O", kurallar: "K", algoritmalar: "A", temalar: "T", sozluk: "S" };
const TEK_REF = ["yer", "kaynak", "hedef", "baslangic_olay", "bitis_olay"];
const LISTE_REF = ["katilimcilar", "nedenler", "ilgili"];
const BOLUM = /^\s*((BÖLÜM|Bölüm|KISIM|Kısım|CHAPTER|Chapter|PART|Part)\s+[\wİIVXLC]+.*|[0-9]{1,3}\.\s+[A-ZÇĞİÖŞÜ][^\n]{2,80}|[IVXLC]{1,6}\.?\s*)$/gmu;

const oku = (y) => JSON.parse(readFileSync(y, "utf8").replace(/^\uFEFF/, ""));
const yaz = (y, v) => { writeFileSync(y + ".tmp", JSON.stringify(v, null, 1), "utf8"); renameSync(y + ".tmp", y); };
const dur = (m) => { console.error(m); process.exit(1); };

function hazirla(kaynak) {
  if (!kaynak || !existsSync(kaynak)) dur(`HATA: belge bulunamadı: ${kaynak}`);
  if (existsSync(IS)) rmSync(IS, { recursive: true });
  mkdirSync(join(IS, "parcalar"), { recursive: true });
  const ham = readFileSync(kaynak);
  const bilgi = { kaynak_dosya: basename(kaynak), sha256: createHash("sha256").update(ham).digest("hex"), sanal_sayfa: false };
  let sayfalar;
  if (kaynak.toLowerCase().endsWith(".pdf")) {
    let metin;
    try { metin = execFileSync("pdftotext", ["-enc", "UTF-8", kaynak, "-"], { maxBuffer: 1 << 30 }).toString("utf8"); }
    catch (e) { dur(`HATA: pdftotext başarısız: ${e.stderr || e.message}`); }
    sayfalar = metin.split("\f");
    if (sayfalar.length && !sayfalar[sayfalar.length - 1].trim()) sayfalar.pop();
    const bos = sayfalar.filter((s) => s.trim().length < 30).length;
    bilgi.bos_sayfa_orani = +(bos / Math.max(sayfalar.length, 1)).toFixed(3);
    if (bilgi.bos_sayfa_orani > 0.5) { console.log(JSON.stringify(bilgi)); dur("DUR: sayfaların yarısından fazlasında metin yok; belge taranmış görünüyor, OCR gerekli."); }
  } else {
    let metin;
    try { metin = new TextDecoder("utf-8", { fatal: true }).decode(ham).replace(/^\uFEFF/, ""); bilgi.kodlama = "utf-8"; }
    catch { metin = new TextDecoder("windows-1254").decode(ham); bilgi.kodlama = "cp1254"; }
    metin = metin.replace(/\r\n/g, "\n");
    sayfalar = [];
    for (let i = 0; i < metin.length;) {
      let j = Math.min(i + SANAL_SAYFA, metin.length);
      if (j < metin.length) { const k = metin.lastIndexOf("\n", j); if (k > i + SANAL_SAYFA / 2) j = k + 1; }
      sayfalar.push(metin.slice(i, j)); i = j;
    }
    bilgi.sanal_sayfa = true;
  }
  bilgi.sayfa_sayisi = sayfalar.length;
  bilgi.karakter_sayisi = sayfalar.reduce((t, s) => t + s.length, 0);
  const bolumSayfa = new Map();
  sayfalar.forEach((s, n) => { for (const m of s.matchAll(BOLUM)) if (!bolumSayfa.has(n)) bolumSayfa.set(n, m[0].trim().slice(0, 80)); });
  const bolumModu = bolumSayfa.size >= 3;
  const gruplar = []; let simdiki = [], boy = 0, baslik = null;
  sayfalar.forEach((s, n) => {
    if (simdiki.length && ((bolumModu && bolumSayfa.has(n)) || boy + s.length > HEDEF_KARAKTER)) { gruplar.push([simdiki, baslik]); simdiki = []; boy = 0; baslik = null; }
    if (bolumModu && bolumSayfa.has(n) && baslik === null) baslik = bolumSayfa.get(n);
    simdiki.push(n); boy += s.length;
  });
  if (simdiki.length) gruplar.push([simdiki, baslik]);
  const parcalar = gruplar.map(([ns, b], i) => {
    const id = `P${i + 1}`;
    const govde = ns.map((n) => `\n[[s. ${n + 1}]]\n${sayfalar[n]}`).join("");
    writeFileSync(join(IS, "parcalar", `${id}.txt`), govde, "utf8");
    return { id, baslik: b || `Sayfa ${ns[0] + 1}–${ns[ns.length - 1] + 1}`, sayfa_baslangic: ns[0] + 1, sayfa_bitis: ns[ns.length - 1] + 1, gecis1: false, gecis2: false, karakter: govde.length };
  });
  yaz(join(IS, "parcalar.json"), parcalar);
  Object.assign(bilgi, { parca_sayisi: parcalar.length, bolum_modu: bolumModu });
  yaz(join(IS, "kaynak_bilgi.json"), bilgi);
  console.log(JSON.stringify(bilgi));
  parcalar.forEach((p) => console.log(`${p.id}\ts.${p.sayfa_baslangic}-${p.sayfa_bitis}\t${p.karakter} kr\t${p.baslik}`));
}

function baslat() {
  const bilgi = oku(join(IS, "kaynak_bilgi.json"));
  const parcalar = oku(join(IS, "parcalar.json")).map(({ karakter, ...p }) => (bilgi.sanal_sayfa ? { ...p, not: `Sayfalar ${SANAL_SAYFA} karakterlik sanal sayfalardır (kaynak TXT).` } : p));
  const v = {
    meta: { schema_version: "1.0", baslik: bilgi.kaynak_dosya, ozet: "(sonda yazılacak)", kaynak_dosya: bilgi.kaynak_dosya, sha256: bilgi.sha256,
      sayfa_sayisi: bilgi.sayfa_sayisi, karakter_sayisi: bilgi.karakter_sayisi, alan: "genel", dil: "tr",
      olusturma_tarihi: new Date().toISOString().slice(0, 10), olusturan: "Claude (algoritma oluşturucu talimatı 1.0)" },
    parcalar, ...Object.fromEntries(Object.keys(KOL).map((k) => [k, []])), belirsizlikler: [],
    kalite: { parca_sayisi: parcalar.length, gecis2_eklenen: 0, gecis2_dusurulen: 0, dogrulama: { sonuc: "KALDI", hata_sayisi: 0, uyari_sayisi: 0, uyarilar: [] } }
  };
  yaz(B, v);
  console.log(`birlesik.json oluşturuldu: ${parcalar.length} parça`);
}

function dizin() {
  const v = oku(B);
  for (const k of ["varliklar", "olaylar", "kurallar", "temalar", "sozluk", "algoritmalar"]) for (const x of v[k]) {
    const ad = x.ad || x.baslik || x.terim;
    const ek = x.takma_adlar && x.takma_adlar.length ? ` | ${x.takma_adlar.join(", ")}` : "";
    const tur = k === "varliklar" ? ` ${x.tur}` : k === "olaylar" ? ` anlatı=${x.anlati_sirasi}` : "";
    console.log(`${x.id}${tur} | ${ad}${ek}`);
  }
  for (const r of v.iliskiler) console.log(`${r.id} ${r.kaynak} -${r.tur}-> ${r.hedef}`);
}

function durum() {
  const v = oku(B);
  const g1 = v.parcalar.filter((p) => !p.gecis1).map((p) => p.id), g2 = v.parcalar.filter((p) => !p.gecis2).map((p) => p.id);
  console.log(`Parça: ${v.parcalar.length} | 1. geçişte kalan: ${g1.join(",") || "yok"} | 2. geçişte kalan: ${g2.join(",") || "yok"}`);
  console.log(Object.keys(KOL).map((k) => `${k}=${v[k].length}`).join(" | ") + ` | belirsizlik=${v.belirsizlikler.length}`);
}

function uygula(yol) {
  if (!yol || !existsSync(yol)) dur(`HATA: yama dosyası yok: ${yol}`);
  const y = oku(yol), v = oku(B);
  const sayac = Object.fromEntries(Object.keys(KOL).map((k) => [k, Math.max(0, ...v[k].map((x) => parseInt(x.id.slice(1), 10)))]));
  const gecici = {};
  let eklenen = 0;
  const ekle = y.ekle || {};
  for (const [k, liste] of Object.entries(ekle)) {
    if (!KOL[k]) dur(`HATA: bilinmeyen koleksiyon: ${k}`);
    for (const x of liste) { sayac[k]++; const id = `${KOL[k]}${sayac[k]}`; if ("gecici" in x) { gecici[x.gecici] = id; delete x.gecici; } x.id = id; eklenen++; }
  }
  const cevir = (r) => (typeof r === "string" && r in gecici ? gecici[r] : r);
  const refCevir = (x) => {
    for (const a of TEK_REF) if (a in x) x[a] = cevir(x[a]);
    for (const a of LISTE_REF) if (Array.isArray(x[a])) x[a] = x[a].map(cevir);
    for (const g of x.gelisim || []) g.olay = cevir(g.olay);
    for (const d of x.dugumler || []) if (Array.isArray(d.ilgili)) d.ilgili = d.ilgili.map(cevir);
  };
  for (const [k, liste] of Object.entries(ekle)) for (const x of liste) { refCevir(x); v[k].push(x); }
  const indeks = new Map();
  for (const k of Object.keys(KOL)) for (const x of v[k]) indeks.set(x.id, x);
  for (const g of y.guncelle || []) {
    const x = indeks.get(cevir(g.id));
    if (!x) dur(`HATA: güncellenecek kayıt yok: ${g.id}`);
    Object.assign(x, g.alan || {}); refCevir(x);
    for (const a of ["takma_adlar", "kanit", "katilimcilar", "nedenler", "ilgili", "gelisim"]) for (let yeni of g[`${a}_ekle`] || []) {
      yeni = cevir(yeni); if (yeni && typeof yeni === "object" && "olay" in yeni) yeni.olay = cevir(yeni.olay);
      x[a] = x[a] || [];
      if (!x[a].some((e) => JSON.stringify(e) === JSON.stringify(yeni))) x[a].push(yeni);
    }
  }
  let dusen = new Set((y.dusur || []).map((d) => d.id));
  for (const id of dusen) if (!indeks.has(id)) dur(`HATA: düşürülecek kayıt yok: ${id}`);
  if (dusen.size) {
    for (const k of Object.keys(KOL)) v[k] = v[k].filter((x) => !dusen.has(x.id));
    for (const r of [...v.iliskiler]) if (dusen.has(r.kaynak) || dusen.has(r.hedef)) { v.iliskiler.splice(v.iliskiler.indexOf(r), 1); dusen.add(r.id); console.log(`  zincirleme düşürüldü: ${r.id} (uç kayıt düştü)`); }
    for (const k of Object.keys(KOL)) for (const x of v[k]) {
      for (const a of LISTE_REF) if (Array.isArray(x[a])) x[a] = x[a].filter((r) => !dusen.has(r));
      for (const a of TEK_REF.slice(3).concat("yer")) if (dusen.has(x[a])) x[a] = null;
      if (x.gelisim) x.gelisim = x.gelisim.filter((g) => !dusen.has(g.olay));
      for (const d of x.dugumler || []) if (d.ilgili) d.ilgili = d.ilgili.filter((r) => !dusen.has(r));
    }
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

const [komut, arg] = process.argv.slice(2);
({ hazirla: () => hazirla(arg), baslat, dizin, durum, uygula: () => uygula(arg) }[komut] || (() => dur("Kullanım: node isleyici.mjs hazirla <belge> | baslat | dizin | durum | uygula <yama.json>")))();
