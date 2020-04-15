import { Router, Request, Response } from 'express';
const { validarClave } = require('./../mysql/clave');
const { traerConsultasPendientes } = require('./../mysql/consulta');
const { codificarToken } = require('./../token/token'); 
const router = Router();

router.post('/:clave', (req: Request, res: Response) => {
    const clave = req.params.clave;

    const data = {
        clave
    }
    
    
    validarClave(data, (err: any, resp: any) => {
        if(err){
            return res.json(err);
        } else {
            if(!resp.respuesta || resp.respuesta === undefined){
                return res.json({
                    ok: false,
                    message: 'Por favor valide su link, datos incorrectos',
                    clave
                });
            } else {
                return res.json({
                    ok: true, 
                    message: '¡Bienvenido a consulta!',
                    nombre: (resp.respuesta.nombre_paciente).toUpperCase(),
                    apellido_pat_paciente: (resp.respuesta.apellido_pat_paciente).toUpperCase(),
                    apellido_mat_paciente: (resp.respuesta.apellido_mat_paciente).toUpperCase(),
                });
            }
        }
    });

});

router.post('/', (req: Request, res: Response) => {
    
    traerConsultasPendientes((err: any, resp: any) => {
        if(err){
            return res.json(err);
        } else {
            return res.json({
                ok: true,
                message: 'Se cargaron los datos',
                consultas: resp.respuesta
            });
        }
    });

});

export default router;