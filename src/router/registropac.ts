import { Router, Request, Response } from 'express';
const { registrarPaciente } = require('./../mysql/registro');
const { decodificarToken, getIDToken } = require('./../token/token');
const { traerConsultasPendientes } = require('../mysql/consulta');
import Server from '../server/server';
const router = Router();

const socketServer = Server.instance;

router.post('/:token', (req, res) => {
    const data = req.body;
    const tokenCodificado = req.params.token;

    if(tokenCodificado){
        const tokenDecodificado = decodificarToken(tokenCodificado);
        if(tokenDecodificado.ok){
            const id_usuario = getIDToken(tokenDecodificado);
            if(id_usuario > 0 && id_usuario){
                // Se obtuvo el ID y se enviará
                data.id_usuario = id_usuario;
            } else{
                return res.json({ ok: false, message: 'No se obtuvo el id del usuario'});
            }
        } else {
            return res.json({ ok: false, message: tokenDecodificado.err});
        }
    } else{
        return res.json({ ok: false, message: 'No viene token'});
    }

    // Válidar que todos los campos sean recibidos 
    registrarPaciente(data, (err: any, respuesta: any) => {
        if(err){
            return res.json(err);
        } else {
            if(respuesta.id){
                //Después de agregar la consulta emitirla al resto de médicos
                traerConsultasPendientes( (err: any, consultas: any) => {
                    if(err){
                        console.log('Ocurrió un error al traer consultas pendientes', err);
                    } else {
                        const arrayConsultas: any[] = consultas.respuesta
                        socketServer.emitirConsultasActualizadas(arrayConsultas);
                    }
                });
            }
            return res.json(respuesta);
        }
        
    });


});


export default router;