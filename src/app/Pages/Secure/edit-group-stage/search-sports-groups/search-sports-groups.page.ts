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
  groupedTeams: any[] = []; // Para almacenar los equipos agrupados
  Genero: string = ""; 

  constructor(
    public modalCtrl: ModalController,
    public authService: AuthService
  ) {
    this.authService.getSession('SPG_GENDER_TEAM').then((res: any) => {
      this.Genero = res;
      console.log(this.Genero);
      this.searchTeams();
    }).catch(err => {
      console.error('Error fetching session:', err);
    });
  }

  ngOnInit() {
    // Inicializaciones si son necesarias
  }

  // Búsqueda de equipos por nombre
  searchTeams() {
    const datos = {
      "accion": "searchTeams",
      "result": this.txt_search,
      "team_gender": this.Genero
    };

    this.authService.postData(datos).subscribe((res: any) => {
      if (res.estado === true) {
        this.groupedTeams = this.agruparEquiposPorFecha(res.datos); // Agrupar resultados
      } else {
        this.authService.showToast('No se encontraron equipos con ese nombre.');
        this.groupedTeams = []; // Limpiar si no hay resultados
      }
    }, err => {
      console.error('Error during searchTeams:', err);
      this.authService.showToast('Error al buscar equipos.');
      this.groupedTeams = []; // Limpiar en caso de error
    });
  }

  // Agrupar equipos por nombre y fechas disponibles
  agruparEquiposPorFecha(teams: any[]) {
    return teams.reduce((acc, team) => {
      let equipoExistente = acc.find((t: { codigo: any; }) => t.codigo === team.codigo);
      if (!equipoExistente) {
        equipoExistente = { 
          codigo: team.codigo, 
          nombre: team.nombre, 
          fechas: [],
          showDates: false // Inicializa la propiedad para mostrar las fechas
        };
        acc.push(equipoExistente);
      }
      equipoExistente.fechas.push({
        fecha: team.fecha,
        horaDesde: team.horaDesde,
        horaHasta: team.horaHasta
      });
      return acc;
    }, []);
  }
  
  // Alternar la visualización de fechas
toggleAccordion(team: { showDates: boolean; }) {
  // Cerrar otros acordeones
  this.groupedTeams.forEach(t => {
    if (t !== team) {
      t.showDates = false;
    }
  });
  team.showDates = !team.showDates;
}

  
  // Selección de un equipo
  addTeam(codigo: string, nombre: string) {
    const result = {
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
