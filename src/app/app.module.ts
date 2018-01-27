import { NgModule, ErrorHandler } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { TabsPage } from '../containers/tabs/tabs';
import { LoginPageModule } from "../containers/login/login.module";

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { FileChooser } from '@ionic-native/file-chooser';

import { ApiProvider } from '../providers/api/api';
import { WalletProvider } from '../providers/wallet.provider';
import { CreateWalletPageModule } from "../containers/create-wallet/create-wallet.module";
import { ReactiveFormsModule } from "@angular/forms";
import { FileTransfer } from "@ionic-native/file-transfer";
import { File } from '@ionic-native/file';
import { PossessionsPageModule } from "../containers/possessions/possessions.module";
import { DiscoverPageModule } from "../containers/discover/discover.module";
import { ProfilePageModule } from "../containers/profile/profile.module";
@NgModule({
  declarations: [
    MyApp,
    TabsPage
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    LoginPageModule,
    CreateWalletPageModule,
    PossessionsPageModule,
    DiscoverPageModule,
    ProfilePageModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage
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
