import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditAvaliableDatesPage } from './edit-avaliable-dates.page';

const routes: Routes = [
  {
    path: '',
    component: EditAvaliableDatesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditAvaliableDatesPageRoutingModule {}
