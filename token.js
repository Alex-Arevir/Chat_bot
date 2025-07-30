const dotenv= require("dotenv");
const fs = require ("fs");

const verifyToken= process.env.VERIFY_TOKEN;//que se supone que hacemos en el webhook al incluir un dominio que la neta ni hay


module.exports = (req, res) => {
    const hubVerifytoken =req.query["hub.verify_token"];
    const hubChallenge = req.query ["hub.Challenge"];

    fs.appendFileSync(
        "debug_log.txt",`${new Date().toISOString()} -GET Request: ${JSON.stringify(req.query)}\n`
    );
    if(hubVerifytoken === verifyToken){
        res.status(200).send(hubChallenge);
    } else{
        fs.appendFileSync(
            "debug_log.txt",`${new Date().toISOString()} - Token Incorrecto: ${hubVerifytoken}\n`
        );

        res.status(403).send("Verificacion Fallida");
    }
};