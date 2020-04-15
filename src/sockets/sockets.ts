import { Socket } from 'socket.io';
// Class
const { UsuariosConsulta } = require('../class/usuarios-consulta');
import Server from '../server/server';
// const { Consultas } = require('../class/consultas');
// MySQL
const { traerConsultasPendientes, alterSKConsulta }  = require('../mysql/consulta');

const classUsuariosConsulta = new UsuariosConsulta();
// const classConsulta = new Consultas();


export const SK_USUARIO_CONECTADO = ( cliente: Socket) => {
    console.log('---------> Se ha conectado un cliente');

    cliente.on('loginConsulta', (usuario: Usuario, callback: Function) => {
        
        cliente.join(usuario.sala);
        classUsuariosConsulta.agregarUsuario(cliente.id, usuario.sala, usuario.link, usuario.status);

        if(usuario.sala === 'paciente'){
            // Si se conecta paciente se le avisa a todos los medicos
            alterSKConsulta({clave: usuario.link, estatus: 1}, (err: any, estatus: any) => {
                if(err){
                    callback({ ok: false, message: 'Error #1: Ocurrió un error al editar el estatus del socket en la DB'});
                } else {
                    const nuevoEstatus: number = estatus.estatus.sk_estatus;
                    if(nuevoEstatus === 1 ){
                        traerConsultasPendientes( (err: any, consultas: any) => {
                            if(err){
                                console.log('Ocurrió un error al traer consultas pendientes', err);
                            } else {
                                const arrayConsultas: any[] = consultas.respuesta
                                cliente.broadcast.emit('listaConsultasActualizada', arrayConsultas);
                            }
                            callback(null, {ok: true, message: 'El servidor te ha escuchado PACIENTE'});
                            console.log(classUsuariosConsulta.getUsuarios());
                        });
                    } else{
                        callback({ ok: false, message: 'No se pudó actualizar tu estatus a activo'});
                    }
                }
            });

            
           
        } else if (usuario.sala === 'medico' ){ 
            callback(null, {ok: true, message: 'El servidor ha escuchado que entraste a consulta'});
            console.log(classUsuariosConsulta.getUsuarios());
        }
        
    });


    cliente.on('loginMedicoEspera', (medico: Usuario, callback: Function) => {
        // Se une a la sala 'espera'
        cliente.join(medico.sala);
        classUsuariosConsulta.agregarUsuario(cliente.id, medico.sala, medico.link, medico.status);

        // Ir a la DB por las consultas en espera y emitirlas
        traerConsultasPendientes( (err: any, consultas: any) => {
            if(err){
                console.log('Ocurrió un error', err);
                callback({ ok: false, message: 'Ocurrió un error', err});
            } else {
                const arrayConsultas: any[] = consultas.respuesta
                cliente.emit('listaConsultasActualizada', arrayConsultas);
            }
            callback(null, {ok: true, message: 'El servidor sabe que estas en espera MÉDICO'});
            console.log(classUsuariosConsulta.getUsuarios());
        });
       
    });

    cliente.on('disconnect', () => {
        console.log('<--------- Se ha desconectado un cliente');
        
        // Comprobar si se desconectó un paciente y avisarle a los medicos
        try {
            const clienteSalio: Usuario = classUsuariosConsulta.getUsuario(cliente.id);
            if(clienteSalio != undefined){
                if(clienteSalio.link != 'espera' && clienteSalio.sala === 'paciente'){
                    // Cambiar el estatus en la base de datos
                    const link = clienteSalio.link;

                    alterSKConsulta({clave: link, estatus: 0}, (err: any, estatus: any) => {
                        if(err){
                            console.log('Error #2: Ocurrió un error al editar el estatus del socket en la DB', err);
                        } else {
                            const nuevoEstatus: number = estatus.estatus.sk_estatus;
                            if(nuevoEstatus === 0 ){
                                traerConsultasPendientes( (err: any, consultas: any) => {
                                    if(err){
                                        console.log('Ocurrió un error al traer consultas pendientes', err);
                                    } else {
                                        const arrayConsultas: any[] = consultas.respuesta
                                        // Emitir la lista de consultas a los medicos en espera 
                                        cliente.broadcast.emit('listaConsultasActualizada', arrayConsultas);
                                    }
                                    console.log(classUsuariosConsulta.getUsuarios());
                                });
                            }
                        }
                    });
                    console.log('Quien se salió pertenecia al link: ' + link + ' Y era PACIENTE');
                }
            }
        } catch (error) {
            console.error(error);
        }
        
        try {
            console.log('|------------- ANTES DE SU SALIDA --------------|');
            console.log(classUsuariosConsulta.getUsuarios());
            console.log('|-----------------------------------------------|');
        } catch (error) {
            console.log('No había sokets');
        }
       
        try {
            console.log('|------------- DESPUES DE SU SALIDA ------------|');
            console.log(classUsuariosConsulta.eliminarUsuario(cliente.id));
            console.log('|-----------------------------------------------|');
        } catch (error) {
            console.log('No quedaron sockets');
        }

    });

}