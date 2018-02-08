import { NgModule } from '@angular/core'
import { IonicPageModule } from 'ionic-angular'
import { MarketsPage } from './markets'
import { MarketDetailPage } from './market-detail/market-detail'

const COMPONENTS = [
	MarketsPage,
  MarketDetailPage
]

@NgModule({
	declarations: COMPONENTS,
	imports: [
		IonicPageModule.forChild(MarketsPage),
	],
	entryComponents: COMPONENTS,
	exports: COMPONENTS
})
export class MarketsPageModule {}
