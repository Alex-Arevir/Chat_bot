
const fs = require("fs");//guarda los logs de las solicitudes entrantes
const { switchEstados } = require("./flujo");// importa la funcione de los  estados de flujo

/** //!-----Aqui se maneja la resspuesta del webhook----------
 *--Meramente documentativo, para que se vea Bonis
 * @param {string} from - Número de teléfono del usuario.
 * @param {string} text - Texto del mensaje recibido.
 * @param {string} crudeMessage -Es el dato "crudo" del mensaje antes de  ser procesado.
 * @param {Object} req- Objeto de solicitud de Express.
 * @param {Object} res- Objeto de respuesta de Express.
 * 
 * @returns {Promise<void>}
 */

module.exports = async (req, res) => {
  try {
  //logs de solicitud entrante
  const data = req.body;

  fs.appendFileSync(//Guarda los logs de las soicitudes entrantes(Lo guarda en un archivo)
    "Logs_post.txt",
    `${new Date().toISOString()} - POST request: ${JSON.stringify(data)}\n`
  );


  const crudeMessage = data?.entry?.[0]?.changes?.[0]?.value?.messages?.[0]; // estructura del mensaje(body)
  if (!crudeMessage) return res.status(400).send("No se encuentra el Mensaje");//si no hay un mensaje, el problema viene de ti "400".

  let message; // body si es texto, payload si es boton
  const from = crudeMessage.from;//se obtine algo del telefono del usuario
  const messageType = crudeMessage.type;//se obtiene el tipo de mensaje
  if (messageType === "text") {//si el mensaje es tipo texto
    message = crudeMessage.text.body;//el mensaje se iguala al crudo inicial, y si si. ps jala
  } else if (messageType === "button") {
    message = crudeMessage.button.payload;//lo mismo pero ahora tomando la informacion del payload(boton)
  } else {
    return res.status(400).send("Tipo de mensaje no soportado");//si no existe el tipo de mensaje que se espera, arroja un error 400
  }

  await switchEstados(message, from);//llama a la funcion de los estados de flujo
  res.status(200).send("EVENT RECEIVED");//arroja un 200  si el mensaje se proceso(se envia y asi)
  } catch (error) {
    console.log(error);//si hay un error, se imprime
    res.status(500).send("Error interno del servidor");
  }
}