import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { ApiProvider } from "../../providers/api/api";
import { PossessionDetailPage } from "./possession-detail/possession-detail";


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


  constructor (
    public navCtrl: NavController,
    private apiProvider: ApiProvider,
    private toastCtrl: ToastController
  ) {
    this.tabBarElement = document.querySelector('.tabbar')

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

  showMsg (message) {
    const toast = this.toastCtrl.create({
      message,
      duration: 2000
    })

    return toast.present()
  }
}
