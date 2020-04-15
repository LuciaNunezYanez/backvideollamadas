"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var video_1 = __importDefault(require("./router/video"));
var registropac_1 = __importDefault(require("./router/registropac"));
var consulta_1 = __importDefault(require("./router/consulta"));
var login_1 = __importDefault(require("./router/login"));
var server_1 = __importDefault(require("./server/server"));
var body_parser_1 = __importDefault(require("body-parser"));
var cors = require('cors');
var server = server_1.default.instance;
// BodyParser
server.app.use(body_parser_1.default.urlencoded({ extended: true, limit: '50mb' }));
server.app.use(body_parser_1.default.json({ limit: '50mb' }));
// CORS - Para permitir que se puedan llamar los servicios     
// server.app.use(cors ({origin: true, credentials: true})); // Se cambia por la siguiente configuración
// server.app.use(
//     cors({
//       origin: 'http://localhost:4200',
//       credentials: true,
//     }),
//   );
server.app.use(cors(), function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', '*');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    // Esta de prueba
    res.setHeader("Set-Cookie", "HttpOnly;Secure;SameSite=Strict");
    next();
});
server.app.use('/video', video_1.default);
server.app.use('/registropac', registropac_1.default);
server.app.use('/login', login_1.default);
server.app.use('/consulta', consulta_1.default);
server.start(function () {
    console.log("Servidor corriendo en el puerto " + server.port);
});
//# sourceMappingURL=index.js.map