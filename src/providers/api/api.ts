import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the ApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApiProvider {
  apiUrl = 'https://neoscan.io/api/main_net/v1'

  constructor(public http: HttpClient) {

  }

  getHeight() {
    return this.http.get(`${this.apiUrl}/get_height`)
  }

  /** Get Balance
   * @param {string} hash_string from the address
   * @return {
   *   "address": "has_string",
   *   "balance": [
   *     {
   *       "asset": "name_string",
   *       "amount": float,
   *       "unspent": [
   *         {
   *           "txid": "tx_id_string",
   *           "value": {float},
   *           "n": {integer}
   *         }
   *       ]
   *     }
   *   ]
   * }
  */
  getBalance(hash_string) {
    return this.http.get(`${this.apiUrl}/get_balance/${hash_string}`)
  }

}
