import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/Services/auth/auth.service';

@Component({
  selector: 'app-info-matches-general',
  templateUrl: './info-matches-general.page.html',
  styleUrls: ['./info-matches-general.page.scss'],
})
export class InfoMatchesGeneralPage implements OnInit {
  txt_search: string = '';
  selectedSegment: string = 'proximos'; // Por defecto en "proximos"
  group: any[] = [];

  constructor(
    public navCtrl: NavController,
    public servicio: AuthService,
  ) { }

  ngOnInit() {
    // Cargar los próximos partidos al iniciar la página
    this.LoadsearchMatches();
  }

  back() {
    this.navCtrl.navigateBack('/home');
  }

  // Función que se ejecuta cuando cambias entre "Próximos" y "Finalizados"
  LoadsearchMatches() {
    // Limpiar la lista de partidos para evitar que se mezclen datos antiguos
    this.group = [];

    let datos = {
      "accion": "LoadsearchMatches",
      "search": this.txt_search,
      "option": this.selectedSegment
    };
    
    // Hacer la petición al servidor
    this.servicio.postData(datos).subscribe((res: any) => {
      if (res.estado == true) {
        this.group = res.datos;
      } else {
        //this.servicio.showToast(res.mensaje);
      }
    });
  }
  stadistics(code: string){
    this.servicio.createSession('MATCH_CODE', code);
    this.navCtrl.navigateRoot(['info-matches-detail']);

  }
}
