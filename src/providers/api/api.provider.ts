import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'

import { dev } from '../../environments/environment'
import { wallet } from '../../libs/neon'
const { generateSignature, getPublicKeyFromPrivateKey } = wallet

interface IReqOpts {
	headers?: HttpHeaders | {
		[header: string]: string | string[];
	};
	observe?: 'body';
	params?: HttpParams | {
		[param: string]: string | string[];
	};
	reportProgress?: boolean;
	responseType: 'arraybuffer';
	withCredentials?: boolean;
}

@Injectable()
export class ApiProvider {
	otcgoApi = 'http://api.otcgo.cn'

	constructor (public http: HttpClient) { }

	getAPIEndpoint () {
		return dev
			? `${this.otcgoApi}:9999/testnet`
			: `${this.otcgoApi}:9999/mainnet`
	}

	getScanAPI () {
		return dev
			? 'https://api.neoscan.io/api/main_net'
			: 'https://neoscan-testnet.io/api/test_net'
	}

	getNeonDBAPI () {
		return dev
			? 'http://api.wallet.cityofzion.io'
			: 'http://testnet-api.wallet.cityofzion.io'
	}

	request (method, url, options?: IReqOpts) {
		return this.http.request(method, url, options)
	}

	get (endpoint: string, options?: IReqOpts) {
		return this.http.get(this.getAPIEndpoint() + '/' + endpoint, options)
	}

	post ( endpoint: string, body: any, options?: IReqOpts) {
		return this.http.post(this.getAPIEndpoint() + '/' + endpoint, body, options)
	}

	// TODO: Transfer
	doSendAsset (body, privateKey) {
		return this.postTransfer(body)
		           .then((res) => this.parseTransfer(privateKey)(res))
		           .then((body) => this.postSign(body))
	}

	private postTransfer (transferPostData) {
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

	private postSign (body) {
		return this.http.post(`${this.getAPIEndpoint()}/sign`, body).toPromise()
	}

	private postBroadcast (body) {
		return this.http.post(`${this.getAPIEndpoint()}/broadcast`, body)
	}

	handleError (error) {

	}

}
