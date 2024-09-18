import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchPlayersPageRoutingModule } from './search-players-routing.module';

import { SearchPlayersPage } from './search-players.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchPlayersPageRoutingModule
  ],
  declarations: [SearchPlayersPage]
})
export class SearchPlayersPageModule {}
