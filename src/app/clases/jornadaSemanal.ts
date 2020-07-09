import { empleado } from './empleado';

export class jornadaSemanal{

    medico:empleado;
    tiempoTurnos:number;

    lunes:boolean;
    lunesE:number;
    lunesS:number;

    martes:boolean;
    martesE:number;
    martesS:number;

    miercoles:boolean;
    miercolesE:number;
    miercolesS:number;

    jueves:boolean;
    juevesE:number;
    juevesS:number;

    viernes:boolean;
    viernesE:number;
    viernesS:number;

    sabado:boolean;
    SabadoE:number;
    sabadoS:number;

    constructor(lunes:boolean, martes:boolean, miercoles:boolean, jueves:boolean, viernes:boolean, sabado:boolean, medico:empleado){
        this.jueves=jueves;
        this.lunes=lunes;
        this.sabado=sabado;
        this.martes=martes;
        this.miercoles=miercoles;
        this.viernes=viernes;
        this.medico=medico;
    }
}