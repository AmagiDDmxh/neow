import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Apollo } from 'apollo-angular'
import { HttpLink } from 'apollo-angular-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import gql from 'graphql-tag'

import 'rxjs/add/operator/map'
import 'rxjs/add/observable/of'
import { Observable } from 'rxjs/Observable'
import { TRANSACTIONS } from '../../shared/mocks/datas'

const environment = 'dev'

@Injectable()
export class ApiProvider {
  apiUrl = 'https://neoscan.io/api/main_net/v1'
  mainNeonDB = 'http://api.wallet.cityofzion.io'
  testnetNeonDB = 'http://api.wallet.cityofzion.io'
  mainScanApi = 'https://api.neoscan.io/api/main_net'
  neoverseApi = '//explorer.neoverse.io/graphql'

  apolloClient



  constructor (public http: HttpClient, private apollo: Apollo, private httpLink: HttpLink) {
    this.apolloClient = this.apollo.create({
      link: this.httpLink.create({ uri: 'http://explorer.neoverse.io/graphql' }),
      cache: new InMemoryCache()
    })
  }

  getHeight() {
    return this.http.get(`${this.apiUrl}/get_height`)
  }

  getBalance(address) {
    return this.http.get(`${this.apiUrl}/get_balance/${address}`)
  }

  getTransactionHistory (address): Observable<object> {
    if (environment === 'dev') {
      return Observable.of(TRANSACTIONS)
    }
    return this.http
               .get(`${this.mainScanApi}/v1/get_address_neon/${address}`)
  }

  getBlock (height): Observable<Object> {
    return this.http
               .get(`${this.mainScanApi}/v1/get_block/${height}`)
  }

}
