import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/Services/auth/auth.service';


@Component({
  selector: 'app-avaliable-dates',
  templateUrl: './avaliable-dates.page.html',
  styleUrls: ['./avaliable-dates.page.scss'],
})
export class AvaliableDatesPage implements OnInit {

  constructor(
    public navCtrl: NavController,
    public servicio: AuthService

  ) { }

  ngOnInit() {
  }
  back() {
    this.navCtrl.back();
  }

}
