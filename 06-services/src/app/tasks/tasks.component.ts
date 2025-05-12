import { Component } from '@angular/core';

import { NewTaskComponent } from './new-task/new-task.component';
import { TasksListComponent } from './tasks-list/tasks-list.component';
import {TaskService} from "./task.service";

@Component({
  selector: 'app-tasks',
  standalone: true,
  templateUrl: './tasks.component.html',
  imports: [NewTaskComponent, TasksListComponent],
  // element injector - all child components will have access to this service
  // note this means the service is only available to THIS tasks component and its children - if it is used elsewhere it will be a different instance with separate state / data
  // providers: [ TaskService ],
})
export class TasksComponent {


}
