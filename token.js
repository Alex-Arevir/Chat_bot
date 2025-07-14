const fs = require ("fs");

const veryfyToken= "";

module.exports = (req, res) => {
    const hubVerfytoken =req.query["hub.verify_token"];
    const hubChallenge = req.query ["hub.Challenge"];

    fs.appendFileSync(
        "debug_log.txt",`${new Date().toISOString()} -GET Request: ${JSON.stringify(req.query)}\n`
    );
    if(huberifyToken === verifyToken){
        res.status(200).send(hubChallenge);
    } else{
        fs.appendFileSync(
            "debug_log.txt",`${new Date().toISOString()} - Token Incorrecto: ${hubVerfytoken}\n`
        );

        res.status(403).send("Verificacion Fallida");
    }
};