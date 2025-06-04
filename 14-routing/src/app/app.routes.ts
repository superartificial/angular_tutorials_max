import {CanMatchFn, RedirectCommand, Router, Routes} from "@angular/router";
import {NoTaskComponent} from "./tasks/no-task/no-task.component";
import {UserTasksComponent, resolveUserName, resolveTitle} from "./users/user-tasks/user-tasks.component";
import {NotFoundComponent} from "./not-found/not-found.component";
import {routes as userRoutes } from "./users/users.routes";
import {inject} from "@angular/core";

const dummyCanMatch: CanMatchFn = (route,segments) => {
  const router = inject(Router);
  const shouldGetAccess = Math.random() > 0.1;
  if(shouldGetAccess) {
    return true;
  }
  return new RedirectCommand( router.parseUrl('/unauthorized') );
}

export const routes: Routes = [
  { path: '', component: NoTaskComponent, title: 'No task' },
  {
    path: 'users/:userId',
    component: UserTasksComponent,
    children: userRoutes,
    canMatch: [dummyCanMatch], // usually use instead of canActivate in modern angular apps
    title: resolveTitle,
    data: {
      message: 'Hello from user'
    },
    resolve:
      {
        userName: resolveUserName
      }
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];
