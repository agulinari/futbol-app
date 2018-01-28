import { Component, OnInit } from '@angular/core';
import { MatchSummary } from '../model/match-summary';
import { MatchService } from '../match.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-match-summary',
  templateUrl: './match-summary.component.html',
  styleUrls: ['./match-summary.component.scss']
})
export class MatchSummaryComponent implements OnInit {

  private summary: MatchSummary;

  constructor(private matchService: MatchService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getSummary();
  }

  getSummary(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.matchService.getSummary(id)
      .subscribe(summary => this.summary = summary);
  }
}
