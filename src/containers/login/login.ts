import { Component } from '@angular/core';
import {
  AlertController, IonicPage, NavController,
  NavParams
} from 'ionic-angular';
// import { FileChooser } from "@ionic-native/file-chooser";
import { CreateWalletPage } from '../create-wallet/create-wallet';

import { wallet } from '@cityofzion/neon-js';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  private _file: File
  createWalletPage = CreateWalletPage
  importText: string = "导入";
  isEncKey: boolean = true;
  encKey: string
  passphrase: string


  constructor (
    public navCtrl: NavController,
    public navParams: NavParams,
    // private fileChooser: FileChooser,
    public alertCtrl: AlertController
  ) {

  }

  ionViewDidLoad() {
    // window.wallet = wallet
    /*console.log('[LOGIN-PAGE]:', wallet.decrypt("U2FsdGVkX18w+RXUmhIlIWpy+3pl+YA4Ocm2nTRK/zwEZwge5Gblta+YNaveEMlvIsdvDdkK3vHKwLea7DgeAXDD2Vtz8CoX+mRpW3kjw7w/ca3NNMoGeyeQ/Faspb3Z", "a"));*/
  }

  get disabledBtn () {
    return (!this.encKey || !this.passphrase) && (!this._file)
  }
  
  openImportBox () {
    this.isEncKey = false
    this.importText = '导入钱包文件'

    this.openWallet()
  }

  openEncryptedKeyBox() {
    this.isEncKey = true
    this.importText = '导入'
  }

  openWallet () {
    if (window.navigator) {
      let fileInput = document.querySelector(
        'page-login input[type=file]#fileInput') as HTMLInputElement
      fileInput.click()
    }
  }

  fileChange (file) {
    if (file) {
      this.importText = file.name.slice()
      this._file = file as File

      const reader = new FileReader()
      const ng = this

      reader.onload = function () {
        try {
          ng.readFile(JSON.parse(this.result))
        } catch (e) {

        }
      }
    }

  }

  readFile (result) {
    console.log(result)
  }

  showPrompt (msg: string) {
    let prompt = this.alertCtrl.create({
      title: msg
    })
    prompt.present();
  }

}
