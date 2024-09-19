import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/Services/auth/auth.service';
AuthService

@Component({
  selector: 'app-group-stage',
  templateUrl: './group-stage.page.html',
  styleUrls: ['./group-stage.page.scss'],
})
export class GroupStagePage implements OnInit {
  grupos: any[] = []; // Aquí almacenamos todos los grupos
  agrupadosPorGrupo: any[] = []; // Aquí agrupamos los equipos por grupo
  buscarGrupo: string = ''; // Campo para buscar por grupo

  constructor(
    public authService: AuthService,
    public navCtrl: NavController
  ) { }

  ngOnInit() {
    this.obtenerGrupos();
  }

  // Método para obtener todos los grupos y equipos
  obtenerGrupos() {
    let datos = {
      accion: 'ConGroupstage', // Acción para consultar los grupos
    };
    this.authService.postData(datos).subscribe(
      (res: any) => {
        if (res.estado === true) {
          this.grupos = res.datos;
          this.agrupadosPorGrupo = this.agruparPorGrupo(this.grupos);
        } else {
          this.authService.showToast(res.mensaje);
        }
      },
      (error) => {
        console.error('Error en la solicitud:', error);
      }
    );
  }

  // Método para agrupar equipos por grupo
  agruparPorGrupo(grupos: any[]) {
    let agrupados = grupos.reduce((acc, grupo) => {
      let grupoExistente = acc.find((g: any) => g.GRUP_NAME === grupo.GRUP_NAME);
      if (!grupoExistente) {
        grupoExistente = { GRUP_NAME: grupo.GRUP_NAME, equipos: [] };
        acc.push(grupoExistente);
      }
      grupoExistente.equipos.push({
        GRS_CODE:grupo.GRS_CODE,
        SPG_TEAM_NAME: grupo.SPG_TEAM_NAME,
        SPG_GENDER_TEAM: grupo.SPG_GENDER_TEAM,
        leader_name: grupo.leader_name,
        mascot_name: grupo.mascot_name,
        sport_name: grupo.sport_name,
        SPG_CREATION_DATE: grupo.SPG_CREATION_DATE,
        SPG_CODE: grupo.SPG_CODE,
      });
      return acc;
    }, []);
    return agrupados;
  }
  

  // Método para buscar grupos por nombre
  buscarGrupos() {
    let datos = {
      accion: 'ConGroupstage',
      nombre: this.buscarGrupo
    };
    this.authService.postData(datos).subscribe(
      (res: any) => {
        if (res.estado === true) {
          this.grupos = res.datos;
          this.agrupadosPorGrupo = this.agruparPorGrupo(this.grupos);
        } else {
          this.authService.showToast(res.mensaje);
        }
      },
      (error) => {
        console.error('Error en la solicitud:', error);
      }
    );
  }

  // Método para eliminar un equipo
  eliminar(SPG_CODE: string) {
    if (SPG_CODE) {
      let datos = {
        accion: 'EliminarEquipo',
        SPG_CODE: SPG_CODE
      };
      this.authService.postData(datos).subscribe(
        (res: any) => {
          if (res.estado === true) {
            this.authService.showToast('Equipo eliminado correctamente');
            this.obtenerGrupos(); // Refrescamos los datos tras eliminar
          } else {
            this.authService.showToast(res.mensaje);
          }
        },
        (error) => {
          console.error('Error en la solicitud:', error);
        }
      );
    } else {
      this.authService.showToast('Código del equipo no encontrado');
    }
  }

  // Método para redirigir a la página de edición de equipos
  irEditar(GRS_CODE : string) {
    this.authService.createSession('GRS_CODE', GRS_CODE);
    this.navCtrl.navigateRoot(['edit-group-stage']);
  }

  // Método para cancelar y volver atrás
  cancelar() {
    this.navCtrl.back();
  }

  // Método para agregar un nuevo equipo
  agregarEquipo() {
    this.authService.createSession('GRS_CODE','');
    this.navCtrl.navigateRoot(['edit-group-stage']);
  }
}
