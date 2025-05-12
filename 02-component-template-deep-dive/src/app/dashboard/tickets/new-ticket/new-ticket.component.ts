import {
  Component,
  ElementRef,
  ViewChild,
  ViewChildren,
  viewChild,
  AfterViewInit,
  OnInit,
  EventEmitter, Output, output
} from '@angular/core';
import {ButtonComponent} from "../../../shared/button/button.component";
import {ControlComponent} from "../../../shared/control/control.component";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-new-ticket',
  standalone: true,
  imports: [
    ButtonComponent,
    ControlComponent,
    FormsModule
  ],
  templateUrl: './new-ticket.component.html',
  styleUrl: './new-ticket.component.css'
})

export class NewTicketComponent implements AfterViewInit, OnInit {

  // @Output() add = new EventEmitter<{ title: string; text: string }>();
  add = output<{ title: string; text: string }>();
  enteredTitle = '';
  enteredText = '';

  @ViewChild(ButtonComponent) private buttonComponent?: ButtonComponent;
  @ViewChildren(ButtonComponent) private buttonComponents?: ButtonComponent[];

  @ViewChild('form') form?: ElementRef<HTMLFormElement>;
  // private form = viewChild.required<ElementRef<HTMLFormElement>>('form');

  // onSubmit(titleElement: HTMLInputElement, requestElement: HTMLTextAreaElement) {
  // onSubmit(title: string, ticketText: string, form: HTMLFormElement) {
  onSubmit() {
    // form.reset()
    // this.form()?.nativeElement.reset();
    // don't need check for value because we set required on ViewChild
    this.add.emit({title: this.enteredTitle, text: this.enteredText});
    this.enteredTitle = '';
    this.enteredText = '';
    // this.form?.nativeElement.reset();
  }

  // When using the viewChild function (that returns a signal), the referenced form IS available in ngOnInit
  ngOnInit() {
    console.log("on init");
    console.log(this.form?.nativeElement);
  }

  ngAfterViewInit() {
    console.log("after v i");
    console.log(this.form?.nativeElement);

  }

}
