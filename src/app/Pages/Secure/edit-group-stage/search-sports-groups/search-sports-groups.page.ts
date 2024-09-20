import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/Services/auth/auth.service';

@Component({
  selector: 'app-search-sports-groups',
  templateUrl: './search-sports-groups.page.html',
  styleUrls: ['./search-sports-groups.page.scss'],
})
export class SearchSportsGroupsPage implements OnInit {
  txt_search: string = ""; // Entrada de texto para búsqueda
  teams: any[] = []; // Lista de equipos obtenidos
  type: string = ""; // Tipo de grupo (equipo, etc.)

  constructor(
    public modalCtrl: ModalController,
    public servicio: AuthService
  ) {
    // Obtener el tipo de sesión (tipo de equipo) cuando se crea el componente
    this.servicio.getSession('team_type').then((res: any) => {
      this.type = res;
    });
  }

  ngOnInit() {
   // this.loadTeams(); // Cargar los equipos al iniciar
  }

  // Cargar equipos desde el servidor o la base de datos
  loadTeams() {
    let datos = {
      "accion": "loadTeams"
    };

    this.servicio.postData(datos).subscribe((res: any) => {
      if (res.estado === true) {
        this.teams = res.datos; // Asignar los equipos recibidos
      } else {
        this.servicio.showToast('No se encontraron equipos.');
      }
    });
  }

  // Búsqueda de equipos por nombre
  searchTeams() {
    let datos = {
      "accion": "searchTeams",
      "result": this.txt_search
    };

    this.servicio.postData(datos).subscribe((res: any) => {
      if (res.estado === true) {
        this.teams = res.datos; // Asignar los resultados de la búsqueda
      } else {
        this.servicio.showToast('No se encontraron equipos con ese nombre.');
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
    this.servicio.createSession('SPG_CODE', codigo);
    this.servicio.createSession('SPG_TEAM_NAME', nombre);

    this.modalCtrl.dismiss(result); // Cerrar el modal y devolver el resultado
  }

  // Cancelar y cerrar el modal
  cancel() {
    this.modalCtrl.dismiss();
  }
}
