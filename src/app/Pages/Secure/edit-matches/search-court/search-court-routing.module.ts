import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchCourtPage } from './search-court.page';

const routes: Routes = [
  {
    path: '',
    component: SearchCourtPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchCourtPageRoutingModule {}
