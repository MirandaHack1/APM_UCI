import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.page.html',
  styleUrls: ['./reports.page.scss'],
})
export class ReportsPage implements OnInit {

  constructor(

    public navCtrl: NavController,

  ) { }

  ngOnInit() {
  }
  back(){
    this.navCtrl.navigateBack('/home');
  }

}
