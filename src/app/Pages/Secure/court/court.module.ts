import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CourtPageRoutingModule } from './court-routing.module';

import { CourtPage } from './court.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CourtPageRoutingModule
  ],
  declarations: [CourtPage]
})
export class CourtPageModule {}
