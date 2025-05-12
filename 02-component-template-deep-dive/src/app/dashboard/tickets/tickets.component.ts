import {Component} from '@angular/core';
import {DashboardItemComponent} from "../../shared/dashboard-item/dashboard-item.component";
import {Image} from "../../shared/util.model";
import {NewTicketComponent} from "./new-ticket/new-ticket.component";
import {Ticket} from "./ticket.model";
import {TicketComponent} from "./ticket/ticket.component";

@Component({
  selector: 'app-tickets',
  standalone: true,
  imports: [
    DashboardItemComponent,
    NewTicketComponent,
    TicketComponent
  ],
  templateUrl: './tickets.component.html',
  styleUrl: './tickets.component.css'
})
export class TicketsComponent {
  headerImage: Image = {
    src: 'list.png',
    alt: 'radio waves'
  };

  tickets: Ticket[] = [];

  onAddTicket(ticketData: { title: string; text: string }) {
    const ticket: Ticket = {
      id: Math.random().toString(),
      title: ticketData.title,
      request: ticketData.text,
      status: 'open'
    }
    this.tickets.push(ticket);
  }

  onCloseTicket(id: string) {
    this.tickets = this.tickets.map((ticket) => {
      // if (ticket.id === id) {
      //   ticket.status = 'closed';
      // }
      // return ticket;
      // return ticket.id === id ? {...ticket, status: 'closed'} : ticket;
      if (ticket.id === id) {
        return {...ticket, status: 'closed'};
      }
      return ticket;
    });
  }
}
