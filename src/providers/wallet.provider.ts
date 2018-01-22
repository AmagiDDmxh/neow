import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'

import { wallet } from '../libs/neon-js'
import { FileTransfer, FileTransferObject } from "@ionic-native/file-transfer";

@Injectable()
export class WalletProvider {
  fileTransferObject: FileTransferObject
  scrypt = {}

  private _wallet = new wallet.Wallet({
    name: 'otcgoWallet',
    scrypt: this.scrypt,
    accounts: [],
    extra: null
  } as any)
  file: File

  constructor(public http: HttpClient, private fileTransfer: FileTransfer) {
    this.fileTransferObject = this.fileTransfer.create()
  }

  addAccount (account) {
    this._wallet.addAccount(account)
  }

  downloadWallet ({ fileName }) {


    const file = new Blob([this._wallet.export()], { type: 'text/plant' })
    const aLink = document.createElement('a')
    aLink.href = window.URL.createObjectURL(file)
    aLink.download = fileName


    // window.URL.revokeObjectURL(aLink.href)
    return true

  }


}
