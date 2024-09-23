import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/Services/auth/auth.service';
ToastController
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
  matchDate: string = ""; // Recibir la fecha seleccionada
  constructor(
    public modalCtrl: ModalController,
    public authService: AuthService,
    public toastController: ToastController
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
  

  async searchTeams() {
    const dateOnly = this.matchDate.split('T')[0];
    const datos = {
      accion: "searchTeamsdos",
      result: this.txt_search,
      team_gender: this.Genero,
      match_date: dateOnly // Incluir la fecha seleccionada
    };
    
    this.authService.postData(datos).subscribe(async (res: any) => {
      if (res.estado === true) {
        this.groupedTeams = this.agruparEquiposPorGrupo(res.datos);
        
        // Mostrar un toast si se encuentran equipos en partido
        const equiposEnPartido = this.groupedTeams.some(group => 
          group.equipos.some((team: { en_partido: any; }) => team.en_partido)
        );
        if (equiposEnPartido) {
          const toast = await this.toastController.create({
            message: 'ERROR:Equipos en partido en la fecha seleccionada.',
            duration: 3000,
            color: 'danger',  // Color de advertencia
            position: 'top'
          });
          toast.present();
        }
      } else {
        this.authService.showToast('No se encontraron equipos con ese nombre.');
        this.groupedTeams = [];
      }
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
