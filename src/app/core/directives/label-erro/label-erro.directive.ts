import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appLabelErro]',
  standalone: true,
})
export class LabelErroDirective {
  constructor(elementRef: ElementRef) {
    elementRef.nativeElement.style.color = 'red';
    elementRef.nativeElement.style.fontWeight = '600';
    elementRef.nativeElement.style.fontSize = '12px';
  }
}
