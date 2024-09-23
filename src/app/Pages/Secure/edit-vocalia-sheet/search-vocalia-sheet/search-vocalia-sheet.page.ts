import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/Services/auth/auth.service';


@Component({
  selector: 'app-search-vocalia-sheet',
  templateUrl: './search-vocalia-sheet.page.html',
  styleUrls: ['./search-vocalia-sheet.page.scss'],
})
export class SearchVocaliaSheetPage implements OnInit {
  txt_search: string = "";
  persons: any[] = [];
  team_one_code: string = "";
  team_two_code: string = "";
  teap_code: string = "";

  constructor(
    public modalCtrl: ModalController,
    public servicio: AuthService

  ) {
    this.servicio.getSession('TEAP_CODE').then((res: any) => {
      this.teap_code = res;
      
    });
    this.servicio.getSession('team_one_code').then((res: any) => {
      this.team_one_code = res;
      
    });
    this.servicio.getSession('team_two_code').then((res: any) => {
      this.team_two_code = res;
     
    });

   }

  ngOnInit() {
  }

  searchPlayers() {
    const datos = {
      accion: 'searchTeamPlayers',
      result: this.txt_search,
      //este es el codigo del jugador que pertenece al grupo, asi se sabe cual grupo cargar
      teap_code: this.teap_code,

      //codigo de los 2 grupos
      team_one_code: this.team_one_code,
      team_two_code: this.team_two_code
    };

    this.servicio.postData(datos).subscribe((res: any) => {
      if (res.estado) {
        this.persons = res.datos;
      } else {
       // this.servicio.showToast(res.mensaje);
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
