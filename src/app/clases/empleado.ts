import { persona } from './persona';

export class empleado extends persona {

    especialidades:string[]; 

    constructor(nombre, apellido, mail, especialidades:string[], id:string) {
        super(nombre, apellido, mail, id);
        this.especialidades=especialidades;
        
    }
}