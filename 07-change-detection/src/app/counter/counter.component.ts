import {ChangeDetectionStrategy, Component, inject, NgZone, OnInit, signal} from '@angular/core';

import { InfoMessageComponent } from '../info-message/info-message.component';

@Component({
  selector: 'app-counter',
  standalone: true,
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.css',
  imports: [InfoMessageComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CounterComponent implements OnInit {
  private zone = inject(NgZone);

  ngOnInit(): void {
    setTimeout(() => {
      this.count.set(0);
    },2000);

    this.zone.runOutsideAngular(() => {
      setTimeout(() => {
        console.log('something');
      },3000);
    })


  }

  count = signal(0); // note we would need to use update() instead of set() if deriving from the previous value

  get debugOutput() {
    console.log('[Counter] "debugOutput" binding re-evaluated.');
    return 'Counter Component Debug Output';
  }

  onDecrement() {
    this.count.update((prevCount) => prevCount - 1);
  }

  onIncrement() {
    this.count.update((prevCount) => prevCount + 1);
  }
}
