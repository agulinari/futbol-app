import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Match } from './model/match';
import { MatchSummary } from './model/match-summary';
import { MatchTeams } from './model/match-teams';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
export class MatchService {

    private matchesUrl = 'api/matches';

    constructor(private http: HttpClient) { }

    getMatches(): Observable<Match[]> {
        return this.http.get<Match[]>(this.matchesUrl).pipe(
            catchError(this.handleError('getMatches', []))
        );
    }

    getMatchesByPlayer(player: string): Observable<Match[]> {
        const params = new HttpParams().set('player', player);
        return this.http.get<Match[]>(this.matchesUrl, {params: params}).pipe(
            catchError(this.handleError('getMatches', []))
        );
    }

    getMatch(id: number): Observable<Match> {
        const url = `${this.matchesUrl}/${id}`;
        return this.http.get<Match>(url).pipe(
            catchError(this.handleError<Match>(`getMatch id=${id}`))
        );
    }

    getSummary(id: number): Observable<MatchSummary> {
        const url = `${this.matchesUrl}/${id}/summary`;
        return this.http.get<MatchSummary>(url).pipe(
            catchError(this.handleError<MatchSummary>(`getSummary id=${id}`))
        );

    }

    getTeams(id: number): Observable<MatchTeams> {
        const url = `${this.matchesUrl}/${id}/teams`;
        return this.http.get<MatchTeams>(url).pipe(
            catchError(this.handleError<MatchTeams>(`getTeams id=${id}`))
        );
    }

    postMatch(match: MatchTeams): Observable<MatchTeams> {
        return this.http.post<MatchTeams>(this.matchesUrl, match, httpOptions).pipe(
            catchError(this.handleError<MatchTeams>('addMatch'))
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
