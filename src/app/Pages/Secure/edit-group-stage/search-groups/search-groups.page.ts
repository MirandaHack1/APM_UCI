import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/Services/auth/auth.service';

@Component({
  selector: 'app-search-groups',
  templateUrl: './search-groups.page.html',
  styleUrls: ['./search-groups.page.scss'],
})
export class SearchGroupsPage implements OnInit {
  txt_search: string = "";
  groups: any[] = [];
  type: string = "";

  constructor(
    public modalCtrl: ModalController,
    public servicio: AuthService
  ) {
    // Obtener el tipo de sesión (tipo de grupo) cuando se crea el componente
    this.servicio.getSession('group_type').then((res: any) => {
      this.type = res;
    });
  }

  ngOnInit() {
    this.loadGroups(); // Cargar los grupos al iniciar
  }

  // Cargar grupos desde el servidor o la base de datos
  loadGroups() {
    let datos = {
      "accion": "loadGroups"
    };

    this.servicio.postData(datos).subscribe((res: any) => {
      if (res.estado === true) {
        this.groups = res.datos; // Asignar los grupos recibidos
      } else {
        this.servicio.showToast('No se encontraron grupos.');
      }
    });
  }

  // Búsqueda de grupos por nombre
  searchGroups() {
    let datos = {
      "accion": "searchGroups",
      "result": this.txt_search
    };

    this.servicio.postData(datos).subscribe((res: any) => {
      if (res.estado === true) {
        this.groups = res.datos; // Asignar los resultados de la búsqueda
      } else {
        this.servicio.showToast('No se encontraron grupos con ese nombre.');
      }
    });
  }

  // Selección de un grupo
  addGroup(codigo: string, nombre: string) {
    let result = {
      code: codigo,
      name: nombre
    };
      this.servicio.createSession('GRUP_CODE', codigo);
      this.servicio.createSession('GRUP_NAME', nombre);

    this.modalCtrl.dismiss(result); // Cierra el modal y devuelve el resultado
  }

  // Cancelar y cerrar el modal
  cancel() {
    this.modalCtrl.dismiss();
  }
}
