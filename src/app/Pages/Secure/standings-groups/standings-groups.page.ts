import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/auth/auth.service';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-standings-groups',
  templateUrl: './standings-groups.page.html',
  styleUrls: ['./standings-groups.page.scss'],
})
export class StandingsGroupsPage implements OnInit {

  groupedTeams: any[] = [];
  generoSeleccionado: string = '';
  mostrarBotonAgregar: boolean = false;
  search: string = '';
  constructor(private authService: AuthService, public navCtrl: NavController, private alertCtrl: AlertController,) { }

  ngOnInit() {
    this.loadGroupStandings();
  }

  // Cargar clasificaciones desde el backend
  loadGroupStandings() {
    const postData = {
      accion: 'standingsgroups',
      genero: this.generoSeleccionado || ''
    };

    this.authService.postData(postData).subscribe(
      (response: any) => {
        if (response.estado === true) {
          const standingsData = response.datos;
          const groups = this.groupTeamsByGroupName(standingsData);
          this.groupedTeams = this.sortTeamsAndMarkTop(groups);
        } else {
          console.error('Error fetching standings:', response.mensaje);
        }
      },
      (error) => {
        console.error('Error in PHP API call:', error);
      }
    );
  }

  // Agrupar equipos por nombre de grupo
  groupTeamsByGroupName(teams: any[]) {
    const grouped = teams.reduce((acc, team) => {
      let group = acc.find((g: { name: any; }) => g.name === team.GRUP_NAME);
      if (!group) {
        group = { name: team.GRUP_NAME, teams: [] };
        acc.push(group);
      }
      group.teams.push({
        name: team.SPG_TEAM_NAME,
        points: team.SPG_POINTS,
        goalDifference: team.SPG_GOAL_DIFFERENCE,
        playedMatches: team.SPG_STAG_PLAYED_MATCH,
        isTopTeam: false
      });
      return acc;
    }, []);
    return grouped;
  }

  // Ordenar equipos por puntos y marcar al equipo con más puntos
  sortTeamsAndMarkTop(groups: any[]) {
    groups.forEach(group => {
      group.teams.sort((a: { points: number; }, b: { points: number; }) => b.points - a.points);
      if (group.teams.length > 0) {
        group.teams[0].isTopTeam = true;
      }
    });
    return groups;
  }

  // Filtrar por género
  filtrarPorGenero(genero: string) {
    this.generoSeleccionado = genero;
    this.mostrarBotonAgregar = true;
    this.loadGroupStandings();
  }

  // Cargar ambos géneros
  cargarAmbosGeneros() {
    this.generoSeleccionado = '';
    this.mostrarBotonAgregar = false;
    this.loadGroupStandings();
  }

  // Buscar grupos según la entrada de búsqueda
  buscarGrupos() {
    this.loadGroupStandings();
  }

  cancelar() {
    this.navCtrl.back();
  }

  async agregarMatch() {
    const alert = await this.alertCtrl.create({
        header: 'Agregar Finalistas',
        message: '¿Seguro que quieres agregar los finalistas al grupo Finales?',
        buttons: [
            {
                text: 'No',
                role: 'cancel',
            },
            {
                text: 'Sí',
                handler: async () => {
                    const equiposGanadores = this.groupedTeams.map(group => {
                        const topTeam = group.teams.find((team: { isTopTeam: any; }) => team.isTopTeam);
                        return {
                            nombreEquipo: topTeam?.name || '',
                            grupo: group.name
                        };
                    }).filter(equipo => equipo.nombreEquipo !== '');

                    if (equiposGanadores.length === 0) {
                        await this.mostrarAlerta('No hay equipos ganadores para agregar.');
                        return;
                    }

                    const postData = {
                        accion: 'agregarFinalistas',
                        genero: this.generoSeleccionado || '',
                        equiposGanadores: equiposGanadores
                    };

                    this.authService.postData(postData).subscribe(
                        (response: any) => {
                            if (response.estado) {
                                this.mostrarAlerta('Los equipos finalistas se han agregado correctamente al grupo Finales.');
                                this.loadGroupStandings();  
                            } else {
                                console.error('Error al agregar finalistas:', response.mensaje);
                                this.mostrarAlerta('Error al agregar finalistas. Intenta de nuevo.');
                            }
                        },
                        (error) => {
                            console.error('Error en la llamada al API:', error);
                            this.mostrarAlerta('Error en la conexión. Intenta de nuevo.');
                        }
                    );
                }
            }
        ]
    });
    await alert.present();
}

  
  // Método para mostrar una alerta simple
  async mostrarAlerta(mensaje: string) {
    const alert = await this.alertCtrl.create({
      header: 'Información',
      message: mensaje,
      buttons: ['OK']
    });
  
    await alert.present();
  }
  
  
  
}
