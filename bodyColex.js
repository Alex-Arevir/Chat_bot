/**
 * @param {string} phone -Numero de telefono al que se le enviará el mensaje
 * @param {string}name -Nombre de la plantilla de Meta
 * @param {string}code -Codigo del idioma en meta
 * @param {string}payload - informacion que envía Wapp al webhook en un evento (Interaccion con botton)"
 *@returns {Promise<void>}-Promesa que se resuelve cuando se completa el envio
 */


//!----------------------------------------- Area de bodies--------------------------------------------------------//

// !---------- "es_MX" = Español Mexico || "en"= English----------------//

const saludos = {//lista
  messaging_product: "whatsapp",
  type: "template",
  template: {
    name: "hello",
    language: { code: "en" },
    components: [
      {
        type: "body",
        parameters: [{ type: "text", text: "Chostito" }],
      },
      {
        type: "button",
        sub_type: "quick_reply",
        index: "0",
        parameters: [{ type: "payload", payload: "Agendar Cita" }],
      },
      {
        type: "button",
        sub_type: "quick_reply",
        index: "1",
        parameters: [{ type: "payload", payload: "Consultar Cita" }],
      },
    ],
  },
};
const horarios = {
  messaging_product: "whatsapp",
  type: "template",
  template: {
    name: "escoger_horario",
    language: {
      code: "es_MX",
    },
    components: [
      {
        type: "body",
        parameters: [
          { type: "text", text: "03/13/2025 00:00" },
          { type: "text", text: "02/08/2225 00:00" },
          { type: "text", text: "01/08/5025 00:00" },
        ],
      },
      {
        type: "button",
        sub_type: "quick_reply",
        index: "0",
        parameters: [{ type: "payload", payload: "Opcion 1" }],
      },
      {
        type: "button",
        sub_type: "quick_reply",
        index: "1",
        parameters: [{ type: "payload", payload: "Opcion 2" }],
      },
      {
        type: "button",
        sub_type: "quick_reply",
        index: "2",
        parameters: [{ type: "payload", payload: "Opcion 3" }],
      },
    ],
  },
};

 const cancelar = {//lista
  messaging_product: "whatsapp",
  type: "template",
  template: {
    name: "confirmacion",//aviso de si quieres cancelarla o no
    language: {
  code: "es_MX",
    },
    components: [
      {
        type: "button",
        sub_type: "quick_reply",
        index: "0",
        parameters: [{ type: "payload", payload: "Si" }],
      },
      {
        type: "button",
        sub_type: "quick_reply",
        index: "1",
        parameters: [{ type: "payload", payload: "No" }],
      },
    ]
  },
};



const citaCancelada = {//lista
  messaging_product: "whatsapp",
  type: "template",
  template: {
    name: "final_cancelacion",
    language: {
      code: "es_MX",
    },
  },
};

const sinCita = {//lista
  messaging_product: "whatsapp",
  type: "template",
  template: {
    name: "sin_cita",
    language: {
      code: "es_MX",
    },
  },
};


const consultar = {//muestra cita y si quieres cancelarla o volver
  messaging_product: "whatsapp",
  type: "template",
  template: {
    name: "consultar_cita",
    language: {
      code: "es_MX",
    },
    components: [
      {
        type: "body",
        parameters: [{ type: "text", text: "hora" }, { type: "text", text: "fecha" }]
      },
      {
        type: "button",
        sub_type: "quick_reply",
        index: "0",
        parameters: [{ type: "payload", payload: "¿Cancelar Cita?" }],
      },
     {
         type: "button",
         sub_type: "quick_reply",
         index: "1",
         parameters: [{ type: "payload", payload: "Volver" }],
       },
    ]
  },
};

const agendar = {//lista
  messaging_product: "whatsapp",
  type: "template",
  template: {
    name: "agendar_cita_name",
    language: {
      code: "es_MX",
    },
  },
};


const agendar2 = {
  messaging_product: "whatsapp",
  type: "template",
  template: {
    name: "agendar_cita_correo",
    language: {
      code: "en",
    },
  },
};

const finRegistro = {//lista
  messaging_product: "whatsapp",
  type: "template",
  template: {
    name: "fin_agendacion",
    language: {
      code: "es_MX",
    },
    components: [
      {
        type: "body",
        parameters: [
          { type: "text", text: "hora" },
          { type: "text", text: "fecha" }],
      }
    ]
  },
};



const salir = {
  messaging_product: "whatsapp",
  type: "template",
  template: {
    name: "hello",
    language: { code: "en" },
    components: [
      {
        type: "body",
        parameters: [{ type: "text", text: "Chostito" }],
      },
      {
        type: "button",
        sub_type: "quick_reply",
        index: "0",
        parameters: [{ type: "payload", payload: "Agendar Cita" }],
      },
      {
        type: "button",
        sub_type: "quick_reply",
        index: "1",
        parameters: [{ type: "payload", payload: "Consultar Cita" }],
      },
    ],
  },
};

const intentardeNuevo = {
  messaging_product: "whatsapp",
  type: "template",
  template: {
    name: "denuevo",
    language: { code: "es_MX" },
    components: [
      {
        type: "button",
        sub_type: "quick_reply",
        index: "0",
        parameters: [{ type: "payload", payload: "Intentar de nuevo" }],
      },
      {
        type: "button",
        sub_type: "quick_reply",
        index: "1",
        parameters: [{ type: "payload", payload: "Cancelar" }],
      },
    ],
  },
};

function body(accion) {
  switch (accion) {
    case "saludos":
      console.log(`body seleccionado: ${JSON.stringify(saludos, null, 2)} accion: ${accion}`);//plantilla de inicio
      return saludos;
    case "salir":
      console.log(`body seleccionado: ${JSON.stringify(salir, null, 2)} accion: ${accion}`);//plantilla de inicio pero para salir
      return salir;
    case "agendar":
      console.log(`body seleccionado: ${JSON.stringify(agendar, null, 2)} accion: ${accion}`);//plantilla para iniciar registro
      return agendar;
    case "consultar":
      console.log(`body seleccionado: ${JSON.stringify(consultar, null, 2)} accion: ${accion}`);//plantilla para ver la cita agendada
      return consultar;
    case "nombre":
      console.log(`body seleccionado: ${JSON.stringify(agendar, null, 2)} accion: ${accion}`);//manda la plantilla iniciar registro pero con otro estado
      return agendar;
    case "correo":
      console.log(`body seleccionado: ${JSON.stringify(agendar2, null, 2)} accion: ${accion}`);//para registrar correo
      return agendar2;
    case "finRegistro":
      console.log(`body seleccionado: ${JSON.stringify(finRegistro, null, 2)} accion: ${accion}`);//manda el final del registro
      return finRegistro;
    case "horarios":
      console.log(`body seleccionado: ${JSON.stringify(horarios, null, 2)} accion: ${accion}`);//manda para mirar los horarios disponibles
      return horarios;
    case "cancelar":
      console.log(`body seleccionado: ${JSON.stringify(cancelar, null, 2)} accion: ${accion}`);//manda para querer cancelar la cita o no
      return cancelar;
    case "confirmacion":
      console.log(`body seleccionado: ${JSON.stringify(citaCancelada, null, 2)} accion: ${accion}`);//manda plantilla  de que se ha cancelado la cita
      return citaCancelada;
    case "cancelarconfirmacion":
      console.log(`body seleccionado: ${JSON.stringify(saludos, null, 2)} accion: ${accion}`);//manda la plantilla de inicio
      return saludos;
    case "volver":
      console.log(`body seleccionado: ${JSON.stringify(saludos, null, 2)} accion: ${accion}`);
      return saludos;
    case "sinCita":
      console.log(`body seleccionado: ${JSON.stringify(sinCita, null, 2)} accion: ${accion}`);//manda plantilla de no tienes cita
      return sinCita;
    default:
      console.log(`body seleccionado: ${JSON.stringify(intentardeNuevo, null, 2)} accion: ${accion}`);//manda una plantilla de volver a intentar o cancelar
      return intentardeNuevo;
  }
}

module.exports = {
  body
}
