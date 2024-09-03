import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfileStudentsPageRoutingModule } from './profile-students-routing.module';

import { ProfileStudentsPage } from './profile-students.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfileStudentsPageRoutingModule
  ],
  declarations: [ProfileStudentsPage]
})
export class ProfileStudentsPageModule {}
