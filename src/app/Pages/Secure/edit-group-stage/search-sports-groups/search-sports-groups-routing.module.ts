import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchSportsGroupsPage } from './search-sports-groups.page';

const routes: Routes = [
  {
    path: '',
    component: SearchSportsGroupsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchSportsGroupsPageRoutingModule {}
