import { NgModule } from '@angular/core'
import { PossessionsPage } from './possessions'
import { IonicPageModule } from 'ionic-angular'
import { PipesModule } from '../../pipes/pipes.module'
import { Clipboard } from '@ionic-native/clipboard'
import { SocialSharing } from '@ionic-native/social-sharing'

const COMPONENTS = [
  PossessionsPage,
]

@NgModule({
  declarations: COMPONENTS,
  imports: [
    PipesModule,
    IonicPageModule.forChild(PossessionsPage)
  ],
  exports: COMPONENTS,
  providers: [Clipboard, SocialSharing]
})
export class PossessionsPageModule {}