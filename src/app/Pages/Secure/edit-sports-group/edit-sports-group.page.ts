import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/Services/auth/auth.service';
import { SearchPlayersPage } from './search-players/search-players.page';

@Component({
  selector: 'app-edit-sports-group',
  templateUrl: './edit-sports-group.page.html',
  styleUrls: ['./edit-sports-group.page.scss'],
})
export class EditSportsGroupPage implements OnInit {
  txt_nameGroup: string = "";
  txt_leader: string = "";
  txt_sportName: string = "";
  txt_sport_gender: string = "";
  txt_grandmother: string = "";
  txt_observations: string = "";
  txt_date: string = "";
  txt_pet: string = "";
  sports: any[] = [];
  cod: string = "";
  
  leaderCode: string = "";
  grandmotherCode: string = "";
  petCode: string = "";
  
  constructor(
    public navCtrl: NavController,
    public servicio: AuthService,
    public modalCtrl: ModalController
  ) { 
    this.servicio.getSession('ICLI_CODE').then((res: any) => {
      this.cod = res;
      this.loadSport();
    });
  }

  ngOnInit() {
    this.txt_date = this.getCurrentDateInEcuador();
  }

  back() {
    this.navCtrl.back();
  }

  loadSport() {
    let datos = {
      "accion": "loadSport",
    };
    this.servicio.postData(datos).subscribe((res: any) => {
      if (res.estado === true) {
        this.sports = res.info;
      } else {
        this.servicio.showToast('No hay reglas disponibles.');
      }
    });
  }

  getCurrentDateInEcuador(): string {
    const date = new Date();
    const offset = -5; // Offset para Ecuador
    const localDate = new Date(date.getTime() + offset * 60 * 60 * 1000);
    return localDate.toISOString().split('T')[0];
  }

  async searchPlayer(player: string) {
    this.servicio.createSession('player_type', player);

    const modal = await this.modalCtrl.create({
      component: SearchPlayersPage
    });

    modal.onDidDismiss().then((result) => {
      if (result.data) {
        const { code, name } = result.data;
        if (player === 'pet') {
          this.txt_pet = name;
          this.petCode = code;
        } else if (player === 'grandmother') {
          this.txt_grandmother = name;
          this.grandmotherCode = code;
        } else if (player === 'leader') {
          this.txt_leader = name;
          this.leaderCode = code;
        }
      }
    });

    return await modal.present();
  }

  saveData() {
    let datos = {
      "leaderCode": this.leaderCode,
      "grandmotherCode": this.grandmotherCode,
      "petCode": this.petCode,
      "txt_nameGroup": this.txt_nameGroup,
      "txt_sportName": this.txt_sportName,
      "txt_sport_gender": this.txt_sport_gender,
      "txt_observations": this.txt_observations,
      "txt_date": this.txt_date,
    };

    this.servicio.postData(datos).subscribe((res: any) => {
      if (res.estado === true) {
        this.servicio.showToast('Datos guardados correctamente.');
      } else {
        this.servicio.showToast('Error al guardar los datos.');
      }
    });
  }

  validate(){
    
  }
}