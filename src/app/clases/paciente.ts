import { persona } from './persona';

export class  paciente extends persona {
    img1:string;
    img2:string;

    constructor(nombre:string, apellido:string, mail:string, img1:string, img2:string, id:string){
        super(nombre, apellido, mail, id);
        this.img1=img1;
        this.img2=img2;
    }
}