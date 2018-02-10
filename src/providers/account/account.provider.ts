import { Injectable } from '@angular/core'
import { wallet } from '../../libs/neon'
import { WalletProvider } from '../wallet/wallet.provider'

const { Account } = wallet

// Abstract Account level from wallet
@Injectable()
export class AccountProvider {
	account = this.walletProvider.wallet.accounts

	get defaultAccount () {
		return this.account.find(account => account.isDefault)
	}

	constructor (private walletProvider: WalletProvider) {}

	getPublicKey (account) {
		if (account) {
			const acct = new Account(account)
			return acct.publicKey
		}
		return this.defaultAccount.publicKey
	}

	getPrivateKey (account) {
		if (account) {
			const acct = new Account(account)
			return acct.privateKey
		}
		return this.defaultAccount.privateKey
	}

	getWIF (account) {

	}

	getAddress (account) {
		return account ? (new Account(account)).address : this.defaultAccount.address
	}

	getBalances (account) {
		if (account) {
			const acct = new Account(account)
			return
		}
	}
}