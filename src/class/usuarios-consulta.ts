

class UsuariosConsulta {

    usuarios: Object[]= [];

    constructor(){
        this.usuarios = [];
    }

    agregarUsuario(id_socket: string,
                    sala: string, 
                    link: string, 
                    status: number): Object[] {

        let usuario: Usuario = {
            id_socket, 
            sala, 
            link,
            status
        }

        this.usuarios.push(usuario);
        return this.usuarios;
    }

    eliminarUsuario(id_socket: string): Object[] {
        this.usuarios = this.usuarios.filter( (user: Usuario) => {
            return user.id_socket != id_socket;
        });
        return this.usuarios;
    }

    buscarParPaciente(link: string): Object{
        var paciente = this.usuarios.filter( (usuario: Usuario) =>{
            return usuario.link === link && usuario.sala === 'paciente';
        })[0];
        return paciente;
    }

    buscarParMedico(link: string): Object{
        var medico = this.usuarios.filter( (usuario: Usuario) =>{
            return usuario.link === link && usuario.sala === 'medico';
        })[0];
        return medico;
    }

    getUsuario(id_socket: string): Object{
        var usuario = this.usuarios.filter( (usuario: Usuario) =>{
            return usuario.id_socket === id_socket;
        })[0];
        return usuario;
    }

    getUsuarios(): Object[] {
        return this.usuarios;
    }

    actualizarEstatusMedicoPaciente(link: string, estatus: number): Object[] {
        this.usuarios = this.usuarios.filter( (usuario: Usuario) =>{
            if(usuario.link === link && usuario.status != estatus){
                usuario.status = estatus;
            }
            return usuario;
        });
        return this.usuarios;
    }
}

interface Usuario{
    id_socket: string;
    sala: string;
    link: string;
    status: number;
}

module.exports = {
    UsuariosConsulta
}