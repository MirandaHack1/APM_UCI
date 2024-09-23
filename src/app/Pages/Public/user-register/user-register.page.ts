import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/Services/auth/auth.service';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.page.html',
  styleUrls: ['./user-register.page.scss'],
})
export class UserRegisterPage implements OnInit {
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
  businessInfo: any[] = [];
  isForeigner: boolean = false;

  email_user_re: string = '';
  password_user2: string = '';
  password_user: string = '';
  email_user: string = '';
  user_name: string = '';

  showPassword: boolean = false;
  mensaje: string = '';

  constructor(public servicio: AuthService, public navCtrl: NavController) {}

  ngOnInit() {
    this.loadbusinessinfo();
  }
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

  checkMaxLength(event: any) {
    const inputValue = event.target.value;
    if (inputValue.length > 10) {
      event.target.value = inputValue.slice(0, 10);
    }
  }

  //VALIDACION DE CORREO INSTITUCIONAL
  validateEmail(email: string) {
    const regex = /^[a-zA-Z0-9._%+-]+@uniandes\.edu\.ec$/;
    if (!regex.test(email)) {
      this.servicio.showToast(
        'Error: Correo institucional no válido. Debe terminar con @uniandes.edu.ec', true
      );
    }
  }

  //VADIDACION DE CORREO ELECTRONICO
  validateEmail2(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      this.servicio.showToast('Error: Correo electrónico no válido', true);
      return false;
    }
    return true;
  }

  // VALIDACION DE CONTRASEÑA SEGURA
  validatePassword(): boolean {
    const password = this.password_user;
    const passwordConfirm = this.password_user2;
    const minLength = 8; // Longitud mínima
    const hasUpperCase = /[A-Z]/.test(password); // Al menos una letra mayúscula
    const hasLowerCase = /[a-z]/.test(password); // Al menos una letra minúscula
    const hasNumbers = /\d/.test(password); // Al menos un número
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password); // Al menos un carácter especial

    // Validar la fortaleza de la contraseña
    if (
      password.length < minLength ||
      !hasUpperCase ||
      !hasLowerCase ||
      !hasNumbers ||
      !hasSpecialChar
    ) {
      this.servicio.showToast(
        'Error: La contraseña debe tener al menos 8 caracteres, incluyendo mayúsculas, minúsculas, números y caracteres especiales.', true
      );
      return false;
    }

    // Verificar si las contraseñas coinciden
    if (password !== passwordConfirm) {
      this.servicio.showToast('Error: Las contraseñas no coinciden', true);
      return false;
    }

    return true; // Contraseña válida
  }

  userRegister() {
    if (
      !this.firstName ||
      !this.lastName ||
      !this.cardNumber ||
      !this.phoneNumber ||
      !this.address ||
      !this.city ||
      !this.province ||
      !this.career ||
      !this.semester ||
      !this.age ||
      !this.gender ||
      !this.weight ||
      !this.height ||
      !this.institutionalEmail ||
      !this.dateOfBirth ||
      !this.sede
    ) {
      this.servicio.showToast('Error: Completar todos los campos', true);
      return;
    }

    // Validar cédula solo si no es extranjero
    if (!this.isForeigner && !this.validateID(this.cardNumber)) {
      return; // Detener si la cédula no es válida
    }

    // Validar número de teléfono
    if (!this.validatePhoneNumber(this.phoneNumber)) {
      return; // Detener si el número de teléfono no es válido
    }

    // Validar correo institucional
    const emailRegex = /^[a-zA-Z0-9._%+-]+@uniandes\.edu\.ec$/;
    if (!emailRegex.test(this.institutionalEmail)) {
      this.servicio.showToast(
        'Error: Correo institucional no válido. Debe terminar con @uniandes.edu.ec', true
      );
      return; // Detener si el correo no es válido
    }

    // Validar correo electrónico general
    if (!this.validateEmail2(this.email_user)) {
      return; // Detener si el correo no es válido
    }
    // Validar correo electrónico general
    if (!this.validateEmail2(this.email_user_re)) {
      return; // Detener si el correo no es válido
    }

    // Validar contraseña
    if (!this.validatePassword()) {
      return; // Detener si la contraseña no es válida
    }

    // Si la validación de cédula y teléfono es correcta o es extranjero, proceder con el registro
    let datos = {
      accion: 'userRegister',
      firstName: this.firstName,
      lastName: this.lastName,
      cardNumber: this.cardNumber,
      phoneNumber: this.phoneNumber,
      address: this.address,
      city: this.city,
      province: this.province,
      career: this.career,
      semester: this.semester,
      age: this.age,
      gender: this.gender,
      weight: this.weight,
      height: this.height,
      institutionalEmail: this.institutionalEmail,
      dateOfBirth: this.dateOfBirth,
      sede: this.sede,
      email_user: this.email_user,
      user_name: this.user_name,
      password_user: this.password_user,
      email_user_re: this.email_user_re,
    };

    this.servicio.postData(datos).subscribe((res: any) => {
      if (res.estado == true) {
        this.servicio.showToast('Registro exitoso');
        this.navCtrl.navigateRoot('login');
      } else {
        this.servicio.showToast('Error: ' + res.mensaje, true);
      }
    });
  }

  // validatePassword() {
  //   if (this.password_user === this.password_user2) {
  //     this.mensaje = '';
  //   } else {
  //     this.servicio.showToast('Error: Contraseñas no coinciden');
  //   }
  // }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  loadbusinessinfo() {
    let datos = {
      accion: 'loadbusinessinfo',
    };
    this.servicio.postData(datos).subscribe((res: any) => {
      if (res.estado) {
        this.businessInfo = res.datos; // Guarda los datos de las sedes
      } else {
        this.servicio.showToast(res.mensaje, true);
      }
    });
  }

  back() {
    this.navCtrl.back();
  }
}
