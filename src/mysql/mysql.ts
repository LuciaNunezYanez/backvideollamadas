import mysql = require('mysql');

export default class MySQL{
    
    private static _instance: MySQL;
    cnn: mysql.Connection;
    conectado: Boolean = false;

    constructor(){
        console.log('Clase inicializada de MYSQL');
        // Configuración de la conexion de la DB LOCAL 
        this.cnn = mysql.createConnection({
            host: process.env.HOST || 'localhost',
            user: process.env.USERDB || 'root',
            password: process.env.PASSWORDB || 'M7750la?',
            database: process.env.NAMEDATABASE || 'db_video_llamadas'
        });

        this.conectarDB();

        // En caso de que ocurra un error, volver a realizar la conexión
        this.cnn.on('error', this.conectarDB);
    }

     // Evita que se creen varias instancias de la clase 
    public static get instance() {
        return this._instance || (this._instance = new this());
    }

    static ejecutarQuery(query: string, callback: Function) {
        
        this.instance.cnn.query(query, (err: any , results: Object[], fields: any ) => {
            if(err){
                console.log('======== Error en Query ========');
                console.log(query);
                console.log('================================');
                return callback( err );
            }
            if(results.length === 0 ){
                callback(null, 'El registro solicitado no existe');
            } else {
                callback(null, results);
            }
        });
    }

    private conectarDB() {
        this.cnn.connect((err: mysql.MysqlError) => {
            if(err) {
                console.log('Ocurrio un error:', err.message);
                setTimeout(this.conectarDB);
            }
            this.conectado = true;
            console.log('Base de datos conectada con éxito');
        });
    }

}