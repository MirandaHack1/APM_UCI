import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditTeamplayerPageRoutingModule } from './edit-teamplayer-routing.module';

import { EditTeamplayerPage } from './edit-teamplayer.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditTeamplayerPageRoutingModule
  ],
  declarations: [EditTeamplayerPage]
})
export class EditTeamplayerPageModule {}
