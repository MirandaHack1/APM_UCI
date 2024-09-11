import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserRolPageRoutingModule } from './user-rol-routing.module';

import { UserRolPage } from './user-rol.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserRolPageRoutingModule
  ],
  declarations: [UserRolPage]
})
export class UserRolPageModule {}
