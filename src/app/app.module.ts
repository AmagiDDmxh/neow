import { NgModule, ErrorHandler } from '@angular/core'
import { HttpClientModule } from '@angular/common/http'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { ReactiveFormsModule } from '@angular/forms'

import { StatusBar } from '@ionic-native/status-bar'
import { SplashScreen } from '@ionic-native/splash-screen'
import { File } from '@ionic-native/file'

import {
  IonicApp, IonicModule, IonicErrorHandler,
  DeepLinkConfig
} from 'ionic-angular'

import { MyApp } from './app.component'

import { TabsPage } from '../containers/tabs/tabs'
import { ApiProvider } from '../providers/api/api'
import { WalletProvider } from '../providers/wallet.provider'

import { CreateWalletPage } from '../containers/create-wallet/create-wallet'
import { ProfilePage } from '../containers/profile/profile'
import { PossessionsPage } from '../containers/possessions/possessions'

import { LoginPageModule } from '../containers/login/login.module'
import { PossessionsPageModule } from '../containers/possessions/possessions.module'
import { LoginPage } from '../containers/login/login'
import { DiscoverPage } from '../containers/discover/discover'
import { CreateWalletPageModule } from '../containers/create-wallet/create-wallet.module'
import { BackupWalletPage } from '../containers/create-wallet/backup-wallet/backup-wallet'


@NgModule({
  declarations: [
    MyApp,
    TabsPage,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    IonicModule.forRoot(MyApp, {
        tabbarPlacement: 'bottom',
        preloadModules: true
      }, <DeepLinkConfig>{
        links: [
          {
            component: TabsPage,
            name: 'TabsPage',
            segment: 'tabs'
          },
          {
            component: CreateWalletPage,
            name: 'CreateWallet',
            segment: 'create-wallet',
            loadChildren: 'BackupWallet'
          },
          {
            component: BackupWalletPage,
            name: 'BackupWallet',
            segment: 'backup-wallet'
          },
          {
            component: PossessionsPage,
            name: 'Possessions',
            segment: 'possessions'
          },
          {
            component: DiscoverPage,
            name: 'Discover',
            segment: 'discover'
          },
          {
            component: ProfilePage,
            name: 'Profile',
            segment: 'profile'
          }
        ]
      }
    ),
    LoginPageModule,
    PossessionsPageModule,
    CreateWalletPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    File,
    WalletProvider,
    ApiProvider
  ]
})
export class AppModule {
}
