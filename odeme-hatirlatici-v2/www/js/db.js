/**
 * db.js - IndexedDB Veritabanı Yönetimi
 * Ödeme Hatırlatıcı Uygulaması
 */

const DB_NAME = 'OdemeHatirlaticiDB';
const DB_VERSION = 1;
let db = null;

// ==================== VERİTABANI AÇMA ====================
function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = function(event) {
      const database = event.target.result;

      // PAYMENTS STORE
      if (!database.objectStoreNames.contains('payments')) {
        const paymentStore = database.createObjectStore('payments', { keyPath: 'id', autoIncrement: true });
        paymentStore.createIndex('category', 'category', { unique: false });
        paymentStore.createIndex('dueDate', 'dueDate', { unique: false });
        paymentStore.createIndex('status', 'status', { unique: false });
        paymentStore.createIndex('recurrence', 'recurrence', { unique: false });
      }

      // HISTORY STORE
      if (!database.objectStoreNames.contains('history')) {
        const historyStore = database.createObjectStore('history', { keyPath: 'id', autoIncrement: true });
        historyStore.createIndex('paymentId', 'paymentId', { unique: false });
        historyStore.createIndex('paidDate', 'paidDate', { unique: false });
      }

      // SETTINGS STORE
      if (!database.objectStoreNames.contains('settings')) {
        database.createObjectStore('settings', { keyPath: 'key' });
      }
    };

    request.onsuccess = function(event) {
      db = event.target.result;
      resolve(db);
    };

    request.onerror = function(event) {
      reject('Veritabanı açılamadı: ' + event.target.errorCode);
    };
  });
}

// ==================== GENEL CRUD ====================
function dbAdd(storeName, data) {
  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, 'readwrite');
    const store = tx.objectStore(storeName);
    data.createdAt = Date.now();
    data.updatedAt = Date.now();
    const request = store.add(data);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

function dbGet(storeName, id) {
  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, 'readonly');
    const store = tx.objectStore(storeName);
    const request = store.get(id);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

function dbGetAll(storeName) {
  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, 'readonly');
    const store = tx.objectStore(storeName);
    const request = store.getAll();
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

function dbUpdate(storeName, data) {
  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, 'readwrite');
    const store = tx.objectStore(storeName);
    data.updatedAt = Date.now();
    const request = store.put(data);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

function dbDelete(storeName, id) {
  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, 'readwrite');
    const store = tx.objectStore(storeName);
    const request = store.delete(id);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

function dbClear(storeName) {
  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, 'readwrite');
    const store = tx.objectStore(storeName);
    const request = store.clear();
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

// ==================== İNDEKS SORGULARI ====================
function dbGetByIndex(storeName, indexName, value) {
  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, 'readonly');
    const store = tx.objectStore(storeName);
    const index = store.index(indexName);
    const request = index.getAll(value);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

function dbGetByDateRange(storeName, indexName, startDate, endDate) {
  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, 'readonly');
    const store = tx.objectStore(storeName);
    const index = store.index(indexName);
    const range = IDBKeyRange.bound(startDate, endDate);
    const request = index.getAll(range);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

// ==================== ÖDEME İŞLEMLERİ ====================
async function addPayment(payment) {
  payment.status = payment.status || 'pending';
  payment.paidAmount = payment.paidAmount || 0;
  payment.paidDate = payment.paidDate || null;
  payment.notes = payment.notes || '';
  payment.notificationIds = payment.notificationIds || [];
  payment.isTemplate = false;
  return await dbAdd('payments', payment);
}

async function updatePayment(payment) {
  return await dbUpdate('payments', payment);
}

async function deletePayment(id) {
  // Önce ilgili geçmişi sil
  const historyItems = await dbGetByIndex('history', 'paymentId', id);
  for (const item of historyItems) {
    await dbDelete('history', item.id);
  }
  return await dbDelete('payments', id);
}

async function getAllPayments() {
  return await dbGetAll('payments');
}

async function getPaymentsByStatus(status) {
  return await dbGetByIndex('payments', 'status', status);
}

async function getPaymentsByCategory(category) {
  return await dbGetByIndex('payments', 'category', category);
}

async function getPaymentsByDateRange(startDate, endDate) {
  return await dbGetByDateRange('payments', 'dueDate', startDate, endDate);
}

async function getUpcomingPayments(days) {
  const today = new Date();
  const future = new Date();
  future.setDate(today.getDate() + days);
  const startStr = today.toISOString().split('T')[0];
  const endStr = future.toISOString().split('T')[0];
  return await dbGetByDateRange('payments', 'dueDate', startStr, endStr);
}

async function getOverduePayments() {
  const today = new Date().toISOString().split('T')[0];
  const allPending = await dbGetByIndex('payments', 'status', 'pending');
  return allPending.filter(p => p.dueDate < today);
}

async function markPaymentPaid(id, paidAmount, note) {
  const payment = await dbGet('payments', id);
  if (!payment) return null;

  const now = new Date().toISOString().split('T')[0];

  // Geçmişe ekle
  await dbAdd('history', {
    paymentId: id,
    amount: paidAmount || payment.amount,
    paidDate: now,
    note: note || ''
  });

  // Kısmi ödeme kontrolü
  const totalPaid = (payment.paidAmount || 0) + (paidAmount || payment.amount);

  if (totalPaid >= payment.amount) {
    payment.status = 'paid';
    payment.paidAmount = payment.amount;
  } else {
    payment.status = 'partial';
    payment.paidAmount = totalPaid;
  }
  payment.paidDate = now;

  await dbUpdate('payments', payment);

  // Tekrarlayan ödeme ise sonraki vadeyi oluştur
  if (payment.status === 'paid' && payment.recurrence !== 'once') {
    await createNextRecurrence(payment);
  }

  return payment;
}

async function createNextRecurrence(payment) {
  // Taksitli ödemelerde son taksit kontrolü (erken çıkış)
  if (payment.installmentTotal && payment.installmentTotal > 0) {
    const currentInst = payment.installmentCurrent || 1;
    if (currentInst >= payment.installmentTotal) {
      return null; // Son taksit ödendi, tekrar oluşturma
    }
  }

  const nextDue = calculateNextDueDate(payment.dueDate, payment.recurrence, payment.customRecurrenceDays);
  if (!nextDue) return null;

  const newPayment = {
    name: payment.name,
    category: payment.category,
    amount: payment.amount,
    currency: payment.currency || 'TRY',
    dueDate: nextDue,
    recurrence: payment.recurrence,
    recurrenceDay: payment.recurrenceDay,
    customRecurrenceDays: payment.customRecurrenceDays,
    reminderDays: payment.reminderDays,
    status: 'pending',
    paidAmount: 0,
    paidDate: null,
    notes: payment.notes,
    color: payment.color,
    icon: payment.icon,
    isTemplate: false,
    templateId: payment.templateId,
    installmentTotal: payment.installmentTotal,
    installmentCurrent: payment.installmentCurrent ? payment.installmentCurrent + 1 : null,
    notificationIds: []
  };

  return await addPayment(newPayment);
}

function calculateNextDueDate(currentDue, recurrence, customDays) {
  const date = new Date(currentDue + 'T00:00:00');
  switch (recurrence) {
    case 'weekly':
      date.setDate(date.getDate() + 7);
      break;
    case 'monthly':
      date.setMonth(date.getMonth() + 1);
      break;
    case 'bimonthly':
      date.setMonth(date.getMonth() + 2);
      break;
    case 'quarterly':
      date.setMonth(date.getMonth() + 3);
      break;
    case 'biannual':
      date.setMonth(date.getMonth() + 6);
      break;
    case 'yearly':
      date.setFullYear(date.getFullYear() + 1);
      break;
    case 'custom':
      if (customDays) date.setDate(date.getDate() + customDays);
      else return null;
      break;
    default:
      return null;
  }
  return date.toISOString().split('T')[0];
}

// ==================== GEÇMİŞ İŞLEMLERİ ====================
async function getPaymentHistory(paymentId) {
  return await dbGetByIndex('history', 'paymentId', paymentId);
}

async function getAllHistory() {
  return await dbGetAll('history');
}

async function getHistoryByDateRange(startDate, endDate) {
  return await dbGetByDateRange('history', 'paidDate', startDate, endDate);
}

// ==================== AYAR İŞLEMLERİ ====================
async function getSetting(key) {
  const result = await dbGet('settings', key);
  return result ? result.value : null;
}

async function setSetting(key, value) {
  return await dbUpdate('settings', { key: key, value: value, updatedAt: Date.now() });
}

async function getAllSettings() {
  const all = await dbGetAll('settings');
  const obj = {};
  all.forEach(s => { obj[s.key] = s.value; });
  return obj;
}

async function initDefaultSettings() {
  const defaults = {
    language: 'tr',
    theme: 'light',
    currency: 'TRY',
    defaultReminderDays: [3, 1, 0],
    isPremium: false,
    premiumExpiry: null,
    backupAutoEnabled: false,
    notificationSound: 'default',
    firstLaunch: true
  };

  for (const [key, value] of Object.entries(defaults)) {
    const existing = await getSetting(key);
    if (existing === null || existing === undefined) {
      await dbUpdate('settings', { key: key, value: value });
    }
  }
}

// ==================== İSTATİSTİKLER ====================
async function getMonthlyStats(year, month) {
  const startDate = `${year}-${String(month).padStart(2, '0')}-01`;
  const endMonth = month === 12 ? 1 : month + 1;
  const endYear = month === 12 ? year + 1 : year;
  const endDate = `${endYear}-${String(endMonth).padStart(2, '0')}-01`;

  const payments = await dbGetByDateRange('payments', 'dueDate', startDate, endDate);
  const history = await dbGetByDateRange('history', 'paidDate', startDate, endDate);

  const totalDue = payments.reduce((sum, p) => sum + (p.amount || 0), 0);
  const totalPaid = history.reduce((sum, h) => sum + (h.amount || 0), 0);
  const pendingCount = payments.filter(p => p.status === 'pending').length;
  const overdueCount = payments.filter(p => p.status === 'pending' && p.dueDate < new Date().toISOString().split('T')[0]).length;

  // Kategori bazlı
  const byCategory = {};
  payments.forEach(p => {
    if (!byCategory[p.category]) byCategory[p.category] = 0;
    byCategory[p.category] += p.amount || 0;
  });

  return { totalDue, totalPaid, pendingCount, overdueCount, byCategory, payments, history };
}

async function getPaymentCount() {
  const all = await dbGetAll('payments');
  return all.filter(p => p.status !== 'paid').length;
}

// ==================== YEDEKLEME ====================
async function exportAllData() {
  const payments = await dbGetAll('payments');
  const history = await dbGetAll('history');
  const settings = await dbGetAll('settings');
  return {
    version: 1,
    exportDate: new Date().toISOString(),
    payments: payments,
    history: history,
    settings: settings
  };
}

async function importAllData(data) {
  if (!data || !data.payments) throw new Error('Geçersiz yedek dosyası');

  await dbClear('payments');
  await dbClear('history');
  await dbClear('settings');

  for (const payment of data.payments) {
    await dbAdd('payments', payment);
  }
  for (const item of data.history) {
    await dbAdd('history', item);
  }
  for (const setting of data.settings) {
    await dbAdd('settings', setting);
  }

  return true;
}
