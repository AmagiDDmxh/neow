import { NgModule } from '@angular/core'
import { IonicPageModule } from 'ionic-angular'
import { PaymentQRCodePage } from './payment-qrcode'
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode'


@NgModule({
  declarations: [PaymentQRCodePage],
  imports: [
    IonicPageModule.forChild(PaymentQRCodePage),
    NgxQRCodeModule
  ],
  exports: [PaymentQRCodePage]
})
export class PaymentQRCodeModule {}