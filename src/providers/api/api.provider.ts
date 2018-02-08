import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'

import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise'
import 'rxjs/add/observable/of'
import 'rxjs/add/observable/fromPromise';


import { NeoPriceProvider } from './neoprice.provider'
import { WalletProvider } from '../wallet.provider'
import { dev } from '../../environment'
import { TRANSACTIONS } from '../../shared/mocks/datas'

import { wallet } from '../../libs/neon'
const { generateSignature, getPublicKeyFromPrivateKey } = wallet


@Injectable()
export class ApiProvider {
	otcgoApi = 'https://api.otcgo.cn'


	constructor (
		public http: HttpClient,
		private neoPriceProvider: NeoPriceProvider,
		private walletProvider: WalletProvider
	) { }

	request (method, url, options?: {}) {
		return this.http.request(method, url, options)
	}

	getAPIEndpoint () {
		return dev
			? `${this.otcgoApi}/testnet`
			: `${this.otcgoApi}/mainnet`
	}

	getScanAPI () {
	  return dev
		  ? 'https://api.neoscan.io/api/main_net'
		  :'https://neoscan-testnet.io/api/test_net'
	}

	getNeonDBAPI () {
		return dev
			? 'http://api.wallet.cityofzion.io'
			: 'http://testnet-api.wallet.cityofzion.io'
	}

	getPrices (currency?: string) {
		return this.neoPriceProvider.getPrices(currency)
	}

	getHeight () {
		return this.http.get(`${this.getAPIEndpoint()}/height`)
	}

	getBalances<T>(address): Observable<T> {
		return this.http.get<T>(`${this.getAPIEndpoint()}/address/${address}`)
	}

	getTransactionHistory (address): Observable<object> {
		return dev
			? Observable.of(TRANSACTIONS)
			: this.http.get(`/history/${address}`)
	}

	getBlock (height): Observable<Object> {
		return this.http
		           .get(`${this.getScanAPI()}/v1/get_block/${height}`)
	}

	// TODO: Transfer
	sendAsset (body, privateKey) {
		return this.postTransfer(body)
		           .then((res) => this.parseTransfer(privateKey)(res))
		           .then((body) => this.postSign(body))
	}

	postTransfer (transferPostData) {
		return this.http.post(`${this.getAPIEndpoint()}/transfer`, transferPostData).toPromise()
	}

	private parseTransfer (privateKey) {
		return (res) => {
			const { transaction } = res
			const publicKey = getPublicKeyFromPrivateKey(privateKey)
			const signature = generateSignature(transaction, privateKey)

			return {
				publicKey,
				transaction,
				signature
			}
		}
	}

	postSign (body) {
		return this.http.post(`${this.getAPIEndpoint()}/sign`, body).toPromise()
	}

	postBroadcast (body) {
		return this.http.post(`${this.getAPIEndpoint()}/broadcast`, body)
	}

	handleError (error) {

	}

}
