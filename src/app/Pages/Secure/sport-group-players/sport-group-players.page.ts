import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/Services/auth/auth.service';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-sport-group-players',
  templateUrl: './sport-group-players.page.html',
  styleUrls: ['./sport-group-players.page.scss'],
})
export class SportGroupPlayersPage implements OnInit {
  txt_search : string = "";
  
  players: any[] = [];
  cod: string= "";

  constructor(
    public navCtrl: NavController, 
    public alertController: AlertController,
    public servicio: AuthService



  ) 
  {
    this.servicio.getSession('SPG_CODE').then((res:any) => {
      this.cod = res;
     
      this.loadSearchPlayers();
      
    });

   }

  ngOnInit() {
  }
  back(){
    this.navCtrl.back();
  }
  loadSearchPlayers(){
    let datos = {
      "accion": "loadSearchPlayers",
      "result": this.txt_search,
      "codigo": this.cod
    };

    this.servicio.postData(datos).subscribe((res: any) => {
      if (res.estado == true) {
        this.players = res.datos;
      } else {
        //this.servicio.showToast(res.mensaje);
      }
    });
    

  }
  irEditar(codigo: string){
    this.servicio.createSession('teap_code', codigo);
    this.navCtrl.navigateRoot(['edit-sport-group-players']);
  }
  newPlayer(){
    this.servicio.createSession('teap_code', '');
    this.navCtrl.navigateRoot(['edit-sport-group-players']);
  
  }

  
async confirmDeletePlayer(codigo: string) {
  const alert = await this.alertController.create({
    header: 'Confirmación',
    message: '¿Estás seguro de que deseas eliminar esta fecha?',
    buttons: [
      {
        text: 'Cancelar',
        role: 'cancel',
        cssClass: 'secondary'
      },
      {
        text: 'Eliminar',
        handler: () => {
          this.deletePlayer(codigo);
        }
      }
    ]
  });

  await alert.present();
}

deletePlayer(codigo: string) {
  let datos = {
    "accion": "deletePlayer",
    codigo: codigo
  };

  this.servicio.postData(datos).subscribe(
    (res: any) => {
      try {
        if (res.estado == true) {
          this.servicio.showToast(res.mensaje);
          this.loadSearchPlayers();
        } else {
          this.servicio.showToast(res.mensaje);
        }
      } catch (error) {
        this.servicio.showToast("No se puede eliminar, tiene registros relacionados.");
      }
    },
    (error) => {
      this.servicio.showToast("No se puede eliminar, tiene registros relacionados.");
    }
  );
}


  
  

}
