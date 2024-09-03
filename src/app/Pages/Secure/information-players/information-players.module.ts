import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InformationPlayersPageRoutingModule } from './information-players-routing.module';

import { InformationPlayersPage } from './information-players.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InformationPlayersPageRoutingModule
  ],
  declarations: [InformationPlayersPage]
})
export class InformationPlayersPageModule {}
