import { Component } from '@angular/core'
import {
  IonicPage, NavParams,
  ViewController
} from 'ionic-angular'

@IonicPage()
@Component({
  selector: 'send-modal',
  template: `
		<ion-header>
			<ion-navbar>
				<ion-buttons end>
					<button ion-button icon-only (click)="dismiss()">
						<ion-icon name='close'></ion-icon>
					</button>
				</ion-buttons>
			</ion-navbar>
		</ion-header>

		<ion-content padding class="send-modal__content" fixed>

			<div class="container">
				<h5>转账</h5>

				<ion-item class="round">
					<ion-input placeholder="收款人钱包地址" [(ngModel)]="address"></ion-input>
				</ion-item>
				
				<div class="tooltips">
					
				</div>

				<ion-item class="round">
					<ion-input placeholder="密码" [(ngModel)]="passphrase"></ion-input>
				</ion-item>

				<ion-item class="round">
					<ion-checkbox [(ngModel)]="rememberPassphrase"></ion-checkbox>
				</ion-item>
				
				<ion-item class="round">
					<ion-input placeholder="转账数量" [(ngModel)]="amount"></ion-input>
				</ion-item>
				
				<ion-item class="round">
					<ion-input placeholder="备注" [(ngModel)]="label"></ion-input>
				</ion-item>

				<div class="spacer"></div>

				<button ion-button
				        round
				        full
				        (click)="transfer()"
				        class="otcgo-button--colour">
					转账
				</button>
			</div>
		</ion-content>
  `
})
export class SendModalComponent {
  params
	address
	amount
	label
	rememberPassphrase

  constructor (
    public viewCtrl: ViewController,
    public navParams: NavParams
  ) {
    this.params = navParams.data
  }

  dismiss () {
    this.viewCtrl.dismiss()
  }

  transfer () {

  }
}