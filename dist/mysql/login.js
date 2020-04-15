"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mysql_1 = __importDefault(require("./mysql"));
function loginNIT(data, callback) {
    var QUERY = "CALL getLogin(\n        " + mysql_1.default.instance.cnn.escape(data.usuario) + ", \n        " + mysql_1.default.instance.cnn.escape(data.contrasena) + ");";
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
                usuario: respuesta[0][0]
            });
        }
    });
}
module.exports = {
    loginNIT: loginNIT
};
//# sourceMappingURL=login.js.map