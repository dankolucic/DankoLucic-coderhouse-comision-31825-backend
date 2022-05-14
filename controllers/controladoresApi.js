const { databasePersonas } = require("../databases/databasePersonas.js");

const serverInfo = {
    os: "lunix",
    framework: "express"
}

const controladoresApi = {
    
    getInfo: (req,res) => {
        res.json(serverInfo);
    },
    getPersona: (req,res) => {
        const id = req.params.idPersona;
        try{
            const personaBuscada = databasePersonas.obtenerSegunId(id);
            res.json(personaBuscada);
        }
        catch (err){
            if(err.tipo == "db not found"){
                res.status(404).json({ error: err.message })
            }
            else{
                res.status(500).json({ error: err.message })
            }
        }
    }, 
    getPersonas: (req,res) => {
        if(Object.entries(req.query).length > 0){
            console.log(req.query);
            res.json(databasePersonas.obtenerSegunRol(req.query.rol));
        }
        else{
            res.json(databasePersonas.obtenerTodos());
        }
        
    },
    getProfes: (req,res) => {
        res.json(databasePersonas.obtenerSegunRol("profe"));
    },
    postPersonas: (req,res) =>  {
        const personaAgregada = databasePersonas.agregarPersonas(req.body);
        res.status(201).json(personaAgregada);
    },
    deletePersona: (req,res) =>  {
        const id = req.params.idPersona;
        try{
           databasePersonas.borrarPersonaSegunId(id);
           res.sendStatus(204);
        }
        catch(err){
            if(err.tipo == "db not found"){
                res.status(404).json({ error: err.message })
            }
            else{
                res.status(500).json({ error: err.message })
            }
        }
    },
    putPersona: (req,res) =>  {
        const id = req.params.idPersona;
        const datos = req.body
        try{ 
                const remplazoPersona = databasePersonas.reemplazarPersonaSegunId(id,datos);
                res.status(200).json(remplazoPersona);
        }
        catch(err){
            if(err.tipo == "db not found"){
                res.status(404).json({ error: err.message });
            }
            else{
                res.status(500).json({ error: err.message });
            }
        }
    }
}

module.exports = { controladoresApi }

