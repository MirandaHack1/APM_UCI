import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserRolPage } from './user-rol.page';

const routes: Routes = [
  {
    path: '',
    component: UserRolPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRolPageRoutingModule {}
