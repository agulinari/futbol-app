import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Player } from './model/player';
import { PlayerStats } from './model/player-stats';
import { PlayerEvolution } from './model/player-evolution';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';


const PLAYERS = [
  {
    'id': 1,
    'photo': 'assets/img/3.png',
    'nickname': 'Pato',
    'firstname': 'Alejandro',
    'lastname': 'Sanchez',
    'dateofbirth': 'June 27, 2013',
    'position': 'Delantero',
    'height': 175,
    'weight': 75
  },
  {
    'id': 2,
    'photo': 'assets/img/2.png',
    'nickname': 'Guille',
    'firstname': 'Guillermo',
    'lastname': 'Maqueira',
    'dateofbirth': 'June 27, 2013',
    'position': 'Delantero',
    'height': 175,
    'weight': 75
  },
  {
    'id': 3,
    'photo': 'assets/img/1.png',
    'nickname': 'Picci',
    'firstname': 'Luis Emilio',
    'lastname': 'Piccinali',
    'dateofbirth': 'June 27, 2013',
    'position': 'Arquero',
    'height': 175,
    'weight': 75
  },
  {
    'id': 4,
    'photo': 'assets/img/13.png',
    'nickname': 'El Lina',
    'firstname': 'Agustin',
    'lastname': 'Linari',
    'dateofbirth': 'June 27, 2013',
    'position': 'Delantero',
    'height': 175,
    'weight': 75
  },
  {
    'id': 5,
    'photo': 'assets/img/14.png',
    'nickname': 'El Negro',
    'firstname': 'Juan Martin',
    'lastname': 'Criniti',
    'dateofbirth': 'June 27, 2013',
    'position': 'Defensor',
    'height': 175,
    'weight': 75
  },
  {
    'id': 6,
    'photo': 'assets/img/1.png',
    'nickname': 'Marianito',
    'firstname': 'Mariano',
    'lastname': 'Giacoletto',
    'dateofbirth': 'June 27, 2013',
    'position': 'Volante',
    'height': 175,
    'weight': 75
  }
];


const STATS = [
  {
    'id': 1,
    'attack': 70,
    'defense': 40,
    'vision': 20,
    'impact': 50,
    'physique': 55,
    'goals': 2,
    'assists': 4,
    'fouls': 3,
    'matches': 12
  },
  {
    'id': 2,
    'attack': 80,
    'defense': 50,
    'vision': 10,
    'impact': 60,
    'physique': 75,
    'goals': 7,
    'assists': 2,
    'fouls': 8,
    'matches': 11
  },
  {
    'id': 3,
    'attack': 30,
    'defense': 90,
    'vision': 60,
    'impact': 60,
    'physique': 85,
    'goals': 1,
    'assists': 7,
    'fouls': 8,
    'matches': 10
  },
  {
    'id': 4,
    'attack': 40,
    'defense': 40,
    'vision': 80,
    'impact': 50,
    'physique': 25,
    'goals': 6,
    'assists': 2,
    'fouls': 7,
    'matches': 11
  },
  {
    'id': 5,
    'attack': 40,
    'defense': 40,
    'vision': 80,
    'impact': 70,
    'physique': 25,
    'goals': 7,
    'assists': 1,
    'fouls': 8,
    'matches': 10
  },
  {
    'id': 6,
    'attack': 20,
    'defense': 90,
    'vision': 10,
    'impact': 60,
    'physique': 45,
    'goals': 1,
    'assists': 1,
    'fouls': 5,
    'matches': 10
  }
];

const EVOLUTION = [
  {
    'id': 1,
    'score': 7,
    'goals': 3,
    'matchdate': '02/01/2018'
  },
  {
    'id': 2,
    'score': 9,
    'goals': 6,
    'matchdate': '03/01/2018'
  },
  {
    'id': 3,
    'score': 2,
    'goals': 0,
    'matchdate': '04/01/2018'
  },
  {
    'id': 4,
    'score': 8,
    'goals': 2,
    'matchdate': '05/01/2018'
  },
  {
    'id': 5,
    'score': 5,
    'goals': 1,
    'matchdate': '06/01/2018'
  },
  {
    'id': 6,
    'score': 9,
    'goals': 6,
    'matchdate': '07/01/2018'
  },
  {
    'id': 7,
    'score': 6,
    'goals': 3,
    'matchdate': '08/01/2018'
  }
];

@Injectable()
export class PlayerService {

  private playersUrl = 'api/players';

  constructor(private http: HttpClient) { }

  getPlayers(): Observable<Player[]> {
    // return of(PLAYERS);
    return this.http.get<Player[]>(this.playersUrl)
      .pipe(
      catchError(this.handleError('getPlayers', []))
      );
  }

  getPlayer(id: number): Observable<Player> {
    // return of(PLAYERS[--id]);
    const url = `${this.playersUrl}/${id}`;
    return this.http.get<Player>(url).pipe(
      catchError(this.handleError<Player>(`getPlayer id=${id}`))
    );
  }

  getStats(id: number): Observable<PlayerStats> {
    // return of(STATS[--id]);
    const url = `${this.playersUrl}/${id}/stats`;
    return this.http.get<PlayerStats>(url).pipe(
      catchError(this.handleError<PlayerStats>(`getStats id=${id}`))
    );
  }

  getEvolution(id: number): Observable<PlayerEvolution[]> {
    // return of(EVOLUTION);
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
