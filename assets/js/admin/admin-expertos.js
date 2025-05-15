/**
 * Funcionalidad específica para la página de gestión de expertos
 */

document.addEventListener("DOMContentLoaded", function () {
  setupExpertModal();
  setupExpertFilters();
  setupExpertActions();
  setupExpertVerification();
});

/**
 * Configura la funcionalidad del modal para agregar/editar expertos
 */
function setupExpertModal() {
  const modal = document.getElementById("expertModal");
  const btnAddExpert = document.getElementById("btnAddExpert");
  const btnCloseModal = modal ? modal.querySelector(".btn-close") : null;
  const btnCancel = modal
    ? modal.querySelector('[data-dismiss="modal"]')
    : null;

  if (!modal || !btnAddExpert) return;

  const openModal = () => {
    modal.style.display = "flex";
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    modal.style.display = "none";
    document.body.style.overflow = "";
    const form = document.getElementById("expertForm");
    if (form) form.reset();
  };

  btnAddExpert.addEventListener("click", openModal);

  if (btnCloseModal) {
    btnCloseModal.addEventListener("click", closeModal);
  }

  if (btnCancel) {
    btnCancel.addEventListener("click", closeModal);
  }

  if (modal) {
    modal.addEventListener("click", function (e) {
      if (e.target === modal) {
        closeModal();
      }
    });
  }
}

/* editar experto */
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("editarExperto");
  const closeBtn = modal.querySelector(".btn-close");
  const cancelBtn = modal.querySelector(".modal-editar-cancelar");

  const nombreInput = document.getElementById("nombreExperto");
  const correoInput = document.getElementById("correoExperto");
  const especialidadInput = document.getElementById("especialidadExperto");
  const estadoSelect = document.getElementById("estadoExperto");
  const fechaRegistroInput = document.getElementById("fechaRegistroExperto");
  const sesionesInput = document.getElementById("sesionesExperto");
  const calificacionInput = document.getElementById("calificacionExperto");

  // Abrir modal con datos del experto
  document.querySelectorAll(".edit-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const row = button.closest("tr");
      const nombre = row.querySelector("h4").textContent.trim();
      const correo = row.querySelector("span").textContent.trim();
      const especialidad = row.children[2].textContent.trim();
      const estado = row.querySelector(".status").textContent.trim();
      const fechaRegistro = row.querySelector("td").textContent.trim();

      nombreInput.value = nombre;
      correoInput.value = correo;
      especialidadInput.value = especialidad;
      estadoSelect.value = estado;
      fechaRegistroInput.value = fechaRegistro;
      sesionesInput.value = row.children[4].textContent.trim();
      calificacionInput.value = row.children[5].textContent.trim();

      modal.style.display = "flex";
    });
  });

  // Cerrar modal con la X
  closeBtn.addEventListener("click", () => (modal.style.display = "none"));

  // Cerrar modal con el botón cancelar
  if (cancelBtn) {
    cancelBtn.addEventListener("click", () => (modal.style.display = "none"));
  }

  // Cerrar modal al hacer click fuera del contenido
  window.addEventListener("click", (e) => {
    if (e.target === modal) modal.style.display = "none";
  });

  // Evento para guardar
  document
    .getElementById("formEditarExperto")
    .addEventListener("submit", (e) => {
      e.preventDefault();
      modal.style.display = "none";
    });
});

document.addEventListener("DOMContentLoaded", () => {
  // Modal ver perfil experto
  const modalVer = document.getElementById("verPerfilExperto");
  const closeBtnVer = modalVer ? modalVer.querySelector(".btn-close") : null;
  const cerrarBtnVer = modalVer
    ? modalVer.querySelector(".modal-ver-cerrar")
    : null;

  const verNombreInput = document.getElementById("verNombreExperto");
  const verCorreoInput = document.getElementById("verCorreoExperto");
  const verEspecialidadInput = document.getElementById(
    "verEspecialidadExperto"
  );
  const verEstadoInput = document.getElementById("verEstadoExperto");
  const verFechaRegistroInput = document.getElementById(
    "verFechaRegistroExperto"
  );
  const verSesionesInput = document.getElementById("verSesionesExperto");
  const verCalificacionInput = document.getElementById(
    "verCalificacionExperto"
  );

  document
    .querySelectorAll(".btn-icon[title='Ver perfil']")
    .forEach((button) => {
      button.addEventListener("click", () => {
        const row = button.closest("tr");
        verNombreInput.value = row.querySelector("h4").textContent.trim();
        verCorreoInput.value = row.querySelector("span").textContent.trim();
        verEspecialidadInput.value = row.children[2].textContent.trim();
        verEstadoInput.value = row.querySelector(".status").textContent.trim();
        verFechaRegistroInput.value = row
          .querySelector("td")
          .textContent.trim();
        verSesionesInput.value = row.children[4].textContent.trim();
        verCalificacionInput.value = row.children[5].textContent.trim();

        modalVer.style.display = "flex";
      });
    });

  if (closeBtnVer) {
    closeBtnVer.addEventListener(
      "click",
      () => (modalVer.style.display = "none")
    );
  }
  if (cerrarBtnVer) {
    cerrarBtnVer.addEventListener(
      "click",
      () => (modalVer.style.display = "none")
    );
  }
  if (modalVer) {
    window.addEventListener("click", (e) => {
      if (e.target === modalVer) modalVer.style.display = "none";
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  // Modal inactivar experto
  const modalInactivar = document.getElementById("modalInactivarExperto");
  const closeBtnInactivar = modalInactivar
    ? modalInactivar.querySelector(".btn-close")
    : null;
  const cancelarBtnInactivar = modalInactivar
    ? modalInactivar.querySelector(".modal-inactivar-cancelar")
    : null;
  const confirmarBtnInactivar = modalInactivar
    ? modalInactivar.querySelector(".modal-inactivar-confirmar")
    : null;
  const nombreInactivar = document.getElementById(
    "modalInactivarExpertoNombre"
  );
  let rowToInactivate = null;

  document.querySelectorAll(".btn-icon[title='Eliminar']").forEach((button) => {
    button.addEventListener("click", () => {
      rowToInactivate = button.closest("tr");
      const nombre = rowToInactivate.querySelector("h4").textContent.trim();
      nombreInactivar.textContent = nombre;
      modalInactivar.style.display = "flex";
    });
  });

  if (closeBtnInactivar) {
    closeBtnInactivar.addEventListener(
      "click",
      () => (modalInactivar.style.display = "none")
    );
  }
  if (cancelarBtnInactivar) {
    cancelarBtnInactivar.addEventListener(
      "click",
      () => (modalInactivar.style.display = "none")
    );
  }
  if (modalInactivar) {
    window.addEventListener("click", (e) => {
      if (e.target === modalInactivar) modalInactivar.style.display = "none";
    });
  }
  if (confirmarBtnInactivar) {
    confirmarBtnInactivar.addEventListener("click", () => {
      if (rowToInactivate) {
        // Cambia el estado visualmente a inactivo
        const statusCell = rowToInactivate.querySelector(".status");
        if (statusCell) {
          statusCell.className = "status inactive";
          statusCell.textContent = "Inactivo";
        }
      }
      modalInactivar.style.display = "none";
    });
  }
});

/**
 * Configura los filtros para la lista de expertos
 */
function setupExpertFilters() {
  const filterForm = document.getElementById("expertFilterForm");

  if (filterForm) {
    filterForm.addEventListener("submit", function (e) {
      e.preventDefault();
      console.log("Filtros aplicados");
    });
  }

  const resetFilters = document.getElementById("resetFilters");
  if (resetFilters) {
    resetFilters.addEventListener("click", function () {
      filterForm.reset();
      console.log("Filtros reseteados");
    });
  }
}

/**
 * Configura las acciones para la gestión de expertos
 */
function setupExpertActions() {
  const editButtons = document.querySelectorAll(".expert-edit");
  editButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const expertId = this.getAttribute("data-id");
      console.log(`Editar experto ID: ${expertId}`);
    });
  });

  const deleteButtons = document.querySelectorAll(".expert-delete");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const expertId = this.getAttribute("data-id");
      const expertName = this.getAttribute("data-name");

      if (
        confirm(
          `¿Estás seguro de que deseas eliminar al experto "${expertName}"?`
        )
      ) {
        console.log(`Experto eliminado: ${expertName}`);
      }
    });
  });

  const viewButtons = document.querySelectorAll(".expert-view");
  viewButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const expertId = this.getAttribute("data-id");
      console.log(`Ver perfil del experto ID: ${expertId}`);
    });
  });
}

/**
 * Configura la funcionalidad para verificar expertos
 */
function setupExpertVerification() {
  const verifyButtons = document.querySelectorAll(".verify-expert");

  verifyButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const expertId = this.getAttribute("data-id");
      const expertName = this.getAttribute("data-name");

      this.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
      this.disabled = true;

      setTimeout(() => {
        this.innerHTML = '<i class="fas fa-check-circle"></i> Verificado';
        this.classList.remove("btn-warning");
        this.classList.add("btn-success");

        const statusCell = this.closest("tr").querySelector(".status");
        if (statusCell) {
          statusCell.innerHTML =
            '<span class="status verified">Verificado</span>';
        }

        console.log(`Experto verificado: ${expertName}`);
      }, 1500);
    });
  });
}
