"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jwt = require("jsonwebtoken");
function codificarToken(usuario) {
    //GENERAR TOKEN
    try {
        var token = jwt.sign({
            usuario: usuario
        }, process.env.SEED || 'este-es-el-seed-de-desarrollo', { expiresIn: 60 * 60 * 12 }); // 12 hrs de expiración
        decodificarToken(token);
        return { ok: true, message: ' Token generado con éxito', token: token };
    }
    catch (error) {
        return { ok: false, message: 'Ocurrió un error al generar token', error: error };
    }
}
function decodificarToken(Token) {
    var token = Token;
    var SEED = process.env.SEED || 'este-es-el-seed-de-desarrollo'; // NITDurango (Variable Heroku) // C5Dur4ng0 (Variable producción)
    // const SEED = process.env.SEED || 'C5Dur4ng0';
    var tokenDecodificado = {};
    console.log(token);
    jwt.verify(token, SEED, function (err, decoded) {
        if (err) {
            console.log(err);
            return tokenDecodificado = {
                ok: false,
                err: err.message
            };
        }
        else {
            // RETORNA LA INFORMACIÓN DECODIFICADA DEL USUARIO
            return tokenDecodificado = {
                ok: true,
                usuario: decoded.usuario
            };
        }
    });
    return tokenDecodificado;
}
;
function getIDToken(tokenDecodificado) {
    return Number.parseInt(tokenDecodificado.usuario.id_usuario);
}
module.exports = {
    codificarToken: codificarToken,
    decodificarToken: decodificarToken,
    getIDToken: getIDToken
};
//# sourceMappingURL=token.js.map