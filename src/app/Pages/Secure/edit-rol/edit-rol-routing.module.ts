import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditRolPage } from './edit-rol.page';

const routes: Routes = [
  {
    path: '',
    component: EditRolPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditRolPageRoutingModule {}
