"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var validarClave = require('./../mysql/clave').validarClave;
var traerConsultasPendientes = require('./../mysql/consulta').traerConsultasPendientes;
var codificarToken = require('./../token/token').codificarToken;
var router = express_1.Router();
router.post('/:clave', function (req, res) {
    var clave = req.params.clave;
    var data = {
        clave: clave
    };
    validarClave(data, function (err, resp) {
        if (err) {
            return res.json(err);
        }
        else {
            if (!resp.respuesta || resp.respuesta === undefined) {
                return res.json({
                    ok: false,
                    message: 'Por favor valide su link, datos incorrectos',
                    clave: clave
                });
            }
            else {
                return res.json({
                    ok: true,
                    message: '¡Bienvenido a consulta!',
                    nombre: (resp.respuesta.nombre_paciente).toUpperCase(),
                    apellido_pat_paciente: (resp.respuesta.apellido_pat_paciente).toUpperCase(),
                    apellido_mat_paciente: (resp.respuesta.apellido_mat_paciente).toUpperCase(),
                });
            }
        }
    });
});
router.post('/', function (req, res) {
    traerConsultasPendientes(function (err, resp) {
        if (err) {
            return res.json(err);
        }
        else {
            return res.json({
                ok: true,
                message: 'Se cargaron los datos',
                consultas: resp.respuesta
            });
        }
    });
});
exports.default = router;
//# sourceMappingURL=consulta.js.map