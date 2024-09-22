import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/Services/auth/auth.service';
import { SearchCourtPage } from './search-court/search-court.page';
import { SearchSportsGroupsDosPage } from './search-sports-groups-dos/search-sports-groups-dos.page';

// import { SearchCourtPage } from './search-cancha/search-cancha.page';
// import { SearchSportsGroupsDosPage } from './search-equipo/search-equipo.page';

@Component({
  selector: 'app-edit-matches',
  templateUrl: './edit-matches.page.html',
  styleUrls: ['./edit-matches.page.scss'],
})
export class EditMatchesPage implements OnInit {

  matchDate: string = "";   // Fecha del encuentro
  matchHour: string = "";   // Hora del encuentro
  cancCode: string = "";    // Código de cancha seleccionado
  spgCodeOne: string = "";  // Código de equipo 1 seleccionado
  spgCodeTwo: string = "";  // Código de equipo 2 seleccionado
  txt_cancha: string = "";  // Nombre de la cancha seleccionada
  txt_equipo1: string = ""; // Nombre del equipo 1 seleccionado
  txt_equipo2: string = ""; // Nombre del equipo 2 seleccionado
  cod: string = "";         // Código del partido (opcional para edición)

  constructor(
    public navCtrl: NavController,
    public authService: AuthService,
    public modalCtrl: ModalController
  ) {
    // Cargar la sesión y los datos iniciales del partido si es edición
    this.authService.getSession('MATC_CODE').then((res: any) => {
      this.cod = res;
      this.cargarDatos();
    });
  }

  ngOnInit() {}

  // Cargar datos del partido si es edición
  cargarDatos() {
    let datos = {
      accion: "cargaMatch",
      cod: this.cod
    };
    this.authService.postData(datos).subscribe((res: any) => {
      if (res.estado === true) {
        let match = res.datos[0];
        this.matchDate = match.fecha;
        this.matchHour = match.hora;
        this.cancCode = match.cancha_code;
        this.spgCodeOne = match.team_one_code;
        this.spgCodeTwo = match.team_two_code;
        this.txt_cancha = match.cancha_nombre;
        this.txt_equipo1 = match.team_one_name;
        this.txt_equipo2 = match.team_two_name;
      }
    });
  }

  // Abrir modal para seleccionar cancha
  async selectCancha() {
    const modal = await this.modalCtrl.create({
      component: SearchCourtPage
    });

    modal.onDidDismiss().then((result) => {
      if (result.data) {
        const { code, name } = result.data;
        this.txt_cancha = name;
        this.cancCode = code; // Código de la cancha seleccionada
      }
    });

    return await modal.present();
  }

  // Abrir modal para seleccionar equipo 1
  async selectEquipo1() {
    const modal = await this.modalCtrl.create({
      component: SearchSportsGroupsDosPage
    });

    modal.onDidDismiss().then((result) => {
      if (result.data) {
        const { code, name } = result.data;
        this.txt_equipo1 = name;
        this.spgCodeOne = code; // Código del equipo 1 seleccionado
      }
    });

    return await modal.present();
  }

  // Abrir modal para seleccionar equipo 2
  async selectEquipo2() {
    const modal = await this.modalCtrl.create({
      component: SearchSportsGroupsDosPage
    });

    modal.onDidDismiss().then((result) => {
      if (result.data) {
        const { code, name } = result.data;
        this.txt_equipo2 = name;
        this.spgCodeTwo = code; // Código del equipo 2 seleccionado
      }
    });

    return await modal.present();
  }

  // Guardar los datos del partido
  saveMatch() {
    let datos = {
      accion: this.cod ? 'ActualizarMatch' : 'AgregarMatch',
      id_partido: this.cod || '',
      matchDate: this.matchDate,
      matchHour: this.matchHour,
      cancCode: this.cancCode,
      spgCodeOne: this.spgCodeOne,
      spgCodeTwo: this.spgCodeTwo
    };
    this.authService.postData(datos).subscribe((res: any) => {
      if (res.estado === true) {
        this.authService.showToast(this.cod ? 'Partido actualizado correctamente' : 'Partido guardado correctamente');
        this.navCtrl.back();
      } else {
        this.authService.showToast(res.mensaje);
      }
    });
  }

  // Navegar hacia atrás
  back() {
    this.navCtrl.back();
  }
}
