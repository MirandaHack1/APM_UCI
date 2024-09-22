import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchSportsGroupsDosPage } from './search-sports-groups-dos.page';

const routes: Routes = [
  {
    path: '',
    component: SearchSportsGroupsDosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchSportsGroupsDosPageRoutingModule {}
