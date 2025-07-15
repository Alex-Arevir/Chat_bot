const path = require("path");
const axios = require ("axios");
const fs = require ("fs");
//aqui van las plantillas, las quue se tengan}
const{
    hello,
    
}= require("/plantillas");


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

const Caja_Saludos = [
"hola","buenas","buen día","buenas tardes", "buenas noches", "qué tal", "hola bot", "hey","holi","saludos","que onda","qué hay"

];


let action ="";

let extractedValue="";



if(Caja_Saludos.some((saludo)=>text.include(saludo))){
action= "saludo";
}

switch(action){
    case "saludo":
        await plantilla_saludo(from,"hello_world");
        break;        

        case "":
    default:
        console.log("No hay plantilla que coincida");
}
res.status(200).send("Mensaje Procesado");


//ejemplo de Botton
/*
}else if{text.include("menu") || buttonReply === "btn_menu" ||buttonReply=== "btn_promos"
action="menu";
}
*/


} catch (error) {
    console.error("Error al Procesar el Mensaje:", error);
    res.status(500).send("Error Interno");
}
};