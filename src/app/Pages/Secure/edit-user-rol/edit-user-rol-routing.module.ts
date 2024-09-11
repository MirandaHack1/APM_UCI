import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditUserRolPage } from './edit-user-rol.page';

const routes: Routes = [
  {
    path: '',
    component: EditUserRolPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditUserRolPageRoutingModule {}
