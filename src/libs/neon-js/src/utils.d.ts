import { BigNumber } from 'bignumber.js'

export declare function ab2str (buf: ArrayBuffer): string

export declare function str2ab (str: string): ArrayBuffer

export declare function hexstring2ab (str: string): number[]

export declare function ab2hexstring (arr: ArrayBuffer): string

export declare function str2hexstring (str: string): string

export declare function hexstring2str (hexstring: string): string

export declare function int2hex (mNumber: number): string

export declare function num2hexstring (
  num: number, size: number, littleEndian?: boolean): string

export declare function num2fixed8 (num: number, size?: number): string

export declare function fixed82num (fixed8: string): number

export declare function num2VarInt (num: number): string

export declare function hexXor (str1: string, str2: string): string

export declare function reverseArray (arr: Array<number>): Uint8Array

export declare function reverseHex (hex: string): string

export declare class StringStream {
  public pter: 0
  public str: string

  constructor (str?: string)

  public isEmpty (): boolean

  public read (bytes: number): string

  public readVarBytes (): string

  public readVarInt (): string
}

export declare function hash160 (hex: string): string

export declare function hash256 (hex: string): string

export declare function sha256 (hex: string): string

export class Fixed8 extends BigNumber {

  public toHex (): string

  public toReverseHex (): string

  static fromHex (hex: string): Fixed8

  static fromReverseHex (hex: string): Fixed8
}


