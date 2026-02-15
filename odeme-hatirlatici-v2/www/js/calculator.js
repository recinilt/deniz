/**
 * calculator.js - Borç Hesaplayıcıları
 * Premium özellik
 * Ödeme Hatırlatıcı Uygulaması
 */

// ==================== KREDİ TAKSİT HESAPLAMA ====================
function calculateLoan(principal, annualRate, months) {
  if (!principal || !annualRate || !months) return null;
  if (principal <= 0 || annualRate <= 0 || months <= 0) return null;

  const monthlyRate = annualRate / 100 / 12;
  const monthlyPayment = principal * (monthlyRate * Math.pow(1 + monthlyRate, months))
                        / (Math.pow(1 + monthlyRate, months) - 1);
  const totalPayment = monthlyPayment * months;
  const totalInterest = totalPayment - principal;

  return {
    monthlyPayment: Math.round(monthlyPayment * 100) / 100,
    totalPayment: Math.round(totalPayment * 100) / 100,
    totalInterest: Math.round(totalInterest * 100) / 100
  };
}

// ==================== GECİKME CEZASI HESAPLAMA ====================
function calculateLateFee(amount, daysLate, dailyRate) {
  if (!amount || !daysLate || !dailyRate) return null;
  if (amount <= 0 || daysLate <= 0 || dailyRate <= 0) return null;

  const penalty = amount * (dailyRate / 100) * daysLate;
  const totalWithPenalty = amount + penalty;

  return {
    penalty: Math.round(penalty * 100) / 100,
    totalWithPenalty: Math.round(totalWithPenalty * 100) / 100
  };
}

// ==================== BORÇ ÖDEME PLANI ====================
function calculatePayoff(totalDebt, monthlyBudget, annualRate) {
  if (!totalDebt || !monthlyBudget) return null;
  if (totalDebt <= 0 || monthlyBudget <= 0) return null;

  const monthlyRate = (annualRate || 0) / 100 / 12;
  let remaining = totalDebt;
  let months = 0;
  let totalPaid = 0;
  const maxMonths = 600; // 50 yıl sınır

  while (remaining > 0 && months < maxMonths) {
    const interest = remaining * monthlyRate;
    const payment = Math.min(monthlyBudget, remaining + interest);

    if (payment <= interest) {
      return { months: -1, totalPaid: -1, finishDate: null, message: 'Aylık bütçe faizi karşılamıyor' };
    }

    remaining = remaining + interest - payment;
    totalPaid += payment;
    months++;

    if (remaining < 0.01) remaining = 0;
  }

  const finishDate = new Date();
  finishDate.setMonth(finishDate.getMonth() + months);

  return {
    months: months,
    totalPaid: Math.round(totalPaid * 100) / 100,
    totalInterest: Math.round((totalPaid - totalDebt) * 100) / 100,
    finishDate: finishDate.toISOString().split('T')[0],
    message: null
  };
}

// ==================== UI RENDER ====================
function renderLoanResult(result) {
  if (!result) return '';
  return `
    <div class="calc-result">
      <div class="calc-result-row">
        <span>${t('calc_monthly_pay')}</span>
        <strong>${formatMoney(result.monthlyPayment)}</strong>
      </div>
      <div class="calc-result-row">
        <span>${t('calc_total_pay')}</span>
        <strong>${formatMoney(result.totalPayment)}</strong>
      </div>
      <div class="calc-result-row">
        <span>${t('calc_total_interest')}</span>
        <strong class="text-red">${formatMoney(result.totalInterest)}</strong>
      </div>
    </div>
  `;
}

function renderLateFeeResult(result) {
  if (!result) return '';
  return `
    <div class="calc-result">
      <div class="calc-result-row">
        <span>${t('calc_penalty')}</span>
        <strong class="text-red">${formatMoney(result.penalty)}</strong>
      </div>
      <div class="calc-result-row">
        <span>${t('calc_total_pay')}</span>
        <strong>${formatMoney(result.totalWithPenalty)}</strong>
      </div>
    </div>
  `;
}

function renderPayoffResult(result) {
  if (!result) return '';
  if (result.months === -1) {
    return `<div class="calc-result"><p class="text-red">${result.message}</p></div>`;
  }
  return `
    <div class="calc-result">
      <div class="calc-result-row">
        <span>${t('calc_months')}</span>
        <strong>${result.months} ay</strong>
      </div>
      <div class="calc-result-row">
        <span>${t('calc_finish_date')}</span>
        <strong>${formatDate(result.finishDate)}</strong>
      </div>
      <div class="calc-result-row">
        <span>${t('calc_total_pay')}</span>
        <strong>${formatMoney(result.totalPaid)}</strong>
      </div>
      <div class="calc-result-row">
        <span>${t('calc_total_interest')}</span>
        <strong class="text-red">${formatMoney(result.totalInterest)}</strong>
      </div>
    </div>
  `;
}
