import {
    inject,
    fakeAsync,
    tick,
    TestBed,
    async
  } from '@angular/core/testing';  
import { WalletProvider } from "./wallet.provider";
import { wallet } from '../libs/neon-js'
import { HttpClient } from '@angular/common/http'
import { File } from '@ionic-native/file'
import { FileMock } from '@ionic-native-mocks/file';

import { Platform } from 'ionic-angular'
import { HttpClientModule } from '@angular/common/http';

describe('Test wallet.provider', function() {    
    let oldFormatAccount = {
        address:"AQFocS8Zcgz6E84UrZh7rx8ru4TJkCyspi",
        publicKey:"04266056c11524a90c81ec3543f5e37e6a946bc647ffc9b80ef09d0fe65f047ed973c4e3ee6e2578023ae53c22981a2b2824104361e9e913c164bdc3fdd411f31d",
        publicKeyCompressed:"03266056c11524a90c81ec3543f5e37e6a946bc647ffc9b80ef09d0fe65f047ed9",
        privateKeyEncrypted:"U2FsdGVkX19N6TvZxrrYZjMPBz6VVFmA8b1Tb/3MosJfZxkY/hbdS+E95AjnorXiU62UJ6rGJtSvVzKilRB7EQwCEwuxWpeCj46IvNnpe1GvpBd/7zE0kvfw/I05vXDO"
    }
    const pwd = "123456789"

  beforeEach( async(() => {
    TestBed.configureTestingModule({
        imports: [HttpClientModule],
      providers: [
        WalletProvider,
        HttpClient,
        {provide: File, useClass: FileMock}, 
        Platform,
      ]
    })
    .compileComponents();
  }));

    it('test have an account', 
        inject([WalletProvider], (wp: WalletProvider) => {
            expect(wp.haveAnAccount()).toBe(false);
            wp.initWallet()

            expect(wp.haveAnAccount()).toBe(true);
            wp.writeWalletFile();

            wp.readWallet().then((walletStr: string) => {
                // const walletJSON = JSON.parse(walletStr)
                // this.wallet = walletJSON
                console.log("content from txt file: "+walletStr)
              })
        })
    ); 
 
    it('test ola format account', 
        inject([WalletProvider], (wp: WalletProvider) => {
            expect(wp.haveAnAccount()).toBe(false);

            wp.upgradeAndAddToAccount(oldFormatAccount, pwd).then((res: boolean) => {
                expect(wp.haveAnAccount()).toBe(true);
            })
    }));
});
