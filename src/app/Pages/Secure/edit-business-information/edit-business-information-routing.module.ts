import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditBusinessInformationPage } from './edit-business-information.page';

const routes: Routes = [
  {
    path: '',
    component: EditBusinessInformationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditBusinessInformationPageRoutingModule {}
