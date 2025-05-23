/**
 * Funciones comunes para todas las páginas del panel de administración
 */
document.addEventListener("DOMContentLoaded", () => {
  // Inyectar sidebar
  const sidebarContainer = document.getElementById("admin-sidebar-container");
  if (sidebarContainer) {
    fetch("../assets/componentes/navbar-admin.html")
      .then((response) => {
        if (!response.ok) throw new Error(response.statusText);
        return response.text();
      })
      .then((html) => {
        sidebarContainer.innerHTML = html;
        // Resalta el item activo
        const current = window.location.pathname.split("/").pop();
        const link = sidebarContainer.querySelector(`.sidebar-nav a[href="${current}"]`);
        if (link) link.parentElement.classList.add("active");
      })
      .catch((error) => console.error("Error al cargar el sidebar:", error));
  }
  // 2) Setups restantes
  setupNotifications();
  setupProfileDropdown();
  setupInteractionEffects();
  setupMobileMenu();
});

/**
 * Configura las notificaciones del panel de administración
 */
function setupNotifications() {
    const notificationIcon = document.querySelector('.notification-icon');
    if (notificationIcon) {
        notificationIcon.addEventListener('click', () => console.log('Notificaciones clickeadas'));
    }
}

/**
 * Configura el dropdown del perfil de administrador
 */
function setupProfileDropdown() {
    const adminProfile = document.querySelector('.admin-profile');
    if (adminProfile) {
        adminProfile.addEventListener('click', () => console.log('Perfil clickeado'));
    }
}

/**
 * Configura efectos visuales para elementos interactivos
 */
function setupInteractionEffects() {
    document.querySelectorAll('.action-buttons .btn-icon')
      .forEach(btn => {
        btn.addEventListener('mouseenter', () => btn.style.backgroundColor = 'rgba(58, 142, 255, 0.1)');
        btn.addEventListener('mouseleave', () => btn.style.backgroundColor = '');
      });

    document.querySelectorAll('.btn-primary')
      .forEach(btn => {
        btn.addEventListener('mouseenter', () => btn.style.filter = 'brightness(1.1)');
        btn.addEventListener('mouseleave', () => btn.style.filter = '');
      });
}

/**
 * Configura el menú responsive para móvil y tablet
 */
function setupMobileMenu() {
  // Esperar a que el sidebar se cargue completamente
  setTimeout(() => {
    // Crear overlay si no existe
    if (!document.querySelector('.sidebar-overlay')) {
      const overlay = document.createElement('div');
      overlay.className = 'sidebar-overlay';
      document.body.appendChild(overlay);
      
      // Cerrar menú al hacer clic en el overlay
      overlay.addEventListener('click', () => {
        document.body.classList.remove('menu-open');
      });
    }
    
    // Configurar botón de menú hamburguesa
    const menuToggle = document.getElementById('menu-toggle');
    if (menuToggle) {
      menuToggle.addEventListener('click', (e) => {
        e.preventDefault();
        document.body.classList.toggle('menu-open');
      });
    }
    
    // Cerrar menú al cambiar de tamaño de ventana a escritorio
    window.addEventListener('resize', () => {
      if (window.innerWidth > 991 && document.body.classList.contains('menu-open')) {
        document.body.classList.remove('menu-open');
      }
    });
    
    // Cerrar menú al seleccionar un elemento de navegación en móvil/tablet
    const navLinks = document.querySelectorAll('.sidebar-nav a');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 991) {
          document.body.classList.remove('menu-open');
        }
      });
    });
    
    // Añadir clase para indicar que el menú móvil está listo
    document.body.classList.add('mobile-menu-ready');
  }, 300);
}
