document.addEventListener('DOMContentLoaded', () => {

    // Seleccionar los elementos de la interfaz // 
    const inputEmail = document.querySelector('#email');
    const inputAsunto = document.querySelector('#asunto');
    const inputMensaje = document.querySelector('#mensaje');
    const formulario = document.querySelector('#formulario');

    // Asignar evento // 

    inputEmail.addEventListener('blur', validar);
    inputAsunto.addEventListener('blur', validar);
    inputMensaje.addEventListener('blur', validar);

    function validar(e) {
        if(e.target.value.trim() === '') {
            mostrarAlerta(`El campo ${e.target.id} es obligatorio`, e.target.parentElement);
            return;
        } 

        console.log('despues del if')

    }

    function mostrarAlerta(mensaje, referencia) {

        // Comprueba si ya existe una alerta // 

        const alerta = referencia.querySelector('.bg-red-600');
        if(alerta){
            alert.remove();
        }


        // Generar alerta en HTML //
        const error = document.createElement('P');
        error.textContent = mensaje;
        error.classList.add('bg-red-600', 'text-white', 'p-2', 'text-center');
    
        // Inyectar el error al formulario // 
        referencia.appendChild(error);
    
    
    
    }






})