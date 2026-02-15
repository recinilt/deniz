/**
 * backup.js - JSON Yedekleme ve Geri Yükleme
 * Premium özellik
 * Ödeme Hatırlatıcı Uygulaması
 */

// ==================== DIŞA AKTARMA ====================
async function backupExport() {
  try {
    const data = await exportAllData();
    const json = JSON.stringify(data, null, 2);
    const fileName = 'odeme_yedek_' + new Date().toISOString().split('T')[0] + '.json';

    if (window.cordova && window.plugins && window.plugins.socialsharing) {
      const blob = new Blob([json], { type: 'application/json;charset=utf-8' });
      const reader = new FileReader();
      reader.onloadend = function() {
        window.plugins.socialsharing.share(
          null,
          t('set_backup_export'),
          reader.result,
          null,
          function() { showToast(t('success')); },
          function(err) { showToast(t('error') + ': ' + err); }
        );
      };
      reader.readAsDataURL(blob);
    } else {
      // Tarayıcı fallback
      const blob = new Blob([json], { type: 'application/json;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      showToast(t('success'));
    }
  } catch (err) {
    console.error('Yedekleme hatası:', err);
    showToast(t('error'));
  }
}

// ==================== İÇE AKTARMA ====================
function backupImport() {
  // Onay iste
  showConfirmDialog(t('confirm_import'), async function() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = async function(e) {
      const file = e.target.files[0];
      if (!file) return;

      try {
        const text = await readFileAsText(file);
        const data = JSON.parse(text);

        if (!data.payments || !Array.isArray(data.payments)) {
          showToast(t('error') + ': Geçersiz dosya formatı');
          return;
        }

        await importAllData(data);

        // Bildirimleri yeniden zamanla
        if (typeof rescheduleAllNotifications === 'function') {
          await rescheduleAllNotifications();
        }

        showToast(t('success'));

        // Sayfayı yenile
        if (typeof refreshCurrentPage === 'function') {
          refreshCurrentPage();
        }
      } catch (err) {
        console.error('İçe aktarma hatası:', err);
        showToast(t('error') + ': ' + err.message);
      }
    };
    input.click();
  });
}

function readFileAsText(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(reader.error);
    reader.readAsText(file, 'UTF-8');
  });
}
