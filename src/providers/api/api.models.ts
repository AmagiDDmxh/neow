export interface TransferPostBody {
  dest: string
  source: string
  amount: string
  assetId: string
}

export interface TransferResBody {
  result: boolean
  error?: string
  transaction?: string
}

export interface SignPostBody {
  publicKey: string
  signature
  transaction
}

export interface SignResBody {
  result: boolean
  error?: string
  txid?: string
}