/**
 * Funcionalidad específica para recuperar-password.html
 */

document.addEventListener('DOMContentLoaded', function() {
   
    const recoveryForm = document.getElementById('recoveryForm');
    
    if (recoveryForm) {
        recoveryForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
          
            const emailInput = document.getElementById('email');
            const emailValue = emailInput ? emailInput.value.trim() : '';
            
            if (!emailValue || !validateEmail(emailValue)) {
                
                const errorElement = document.getElementById('emailError');
                if (errorElement) {
                    errorElement.style.display = 'block';
                    emailInput.classList.add('input-error');
                }
                return;
            }
            
           
            const errorElement = document.getElementById('emailError');
            if (errorElement) {
                errorElement.style.display = 'none';
                emailInput.classList.remove('input-error');
            }
            
           
            const submitBtn = recoveryForm.querySelector('button[type="submit"]');
            const formContainer = document.querySelector('.form-container');
            const successContainer = document.querySelector('.success-container');
            
            if (submitBtn) {
                const originalText = submitBtn.innerHTML;
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
                
                setTimeout(() => {
                   
                    if (formContainer) formContainer.style.display = 'none';
                    if (successContainer) {
                        successContainer.style.display = 'block';
                        
                       
                        const emailDisplay = successContainer.querySelector('.user-email');
                        if (emailDisplay) {
                            emailDisplay.textContent = emailValue;
                        }
                    }
                }, 1500);
            }
        });
    }
    
    
    function validateEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }
    
    const inputs = document.querySelectorAll('.input-group input');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'translateY(-3px)';
            this.parentElement.style.transition = 'transform 0.3s';
            this.parentElement.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.05)';
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.style.transform = '';
                this.parentElement.style.boxShadow = '';
            }
        });
    });
});