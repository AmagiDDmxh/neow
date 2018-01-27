import { NgModule } from '@angular/core'
import { PossessionsPage } from './possessions'
import { PossessionDetailPage } from './possession-detail/possession-detail'
import { IonicPageModule } from 'ionic-angular'
import { PipesModule } from '../../pipes/pipes.module'

const COMPONENTS = [
  PossessionsPage,
]

@NgModule({
  declarations: COMPONENTS,
  imports: [
    PipesModule,
    IonicPageModule.forChild(PossessionsPage)
  ],
  exports: COMPONENTS
})
export class PossessionsPageModule {}