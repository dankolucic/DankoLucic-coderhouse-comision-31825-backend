const { Router } = require("express");
const { controladoresApi } = require("../controllers/controladoresApi-producto.js");

const routerProductosRaiz = new Router();

routerProductosRaiz.get("/", controladoresApi.getProductosRaiz);
// routerProductos.get("/:idProducto", controladoresApi.getProducto);
// routerProductos.post("/", controladoresApi.postProducto)
// routerProductos.delete("/:idProducto", controladoresApi.deleteProducto);
// routerProductos.put("/:idProducto", controladoresApi.putProducto);

module.exports = { routerProductosRaiz };