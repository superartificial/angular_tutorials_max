import {Component, EventEmitter, Input, model, Output} from '@angular/core';

@Component({
  selector: 'app-rect',
  standalone: true,
  imports: [],
  templateUrl: './rect.component.html',
  styleUrl: './rect.component.css',
})
export class RectComponent {
  // @Input() size!: {width: string; height: string};
  // @Output() sizeChange = new EventEmitter<{width: string; height: string}>(); // name is important to create a 2 way bindable size property

  size = model.required<{width: string; height: string}>();

  onReset() {
    // this.sizeChange.emit({width: '200', height: '200'});
    this.size.set({ // could also use update
      width: '200',
      height: '100',
    })
  }
}
