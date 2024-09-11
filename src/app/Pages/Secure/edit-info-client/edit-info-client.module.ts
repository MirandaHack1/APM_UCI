import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditInfoClientPageRoutingModule } from './edit-info-client-routing.module';

import { EditInfoClientPage } from './edit-info-client.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditInfoClientPageRoutingModule
  ],
  declarations: [EditInfoClientPage]
})
export class EditInfoClientPageModule {}
