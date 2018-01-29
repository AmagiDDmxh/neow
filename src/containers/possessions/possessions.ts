import { Component, OnInit } from '@angular/core'
import {
  IonicPage, Loading, LoadingController, NavController,
  ToastController
} from 'ionic-angular'
import { ApiProvider } from '../../providers/api/api'
import { PossessionDetailPage } from './possession-detail/possession-detail'
import { WalletProvider } from '../../providers/wallet.provider'
import { Account } from '../../libs/neon-js/src/wallet'

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

  ngOnInit () {
    try {
      this.account = this.walletProvider.getDefaultAccount() || console.log(this.account)
    } catch (e) {
      console.log(e)
    }

    this.loading.present()
    this.apiProvider
        .getBalance(this.account.address)
        .subscribe(res => {
          this.balances = res['balance']
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
}
