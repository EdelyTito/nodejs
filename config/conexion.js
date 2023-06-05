const mysql = require('mysql');
const conexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '3342942',
    port: 3306,
    database: 'ferreteriaucb',
});

conexion.connect((error)=>{
    if(error){
        console.log('Error en la conexion a la base de datos' + error)
    }else{
        console.log('Conexion exitosa a la base de datos')
    }
});

module.exports = conexion;

