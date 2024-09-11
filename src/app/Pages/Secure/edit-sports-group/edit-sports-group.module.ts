import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditSportsGroupPageRoutingModule } from './edit-sports-group-routing.module';

import { EditSportsGroupPage } from './edit-sports-group.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditSportsGroupPageRoutingModule
  ],
  declarations: [EditSportsGroupPage]
})
export class EditSportsGroupPageModule {}
