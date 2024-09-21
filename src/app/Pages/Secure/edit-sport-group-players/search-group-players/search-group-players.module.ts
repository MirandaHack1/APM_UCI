import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchGroupPlayersPageRoutingModule } from './search-group-players-routing.module';

import { SearchGroupPlayersPage } from './search-group-players.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchGroupPlayersPageRoutingModule
  ],
  declarations: [SearchGroupPlayersPage]
})
export class SearchGroupPlayersPageModule {}
