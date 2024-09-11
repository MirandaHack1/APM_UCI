import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SportsGroupPageRoutingModule } from './sports-group-routing.module';

import { SportsGroupPage } from './sports-group.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SportsGroupPageRoutingModule
  ],
  declarations: [SportsGroupPage]
})
export class SportsGroupPageModule {}
