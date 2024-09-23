import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/Services/auth/auth.service';
import { SearchGroupPlayersPage } from './search-group-players/search-group-players.page';



@Component({
  selector: 'app-edit-sport-group-players',
  templateUrl: './edit-sport-group-players.page.html',
  styleUrls: ['./edit-sport-group-players.page.scss'],
})
export class EditSportGroupPlayersPage implements OnInit {
  txt_player : string = "";
  player_code : string = "";
  txt_shirtNumber : string = "";
  cod : string = "";
  cod2 : string = "";
   isEditMode: boolean = false;

  constructor(

    public navCtrl: NavController,
    public servicio: AuthService,
    public modalCtrl: ModalController

  ) 
  { 
    this.servicio.getSession('SPG_CODE').then((res:any) => {
      this.cod = res;
      
    });
    this.servicio.getSession('teap_code').then((res:any) => {
      this.cod2 = res;
      if(this.cod2){
        this.loadPlayer();
        this.enableEditMode();
      }

      
      
    });

  }

  ngOnInit() {
  }
  enableEditMode() {
    this.isEditMode = true;
  }

  back() {
    this.navCtrl.back();
  }

  
  async searchPlayer() {

    const modal = await this.modalCtrl.create({
      component: SearchGroupPlayersPage
    });

    modal.onDidDismiss().then((result) => {
      if (result.data) {
        const { code, name } = result.data;
        this.player_code =code;
        this.txt_player = name;

      }
    });

    return await modal.present();
  }

  verify(){
    if(this.cod2){
      this.updatePlayer();
    }
    else{
      this.savePlayer();
    }



  }
  savePlayer(){
    let datos = {
      "accion": "insertPlayer",
      "player_code": this.player_code,
      "group_code": this.cod,
      "shirt_number": this.txt_shirtNumber,
    };

    this.servicio.postData(datos).subscribe((res: any) => {
      if (res.estado === true) {
        this.servicio.showToast(res.mensaje);
        this.back();
      } else {
        this.servicio.showToast(res.mensaje, true);
      }
    });

  }
  updatePlayer(){
    let datos = {
      "accion": "updatePlayer",
      "player_code": this.player_code,
      "group_code": this.cod,
      "shirt_number": this.txt_shirtNumber,
      "teap_code": this.cod2,
    };

    this.servicio.postData(datos).subscribe((res: any) => {
      if (res.estado === true) {
        this.servicio.showToast(res.mensaje);
        this.back();
      } else {
        this.servicio.showToast(res.mensaje, true);
      }
    });

  }
  
  loadPlayer() {
    let datos = {
      "accion": "loadPlayer",
      "player_code": this.cod2 // El código del jugador
    };
  
    this.servicio.postData(datos).subscribe((res: any) => {
      if (res.estado === true) {
        const info = res.info[0]; // Aquí obtienes el primer (y único) jugador
        this.txt_player = `${info.ICLI_FIRST_NAME} ${info.ICLI_LAST_NAME}`;
        this.player_code = info.ICLI_CODE;
        this.txt_shirtNumber = info.TEAP_SHIRT_NUMBER;
        this.cod = info.SPG_CODE; // Asignar el SPG_CODE
      } else {
        //this.servicio.showToast(res.mensaje);
      }
    });
  }


}
