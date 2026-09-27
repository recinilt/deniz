// Belge Algoritması doğrulayıcı (sürüm 1.0). Kullanım: node dogrula.mjs <dosya.json> [--sema yol] [--parcalar klasör] [--ara] [--yaz]
const Dogrulayici = (() => {
  const DESTEKLENEN = new Set(["$schema", "$id", "title", "description", "type", "required", "properties",
    "additionalProperties", "items", "enum", "const", "pattern", "minimum", "maximum", "minItems",
    "minLength", "maxLength", "$ref", "$defs"]);
  const ONEK = { parcalar: "P", varliklar: "V", iliskiler: "I", olaylar: "O", kurallar: "K",
    algoritmalar: "A", temalar: "T", sozluk: "S" };
  const KANITLI = ["varliklar", "iliskiler", "olaylar", "kurallar", "algoritmalar", "temalar", "sozluk"];
  const ALINTI_KELIME_SINIRI = 15;

  const turu = (d) => d === null ? "null" : Array.isArray(d) ? "array"
    : Number.isInteger(d) ? "integer" : typeof d;
  const turUyar = (d, t) => { const g = turu(d); return g === t || (t === "number" && g === "integer"); };
  const norm = (s) => String(s).toLocaleLowerCase("tr").replace(/\s+/g, " ").trim();

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

  function butunlukDenetle(v, hatalar, uyarilar, secenek) {
    const tumIdler = new Map();
    for (const [koleksiyon, onek] of Object.entries(ONEK)) {
      (v[koleksiyon] || []).forEach((k, i) => {
        if (!k || typeof k.id !== "string") return;
        if (!k.id.startsWith(onek) || !/^[A-Z][0-9]/.test(k.id)) hatalar.push(`${koleksiyon}[${i}]: kimlik "${onek}" ile başlamalı: ${k.id}`);
        if (tumIdler.has(k.id)) hatalar.push(`Yinelenen kimlik: ${k.id} (${tumIdler.get(k.id)} ve ${koleksiyon})`);
        else tumIdler.set(k.id, koleksiyon);
      });
    }
    const var_ = (id) => tumIdler.has(id);
    const koleksiyonda = (id, k) => tumIdler.get(id) === k;
    const ref = (id, yol, beklenen) => {
      if (id === null || id === undefined) return;
      if (!var_(id)) hatalar.push(`${yol}: bilinmeyen kimlik ${id}`);
      else if (beklenen && !koleksiyonda(id, beklenen)) hatalar.push(`${yol}: ${id} bir ${beklenen} kaydı olmalı, ${tumIdler.get(id)} kaydı`);
    };

    let kanitsiz = 0;
    const parcaMap = new Map((v.parcalar || []).map((p) => [p.id, p]));
    const kanitDenetle = (liste, yol) => {
      (liste || []).forEach((k, i) => {
        ref(k.parca, `${yol}.kanit[${i}].parca`, "parcalar");
        const pc = parcaMap.get(k.parca);
        if (pc && k.sayfa && pc.sayfa_baslangic && pc.sayfa_bitis && (k.sayfa < pc.sayfa_baslangic || k.sayfa > pc.sayfa_bitis))
          hatalar.push(`${yol}.kanit[${i}]: sayfa ${k.sayfa}, ${k.parca} parçasının aralığında değil (${pc.sayfa_baslangic}–${pc.sayfa_bitis})`);
        if (k.alinti) {
          const kelime = k.alinti.trim().split(/\s+/).length;
          if (kelime > ALINTI_KELIME_SINIRI) hatalar.push(`${yol}.kanit[${i}]: alıntı ${kelime} kelime; sınır ${ALINTI_KELIME_SINIRI}`);
        }
      });
    };
    for (const koleksiyon of KANITLI) {
      (v[koleksiyon] || []).forEach((k) => {
        if (!k.kanit || k.kanit.length === 0) kanitsiz++;
        kanitDenetle(k.kanit, k.id);
      });
    }

    const parcalar = v.parcalar || [];
    const g1 = parcalar.filter((p) => !p.gecis1).map((p) => p.id);
    const g2 = parcalar.filter((p) => !p.gecis2).map((p) => p.id);
    const kapsamMesaji = (ad, l) => `${ad} işlenmemiş parçalar (${l.length}): ${l.slice(0, 20).join(", ")}${l.length > 20 ? "…" : ""}`;
    if (g1.length) (secenek.ara ? uyarilar : hatalar).push(kapsamMesaji("1. geçişte", g1));
    if (g2.length) (secenek.ara ? uyarilar : hatalar).push(kapsamMesaji("2. geçişte", g2));
    parcalar.forEach((p) => {
      if (p.sayfa_baslangic && p.sayfa_bitis && p.sayfa_bitis < p.sayfa_baslangic) hatalar.push(`${p.id}: sayfa_bitis, sayfa_baslangic'tan küçük`);
    });

    const kullanilan = new Set();
    (v.iliskiler || []).forEach((r) => {
      ref(r.kaynak, `${r.id}.kaynak`); ref(r.hedef, `${r.id}.hedef`);
      ref(r.baslangic_olay, `${r.id}.baslangic_olay`, "olaylar"); ref(r.bitis_olay, `${r.id}.bitis_olay`, "olaylar");
      if (r.kaynak === r.hedef) uyarilar.push(`${r.id}: ilişki kendine bağlanıyor (${r.kaynak})`);
      kullanilan.add(r.kaynak); kullanilan.add(r.hedef);
    });
    (v.varliklar || []).forEach((x) => (x.gelisim || []).forEach((g, i) => ref(g.olay, `${x.id}.gelisim[${i}].olay`, "olaylar")));

    const olaylar = v.olaylar || [];
    const siralar = new Map();
    olaylar.forEach((o) => {
      (o.katilimcilar || []).forEach((k, i) => { ref(k, `${o.id}.katilimcilar[${i}]`, "varliklar"); kullanilan.add(k); });
      if (o.yer) { ref(o.yer, `${o.id}.yer`, "varliklar"); kullanilan.add(o.yer); }
      (o.nedenler || []).forEach((n, i) => ref(n, `${o.id}.nedenler[${i}]`, "olaylar"));
      if (siralar.has(o.anlati_sirasi)) uyarilar.push(`${o.id} ve ${siralar.get(o.anlati_sirasi)} aynı anlati_sirasi (${o.anlati_sirasi})`);
      else siralar.set(o.anlati_sirasi, o.id);
    });
    const renk = new Map();
    const dongu = (id, yigin) => {
      renk.set(id, 1);
      const o = olaylar.find((x) => x.id === id);
      for (const n of (o && o.nedenler) || []) {
        if (renk.get(n) === 1) { hatalar.push(`Neden-sonuç döngüsü: ${[...yigin, id, n].join(" → ")}`); return true; }
        if (!renk.has(n) && koleksiyonda(n, "olaylar") && dongu(n, [...yigin, id])) return true;
      }
      renk.set(id, 2); return false;
    };
    olaylar.forEach((o) => { if (!renk.has(o.id)) dongu(o.id, []); });

    for (const k of ["kurallar", "temalar", "algoritmalar"]) {
      (v[k] || []).forEach((x) => (x.ilgili || []).forEach((r, i) => { ref(r, `${x.id}.ilgili[${i}]`); kullanilan.add(r); }));
    }
    (v.belirsizlikler || []).forEach((b, i) => ref(b.kayit, `belirsizlikler[${i}].kayit`));

    (v.algoritmalar || []).forEach((a) => {
      const dugumler = a.dugumler || [], kenarlar = a.kenarlar || [];
      const ids = new Map();
      dugumler.forEach((d) => {
        if (!/^D[0-9]+$/.test(d.id)) hatalar.push(`${a.id}: düğüm kimliği "D" ile başlamalı: ${d.id}`);
        if (ids.has(d.id)) hatalar.push(`${a.id}: yinelenen düğüm ${d.id}`);
        ids.set(d.id, d);
        (d.ilgili || []).forEach((r, i) => { ref(r, `${a.id}.${d.id}.ilgili[${i}]`); kullanilan.add(r); });
        kanitDenetle(d.kanit, `${a.id}.${d.id}`);
        if (["karar", "eylem", "uyari"].includes(d.tur) && (!d.kanit || !d.kanit.length)) uyarilar.push(`${a.id}.${d.id}: ${d.tur} düğümünün kanıtı yok`);
      });
      const cikis = new Map(dugumler.map((d) => [d.id, []]));
      kenarlar.forEach((e, i) => {
        if (!ids.has(e.kaynak)) hatalar.push(`${a.id}.kenarlar[${i}]: bilinmeyen kaynak düğüm ${e.kaynak}`);
        if (!ids.has(e.hedef)) hatalar.push(`${a.id}.kenarlar[${i}]: bilinmeyen hedef düğüm ${e.hedef}`);
        if (cikis.has(e.kaynak)) cikis.get(e.kaynak).push(e);
      });
      const baslar = dugumler.filter((d) => d.tur === "baslangic");
      if (baslar.length !== 1) hatalar.push(`${a.id}: tam 1 başlangıç düğümü olmalı, ${baslar.length} var`);
      if (!dugumler.some((d) => d.tur === "bitis")) hatalar.push(`${a.id}: en az 1 bitiş düğümü olmalı`);
      dugumler.forEach((d) => {
        const c = cikis.get(d.id) || [];
        if (d.tur === "bitis" && c.length) hatalar.push(`${a.id}.${d.id}: bitiş düğümünden çıkış olamaz`);
        if (d.tur !== "bitis" && !c.length) hatalar.push(`${a.id}.${d.id}: çıkışı olmayan ara düğüm (çıkmaz yol)`);
        if (d.tur === "karar") {
          if (c.length < 2) hatalar.push(`${a.id}.${d.id}: karar düğümünün en az 2 çıkışı olmalı`);
          if (c.some((e) => !e.etiket || !e.etiket.trim())) hatalar.push(`${a.id}.${d.id}: karar çıkışlarının hepsi etiketli olmalı`);
        } else if (c.length > 1) uyarilar.push(`${a.id}.${d.id}: karar olmayan düğümün ${c.length} çıkışı var`);
      });
      if (baslar.length === 1) {
        const gorulen = new Set([baslar[0].id]), kuyruk = [baslar[0].id];
        while (kuyruk.length) for (const e of cikis.get(kuyruk.shift()) || []) if (!gorulen.has(e.hedef)) { gorulen.add(e.hedef); kuyruk.push(e.hedef); }
        dugumler.forEach((d) => { if (!gorulen.has(d.id)) hatalar.push(`${a.id}.${d.id}: başlangıçtan ulaşılamıyor`); });
      }
    });

    (v.varliklar || []).forEach((x) => { if (!kullanilan.has(x.id)) uyarilar.push(`${x.id} (${x.ad}): hiçbir ilişki, olay veya algoritmada geçmiyor`); });
    const adlar = new Map();
    (v.varliklar || []).forEach((x) => {
      for (const ad of [x.ad, ...(x.takma_adlar || [])]) {
        const n = norm(ad);
        if (adlar.has(n) && adlar.get(n) !== x.id) uyarilar.push(`"${ad}" adı hem ${adlar.get(n)} hem ${x.id} kaydında: birleştirilmesi gerekebilir`);
        else adlar.set(n, x.id);
      }
    });

    const m = v.meta || {};
    if (m.alan === "tip" && !(m.uyari && m.uyari.trim())) hatalar.push("meta.uyari: tıp alanında zorunlu (klinik karar yerine geçmez uyarısı)");
    const kal = v.kalite || {};
    if (kal.parca_sayisi !== undefined && kal.parca_sayisi !== parcalar.length) hatalar.push(`kalite.parca_sayisi (${kal.parca_sayisi}) gerçek parça sayısıyla (${parcalar.length}) uyuşmuyor`);
    return { kanitsiz, istatistik: {
      parca: parcalar.length, varlik: (v.varliklar || []).length, iliski: (v.iliskiler || []).length,
      olay: olaylar.length, kural: (v.kurallar || []).length, algoritma: (v.algoritmalar || []).length,
      tema: (v.temalar || []).length, terim: (v.sozluk || []).length, belirsizlik: (v.belirsizlikler || []).length,
      kanitsiz_kayit: kanitsiz } };
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

  return { dogrula, norm };
})();

import { readFileSync, writeFileSync, renameSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const argv = process.argv.slice(2);
const bayrak = (ad) => argv.includes(ad);
const deger = (ad) => { const i = argv.indexOf(ad); return i >= 0 ? argv[i + 1] : undefined; };
const dosya = argv.find((a, i) => !a.startsWith("--") && !["--sema", "--parcalar"].includes(argv[i - 1]));
if (!dosya) {
  console.error("Kullanım: node dogrula.mjs <dosya.json> [--sema algoritma-semasi.json] [--parcalar parça_klasörü] [--ara] [--yaz]");
  process.exit(2);
}
const semaAdaylari = [deger("--sema"), join(dirname(fileURLToPath(import.meta.url)), "algoritma-semasi.json"),
  "/mnt/project/algoritma-semasi.json", join(dirname(dosya), "algoritma-semasi.json")].filter(Boolean);
const semaYolu = semaAdaylari.find((y) => existsSync(y));
if (!semaYolu) { console.error("HATA: algoritma-semasi.json bulunamadı. Denenen: " + semaAdaylari.join(", ")); process.exit(2); }

let veri;
try { veri = JSON.parse(readFileSync(dosya, "utf8").replace(/^\uFEFF/, "")); }
catch (e) { console.error(`HATA: ${dosya} okunamadı veya geçerli JSON değil: ${e.message}`); process.exit(1); }
const sema = JSON.parse(readFileSync(semaYolu, "utf8"));
const secenek = { ara: bayrak("--ara"), beyanDenetle: !bayrak("--ara") };

if (bayrak("--yaz")) {
  const on = Dogrulayici.dogrula(veri, sema, { ...secenek, beyanDenetle: false });
  if (deger("--parcalar") && existsSync(deger("--parcalar"))) { const ah = alintiDenetle(veri, deger("--parcalar")); if (ah.length) { on.hatalar.push(...ah); on.sonuc = "KALDI"; } }
  veri.kalite = veri.kalite || {};
  veri.kalite.parca_sayisi = (veri.parcalar || []).length;
  veri.kalite.dogrulama = { sonuc: on.sonuc, hata_sayisi: on.hatalar.length, uyari_sayisi: on.uyarilar.length, uyarilar: on.uyarilar.slice(0, 200) };
  const gecici = dosya + ".tmp";
  writeFileSync(gecici, JSON.stringify(veri, null, 2) + "\n", "utf8");
  renameSync(gecici, dosya);
}

function alintiDenetle(v, klasor) {
  const hatalar = [];
  const sade = (t) => Dogrulayici.norm(t).replace(/[“”„"«»]/g, '"').replace(/[‘’]/g, "'").replace(/\u00AD/g, "").replace(/-\s+/g, "");
  const onbellek = new Map();
  const metin = (pid) => {
    if (!onbellek.has(pid)) { const y = join(klasor, pid + ".txt"); onbellek.set(pid, existsSync(y) ? sade(readFileSync(y, "utf8")) : null); }
    return onbellek.get(pid);
  };
  const tara = (liste, yol) => (liste || []).forEach((k, i) => {
    if (!k.alinti) return;
    const m = metin(k.parca);
    if (m === null) hatalar.push(`${yol}.kanit[${i}]: ${k.parca}.txt parça metni ${klasor} içinde yok`);
    else if (!m.includes(sade(k.alinti))) hatalar.push(`${yol}.kanit[${i}]: alıntı ${k.parca} metninde birebir bulunamadı: "${k.alinti}"`);
  });
  for (const k of ["varliklar", "iliskiler", "olaylar", "kurallar", "algoritmalar", "temalar", "sozluk"]) (v[k] || []).forEach((x) => tara(x.kanit, x.id));
  (v.algoritmalar || []).forEach((a) => (a.dugumler || []).forEach((d) => tara(d.kanit, `${a.id}.${d.id}`)));
  return hatalar;
}
const s = Dogrulayici.dogrula(veri, sema, secenek);
const parcaKlasoru = deger("--parcalar");
if (parcaKlasoru) {
  if (!existsSync(parcaKlasoru)) { console.error(`HATA: parça klasörü yok: ${parcaKlasoru}`); process.exit(2); }
  const ah = alintiDenetle(veri, parcaKlasoru);
  if (ah.length) { s.hatalar.push(...ah); s.sonuc = "KALDI"; }
  console.log(`Alıntı denetimi: ${parcaKlasoru} (${ah.length} hata)`);
}
console.log(`Şema: ${semaYolu}`);
console.log(`Dosya: ${dosya}${secenek.ara ? "  (ara durum kipi)" : ""}`);
console.log("İstatistik: " + Object.entries(s.istatistik).map(([k, v]) => `${k}=${v}`).join(", "));
if (s.hatalar.length) { console.log(`\nHATALAR (${s.hatalar.length}):`); s.hatalar.forEach((h) => console.log("  ✘ " + h)); }
if (s.uyarilar.length) { console.log(`\nUYARILAR (${s.uyarilar.length}):`); s.uyarilar.forEach((u) => console.log("  ! " + u)); }
console.log(`\nSONUÇ: ${s.sonuc}`);
process.exit(s.sonuc === "GECTI" ? 0 : 1);
