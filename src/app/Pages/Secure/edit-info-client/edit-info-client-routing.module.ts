import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditInfoClientPage } from './edit-info-client.page';

const routes: Routes = [
  {
    path: '',
    component: EditInfoClientPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditInfoClientPageRoutingModule {}
