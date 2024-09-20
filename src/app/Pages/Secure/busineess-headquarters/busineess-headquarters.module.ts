import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BusineessHeadquartersPageRoutingModule } from './busineess-headquarters-routing.module';

import { BusineessHeadquartersPage } from './busineess-headquarters.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BusineessHeadquartersPageRoutingModule
  ],
  declarations: [BusineessHeadquartersPage]
})
export class BusineessHeadquartersPageModule {}
