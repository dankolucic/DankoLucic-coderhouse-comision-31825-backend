const express = require("express");
const { engine } = require("express-handlebars");
const { Server: HttpServer } = require("http");
const { Server: SocketServer } = require("socket.io");
//npm install express socketio
const { obtenerMensajes, agregarMensajes, obtenerProductos, agregarProductos } = require("./mensajes-websocket-chat");

const app = express();

const httpServer = new HttpServer(app);
const io = new SocketServer(httpServer);

app.use(express.static("public"));

//middlewares (app.use)
app.use(express.json())
app.use(express.urlencoded({ extended:true }))

//engine handlebars
app.engine("handlebars", engine());
app.set("view engine","handlebars");

//routers
app.get("/", (req, res) => {
    res.render("formulario");
    // res.sendFile("index.html", { root : "./views"})
});

//websocket
io.on("connection", socket => {
    
    console.log("Alguien se conectó!")
    const mensajes = obtenerMensajes();
    const productos = obtenerProductos();
    socket.emit("mensajes", { mensajes })
    socket.emit("productos", { productos })

    socket.on("mensaje", mensaje => {
        agregarMensajes(mensaje)
        const mensajes = obtenerMensajes();
        io.sockets.emit("mensajes", { mensajes })
    
    })

    socket.on("producto", producto => {
        agregarProductos(producto)
        const productos = obtenerProductos();
        io.sockets.emit("productos", { productos })
    })
    
    // socket.emit("connectionOK", { estado : "cliente, se ha conectado satisfactoriamente al socket"})
    // socket.on("ping", () => {
    //     console.log(`socket ${socket.id} dice PING`)
    // })
})


//server
const PORT = 8080;
const server = httpServer.listen(PORT, () => {
    console.log(`escuchando en el puerto ${server.address().port}`)
});