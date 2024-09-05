import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CheckTokenPage } from './check-token.page';

const routes: Routes = [
  {
    path: '',
    component: CheckTokenPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CheckTokenPageRoutingModule {}
