import { Component, OnInit } from '@angular/core';
import { ServicioService } from 'src/app/servicios/servicio.service';
import { BdaService } from 'src/app/servicios/bda.service';
import { admin } from 'src/app/clases/admin';
import { Router } from '@angular/router';


@Component({
  selector: 'app-agregar-admin',
  templateUrl: './agregar-admin.component.html',
  styleUrls: ['./agregar-admin.component.css']
})
export class AgregarAdminComponent implements OnInit {

  nombre:string;
  apellido:string;
  mail:string;
  pass1:string;
  pass2:string;

  constructor(private service:ServicioService, private bda:BdaService, private router:Router ) { }

  ngOnInit(): void {
    this.mail=null;
    this.apellido=null;
    this.pass1=null;
    this.nombre=null;
  }

  registrar(){
    if((this.mail) || (this.apellido) || (this.nombre) || (this.pass1)){
      alert("Faltan ingresar datos");
    }else{
      if(this.pass1==this.pass2)
      {      
          this.service.registrarUsuario(this.mail, this.pass1).then(
            res=>{
              let a=new admin(this.nombre, this.apellido, this.mail);
              this.bda.createAdmin(a).then(res=>
                alert("Administrador creado exitosamente.")
              ).catch(error=>alert(error.message));         
              this.bda.createUsuario(a);
            }
          ).catch(err=>alert(err))
        
      }else{
        alert("Las contraseñas ingresadas no coinciden.");
      }
    }     
    
  }

  cerrar(){    
    this.service.logOutUser();    
    this.router.navigate(['']);
  }

}
