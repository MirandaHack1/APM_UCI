import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/Services/auth/auth.service';

@Component({
  selector: 'app-edit-court',
  templateUrl: './edit-court.page.html',
  styleUrls: ['./edit-court.page.scss'],
})
export class EditCourtPage implements OnInit {
  //DECLARANDO VAIRALBES DE CANCHAS
  codigo: string = '';
  txt: string = '';

  //DECLARANDO LOS ARREGLOS DE CANCHAS
  cancha: any = [];
  nombre: string = '';
  direccion: string = '';
  estado: string = '';

  constructor(public navCtrl: NavController, public servicio: AuthService) {
    // OBTENER EL CÓDIGO DE LA SESIÓN
    this.servicio.getSession('codigo').then((res: any) => {
      this.codigo = res;
      if (this.codigo) {
        this.cargarCancha();
      }
    });
  }

  ngOnInit() {}

  //CARGAR canchaS UNO
  cargarCancha() {
    let datos = {
      accion: 'dcanchas',
      codigo: this.codigo,
    };
    this.servicio.postData(datos).subscribe((res: any) => {
      if (res.estado) {
        this.cancha = res.datos[0];
        this.nombre = this.cancha.nombre;
        this.direccion = this.cancha.direccion;
        this.estado = this.cancha.estado;
      } else {
        this.servicio.showToast(res.mensaje, true);
      }
    });
  }

  //GUARDANDO CANCHA Y ACUTALIZANDO
  guardar() {
    if (this.nombre && this.direccion && this.estado) {
      const accion = this.codigo ? 'actualizar_cancha' : 'insertar_cancha';
      let datos = {
        accion: accion,
        codigo: this.codigo,
        nombre: this.nombre,
        direccion: this.direccion,
        estado: this.estado,
      };
      console.log(datos);
      // Enviar datos al servicio
      this.servicio.postData(datos).subscribe((res: any) => {
        if (res.estado === true) {
          this.servicio.showToast(res.mensaje);
          this.navCtrl.back();
        } else {
          this.servicio.showToast(res.mensaje, true);
        }
      });
    } else {
      this.servicio.showToast('Por favor complete todos los campos.', true);
    }
  }

  // REGRESAR AL FORMULARIO EMPRESA
  back() {
    this.navCtrl.back();
  }
}
