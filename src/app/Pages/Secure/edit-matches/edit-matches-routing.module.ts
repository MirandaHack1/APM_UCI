import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditMatchesPage } from './edit-matches.page';

const routes: Routes = [
  {
    path: '',
    component: EditMatchesPage
  },
  {
    path: 'search-court',
    loadChildren: () => import('./search-court/search-court.module').then( m => m.SearchCourtPageModule)
  },
  {
    path: 'search-sports-groups-dos',
    loadChildren: () => import('./search-sports-groups-dos/search-sports-groups-dos.module').then( m => m.SearchSportsGroupsDosPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditMatchesPageRoutingModule {}
