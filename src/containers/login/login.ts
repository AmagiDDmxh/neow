import { Component } from '@angular/core';
import {
  AlertController, IonicPage, NavController,
  NavParams
} from 'ionic-angular';
import { CreateWalletPage } from '../create-wallet/create-wallet';

import { wallet } from '../../libs/neon-js';
import { WalletProvider } from "../../providers/wallet.provider";
import { PossessionPage } from "../possessions/possessions";


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  private _file: File
  createWalletPage = CreateWalletPage
  importText: string = "导入";
  isWIFKey: boolean = true;
  WIFKey: string
  passphrase: string

  constructor (
    public navCtrl: NavController,
    public navParams: NavParams,
    private walletProvider: WalletProvider,
    public alertCtrl: AlertController
  ) { }

  ionViewDidLoad() {}

  get disabledBtn () {
    return (!this.WIFKey || !this.passphrase) && (!this._file)
  }
  
  openImportBox () {
    this.isWIFKey = false
    this.importText = '导入钱包文件'

    this.openWallet()
  }

  openWIFKeyBox() {
    this.isWIFKey = true
    this.importText = '导入'
  }

  openWallet () {
    if (window.navigator && !this.WIFKey) {
      let fileInput = document.querySelector(
        'page-login input[type=file]#fileInput') as HTMLInputElement
      fileInput.click()
    }
  }

  fileChange (file) {
    if (file) {
      this.importText = file.name.slice()
      const reader = new FileReader()
      const ng = this

      reader.onload = function () {
        try {
          const JSONFile = JSON.parse(this.result)
          if (ng.walletProvider.isOldWallet(JSONFile)) {
            return ng.walletProvider.upgradeOldWallet(JSONFile, ng.passphrase)
          }
          ng._file = JSONFile
        } catch (e) {
          console.log(e)
        }
      }

      reader.readAsText(file)
    }
  }

  showPrompt (msg: string) {
    let prompt = this.alertCtrl.create({
      title: msg
    })
    prompt.present();
  }

  login () {
    if (this.WIFKey && this.isWIFKey && this.passphrase) {
      if (!wallet.isWIF(this.WIFKey)) return this.showPrompt('The WIF format is incorrect!')
      const account = new wallet.Account(this.WIFKey)
      account.encrypt(this.passphrase)
      this.walletProvider.addAccount(account)
      this.walletProvider.writeFile()
      return this.navCtrl.push(PossessionPage)
    }

    if (this._file && this.passphrase && !this.WIFKey && !this.isWIFKey) {
      // if (this.walletProvider.isOldWallet(this.wa))
    }
  }
}
