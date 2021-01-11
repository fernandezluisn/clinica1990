export class infoTurno{
    fecha:string;
    medico:string;
    especialidad:string;
    paciente:string;
    turno:string;
    estado:string;

    constructor(fecha:string,medico:string, especialidad:string, paciente:string, turno:string, estado:string){
        this.fecha=fecha;
        this.especialidad=especialidad;
        this.medico=medico;
        this.paciente=paciente;
        this.turno=turno;
        this.estado=estado;
    }
}