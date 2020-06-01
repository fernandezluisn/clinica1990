export abstract class persona {

    nombre:string;
    apellido:string;
    mail:string;

    constructor(nombre: string, apellido: string, mail:string) {
        this.mail=mail;
        this.apellido=apellido;
        this.nombre=nombre;
        
    }
}