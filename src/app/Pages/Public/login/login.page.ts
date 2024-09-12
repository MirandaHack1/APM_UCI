import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/Services/auth/auth.service';
import { PasswordRecoveryPage } from '../password-recovery/password-recovery.page';
import { UserRegisterPage } from '../user-register/user-register.page';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  USAD_EMAIL: string = '';
  USAD_PASSWORD: string = '';

  constructor(
    public servicio: AuthService,
    public modalCtrl: ModalController,
    public navCtrl: NavController
  ) {}

  ngOnInit() {}
  //----------------login-----------------------------
  login() {
    let datos = {
      accion: 'loggin',
      USAD_EMAIL: this.USAD_EMAIL,
      USAD_PASSWORD: this.USAD_PASSWORD
    }
    this.servicio.postData(datos).subscribe((res:any)=>{
      if(res.estado==true)
      {
        this.servicio.createSession('USAD_CODE',res.user_admin[0].USAD_CODE);
        this.servicio.createSession('USAD_USERNAME',res.user_admin[0].USAD_USERNAME);
        this.servicio.createSession('USAD_ROLE',res.user_admin[0].USAD_ROLE);
        this.servicio.createSession('ICLI_CODE', res.user_admin[0].ICLI_CODE );
        this.servicio.showToast(res.mensaje);
        this.navCtrl.navigateRoot(['/home']);
      } else {
        this.servicio.showToast(res.mensaje);
      }
    });
  }

  passwordRecovery() {

    this.navCtrl.navigateForward('password-recovery');
  }
  //DIRECIONANDO AL FORMULARIO DE USER-REGISTER
  createUser() {
    this.navCtrl.navigateForward('user-register');
    

  }
  




}
