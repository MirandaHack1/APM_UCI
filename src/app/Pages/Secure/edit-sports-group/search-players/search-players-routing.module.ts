import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchPlayersPage } from './search-players.page';

const routes: Routes = [
  {
    path: '',
    component: SearchPlayersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchPlayersPageRoutingModule {}
