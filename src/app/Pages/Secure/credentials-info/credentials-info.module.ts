import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CredentialsInfoPageRoutingModule } from './credentials-info-routing.module';

import { CredentialsInfoPage } from './credentials-info.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CredentialsInfoPageRoutingModule
  ],
  declarations: [CredentialsInfoPage]
})
export class CredentialsInfoPageModule {}
