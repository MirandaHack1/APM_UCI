import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchGroupPlayersPage } from './search-group-players.page';

const routes: Routes = [
  {
    path: '',
    component: SearchGroupPlayersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchGroupPlayersPageRoutingModule {}
