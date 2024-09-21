import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/Services/auth/auth.service';

@Component({
  selector: 'app-search-group-players',
  templateUrl: './search-group-players.page.html',
  styleUrls: ['./search-group-players.page.scss'],
})
export class SearchGroupPlayersPage implements OnInit {
  txt_search: string = "";
  persons: any[] = [];

  constructor(
    public modalCtrl: ModalController,
    public servicio: AuthService
  ) { }

  ngOnInit() {}

  searchPlayers() {
    const datos = {
      accion: 'searchPlayers',
      result: this.txt_search
    };

    this.servicio.postData(datos).subscribe((res: any) => {
      if (res.estado) {
        this.persons = res.datos;
      } else {
        this.servicio.showToast(res.mensaje);
      }
    });
  }

  cancel() {
    this.modalCtrl.dismiss();
  }

  addPerson(codigo: string, nombre: string) {
    const result = {
      code: codigo,
      name: nombre
    };
    this.modalCtrl.dismiss(result); // Puedes cerrar el modal con el resultado
  }
}
