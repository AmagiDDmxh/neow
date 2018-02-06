import { Injectable } from '@angular/core'
import { ApiProvider } from './api/api.provider'
import { WalletProvider } from './wallet.provider'
import { Observable } from 'rxjs/Observable'

@Injectable()
export class PossessionsProvider {
	account = this.walletProvider.getDefaultAccount()
	wallet = this.walletProvider.wallet

	constructor (private apiProvider: ApiProvider, private walletProvider: WalletProvider) {

	}

	getBalances<T>(): Observable<T>
	getBalances<T>(address: string): Observable<T>
	getBalances<T>(...args): Observable<T>

	getBalances<T>(...args): Observable<T> {
		const len = args.length
		if (len === 0) {
			return this.apiProvider.getBalances<T>(this.account.address)
		}
		else if (len === 1) {
			return this.apiProvider.getBalances<T>(args[0])
		}
	}

	getAccount () {
		return this.account
	}

	getAccounts () {
		return this.walletProvider.wallet.accounts
	}

	/**
	 * calculateBy('CNY') -> Balances.map(amount => amount.currentPrice('CNY')).reduce((acc, cur) => acc + cur, 0)
	 * calculateBy('GAS') -> Balances.map(amount => amount.currentPrice('CNY')).reduce((acc, cur) => acc + cur, 0) / GAS CurrentPrice
	 * calculateBy('GAS') -> Balances.map(amount => amount.currentPrice('CNY')).reduce((acc, cur) => acc + cur, 0) / NEO CurrentPrice
	 **/
	calculateBy () {

	}
}