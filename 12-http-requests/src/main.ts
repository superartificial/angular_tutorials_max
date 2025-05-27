import {bootstrapApplication} from '@angular/platform-browser';

import {AppComponent} from './app/app.component';
import {HttpEventType, HttpHandlerFn, HttpRequest, provideHttpClient, withInterceptors} from "@angular/common/http";
import {tap} from "rxjs";

// could be in any file - note in older angular versions interceptors were created as classes, not functions
function loggingInterceptor(request: HttpRequest<unknown>, next: HttpHandlerFn) {
  // const req = request.clone({
  //   headers: request.headers.set('X-DEBUG', 'TESTING')
  // });
  console.log('outgoing');
  console.log(request);
  return next(request).pipe(
    tap({
      next: event => {
        if (event.type === HttpEventType.Response) {
          console.log(`incoming response: ${event.status} // ${event.body}`);
        }
      }
    })
  );
}

bootstrapApplication(AppComponent, {
  providers: [provideHttpClient(
    withInterceptors([loggingInterceptor])
  )]
}).catch((err) => console.error(err));
