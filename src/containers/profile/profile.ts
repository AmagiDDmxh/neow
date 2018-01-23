import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',

})
export class ProfilePage {
  user: {};

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.user = {
      address: 'AYA8uKKccDvfBi6FGxRUDpL89f51CodztN',
      name: 'U name'
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }

}
