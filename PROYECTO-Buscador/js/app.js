// Variables //
const marca = document.querySelector('#marca');
const year = document.querySelector('#year');
const minimo = document.querySelector('#minimo');
const maximo = document.querySelector('#maximo');
const puertas = document.querySelector('#puertas');
const transmision = document.querySelector('#transmision');
const color = document.querySelector('#color');

// Contenedor para los resultados //

const resultado = document.querySelector('#resultado');

const max = new Date().getFullYear(); /* Trae el año actual */
const min = max - 10; /* genera 10 años menos del año actual */

// Generar un objeto con la busqueda //

const datosBusquedas = {
    marca: '',
    year: '',
    minimo: '',
    maximo: '',
    puertas: '',
    transmision: '',
    color: ''
}

// Eventos //
document.addEventListener('DOMContentLoaded', ()=> {
    mostrarAutos(autos); /* Muestra los autos al cargar */


    llenarSelect(); /* Llena las opciones de años */
})

// Event para los select de busqueda //

marca.addEventListener('change', e => {
    datosBusquedas.marca = e.target.value;
    filtrarAuto()

})
year.addEventListener('change', e => {
    datosBusquedas.year = parseInt(e.target.value);
    filtrarAuto()

})
minimo.addEventListener('change', e => {
    datosBusquedas.minimo = e.target.value;
    filtrarAuto()
})
maximo.addEventListener('change', e => {
    datosBusquedas.maximo = e.target.value;
    filtrarAuto()

})
puertas.addEventListener('change', e => {
    datosBusquedas.puertas = parseInt(e.target.value)
    filtrarAuto()
})
transmision.addEventListener('change', e => {
    datosBusquedas.transmision = e.target.value;
    filtrarAuto()
})
color.addEventListener('change', e => {
    datosBusquedas.color = e.target.value;
    filtrarAuto()
})


// Funciones //
function mostrarAutos(autos){

    LimpiarHTML(); /* Elimina el HTML previo */

    autos.forEach( auto => {

        const { marca, modelo, year, puertas, transmision, precio, color} = auto;
        const autoHTML = document.createElement('p');

        autoHTML.textContent = ` 
            ${marca} ${modelo} - ${year} - ${puertas} Puertas - Transmicion: ${transmision} - Precio: ${precio} - Color: ${color}

        `;

        // Insertar en el HTML //

        resultado.appendChild(autoHTML);
    })
}

// Limpiar HTML //

function LimpiarHTML(){
    while(resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);
    }
}


// Genera los datos del select //
function llenarSelect() {
    for( let i = max; i >= min; i-- ){
        const opcion = document.createElement('option');
        opcion.value = i;
        opcion.textContent = i;
        year.appendChild(opcion); /* Agrega las opciones de año al select */
    }
}

// Funcion que filtra en base a la busqueda //

function filtrarAuto() {
    const resultado = autos.filter( filtrarMarca ).filter( filtrarYear ).filter( filtrarMinimo ).filter( filtrarMaximo ).filter( filtrarPuertas ).filter( filtrarTransmision ).filter( filtrarColor );

    
    if( resultado.lenght ){
        mostrarAutos(resultado)
    } else {
        noResultado()
    }
}

function noResultado() {

    LimpiarHTML();

    const noResultado = document.createElement('div');
    noResultado.classList.add('alerta', 'error');
    noResultado.textContent = 'No Hay Resultado';
    resultado.appendChild(noResultado);
}


function filtrarMarca(auto) {
    if (datosBusquedas.marca) {
        return auto.marca === datosBusquedas.marca
    }
    return auto;
}

function filtrarYear(auto){
    if (datosBusquedas.year) {
        return auto.year === datosBusquedas.year
    }
    return auto;
}

function filtrarMinimo(auto) {
    if (datosBusquedas.minimo) {
        return auto.precio >= datosBusquedas.minimo;
    }
    return auto;
}

function filtrarMaximo(auto) {
    if (datosBusquedas.maximo) {
        return auto.precio <= datosBusquedas.maximo;
    }
    return auto;
}

function filtrarPuertas(auto) {
    if (datosBusquedas.puertas) {
        return auto.puertas === datosBusquedas.puertas;
    }
    return auto;
}

function filtrarTransmision(auto) {
    if (datosBusquedas.transmision) {
        return auto.transmision === datosBusquedas.transmision;
    }
    return auto;
}

function filtrarColor(auto) {
    if (datosBusquedas.color) {
        return auto.color === datosBusquedas.color;
    }
    return auto;
}