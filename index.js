//declaracio  de constantes
require('dotenv').config();
const express = require("express");
const token = require("./token");
const cors = require ("cors");
const path = require("path");
const axios = require ("axios");
const fs = require ("fs");
const FlujoM = require("./FlujoM");
const app = express();



app.use(express.json());

//configuracion de cornflais

app.use(
    cors({
        origin: "http:/localhost:3000",
        methods: "GET,POST,PUT,DELETE",
        allowedHeaders: ["COntent-Type","Autorization"],
    })
);


app.get("/webhook",token);
app.post("/webhook",FlujoM);


app.listen(3000,()=>{
    console.log("Arre, el Servidor al 3000 viejon");
});
//obyener datos de api
//const apiBaseUrl = "http://127.0.0.1:80/Practica_chat/ajax";
//const authtoken = "Bearer EAAf4dVyj7LkBPGW3utspsxAPyiuBTZAZAv8WN4s6woSZB7SS2xOWkMWMxJL7VQICgz26lA7O1PREV7vwZAJWLxuAJZB4rPJGa4G3Er4ZAGhiB4ZASfxXjCcvjjCCTWcijaMBzZCV15QpD2lZAdlj5ISg1Iyt2Jqi6U8bTa52xZC26Son8z4yyept1GEIZA6UHgFcqT9pgibqmBEgupe1VIf7yLkWMa6An43h8XvQVz05RPG"; 



