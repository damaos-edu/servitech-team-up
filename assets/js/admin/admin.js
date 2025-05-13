/**
 * Funcionalidad específica para la página principal del panel de administración (dashboard)
 */

document.addEventListener('DOMContentLoaded', function() {
    initializeCharts();
});

/**
 * Inicializa y configura los gráficos del dashboard
 */
function initializeCharts() {
    Chart.defaults.color = '#a0a0a0';
    Chart.defaults.borderColor = 'rgba(255, 255, 255, 0.1)';
    
    initializeUserTrendChart();
    initializeCategoryChart();
}

/**
 * Inicializa el gráfico de tendencia de usuarios
 */
function initializeUserTrendChart() {
    const userTrendCtx = document.getElementById('userTrendChart');
    
    if (!userTrendCtx) return;
    
    const userTrendChart = new Chart(userTrendCtx.getContext('2d'), {
        type: 'line',
        data: {
            labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
            datasets: [
                {
                    label: 'Usuarios',
                    data: [650, 750, 950, 1100, 1250, 1350, 1450, 1550, 1650, 1300, 1400, 1493],
                    borderColor: '#3a8eff',
                    backgroundColor: 'rgba(58, 142, 255, 0.1)',
                    tension: 0.4,
                    fill: true
                },
                {
                    label: 'Expertos',
                    data: [25, 38, 45, 56, 62, 70, 85, 90, 100, 110, 120, 128],
                    borderColor: '#12d8fa',
                    backgroundColor: 'rgba(18, 216, 250, 0.1)',
                    tension: 0.4,
                    fill: true
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                    align: 'end',
                    labels: {
                        boxWidth: 12,
                        usePointStyle: true,
                        pointStyle: 'circle',
                        padding: 20,
                        color: '#a0a0a0'
                    }
                },
                tooltip: {
                    backgroundColor: '#1c2333',
                    titleColor: '#f5f5f5',
                    bodyColor: '#a0a0a0',
                    borderColor: '#2b3245',
                    borderWidth: 1,
                    padding: 10,
                    cornerRadius: 6,
                    displayColors: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(255, 255, 255, 0.05)'
                    },
                    ticks: {
                        color: '#a0a0a0',
                        padding: 10
                    }
                },
                x: {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.05)',
                        display: false
                    },
                    ticks: {
                        color: '#a0a0a0',
                        padding: 10
                    }
                }
            }
        }
    });
}

/**
 * Inicializa el gráfico de distribución por categoría
 */
function initializeCategoryChart() {
    const categoryCtx = document.getElementById('categoryChart');
    
    if (!categoryCtx) return;
    
    const categoryChart = new Chart(categoryCtx.getContext('2d'), {
        type: 'doughnut',
        data: {
            labels: ['Desarrollo Web', 'UX/UI', 'DevOps', 'Mobile', 'Data Science', 'Blockchain', 'Cloud'],
            datasets: [{
                data: [32, 18, 14, 16, 20, 12, 16],
                backgroundColor: [
                    '#3a8eff',
                    '#12d8fa',
                    '#28a745',
                    '#ffc107',
                    '#dc3545',
                    '#00cfe8',
                    '#fd7e14'
                ],
                borderWidth: 0,
                borderRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        color: '#a0a0a0',
                        padding: 15,
                        usePointStyle: true,
                        pointStyle: 'circle'
                    }
                },
                tooltip: {
                    backgroundColor: '#1c2333',
                    titleColor: '#f5f5f5',
                    bodyColor: '#a0a0a0',
                    borderColor: '#2b3245',
                    borderWidth: 1,
                    padding: 10,
                    cornerRadius: 6,
                    displayColors: false
                }
            },
            cutout: '70%'
        }
    });
}