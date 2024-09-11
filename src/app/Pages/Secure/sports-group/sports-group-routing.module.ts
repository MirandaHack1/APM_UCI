import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SportsGroupPage } from './sports-group.page';

const routes: Routes = [
  {
    path: '',
    component: SportsGroupPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SportsGroupPageRoutingModule {}
