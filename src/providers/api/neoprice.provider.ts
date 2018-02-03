import { Injectable } from '@angular/core'
import {
  HttpClient,
} from '@angular/common/http'
import { Observable } from 'rxjs/Observable'

@Injectable()
export class NeoPriceProvider {
  CURRENCIES: string[] = ['aud', 'brl', 'cad', 'chf', 'clp', 'cny', 'czk', 'dkk', 'eur', 'gbp', 'hkd', 'huf', 'idr', 'ils', 'inr', 'jpy', 'krw', 'mxn', 'myr', 'nok', 'nzd', 'php', 'pkr', 'pln', 'rub', 'sek', 'sgd', 'thb', 'try', 'twd', 'usd', 'zar']
  coinMarketCapApi = '//api.coinmarketcap.com/v1'
  ticker = 'ticker'

  constructor (private http: HttpClient) {}

  getPrice (coin = 'NEO', currency = 'cny') {
    return this.query(`${this.coinMarketCapApi}/${this.ticker}/${coin}/`, currency)
               .map(price => price[coin])
  }

  getPrices (coins = ['NEO'], currency = 'cny') {
    return this.query(`${this.coinMarketCapApi}/${this.ticker}/`, currency)
               .map(mapping => {
                 coins = coins.map((coin) => coin.toUpperCase())
                 const prices = this.pick(mapping, ...coins)

                 if (!coins.some((coin) => !prices[coin])) return prices
                 else throw new Error('None of the coin symbols are supported by CoinMarketCap!')
               })
  }

  private query (url, currency) {
    currency = currency.toLowerCase()
    if (this.CURRENCIES.includes(currency))
      return this.http.get(url, {
        params: {
          limit: 0,
          convert: currency
        }
      } as any).map((res: any) => {
        if (res.error) throw new Error(res.error)
        return this.mapPrices(res, currency)
      })
    else
      return Observable.throw(new ReferenceError(`${currency} 不在可接受的货币列表里!`))
  }

  private mapPrices (tickers, currency) {
    const mappings = {}

    tickers.forEach(ticker =>
      mappings[ticker.symbol] = parseFloat(ticker[`price_${currency.toLowerCase()}`])
    )

    return mappings
  }

  private pick (obj, ...props) {
    return Object.assign({}, ...props.map(prop => ({ prop: obj[prop] })))
  }

}