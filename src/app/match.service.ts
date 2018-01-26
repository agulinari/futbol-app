import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Match } from './model/match';

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

  constructor() { }

  getMatches(player: string): Observable<Match[]> {
    return of(MATCHES);
  }

  getMatch(id: number): Observable<Match> {
    return of(MATCHES[--id]);
  }

}
