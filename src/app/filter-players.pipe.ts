import { Pipe, PipeTransform } from '@angular/core';
import { Player } from './model/player';

@Pipe({
  name: 'filterPlayers'
})
export class FilterPlayersPipe implements PipeTransform {

  transform(players: Player[], filter: any[]): any {
    if (!players || ! filter) {
      return players;
    }
    return players.filter(player => !filter.some(id => id === player.id));
  }

}
