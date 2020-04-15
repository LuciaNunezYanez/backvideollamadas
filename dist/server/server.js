"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var socket_io_1 = __importDefault(require("socket.io"));
var path = require("path");
var http_1 = __importDefault(require("http"));
var socket = __importStar(require("../sockets/sockets"));
var Server = /** @class */ (function () {
    //public hostname: string;
    function Server() {
        this.port = process.env.PORT || 3000;
        this.app = express();
        // this.hostname = '10.11.118.91';
        // this.hostname = '10.11.126.114';
        //this.hostname = 'localhost'
        // Inicializar configuración de sockets 
        this.httpServer = new http_1.default.Server(this.app);
        this.io = socket_io_1.default(this.httpServer);
        this.escucharSockets();
    }
    Object.defineProperty(Server, "instance", {
        // Evita la declaración de varias instancias 
        get: function () {
            return this._instance || (this._instance = new this());
        },
        enumerable: true,
        configurable: true
    });
    Server.init = function () {
        return new Server();
    };
    Server.prototype.publicFolder = function () {
        var publicPath = path.resolve(__dirname, '../public');
        this.app.use(express.static(publicPath));
        // this.app.use( express.static(__dirname + '/public'));
    };
    Server.prototype.start = function (callback) {
        this.httpServer.listen(this.port, callback);
        this.publicFolder();
    };
    // S O C K E T S
    Server.prototype.escucharSockets = function () {
        this.io.on('connection', function (cliente) {
            socket.SK_USUARIO_CONECTADO(cliente);
        });
    };
    Server.prototype.emitirConsultasActualizadas = function (consultas) {
        this.io.emit('listaConsultasActualizada', consultas);
    };
    return Server;
}());
exports.default = Server;
//# sourceMappingURL=server.js.map