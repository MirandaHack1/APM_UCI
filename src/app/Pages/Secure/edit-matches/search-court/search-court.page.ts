import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/Services/auth/auth.service';

@Component({
  selector: 'app-search-court',
  templateUrl: './search-court.page.html',
  styleUrls: ['./search-court.page.scss'],
})
export class SearchCourtPage implements OnInit {
  txt_search: string = "";
  courts: any[] = [];

  constructor(
    public modalCtrl: ModalController,
    public authService: AuthService
  ) {
    this.searchCourts()
  }

  ngOnInit() {}

  // Buscar canchas
  searchCourts() {
    const data = { accion: 'searchCourts', result: this.txt_search };
    this.authService.postData(data).subscribe((response: any) => {
      if (response.estado) {
        this.courts = response.datos;
      } else {
        console.log(response.mensaje);
      }
    });
  }

  // Seleccionar una cancha
  selectCourt(codigo: string, nombre: string) {
    let result = {
      code: codigo,
      name: nombre
    };

    this.authService.createSession('CANC_CODE', codigo);
    this.authService.createSession('CANC_NAME', nombre);

    this.modalCtrl.dismiss(result); // Cierra el modal y devuelve el resultado
  }

  // Cancelar y cerrar el modal
  cancel() {
    this.modalCtrl.dismiss();
  }
}
