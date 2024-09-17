import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/Services/auth/auth.service';

@Component({
  selector: 'app-business-information',
  templateUrl: './business-information.page.html',
  styleUrls: ['./business-information.page.scss'],
})
export class BusinessInformationPage implements OnInit {
  constructor(public authService: AuthService, public navCtrl: NavController) {}
  empresas: any[] = [];
  nombreEmpresa: string = '';
  ngOnInit() {
    this.obtenerEmpresa();
  }

  //OBTENER LA INFORMACION DE LAS EMPRESAS
  obtenerEmpresa() {
    let datos = {
      accion: 'consultarEmpresa',
    };
    this.authService.postData(datos).subscribe(
      (res: any) => {
        console.log(res); // Agrega este log para ver la respuesta
        if (res.estado === true) {
          this.empresas = res.datos;
        } else {
          this.authService.showToast(res.mensaje);
        }
      },
      (error) => {
        console.error('Error en la solicitud:', error);
      }
    );
  }

  //BUSCAR EMPRESA
  buscarEmpresa() {
    let datos = {
      accion: 'consultarEmpresa',
      nombreEmpresa: this.nombreEmpresa,
    };
    this.authService.postData(datos).subscribe((res: any) => {
      if (res.estado === true) {
        this.empresas = res.datos;
      } else {
        this.authService.showToast(res.mensaje);
      }
    });
  }

  //CREAR NUEVA EMPRESA
  nuevo() {
    // this.authService.closeSession('codigo');
    // this.navCtrl.navigateRoot(['edit-business-information']);
    this.authService.createSession('codigo','');
    this.navCtrl.navigateRoot(['edit-business-information']);
  }

  //IR A EDITAR EN EL CAMPO DE EDITAR EMPRESA
  irEditar(codigo: string) {
    this.authService.createSession('codigo', codigo);
    this.navCtrl.navigateRoot(['edit-business-information']);
  }

  //FUNCION PARA ELIMINAR EMPRESA
  eliminar(codigo?: string) {
    if (codigo) {
      let datos = {
        accion: 'eliminarEmpresa',
        codigo: codigo,
      };
      console.log(datos);
      this.authService.postData(datos).subscribe(
        (res: any) => {
          if (res.estado === true) {
            this.authService.showToast('Empresa eliminado correctamente');
            this.obtenerEmpresa();
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
