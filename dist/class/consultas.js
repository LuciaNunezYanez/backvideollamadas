// class Consultas{
//     consultas: Object[] = [];
//     constructor(){
//         this.consultas = [];
//     }
//     agregarConsulta(  
//         id_consulta: number, 
//         id_usuario_registro: number,
//         id_paciente_registro: number,
//         fecha_creacion: string,
//         hora_creacion: string,
//         estatus: number,
//         link: string,
//         motivo_consulta: string,
//         id_paciente: number,
//         nombre_paciente: string,
//         apellido_pat_paciente: string,
//         apellido_mat_paciente: string,
//         id_paciente_tel: number,
//         id_telefono_tel: number,
//         id_telefono: number,
//         descripcion_tel: string,
//         num_telefono: string,
//         skestatus: number): Object[]{
//         let consulta: Consulta = {
//             id_consulta, 
//             id_usuario_registro,
//             id_paciente_registro,
//             fecha_creacion,
//             hora_creacion,
//             estatus,
//             link,
//             motivo_consulta,
//             id_paciente,
//             nombre_paciente,
//             apellido_pat_paciente,
//             apellido_mat_paciente,
//             id_paciente_tel,
//             id_telefono_tel,
//             id_telefono,
//             descripcion_tel,
//             num_telefono, 
//             skestatus
//         }
//         this.consultas.push(consulta);
//         return this.consultas;
//     }
//     limpiarObjeto(){
//         this.consultas = [];
//     }
//     getConsultas(): Object[] {
//         return this.consultas;
//     }
//     getConsulta(clave: string){
//         var consulta = this.consultas.filter( (consulta: Consulta ) => {
//             return consulta.link === clave;
//         })[0];
//         return consulta;
//     }
//     eliminarConsulta(id_consulta: number): Object[] {
//         this.consultas = this.consultas.filter( (consulta: Consulta) => {
//             return consulta.id_consulta != id_consulta;
//         });
//         return this.consultas;
//     }
//     actualizarEstatusConsulta(clave: string, estatus: number){
//         this.consultas = this.consultas.filter( (consulta: Consulta) =>{
//             if(consulta.link === clave && consulta.skestatus != estatus){
//                 consulta.skestatus = estatus;
//             }
//             return consulta;
//         });
//         return this.consultas;
//     }
//     // actualizarEstatusConsultaSocket(id_socket: string, estatus: number){
//     //     this.consultas = this.consultas.filter( (consulta: Consulta) =>{
//     //         if(consulta. === id_socket && consulta.skestatus != estatus){
//     //             consulta.skestatus = estatus;
//     //         }
//     //         return consulta;
//     //     });
//     //     return this.consultas;
//     // }
// }
// interface Consulta{
//     id_consulta: number; 
//     id_usuario_registro: number;
//     id_paciente_registro: number;
//     fecha_creacion: string;
//     hora_creacion: string;
//     estatus: number;
//     link: string;
//     motivo_consulta: string;
//     id_paciente: number;
//     nombre_paciente: string;
//     apellido_pat_paciente: string;
//     apellido_mat_paciente: string;
//     id_paciente_tel: number;
//     id_telefono_tel: number;
//     id_telefono: number;
//     descripcion_tel: string;
//     num_telefono: string;
//     skestatus: number;
// }
// module.exports = {
//     Consultas
// }
//# sourceMappingURL=consultas.js.map