import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { personCircle, personCircleOutline, sunny, sunnyOutline } from 'ionicons/icons';
import { AuthService } from 'src/app/Services/auth/auth.service';

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

  constructor(public servicio: AuthService, public navCtrl: NavController) {
    this.servicio.getSession('USAD_ROLE').then((res: any) => {
      this.rol = res;
    });

    this.servicio.getSession('USAD_CODE').then((res: any) => {
      this.id_persona = res;
    });

    this.servicio.getSession('DARK_MODE').then((res: any) => {
      this.paletteToggle = res === 'on'; // Establecer el estado de la paleta
      this.toggleDarkPalette(this.paletteToggle); // Aplicar la paleta correspondiente
    });

    addIcons({ personCircle, personCircleOutline, sunny, sunnyOutline });
  }

  ngOnInit() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    this.initializeDarkPalette(prefersDark.matches);

    // Escuchar cambios en el esquema de color preferido del sistema
    prefersDark.addEventListener('change', (mediaQuery) =>
      this.initializeDarkPalette(mediaQuery.matches)
    );
  }

  // Inicializar la paleta oscura/clara al cargar la página
  initializeDarkPalette(isDark: boolean) {
    this.paletteToggle = isDark;
    this.toggleDarkPalette(isDark);
  }

  // Cambiar el modo oscuro y guardar la preferencia en la base de datos
  toggleChange(ev: any) {
    const isDarkMode = ev.detail.checked ? 'on' : 'off';
    let datos = {
      accion: 'actualizarModoOscuro',
      USAD_CODE: this.id_persona, // ID del usuario logueado
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

  // Alternar la paleta de colores
  toggleDarkPalette(shouldAdd: boolean) {
    document.documentElement.classList.toggle('ion-palette-dark', shouldAdd);
  }

  // Aquí no se modificó nada más fuera del modo oscuro
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
}
