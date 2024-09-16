import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/Services/auth/auth.service';
AuthService

@Component({
  selector: 'app-rules',
  templateUrl: './rules.page.html',
  styleUrls: ['./rules.page.scss'],
})
export class RulesPage implements OnInit {
  reglas: any[] = [];
  buscar: string = '';

  constructor(
    public authService: AuthService,
    public navCtrl: NavController
  ) { }

  ngOnInit() {
    this.obtenerReglas();
  }

  obtenerReglas() {
    let datos = {
      accion: 'Conreglas',
    };
    this.authService.postData(datos).subscribe((res: any) => {
      console.log(res);  
      if (res.estado === true) {
        this.reglas = res.datos;
      } else {
        this.authService.showToast(res.mensaje);
      }
    },
    (error) => {
      console.error('Error en la solicitud:', error);
    });
  }

  buscarReglas() {
    let datos = {
      accion: 'Conreglas',
      buscar: this.buscar
    };
    this.authService.postData(datos).subscribe((res: any) => {
      if (res.estado === true) {
        this.reglas = res.datos;
      } else {
        this.authService.showToast(res.mensaje);
      }
    });
  }

  eliminarRegla(codigorules?: string) {
    if (codigorules) {
      let datos = {
        accion: 'EliminarRegla',
        codigorules: codigorules
      };
      this.authService.postData(datos).subscribe((res: any) => {
        if (res.estado === true) {
          this.authService.showToast('Regla eliminada correctamente');
          this.obtenerReglas(); 
        } else {
          this.authService.showToast(res.mensaje);
        }
      },
      (error) => {
        console.error('Error en la solicitud:', error);
      });
    } else {
      this.authService.showToast('ID de la regla no encontrado');
    }
  }

  GuardarRegla() {
    this.authService.closeSession('codigorules');
    this.navCtrl.navigateRoot(['edit-rules']);
  }

  irEditarRegla(codigorules: string) {
    this.authService.createSession('codigorules', codigorules);
    this.navCtrl.navigateRoot(['edit-rules']);
  }

  cancelar() {
    this.navCtrl.back();
  }
}
