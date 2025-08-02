const fs = require("fs");
const { switchEstados } = require("./flujo");
//aqui van las plantillas, las quue se tengan}

/** 
 *
 * @param {string} from - Número de teléfono del usuario.
 * @param {string} text - Texto del mensaje recibido.
 * @param {string} buttonReply - Botón presionado.
 * @returns {Promise<void>}
 */
module.exports = async (req, res) => {
  try {
      //logs de solicitud entrante
  const data = req.body;

  fs.appendFileSync(
    "Logs_post.txt",
    `${new Date().toISOString()} - POST request: ${JSON.stringify(data)}\n`
  );


  const crudeMessage = data?.entry?.[0]?.changes?.[0]?.value?.messages?.[0]; // estructura del mensaje
    //si no hay un mensaje, el problema viene de ti "400".
  if (!crudeMessage) return res.status(400).send("No se encuentra el Mensaje");

  let message; // body si es texto, payload si es boton
  const from = crudeMessage.from;//se obtine algo del telefono del usuario
  const messageType = crudeMessage.type;//se obtiene el tipo de mensaje
  if (messageType === "text") {//si el mensaje es tipo texto
    message = crudeMessage.text.body;//el mensaje se iguala al crudo inicial, y si si. ps jala
  } else if (messageType === "button") {
    message = crudeMessage.button.payload;//lo mismo pero ahora tomando la informacion del payload(boton)
  } else {
    return res.status(400).send("Tipo de mensaje no soportado");
  }

  await switchEstados(message, from);
  res.status(200).send("EVENT RECEIVED");
  } catch (error) {
    console.log(error);
    res.status(500).send("Error interno del servidor");
  }
}