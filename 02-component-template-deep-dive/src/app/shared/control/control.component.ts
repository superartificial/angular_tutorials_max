import {
  Component,
  HostListener,
  input,
  ViewEncapsulation,
  inject,
  ElementRef,
  ContentChild,
  contentChild, AfterContentInit, afterRender, afterNextRender
} from '@angular/core';

@Component({
  selector: 'app-control',
  standalone: true,
  imports: [],
  templateUrl: './control.component.html',
  styleUrl: './control.component.css',
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'control',
    '(click)': 'onClicked()'
  }
})
export class ControlComponent implements AfterContentInit {

  // @ContentChild('input') private control?: ElementRef<HTMLInputElement | HTMLTextAreaElement>;

  private control = contentChild<ElementRef<HTMLInputElement | HTMLTextAreaElement>>('input');

  label = input.required();
  private el = inject(ElementRef);

  constructor() {
    afterRender(() => {
      console.log('after render');
    });

    afterNextRender(() => {
      console.log('after next render');
    });

  }

  // @HostListener('click') onClick() {
  //   console.log('clicked 2');
  // }

  ngAfterContentInit() {
    console.log(this.control);
  }

  onClicked() {
    console.log('clicked');
    // console.log(this.el);
    console.log(this.control());
  }

}
