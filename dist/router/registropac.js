"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var registrarPaciente = require('./../mysql/registro').registrarPaciente;
var _a = require('./../token/token'), decodificarToken = _a.decodificarToken, getIDToken = _a.getIDToken;
var traerConsultasPendientes = require('../mysql/consulta').traerConsultasPendientes;
var server_1 = __importDefault(require("../server/server"));
var router = express_1.Router();
var socketServer = server_1.default.instance;
router.post('/:token', function (req, res) {
    var data = req.body;
    var tokenCodificado = req.params.token;
    if (tokenCodificado) {
        var tokenDecodificado = decodificarToken(tokenCodificado);
        if (tokenDecodificado.ok) {
            var id_usuario = getIDToken(tokenDecodificado);
            if (id_usuario > 0 && id_usuario) {
                // Se obtuvo el ID y se enviará
                data.id_usuario = id_usuario;
            }
            else {
                return res.json({ ok: false, message: 'No se obtuvo el id del usuario' });
            }
        }
        else {
            return res.json({ ok: false, message: tokenDecodificado.err });
        }
    }
    else {
        return res.json({ ok: false, message: 'No viene token' });
    }
    // Válidar que todos los campos sean recibidos 
    registrarPaciente(data, function (err, respuesta) {
        if (err) {
            return res.json(err);
        }
        else {
            if (respuesta.id) {
                //Después de agregar la consulta emitirla al resto de médicos
                traerConsultasPendientes(function (err, consultas) {
                    if (err) {
                        console.log('Ocurrió un error al traer consultas pendientes', err);
                    }
                    else {
                        var arrayConsultas = consultas.respuesta;
                        socketServer.emitirConsultasActualizadas(arrayConsultas);
                    }
                });
            }
            return res.json(respuesta);
        }
    });
});
exports.default = router;
//# sourceMappingURL=registropac.js.map