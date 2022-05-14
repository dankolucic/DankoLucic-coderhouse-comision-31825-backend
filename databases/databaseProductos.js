const productos = [
    {
        id: 1,
        tittle: "titulo_1",
        price: 100,
        thumbnail: "URL_1"
    },
    {
        id: 2,
        tittle: "titulo_2",
        price: 200,
        thumbnail: "URL_2"
    },
    {
        id: 3,
        tittle: "titulo_3",
        price: 300,
        thumbnail: "URL_3"
    }
];

function generarId(){
    let array = []
    for(i=0; i < productos.length; i++){
        array[i] = Number(productos[i].id)
    }
    array.sort((a,b)=>a-b)
    return (array[array.length-1]+1)
}




const databaseProductos = {
    
    obtenerTodos: () => {
        return [...productos];
    },
    obtenerSegunId: id => {
        const productoBuscado = productos.find( producto => producto.id == id );
        if(!productoBuscado){
            const error = new Error("no existe ese producto con ese ID");
            error.tipo = "db not found"
            throw error
        }
        return productoBuscado
    },
    agregarProducto: datos => {
        //debería validar si es una persona. Ej: si ya existe no la agrego, tampoco si tiene un formato invalido, etc.
        const producto = datos;
        producto.id = generarId();
        productos.push(producto);
        return producto;
    },
    borrarProductoSegunId: id => {
        const indiceBuscado = productos.findIndex( producto => producto.id == id);
        if(indiceBuscado == -1){
            const error = new Error("no existe ID");
            error.tipo = "db not found";
            throw error;
        }
        else{
            productos.splice(indiceBuscado,1);
        }
    },
    reemplazarProductoSegunId: (id, datos) => {
        if(id == datos.id){
            const indiceBuscado = productos.findIndex( producto => producto.id == id);
            if(indiceBuscado == -1){
                const error = new Error("no existe ID");
                error.tipo = "db not found";
                throw error;
            }
            else{
                const producto = datos;
                producto.id = id;
                productos[indiceBuscado] = producto;
                return producto;
            }
        }
        else{
            const error = new Error("ID params distinto a ID objeto");
            throw error;
        }

    }

};

module.exports = { databaseProductos }