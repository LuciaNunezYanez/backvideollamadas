"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mysql_1 = __importDefault(require("./mysql"));
function registrarPaciente(data, callback) {
    console.log('registrarPaciente() - MySQL');
    console.log(data);
    var date = new Date();
    data.fecha = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
    data.hora = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
    // Hora: YYYY-MM-DD
    var query = "CALL addConsultaCompleta(\n        " + mysql_1.default.instance.cnn.escape(data.nombrePaciente) + ", \n        " + mysql_1.default.instance.cnn.escape(data.paternoPaciente) + ", \n        " + mysql_1.default.instance.cnn.escape(data.maternoPaciente) + ", \n        " + mysql_1.default.instance.cnn.escape(data.telefonoPaciente) + ", \n        " + mysql_1.default.instance.cnn.escape(data.id_usuario) + ",\n        " + mysql_1.default.instance.cnn.escape(data.fecha) + ",\n        " + mysql_1.default.instance.cnn.escape(data.hora) + ",\n        " + mysql_1.default.instance.cnn.escape(data.link) + ",\n        " + mysql_1.default.instance.cnn.escape(data.motivo) + ");";
    mysql_1.default.ejecutarQuery(query, function (error, data) {
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
                id: data[0][0].id_consulta_insert,
                respuesta: data[0][0].respuesta
            });
        }
    });
}
module.exports = {
    registrarPaciente: registrarPaciente
};
//# sourceMappingURL=registro.js.map