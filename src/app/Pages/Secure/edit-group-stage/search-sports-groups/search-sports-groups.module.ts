import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchSportsGroupsPageRoutingModule } from './search-sports-groups-routing.module';

import { SearchSportsGroupsPage } from './search-sports-groups.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchSportsGroupsPageRoutingModule
  ],
  declarations: [SearchSportsGroupsPage]
})
export class SearchSportsGroupsPageModule {}
