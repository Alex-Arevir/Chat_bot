const path = require("path");
const axios = require ("axios");
const fs = require ("fs");
//aqui van las plantillas, las quue se tengan}
const{
    plantilla1,
    plantilla2,
}= require(",/plantillas")


module.exports = async(req,res) => {
//logs de solicitud entrante
fs.appendFileSync(
    "Logs_post.txt",
    `${new Date().toISOString()} - POST request: ${JSON.stringify(data)}\n`
);
try{
    const message = data?.entry?.[0]?.change?.[0]?.value?.message?.[0];
    //si no hay un mensaje, el problema viene de ti "400".
    if(!message) return res.status(400).send("No se encuentra el Mensaje");
const from= message.from;
const text = message.text?.body?.toLowerCase()|| "";
const buttonReply= message.interactive?.button_Reply?.id.toLowerCase()|| "";


//diccionario de saludos

const Caja_Saludos = [
"hola","Buen dia", "ola","hey", "HEy", "Hey", 
];


}catch(error){
    console.error("Error al Procesar el Mensaje:", error);
res.status(500).send("Error Interno");
};

}