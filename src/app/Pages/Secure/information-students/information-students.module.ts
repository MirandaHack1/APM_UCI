import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InformationStudentsPageRoutingModule } from './information-students-routing.module';

import { InformationStudentsPage } from './information-students.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InformationStudentsPageRoutingModule
  ],
  declarations: [InformationStudentsPage]
})
export class InformationStudentsPageModule {}
