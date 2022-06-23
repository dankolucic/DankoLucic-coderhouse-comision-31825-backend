import express from "express";
import { engine } from "express-handlebars";
import { Server as HttpServer } from "http";
import { Server as SocketServer } from "socket.io";
import { obtenerMensajes,agregarMensajes,obtenerProductos,agregarProductos} from "./mensajes-websocket-chat.js";


// const { engine } = require("express-handlebars")
// const { Server: HttpServer } = require("http")
// const { Server: SocketServer } = require("socket.io")
//npm install express socketio
// const { obtenerMensajes, agregarMensajes, obtenerProductos, agregarProductos } = require("./mensajes-websocket-chat")

const app = express()

const httpServer = new HttpServer(app)
const io = new SocketServer(httpServer)

app.use(express.static("public"));

//middlewares (app.use)
app.use(express.json())
app.use(express.urlencoded({ extended:true }))

//engine handlebars
app.engine("handlebars", engine())
app.set("view engine","handlebars")

//routers
app.get("/", (req, res) => {
    res.render("formulario")
    // res.sendFile("index.html", { root : "./views"})
})

//websocket
io.on("connection", async socket => {
    
    console.log("Alguien se conectó!")
    const mensajes = await obtenerMensajes()
    const productos = await obtenerProductos();
    socket.emit("mensajes", { mensajes })
    socket.emit("productos", { productos })

    socket.on("mensaje",async mensaje => {
        await agregarMensajes(mensaje)
        const mensajes = await obtenerMensajes()
        io.sockets.emit("mensajes", { mensajes })
    
    })

    socket.on("producto", async producto =>  {
        await agregarProductos(producto);
        const productos = await obtenerProductos()
        io.sockets.emit("productos", { productos })
    })
    
    // socket.emit("connectionOK", { estado : "cliente, se ha conectado satisfactoriamente al socket"})
    // socket.on("ping", () => {
    //     console.log(`socket ${socket.id} dice PING`)
    // })
})


//server
const PORT = 8080
const server = httpServer.listen(PORT, () => {
    console.log(`escuchando en el puerto ${server.address().port}`)
})