//declaracio  de constantes

const express = require("express");
const token = require("./token");
const cors = require ("cors");
const path = requrie("path");
const axios = require ("axios");
const fs = require ("fs");
const app = express();

app.use(express.json());

//configuracion de corns

app.use(
    cors({
        origin: "http:/localhost:3000",
        methods: "GET,POST,PUT,DELETE",
        allowedHeaders: ["COntent-Type","Autorization"],
    })
);


//app.get("archivo",token");

app.post("archivo", token);

//obyener datos de api
const apiBaseUrl = "http://127.0.0.1:80/Practica_chat/ajax";
const authtoken = "Bearer EAAf4dVyj7LkBPGW3utspsxAPyiuBTZAZAv8WN4s6woSZB7SS2xOWkMWMxJL7VQICgz26lA7O1PREV7vwZAJWLxuAJZB4rPJGa4G3Er4ZAGhiB4ZASfxXjCcvjjCCTWcijaMBzZCV15QpD2lZAdlj5ISg1Iyt2Jqi6U8bTa52xZC26Son8z4yyept1GEIZA6UHgFcqT9pgibqmBEgupe1VIf7yLkWMa6An43h8XvQVz05RPG"; 



