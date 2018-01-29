import { NgModule } from '@angular/core'
import { IonicPageModule } from 'ionic-angular'
import { ProfilePage } from './profile'
// import { ManageWalletPageModule } from
// './manage-wallet/manage-wallet.module' import {
// AddWalletPageModule } from
// './manage-wallet/add-wallet/add-wallet.module'

import { AddWalletPage } from './manage-wallet/add-wallet/add-wallet'
import { ImportFilePage } from './manage-wallet/add-wallet/import-file/import-file'
import { ImportPrivateKeyPage } from './manage-wallet/add-wallet/import-private-key/import-private-key'
import { ImportObservationPage } from './manage-wallet/add-wallet/import-observation/import-observation'
import { ImportSuccessPage } from './manage-wallet/add-wallet/import-success/import-success'

import { ManageWalletPage } from './manage-wallet/manage-wallet'

const COMPONENTS = [
  ProfilePage,
  AddWalletPage,
  ImportFilePage,
  ImportPrivateKeyPage,
  ImportObservationPage,
  ImportSuccessPage,
  ManageWalletPage
]

@NgModule({
  declarations: COMPONENTS,
  entryComponents: COMPONENTS,
  exports: COMPONENTS,
  imports: [
    IonicPageModule.forChild(ProfilePage)
  ],
})
export class ProfilePageModule { }
