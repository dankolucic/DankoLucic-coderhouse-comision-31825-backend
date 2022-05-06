
let objetos = [];

class Contenedor {
    constructor(id, title, price,thumbnail ) {
      this.id = id;
      this.title = title;
      this.price = price;
      this.thumbnail = thumbnail;
      
    }

    save(objeto){
        objetos.push(objeto);
        console.log(`se ha agragado el siguiente objeto ID: ${objeto.id}`);
    }

    getById(numeroId){
        let objetoGetById = objetos.find(objeto => objeto.id === numeroId);
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

    getAll(){
        console.log("a continuación el array de objetos")
        console.log(objetos);
        return objetos;
    }

    deleteById(numeroId){
        let objetoDeleteById = objetos.find(objeto => objeto.id === numeroId);
        if(objetoDeleteById){
            let index = objetos.indexOf(objetoDeleteById);
            objetos.splice(index, 1);
            console.log(`se ha eliminado el objeto con ID: ${objetoDeleteById.id}`);
        }
        else{
            console.log("no encontró productos");
        }
    }

  }

  const producto1 = new Contenedor(1,"titulo_1",100,"URL_1");
  const producto2 = new Contenedor(2,"titulo_2",200,"URL_2");

  producto1.save(producto1);
  producto2.save(producto2);

  producto1.getById(2);

  producto1.getAll();

  producto1.deleteById(1);


