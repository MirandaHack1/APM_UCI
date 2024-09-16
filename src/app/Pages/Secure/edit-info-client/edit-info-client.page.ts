import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/Services/auth/auth.service';

@Component({
  selector: 'app-edit-info-client',
  templateUrl: './edit-info-client.page.html',
  styleUrls: ['./edit-info-client.page.scss'],
})
export class EditInfoClientPage implements OnInit {
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

  )
  { 
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
    this.navCtrl.navigateBack('/info-client');
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
       // this.servicio.showToast(res.mensaje);
      } else {
        this.servicio.showToast(res.mensaje);
      }
    });
  }
  saveInfo(){
    let datos = {
      "accion": "updateinfo",
      "codigo": this.cod,
      "firstName": this.txt_firstName,
      "lastName": this.txt_lastName,
      "cardNumber": this.txt_card,
      "phoneNumber": this.txt_phoneNumber,
      "address": this.txt_address,
      "city": this.txt_city,
      "province": this.txt_province,
      "career": this.txt_career,
      "semester": this.txt_semester,
      "age": this.txt_age,
      "gender": this.txt_gender,
      "weight": this.txt_weight,
      "height": this.txt_height,
      "institutionalEmail": this.txt_institutionalEmail,
      "dateOfBirth": this.txt_dateOfBirth,
      "sede": this.sede
    }

    this.servicio.postData(datos).subscribe((res: any) => {
      if (res.estado == true) {
        this.servicio.showToast(res.mensaje);
        
        this.navCtrl.navigateBack(['/info-client']); 
      } else {
        this.servicio.showToast(res.mensaje);
      }
    });
    
  }

}
