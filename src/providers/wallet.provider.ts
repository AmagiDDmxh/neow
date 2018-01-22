import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'

import { wallet } from '@cityofzion/neon-js'

@Injectable()
export class WalletProvider {
  scrypt = {

  }
  private _wallet = new wallet.Wallet({
    name: 'otcgoWallet',
    version: '0.2',
    scrypt: this.scrypt,
    accounts: [], extra: null
  })

  constructor(public http: HttpClient) {

  }

  addAccount (account) {
    this._wallet.addAccount(account)
  }

  downloadWallet ({ fileName }) {
    if (window.navigator) {
      const file = new Blob([this._wallet.export()], { type: 'text/plant' })
      const aLink = document.createElement('a')
      aLink.href = window.URL.createObjectURL(file)
      aLink.download = fileName
      aLink.click()

      console.log('[DOWNLOADED_FROM_BROWSER]:', file)

      window.URL.revokeObjectURL(aLink.href)
      return true
    }

  }


}
