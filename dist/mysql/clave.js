"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mysql_1 = __importDefault(require("./mysql"));
function validarClave(data, callback) {
    var clave = data.clave;
    console.log(clave);
    var QUERY = "CALL getClave(" + mysql_1.default.instance.cnn.escape(clave) + ");";
    mysql_1.default.ejecutarQuery(QUERY, function (error, respuesta) {
        if (error) {
            callback({
                ok: false,
                message: error.sqlMessage,
                error: error
            });
        }
        else {
            callback(null, {
                ok: true,
                respuesta: respuesta[0][0]
            });
        }
    });
}
module.exports = {
    validarClave: validarClave
};
//# sourceMappingURL=clave.js.map