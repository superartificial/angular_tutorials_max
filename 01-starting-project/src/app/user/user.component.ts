import {Component, computed, EventEmitter, Input, input, output, Output} from '@angular/core';
import {type User} from "./user.model";
import {CardComponent} from "../tasks/shared/card/card.component";

// type User = { name: string; avatar: string, id: string }

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    CardComponent
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  // @Input({required: true}) avatar!: string;
  // @Input({required: true}) name!: string;
  // @Input({required: true}) id!: string;
  // avatar = input.required<string>();
  // name = input.required<string>();

  // @Output() select = new EventEmitter<string>();
  select = output<string>();

  @Input({required: true}) user!: User;
  @Input({required: true}) selected!: boolean

  imagePath = computed(() => {
    return 'assets/users/' + this.user.avatar;
  });

  selectUser() {
    this.select.emit(this.user.id);
  }
}
