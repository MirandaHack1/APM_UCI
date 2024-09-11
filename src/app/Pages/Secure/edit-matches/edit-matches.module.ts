import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditMatchesPageRoutingModule } from './edit-matches-routing.module';

import { EditMatchesPage } from './edit-matches.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditMatchesPageRoutingModule
  ],
  declarations: [EditMatchesPage]
})
export class EditMatchesPageModule {}
