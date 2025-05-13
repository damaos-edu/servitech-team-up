/**
 * Funcionalidad específica para la página de gestión de mensajes
 */

document.addEventListener('DOMContentLoaded', function() {
    setupMessageFilters();
    setupMessageActions();
    setupMessageDetails();
});

/**
 * Configura los filtros para la lista de mensajes
 */
function setupMessageFilters() {
    const filterSelect = document.getElementById('messageFilter');
    
    if (filterSelect) {
        filterSelect.addEventListener('change', function() {
            console.log(`Filtrando por: ${this.value}`);
        });
    }
    
    const searchForm = document.getElementById('messageSearchForm');
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const searchInput = this.querySelector('input[type="text"]');
            if (searchInput) {
                console.log(`Buscando: ${searchInput.value}`);
            }
        });
    }
}

/**
 * Configura las acciones para la gestión de mensajes
 */
function setupMessageActions() {
    const toggleReadButtons = document.querySelectorAll('.toggle-read');
    toggleReadButtons.forEach(button => {
        button.addEventListener('click', function() {
            const messageId = this.getAttribute('data-id');
            const isRead = this.getAttribute('data-read') === 'true';
            
            this.setAttribute('data-read', (!isRead).toString());
            
            if (isRead) {
                this.innerHTML = '<i class="far fa-envelope"></i>';
                this.setAttribute('title', 'Marcar como leído');
                
                const row = this.closest('tr');
                if (row) row.classList.add('unread-message');
            } else {
                this.innerHTML = '<i class="far fa-envelope-open"></i>';
                this.setAttribute('title', 'Marcar como no leído');
                
                const row = this.closest('tr');
                if (row) row.classList.remove('unread-message');
            }
            
            console.log(`Mensaje ${messageId} marcado como ${isRead ? 'no leído' : 'leído'}`);
        });
    });
    
    const deleteButtons = document.querySelectorAll('.delete-message');
    deleteButtons.forEach(button => {
        button.addEventListener('click', function() {
            const messageId = this.getAttribute('data-id');
            
            if (confirm('¿Estás seguro de que deseas eliminar este mensaje?')) {
                const row = this.closest('tr');
                if (row) {
                    row.style.transition = 'opacity 0.5s';
                    row.style.opacity = '0';
                    setTimeout(() => {
                        row.remove();
                    }, 500);
                }
                
                console.log(`Mensaje ${messageId} eliminado`);
            }
        });
    });
}

/**
 * Configura la vista de detalles de un mensaje
 */
function setupMessageDetails() {
    const messageRows = document.querySelectorAll('tr[data-message-id]');
    const detailsPanel = document.getElementById('messageDetails');
    
    messageRows.forEach(row => {
        row.addEventListener('click', function(e) {
            if (e.target.closest('.action-buttons')) return;
            
            const messageId = this.getAttribute('data-message-id');
            const subject = this.getAttribute('data-subject');
            const sender = this.getAttribute('data-sender');
            const date = this.getAttribute('data-date');
            const content = this.getAttribute('data-content');
            
            messageRows.forEach(r => r.classList.remove('active-message'));
            this.classList.add('active-message');
            
            this.classList.remove('unread-message');
            
            if (detailsPanel) {
                const subjectEl = detailsPanel.querySelector('.message-subject');
                const senderEl = detailsPanel.querySelector('.message-sender');
                const dateEl = detailsPanel.querySelector('.message-date');
                const contentEl = detailsPanel.querySelector('.message-content');
                
                if (subjectEl) subjectEl.textContent = subject;
                if (senderEl) senderEl.textContent = sender;
                if (dateEl) dateEl.textContent = date;
                if (contentEl) contentEl.textContent = content;
                
                detailsPanel.style.display = 'block';
            }
            
            console.log(`Mostrando detalles del mensaje ${messageId}`);
        });
    });
    
    const closeDetailsBtn = document.getElementById('closeMessageDetails');
    if (closeDetailsBtn && detailsPanel) {
        closeDetailsBtn.addEventListener('click', function() {
            detailsPanel.style.display = 'none';
            messageRows.forEach(r => r.classList.remove('active-message'));
        });
    }
}