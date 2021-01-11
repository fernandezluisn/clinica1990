import { StringMap } from "@angular/compiler/src/compiler_facade_interface";

export class ee{
    especialidad:string;
    empleados:number;

    constructor(espec:string, empleados:number){
        this.especialidad=espec;
        this.empleados=empleados;
    }
}