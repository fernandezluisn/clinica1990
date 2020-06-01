import { persona } from './persona';

export class empleado extends persona {

    especialidades:string[]; 

    constructor(nombre, apellido, mail, especialidades:string[]) {
        super(nombre, apellido, mail);
        this.especialidades=especialidades;
        
    }
}