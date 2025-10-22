/**
 * TNEX Finance - Loan Calculator
 * Calculates monthly loan payments with interest
 */

const LoanCalculator = {
  init() {
    this.amountSlider = document.getElementById('amount');
    this.termSlider = document.getElementById('term');
    this.amountValue = document.getElementById('amountValue');
    this.termValue = document.getElementById('termValue');
    this.monthlyPayment = document.getElementById('monthlyPayment');
    this.formatter = new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    });

    // Initialize slider values
    if (this.amountSlider && this.termSlider) {
      this.amountSlider.style.setProperty('--value', this.amountSlider.value);
      this.amountSlider.style.setProperty('--min', this.amountSlider.min);
      this.amountSlider.style.setProperty('--max', this.amountSlider.max);
      
      this.termSlider.style.setProperty('--value', this.termSlider.value);
      this.termSlider.style.setProperty('--min', this.termSlider.min);
      this.termSlider.style.setProperty('--max', this.termSlider.max);

      this.bindEvents();
      this.calculatePayment();
    }
  },

  bindEvents() {
    this.amountSlider.addEventListener('input', () => {
      this.amountSlider.style.setProperty('--value', this.amountSlider.value);
      this.calculatePayment();
    });
    
    this.termSlider.addEventListener('input', () => {
      this.termSlider.style.setProperty('--value', this.termSlider.value);
      this.calculatePayment();
    });
  },

  formatCurrency(num) {
    return this.formatter.format(num).replace('₫', 'đ');
  },

  calculatePayment() {
    const principal = parseInt(this.amountSlider.value);
    const months = parseInt(this.termSlider.value);
    const interestRate = 0.0226; // 2.26%/month

    if (isNaN(principal) || isNaN(months) || months <= 0) {
      this.monthlyPayment.innerText = 'Lỗi tính toán';
      return;
    }

    // Calculate monthly payment with interest
    const monthly = (principal * (1 + interestRate * months)) / months;

    // Update display
    this.amountValue.innerText = this.formatCurrency(principal);
    this.termValue.innerText = months + ' tháng';
    this.monthlyPayment.innerText = this.formatCurrency(monthly.toFixed(0));
  },
};

// Initialize calculator when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', function() {
    LoanCalculator.init();
  });
} else {
  LoanCalculator.init();
}
