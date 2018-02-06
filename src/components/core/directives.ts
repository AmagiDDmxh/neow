import { Directive, ElementRef, EventEmitter, OnDestroy, OnInit, Output, Renderer2 } from '@angular/core'

@Directive({
  selector: '[abort.stop], [beforeinput.stop], [blur.stop], [click.stop], [compositionstart.stop], [compositionupdate.stop], [compositionend.stop], [dblclick.stop], [error.stop], [focus.stop], [focusin.stop], [focusout.stop], [input.stop], [keydown.stop], [keypress.stop], [keyup.stop], [load.stop], [mousedown.stop], [mouseenter.stop], [mouseleave.stop], [mousemove.stop], [mouseout.stop], [mouseover.stop], [mouseup.stop], [resize.stop], [scroll.stop], [select.stop], [unload.stop], [wheel.stop]'
})
export class StopPropagationDirective implements OnInit, OnDestroy {
  unSubscriber
  @Output('click.stop') stopPropEvent = new EventEmitter()

  constructor (private renderer: Renderer2, private element: ElementRef) { }

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
