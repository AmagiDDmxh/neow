import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login'
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CustomValidators } from "../../modules/wallet.validators";

@IonicPage()
@Component({
  selector: 'page-create-wallet',
  templateUrl: 'create-wallet.html',
})
export class CreateWalletPage {
  loginPage = LoginPage
  private walletForm: FormGroup

  constructor (
    public navCtrl: NavController,
    public navParams: NavParams,
    private fb: FormBuilder
  ) {
    this.createForm()
  }

  createForm () {
    this.walletForm = this.fb.group({
      name: ['', Validators.required],
      wif: [''],
      passphrase1: ['', [ Validators.required, Validators.minLength(4) ] ],
      passphrase2: ['', [ Validators.required, Validators.minLength(4) ] ]
    }, {
      validator: CustomValidators.formCheck
    })
  }

  get disabledButton () {
    /*if (this.newWallet.wifKey)
      return !this.newWallet.pwd || !this.newWallet.pwdConfirm || (this.newWallet.passphrase !== this.newWallet.pwdConfirm) || !this.newWallet.walletName || !this.newWallet.wifKey
    return !this.newWallet.pwd || !this.newWallet.pwdConfirm || (this.newWallet.passphrase !== this.newWallet.pwdConfirm) || !this.newWallet.walletName*/
    return false
  }

  createWallet () {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateWalletPage');
  }

}
