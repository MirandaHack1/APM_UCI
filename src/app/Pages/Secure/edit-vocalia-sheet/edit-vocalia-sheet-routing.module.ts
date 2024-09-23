import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditVocaliaSheetPage } from './edit-vocalia-sheet.page';

const routes: Routes = [
  {
    path: '',
    component: EditVocaliaSheetPage
  },  {
    path: 'search-vocalia-sheet',
    loadChildren: () => import('./search-vocalia-sheet/search-vocalia-sheet.module').then( m => m.SearchVocaliaSheetPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditVocaliaSheetPageRoutingModule {}
