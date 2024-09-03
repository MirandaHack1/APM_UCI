import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfileCordinatorPageRoutingModule } from './profile-cordinator-routing.module';

import { ProfileCordinatorPage } from './profile-cordinator.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfileCordinatorPageRoutingModule
  ],
  declarations: [ProfileCordinatorPage]
})
export class ProfileCordinatorPageModule {}
