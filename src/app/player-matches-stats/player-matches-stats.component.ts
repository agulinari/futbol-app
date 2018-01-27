import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlayerService } from '../player.service';
import { PlayerEvolution } from '../model/player-evolution';

@Component({
  selector: 'app-player-matches-stats',
  templateUrl: './player-matches-stats.component.html',
  styleUrls: ['./player-matches-stats.component.scss']
})
export class PlayerMatchesStatsComponent implements OnInit {

  evol: PlayerEvolution[];

  // lineChart
  public lineChartData: Array<any> = [
    { data: [], label: 'Puntaje' },
    { data: [], label: 'Goles' }
  ];
  public lineChartLabels: Array<any> = [];
  public lineChartOptions: any = {
    responsive: true
  };
  public lineChartColors: Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

  constructor(private playerService: PlayerService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getEvolution();
  }

  getEvolution(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.playerService.getEvolution(id)
    .subscribe(evol => {
      this.evol = evol;
      let i = 0;
      evol.forEach(element => {
        this.lineChartLabels[i] = element.matchdate;
        this.lineChartData[0].data[i] = element.score;
        this.lineChartData[1].data[i] = element.goals;
        i++;
      });

    });
  }
}
