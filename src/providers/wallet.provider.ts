import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'

import { wallet } from '@cityofzion/neon-js'

@Injectable()
export class WalletProvider {
  // private _wallet = new wallet.Wallet();

  constructor(public http: HttpClient) {
    console.log()
  }

  setAccount (param: string) {

  }

  downloadWallet () {
    const aLink = document.createElement('a')

  }


}
