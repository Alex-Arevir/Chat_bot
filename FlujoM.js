const path = require("path");
const axios = require("axios");
const fs = require("fs");
//aqui van las plantillas, las quue se tengan}
const plants = require("./bodyColex");
const { Mresp } = require("./Mresp");

module.exports = async (req, res) => {
  //logs de solicitud entrante
  const data = req.body;

  fs.appendFileSync(
    "Logs_post.txt",
    `${new Date().toISOString()} - POST request: ${JSON.stringify(data)}\n`
  );

  try {
    const message = data?.entry?.[0]?.change?.[0]?.value?.message?.[0];
    //si no hay un mensaje, el problema viene de ti "400".
    if (!message) return res.status(400).send("No se encuentra el Mensaje");

    const from = message.from;
    const text = message.text?.body?.toLowerCase() || "";
    const buttonReply =
      message.interactive?.button_reply?.id?.toLowerCase() || "";

    //diccionario de saludos
    const dix = require("./Diccionario");

    //let extractedValue = ""; --Pa que wea es esto?

    if (
      buttonReply === "btn_agendar_cita" ||
      dix.agendar.some((cita) => text.includes(cita))
    ) {
      await Mresp(from, plants.agendar);
    } else if (
      buttonReply === "btn_cancelarcita" ||
      dix.cancelar.some((cancelar) => text.includes(cancelar))
    ) {
      await Mresp(from, plants.cancelar);
    } else if (
      buttonReply === "btn_consultar_cita" ||
      dix.consultar.some((consultar) => text.includes(consultar))
    ) {
      await Mresp(from, plants.consultar);
    } else if (dix.saludos.some((saludo) => text.includes(saludo))) {
      await Mresp(from, plants.saludos);
    } else {
      console.log("No hay plantilla que coincida");
      console.error("No Se entiende el Coso");
    }
    res.status(200).send("Mensaje Procesado");
  } catch (error) {
    console.error("Error al Procesar el Mensaje:", error);
    res.status(500).send("Shin, error interno");
  }
};

/*ejemplo de Botton
}else if{text.includes("menu") || buttonReply === "btn_menu" ||buttonReply=== "btn_promos"
action="menu";
}
*/
