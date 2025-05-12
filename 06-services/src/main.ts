import { bootstrapApplication } from '@angular/platform-browser';

import { AppComponent } from './app/app.component';
import {TaskService} from "./app/tasks/task.service";

// Providing the service here does not allow for tree shaking - will be included in the initial bundle whether used or not.
// bootstrapApplication(AppComponent,{
//   providers: [TaskService]
// }).catch((err) => console.error(err));

bootstrapApplication(AppComponent).catch((err) => console.error(err));
