import { NgModule, ErrorHandler } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { OnboardingPage } from "../containers/onboarding/onboarding";
import { ContactPage } from '../components/contact/contact';
import { NgModelStatus, HomePage } from '../containers/home/home';
import { TabsPage } from '../containers/tabs/tabs';
import { ExponentialStrengthPipe, ProfilePage } from '../containers/profile/profile'

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ApiProvider } from '../providers/api/api';
import { LoginPage } from "../containers/login/login";
import { FileChooser } from '@ionic-native/file-chooser';
import { WalletProvider } from '../providers/wallet/wallet';
import { DiscoverPage } from '../containers/discover/discover';

@NgModule({
  declarations: [
    MyApp,
    ContactPage,
    HomePage,
    TabsPage,
    OnboardingPage,
    ProfilePage,
    LoginPage,
    NgModelStatus,
    ExponentialStrengthPipe,
    DiscoverPage
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ContactPage,
    HomePage,
    TabsPage,
    OnboardingPage,
    ProfilePage,
    LoginPage,
    DiscoverPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ApiProvider,
    FileChooser,
    WalletProvider
  ]
})
export class AppModule {}
