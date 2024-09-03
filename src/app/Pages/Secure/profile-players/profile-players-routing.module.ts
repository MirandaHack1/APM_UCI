import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfilePlayersPage } from './profile-players.page';

const routes: Routes = [
  {
    path: '',
    component: ProfilePlayersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfilePlayersPageRoutingModule {}
