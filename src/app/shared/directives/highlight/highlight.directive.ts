import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {

  // Modifica como se comporta nuestro elemento
  // Y modificar un elemento del DOM
  constructor(
    element: ElementRef
  ) {
    element.nativeElement.style.backgroundColor = 'red';
  }

}
