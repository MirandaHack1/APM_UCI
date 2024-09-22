import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/Services/auth/auth.service';


@Component({
  selector: 'app-search-groups',
  templateUrl: './search-groups.page.html',
  styleUrls: ['./search-groups.page.scss'],
})
export class SearchGroupsPage implements OnInit {
  txt_search: string = "";
  groups: any[] = [];
  Genero: string = "";

  constructor(
    public modalCtrl: ModalController,
    public authService: AuthService,
    public alertCtrl: AlertController // Agregado para usar el ion-alert
  ) {
    this.authService.getSession('SPG_GENDER_TEAM').then((res: any) => {
      this.Genero = res;
      console.log(this.Genero);
      this.searchGroups();
    });
  }

  ngOnInit() {
  }

  searchGroups() {
    let datos = {
      "accion": "searchGroups",
      "result": this.txt_search,
      "team_gender": this.Genero // Enviar el género del equipo
    };

    this.authService.postData(datos).subscribe((res: any) => {
      if (res.estado === true) {
        this.groups = res.datos; // Asignar los resultados de la búsqueda
      } else {
        this.authService.showToast('No se encontraron grupos con ese nombre.');
      }
    });
}


  // Selección de un grupo
  async addGroup(codigo: string, nombre: string, playerCount: number) {
    if (playerCount >= 4) {
        // Definir mensaje según el valor de this.Genero
        let mensaje = '';
        if (this.Genero === 'Femenino') {
            mensaje = `El grupo "${nombre}" ya tiene ${playerCount} equipos femeninos registrados. ¿Estás segura de que quieres agregar otro?`;
        } else if (this.Genero === 'Masculino') {
            mensaje = `El grupo "${nombre}" ya tiene ${playerCount} equipos masculinos registrados. ¿Estás seguro de que quieres agregar otro?`;
        } else {
            mensaje = `El grupo "${nombre}" ya tiene ${playerCount} equipos registrados. ¿Estás seguro de que quieres agregar otro?`;
        }

        // Mostrar alerta con el mensaje personalizado
        const alert = await this.alertCtrl.create({
            header: 'Confirmar',
            message: mensaje,
            buttons: [
                {
                    text: 'Cancelar',
                    role: 'cancel',
                    handler: () => {
                        console.log('Operación cancelada');
                    }
                },
                {
                    text: 'Agregar',
                    handler: () => {
                        // Si el usuario confirma, se procede con la operación
                        this.addGroupToSession(codigo, nombre);
                    }
                }
            ]
        });

        await alert.present();
    } else {
        // Si el grupo tiene menos de 4 jugadores, se agrega directamente
        this.addGroupToSession(codigo, nombre);
    }
}


  // Agregar el grupo a la sesión
  addGroupToSession(codigo: string, nombre: string) {
    let result = {
      code: codigo,
      name: nombre
    };
    
    this.authService.createSession('GRUP_CODE', codigo);
    this.authService.createSession('GRUP_NAME', nombre);
    
    this.modalCtrl.dismiss(result); // Cierra el modal y devuelve el resultado
  }

  // Cancelar y cerrar el modal
  cancel() {
    this.modalCtrl.dismiss();
  }
}
