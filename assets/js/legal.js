/**
 * Funcionalidad compartida para páginas legales (privacidad.html y terminos.html)
 */
document.addEventListener('DOMContentLoaded', function() {
   
    const highlightSections = document.querySelectorAll('.highlight-section');
    
    if (highlightSections.length > 0) {
        highlightSections.forEach(section => {
            section.addEventListener('mouseenter', function() {
                this.style.backgroundColor = 'rgba(58, 142, 255, 0.05)';
            });
            
            section.addEventListener('mouseleave', function() {
                this.style.backgroundColor = 'transparent';
            });
        });
    }
    
 
    const tocLinks = document.querySelectorAll('.toc-link');
    
    if (tocLinks.length > 0) {
        tocLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 100,
                        behavior: 'smooth'
                    });
                    
                
                    targetElement.style.transition = 'background-color 0.3s';
                    targetElement.style.backgroundColor = 'rgba(58, 142, 255, 0.1)';
                    
                    setTimeout(() => {
                        targetElement.style.backgroundColor = 'transparent';
                    }, 1500);
                }
            });
        });
    }
});

