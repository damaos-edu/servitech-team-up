/**
 * Funcionalidad específica para login.html
 */

document.addEventListener('DOMContentLoaded', function() {
   
    const togglePassword = document.querySelector('.toggle-password');
    const passwordInput = document.querySelector('#password');
    
    if (togglePassword && passwordInput) {
        togglePassword.addEventListener('click', function() {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            this.classList.toggle('fa-eye');
            this.classList.toggle('fa-eye-slash');
        });
    }
    
    
    const inputs = document.querySelectorAll('.input-group input');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'translateY(-3px)';
            this.parentElement.style.transition = 'transform 0.3s';
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.style.transform = 'translateY(0)';
            }
        });
    });
    
   
    const socialButtons = document.querySelectorAll('.social-login button');
    socialButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.borderColor = 'rgba(58, 142, 255, 0.3)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.borderColor = 'var(--border-light)';
        });
    });

    
    const testUsers = [
        { email: 'admin@servitech.com', password: 'Admin123$', role: 'admin' },
        { email: 'usuario@ejemplo.com', password: 'Usuario123$', role: 'user' }
    ];

    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        const emailInput = document.getElementById('email');
        const emailError = document.getElementById('emailError');
        const passwordError = document.getElementById('passwordError');
        const loginError = document.getElementById('loginError');

        function validateEmail(email) {
            const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return regex.test(email);
        }

        function validatePassword(password) {
            return password.length >= 8;
        }

        function showError(input, errorElement, message) {
            input.classList.add('input-error');
            errorElement.style.display = 'block';
            errorElement.textContent = message;
        }

        function hideError(input, errorElement) {
            input.classList.remove('input-error');
            errorElement.style.display = 'none';
        }

        if (emailInput && emailError) {
            emailInput.addEventListener('input', function() {
                if (validateEmail(this.value)) {
                    hideError(this, emailError);
                }
            });
        }

        if (passwordInput && passwordError) {
            passwordInput.addEventListener('input', function() {
                if (validatePassword(this.value)) {
                    hideError(this, passwordError);
                }
            });
        }

        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            if (loginError) loginError.style.display = 'none';
            
           
            if (emailInput && emailError) {
                if (!validateEmail(emailInput.value)) {
                    showError(emailInput, emailError, 'Ingresa un correo electrónico válido');
                    isValid = false;
                } else {
                    hideError(emailInput, emailError);
                }
            }
            
           
            if (passwordInput && passwordError) {
                if (!validatePassword(passwordInput.value)) {
                    showError(passwordInput, passwordError, 'La contraseña debe tener al menos 8 caracteres');
                    isValid = false;
                } else {
                    hideError(passwordInput, passwordError);
                }
            }
            
            if (isValid) {
               
                const user = testUsers.find(user => 
                    user.email === emailInput.value && 
                    user.password === passwordInput.value
                );
                
                if (user) {
                   
                    localStorage.setItem('currentUser', JSON.stringify({
                        email: user.email,
                        role: user.role
                    }));
                    
                    if (user.role === 'admin') {
                      
                        window.location.href = 'admin/admin.html';
                    } else {
                      
                        window.location.href = 'feed.html';
                    }
                } else if (loginError) {
                  
                    loginError.style.display = 'block';
                }
            }
        });
    }
});