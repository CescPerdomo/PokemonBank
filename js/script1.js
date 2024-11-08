// Función para guardar una transacción en localStorage
function guardarTransaccion(tipo, detalles) {
    const transacciones = JSON.parse(localStorage.getItem('transacciones')) || [];
    const nuevaTransaccion = {
        tipo: tipo,
        detalles: detalles,
        fecha: new Date().toLocaleString()
    };
    transacciones.push(nuevaTransaccion);
    localStorage.setItem('transacciones', JSON.stringify(transacciones));
}

// Función para manejar el depósito
document.querySelector('.confirm-btn').addEventListener('click', function() {
    const cantidad = document.querySelector('input[placeholder="Cantidad a depositar"]').value;
    if (cantidad) {
        guardarTransaccion('Depósito', { cantidad: cantidad });
        Swal.fire({
            title: '¡Éxito!',
            text: 'Depósito realizado con éxito.',
            icon: 'success',
            confirmButtonText: 'Aceptar'
        });
    }
});

// Función para manejar la transferencia
document.querySelector('.send-btn').addEventListener('click', function() {
    const cuentaDestino = document.querySelector('input[placeholder="Número de cuenta"]').value;
    const cantidad = document.querySelectorAll('.form-control')[1].value; // Asumiendo que es el segundo input
    if (cuentaDestino && cantidad) {
        guardarTransaccion('Transferencia', { cuentaDestino: cuentaDestino, cantidad: cantidad });
        Swal.fire({
            title: '¡Transferencia Exitosa!',
            text: 'Su transferencia ha sido procesada correctamente.',
            icon: 'success',
            confirmButtonText: 'Aceptar'
        });
    }
});

// Función para manejar la recarga de saldo celular
document.querySelector('.recharge-btn').addEventListener('click', function() {
    const numeroTelefono = document.querySelector('input[placeholder="Número de teléfono"]').value;
    const cantidadRecarga = document.querySelectorAll('.form-control')[2].value; // Asumiendo que es el tercer input
    if (numeroTelefono && cantidadRecarga) {
        guardarTransaccion('Recarga Saldo Celular', { numeroTelefono: numeroTelefono, cantidad: cantidadRecarga });
        Swal.fire({
            title: '¡Éxito!',
            text: 'Tu recarga ha sido procesada.',
            icon: 'success',
            confirmButtonText: 'Aceptar'
        });
    }
});