import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-edit-sports-group',
  templateUrl: './edit-sports-group.page.html',
  styleUrls: ['./edit-sports-group.page.scss'],
})
export class EditSportsGroupPage implements OnInit {

  constructor(

    public navCtrl: NavController

  ) { }

  ngOnInit(
    
  ) {
  }
  back(){
    this.navCtrl.navigateBack('/sports-group');
  }

}
