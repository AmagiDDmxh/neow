import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'

import { wallet } from '../libs/neon-js'
import { FileTransfer, FileTransferObject } from "@ionic-native/file-transfer";
import { File } from '@ionic-native/file';
import { OLD_WALLET_CHECK_LIST } from "./wallet.consts";


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

  constructor(public http: HttpClient, private fileTransfer: FileTransfer, private file: File) {
    this.fileTransferObject = this.fileTransfer.create()
  }

  addAccount (account) {
    this._wallet.addAccount(account)
  }

  downloadWallet ({ fileName }) {
    const dataDirectory = this.file.dataDirectory
    this.file.writeFile(dataDirectory, fileName, this._wallet.export(), { replace: true })



    /*const file = new Blob([this._wallet.export()], { type: 'text/plant' })
    const aLink = document.createElement('a')
    aLink.href = window.URL.createObjectURL(file)
    aLink.download = fileName*/


    // window.URL.revokeObjectURL(aLink.href)
    return true

  }


  login (fileStr: string) {
    const waJSON = JSON.parse(fileStr)
    if (this.isOldWallet(waJSON))

      this._wallet = wallet.Wallet.import()
  }

  upgradeOldWallet (waJSON) {

  }

  isOldWallet (items) {

    return OLD_WALLET_CHECK_LIST.every(i => items.hasOwnProperty(i))
  }

}
