import { NgModule } from '@angular/core';
import { TimelineComponentModule } from './timeline/timeline.module'
import { SendModalComponentModule } from './modals/send-modal.module'
import { SlideCardModule } from './slide-card/slide-card-module'

const MODULES = [
	TimelineComponentModule,
	SendModalComponentModule,
    SlideCardModule
]

@NgModule({
	declarations: [],
	imports: MODULES,
	exports: MODULES
})
export class ComponentsModule {}
