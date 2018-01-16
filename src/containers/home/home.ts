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
import { NgModel } from "@angular/forms";


@Directive({
  selector: '[ngModel]',
  host: {
    '[class.valid]': 'valid',
    '[class.invalid]': 'invalid'
  }
})
export class NgModelStatus {
  constructor (public control: NgModel) {}
  get valid () { return this.control.valid }
  get invalid () { return this.control.invalid }
}

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  tabBarElement: any;
  splash: boolean = false;
  balances;
  prop;
  user: object;


  constructor(public navCtrl: NavController, private apiProvider: ApiProvider) {
    this.tabBarElement = document.querySelector('.tabbar')
    this.user = {
      address: 'AYA8uKKccDvfBi6FGxRUDpL89f51CodztN',
      name: 'U name'
    }

    apiProvider.getBalance('ANsvyS9q1n6SBDVSdB6uFwVeqT512YSAoW').subscribe(res => {
      this.balances = res['balance']
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
