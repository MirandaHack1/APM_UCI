import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/Services/auth/auth.service';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-avaliable-dates',
  templateUrl: './avaliable-dates.page.html',
  styleUrls: ['./avaliable-dates.page.scss'],
})
export class AvaliableDatesPage implements OnInit {
  
  dates: any[] = [];
  cod: string= "";
  cod2: string= "";

  constructor(
    public navCtrl: NavController,
    public alertController: AlertController,
    public servicio: AuthService

  ) 
  { 
    this.servicio.getSession('SPG_CODE').then((res:any) => {
      this.cod2 = res;
      
    });
       //se trae el codigo del usuario que ingreso y se coloca en "cod"
  this.servicio.getSession('ICLI_CODE').then((res:any) => {
    this.cod = res;
    //se carga las fechas del grupo
    this.loadDates();
  });

 

  }

  ngOnInit() {
  }
  back() {
    this.navCtrl.back();
  }
  newDate(){
    this.servicio.createSession('AVD_CODE', '');
    this.navCtrl.navigateRoot(['edit-avaliable-dates']);

  }
  editDate(codigo: string){
    this.servicio.createSession('AVD_CODE', codigo);
    this.navCtrl.navigateRoot(['edit-avaliable-dates']);


  }
  
async confirmDeleteDate(codigo: string) {
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
          this.deleteDate(codigo);
        }
      }
    ]
  });

  await alert.present();
}

deleteDate(codigo: string) {
  let datos = {
    "accion": "deleteDate",
    codigo: codigo
  };

  this.servicio.postData(datos).subscribe((res: any) => {
    if (res.estado == true) {
      this.servicio.showToast(res.mensaje);
      this.loadDates();
    } else {
      this.servicio.showToast(res.mensaje);
    }
  });
}

  loadDates(){
    let datos = {
      "accion": "loadDates", // Corregido a "loadinfo" para coincidir con el PHP
      codigo: this.cod,
      codigo2: this.cod2

    };

    this.servicio.postData(datos).subscribe((res: any) => {
      if (res.estado == true) {
        this.dates = res.datos;
        
      } else {
        //this.servicio.showToast(res.mensaje);
      }
    });

  }

}
