import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchGroupsPage } from './search-groups.page';

const routes: Routes = [
  {
    path: '',
    component: SearchGroupsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchGroupsPageRoutingModule {}
