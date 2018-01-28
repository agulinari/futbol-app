import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Player } from './model/player';
import { PlayerStats } from './model/player-stats';
import { PlayerEvolution } from './model/player-evolution';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable()
export class PlayerService {

  private playersUrl = 'api/players';

  constructor(private http: HttpClient) { }

  getPlayers(): Observable<Player[]> {
    return this.http.get<Player[]>(this.playersUrl)
      .pipe(
      catchError(this.handleError('getPlayers', []))
      );
  }

  getPlayer(id: number): Observable<Player> {
    const url = `${this.playersUrl}/${id}`;
    return this.http.get<Player>(url).pipe(
      catchError(this.handleError<Player>(`getPlayer id=${id}`))
    );
  }

  getStats(id: number): Observable<PlayerStats> {
    const url = `${this.playersUrl}/${id}/stats`;
    return this.http.get<PlayerStats>(url).pipe(
      catchError(this.handleError<PlayerStats>(`getStats id=${id}`))
    );
  }

  getEvolution(id: number): Observable<PlayerEvolution[]> {
    const url = `${this.playersUrl}/${id}/evolution`;
    return this.http.get<PlayerEvolution[]>(url).pipe(
      catchError(this.handleError<PlayerEvolution[]>(`getEvolution id=${id}`))
    );
  }

  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
