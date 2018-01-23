import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the PossessionDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-possession-detail',
  templateUrl: 'possession-detail.html',
})
export class PossessionDetailPage {
  possessionData

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.possessionData = this.navParams.data
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PossessionDetailPage');
  }

}
