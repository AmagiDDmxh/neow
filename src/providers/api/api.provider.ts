import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'

import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise'
import 'rxjs/add/observable/of'

import { TRANSACTIONS } from '../../shared/mocks/datas'
import { NeoPriceProvider } from './neoprice.provider'
import { SignPostBody, SignResBody, TransferPostBody, TransferResBody } from './api.models'
import { dev } from '../../environment'
import { WalletProvider } from '../wallet.provider'
import { wallet } from '../../libs/neon'

const { generateSignature, decrypt, getPrivateKeyFromWIF } = wallet

@Injectable()
export class ApiProvider {
	neoscanApi = 'https://neoscan.io/api/main_net/v1'
	otcgoApi = 'https://api.otcgo.cn'
	mainScanApi = '//api.neoscan.io/api/main_net'
	testScanApi = '//neoscan-testnet.io/api/test_net'

	constructor (
		public http: HttpClient,
		private neoPriceProvider: NeoPriceProvider,
		private walletProvider: WalletProvider
	) { }

	request (method, url, options?: {}) {
		return this.http.request(method, url, options)
	}

	getApiEndpoint () {
		if (dev)
			return `${this.otcgoApi}/testnet`
		return `${this.otcgoApi}/mainnet`
	}

	getPrice (coin?: string, currency?: string) {
		return this.neoPriceProvider.getPrice(coin, currency)
	}

	getPrices (currency?: string) {
		return this.neoPriceProvider.getPrices(currency)
	}

	getHeight () {
		return this.http.get(`${this.getApiEndpoint()}/height`)
	}

	getBalances<T>(address): Observable<T> {
		if (dev) {
			return this.http.get<T>(`${this.testScanApi}/v1/get_balance/${address}`)
		}
		return this.http.get<T>(`${this.getApiEndpoint()}/address/${address}`)
	}

	getTransactionHistory (address): Observable<object> {
		if (dev) return Observable.of(TRANSACTIONS)
		return this.http
		           .get(`${this.mainScanApi}/v1/get_transaction/${address}`)
	}

	getBlock (height): Observable<Object> {
		return this.http
		           .get(`${this.mainScanApi}/v1/get_block/${height}`)
	}

	// TODO: Transfer
	sendAsset (body, passphrase) {
		return this.postTransfer(body)
		           /*.then((res) => this.parseTransfer(passphrase)(res))
		           .then((body) => this.postSign(body))*/
	}

	/**
	 *
	 **/
	postTransfer (transferPostData: TransferPostBody): Observable<TransferResBody> {
		return this.http
		           .post<TransferResBody>(`${this.getApiEndpoint()}/transfer`, transferPostData)

	}

	private parseTransfer (passphrase) {
		return (res) => {
			const { publicKey, key } = this.walletProvider.getDefaultAccount()
			const privateKey = getPrivateKeyFromWIF(decrypt(key, passphrase))
			const { transaction } = res
			const signature = generateSignature(transaction, privateKey)

			return {
				publicKey,
				transaction,
				signature
			}
		}
	}

	postSign (body) {
		return this.http.post(`${this.getApiEndpoint()}/sign`, body).toPromise()
	}

	postBroadcast (body) {
		return this.http.post(`${this.getApiEndpoint()}/broadcast`, body)
	}

	handleError (error) {

	}

}
