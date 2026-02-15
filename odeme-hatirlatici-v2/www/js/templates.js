/**
 * templates.js - Türkiye Hazır Ödeme Şablonları
 * Ödeme Hatırlatıcı Uygulaması
 */

const TEMPLATES = [
  // ===== FATURALAR =====
  { name: 'Elektrik Faturası',    category: 'fatura',   icon: 'electricity', recurrence: 'monthly',  color: '#FFC107', defaultAmount: null },
  { name: 'Su Faturası',          category: 'fatura',   icon: 'water',       recurrence: 'monthly',  color: '#2196F3', defaultAmount: null },
  { name: 'Doğalgaz Faturası',    category: 'fatura',   icon: 'gas',         recurrence: 'monthly',  color: '#FF5722', defaultAmount: null },
  { name: 'İnternet Faturası',    category: 'fatura',   icon: 'internet',    recurrence: 'monthly',  color: '#9C27B0', defaultAmount: null },
  { name: 'GSM/Telefon Faturası', category: 'fatura',   icon: 'phone',       recurrence: 'monthly',  color: '#4CAF50', defaultAmount: null },
  { name: 'Apartman Aidatı',      category: 'fatura',   icon: 'apartment',   recurrence: 'monthly',  color: '#795548', defaultAmount: null },

  // ===== KREDİ & KREDİ KARTI =====
  { name: 'Kredi Kartı Borcu',      category: 'kredi', icon: 'creditcard', recurrence: 'monthly', color: '#F44336', defaultAmount: null },
  { name: 'Bireysel Kredi Taksiti', category: 'kredi', icon: 'bank',       recurrence: 'monthly', color: '#E91E63', defaultAmount: null },
  { name: 'Konut Kredisi Taksiti',  category: 'kredi', icon: 'home',       recurrence: 'monthly', color: '#3F51B5', defaultAmount: null },
  { name: 'Taşıt Kredisi Taksiti',  category: 'kredi', icon: 'car',        recurrence: 'monthly', color: '#009688', defaultAmount: null },

  // ===== VERGİ =====
  { name: 'MTV (Motorlu Taşıt Vergisi)', category: 'vergi', icon: 'tax',  recurrence: 'biannual', color: '#FF9800', defaultAmount: null,
    notes: 'Ocak ve Temmuz aylarında ödenir' },
  { name: 'Gelir Vergisi',               category: 'vergi', icon: 'tax',  recurrence: 'quarterly', color: '#FF9800', defaultAmount: null },

  // ===== ARAÇ =====
  { name: 'Araç Muayene (TÜVTÜRK)',   category: 'arac', icon: 'inspection', recurrence: 'yearly', color: '#607D8B', defaultAmount: null,
    notes: 'Gecikme cezası: aylık %5' },
  { name: 'Egzoz Emisyon Muayenesi',   category: 'arac', icon: 'emission',   recurrence: 'yearly', color: '#78909C', defaultAmount: null },

  // ===== SİGORTA =====
  { name: 'Kasko Sigortası',          category: 'sigorta', icon: 'shield',     recurrence: 'yearly',  color: '#00BCD4', defaultAmount: null },
  { name: 'Trafik Sigortası',         category: 'sigorta', icon: 'carshield',  recurrence: 'yearly',  color: '#8BC34A', defaultAmount: null },
  { name: 'DASK (Deprem Sigortası)',   category: 'sigorta', icon: 'earthquake', recurrence: 'yearly',  color: '#CDDC39', defaultAmount: null },
  { name: 'Özel Sağlık Sigortası',    category: 'sigorta', icon: 'health',     recurrence: 'monthly', color: '#E91E63', defaultAmount: null },

  // ===== DİĞER =====
  { name: 'BES (Bireysel Emeklilik)', category: 'abonelik', icon: 'pension',   recurrence: 'monthly', color: '#673AB7', defaultAmount: null },
  { name: 'Eğitim Taksiti',           category: 'diger',    icon: 'education',  recurrence: 'monthly', color: '#03A9F4', defaultAmount: null },
];

// Kategori tanımları
const CATEGORIES = {
  fatura:   { label_tr: 'Fatura',    label_en: 'Bill',         icon: '📄', color: '#FFC107' },
  kredi:    { label_tr: 'Kredi',     label_en: 'Credit',       icon: '💳', color: '#F44336' },
  vergi:    { label_tr: 'Vergi',     label_en: 'Tax',          icon: '🏛️', color: '#FF9800' },
  arac:     { label_tr: 'Araç',      label_en: 'Vehicle',      icon: '🚗', color: '#607D8B' },
  sigorta:  { label_tr: 'Sigorta',   label_en: 'Insurance',    icon: '🛡️', color: '#00BCD4' },
  abonelik: { label_tr: 'Abonelik',  label_en: 'Subscription', icon: '🔄', color: '#673AB7' },
  borc:     { label_tr: 'Borç',      label_en: 'Debt',         icon: '🤝', color: '#795548' },
  diger:    { label_tr: 'Diğer',     label_en: 'Other',        icon: '📌', color: '#9E9E9E' }
};

// Tekrar sıklığı tanımları
const RECURRENCES = {
  once:      { label_tr: 'Bir Kere',    label_en: 'Once' },
  weekly:    { label_tr: 'Haftalık',     label_en: 'Weekly' },
  monthly:   { label_tr: 'Aylık',        label_en: 'Monthly' },
  bimonthly: { label_tr: '2 Ayda Bir',   label_en: 'Bimonthly' },
  quarterly: { label_tr: '3 Ayda Bir',   label_en: 'Quarterly' },
  biannual:  { label_tr: '6 Ayda Bir',   label_en: 'Biannual' },
  yearly:    { label_tr: 'Yıllık',       label_en: 'Yearly' },
  custom:    { label_tr: 'Özel',         label_en: 'Custom' }
};

// Renk seçenekleri
const COLORS = [
  '#F44336', '#E91E63', '#9C27B0', '#673AB7',
  '#3F51B5', '#2196F3', '#03A9F4', '#00BCD4',
  '#009688', '#4CAF50', '#8BC34A', '#CDDC39',
  '#FFC107', '#FF9800', '#FF5722', '#795548',
  '#607D8B', '#9E9E9E'
];

// Para birimi seçenekleri
const CURRENCIES = [
  { code: 'TRY', symbol: '₺', label: 'Türk Lirası' },
  { code: 'USD', symbol: '$', label: 'ABD Doları' },
  { code: 'EUR', symbol: '€', label: 'Euro' },
  { code: 'GBP', symbol: '£', label: 'İngiliz Sterlini' }
];

function getCurrencySymbol(code) {
  const c = CURRENCIES.find(o => o.code === code);
  return c ? c.symbol : '₺';
}

function getCategoryLabel(categoryKey, lang) {
  const cat = CATEGORIES[categoryKey];
  if (!cat) return categoryKey;
  return lang === 'en' ? cat.label_en : cat.label_tr;
}

function getRecurrenceLabel(recurrenceKey, lang) {
  const rec = RECURRENCES[recurrenceKey];
  if (!rec) return recurrenceKey;
  return lang === 'en' ? rec.label_en : rec.label_tr;
}
