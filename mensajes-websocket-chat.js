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


function generarId(){
    let contenido;
    try{
        contenido = fs.readFileSync("./productos-express-avanzado.txt","utf-8");   
    } catch (err){
        throw new Error(`Error de escritura: ${err.message}`)
    }
    const productos = JSON.parse(contenido);

    let array = [];
    for(i=0; i < productos.length; i++){
        array[i] = Number(productos[i].id)
    }
    array.sort((a,b)=>a-b)
    return (array[array.length-1]+1)
}

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

function obtenerProductos(){
    let contenido;
    try{
        contenido = fs.readFileSync("./productos-express-avanzado.txt","utf-8");   
    } catch (err){
        throw new Error(`Error de escritura: ${err.message}`)
    }
    const productos = JSON.parse(contenido);
    return productos
}

function agregarMensajes(mensaje){
    let mensajes = obtenerMensajes();
    mensajes.push(mensaje);
    let mensajesString = JSON.stringify(mensajes);
    try{ 
        fs.writeFileSync(`./historial-chat.txt`,mensajesString);
    }catch(err){
        throw new Error(err.message)
    }
}

function agregarProductos(producto){
    let productos = obtenerProductos();
    producto.id = generarId();
    productos.push(producto);
    let productosString = JSON.stringify(productos);
    try{ 
        fs.writeFileSync(`./productos-express-avanzado.txt`,productosString);
    }catch(err){
        throw new Error(err.message)
    }

}

module.exports = {
    obtenerMensajes,
    agregarMensajes,
    obtenerProductos,
    agregarProductos

}


