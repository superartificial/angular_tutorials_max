import {Component, DestroyRef, effect, inject, OnDestroy, OnInit, signal} from '@angular/core';
import {DashboardItemComponent} from "../../shared/dashboard-item/dashboard-item.component";
import {Image} from "../../shared/util.model";
import {interval} from "rxjs";

@Component({
  selector: 'app-status',
  standalone: true,
  imports: [
    DashboardItemComponent
  ],
  templateUrl: './status.component.html',
  styleUrl: './status.component.css'
})
export class StatusComponent implements OnInit {
  // export class StatusComponent implements OnInit, OnDestroy {
  headerImage: Image = {
    src: 'status.png',
    alt: 'radio waves'
  };
  currentStatus = signal<'online' | 'offline' | 'unknown'>('offline');
  private destroyRef = inject(DestroyRef);
  // private interval: NodeJS.Timeout | undefined;
  // private interval: ReturnType<typeof setInterval> | undefined; // specifies the type will be that return type of setInterval

  constructor() {
    // If you use a single in effect, angular will set up a subscription for signal changes. It is also cleaned up automatically.
    effect(() => {
      console.log(this.currentStatus());
    });
  }

  ngOnInit() {
    // this.interval = setInterval(() => {
    const interval = setInterval(() => {
      const rnd = Math.random();
      if (rnd < 0.5) {
        this.currentStatus.set('online');
      } else if (rnd < 0.9) {
        this.currentStatus.set('offline');
      } else {
        this.currentStatus.set('unknown');
      }
      console.log(
        `Status changed to ${this.currentStatus}`
      )
    }, 5000);
    this.destroyRef.onDestroy(() => {
      clearInterval(interval);
    })
  }

  // ngOnDestroy() {
  //   clearTimeout(this.interval);
  //   console.log('Status destroyed');
  // }

}
