import { Component } from '@angular/core';
import {
  AlertController,
  IonicPage, LoadingController, NavController,
  NavParams
} from 'ionic-angular';
import { LoginPage } from '../login/login'

import { wallet } from '@cityofzion/neon-js'
import { WalletProvider } from "../../providers/wallet.provider";
import { BackupWalletPage } from "../backup-wallet/backup-wallet";



@IonicPage()
@Component({
  selector: 'page-create-wallet',
  templateUrl: 'create-wallet.html',
})
export class CreateWalletPage {
  loginPage = LoginPage
  backupWalletPage = BackupWalletPage
  private protocolAgreement: boolean = false
  private wif: string
  private name: string
  private passphrase1: string
  private passphrase2: string

  constructor (
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    private walletProvider: WalletProvider
  ) {

  }

  get disabledButton () {
    if (this.wif)
      return !this.passphrase1 || !this.passphrase2 || (this.passphrase1 !== this.passphrase2) || !this.name || !this.protocolAgreement || !this.wif
    return !this.passphrase1 || !this.passphrase2 || (this.passphrase1 !== this.passphrase2) || !this.name || !this.protocolAgreement
  }

  ionViewDidLoad () {
    console.log('ionViewDidLoad CreateWalletPage');
  }

  async createWallet () {
    if (this.passphrase1 && !this.validatePassphraseStrength(this.passphrase1)) return
    if (this.passphrase1 !== this.passphrase2) return
    if (this.wif && !wallet.isWIF(this.wif)) return

    let i = await this.createLoading('Just say something')
    await i.present()
    setTimeout(async () => {
      try {
        const accountTemp = new wallet.Account(this.wif || wallet.generatePrivateKey())
        accountTemp.label = this.name
        const { WIF } = accountTemp
        const encryptedWIF = wallet.encrypt(WIF, this.passphrase1)
        const account = new wallet.Account(encryptedWIF)
        account.isDefault = true
        account.label = this.name
        account.decrypt(this.passphrase1)
        this.walletProvider.addAccount(account)

        this.walletProvider.downloadWallet({
          fileName: this.name + '.otcgo'
        })

        await i.dismiss()
        await this.navCtrl.push(this.backupWalletPage)
      } catch (e) {
        console.log(e)
      }
    }, 500)
  }

  validatePassphraseStrength (passphrase) {
    return passphrase.length >= 4;
  }

  createLoading (content) {
    const loading = this.loadingCtrl.create({
      content,
      spinner: 'crescent'
    })

    return Promise.resolve(loading)
  }


  showPrompt ({ title, message }) {
    const alert = this.alertCtrl.create({
      title,
      message
    })

    return alert.present()
  }

}
