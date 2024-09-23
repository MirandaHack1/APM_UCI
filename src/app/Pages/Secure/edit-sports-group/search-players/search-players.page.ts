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
  petCode: string = "";
  petName: string = "";
  grandmotherCode: string = "";
  grandmotherName: string = "";
  leaderCode: string = "";
  leaderName: string = "";

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
        this.servicio.showToast(res.mensaje, true);
      }
    });
  }

  addPerson(codigo: string, nombre: string) {
    let result = {
      code: codigo,
      name: nombre
    };

    if (this.type === 'pet') {
      this.petCode = codigo;
      this.petName = nombre;
    } else if (this.type === 'grandmother') {
      this.grandmotherCode = codigo;
      this.grandmotherName = nombre;
    } else if (this.type === 'leader') {
      this.leaderCode = codigo;
      this.leaderName = nombre;
    }

    this.modalCtrl.dismiss(result);
  }
}
