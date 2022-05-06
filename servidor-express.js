const express = require("express");

const moment = require("moment");

const fs = require("fs");

const fechaActual = moment().format('LLLL');

const app = express();

const PORT = 8080;

const server = app.listen(PORT, () => {
    console.log(`servidor http escuchando en el puerto ${server.address().port}`)
})

server.on("error", error => console.log(`Error en servidor ${error}`))

app.get("/", (req,res) => {
    res.send(`<h1 style="color:blue">Bienvenidos al servidor Express</h1>`);
})

app.get("/visitas", (req,res) => {
    let data;
    let data2;
    try{
        data = fs.readFileSync("./file-express.txt","utf-8");   
    } catch (err){
        throw new Error(`Error de escritura: ${err.message}`)
    }
     data2 = Number(data);
     data2 = data2 + 1;
     try{
        fs.writeFileSync("./file-express.txt",`${data2}`,"utf-8");   
    } catch (err){
        throw new Error(`Error de escritura: ${err.message}`)
    }
    res.send(`<h3>Cantidad de visitas al sitio: "${data2}"</h3>`);
})

app.get("/fyh", (req,res) => {
    res.send({fyh: fechaActual});
})

//npm run start:dev (para correr este archivo js con nodemon)