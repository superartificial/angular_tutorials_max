import { Component } from '@angular/core';
import {HeaderComponent} from "./header/header.component";
import {StatusComponent} from "./dashboard/status/status.component";
import {DashboardItemComponent} from "./shared/dashboard-item/dashboard-item.component";
import {TrafficComponent} from "./dashboard/traffic/traffic.component";
import {TicketsComponent} from "./dashboard/tickets/tickets.component";

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  imports: [
    HeaderComponent,
    StatusComponent,
    DashboardItemComponent,
    TrafficComponent,
    TicketsComponent
  ]
})
export class AppComponent {

}
