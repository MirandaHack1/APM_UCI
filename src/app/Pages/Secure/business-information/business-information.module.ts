import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BusinessInformationPageRoutingModule } from './business-information-routing.module';

import { BusinessInformationPage } from './business-information.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BusinessInformationPageRoutingModule
  ],
  declarations: [BusinessInformationPage]
})
export class BusinessInformationPageModule {}
