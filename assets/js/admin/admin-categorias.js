/**
 * Funcionalidad específica para la página de gestión de categorías
 */

document.addEventListener('DOMContentLoaded', function() {
    setupCategoryModal();
    setupCategoryActions();
});

/**
 * Configura la funcionalidad del modal para agregar/editar categorías
 */
function setupCategoryModal() {
    const modal = document.getElementById('categoryModal');
    const btnAddCategory = document.getElementById('btnAddCategory');
    const btnCloseModal = modal ? modal.querySelector('.btn-close') : null;
    const btnCancel = modal ? modal.querySelector('[data-dismiss="modal"]') : null;
    
    if (!modal || !btnAddCategory) return;
    
    const openModal = () => {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    };
    
    const closeModal = () => {
        modal.style.display = 'none';
        document.body.style.overflow = '';
        const form = document.getElementById('categoryForm');
        if (form) form.reset();
    };
    
    btnAddCategory.addEventListener('click', openModal);
    
    if (btnCloseModal) {
        btnCloseModal.addEventListener('click', closeModal);
    }
    
    if (btnCancel) {
        btnCancel.addEventListener('click', closeModal);
    }
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
}

/**
 * Configura las acciones para la gestión de categorías
 */
function setupCategoryActions() {
    const editButtons = document.querySelectorAll('.category-edit');
    editButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const categoryId = this.getAttribute('data-id');
            const categoryName = this.getAttribute('data-name');
            console.log(`Editar categoría: ${categoryName} (ID: ${categoryId})`);
        });
    });
    
    const deleteButtons = document.querySelectorAll('.category-delete');
    deleteButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const categoryId = this.getAttribute('data-id');
            const categoryName = this.getAttribute('data-name');
            
            if (confirm(`¿Estás seguro de que deseas eliminar la categoría "${categoryName}"?`)) {
                console.log(`Categoría eliminada: ${categoryName} (ID: ${categoryId})`);
            }
        });
    });
}