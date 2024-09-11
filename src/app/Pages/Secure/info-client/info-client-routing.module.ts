import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InfoClientPage } from './info-client.page';

const routes: Routes = [
  {
    path: '',
    component: InfoClientPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InfoClientPageRoutingModule {}
