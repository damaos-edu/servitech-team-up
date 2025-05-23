/* Funciones comunes para todas las páginas de Servitech*/

/*Configura animaciones de aparición al hacer scroll* 
  @param {string} selector - Selector CSS para los elementos a animar*/
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

/*Configura el comportamiento de desplazamiento suave para los anclajes internos*/
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

/*Actualiza la interfaz de usuario según el estado de autenticación*/
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
        const nameParts = email.split('@')[0].split('.');
        
        if (nameParts.length > 1) {
            return {
                firstName: capitalizeFirstLetter(nameParts[0]),
                lastName: capitalizeFirstLetter(nameParts[1]),
                fullName: `${capitalizeFirstLetter(nameParts[0])} ${capitalizeFirstLetter(nameParts[1])}`
            };
        }

        return {
            firstName: capitalizeFirstLetter(nameParts[0]),
            lastName: '',
            fullName: capitalizeFirstLetter(nameParts[0])
        };
    }
    
    if (authButtons && userMenu && currentUser) {
        authButtons.style.display = 'none';
        userMenu.style.display = 'flex';
        
        const userInfo = getUserNameFromEmail(currentUser.email);
        
        const userDisplayName = document.getElementById('userDisplayName');
        if (userDisplayName) {
            userDisplayName.textContent = userInfo.firstName;
        }
        
        const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(userInfo.firstName)}+${encodeURIComponent(userInfo.lastName)}&background=3a8eff&color=fff`;
        
        const userAvatarImg = document.getElementById('userAvatar');
        if (userAvatarImg) {
            userAvatarImg.src = avatarUrl;
        }
        
        const userMenuContainer = document.getElementById('userMenuContainer');
        const userDropdown = document.getElementById('userDropdown');
        
        if (userMenuContainer && userDropdown) {
            const currentPageItems = document.querySelectorAll(`.dropdown-item[href="${currentPage}"]`);
            currentPageItems.forEach(item => {
                if (!item.classList.contains('active')) {
                    item.classList.add('active');
                }
            });
            
            // Alternar visibilidad del menú al hacer clic en el contenedor
            userMenuContainer.addEventListener('click', function(event) {
                userDropdown.classList.toggle('show');
                event.stopPropagation(); // Evitar que el clic se propague
            });
            
            // Ocultar el menú al hacer clic fuera de él
            document.addEventListener('click', function(event) {
                if (userDropdown.classList.contains('show') && !userMenuContainer.contains(event.target)) {
                    userDropdown.classList.remove('show');
                }
            });
            
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
        authButtons.style.display = 'flex';
        userMenu.style.display = 'none';
    }
}

/*Carga el header y luego ejecuta los setups comunes*/
document.addEventListener("DOMContentLoaded", () => {
    const headerContainer = document.getElementById("header-container");

    if (!headerContainer) {
        // Si no hay header, ejecuta las funciones comunes de inmediato igual
        setupScrollAnimations();
        setupSmoothScroll();
        setupUserInterface();
        return;
    }

    fetch("assets/componentes/header.html")
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Error al cargar el header: ${response.statusText}`);
            }
            return response.text();
        })
        .then((html) => {
            headerContainer.innerHTML = html;
            console.log("Header cargado correctamente.");

            // Ejecuta funciones comunes después de insertar el header
            setupScrollAnimations();
            setupSmoothScroll();
            setupUserInterface();
        })
        .catch((error) => {
            console.error("Error al cargar el header:", error);
            setupScrollAnimations();
            setupSmoothScroll();
            setupUserInterface();
        });
});

/* Carga el footer en todas las páginas*/
function loadFooter() {
  const footerContainer = document.getElementById("footer-container");
  if (footerContainer) {
    fetch("assets/componentes/footer.html")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error al cargar el footer: ${response.statusText}`);
        }
        return response.text();
      })
      .then((html) => {
        footerContainer.innerHTML = html;
        console.log("Footer cargado correctamente.");
      })
      .catch((error) => console.error("Error al cargar el footer:", error));
  }
}

document.addEventListener("DOMContentLoaded", () => {
  loadFooter();
});



