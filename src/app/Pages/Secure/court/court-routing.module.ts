import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CourtPage } from './court.page';

const routes: Routes = [
  {
    path: '',
    component: CourtPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CourtPageRoutingModule {}
