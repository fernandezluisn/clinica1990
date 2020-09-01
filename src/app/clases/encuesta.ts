

export class encuesta{

    id:string;    
    valoracionAtencion:string;
    valoracionInsumos:string;
    valoracionHospital:string;
    idTurno:string;
    

    constructor(valoracionAtnecion:string, valoracionInsumos:string, valoracionHospital:string, idTurno:string){
        this.valoracionAtencion=valoracionAtnecion;
        this.valoracionInsumos=valoracionInsumos;
        this.valoracionHospital=valoracionHospital;
        this.idTurno=idTurno;
        
    }
}
