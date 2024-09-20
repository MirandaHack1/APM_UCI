import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditHeadquartersPageRoutingModule } from './edit-headquarters-routing.module';

import { EditHeadquartersPage } from './edit-headquarters.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditHeadquartersPageRoutingModule
  ],
  declarations: [EditHeadquartersPage]
})
export class EditHeadquartersPageModule {}
