import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditBusinessInformationPageRoutingModule } from './edit-business-information-routing.module';

import { EditBusinessInformationPage } from './edit-business-information.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditBusinessInformationPageRoutingModule
  ],
  declarations: [EditBusinessInformationPage]
})
export class EditBusinessInformationPageModule {}
