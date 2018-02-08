import { NgModule } from '@angular/core'
import { PossessionsPage } from './possessions'
import { IonicPageModule } from 'ionic-angular'
import { PipesModule } from '../../pipes/pipes.module'
import { Clipboard } from '@ionic-native/clipboard'
import { SocialSharing } from '@ionic-native/social-sharing'
import { PossessionsProvider } from '../../providers/possessions.provider'
import { PossessionDetailPage } from './possession-detail/possession-detail'
import { PossessionDetailPageModule } from './possession-detail/possession-detail.module'

const COMPONENTS = [
  PossessionsPage
]

@NgModule({
  declarations: COMPONENTS,
  imports: [
    PipesModule,
    IonicPageModule.forChild(PossessionsPage)
  ],
  entryComponents: COMPONENTS,
  exports: [
    PossessionDetailPageModule
  ],
  providers: [Clipboard, SocialSharing, PossessionsProvider]
})
export class PossessionsPageModule {}