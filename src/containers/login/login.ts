import { Component } from '@angular/core';
import {
  AlertController, IonicPage, NavController,
  NavParams
} from 'ionic-angular';
import { FileChooser } from "@ionic-native/file-chooser";

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
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
  }

  openImport () {
    this.importBtnIsFocus = true
    this.importFileName = 'Amaaosidmn.json'


    this.fileChooser.open()
      .then(uri => {
        this.importBtnIsFocus = true
        this.importFileName = 'Amaaosidmn.json'
      })
      .catch(e => {
        // this.importBtnIsFocus = false

      })

  }

  showPrompt (msg: string) {
    let prompt = this.alertCtrl.create({
      title: msg
    })
    prompt.present();
  }

}
