

export class encuesta{

    id:string;
    medico:boolean=false;
    paciente:boolean=false;
    valoracionAtencion:string;
    valoracionInsumos:string;
    valoracionHospital:string;
    idTurno:string;
    mailMedico:string;
    mailPaciente:string;

    constructor(valoracionAtnecion:string, valoracionInsumos:string, valoracionHospital:string, idTurno:string, mailMedico:string, mailPaciente:string){
        this.valoracionAtencion=valoracionAtnecion;
        this.valoracionInsumos=valoracionInsumos;
        this.valoracionHospital=valoracionHospital;
        this.idTurno=idTurno;
        this.mailMedico=mailMedico;
        this.mailPaciente=mailPaciente;
    }
}
