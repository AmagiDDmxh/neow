import { Component, OnInit } from '@angular/core'
import {
	IonicPage, Loading, LoadingController, NavController,
	ToastController
} from 'ionic-angular'

import { PossessionDetailPage } from './possession-detail/possession-detail'
import { WalletProvider } from '../../providers/wallet.provider'

import { ASSET_ENUM } from '../../shared/constants'
import { dev } from '../../environment'
import { PossessionsProvider } from '../../providers/possessions.provider'
import { ApiProvider } from '../../providers/api/api.provider'

@IonicPage({
	name: 'Possessions',
	segment: 'possessions'
})
@Component({
	selector: 'page-possessions',
	templateUrl: 'possessions.html'
})
export class PossessionsPage implements OnInit {
	splash: boolean = false
	possessionDetailPage = PossessionDetailPage

	balances
	account
	loading: Loading = this.loadingCtrl.create()

	constructor (
		public navCtrl: NavController,
		private toastCtrl: ToastController,
		private walletProvider: WalletProvider,
		private loadingCtrl: LoadingController,
		private possessionsProvider: PossessionsProvider,
		private apiProvider: ApiProvider
	) {}

	ngOnInit () {
		this.loading.present()

		this.possessionsProvider
		    .getBalances()
		    .subscribe(
			    res => {
				    this.balances = this.parseBalances(res['balances'])
				    this.loading.dismissAll()
			    },
			    error => {
				    this.loading.dismissAll()
			    }
		    )

		this.account = this.possessionsProvider.getAccount()

	}

	ionViewCanEnter () {
		return this.walletProvider.haveAnAccount()
	}

	showMsg (message) {
		const toast = this.toastCtrl.create({
			message,
			duration: 2000
		})

		return toast.present()
	}

	/**
	 * [{ amount: 1, asset: 'NEO', unspent: [] }, ...]
	 * mapTo -> [{ amount: 1, asset: 'NEO', assetId: 'ASI120SAiwq9asunxa....'}, ...]
	 **/
	private parseNeonBalances (balances) {
		return balances.map(({ amount, asset }) => ({
			amount,
			asset,
			assetId: ASSET_ENUM[asset]
		}))
	}

	private parseBalances (balances) {
		return Object.entries(balances)
		             .map(
			             ([assetId, amount]) => ({
				             amount,
				             assetId,
				             asset: ASSET_ENUM[assetId]
			             })
		             )
	}

	openQRCode () {
		this.navCtrl.push('payment-qrcode', { address: this.account.address })
	}
}
