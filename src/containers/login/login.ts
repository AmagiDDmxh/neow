import { Component } from '@angular/core';
import {
  AlertController, IonicPage, NavController,
  NavParams
} from 'ionic-angular';
import { FileChooser } from "@ionic-native/file-chooser";
import { CreateWalletPage } from '../create-wallet/create-wallet';

import { wallet } from '@cityofzion/neon-js';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  createWalletPage = CreateWalletPage
  importBtnIsFocus: boolean = false;
  importFileName: string = 'import'

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private fileChooser: FileChooser,
    public alertCtrl: AlertController
  ) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    console.log(wallet)
  }

  openImport (file) {

    if (window.navigator && file) {
      var reader = new FileReader();
      let vm = this;

      reader.onload = function () {
        try {
          console.dir(this.result)
          vm.importBtnIsFocus = true
          vm.importFileName = file.name
        } catch (err) {
          console.dir(err)
        }
      }

      reader.readAsText(file)

    } else {
      this.fileChooser.open()
          .then(uri => {
            this.importBtnIsFocus = true
            this.importFileName = 'Amaaosidmn.json'

          })
          .catch(e => {
            // this.importBtnIsFocus = false

          })
    }
  }

  showPrompt (msg: string) {
    let prompt = this.alertCtrl.create({
      title: msg
    })
    prompt.present();
  }

}
