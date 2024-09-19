import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BusineessHeadquartersPage } from './busineess-headquarters.page';

const routes: Routes = [
  {
    path: '',
    component: BusineessHeadquartersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BusineessHeadquartersPageRoutingModule {}
