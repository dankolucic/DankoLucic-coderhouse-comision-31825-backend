const express = require("express");
const { engine } = require("express-handlebars")

const { routerProductos } = require("./routes/routerProductos.js");
const { routerInfo } = require("./routes/routerInfo.js");
const { routerProductosRaiz } = require("./routes/routerProductosRaiz.js");

// const { controladoresApi } = require("./controllers/controladoresApi-producto.js");
// const { controladoresWeb } = require("./controllers/controladoresWeb.js");

const app = express();


//middlewares (app.use)
app.use(express.json())
app.use(express.urlencoded({ extended:true }))

//engine handlebars
app.engine("handlebars", engine());
app.set("view engine","handlebars");

app.use("/productos", routerProductosRaiz);

app.use("/api/productos", routerProductos);

// app.get("/", controladoresWeb.root);
// app.get("/inicio", controladoresWeb.inicio);
// app.get("/perfil",controladoresWeb.perfil);

app.use("/api/info", routerInfo);

// app.get("/api/productos", controladoresApi.getProductos);
// app.get("/api/productos/:idProducto", controladoresApi.getProducto);
// app.post("/api/productos", controladoresApi.postProducto)
// app.delete("/api/productos/:idProducto", controladoresApi.deleteProducto);
// app.put("/api/productos/:idProducto", controladoresApi.putProducto);



const PORT = 8080;
const server = app.listen(PORT, () => {
    console.log(`escuchando en el puerto ${server.address().port}`);
})

// http://localhost:8080/api/personas?rol=profe