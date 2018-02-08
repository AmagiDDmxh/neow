import { Injectable } from '@angular/core'
import {
	HttpClient,
} from '@angular/common/http'

import { Observable } from 'rxjs/Observable'
import 'rxjs/add/observable/throw'
import 'rxjs/add/operator/map'


import { dev } from '../../environment'


@Injectable()
export class NeoPriceProvider {
	coinMarketCapApi = 'https://api.coinmarketcap.com/v1'
	coincapApi = '//coincap.io'
	fixerApi = '//api.fixer.io'
	ticker = 'ticker'

	CURRENCIES: string[] = [ 'aud', 'brl', 'cad', 'chf', 'clp', 'cny', 'czk', 'dkk', 'eur', 'gbp', 'hkd', 'huf', 'idr',
	                         'ils', 'inr', 'jpy', 'krw', 'mxn', 'myr', 'nok', 'nzd', 'php', 'pkr', 'pln', 'rub', 'sek', 'sgd', 'thb', 'try', 'twd', 'usd', 'zar']
	NEO_CHAIN_COINS: string[] = ['NEO', 'GAS', 'TNC', 'QLC', 'TKY', 'RHT', 'CPX', 'ACAT', 'ZPT', 'APH', 'DBC', 'RPX', 'BCS']


	constructor (private http: HttpClient) {}

	getPrices (currency = 'cny') {
		// if (dev) this.query(`${this.coincapApi}/front`, currency).toPromise()
		return this.query(`/coins`, currency).toPromise()
	}

	getExchangeRates (base = 'USD') {
		return this.http.get(`${this.fixerApi}/latest`, {params: { base: 'USD' }}).toPromise()
	}

	private query (url, currency) {
		currency = currency.toLowerCase()
		if (this.CURRENCIES.includes(currency) && url.includes(this.coincapApi))
			return this.http.get(url).map((res: any) => {
				if (res.error != null) return Observable.throw(res.error)
				return this.mapCoinCapPrices(res)
			})

		if (this.CURRENCIES.includes(currency)) {
			return this.http
			           .get(url, { params: { limit: 0, convert: currency } } as any)
			           .map((res: any) => {
				           if (res.error != null) throw new Error(res.error)
				           return this.mapPrices(res, currency)
			           })
		} else {
			return Observable.throw(new ReferenceError(`${currency} 不在可接受的货币列表里!`))
		}
	}

	private mapPrices (tickers, currency) {
		return tickers.filter(data => this.NEO_CHAIN_COINS.includes(data['symbol']))
		              .map(
			              ticker => ({
				              symbol: ticker.symbol,
				              currentPrice: ticker[`price_${currency}`],
				              percent_change_1h: ticker['percent_change_1h'],
				              percent_change_24h: ticker['percent_change_24h'],
				              percent_change_7d: ticker['percent_change_7d'],

			              })
		              )
	}

	private mapCoinCapPrices (res) {
		return res.filter(coin => this.NEO_CHAIN_COINS.includes(coin['short']))
		          .map(
		          	coin => ({
			            symbol: coin['short'],
			            currentPrice: coin['price'],
			            percent_change_24h: coin['cap24hrChange'],
		            })
		          )
	}

}