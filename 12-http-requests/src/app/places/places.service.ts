import {inject, Injectable, signal} from '@angular/core';

import {Place} from './place.model';
import {catchError, map, Observable, tap, throwError} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {ErrorService} from "../shared/error.service";

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  private userPlaces = signal<Place[]>([]);
  private httpClient = inject(HttpClient);
  private errorService = inject(ErrorService);

  loadedUserPlaces = this.userPlaces.asReadonly();

  loadAvailablePlaces() {
    return this.fetchPlaces(
      'http://localhost:3000/places',
      'Failed to fetch available places');
  }

  loadUserPlaces() {
    return this.fetchPlaces(
      'http://localhost:3000/user-places',
      'Failed to fetch user places')
      .pipe(tap({  // tap lets you execute code as you would in subscribe, but without subscribing, takes observer object similar to subscribe (note it is deprecated)
        next: (userPlaces) => {
          this.userPlaces.set(userPlaces)
        }
      }));
  }

  addPlaceToUserPlaces(place: Place): Observable<any> {
    const prevPlaces = this.userPlaces();
    if (!prevPlaces.some((p) => p.id === place.id)) {
      this.userPlaces.set([...prevPlaces, place]);
    }
    // this.userPlaces.update(prevPlaces => [...prevPlaces, place]);
    return this.httpClient.put(`http://localhost:3000/user-places/`,
      {placeId: place.id}
    ).pipe(
      catchError((error) => {
        this.userPlaces.set(prevPlaces);
        this.errorService.showError('Failed to add place');
        return throwError(() => new Error('Failed to add place'));
      })
    );
  }

  removeUserPlace(place: Place) {
    const prevPlaces = this.userPlaces();
    if (prevPlaces.some((p) => p.id === place.id)) {
      this.userPlaces.set(prevPlaces.filter((p) => p.id !== place.id));
    }

    return this.httpClient.delete(`http://localhost:3000/user-places/${place.id}`).pipe(
      catchError((error) => {
        this.userPlaces.set(prevPlaces);
        this.errorService.showError('Failed to delete place');
        return throwError(() => new Error('Failed to delete place'));
      })
    );

  }

  fetchPlaces(url: string, errorMessage: string) {
    return this.httpClient.get<{ places: Place[] }>(url
      //   , {
      //   // observe: 'response' // makes it return the full response, not just the body as by default
      //   observe: 'events' // first get event to show request was sent, then the response
      // }
    )
      .pipe(
        map((resData) => resData.places),
        catchError((error) => {
          console.log(error);
          return throwError(() => new Error(errorMessage));
        })
      );
  }
}
