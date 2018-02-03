import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'

import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise'
import 'rxjs/add/observable/of'


import { TRANSACTIONS } from '../../shared/mocks/datas'
import { NeoPriceProvider } from './neoprice.provider'
import { TransferPostBody } from './api.models'
import { dev } from '../../environment'
import { WalletProvider } from '../wallet.provider'



@Injectable()
export class ApiProvider {
  neoscanApi = 'https://neoscan.io/api/main_net/v1'
  otcgoApi = 'https://api.otcgo.cn'
  mainScanApi = '//api.neoscan.io/api/main_net'

  constructor (
    public http: HttpClient,
    private neoPriceProvider: NeoPriceProvider,
    private walletProvider: WalletProvider
  ) { }

  request (method, url, options?: {}) {
    return this.http.request(method, url, options)
  }

  getApiEndpoint () {
    if (dev)
      return `${this.otcgoApi}/testnet`
    return `${this.otcgoApi}/mainnet`
  }

  getPrice (coin?: string, currency?: string) {
    return this.neoPriceProvider.getPrice(coin, currency)
  }

  getPrices (coins?: string[], currency?: string) {
    return this.neoPriceProvider.getPrices(coins, currency)
  }

  getHeight () {
    return this.http.get(`${this.getApiEndpoint()}/height`)
  }

  getBalances(address) {
    return this.http.get(`${this.getApiEndpoint()}/address/${address}`)
  }

  getTransactionHistory (address): Observable<object> {
    if (dev) return Observable.of(TRANSACTIONS)
    return this.http
               .get(`${this.mainScanApi}/v1/get_address_neon/${address}`)
  }

  getBlock (height): Observable<Object> {
    return this.http
               .get(`${this.mainScanApi}/v1/get_block/${height}`)
  }

  sendAsset (body) {
    this.postTransfer<Promise>(body)
        .then(this.postSign)
  }

  /**
   *
   **/
  postTransfer (body: TransferPostBody) {
    this.http
        .post(`${this.getApiEndpoint()}/balances/transfer`, body)
        .map(res => {
          const publicKey = this.walletProvider.getDefaultAccount().publicKey
          // const signature =

          return {
            publicKey,

          }

        })
        .toPromise()
  }

  postSign (body) {
    return this.http.post(`${this.getApiEndpoint()}/sign`, body)
  }

  handleError (error) {

  }

}
