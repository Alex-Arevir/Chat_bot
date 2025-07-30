// const { consultar,agendar,saludos,cancelar} = require("./Diccionario");
// area de bodies
const saludos = {
  messaging_product: "whatsapp",
  to: "526181670762",
  type: "template",
  template: {
    name: "hello",
    language: { code: "en" },
    components: [
      {
        type: "body",
        parameters: [
          { type: "text", text: "Juanin" }
        ]
      },
      {
        type: "button",
        sub_type: "quick_reply",
        index: "0",
        parameters: [{ type: "payload", payload: "btn_agendar_cita" }]
      },
      {
        type: "button",
        sub_type: "quick_reply",
        index: "1",
        parameters: [{ type: "payload", payload: "btn_cancelarcita" }]
      },
      {
        type: "button",
        sub_type: "quick_reply",
        index: "2",
        parameters: [{ type: "payload", payload: "btn_consultar_cita" }]
      }
    ]
  }
};

const agendar = {
  messaging_product: "whatsapp",
  to: "526181670762",
  type: "template",
  template: {
    name: "agendar_cita_name",
    language: {
      code: "es_MX",
    },
  },
};


const cancelar = {
  messaging_product: "whatsapp",
  to: "526181670762",
  type: "template",
  template: {
    name: "cancelar_cita_name",
    language: {
      code: "es_MX",
    },
  },
};

const consultar ={
    messaging_producto: "whatsapp",
    to: "526181670762",
    type: "template",
    remplate: {
        name: "consultar_cita",
        language:{
            code: "",
        },
    },
};

const noEntiendo ={
    messaging_producto: "whatsapp",
    to: "526181670762",
    type: "template",
    remplate: {
        name: "no_Entiendo",
        language:{
            code: "",
        },
    },
};




module.exports={
    saludos,
    agendar,
    cancelar,
    consultar,
    noEntiendo
};  