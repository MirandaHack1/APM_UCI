import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditMatchesPage } from './edit-matches.page';

const routes: Routes = [
  {
    path: '',
    component: EditMatchesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditMatchesPageRoutingModule {}
