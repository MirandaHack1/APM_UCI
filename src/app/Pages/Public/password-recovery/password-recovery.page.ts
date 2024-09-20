import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/Services/auth/auth.service';

@Component({
  selector: 'app-password-recovery',
  templateUrl: './password-recovery.page.html',
  styleUrls: ['./password-recovery.page.scss'],
})
export class PasswordRecoveryPage implements OnInit {
  email: string = "";

  constructor(
    public navCtrl: NavController,
    public servicio: AuthService
  ) { }

  ngOnInit() {
  }

  checkEmail() {
    let datos = {
      accion: 'checkEmail',
      email: this.email
    };

    this.servicio.postData(datos).subscribe((res: any) => {
      if (res.estado === true) {
        // Crear token temporal
        const token = res.datos[0].token;

        // Guardar el código de la persona y el correo de recuperación en las preferencias
        this.servicio.saveToken(token); // Guarda el token generado
        this.servicio.saveUserCode(res.datos[0].USAD_CODE); // Guarda el USAD_CODE

        // Enviar token por correo
        this.sendTokenEmail(this.email, token);

        // Navegar a la página de verificación de token
        this.navCtrl.navigateForward('check-token');
      } else {
        this.servicio.showToast(res.mensaje);
      }
    });
  }


  // Enviar token al correo de recuperación (este método puede hacer una llamada a tu backend)
  sendTokenEmail(email: string, token: string) {
    let datos = {
      accion: 'sendTokenEmail',
      email: email,
      token: token
    };
    this.servicio.postData(datos).subscribe((res: any) => {
      if (res.estado === true) {
        this.servicio.showToast('Se ha enviado un token de recuperación a su correo.');
      } else {
        this.servicio.showToast(res.mensaje);
      }
    });
  }
}
