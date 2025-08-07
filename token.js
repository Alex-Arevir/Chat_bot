const dotenv = require("dotenv");
const fs = require("fs");

const verifyToken = process.env.VERIFY_TOKEN;

module.exports = (req, res) => {
    const hubVerifytoken = req.query["hub.verify_token"];
    const hubChallenge = req.query["hub.challenge"];

    console.log("verifyToken:", verifyToken);
    console.log("hub.verify_token:", hubVerifytoken);
    console.log("hub.challenge:", hubChallenge);

    fs.appendFileSync(
        "debug_log.txt",
        `${new Date().toISOString()} - GET Request: ${JSON.stringify(req.query)}\n`
    );

    if (hubVerifytoken === verifyToken) {
        res.status(200).send(hubChallenge);
    } else {
        fs.appendFileSync(
            "debug_log.txt",
            `${new Date().toISOString()} - Token Incorrecto: ${hubVerifytoken}\n`
        );
        res.status(403).send("Verificación Fallida");
    }
};
