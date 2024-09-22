import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InfoMatchesDetailPage } from './info-matches-detail.page';

const routes: Routes = [
  {
    path: '',
    component: InfoMatchesDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InfoMatchesDetailPageRoutingModule {}
