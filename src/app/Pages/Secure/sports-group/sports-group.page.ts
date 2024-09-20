import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/Services/auth/auth.service';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-sports-group',
  templateUrl: './sports-group.page.html',
  styleUrls: ['./sports-group.page.scss'],
})
export class SportsGroupPage implements OnInit {
  cod: string= "";
  group: any[] = [];

  constructor(
    public navCtrl: NavController,
    public servicio: AuthService,
    public alertController: AlertController

  ) 
  { 
     //se trae el codigo del usuario que ingreso y se coloca en "cod"
  this.servicio.getSession('ICLI_CODE').then((res:any) => {
    this.cod = res;
    //se carga los datos del usuario por su codigo
    this.loadSportgroup();
    
  });
    
  }
  ionViewWillEnter() {
    this.loadSportgroup();
   
  }

  ngOnInit() {
  }
  back(){
    this.navCtrl.navigateBack('/home');
  }
 
  loadSportgroup(){
    let datos = {
      "accion": "loadSportgroup", // Corregido a "loadinfo" para coincidir con el PHP
      codigo: this.cod
    };

    this.servicio.postData(datos).subscribe((res: any) => {
      if (res.estado == true) {
        this.group = res.datos;
        
      } else {
        this.servicio.showToast(res.mensaje);
      }
    });
  }
  irEditar(codigo: string) {
    this.servicio.createSession('SPG_CODE', codigo);
    this.navCtrl.navigateRoot(['edit-sports-group']);
  }
  newGroup(){
    this.servicio.createSession('SPG_CODE', '');
    this.navCtrl.navigateRoot(['edit-sports-group']);

  }

  addPlayer(codigo: string) {
    this.servicio.createSession('SPG_CODE', codigo);
    this.navCtrl.navigateRoot(['sport-group-players']);
   
  }
  agregarFecha (codigo: string) {
    this.servicio.createSession('SPG_CODE', codigo);
    this.navCtrl.navigateRoot(['avaliable-dates']);
    
  }

  async confirmDelete(codigo: string) {
    const alert = await this.alertController.create({
      header: 'Confirmación',
      message: '¿Estás seguro de que deseas eliminar este grupo deportivo?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary'
        },
        {
          text: 'Eliminar',
          handler: () => {
            this.deleteFecha(codigo);
          }
        }
      ]
    });
  
    await alert.present();
  }
  
  deleteFecha(codigo: string) {
    this.servicio.createSession('SPG_CODE', codigo);
    let datos = {
      "accion": "deleteSportGroup",
      codigo: codigo
    };
  
    this.servicio.postData(datos).subscribe(
      (res: any) => {
        try {
          if (res.estado == true) {
            this.servicio.showToast(res.mensaje);
            this.loadSportgroup();
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
