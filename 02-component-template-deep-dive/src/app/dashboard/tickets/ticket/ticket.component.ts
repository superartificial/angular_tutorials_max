import {Component, EventEmitter, input, Input, output, Output, signal} from '@angular/core';
import {Ticket} from "../ticket.model";

@Component({
  selector: 'app-ticket',
  standalone: true,
  imports: [],
  templateUrl: './ticket.component.html',
  styleUrl: './ticket.component.css'
})
export class TicketComponent {
  // @Output() close = new EventEmitter<unknown>();
  close = output<void>();

  ticket = input.required<Ticket>();
  detailsVisible = signal(false);

  onToggleDetails() {
    // this.detailsVisible.set(!this.detailsVisible());
    this.detailsVisible.update(wasVisible => !wasVisible);
  }

  onMarkComplete() {
    this.close.emit();
  }

}
