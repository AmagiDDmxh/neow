import { Component } from '@angular/core'
import { Platform } from 'ionic-angular'
import { StatusBar } from '@ionic-native/status-bar';
import { TabsPage } from '../containers/tabs/tabs';
import { WalletProvider } from '../providers/wallet.provider'
import { ApiProvider } from '../providers/api/api.provider'

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = TabsPage;

  constructor (
    private platform: Platform,
    private statusBar: StatusBar,
    private walletProvider: WalletProvider,
    private api: ApiProvider
  ) {
    this.rootPage = this.walletProvider.haveAnAccount()
      ? 'Tabs'
      : 'Login'
    const address = 'ANsvyS9q1n6SBDVSdB6uFwVeqT512YSAoW'

    this.api
        .request('get', `api/v1/balances/${address}`)
        .subscribe(console.log)
    
    this.appReady()
  }

  appReady () {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();

    });
  }
}
