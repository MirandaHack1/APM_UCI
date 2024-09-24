import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/Services/auth/auth.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.page.html',
  styleUrls: ['./groups.page.scss'],
})
export class GroupsPage implements OnInit {
  grupos: any[] = []; // Array para almacenar los grupos
  buscarGrupo: string = ''; // Campo de búsqueda

  constructor(
    public authService: AuthService,
    public navCtrl: NavController
  ) { }

  ngOnInit() {
    this.obtenerGrupos(); 
  }


  obtenerGrupos() {
    let datos = {
      accion: 'ConGrupos',
    };
    this.authService.postData(datos).subscribe((res: any) => {
      console.log(res);  
      if (res.estado === true) {
        this.grupos = res.datos; 
      } else {
        this.authService.showToast(res.mensaje);
      }
    },
    (error) => {
      console.error('Error en la solicitud:', error);
    });
  }

  buscarGrupos() {
    let datos = {
      accion: 'ConGrupos',
      buscar: this.buscarGrupo 
    };
    this.authService.postData(datos).subscribe((res: any) => {
      if (res.estado === true) {
        this.grupos = res.datos; 
      } else {
        this.authService.showToast(res.mensaje);
      }
    });
  }

  eliminarGrupo(GRUP_CODE?: string) {
    if (GRUP_CODE) {
      let datos = {
        accion: 'EliminarGrupo',
        GRUP_CODE: GRUP_CODE
      };
      this.authService.postData(datos).subscribe((res: any) => {
        try {
        if (res.estado === true) {
          this.authService.showToast('Grupo eliminado correctamente');
          this.obtenerGrupos(); 
        } else {
          this.authService.showToast(res.mensaje, true);
        } 
      } catch (error) {
        this.authService.showToast("No se puede eliminar, tiene equipos en este grupo.", true);
      }
      },
      (error) => {
        this.authService.showToast("No se puede eliminar, tiene equipos en este grupo.", true);
      });
    } else {
      this.authService.showToast('ID del grupo no encontrado', true);
    }
  }

  GuardarGrupo() {
    this.authService.createSession('GRUP_CODE', ''); 
    this.navCtrl.navigateRoot(['edit-groups']); 
  }

  irEditarGrupo(GRUP_CODE: string) {
    this.authService.createSession('GRUP_CODE', GRUP_CODE); 
    this.navCtrl.navigateRoot(['edit-groups']); 
  }

  cancelar() {
    this.navCtrl.back(); 
  }
}
