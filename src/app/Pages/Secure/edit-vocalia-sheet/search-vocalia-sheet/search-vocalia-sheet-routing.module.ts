import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchVocaliaSheetPage } from './search-vocalia-sheet.page';

const routes: Routes = [
  {
    path: '',
    component: SearchVocaliaSheetPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchVocaliaSheetPageRoutingModule {}
