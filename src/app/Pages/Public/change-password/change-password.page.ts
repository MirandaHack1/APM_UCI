import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/Services/auth/auth.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage implements OnInit {
  clave: string = "";
  clave2: string = "";
  mensaje: string = "";

  constructor(
    public navCtrl: NavController,
    public servicio: AuthService
  ) { }

  ngOnInit() {
  }

  async vclave() {
    if (this.clave === this.clave2) {
      this.mensaje = "";
      await this.changePassword();
    } else {
      this.mensaje = "Las claves no coinciden";
    }
  }

  async changePassword() {
    // Obtén el código de usuario
    const codigo = await this.servicio.getUserCode();

    let datos = {
      accion: 'updatePassword',
      clave: this.clave,
      codigo: codigo
    };

    this.servicio.postData(datos).subscribe((res: any) => {
      if (res.estado === true) {
        this.servicio.showToast(res.mensaje);

        // Navegar a la página de inicio de sesión u otra página
        this.navCtrl.navigateBack('login'); // Ajusta esto a la página que desees
      } else {
        this.servicio.showToast(res.mensaje);
      }
    });
  }
}
