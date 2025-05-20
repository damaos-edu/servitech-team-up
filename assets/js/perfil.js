/**
 * Funcionalidad específica para perfil.html
 */

document.addEventListener('DOMContentLoaded', function() {
  // Obtener el usuario actual del localStorage
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  if (!currentUser) {
    // Si no hay usuario logueado, redirigir al login
    window.location.href = 'login.html';
    return;
  }
  
  // Función para obtener el nombre de usuario a partir del email
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
  
  function capitalizeFirstLetter(string) {
    if (!string) return '';
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  
  // Obtener información del usuario y actualizar elementos en la página
  const userInfo = getUserNameFromEmail(currentUser.email);
  
  // Actualizar nombre de usuario en el header
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
  
  // Actualizar información del perfil
  const profileName = document.getElementById('profileName');
  const profileEmail = document.getElementById('profileEmail');
  const profileAvatar = document.getElementById('profileAvatar');
  
  if (profileName) {
    profileName.textContent = userInfo.fullName;
  }
  
  if (profileEmail) {
    profileEmail.textContent = currentUser.email;
  }
  
  if (profileAvatar) {
    profileAvatar.src = avatarUrl;
  }
  
  // Actualizar campos del formulario
  const firstNameInput = document.getElementById('firstName');
  const lastNameInput = document.getElementById('lastName');
  const formEmailInput = document.getElementById('formEmail');
  
  if (firstNameInput) {
    firstNameInput.value = userInfo.firstName;
  }
  
  if (lastNameInput) {
    lastNameInput.value = userInfo.lastName;
  }
  
  if (formEmailInput) {
    formEmailInput.value = currentUser.email;
  }
  
  // Manejar el menú desplegable de usuario
  const userMenuContainer = document.getElementById('userMenuContainer');
  const userDropdown = document.getElementById('userDropdown');
  
  if (userMenuContainer && userDropdown) {
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
  }
  
  // Manejar el cierre de sesión
  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', function(event) {
      event.preventDefault();
      localStorage.removeItem('currentUser');
      window.location.href = 'login.html';
    });
  }
});
