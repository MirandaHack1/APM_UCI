import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditSportsGroupPage } from './edit-sports-group.page';

const routes: Routes = [
  {
    path: '',
    component: EditSportsGroupPage
  },  {
    path: 'search-players',
    loadChildren: () => import('./search-players/search-players.module').then( m => m.SearchPlayersPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditSportsGroupPageRoutingModule {}
