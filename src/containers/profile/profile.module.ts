import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfilePage } from './profile';

const COMPONENTS = [
  ProfilePage,
]

@NgModule({
  declarations: COMPONENTS,
  imports: [
    IonicPageModule.forChild(ProfilePage),
  ],
  entryComponents: COMPONENTS
})
export class ProfilePageModule {}
