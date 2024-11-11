document.addEventListener('DOMContentLoaded', function() {
    const ctx = document.createElement('canvas');
    document.querySelector('.main-chart').appendChild(ctx);

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Agosto', 'Septiembre', 'Octubre', 'Noviembre'],
            datasets: [{
                label: 'Detalle de Transacciones',
                data: [60, 80, 45, 30],
                backgroundColor: [
                    '#FF6B6B',
                    '#4ECDC4',
                    '#45B7D1',
                    '#96CEB4'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100
                }
            }
        }
    });
});