import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'

import { File } from '@ionic-native/file'

import { wallet } from '../libs/neon-js'
import { OLD_WALLET_CHECK_LIST, NEW_WALLET_CHECK_LIST, OTCGO_WALLET_FILE_NAME } from "./wallet.consts"

import { AES, enc } from 'crypto-js'
import { crypto } from 'jsrsasign'


@Injectable()
export class WalletProvider {
  dataDirectory: string

  scrypt = {}

  private _wallet = new wallet.Wallet({
    name: 'OTCGO-mobile-wallet',
    scrypt: this.scrypt,
    accounts: [],
    version: 'beta-0.2',
    extra: null
  } as any)

  constructor (
    public http: HttpClient,
    private file: File
  ) {
    this.dataDirectory = !window.navigator && this.file.dataDirectory

    if (this.isWalletAlreadyExits()) {
      this.readWallet().then((walletStr: string) => {
        const walletJSON = JSON.parse(walletStr)
        this.wallet = new wallet.Wallet(walletJSON)
      })
    }
  }

  addAccount (account) {
    this.wallet.addAccount(account)
    this.writeFile()
  }

  async readWallet () {
    return await this.file.readAsText(this.dataDirectory, OTCGO_WALLET_FILE_NAME)
  }

  async isWalletAlreadyExits () {
    return !window.navigator && this.file.checkFile(this.dataDirectory, 'OTCGO-mobile-wallet.otcgo')
  }

  set wallet (file) {
    if (this._isWallet(file))
      this._wallet = wallet.Wallet.import(file)
  }

  get wallet () {
    if (this._wallet)
      return this._wallet
  }

  upgradeOldWallet (oldWalletJSON: object, passphrase: string) {
    if (!this.isOldWallet(oldWalletJSON)) return Promise.resolve(new Error('Is not an old wallet, Please check again!'))

    const { privateKeyEncrypted, publicKey } = oldWalletJSON
    const privateKey = this._decryptOldWallet(privateKeyEncrypted, passphrase)

    if (!this._verifyOldWallet(privateKey, publicKey)) return Promise.resolve(false)

    const account = new wallet.Account(privateKey)
    account.encrypt(passphrase)
    this.wallet.addAccount(account)

  }

  writeFile () {
    const dataDirectory = this.file.dataDirectory
    this.file.writeFile(dataDirectory, OTCGO_WALLET_FILE_NAME, this.wallet.export())
  }

  isOldWallet = (items) => OLD_WALLET_CHECK_LIST.every(i => items.hasOwnProperty(i))

  private _decryptOldWallet = (enckey, pwd) => AES.decrypt(enckey, pwd).toString(enc.Utf8)

  private _verifyOldWallet (prvkey, pubkey) {
    const sha256withECDSA = new crypto.Signature({ 'alg': 'SHA256withECDSA' })
    const msg = 'aaa'
    sha256withECDSA.initSign({
      'ecprvhex': prvkey,
      'eccurvename': 'secp256r1'
    })
    sha256withECDSA.updateString(msg)

    const sigval = sha256withECDSA.sign()

    const provSignature = new crypto.Signature({
      'alg': 'SHA256withECDSA',
      'prov': 'cryptojs/jsrsa'
    })
    provSignature.initVerifyByPublicKey({
      'ecpubhex': pubkey,
      'eccurvename': 'secp256r1'
    })
    provSignature.updateString(msg)
    return provSignature.verify(sigval)
  }

  private _isWallet = (items) => NEW_WALLET_CHECK_LIST.every(i => items.hasOwnProperty(i))

}
