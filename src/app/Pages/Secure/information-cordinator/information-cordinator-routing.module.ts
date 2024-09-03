import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InformationCordinatorPage } from './information-cordinator.page';

const routes: Routes = [
  {
    path: '',
    component: InformationCordinatorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InformationCordinatorPageRoutingModule {}
