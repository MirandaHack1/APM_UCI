import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StandingsGroupsPageRoutingModule } from './standings-groups-routing.module';

import { StandingsGroupsPage } from './standings-groups.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StandingsGroupsPageRoutingModule
  ],
  declarations: [StandingsGroupsPage]
})
export class StandingsGroupsPageModule {}
