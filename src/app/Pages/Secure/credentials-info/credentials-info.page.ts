import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/Services/auth/auth.service';

@Component({
  selector: 'app-credentials-info',
  templateUrl: './credentials-info.page.html',
  styleUrls: ['./credentials-info.page.scss'],
})
export class CredentialsInfoPage implements OnInit {
  txt_name: String= "";
  txt_email: String= "";
  txt_emailr: String= "";
  //aqui se guarda el codigo del usuario que ingreso al sistema
  cod: string= "";
 
  info: any = [];
  
  


  constructor(
  public navCtrl: NavController,
  public servicio: AuthService
) {
  //se trae el codigo del usuario que ingreso y se coloca en "cod"
  this.servicio.getSession('USAD_CODE').then((res:any) => {
    this.cod = res;
    //se carga los datos del usuario por su codigo
    this.loadCredentials();  
  });
}



  ngOnInit() {
  }
  ionViewWillEnter() {
    this.loadCredentials();
  }
  
  loadCredentials(){
    let datos={
      "accion": "loadCredentials",
      codigo:this.cod
    };
    this.servicio.postData(datos).subscribe((res:any)=>{
      if(res.estado==true){
        this.info = res.person[0]; 
        this.txt_name= this.info.username;
        this.txt_email= this.info.email;
        this.txt_emailr= this.info.emailr;
      }
      else{
        this.servicio.showToast(res.mensaje);
      }
    })


  }
  edit(){
    this.navCtrl.navigateForward(['/edit-credentials-info']);
      
  }
  back(){
    this.navCtrl.back();
  }

}
