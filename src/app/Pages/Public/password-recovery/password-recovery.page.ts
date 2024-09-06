import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/Services/auth/auth.service';

@Component({
  selector: 'app-password-recovery',
  templateUrl: './password-recovery.page.html',
  styleUrls: ['./password-recovery.page.scss'],
})
export class PasswordRecoveryPage implements OnInit {
  email : string =""

  constructor(
    public navCtrl: NavController,
    public servicio:AuthService

  ) { }

  ngOnInit() {
  }
  checkEmail(){
    let datos={
      accion:'checkEmail',
      email: this.email
      
    }
    this.servicio.postData(datos).subscribe((res:any)=>{
      if(res.estado==true)
      {
        //aqui debo crear el token y enviar al correo
        
        this.servicio.showToast(res.mensaje);

       this.navCtrl.navigateForward('check-token');
       
      }
      else{
        this.servicio.showToast(res.mensaje);
      }
    })
    
  }

}
