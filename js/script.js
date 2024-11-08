// Definimos el usuario, el PIN y el número de cuenta correctos
const correctUsername = "Ash Ketchum";
const correctPin = "1234";
const accountNumber = "0987654321";

// Función que se ejecuta al hacer clic en el botón de inicio de sesión
function login() {
    // Obtenemos los valores ingresados por el usuario
    const usernameInput = document.getElementById("username").value;
    const pinInput = document.getElementById("pin").value;

    // Validación utilizando Validate.js
    const constraints = {
        username: {
            presence: true,
        },
        pin: {
            presence: true,
            length: {
                is: 4
            }
        }
    };

    const validationResult = validate({ username: usernameInput, pin: pinInput }, constraints);
    
    if (validationResult) {
        // Si hay errores de validación, mostramos un mensaje de error
        Swal.fire({
            icon: 'error',
            title: 'Error de Validación',
            text: validationResult.map(err => `${err.attribute} ${err.message}`).join(', ')
        });
        return;
    }

    // Verificamos si el usuario y el PIN son correctos
    if (usernameInput === correctUsername && pinInput === correctPin) {
        // Creamos un objeto con la información del usuario
        const userInfo = {
            username: usernameInput,
            pin: pinInput,
            account: accountNumber
        };

        // Guardamos la información en local storage como un objeto JSON
        localStorage.setItem("userInfo", JSON.stringify(userInfo));
        
        // Mostramos un mensaje de éxito utilizando SweetAlert
        Swal.fire({
            icon: 'success',
            title: 'PIN ingresado correctamente',
            text: `Bienvenido ${correctUsername}. Cuenta N° ${accountNumber}`,
            confirmButtonText: 'Continuar'
        }).then((result) => {
            if (result.isConfirmed) {
                // Redirigimos a otra página si el usuario confirma
                window.location.href = "PokemonBank_Cajero.html"; 
            }
        });

    } else {
        // Mostramos un mensaje de error si el PIN es incorrecto
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'PIN incorrecto'
        });
    }
}

// Añadimos un evento al botón para que ejecute la función login al hacer clic
document.querySelector(".btn-primary").addEventListener("click", login);