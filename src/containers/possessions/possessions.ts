import { Component, Directive } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Subject } from "rxjs/Subject";
import { Subscription } from "rxjs/Subscription";
import { timer } from "rxjs/observable/timer";
import 'rxjs/add/operator/takeWhile'
import 'rxjs/add/operator/startWith'
import 'rxjs/add/operator/switchMap'
import 'rxjs/add/operator/mapTo'
import 'rxjs/add/operator/scan'
import { ApiProvider } from "../../providers/api/api";
import { PossessionDetailPage } from "../possession-detail/possession-detail";


@Component({
  selector: 'page-possession',
  templateUrl: 'possessions.html'
})
export class PossessionPage {
  tabBarElement: any;
  splash: boolean = false;
  balances;
  possessionDetailPage = PossessionDetailPage
  address =  'AYA8uKKccDvfBi6FGxRUDpL89f51CodztN'


  constructor(public navCtrl: NavController, private apiProvider: ApiProvider) {
    this.tabBarElement = document.querySelector('.tabbar')



    apiProvider.getBalance('ANsvyS9q1n6SBDVSdB6uFwVeqT512YSAoW').subscribe(res => {
      this.balances = res['balance']
      console.log(res)
    })
  }

  ionViewDidLoad () {
    /*this.tabBarElement.style.display = 'flex';
    setTimeout(() => {
      this.splash = false
      this.tabBarElement.style.display = 'flex';
    }, 3000);*/
  }
}
