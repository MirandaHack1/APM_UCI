import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditVocaliaSheetPage } from './edit-vocalia-sheet.page';

const routes: Routes = [
  {
    path: '',
    component: EditVocaliaSheetPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditVocaliaSheetPageRoutingModule {}
