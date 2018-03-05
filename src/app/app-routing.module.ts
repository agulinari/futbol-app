import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlayersComponent } from './players/players.component';
import { PlayerDetailComponent } from './player-detail/player-detail.component';
import { MatchesComponent } from './matches/matches.component';
import { MatchDetailComponent } from './match-detail/match-detail.component';
import { MatchFormComponent } from './match-form/match-form.component';
import { PlayerFormComponent } from './player-form/player-form.component';

const routes: Routes = [
  { path: '', redirectTo: '/players', pathMatch: 'full' },
  { path: 'players', component: PlayersComponent },
  { path: 'players/new', component: PlayerFormComponent },
  { path: 'player/:id', component: PlayerDetailComponent },
  { path: 'matches', component: MatchesComponent },
  { path: 'match/:id', component: MatchDetailComponent },
  { path: 'matches/new', component: MatchFormComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, {enableTracing: true}) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
