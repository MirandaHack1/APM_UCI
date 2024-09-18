import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/Services/auth/auth.service';

@Component({
  selector: 'app-search-players',
  templateUrl: './search-players.page.html',
  styleUrls: ['./search-players.page.scss'],
})
export class SearchPlayersPage implements OnInit {
  txt_search: string = "";
  persons: any[] = [];
  type: string = "";

  constructor(
    public modalCtrl: ModalController,
    public servicio: AuthService
  ) { 
    this.servicio.getSession('player_type').then((res: any) => {
      this.type = res;
    });
  }

  ngOnInit() {}

  cancel() {
    this.modalCtrl.dismiss();
  }

  searchUsers() {
    let datos = {
      "accion": "searchUsers",
      "result": this.txt_search,
    };

    this.servicio.postData(datos).subscribe((res: any) => {
      if (res.estado == true) {
        this.persons = res.datos;
      } else {
        this.servicio.showToast(res.mensaje);
      }
    });
  }

  addPerson(codigo: string, nombre: string) {
    let result = {
      code: codigo,
      name: nombre
    };

    if (this.type === 'pet') {
      this.servicio.createSession('PET_CODE', codigo);
      this.servicio.createSession('PET_NAME', nombre);
    } else if (this.type === 'grandmother') {
      this.servicio.createSession('GRANDMOTHER_CODE', codigo);
      this.servicio.createSession('GRANDMOTHER_NAME', nombre);
    } else if (this.type === 'leader') {
      this.servicio.createSession('LEADER_CODE', codigo);
      this.servicio.createSession('LEADER_NAME', nombre);
    }

    this.modalCtrl.dismiss(result);
  }
}