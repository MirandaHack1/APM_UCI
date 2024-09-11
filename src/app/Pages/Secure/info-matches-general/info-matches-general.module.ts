import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InfoMatchesGeneralPageRoutingModule } from './info-matches-general-routing.module';

import { InfoMatchesGeneralPage } from './info-matches-general.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InfoMatchesGeneralPageRoutingModule
  ],
  declarations: [InfoMatchesGeneralPage]
})
export class InfoMatchesGeneralPageModule {}
