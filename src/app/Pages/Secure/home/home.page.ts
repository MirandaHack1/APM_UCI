import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { personCircle, personCircleOutline, sunny, sunnyOutline } from 'ionicons/icons';
import { AuthService } from 'src/app/Services/auth/auth.service';
import { UserRolPage } from '../user-rol/user-rol.page';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  rol :string="";
  paletteToggle = false;
  menuVisible: boolean = false;
  constructor(
    public servicio:AuthService,
    public navCtrl:NavController,
  
  ) 
  {
    this.servicio.getSession('USAD_ROLE').then((res:any)=>{
      this.rol = res;
    });
    addIcons({ personCircle, personCircleOutline, sunny, sunnyOutline }); 

  }
  // Función para alternar el estado de visibilidad del menú
  toggleMenu() {
    this.menuVisible = !this.menuVisible;
  }

  // Acción al seleccionar una opción del menú
  selectOption(option: string) {
    console.log('Seleccionaste:', option);
    this.menuVisible = false; // Cierra el menú después de seleccionar
  }
  irPerfil(){
    this.navCtrl.navigateForward('credentials-info');
  }
  irInfoPersonal(){
    this.navCtrl.navigateForward('info-client');
  }

  ngOnInit() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    this.initializeDarkPalette(prefersDark.matches);
    prefersDark.addEventListener('change', (mediaQuery) => this.initializeDarkPalette(mediaQuery.matches));
  }

  initializeDarkPalette(isDark: boolean) {
    this.paletteToggle = isDark;
    this.toggleDarkPalette(isDark);
  }

  toggleChange(ev: any) {
    this.toggleDarkPalette(ev.detail.checked);
  }

  toggleDarkPalette(shouldAdd: boolean) {
    document.documentElement.classList.toggle('ion-palette-dark', shouldAdd);
  }

  userRol() {
    this.navCtrl.navigateForward('user-rol');
  }
  
  rules() {
    this.navCtrl.navigateForward('rules');
  }

  groupStage(){
    this.navCtrl.navigateForward('group-stage');

  }
  matches(){
    this.navCtrl.navigateForward('matches');

  }


}
