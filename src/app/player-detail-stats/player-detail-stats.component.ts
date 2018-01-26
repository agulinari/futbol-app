import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { PlayerStats } from '../model/player-stats';
import { ActivatedRoute } from '@angular/router';
import { PlayerService } from '../player.service';

Chart.defaults.global.defaultFontColor = '#fff';

@Component({
  selector: 'app-player-detail-stats',
  templateUrl: './player-detail-stats.component.html',
  styleUrls: ['./player-detail-stats.component.scss']
})
export class PlayerDetailStatsComponent implements OnInit {

  stats: PlayerStats;

  // Radar
  public radarChartLabels: string[] = ['Ataque', 'Defensa', 'Fisico', 'Visión', 'Impacto'];

  public radarChartData: any = [
    { data: [0, 0, 0, 0, 0], label: 'Series A' }
  ];
  public radarChartType = 'radar';

  public radarChartOptions: any = {
    legend: {
      display: false
    },
    scale: {
      pointLabels: {
        fontSize: 14
      },
      ticks: {
        display: false
      }
    }
  };

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

  constructor(private playerService: PlayerService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getStats();
  }

  getStats(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.playerService.getStats(id)
    .subscribe(stats => {
      this.stats = stats;
      this.radarChartData[0].data[0] = stats.attack;
      this.radarChartData[0].data[1] = stats.defense;
      this.radarChartData[0].data[2] = stats.physique;
      this.radarChartData[0].data[3] = stats.vision;
      this.radarChartData[0].data[4] = stats.impact;
    });
  }


}
