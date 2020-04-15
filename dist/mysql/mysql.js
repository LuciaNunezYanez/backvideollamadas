"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mysql = require("mysql");
var MySQL = /** @class */ (function () {
    function MySQL() {
        this.conectado = false;
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
    Object.defineProperty(MySQL, "instance", {
        // Evita que se creen varias instancias de la clase 
        get: function () {
            return this._instance || (this._instance = new this());
        },
        enumerable: true,
        configurable: true
    });
    MySQL.ejecutarQuery = function (query, callback) {
        this.instance.cnn.query(query, function (err, results, fields) {
            if (err) {
                console.log('======== Error en Query ========');
                console.log(query);
                console.log('================================');
                return callback(err);
            }
            if (results.length === 0) {
                callback(null, 'El registro solicitado no existe');
            }
            else {
                callback(null, results);
            }
        });
    };
    MySQL.prototype.conectarDB = function () {
        var _this = this;
        this.cnn.connect(function (err) {
            if (err) {
                console.log('Ocurrio un error:', err.message);
                setTimeout(_this.conectarDB);
            }
            _this.conectado = true;
            console.log('Base de datos conectada con éxito');
        });
    };
    return MySQL;
}());
exports.default = MySQL;
//# sourceMappingURL=mysql.js.map