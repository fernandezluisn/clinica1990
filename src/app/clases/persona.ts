export abstract class persona {

    id:string;
    nombre:string;
    apellido:string;
   

    constructor(nombre: string, apellido: string, id:string) {
        
        this.apellido=apellido;
        this.nombre=nombre;
        this.id=id;
        
    }
}