import { Component } from '@angular/core'
import {
  NavParams,
  IonicPage,
  NavController,
  ModalController, LoadingController,
} from 'ionic-angular'
import { ApiProvider } from '../../../providers/api/api.provider'
import { WalletProvider } from '../../../providers/wallet.provider'

import 'rxjs/add/operator/filter'

@IonicPage()
@Component({
  selector: 'page-possession-detail',
  templateUrl: 'possession-detail.html',
})
export class PossessionDetailPage {
  possessionData
  address
  tokenCurrentPrice
  loading = this.loadingCtrl.create()
  items = [
    {
      title: 'Courgette daikon',
      content: `Parsley amaranth tigernut silver beet maize fennel spinach. Ricebean black-eyed pea maize
                scallion green bean spinach cabbage jícama bell pepper carrot onion corn plantain garbanzo.
                Sierra leone bologi komatsuna celery peanut swiss chard silver beet squash dandelion maize
                chicory burdock tatsoi dulse radish wakame beetroot.`,
      icon: 'calendar',
      time: { subtitle: '4/16/2013', title: '21:30' }
    },
    {
      title: 'Courgette daikon',
      content: `Parsley amaranth tigernut silver beet maize fennel spinach. Ricebean black-eyed pea maize
                scallion green bean spinach cabbage jícama bell pepper carrot onion corn plantain garbanzo.
                Sierra leone bologi komatsuna celery peanut swiss chard silver beet squash dandelion maize
                chicory burdock tatsoi dulse radish wakame beetroot.`,
      icon: 'calendar',
      time: { subtitle: 'January', title: '29' }
    },
    {
      title: 'Courgette daikon',
      content: `Parsley amaranth tigernut silver beet maize fennel spinach. Ricebean black-eyed pea maize
                scallion green bean spinach cabbage jícama bell pepper carrot onion corn plantain garbanzo.
                Sierra leone bologi komatsuna celery peanut swiss chard silver beet squash dandelion maize
                chicory burdock tatsoi dulse radish wakame beetroot.`,
      icon: 'calendar',
      time: { title: 'Short Text' }
    }
  ]

  constructor (
    public navCtrl: NavController,
    public navParams: NavParams,
    private api: ApiProvider,
    private walletProvider: WalletProvider,
    private modalCtrl: ModalController,
    private loadingCtrl: LoadingController
  ) {

    this.initData()
        .then(() => {
          this.api
              .getTransactionHistory(this.address)
              .map(res => res['data'].filter(this.filterByName(this.possessionData)).map(this.parseTx))
              .subscribe(
                data => {
                  this.items = data
                  this.loading.dismissAll()
                },
                null,
                () => {
                  this.loading.dismissAll()
                }
              )

          this.api
              .getPrice(this.possessionData.name)
              .subscribe(
                price => {
                  console.log(price)
                  this.tokenCurrentPrice = price
                },
                error => {
                  if (this.possessionData.name.toLowerCase() === 'neo')
                    this.tokenCurrentPrice = 1024
                  else
                    this.tokenCurrentPrice = 512
                  this.loading.dismissAll()
                  console.log(error)
                },
                () => {
                  this.loading.dismissAll()
                }
              )
        })
        .catch(e => console.log(e))

    console.log('rr')
  }

  initData () {
    this.address = 'ANsvyS9q1n6SBDVSdB6uFwVeqT512YSAoW'
    this.possessionData = this.navParams.data
    this.loading.present()
    return Promise.resolve()
  }

  ionViewDidLoad () {
    console.log('ionViewDidLoad PossessionDetailPage')
  }

  presentActionSheet() {
    const sendModal = this.modalCtrl.create('SendModalComponent', {
      balances: this.possessionData.amount
    }, { cssClass: 'inset-modal' });
    sendModal.present();
  }

  private parseData (data) {
    return data['data']
  }

  private filterByName (possessionData) {
    return (data) => data.name === possessionData.name
  }

  private parseTx (data) {
    const [subtitle, title] = data['time'].split(' ')
    const time = { subtitle, title }
    return Object.assign({}, data, { time })
  }
}
