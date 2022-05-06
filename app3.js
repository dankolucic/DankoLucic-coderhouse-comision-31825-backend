
let objetos = [];

const fs = require("fs");

class ContenedorArchivo {
    constructor(id,title,price,thumbnail,nombreArchivo) {
      this.id = id;
      this.title = title;
      this.price = price;
      this.thumbnail = thumbnail;
      this.nombreArchivo = nombreArchivo;
      
    }

    async save(objeto){
        objetos.push(objeto);
        let objetoString = JSON.stringify(objetos);
        try{ 
            await fs.promises.writeFile(`./${this.nombreArchivo}.txt`,objetoString);
            console.log("objeto guardado con éxito");
        }catch(err){
            throw new Error(err.message)
        }
    }

    async getById(numeroId){
        let objetoGetById; 
        let contenido;
        let contenidoObjeto;
        try{ 
            contenido = await fs.promises.readFile(`./${this.nombreArchivo}.txt`, "utf-8"); 
        }catch(err){
            throw new Error(err.message)
        }
        contenidoObjeto = JSON.parse(contenido);
        objetoGetById = contenidoObjeto.find(objeto => objeto.id === numeroId);
        if(objetoGetById){
            console.log(`el objeto que tiene el ID: ${numeroId} es el :`)
            console.log(objetoGetById);
            return objetoGetById;
        }
        else{
            console.log("no se encuentra en número ID");
            return null;
        }
    }

    async getAll(){
        let contenidoObjeto;
        let contenido; 
        try{ 
            contenido = await fs.promises.readFile(`./${this.nombreArchivo}.txt`, "utf-8"); 
        }catch(err){
            throw new Error(err.message);
        }
        contenidoObjeto = JSON.parse(contenido);
        console.log("a continuación el array de objetos");
        console.log(contenidoObjeto);
        return contenidoObjeto;
    }

    async deleteById(numeroId){

        let objetoDeleteById; 
        let contenido;
        let contenidoObjeto;
        let nuevoObjeto;
        let nuevoObjetoString;

        try{ 
            contenido = await fs.promises.readFile(`./${this.nombreArchivo}.txt`, "utf-8"); 
        }catch(err){
            throw new Error(err.message)
        }

        contenidoObjeto = JSON.parse(contenido);
        objetoDeleteById = contenidoObjeto.find(objeto => objeto.id === numeroId);

        if(objetoDeleteById){

            let index = contenidoObjeto.indexOf(objetoDeleteById);
            nuevoObjeto = contenidoObjeto.splice(index, 1);
            nuevoObjetoString = JSON.stringify(nuevoObjeto);

            try{ 
                await fs.promises.writeFile(`./${this.nombreArchivo}.txt`,nuevoObjetoString);
                console.log(`se ha eliminado el objeto con ID: ${objetoDeleteById.id}`);
            }catch(err){
                throw new Error(err.message)
            }

        }
        else{
            console.log("no encontró productos");
        }
    }

    async deleteAll(){
        let StringVacio = "";
        try{ 
            await fs.promises.writeFile(`./${this.nombreArchivo}.txt`,StringVacio);
            console.log(`se ha eliminado todo el contenido del archivo: "${this.nombreArchivo}.txt"`);
        }catch(err){
            throw new Error(err.message)
        }
    }

}

const producto1 = new ContenedorArchivo(1,"titulo_1",100,"URL_1","archivo1");
const producto2 = new ContenedorArchivo(2,"titulo_2",200,"URL_2","archivo1");

producto1.save(producto1);
producto2.save(producto2);

producto1.getById(2);

producto1.getAll();

// producto1.deleteById(1);

// producto1.deleteAll();