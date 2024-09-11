import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GroupStagePageRoutingModule } from './group-stage-routing.module';

import { GroupStagePage } from './group-stage.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GroupStagePageRoutingModule
  ],
  declarations: [GroupStagePage]
})
export class GroupStagePageModule {}
