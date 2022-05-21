const express = require("express");

const { engine } = require("express-handlebars")

const personas = [];

const app = express();

// app.use(express.statis("public"));

app.engine("handlebars", engine());

app.set("view engine","handlebars");

app.use(express.urlencoded({ extended: true }));


app.get("/", (req,res) => {
    res.render("inicio", { personas });
});

app.post("/personas", (req, res) => {
    personas.push(req.body)
    console.log(personas)
    res.redirect("/")
})

const PORT = 8080;
const server = app.listen(PORT, () => {
    console.log(`servidor escuchando en el puerto ${server.address().port}`)
});

server.on("error", error => console.log(`Eror en el servidor ${error}`));