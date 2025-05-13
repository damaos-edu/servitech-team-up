/**
 * Funcionalidad específica para la página de gestión de expertos
 */

document.addEventListener('DOMContentLoaded', function() {
    setupExpertModal();
    setupExpertFilters();
    setupExpertActions();
    setupExpertVerification();
});

/**
 * Configura la funcionalidad del modal para agregar/editar expertos
 */
function setupExpertModal() {
    const modal = document.getElementById('expertModal');
    const btnAddExpert = document.getElementById('btnAddExpert');
    const btnCloseModal = modal ? modal.querySelector('.btn-close') : null;
    const btnCancel = modal ? modal.querySelector('[data-dismiss="modal"]') : null;
    
    if (!modal || !btnAddExpert) return;
    
    const openModal = () => {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    };
    
    const closeModal = () => {
        modal.style.display = 'none';
        document.body.style.overflow = '';
        const form = document.getElementById('expertForm');
        if (form) form.reset();
    };
    
    btnAddExpert.addEventListener('click', openModal);
    
    if (btnCloseModal) {
        btnCloseModal.addEventListener('click', closeModal);
    }
    
    if (btnCancel) {
        btnCancel.addEventListener('click', closeModal);
    }
    
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });
    }
}

/**
 * Configura los filtros para la lista de expertos
 */
function setupExpertFilters() {
    const filterForm = document.getElementById('expertFilterForm');
    
    if (filterForm) {
        filterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('Filtros aplicados');
        });
    }
    
    const resetFilters = document.getElementById('resetFilters');
    if (resetFilters) {
        resetFilters.addEventListener('click', function() {
            filterForm.reset();
            console.log('Filtros reseteados');
        });
    }
}

/**
 * Configura las acciones para la gestión de expertos
 */
function setupExpertActions() {
    const editButtons = document.querySelectorAll('.expert-edit');
    editButtons.forEach(button => {
        button.addEventListener('click', function() {
            const expertId = this.getAttribute('data-id');
            console.log(`Editar experto ID: ${expertId}`);
        });
    });
    
    const deleteButtons = document.querySelectorAll('.expert-delete');
    deleteButtons.forEach(button => {
        button.addEventListener('click', function() {
            const expertId = this.getAttribute('data-id');
            const expertName = this.getAttribute('data-name');
            
            if (confirm(`¿Estás seguro de que deseas eliminar al experto "${expertName}"?`)) {
                console.log(`Experto eliminado: ${expertName}`);
            }
        });
    });
    
    const viewButtons = document.querySelectorAll('.expert-view');
    viewButtons.forEach(button => {
        button.addEventListener('click', function() {
            const expertId = this.getAttribute('data-id');
            console.log(`Ver perfil del experto ID: ${expertId}`);
        });
    });
}

/**
 * Configura la funcionalidad para verificar expertos
 */
function setupExpertVerification() {
    const verifyButtons = document.querySelectorAll('.verify-expert');
    
    verifyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const expertId = this.getAttribute('data-id');
            const expertName = this.getAttribute('data-name');
            
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
            this.disabled = true;
            
            setTimeout(() => {
                this.innerHTML = '<i class="fas fa-check-circle"></i> Verificado';
                this.classList.remove('btn-warning');
                this.classList.add('btn-success');
                
                const statusCell = this.closest('tr').querySelector('.status');
                if (statusCell) {
                    statusCell.innerHTML = '<span class="status verified">Verificado</span>';
                }
                
                console.log(`Experto verificado: ${expertName}`);
            }, 1500);
        });
    });
}