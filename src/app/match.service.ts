import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Match } from './model/match';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

const MATCHES = [
    {
        'id': 1,
        'date': 'Enero 22, 2018',
        'place': 'Pergamino',
        'tournament': 'Pato Capitan',
        'team1': {
            'name': 'Los Amigos de Pato',
            'photo': 'assets/img/1.png',
            'goals': 4,
            'shoots': 11,
            'fouls': 7,
            'possession': 56
        },
        'team2': {
            'name': 'Los Amigos de Guille',
            'photo': 'assets/img/2.png',
            'goals': 3,
            'shoots': 9,
            'fouls': 8,
            'possession': 44
        },
        'awards': {
            'chamigo': {
                'idplayer': 1,
                'photo': 'assets/img/3.png',
                'name': 'Pato'
            },
            'chenemigo': {
                'idplayer': 2,
                'photo': 'assets/img/1.png',
                'name': 'Guille'
            },
            'goleador': {
                'idplayer': 3,
                'photo': 'assets/img/13.png',
                'name': 'Picci'
            },
            'terminator': {
                'idplayer': 4,
                'photo': 'assets/img/14.png',
                'name': 'El Lina'
            }
        },
        'summary': {
            'title': 'Siempre hay revancha',
            'body': 'En otra calurosa noche, comienza el torneo "Empanadas Revancha 2018".'
        }
    }
];

@Injectable()
export class MatchService {

    private matchesUrl = 'api/matches';

    constructor(private http: HttpClient) { }

    getMatches(player: string): Observable<Match[]> {
        // return of(MATCHES);
        return this.http.get<Match[]>(this.matchesUrl).pipe(
            catchError(this.handleError('getMatches', []))
        );
    }

    getMatch(id: number): Observable<Match> {
        // return of(MATCHES[--id]);
        const url = `${this.matchesUrl}/${id}`;
        return this.http.get<Match>(url).pipe(
            catchError(this.handleError<Match>(`getMatch id=${id}`))
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
