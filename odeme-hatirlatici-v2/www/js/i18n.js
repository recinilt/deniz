/**
 * i18n.js - Çoklu Dil Desteği (TR/EN)
 * Ödeme Hatırlatıcı Uygulaması
 */

let currentLang = 'tr';

const LANG = {
  // ===== GENEL =====
  app_name:           { tr: 'Ödeme Hatırlatıcı',       en: 'Payment Reminder' },
  save:               { tr: 'Kaydet',                   en: 'Save' },
  cancel:             { tr: 'İptal',                    en: 'Cancel' },
  delete_txt:         { tr: 'Sil',                      en: 'Delete' },
  edit:               { tr: 'Düzenle',                  en: 'Edit' },
  close:              { tr: 'Kapat',                    en: 'Close' },
  yes:                { tr: 'Evet',                     en: 'Yes' },
  no:                 { tr: 'Hayır',                    en: 'No' },
  ok:                 { tr: 'Tamam',                    en: 'OK' },
  confirm:            { tr: 'Onayla',                   en: 'Confirm' },
  search:             { tr: 'Ara...',                   en: 'Search...' },
  loading:            { tr: 'Yükleniyor...',            en: 'Loading...' },
  no_data:            { tr: 'Veri bulunamadı',          en: 'No data found' },
  success:            { tr: 'Başarılı',                 en: 'Success' },
  error:              { tr: 'Hata',                     en: 'Error' },

  // ===== NAVİGASYON =====
  nav_dashboard:      { tr: 'Ana Sayfa',                en: 'Dashboard' },
  nav_payments:       { tr: 'Ödemeler',                 en: 'Payments' },
  nav_calendar:       { tr: 'Takvim',                   en: 'Calendar' },
  nav_reports:        { tr: 'Raporlar',                 en: 'Reports' },
  nav_settings:       { tr: 'Ayarlar',                  en: 'Settings' },

  // ===== DASHBOARD =====
  dash_this_month:    { tr: 'Bu Ay Ödenecek',           en: 'Due This Month' },
  dash_overdue:       { tr: 'Gecikmiş',                 en: 'Overdue' },
  dash_upcoming:      { tr: 'Yaklaşan Ödemeler',        en: 'Upcoming Payments' },
  dash_today:         { tr: 'Bugün',                    en: 'Today' },
  dash_this_week:     { tr: 'Bu Hafta',                 en: 'This Week' },
  dash_no_upcoming:   { tr: 'Yaklaşan ödeme yok',       en: 'No upcoming payments' },
  dash_total_monthly: { tr: 'Aylık Toplam',             en: 'Monthly Total' },
  dash_paid_count:    { tr: 'Ödenen',                   en: 'Paid' },
  dash_pending_count: { tr: 'Bekleyen',                 en: 'Pending' },

  // ===== ÖDEMELER =====
  pay_add_new:        { tr: 'Yeni Ödeme Ekle',          en: 'Add New Payment' },
  pay_edit:           { tr: 'Ödemeyi Düzenle',           en: 'Edit Payment' },
  pay_name:           { tr: 'Ödeme Adı',                en: 'Payment Name' },
  pay_name_hint:      { tr: 'Örn: Elektrik Faturası',   en: 'E.g.: Electricity Bill' },
  pay_category:       { tr: 'Kategori',                 en: 'Category' },
  pay_amount:         { tr: 'Tutar',                    en: 'Amount' },
  pay_currency:       { tr: 'Para Birimi',              en: 'Currency' },
  pay_due_date:       { tr: 'Vade Tarihi',              en: 'Due Date' },
  pay_recurrence:     { tr: 'Tekrar Sıklığı',           en: 'Recurrence' },
  pay_custom_days:    { tr: 'Kaç günde bir?',           en: 'Every how many days?' },
  pay_reminder:       { tr: 'Hatırlatma',               en: 'Reminder' },
  pay_reminder_days:  { tr: 'Kaç gün önce hatırlat',   en: 'Remind days before' },
  pay_notes:          { tr: 'Notlar',                   en: 'Notes' },
  pay_color:          { tr: 'Renk',                     en: 'Color' },
  pay_installment:    { tr: 'Taksit Bilgisi',           en: 'Installment Info' },
  pay_inst_total:     { tr: 'Toplam Taksit',            en: 'Total Installments' },
  pay_inst_current:   { tr: 'Mevcut Taksit No',         en: 'Current Installment' },
  pay_mark_paid:      { tr: 'Ödendi İşaretle',          en: 'Mark as Paid' },
  pay_partial:        { tr: 'Kısmi Ödeme',              en: 'Partial Payment' },
  pay_partial_amount: { tr: 'Ödenen Tutar',             en: 'Amount Paid' },
  pay_from_template:  { tr: 'Şablondan Seç',            en: 'Choose Template' },
  pay_custom:         { tr: 'Boş Başla',                en: 'Start Blank' },
  pay_deleted:        { tr: 'Ödeme silindi',             en: 'Payment deleted' },
  pay_saved:          { tr: 'Ödeme kaydedildi',          en: 'Payment saved' },
  pay_marked_paid:    { tr: 'Ödendi olarak işaretlendi', en: 'Marked as paid' },
  pay_limit_reached:  { tr: 'Ücretsiz planda en fazla 15 ödeme ekleyebilirsiniz. Premium\'a geçin!',
                        en: 'Free plan allows up to 15 payments. Upgrade to Premium!' },

  // ===== FİLTRELER =====
  filter_all:         { tr: 'Tümü',                     en: 'All' },
  filter_pending:     { tr: 'Bekleyen',                 en: 'Pending' },
  filter_overdue:     { tr: 'Gecikmiş',                 en: 'Overdue' },
  filter_paid:        { tr: 'Ödendi',                   en: 'Paid' },
  filter_partial:     { tr: 'Kısmi',                    en: 'Partial' },
  sort_date:          { tr: 'Tarihe Göre',              en: 'By Date' },
  sort_amount:        { tr: 'Tutara Göre',              en: 'By Amount' },
  sort_name:          { tr: 'İsme Göre',                en: 'By Name' },

  // ===== TAKVİM =====
  cal_title:          { tr: 'Takvim',                   en: 'Calendar' },
  cal_today:          { tr: 'Bugün',                    en: 'Today' },
  cal_no_payments:    { tr: 'Bu gün ödeme yok',          en: 'No payments this day' },
  cal_months: {
    tr: ['Ocak','Şubat','Mart','Nisan','Mayıs','Haziran','Temmuz','Ağustos','Eylül','Ekim','Kasım','Aralık'],
    en: ['January','February','March','April','May','June','July','August','September','October','November','December']
  },
  cal_days_short: {
    tr: ['Pzt','Sal','Çar','Per','Cum','Cmt','Paz'],
    en: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun']
  },

  // ===== RAPORLAR =====
  rep_title:          { tr: 'Raporlar',                 en: 'Reports' },
  rep_monthly:        { tr: 'Aylık Özet',               en: 'Monthly Summary' },
  rep_category:       { tr: 'Kategoriye Göre',          en: 'By Category' },
  rep_trend:          { tr: '6 Aylık Trend',            en: '6 Month Trend' },
  rep_export_csv:     { tr: 'CSV Olarak İndir',         en: 'Export as CSV' },
  rep_premium_only:   { tr: 'Bu özellik Premium üyelere özeldir', en: 'This feature is for Premium members' },

  // ===== HESAPLAYICILAR =====
  calc_title:         { tr: 'Hesaplayıcılar',           en: 'Calculators' },
  calc_loan:          { tr: 'Kredi Taksit Hesaplama',    en: 'Loan Calculator' },
  calc_late_fee:      { tr: 'Gecikme Cezası Hesaplama', en: 'Late Fee Calculator' },
  calc_payoff:        { tr: 'Borç Ödeme Planı',         en: 'Debt Payoff Plan' },
  calc_principal:     { tr: 'Anapara',                  en: 'Principal' },
  calc_interest:      { tr: 'Faiz Oranı (%)',           en: 'Interest Rate (%)' },
  calc_months:        { tr: 'Vade (Ay)',                en: 'Term (Months)' },
  calc_monthly_pay:   { tr: 'Aylık Taksit',             en: 'Monthly Payment' },
  calc_total_pay:     { tr: 'Toplam Ödeme',             en: 'Total Payment' },
  calc_total_interest:{ tr: 'Toplam Faiz',              en: 'Total Interest' },
  calc_amount:        { tr: 'Tutar',                    en: 'Amount' },
  calc_days_late:     { tr: 'Geciken Gün',              en: 'Days Late' },
  calc_rate:          { tr: 'Günlük Gecikme Oranı (%)', en: 'Daily Late Rate (%)' },
  calc_penalty:       { tr: 'Gecikme Cezası',           en: 'Late Fee' },
  calc_calculate:     { tr: 'Hesapla',                  en: 'Calculate' },
  calc_debt_amount:   { tr: 'Toplam Borç',              en: 'Total Debt' },
  calc_monthly_budget:{ tr: 'Aylık Ödeme Bütçesi',     en: 'Monthly Budget' },
  calc_finish_date:   { tr: 'Tahmini Bitiş',            en: 'Estimated Finish' },
  calc_premium_only:  { tr: 'Premium özellik',          en: 'Premium feature' },

  // ===== AYARLAR =====
  set_title:          { tr: 'Ayarlar',                  en: 'Settings' },
  set_language:       { tr: 'Dil',                      en: 'Language' },
  set_theme:          { tr: 'Tema',                     en: 'Theme' },
  set_theme_light:    { tr: 'Açık',                     en: 'Light' },
  set_theme_dark:     { tr: 'Koyu',                     en: 'Dark' },
  set_currency:       { tr: 'Varsayılan Para Birimi',   en: 'Default Currency' },
  set_reminder:       { tr: 'Varsayılan Hatırlatma',    en: 'Default Reminder' },
  set_reminder_desc:  { tr: 'Yeni ödemelerde kaç gün önce hatırlatılsın', en: 'Default reminder days for new payments' },
  set_backup:         { tr: 'Yedekleme',                en: 'Backup' },
  set_backup_export:  { tr: 'Yedeği Dışa Aktar',       en: 'Export Backup' },
  set_backup_import:  { tr: 'Yedeği İçe Aktar',        en: 'Import Backup' },
  set_backup_warn:    { tr: 'İçe aktarma mevcut verilerin üzerine yazacak!', en: 'Import will overwrite existing data!' },
  set_premium:        { tr: 'Premium',                  en: 'Premium' },
  set_premium_desc:   { tr: 'Sınırsız ödeme, raporlar, hesaplayıcılar ve daha fazlası', en: 'Unlimited payments, reports, calculators and more' },
  set_premium_buy:    { tr: 'Premium\'a Geç',           en: 'Upgrade to Premium' },
  set_premium_active: { tr: 'Premium Aktif',            en: 'Premium Active' },
  set_about:          { tr: 'Hakkında',                 en: 'About' },
  set_version:        { tr: 'Sürüm',                   en: 'Version' },
  set_rate:           { tr: 'Uygulamayı Puanla',        en: 'Rate the App' },
  set_contact:        { tr: 'İletişim',                 en: 'Contact' },

  // ===== BİLDİRİMLER =====
  notif_permission:   { tr: 'Bildirim izni gerekli',    en: 'Notification permission required' },
  notif_granted:      { tr: 'Bildirim izni verildi',    en: 'Notification permission granted' },
  notif_denied:       { tr: 'Bildirim izni reddedildi', en: 'Notification permission denied' },
  notif_alarm_perm:   { tr: 'Tam zamanında bildirim için "Alarmlar ve Hatırlatıcılar" iznini açın',
                        en: 'Enable "Alarms & Reminders" for exact notifications' },
  notif_paid_action:  { tr: 'Ödendi',                   en: 'Paid' },
  notif_snooze_action:{ tr: 'Ertele',                   en: 'Snooze' },
  notif_today:        { tr: 'BUGÜN SON GÜN',            en: 'DUE TODAY' },
  notif_days_left:    { tr: 'gün kaldı',                en: 'days left' },
  notif_overdue:      { tr: 'GECİKMİŞ',                en: 'OVERDUE' },

  // ===== ONAY DİALOGLARI =====
  confirm_delete:     { tr: 'Bu ödemeyi silmek istediğinize emin misiniz?', en: 'Are you sure you want to delete this payment?' },
  confirm_paid:       { tr: 'Bu ödemeyi "ödendi" olarak işaretlemek istiyor musunuz?', en: 'Mark this payment as paid?' },
  confirm_import:     { tr: 'Mevcut veriler silinecek. Devam etmek istiyor musunuz?', en: 'Existing data will be deleted. Continue?' },
  confirm_exit:       { tr: 'Uygulamadan çıkmak istiyor musunuz?', en: 'Do you want to exit the app?' },

  // ===== EKSİK ANAHTARLAR =====
  nav_home:           { tr: 'Ana Sayfa',                en: 'Home' },
  nav_calculators:    { tr: 'Hesaplayıcılar',           en: 'Calculators' },
  pay_add:            { tr: 'Yeni Ödeme Ekle',          en: 'Add New Payment' },
  pay_delete:         { tr: 'Sil',                      en: 'Delete' },
  pay_status:         { tr: 'Durum',                    en: 'Status' },
  pay_paid_amount:    { tr: 'Ödenen Tutar',             en: 'Paid Amount' },
  pay_history:        { tr: 'Ödeme Geçmişi',            en: 'Payment History' },
  pay_total:          { tr: 'Toplam',                   en: 'Total' },
  pay_current:        { tr: 'Mevcut',                   en: 'Current' },
  pay_remaining:      { tr: 'Kalan Hak',                en: 'Remaining' },
  dash_days_left:     { tr: 'gün kaldı',                en: 'days left' },
  dash_days_late:     { tr: 'gün gecikmiş',             en: 'days late' },
  filter_search:      { tr: 'Ara...',                   en: 'Search...' },
  set_reminders:      { tr: 'Hatırlatmalar',            en: 'Reminders' },
  set_premium_inactive: { tr: 'Aktif değil',            en: 'Not active' },
  set_restore:        { tr: 'Satın Almaları Geri Yükle', en: 'Restore Purchases' },
  premium_unlimited:  { tr: 'Sınırsız ödeme ekleme',    en: 'Unlimited payments' },
  premium_save:       { tr: '%33 tasarruf',              en: '33% savings' },
  calc_daily_rate:    { tr: 'Günlük Oran (%)',           en: 'Daily Rate (%)' },
  calc_total_debt:    { tr: 'Toplam Borç',               en: 'Total Debt' },
};

function t(key) {
  const entry = LANG[key];
  if (!entry) return key;
  if (typeof entry[currentLang] === 'object') return entry[currentLang];
  return entry[currentLang] || entry['tr'] || key;
}

function setLanguage(lang) {
  currentLang = lang;
  document.documentElement.lang = lang;
}
