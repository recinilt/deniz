/**
 * app.js - Ana Uygulama Mantığı
 * Routing, UI Rendering, Event Handlers
 * Ödeme Hatırlatıcı Uygulaması
 */

let currentPage = 'dashboard';
let currentTheme = 'light';
let selectedPaymentId = null;
let calendarYear = new Date().getFullYear();
let calendarMonth = new Date().getMonth(); // 0-indexed

// ==================== UYGULAMA BAŞLATMA ====================
document.addEventListener('deviceready', onDeviceReady, false);

// Tarayıcı fallback
if (!window.cordova) {
  document.addEventListener('DOMContentLoaded', onAppReady);
}

function onDeviceReady() {
  console.log('Cordova hazır');
  if (window.StatusBar) {
    StatusBar.styleDefault();
    StatusBar.backgroundColorByHexString('#1976D2');
  }
  onAppReady();
}

async function onAppReady() {
  try {
    await openDB();
    await initDefaultSettings();

    // Ayarları yükle
    const lang = await getSetting('language');
    if (lang) setLanguage(lang);

    const theme = await getSetting('theme');
    if (theme) applyTheme(theme);

    // Premium durumu
    await loadPremiumFromSettings();

    // Bildirimleri başlat
    if (typeof initNotifications === 'function') {
      initNotifications();
    }

    // Store başlat
    if (typeof initStore === 'function') {
      initStore();
    }

    // Gecikmiş ödemeleri güncelle
    await updateOverduePayments();

    // UI çevir
    translateUI();

    // Dashboard göster
    navigateTo('dashboard');

    // Bottom nav event
    initNavigation();

    console.log('Uygulama hazır');
  } catch (err) {
    console.error('Başlatma hatası:', err);
  }
}

// ==================== GECİKMİŞ ÖDEMELER GÜNCELLE ====================
async function updateOverduePayments() {
  const payments = await getAllPayments();
  const today = new Date().toISOString().split('T')[0];

  for (const p of payments) {
    if ((p.status === 'pending' || p.status === 'partial') && p.dueDate < today) {
      p.status = 'overdue';
      await updatePayment(p);
    }
  }
}

// ==================== ROUTING ====================
function navigateTo(page, data) {
  currentPage = page;

  // Tüm sayfaları gizle
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));

  // Hedef sayfayı göster
  const target = document.getElementById('page-' + page);
  if (target) target.classList.add('active');

  // Nav aktif durumu
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  const navItem = document.querySelector(`.nav-item[data-page="${page}"]`);
  if (navItem) navItem.classList.add('active');

  // Sayfa render
  switch (page) {
    case 'dashboard': renderDashboard(); break;
    case 'payments': renderPaymentList(); break;
    case 'calendar': renderCalendar(); break;
    case 'reports': renderReports(); break;
    case 'settings': renderSettings(); break;
  }

  // Scroll en üste
  window.scrollTo(0, 0);
}

function initNavigation() {
  document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', function() {
      const page = this.dataset.page;
      if (page) navigateTo(page);
    });
  });
}

function refreshCurrentPage() {
  navigateTo(currentPage);
}

// ==================== DASHBOARD ====================
async function renderDashboard() {
  await updateOverduePayments();
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const stats = await getMonthlyStats(year, month);
  const payments = await getAllPayments();
  const today = now.toISOString().split('T')[0];

  // Yaklaşan ödemeler (7 gün içinde)
  const upcoming = payments.filter(p => {
    if (p.status === 'paid') return false;
    const days = getDaysUntil(p.dueDate);
    return days >= 0 && days <= 7;
  }).sort((a, b) => a.dueDate.localeCompare(b.dueDate));

  // Geciken ödemeler
  const overdue = payments.filter(p => p.status === 'overdue');

  // Ödenen sayısı
  const paidCount = payments.filter(p => p.status === 'paid' && p.dueDate && p.dueDate.startsWith(year + '-' + String(month).padStart(2, '0'))).length;

  // Dashboard kartları
  const elTotal = document.getElementById('dash-total');
  const elPaid = document.getElementById('dash-paid');
  const elOverdue = document.getElementById('dash-overdue');
  const elUpcoming = document.getElementById('dash-upcoming-count');

  if (elTotal) elTotal.textContent = formatMoney(stats.totalDue);
  if (elPaid) elPaid.textContent = formatMoney(stats.totalPaid);
  if (elOverdue) elOverdue.textContent = overdue.length;
  if (elUpcoming) elUpcoming.textContent = upcoming.length;

  // Yaklaşan ödemeler listesi
  const listEl = document.getElementById('dash-upcoming-list');
  if (listEl) {
    if (upcoming.length === 0) {
      listEl.innerHTML = `<div class="empty-state"><p>${t('no_data')}</p></div>`;
    } else {
      listEl.innerHTML = upcoming.map(p => renderPaymentCard(p)).join('');
    }
  }

  // Geciken ödemeler uyarısı
  const overdueEl = document.getElementById('dash-overdue-alert');
  if (overdueEl) {
    if (overdue.length > 0) {
      overdueEl.style.display = 'block';
      overdueEl.innerHTML = `
        <div class="alert alert-danger" onclick="navigateTo('payments')">
          ⚠️ ${overdue.length} ${t('filter_overdue').toLowerCase()} ${t('nav_payments').toLowerCase()}!
        </div>
      `;
    } else {
      overdueEl.style.display = 'none';
    }
  }

  // Kalan ödeme hakkı (free plan)
  const remainEl = document.getElementById('dash-remaining');
  if (remainEl) {
    if (!isPremium) {
      const remaining = await getRemainingPayments();
      remainEl.style.display = 'block';
      remainEl.textContent = t('pay_remaining') + ': ' + remaining + '/' + FREE_PAYMENT_LIMIT;
    } else {
      remainEl.style.display = 'none';
    }
  }
}

// ==================== ÖDEME LİSTESİ ====================
let filterCategory = 'all';
let filterStatus = 'all';
let searchQuery = '';

async function renderPaymentList() {
  // Önce gecikmiş ödemeleri güncelle
  await updateOverduePayments();
  let payments = await getAllPayments();

  // Filtrele
  if (filterCategory !== 'all') {
    payments = payments.filter(p => p.category === filterCategory);
  }
  if (filterStatus !== 'all') {
    payments = payments.filter(p => p.status === filterStatus);
  }
  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    payments = payments.filter(p => (p.name || '').toLowerCase().includes(q));
  }

  // Sırala: önce geciken, sonra yaklaşan, sonra ödenen
  const statusOrder = { overdue: 0, pending: 1, partial: 2, paid: 3 };
  payments.sort((a, b) => {
    const sa = statusOrder[a.status] || 1;
    const sb = statusOrder[b.status] || 1;
    if (sa !== sb) return sa - sb;
    return (a.dueDate || '').localeCompare(b.dueDate || '');
  });

  const listEl = document.getElementById('payment-list');
  if (!listEl) return;

  if (payments.length === 0) {
    listEl.innerHTML = `<div class="empty-state"><p>${t('no_data')}</p></div>`;
  } else {
    listEl.innerHTML = payments.map(p => renderPaymentCard(p)).join('');
  }
}

function renderPaymentCard(payment) {
  const days = getDaysUntil(payment.dueDate);
  const cat = CATEGORIES[payment.category];
  const icon = cat ? cat.icon : '📋';
  const color = payment.color || (cat ? cat.color : '#9E9E9E');

  let statusClass = '';
  let statusText = '';
  let daysText = '';

  switch (payment.status) {
    case 'paid':
      statusClass = 'status-paid';
      statusText = t('filter_paid');
      break;
    case 'overdue':
      statusClass = 'status-overdue';
      statusText = t('filter_overdue');
      daysText = Math.abs(days) + ' ' + t('dash_days_late');
      break;
    case 'partial':
      statusClass = 'status-partial';
      statusText = t('filter_partial');
      daysText = days >= 0 ? days + ' ' + t('dash_days_left') : Math.abs(days) + ' ' + t('dash_days_late');
      break;
    default:
      statusClass = days <= 3 ? 'status-urgent' : 'status-pending';
      statusText = t('filter_pending');
      daysText = days >= 0 ? days + ' ' + t('dash_days_left') : '';
  }

  const currSymbol = getCurrencySymbol(payment.currency || 'TRY');
  const amountStr = new Intl.NumberFormat('tr-TR', { minimumFractionDigits: 0, maximumFractionDigits: 2 }).format(payment.amount || 0);

  return `
    <div class="payment-card ${statusClass}" onclick="showPaymentDetail(${payment.id})" style="border-left-color: ${color}">
      <div class="payment-card-header">
        <span class="payment-icon">${icon}</span>
        <div class="payment-info">
          <h3 class="payment-name">${escapeHtml(payment.name)}</h3>
          <span class="payment-category">${getCategoryLabel(payment.category, currentLang)}</span>
        </div>
        <div class="payment-amount">
          <strong>${amountStr} ${currSymbol}</strong>
          ${payment.status === 'partial' ? '<small>' + formatMoney(payment.paidAmount || 0) + ' ' + t('filter_paid').toLowerCase() + '</small>' : ''}
        </div>
      </div>
      <div class="payment-card-footer">
        <span class="payment-date">📅 ${formatDateShort(payment.dueDate)}</span>
        <span class="payment-status-badge ${statusClass}">${statusText}</span>
        ${daysText ? '<span class="payment-days">' + daysText + '</span>' : ''}
        ${payment.recurrence && payment.recurrence !== 'once' ? '<span class="payment-recurrence">🔄 ' + getRecurrenceLabel(payment.recurrence, currentLang) + '</span>' : ''}
      </div>
    </div>
  `;
}

// ==================== ÖDEME DETAY ====================
async function showPaymentDetail(id, projectedData) {
  const payment = await getPayment(id);
  if (!payment) return;

  selectedPaymentId = id;
  const history = await getPaymentHistory(id);
  const cat = CATEGORIES[payment.category];
  const icon = cat ? cat.icon : '📋';

  // Projected override (takvimden geliyorsa)
  const displayDueDate = projectedData && projectedData.calDueDate ? projectedData.calDueDate : payment.dueDate;
  const displayInstallment = projectedData && projectedData.calInstallment ? projectedData.calInstallment : (payment.installmentTotal ? (payment.installmentCurrent || 1) + '/' + payment.installmentTotal : null);

  // Durum: projected tarih varsa ona göre hesapla
  let displayStatus = payment.status;
  if (projectedData && projectedData.calDueDate) {
    const today = new Date();
    today.setHours(0,0,0,0);
    const projDate = new Date(projectedData.calDueDate + 'T00:00:00');
    if (projDate < today && payment.status !== 'paid') displayStatus = 'overdue';
    else if (payment.status !== 'paid') displayStatus = 'pending';
  }

  const modal = document.getElementById('modal-payment-detail');
  if (!modal) return;

  modal.innerHTML = `
    <div class="modal-content">
      <div class="modal-header">
        <h2>${icon} ${escapeHtml(payment.name)}</h2>
        <button class="btn-close" onclick="closeModal('modal-payment-detail')">&times;</button>
      </div>
      <div class="modal-body">
        <div class="detail-row"><span>${t('pay_category')}</span><strong>${getCategoryLabel(payment.category, currentLang)}</strong></div>
        <div class="detail-row"><span>${t('pay_amount')}</span><strong>${formatMoney(payment.amount)}</strong></div>
        <div class="detail-row"><span>${t('pay_due_date')}</span><strong>${formatDate(displayDueDate)}</strong></div>
        <div class="detail-row"><span>${t('pay_recurrence')}</span><strong>${getRecurrenceLabel(payment.recurrence, currentLang)}</strong></div>
        <div class="detail-row"><span>${t('pay_status')}</span><strong>${t('filter_' + displayStatus)}</strong></div>
        ${displayStatus === 'partial' ? '<div class="detail-row"><span>' + t('pay_paid_amount') + '</span><strong>' + formatMoney(payment.paidAmount || 0) + '</strong></div>' : ''}
        ${displayInstallment ? '<div class="detail-row"><span>' + t('pay_installment') + '</span><strong>' + displayInstallment + '</strong></div>' : ''}
        ${payment.notes ? '<div class="detail-row"><span>' + t('pay_notes') + '</span><strong>' + escapeHtml(payment.notes) + '</strong></div>' : ''}

        ${history.length > 0 ? `
          <h3 class="mt-16">${t('pay_history')}</h3>
          <div class="history-list">
            ${history.map(h => `
              <div class="history-item">
                <span>${formatDate(h.paidDate)}</span>
                <strong>${formatMoney(h.amount)}</strong>
                ${h.note ? '<small>' + escapeHtml(h.note) + '</small>' : ''}
              </div>
            `).join('')}
          </div>
        ` : ''}
      </div>
      <div class="modal-footer" style="display:grid; grid-template-columns:1fr 1fr; gap:8px;">
        ${displayStatus !== 'paid' ? `
          <button class="btn btn-success" onclick="handleMarkPaid(${id})">✅ ${t('pay_mark_paid')}</button>
          <button class="btn btn-warning" onclick="showPartialPayForm(${id})">💰 ${t('pay_partial')}</button>
        ` : ''}
        <button class="btn btn-primary" onclick="showEditPaymentForm(${id})">✏️ ${t('pay_edit')}</button>
        <button class="btn btn-danger" onclick="handleDeletePayment(${id})">🗑️ ${t('pay_delete')}</button>
      </div>
    </div>
  `;

  modal.classList.add('active');
}

// ==================== ÖDEME EKLEME FORMU ====================
function showAddPaymentForm() {
  const modal = document.getElementById('modal-payment-form');
  if (!modal) return;

  selectedPaymentId = null;

  // Template butonları
  const templateBtns = TEMPLATES.map((tmpl, idx) => {
    const cat = CATEGORIES[tmpl.category];
    return `<button class="template-btn" onclick="fillTemplate(${idx})" style="border-color:${cat ? cat.color : '#ccc'}">${cat ? cat.icon : '📋'} ${tmpl.name}</button>`;
  }).join('');

  modal.innerHTML = `
    <div class="modal-content">
      <div class="modal-header">
        <h2>${t('pay_add')}</h2>
        <button class="btn-close" onclick="closeModal('modal-payment-form')">&times;</button>
      </div>
      <div class="modal-body">
        <div class="template-grid">${templateBtns}</div>
        <hr>
        ${renderPaymentFormFields()}
      </div>
      <div class="modal-footer">
        <button class="btn btn-primary" onclick="handleSavePayment()">${t('save')}</button>
        <button class="btn btn-secondary" onclick="closeModal('modal-payment-form')">${t('cancel')}</button>
      </div>
    </div>
  `;

  modal.classList.add('active');
}

async function showEditPaymentForm(id) {
  const payment = await getPayment(id);
  if (!payment) return;

  selectedPaymentId = id;
  closeModal('modal-payment-detail');

  const modal = document.getElementById('modal-payment-form');
  if (!modal) return;

  modal.innerHTML = `
    <div class="modal-content">
      <div class="modal-header">
        <h2>${t('pay_edit')}</h2>
        <button class="btn-close" onclick="closeModal('modal-payment-form')">&times;</button>
      </div>
      <div class="modal-body">
        ${renderPaymentFormFields(payment)}
      </div>
      <div class="modal-footer">
        <button class="btn btn-primary" onclick="handleSavePayment()">${t('save')}</button>
        <button class="btn btn-secondary" onclick="closeModal('modal-payment-form')">${t('cancel')}</button>
      </div>
    </div>
  `;

  modal.classList.add('active');
}

function renderPaymentFormFields(payment) {
  const p = payment || {};
  const categoryOptions = Object.keys(CATEGORIES).map(k =>
    `<option value="${k}" ${p.category === k ? 'selected' : ''}>${getCategoryLabel(k, currentLang)}</option>`
  ).join('');
  const recurrenceOptions = Object.keys(RECURRENCES).map(key =>
    `<option value="${key}" ${p.recurrence === key ? 'selected' : ''}>${getRecurrenceLabel(key, currentLang)}</option>`
  ).join('');
  const currencyOptions = CURRENCIES.map(c =>
    `<option value="${c.code}" ${(p.currency || 'TRY') === c.code ? 'selected' : ''}>${c.code} (${c.symbol})</option>`
  ).join('');
  const colorOptions = COLORS.map(c =>
    `<span class="color-option ${(p.color || '#1976D2') === c ? 'selected' : ''}" style="background:${c}" data-color="${c}" onclick="selectColor(this)"></span>`
  ).join('');

  const reminderDays = p.reminderDays || [3, 1, 0];

  return `
    <div class="form-group">
      <label>${t('pay_name')}</label>
      <input type="text" id="form-name" value="${escapeHtml(p.name || '')}" placeholder="${t('pay_name')}">
    </div>
    <div class="form-group">
      <label>${t('pay_category')}</label>
      <select id="form-category" onchange="toggleInstallmentFields()">${categoryOptions}</select>
    </div>
    <div class="form-row">
      <div class="form-group flex-2">
        <label>${t('pay_amount')}</label>
        <input type="number" id="form-amount" value="${p.amount || ''}" step="0.01" min="0" placeholder="0.00">
      </div>
      <div class="form-group flex-1">
        <label>${t('pay_currency')}</label>
        <select id="form-currency">${currencyOptions}</select>
      </div>
    </div>
    <div class="form-group">
      <label>${t('pay_due_date')}</label>
      <input type="date" id="form-duedate" value="${p.dueDate || ''}">
    </div>
    <div class="form-group">
      <label>${t('pay_recurrence')}</label>
      <select id="form-recurrence">${recurrenceOptions}</select>
    </div>
    <div class="form-row" id="installment-fields" style="${['kredi','borc'].includes(p.category) ? '' : 'display:none'}">
      <div class="form-group flex-1">
        <label>${t('pay_installment')} (${t('pay_total')})</label>
        <input type="number" id="form-installment-total" value="${p.installmentTotal || ''}" min="0" placeholder="0">
      </div>
      <div class="form-group flex-1">
        <label>${t('pay_installment')} (${t('pay_current')})</label>
        <input type="number" id="form-installment-current" value="${p.installmentCurrent || 1}" min="1" placeholder="1">
      </div>
    </div>
    <div class="form-group">
      <label>${t('set_reminders')}</label>
      <div class="reminder-checks">
        <label class="checkbox-label"><input type="checkbox" class="reminder-check" value="7" ${reminderDays.includes(7) ? 'checked' : ''}> 7 ${t('dash_days_left')}</label>
        <label class="checkbox-label"><input type="checkbox" class="reminder-check" value="3" ${reminderDays.includes(3) ? 'checked' : ''}> 3 ${t('dash_days_left')}</label>
        <label class="checkbox-label"><input type="checkbox" class="reminder-check" value="1" ${reminderDays.includes(1) ? 'checked' : ''}> 1 ${t('dash_days_left')}</label>
        <label class="checkbox-label"><input type="checkbox" class="reminder-check" value="0" ${reminderDays.includes(0) ? 'checked' : ''}> ${t('pay_due_date')}</label>
      </div>
    </div>
    <div class="form-group">
      <label>${t('pay_color')}</label>
      <div class="color-picker">${colorOptions}</div>
      <input type="hidden" id="form-color" value="${p.color || '#1976D2'}">
    </div>
    <div class="form-group">
      <label>${t('pay_notes')}</label>
      <textarea id="form-notes" rows="2" placeholder="${t('pay_notes')}">${escapeHtml(p.notes || '')}</textarea>
    </div>
  `;
}

function fillTemplate(templateIndex) {
  const tmpl = TEMPLATES[templateIndex];
  if (!tmpl) return;

  document.getElementById('form-name').value = tmpl.name;
  document.getElementById('form-category').value = tmpl.category;
  document.getElementById('form-recurrence').value = tmpl.recurrence;

  if (tmpl.defaultAmount) {
    document.getElementById('form-amount').value = tmpl.defaultAmount;
  }

  // Rengi ayarla
  const cat = CATEGORIES[tmpl.category];
  if (cat) {
    document.getElementById('form-color').value = cat.color;
    document.querySelectorAll('.color-option').forEach(el => {
      el.classList.toggle('selected', el.dataset.color === cat.color);
    });
  }

  // Taksit alanını göster/gizle
  toggleInstallmentFields();
}

function selectColor(el) {
  document.querySelectorAll('.color-option').forEach(e => e.classList.remove('selected'));
  el.classList.add('selected');
  document.getElementById('form-color').value = el.dataset.color;
}

function toggleInstallmentFields() {
  const cat = document.getElementById('form-category').value;
  const el = document.getElementById('installment-fields');
  if (el) {
    el.style.display = ['kredi', 'borc'].includes(cat) ? 'flex' : 'none';
  }
}

// ==================== ÖDEME KAYDETME ====================
async function handleSavePayment() {
  const name = document.getElementById('form-name').value.trim();
  const category = document.getElementById('form-category').value;
  const amount = parseFloat(document.getElementById('form-amount').value) || 0;
  const currency = document.getElementById('form-currency').value;
  const dueDate = document.getElementById('form-duedate').value;
  const recurrence = document.getElementById('form-recurrence').value;
  const installmentTotal = parseInt(document.getElementById('form-installment-total').value) || 0;
  const installmentCurrent = parseInt(document.getElementById('form-installment-current').value) || 1;
  const color = document.getElementById('form-color').value;
  const notes = document.getElementById('form-notes').value.trim();

  // Hatırlatma günleri
  const reminderDays = [];
  document.querySelectorAll('.reminder-check:checked').forEach(cb => {
    reminderDays.push(parseInt(cb.value));
  });

  // Doğrulama
  if (!name) { showToast(t('pay_name') + ' ' + t('error')); return; }
  if (!dueDate) { showToast(t('pay_due_date') + ' ' + t('error')); return; }
  if (amount <= 0) { showToast(t('pay_amount') + ' ' + t('error')); return; }

  const paymentData = {
    name, category, amount, currency, dueDate, recurrence,
    reminderDays: reminderDays.length > 0 ? reminderDays : [3, 1, 0],
    status: 'pending', paidAmount: 0, notes, color,
    installmentTotal: installmentTotal || null,
    installmentCurrent: installmentCurrent,
    notificationIds: []
  };

  try {
    if (selectedPaymentId) {
      // Güncelle
      paymentData.id = selectedPaymentId;
      const existing = await getPayment(selectedPaymentId);
      paymentData.status = existing.status;
      paymentData.paidAmount = existing.paidAmount;
      await updatePayment(paymentData);

      // Bildirimleri yeniden zamanla
      if (typeof cancelPaymentNotifications === 'function') cancelPaymentNotifications(selectedPaymentId);
      if (typeof schedulePaymentNotifications === 'function') schedulePaymentNotifications(paymentData);

      showToast(t('success'));
    } else {
      // Yeni ekle - limit kontrolü
      const canAdd = await canAddPayment();
      if (!canAdd) {
        showPremiumPrompt();
        return;
      }

      const id = await addPayment(paymentData);
      paymentData.id = id;

      // Bildirimleri zamanla
      if (typeof schedulePaymentNotifications === 'function') schedulePaymentNotifications(paymentData);

      showToast(t('success'));
    }

    closeModal('modal-payment-form');
    refreshCurrentPage();
  } catch (err) {
    console.error('Kaydetme hatası:', err);
    showToast(t('error'));
  }
}

// ==================== ÖDEME İŞLEMLERİ ====================
async function handleMarkPaid(id) {
  const payment = await getPayment(id);
  if (!payment) return;

  await markPaymentPaid(id, payment.amount);

  if (typeof cancelPaymentNotifications === 'function') cancelPaymentNotifications(id);

  closeModal('modal-payment-detail');
  showToast(t('success'));
  refreshCurrentPage();
}

function showPartialPayForm(id) {
  const amountInput = prompt(t('pay_partial_amount'));
  if (amountInput === null) return;
  const amount = parseFloat(amountInput);
  if (isNaN(amount) || amount <= 0) {
    showToast(t('error'));
    return;
  }
  handlePartialPay(id, amount);
}

async function handlePartialPay(id, amount) {
  await markPaymentPaid(id, amount);
  closeModal('modal-payment-detail');
  showToast(t('success'));
  refreshCurrentPage();
}

async function handleDeletePayment(id) {
  showConfirmDialog(t('confirm_delete'), async function() {
    if (typeof cancelPaymentNotifications === 'function') cancelPaymentNotifications(id);
    await deletePayment(id);
    closeModal('modal-payment-detail');
    showToast(t('success'));
    refreshCurrentPage();
  });
}

// ==================== TAKVİM ====================
async function renderCalendar() {
  const payments = await getAllPayments();
  const monthNames = t('cal_months');
  const dayNames = t('cal_days_short');

  const titleEl = document.getElementById('calendar-title');
  if (titleEl) titleEl.textContent = monthNames[calendarMonth] + ' ' + calendarYear;

  const firstDay = new Date(calendarYear, calendarMonth, 1);
  const lastDay = new Date(calendarYear, calendarMonth + 1, 0);
  let startDay = firstDay.getDay();
  if (startDay === 0) startDay = 7; // Pazartesi başlangıç

  // Tekrarlayan ödemelerin bu aydaki tarihlerini hesapla
  const calPayments = getCalendarPayments(payments, calendarYear, calendarMonth);

  const grid = document.getElementById('calendar-grid');
  if (!grid) return;

  let html = '';

  // Gün başlıkları
  dayNames.forEach(d => {
    html += `<div class="cal-day-header">${d}</div>`;
  });

  // Boş günler
  for (let i = 1; i < startDay; i++) {
    html += '<div class="cal-day empty"></div>';
  }

  // Günler
  const today = new Date().toISOString().split('T')[0];

  for (let day = 1; day <= lastDay.getDate(); day++) {
    const dateStr = calendarYear + '-' + String(calendarMonth + 1).padStart(2, '0') + '-' + String(day).padStart(2, '0');
    const isToday = dateStr === today;
    const dayPayments = calPayments.filter(p => p.calDate === dateStr);

    let dots = '';
    dayPayments.forEach(p => {
      const color = p.color || '#1976D2';
      const statusIcon = p.status === 'paid' ? '✓' : p.status === 'overdue' ? '!' : '';
      dots += `<span class="cal-dot" style="background:${color}" title="${escapeHtml(p.name)}">${statusIcon}</span>`;
    });

    html += `
      <div class="cal-day ${isToday ? 'today' : ''} ${dayPayments.length > 0 ? 'has-payment' : ''}" onclick="showDayPayments('${dateStr}')">
        <span class="cal-day-num">${day}</span>
        <div class="cal-dots">${dots}</div>
      </div>
    `;
  }

  grid.innerHTML = html;
}

// Tekrarlayan ödemelerin takvim ayındaki tarihlerini hesapla
function getCalendarPayments(payments, year, month) {
  const results = [];
  const monthStart = new Date(year, month, 1);
  const monthEnd = new Date(year, month + 1, 0);

  payments.forEach(p => {
    if (!p.dueDate) return;
    const due = new Date(p.dueDate + 'T00:00:00');

    // Tekrarsız ödeme → sadece orijinal tarihte
    if (!p.recurrence || p.recurrence === 'once') {
      if (due >= monthStart && due <= monthEnd) {
        results.push({ ...p, calDate: p.dueDate });
      }
      return;
    }

    // Ödeme henüz başlamamış (vade tarihi bu aydan sonra)
    if (due > monthEnd) return;

    // Haftalık özel hesaplama
    if (p.recurrence === 'weekly') {
      const dayOfWeek = due.getDay();
      const d = new Date(year, month, 1);
      while (d <= monthEnd) {
        if (d.getDay() === dayOfWeek && d >= due) {
          const ds = formatDateStr(d);
          results.push({ ...p, calDate: ds, status: d < new Date() ? 'overdue' : 'pending' });
        }
        d.setDate(d.getDate() + 1);
      }
      return;
    }

    // Aylık ve diğer periyodik ödemeler
    const intervalMonths = getIntervalMonths(p.recurrence);
    if (intervalMonths === 0) return;

    // Başlangıçtan bu aya kaç periyot geçmiş?
    const diffMonths = (year - due.getFullYear()) * 12 + (month - due.getMonth());

    // Bu ay periyoda denk geliyor mu?
    if (diffMonths < 0 || diffMonths % intervalMonths !== 0) return;

    // Kaçıncı periyot?
    const periodIndex = diffMonths / intervalMonths;

    // Taksitli ödeme kontrolü
    if (p.installmentTotal && p.installmentTotal > 0) {
      const startInstallment = p.installmentCurrent || 1;
      const projectedInstallment = startInstallment + periodIndex;
      // Taksit bitti mi?
      if (projectedInstallment > p.installmentTotal) return;

      // Projected vade tarihi
      const dueDay = due.getDate();
      const lastDayOfMonth = monthEnd.getDate();
      const projDay = Math.min(dueDay, lastDayOfMonth);
      const projDate = new Date(year, month, projDay);
      const ds = formatDateStr(projDate);

      results.push({
        ...p,
        calDate: ds,
        calDueDate: ds,
        calInstallment: projectedInstallment + '/' + p.installmentTotal,
        status: projDate < new Date() ? (p.status === 'paid' && periodIndex === 0 ? 'paid' : 'pending') : 'pending'
      });
    } else {
      // Taksitsiz tekrarlayan (fatura vb.)
      const dueDay = due.getDate();
      const lastDayOfMonth = monthEnd.getDate();
      const projDay = Math.min(dueDay, lastDayOfMonth);
      const projDate = new Date(year, month, projDay);
      const ds = formatDateStr(projDate);

      // Orijinal ay ise gerçek durumu göster, değilse pending
      const isOriginalMonth = (periodIndex === 0);

      results.push({
        ...p,
        calDate: ds,
        calDueDate: ds,
        status: isOriginalMonth ? p.status : 'pending'
      });
    }
  });

  return results;
}

function getIntervalMonths(recurrence) {
  switch (recurrence) {
    case 'monthly': return 1;
    case 'bimonthly': return 2;
    case 'quarterly': return 3;
    case 'biannual': return 6;
    case 'yearly': return 12;
    default: return 0;
  }
}

function formatDateStr(d) {
  return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
}

function calendarPrev() {
  calendarMonth--;
  if (calendarMonth < 0) { calendarMonth = 11; calendarYear--; }
  renderCalendar();
}

function calendarNext() {
  calendarMonth++;
  if (calendarMonth > 11) { calendarMonth = 0; calendarYear++; }
  renderCalendar();
}

async function showDayPayments(dateStr) {
  const payments = await getAllPayments();
  const month = parseInt(dateStr.split('-')[1]) - 1;
  const year = parseInt(dateStr.split('-')[0]);
  const calPayments = getCalendarPayments(payments, year, month);
  const dayPayments = calPayments.filter(p => p.calDate === dateStr);

  if (dayPayments.length === 0) return;

  // Tek veya çok ödeme — hepsinde projected modal göster
  if (dayPayments.length === 1) {
    showCalendarPaymentDetail(dayPayments[0]);
    return;
  }

  // Birden fazla ödeme varsa liste göster
  const modal = document.getElementById('modal-payment-detail');
  if (!modal) return;

  modal.innerHTML = `
    <div class="modal-content">
      <div class="modal-header">
        <h2>📅 ${formatDate(dateStr)}</h2>
        <button class="btn-close" onclick="closeModal('modal-payment-detail')">&times;</button>
      </div>
      <div class="modal-body">
        ${dayPayments.map(p => `
          <div class="payment-card" onclick="showCalendarPaymentDetail(calPaymentsCache['${p.calDate}_${p.id}'])" style="border-left: 4px solid ${p.color || '#1976D2'}; cursor:pointer; margin-bottom:8px; padding:12px;">
            <strong>${escapeHtml(p.name)}</strong>
            <div>${formatMoney(p.amount)} — ${formatDate(p.calDueDate || p.calDate)}</div>
            ${p.calInstallment ? `<div>Taksit: ${p.calInstallment}</div>` : ''}
          </div>
        `).join('')}
      </div>
    </div>
  `;
  // Cache payments for click access
  if (!window.calPaymentsCache) window.calPaymentsCache = {};
  dayPayments.forEach(p => { window.calPaymentsCache[p.calDate + '_' + p.id] = p; });

  modal.classList.add('active');
}

// Takvimden tıklanan ödemenin projected bilgilerini göster
function showCalendarPaymentDetail(calPayment) {
  if (!calPayment) return;

  const payment = calPayment;
  const projectedDue = payment.calDueDate || payment.calDate || payment.dueDate;
  const projectedInstallment = payment.calInstallment || null;
  const cat = CATEGORIES[payment.category];
  const catLabel = cat ? (currentLang === 'en' ? cat.label_en : cat.label_tr) : payment.category;
  const catIcon = cat ? cat.icon : '📋';

  // Durum hesapla: projected tarih geçmişte mi?
  const today = new Date();
  today.setHours(0,0,0,0);
  const projDate = new Date(projectedDue + 'T00:00:00');
  let statusLabel = t('filter_pending');
  if (projDate < today) statusLabel = t('filter_overdue');

  const modal = document.getElementById('modal-payment-detail');
  if (!modal) return;

  modal.innerHTML = `
    <div class="modal-content">
      <div class="modal-header">
        <h2>${catIcon} ${escapeHtml(payment.name)}</h2>
        <button class="btn-close" onclick="closeModal('modal-payment-detail')">&times;</button>
      </div>
      <div class="modal-body">
        <div class="detail-row"><span>${t('pay_category')}</span><strong>${catLabel}</strong></div>
        <div class="detail-row"><span>${t('pay_amount')}</span><strong>${formatMoney(payment.amount)}</strong></div>
        <div class="detail-row"><span>${t('pay_due_date')}</span><strong>${formatDate(projectedDue)}</strong></div>
        <div class="detail-row"><span>${t('pay_recurrence')}</span><strong>${getRecurrenceLabel(payment.recurrence, currentLang)}</strong></div>
        <div class="detail-row"><span>${t('pay_status')}</span><strong>${statusLabel}</strong></div>
        ${projectedInstallment ? `<div class="detail-row"><span>${t('pay_installment')}</span><strong>${projectedInstallment}</strong></div>` : ''}
        ${payment.notes ? `<div class="detail-row"><span>${t('pay_notes')}</span><strong>${escapeHtml(payment.notes)}</strong></div>` : ''}
      </div>
      <div class="modal-footer" style="display:grid; grid-template-columns:1fr 1fr; gap:8px;">
        <button class="btn btn-primary" onclick="closeModal('modal-payment-detail');showPaymentDetailFromCalendar()">📋 Detay</button>
        <button class="btn btn-secondary" onclick="closeModal('modal-payment-detail')">✖ ${t('close')}</button>
      </div>
    </div>
  `;
  // Projected veriyi global sakla
  window._calProjectedData = { calDueDate: projectedDue, calInstallment: projectedInstallment, paymentId: payment.id };

  modal.classList.add('active');
}

function showPaymentDetailFromCalendar() {
  if (window._calProjectedData) {
    showPaymentDetail(window._calProjectedData.paymentId, window._calProjectedData);
  }
}

// ==================== RAPORLAR ====================
async function renderReports() {
  const now = new Date();

  // Premium kontrolü
  if (!isPremium) {
    const overlay = document.getElementById('reports-premium-overlay');
    if (overlay) overlay.style.display = 'flex';
    return;
  }

  const overlay = document.getElementById('reports-premium-overlay');
  if (overlay) overlay.style.display = 'none';

  await renderMonthlyPieChart(now.getFullYear(), now.getMonth() + 1);
  await renderTrendChart();
}

// ==================== HESAP MAKİNELERİ ====================
function handleCalcLoan() {
  const principal = parseFloat(document.getElementById('calc-loan-principal').value) || 0;
  const rate = parseFloat(document.getElementById('calc-loan-rate').value) || 0;
  const months = parseInt(document.getElementById('calc-loan-months').value) || 0;

  const result = calculateLoan(principal, rate, months);
  const el = document.getElementById('calc-loan-result');
  if (el) el.innerHTML = renderLoanResult(result);
}

function handleCalcLateFee() {
  const amount = parseFloat(document.getElementById('calc-late-amount').value) || 0;
  const days = parseInt(document.getElementById('calc-late-days').value) || 0;
  const rate = parseFloat(document.getElementById('calc-late-rate').value) || 0;

  const result = calculateLateFee(amount, days, rate);
  const el = document.getElementById('calc-late-result');
  if (el) el.innerHTML = renderLateFeeResult(result);
}

function handleCalcPayoff() {
  const debt = parseFloat(document.getElementById('calc-payoff-debt').value) || 0;
  const budget = parseFloat(document.getElementById('calc-payoff-budget').value) || 0;
  const rate = parseFloat(document.getElementById('calc-payoff-rate').value) || 0;

  const result = calculatePayoff(debt, budget, rate);
  const el = document.getElementById('calc-payoff-result');
  if (el) el.innerHTML = renderPayoffResult(result);
}

// ==================== AYARLAR ====================
async function renderSettings() {
  const langEl = document.getElementById('set-language');
  const themeEl = document.getElementById('set-theme');

  if (langEl) langEl.value = currentLang;
  if (themeEl) themeEl.value = currentTheme;

  // Premium durum
  const premiumStatusEl = document.getElementById('set-premium-status');
  if (premiumStatusEl) {
    premiumStatusEl.textContent = isPremium ? t('set_premium_active') : t('set_premium_inactive');
  }
}

async function handleLanguageChange(lang) {
  setLanguage(lang);
  await setSetting('language', lang);
  translateUI();
  refreshCurrentPage();
}

async function handleThemeChange(theme) {
  applyTheme(theme);
  await setSetting('theme', theme);
}

function applyTheme(theme) {
  currentTheme = theme;
  document.body.classList.remove('theme-light', 'theme-dark');
  document.body.classList.add('theme-' + theme);

  if (window.StatusBar) {
    StatusBar.backgroundColorByHexString(theme === 'dark' ? '#121212' : '#1976D2');
  }
}

function translateUI() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    const text = t(key);
    if (text) el.textContent = text;
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.dataset.i18nPlaceholder;
    const text = t(key);
    if (text) el.placeholder = text;
  });
}

// ==================== FİLTRELEME ====================
function setFilter(type, value) {
  if (type === 'category') filterCategory = value;
  if (type === 'status') filterStatus = value;
  renderPaymentList();
}

function handleSearch(query) {
  searchQuery = query;
  renderPaymentList();
}

// ==================== MODAL ====================
function closeModal(id) {
  const modal = document.getElementById(id);
  if (modal) modal.classList.remove('active');
}

function showConfirmDialog(message, onConfirm) {
  const modal = document.getElementById('modal-confirm');
  if (!modal) {
    if (confirm(message)) onConfirm();
    return;
  }

  // Callback'i global olarak sakla
  window._confirmCallback = onConfirm;

  modal.innerHTML = `
    <div class="modal-content modal-sm">
      <div class="modal-body"><p>${message}</p></div>
      <div class="modal-footer">
        <button class="btn btn-danger" onclick="closeModal('modal-confirm'); window._confirmCallback()">${t('yes')}</button>
        <button class="btn btn-secondary" onclick="closeModal('modal-confirm')">${t('cancel')}</button>
      </div>
    </div>
  `;
  modal.classList.add('active');
}

// ==================== PREMIUM PROMPT ====================
function showPremiumPrompt() {
  const modal = document.getElementById('modal-premium');
  if (!modal) return;

  modal.innerHTML = `
    <div class="modal-content">
      <div class="modal-header">
        <h2>⭐ Premium</h2>
        <button class="btn-close" onclick="closeModal('modal-premium')">&times;</button>
      </div>
      <div class="modal-body">
        <p>${t('set_premium_desc')}</p>
        <ul class="premium-features">
          <li>✅ ${t('premium_unlimited')}</li>
          <li>📊 ${t('nav_reports')}</li>
          <li>🧮 ${t('nav_calculators')}</li>
          <li>📤 CSV Export</li>
          <li>💾 ${t('set_backup')}</li>
        </ul>
        <div class="premium-prices">
          <button class="btn btn-premium" onclick="purchaseMonthly()">${getMonthlyPrice()}</button>
          <button class="btn btn-premium best" onclick="purchaseYearly()">${getYearlyPrice()} <small>(${t('premium_save')})</small></button>
        </div>
        <button class="btn btn-link" onclick="restorePurchases()">${t('set_restore')}</button>
      </div>
    </div>
  `;
  modal.classList.add('active');
}

// ==================== TOAST ====================
function showToast(message, duration) {
  duration = duration || 2500;
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, duration);
}

// ==================== YARDIMCI ====================
function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
}

async function getPaymentCount() {
  const payments = await getAllPayments();
  return payments.length;
}

async function getAllPayments() {
  return await dbGetAll('payments');
}

async function getPayment(id) {
  return await dbGet('payments', id);
}

async function getAllHistory() {
  return await dbGetAll('history');
}

// ==================== BACK BUTTON (Android) ====================
document.addEventListener('backbutton', function(e) {
  e.preventDefault();

  // Açık modal varsa kapat
  const modals = document.querySelectorAll('.modal.active');
  if (modals.length > 0) {
    modals[modals.length - 1].classList.remove('active');
    return;
  }

  // Dashboard'da değilsek dashboard'a git
  if (currentPage !== 'dashboard') {
    navigateTo('dashboard');
    return;
  }

  // Dashboard'daysa çıkış onayı
  showConfirmDialog(t('confirm_exit'), function() {
    navigator.app.exitApp();
  });
}, false);
