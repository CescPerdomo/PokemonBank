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
        const cantidad = document.querySelector('input[placeholder="Cantidad a transferir"]').value.trim(); // selector más específico

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

    // Funcion para manejar la consulta de saldos
    document.getElementById('consultar-saldo').addEventListener('click', function() {
        const saldo = 500;
        document.getElementById('saldo-actual').textContent = `$${saldo}`;
        
        const transaccion = {
            tipo: 'Consulta de saldo',
            monto: saldo,
            fecha: new Date().toISOString()
        };
        
        let transacciones = JSON.parse(localStorage.getItem('transacciones')) || [];
        transacciones.push(transaccion);
        localStorage.setItem('transacciones', JSON.stringify(transacciones));
    });



    // Funcion para manejar los retiros
    document.querySelector('#retirarPopup .withdraw-btn').addEventListener('click', function(e) {
        e.preventDefault();
        const cantidad = document.querySelector('[name="cantidadRetiro"]').value;
        
        if (!cantidad || cantidad <= 0) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Por favor ingrese una cantidad válida'
            });
            return;
        }

        const transaccion = {
            tipo: 'Retiro',
            cantidad: cantidad,
            fecha: new Date().toISOString(),
            id: Date.now()
        };

        let transacciones = JSON.parse(localStorage.getItem('transacciones')) || [];
        transacciones.push(transaccion);
        localStorage.setItem('transacciones', JSON.stringify(transacciones));

        Swal.fire({
            icon: 'success',
            title: '¡Retiro Exitoso!',
            text: `Has retirado $${cantidad} de tu cuenta`,
            showConfirmButton: true
        }).then(() => {
            document.querySelector('[name="cantidadRetiro"]').value = '';
            window.location.href = '#';
        });
    });


    // Funcion para manejar recarga Poke $
    document.querySelector('.add-btn').addEventListener('click', function() {
        const amount = document.querySelector('input[placeholder="Cantidad de Poké $"]').value.trim();
        if (amount) {
            guardarTransaccion('Recarga Poké $', { cantidad: amount });
            Swal.fire({
                title: '¡Éxito!',
                text: 'Recarga de Poké $ realizada con éxito.',
                icon: 'success',
                confirmButtonText: 'Aceptar'
            });
        }
    });


    // Función para manejar la recarga de saldo celular
    document.querySelector('.recharge-btn').addEventListener('click', function() {
        const numeroTelefono = document.querySelector('input[placeholder="Número de teléfono"]').value.trim();
        const cantidadRecarga = document.querySelectorAll('.form-control')[2].value.trim(); 
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

    // Funcion para manejar cambio de PIN
    document.querySelector('#cambiarPinPopup .confirm-btn').addEventListener('click', function() {
        const pinActual = document.querySelector('input[placeholder="PIN actual"]').value;
        const pinNuevo = document.querySelector('input[placeholder="Nuevo PIN"]').value;
        const pinConfirmar = document.querySelector('input[placeholder="Confirmar nuevo PIN"]').value;

        if (!pinActual || !pinNuevo || !pinConfirmar) {
            Swal.fire('Error', 'Todos los campos son requeridos', 'error');
            return;
        }

        if (pinNuevo !== pinConfirmar) {
            Swal.fire('Error', 'Los PINs nuevos no coinciden', 'error');
            return;
        }

        const pinAlmacenado = localStorage.getItem('pin') || '1234';
        
        if (pinActual !== pinAlmacenado) {
            Swal.fire('Error', 'PIN actual incorrecto', 'error');
            return;
        }

        localStorage.setItem('pin', pinNuevo);

        const transaccion = {
            tipo: 'CAMBIO_PIN',
            fecha: new Date().toISOString(),
            detalles: 'Cambio de PIN realizado'
        };

        let transacciones = JSON.parse(localStorage.getItem('transacciones') || '[]');
        transacciones.push(transaccion);
        localStorage.setItem('transacciones', JSON.stringify(transacciones));

        window.location.href = '#cambioPinExitosoPopup';
    });

    // Funcion que maneja la parte de pagar servicios
    document.getElementById('confirmPayment').addEventListener('click', function(e) {
        e.preventDefault();
        
        const datosServicio = {
            nombreTarjeta: document.getElementById('cardName').value,
            numeroTarjeta: document.getElementById('cardNumber').value,
            mesExpiracion: document.getElementById('expMonth').value,
            anioExpiracion: document.getElementById('expYear').value,
            cvv: document.getElementById('cvv').value,
            fecha: new Date().toISOString()
        };

        let servicios = JSON.parse(localStorage.getItem('servicios')) || [];
        servicios.push(datosServicio);
        localStorage.setItem('servicios', JSON.stringify(servicios));

            document.getElementById('paymentSuccessPopup').style.display = 'block';
        });
    });