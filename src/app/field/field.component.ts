import { Component, OnInit } from '@angular/core';
import { MatchService } from '../match.service';
import { ActivatedRoute } from '@angular/router';
import { MatchTeams } from '../model/match-teams';

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.scss']
})
export class FieldComponent implements OnInit {

  private match: MatchTeams;

  constructor(private matchService: MatchService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getMatch();
  }

  getMatch(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.matchService.getTeams(id)
    .subscribe(match => this.match = match);
  }

}
