import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/Services/auth/auth.service';

@Component({
  selector: 'app-info-client',
  templateUrl: './info-client.page.html',
  styleUrls: ['./info-client.page.scss'],
})
export class InfoClientPage implements OnInit {
  txt_firstName: string = "";
  txt_lastName: string = "";
  txt_card: string = "";
  txt_phoneNumber: string = "";
  txt_address: string = "";
  txt_city: string = "";
  txt_province: string = "";
  txt_career: string = "";
  txt_semester: string = "";
  txt_age: number = 0;
  txt_gender: string = "";
  txt_weight: number = 0;
  txt_height: number = 0;
  txt_institutionalEmail: string = "";
  txt_dateOfBirth: string = "";
  sede: string = '';
  businessInfo: any[] = [];
  

  //aqui se guarda el codigo del usuario que ingreso al sistema
  cod: string= "";
  info: any = [];

  constructor(
    public navCtrl: NavController,
  public servicio: AuthService

  ) { 
    //se trae el codigo del usuario que ingreso y se coloca en "cod"
  this.servicio.getSession('ICLI_CODE').then((res:any) => {
    this.cod = res;
   
    //se carga los datos del usuario por su codigo
    this.loadbusinessinfo(); 
    this.loadinfo();  
  });

  }

  ngOnInit() {

  }
  back(){
    this.navCtrl.back();
  }
  edit(){
    this.navCtrl.navigateForward('/edit-info-client');
      
  }

  loadinfo() {
    let datos = {
      "accion": "loadinfo", // Corregido a "loadinfo" para coincidir con el PHP
      codigo: this.cod
    };

    this.servicio.postData(datos).subscribe((res: any) => {
      if (res.estado == true) {
        const info = res.person[0]; // La información del usuario se carga aquí
        this.txt_firstName = info.firstName;
        this.txt_lastName = info.lastName;
        this.txt_card = info.cardNumber;
        this.txt_phoneNumber = info.phoneNumber;
        this.txt_address = info.address;
        this.txt_city = info.city;
        this.txt_province = info.province;
        this.txt_career = info.career;
        this.txt_semester = info.semester;
        this.txt_age = info.age;
        this.txt_gender = info.gender;
        this.txt_weight = info.weight;
        this.txt_height = info.height;
        this.txt_institutionalEmail = info.institutionalEmail;
        this.txt_dateOfBirth = info.dateOfBirth;
        this.sede = info.sede;
      } else {
        this.servicio.showToast(res.mensaje);
      }
    });
  }
  loadbusinessinfo() {
    let datos = {
      "accion": "loadbusinessinfo",
    }
    this.servicio.postData(datos).subscribe((res: any) => {
      if (res.estado == true) {
        this.businessInfo = res.datos;  // Guarda los datos de las sedes
        //this.servicio.showToast(res.mensaje);
      } else {
        this.servicio.showToast(res.mensaje);
      }
    });
  }
  

}
