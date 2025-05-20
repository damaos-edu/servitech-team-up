/**
 * Funcionalidad específica para la página de configuración del panel de administración
 */

document.addEventListener('DOMContentLoaded', function() {
    setupTabNavigation();
    setupFormHandlers();
    setupColorThemePreview();
    setupNotificationSettings();
});

/**
 * Configura la navegación por pestañas en la página de configuración
 */
function setupTabNavigation() {
    const tabLinks = document.querySelectorAll('.settings-nav a');
    const tabContents = document.querySelectorAll('.settings-content');

    tabLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href').substring(1);

            tabLinks.forEach(tab => tab.classList.remove('active'));
            tabContents.forEach(content => content.style.display = 'none');

            this.classList.add('active');
            const activeContent = document.getElementById(targetId);
            if (activeContent) {
                activeContent.style.display = 'block';
            }
        });
    });

    // Mostrar la primera pestaña y contenido por defecto
    if (tabLinks.length > 0 && tabContents.length > 0) {
        tabLinks[0].classList.add('active');
        tabContents[0].style.display = 'block';
    }
}

/**
 * Configura los manejadores de formularios para guardar configuraciones
 */
function setupFormHandlers() {
    const settingsForms = document.querySelectorAll('.settings-form');
    
    settingsForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const saveBtn = this.querySelector('button[type="submit"]');
            const originalText = saveBtn ? saveBtn.innerHTML : '';
            
            if (saveBtn) {
                saveBtn.disabled = true;
                saveBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Guardando...';
            }
            
            setTimeout(() => {
                if (saveBtn) {
                    saveBtn.innerHTML = '<i class="fas fa-check"></i> ¡Guardado!';
                    
                    setTimeout(() => {
                        saveBtn.disabled = false;
                        saveBtn.innerHTML = originalText;
                    }, 1500);
                }
                
                showSettingsNotification('Configuración guardada correctamente', 'success');
                
                console.log(`Formulario guardado: ${this.getAttribute('id')}`);
            }, 1000);
        });
    });
}

/**
 * Configura la previsualización del tema de colores
 */
function setupColorThemePreview() {
    const colorPickers = document.querySelectorAll('.color-picker');
    const themePreview = document.getElementById('themePreview');
    
    if (!themePreview) return;
    
    colorPickers.forEach(picker => {
        picker.addEventListener('input', function() {
            const colorType = this.getAttribute('data-color-type');
            const colorValue = this.value;
            
            switch(colorType) {
                case 'primary':
                    themePreview.style.setProperty('--preview-primary-color', colorValue);
                    break;
                case 'secondary':
                    themePreview.style.setProperty('--preview-secondary-color', colorValue);
                    break;
                case 'background':
                    themePreview.style.setProperty('--preview-bg-color', colorValue);
                    break;
                case 'text':
                    themePreview.style.setProperty('--preview-text-color', colorValue);
                    break;
            }
        });
    });
    
    const resetThemeBtn = document.getElementById('resetTheme');
    if (resetThemeBtn) {
        resetThemeBtn.addEventListener('click', function() {
            colorPickers.forEach(picker => {
                const defaultValue = picker.getAttribute('data-default-value');
                if (defaultValue) {
                    picker.value = defaultValue;
                    picker.dispatchEvent(new Event('input'));
                }
            });
        });
    }
}

/**
 * Configura los ajustes de notificaciones
 */
function setupNotificationSettings() {
    const notificationToggles = document.querySelectorAll('.notification-toggle');
    
    notificationToggles.forEach(toggle => {
        toggle.addEventListener('change', function() {
            const notificationType = this.getAttribute('data-notification-type');
            const isEnabled = this.checked;
            
            console.log(`Notificación "${notificationType}" ${isEnabled ? 'activada' : 'desactivada'}`);
        });
    });
}

/**
 * Muestra una notificación en la página de configuración
 */
/**
 * Muestra una notificación en la página de configuración
 */
function showSettingsNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `settings-notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            ${type === 'success' ? '<i class="fas fa-check-circle"></i>' : 
              type === 'error' ? '<i class="fas fa-exclamation-circle"></i>' : 
              '<i class="fas fa-info-circle"></i>'}
            <span>${message}</span>
        </div>
        <button class="close-notification"><i class="fas fa-times"></i></button>`;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.classList.add('show');
    }, 10);

    const closeBtn = notification.querySelector('.close-notification');
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            closeNotification(notification);
        });
    }

    if (type === 'success') {
        setTimeout(() => {
            closeNotification(notification);
        }, 5000);
    }
}

/**
 * Cierra una notificación con animación
 */
function closeNotification(notification) {
    notification.classList.remove('show');
    setTimeout(() => {
        notification.remove();
    }, 300);
}

// Función para abrir un modal
function openModal(modalId) {
  document.getElementById(modalId).classList.add('show');
  document.getElementById(modalId).style.display = 'block';
}

// Función para cerrar todos los modales
function closeModals() {
  document.querySelectorAll('.modal').forEach(modal => {
    modal.classList.remove('show');
    modal.style.display = 'none';
  });
}

// Cerrar modal al hacer click en botones con data-dismiss="modal"
document.querySelectorAll('[data-dismiss="modal"]').forEach(btn => {
  btn.addEventListener('click', closeModals);
});
// Cerrar modal al hacer click fuera del modal
document.querySelectorAll('.modal').forEach(modal => {
  modal.addEventListener('click', function(event) {
    if (event.target === this) {
      closeModals();
    }
  });
});