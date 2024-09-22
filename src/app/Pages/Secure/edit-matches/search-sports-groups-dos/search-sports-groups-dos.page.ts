import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/Services/auth/auth.service';

@Component({
  selector: 'app-search-sports-groups-dos',
  templateUrl: './search-sports-groups-dos.page.html',
  styleUrls: ['./search-sports-groups-dos.page.scss'],
})
export class SearchSportsGroupsDosPage implements OnInit {
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

  ngOnInit() {}

  // Búsqueda de equipos por grupo
  searchTeams() {
    const datos = {
      "accion": "searchTeamsdos",
      "result": this.txt_search,
      "team_gender": this.Genero
    };
  
    this.authService.postData(datos).subscribe((res: any) => {
      if (res.estado === true) {
        this.groupedTeams = this.agruparEquiposPorGrupo(res.datos); // Agrupar resultados por grupo
      } else {
        this.authService.showToast('No se encontraron equipos con ese nombre.');
        this.groupedTeams = []; // Limpiar si no hay resultados
      }
    }, err => {
      console.error('Error durante la búsqueda de equipos:', err);
      this.authService.showToast('Error al buscar equipos.');
      this.groupedTeams = []; // Limpiar en caso de error
    });
  }
  

  agruparEquiposPorGrupo(teams: any[]) {
    return teams.reduce((acc, team) => {
      // Encontrar si ya existe el grupo en el arreglo de agrupación
      let grupoExistente = acc.find((g: { grupo: any; }) => g.grupo === team.grupo);
      
      if (!grupoExistente) {
        grupoExistente = { 
          grupo: team.grupo, 
          equipos: []  // Crear un array para los equipos de este grupo
        };
        acc.push(grupoExistente); // Añadir el grupo al acumulador
      }
  
      // Convertir el valor de 'en_partido' a un booleano (1 = true, 0 = false)
      const estaEnPartido = team.en_partido === "1"; // Si es "1", es true, de lo contrario false
  
      // Añadir el equipo al grupo correspondiente
      grupoExistente.equipos.push({
        codigo: team.codigo,
        nombre: team.nombre,
        en_partido: estaEnPartido // Usar valor booleano
      });
  
      return acc;
    }, []);
  }
  
  

  // Alternar la visualización de equipos por grupo
  toggleAccordion(group: { showTeams: boolean; }) {
    this.groupedTeams.forEach(g => {
      if (g !== group) {
        g.showTeams = false;
      }
    });
    group.showTeams = !group.showTeams;
  }

  // Selección de un equipo
  addTeam(codigo: string, nombre: string) {
    const result = {
      code: codigo,
      name: nombre
    };

    this.authService.createSession('SPG_CODE', codigo);
    this.authService.createSession('SPG_TEAM_NAME', nombre);

    this.modalCtrl.dismiss(result);
  }

  cancel() {
    this.modalCtrl.dismiss();
  }
}
