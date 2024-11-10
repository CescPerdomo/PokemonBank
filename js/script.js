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

//interaccion con el usuario
function toggleChat() {
    const messages = document.getElementById('chatMessages');
    messages.style.display = messages.style.display === 'none' ? 'block' : 'none';
}

function sendMessage() {
    const input = document.getElementById('userInput');
    const message = input.value.trim();
    
    if (message) {
        addMessage(message, 'user-message');
        input.value = '';
        
        // Bot response
        setTimeout(() => {
            if (message.toLowerCase().includes('pin')) {
                addMessage('Para ingresar tu PIN, simplemente escribe los 4 números en el campo correspondiente. ¿Necesitas más ayuda?', 'bot-message');
                addMessage('Sigues ahi?');
                addMessage('Podrias brindarnos un numero de telefono para orientarte mejor');
            } else {
                addMessage('¡Hola! Soy Pikachu ¿En qué puedo ayudarte? Si necesitas ayuda con tu PIN, solo pregúntame.', 'bot-message');
            }
        }, 1000);
    }
}

function addMessage(text, className) {
    const messages = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${className}`;
    messageDiv.textContent = text;
    messages.appendChild(messageDiv);
    messages.scrollTop = messages.scrollHeight;
}

// Initial bot message
window.onload = function() {
    setTimeout(() => {
        addMessage('¡Hola! ¿Necesitas ayuda para ingresar tu PIN?', 'bot-message');
    }, 1000);
    // Add possible responses
    setTimeout(() => {
        const responses = [
            "¿Te gustaría saber más sobre nuestros servicios?",
            "¿Es tu primera vez usando PokemonBank?",
            "¿Puedo ayudarte con algo más?",
            "Si tienes dudas sobre el PIN, estoy aquí para ayudarte"
        ];
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        addMessage(randomResponse, 'bot-message');
    }, 3000);

    // Add Enter key support
    document.getElementById('userInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
};

// Añadimos un evento al botón para que ejecute la función login al hacer clic
document.querySelector(".btn-primary").addEventListener("click", login);

