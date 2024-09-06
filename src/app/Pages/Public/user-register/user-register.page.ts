import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/Services/auth/auth.service';



@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.page.html',
  styleUrls: ['./user-register.page.scss'],
})
export class UserRegisterPage implements OnInit {
  // DECLARANDO VARIABLES PARA EL FORMULARIO DE INFORMACION DEL CLIENTE
  firstName: string = '';
  lastName: string = '';
  cardNumber: string = '';
  phoneNumber: string = '';
  address: string = '';
  city: string = '';
  province: string = '';
  career: string = '';
  semester: string = '';
  age: number = 0;
  gender: string = '';
  weight: number = 0;
  height: number = 0;
  institutionalEmail: string = '';
  dateOfBirth: string = '';
  sede: string = '';
  isForeigner: boolean = false;

  // DECLARANDO VARIABLES PARA INICIAR SESION DEL CLIENTE 
  email_user_re: string = '';
  password_user2: string = '';
  password_user: string = '';
  email_user: string = '';
  user_name: string = '';

  // Variable para manejar la visibilidad de la contraseña
  showPassword: boolean = false;

  //mandar mensajes de contraseñas
  mensaje : string ="";

  constructor(
    public servicio: AuthService,
    public navCtrl: NavController


  ) {}

  ngOnInit() {}

  validateTextInput(value: string) {
    const regex = /^[a-zA-Z\s]+$/;
    if (!regex.test(value)) {
      console.log("Este campo solo debe contener letras");
    }
  }

  validateID(cardNumber: string) {
    // Lógica de validación de cédula
    const isValid = this.isForeigner ? true : cardNumber.length === 10;
    if (!isValid) {
      console.log("Cédula inválida");
    }
  }

  validatePhone(phoneNumber: string) {
    const regex = /^[0-9]{10}$/; // Ejemplo para un teléfono de 10 dígitos
    if (!regex.test(phoneNumber)) {
      console.log("Número de teléfono inválido");
    }
  }

  validateEmail(email: string) {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!regex.test(email)) {
      console.log("Correo electrónico no válido");
    }
  }

  userRegister() {
    if (!this.firstName || !this.lastName || !this.cardNumber ||
      !this.phoneNumber || !this.address || !this.city || !this.province || !this.career ||
      !this.semester || !this.age || !this.gender || !this.weight || !this.height ||
      !this.institutionalEmail || !this.dateOfBirth) {
      console.log("Por favor, complete todos los campos");
      return;
    }
    else{
      let datos={
        accion:'userRegister',
        firstName:this.firstName,
        lastName:this.lastName,
        cardNumber:this.cardNumber,
        phoneNumber:this.phoneNumber,
        address:this.address,
        city:this.city,
        province:this.province,
        career:this.career,
        semester:this.semester,
        age:this.age,
        gender:this.gender,
        weight:this.weight,
        height:this.height,
        institutionalEmail:this.institutionalEmail,
        dateOfBirth:this.dateOfBirth,
        //TOCA TRAER LAS SEDES Y GUARDAR EL CODIGO
        sede:"4",
        //user admin
        email_user:this.email_user,
        user_name:this.user_name,
        password_user:this.password_user,
        email_user_re:this.email_user_re

      }
      this.servicio.postData(datos).subscribe((res:any)=>{
        if(res.estado==true)
        {
          
          
          this.servicio.showToast(res.mensaje);
  
         
         
        }
        else{
          this.servicio.showToast(res.mensaje);
        }
      })
    }

    console.log("Registro exitoso");
  }

  validatePassword() {
    if(this.password_user == this.password_user2){
      this.mensaje = "";
    }else{
      this.mensaje = "Las claves no coinciden";
    }
    
  }


  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
