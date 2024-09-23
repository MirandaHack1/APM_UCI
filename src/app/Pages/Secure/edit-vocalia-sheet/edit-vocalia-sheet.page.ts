import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/Services/auth/auth.service';
import { SearchVocaliaSheetPage } from './search-vocalia-sheet/search-vocalia-sheet.page';




@Component({
  selector: 'app-edit-vocalia-sheet',
  templateUrl: './edit-vocalia-sheet.page.html',
  styleUrls: ['./edit-vocalia-sheet.page.scss'],
})
export class EditVocaliaSheetPage implements OnInit {
  code_vosh : string ="";
  player_name : string ="";
  txt_name : string ="";
  txt_goals   : string ="";
  txt_yellowCards  : string ="";
  txt_redCards  : string ="";
  txt_changePlayer  : string ="";
  code_changePlayer     : string ="";
  team_one_code : string="";
  team_two_code : string="";
  teap_code : string="";

  
  

  constructor(
    public navCtrl: NavController,
    public servicio: AuthService,
    public modalCtrl: ModalController



  ) 
  { 
    this.servicio.getSession('VOSH_CODE').then((res: any) => {
      this.code_vosh = res;
      this.loadPlayerVocalia();
      console.log(this.code_vosh);
     
    });
    this.servicio.getSession('PLAYER_NAME').then((res: any) => {
      this.player_name = res;
      this.txt_name   = this.player_name;

    });
    
    
  }

  ngOnInit() {
  }
  back(){
    this.navCtrl.back();
  }
  loadPlayerVocalia() {
    let datos = {
      "accion": "LoadPlayerVocalia",
      "code_vosh": this.code_vosh,
    };
  
    this.servicio.postData(datos).subscribe((res: any) => {
      if (res.estado == true && res.datos) {  // Ensure res.datos exists
        this.txt_goals = res.datos.goals || '0';  // Provide default values in case they are null
        this.txt_yellowCards = res.datos.yellow_cards || '0';
        this.txt_redCards = res.datos.red_cards || '0';
        this.txt_changePlayer = res.datos.change_player || '';
        this.code_changePlayer = res.datos.code_change_player || null;
  
        if (res.datos.change_player_name) {
          this.txt_changePlayer = res.datos.change_player_name;
        } else {
          this.txt_changePlayer = ''; // Dejar vacío si no existe
        }
      } else {
        // Handle the case where estado is false or datos is undefined
        console.error('No data found or error in the response.');
      }
    });
  }

  

  async searchPlayer() {

    const modal = await this.modalCtrl.create({
      component: SearchVocaliaSheetPage
    });

    modal.onDidDismiss().then((result) => {
      if (result.data) {
        const { code, name } = result.data;
        this.code_changePlayer =code;
        this.txt_changePlayer = name;

      }
    });

    return await modal.present();
  }

  savePlayerVocalia(){
    let datos = {
      "accion": "SavePlayerVocalia",
      "code_vosh": this.code_vosh,
      "goals": this.txt_goals,
      "yellow_cards": this.txt_yellowCards,
      "red_cards": this.txt_redCards,
      
      "code_change_player": this.code_changePlayer
    };
    this.servicio.postData(datos).subscribe((res: any) => {
      if (res.estado) {
        this.servicio.showToast(res.mensaje);
        this.navCtrl.back();
      } else {
        this.servicio.showToast(res.mensaje);
      }
    });


}

clearChangePlayer(){

  this.code_changePlayer = "";
  this.txt_changePlayer = "";

}
}
