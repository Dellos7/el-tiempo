const querySearch = window.location.search;
const urlSearchParams = new URLSearchParams(querySearch);

obtenerLocalizacion();

function consultarTiempoPorHoras(){
    const formEl = document.getElementById('consultar-tiempo-horas-form');
    console.log('consultarTiempoPorHoras');
    const request = new XMLHttpRequest();
    request.open('POST', 'consultar_prevision_horas.php');
    request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    request.onreadystatechange = function(){
        if( request.readyState === XMLHttpRequest.DONE && request.status === 200 ){
            //console.log(request.response);
            procesarTiempoPorHoras( JSON.parse(request.response) );
        }
    };
    const lat = Number.parseFloat( formEl.elements['lat'].value );
    const lon = Number.parseFloat( formEl.elements['lon'].value );
    request.send( `lat=${lat}&lon=${lon}` );
    return false;
}

function procesarTiempoPorHoras(json){
    const tiempoPorHorasEl = document.querySelector('#tiempo-por-horas');
    tiempoPorHorasEl.classList.remove('oculto');
    const consultarTiempoPorHorasFormEl = document.querySelector('#consultar-tiempo-horas-form');
    consultarTiempoPorHorasFormEl.classList.add('oculto');
    const horas = json.hourly;
    for( const hora of horas ){
        const horaMinuto = obtenerHoraMinuto( hora.dt );
        //console.log(`HORA: ${ horaMinuto}. Temperatura: ${Math.round(hora.temp)}ºC. Tiempo: ${hora.weather[0].description}`);
        crearDivHora( tiempoPorHorasEl, horaMinuto, hora.temp, hora.weather[0].description, hora.weather[0].icon );
    }
}

function obtenerHoraMinuto( horaDt ){
    const date = new Date(horaDt*1000);
    const hora = (10-date.getHours()) > 0 ? '0' + date.getHours() : date.getHours();
    const minutos = (10-date.getMinutes()) > 0 ? '0' + date.getMinutes() : date.getMinutes();
    const horaMinuto =  hora + ":" + minutos;
    return horaMinuto;
}

function crearDivHora( tiempoPorHorasEl, horaMinuto, temperatura, tiempoDesc, tiempoIcono ){
    const horaEl = document.createElement('div');
    horaEl.classList.add('tiempo-por-horas__elem');
    horaEl.innerHTML = `
<div class="tiempo-por-horas__elem-hora">${horaMinuto}</div>
<img class="tiempo-por-horas__elem-icono" src="http://openweathermap.org/img/wn/${tiempoIcono}@2x.png"></img>
<div class="tiempo-por-horas__elem-temperatura">${Math.round(temperatura)}ºC</div>
    `;
    tiempoPorHorasEl.appendChild(horaEl);
}

function obtenerLocalizacion(){
    setTimeout( () => {
        if( navigator.geolocation ){
            const localidadFormEl = document.querySelector('#formulario-consulta [name="localidad"]');
            if( !localidadFormEl.value ){
                navigator.geolocation.getCurrentPosition( (pos) => {
                    const lon = pos.coords.longitude;
                    const lat = pos.coords.latitude;
                    console.log(`lon: ${lon}, lat: ${lat}`);
                    anyadirLonLatInputsForm( lon, lat );
                    enviarFormularioConsulta();
                });
            }
        } else{
            alert( 'La geolocalización no está soportada en este navegador.' );
        }
    }, 100 );
}

function anyadirLonLatInputsForm( lon, lat ){
    const formularioConsultaEl = document.querySelector('#formulario-consulta');
    const inputHiddenLonEl = document.createElement('input');
    inputHiddenLonEl.type = 'hidden';
    inputHiddenLonEl.value = lon;
    inputHiddenLonEl.name = 'lon';
    formularioConsultaEl.appendChild(inputHiddenLonEl);
    const inputHiddenLatEl = document.createElement('input');
    inputHiddenLatEl.type = 'hidden';
    inputHiddenLatEl.value = lat;
    inputHiddenLatEl.name = 'lat';
    formularioConsultaEl.appendChild(inputHiddenLatEl);
}

function enviarFormularioConsulta(){
    const formularioConsultaEl = document.querySelector('#formulario-consulta');
    formularioConsultaEl.submit();
}