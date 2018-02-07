import { Component } from '@angular/core'
import { IonicPage, Loading, LoadingController, NavController, NavParams } from 'ionic-angular'
import { NeoPriceProvider } from '../../providers/api/neoprice.provider'
import { ApiProvider } from '../../providers/api/api.provider'

/**
 * Generated class for the MarketsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
	selector: 'page-markets',
	templateUrl: 'markets.html',
})
export class MarketsPage {
	coins
	loading: Loading
	GASPrice
	exchangeRates

	constructor (
		public navCtrl: NavController,
		public navParams: NavParams,
		private neoPriceProvider: NeoPriceProvider,
		private loadingCtrl: LoadingController
	) {}

	ionViewDidLoad () {
		this.initData()
	}

	async initData () {
		this.loading = this.loadingCtrl.create()
		this.loading.present()

		this.neoPriceProvider.getPrices().subscribe(
			coins => {
				this.coins = coins
				this.GASPrice = this.coins.find(coin => coin['symbol'] === 'GAS').currentPrice
				this.loading.dismissAll()
			}
		)

		this.neoPriceProvider.getExchangeRates().subscribe(res => this.exchangeRates = res['rates'])
	}

	calculateRate (price: number) {
		const strPrice = (price / this.GASPrice).toString()

		const splitStr: any = strPrice.includes('.')
			? strPrice.split('.')
			: strPrice

		if (splitStr[1]) {
			const subStr = splitStr[1].substr(0, 4)
			return `${splitStr[0]}.${subStr}`
		}

		return splitStr.join('')
	}
}
