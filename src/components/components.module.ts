import { NgModule } from '@angular/core';
import { TimelineComponentModule } from './timeline/timeline.module'
import { SendModalComponentModule } from './modals/send-modal.module'

const MODULES = [
	TimelineComponentModule,
  SendModalComponentModule
]

@NgModule({
	declarations: [],
	imports: MODULES,
	exports: MODULES
})
export class ComponentsModule {}
