import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/Services/auth/auth.service';




@Component({
  selector: 'app-edit-sports-group',
  templateUrl: './edit-sports-group.page.html',
  styleUrls: ['./edit-sports-group.page.scss'],
})
export class EditSportsGroupPage implements OnInit {
  txt_nameGroup: String ="";
  txt_leader: string ="";
  txt_sportName : String ="";
  txt_sport_gender: String ="";
  txt_grandmother : string ="";
  txt_observations : String ="";
  txt_date : string ="";
  txt_pet : string ="";
  sports: any[] = [];
  cod: string= "";
  

  constructor(

    public navCtrl: NavController
    ,public servicio: AuthService

  ) { 
    this.servicio.getSession('ICLI_CODE').then((res:any) => {
      this.cod = res;
     
      //se carga los datos del usuario por su codigo
      this.loadSport();
     
    });

  }

  ngOnInit() {
    this.txt_date = this.getCurrentDateInEcuador();
  }
  back(){
    this.navCtrl.back();
  }
  validate(){

  }
  loadSport() {
    let datos = {
      "accion": "loadSport",
    }
    this.servicio.postData(datos).subscribe((res: any) => {
      if (res.estado === true) {
        this.sports = res.info;
      } else {
        // Muestra un mensaje de error en caso de que no haya datos
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

  searchPlayer(player: string) {
    this.servicio.createSession('player_type', player);
    this.navCtrl.navigateRoot(['search-players']);
  }

}
