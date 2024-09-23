import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/Services/auth/auth.service';

@Component({
  selector: 'app-vocalia-sheet',
  templateUrl: './vocalia-sheet.page.html',
  styleUrls: ['./vocalia-sheet.page.scss'],
})export class VocaliaSheetPage implements OnInit {
  txt_search: string = '';
  selectedTeam: string = 'team1'; // Por defecto en el equipo 1
  cod_match: string = '';
  players: any[] = []; // Almacena los jugadores del equipo seleccionado
  selectedPlayerFullName: string = '';
  selectedPlayerVoshCode: string = ''; // Para almacenar el VOSH_CODE del jugador
  selectedPlayerTeapCode: string = '';
  team_one_name: string = '';  // Nombre del equipo 1
  team_two_name: string = '';  // Nombre del equipo 2
  team_one_code :  string = ''; 
  team_two_code : string = '';   
  txt_albitro : string = '';
  txt_vocal : string = '';

  constructor(
    public navCtrl: NavController,
    public servicio: AuthService,
    private alertController: AlertController
  ) { 
    this.servicio.getSession('MATCH_CODE').then((res: any) => {
      this.cod_match  = res;
      this.loadTeams();
      this.LoadsearchTeam();
    });
  }

  ngOnInit() {
    this.LoadsearchTeam();
  }

  back() {
    this.navCtrl.back();
  }
  loadTeams() {
    let datos = {
      "accion": "LoadTeams",
      "match_code": this.cod_match
    };

    this.servicio.postData(datos).subscribe((res: any) => {
      if (res.estado == true) {
        this.team_one_name = res.team_one_name;
        this.team_one_code = res.team_one_code;  // Guardar código del equipo uno
        this.team_two_name = res.team_two_name;
        this.team_two_code = res.team_two_code;
        this.servicio.createSession('team_one_code', this.team_one_code);
        this.servicio.createSession('team_two_code', this.team_two_code);



          // Guardar código del equipo dos
        this.LoadsearchTeam();  // Cargar jugadores después de obtener los equipos
      }
    });
}



  LoadsearchTeam() {
    let datos = {
      accion: 'LoadPlayersByTeam',
      match_code: this.cod_match,
      team: this.selectedTeam,
      search: this.txt_search
    };

    this.servicio.postData(datos).subscribe((res: any) => {
      if (res.estado == true) {
        this.players = res.datos;
      }
    });
  }

  // Modifica la función para aceptar un jugador y guardar su información
  viewPlayer(player: any) {
    this.selectedPlayerFullName = `${player.first_name} ${player.last_name}`;
    this.selectedPlayerVoshCode = player.vosh_code;
    //teap_code
    this.selectedPlayerTeapCode = player.teap_code;


    


    this.servicio.createSession('VOSH_CODE', this.selectedPlayerVoshCode);
    this.servicio.createSession('PLAYER_NAME', this.selectedPlayerFullName);
    this.servicio.createSession('TEAP_CODE', this.selectedPlayerTeapCode);
    
    this.navCtrl.navigateRoot('edit-vocalia-sheet');
    
    
  }

  async terminarPartido() {
    const alert = await this.alertController.create({
      header: 'Confirmar',
      message: '¿Estás seguro de que quieres terminar el partido?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Acción cancelada');
          }
        },
        {
          text: 'Sí, terminar',
          handler: () => {
            this.finalizarPartido();
          }
        }
      ]
    });

    await alert.present();
  }

  finalizarPartido() {
    let datos = {
      accion: 'FinishMatch',
      match_code: this.cod_match
    };

    this.servicio.postData(datos).subscribe((res: any) => {
      if (res.estado == true) {
        this.navCtrl.navigateRoot('home');
      } else {
        console.log('Error al finalizar el partido');
      }
    });
   
  }
}