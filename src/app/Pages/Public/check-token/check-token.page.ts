import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/Services/auth/auth.service';

@Component({
  selector: 'app-check-token',
  templateUrl: './check-token.page.html',
  styleUrls: ['./check-token.page.scss'],
})
export class CheckTokenPage implements OnInit {
  token: string = "";

  constructor(
    public navCtrl: NavController,
    public servicio: AuthService
  ) { }

  ngOnInit() {
  }

  async verificartoken() {
    // Obtén el token guardado
    const storedToken = await this.servicio.getToken();
    
    
    if (this.token === storedToken) {
      // Token válido, redirige a la página para cambiar la contraseña
      this.navCtrl.navigateForward('change-password');
    } else {
      // Token inválido
      this.servicio.showToast('Token inválido o expirado.', true);
    }
  }
}
