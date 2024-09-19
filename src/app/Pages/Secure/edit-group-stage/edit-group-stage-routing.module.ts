import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditGroupStagePage } from './edit-group-stage.page';

const routes: Routes = [
  {
    path: '',
    component: EditGroupStagePage
  },  {
    path: 'search-sports-groups',
    loadChildren: () => import('./search-sports-groups/search-sports-groups.module').then( m => m.SearchSportsGroupsPageModule)
  },
  {
    path: 'search-groups',
    loadChildren: () => import('./search-groups/search-groups.module').then( m => m.SearchGroupsPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditGroupStagePageRoutingModule {}
