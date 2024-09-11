import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditUserRolPageRoutingModule } from './edit-user-rol-routing.module';

import { EditUserRolPage } from './edit-user-rol.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditUserRolPageRoutingModule
  ],
  declarations: [EditUserRolPage]
})
export class EditUserRolPageModule {}
