/**
 * Funcionalidad específica para la página de gestión de usuarios
 */

document.addEventListener("DOMContentLoaded", function () {
  setupUserModal();

  // Evento para abrir el modal de agregar usuario
  const btnAddUser = document.getElementById("btnAddUser");
  const modalAgregar = document.getElementById("modalAgregarUsuario");
  const closeAgregar = modalAgregar.querySelector(".btn-close");
  const cancelarAgregar = modalAgregar.querySelector(
    ".modal-usuario-agregar-cancelar"
  );
  const formAgregar = document.getElementById("formAgregarUsuario");

  if (btnAddUser && modalAgregar) {
    btnAddUser.addEventListener("click", function () {
      modalAgregar.style.display = "flex";
    });
  }
  if (closeAgregar) {
    closeAgregar.addEventListener("click", function () {
      modalAgregar.style.display = "none";
    });
  }
  if (cancelarAgregar) {
    cancelarAgregar.addEventListener("click", function () {
      modalAgregar.style.display = "none";
    });
  }
  if (modalAgregar) {
    window.addEventListener("click", function (e) {
      if (e.target === modalAgregar) modalAgregar.style.display = "none";
    });
  }
  if (formAgregar) {
    formAgregar.addEventListener("submit", function (e) {
      e.preventDefault();
      // Aquí puedes agregar la lógica para guardar el usuario
      modalAgregar.style.display = "none";
    });
  }

  // Delegación de eventos para los íconos de acción en la tabla de usuarios
  const tbody = document.querySelector(
    ".usuarios-grid__tabla .admin-table tbody"
  );
  let rowInactivar = null; // Para usar en la confirmación de inactivar

  if (tbody) {
    tbody.addEventListener("click", function (e) {
      const btn = e.target.closest(".btn-icon");
      if (!btn) return;
      const row = btn.closest("tr");
      if (!row) return;

      // EDITAR
      if (btn.title === "Editar") {
        const modalEditar = document.getElementById("modalEditarUsuario");
        // Rellenar los campos del modal con los datos de la fila
        document.getElementById("editarNombreUsuario").value = row
          .querySelector("h4")
          .textContent.trim();
        document.getElementById("editarCorreoUsuario").value = row
          .querySelector("span")
          .textContent.trim();
        document.getElementById("editarEstadoUsuario").value = row
          .querySelector(".status")
          .textContent.trim();
        document.getElementById("editarFechaRegistroUsuario").value =
          row.children[2].textContent.trim().split("/").reverse().join("-");
        // Mostrar el modal
        modalEditar.style.display = "flex";
        return;
      }

      // VER PERFIL
      if (btn.title === "Ver perfil") {
        const modalVer = document.getElementById("modalVerUsuario");
        document.getElementById("verNombreUsuario").value = row
          .querySelector("h4")
          .textContent.trim();
        document.getElementById("verCorreoUsuario").value = row
          .querySelector("span")
          .textContent.trim();
        document.getElementById("verEstadoUsuario").value = row
          .querySelector(".status")
          .textContent.trim();
        document.getElementById("verFechaRegistroUsuario").value =
          row.children[2].textContent.trim().split("/").reverse().join("-");
        modalVer.style.display = "flex";
        return;
      }

      // ELIMINAR/INACTIVAR
      if (btn.title === "Eliminar") {
        const modalInactivar = document.getElementById("modalInactivarUsuario");
        document.getElementById("modalInactivarUsuarioNombre").textContent = row
          .querySelector("h4")
          .textContent.trim();
        rowInactivar = row;
        modalInactivar.style.display = "flex";
        return;
      }
    });
  }

  // MODAL EDITAR USUARIO
  const modalEditar = document.getElementById("modalEditarUsuario");
  const closeEditar = modalEditar.querySelector(".btn-close");
  const cancelarEditar = modalEditar.querySelector(".modal-usuario-cancelar");
  const formEditar = document.getElementById("formEditarUsuario");

  closeEditar.addEventListener(
    "click",
    () => (modalEditar.style.display = "none")
  );
  cancelarEditar.addEventListener(
    "click",
    () => (modalEditar.style.display = "none")
  );
  window.addEventListener("click", (e) => {
    if (e.target === modalEditar) modalEditar.style.display = "none";
  });
  formEditar.addEventListener("submit", function (e) {
    e.preventDefault();
    modalEditar.style.display = "none";
  });

  // MODAL VER PERFIL USUARIO
  const modalVer = document.getElementById("modalVerUsuario");
  const closeVer = modalVer.querySelector(".btn-close");
  const cerrarVer = modalVer.querySelector(".modal-usuario-ver-cerrar");

  closeVer.addEventListener("click", () => (modalVer.style.display = "none"));
  cerrarVer.addEventListener("click", () => (modalVer.style.display = "none"));
  window.addEventListener("click", (e) => {
    if (e.target === modalVer) modalVer.style.display = "none";
  });

  // MODAL INACTIVAR USUARIO
  const modalInactivar = document.getElementById("modalInactivarUsuario");
  const closeInactivar = modalInactivar.querySelector(".btn-close");
  const cancelarInactivar = modalInactivar.querySelector(
    ".modal-usuario-inactivar-cancelar"
  );
  const confirmarInactivar = modalInactivar.querySelector(
    ".modal-usuario-inactivar-confirmar"
  );

  closeInactivar.addEventListener(
    "click",
    () => (modalInactivar.style.display = "none")
  );
  cancelarInactivar.addEventListener(
    "click",
    () => (modalInactivar.style.display = "none")
  );
  window.addEventListener("click", (e) => {
    if (e.target === modalInactivar) modalInactivar.style.display = "none";
  });
  confirmarInactivar.addEventListener("click", () => {
    if (rowInactivar) {
      const statusCell = rowInactivar.querySelector(".status");
      if (statusCell) {
        statusCell.className = "status inactive";
        statusCell.textContent = "Inactivo";
      }
    }
    modalInactivar.style.display = "none";
  });
});

/**
 * Configura la funcionalidad del modal para agregar/editar usuarios
 */
function setupUserModal() {
  const modal = document.getElementById("userModal");
  const btnAddUser = document.getElementById("btnAddUser");
  // Selecciona solo los botones dentro del modal de agregar usuario
  const btnCloseModal = modal ? modal.querySelector(".btn-close") : null;
  const btnCancel = modal
    ? modal.querySelector('[data-dismiss="modal"]')
    : null;
  const btnSave = document.getElementById("saveUser");

  if (!modal || !btnAddUser) return;

  const openModal = () => {
    modal.style.display = "flex";
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    modal.style.display = "none";
    document.body.style.overflow = "";
    const form = document.getElementById("userForm");
    if (form) form.reset();
  };

  btnAddUser.addEventListener("click", openModal);

  if (btnCloseModal) {
    btnCloseModal.addEventListener("click", closeModal);
  }

  if (btnCancel) {
    btnCancel.addEventListener("click", closeModal);
  }

  if (btnSave) {
    btnSave.addEventListener("click", function () {
      alert("Usuario guardado correctamente");
      closeModal();
    });
  }

  if (modal) {
    modal.addEventListener("click", function (e) {
      if (e.target === modal) {
        closeModal();
      }
    });
  }
}
