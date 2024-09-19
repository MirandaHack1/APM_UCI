import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditSportGroupPlayersPageRoutingModule } from './edit-sport-group-players-routing.module';

import { EditSportGroupPlayersPage } from './edit-sport-group-players.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditSportGroupPlayersPageRoutingModule
  ],
  declarations: [EditSportGroupPlayersPage]
})
export class EditSportGroupPlayersPageModule {}
