import { Component, OnInit } from '@angular/core';
import { addIcons } from 'ionicons';
import {
  homeOutline,
  peopleOutline,
  fileTrayStackedOutline,
  documentTextOutline,
} from 'ionicons/icons';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {
  constructor() {
    addIcons({
      homeOutline,
      peopleOutline,
      fileTrayStackedOutline,
      documentTextOutline,
    });
  }

  ngOnInit() {}
}
