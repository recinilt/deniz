/**
 * reports.js - Raporlar, Grafikler ve CSV Export
 * Premium özellik (grafikler + CSV)
 * Ödeme Hatırlatıcı Uygulaması
 */

let monthlyChart = null;
let trendChart = null;

// ==================== AYLIK PASTA GRAFİĞİ ====================
async function renderMonthlyPieChart(year, month) {
  const stats = await getMonthlyStats(year, month);
  const canvas = document.getElementById('chartMonthly');
  if (!canvas) return;

  const labels = [];
  const data = [];
  const colors = [];

  for (const [catKey, amount] of Object.entries(stats.byCategory)) {
    const cat = CATEGORIES[catKey];
    labels.push(cat ? getCategoryLabel(catKey, currentLang) : catKey);
    data.push(amount);
    colors.push(cat ? cat.color : '#9E9E9E');
  }

  if (labels.length === 0) {
    labels.push(t('no_data'));
    data.push(1);
    colors.push('#E0E0E0');
  }

  if (monthlyChart) monthlyChart.destroy();

  monthlyChart = new Chart(canvas.getContext('2d'), {
    type: 'doughnut',
    data: {
      labels: labels,
      datasets: [{
        data: data,
        backgroundColor: colors,
        borderWidth: 2,
        borderColor: '#ffffff'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
          labels: { font: { size: 12 }, padding: 12, usePointStyle: true }
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              const total = context.dataset.data.reduce((a, b) => a + b, 0);
              const pct = total > 0 ? ((context.parsed / total) * 100).toFixed(1) : 0;
              return context.label + ': ' + formatMoney(context.parsed) + ' (' + pct + '%)';
            }
          }
        }
      }
    }
  });
}

// ==================== 6 AYLIK TREND GRAFİĞİ ====================
async function renderTrendChart() {
  const canvas = document.getElementById('chartTrend');
  if (!canvas) return;

  const now = new Date();
  const labels = [];
  const dueData = [];
  const paidData = [];

  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const year = d.getFullYear();
    const month = d.getMonth() + 1;
    const monthNames = t('cal_months');
    labels.push(monthNames[month - 1]);

    const stats = await getMonthlyStats(year, month);
    dueData.push(stats.totalDue);
    paidData.push(stats.totalPaid);
  }

  if (trendChart) trendChart.destroy();

  trendChart = new Chart(canvas.getContext('2d'), {
    type: 'line',
    data: {
      labels: labels,
      datasets: [
        {
          label: t('dash_this_month'),
          data: dueData,
          borderColor: '#F44336',
          backgroundColor: 'rgba(244,67,54,0.1)',
          fill: true,
          tension: 0.3,
          pointRadius: 4,
          pointBackgroundColor: '#F44336'
        },
        {
          label: t('dash_paid_count'),
          data: paidData,
          borderColor: '#4CAF50',
          backgroundColor: 'rgba(76,175,80,0.1)',
          fill: true,
          tension: 0.3,
          pointRadius: 4,
          pointBackgroundColor: '#4CAF50'
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: function(value) { return formatMoney(value); }
          }
        }
      },
      plugins: {
        legend: {
          position: 'bottom',
          labels: { font: { size: 12 }, padding: 12, usePointStyle: true }
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              return context.dataset.label + ': ' + formatMoney(context.parsed.y);
            }
          }
        }
      }
    }
  });
}

// ==================== YILLIK ÖZET ====================
async function getYearlySummary(year) {
  let totalDue = 0;
  let totalPaid = 0;
  const monthlyData = [];

  for (let m = 1; m <= 12; m++) {
    const stats = await getMonthlyStats(year, m);
    totalDue += stats.totalDue;
    totalPaid += stats.totalPaid;
    monthlyData.push({ month: m, due: stats.totalDue, paid: stats.totalPaid });
  }

  return { year, totalDue, totalPaid, monthlyData };
}

// ==================== CSV EXPORT ====================
async function exportPaymentsCSV() {
  const payments = await getAllPayments();
  const history = await getAllHistory();

  // BOM + header
  let csv = '\uFEFF';
  csv += 'ID,Ad,Kategori,Tutar,Para Birimi,Vade Tarihi,Tekrar,Durum,Ödenen Tutar,Ödeme Tarihi,Notlar\n';

  payments.forEach(p => {
    csv += [
      p.id,
      '"' + (p.name || '').replace(/"/g, '""') + '"',
      getCategoryLabel(p.category, currentLang),
      p.amount || 0,
      p.currency || 'TRY',
      p.dueDate || '',
      getRecurrenceLabel(p.recurrence, currentLang),
      p.status || '',
      p.paidAmount || 0,
      p.paidDate || '',
      '"' + (p.notes || '').replace(/"/g, '""') + '"'
    ].join(',') + '\n';
  });

  csv += '\n\nÖdeme Geçmişi\n';
  csv += 'ID,Ödeme ID,Tutar,Ödeme Tarihi,Not\n';

  history.forEach(h => {
    csv += [
      h.id,
      h.paymentId,
      h.amount || 0,
      h.paidDate || '',
      '"' + (h.note || '').replace(/"/g, '""') + '"'
    ].join(',') + '\n';
  });

  return csv;
}

async function shareCSV() {
  const csv = await exportPaymentsCSV();
  const fileName = 'odeme_rapor_' + new Date().toISOString().split('T')[0] + '.csv';

  if (window.cordova && window.plugins && window.plugins.socialsharing) {
    // Cordova social sharing ile paylaş
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
    const reader = new FileReader();
    reader.onloadend = function() {
      window.plugins.socialsharing.share(
        null,                    // message
        t('rep_export_csv'),     // subject
        reader.result,           // file (base64 data URI)
        null,                    // url
        function() { showToast(t('success')); },
        function(err) { showToast(t('error') + ': ' + err); }
      );
    };
    reader.readAsDataURL(blob);
  } else {
    // Tarayıcı fallback - dosya indirme
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
}

// ==================== YARDIMCI ====================
function formatMoney(amount) {
  if (amount === null || amount === undefined) return '0';
  return new Intl.NumberFormat('tr-TR', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  }).format(amount) + ' ₺';
}

function formatDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString(currentLang === 'tr' ? 'tr-TR' : 'en-US', {
    day: '2-digit', month: 'short', year: 'numeric'
  });
}

function formatDateShort(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString(currentLang === 'tr' ? 'tr-TR' : 'en-US', {
    day: '2-digit', month: 'short'
  });
}

function getDaysUntil(dateStr) {
  if (!dateStr) return 0;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const due = new Date(dateStr + 'T00:00:00');
  const diff = Math.ceil((due - today) / (1000 * 60 * 60 * 24));
  return diff;
}
