import { Component, OnInit } from '@angular/core'
import {
  IonicPage, Loading, LoadingController, NavController,
  ToastController
} from 'ionic-angular'
import { ApiProvider } from '../../providers/api/api.provider'
import { PossessionDetailPage } from './possession-detail/possession-detail'
import { WalletProvider } from '../../providers/wallet.provider'
import { Account } from '../../libs/neon-js/src/wallet'
import { ASSETS } from '../../shared/consts'

@IonicPage({
  name: 'Possessions',
  segment: 'possessions'
})
@Component({
  selector: 'page-possessions',
  templateUrl: 'possessions.html'
})
export class PossessionsPage {
  splash: boolean = false
  balances
  possessionDetailPage = PossessionDetailPage

  account: Account | any = {
    isDefault: true,
    address: 'ANsvyS9q1n6SBDVSdB6uFwVeqT512YSAoW'
  }
  loading: Loading = this.loadingCtrl.create()

  constructor (
    public navCtrl: NavController,
    private apiProvider: ApiProvider,
    private toastCtrl: ToastController,
    private walletProvider: WalletProvider,
    private loadingCtrl: LoadingController
  ) {}

  ionViewDidLoad () {
    try {
      this.account = this.walletProvider.getDefaultAccount() || console.log(this.account)
    } catch (e) {
      console.log(e)
    }

    this.loading.present()

    this.apiProvider
        .getBalances(this.account.address)
        .subscribe(res => {
          console.log(res)
          this.balances = this.parseBalances(res['balances'])
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

  private parseBalances (balances) {
    return Object.entries(balances)
                 .map(
                   ([assetId, amount])=> ({
                     amount,
                     assetId,
                     name: ASSETS[assetId]
                   })
                 )
  }

  openQRCode () {
    this.navCtrl.push('payment-qrcode', { address: this.account.address })
  }
}
