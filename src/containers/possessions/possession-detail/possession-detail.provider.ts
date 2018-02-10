import { Injectable } from '@angular/core'
import * as moment from 'moment'
import { ApiProvider } from '../../../providers'
import * as API_CONSTANTS from '../../../providers/api/api.consts'
import { WalletProvider } from '../../../providers/wallet/wallet.provider'

import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise'
import { ASSET_ENUM } from '../../../shared/constants'


@Injectable()
export class PossessionDetailProvider {
	account = this.walletProvider.getDefaultAccount()

	constructor (private apiProvider: ApiProvider, private walletProvider: WalletProvider) {}

	getHistories (name) {
		let assetId = ASSET_ENUM[name]

		return this.apiProvider
		           .get(API_CONSTANTS.HISTORY + '/' + this.account.address)
		           .map(res => res['result'])
		           .map(result => result.filter(item => item.asset === assetId).map(item => parseTx(item)))
		           .toPromise()
	}
}

function filterByName (possessionData) {
	return (data) => data.name === possessionData.asset
}

function parseTx (data) {
	const [subtitle, title] = moment(data['time']).add(8, 'h').format('GGGG/MM/DD HH:mm:ss').toString().split(' ')
	return {
		...data,
		time: { subtitle, title }
	}
}
