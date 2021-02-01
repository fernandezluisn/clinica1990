import { empleado } from './empleado';
import { paciente } from './paciente';

export class  turno {

    id:string;
    empleado:empleado;
    paciente:paciente;
    estado:string;
    fecha:Date;
    numeroTurno:number;
    resenia: string;    
    especialidad:string;
    encuestaRespondidaMedico:boolean=false;
    encuestaRespondidaPaciente:boolean=false;
    comentario:string;
    edad:number;
    temperatura:number;
    presion:number;
    dato1n:string;
    dato1v:any;
    dato2n:string;
    dato2v:any;
    dato3n:string;
    dato3v:any;
    hora:string;
    
   

    constructor(medico:empleado, paciente:paciente, estado:string, fecha:Date, turno:number, resenia:string, especialidad:string, hora:string){
        this.fecha=fecha;
        this.paciente=paciente;
        this.empleado=medico;
        this.estado=estado;
        this.numeroTurno=turno;
        this.resenia=resenia;
        this.especialidad=especialidad;
        this.hora=hora;
    }
    

    
}