import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfileStudentsPage } from './profile-students.page';

const routes: Routes = [
  {
    path: '',
    component: ProfileStudentsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileStudentsPageRoutingModule {}
