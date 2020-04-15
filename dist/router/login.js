"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var loginNIT = require('./../mysql/login').loginNIT;
var codificarToken = require('./../token/token').codificarToken;
var router = express_1.Router();
router.post('/', function (req, res) {
    var data = req.body;
    if (data.usuario && data.contrasena) {
        loginNIT(data, function (err, usuario) {
            var _a;
            if (err) {
                return res.json(err);
            }
            else {
                if ((_a = usuario.usuario) === null || _a === void 0 ? void 0 : _a.id_usuario) {
                    usuario.message = 'Sesión iniciada con éxito';
                    // Regresar TOKEN
                    var datosACodificar = {
                        id_usuario: usuario.usuario.id_usuario,
                        nombre_usuario: usuario.usuario.nombre_usuario,
                        apellido_pat_usuario: usuario.usuario.apellido_pat_usuario,
                        apellido_mat_usuario: usuario.usuario.apellido_mat_usuario,
                        tipo: usuario.usuario.tipo,
                        usuario: usuario.usuario.usuario
                    };
                    var miToken = codificarToken(datosACodificar);
                    if (miToken.ok) {
                        usuario.token = miToken.token;
                    }
                    else {
                        usuario.message = miToken.message;
                    }
                    return res.json(usuario);
                }
                else {
                    return res.json({
                        ok: true,
                        message: 'Usuario y/o contraseña inválida'
                    });
                }
            }
        });
    }
    else {
        return res.json({
            ok: false,
            message: 'Datos incompletos'
        });
    }
});
exports.default = router;
//# sourceMappingURL=login.js.map