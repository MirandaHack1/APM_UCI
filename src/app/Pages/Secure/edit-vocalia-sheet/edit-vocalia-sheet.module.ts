import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditVocaliaSheetPageRoutingModule } from './edit-vocalia-sheet-routing.module';

import { EditVocaliaSheetPage } from './edit-vocalia-sheet.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditVocaliaSheetPageRoutingModule
  ],
  declarations: [EditVocaliaSheetPage]
})
export class EditVocaliaSheetPageModule {}
