import { empleado } from './empleado';
import { paciente } from './paciente';

export class  turno {

    id:string;
    empleado:empleado;
    paciente:paciente;
    estado:string;
    fecha:Date;
    numeroTurno:number;
    reseña: string;

    constructor(medico:empleado, paciente:paciente, estado:string, fecha:Date, turno:number){
        this.fecha=fecha;
        this.paciente=paciente;
        this.empleado=medico;
        this.estado=estado;
        this.numeroTurno=turno;
    }
    

    
}