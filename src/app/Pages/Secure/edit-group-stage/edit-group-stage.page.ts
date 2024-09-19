import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/Services/auth/auth.service';
import { SearchSportsGroupsPage } from './search-sports-groups/search-sports-groups.page';
import { SearchGroupsPage } from './search-groups/search-groups.page';


SearchGroupsPage

@Component({
  selector: 'app-edit-group-stage',
  templateUrl: './edit-group-stage.page.html',
  styleUrls: ['./edit-group-stage.page.scss'],
})
export class EditGroupStagePage implements OnInit {

  grupCode: string = ""; // Código de grupo seleccionado
  spgCode: string = "";  // Código de equipo seleccionado
  Genero: string = ""; // Género del deporte
  groups: any[] = []; // Lista de grupos
  teams: any[] = []; // Lista de equipos
  cod: string = ""; // Código del usuario (o cualquier otro dato relevante)
  txt_group:string = "";
  txt_team:string = "";
  constructor(
    public navCtrl: NavController,
    public authService: AuthService,
    public modalCtrl: ModalController
  ) { 
    this.authService.getSession('GRS_CODE').then((res: any) => {
      this.cod = res;
      // this.loadGroups();
      // this.loadTeams();
    });
  }

  ngOnInit() {}

  // // Cargar grupos disponibles desde la base de datos
  // loadGroups() {
  //   let datos = {
  //     "accion": "loadGroups"
  //   };
  //   this.authService.postData(datos).subscribe((res: any) => {
  //     if (res.estado === true) {
  //       this.groups = res.info;
  //     } else {
  //       this.authService.showToast('No hay grupos disponibles.');
  //     }
  //   });
  // }

  // // Cargar equipos disponibles desde la base de datos
  // loadTeams() {
  //   let datos = {
  //     "accion": "loadTeams"
  //   };
  //   this.authService.postData(datos).subscribe((res: any) => {
  //     if (res.estado === true) {
  //       this.teams = res.info;
  //     } else {
  //       this.authService.showToast('No hay equipos disponibles.');
  //     }
  //   });
  // }

  // Abrir modal para seleccionar equipo
  async selectTeam() {
    const modal = await this.modalCtrl.create({
      component: SearchSportsGroupsPage
    });

    modal.onDidDismiss().then((result) => {
      if (result.data) {
        const { code, name } = result.data;
        this.txt_team=name;
        this.spgCode = code; // Código del equipo seleccionado
      }
    });

    return await modal.present();
  }

  // Abrir modal para seleccionar grupo
  async selectGroup() {
    const modal = await this.modalCtrl.create({
      component: SearchGroupsPage
    });

    modal.onDidDismiss().then((result) => {
      if (result.data) {
        const { code, name } = result.data;
        this.txt_group = name;
        this.grupCode = code;// Código del grupo seleccionado
      }
    });

    return await modal.present();
  }

  // Guardar los datos del grupo y equipo seleccionados en la tabla group_stage

  saveData() {
    let datos = {
      accion: this.cod ? 'ActualizarStGrupo' : 'AgregarStGrupo', // Si existe idGrupo, actualizar, si no, agregar
      id_grupoestado: this.cod || '', 
      grupCode: this.grupCode,
      spgCode: this.spgCode,
      Genero: this.Genero
      
    };
    this.authService.postData(datos).subscribe((res: any) => {
      if (res.estado === true) {
        this.authService.showToast(this.cod ? 'Estado de Grupo actualizado correctamente' : 'Estado de Grupo guardado correctamente');
        this.navCtrl.back(); // Regresa a la página anterior
      } else {
        this.authService.showToast(res.mensaje);
      }
    });
  }
  // Validar antes de guardar (si se requiere alguna validación)
  validate() {
    if (this.grupCode && this.spgCode && this.Genero) {
      this.saveData();
    } else {
      this.authService.showToast('Por favor, selecciona todos los campos.');
    }
  }

  // Navegar hacia atrás
  back() {
    this.navCtrl.back();
  }
}
