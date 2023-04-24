// VARIABLES // 
const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
let tweets = [];

// EVENT LISTENERS //
eventListeners();

function eventListeners() {
    // Cuando el usuario agrega un nuevo tweets //
    formulario.addEventListener('submit', agregarTweets);

    // Cuando el documento este listo // 
    document.addEventListener('DOMContentLoaded', () => {
        tweets = JSON.parse( localStorage.getItem('tweets')) || [];
        crearHTML();
    })
}



// FUNCIONES 
function agregarTweets(e) {
    e.preventDefault();

    // TextArea donde el usuario escribe // 
    const tweet = document.querySelector('#tweet').value

    // Validacion...
    if(tweet === '') {
        mostrarError('Un mensaje no puede ir vacio')

        return; /* Evita que se ejecuten man lineas de codigo */
    }
    
    const tweetObj = {
        id: Date.now(),
        tweet /* Equivalente a tweet : tweet */
    }

    // Añadir al arreglo //
    tweets = [...tweets, tweetObj]

    // Una vez agregado crear el HTML // 
    crearHTML()

    // Reiniciar el formulario // 
    formulario.reset()
}

// Mostrar mensaje de error //

function mostrarError(error) {
    const mensajeError = document.createElement('p');
    mensajeError.classList.add('error');
    mensajeError.textContent = error;

    // Insertar en el contenido //
    const contenido = document.querySelector('#contenido')
    contenido.appendChild(mensajeError);

    // Elimina la alerta despues de 3 segundos //
    setTimeout(() => {
        mensajeError.remove()
    }, 3000);
}

// Muestra un listado de todos los tweets // 
function crearHTML() {
    
    limpiarHTML() 

    if( tweets.length > 0 ) {
        tweets.forEach( tweet => {
            // Agregar un boton de eliminar 
            const btnEliminar = document.createElement('a');
            btnEliminar.classList.add('borrar-tweet');
            btnEliminar.innerText = 'X'

            // Añadir la funcion de eliminar 
            btnEliminar.onclick = () => {
                borrarTweet(tweet.id)
            }

            // Crear el HTML
            const li = document.createElement('li')

            // añadir el text 
            li.innerText = tweet.tweet

            // Asignar el boton 
            li.appendChild(btnEliminar)

            // Insertar en el HTML 
            listaTweets.appendChild(li)
        });
    }

    sincronizarStorage()
}

// Agregar los tweets actuales //
function sincronizarStorage() {
    localStorage.setItem('tweets', JSON.stringify(tweets))
}

// Borrar un tweet // 
function borrarTweet(id) {
    tweets = tweets.filter( tweet => tweet.id !== id);
    crearHTML()
}

// Limpiar el HTML //
function limpiarHTML() {
    while( listaTweets.firstChild ){
        listaTweets.removeChild(listaTweets.firstChild);
    }
}