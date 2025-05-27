import {Component, DestroyRef, inject, OnInit, signal} from '@angular/core';

import {Place} from '../place.model';
import {PlacesComponent} from '../places.component';
import {PlacesContainerComponent} from '../places-container/places-container.component';
import {HttpClient} from "@angular/common/http";
// import {catchError, map, throwError} from "rxjs";
import {PlacesService} from "../places.service";

@Component({
  selector: 'app-available-places',
  standalone: true,
  templateUrl: './available-places.component.html',
  styleUrl: './available-places.component.css',
  imports: [PlacesComponent, PlacesContainerComponent],
})
export class AvailablePlacesComponent implements OnInit {
  places = signal<Place[] | undefined>(undefined);
  isFetching = signal(false);
  error = signal('');
  private httpClient = inject(HttpClient);
  private destroyRef = inject(DestroyRef);
  private placesService = inject(PlacesService);

  ngOnInit(): void {
    this.isFetching.set(true);
    const placesSubscription = this.placesService.loadAvailablePlaces().subscribe(
      {
        next: (places) => {
          // console.log(response.body?.places);
          // console.log('event',event)
          console.log(places);
          this.places.set(places);
        },
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

  onSelectPlace(selectedPlace: Place) {
    const subscription = this.placesService.addPlaceToUserPlaces(selectedPlace).subscribe({
      next: (resData) => console.log(resData)
    });
    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }
}
