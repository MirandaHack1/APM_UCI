import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditGroupsPageRoutingModule } from './edit-groups-routing.module';

import { EditGroupsPage } from './edit-groups.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditGroupsPageRoutingModule
  ],
  declarations: [EditGroupsPage]
})
export class EditGroupsPageModule {}
