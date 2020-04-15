"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mysql_1 = __importDefault(require("./mysql"));
function traerConsultasPendientes(callback) {
    var QUERY = "CALL getConsultasPendientes();";
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
                respuesta: respuesta[0]
            });
        }
    });
}
function alterSKConsulta(data, callback) {
    var clave = data.clave;
    var nuevoEstatus = data.estatus;
    var QUERY = "CALL alterSKConsulta(" + mysql_1.default.instance.cnn.escape(clave) + ", " + nuevoEstatus + ");";
    console.log(QUERY);
    mysql_1.default.ejecutarQuery(QUERY, function (error, estatus) {
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
                estatus: estatus[0][0]
            });
        }
    });
}
function traerConsulta(data, callback) {
    var clave = data.clave;
    var QUERY = "CALL getConsultaClave(" + mysql_1.default.instance.cnn.escape(clave) + ");";
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
    traerConsultasPendientes: traerConsultasPendientes,
    traerConsulta: traerConsulta,
    alterSKConsulta: alterSKConsulta
};
//# sourceMappingURL=consulta.js.map