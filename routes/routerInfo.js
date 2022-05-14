const { Router } = require("express");
const { controladoresApi } = require("../controllers/controladoresApi-producto.js");

const routerInfo = new Router();

routerInfo.get("/", controladoresApi.getInfo);

module.exports = { routerInfo };