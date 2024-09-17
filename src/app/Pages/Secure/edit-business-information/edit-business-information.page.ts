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
  logo: string = '';
  mision: string = '';
  vision: string = '';
  image: string = '';
  estado: string = '';
  contacto: string = '';

  // VARIABLES DE AUDITORÍAS
  usuarioInsertar: string = '';
  usarioActualizar: string = '';
  usuarioEliminar: string = '';
  fechaInsertar: string = '';
  fechaActualizar: string = '';
  fechaEliminar: string = '';

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

  // REGRESAR AL FORMULARIO EMPRESA
  back() {
    this.navCtrl.back();
  }

  guardar() {
    if (
      this.nombre &&
      this.logo &&
      this.mision &&
      this.vision &&
      this.estado &&
      this.contacto
    ) {
      const accion = this.codigo ? 'actualizarEmpresa' : 'insertarEmpresa';
      let datos = {
        accion: accion,
        codigo: this.codigo,
        nombre: this.nombre,
        logo: this.logo,
        mision: this.mision,
        vision: this.vision,
        image: this.image,
        estado: this.estado,
        contacto: this.contacto,
      };
      console.log(datos);
      // Enviar datos al servicio
      this.servicio.postData(datos).subscribe((res: any) => {
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
}
