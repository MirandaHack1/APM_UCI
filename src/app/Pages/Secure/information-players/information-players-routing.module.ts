import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InformationPlayersPage } from './information-players.page';

const routes: Routes = [
  {
    path: '',
    component: InformationPlayersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InformationPlayersPageRoutingModule {}
