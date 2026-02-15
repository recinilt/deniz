/**
 * notifications.js - Bildirim Zamanlama Sistemi
 * Varsayılan: 3 gün önce, 1 gün önce, 0 (son gün)
 * Ayarlardan değiştirilebilir
 * Ödeme Hatırlatıcı Uygulaması
 */

let notificationsReady = false;

// ==================== İZİN YÖNETİMİ ====================
function checkNotificationPermission() {
  return new Promise((resolve) => {
    if (!window.cordova || !cordova.plugins || !cordova.plugins.notification) {
      console.warn('Bildirim plugini bulunamadı (tarayıcı modunda olabilir)');
      resolve(false);
      return;
    }
    cordova.plugins.notification.local.hasPermission(function(granted) {
      resolve(granted);
    });
  });
}

function requestNotificationPermission() {
  return new Promise((resolve) => {
    if (!window.cordova || !cordova.plugins || !cordova.plugins.notification) {
      resolve(false);
      return;
    }
    cordova.plugins.notification.local.requestPermission(function(granted) {
      resolve(granted);
    });
  });
}

function checkExactAlarmPermission() {
  return new Promise((resolve) => {
    if (!window.cordova || !cordova.plugins || !cordova.plugins.notification) {
      resolve(true);
      return;
    }
    if (typeof cordova.plugins.notification.local.canScheduleExactAlarms === 'function') {
      cordova.plugins.notification.local.canScheduleExactAlarms(function(granted) {
        resolve(granted);
      });
    } else {
      resolve(true);
    }
  });
}

function openAlarmSettings() {
  if (window.cordova && cordova.plugins && cordova.plugins.notification) {
    if (typeof cordova.plugins.notification.local.openAlarmSettings === 'function') {
      cordova.plugins.notification.local.openAlarmSettings();
    }
  }
}

async function initNotifications() {
  if (!window.cordova || !cordova.plugins || !cordova.plugins.notification) {
    console.warn('Bildirim plugini yok, tarayıcı modunda çalışıyor');
    notificationsReady = false;
    return false;
  }

  // Bildirim izni kontrol/iste
  let hasPermission = await checkNotificationPermission();
  if (!hasPermission) {
    hasPermission = await requestNotificationPermission();
  }

  if (!hasPermission) {
    console.warn('Bildirim izni verilmedi');
    notificationsReady = false;
    return false;
  }

  // Exact alarm izni kontrol (Android 13+)
  const exactAlarm = await checkExactAlarmPermission();
  if (!exactAlarm) {
    // Kullanıcıyı ayarlara yönlendir (UI'dan yapılacak)
    console.warn('Exact alarm izni yok');
  }

  // Aksiyon gruplarını tanımla
  cordova.plugins.notification.local.addActions('payment-actions', [
    { id: 'paid', title: t('notif_paid_action') },
    { id: 'snooze', title: t('notif_snooze_action') }
  ]);

  // Bildirim tıklama olayı
  cordova.plugins.notification.local.on('click', function(notification) {
    if (notification.data && notification.data.paymentId) {
      // Ödeme detayına git
      if (typeof showPaymentDetail === 'function') {
        showPaymentDetail(notification.data.paymentId);
      }
    }
  });

  // "Ödendi" aksiyonu
  cordova.plugins.notification.local.on('paid', async function(notification) {
    if (notification.data && notification.data.paymentId) {
      await markPaymentPaid(notification.data.paymentId);
      cancelPaymentNotifications(notification.data.paymentId);
      if (typeof refreshCurrentPage === 'function') {
        refreshCurrentPage();
      }
    }
  });

  // "Ertele" aksiyonu - 1 saat sonra tekrar hatırlat
  cordova.plugins.notification.local.on('snooze', function(notification) {
    const snoozeTime = new Date(Date.now() + 60 * 60 * 1000); // 1 saat sonra
    cordova.plugins.notification.local.schedule({
      id: notification.id + 50000, // Farklı ID ile
      title: notification.title,
      text: notification.text,
      trigger: { at: snoozeTime },
      actions: 'payment-actions',
      data: notification.data,
      foreground: true,
      vibrate: true,
      smallIcon: 'res://ic_notification',
      icon: 'res://ic_notification'
    });
  });

  notificationsReady = true;
  return true;
}

// ==================== BİLDİRİM ZAMANLAMA ====================
async function schedulePaymentNotifications(payment) {
  if (!notificationsReady) return [];

  // Önce mevcut bildirimleri iptal et
  cancelPaymentNotifications(payment.id);

  const reminderDays = payment.reminderDays || [3, 1, 0];
  const scheduledIds = [];
  const now = new Date();
  const currency = getCurrencySymbol(payment.currency || 'TRY');

  for (let i = 0; i < reminderDays.length; i++) {
    const daysBefore = reminderDays[i];
    const dueDate = new Date(payment.dueDate + 'T09:00:00'); // Sabah 9'da bildir
    const triggerDate = new Date(dueDate);
    triggerDate.setDate(triggerDate.getDate() - daysBefore);

    // Geçmiş tarihli bildirimleri zamanlama
    if (triggerDate <= now) continue;

    const notifId = payment.id * 100 + i;

    let title, text;
    if (daysBefore === 0) {
      title = '⚠️ ' + t('notif_today') + ': ' + payment.name;
      text = payment.amount + ' ' + currency + ' - ' + t('notif_today');
    } else {
      title = '📋 ' + payment.name;
      text = payment.amount + ' ' + currency + ' - ' + daysBefore + ' ' + t('notif_days_left');
    }

    cordova.plugins.notification.local.schedule({
      id: notifId,
      title: title,
      text: text,
      trigger: { at: triggerDate },
      actions: 'payment-actions',
      data: { paymentId: payment.id, daysBefore: daysBefore },
      foreground: true,
      vibrate: true,
      smallIcon: 'res://ic_notification',
      icon: 'res://ic_notification',
      priority: daysBefore === 0 ? 2 : 1, // Son gün yüksek öncelik
      led: payment.color || '#2196F3'
    });

    scheduledIds.push(notifId);
  }

  return scheduledIds;
}

function cancelPaymentNotifications(paymentId) {
  if (!notificationsReady) return;

  // Her ödeme için max 10 bildirim ID'si (paymentId * 100 + 0..9)
  const ids = [];
  for (let i = 0; i < 10; i++) {
    ids.push(paymentId * 100 + i);
  }
  // Snooze ID'leri de iptal et
  for (let i = 0; i < 10; i++) {
    ids.push(paymentId * 100 + i + 50000);
  }

  cordova.plugins.notification.local.cancel(ids);
}

function cancelAllNotifications() {
  if (!notificationsReady) return;
  cordova.plugins.notification.local.cancelAll();
}

// ==================== TOPLU İŞLEMLER ====================
async function rescheduleAllNotifications() {
  if (!notificationsReady) return;

  cancelAllNotifications();

  const payments = await getAllPayments();
  const pendingPayments = payments.filter(p => p.status === 'pending' || p.status === 'partial');

  for (const payment of pendingPayments) {
    const ids = await schedulePaymentNotifications(payment);
    payment.notificationIds = ids;
    await updatePayment(payment);
  }
}

// Gecikmiş ödemeler için günlük hatırlatma
async function scheduleOverdueReminders() {
  if (!notificationsReady) return;

  const overduePayments = await getOverduePayments();
  const now = new Date();

  for (const payment of overduePayments) {
    const notifId = payment.id * 100 + 9; // 9 = overdue slot
    const triggerDate = new Date(now);
    triggerDate.setHours(10, 0, 0, 0); // Sabah 10'da

    // Bugün zaten geçtiyse yarın hatırlat
    if (triggerDate <= now) {
      triggerDate.setDate(triggerDate.getDate() + 1);
    }

    const sym = getCurrencySymbol(payment.currency || 'TRY');

    cordova.plugins.notification.local.schedule({
      id: notifId,
      title: '🔴 ' + t('notif_overdue') + ': ' + payment.name,
      text: payment.amount + ' ' + sym + ' - ' + t('notif_overdue'),
      trigger: { at: triggerDate },
      actions: 'payment-actions',
      data: { paymentId: payment.id, isOverdue: true },
      foreground: true,
      vibrate: true,
      priority: 2,
      smallIcon: 'res://ic_notification',
      icon: 'res://ic_notification',
      led: '#F44336'
    });
  }
}

// ==================== YARDIMCI ====================
function getScheduledNotifications() {
  return new Promise((resolve) => {
    if (!notificationsReady) {
      resolve([]);
      return;
    }
    cordova.plugins.notification.local.getScheduled(function(notifications) {
      resolve(notifications);
    });
  });
}

function getScheduledCount() {
  return new Promise((resolve) => {
    if (!notificationsReady) {
      resolve(0);
      return;
    }
    cordova.plugins.notification.local.getScheduled(function(notifications) {
      resolve(notifications.length);
    });
  });
}
