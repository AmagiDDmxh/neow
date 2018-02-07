import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MarketsPage } from './markets';

@NgModule({
  declarations: [
    MarketsPage,
  ],
  imports: [
    IonicPageModule.forChild(MarketsPage),
  ],
  entryComponents: [
      MarketsPage
  ]
})
export class MarketsPageModule {}
