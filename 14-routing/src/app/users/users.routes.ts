import { Routes } from '@angular/router';

import { TasksComponent, resolveUserTasks } from '../tasks/tasks.component';
import {canleaveEditPage, NewTaskComponent} from '../tasks/new-task/new-task.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'tasks',
    pathMatch: 'full',
    title: 'Tasks',
  },
  {
    path: 'tasks', // <your-domain>/users/<uid>/tasks
    component: TasksComponent,
    // runGuardsAndResolvers: 'paramsOrQueryParamsChange', // needed to ensure resolver runs when query params are changed
    runGuardsAndResolvers: 'always',
    resolve: {
      userTasks: resolveUserTasks,
    },
  },
  {
    path: 'tasks/new',
    component: NewTaskComponent,
    canDeactivate: [canleaveEditPage]
  },
];
