import { Component, Pipe, PipeTransform  } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@Pipe({name: 'addressCollapse'})
export class ExponentialStrengthPipe implements PipeTransform {
  transform (value: string) {
    return value.substr(0, 14) + '...' + value.substr(30, 34)
  }
}

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
