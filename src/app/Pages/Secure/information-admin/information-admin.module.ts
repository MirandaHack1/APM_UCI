import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InformationAdminPageRoutingModule } from './information-admin-routing.module';

import { InformationAdminPage } from './information-admin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InformationAdminPageRoutingModule
  ],
  declarations: [InformationAdminPage]
})
export class InformationAdminPageModule {}
