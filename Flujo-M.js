const path = require("path");
const axios = require ("axios");
const fs = require ("fs");
//aqui van las plantillas, las quue se tengan}
const{
    hello,
    
}= require("./Plantiillas");


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

const Clave_Saludos = [
"hola","buenas","buen día","buenas tardes", "buenas noches", "qué tal", "hola bot", "hey","holi","saludos","que onda","qué hay"

];
const ClaveCita=[
    "agendar cita","reservar cita","hacer cita","Agendar Cita","Agendarcita","agendarCita","Agendar","agendar"
];

const ClaveCancelar=["cancelar","Cancelar","cancelar cita","Cancelar cita","Cancelar Cita","cancelarcita","Cancelarcita","Canselar sita"

];

const ClaveConsultar=[
    "consultar cita","consultar Citas","ver citas","versitas","Consultar","consultar"
];


let action ="";

let extractedValue="";


if(Clave_Saludos.some((saludo)=>text.includes(saludo))){
action= "saludo";
} else if  (ClaveCita.some((cita)=>text.includes(cita)) || buttonReply ==="btn_agendar_cita"){
    action="agendar_cita";  
}else if (ClaveCancelar.some(cancelar=> text.includes(cancelar)) || buttonReply ==="btn_cancelarcita"){
    action="cancelar_cita";
}else if (ClaveConsultar.some(consulta=> text.includes(consulta))|| buttonReply ==="btn_consultar_cita"){
    action= "consultar_cita";
}

switch(action){
    case "saludo":
        await enviarplantillaWapp(from,"hello");
        break;

    case "agendar_cita":
        await iniciarAgenda(from,"agendar_cita_name" );
        break;
    case"cancelar_cita":
    await IniciarCancelacion(from,"" );
        break; 

    case "consultar_cita":
        await Consultacita(from);
        break;
    default:
        await plantillaNoentiendo(from,"no_entiendo");
        console.log("No hay plantilla que coincida");
}
res.status(200).send("Mensaje Procesado");


if('agendar_cita_name'.some((n)=>text.includes(n))){ 
            
}
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