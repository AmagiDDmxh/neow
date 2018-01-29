import { Component } from '@angular/core'
import {
  IonicPage,
  NavController,
  NavParams
} from 'ionic-angular'
import { ApiProvider } from '../../../providers/api/api'
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
    private walletProvider: WalletProvider
  ) {

    this.initData()
        .then(() => {
          this.api.getTransactionHistory(this.address)
              .map(res => res['data'].filter(this.filterByName(this.possessionData)).map(this.parseTx))
              .subscribe(data => {
                console.log(data)
                this.items = data
              })
        })
        .catch(e => console.log(e))

    console.log('oo')
  }

  initData () {
    this.address = 'ANsvyS9q1n6SBDVSdB6uFwVeqT512YSAoW'
    this.possessionData = this.navParams.data
    return Promise.resolve()
  }

  ionViewDidLoad () {
    console.log('ionViewDidLoad PossessionDetailPage')
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
    console.log(Object.assign({}, data, { time }))
    return Object.assign({}, data, { time })
  }
}
