import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InformationStudentsPage } from './information-students.page';

const routes: Routes = [
  {
    path: '',
    component: InformationStudentsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InformationStudentsPageRoutingModule {}
