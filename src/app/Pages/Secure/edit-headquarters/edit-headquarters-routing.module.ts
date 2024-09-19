import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditHeadquartersPage } from './edit-headquarters.page';

const routes: Routes = [
  {
    path: '',
    component: EditHeadquartersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditHeadquartersPageRoutingModule {}
