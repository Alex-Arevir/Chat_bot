const db = require('./db')
const { body } = require('./bodyColex')
const diccionario = require('./Diccionario')
const { Mresp } = require('./Mresp')

async function switchEstados(message, from) {
    const estado = db.obtenerEstadobytelefono(from);
    console.log("estado: ", estado);
    switch (estado) {
        case null:
            await switchNull(message, from);
            break;

        case "inicio":
            await switchNull(message, from);
            break;
        case "esperando_opcion":
            await switchEsperandoOpcion(message, from);
            break;
        case "esperando_nombre":
            await switchEsperandoNombre(message, from);
            break;
        case "esperando_correo":
            await Mresp(from, body("correo"));
            db.guardarEstado(from, "inicio");
            break;
        case "esperando_salir_consulta":
            await switchEsperandoSalirConsulta(message, from);
            break;
        case "esperando_confirmacion":
            await switchEsperandoConfirmacion(message, from);
            break;
        default:
            console.log("este estado no se encuentra en el servidor");
            break;
    }
}

async function switchNull(message, from){
    const accion = diccionario.accion(message);
    switch(accion) {
        case "saludos":
            await Mresp(from, body(accion));
            db.guardarEstado(from, "esperando_opcion");
            break;
        default:
            await Mresp(from, body(accion));
            db.guardarEstado(from, "intentardeNuevo");
            break;
    }
}

async function switchEsperandoOpcion(message, from){
    const accion = diccionario.accion(message);
    switch(accion) {
        case "agendar":
            await Mresp(from, body(accion));
            db.guardarEstado(from, "esperando_nombre");
            break;
        case "consultar":
            await Mresp(from, body(accion));
            db.guardarEstado(from, "esperando_salir_consulta");
            break;
        case "salir":
            await Mresp(from, body(accion));
            db.guardarEstado(from, "inicio");
            break;
        default:
            await Mresp(from, body(accion));
            db.guardarEstado(from, "intentardeNuevo");
            break;
    }
}

async function switchEsperandoNombre(message, from){
    const accion = diccionario.accion(message);
    switch(accion) {
        case "salir":
            await Mresp(from, body(accion));
            db.guardarEstado(from, "inicio");
            break;
        default:
            await Mresp(from, body("nombre"));
            db.guardarEstado(from, "esperando_correo");
            break;
    }
}

async function switchEsperandoSalirConsulta(message, from){
    const accion = diccionario.accion(message);
    switch(accion) {
        case "cancelar":
            await Mresp(from, body(accion));
            await db.guardarEstado(from, "esperando_confirmacion");
            break;
        case "volver":
            await Mresp(from, body(accion));
            db.guardarEstado(from, "esperando_opcion");
            break;
        default:
            await Mresp(from, body("intentardeNuevo"));
            db.guardarEstado(from, "esperando_opcion");
    }
}

async function switchEsperandoConfirmacion(message, from){
    const accion = diccionario.accion(message);
    switch(accion){
        case "confirmacion":
            await Mresp(from, body(accion));
            db.guardarEstado(from, "inicio");
            break;
        case "cancelarConfirmacion":
            await Mresp(from, body(accion));
            db.guardarEstado(from, "esperando_opcion");
            break;
        default:
            await Mresp(from, body("intentardeNuevo"));
            db.guardarEstado(from, "esperando_opcion");
            break;
    }
}


module.exports = {
    switchEstados
}