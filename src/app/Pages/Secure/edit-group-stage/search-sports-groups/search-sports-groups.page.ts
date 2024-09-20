import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/Services/auth/auth.service';

@Component({
  selector: 'app-search-sports-groups',
  templateUrl: './search-sports-groups.page.html',
  styleUrls: ['./search-sports-groups.page.scss'],
})
export class SearchSportsGroupsPage implements OnInit {
  txt_search: string = ""; 
  teams: any[] = []; 
  Genero: string = ""; 

  constructor(
    public modalCtrl: ModalController,
    public authService: AuthService
  ) {
    this.authService.getSession('SPG_GENDER_TEAM').then((res: any) => {
      this.Genero = res;
      console.log(this.Genero);
      this.searchTeams();
    });

  }

  ngOnInit() {
  }

  // Búsqueda de equipos por nombre
  searchTeams() {
    let datos = {
      "accion": "searchTeams",
      "result": this.txt_search,
      "team_gender": this.Genero
    };

    this.authService.postData(datos).subscribe((res: any) => {
      if (res.estado === true) {
        this.teams = res.datos; // Asignar los resultados de la búsqueda
      } else {
        this.authService.showToast('No se encontraron equipos con ese nombre.');
      }
    });
  }

  // Selección de un equipo
  addTeam(codigo: string, nombre: string) {
    let result = {
      code: codigo,
      name: nombre
    };

    // Crear sesión para el equipo seleccionado
    this.authService.createSession('SPG_CODE', codigo);
    this.authService.createSession('SPG_TEAM_NAME', nombre);

    this.modalCtrl.dismiss(result); // Cerrar el modal y devolver el resultado
  }

  // Cancelar y cerrar el modal
  cancel() {
    this.modalCtrl.dismiss();
  }
}
