export class infoMedico{

    nombre:string;
    turnos:number;
    dias_trabajados:number;
    ingresos_al_sistema:number;

    constructor(nombre:string, turnos:number, dias:number, ingresos:number){
        this.nombre=nombre;
        this.turnos=turnos;
        this.dias_trabajados=dias;
        this.ingresos_al_sistema=ingresos;
    }


}