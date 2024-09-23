import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/Services/auth/auth.service';

@Component({
  selector: 'app-info-matches-detail',
  templateUrl: './info-matches-detail.page.html',
  styleUrls: ['./info-matches-detail.page.scss'],
})
export class InfoMatchesDetailPage implements OnInit {
  cod: string = '';
  matchData: any = {};  // Almacena los detalles del partido
  teamOnePlayers: any[] = [];  // Jugadores del equipo 1
  teamTwoPlayers: any[] = [];  // Jugadores del equipo 2

  constructor(
    public navCtrl: NavController,
    public servicio: AuthService
  ) {
    // Obtener el código del partido de la sesión
    this.servicio.getSession('MATCH_CODE').then((res: any) => {
      this.cod = res;
      this.loadInfoMatchDetail();
    });
  }

  ngOnInit() {}

  back() {
    this.navCtrl.back();
  }

  loadInfoMatchDetail() {
    let datos = {
      "accion": "loadInfoMatchDetail",
      "codigo": this.cod
    };

    // Hacer la petición al servidor
    this.servicio.postData(datos).subscribe((res: any) => {
      if (res.estado === true) {
        this.matchData = res.datos[0];
        this.teamOnePlayers = this.matchData.team_one_players;
        this.teamTwoPlayers = this.matchData.team_two_players;
      } else {
        // Muestra un mensaje si no hay datos
        console.log(res.mensaje);
      }
    });
  }
}
