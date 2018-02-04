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

	getPrices (coins?: string[], currency?: string) {
		return this.neoPriceProvider.getPrices(coins, currency)
	}

	getHeight () {
		return this.http.get(`${this.getApiEndpoint()}/height`)
	}

	getBalances (address) {
		if (dev) {
			return this.http.get(`${this.testScanApi}/v1/get_balance/${address}`)
		}
		return this.http.get(`${this.getApiEndpoint()}/address/${address}`)
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

	sendAsset (body: TransferPostBody, passphrase) {
		return this.postTransfer(body)
		           .then((res: TransferResBody) => this.parseTransfer(passphrase)(res))
		           .then((body: SignPostBody) => this.postSign(body))

	}

	/**
	 *
	 **/
	postTransfer (body: TransferPostBody): Promise<TransferResBody> {
		return this.http
		           .post(`${this.getApiEndpoint()}/balances/transfer`, body)
		           .toPromise<TransferResBody>()

	}

	private parseTransfer (passphrase) {
		return (res: TransferResBody): SignPostBody => {
			const { publicKey, key } = this.walletProvider.getDefaultAccount()
			const privateKey = getPrivateKeyFromWIF(decrypt(key, passphrase))
			const { transaction } = res['transaction']
			const signature = generateSignature(transaction, privateKey)

			return <SignPostBody>{
				publicKey,
				transaction,
				signature
			}
		}
	}

	postSign (body: SignPostBody): Promise<SignResBody> {
		return this.http.post(`${this.getApiEndpoint()}/sign`, body).toPromise<SignResBody>()
	}

	handleError (error) {

	}

}
