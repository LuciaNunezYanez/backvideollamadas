"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Class
var UsuariosConsulta = require('../class/usuarios-consulta').UsuariosConsulta;
var Ofertas = require('../class/ofertas').Ofertas;
// const { Consultas } = require('../class/consultas');
// MySQL
var _a = require('../mysql/consulta'), traerConsultasPendientes = _a.traerConsultasPendientes, alterSKConsulta = _a.alterSKConsulta;
var classUsuariosConsulta = new UsuariosConsulta();
var classOfertas = new Ofertas();
// const classConsulta = new Consultas();
exports.SK_USUARIO_CONECTADO = function (cliente) {
    console.log('---------> Se ha conectado un cliente');
    cliente.on('loginConsulta', function (usuario, callback) {
        cliente.join(usuario.sala);
        classUsuariosConsulta.agregarUsuario(cliente.id, usuario.sala, usuario.link, usuario.status);
        if (usuario.sala === 'medico') {
            callback(null, { ok: true, message: 'El servidor ha escuchado que entraste a consulta' });
            console.log(classUsuariosConsulta.getUsuarios());
        }
    });
    // SOCKETS PARA SEÑALIZACION 
    cliente.on('ofertaPaciente', function (oferta, callback) {
        console.log('La oferta del paciente es: ', oferta);
        if (oferta.offer) {
            // Avisar a todos los medicos en espera que se conectó 
            classOfertas.agregarOferta(oferta.link, oferta.offer.type, oferta.offer.sdp);
            console.log('las ofertas agregadas son: ');
            console.log(classOfertas.getOfertas());
            cliente.join(oferta.sala);
            classUsuariosConsulta.agregarUsuario(cliente.id, oferta.sala, oferta.link, oferta.status);
            alterSKConsulta({ clave: oferta.link, estatus: 1 }, function (err, estatus) {
                if (err) {
                    callback({ ok: false, message: 'Error #1: Ocurrió un error al editar el estatus del socket en la DB' });
                }
                else {
                    var nuevoEstatus = estatus.estatus.sk_estatus;
                    if (nuevoEstatus === 1) {
                        traerConsultasPendientes(function (err, consultas) {
                            if (err) {
                                console.log('Ocurrió un error al traer consultas pendientes', err);
                            }
                            else {
                                var arrayConsultas = consultas.respuesta;
                                cliente.broadcast.emit('listaConsultasActualizada', arrayConsultas);
                            }
                            callback(null, { ok: true, message: 'El servidor te ha escuchado PACIENTE' });
                            console.log(classUsuariosConsulta.getUsuarios());
                        });
                    }
                    else {
                        callback({ ok: false, message: 'No se pudó actualizar tu estatus a activo' });
                    }
                }
            });
        }
        else {
            console.log('No viene la oferta');
        }
    });
    cliente.on('buscarOferta', function (oferta, callback) {
        var link = oferta.link;
        var offer = classOfertas.getOferta(link);
        if (offer && offer != undefined) {
            callback(null, { ok: true, message: 'Si existe la oferta', offer: offer });
        }
        else {
            callback({ ok: false, message: 'No exise la oferta' });
        }
    });
    cliente.on('respuestaMedico', function (answer) {
        var link = answer.link;
        console.log('La answer dice:');
        console.log(answer);
        if (answer.answer.type === 'answer') {
            // Viene una answer 
            cliente.broadcast.emit("esperarRespuesta" + link, answer.answer);
        }
    });
    cliente.on('loginMedicoEspera', function (medico, callback) {
        // Se une a la sala 'espera'
        cliente.join(medico.sala);
        classUsuariosConsulta.agregarUsuario(cliente.id, medico.sala, medico.link, medico.status);
        // Ir a la DB por las consultas en espera y emitirlas
        traerConsultasPendientes(function (err, consultas) {
            if (err) {
                console.log('Ocurrió un error', err);
                callback({ ok: false, message: 'Ocurrió un error', err: err });
            }
            else {
                var arrayConsultas = consultas.respuesta;
                cliente.emit('listaConsultasActualizada', arrayConsultas);
            }
            callback(null, { ok: true, message: 'El servidor sabe que estas en espera MÉDICO' });
            console.log(classUsuariosConsulta.getUsuarios());
        });
    });
    cliente.on('disconnect', function () {
        console.log('<--------- Se ha desconectado un cliente');
        // Comprobar si se desconectó un paciente y avisarle a los medicos
        try {
            var clienteSalio_1 = classUsuariosConsulta.getUsuario(cliente.id);
            if (clienteSalio_1 != undefined) {
                if (clienteSalio_1.link != 'espera' && clienteSalio_1.sala === 'paciente') {
                    // Cambiar el estatus en la base de datos
                    var link = clienteSalio_1.link;
                    alterSKConsulta({ clave: link, estatus: 0 }, function (err, estatus) {
                        if (err) {
                            console.log('Error #2: Ocurrió un error al editar el estatus del socket en la DB', err);
                        }
                        else {
                            var nuevoEstatus = estatus.estatus.sk_estatus;
                            if (nuevoEstatus === 0) {
                                traerConsultasPendientes(function (err, consultas) {
                                    if (err) {
                                        console.log('Ocurrió un error al traer consultas pendientes', err);
                                    }
                                    else {
                                        var arrayConsultas = consultas.respuesta;
                                        // Emitir la lista de consultas a los medicos en espera 
                                        cliente.broadcast.emit('listaConsultasActualizada', arrayConsultas);
                                    }
                                    classOfertas.eliminarOferta(clienteSalio_1.link);
                                    console.log('Mis ofertas ahora', classOfertas.getOfertas());
                                    console.log('-----------------------------------Mis ofertas');
                                });
                            }
                        }
                    });
                    console.log('Quien se salió pertenecia al link: ' + link + ' Y era PACIENTE');
                }
            }
        }
        catch (error) {
            console.error(error);
        }
        try {
            console.log('|------------- ANTES DE SU SALIDA --------------|');
            console.log(classUsuariosConsulta.getUsuarios());
            console.log('|-----------------------------------------------|');
        }
        catch (error) {
            console.log('No había sokets');
        }
        try {
            console.log('|------------- DESPUES DE SU SALIDA ------------|');
            console.log(classUsuariosConsulta.eliminarUsuario(cliente.id));
            console.log('|-----------------------------------------------|');
        }
        catch (error) {
            console.log('No quedaron sockets');
        }
    });
};
//# sourceMappingURL=sockets.js.map