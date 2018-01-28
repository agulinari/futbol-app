import { Component, OnInit } from '@angular/core';
import { Match } from '../model/match';
import { MatchService } from '../match.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-match-detail',
  templateUrl: './match-detail.component.html',
  styleUrls: ['./match-detail.component.scss']
})
export class MatchDetailComponent implements OnInit {

  private match: Match;

  constructor(private matchService: MatchService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getMatch();
  }

  getMatch(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.matchService.getMatch(id)
    .subscribe(match => this.match = match);
  }

}
