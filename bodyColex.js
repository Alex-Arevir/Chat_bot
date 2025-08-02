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

const saludos = {
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

const cancelar = {
  messaging_product: "whatsapp",
  to: phone,
  type: "template",
  template: {
    name: "cancelar_cita_name",
    language: {
      code: "es_MX",
    },
  },
};

const cancelar2 = {
  messaging_product: "whatsapp",
  to: phone,
  type: "template",
  template: {
    name: "cancelar_cita_telefono",
    language: {
      code: "es_MX",
    },
  },
};
const fin_cancelacion = {
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

const consultar = {
  messaging_producto: "whatsapp",
  to: phone,
  type: "template",
  remplate: {
    name: "consultar_cita",
    language: {
      code: "",
    },
  },
};

const agendar = {
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
/*
const agendar2 = {
  messaging_producto: "whatsapp",
  to: phone,
  type: "template",
  remplate: {
    name: "agendar_cita_telefono",
    language: {
      code: "es_MX",
    },
  },
};
*/
const agendar2 = {
  messaging_producto: "whatsapp",
  to: phone,
  type: "template",
  remplate: {
    name: "agendar_cita_correo",
    language: {
      code: "es_MX",
    },
  },
};

module.exports = {
  saludos,
  agendar,
  agendar2,
  //agendar3,
  cancelar,
  cancelar2,
  fin_cancelacion,
  consultar,
};
