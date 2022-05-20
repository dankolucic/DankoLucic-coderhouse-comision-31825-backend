const { databaseProductos } = require("../databases/databaseProductos.js");



const serverInfo = {
    os: "macOSX",
    framework: "express"
}

const controladoresApi = {
    
    getInfo: (req,res) => {
        res.json(serverInfo);
    },

    getProducto: (req,res) => {
        const id = req.params.idProducto;
        try{
            const productoBuscado = databaseProductos.obtenerSegunId(id);
            res.json(productoBuscado);
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

    getProductos: (req,res) => {
            // res.json(databaseProductos.obtenerTodos());
            let productos = databaseProductos.obtenerTodos();
            res.render("inicio", { productos } );
        },
    
    getProductosRaiz: (req,res) => {
        res.render("formulario");

    },

    

    postProducto: (req,res) =>  {
        const productoAgregado = databaseProductos.agregarProducto(req.body);
        res.status(201).json(productoAgregado);
    },

    deleteProducto: (req,res) =>  {
        const id = req.params.idProducto;
        try{
            databaseProductos.borrarProductoSegunId(id);
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
    putProducto: (req,res) =>  {
        const id = req.params.idProducto;
        const datos = req.body
        try{ 
                const remplazoProducto = databaseProductos.reemplazarProductoSegunId(id,datos);
                res.status(200).json(remplazoProducto);
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

