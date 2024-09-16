import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditRulesPage } from './edit-rules.page';

const routes: Routes = [
  {
    path: '',
    component: EditRulesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditRulesPageRoutingModule {}
