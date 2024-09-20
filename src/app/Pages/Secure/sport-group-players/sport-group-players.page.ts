import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/Services/auth/auth.service';


@Component({
  selector: 'app-sport-group-players',
  templateUrl: './sport-group-players.page.html',
  styleUrls: ['./sport-group-players.page.scss'],
})
export class SportGroupPlayersPage implements OnInit {

  constructor(
    public navCtrl: NavController,
    public servicio: AuthService

  ) { }

  ngOnInit() {
  }
  back(){
    this.navCtrl.back();
  }

}
