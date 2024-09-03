import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfilePlayersPageRoutingModule } from './profile-players-routing.module';

import { ProfilePlayersPage } from './profile-players.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfilePlayersPageRoutingModule
  ],
  declarations: [ProfilePlayersPage]
})
export class ProfilePlayersPageModule {}
