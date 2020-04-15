import jwt = require('jsonwebtoken');

function codificarToken( usuario: string ): Object{
    //GENERAR TOKEN
    try {
        let token = jwt.sign({
            usuario: usuario
        }, process.env.SEED || 'este-es-el-seed-de-desarrollo', 
        { expiresIn: 60 * 60 * 12 }); // 12 hrs de expiración
        decodificarToken(token);
        return { ok: true, message: ' Token generado con éxito', token } 
    } catch (error) {
        return { ok: false, message: 'Ocurrió un error al generar token', error };
    }
}

function decodificarToken( Token: any): Object {
    let token = Token;
    const SEED = process.env.SEED || 'este-es-el-seed-de-desarrollo'; // NITDurango (Variable Heroku) // C5Dur4ng0 (Variable producción)
    // const SEED = process.env.SEED || 'C5Dur4ng0';
    let tokenDecodificado = {};
    console.log(token);
    jwt.verify(token, SEED, (err: any, decoded: any) => {
        if(err){
            console.log(err);
            return tokenDecodificado = {
                ok: false, 
                err: err.message
            };
        } else{ 
            // RETORNA LA INFORMACIÓN DECODIFICADA DEL USUARIO
            return tokenDecodificado = {
                ok: true,
                usuario: decoded.usuario
            }
        }
    });
    return tokenDecodificado;
};

function getIDToken(tokenDecodificado: any): Number {
    return Number.parseInt(tokenDecodificado.usuario.id_usuario);
}


module.exports = {
    codificarToken,
    decodificarToken,
    getIDToken
}