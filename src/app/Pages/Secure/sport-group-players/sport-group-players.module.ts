import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SportGroupPlayersPageRoutingModule } from './sport-group-players-routing.module';

import { SportGroupPlayersPage } from './sport-group-players.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SportGroupPlayersPageRoutingModule
  ],
  declarations: [SportGroupPlayersPage]
})
export class SportGroupPlayersPageModule {}
