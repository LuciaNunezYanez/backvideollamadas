import { Router, Request, Response } from 'express';
const { loginNIT } = require('./../mysql/login');
const { codificarToken } = require('./../token/token'); 
const router = Router();

router.post('/', (req: Request, res: Response) => {
    const data = req.body;
    if(data.usuario && data.contrasena){

        loginNIT(data, (err: any, usuario: any) => {
            if(err){
                return res.json(err);
            } else {
                if(usuario.usuario?.id_usuario){
                    usuario.message = 'Sesión iniciada con éxito';
                    
                    // Regresar TOKEN
                    const datosACodificar = {
                        id_usuario: usuario.usuario.id_usuario,
                        nombre_usuario: usuario.usuario.nombre_usuario,
                        apellido_pat_usuario: usuario.usuario.apellido_pat_usuario,
                        apellido_mat_usuario: usuario.usuario.apellido_mat_usuario,
                        tipo: usuario.usuario.tipo,
                        usuario: usuario.usuario.usuario
                    }
                    const miToken = codificarToken(datosACodificar);
                    
                    if(miToken.ok){
                        usuario.token = miToken.token;
                    } else{
                        usuario.message = miToken.message;
                    }
                    return res.json(usuario);
                } else {
                    return res.json({
                        ok: true, 
                        message: 'Usuario y/o contraseña inválida'
                    });
                }
            }
        });
    } else {
        return res.json({
            ok: false, 
            message: 'Datos incompletos'
        });
    }

});

export default router;