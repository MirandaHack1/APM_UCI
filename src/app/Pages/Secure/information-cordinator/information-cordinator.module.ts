import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InformationCordinatorPageRoutingModule } from './information-cordinator-routing.module';

import { InformationCordinatorPage } from './information-cordinator.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InformationCordinatorPageRoutingModule
  ],
  declarations: [InformationCordinatorPage]
})
export class InformationCordinatorPageModule {}
