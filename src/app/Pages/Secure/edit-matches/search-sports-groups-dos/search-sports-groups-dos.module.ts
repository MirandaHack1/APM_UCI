import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchSportsGroupsDosPageRoutingModule } from './search-sports-groups-dos-routing.module';

import { SearchSportsGroupsDosPage } from './search-sports-groups-dos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchSportsGroupsDosPageRoutingModule
  ],
  declarations: [SearchSportsGroupsDosPage]
})
export class SearchSportsGroupsDosPageModule {}
