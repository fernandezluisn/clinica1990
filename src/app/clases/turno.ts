export class  turno {
    idProfesional:string;
    idPaciente:string;
    estado:string;
    fecha:Date;
    numeroTurno:number;
    reseña: string;

    constructor(medico:string, paciente:string, estado:string, fecha:Date, turno:number){
        this.fecha=fecha;
        this.idPaciente=paciente;
        this.idProfesional=medico;
        this.estado=estado;
        this.numeroTurno=turno;
    }
    

    
}