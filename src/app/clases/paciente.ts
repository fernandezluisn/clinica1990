import { persona } from './persona';

export class  paciente extends persona {
    img1:string;
    img2:string;
    

    constructor(nombre:string, apellido:string,  img1:string, img2:string, id:string){
        super(nombre, apellido, id);
        this.img1=img1;
        this.img2=img2;
    }
}