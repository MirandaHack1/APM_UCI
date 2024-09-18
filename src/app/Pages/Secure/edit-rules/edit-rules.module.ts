import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditRulesPageRoutingModule } from './edit-rules-routing.module';

import { EditRulesPage } from './edit-rules.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditRulesPageRoutingModule
  ],
  declarations: [EditRulesPage]
})
export class EditRulesPageModule {}
