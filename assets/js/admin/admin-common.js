/**
 * Funciones comunes para todas las páginas del panel de administración
 */

document.addEventListener('DOMContentLoaded', function() {
    setupNotifications();
    setupProfileDropdown();
    setupInteractionEffects();
});

/**
 * Configura las notificaciones del panel de administración
 */
function setupNotifications() {
    const notificationIcon = document.querySelector('.notification-icon');
    
    if (notificationIcon) {
        notificationIcon.addEventListener('click', function(e) {
            console.log('Notificaciones clickeadas');
        });
    }
}

/**
 * Configura el dropdown del perfil de administrador
 */
function setupProfileDropdown() {
    const adminProfile = document.querySelector('.admin-profile');
    
    if (adminProfile) {
        adminProfile.addEventListener('click', function(e) {
            console.log('Perfil clickeado');
        });
    }
}

/**
 * Configura efectos visuales para elementos interactivos
 */
function setupInteractionEffects() {
    const actionButtons = document.querySelectorAll('.action-buttons .btn-icon');
    actionButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.backgroundColor = 'rgba(58, 142, 255, 0.1)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.backgroundColor = '';
        });
    });
    
    const primaryButtons = document.querySelectorAll('.btn-primary');
    primaryButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.filter = 'brightness(1.1)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.filter = '';
        });
    });
}