import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatchService } from '../match.service';
import { Match } from '../model/match';

@Component({
  selector: 'app-match-detail-stats',
  templateUrl: './match-detail-stats.component.html',
  styleUrls: ['./match-detail-stats.component.scss']
})
export class MatchDetailStatsComponent implements OnInit {

  match: Match;

  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels: string[] = ['Goles', 'Disparos', 'Faltas'];
  public barChartType: string = 'bar';
  public barChartLegend: boolean = true;

  public barChartData: any[] = [
    { data: [0, 0, 0], label: 'Equipo1' },
    { data: [0, 0, 0], label: 'Equipo2' }
  ];

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

  constructor(private matchService: MatchService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getMatch();
  }

  getMatch(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.matchService.getMatch(id)
    .subscribe(match => {
      this.match = match;
      this.barChartData[0].label = match.team1.name;
      this.barChartData[0].data[0] = match.team1.goals;
      this.barChartData[0].data[1] = match.team1.shoots;
      this.barChartData[0].data[2] = match.team1.fouls;
      this.barChartData[1].label = match.team2.name;
      this.barChartData[1].data[0] = match.team2.goals;
      this.barChartData[1].data[1] = match.team2.shoots;
      this.barChartData[1].data[2] = match.team2.fouls;
    });
  }

}
