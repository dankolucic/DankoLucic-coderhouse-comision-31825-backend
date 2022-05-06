const express = require("express");
const fs = require("fs");
const app = express();
const PORT = 8080;

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

app.get("/", (req,res) => {
    res.send(`<h1 style="color:blue">Bienvenidos al servidor Express</h1>`);
})

app.get("/productos", (req,res) => {
    let data;
    let dataObject;
    try{
        data = fs.readFileSync("./productos.txt","utf-8");   
    } catch (err){
        throw new Error(`Error de escritura: ${err.message}`)
    }
    dataObject = JSON.parse(data);
    res.send(dataObject);
});

app.get("/productosRandom", (req,res) => {
    let data;
    let dataObject;
    try{
        data = fs.readFileSync("./productos.txt","utf-8");   
    } catch (err){
        throw new Error(`Error de escritura: ${err.message}`)
    }
    dataObject = JSON.parse(data);
    if(dataObject.length >= 1){
        const random = getRandomInt(0,dataObject.length);
        res.send(dataObject[random]);
    }
    else{
        res.send("no hay productos ingresados");
    }
})


const server = app.listen(PORT, () => {
    console.log(`servidor http escuchando en el puerto ${server.address().port}`)
})

server.on("error", error => console.log(`Error en servidor ${error}`))

//npm run start:dev (para correr este archivo js con nodemon)