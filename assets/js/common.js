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

/**
 * Actualiza la interfaz de usuario según el estado de autenticación
 */
function setupUserInterface() {
    // Obtener el usuario actual del localStorage
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    // Buscar elementos de autenticación en la página
    const authButtons = document.querySelector('.auth-buttons');
    const userMenu = document.querySelector('.user-menu');
    
    // Páginas que requieren autenticación
    const restrictedPages = ['calendario.html', 'mensajes.html', 'perfil.html'];
    const currentPage = window.location.pathname.split('/').pop();
    
    // Verificar si estamos en una página de admin
    const isAdminPage = window.location.pathname.includes('/admin/');
    
    // Si el usuario no está logueado y estamos en una página restringida
    if (!currentUser && (restrictedPages.includes(currentPage) || isAdminPage)) {
        // Redirigir al login
        window.location.href = isAdminPage ? '../login.html' : 'login.html';
        return;
    }
    
    // Si el usuario está logueado y estamos en una página de admin pero no es admin
    if (currentUser && isAdminPage && currentUser.role !== 'admin') {
        window.location.href = '../feed.html';
        return;
    }
    
    // Funciones auxiliares para procesar nombres
    function capitalizeFirstLetter(string) {
        if (!string) return '';
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    
    function getUserNameFromEmail(email) {
        // Si el email tiene formato nombre.apellido@dominio.com
        const nameParts = email.split('@')[0].split('.');
        
        if (nameParts.length > 1) {
            return {
                firstName: capitalizeFirstLetter(nameParts[0]),
                lastName: capitalizeFirstLetter(nameParts[1]),
                fullName: `${capitalizeFirstLetter(nameParts[0])} ${capitalizeFirstLetter(nameParts[1])}`
            };
        }
        
        // Si el email no tiene formato con punto, usar solo la parte antes del @
        return {
            firstName: capitalizeFirstLetter(nameParts[0]),
            lastName: '',
            fullName: capitalizeFirstLetter(nameParts[0])
        };
    }
    
    // Si tenemos los elementos necesarios y el usuario está logueado
    if (authButtons && userMenu && currentUser) {
        // Ocultar botones de autenticación y mostrar el menú de usuario
        authButtons.style.display = 'none';
        userMenu.style.display = 'flex';
        
        const userInfo = getUserNameFromEmail(currentUser.email);
        
        // Actualizar nombre de usuario en el header si existe el elemento
        const userDisplayName = document.getElementById('userDisplayName');
        if (userDisplayName) {
            userDisplayName.textContent = userInfo.firstName;
        }
        
        // Actualizar avatar con iniciales
        const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(userInfo.firstName)}+${encodeURIComponent(userInfo.lastName)}&background=3a8eff&color=fff`;
        
        const userAvatarImg = document.getElementById('userAvatar');
        if (userAvatarImg) {
            userAvatarImg.src = avatarUrl;
        }
        
        // Manejar el menú desplegable de usuario
        const userMenuContainer = document.getElementById('userMenuContainer');
        const userDropdown = document.getElementById('userDropdown');
        
        if (userMenuContainer && userDropdown) {
            // Resaltar la página activa en el menú desplegable
            const currentPageItems = document.querySelectorAll(`.dropdown-item[href="${currentPage}"]`);
            currentPageItems.forEach(item => {
                if (!item.classList.contains('active')) {
                    item.classList.add('active');
                }
            });
            
            // Configurar la funcionalidad del menú desplegable
            userMenuContainer.addEventListener('click', function(event) {
                userDropdown.classList.toggle('show');
                event.stopPropagation();
            });
            
            // Cerrar el menú al hacer clic fuera de él
            document.addEventListener('click', function(event) {
                if (userDropdown.classList.contains('show') && !userMenuContainer.contains(event.target)) {
                    userDropdown.classList.remove('show');
                }
            });
            
            // Manejar el cierre de sesión
            const logoutBtn = document.getElementById('logoutBtn');
            if (logoutBtn) {
                logoutBtn.addEventListener('click', function(event) {
                    event.preventDefault();
                    localStorage.removeItem('currentUser');
                    window.location.href = 'login.html';
                });
            }
        }
    } else if (authButtons && userMenu && !currentUser) {
        // Si el usuario no está logueado, mostrar botones de autenticación y ocultar menú de usuario
        authButtons.style.display = 'flex';
        userMenu.style.display = 'none';
    }
}

// Inicializar las funciones comunes cuando el DOM está listo
document.addEventListener('DOMContentLoaded', function() {
    setupScrollAnimations();
    setupSmoothScroll();
    setupUserInterface();
});