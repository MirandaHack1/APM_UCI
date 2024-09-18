import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/Services/auth/auth.service';

@Component({
  selector: 'app-edit-business-information',
  templateUrl: './edit-business-information.page.html',
  styleUrls: ['./edit-business-information.page.scss'],
})
export class EditBusinessInformationPage implements OnInit {
  codigo: string = '';
  txt: string = '';

  // DECLARANDO VARIABLES DE EMPRESA
  nombre: string = '';
  logo: File | null = null; // Almacenar el archivo del logo
  mision: string = '';
  vision: string = '';
  image: File | null = null; // Almacenar el archivo de la imagen
  estado: string = '';
  contacto: string = '';

  constructor(public navCtrl: NavController, public servicio: AuthService) {
    // OBTENER EL CÓDIGO DE LA SESIÓN
    this.servicio.getSession('codigo').then((res: any) => {
      this.codigo = res;
      if (this.codigo) {
        // this.obtenerRegla();
      }
    });
  }

  ngOnInit() {}

  // Manejar el archivo seleccionado
  onFileSelected(event: any, type: string) {
    const file: File = event.target.files[0];
    if (file) {
      if (type === 'logo') {
        this.logo = file; // Asignar el archivo al logo
      } else if (type === 'image') {
        this.image = file; // Asignar el archivo a la imagen
      }
    }
  }

  //SE DIRIGUE AL WS Y INSIERTA
  // guardar() {
  //   if (
  //     this.nombre &&
  //     this.logo &&
  //     this.mision &&
  //     this.vision &&
  //     this.estado &&
  //     this.contacto &&
  //     this.image
  //   ) {
  //     const accion = this.codigo ? 'actualizarEmpresa' : 'insertarEmpresa';
  //     const formData = new FormData();
  //     formData.append('accion', accion);
  //     formData.append('codigo', this.codigo);
  //     formData.append('nombre', this.nombre);
  //     formData.append('logo', this.logo!); // El archivo del logo
  //     formData.append('mision', this.mision);
  //     formData.append('vision', this.vision);
  //     formData.append('image', this.image!); // El archivo de la imagen
  //     formData.append('estado', this.estado);
  //     formData.append('contacto', this.contacto);

  //     console.log(formData);
  //     // Enviar datos al servicio
  //     this.servicio.postData(formData).subscribe((res: any) => {
  //       if (res.estado === true) {
  //         this.servicio.showToast(res.mensaje);
  //         this.navCtrl.back();
  //       } else {
  //         this.servicio.showToast(res.mensaje);
  //       }
  //     });
  //   } else {
  //     this.servicio.showToast('Por favor complete todos los campos.');
  //   }
  // }
  guardar() {
    if (
      this.nombre &&
      this.logo &&
      this.mision &&
      this.vision &&
      this.estado &&
      this.contacto &&
      this.image
    ) {
      const accion = this.codigo ? 'actualizarEmpresa' : 'insertarEmpresa';
      const formData = new FormData();
      formData.append('accion', accion);
      formData.append('nombre', this.nombre);
      formData.append('logo', this.logo!); // Archivo de logo
      formData.append('mision', this.mision);
      formData.append('vision', this.vision);
      formData.append('image', this.image!); // Archivo de imagen
      formData.append('estado', this.estado);
      formData.append('contacto', this.contacto);
      formData.append('usuarioInsertar', 'usuario_actual'); // Aquí va el usuario que inserta los datos

      // Enviar datos al servicio
      this.servicio.postData(formData).subscribe((res: any) => {
        if (res.estado === true) {
          this.servicio.showToast(res.mensaje);
          this.navCtrl.back();
        } else {
          this.servicio.showToast(res.mensaje);
        }
      });
    } else {
      this.servicio.showToast('Por favor complete todos los campos.');
    }
  }

  // REGRESAR AL FORMULARIO EMPRESA
  back() {
    this.navCtrl.back();
  }
}
