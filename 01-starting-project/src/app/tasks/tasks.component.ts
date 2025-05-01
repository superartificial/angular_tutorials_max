import {Component, Input} from '@angular/core';
import {TaskComponent} from "./task/task.component";
import {AddTaskComponent} from "./add-task/add-task.component";
import {type TaskRequestDto} from "./add-task/task-request-dto.model";
import {type Task} from "./task/task.model";
import {TasksService} from "./tasks.service";

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [
    TaskComponent,
    AddTaskComponent
  ],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent {
  @Input({required: true}) userId!: string;
  @Input({required: true}) name!: string;
  addTaskActive: boolean = false;

  constructor(private tasksService: TasksService) {
  }

  get selectedUserTasks() {
    return this.tasksService.getUserTasks(this.userId);
  }

  onShowAddForm() {
    this.addTaskActive = true;
  }

  onCloseAddTask() {
    this.addTaskActive = false;
  }

}
