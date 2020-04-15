import MySQL from './mysql';

function traerConsultasPendientes(callback: Function){

    const QUERY = `CALL getConsultasPendientes();`;

    MySQL.ejecutarQuery(QUERY, (error: any, respuesta: any[]) => {
        if(error){
            callback({
                ok: false,
                message: error.sqlMessage, 
                error
            });
        } else {
            callback(null, {
                ok: true,
                respuesta: respuesta[0]
            });
        }
    })
}

function alterSKConsulta(data: any, callback: Function){
    const clave: string = data.clave;
    const nuevoEstatus: number = data.estatus;

    const QUERY = `CALL alterSKConsulta(${MySQL.instance.cnn.escape(clave)}, ${nuevoEstatus});`;
    console.log(QUERY);
    MySQL.ejecutarQuery(QUERY, (error: any, estatus: any[][]) => {
        if(error){
            callback({
                ok: false,
                message: error.sqlMessage, 
                error
            });
        } else {
            callback(null, {
                ok: true,
                estatus: estatus[0][0]
            });
        }
    })
}

function traerConsulta(data: any, callback: Function){
    const clave = data.clave;
    const QUERY = `CALL getConsultaClave(${MySQL.instance.cnn.escape(clave)});`;

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
    traerConsultasPendientes,
    traerConsulta,
    alterSKConsulta
}