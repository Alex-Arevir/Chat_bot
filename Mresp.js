//Este archivo maneja el envio de mensajes a traves de la Api de whats
const axios = require("axios");
//const fs = require("fs");
const apiBaseUrl= `https://graph.facebook.com/v22.0/${process.env.PHONE_NUMBER_ID}/messages`;
const authtoken = `Bearer ${process.env.TOKEN}`;


const Mresp = async(from, body)=>{//Fucion que encapsula el envio de mensajjes
    try{
        body.to= from;
        const response = await axios.post(
            apiBaseUrl,//apiBaseUrl es la url de la api de whats
            body,//body es el cuerpo  del mensaje que se enviara
            {
                headers:{
                    Authorization: authtoken,
                    "Content-Type": "application/json",
                }
            }
        );
        
        console.log("mensaje enviao",response.data);//imprime el que se mando el mensaje
        return response.data;
    }catch(error){
    console.error("error enviao: ",error.response?.data || error.message);//debug
    throw error;
    }
};
module.exports= {
    Mresp,

};