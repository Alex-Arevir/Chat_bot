const db = require('./db')
const { body } = require('./bodyColex')
const diccionario = require('./Diccionario')
const { Mresp } = require('./Mresp')

/**
 * @param {string}switchEstados-funcion que maneja los estados del flujo de conversacion
 * @param {string} message -Mensaje recibido del usuario
 * @param {string} from -Lo que se recibe del numero de telefono del usuario
 * @returns {Promise<void>} - Promesa que se resuelve cuando se completa el envio de mensaje
 */

// Funcion que maneja los estados del flujo de conversacion
async function switchEstados(message, from) {//async es una funcion asincrona que permite esperar a que se completen las promesas dentro de ella)
    const estado = db.obtenerEstadobytelefono(from);//se utiliza el db para obtener el estado del usuario (el telefono)
    console.log("estado: ", estado);//imprime el estado actual del usuario
    switch (estado) {//se utiliaza el switch para manejar los diferentes estados de la conversacion
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
//!-------------funciones que utiliza el switcb para manejar los estados de la converzacion--------------------
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