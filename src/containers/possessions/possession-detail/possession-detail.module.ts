import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PossessionDetailPage } from './possession-detail';
import { ComponentsModule } from '../../../components/components.module'

@NgModule({
  declarations: [
    PossessionDetailPage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(PossessionDetailPage),
  ],
  exports: [
    PossessionDetailPage
  ]
})
export class PossessionDetailPageModule {}
