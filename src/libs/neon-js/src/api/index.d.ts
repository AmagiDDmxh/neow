import { Transaction, TransactionOutput } from "../transactions/index";
import wallet, { Balance, Claims } from '../wallet';
import { RPCResponse } from "../rpc/index";

interface apiConfig {
  net: string,
  address: string,
  privateKey?: string,
  publicKey?: string,
  url?: string,
  balance?: wallet.Balance
}

interface AssetAmounts {
  GAS: number
  NEO: number
}

interface History {
  address: string
  history: PastTransaction[]
  name: string
  net: 'MainNet' | 'TestNet'
}

interface PastTransaction {
  GAS: number
  NEO: number
  block_index: number
  gas_sent: boolean
  neo_sent: boolean
  txid: string
}

interface Prices {
  [key: string]: number
}

//coinmarketcap
export interface cmc {
  getPrice (coin?: string, currency?: string): Promise<number>
  getPrices (coin?: string[], currency?: string): Promise<Prices>
}

//core
export function getBalanceFrom (config: apiConfig, api: object): apiConfig

export function getClaimsFrom (config: apiConfig, api: object): apiConfig

export function getRPCEndpointFrom (config: apiConfig, api: object): apiConfig

export function getTransactionHistoryFrom (
  config: apiConfig, api: object): apiConfig

export function getWalletDBHeightFrom (
  config: apiConfig, api: object): apiConfig

export function getMaxClaimAmountFrom (
  config: apiConfig, api: object): apiConfig

export function createTx (config: apiConfig, txType: string): apiConfig

export function signTx (config: apiConfig): apiConfig

export function sendTx (config: apiConfig): apiConfig

export function makeIntent (
  assetAmts: AssetAmounts, address: string): TransactionOutput[]

export function sendAsset (config: apiConfig): apiConfig

export function claimGas (config: apiConfig): apiConfig

export function doInvoke (config: apiConfig): apiConfig

//neonDB
export namespace neonDB {
  export function getAPIEndpoint (net: string): string

  export function getBalance (
    net: string, address: string): Promise<wallet.Balance>

  export function getClaims (
    net: string, address: string): Promise<wallet.Claims>

  export function getRPCEndpoint (net: string): Promise<string>

  export function getTransactionHistory (
    net: string, address: string): Promise<History>

  export function getWalletDBHeight (net: string): Promise<number>

  export function doClaimAllGas (
    net: string,
    privateKey: string
  ): Promise<RPCResponse>
  export function doClaimAllGas (
    net: string,
    publicKey: string,
    signingFunction: (unsigned: Transaction, publicKey: string) => Transaction
  ): Promise<RPCResponse>

  export function doMintTokens (
    net: string,
    scriptHash: string,
    fromWif: string,
    neo: number,
    gasCost: number
  ): Promise<RPCResponse>
  export function doMintTokens (
    net: string,
    scriptHash: string,
    publicKey: string,
    neo: number,
    gasCost: number,
    signingFunction: (unsigned: Transaction, publicKey: string) => Transaction
  ): Promise<RPCResponse>

  export function doSendAsset (
    net: string,
    toAddress: string,
    from: string,
    assetAmounts: AssetAmounts
  ): Promise<RPCResponse>
  export function doSendAsset (
    net: string,
    toAddress: string,
    publicKey: string,
    assetAmounts: AssetAmounts,
    signingFunction: (unsigned: Transaction, publicKey: string) => Transaction
  ): Promise<RPCResponse>
}

//neoscan
export namespace neoscan {
  export function getAPIEndpoint (net: string): string

  export function getRPCEndpoint (net: string): Promise<string>

  export function getBalance (
    net: string, address: string): Promise<wallet.Balance>

  export function getClaims (
    net: string, address: string): Promise<wallet.Claims>
}

//nep5
export namespace nep5 {
  export function getTokenInfo (
    url: string,
    scriptHash: string
  ): Promise<{ name: string, symbol: string, decimals: number, totalSupply: number }>

  export function getTokenBalance (
    url: string, scriptHash: string, address: string): Promise<number>

  export function getToken (
    url: string, scriptHash: string, address?: string): Promise<object>

  export function doTransferToken (
    net: string,
    scriptHash: string,
    fromWif: string,
    toAddress: string,
    transferAmount: number,
    gasCost?: number,
    signingFunction?: (
      unsigned: Transaction, publicKey: string) => Transaction
  ): Promise<RPCResponse>
}

// switch
export function setApiSwitch (newSetting: number): void

export function setSwitchFreeze (newSetting: boolean): void

export interface semantic {
  get: {
    price: (coin?: string, currency?: string) => Promise<number>
    prices: (coins?: string[], currency?: string) => Promise<object>
    balance: (net: string, address: string) => Promise<Balance>
    claims: (net: string, address: string) => Promise<Claims>
    transactionHistory: (net: string, address: string) => Promise<History>
    tokenBalance: (
      net: string,
      scriptHash: string
    ) => Promise<{ name: string, symbol: string, decimals: number, totalSupply: number }>
    tokenInfo: (
      net: string,
      scriptHash: string
    ) => Promise<{ name: string, symbol: string, decimals: number, totalSupply: number }>
  }
  do: {
    sendAsset: (
      net: string,
      toAddress: string,
      from: string,
      assetAmounts: AssetAmounts
    ) => Promise<RPCResponse>
    claimAllGas: (
      net: string,
      privateKey: string
    ) => Promise<RPCResponse>
    mintTokens: (
      net: string,
      scriptHash: string,
      fromWif: string,
      neo: number,
      gasCost: number
    ) => Promise<RPCResponse>
  }
  sendAsset: (config: apiConfig) => apiConfig
  claimGas: (config: apiConfig) => apiConfig
  doInvoke: (config: apiConfig) => apiConfig
}

