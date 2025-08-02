/**
 * @param {string} phone -Numero de telefono al que se le enviará el mensaje
 * @param {string}name -Nombre de la plantilla de Meta
 * @param {string}code -Codigo del idioma en meta
 * @param {string}payload - informacion que envía Wapp al webhook en un evento (Interaccion con botton)"
 *@returns {Promise<void>}-Promesa que se resuelve cuando se completa el envio
 */

const phone = "526181670762";

//!----------------------------------------- Area de bodies--------------------------------------------------------//

// !---------- "es_MX" = Español Mexico || "en"= English----------------//

const saludos = {//lista
  messaging_product: "whatsapp",
  to: phone,
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
        parameters: [{ type: "payload", payload: "btn_agendar_cita" }],
      },
      {
        type: "button",
        sub_type: "quick_reply",
        index: "1",
        parameters: [{ type: "payload", payload: "btn_cancelarcita" }],
      },
      {
        type: "button",
        sub_type: "quick_reply",
        index: "2",
        parameters: [{ type: "payload", payload: "btn_consultar_cita" }],
      },
    ],
  },
};

const cancelar = {//lista
  messaging_product: "whatsapp",
  to: phone,
  type: "template",
  template: {
    name: "confirmacion",
    language: {
      code: "es_MX",
    },
    components: [
      {
        type: "button",
        sub_type: "quick_reply",
        index: "0",
        parameters: [{ type: "payload", payload: "confirmar" }],
      },
      {
        type: "button",
        sub_type: "quick_reply",
        index: "1",
        parameters: [{ type: "payload", payload: "no" }],
      }
    ]
  },
};

const citaCancelada = {//lista
  messaging_product: "whatsapp",
  to: phone,
  type: "template",
  template: {
    name: "final_cancelacion",
    language: {
      code: "es_MX",
    },
  },
};


const consultar = {//lista
  messaging_product: "whatsapp",
  to: phone,
  type: "template",
  template: {
    name: "consultar_cita",
    language: {
      code: "es_MX",
    },
    components: [
      {
        type: "body",
        parameters: [{ type: "text", text: "25/08/2025" }, { type: "text", text: "10:00 AM" }]
      },
      {
        type: "button",
        sub_type: "quick_reply",
        index: "0",
        parameters: [{ type: "payload", payload: "cancelar" }],
      },
      // {
      //   type: "button",
      //   sub_type: "quick_reply",
      //   index: "1",
      //   parameters: [{ type: "payload", payload: "" }],
      // },
    ]
  },
};

const agendar = {//lista
  messaging_product: "whatsapp",
  to: phone,
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
  to: phone,
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
  to: phone,
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
          { type: "text", text: "20/08/2025" },
          { type: "text", text: "10:00 AM" }],
      }
    ]
  },
};



const salir = {
  messaging_product: "whatsapp",
  to: phone,
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
        parameters: [{ type: "payload", payload: "btn_agendar_cita" }],
      },
      {
        type: "button",
        sub_type: "quick_reply",
        index: "1",
        parameters: [{ type: "payload", payload: "btn_cancelarcita" }],
      },
      {
        type: "button",
        sub_type: "quick_reply",
        index: "2",
        parameters: [{ type: "payload", payload: "btn_consultar_cita" }],
      },
    ],
  },
};

const intentardeNuevo = {
  messaging_product: "whatsapp",
  to: phone,
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
        parameters: [{ type: "payload", payload: "btn_agendar_cita" }],
      },
      {
        type: "button",
        sub_type: "quick_reply",
        index: "1",
        parameters: [{ type: "payload", payload: "btn_cancelarcita" }],
      },
      {
        type: "button",
        sub_type: "quick_reply",
        index: "2",
        parameters: [{ type: "payload", payload: "btn_consultar_cita" }],
      },
    ],
  },
};

function body(accion) {
  switch (accion) {
    case "saludos":
      console.log(`body seleccionado: ${saludos} accion: ${accion}`);
      return saludos;
    case "salir":
      console.log(`body seleccionado: ${salir} accion: ${accion}`);
      return salir;
    case "agendar":
      console.log(`body seleccionado: ${agendar} accion: ${accion}`);
      return agendar;
    case "consultar":
      console.log(`body seleccionado: ${consultar} accion: ${accion}`);
      return consultar;
    case "nombre":
      console.log(`body seleccionado: ${agendar2} accion: ${accion}`);
      return agendar2;
    case "correo":
      console.log(`body seleccionado: ${finRegistro} accion: ${accion}`);
      return finRegistro;
    case "cancelar":
      console.log(`body seleccionado: ${cancelar} accion: ${accion}`);
      return cancelar;
    case "confirmacion":
      console.log(`body seleccionado: ${citaCancelada} accion: ${accion}`);
      return citaCancelada;
    case "cancelarConfirmacion":
      console.log(`body seleccionado: ${saludos} accion: ${accion}`);
      return saludos;
    default:
      console.log(`body seleccionado: ${intentardeNuevo} accion: ${accion}`);
      return intentardeNuevo;
  }
}
module.exports = {
  body
}
