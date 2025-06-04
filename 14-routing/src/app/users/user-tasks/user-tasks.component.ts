import {Component, DestroyRef, inject, input, OnInit} from '@angular/core';
import {UsersService} from '../users.service';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterLink,
  RouterOutlet,
  RouterStateSnapshot
} from '@angular/router';

@Component({
  selector: 'app-user-tasks',
  standalone: true,
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css',
  imports: [
    RouterOutlet,
    RouterLink
  ]
})
export class UserTasksComponent implements OnInit {

  // userId = input.required<string>(); // need to make sure withComponentInputBinding is added in app.config.ts to support input binding for routes
  usersService = inject(UsersService);
  destroyRef = inject(DestroyRef);

  private activatedRoute = inject(ActivatedRoute);

  // userName = computed(() => this.usersService.users.find(user => user.id === this.userId())?.name);
  // userName: string = '';
  message = input.required<string>(); // gets data from route, need to have withComponentInputBinding in app.config.ts
  userName = input.required<string>();

  // ngOnInit(): void {
  //   console.log('input data', this.message())
  //   console.log(this.activatedRoute.snapshot.params);
  //   const subscription = this.activatedRoute.paramMap.subscribe({
  //     next: params => {
  //       console.log(params);
  //       this.userName = this.usersService.users.find(user => user.id === params.get("userId"))?.name || '';
  //     }
  //   });
  //   this.destroyRef.onDestroy(() => subscription.unsubscribe());
  // }

  // alternative way of getting route data
  ngOnInit(): void {
    this.activatedRoute.data.subscribe( {
      next: data => {
        console.log(data);
      }
    })
  }

}

export const resolveUserName:ResolveFn<string> = (
  activatedRoute: ActivatedRouteSnapshot,
  routerState: RouterStateSnapshot) => {
    const usersService = inject(UsersService);
    return usersService.users.find(user => user.id === activatedRoute.paramMap.get("userId"))?.name || ''
};

export const resolveTitle:ResolveFn<string> = (
  activatedRoute,
  routerState) => {
     return resolveUserName(activatedRoute, routerState) + ' tasks';
};
