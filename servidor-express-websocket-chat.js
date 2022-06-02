const express = require("express");
const { Server: HttpServer } = require("http");
const { Server: SocketServer } = require("socket.io");

//npm install express socketio

const { obtenerMensajes, agregarMensajes } = require("./mensajes-websocket-chat");

const app = express();
const httpServer = new HttpServer(app);
const io = new SocketServer(httpServer);

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.sendFile("index.html", { root : "./views"})
});

io.on("connection", socket => {
    
    console.log("Alguien se conectó!")
    const mensajes = obtenerMensajes()
    socket.emit("mensajes", { mensajes })

    socket.on("mensaje", mensaje => {
        agregarMensajes(mensaje)
        const mensajes = obtenerMensajes();
        io.sockets.emit("mensajes", { mensajes })

    })
    
    // socket.emit("connectionOK", { estado : "cliente, se ha conectado satisfactoriamente al socket"})
    // socket.on("ping", () => {
    //     console.log(`socket ${socket.id} dice PING`)
    // })
})



const PORT = 8080;
const server = httpServer.listen(PORT, () => {
    console.log(`escuchando en el puerto ${server.address().port}`)
});