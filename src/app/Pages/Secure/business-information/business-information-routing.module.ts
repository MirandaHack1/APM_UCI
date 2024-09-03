import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BusinessInformationPage } from './business-information.page';

const routes: Routes = [
  {
    path: '',
    component: BusinessInformationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BusinessInformationPageRoutingModule {}
