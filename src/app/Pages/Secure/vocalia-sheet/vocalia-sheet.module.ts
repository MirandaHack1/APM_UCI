import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VocaliaSheetPageRoutingModule } from './vocalia-sheet-routing.module';

import { VocaliaSheetPage } from './vocalia-sheet.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VocaliaSheetPageRoutingModule
  ],
  declarations: [VocaliaSheetPage]
})
export class VocaliaSheetPageModule {}
