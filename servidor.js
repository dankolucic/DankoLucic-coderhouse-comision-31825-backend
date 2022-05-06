const http = require("http");
const moment = require("moment");

const fechaActual = Number(moment().hour());

//a este callback lo llamamos controlador, dado que hace algo con una petición y devuelve una respuesta al cliente. En otras palabras, la función controlador controla la respuesta al cliente dado una petición recibida.
function controlador(peticion, respuesta){
    if(peticion.url == "/"){
        if(peticion.method == "GET"){
            //si la URL no tiene parámetros y es metodo get, devuelvo los console.log.
            //así funciona la función controlador
            console.log(`método: ${peticion.method}`);
            console.log(`URL: ${peticion.url}`);
            respuesta.end("Hola mundo");
        }
    }
    else if (peticion.url == "/personas"){
        if(peticion.method == "GET"){
            respuesta.end("<h1>Aqui van las personas</h1>");
        }
    }
}

//se crea el servidor
const server = http.createServer(controlador);

// const server = http.createServer((peticion, respuesta) => {
//     respuesta.end("Hola mundo");
// })



//se habilita el servidor para esuchar peticiones (por el puerto indicado)
const connectedServer = server.listen(8080, () => {

    if(fechaActual >= 6 && fechaActual <= 12){
        console.log(`Buenos días! El servidor HTTP escuchando en el puerto ${connectedServer.address().port}`);
    }
    if(fechaActual >= 13 && fechaActual <= 19){
        console.log(`Buenas tardes! El servidor HTTP escuchando en el puerto ${connectedServer.address().port}`);
    }
    if(fechaActual >= 20){
        console.log(`Buenas noches! El servidor HTTP escuchando en el puerto ${connectedServer.address().port}`);
    }
})

//se define un manejador de los posibles errores que pueda tener el servidor
connectedServer.on("error", manejadorDeErrores);

function manejadorDeErrores(error){
    console.log(error);
}






