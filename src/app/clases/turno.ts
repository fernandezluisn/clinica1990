export class  turno {
    idProfesional:string;
    idPaciente:string;
    estado:string;
    fecha:Date;
    hora:string;
    reseña: string;

    constructor(medico:string, paciente:string, estado:string, fecha:Date, hora:string){
        this.fecha=fecha;
        this.idPaciente=paciente;
        this.idProfesional=medico;
        this.estado=estado;
        this.hora=hora;
    }
    

    
}