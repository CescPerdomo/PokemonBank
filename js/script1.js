document.addEventListener('DOMContentLoaded', function() {
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
        const cantidad = document.querySelector('input[placeholder="Cantidad a depositar"]').value.trim();
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
        const cuentaDestino = document.getElementById('numeroCuenta').value.trim(); // Obtener número de cuenta
        const cantidad = document.querySelector('input[placeholder="Cantidad a transferir"]').value.trim(); // Cambiar a un selector más específico

        // Validar que ambos campos no estén vacíos
        if (!cuentaDestino) {
            Swal.fire({
                title: 'Error',
                text: 'Por favor, ingrese un número de cuenta.',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            });
            return;
        }

        if (!cantidad) {
            Swal.fire({
                title: 'Error',
                text: 'Por favor, ingrese una cantidad.',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            });
            return;
        }

        // Verificar si la cantidad es un número válido
        if (isNaN(cantidad) || Number(cantidad) <= 0) {
            Swal.fire({
                title: 'Error',
                text: 'Por favor, ingrese una cantidad válida.',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            });
            return;
        }

        // Validar el número de cuenta (debe ser exactamente 7 dígitos)
        if (!/^\d{7}$/.test(cuentaDestino)) {
            Swal.fire({
                title: 'Error',
                text: 'El número de cuenta debe tener exactamente 7 dígitos.',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            });
            return;
        }

        // Guardar transacción
        guardarTransaccion('Transferencia', { cuentaDestino: cuentaDestino, cantidad: cantidad });
        Swal.fire({
            title: '¡Transferencia Exitosa!',
            text: 'Su transferencia ha sido procesada correctamente.',
            icon: 'success',
            confirmButtonText: 'Aceptar'
        });
    });

    // Función para manejar la recarga de saldo celular
    document.querySelector('.recharge-btn').addEventListener('click', function() {
        const numeroTelefono = document.querySelector('input[placeholder="Número de teléfono"]').value.trim();
        const cantidadRecarga = document.querySelectorAll('.form-control')[2].value.trim(); // Asumiendo que es el tercer input
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
});