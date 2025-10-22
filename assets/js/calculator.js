/**
 * Loan Calculator Module
 * Calculate monthly payments with animations
 */

(function() {
    'use strict';
    
    // Interest rate: 2.26% per month (27.1% per year)
    const MONTHLY_INTEREST_RATE = 0.0226;
    
    // DOM Elements
    const amountSlider = document.getElementById('amount');
    const termSlider = document.getElementById('term');
    const amountValue = document.getElementById('amountValue');
    const termValue = document.getElementById('termValue');
    const monthlyPayment = document.getElementById('monthlyPayment');
    const totalLoan = document.getElementById('totalLoan');
    const totalInterest = document.getElementById('totalInterest');
    const totalPayment = document.getElementById('totalPayment');
    
    // Format currency
    function formatCurrency(amount) {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    }
    
    // Animate number counting
    function animateValue(element, start, end, duration = 800) {
        const range = end - start;
        const startTime = performance.now();
        
        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function (ease-out cubic)
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = start + (range * eased);
            
            element.textContent = formatCurrency(Math.round(current));
            
            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }
        
        requestAnimationFrame(update);
    }
    
    // Calculate monthly payment using formula for equal monthly payments
    function calculateMonthlyPayment(principal, monthlyRate, months) {
        // Formula: P * [r(1+r)^n] / [(1+r)^n - 1]
        const x = Math.pow(1 + monthlyRate, months);
        const monthly = principal * (monthlyRate * x) / (x - 1);
        return Math.round(monthly);
    }
    
    // Calculate loan details
    function calculate() {
        const principal = parseInt(amountSlider.value);
        const months = parseInt(termSlider.value);
        
        // Calculate monthly payment
        const monthly = calculateMonthlyPayment(principal, MONTHLY_INTEREST_RATE, months);
        const total = monthly * months;
        const interest = total - principal;
        
        // Get previous values for animation
        const prevMonthly = parseInt(monthlyPayment.textContent.replace(/[^\d]/g, '')) || 0;
        const prevTotal = parseInt(totalPayment.textContent.replace(/[^\d]/g, '')) || 0;
        const prevInterest = parseInt(totalInterest.textContent.replace(/[^\d]/g, '')) || 0;
        
        // Animate the results
        animateValue(monthlyPayment, prevMonthly, monthly);
        animateValue(totalLoan, 0, principal, 600);
        animateValue(totalInterest, prevInterest, interest);
        animateValue(totalPayment, prevTotal, total);
    }
    
    // Update slider display value
    function updateAmountDisplay() {
        const value = parseInt(amountSlider.value);
        amountValue.textContent = formatCurrency(value);
        
        // Update slider track gradient
        const percentage = ((value - amountSlider.min) / (amountSlider.max - amountSlider.min)) * 100;
        amountSlider.style.setProperty('--range-value', percentage + '%');
        
        calculate();
    }
    
    function updateTermDisplay() {
        const value = parseInt(termSlider.value);
        termValue.textContent = `${value} tháng`;
        
        // Update slider track gradient
        const percentage = ((value - termSlider.min) / (termSlider.max - termSlider.min)) * 100;
        termSlider.style.setProperty('--range-value', percentage + '%');
        
        calculate();
    }
    
    // Event listeners
    if (amountSlider && termSlider) {
        amountSlider.addEventListener('input', updateAmountDisplay);
        termSlider.addEventListener('input', updateTermDisplay);
        
        // Initialize on page load
        updateAmountDisplay();
        updateTermDisplay();
    }
    
})();