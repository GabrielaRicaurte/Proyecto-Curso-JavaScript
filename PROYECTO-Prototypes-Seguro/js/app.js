// Constructores //

function Seguro(marca, year, tipo) {
    this.marca = marca;
    this.year = year;
    this.tipo = tipo;
}

// Realiza la cotuizacion de los datos //
Seguro.prototype.cotizarSeguro = function() {
    /* 
        1 = Americano 1.15
        2 = Asiatico 1.05
        3 = Europeo 1.35
    */
    let cantidad;
    const base = 2000;

    switch (this.marca) {

        case '1':
            cantidad = base * 1.15;
            break;
        case '2':
            cantidad = base * 1.05;
            break;
        case '3':
            cantidad = base * 1.35;
            break;

        default:
            break;
    }

    // Leer el año //
    const diferencia = new Date().getFullYear() - this.year;

    /* Cada año que la diferencia es mayor, el costo va a reducirse un 3% */
    cantidad -= ((diferencia * 3) * cantidad ) / 100

    /*
        Si el seguro es basico se multiplica por un 30% mas
        Si el seguro es completo se multiplica por un 50% mas
    */

    if(this.tipo === 'basico') {
        cantidad *= 1.30;
    } else {
        cantidad *= 1.50
    }
    

    return cantidad;

}


function UI() {}

// Llenar las opciones de los años //
UI.prototype.llenarOpciones = () => { /* Se hara uso de la arrow function ya que no se hará uso del this.*/
    const max = new Date().getFullYear(),
            min = max - 20;

    const selectYear = document.querySelector('#year');

    for(let i = max; i > min; i--) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        selectYear.appendChild(option);
    }
}

// Muestra alertas en pantallas // 
UI.prototype.mostrarMensaje = (mensaje, tipo) => {
    const div = document.createElement('DIV');
    if( tipo === 'error') {
        div.classList.add('error');
    }
    else{ 
        div.classList.add('correcto');
    }

    div.classList.add('mensaje','mt-10')
    div.textContent = mensaje;

    // Insertar en el HTML //
    const formulario = document.querySelector('#cotizar-seguro');
    formulario.insertBefore(div, document.querySelector('#resultado'))

    setTimeout(() => {
        div.remove()
    }, 3000);
}

UI.prototype.mostrarResultado = (seguro, total) => {

    const { marca, year, tipo } = seguro;
    let textoMarca;
    switch (marca) {
        case '1':
            textoMarca = 'Americano';
            break;
        case '2':
            textoMarca = 'Asiatico';
            break;
        case '3':
            textoMarca = 'Europeo';
            break;
        default:
            break;
    }

    // Crear el resultado 
    const div = document.createElement('DIV');
    div.classList.add('mt-10')
    
    /* 
        innerHTML = cuando quieres modificar el HTML.
        textContent = cuando no hay que modificar el HTML.
        Capitalize = agrega la primera letra en mayuscula.
    */

    div.innerHTML = ` 
        <p class="header">Tu resumen</p>
        <p class="font-bold">Marca: <span class="font-normal"> ${textoMarca}</span></p>
        <p class="font-bold">Año: <span class="font-normal"> ${year}</span></p>
        <p class="font-bold">Tipo de Seguro: <span class="font-normal capitalize"> ${tipo}</span></p> 
        <p class="font-bold">Total: <span class="font-normal"> $${total}</span></p>
    `

    const resultadoDiv = document.querySelector('#resultado');

    // Mostrar el spinner
    const spinner = document.querySelector('#cargando');
    spinner.style.display = 'blocK';

    setTimeout(() => {
        spinner.style.display = 'none' /* Se borra el spinner */
        resultadoDiv.appendChild(div) /* Se muestra el resultado */
    }, 3000);
}

// Instanciar UI //
const ui = new UI()

document.addEventListener('DOMContentLoaded', () =>  {
    ui.llenarOpciones() /* Llena el select con los años */
})

eventListeners()
function eventListeners() {
    const formulario = document.querySelector('#cotizar-seguro');
    formulario.addEventListener('submit', cotizarSeguro)
}

function cotizarSeguro(e) {
    e.preventDefault();
    // Leer la marca seleccionada
    const marca = document.querySelector('#marca').value;

    // Leer el año seleccionada
    const year = document.querySelector('#year').value;

    // Leer el tipo de cobertura 
    const tipo = document.querySelector('input[name="tipo"]:checked').value;

    if(marca === '' || year === '' || tipo === '') {
        ui.mostrarMensaje('Todos los campos son obligatorio', 'error')
        return
    } 

    ui.mostrarMensaje('Cotizando','exito');

    // Ocultar las cotizaciones previas 
    const resultado = document.querySelector('#resutlado div');
    if( resultado != null ){
        resultado.remove()
    }

    // Instanciar el seguro
    const seguro = new Seguro(marca, year, tipo);
    const total = seguro.cotizarSeguro()
    // Utilizar el prototype que va a cotizar 
    ui.mostrarResultado(seguro, total)
} 