import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditGroupStagePageRoutingModule } from './edit-group-stage-routing.module';

import { EditGroupStagePage } from './edit-group-stage.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditGroupStagePageRoutingModule
  ],
  declarations: [EditGroupStagePage]
})
export class EditGroupStagePageModule {}
