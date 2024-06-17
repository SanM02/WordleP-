// Lista de palabras para el juego
const palabras = ['PALABRA', 'JUEGO', 'PROGRAMACION', 'JAVASCRIPT', 'HTML'];

// Elige una palabra al azar para el juego
const palabra = palabras[Math.floor(Math.random() * palabras.length)];

// Crea un array para almacenar las letras adivinadas
let adivinadas = Array(palabra.length).fill('_');

// Inicia un índice para llevar la cuenta de la casilla actual
let indiceCasillaActual = 0;

// Selecciona todos los botones
let botones = document.querySelectorAll('.tecla');

// Selecciona todas las casillas
let casillas = document.querySelectorAll('.casilla');

// Función para manejar las adivinanzas
function adivinar(letra) {
    // Comprueba si la letra está en la palabra
    for (let i = 0; i < palabra.length; i++) {
        if (palabra[i] === letra) {
            adivinadas[i] = letra;
        }
    }

    // Actualiza la pantalla con las letras adivinadas
    document.querySelector('.casillas').textContent = adivinadas.join(' ');

    // Comprueba si el jugador ha ganado
    if (!adivinadas.includes('_')) {
        alert('¡Has ganado!');
    }
}

// Agrega un event listener a cada botón
botones.forEach(function(boton) {
    boton.addEventListener('click', function() {
        // Si el botón es el botón de borrar
        if (this.classList.contains('tecla-borrar')) {
            // Si hay alguna letra para borrar
            if (indiceCasillaActual > 0) {
                // Disminuye el índice de la casilla actual
                indiceCasillaActual--;

                // Borra la letra de la casilla actual
                casillas[indiceCasillaActual].textContent = '';
            }
        }
        // Si el botón es el botón Enter
        else if (this.classList.contains('tecla-enter')) {
            // Obtiene la fila de casillas activa
            const fila = Array.from(document.querySelector('.fila-activa .casilla'));

            // Llama a la función adivinar con la fila de casillas
            adivinar(fila);
        }
        // Si el botón es cualquier otro botón
        else {
            // Si aún hay casillas disponibles
            if (indiceCasillaActual < casillas.length) {
                // Inserta la letra del botón en la casilla actual
                casillas[indiceCasillaActual].textContent = this.textContent;

                // Avanza a la siguiente casilla
                indiceCasillaActual++;

                // Llama a la función adivinar con el texto del botón
                adivinar(this.textContent);
            }
        }
    });
});

// Añade un controlador de eventos de teclado al documento
document.addEventListener('keydown', function(event) {
    const key = event.key.toUpperCase(); // Obtiene la tecla presionada y la convierte a mayúsculas

    // Si la tecla presionada es "Backspace", simula un clic en el botón de borrar
    if (key === 'BACKSPACE') {
        const botonBorrar = document.querySelector('.tecla-borrar');
        if (botonBorrar) {
            botonBorrar.click();
        }
    }
    // Si la tecla presionada es cualquier otra tecla
    else {
        // Recorre todos los botones del teclado
        for (let boton of botones) {
            // Si la tecla presionada coincide con el texto del botón, simula un clic en el botón
            if (boton.textContent === key) {
                boton.click();
                break;
            }
        }
    }
});
