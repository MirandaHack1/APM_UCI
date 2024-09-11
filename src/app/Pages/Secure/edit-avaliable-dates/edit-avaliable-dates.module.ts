import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditAvaliableDatesPageRoutingModule } from './edit-avaliable-dates-routing.module';

import { EditAvaliableDatesPage } from './edit-avaliable-dates.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditAvaliableDatesPageRoutingModule
  ],
  declarations: [EditAvaliableDatesPage]
})
export class EditAvaliableDatesPageModule {}
