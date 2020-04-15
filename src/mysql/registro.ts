import MySQL from './mysql';


function registrarPaciente( data: any, callback: Function){
    console.log('registrarPaciente() - MySQL');
    console.log(data);
    const date = new Date();
    data.fecha = date.getFullYear() + '-' + ( date.getMonth() + 1 ) + '-' + date.getDate();
    data.hora = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();

    // Hora: YYYY-MM-DD
    const query = `CALL addConsultaCompleta(
        ${ MySQL.instance.cnn.escape(data.nombrePaciente) }, 
        ${ MySQL.instance.cnn.escape(data.paternoPaciente) }, 
        ${ MySQL.instance.cnn.escape(data.maternoPaciente) }, 
        ${ MySQL.instance.cnn.escape(data.telefonoPaciente) }, 
        ${ MySQL.instance.cnn.escape(data.id_usuario) },
        ${ MySQL.instance.cnn.escape(data.fecha) },
        ${ MySQL.instance.cnn.escape(data.hora) },
        ${ MySQL.instance.cnn.escape(data.link) },
        ${ MySQL.instance.cnn.escape(data.motivo) });`;

    MySQL.ejecutarQuery(query, (error: any, data:any[][] ) => {
        if(error){
            callback({
                ok: false,
                message: error.sqlMessage, 
                error
            });
        } else {
            callback(null, {
                ok: true,
                id: data[0][0].id_consulta_insert,
                respuesta: data[0][0].respuesta
            });
        }
    });


}

module.exports = {
    registrarPaciente
}