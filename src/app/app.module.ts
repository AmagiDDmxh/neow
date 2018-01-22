import { NgModule, ErrorHandler } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { OnboardingPage } from "../containers/onboarding/onboarding";
import { ContactPage } from '../components/contact/contact';
import { PossessionPage } from '../containers/possessions/possessions';
import { TabsPage } from '../containers/tabs/tabs';
import { LoginPage } from "../containers/login/login";
import { DiscoverPage } from "../containers/discover/discover";
import { ExponentialStrengthPipe, ProfilePage } from '../containers/profile/profile'

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { FileChooser } from '@ionic-native/file-chooser';

import { ApiProvider } from '../providers/api/api';
import { WalletProvider } from '../providers/wallet.provider';
import { CreateWalletPage } from "../containers/create-wallet/create-wallet";
import { BackupWalletPage } from "../containers/backup-wallet/backup-wallet";
import { PossessionDetailPage } from "../containers/possession-detail/possession-detail";
import { ReactiveFormsModule } from "@angular/forms";
import { FileTransfer } from "@ionic-native/file-transfer";
import { File } from '@ionic-native/file';

@NgModule({
  declarations: [
    MyApp,
    ContactPage,
    PossessionPage,
    TabsPage,
    OnboardingPage,
    ProfilePage,
    LoginPage,
    CreateWalletPage,
    DiscoverPage,
    BackupWalletPage,
    ExponentialStrengthPipe,
    DiscoverPage,
    PossessionDetailPage
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ContactPage,
    PossessionPage,
    TabsPage,
    OnboardingPage,
    ProfilePage,
    LoginPage,
    DiscoverPage,
    CreateWalletPage,
    BackupWalletPage,
    PossessionDetailPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FileChooser,
    File,
    FileTransfer,
    WalletProvider,
    ApiProvider
  ]
})
export class AppModule {}
