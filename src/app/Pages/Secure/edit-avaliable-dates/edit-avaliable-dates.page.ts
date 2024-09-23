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
  txt_timeFrom: string = "00:00"; // Inicializa con 00:00
  txt_timeTo: string = "00:00"; // Inicializa con 00:00

  cod: string= "";
  cod2: string= "";
  sports: any = [];
  info: any = [];

  

  constructor(
    public navCtrl: NavController,
    public servicio: AuthService



  ) { 
    this.servicio.getSession('AVD_CODE').then((res:any) => {
      this.cod2 = res;
      if(this.cod2){
        this.loadAvaliableDates()
      }
      
      
    });


    this.servicio.getSession('SPG_CODE').then((res:any) => {
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
  loadAvaliableDates(){
   
      let datos={
        "accion": "loadAvaliableDates",
        codigo:this.cod2
      };
      this.servicio.postData(datos).subscribe((res:any)=>{
        if(res.estado==true){
          this.info = res.data[0]; 
          this.txt_type= this.info.type;
          this.txt_sportGroupName= this.info.sportGroupName;
          this.txt_date= this.info.date;
          this.txt_timeFrom= this.info.timeFrom;
          this.txt_timeTo= this.info.timeTo;
         
        }
        else{
          this.servicio.showToast(res.mensaje, true);
        }
      })
    

  }

  //este es pra insertar fechas
  insertAvaliableDates(){
    if (
      !this.txt_type ||
      !this.txt_sportGroupName ||
      !this.txt_date ||
      !this.txt_timeFrom ||
      !this.txt_timeTo
    ) {
      this.servicio.showToast('Error: Completar todos los campos', true);
      return;
    }
    let datos={
      "accion": "insertAvaliableDates",
      
      type:this.txt_type,
      sportGroupName:this.txt_sportGroupName,
      date:this.txt_date,
      timeFrom:this.txt_timeFrom,
      timeTo:this.txt_timeTo
    };
    this.servicio.postData(datos).subscribe((res:any)=>{
      if(res.estado==true){
        this.servicio.showToast(res.mensaje);
        this.navCtrl.back();
      }
      else{
        this.servicio.showToast(res.mensaje, true);
      }
    })

  }


  updateAvaliableDates(){
    let datos={
      "accion": "updateAvaliableDates",
      codigo:this.cod2,
      type:this.txt_type,
      sportGroupName:this.txt_sportGroupName,
      date:this.txt_date,
      timeFrom:this.txt_timeFrom,
      timeTo:this.txt_timeTo
    };
    this.servicio.postData(datos).subscribe((res:any)=>{
      if(res.estado==true){
        this.servicio.showToast(res.mensaje);
        this.navCtrl.back();
      }
      else{
        this.servicio.showToast(res.mensaje, true);
      }
    })

  }

  verify(){
    if(this.cod2){
      this.updateAvaliableDates();
    }
    else{
      this.insertAvaliableDates();
    }
  }


}
