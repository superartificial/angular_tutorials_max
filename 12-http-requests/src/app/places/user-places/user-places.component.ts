import {Component, DestroyRef, inject, signal} from '@angular/core';

import {PlacesContainerComponent} from '../places-container/places-container.component';
import {PlacesComponent} from '../places.component';
import {Place} from "../place.model";
import {catchError, map, throwError} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {PlacesService} from "../places.service";

@Component({
  selector: 'app-user-places',
  standalone: true,
  templateUrl: './user-places.component.html',
  styleUrl: './user-places.component.css',
  imports: [PlacesContainerComponent, PlacesComponent],
})
export class UserPlacesComponent {

  isFetching = signal(false);
  error = signal('');
  private destroyRef = inject(DestroyRef);
  private placesService = inject(PlacesService);
  places = this.placesService.loadedUserPlaces;

  ngOnInit(): void {
    this.isFetching.set(true);
    const placesSubscription = this.placesService.loadUserPlaces().subscribe(
      {
        // next: (places) => { // replaced with tap in the service
        //   // console.log(response.body?.places);
        //   // console.log('event',event)
        //   console.log(places);
        //   this.places.set(places);
        // },
        error: (err: Error) => {
          this.error.set(err.message)
        },
        complete: () => {
          this.isFetching.set(false);
        }
      }
    );
    // this observable only returns one value so not so necessary to unsubscribe, but still considered good practice
    this.destroyRef.onDestroy(() => placesSubscription.unsubscribe())

  }

  public onRemove(place: Place): void {
    const subscription = this.placesService.removeUserPlace(place).subscribe();
    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }

}
