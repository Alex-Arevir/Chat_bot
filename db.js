const mysql= rquire ('mysql2');

const connection = mysql.createConnection({
    host:'Localhost',
    user:'root',
    password:'',
    database:'agenda_citas'
});

connection.connect(err=>{
    if(err){
        console.error('error de conexion con BD:',err);
        return;
    }
    console.log('Conexion Correcta');

});

module.exports= connection;