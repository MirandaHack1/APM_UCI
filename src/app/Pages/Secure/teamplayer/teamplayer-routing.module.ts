import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TeamplayerPage } from './teamplayer.page';

const routes: Routes = [
  {
    path: '',
    component: TeamplayerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TeamplayerPageRoutingModule {}
