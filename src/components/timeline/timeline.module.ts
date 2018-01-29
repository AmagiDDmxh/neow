import { NgModule } from '@angular/core'
import { IonicModule } from 'ionic-angular'
import {
  TimelineComponent,
  TimelineItemComponent,
  TimelineTimeComponent
} from './timeline'

const COMPONENTS = [
  TimelineComponent,
  TimelineItemComponent,
  TimelineTimeComponent
]

@NgModule({
  declarations: COMPONENTS,
  imports: [IonicModule],
  exports: COMPONENTS
})
export class TimelineComponentModule {}
