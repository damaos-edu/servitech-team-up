/**
 * Funcionalidad específica para contacto.html
 */

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
            
            setTimeout(() => {
                submitBtn.innerHTML = '<i class="fas fa-check"></i> ¡Mensaje enviado!';
                submitBtn.classList.add('btn-light');
                submitBtn.classList.remove('btn-primary');
            
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    submitBtn.classList.add('btn-primary');
                    submitBtn.classList.remove('btn-light');
                    contactForm.reset();
                }, 3000);
            }, 1500);
        });
    }
});