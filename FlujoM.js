const path = require("path");
const axios = require ("axios");
const fs = require ("fs");
//aqui van las plantillas, las quue se tengan}
const plants = require("./bodyColex");
const { Mresp } = require("./Mresp");


module.exports = async(req,res) => {
//logs de solicitud entrante
const data = req.body;

fs.appendFileSync(
    "Logs_post.txt",
    `${new Date().toISOString()} - POST request: ${JSON.stringify(data)}\n`
);

try{
    const message = data?.entry?.[0]?.change?.[0]?.value?.message?.[0];
    //si no hay un mensaje, el problema viene de ti "400".
    if(!message) return res.status(400).send("No se encuentra el Mensaje");

const from= message.from;
const text = message.text?.body?.toLowerCase() || "";
const buttonReply = message.interactive?.button_reply?.id.toLowerCase() || "";


//diccionario de saludos
const dix = require("./Diccionario");


let action ="";

let extractedValue="";

// if's para manejar los mesajes recibidos y sacar
if(dix.saludos.some((saludo)=>text.includes(saludo))){
action= "saludo";
} else if  (dix.agendar.some((cita)=>text.includes(cita)) || buttonReply ==="btn_agendar_cita"){
    action="agendar_cita";
}else if (dix.cancelar.some(cancelar=> text.includes(cancelar)) || buttonReply ==="btn_cancelarcita"){
    action="cancelar_cita";
}else if (dix.consultar.some(consulta=> text.includes(consulta))|| buttonReply ==="btn_consultar_cita"){
    action= "consultar_cita";
}

switch (action) {
      case "saludo":
        await Mresp(from, plants.hello);
        break;
      case "agendar_cita":
        await Mresp(from, plants.agendar);
        break;
      case "cancelar_cita":
        await Mresp(from, plants.cancelar);
        break;
      case "consultar_cita":
        await Mresp(from);
        break;
      default:
        await plantillaNoentiendo(from, plants.noEntiendo);
        console.log("No hay plantilla que coincida");
}
res.status(200).send("Mensaje Procesado");




//ejemplo de Botton
/*
}else if{text.includes("menu") || buttonReply === "btn_menu" ||buttonReply=== "btn_promos"
action="menu";
}
*/


} catch (error) {
    console.error("Error al Procesar el Mensaje:", error);
    res.status(500).send("Error Interno");
}
};