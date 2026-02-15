/**
 * purchase.js - Premium Abonelik Yönetimi
 * cordova-plugin-purchase ile Google Play / App Store
 * Ödeme Hatırlatıcı Uygulaması
 */

const PRODUCT_ID_MONTHLY = 'premium_monthly';
const PRODUCT_ID_YEARLY = 'premium_yearly';
const FREE_PAYMENT_LIMIT = 15;

let storeReady = false;
let isPremium = false;

// ==================== BAŞLATMA ====================
function initStore() {
  if (!window.CdvPurchase) {
    console.warn('IAP plugin bulunamadı (tarayıcı modunda olabilir)');
    storeReady = false;
    return;
  }

  const { store, ProductType, Platform } = CdvPurchase;

  // Ürünleri kaydet
  store.register([
    {
      id: PRODUCT_ID_MONTHLY,
      type: ProductType.PAID_SUBSCRIPTION,
      platform: Platform.GOOGLE_PLAY
    },
    {
      id: PRODUCT_ID_YEARLY,
      type: ProductType.PAID_SUBSCRIPTION,
      platform: Platform.GOOGLE_PLAY
    },
    {
      id: PRODUCT_ID_MONTHLY,
      type: ProductType.PAID_SUBSCRIPTION,
      platform: Platform.APPLE_APPSTORE
    },
    {
      id: PRODUCT_ID_YEARLY,
      type: ProductType.PAID_SUBSCRIPTION,
      platform: Platform.APPLE_APPSTORE
    }
  ]);

  // Olay dinleyicileri
  store.when()
    .productUpdated(() => {
      updatePremiumUI();
    })
    .approved(transaction => {
      transaction.verify();
    })
    .verified(receipt => {
      receipt.finish();
      onPurchaseSuccess();
    })
    .unverified(receipt => {
      console.warn('Satın alma doğrulanamadı:', receipt);
      showToast(t('error'));
    });

  // Store'u başlat
  const platforms = [];
  if (window.device && device.platform === 'iOS') {
    platforms.push({ platform: Platform.APPLE_APPSTORE });
  } else {
    platforms.push({ platform: Platform.GOOGLE_PLAY });
  }

  store.initialize(platforms)
    .then(() => {
      storeReady = true;
      checkPremiumStatus();
    })
    .catch(err => {
      console.error('Store başlatılamadı:', err);
      storeReady = false;
    });
}

// ==================== SATIN ALMA ====================
function purchaseMonthly() {
  if (!storeReady) {
    showToast(t('error'));
    return;
  }
  const product = CdvPurchase.store.get(PRODUCT_ID_MONTHLY);
  if (product) {
    const offer = product.getOffer();
    if (offer) offer.order();
  }
}

function purchaseYearly() {
  if (!storeReady) {
    showToast(t('error'));
    return;
  }
  const product = CdvPurchase.store.get(PRODUCT_ID_YEARLY);
  if (product) {
    const offer = product.getOffer();
    if (offer) offer.order();
  }
}

function restorePurchases() {
  if (!storeReady) return;
  CdvPurchase.store.restorePurchases();
}

// ==================== DURUM KONTROL ====================
function checkPremiumStatus() {
  if (!storeReady || !window.CdvPurchase) {
    loadPremiumFromSettings();
    return;
  }

  const monthly = CdvPurchase.store.get(PRODUCT_ID_MONTHLY);
  const yearly = CdvPurchase.store.get(PRODUCT_ID_YEARLY);

  const monthlyOwned = monthly && monthly.owned;
  const yearlyOwned = yearly && yearly.owned;

  isPremium = monthlyOwned || yearlyOwned;
  savePremiumStatus(isPremium);
  updatePremiumUI();
}

async function loadPremiumFromSettings() {
  const saved = await getSetting('isPremium');
  isPremium = saved === true;
  updatePremiumUI();
}

async function savePremiumStatus(status) {
  await setSetting('isPremium', status);
}

async function onPurchaseSuccess() {
  isPremium = true;
  await savePremiumStatus(true);
  updatePremiumUI();
  showToast(t('set_premium_active'));

  // Bildirimleri yeniden zamanla (premium özellikleri aktif)
  if (typeof rescheduleAllNotifications === 'function') {
    await rescheduleAllNotifications();
  }
}

// ==================== LİMİT KONTROL ====================
async function canAddPayment() {
  if (isPremium) return true;
  const count = await getPaymentCount();
  return count < FREE_PAYMENT_LIMIT;
}

function getRemainingPayments() {
  return new Promise(async (resolve) => {
    if (isPremium) {
      resolve(-1); // Sınırsız
    } else {
      const count = await getPaymentCount();
      resolve(Math.max(0, FREE_PAYMENT_LIMIT - count));
    }
  });
}

// ==================== ÜRÜN BİLGİSİ ====================
function getProductPrice(productId) {
  if (!storeReady || !window.CdvPurchase) return null;
  const product = CdvPurchase.store.get(productId);
  if (product) {
    const offer = product.getOffer();
    if (offer && offer.pricingPhases && offer.pricingPhases.length > 0) {
      return offer.pricingPhases[0].price;
    }
  }
  return null;
}

function getMonthlyPrice() {
  return getProductPrice(PRODUCT_ID_MONTHLY) || '₺49,99/ay';
}

function getYearlyPrice() {
  return getProductPrice(PRODUCT_ID_YEARLY) || '₺399,99/yıl';
}

// ==================== UI GÜNCELLEME ====================
function updatePremiumUI() {
  // Premium badge
  const badges = document.querySelectorAll('.premium-badge');
  badges.forEach(b => {
    b.style.display = isPremium ? 'inline-block' : 'none';
  });

  // Premium kilitli alanlar
  const locked = document.querySelectorAll('.premium-locked');
  locked.forEach(el => {
    if (isPremium) {
      el.classList.remove('locked');
      el.style.pointerEvents = 'auto';
      el.style.opacity = '1';
    } else {
      el.classList.add('locked');
    }
  });

  // Premium overlay
  const overlays = document.querySelectorAll('.premium-overlay');
  overlays.forEach(el => {
    el.style.display = isPremium ? 'none' : 'flex';
  });

  // Satın alma butonları
  const buyBtns = document.querySelectorAll('.btn-buy-premium');
  buyBtns.forEach(b => {
    b.style.display = isPremium ? 'none' : 'block';
  });

  // Premium aktif etiketi
  const activeLabels = document.querySelectorAll('.premium-active-label');
  activeLabels.forEach(l => {
    l.style.display = isPremium ? 'block' : 'none';
  });
}
