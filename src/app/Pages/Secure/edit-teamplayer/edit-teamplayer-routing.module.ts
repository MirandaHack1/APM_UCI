import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditTeamplayerPage } from './edit-teamplayer.page';

const routes: Routes = [
  {
    path: '',
    component: EditTeamplayerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditTeamplayerPageRoutingModule {}
