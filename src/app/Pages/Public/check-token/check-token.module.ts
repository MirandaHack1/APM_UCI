import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CheckTokenPageRoutingModule } from './check-token-routing.module';

import { CheckTokenPage } from './check-token.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CheckTokenPageRoutingModule
  ],
  declarations: [CheckTokenPage]
})
export class CheckTokenPageModule {}
