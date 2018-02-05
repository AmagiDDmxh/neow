import { NgModule } from '@angular/core'
import { SlideCard } from './slide-card'
import { SlideCardItem } from './slide-card-item'
import { StopPropagationDirective } from '../directives/directives'
import { CommonModule } from '@angular/common'

const COMPONENTS = [
  SlideCard,
  SlideCardItem,
  StopPropagationDirective
]

@NgModule({
  imports: [CommonModule],
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class SlideCardModule {}