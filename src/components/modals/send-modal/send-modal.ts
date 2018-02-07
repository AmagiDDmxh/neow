import { Component, Inject } from '@angular/core'
import {
	IonicPage, NavParams, ToastController,
	ViewController
} from 'ionic-angular'
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms'

import { wallet } from '../../../libs/neon'
import { ApiProvider } from '../../../providers/api/api.provider'
import { TransferPostBody } from '../../../providers/api/api.models'
import { WalletProvider } from '../../../providers/wallet.provider'
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner'

@IonicPage()
@Component({
	selector: 'send-modal',
	templateUrl: 'send-modal.html'
})
export class SendModalComponent {
	sendForm: FormGroup
	possessionData = this.navParams.data
	account = this.walletProvider.getDefaultAccount()

	constructor (
		public viewCtrl: ViewController,
		public navParams: NavParams,
		private api: ApiProvider,
		private walletProvider: WalletProvider,
		private qrScanner: QRScanner,
		private toastCtrl: ToastController,
		@Inject(FormBuilder) private fb: FormBuilder
	) {
		this.sendForm = this.fb.group({
			address: ['', [Validators.required, addressValidator]],
			passphrase: ['', Validators.required],
			amount: ['', [Validators.required, amountValidator(this.possessionData.amount)]],
			label: [''],
		})
	}

	get toAddress () { return this.sendForm.get('address') }

	get passphrase () { return this.sendForm.get('passphrase') }

	get amount () { return this.sendForm.get('amount') }

	get label () { return this.sendForm.get('label') }

	dismiss () {
		this.viewCtrl.dismiss()
		this.sendForm.reset()
	}

	/**
	 * Address must be check validity and required
	 * @if address && isAddress(address)
	 * passphrase been use for signature the walelt file is require
	 * amount is required and translate to big num
	 * optional Label
	 **/
	transfer () {
		this.toAddress.markAsTouched()
		this.amount.markAsTouched()

		if (!this.sendForm.valid || !this.toAddress.valid || !this.amount.valid || !this.passphrase.valid) {
			return
		}

		const source = this.account.address
		const dest = this.toAddress.value
		const amount = this.amount.value
		const assetId = this.possessionData.assetId

		// TODO: Wait for backend
		this.api
		    .postTransfer(<TransferPostBody>{ source, dest, amount, assetId })
		    .subscribe(
			    res => console.log('res', res),
			    err => console.log('err', err)
		    )
	}

	qrScan () {
		this.qrScanner
		    .prepare()
		    .then((status: QRScannerStatus) => {
			    if (status.authorized) {
			    	let scanSub = this.qrScanner.scan().subscribe(text => {
					    console.log('Scanned something', text)
					    let toast = this.toastCtrl.create({
						    message: text,
						    duration: 5000
					    })
					    toast.present()

					    this.qrScanner.hide()
					    scanSub.unsubscribe()
				    })

				    this.qrScanner.show()

			    } else if (status.denied) {
				    // camera permission was permanently denied
				    // you must use QRScanner.openSettings() method to guide the user to the settings page
				    // then they can grant the permission from there
			    } else {
				    // permission was denied, but not permanently. You can ask for permission again at a later time.

			    }
		    })
			.catch(err => console.log(err))
	}
}

function addressValidator (addressCtrl: FormControl): ValidationErrors {
	const { isAddress } = wallet
	const value = addressCtrl.value
	if (!value || !isAddress(value)) return { invalidAddress: true }
	return null
}

function amountValidator (maxValue) {
	return (amountCtrl: FormControl): ValidationErrors | null => {
		const value = amountCtrl.value
		if (!value || value <= 0 || value > maxValue) return { invalidAmount: true }
		return null
	}
}