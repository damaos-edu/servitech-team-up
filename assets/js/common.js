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

/*Configura el menú hamburguesa para dispositivos móviles*/
function setupMobileMenu() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navContainer = document.getElementById('navContainer');
    
    if (mobileMenuToggle && navContainer) {
        // Verificar si el usuario está logueado para aplicar la clase logged-in
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser) {
            navContainer.classList.add('logged-in');
        } else {
            navContainer.classList.remove('logged-in');
        }
        
        // Eliminar event listeners anteriores para evitar duplicados
        const newMobileMenuToggle = mobileMenuToggle.cloneNode(true);
        mobileMenuToggle.parentNode.replaceChild(newMobileMenuToggle, mobileMenuToggle);
        
        newMobileMenuToggle.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevenir propagación para evitar conflictos
            navContainer.classList.toggle('active');
            const icon = newMobileMenuToggle.querySelector('i');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        });        // Cerrar menú al hacer clic en un enlace (incluyendo las opciones de usuario)
        const allNavLinks = navContainer.querySelectorAll('.nav-item:not(#mobileLogoutBtn)');
        allNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                navContainer.classList.remove('active');
                const icon = document.querySelector('#mobileMenuToggle i');
                if (icon) {
                    icon.classList.add('fa-bars');
                    icon.classList.remove('fa-times');
                }
            });
        });
        
        // Manejar específicamente el botón de cerrar sesión móvil
        const mobileLogoutBtn = document.getElementById('mobileLogoutBtn');
        if (mobileLogoutBtn) {
            mobileLogoutBtn.addEventListener('click', function(event) {
                event.preventDefault();
                localStorage.removeItem('currentUser');
                window.location.href = 'login.html';
            });
        }
        
        // Cerrar menú al hacer clic fuera del menú
        document.addEventListener('click', (e) => {
            const toggle = document.getElementById('mobileMenuToggle');
            const nav = document.getElementById('navContainer');
            
            if (nav && nav.classList.contains('active') && 
                toggle && !toggle.contains(e.target) && 
                !nav.contains(e.target)) {
                
                nav.classList.remove('active');
                const icon = toggle.querySelector('i');
                if (icon) {
                    icon.classList.add('fa-bars');
                    icon.classList.remove('fa-times');
                }
            }
        });
    }
}

/*Actualiza la interfaz de usuario según el estado de autenticación*/
function setupUserInterface() {
    // Obtener el usuario actual del localStorage
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    // Buscar elementos de autenticación en la página
    const authButtons = document.querySelector('.auth-buttons');
    const userMenu = document.querySelector('.user-menu');
    const mobileUserMenu = document.querySelector('.mobile-user-menu');
    const navContainer = document.getElementById('navContainer');
    
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
    
    // Aplicar la clase logged-in al nav-container si el usuario está autenticado
    if (currentUser && navContainer) {
        navContainer.classList.add('logged-in');
    } else if (navContainer) {
        navContainer.classList.remove('logged-in');
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
    }    if (authButtons && currentUser) {
        // Usuario logueado
        authButtons.style.display = 'none';
        
        // Mostrar menú de usuario en desktop
        if (userMenu) {
            if (window.innerWidth >= 993) {
                userMenu.style.display = 'flex';  // Solo mostrar en desktop
            } else {
                userMenu.style.display = 'none';  // Ocultar en móvil/tablet
            }
            
            // Añadir clase al contenedor de navegación para indicar que el usuario está logueado
            if (navContainer) {
                navContainer.classList.add('logged-in');
            }
        }
        
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
              // Eliminar event listeners anteriores para evitar duplicados
            const newUserMenuContainer = userMenuContainer.cloneNode(true);
            userMenuContainer.parentNode.replaceChild(newUserMenuContainer, userMenuContainer);
            
            // Alternar visibilidad del menú al hacer clic en el contenedor
            newUserMenuContainer.addEventListener('click', function(event) {
                const dropdown = document.getElementById('userDropdown');
                dropdown.classList.toggle('show');
                
                // Girar el icono cuando el menú está abierto
                const chevronIcon = newUserMenuContainer.querySelector('.fa-chevron-down');
                if (chevronIcon) {
                    chevronIcon.style.transform = dropdown.classList.contains('show') ? 'rotate(180deg)' : 'rotate(0)';
                }
                
                event.stopPropagation(); // Evitar que el clic se propague
            });
              // Ocultar el menú al hacer clic fuera de él
            document.addEventListener('click', function(event) {
                const dropdown = document.getElementById('userDropdown');
                const container = document.getElementById('userMenuContainer');
                if (dropdown && dropdown.classList.contains('show') && container && !container.contains(event.target)) {
                    dropdown.classList.remove('show');
                    
                    // Restaurar la rotación del icono
                    const chevronIcon = container.querySelector('.fa-chevron-down');
                    if (chevronIcon) {
                        chevronIcon.style.transform = 'rotate(0)';
                    }
                }
            });            // Agregar funcionalidad a los botones de cerrar sesión (tanto en desktop como en móvil)
            setTimeout(() => {
                // Botón de cerrar sesión en desktop
                const logoutBtn = document.getElementById('logoutBtn');
                if (logoutBtn) {
                    logoutBtn.addEventListener('click', function(event) {
                        event.preventDefault();
                        localStorage.removeItem('currentUser');
                        window.location.href = 'login.html';
                    });
                }
                  // Botón de cerrar sesión en móvil
                const mobileLogoutBtn = document.getElementById('mobileLogoutBtn');
                if (mobileLogoutBtn) {
                    console.log("Configurando mobileLogoutBtn");
                    mobileLogoutBtn.addEventListener('click', function(event) {
                        event.preventDefault();
                        console.log("Cerrando sesión desde móvil");
                        localStorage.removeItem('currentUser');
                        window.location.href = 'login.html';
                    });
                }
            }, 100); // Pequeño retraso para asegurar que el DOM está listo
        }    } else if (authButtons && !currentUser) {
        // Usuario no logueado
        authButtons.style.display = 'flex';
        
        if (userMenu) {
            userMenu.style.display = 'none';
        }
        
        // Quitar clase de usuario logueado
        if (navContainer) {
            navContainer.classList.remove('logged-in');
        }
    }
}

// Función para manejar los cambios de tamaño de la ventana
function handleWindowResize() {
    const userMenu = document.querySelector('.user-menu');
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const navContainer = document.getElementById('navContainer');
    
    if (currentUser) {
        // Usuario logueado
        if (navContainer) {
            navContainer.classList.add('logged-in');
        }
        
        if (userMenu) {
            if (window.innerWidth >= 993) {
                userMenu.style.display = 'flex'; // Mostrar en desktop
            } else {
                userMenu.style.display = 'none'; // Ocultar en móvil
            }
        }
    } else {
        // Usuario no logueado
        if (navContainer) {
            navContainer.classList.remove('logged-in');
        }
        
        if (userMenu) {
            userMenu.style.display = 'none';
        }
    }
}

// Agregar listener para cambios de tamaño de ventana
window.addEventListener('resize', handleWindowResize);

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
            setupScrollAnimations();
            setupSmoothScroll();
            setupMobileMenu();
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



