import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditSportGroupPlayersPage } from './edit-sport-group-players.page';

const routes: Routes = [
  {
    path: '',
    component: EditSportGroupPlayersPage
  },  {
    path: 'search-group-players',
    loadChildren: () => import('./search-group-players/search-group-players.module').then( m => m.SearchGroupPlayersPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditSportGroupPlayersPageRoutingModule {}
