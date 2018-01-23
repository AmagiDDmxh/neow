import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PossessionPage } from "./possessions";
import { PossessionDetailPageModule } from "./possession-detail/possession-detail.module";
import { AddressCollapsePipe } from "../../pipes/address-collapse/address-collapse.pipe";

@NgModule({
  declarations: [
    PossessionPage,
    AddressCollapsePipe
  ],
  imports: [
    PossessionDetailPageModule,
    IonicPageModule.forChild(PossessionPage),
  ],
})
export class PossessionsPageModule {}
