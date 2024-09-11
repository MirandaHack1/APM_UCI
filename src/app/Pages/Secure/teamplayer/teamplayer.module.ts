import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TeamplayerPageRoutingModule } from './teamplayer-routing.module';

import { TeamplayerPage } from './teamplayer.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TeamplayerPageRoutingModule
  ],
  declarations: [TeamplayerPage]
})
export class TeamplayerPageModule {}
