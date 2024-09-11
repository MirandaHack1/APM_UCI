import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CredentialsInfoPage } from './credentials-info.page';

const routes: Routes = [
  {
    path: '',
    component: CredentialsInfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CredentialsInfoPageRoutingModule {}
