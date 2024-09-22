import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchCourtPageRoutingModule } from './search-court-routing.module';

import { SearchCourtPage } from './search-court.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchCourtPageRoutingModule
  ],
  declarations: [SearchCourtPage]
})
export class SearchCourtPageModule {}
