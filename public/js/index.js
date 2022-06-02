const socket = io();





socket.on("mensajes", ({ mensajes }) => {
    console.log(mensajes)
    mostrarMensajes(mensajes)
});

const btnEnviar = document.getElementById("btnEnviar");
btnEnviar.addEventListener("click", event => {
    const autor = document.getElementById("autor").value
    const texto = document.getElementById("input").value
    let date = new Date();
    let fecha = String(date.getDate()).padStart(2, '0') + '/' + String(date.getMonth() + 1).padStart(2, '0') + '/' + date.getFullYear();
    let hora = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
    const mensaje = { "autor": autor, "texto": texto, "fecha":fecha, "hora":hora}
    socket.emit("mensaje",  mensaje  )
})

function mostrarMensajes(mensajes){


    const divMensajes = document.getElementById("divMensajes");
    // const lineasMensajes = mensajes.map( linea => `${linea.autor} : ${linea.texto}`)
    const lineasMensajesHtml = mensajes.map( linea => `
    <div class="d-flex justify-content-start">
        <div class"">
            <span class="text-info bg-dark m-1"> 
            ${linea.autor}
            </span>
        </div>
        <div class"">
        <span class="text-warning bg-dark"> 
        [ ${linea.fecha} - ${linea.hora} ]
        </span>
    </div>
        <div class"">
            <span class="m-1"> 
            :
            </span>
        </div>
        <div class="">
            <span class="text-success m-1"> 
                ${linea.texto}
            </span>
    </div>
    </div>
    `)
    const html = 
    `
        ${lineasMensajesHtml.join(" ")}
    `;
    divMensajes.innerHTML = html;
}
