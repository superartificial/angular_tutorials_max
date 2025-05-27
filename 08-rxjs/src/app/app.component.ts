import {Component, computed, DestroyRef, effect, inject, OnInit, signal} from '@angular/core';
import {interval, map, Observable} from "rxjs";
import {toObservable, toSignal} from "@angular/core/rxjs-interop";

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  // interval = signal(0);
  // doubleInterval = computed(() => this.interval() * 2);
  private destroyRef = inject(DestroyRef);
  clickCount = signal(0);
  clickCount$ = toObservable(this.clickCount);

  interval$ = interval(1000);
  // note that observables do not necessarily have initial values, but signals do (even if undefined)
  intervalSignal = toSignal(this.interval$, { initialValue: 0 });

  customInterval$ = new Observable<{ message: string }>((subscriber) => {
    let timesExecuted = 0;
    const interval = setInterval(() => {
      // subscriber.error();
      if(timesExecuted > 3) {
        clearInterval(interval);
        subscriber.complete();
        return;
      }
      console.log('Emitting interval');
      subscriber.next({message: 'New Value' });
      timesExecuted++;
    },2000);
  });

  constructor() {
    effect(() => { // effect runs every time a signal it contains updates
      console.log(`clickCount effect ${this.clickCount()}`);
    })
  }

    ngOnInit(): void {



      // setInterval(() => {
      //   this.interval.update(prevIntNumber => prevIntNumber + 1);
      // },1000)

      //   const myInterval =  interval(1000).pipe(
      //     map((val)=> val * 2)
      //   ).subscribe({
      //     next: value => console.log(value),
      //     complete: () => console.log('complete'), // won't happen here,
      //     error: error => console.log(error), // also won't happen
      //   });
      // this.destroyRef.onDestroy(() => {
      //   myInterval.unsubscribe();
      // })

      const subscription = this.clickCount$.subscribe( {
        next: (val: number) => {
          console.log(`clickCount ${this.clickCount()}`);
        }
      });
      this.destroyRef.onDestroy(() => {
        subscription.unsubscribe();
      });

      this.customInterval$.subscribe({ // subscription would need to be cleaned up
        next: (val) => console.log(val),
        complete: () => console.log('completed'),
      })

    }

  onClick() {
    this.clickCount.update(prevCount => prevCount + 1);
  }
}
