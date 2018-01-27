import { Component, OnInit } from '@angular/core'
import {
  IonicPage, NavController,
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
  account: Account

  constructor (
    public navCtrl: NavController,
    private apiProvider: ApiProvider,
    private toastCtrl: ToastController,
    private walletProvider: WalletProvider
  ) {}

  ngOnInit () {
    this.account = this.walletProvider.getDefaultAccount()

    this.apiProvider
        .getBalance(this.account.address)
        .subscribe(res => {
          this.balances = res['balance']
        })
  }

  ionViewCanEnter () {
    return this.walletProvider.haveAnAccount()
  }

  ionViewDidLoad () {}

  showMsg (message) {
    const toast = this.toastCtrl.create({
      message,
      duration: 2000
    })

    return toast.present()
  }
}
