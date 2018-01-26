import { Component, OnInit, Input } from '@angular/core';
import { Match } from '../model/match';
import { MatchService } from '../match.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.scss']
})
export class MatchesComponent implements OnInit {

  searchText: '';
  matches: Match[];

  @Input() player: string;

  constructor(private matchService: MatchService,  private router: Router) { }

  ngOnInit() {
    this.getMatches();
  }

  getMatches(): void {
    this.matchService.getMatches(this.player)
        .subscribe(matches => this.matches = matches);
  }

  onSelect(match: Match): void {
    this.router.navigate(['/match/' + match.id]);
  }
}
