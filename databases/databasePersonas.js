const personas = [
    {
        id: 1,
        nombre: "marian",
        rol: "profe"
    },
    {
        id: 2,
        nombre: "will",
        rol: "tutor"
    }
];

function generarId(){
    return `${Date.now()}`
}

const databasePersonas = {
    
    obtenerTodos: () => {
        return [...personas];
    },
    obtenerSegunRol: rol => {
        return personas.filter( persona => persona.rol == rol );
    },
    obtenerSegunId: id => {
        const personaBuscada = personas.find( persona => persona.id == id );
        if(!personaBuscada){
            const error = new Error("no existe esa persona con ese ID");
            error.tipo = "db not found"
            throw error
        }
        return personaBuscada
    },
    agregarPersonas: datosPersonas => {
        //debería validar si es una persona. Ej: si ya existe no la agrego, tampoco si tiene un formato invalido, etc.
        const persona = datosPersonas;
        persona.id = generarId();
        personas.push(persona);
        return persona;
    },
    borrarPersonaSegunId: id => {
        const indiceBuscado = personas.findIndex( persona => persona.id == id);
        if(indiceBuscado == -1){
            const error = new Error("no existe ID");
            error.tipo = "db not found";
            throw error;
        }
        else{
            personas.splice(indiceBuscado,1);
        }
    },
    reemplazarPersonaSegunId: (id, datos) => {
        if(id == datos.id){
            const indiceBuscado = personas.findIndex( persona => persona.id == id);
            if(indiceBuscado == -1){
                const error = new Error("no existe ID");
                error.tipo = "db not found";
                throw error;
            }
            else{
                const persona = datos;
                persona.id = id;
                personas[indiceBuscado] = persona;
                return persona;
            }
        }
        else{
            const error = new Error("ID params distinto a ID objeto");
            throw error;
        }

    }

};

module.exports = { databasePersonas }