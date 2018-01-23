import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateWalletPage } from './create-wallet';
import { BackupWalletPage } from './backup-wallet/backup-wallet'

@NgModule({
  declarations: [
    CreateWalletPage,
    BackupWalletPage
  ],
  imports: [
    IonicPageModule.forChild(CreateWalletPage),
  ],
})
export class CreateWalletPageModule {}
