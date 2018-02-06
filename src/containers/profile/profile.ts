import { Component } from '@angular/core'
import { IonicPage, NavController, NavParams } from 'ionic-angular'
import { ManageWalletPage } from './manage-wallet/manage-wallet'
import { PossessionsProvider } from '../../providers/possessions.provider'

@IonicPage({
  name: 'Profile',
  segment: 'profile'
})
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',

})
export class ProfilePage {
  account = this.possessionsProvider.getAccount()
  manageWalletPage = ManageWalletPage

  constructor (
      public navCtrl: NavController,
      public navParams: NavParams,
      private possessionsProvider: PossessionsProvider
  ) {
    console.log(this.account)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }

}
