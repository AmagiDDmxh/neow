import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfilePage } from './profile';
// import { ManageWalletPageModule } from './manage-wallet/manage-wallet.module'
// import { AddWalletPageModule } from './manage-wallet/add-wallet/add-wallet.module'

import { AddWalletPage } from './manage-wallet/add-wallet/add-wallet';
import { ImportFilePage } from './manage-wallet/add-wallet/import-file/import-file';
import { ImportPrivateKeyPage } from './manage-wallet/add-wallet/import-private-key/import-private-key'
import { ImportObservationPage } from './manage-wallet/add-wallet/import-observation/import-observation'
import { ImportSuccessPage } from './manage-wallet/add-wallet/import-success/import-success'

import { ManageWalletPage } from './manage-wallet/manage-wallet'

const COMPONENTS = [
  ProfilePage,
]

@NgModule({
  declarations: [
    ProfilePage,
    AddWalletPage,
    ImportFilePage,
    ImportPrivateKeyPage,
    ImportObservationPage,
    ImportSuccessPage,
    ManageWalletPage
  ],
  entryComponents: [
        AddWalletPage,
        ImportFilePage,
        ImportPrivateKeyPage,
        ImportObservationPage,
        ImportSuccessPage,
        ManageWalletPage
  ],
  imports: [
    // ManageWalletPageModule,
    // AddWalletPageModule,
    IonicPageModule.forChild(ProfilePage),

    // IonicPageModule.forChild(AddWalletPage),
    // IonicPageModule.forChild(ImportFilePage),
    // IonicPageModule.forChild(ImportPrivateKeyPage),
    // IonicPageModule.forChild(ImportObservationPage),
    // IonicPageModule.forChild(ImportSuccessPage),
    // IonicPageModule.forChild(ManageWalletPage),

  ],
  entryComponents: COMPONENTS
})
export class ProfilePageModule {}
