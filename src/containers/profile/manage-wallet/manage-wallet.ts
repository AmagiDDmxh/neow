import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController, Slides } from 'ionic-angular';

import { wallet } from '../../../libs/neon-js';
import { WalletProvider } from "../../../providers/wallet.provider";
import { AddWalletPage } from './add-wallet/add-wallet'
// @IonicPage()
@Component({
  selector: 'page-manage-wallet',
  templateUrl: 'manage-wallet.html',

})
export class ManageWalletPage {
  @ViewChild(Slides) slides: Slides;

    addWalletPage = AddWalletPage
    user = {
      name: 'U name'
    }
    numWallet = 3
    numWalletArray = Array(this.numWallet).fill(0)
  constructor(
      public navCtrl: NavController, 
      public navParams: NavParams,
      private walletProvider: WalletProvider,
      public alertCtrl: AlertController
    ) {
  }

  slideChange() {
    console.log(this.slides.getActiveIndex())
  }
}
