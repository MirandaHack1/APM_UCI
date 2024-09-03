import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfileCordinatorPage } from './profile-cordinator.page';

const routes: Routes = [
  {
    path: '',
    component: ProfileCordinatorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileCordinatorPageRoutingModule {}
