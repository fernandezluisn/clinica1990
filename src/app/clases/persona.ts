export abstract class persona {

    id:string;
    nombre:string;
    apellido:string;
    email:string;
    
   

    constructor(nombre: string, apellido: string, email:string) {
        
        this.apellido=apellido;
        this.nombre=nombre;
        this.email=email;
        
        
    }
}