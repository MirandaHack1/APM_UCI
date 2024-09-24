import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/Services/auth/auth.service';

@Component({
  selector: 'app-court',
  templateUrl: './court.page.html',
  styleUrls: ['./court.page.scss'],
})
export class CourtPage implements OnInit {
  constructor(public authService: AuthService, public navCtrl: NavController) {}
  canchas: any[] = [];
  nombreCanchas: string = '';
  ngOnInit() {
    this.obtenerCancha();
  }
  
  //OBTENER LA INFORMACION DE LAS canchas
  obtenerCancha() {
    let datos = {
      accion: 'consultarCanchas',
    };
    this.authService.postData(datos).subscribe(
      (res: any) => {
        console.log(res); // Agrega este log para ver la respuesta
        if (res.estado === true) {
          this.canchas = res.datos;
        } else {
          this.authService.showToast(res.mensaje, true);
        }
      },
      (error) => {
        console.error('Error en la solicitud:', error);
      }
    );
  }

  //BUSCAR CANCHA
  buscarCanchas() {
    let datos = {
      accion: 'consultarCanchas',
      nombreCanchas: this.nombreCanchas,
    };
    this.authService.postData(datos).subscribe((res: any) => {
      if (res.estado === true) {
        this.canchas = res.datos;
      } else {
        this.authService.showToast(res.mensaje, true);
      }
    });
  }

  //CREAR NUEVA CANCHAS
  nuevo() {
    // this.authService.closeSession('codigo');
    // this.navCtrl.navigateRoot(['edit-business-information']);
    this.authService.createSession('codigo', '');
    this.navCtrl.navigateRoot(['edit-court']);
  }

  //IR A EDITAR EN EL CAMPO DE EDITAR EMPRESA
  irEditar(codigo: string) {
    this.authService.createSession('codigo', codigo);
    this.navCtrl.navigateRoot(['edit-court']);
  }

  //FUNCION PARA ELIMINAR CANCHAS
  eliminar(codigo?: string) {
    if (codigo) {
      let datos = {
        accion: 'eliminarCanchas',
        codigo: codigo,
      };
      console.log(datos);
      this.authService.postData(datos).subscribe(
        (res: any) => {
          if (res.estado === true) {
            this.authService.showToast('Canchas eliminado correctamente');
            this.obtenerCancha();
          } else {
            this.authService.showToast(res.mensaje, true);
          }
        },
        (error) => {
          console.error('Error en la solicitud:', error);
        }
      );
    } else {
      this.authService.showToast('Código del Canchas no encontrado', true);
    }
  }

  //REGRESO AL MENU
  cancelar() {
    this.navCtrl.back();
  }
}
