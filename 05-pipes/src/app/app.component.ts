import { Component } from '@angular/core';
import {DatePipe, DecimalPipe} from "@angular/common";
import {TemperaturePipe} from "./temperature.pipe";
import {SortPipe} from "./sort.pipe";

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  imports: [
    DatePipe,
    DecimalPipe,
    TemperaturePipe,
    SortPipe
  ]
})
export class AppComponent {
  currentDate = new Date();
  currentTemperaturs = {
    berlin: 4.2749812,
    newYork: 18.1214,
    paris: 72.1209001,
    chicago: 65.0775238,
  };

  historicTemperatures = [
    25, 37, 19, -4, 28, 21, 19, 28, 33, 31, 9, 11, 5, -12, -5,
  ];

  // In this case it may be better not to use a pipe, and sort incoming data on load

  onReset(index: number) {
    this.historicTemperatures[index] = 18;
    // pipes don't update unless a value changes, with an array being a pointer in memory updating internal values does not mean the array itself changes
    // const newTemps = [...this.historicTemperatures];
    // newTemps[index] = 18;
    // this.historicTemperatures = newTemps;
  }

}
