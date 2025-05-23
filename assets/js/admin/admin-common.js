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
