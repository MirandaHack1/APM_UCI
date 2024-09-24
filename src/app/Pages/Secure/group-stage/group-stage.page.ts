import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/Services/auth/auth.service';

@Component({
  selector: 'app-group-stage',
  templateUrl: './group-stage.page.html',
  styleUrls: ['./group-stage.page.scss'],
})
export class GroupStagePage implements OnInit {
  grupos: any[] = [];
  agrupadosPorGrupo: any[] = [];
  buscarGrupo: string = '';
  mostrarBotonAgregar: boolean = false; // Controla la visibilidad del botón de agregar
  generoSeleccionado: string = ''; // Para almacenar el género seleccionado

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
      accion: 'ConGroupstage',
    };
    this.authService.postData(datos).subscribe(
      (res: any) => {
        if (res.estado === true) {
          this.grupos = res.datos;
          this.agrupadosPorGrupo = this.agruparPorGrupo(this.grupos);
        } else {
          this.authService.showToast(res.mensaje,true);
        }
      },
      (error) => {
        console.error('Error en la solicitud:', error);
      }
    );
  }

  filtrarFinalistas() {
    // Estados que no queremos mostrar
    const estadosExcluidos = ['Equipo no clasificado', 'Eliminado'];
  
    // Filtrar los grupos con equipos en un estado válido
    const gruposFiltrados = this.grupos.filter(grupo => 
      !estadosExcluidos.includes(grupo.SPG_STATE_MATCH) // Verificamos que el estado no esté en la lista excluida
    );
  
    // Agrupar los grupos filtrados nuevamente
    this.agrupadosPorGrupo = this.agruparPorGrupo(gruposFiltrados);
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
        GRS_CODE: grupo.GRS_CODE,
        SPG_TEAM_NAME: grupo.SPG_TEAM_NAME,
        SPG_GENDER_TEAM: grupo.SPG_GENDER_TEAM,
        leader_name: grupo.leader_name,
        mascot_name: grupo.mascot_name,
        sport_name: grupo.sport_name,
        SPG_STATE_MATCH: grupo.SPG_STATE_MATCH,
        SPG_CODE: grupo.SPG_CODE,
      });
      return acc;
    }, []);
    return agrupados;
  }

  buscarGrupos() {
    let datos = {
      accion: 'ConGroupstage',
      nombre: this.buscarGrupo || '', // Búsqueda por nombre de equipo
      genero: this.generoSeleccionado || '', // Filtrar por género
    };
  
    this.authService.postData(datos).subscribe(
      (res: any) => {
        if (res.estado === true) {
          this.grupos = res.datos;
          this.agrupadosPorGrupo = this.agruparPorGrupo(this.grupos);
        } else {
          this.authService.showToast(res.mensaje,true);
        }
      },
      (error) => {
        console.error('Error en la solicitud:', error);
      }
    );
  }
  cargarAmbosGeneros() {
    this.generoSeleccionado = ''; // Restablecer el género seleccionado
    this.buscarGrupo = ''; // Limpiar el campo de búsqueda
    this.obtenerGrupos(); 
    this.mostrarBotonAgregar = false;// Obtener todos los grupos nuevamente
  }
    

// Método para filtrar por género
filtrarPorGenero(genero: string) {
  this.generoSeleccionado = genero;
  this.mostrarBotonAgregar = true; // Mostrar el botón de agregar cuando se filtra por género

  // Filtrar los grupos según el género seleccionado
  const gruposFiltrados = this.grupos.filter(grupo => 
    grupo.SPG_GENDER_TEAM === genero
  );

  // Agrupar los grupos filtrados nuevamente
  this.agrupadosPorGrupo = this.agruparPorGrupo(gruposFiltrados);
}

// Método para eliminar un equipo
eliminar(GRS_CODE: string) {
  if (GRS_CODE) {
    let datos = {
      accion: 'Eliminargroupstage',
      GRS_CODE: GRS_CODE
    };
    this.authService.postData(datos).subscribe(
      (res: any) => {
        if (res.estado === true) {
          this.authService.showToast('Equipo eliminado correctamente');
          this.obtenerGrupos(); // Refrescamos los datos tras eliminar
        } else {
          this.authService.showToast(res.mensaje, true);
        }
      },
      (error) => {
        console.error('Error en la solicitud:', error);
      }
    );
  } else {
    this.authService.showToast('Código del equipo no encontrado', true);
  }
}

  irEditar(GRS_CODE: string, genero: string) {
    this.authService.createSession('GRS_CODE', GRS_CODE);
   
    this.authService.createSession('SPG_GENDER_TEAM', genero);
    this.navCtrl.navigateRoot(['edit-group-stage']);
  }

  // Método para cancelar y volver atrás
  cancelar() {
    this.navCtrl.back();
  }

  // Método para agregar un nuevo equipo
  agregarEquipo() {
    this.authService.createSession('GRS_CODE', '');
    this.authService.createSession('SPG_GENDER_TEAM', this.generoSeleccionado);
    this.navCtrl.navigateRoot(['edit-group-stage']);
  }
}
