var UsuariosConsulta = /** @class */ (function () {
    function UsuariosConsulta() {
        this.usuarios = [];
        this.usuarios = [];
    }
    UsuariosConsulta.prototype.agregarUsuario = function (id_socket, sala, link, status) {
        var usuario = {
            id_socket: id_socket,
            sala: sala,
            link: link,
            status: status
        };
        this.usuarios.push(usuario);
        return this.usuarios;
    };
    UsuariosConsulta.prototype.eliminarUsuario = function (id_socket) {
        this.usuarios = this.usuarios.filter(function (user) {
            return user.id_socket != id_socket;
        });
        return this.usuarios;
    };
    UsuariosConsulta.prototype.buscarParPaciente = function (link) {
        var paciente = this.usuarios.filter(function (usuario) {
            return usuario.link === link && usuario.sala === 'paciente';
        })[0];
        return paciente;
    };
    UsuariosConsulta.prototype.buscarParMedico = function (link) {
        var medico = this.usuarios.filter(function (usuario) {
            return usuario.link === link && usuario.sala === 'medico';
        })[0];
        return medico;
    };
    UsuariosConsulta.prototype.getUsuario = function (id_socket) {
        var usuario = this.usuarios.filter(function (usuario) {
            return usuario.id_socket === id_socket;
        })[0];
        return usuario;
    };
    UsuariosConsulta.prototype.getUsuarios = function () {
        return this.usuarios;
    };
    UsuariosConsulta.prototype.actualizarEstatusMedicoPaciente = function (link, estatus) {
        this.usuarios = this.usuarios.filter(function (usuario) {
            if (usuario.link === link && usuario.status != estatus) {
                usuario.status = estatus;
            }
            return usuario;
        });
        return this.usuarios;
    };
    return UsuariosConsulta;
}());
module.exports = {
    UsuariosConsulta: UsuariosConsulta
};
//# sourceMappingURL=usuarios-consulta.js.map