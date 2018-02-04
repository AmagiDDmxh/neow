import { Component, OnInit } from '@angular/core'
import {
  IonicPage, Loading, LoadingController, NavController,
  ToastController
} from 'ionic-angular'
import { ApiProvider } from '../../providers/api/api.provider'
import { PossessionDetailPage } from './possession-detail/possession-detail'
import { WalletProvider } from '../../providers/wallet.provider'

import { Account } from '../../libs/neon/src/wallet'
import { ASSET_ENUM } from '../../shared/constants'
import { dev } from '../../environment'

@IonicPage({
  name: 'Possessions',
  segment: 'possessions'
})
@Component({
  selector: 'page-possessions',
  templateUrl: 'possessions.html'
})
export class PossessionsPage implements OnInit {
  splash: boolean = false
  possessionDetailPage = PossessionDetailPage

  balances

  account: Account = this.walletProvider.getDefaultAccount()
  loading: Loading = this.loadingCtrl.create()

  constructor (
    public navCtrl: NavController,
    private apiProvider: ApiProvider,
    private toastCtrl: ToastController,
    private walletProvider: WalletProvider,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit () {
    this.loading.present()

    this.apiProvider
        .getBalances(this.account.address)
        .subscribe(res => {
          this.balances = dev ? this.parseNeonBalances(res['balance']) : this.parseBalances(res['balances'])
          console.log(this.balances)
          this.loading.dismissAll()
        })
  }

  ionViewCanEnter () {
    return this.walletProvider.haveAnAccount()
  }

  showMsg (message) {
    const toast = this.toastCtrl.create({
      message,
      duration: 2000
    })

    return toast.present()
  }
  /**
   * [{ amount: 1, asset: 'NEO', unspent: [] }, ...]
   * mapTo -> [{ amount: 1, asset: 'NEO', assetId: 'ASI120SAiwq9asunxa....'}, ...]
  **/
  private parseNeonBalances (balances) {
    return balances.map(({ amount, asset }) => ({
      amount,
      asset,
      assetId: ASSET_ENUM[asset]
    }))
  }

  private parseBalances (balances) {
    return Object.entries(balances)
                 .map(
                   ([assetId, amount])=> ({
                     amount,
                     assetId,
                     asset: ASSET_ENUM[assetId]
                   })
                 )
  }

  openQRCode () {
    this.navCtrl.push('payment-qrcode', { address: this.account.address })
  }
}
