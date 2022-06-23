// const fs = require("fs");
import fs from "fs";
import { clienteSqlAdmin, clienteSqlite } from "./clienteSql.js";

//necesario para FileSystem, pero no por persistencia por DB MySQL, dado que la DB genera automàtico el ID
// function generarId(){
//     let contenido;
//     try{
//         contenido = fs.readFileSync("./productos-express-avanzado.txt","utf-8");   
//     } catch (err){
//         throw new Error(`Error de escritura: ${err.message}`)
//     }
//     const productos = JSON.parse(contenido);

//     let array = [];
//     for(i=0; i < productos.length; i++){
//         array[i] = Number(productos[i].id)
//     }
//     array.sort((a,b)=>a-b)
//     return (array[array.length-1]+1)
// }


//obtenerMensajes con FileSystem (persistencia en archivos)

// export function obtenerMensajes(){
//     let contenido;
//     try{
//         contenido = fs.readFileSync("./historial-chat.txt","utf-8");   
//     } catch (err){
//         throw new Error(`Error de escritura: ${err.message}`)
//     }
//     const mensajes = JSON.parse(contenido);
//     return mensajes
// }

export async function obtenerMensajes(){
    try{
        const mensajes = await clienteSqlite.select("*").from("mensajes")
        return mensajes
    } catch (err){
        throw new Error(`Error de escritura: ${err.message}`)
    }
}


//agregarMensajes con FileSystem (persistencia en archivos)

// export function agregarMensajes(mensaje){
//     let mensajes = obtenerMensajes();
//     mensajes.push(mensaje);
//     let mensajesString = JSON.stringify(mensajes);
//     try{ 
//         fs.writeFileSync(`./historial-chat.txt`,mensajesString);
//     } catch(err){
//         throw new Error(err.message)
//     }
// }

export async function agregarMensajes(mensaje){
    try{ 
        await clienteSqlite.insert(mensaje).into("mensajes")
        console.log("se creó nuevo mensaje")
    }catch(err){
        throw new Error(err.message)
    }
}

//obtenerProductos con FileSystem (persistencia en archivos)

// function obtenerProductos(){
//     let contenido;
//     try{
//         contenido = fs.readFileSync("./productos-express-avanzado.txt","utf-8");   
//     } catch (err){
//         throw new Error(`Error de escritura: ${err.message}`)
//     }
//     const productos = JSON.parse(contenido);
//     return productos
// }

//agregarProductos con FileSystem (persistencia en archivos)

// function agregarProductos(producto){
//     let productos = obtenerProductos();
//     producto.id = generarId();
//     productos.push(producto);
//     let productosString = JSON.stringify(productos);
//     try{ 
//         fs.writeFileSync(`./productos-express-avanzado.txt`,productosString);
//     }catch(err){
//         throw new Error(err.message)
//     }

// }


//obtenerProductos con DB-MySQL (persistencia en base de datos en SQL (MySQL))
export async function obtenerProductos(){
    try{
        const productos = await clienteSqlAdmin.select("*").from("personas");
        return productos;
    } catch (err){
        throw new Error(`Error de escritura: ${err.message}`)
    }
    
}

//agregarProductos con DB-MySQL (persistencia en base de datos en SQL (MySQL))
export async function agregarProductos(producto){
    try{ 
        const idProducto = await clienteSqlAdmin.insert(producto).into("personas")
        console.log(`producto agregado ID:"${idProducto}"`)
    }catch(err){
        throw new Error(err.message)
    }

}




