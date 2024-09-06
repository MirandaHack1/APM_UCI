import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditRolPageRoutingModule } from './edit-rol-routing.module';

import { EditRolPage } from './edit-rol.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditRolPageRoutingModule
  ],
  declarations: [EditRolPage]
})
export class EditRolPageModule {}
