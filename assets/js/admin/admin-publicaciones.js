/**
 * Funcionalidad específica para la página de gestión de publicaciones
 */

document.addEventListener('DOMContentLoaded', function() {
    setupPublicationFilters();
    setupPublicationActions();
    setupPublicationModal();
});

/**
 * Configura los filtros para la lista de publicaciones
 */
function setupPublicationFilters() {
    const filterForm = document.getElementById('publicationFilterForm');
    
    if (filterForm) {
        filterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('Filtros de publicaciones aplicados');
        });
    }
    
    const resetFilters = document.getElementById('resetFilters');
    if (resetFilters) {
        resetFilters.addEventListener('click', function() {
            if (filterForm) filterForm.reset();
            console.log('Filtros de publicaciones reseteados');
        });
    }
}

/**
 * Configura las acciones para la gestión de publicaciones
 */
function setupPublicationActions() {
    setupActionButtons('approve-publication', function(publicationId, button) {
        button.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
        button.disabled = true;
        
        setTimeout(() => {
            button.innerHTML = '<i class="fas fa-check"></i> Aprobada';
            button.classList.remove('btn-warning');
            button.classList.add('btn-success');
            button.disabled = true;
            
            const statusCell = button.closest('tr').querySelector('.status');
            if (statusCell) {
                statusCell.innerHTML = '<span class="status active">Aprobada</span>';
            }
            
            console.log(`Publicación aprobada: ${publicationId}`);
        }, 1000);
    });
    
    setupActionButtons('reject-publication', function(publicationId, button) {
        if (confirm('¿Estás seguro de que deseas rechazar esta publicación?')) {
            button.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
            button.disabled = true;
            
            setTimeout(() => {
                button.innerHTML = '<i class="fas fa-times"></i> Rechazada';
                button.classList.remove('btn-warning');
                button.classList.add('btn-danger');
                button.disabled = true;
                
                const statusCell = button.closest('tr').querySelector('.status');
                if (statusCell) {
                    statusCell.innerHTML = '<span class="status inactive">Rechazada</span>';
                }
                
                console.log(`Publicación rechazada: ${publicationId}`);
            }, 1000);
        }
    });
    
    setupActionButtons('view-publication', function(publicationId) {
        console.log(`Ver publicación ID: ${publicationId}`);
    });
    
    setupActionButtons('delete-publication', function(publicationId) {
        if (confirm('¿Estás seguro de que deseas eliminar esta publicación? Esta acción no se puede deshacer.')) {
            console.log(`Publicación eliminada: ${publicationId}`);
        }
    });
}

/**
 * Configura los botones de acción según su clase y función
 */
function setupActionButtons(className, callback) {
    const buttons = document.querySelectorAll(`.${className}`);
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const publicationId = this.getAttribute('data-id');
            callback(publicationId, this);
        });
    });
}

/**
 * Configura el modal para ver/editar publicación
 */
function setupPublicationModal() {
    const modal = document.getElementById('publicationModal');
    const closeButtons = modal ? modal.querySelectorAll('.close-modal, .btn-close, [data-dismiss="modal"]') : [];
    
    if (!modal) return;
    
    const openModal = (publicationId = null) => {
        if (publicationId) {
            console.log(`Cargando publicación ID: ${publicationId}`);
        }
        
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    };
    
    const closeModal = () => {
        modal.style.display = 'none';
        document.body.style.overflow = '';
        const form = modal.querySelector('form');
        if (form) form.reset();
    };
    
    const openButtons = document.querySelectorAll('.open-publication-modal');
    openButtons.forEach(button => {
        button.addEventListener('click', function() {
            const publicationId = this.getAttribute('data-id');
            openModal(publicationId);
        });
    });
    
    closeButtons.forEach(button => {
        button.addEventListener('click', closeModal);
    });
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
}