import { Component } from '@angular/core'
import { IonicPage } from 'ionic-angular'
import { ApiProvider } from '../../providers/api/api.provider'


@IonicPage({
	name: 'Claims',
	segment: 'claims'
})
@Component({
	selector: 'page-claims',
	templateUrl: 'claims.html'
})
export class ClaimsPage {
	constructor (private apiProvider: ApiProvider) {}

	ionViewDidLoad () {
		this.getData()
	}

	getData () {

	}

	doClaim () {

	}
}
