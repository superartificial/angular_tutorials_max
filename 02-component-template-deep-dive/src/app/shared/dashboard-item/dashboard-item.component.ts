import {Component, input} from '@angular/core';
import {Image} from "../util.model";

@Component({
  selector: 'app-dashboard-item',
  standalone: true,
  imports: [],
  templateUrl: './dashboard-item.component.html',
  styleUrl: './dashboard-item.component.css'
})
export class DashboardItemComponent {
  title = input<string>('Default Title');
  headerImage = input<Image>();
  summary = input<string>();
}
