import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/Services/auth/auth.service';


@Component({
  selector: 'app-search-players',
  templateUrl: './search-players.page.html',
  styleUrls: ['./search-players.page.scss'],
})
export class SearchPlayersPage implements OnInit {

  constructor(
    public modalCtrl: ModalController,
    public servicio: AuthService,


  ) { }

  ngOnInit() {
  }
  cancel(){
    this.modalCtrl.dismiss();
  }

}
