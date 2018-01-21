import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PossessionDetailPage } from './possession-detail';

@NgModule({
  declarations: [
    PossessionDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(PossessionDetailPage),
  ],
})
export class PossessionDetailPageModule {}
