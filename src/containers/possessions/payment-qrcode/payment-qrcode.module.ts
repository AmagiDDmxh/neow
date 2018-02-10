import { NgModule } from '@angular/core'
import { IonicPageModule } from 'ionic-angular'
import { PaymentQRCodePage } from './payment-qrcode'
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode'

const COMPONENT = [PaymentQRCodePage]

@NgModule({
  declarations: COMPONENT,
  imports: [
    IonicPageModule.forChild(PaymentQRCodePage),
    NgxQRCodeModule
  ],
  exports: COMPONENT
})
export class PaymentQRCodeModule {}