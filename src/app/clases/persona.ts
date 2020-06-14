export abstract class persona {

    id:string;
    nombre:string;
    apellido:string;
    mail:string;

    constructor(nombre: string, apellido: string, mail:string, id:string) {
        this.mail=mail;
        this.apellido=apellido;
        this.nombre=nombre;
        this.id=id;
        
    }
}