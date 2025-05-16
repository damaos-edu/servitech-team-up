/**
 * Funcionalidad específica para la página de gestión de publicaciones
 */

document.addEventListener("DOMContentLoaded", function () {
  setupPublicationFilters();
  setupPublicationActions();
  setupPublicationModal();

  // MODAL EDITAR PUBLICACIÓN
  const modalEditar = document.getElementById("modalEditarPublicacion");
  const closeEditar = modalEditar
    ? modalEditar.querySelector(".btn-close")
    : null;
  const cancelarEditar = modalEditar
    ? modalEditar.querySelector(".modal-publicacion-editar-cancelar")
    : null;
  const formEditar = document.getElementById("formEditarPublicacion");

  // MODAL VER PUBLICACIÓN
  const modalVer = document.getElementById("modalVerPublicacion");
  const closeVer = modalVer ? modalVer.querySelector(".btn-close") : null;
  const cerrarVer = modalVer
    ? modalVer.querySelector(".modal-publicacion-ver-cerrar")
    : null;

  // MODAL INACTIVAR PUBLICACIÓN
  const modalInactivar = document.getElementById("modalInactivarPublicacion");
  const closeInactivar = modalInactivar
    ? modalInactivar.querySelector(".btn-close")
    : null;
  const cancelarInactivar = modalInactivar
    ? modalInactivar.querySelector(".modal-publicacion-inactivar-cancelar")
    : null;
  const confirmarInactivar = modalInactivar
    ? modalInactivar.querySelector(".modal-publicacion-inactivar-confirmar")
    : null;
  let rowInactivar = null;

  // Evento para abrir la modal de nueva publicación
  const btnAddPost = document.getElementById("btnAddPost");
  const postModal = document.getElementById("postModal");
  const closePostModal = postModal
    ? postModal.querySelector(".btn-close")
    : null;
  const cancelPostModal = postModal
    ? postModal.querySelector('[data-dismiss="modal"]')
    : null;

  if (btnAddPost && postModal) {
    btnAddPost.addEventListener("click", function () {
      postModal.style.display = "flex";
    });
  }
  if (closePostModal) {
    closePostModal.addEventListener("click", function () {
      postModal.style.display = "none";
    });
  }
  if (cancelPostModal) {
    cancelPostModal.addEventListener("click", function () {
      postModal.style.display = "none";
    });
  }
  if (postModal) {
    window.addEventListener("click", function (e) {
      if (e.target === postModal) postModal.style.display = "none";
    });
  }

  // Delegación de eventos para los íconos de acción en la tabla de publicaciones
  const tbody = document.querySelector(".publicaciones-table tbody");
  if (tbody) {
    tbody.addEventListener("click", function (e) {
      const btn = e.target.closest(".btn-icon");
      if (!btn) return;
      const row = btn.closest("tr");
      if (!row) return;

      // EDITAR
      if (btn.title === "Editar") {
        document.getElementById("editarTituloPublicacion").value = row
          .querySelector(".publicaciones-table__titulo")
          .textContent.trim();
        document.getElementById("editarCategoriaPublicacion").value =
          row.children[3].textContent.trim();
        document.getElementById("editarAutorPublicacion").value = row
          .querySelector(".publicaciones-table__autor span")
          .textContent.trim();
        document.getElementById("editarPresupuestoPublicacion").value =
          row.children[5].textContent.trim().replace(/[^0-9]/g, "");
        document.getElementById("editarEstadoPublicacion").value = row
          .querySelector(".status")
          .textContent.trim();
        document.getElementById("editarFechaPublicacion").value =
          row.children[4].textContent.trim();
        modalEditar.style.display = "flex";
        return;
      }

      // VER
      if (btn.title === "Ver detalles") {
        document.getElementById("verTituloPublicacion").value = row
          .querySelector(".publicaciones-table__titulo")
          .textContent.trim();
        document.getElementById("verCategoriaPublicacion").value =
          row.children[3].textContent.trim();
        document.getElementById("verAutorPublicacion").value = row
          .querySelector(".publicaciones-table__autor span")
          .textContent.trim();
        document.getElementById("verPresupuestoPublicacion").value =
          row.children[5].textContent.trim().replace(/[^0-9]/g, "");
        document.getElementById("verEstadoPublicacion").value = row
          .querySelector(".status")
          .textContent.trim();
        document.getElementById("verFechaPublicacion").value =
          row.children[4].textContent.trim();
        document.getElementById("verContenidoPublicacion").value = ""; // Si tienes el contenido, ponlo aquí
        modalVer.style.display = "flex";
        return;
      }

      // INACTIVAR (trash)
      if (btn.title === "Eliminar") {
        document.getElementById("modalInactivarPublicacionTitulo").textContent =
          row.querySelector(".publicaciones-table__titulo").textContent.trim();
        rowInactivar = row;
        modalInactivar.style.display = "flex";
        return;
      }
    });
  }

  // Cerrar modal editar publicación
  if (closeEditar)
    closeEditar.addEventListener(
      "click",
      () => (modalEditar.style.display = "none")
    );
  if (cancelarEditar)
    cancelarEditar.addEventListener(
      "click",
      () => (modalEditar.style.display = "none")
    );
  window.addEventListener("click", (e) => {
    if (e.target === modalEditar) modalEditar.style.display = "none";
  });
  if (formEditar) {
    formEditar.addEventListener("submit", function (e) {
      e.preventDefault();
      modalEditar.style.display = "none";
    });
  }

  // Cerrar modal ver publicación
  if (closeVer)
    closeVer.addEventListener("click", () => (modalVer.style.display = "none"));
  if (cerrarVer)
    cerrarVer.addEventListener(
      "click",
      () => (modalVer.style.display = "none")
    );
  window.addEventListener("click", (e) => {
    if (e.target === modalVer) modalVer.style.display = "none";
  });

  // Cerrar modal inactivar publicación
  if (closeInactivar)
    closeInactivar.addEventListener(
      "click",
      () => (modalInactivar.style.display = "none")
    );
  if (cancelarInactivar)
    cancelarInactivar.addEventListener(
      "click",
      () => (modalInactivar.style.display = "none")
    );
  window.addEventListener("click", (e) => {
    if (e.target === modalInactivar) modalInactivar.style.display = "none";
  });
  if (confirmarInactivar) {
    confirmarInactivar.addEventListener("click", () => {
      if (rowInactivar) {
        const statusCell = rowInactivar.querySelector(".status");
        if (statusCell) {
          statusCell.className = "status inactive";
          statusCell.textContent = "Inactiva";
        }
      }
      modalInactivar.style.display = "none";
    });
  }
});

/**
 * Configura los filtros para la lista de publicaciones
 */
function setupPublicationFilters() {
  const filterForm = document.getElementById("publicationFilterForm");

  if (filterForm) {
    filterForm.addEventListener("submit", function (e) {
      e.preventDefault();
      console.log("Filtros de publicaciones aplicados");
    });
  }

  const resetFilters = document.getElementById("resetFilters");
  if (resetFilters) {
    resetFilters.addEventListener("click", function () {
      if (filterForm) filterForm.reset();
      console.log("Filtros de publicaciones reseteados");
    });
  }
}

/**
 * Configura las acciones para la gestión de publicaciones
 */
function setupPublicationActions() {
  setupActionButtons("approve-publication", function (publicationId, button) {
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
    button.disabled = true;

    setTimeout(() => {
      button.innerHTML = '<i class="fas fa-check"></i> Aprobada';
      button.classList.remove("btn-warning");
      button.classList.add("btn-success");
      button.disabled = true;

      const statusCell = button.closest("tr").querySelector(".status");
      if (statusCell) {
        statusCell.innerHTML = '<span class="status active">Aprobada</span>';
      }

      console.log(`Publicación aprobada: ${publicationId}`);
    }, 1000);
  });

  setupActionButtons("reject-publication", function (publicationId, button) {
    if (confirm("¿Estás seguro de que deseas rechazar esta publicación?")) {
      button.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
      button.disabled = true;

      setTimeout(() => {
        button.innerHTML = '<i class="fas fa-times"></i> Rechazada';
        button.classList.remove("btn-warning");
        button.classList.add("btn-danger");
        button.disabled = true;

        const statusCell = button.closest("tr").querySelector(".status");
        if (statusCell) {
          statusCell.innerHTML =
            '<span class="status inactive">Rechazada</span>';
        }

        console.log(`Publicación rechazada: ${publicationId}`);
      }, 1000);
    }
  });

  setupActionButtons("view-publication", function (publicationId) {
    console.log(`Ver publicación ID: ${publicationId}`);
  });

  setupActionButtons("delete-publication", function (publicationId) {
    if (
      confirm(
        "¿Estás seguro de que deseas eliminar esta publicación? Esta acción no se puede deshacer."
      )
    ) {
      console.log(`Publicación eliminada: ${publicationId}`);
    }
  });
}

/**
 * Configura los botones de acción según su clase y función
 */
function setupActionButtons(className, callback) {
  const buttons = document.querySelectorAll(`.${className}`);
  buttons.forEach((button) => {
    button.addEventListener("click", function () {
      const publicationId = this.getAttribute("data-id");
      callback(publicationId, this);
    });
  });
}

/**
 * Configura el modal para ver/editar publicación
 */
function setupPublicationModal() {
  const modal = document.getElementById("publicationModal");
  const closeButtons = modal
    ? modal.querySelectorAll('.close-modal, .btn-close, [data-dismiss="modal"]')
    : [];

  if (!modal) return;

  const openModal = (publicationId = null) => {
    if (publicationId) {
      console.log(`Cargando publicación ID: ${publicationId}`);
    }

    modal.style.display = "flex";
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    modal.style.display = "none";
    document.body.style.overflow = "";
    const form = modal.querySelector("form");
    if (form) form.reset();
  };

  const openButtons = document.querySelectorAll(".open-publication-modal");
  openButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const publicationId = this.getAttribute("data-id");
      openModal(publicationId);
    });
  });

  closeButtons.forEach((button) => {
    button.addEventListener("click", closeModal);
  });

  modal.addEventListener("click", function (e) {
    if (e.target === modal) {
      closeModal();
    }
  });
}
