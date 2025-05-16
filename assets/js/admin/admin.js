/**
 * Funcionalidad específica para la página principal del panel de administración (dashboard)
 */

document.addEventListener("DOMContentLoaded", function () {
  initializeCharts();

  // Modal Dashboard - Detalle de novedad
  function openDashboardModal(row) {
    const modal = document.getElementById("dashboardModal");
    const form = modal ? modal.querySelector("#dashboardModalForm") : null;
    if (!modal || !form || !row) return;

    // Obtiene los th (títulos de columna) y los td (datos de la fila)
    const table = row.closest("table");
    const ths = table ? table.querySelectorAll("thead th") : [];
    const tds = row.querySelectorAll("td");

    // Construye los campos, omitiendo la columna "Acciones"
    let html = "";
    for (let i = 0; i < Math.min(ths.length, tds.length); i++) {
      const label = ths[i].innerText.trim();
      if (label.toLowerCase().includes("acciones")) continue;
      const value = tds[i].innerText.trim();
      html += `
                <div class="modal-publicacion__group">
                    <label class="modal-publicacion__label">${label}</label>
                    <input type="text" class="modal-publicacion__input" value="${value}" disabled>
                </div>
            `;
    }
    form.innerHTML = html;
    modal.style.display = "flex";
    document.body.style.overflow = "hidden";
  }

  // Delegación para los íconos de ojo en la tabla inferior
  document.querySelectorAll(".dashboard-view-btn").forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      const row = btn.closest("tr");
      openDashboardModal(row);
    });
  });

  // Cerrar modal con botón "Cerrar" o X
  function closeDashboardModal() {
    const modal = document.getElementById("dashboardModal");
    if (modal) {
      modal.style.display = "none";
      document.body.style.overflow = "";
    }
  }
  document
    .getElementById("dashboardModalCloseBtn")
    ?.addEventListener("click", closeDashboardModal);
  document
    .getElementById("dashboardModalClose")
    ?.addEventListener("click", closeDashboardModal);

  // Cerrar modal al hacer click fuera del contenido
  document
    .getElementById("dashboardModal")
    ?.addEventListener("click", function (e) {
      if (e.target === this) closeDashboardModal();
    });

  // Botón "Ver la novedad"
  document
    .getElementById("dashboardModalViewBtn")
    ?.addEventListener("click", function () {
      alert("Acción: Ver la novedad");
      // Aquí puedes redirigir o mostrar más información si lo deseas
    });
});

/**
 * Inicializa y configura los gráficos del dashboard
 */
function initializeCharts() {
  Chart.defaults.color = "#a0a0a0";
  Chart.defaults.borderColor = "rgba(255, 255, 255, 0.1)";

  initializeUserTrendChart();
  initializeCategoryChart();
}

/**
 * Inicializa el gráfico de tendencia de usuarios
 */
function initializeUserTrendChart() {
  const userTrendCtx = document.getElementById("userTrendChart");

  if (!userTrendCtx) return;

  const userTrendChart = new Chart(userTrendCtx.getContext("2d"), {
    type: "line",
    data: {
      labels: [
        "Ene",
        "Feb",
        "Mar",
        "Abr",
        "May",
        "Jun",
        "Jul",
        "Ago",
        "Sep",
        "Oct",
        "Nov",
        "Dic",
      ],
      datasets: [
        {
          label: "Usuarios",
          data: [
            650, 750, 950, 1100, 1250, 1350, 1450, 1550, 1650, 1300, 1400, 1493,
          ],
          borderColor: "#3a8eff",
          backgroundColor: "rgba(58, 142, 255, 0.1)",
          tension: 0.4,
          fill: true,
        },
        {
          label: "Expertos",
          data: [25, 38, 45, 56, 62, 70, 85, 90, 100, 110, 120, 128],
          borderColor: "#12d8fa",
          backgroundColor: "rgba(18, 216, 250, 0.1)",
          tension: 0.4,
          fill: true,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "top",
          align: "end",
          labels: {
            boxWidth: 12,
            usePointStyle: true,
            pointStyle: "circle",
            padding: 20,
            color: "#a0a0a0",
          },
        },
        tooltip: {
          backgroundColor: "#1c2333",
          titleColor: "#f5f5f5",
          bodyColor: "#a0a0a0",
          borderColor: "#2b3245",
          borderWidth: 1,
          padding: 10,
          cornerRadius: 6,
          displayColors: false,
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: {
            color: "rgba(255, 255, 255, 0.05)",
          },
          ticks: {
            color: "#a0a0a0",
            padding: 10,
          },
        },
        x: {
          grid: {
            color: "rgba(255, 255, 255, 0.05)",
            display: false,
          },
          ticks: {
            color: "#a0a0a0",
            padding: 10,
          },
        },
      },
    },
  });
}

/**
 * Inicializa el gráfico de distribución por categoría
 */
function initializeCategoryChart() {
  const categoryCtx = document.getElementById("categoryChart");

  if (!categoryCtx) return;

  const categoryChart = new Chart(categoryCtx.getContext("2d"), {
    type: "doughnut",
    data: {
      labels: [
        "Desarrollo Web",
        "UX/UI",
        "DevOps",
        "Mobile",
        "Data Science",
        "Blockchain",
        "Cloud",
      ],
      datasets: [
        {
          data: [32, 18, 14, 16, 20, 12, 16],
          backgroundColor: [
            "#3a8eff",
            "#12d8fa",
            "#28a745",
            "#ffc107",
            "#dc3545",
            "#00cfe8",
            "#fd7e14",
          ],
          borderWidth: 0,
          borderRadius: 6,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "bottom",
          labels: {
            color: "#a0a0a0",
            padding: 15,
            usePointStyle: true,
            pointStyle: "circle",
          },
        },
        tooltip: {
          backgroundColor: "#1c2333",
          titleColor: "#f5f5f5",
          bodyColor: "#a0a0a0",
          borderColor: "#2b3245",
          borderWidth: 1,
          padding: 10,
          cornerRadius: 6,
          displayColors: false,
        },
      },
      cutout: "70%",
    },
  });
}
