import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/Services/auth/auth.service';

@Component({
  selector: 'app-edit-credentials-info',
  templateUrl: './edit-credentials-info.page.html',
  styleUrls: ['./edit-credentials-info.page.scss'],
})
export class EditCredentialsInfoPage implements OnInit {
  txt_name: String= "";
  txt_email: String= "";
  txt_emailr: String= "";
  txt_clave: String= "";
  txt_vclave: String= "";
  mensaje: String= "";
  cod: string= "";
  
 
  info: any = [];

  constructor(
    public navCtrl: NavController, 
    public servicio: AuthService

  ) { 
    this.servicio.getSession('USAD_CODE').then((res:any) => {
      this.cod = res;
      
      this.loadCredentials();  
    });

  }
  //cargar los datos
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

  ngOnInit() {
  }
  //verificar si la clave coincide
  vclave(){
    if(this.txt_clave == this.txt_vclave){
      this.mensaje = "";
    }else{
      this.mensaje = "Las claves no coinciden";
    }

  }
  back(){
    this.navCtrl.back();
  }
  updateUser(){
    if(this.mensaje!=""){
      this.servicio.showToast("Las claves no coinciden");
    }
    else if(
      this.txt_name=="" || 
      this.txt_email=="" ||
      this.txt_clave=="" ||
      this.txt_vclave==""
    

    ){
      this.servicio.showToast("Faltan datos");
    }
    else{
      let datos= 
      {
        "accion": "insertcredentials",
        "cod": this.cod,
        "username": this.txt_name,
        "email": this.txt_email,
        "emailr": this.txt_emailr,
        "password": this.txt_clave
        
        
      }
      this.servicio.postData(datos).subscribe((res:any)=>{
        if(res.estado==true){
         
          this.servicio.showToast(res.mensaje);
          this.navCtrl.navigateBack(['/credentials-info']); 
         
        }
        else{
          this.servicio.showToast(res.mensaje);
        }
      });
      
    }

  }
 

}
