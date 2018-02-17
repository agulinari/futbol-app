import { Pipe, PipeTransform } from '@angular/core';
import { Player } from './model/player';

@Pipe({
  name: 'filterPlayers'
})
export class FilterPlayersPipe implements PipeTransform {

  transform(players: Player[], filter: any[], id: number): any {
    if (!players || ! filter) {
      return players;
    }
    return players.filter(player => {
      if (player.id === +id) {
        return true;
      } else {
        return !filter.some(val => val === player.id);
      }
    });
  }

}
