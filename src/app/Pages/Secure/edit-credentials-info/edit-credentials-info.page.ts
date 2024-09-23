import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/Services/auth/auth.service';

@Component({
  selector: 'app-edit-credentials-info',
  templateUrl: './edit-credentials-info.page.html',
  styleUrls: ['./edit-credentials-info.page.scss'],
})
export class EditCredentialsInfoPage implements OnInit {
  txt_name: string = '';
  txt_email: string = '';
  txt_emailr: string = '';
  txt_clave: string = '';
  txt_vclave: string = '';
  mensaje: string = '';
  cod: string = '';
  showPassword: boolean = false;

  info: any = [];

  constructor(public navCtrl: NavController, public servicio: AuthService) {
    this.servicio.getSession('USAD_CODE').then((res: any) => {
      this.cod = res;
      this.loadCredentials();
    });
  }

  loadCredentials() {
    let datos = {
      accion: 'loadCredentials',
      codigo: this.cod,
    };
    this.servicio.postData(datos).subscribe((res: any) => {
      if (res.estado == true) {
        this.info = res.person[0];
        this.txt_name = this.info.username;
        this.txt_email = this.info.email;
        this.txt_emailr = this.info.emailr;
      } else {
        this.servicio.showToast(res.mensaje, true);
      }
    });
  }

  ngOnInit() {}

  //VALIDACIONES DE CORREO ELECTRONICO
  validateEmail2(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      this.servicio.showToast('Error: Correo electrónico no válido', true);
      return false;
    }
    return true;
  }

  // vclave() {
  //   if (this.txt_clave === this.txt_vclave) {
  //     this.mensaje = '';
  //   } else {
  //     this.mensaje = 'Las claves no coinciden';
  //   }
  // }

  // VALIDACION DE CONTRASEÑA SEGURA
  validatePassword(): boolean {
    const password = this.txt_clave;
    const passwordConfirm = this.txt_vclave;
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
        'Error: La contraseña debe tener al menos 8 caracteres, incluyendo mayúsculas, minúsculas, números y caracteres especiales.',
        true
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

  //VER CONTRASEÑAS
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  back() {
    this.navCtrl.back();
  }

  // updateUser() {
  //   if (this.mensaje !== '') {
  //     this.servicio.showToast('Las claves no coinciden', true);
  //   } else if (
  //     this.txt_name === '' ||
  //     this.txt_email === '' ||
  //     this.txt_clave === '' ||
  //     this.txt_vclave === ''
  //   ) {
  //     this.servicio.showToast('Faltan datos', true);
  //   } else {
  //     let datos = {
  //       accion: 'insertcredentials',
  //       cod: this.cod,
  //       username: this.txt_name,
  //       email: this.txt_email,
  //       emailr: this.txt_emailr,
  //       password: this.txt_clave,
  //     };
  //     this.servicio.postData(datos).subscribe((res: any) => {
  //       if (res.estado === true) {
  //         this.servicio.showToast(res.mensaje);
  //         this.navCtrl.navigateBack(['/credentials-info']);
  //       } else {
  //         this.servicio.showToast(res.mensaje, true);
  //       }
  //     });
  //   }
  // }
  updateUser() {
    // Verificar que todos los campos requeridos estén llenos
    if (
      this.txt_name === '' ||
      this.txt_email === '' ||
      this.txt_clave === '' ||
      this.txt_vclave === ''
    ) {
      this.servicio.showToast('Faltan datos', true);
      return;
    }
    // Validar contraseña
    if (!this.validatePassword()) {
      return; // Detener si la contraseña no es válida
    }

    // Validar el formato del correo electrónico
    if (!this.validateEmail2(this.txt_email)) {
      return; // No continuar si el correo es inválido
    }
    // Validar el formato del correo electrónico
    if (!this.validateEmail2(this.txt_emailr)) {
      return; // No continuar si el correo es inválido
    }

    // Si todas las validaciones son correctas, proceder a actualizar
    let datos = {
      accion: 'insertcredentials',
      cod: this.cod,
      username: this.txt_name,
      email: this.txt_email,
      emailr: this.txt_emailr,
      password: this.txt_clave,
    };

    this.servicio.postData(datos).subscribe((res: any) => {
      if (res.estado === true) {
        this.servicio.showToast(res.mensaje);
        this.navCtrl.navigateBack(['/credentials-info']);
      } else {
        this.servicio.showToast(res.mensaje, true);
      }
    });
  }
}
