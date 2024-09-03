import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InformationAdminPage } from './information-admin.page';

const routes: Routes = [
  {
    path: '',
    component: InformationAdminPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InformationAdminPageRoutingModule {}
