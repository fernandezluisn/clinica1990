import { persona } from './persona';

export class empleado extends persona {

    especialidades:string[]; 
    aprobadoPorAdmin:boolean;
    cantidadTurnos:number;
    cantidadLogins:number;
    tieneJornada:boolean;

    

    constructor(nombre, apellido, especialidades:string[], id:string, aprobadoPorAdmin:boolean) {
        super(nombre, apellido,id);
        this.especialidades=especialidades;
        this.aprobadoPorAdmin=aprobadoPorAdmin;
        this.tieneJornada=false;
    }
}