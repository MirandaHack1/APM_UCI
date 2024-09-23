import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/Services/auth/auth.service';


@Component({
  selector: 'app-edit-groups',
  templateUrl: './edit-groups.page.html',
  styleUrls: ['./edit-groups.page.scss'],
})
export class EditGroupsPage implements OnInit {
  idGrupo: string = "";
  nombreGrupo: string = '';
  grupo: any = [];

  constructor(
    public navCtrl: NavController,
    public authService: AuthService
  ) {
    // Obtiene el id del grupo desde la sesión
    this.authService.getSession('GRUP_CODE').then((res: any) => {
      this.idGrupo = res;
      if (this.idGrupo) {
        this.cargarDatosGrupo();
      }
    });
  }

  ngOnInit() { }

  // Cargar datos del grupo para editar
  cargarDatosGrupo() {
    let datos = { 
      accion: 'cgrupos', // Accion para cargar datos del grupo
      idGrupo: this.idGrupo
    };
    this.authService.postData(datos).subscribe((res: any) => {
      if (res.estado === true && res.datos.length > 0) {
        this.grupo = res.datos[0];
        this.nombreGrupo = this.grupo.nombreGrupo;
      } else {
        this.authService.showToast(res.mensaje, true);
      }
    });
  }

  // Guardar o actualizar el grupo
  guardarGrupo() {
    let datos = {
      accion: this.idGrupo ? 'ActualizarGrupo' : 'AgregarGrupo', // Si existe idGrupo, actualizar, si no, agregar
      id_grupo: this.idGrupo || '', 
      nombreGrupo: this.nombreGrupo
    };
    this.authService.postData(datos).subscribe((res: any) => {
      if (res.estado === true) {
        this.authService.showToast(this.idGrupo ? 'Grupo actualizado correctamente' : 'Grupo guardado correctamente');
        this.navCtrl.back(); // Regresa a la página anterior
      } else {
        this.authService.showToast(res.mensaje, true);
      }
    });
  }

  // Cancelar y regresar a la página anterior
  cancelar() {
    this.navCtrl.back();
  }
}
