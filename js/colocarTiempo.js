const localidad = urlSearchParams.get('localidad');
const localidadInputEl = document.querySelector('#formulario-consulta input[name="localidad"]');
localidadInputEl.value = localidad;
const localidadEl = document.querySelector('#tiempo-localidad');
localidadEl.innerHTML = localidad;
const latitudInputHiddenHorasEl = document.querySelector('#consultar-tiempo-horas-form input[name="lat"]');
latitudInputHiddenHorasEl.value = urlSearchParams.get('lat');
const longitudInputHiddenHorasEl = document.querySelector('#consultar-tiempo-horas-form input[name="lon"]');
longitudInputHiddenHorasEl.value = urlSearchParams.get('lon');

const temperatura = urlSearchParams.get('temperatura');
const temperaturaEl = document.querySelector('#tiempo-temperatura');
temperaturaEl.innerHTML = temperatura + 'ºC';

const icono = urlSearchParams.get('tiempoIcono');
const iconoEl = document.querySelector('#tiempo-icono');
iconoEl.src += icono + "@2x.png";

const descripcion = urlSearchParams.get('tiempo');
const tiempoDescripcionEl = document.querySelector('#tiempo-descripcion');
tiempoDescripcionEl.innerHTML = descripcion;

const salidaDelSol = urlSearchParams.get('salidaDelSol');
const salidaDelSolEl = document.querySelector('#sunrise .tiempo__sunrise-hora');
salidaDelSolEl.innerHTML = `${new Date(salidaDelSol*1000).getHours()}:${new Date(salidaDelSol*1000).getMinutes()}`;

const puestaDelSol = urlSearchParams.get('puestaDelSol');
const puestaDelSolEl = document.querySelector('#sunset .tiempo__sunset-hora');
puestaDelSolEl.innerHTML = `${new Date(puestaDelSol*1000).getHours()}:${new Date(puestaDelSol*1000).getMinutes()}`;