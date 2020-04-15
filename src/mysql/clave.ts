import MySQL from './mysql';

function validarClave(data: any, callback: Function){

    const clave = data.clave;
    console.log(clave);
    const QUERY = `CALL getClave(${MySQL.instance.cnn.escape(clave)});`;

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
                respuesta: respuesta[0][0]
            });
        }
    })
}

module.exports = {
    validarClave
}