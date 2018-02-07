import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { PlayerDetailComponent } from './player-detail/player-detail.component';
import { ChartsModule } from 'ng2-charts';
import { DataTableModule } from 'angular2-datatable';
import { SearchPipe } from './search-pipe.pipe';
import { PlayerDetailStatsComponent } from './player-detail-stats/player-detail-stats.component';
import { PlayerMatchesStatsComponent } from './player-matches-stats/player-matches-stats.component';
import { MatchDetailComponent } from './match-detail/match-detail.component';
import { MatchDetailStatsComponent } from './match-detail-stats/match-detail-stats.component';
import { MatchSummaryComponent } from './match-summary/match-summary.component';
import { PlayersComponent } from './players/players.component';
import { MatchesComponent } from './matches/matches.component';
import { PlayerFormComponent } from './player-form/player-form.component';
import { MatchFormComponent } from './match-form/match-form.component';
import { PlayerService } from './player.service';
import { MatchService } from './match.service';
import { AppRoutingModule } from './/app-routing.module';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { HttpClientModule } from '@angular/common/http';
import { FieldComponent } from './field/field.component';

@NgModule({
  declarations: [
    AppComponent,
    PlayerDetailComponent,
    SearchPipe,
    PlayerDetailStatsComponent,
    PlayerMatchesStatsComponent,
    MatchDetailComponent,
    MatchDetailStatsComponent,
    MatchSummaryComponent,
    PlayersComponent,
    MatchesComponent,
    PlayerFormComponent,
    MatchFormComponent,
    FieldComponent
  ],
  imports: [
    BrowserModule,
    ChartsModule,
    DataTableModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [PlayerService, MatchService],
  bootstrap: [AppComponent]
})
export class AppModule { }
