/**
 * Funciones comunes para todas las páginas de Servitech
 */

/**
 * Configura animaciones de aparición al hacer scroll
 * @param {string} selector - Selector CSS para los elementos a animar
 */
function setupScrollAnimations(selector = '.animate-fade') {
    const animateElements = document.querySelectorAll(selector);
    
    if (animateElements.length === 0) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(el);
    });
}

/**
 * Configura el comportamiento de desplazamiento suave para los anclajes internos
 */
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Inicializar las funciones comunes cuando el DOM está listo
document.addEventListener('DOMContentLoaded', function() {
    setupScrollAnimations();
    setupSmoothScroll();
});