export class  resenia {
    texto:string;
    id:string;
    nombrePaciente:string;
    nombreMedico:string;
    emailMedico:string;
    emailPaciente:string;
    

    constructor(texto:string, nombrePaciente:string, nombreMedico:string, emailMedico:string, emailPaciente:string){
        this.texto=texto;
        this.nombreMedico=nombreMedico;
        this.nombrePaciente=nombrePaciente;
        this.emailPaciente=emailPaciente;
        this.emailMedico=emailMedico;
    }
}