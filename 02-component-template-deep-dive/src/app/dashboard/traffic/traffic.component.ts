import { Component } from '@angular/core';
import {DashboardItemComponent} from "../../shared/dashboard-item/dashboard-item.component";
import {Image} from "../../shared/util.model";

@Component({
  selector: 'app-traffic',
  standalone: true,
  imports: [
    DashboardItemComponent
  ],
  templateUrl: './traffic.component.html',
  styleUrl: './traffic.component.css'
})
export class TrafficComponent {
  headerImage: Image = {
    src: 'globe.png',
    alt: 'radio waves'
  };

  dummyTrafficData = [
    {
      id: 'd1',
      value: 433,
    },
    {
      id: 'd2',
      value: 260,
    },
    {
      id: 'd3',
      value: 290,
    },
    {
      id: 'd4',
      value: 410,
    },
    {
      id: 'd5',
      value: 397,
    },
    {
      id: 'd6',
      value: 488,
    },
    {
      id: 'd47',
      value: 589,
    },
  ];
  maxTraffic = Math.max(...this.dummyTrafficData.map((data) => data.value));
}
