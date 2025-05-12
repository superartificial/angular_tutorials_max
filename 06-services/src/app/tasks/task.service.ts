import {Injectable, inject, signal} from '@angular/core';
import {LoggingService} from '../logging.service';
import {Task, TaskStatus} from "./task.model";

// service can be injected in main.ts, providers array
// can also be injected into components with element injector - see tasks.component.ts

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  // note: cannot use element injector in a service, because it is not a component and not part of the dom
  private loggingService = inject(LoggingService);

  private tasks = signal<Task[]>( [
    { title: "Do Dishes", description: "Wash them dishes", id: "1", status: "OPEN" },
    { title: "Wash cat", description: "Get some scratches", id: "2", status: "IN_PROGRESS" },
    { title: "Make Dinner", description: "Make the food", id: "3", status: "OPEN" },
    { title: "Paint Ceiling", description: "Put paint on upper surface of room", id: "1", status: "OPEN" }
  ]);

  // tasks not directly modifiable by components
  allTasks = this.tasks.asReadonly();

  addTask(taskRequest: { title: string; description: string;}) {
    const newTask = {
      ...taskRequest,
      id: Math.random().toString(),
      status: 'OPEN' as TaskStatus,
    };
    // when updating arrays it is usually best to create a new array rather than mutate the old one
    this.tasks.update( (oldTasks) => [...oldTasks, newTask] );
    this.loggingService.log(`Added task: ${newTask.title}`);
  }

  updateTaskStatus(taskId: string, status: TaskStatus) {
    this.tasks.update( (oldTasks) =>
      oldTasks.map( (task) =>
        (task.id === taskId) ? { ...task, status } :task
      )
    );
    this.loggingService.log(`Updated task status: ${taskId} to ${status}`);
  }

}
