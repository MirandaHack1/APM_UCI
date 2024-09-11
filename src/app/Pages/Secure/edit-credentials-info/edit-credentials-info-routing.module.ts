import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditCredentialsInfoPage } from './edit-credentials-info.page';

const routes: Routes = [
  {
    path: '',
    component: EditCredentialsInfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditCredentialsInfoPageRoutingModule {}
