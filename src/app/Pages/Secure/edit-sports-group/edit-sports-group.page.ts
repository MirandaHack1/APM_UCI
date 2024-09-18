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
  txt_grandmothercode : string = "";
  txt_pet: string = "";
  txt_firma : string = "";
  sports: any = [];
  cod: string = "";
  cod_group: string = "";
  
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
    this.servicio.getSession('SPG_CODE').then((res: any) => {
      this.cod_group = res;
      if(this.cod_group){
        this.loadGroup();
        
      }
    });
  }
  ionViewWillEnter() {
    this.loadGroup();
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
       // this.servicio.showToast('No hay reglas disponibles.');
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
        } 
      }
    });

    return await modal.present();
  }
  

  saveData() {
    let datos = {
      "accion": "insertGroup",

     
      "group_name": this.txt_nameGroup,
      "rule_code": this.txt_sportName,
      "godmother_code": this.grandmotherCode,
      "pet_code": this.petCode,
      "leader_code": this.cod,
      "signature": this.txt_firma,
      "observations": this.txt_observations,
      "creation_date": this.txt_date,
      "gender_team": this.txt_sport_gender,
      "state_match": "Equipo no clasificado"
      
      

    };

    this.servicio.postData(datos).subscribe((res: any) => {
      if (res.estado === true) {
        this.servicio.showToast(res.mensaje);
        this.back();
      } else {
        this.servicio.showToast(res.mensaje);
      }
    });
   
  }

  verify(){
    if(this.cod_group){
      this.updateData();
    }
    else{
      this.saveData();
    }


  }

  loadGroup() {
    let datos = {
      "accion": "loadGroupData",
      "SPG_CODE": this.cod_group
    };
  
    this.servicio.postData(datos).subscribe((res: any) => {
      if (res.estado === true) {
        const info = res.info;
        this.txt_nameGroup = info.group_name;
        this.txt_date = info.creation_date;
        this.txt_firma = info.signature;
        this.txt_observations = info.observations;
        this.txt_sport_gender = info.gender_team;
        this.txt_sportName = info.rule_code;
        this.txt_grandmother = info.godmother_name;
        this.grandmotherCode = info.godmother_code;
        this.txt_pet = info.pet_name;
        this.petCode = info.pet_code;
      } else {
       // this.servicio.showToast(res.mensaje);
      }
    });
  }
  updateData(){
    let datos = {
      "accion": "updateGroup",
      "group_name": this.txt_nameGroup,
      "rule_code": this.txt_sportName,
      "godmother_code": this.grandmotherCode,
      "pet_code": this.petCode,
      "leader_code": this.cod,
      "signature": this.txt_firma,
      "observations": this.txt_observations,
      "creation_date": this.txt_date,
      "gender_team": this.txt_sport_gender,
      "SPG_CODE": this.cod_group
    };

    this.servicio.postData(datos).subscribe((res: any) => {
      if (res.estado === true) {
        this.servicio.showToast(res.mensaje);
        this.back();
      } else {
        this.servicio.showToast(res.mensaje);
      }
    });

  }
  

  
}