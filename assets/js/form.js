/**
 * Form Handler Module
 * Handle form validation and submission
 */

(function() {
    'use strict';
    
    const form = document.getElementById('loanForm');
    
    if (!form) return;
    
    // Validation rules
    const validators = {
        name: (value) => {
            if (!value || value.trim().length < 2) {
                return 'Vui lòng nhập họ tên (tối thiểu 2 ký tự)';
            }
            return null;
        },
        phone: (value) => {
            const phoneRegex = /^(0|\+84)[3|5|7|8|9][0-9]{8}$/;
            if (!phoneRegex.test(value)) {
                return 'Số điện thoại không hợp lệ (10 số, bắt đầu bằng 0)';
            }
            return null;
        },
        amount: (value) => {
            if (!value) {
                return 'Vui lòng chọn số tiền vay';
            }
            return null;
        },
        address: (value) => {
            if (!value || value.trim().length < 5) {
                return 'Vui lòng nhập địa chỉ (tối thiểu 5 ký tự)';
            }
            return null;
        }
    };
    
    // Validate single field
    function validateField(field) {
        const name = field.getAttribute('name');
        const value = field.value.trim();
        const validator = validators[name];
        
        if (!validator) return true;
        
        const error = validator(value);
        
        if (error) {
            field.classList.add('error');
            const errorMsg = field.parentElement.querySelector('.error-message');
            if (errorMsg) {
                errorMsg.textContent = error;
            }
            return false;
        } else {
            field.classList.remove('error');
            return true;
        }
    }
    
    // Validate all fields
    function validateForm() {
        const fields = form.querySelectorAll('input[required], select[required]');
        let isValid = true;
        
        fields.forEach(field => {
            if (!validateField(field)) {
                isValid = false;
            }
        });
        
        return isValid;
    }
    
    // Show success message
    function showSuccess(message) {
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.textContent = message;
        successDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--success);
            color: white;
            padding: 1rem 2rem;
            border-radius: var(--radius-lg);
            box-shadow: var(--shadow-xl);
            z-index: 10000;
            animation: slideDown 0.3s ease-out;
        `;
        
        document.body.appendChild(successDiv);
        
        setTimeout(() => {
            successDiv.style.animation = 'fadeOut 0.3s ease-out';
            setTimeout(() => successDiv.remove(), 300);
        }, 3000);
    }
    
    // Show error message
    function showError(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message-global';
        errorDiv.textContent = message;
        errorDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--danger);
            color: white;
            padding: 1rem 2rem;
            border-radius: var(--radius-lg);
            box-shadow: var(--shadow-xl);
            z-index: 10000;
            animation: slideDown 0.3s ease-out;
        `;
        
        document.body.appendChild(errorDiv);
        
        setTimeout(() => {
            errorDiv.style.animation = 'fadeOut 0.3s ease-out';
            setTimeout(() => errorDiv.remove(), 300);
        }, 3000);
    }
    
    // Submit form data
    async function submitForm(formData) {
        try {
            // Simulate API call (replace with actual endpoint)
            const response = await fetch('https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec', {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });
            
            // For demo purposes, always show success
            showSuccess('Đăng ký thành công! Chúng tôi sẽ liên hệ với bạn sớm nhất.');
            
            // Reset form
            form.reset();
            
            // Track conversion (Google Analytics)
            if (typeof gtag !== 'undefined') {
                gtag('event', 'conversion', {
                    'send_to': 'AW-XXXXXXXXX/XXXXXXXXXXXXXX',
                    'value': formData.amount,
                    'currency': 'VND'
                });
            }
            
            // Track Facebook Pixel
            if (typeof fbq !== 'undefined') {
                fbq('track', 'Lead', {
                    value: formData.amount,
                    currency: 'VND'
                });
            }
            
        } catch (error) {
            console.error('Form submission error:', error);
            showError('Có lỗi xảy ra. Vui lòng thử lại sau hoặc gọi hotline: 0393.320.612');
        }
    }
    
    // Handle form submission
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Validate form
        if (!validateForm()) {
            showError('Vui lòng kiểm tra lại thông tin');
            return;
        }
        
        // Get form data
        const formData = {
            name: form.elements.name.value.trim(),
            phone: form.elements.phone.value.trim(),
            amount: form.elements.amount.value,
            address: form.elements.address.value.trim(),
            timestamp: new Date().toISOString()
        };
        
        // Disable submit button
        const submitButton = form.querySelector('.submit-button');
        const originalText = submitButton.textContent;
        submitButton.disabled = true;
        submitButton.innerHTML = '<div class="loading"></div> Đang gửi...';
        
        // Submit form
        await submitForm(formData);
        
        // Re-enable submit button
        submitButton.disabled = false;
        submitButton.textContent = originalText;
    });
    
    // Add real-time validation
    const fields = form.querySelectorAll('input, select');
    fields.forEach(field => {
        field.addEventListener('blur', function() {
            validateField(this);
        });
        
        field.addEventListener('input', function() {
            // Remove error state while typing
            if (this.classList.contains('error')) {
                this.classList.remove('error');
            }
        });
    });
    
})();