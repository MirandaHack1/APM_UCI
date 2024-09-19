import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/Services/auth/auth.service';

@Component({
  selector: 'app-busineess-headquarters',
  templateUrl: './busineess-headquarters.page.html',
  styleUrls: ['./busineess-headquarters.page.scss'],
})
export class BusineessHeadquartersPage implements OnInit {
  constructor(public authService: AuthService, public navCtrl: NavController) {}
  sedes: any[] = [];
  direcccionSede: string = '';
  ngOnInit() {
    this.obtenerSede();
  }

  //OBTENER LA INFORMACION DE LAS SEDES
  obtenerSede() {
    let datos = {
      accion: 'consultarSede',
    };
    this.authService.postData(datos).subscribe(
      (res: any) => {
        console.log(res); // Agrega este log para ver la respuesta
        if (res.estado === true) {
          this.sedes = res.datos;
        } else {
          this.authService.showToast(res.mensaje);
        }
      },
      (error) => {
        console.error('Error en la solicitud:', error);
      }
    );
  }

  //BUSCAR SEDE
  buscarSede() {
    let datos = {
      accion: 'consultarSede',
      direcccionSede: this.direcccionSede,
    };
    this.authService.postData(datos).subscribe((res: any) => {
      if (res.estado === true) {
        this.sedes = res.datos;
      } else {
        this.authService.showToast(res.mensaje);
      }
    });
  }

  //CREAR NUEVA SEDE
  nuevo() {
    this.authService.createSession('codigo', '');
    this.navCtrl.navigateRoot(['edit-headquarters']);
  }

  //IR A EDITAR EN EL CAMPO DE EDITAR SEDE
  irEditar(codigo: string) {
    this.authService.createSession('codigo', codigo);
    this.navCtrl.navigateRoot(['edit-headquarters']);
  }

  //FUNCION PARA ELIMINAR EMPRESA
  eliminar(codigo?: string) {
    if (codigo) {
      let datos = {
        accion: 'eliminarSede',
        codigo: codigo,
      };
      console.log(datos);
      this.authService.postData(datos).subscribe(
        (res: any) => {
          if (res.estado === true) {
            this.authService.showToast('Sede eliminado correctamente');
            this.obtenerSede();
          } else {
            this.authService.showToast(res.mensaje);
          }
        },
        (error) => {
          console.error('Error en la solicitud:', error);
        }
      );
    } else {
      this.authService.showToast('Código del Empresa no encontrado');
    }
  }

  //REGRESO AL MENU
  cancelar() {
    this.navCtrl.back();
  }
}
