import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AvaliableDatesPageRoutingModule } from './avaliable-dates-routing.module';

import { AvaliableDatesPage } from './avaliable-dates.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AvaliableDatesPageRoutingModule
  ],
  declarations: [AvaliableDatesPage]
})
export class AvaliableDatesPageModule {}
