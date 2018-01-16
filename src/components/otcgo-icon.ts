import { Directive } from "@angular/core";
@Directive({
  selector: 'otcgo-icon',
  host: {
    'role': 'img'
  }
})
export class Icon {
  constructor () {

  }
}
