//declaracion  de constantes y cosas que se vana utilizar usando el node.js
require('dotenv').config();
const express = require("express");
const token = require("./token");
const cors = require ("cors");
const path = require("path");
const axios = require ("axios");
const fs = require ("fs");
const response = require("./response");
const db = require("./db");
const app = express();
app.use(express.json());

//configuracion de cornflais
app.use(
    cors({//cors es la libreria que permite el acceso a recursos de un servidor(cosas del node.js)
        origin: "http:/localhost:3000",
        methods: "GET,POST,PUT,DELETE",
        allowedHeaders: ["COntent-Type","Autorization"],
    })
);


app.get("/webhook",token);//verifica el token de la api de whats
app.post("/webhook", response);//lo mismo que el de arriba pero para recibir mensajes

app.get('/api/citas', async (req, res) => {
  try {
    const citas = await db.obtenerTodasLasCitas();
    res.json(citas);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al obtener citas');
  }
});
app.use(express.static(path.join(__dirname, 'web')));

//todo:Es para pagina
//  app.get('/', (res) => {  
//   res.sendFile(path.join(__dirname, 'web', 'pagina.html'));
// });

app.get('/api/horarios', async (req, res) => {
  try {
    const horarios = await db.obtenerHorariosDisponibles();
    res.json(horarios); // devuelve array de horarios
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al obtener horarios');
  }
});



app.listen(3000,()=>{
    console.log("Arre, el Servidor al 3000 viejon");//Inicia el servidor
});