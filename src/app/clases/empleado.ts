import { persona } from './persona';

export class empleado extends persona {

    especialidades:string[]; 

    constructor(nombre, apellido, especialidades:string[], id:string) {
        super(nombre, apellido,id);
        this.especialidades=especialidades;
        
    }
}