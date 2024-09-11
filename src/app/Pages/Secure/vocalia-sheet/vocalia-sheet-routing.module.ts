import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VocaliaSheetPage } from './vocalia-sheet.page';

const routes: Routes = [
  {
    path: '',
    component: VocaliaSheetPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VocaliaSheetPageRoutingModule {}
