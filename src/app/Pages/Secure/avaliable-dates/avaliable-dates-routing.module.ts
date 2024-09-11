import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AvaliableDatesPage } from './avaliable-dates.page';

const routes: Routes = [
  {
    path: '',
    component: AvaliableDatesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AvaliableDatesPageRoutingModule {}
