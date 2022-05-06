
const fs = require("fs");

const fecha = new Date().toLocaleDateString();

rutaNombreArchivo = "./fyh.txt";

try{
    fs.appendFileSync(rutaNombreArchivo, `fecha: ${fecha}\n`, "utf-8");   
} catch (err){
    throw new Error(`Error de escritura: ${err.message}`)
}


try{
    const data = fs.readFileSync(rutaNombreArchivo, "utf-8");
    console.log(data);
} catch (err){
    throw new Error(`Error de lectura: ${err.message}`);
}

