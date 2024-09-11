import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InfoMatchesGeneralPage } from './info-matches-general.page';

const routes: Routes = [
  {
    path: '',
    component: InfoMatchesGeneralPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InfoMatchesGeneralPageRoutingModule {}
