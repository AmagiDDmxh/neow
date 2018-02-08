import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'

import { File } from '@ionic-native/file'

import { wallet } from '../libs/neon'
import { OLD_WALLET_CHECK_LIST, NEW_WALLET_CHECK_LIST, OTCGO_WALLET_FILE_NAME } from "./wallet.consts"

/* disabled */
import * as CryptoJS from 'crypto-js'
import * as KJ from 'jsrsasign'
import { Platform } from 'ionic-angular'

@Injectable()
export class WalletProvider {
  dataDirectory: string

  scrypt = {
    n: 16384,
    r: 8,
    p: 8,
    size: 64
  }

  private _wallet

  constructor (
    public http: HttpClient,
    private file: File,
    private platform: Platform
  ) {
    if (this.platform.is('mobile')) {
      this.dataDirectory = this.file.dataDirectory

      if (this.isWalletAlreadyExits()) {
        this.readWallet().then((walletStr: string) => {
          this.wallet = JSON.parse(walletStr)
        })
      }
    }
  }

  addAccount (account) {
    this.wallet && this.wallet.addAccount(account)
  }

  haveAnAccount (): boolean {
    return !!this.wallet && !!this.wallet.accounts
  }

  getDefaultAccount () {
    if (this.haveAnAccount()) return this.wallet.defaultAccount
  }

  async readWallet () {
    return await this.file.readAsText(this.dataDirectory, OTCGO_WALLET_FILE_NAME)
  }

  isWalletAlreadyExits () {
    return !window.navigator && this.file.checkFile(this.dataDirectory, OTCGO_WALLET_FILE_NAME)
  }

  set wallet (file) {
    if (this.isWallet(file)) {
      this._wallet = new wallet.Wallet(file)
      this.platform.is('mobile') && this.writeWalletFile()
    }

  }

  get wallet () {
    if (this._wallet)
      return this._wallet
  }

  initWallet () {
    this.wallet = {
      name: 'OTCGO-mobile-wallet',
      scrypt: this.scrypt,
      accounts: [],
      version: 'beta-0.2',
      extra: null
    }
  }

  upgradeAndAddToAccount (oldWalletJSON: object, passphrase: string): Promise<boolean | Error> {
    if (!this.isOldWallet(oldWalletJSON)) return Promise.reject(new Error('Is not an old wallet, Please check again!'))

    const { privateKeyEncrypted, publicKey } = oldWalletJSON as any

    let privateKey

    try {
      privateKey = this._decryptOldWallet(privateKeyEncrypted, passphrase)
      const result = this._verifyOldWallet(privateKey, publicKey)

      if (result) {
        const account = new wallet.Account(privateKey)
        account.encrypt(passphrase)
        this.wallet.addAccount(account)
        return Promise.resolve(true)
      } else {
        return Promise.reject(new Error('Incorrect Password!'))
      }

    } catch (e) {
      return Promise.reject(new Error(e))
    }
  }

  writeWalletFile () {
    this.file.writeFile(this.dataDirectory, OTCGO_WALLET_FILE_NAME, this.wallet.export())
  }

  isOldWallet = (items): boolean => OLD_WALLET_CHECK_LIST.every(i => items.hasOwnProperty(i))

  private _decryptOldWallet = (enckey, pwd) => (<any>CryptoJS).AES
                                                              .decrypt(enckey, pwd)
                                                              .toString((<any>CryptoJS).enc.Utf8)

  private _verifyOldWallet (prvkey, pubkey) {
    const msg = 'aaa'
    const sigval = this._doSign(prvkey, msg)
    return this._doVerify(pubkey, msg, sigval)
  }

  private _doSign (prvkey, msg) {
    const sha256withECDSA = new (<any>KJ).crypto.Signature({ 'alg': 'SHA256withECDSA' })

    sha256withECDSA.initSign({
      'ecprvhex': prvkey,
      'eccurvename': 'secp256r1'
    })
    sha256withECDSA.updateString(msg)

    return sha256withECDSA.sign()
  }

  private _doVerify (pubkey, msg, sigval) {
    const provSignature = new (<any>KJ).crypto.Signature({
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

  isWallet = (items) => NEW_WALLET_CHECK_LIST.every(i => items.hasOwnProperty(i))
}
