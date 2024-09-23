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

  constructor(
    public navCtrl: NavController,
    public servicio: AuthService,
    private alertController: AlertController
  ) { 
    this.servicio.getSession('MATCH_CODE').then((res: any) => {
      this.cod_match  = res;
      this.LoadsearchTeam();
    });
  }

  ngOnInit() {
    this.LoadsearchTeam();
  }

  back() {
    this.navCtrl.back();
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

    this.servicio.createSession('VOSH_CODE', this.selectedPlayerVoshCode);
    this.servicio.createSession('PLAYER_NAME', this.selectedPlayerFullName);
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
    // Lógica para finalizar el partido
  }
}