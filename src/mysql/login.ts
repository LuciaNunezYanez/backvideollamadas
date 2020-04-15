import MySQL from './mysql';

function loginNIT(data: any, callback: Function){

    const QUERY = `CALL getLogin(
        ${ MySQL.instance.cnn.escape(data.usuario) }, 
        ${ MySQL.instance.cnn.escape(data.contrasena) });`;

    MySQL.ejecutarQuery(QUERY, (error: any, respuesta: any[][]) => {
        if(error){
            callback({
                ok: false,
                message: error.sqlMessage, 
                error
            });
        } else {
            callback(null, {
                ok: true,
                usuario: respuesta[0][0]
            });
        }
    })
}

module.exports = {
    loginNIT
}