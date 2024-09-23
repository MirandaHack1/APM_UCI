import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchVocaliaSheetPageRoutingModule } from './search-vocalia-sheet-routing.module';

import { SearchVocaliaSheetPage } from './search-vocalia-sheet.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchVocaliaSheetPageRoutingModule
  ],
  declarations: [SearchVocaliaSheetPage]
})
export class SearchVocaliaSheetPageModule {}
