/**
 * Script para probar la funcionalidad de autenticación
 * Este archivo simula el login y logout de un usuario para probar la UI
 */

document.addEventListener('DOMContentLoaded', function() {
    // Simular un botón para hacer login/logout (para pruebas)
    const testAuthContainer = document.createElement('div');
    testAuthContainer.style.position = 'fixed';
    testAuthContainer.style.bottom = '20px';
    testAuthContainer.style.right = '20px';
    testAuthContainer.style.zIndex = '10000';
    testAuthContainer.style.padding = '10px';
    testAuthContainer.style.borderRadius = '5px';
    testAuthContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    testAuthContainer.style.color = '#fff';
    
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    const isLoggedIn = currentUser !== null;
    
    const statusText = document.createElement('div');
    statusText.textContent = isLoggedIn ? 'Usuario: ' + currentUser.email : 'No autenticado';
    statusText.style.marginBottom = '10px';
    
    const testButton = document.createElement('button');
    testButton.textContent = isLoggedIn ? 'Simular Logout' : 'Simular Login';
    testButton.style.padding = '5px 10px';
    testButton.style.cursor = 'pointer';
    testButton.style.backgroundColor = isLoggedIn ? '#ff4d4d' : '#4CAF50';
    testButton.style.color = 'white';
    testButton.style.border = 'none';
    testButton.style.borderRadius = '4px';
    
    testButton.addEventListener('click', function() {
        if (isLoggedIn) {
            localStorage.removeItem('currentUser');
            alert('Sesión cerrada. Recargar página para ver cambios.');
            window.location.reload();
        } else {
            // Crear un usuario de prueba
            const testUser = {
                id: 'test123',
                email: 'usuario.prueba@servitech.com',
                role: 'user',
                name: 'Usuario',
                lastName: 'Prueba'
            };
            localStorage.setItem('currentUser', JSON.stringify(testUser));
            alert('Usuario autenticado. Recargar página para ver cambios.');
            window.location.reload();
        }
    });
    
    testAuthContainer.appendChild(statusText);
    testAuthContainer.appendChild(testButton);
    document.body.appendChild(testAuthContainer);
});
