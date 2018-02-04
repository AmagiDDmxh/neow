import { Directive, ElementRef, EventEmitter, OnDestroy, OnInit, Output, Renderer2 } from '@angular/core'

const documentEvents = ["abort","beforeinput","blur","click","compositionstart","compositionupdate","compositionend","dblclick","error","focus","focusin","focusout","input","keydown","keypress","keyup","load","mousedown","mouseenter","mouseleave","mousemove","mouseout","mouseover","mouseup","resize","scroll","select","unload","wheel"]

const createEventSelectors = (suga) => documentEvents.map(event => `[${event}.${suga}]`).join(', ')

@Directive({
  selector: createEventSelectors('stop')
})
export class StopPropagationDirective implements OnInit, OnDestroy {
  unSubscriber
  @Output('click.stop') stopPropEvent = new EventEmitter()

  constructor (private renderer: Renderer2, private element: ElementRef) {}

  ngOnInit () {
    this.unSubscriber = this.renderer.listen(this.element.nativeElement, 'click', event => {
      event.stopPropagation()
      this.stopPropEvent.emit(event)
    })
  }

  ngOnDestroy () {
    this.unSubscriber()
  }
}
