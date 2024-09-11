import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InfoClientPageRoutingModule } from './info-client-routing.module';

import { InfoClientPage } from './info-client.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InfoClientPageRoutingModule
  ],
  declarations: [InfoClientPage]
})
export class InfoClientPageModule {}
