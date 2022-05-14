const express = require("express");

const { controladoresApi } = require("./controllers/controladoresApi.js");
const { controladoresWeb } = require("./controllers/controladoresWeb.js");

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended:true }))

// app.get("/", controladoresWeb.root);
// app.get("/inicio", controladoresWeb.inicio);
// app.get("/perfil",controladoresWeb.perfil);

app.get("/api/info", controladoresApi.getInfo);
app.get("/api/personas", controladoresApi.getPersonas);
app.get("/api/personas/:idPersona", controladoresApi.getPersona);
app.get("/api/profes", controladoresApi.getProfes);

app.post("/api/personas", controladoresApi.postPersonas)

app.delete("/api/personas/:idPersona", controladoresApi.deletePersona);

app.put("/api/personas/:idPersona", controladoresApi.putPersona);



const PORT = 8080;
const server = app.listen(PORT, () => {
    console.log(`escuchando en el puerto ${server.address().port}`);
})

// http://localhost:8080/api/personas?rol=profe


