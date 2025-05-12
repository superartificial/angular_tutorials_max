import {Component, computed, inject, OnInit, signal} from '@angular/core';

import { TaskItemComponent } from './task-item/task-item.component';
import {TaskService} from "../task.service";
import {Task} from "../task.model";

@Component({
  selector: 'app-tasks-list',
  standalone: true,
  templateUrl: './tasks-list.component.html',
  styleUrl: './tasks-list.component.css',
  imports: [TaskItemComponent],
})
export class TasksListComponent implements OnInit{
  private selectedFilter = signal<string>('all');

  private tasksService = inject(TaskService)

  // will recalculate whenever either signal changes (selectedFilter, allTasks)
  tasks = computed(() => {
    switch (this.selectedFilter()) {
      case 'open':
        return this.tasksService.allTasks().filter( (task) => task.status === 'OPEN' );
      case 'in_progress':
        return this.tasksService.allTasks().filter( (task) => task.status === 'IN_PROGRESS' );
      case 'done':
        return this.tasksService.allTasks().filter( (task) => task.status === 'DONE' );
      default:
        return this.tasksService.allTasks();

    }
  });

  ngOnInit() {
    this.loadTasks();
  }

  private loadTasks() {
    // this.tasks = this.tasksService.getTasks(this.selectedFilter());
  }

  onChangeTasksFilter(filterVal: string) {
    this.selectedFilter.set(filterVal);
    this.loadTasks();
  }
}
