import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GroupStagePage } from './group-stage.page';

const routes: Routes = [
  {
    path: '',
    component: GroupStagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GroupStagePageRoutingModule {}
