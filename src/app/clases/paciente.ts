import { persona } from './persona';

export class  paciente extends persona {
    img1:string;
    img2:string;

    constructor(nombre:string, apellido:string, mail:string, img1:string, img2:string){
        super(nombre, apellido, mail);
        this.img1=img1;
        this.img2=img2;
    }
}