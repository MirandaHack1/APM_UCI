import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchGroupsPageRoutingModule } from './search-groups-routing.module';

import { SearchGroupsPage } from './search-groups.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchGroupsPageRoutingModule
  ],
  declarations: [SearchGroupsPage]
})
export class SearchGroupsPageModule {}
