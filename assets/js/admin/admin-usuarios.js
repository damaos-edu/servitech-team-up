/**
 * Funcionalidad específica para la página de gestión de usuarios
 */

document.addEventListener('DOMContentLoaded', function() {
    setupUserModal();
    setupCheckboxes();
});

/**
 * Configura la funcionalidad del modal para agregar/editar usuarios
 */
function setupUserModal() {
    const modal = document.getElementById('userModal');
    const btnAddUser = document.getElementById('btnAddUser');
    const btnCloseModal = document.querySelector('.btn-close');
    const btnCancel = document.querySelector('[data-dismiss="modal"]');
    const btnSave = document.getElementById('saveUser');
    
    if (!modal || !btnAddUser) return;
    
    const openModal = () => {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    };
    
    const closeModal = () => {
        modal.style.display = 'none';
        document.body.style.overflow = '';
        document.getElementById('userForm').reset();
    };
    
    btnAddUser.addEventListener('click', openModal);
    
    if (btnCloseModal) {
        btnCloseModal.addEventListener('click', closeModal);
    }
    
    if (btnCancel) {
        btnCancel.addEventListener('click', closeModal);
    }
    
    if (btnSave) {
        btnSave.addEventListener('click', function() {
            alert('Usuario guardado correctamente');
            closeModal();
        });
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
 * Configura la funcionalidad de selección de checkboxes en la tabla de usuarios
 */
function setupCheckboxes() {
    const selectAll = document.getElementById('selectAll');
    const checkboxes = document.querySelectorAll('tbody input[type="checkbox"]');
    
    if (!selectAll) return;
    
    selectAll.addEventListener('change', function() {
        checkboxes.forEach(checkbox => {
            checkbox.checked = selectAll.checked;
        });
    });
    
    const checkAllSelected = () => {
        let allSelected = true;
        checkboxes.forEach(checkbox => {
            if (!checkbox.checked) {
                allSelected = false;
            }
        });
        selectAll.checked = allSelected;
    };
    
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', checkAllSelected);
    });
}