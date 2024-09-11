import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditCourtPageRoutingModule } from './edit-court-routing.module';

import { EditCourtPage } from './edit-court.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditCourtPageRoutingModule
  ],
  declarations: [EditCourtPage]
})
export class EditCourtPageModule {}
