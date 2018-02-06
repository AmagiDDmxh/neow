import { Component } from '@angular/core'
import {
	NavParams,
	IonicPage,
	NavController,
	ModalController, LoadingController,
} from 'ionic-angular'
import { ApiProvider } from '../../../providers/api/api.provider'
import { WalletProvider } from '../../../providers/wallet.provider'

import 'rxjs/add/operator/filter'

/* TODO: This code is a mess, Try whenever refactor it MEOW */

interface TransactionHistory {
	assetId
	amount
	dest
	confirm
	txid
	name
}

@IonicPage()
@Component({
	selector: 'page-possession-detail',
	templateUrl: 'possession-detail.html',
})
export class PossessionDetailPage {
	possessionData
	tokenCurrentPrice
	transactionHistories: TransactionHistory[]
	loading = this.loadingCtrl.create()
	account = this.walletProvider.getDefaultAccount()

	constructor (
		public navCtrl: NavController,
		public navParams: NavParams,
		private api: ApiProvider,
		private walletProvider: WalletProvider,
		private modalCtrl: ModalController,
		private loadingCtrl: LoadingController
	) {

		/*this.initData()
		    .then(() => {
			    this.api
			        .getTransactionHistory(this.account.address)
			        .map(res => {
			        	console.log(res)
			        	// res['data'].filter(this.filterByName(this.possessionData)).map(this.parseTx)
			        })
			        .subscribe(
				        data => {
				        	console.log(data)
					        this.transactionHistories = data
					        this.loading.dismissAll()
				        },
				        err => {
				        	console.log(err)
				        },
				        () => {
					        this.loading.dismissAll()
				        }
			        )

			    this.api
			        .getPrice(this.possessionData.asset)
			        .subscribe(
				        price => {
					        console.log(price)
					        this.tokenCurrentPrice = price
				        },
				        /!* Because the CROSS ORIGIN problem set it temporary *!/
				        error => {
					        this.loading.dismissAll()
					        console.log(error)

					        this.tokenCurrentPrice =
						        (this.possessionData.asset.toLowerCase() === 'neo') ? 1024 : 512
				        },
				        () => {
					        this.loading.dismissAll()
				        }
			        )
		    })
		    .catch(e => console.log(e))*/

		console.log('rr')
	}

	initData () {
		this.possessionData = this.navParams.data
		this.loading.present()
		return Promise.resolve()
	}

	ionViewDidLoad () {

	}

	showSendModal () {
		const sendModal = this.modalCtrl.create(
			'SendModalComponent',
			this.possessionData,
			{ cssClass: 'inset-modal' }
		)
		sendModal.present()
	}

	private filterByName (possessionData) {
		return (data) => data.name === possessionData.asset
	}

	private parseTx (data) {
		const [subtitle, title] = data['time'].split(' ')
		return {
			...data,
			time: { subtitle, title }
		}
	}
}
