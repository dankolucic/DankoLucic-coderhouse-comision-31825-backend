
const moment = require("moment");

const fechaActual = moment();
const fechaNacimiento = moment([1992,08,09]);

const difAños = fechaActual.diff(fechaNacimiento, 'years');
const difDias = fechaActual.diff(fechaNacimiento, 'days');

console.log(`hoy es ${fechaActual.format('DD/MM/YYYY')}`);
console.log(`Naci el ${fechaNacimiento.format('DD/MM/YYYY')}`);
console.log(`Desde mi nacimiento han pasado ${difAños} años`);
console.log(`Desde mi nacimiento han pasado ${difDias} días`);



