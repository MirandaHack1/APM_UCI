import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/Services/auth/auth.service';

@Component({
  selector: 'app-edit-info-client',
  templateUrl: './edit-info-client.page.html',
  styleUrls: ['./edit-info-client.page.scss'],
})
export class EditInfoClientPage implements OnInit {
  txt_firstName: string = '';
  txt_lastName: string = '';
  txt_card: string = '';
  txt_phoneNumber: string = '';
  txt_address: string = '';
  txt_city: string = '';
  txt_province: string = '';
  txt_career: string = '';
  txt_semester: string = '';
  txt_age: number = 0;
  txt_gender: string = '';
  txt_weight: number = 0;
  txt_height: number = 0;
  txt_institutionalEmail: string = '';
  txt_dateOfBirth: string = '';
  sede: string = '';
  businessInfo: any[] = [];
  //aqui se guarda el codigo del usuario que ingreso al sistema
  cod: string = '';
  info: any = [];
  isForeigner: boolean = false;
  constructor(public navCtrl: NavController, public servicio: AuthService) {
    this.servicio.getSession('ICLI_CODE').then((res: any) => {
      this.cod = res;

      //se carga los datos del usuario por su codigo
      this.loadbusinessinfo();
      this.loadinfo();
    });
  }

  ngOnInit() {}

  //VALIDA CEDULA SIEMPRE CUANDO NO SEA ESTRANJERO
  validateID(cardNumber: string): boolean {
    if (this.isForeigner) {
      return true; // No validar si es extranjero
    }

    // Verificar si el cardNumber es una cadena y tiene 10 caracteres numéricos
    const regex = /^\d{10}$/; // Debe ser un número de 10 dígitos
    if (!regex.test(cardNumber)) {
      this.servicio.showToast('Error: La cédula debe tener 10 dígitos.', true);
      return false;
    }

    // Convertir la cadena en un array de números
    const digits = cardNumber.split('').map(Number);

    const provinceCode = digits[0]; // Primer dígito para el código de la provincia

    // Validar que el código de la provincia sea válido (0-24)
    if (provinceCode < 0 || provinceCode > 24) {
      this.servicio.showToast('Error: Código de provincia no válido.', true);
      return false;
    }

    // Validación del dígito verificador
    const coefficients = [2, 1, 2, 1, 2, 1, 2, 1, 2];
    let sum = 0;

    for (let i = 0; i < coefficients.length; i++) {
      let product = digits[i] * coefficients[i];
      sum += product > 9 ? product - 9 : product; // Restar 9 si el producto es mayor a 9
    }

    const checkDigit = (10 - (sum % 10)) % 10; // Dígito verificador
    if (checkDigit !== digits[9]) {
      this.servicio.showToast('Error: La cédula es incorrecta.', true);
      return false;
    }

    return true; // Cédula válida
  }

  // VALIDA NUMERO DE TELEFONO ECUAOTRIANO
  validatePhoneNumber(phoneNumber: string): boolean {
    const regex = /^0[2-9]\d{8}$/; // Validación para número de teléfono ecuatoriano
    if (!regex.test(phoneNumber)) {
      this.servicio.showToast('Error: Número de teléfono incorrecto', true);
      return false;
    } else {
      this.servicio.showToast('Número de teléfono válido'); // Mensaje de éxito
    }
    return true;
  }

  //VALIDACION DE CORREO INSTITUCIONAL
  validateEmail(email: string) {
    const regex = /^[a-zA-Z0-9._%+-]+@uniandes\.edu\.ec$/;
    if (!regex.test(email)) {
      this.servicio.showToast(
        'Error: Correo institucional no válido. Debe terminar con @uniandes.edu.ec',
        true
      );
    }
  }

  back() {
    this.navCtrl.back();
  }

  loadinfo() {
    let datos = {
      accion: 'loadinfo', // Corregido a "loadinfo" para coincidir con el PHP
      codigo: this.cod,
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
        this.servicio.showToast(res.mensaje, true);
      }
    });
  }
  loadbusinessinfo() {
    let datos = {
      accion: 'loadbusinessinfo',
    };
    this.servicio.postData(datos).subscribe((res: any) => {
      if (res.estado == true) {
        this.businessInfo = res.datos; // Guarda los datos de las sedes
        // this.servicio.showToast(res.mensaje);
      } else {
        this.servicio.showToast(res.mensaje, true);
      }
    });
  }

  saveInfo() {
    // Validar cédula solo si no es extranjero
    if (!this.isForeigner && !this.validateID(this.txt_card)) {
      return; // Detener si la cédula no es válida
    }
    // Validar número de teléfono
    if (!this.validatePhoneNumber(this.txt_phoneNumber)) {
      return; // Detener si el número de teléfono no es válido
    }
    // Validar correo institucional
    const emailRegex = /^[a-zA-Z0-9._%+-]+@uniandes\.edu\.ec$/;
    if (!emailRegex.test(this.txt_institutionalEmail)) {
      this.servicio.showToast(
        'Error: Correo institucional no válido. Debe terminar con @uniandes.edu.ec',
        true
      );
      return; // Detener si el correo no es válido
    }

    let datos = {
      accion: 'updateinfo',
      codigo: this.cod,
      firstName: this.txt_firstName,
      lastName: this.txt_lastName,
      cardNumber: this.txt_card,
      phoneNumber: this.txt_phoneNumber,
      address: this.txt_address,
      city: this.txt_city,
      province: this.txt_province,
      career: this.txt_career,
      semester: this.txt_semester,
      age: this.txt_age,
      gender: this.txt_gender,
      weight: this.txt_weight,
      height: this.txt_height,
      institutionalEmail: this.txt_institutionalEmail,
      dateOfBirth: this.txt_dateOfBirth,
      sede: this.sede,
    };

    this.servicio.postData(datos).subscribe((res: any) => {
      if (res.estado == true) {
        this.servicio.showToast(res.mensaje);

        this.navCtrl.navigateBack(['/info-client']);
      } else {
        this.servicio.showToast(res.mensaje, true);
      }
    });
  }
}
