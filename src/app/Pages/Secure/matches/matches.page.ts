import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/Services/auth/auth.service';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.page.html',
  styleUrls: ['./matches.page.scss'],
})
export class MatchesPage implements OnInit {
  grupos: any[] = [];
  agrupadosPorGrupo: any[] = [];
  buscarGrupo: string = '';
  mostrarBotonAgregar: boolean = false;
  generoSeleccionado: string = '';

  constructor(private authService: AuthService, private navCtrl: NavController) {}

  ngOnInit() {
    this.obtenerMatches();
  }

  // Método para obtener todos los matches
  obtenerMatches() {
    let datos = {
      accion: 'ConMatches',
    };
    this.authService.postData(datos).subscribe(
      (res: any) => {
        if (res.estado === true) {
          this.grupos = res.datos;
          this.agrupadosPorGrupo = this.agruparPorMatch(this.grupos);
        } else {
          this.authService.showToast(res.mensaje, true);
        }
      },
      (error) => {
        console.error('Error en la solicitud:', error);
      }
    );
  }

// Método para agrupar matches por grupo
agruparPorMatch(matches: any[]) {
  let agrupados = matches.reduce((acc, match) => {
    // Busca si ya existe el grupo
    let grupoExistente = acc.find((g: any) => g.grupo === match.GRUP_NAME);

    if (!grupoExistente) {
      grupoExistente = { grupo: match.GRUP_NAME, matches: [] };
      acc.push(grupoExistente);
    }

    // Verifica si el match ya existe en el grupo
    let matchExistente = grupoExistente.matches.find((m: any) => m.MATC_CODE === match.MATC_CODE);
    
    if (!matchExistente) {
      // Añade el match al grupo correspondiente
      grupoExistente.matches.push({
        MATC_CODE: match.MATC_CODE,
        MATC_DATE: match.MATC_DATE,
        MATC_HOUR: match.MATC_HOUR,
        CANC_NAME: match.CANC_NAME,
        equipo1: {
          SPG_TEAM_NAME: match.SPG_TEAM_NAME_ONE,
          SPG_GENDER_TEAM: match.SPG_GENDER_TEAM_ONE,
        },
        equipo2: {
          SPG_TEAM_NAME: match.SPG_TEAM_NAME_TWO,
          SPG_GENDER_TEAM: match.SPG_GENDER_TEAM_TWO,
        },
      });
    }

    return acc;
  }, []);
  return agrupados;
}



  // Método para buscar matches por nombre de equipo
  buscarGrupos() {
    let datos = {
      accion: 'ConMatches',
      nombre: this.buscarGrupo || '',
      genero: this.generoSeleccionado || '',
    };
    this.authService.postData(datos).subscribe(
      (res: any) => {
        if (res.estado === true) {
          this.grupos = res.datos;
          this.agrupadosPorGrupo = this.agruparPorMatch(this.grupos);
        } else {
          this.authService.showToast(res.mensaje, true);
        }
      },
      (error) => {
        console.error('Error en la solicitud:', error);
      }
    );
  }

  cargarAmbosGeneros() {
    this.generoSeleccionado = '';
    this.buscarGrupo = '';
    this.obtenerMatches();
    this.mostrarBotonAgregar = false;
  }

  filtrarPorGenero(genero: string) {
    this.generoSeleccionado = genero;
    this.mostrarBotonAgregar = true;

    const matchesFiltrados = this.grupos.filter(match => 
      match.SPG_GENDER_TEAM_ONE === genero || match.SPG_GENDER_TEAM_TWO === genero
    );

    this.agrupadosPorGrupo = this.agruparPorMatch(matchesFiltrados);
  }

  eliminar(MATC_CODE: string) {
    if (MATC_CODE) {
      let datos = {
        accion: 'EliminarMatch',
        MATC_CODE: MATC_CODE
      };
      this.authService.postData(datos).subscribe(
        (res: any) => {
          if (res.estado === true) {
            this.authService.showToast('Match eliminado correctamente');
            this.obtenerMatches();
          } else {
            this.authService.showToast(res.mensaje, true);
          }
        },
        (error) => {
          console.error('Error en la solicitud:', error);
        }
      );
    } else {
      this.authService.showToast('Código del match no encontrado', true);
    }
  }

  irEditar(MATC_CODE: string,genero: string) {
    this.authService.createSession('MATC_CODE', MATC_CODE);
    this.authService.createSession('SPG_GENDER_TEAM', genero);
    this.navCtrl.navigateRoot(['edit-matches']);
  }

  cancelar() {
    this.navCtrl.back();
  }

  agregarMatch() {
    this.authService.createSession('MATC_CODE', '');
    this.authService.createSession('SPG_GENDER_TEAM', this.generoSeleccionado);
    this.navCtrl.navigateRoot(['edit-matches']);
  }
}
