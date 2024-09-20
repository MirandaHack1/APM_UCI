import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/Services/auth/auth.service';


@Component({
  selector: 'app-edit-avaliable-dates',
  templateUrl: './edit-avaliable-dates.page.html',
  styleUrls: ['./edit-avaliable-dates.page.scss'],
})
export class EditAvaliableDatesPage implements OnInit {
  txt_type : string = "";
  txt_sportGroupName : string = "";
 
  txt_date: string = "";
txt_timeFrom: string = "";
txt_timeTo: string = "";
  cod: string= "";
  sports: any = [];
  

  constructor(
    public navCtrl: NavController,
    public servicio: AuthService



  ) { 

    this.servicio.getSession('ICLI_CODE').then((res:any) => {
      this.cod = res;
      //this.txt_code = this.cod;
      this.loadSportGroupName();
    });

  }

  ngOnInit() {
    
  }

  back(){
    this.navCtrl.back();
  }

  loadSportGroupName(){
    let datos = {
      accion: 'loadSportGroupName',
      "codigo": this.cod
    };
    this.servicio.postData(datos).subscribe((res: any) => {
      if (res.estado === true) {
        
        this.sports = res.datos;
      } else {
       // this.servicio.showToast('No hay reglas disponibles.');
      }
    });

  }

}
