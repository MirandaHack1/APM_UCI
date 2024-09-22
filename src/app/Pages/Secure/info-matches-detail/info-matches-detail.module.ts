import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InfoMatchesDetailPageRoutingModule } from './info-matches-detail-routing.module';

import { InfoMatchesDetailPage } from './info-matches-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InfoMatchesDetailPageRoutingModule
  ],
  declarations: [InfoMatchesDetailPage]
})
export class InfoMatchesDetailPageModule {}
