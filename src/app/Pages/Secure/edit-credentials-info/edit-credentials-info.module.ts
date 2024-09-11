import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditCredentialsInfoPageRoutingModule } from './edit-credentials-info-routing.module';

import { EditCredentialsInfoPage } from './edit-credentials-info.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditCredentialsInfoPageRoutingModule
  ],
  declarations: [EditCredentialsInfoPage]
})
export class EditCredentialsInfoPageModule {}
