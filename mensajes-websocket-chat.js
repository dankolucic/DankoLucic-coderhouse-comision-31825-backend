const fs = require("fs");

// const mensajes = [

//     // {
//     //     autor: "dzlucic@miuandes.cl",
//     //     texto: "hola! ¿Como estás?"
//     // },
//     // {
//     //     autor: "pamela@gmail.com",
//     //     texto: "hola! Bien ¿y tu?"
//     // },

// ];

function obtenerMensajes(){
    let contenido;
    try{
        contenido = fs.readFileSync("./historial-chat.txt","utf-8");   
    } catch (err){
        throw new Error(`Error de escritura: ${err.message}`)
    }
    const mensajes = JSON.parse(contenido);
    return mensajes
}

function agregarMensajes(mensaje){
    let mensajes = obtenerMensajes();
    mensajes.push(mensaje)
    let mensajesString = JSON.stringify(mensajes);
    try{ 
        fs.writeFileSync(`./historial-chat.txt`,mensajesString);
    }catch(err){
        throw new Error(err.message)
    }
}

module.exports = {
    obtenerMensajes,
    agregarMensajes
}


