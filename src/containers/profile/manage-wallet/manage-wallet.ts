import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';


import { WalletProvider } from "../../../providers/wallet.provider";
import { AddWalletPage } from './add-wallet/add-wallet'
// @IonicPage()
@Component({
  selector: 'page-manage-wallet',
  templateUrl: 'manage-wallet.html',

})
export class ManageWalletPage {
    addWalletPage = AddWalletPage
  constructor(
      public navCtrl: NavController, 
      public navParams: NavParams,
      private walletProvider: WalletProvider,
      public alertCtrl: AlertController
    ) {
  }

}
