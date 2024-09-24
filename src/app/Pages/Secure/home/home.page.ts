import { Component, OnInit, HostListener } from '@angular/core';
import { NavController, Platform, AlertController } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { personCircle, personCircleOutline, sunny, sunnyOutline } from 'ionicons/icons';
import { AuthService } from 'src/app/Services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  rol: string = '';
  paletteToggle = false;
  menuVisible: boolean = false;
  id_persona: string = '';

  constructor(
    public servicio: AuthService,
    public navCtrl: NavController,
    private platform: Platform,
    private alertCtrl: AlertController,
    private router: Router // Importar Router
  ) {
    this.servicio.getSession('USAD_ROLE').then((res: any) => {
      this.rol = res;
    });

    this.servicio.getSession('USAD_CODE').then((res: any) => {
      this.id_persona = res;
    });

    this.servicio.getSession('DARK_MODE').then((res: any) => {
      this.paletteToggle = res === 'on';
      this.toggleDarkPalette(this.paletteToggle);
    });

    addIcons({ personCircle, personCircleOutline, sunny, sunnyOutline });
  }

  ngOnInit() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    this.initializeDarkPalette(prefersDark.matches);
    prefersDark.addEventListener('change', (mediaQuery) =>
      this.initializeDarkPalette(mediaQuery.matches)
    );
  }

  initializeDarkPalette(isDark: boolean) {
    this.paletteToggle = isDark;
    this.toggleDarkPalette(isDark);
  }

  toggleChange(ev: any) {
    const isDarkMode = ev.detail.checked ? 'on' : 'off';
    let datos = {
      accion: 'actualizarModoOscuro',
      USAD_CODE: this.id_persona,
      DARK_MODE: isDarkMode
    };
    this.servicio.postData(datos).subscribe((res: any) => {
      if (res.estado) {
        console.log('Preferencia de modo oscuro actualizada.');
      } else {
        console.error('Error al actualizar el modo oscuro:', res.mensaje);
      }
    });
    this.toggleDarkPalette(ev.detail.checked);
  }

  toggleDarkPalette(shouldAdd: boolean) {
    document.documentElement.classList.toggle('ion-palette-dark', shouldAdd);
  }

  toggleMenu() {
    this.menuVisible = !this.menuVisible;
  }

  selectOption(option: string) {
    console.log('Seleccionaste:', option);
    this.menuVisible = false;
  }

  irPerfil() {
    this.navCtrl.navigateForward('credentials-info');
  }

  irInfoPersonal() {
    this.navCtrl.navigateForward('info-client');
  }

  userRol() {
    this.navCtrl.navigateForward('user-rol');
  }

  rules() {
    this.navCtrl.navigateForward('rules');
  }

  busineesIformation() {
    this.navCtrl.navigateForward('business-information');
  }

  groupStage() {
    this.navCtrl.navigateForward('group-stage');
  }

  matches() {
    this.navCtrl.navigateForward('info-matches-general');
  }

  matches2() {
    this.navCtrl.navigateForward('matches');
  }

  sportGroup() {
    this.navCtrl.navigateForward('sports-group');
  }

  groups() {
    this.navCtrl.navigateForward('groups');
  }

  groupstage() {
    this.navCtrl.navigateForward('group-stage');
  }

  court() {
    this.navCtrl.navigateForward('court');
  }

  headquarters() {
    this.navCtrl.navigateForward('busineess-headquarters');
  }
  clasificaciones() {
    this.navCtrl.navigateForward('standings-groups');
  }
  reports(){

    this.navCtrl.navigateForward('reports');
  }
  

  @HostListener('window:beforeunload', ['$event'])
  async handleBeforeUnload(event: any) {
    const alert = await this.alertCtrl.create({
      header: 'Cerrar sesión',
      message: '¿Estás seguro de que deseas cerrar sesión?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            event.preventDefault(); // Cancelar la acción de cerrar
          }
        },
        {
          text: 'Sí',
          handler: () => {
            this.cerrarSession(); // Llama al método de cerrar sesión
          }
        }
      ]
    });
    await alert.present();
    event.returnValue = ''; // Este valor es necesario para que el navegador muestre el cuadro de diálogo
  }
  async confirmarCerrarSesion() {
    const alert = await this.alertCtrl.create({
      header: 'Cerrar sesión',
      message: '¿Estás seguro de que deseas cerrar sesión?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            // El usuario eligió no cerrar sesión
            history.pushState(null, '');
          }
        },
        {
          text: 'Sí',
          handler: () => {
            this.cerrarSession(); // Llama al método de cerrar sesión
          }
        }
      ]
    });
    await alert.present();
  }
  
  cerrarSession() {
    this.servicio.closeSession('USAD_CODE');
    this.navCtrl.navigateRoot('login', { replaceUrl: true });
  }
}
