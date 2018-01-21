import { Component } from '@angular/core';
import {
  AlertController,
  IonicPage, LoadingController, NavController,
  NavParams
} from 'ionic-angular';
import { LoginPage } from '../login/login'
import { wallet } from '@cityofzion/neon-js'
import { WalletProvider } from "../../providers/wallet.provider";
import { HomePage } from "../home/home";


@IonicPage()
@Component({
  selector: 'page-create-wallet',
  templateUrl: 'create-wallet.html',
})
export class CreateWalletPage {
  loginPage = LoginPage
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
    /*if (this.wif)
      return !this.passphrase1 || !this.passphrase2 || (this.passphrase1 !== this.passphrase2) || !this.name || !this.protocolAgreement || !this.wif
    return !this.passphrase1 || !this.passphrase2 || (this.passphrase1 !== this.passphrase2) || !this.name || !this.protocolAgreement*/
    return false
  }

  ionViewDidLoad () {
    console.log('ionViewDidLoad CreateWalletPage');
  }

  async createWallet () {
    /*if (this.passphrase1 && !this.validatePassphraseStrength(this.passphrase1)) return
    if (this.passphrase1 !== this.passphrase2) return
    if (this.wif && !wallet.isWIF(this.wif)) return*/

    let i = await this.createLoading('Just say something')
    await i.present()
    setTimeout(async () => {
      try {
        const account = new wallet.Account(this.wif || wallet.generatePrivateKey())
        const { WIF } = account
        const encryptedWIF = wallet.encrypt(WIF, this.passphrase1)

        this.walletProvider.setAccount({
          key: encryptedWIF
        })

        this.walletProvider.downloadWallet()

        await i.dismiss()

      } catch (e) {

      }
    }, 500)
  }

  validatePassphraseStrength (passphrase) {
    return passphrase.length >= 4;
  }

  isOldWallet (jsonStr) {
    const check = ['address', 'publicKey', 'publicKeyCompressed', 'privateKeyEncrypted']
    const WalletJSON = JSON.parse(jsonStr)
    return check.every(i => WalletJSON.hasOwnProperty(i))
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
