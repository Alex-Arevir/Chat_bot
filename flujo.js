const db = require('./db')
const { body } = require('./bodyColex')
const diccionario = require('./Diccionario')
const { Mresp } = require('./Mresp')
const e = require('cors');

/**
 * @param {string}switchEstados-funcion que maneja los estados del flujo de conversacion
 * @param {string} message -Mensaje recibido del usuario
 * @param {string} from -Lo que se recibe del numero de telefono del usuario
 * @returns {Promise<void>} - Promesa que se resuelve cuando se completa el envio de mensaje
 */
function validarCorreo(email) {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
}
function plantillaCita(cita, nombrePlantilla) {
  // Manejar fecha en Date o string ISO
  let fechaISO
  if (typeof cita.fecha === 'string') {
    // fecha en string ISO o formato DateTime MySQL
    fechaISO = cita.fecha.split('T')[0]
  } else if (cita.fecha instanceof Date) {
    fechaISO = cita.fecha.toISOString().split('T')[0]
  } else {
    fechaISO = ''
  }

  // Formatear fecha dd-mm-yyyy
  const [yyyy, mm, dd] = fechaISO.split('-') || []
  const fechaFormateada = dd && mm && yyyy ? `${dd}-${mm}-${yyyy}` : fechaISO

  return {
    messaging_product: 'whatsapp',
    type: 'template',
    template: {
      name: nombrePlantilla,
      language: { code: 'es_MX' },
      components: [
        {
          type: 'body',
          parameters: [
            { type: 'text', text: fechaFormateada },
            { type: 'text', text: cita.hora || '' },
          ],
        },
      ],
    },
  }
}


// Funcion que maneja los estados del flujo de conversacion
async function switchEstados(message, from) {//async es una funcion asincrona que permite esperar a que se completen las promesas dentro de ella)
    const estado = await db.obtenerEstadobytelefono(from);//se utiliza el db para obtener el estado del usuario (el telefono)
    console.log("estado: ", estado);//imprime el estado actual del usuario
    switch (
      estado //se utiliaza el switch para manejar los diferentes estados de la conversacion
    ) {
      case null:	
      await db.crearUsuario(from, "inicio");
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
        await switchEsperandoCorreo(message, from);
        break;

      case "esperando_horario":
        await switchEnviarHorariosDisponibles(message, from);
        break;

      case "esperando_confirmar_horario":
        await switchConfirmarHorario(message, from);
        break;

      case "fin_de_registro":
        await switchFinRegistro(from, "inicio");
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
  console.log("Mensaje recibido en switchNull:", JSON.stringify(message));
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

async function switchEsperandoOpcion(message, from) {
  console.log("Mensaje recibido en switchEsperandoOpcion:", JSON.stringify(message));
  const accion = diccionario.accion(message);
  switch (accion) {
    case "agendar":
      await Mresp(from, body(accion));
      await db.guardarEstado(from, "esperando_nombre");
      break;

    case "consultar":
      if (message === "Consultar Cita") {
        const citas = await db.obtenerCitasUsuario(from, message);

        if (citas && citas.length > 0) {
          const ultima = citas[citas.length - 1];
          await Mresp(from, plantillaCita(ultima, "consultar_cita"));
          await db.guardarEstado(from, "esperando_salir_consulta");
        } else {
          // No hay citas para mostrar
          await Mresp(from, body("sinCita"));
          await Mresp(from, body("saludos"));
          await db.guardarEstado(from, "esperando_opcion");
        }
      }
      break;

    case "salir":
      await Mresp(from, body(accion));
      await db.guardarEstado(from, "esperando_opcion");
      break;

    default:
      await Mresp(from, body("saludos"));
      db.guardarEstado(from, "esperando_opcion");
      break;
  }
}


async function switchEsperandoNombre(message, from) {
  console.log("Mensaje recibido en switchEsperandoNombre:", JSON.stringify(message));
  try {
    const accion = diccionario.accion(message);
    if (message === "volver" || accion === "volver") {
      await Mresp(from, body("salir"));
      await db.guardarEstado(from, "esperando_opcion");
    } else if (accion === "intentardenuevo" || message.trim().length === 0) {
      // Solo enviar plantilla para intentar nombre otra vez, sin cambiar estado
      await Mresp(from, body("nombre"));
      // Estado sigue "esperando_nombre"
    } else {
      await db.guardarNombre(from, message);
      await Mresp(from, body("correo"));
      await db.guardarEstado(from, "esperando_correo");
    }
  } catch (error) {
    console.error("error en guardar nombre: ", error);
  }
}

async function switchEsperandoCorreo(message, from) {
  console.log("Mensaje recibido en switchEsperandoConfirmacion:", JSON.stringify(message));
  try {
    const accion = diccionario.accion(message);
    if (message === "volver" || accion === "volver") {
      await Mresp(from, body("salir"));
      await db.guardarEstado(from, "esperando_opcion");
    } else if (accion === "intentardenuevo" || !validarCorreo(message)) {
      // Solo enviar plantilla para intentar correo otra vez, sin cambiar estado
      await Mresp(from, body("correo"));
      // Estado sigue "esperando_correo"
    } else {
      await db.guardarCorreo(from, message);
      await db.guardarEstado(from, "esperando_horario");
      await switchEnviarHorariosDisponibles("", from);
    }
  } catch (error) {
    console.error("error en guardar correo: ", error);
  }
}

async function switchEnviarHorariosDisponibles(message, from) {
  try {
    const horarios = await db.obtenerHorariosDisponibles();

    if (horarios && horarios.length >= 3) {
      await Mresp(from, {
        messaging_product: "whatsapp",
        type: "template",
        template: {
          name: "escoger_horario",
          language: { code: "es_MX" },
          components: [
            {
              type: "body",
              parameters: [
                { type: "text", text: horarios[0] },
                { type: "text", text: horarios[1] },
                { type: "text", text: horarios[2] },
              ],
            },
          ],
        },
      });

      await db.guardarEstado(from, "esperando_confirmar_horario");
    }
  } catch (error) {
    console.error("Error en switchEnviarHorariosDisponibles:", error);
  }
}

async function switchConfirmarHorario(message, from) {
  try {
    const horarios = await db.obtenerHorariosDisponibles();

    const match = message.match(/\d+/);
    const index = match ? parseInt(match[0], 10) - 1 : -1;

    if (!isNaN(index) && index >= 0 && index < horarios.length) {
      const horarioElegido = horarios[index];
      const [fecha, hora] = horarioElegido.split(' ');
      await db.horariosRegistradosCitas(from, fecha, hora);

      await db.guardarEstado(from, "fin_de_registro");
      await switchFinRegistro(from);
    }
  } catch (error) {
    console.error("Error en confirmar horario: ", error);
  }
}


async function switchFinRegistro(from) {
  try {
    const fechas = await db.obtenerCitasUsuario(from)

    if (fechas && fechas.length > 0) {
      const ultima = fechas[fechas.length - 1] // última cita
      await Mresp(from, plantillaCita(ultima, 'fin_agendacion'));
      await Mresp(from, body("saludos"));
      await db.guardarEstado(from, 'esperando_opcion');
    } else {
      await Mresp(from, body('intentardeNuevo'));
      await Mresp(from, plantillaCita(ultima, 'fin_agendacion'));
      await new Promise(r => setTimeout(r, 1500));
      await Mresp(from, body("saludos"));
      await db.guardarEstado(from, 'esperando_opcion');
    }
  } catch (error) {
    console.error('Error en fin_de_registro: ', error)
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

async function switchEsperandoConfirmacion(message, from) {
  console.log("Mensaje recibido en switchEsperandoConfirmacion:", JSON.stringify(message));
  const accion = diccionario.accion(message);

  switch (accion) {
    case "confirmacion":
      const accion = diccionario.accion(message);
      const citas = await db.obtenerCitasUsuario(from);
      if (citas && citas.length > 0) {
        const ultima = citas[citas.length - 1];
        await db.borrarCitaUsuario(from, ultima.fecha, ultima.hora);
        await Mresp(from, body(accion)); // Mensaje claro de cancelación exitosa
        await db.guardarEstado(from, "esperando_opcion"); // Estado para seguir interactuando
        await new Promise(r => setTimeout(r, 1500));
        await Mresp(from, body("saludos"));    
      } else {
        await Mresp(from, body("sinCita"));
        await Mresp(from, body("saludos"));
        await db.guardarEstado(from, "esperando_opcion");
      }
      break;

    case "cancelarconfirmacion":
      await Mresp(from, body("saludos"));
      await db.guardarEstado(from, "esperando_opcion");
      break;

    default:
      await Mresp(from, body("intentardeNuevo"));
      await db.guardarEstado(from, "esperando_opcion");
      break;
  }
}



module.exports = {
    switchEstados
}