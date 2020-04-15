var Conexion = /** @class */ (function () {
    function Conexion() {
        this.usuarios = [];
        this.usuarios = [];
    }
    Conexion.prototype.agregarUsuario = function (id_socket, sala, link, status) {
        var usuario = {
            id_socket: id_socket,
            sala: sala,
            link: link,
            status: status
        };
        this.usuarios.push(usuario);
        return this.usuarios;
    };
    Conexion.prototype.eliminarUsuario = function (id_socket) {
        this.usuarios = this.usuarios.filter(function (user) {
            return user.id_socket != id_socket;
        });
        return this.usuarios;
    };
    Conexion.prototype.buscarParPaciente = function (link) {
        var paciente = this.usuarios.filter(function (usuario) {
            return usuario.link === link && usuario.sala === 'paciente';
        })[0];
        return paciente;
    };
    Conexion.prototype.buscarParMedico = function (link) {
        var medico = this.usuarios.filter(function (usuario) {
            return usuario.link === link && usuario.sala === 'medico';
        })[0];
        return medico;
    };
    Conexion.prototype.getUsuario = function (id_socket) {
        var usuario = this.usuarios.filter(function (usuario) {
            return usuario.id_socket === id_socket;
        })[0];
        return usuario;
    };
    Conexion.prototype.getUsuarios = function () {
        return this.usuarios;
    };
    Conexion.prototype.actualizarEstatusMedicoPaciente = function (link, estatus) {
        this.usuarios = this.usuarios.filter(function (usuario) {
            if (usuario.link === link && usuario.status != estatus) {
                usuario.status = estatus;
            }
            return usuario;
        });
        return this.usuarios;
    };
    return Conexion;
}());
module.exports = {
    Conexion: Conexion
};
//# sourceMappingURL=conexiones.js.map